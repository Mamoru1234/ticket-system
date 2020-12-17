import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { LoginPageService } from './login-page.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(
    private readonly loginPageService: LoginPageService,
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
    this.loginPageService.redirectToLoginPage();
    return false;
  }
}
