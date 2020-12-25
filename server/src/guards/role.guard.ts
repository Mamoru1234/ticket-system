import { CanActivate, ExecutionContext, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../constants/user-role.enum';
import { USER_ROLE_KEY } from '../decorators/role.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
  ) {
  }

  canActivate(context: ExecutionContext): boolean {
    const role = this.reflector.getAllAndOverride<UserRole>(USER_ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!role) {
      throw new InternalServerErrorException('No role for role guard');
    }
    const { user } = context.switchToHttp().getRequest();
    return this.mapRolePriority(user.role) >= this.mapRolePriority(role);
  }

  mapRolePriority(role: UserRole): number {
    if (role === UserRole.STUDENT) {
      return 0;
    }
    if (role === UserRole.TEACHER) {
      return 1;
    }
    if (role === UserRole.ADMIN) {
      return 2;
    }
    throw new Error('Unknown role');
  }
}
