import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Roles } from '@src/common/decorators/auth.roles.decorator';
import { CurrentUser } from '@src/common/decorators/currentUser.decorator';
import { UserDTO } from '../users/dto/user.dto';
import { AuthService } from './auth.service';
import { AuthDTO, TokenValidType } from './dto/auth.dto';
import { AuthInput } from './dto/auth.input';

@Resolver('Auth')
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => AuthDTO)
  public async authenticated(@Args('data') data: AuthInput): Promise<AuthDTO> {
    return await this.authService.validateUserLogin(data);
  }

  @Query(() => TokenValidType)
  public async isTokenValid(
    @Args({ name: 'token', type: () => String })
    token: string,
  ): Promise<TokenValidType> {
    return await this.authService.validateToken(token);
  }

  @Query(() => UserDTO)
  @Roles('ANY')
  public async me(@CurrentUser() user: UserDTO): Promise<UserDTO> {
    return user;
  }
}
