import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  // Adicionado construtor com "reflector" para conseguirmos pegar os parametros passados para decorators
  constructor(private reflector: Reflector) {
    super();
  }

  getRequest(context: ExecutionContext): Request {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  // Substitui a validação padrão do JWT para lidarmos com as Roles.
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Pega os parametros passados para o decorator Roles, ex: Roles('ADMIN', 'SUPER_ADMIN')
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    // Se nao for passado nenhuma role, entao é um recurso liberado
    if (!roles) {
      return true;
    }

    // Valida o token do usuario e popula o user no context
    // (pode jogar a exception "Unauthorized" e nao seguir adiante)
    await super.canActivate(context);

    // Se for passado por exemplo: Roles('ANY')
    // Significa que vamos validar o token do usuario, mas ignorar as roles
    if (roles.includes('ANY')) {
      return true;
    }

    const ctx = GqlExecutionContext.create(context).getContext();
    const userRoles = ctx.req.user?.roles.map((userRole) => userRole.name);

    // Permite o recurso caso o usuario possua no mínimo UMA das roles passadas para o decorator
    return userRoles.some((userRole) => roles.includes(userRole));
  }
}
