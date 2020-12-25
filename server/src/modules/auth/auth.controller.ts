import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../../decorators/user.decorator';
import { UserEntity } from '../database/entity/user.entity';
import { TokenResponse } from './dto/token.response';
import { AuthService } from './auth.service';
import { plainToClass } from 'class-transformer';
import { DEFAULT_TRANSFORM_OPTIONS } from '../../constants/class-transform.options';
import { UserResponse } from '../../dto/user.response';
import { SetPasswordPayload } from './dto/set-password.payload';

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

  @Put('set-password')
  setPassword(
    @Body() data: SetPasswordPayload,
  ): Promise<void> {
    return this.authService.setPassword(data);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async getMe(
    @User() user: UserEntity
  ): Promise<UserResponse> {
    return plainToClass(UserResponse, user, DEFAULT_TRANSFORM_OPTIONS);
  }
}
