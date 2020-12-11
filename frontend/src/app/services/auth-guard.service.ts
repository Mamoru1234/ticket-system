import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(
    private readonly router: Router,
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem(environment.tokenKey);
    if (token) {
      return true;
    }
    // noinspection JSIgnoredPromiseFromCall
    this.router.navigate(['/login'], {
      queryParams: {
        redirect: window.location.pathname,
      },
    });
    return false;
  }
}
