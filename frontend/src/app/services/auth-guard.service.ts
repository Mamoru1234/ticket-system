import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(
    private readonly router: Router,
    private readonly tokenService: TokenService,
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const token = this.tokenService.getToken();
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
