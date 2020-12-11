import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { TokenStore } from '../stores/token.store';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(
    private readonly store: Store,
    private readonly router: Router,
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.store.selectOnce(TokenStore.token)
      .pipe(map((token) => {
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
      }));
  }
}
