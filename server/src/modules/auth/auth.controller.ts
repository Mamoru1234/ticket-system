import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../../decorators/user.decorator';
import { UserEntity } from '../database/entity/user.entity';
import { TokenResponse } from './dto/token.response';
import { AuthService } from './auth.service';
import { plainToClass } from 'class-transformer';
import { UserResponse } from './dto/user.response';
import { DEFAULT_TRANSFORM_OPTIONS } from '../../constants/class-transform.options';

@Controller('/api/v1/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@User() user: UserEntity): Promise<TokenResponse> {
    return this.authService.createToken(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async getMe(
    @User() user: UserEntity
  ): Promise<UserResponse> {
    return plainToClass(UserResponse, user, DEFAULT_TRANSFORM_OPTIONS);
  }
}
