import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { CreateUserInput } from './create-user.input';

@InputType('UpdateUserInput')
// @BeforeUpdateOne((input: UpdateOneInputType<UpdateUserInput>) => {
//   if (!input.update.password) {
//     delete input.update.password;
//   }
//   return input;
// })
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => ID)
  id?: string;
}
