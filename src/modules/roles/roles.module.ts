import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
import { Roles } from '@src/common/decorators/auth.roles.decorator';
import { LoggingInterceptor } from '@src/common/interceptor/logging.interceptor';
import { RoleDTO } from './dto/role.dto';
import { Role } from './entities/role.entity';
import { RolesEnum } from './enums/role.enum';
import { RolesService } from './roles.service';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([Role])],
      services: [RolesService],
      resolvers: [
        {
          DTOClass: RoleDTO,
          EntityClass: Role,
          ServiceClass: RolesService,
          pagingStrategy: PagingStrategies.OFFSET,
          create: { disabled: true },
          update: { disabled: true },
          delete: { disabled: true },
          decorators: [Roles(RolesEnum.ADMIN, RolesEnum.USER)],
          read: {
            interceptors: [LoggingInterceptor],
          },
        },
      ],
    }),
  ],
  providers: [RolesService],
  exports: [RolesService],
})
export class RolesModule {}
