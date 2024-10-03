import { FilterableField } from '@nestjs-query/query-graphql';
import { ObjectType } from '@nestjs/graphql';
import { BaseDTO } from '@src/modules/bases/dto/base.dto';
import { IsString } from 'class-validator';
import { RolesEnum } from '../enums/role.enum';

@ObjectType('Role')
export class RoleDTO extends BaseDTO {
  @IsString()
  @FilterableField(() => RolesEnum, { nullable: false })
  name: string;
}
