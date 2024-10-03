import { Field, InputType } from '@nestjs/graphql';
import { InputDirectionSortingEnum } from '@src/common/Inputs/sorting-direction.input';
import { IsOptional } from 'class-validator';
import { InputFieldSortingEnum } from '../enums/field-sorting.enum';

@InputType()
export class SortOptionsFilterUser {
  @IsOptional()
  @Field({ nullable: true })
  field?: InputFieldSortingEnum;

  @IsOptional()
  @Field({ nullable: true })
  direction?: InputDirectionSortingEnum;
}
