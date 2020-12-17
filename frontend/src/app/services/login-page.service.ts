import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginPageService {
  constructor(
    private readonly router: Router,
  ) {
  }
  redirectToLoginPage(): void {
    // noinspection JSIgnoredPromiseFromCall
    this.router.navigate(['/login'], {
      queryParams: {
        redirect: window.location.pathname,
      },
    });
  }
}
