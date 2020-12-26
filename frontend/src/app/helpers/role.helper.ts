import { UserRole } from '../services/rest-api/dto/user.endpoint';

export class RoleHelper {
  static mapRolePriority(role: UserRole): number {
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

  static hasRole(userRole: UserRole, requiredRole: UserRole): boolean {
    return this.mapRolePriority(userRole) >= this.mapRolePriority(requiredRole);
  }
}
