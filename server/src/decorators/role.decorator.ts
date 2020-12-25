import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../constants/user-role.enum';

export const USER_ROLE_KEY = 'user_role';
export const Role = (role: UserRole) => SetMetadata(USER_ROLE_KEY, role);
