import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { UserStore } from '../stores/user.store';
import { UserRole } from '../services/rest-api/dto/user.endpoint';

@Injectable({
  providedIn: 'root',
})
export class UserRoleGuard implements CanActivate {
  constructor(
    private readonly store: Store,
  ) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const requiredRole = route.data.requiredRole;
    if (!requiredRole) {
      console.error('No role in route data wrong usage of guard');
      return false;
    }
    const user = this.store.selectSnapshot(UserStore.currentUser);
    if (!user) {
      console.error('No user in store');
      return false;
    }
    return this.mapRolePriority(user.role) >= this.mapRolePriority(requiredRole);
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
