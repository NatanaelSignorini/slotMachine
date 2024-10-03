import { registerEnumType } from '@nestjs/graphql';

export enum InputDirectionSortingEnum {
  'ASC' = 'ASC',
  'DESC' = 'DESC',
}

registerEnumType(InputDirectionSortingEnum, {
  name: 'InputDirectionSortingEnum',
});
