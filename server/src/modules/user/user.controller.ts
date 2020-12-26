import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UserResponse } from '../../dto/user.response';
import { UserService } from './user.service';
import { plainToClass } from 'class-transformer';
import { AuthGuard } from '@nestjs/passport';
import { Role } from '../../decorators/role.decorator';
import { UserRole } from '../../constants/user-role.enum';
import { RoleGuard } from '../../guards/role.guard';
import { DEFAULT_TRANSFORM_OPTIONS } from '../../constants/class-transform.options';
import { CreateUserPayload } from './dto/create-user.payload';
import { ActivateUserPayload } from './dto/activate-user.payload';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {
  }

  @Get('/admin/all')
  @Role(UserRole.ADMIN)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  async findAll(): Promise<UserResponse[]> {
    const users = await this.userService.findAll();
    return plainToClass(UserResponse, users, DEFAULT_TRANSFORM_OPTIONS);
  }

  @Post('/admin/create')
  @Role(UserRole.ADMIN)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  async createUser(
    @Body() data: CreateUserPayload
  ): Promise<UserResponse> {
    const newUser = await this.userService.createUser(data);
    return plainToClass(UserResponse, newUser, DEFAULT_TRANSFORM_OPTIONS);
  }

  @Put('/activate')
  @Role(UserRole.TEACHER)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  async activateUser(
    @Body() data: ActivateUserPayload,
  ): Promise<UserResponse> {
    const activatedUser = await this.userService.activateUser(data);
    return plainToClass(UserResponse, activatedUser, DEFAULT_TRANSFORM_OPTIONS);
  }

  @Get(':userId')
  @Role(UserRole.TEACHER)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  async getById(
    @Param('userId') userId: number,
  ): Promise<UserResponse> {
    const user = await this.userService.getById(userId);
    return plainToClass(UserResponse, user);
  }
}
