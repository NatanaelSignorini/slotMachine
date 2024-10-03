import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty, IsUUID } from 'class-validator';
import { RolesEnum } from '../enums/role.enum';

@InputType('RoleInput')
export class RoleInputDTO {
  @IsUUID()
  @Field()
  @IsNotEmpty({ message: 'O campo Id deve estar preenchido' })
  id: string;

  @IsEnum(RolesEnum)
  @IsNotEmpty({ message: 'O campo Name deve estar preenchido' })
  name: RolesEnum;
}
