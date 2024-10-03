import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { AuthInput } from './dto/auth.input';

import * as consts from './../../common/constants/error.constants';
import { AuthDTO, TokenValidType } from './dto/auth.dto';

import { passwordEncoder } from '@src/common/decorators/encodePassord.decorator';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUserLogin(data: AuthInput): Promise<AuthDTO> {
    const user: User = await this.userService.findOne({
      where: [{ email: data.email }],
      relations: ['role'],
    });

    if (!user) {
      throw new UnauthorizedException(consts.AUTH_LOGIN_ERROR);
    }

    if (!user.password) {
      throw new UnauthorizedException(consts.USER_PASS_EMPTY);
    }

    const isValidPassword = await passwordEncoder.verify(
      data.password,
      user.password,
    );

    if (!isValidPassword) {
      throw new UnauthorizedException(consts.AUTH_LOGIN_ERROR);
    }

    const token = await this.jwtToken(user);
    this.userService.updateLastLogin(user.id);

    return { user, token };
  }

  async validateToken(token: string): Promise<TokenValidType> {
    const jwtService = new JwtService({
      secret: process.env.JWT_SECRET,
    });
    try {
      jwtService.verify(token);
      const tokenContent = jwtService.decode(token);
      const user: User = await this.userService.findOne({
        where: { id: tokenContent.sub },
      });
      if (user) {
        return { valid: true };
      }
      return { valid: false };
    } catch (error) {
      return { valid: false };
    }
  }

  private async jwtToken(
    user: User,
    options?: JwtSignOptions,
  ): Promise<string> {
    const payload = { email: user.email, sub: user.id };
    return this.jwtService.sign(payload, options);
  }
}
