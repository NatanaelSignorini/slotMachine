import { registerEnumType } from '@nestjs/graphql';

export enum InputFieldSortingEnum {
  'CREATED_AT' = 'CREATED_AT',
}

registerEnumType(InputFieldSortingEnum, {
  name: 'InputFieldSortingEnum',
});
