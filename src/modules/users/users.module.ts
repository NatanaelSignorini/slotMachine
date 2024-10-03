import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
import { Roles } from '@src/common/decorators/auth.roles.decorator';
import { Role } from '../roles/entities/role.entity';
import { RolesEnum } from '../roles/enums/role.enum';
import { RolesService } from '../roles/roles.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserDTO } from './dto/user.dto';
import { User } from './entities/user.entity';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([User, Role])],
      services: [UsersService, RolesService],
      resolvers: [
        {
          DTOClass: UserDTO,
          EntityClass: User,
          CreateDTOClass: CreateUserInput,
          UpdateDTOClass: UpdateUserInput,
          ServiceClass: UsersService,
          create: { disabled: true },
          update: { disabled: true },
          delete: { disabled: true },
          read: {
            decorators: [Roles(RolesEnum.ADMIN, RolesEnum.USER)],
          },
          pagingStrategy: PagingStrategies.OFFSET,
          enableTotalCount: true,
          enableAggregate: false,
          enableSubscriptions: false,
        },
      ],
    }),
  ],
  providers: [UsersService, UsersResolver, RolesService],
  exports: [UsersService],
})
export class UsersModule {}
