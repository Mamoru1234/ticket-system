import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Store } from '@ngxs/store';
import { SaveCurrentUser } from '../stores/user.store';
import { LoginPageService } from '../services/login-page.service';
import { TokenService } from '../services/token.service';
import { RestApiService } from '../services/rest-api/rest-api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly loginPageService: LoginPageService,
    private readonly tokenService: TokenService,
    private readonly restApiService: RestApiService,
    private readonly store: Store,
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    const token = this.tokenService.getToken();
    if (!token) {
      this.loginPageService.redirectToLoginPage();
      return of(false);
    }
    return this.restApiService.currentUser()
      .pipe(
        map((user) => {
          this.store.dispatch(new SaveCurrentUser(user));
          return true;
        }),
        catchError(() => {
          this.tokenService.clearToken();
          this.loginPageService.redirectToLoginPage();
          return of(false);
        }),
      );
  }
}
