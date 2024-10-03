import { ArgsType, Field, InputType } from '@nestjs/graphql';

@ArgsType()
@InputType()
export class AuthInput {
  @Field()
  userName?: string;

  @Field()
  email?: string;

  @Field()
  password: string;
}
