import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository, SelectQueryBuilder } from 'typeorm';
import { BaseInputWhere } from '../bases/base.input';
import { User } from './entities/user.entity';

import { PaginationInput } from '@src/common/Inputs/pagination.input';
import * as consts from './../../common/constants/error.constants';
import { CreateUserInput } from './dto/create-user.input';
import { CustomUserDTO } from './dto/custom-user.dto';
import { SortOptionsFilterUser } from './dto/sort-options-filter-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InputFieldSortingEnum } from './enums/field-sorting.enum';

@Injectable()
export class UsersService extends TypeOrmQueryService<User> {
  constructor(
    @InjectRepository(User)
    public userRepository: Repository<User>,
  ) {
    super(userRepository, { useSoftDelete: true });
  }

  async findOne(input: BaseInputWhere & FindOneOptions<User>): Promise<User> {
    const data = await this.userRepository.findOne({ ...input });
    if (!data) {
      throw new NotFoundException(consts.USER_NOT_FOUND);
    }
    return data;
  }

  async findAllUser(
    pagination: PaginationInput,
    sorting?: SortOptionsFilterUser,
  ): Promise<CustomUserDTO | null> {
    const queryBuilder = this.userRepository.createQueryBuilder('users');

    if (sorting?.field == InputFieldSortingEnum.CREATED_AT) {
      queryBuilder.orderBy('users.createdAt', sorting.direction);
    }

    const [dataQuery, totalCount] = await this.usersPagination(
      queryBuilder,
      pagination,
    );

    const node = await dataQuery.getMany();
    return { node, totalCount };
  }

  async updateLastLogin(id: string): Promise<User> {
    const foundUser: User = await this.userRepository.findOne({
      where: { id },
      loadEagerRelations: false,
    });

    if (!foundUser) {
      throw new NotFoundException(consts.USER_NOT_FOUND);
    }
    delete foundUser.password;
    foundUser.lastLogin = new Date();

    return this.userRepository.save(foundUser);
  }

  async createOneUser(data: CreateUserInput): Promise<User> {
    const userFound = await this.userRepository.findOne({
      where: { email: data.email },
    });
    // if (userFound) {
    //   throw new UnauthorizedException(consts.DUPLICATE_EMAIL);
    // }
    if (userFound) {
      throw new UnauthorizedException(consts.USER_EXIST);
    }

    const user: User = this.userRepository.create({
      ...data,
    });

    return this.userRepository.save(user);
  }

  async updateOneUser(id: string, data: UpdateUserInput): Promise<User> {
    const foundUser: User = await this.userRepository.findOneBy({ id: id });
    if (!foundUser) {
      throw new NotFoundException(consts.USER_NOT_FOUND);
    }
    delete foundUser.password;

    const buildUser: User = this.userRepository.create(data);

    const saved = await this.userRepository.save({
      ...foundUser,
      ...buildUser,
    });

    return saved;
  }

  async deleteOneUser(id: string): Promise<string> {
    const foundUser: User = await this.userRepository.findOneBy({ id: id });
    if (!foundUser) {
      throw new NotFoundException(consts.USER_NOT_FOUND);
    }
    await this.userRepository.softDelete(id);

    return 'Usuário foi deletado';
  }

  private async usersPagination(
    query: SelectQueryBuilder<User>,
    pagination: PaginationInput,
  ): Promise<[SelectQueryBuilder<User>, number]> {
    const totalCountQuery = query.clone();

    const totalCount = await totalCountQuery.getCount();

    if (pagination) {
      query.take(pagination.perPage);
      query.skip(pagination.perPage * (pagination.page - 1));
    }
    return [query, totalCount];
  }
}
