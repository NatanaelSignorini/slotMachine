import { Field, InputType } from '@nestjs/graphql';
import { RoleInputDTO } from '@src/modules/roles/dto/role.input';

import { IsEmail, IsNotEmpty } from 'class-validator';

@InputType('CreateUserInput')
export class CreateUserInput {
  @IsEmail({}, { message: 'E-mail fora de padrão' })
  @IsNotEmpty({ message: 'O campo E-mail deve estar preenchido' })
  email: string;

  @IsNotEmpty({ message: 'O campo Senha deve estar preenchido' })
  password: string;

  @Field(() => [RoleInputDTO])
  roles: RoleInputDTO;
}
