import { ArgsType, Field, InputType } from '@nestjs/graphql';

@ArgsType()
@InputType()
export class BaseInputWhere {
  @Field({ nullable: true })
  readonly id?: string;
}

@ArgsType()
@InputType()
export class BaseFilter {
  @Field({ defaultValue: 10, nullable: true })
  readonly take?: number;

  @Field({ defaultValue: 0, nullable: true })
  readonly skip?: number;

  @Field(() => BaseInputWhere, { nullable: true })
  readonly order?: any;

  @Field(() => BaseInputWhere, { nullable: true })
  readonly where?: any;
}
