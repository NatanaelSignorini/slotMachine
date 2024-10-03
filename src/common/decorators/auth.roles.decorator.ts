import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { RolesEnum } from '@src/modules/roles/enums/role.enum';

export type RoleType = keyof typeof RolesEnum | 'ANY';

export const Roles = (...role: RoleType[]): CustomDecorator<string> =>
  SetMetadata('role', role);
