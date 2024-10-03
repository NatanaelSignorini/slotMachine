import { Field, ObjectType } from '@nestjs/graphql';
import { UserDTO } from './user.dto';

@ObjectType('CustomUserDTO')
export class CustomUserDTO {
  @Field(() => [UserDTO])
  node?: UserDTO[];

  @Field(() => Number)
  totalCount?: number;
}
