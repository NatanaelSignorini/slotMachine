import {
  FilterableField,
  FilterableRelation,
} from '@nestjs-query/query-graphql';
import { HideField, ObjectType } from '@nestjs/graphql';
import { BaseDTO } from '@src/modules/bases/dto/base.dto';
import { RoleDTO } from '@src/modules/roles/dto/role.dto';

@ObjectType('User')
@FilterableRelation('role', () => RoleDTO, { nullable: true })
export class UserDTO extends BaseDTO {
  @FilterableField({ nullable: true })
  userName?: string;

  @FilterableField({ nullable: true })
  email?: string;

  @HideField()
  password?: string;

  @FilterableField({ nullable: true })
  lastLogin?: Date;
}
