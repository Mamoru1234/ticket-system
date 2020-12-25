import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserResponse } from '../../dto/user.response';
import { UserService } from './user.service';
import { plainToClass } from 'class-transformer';
import { AuthGuard } from '@nestjs/passport';
import { Role } from '../../decorators/role.decorator';
import { UserRole } from '../../constants/user-role.enum';
import { RoleGuard } from '../../guards/role.guard';
import { DEFAULT_TRANSFORM_OPTIONS } from '../../constants/class-transform.options';

@Controller('/api/v1/users')
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
}
