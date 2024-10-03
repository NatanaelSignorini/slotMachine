import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Roles } from '@src/common/decorators/auth.roles.decorator';
import { PaginationInput } from '@src/common/Inputs/pagination.input';
import { RolesEnum } from '../roles/enums/role.enum';
import { CreateUserInput } from './dto/create-user.input';
import { CustomUserDTO } from './dto/custom-user.dto';
import { SortOptionsFilterUser } from './dto/sort-options-filter-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserDTO } from './dto/user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver('User')
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => CustomUserDTO)
  @Roles(RolesEnum.ADMIN)
  public async findAllUser(
    @Args('pagination', { type: () => PaginationInput, nullable: true })
    pagination?: PaginationInput,
    @Args('sorting', { type: () => SortOptionsFilterUser, nullable: true })
    sorting?: SortOptionsFilterUser,
  ): Promise<CustomUserDTO> {
    return this.usersService.findAllUser(pagination, sorting);
  }

  @Mutation(() => UserDTO)
  @Roles(RolesEnum.ADMIN, RolesEnum.USER)
  public async createOneUser(
    @Args({ name: 'data', type: () => CreateUserInput, nullable: true })
    data: CreateUserInput,
  ): Promise<User> {
    return this.usersService.createOneUser(data);
  }

  @Mutation(() => UserDTO)
  @Roles(RolesEnum.ADMIN, RolesEnum.USER)
  public async updateOneUser(
    @Args({ name: 'id', type: () => String, nullable: false })
    id: string,
    @Args({ name: 'data', type: () => UpdateUserInput, nullable: true })
    data: UpdateUserInput,
  ): Promise<User> {
    return this.usersService.updateOneUser(id, data);
  }

  @Mutation(() => String)
  @Roles(RolesEnum.ADMIN)
  public async deleteOneUser(@Args('id') id: string): Promise<string> {
    return this.usersService.deleteOneUser(id);
  }
}
