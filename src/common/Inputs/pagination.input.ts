import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class PaginationInput {
  @Field(() => Int)
  perPage: number;

  @Field(() => Int)
  page: number;
}
