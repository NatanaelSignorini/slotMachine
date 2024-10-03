import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService extends TypeOrmQueryService<Role> {
  constructor(
    @InjectRepository(Role)
    public repository: Repository<Role>,
  ) {
    super(repository, { useSoftDelete: true });
  }

  async findByName(name: string): Promise<Role> {
    return this.repository.findOne({ where: { name: name } });
  }

  async findByNames(names: string[]): Promise<Role[]> {
    return this.repository.find({
      where: names.map((name) => ({ name })),
    });
  }
}
