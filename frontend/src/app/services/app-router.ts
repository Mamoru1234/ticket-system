import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AppRouter {
  constructor(
    private readonly router: Router,
  ) {
  }
  navigate(url: string, extras?: NavigationExtras): void {
    // noinspection JSIgnoredPromiseFromCall
    this.router.navigate([url], extras);
  }
}
