import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppRouter } from './app-router';

@Injectable({
  providedIn: 'root',
})
export class LoginPageService {
  constructor(
    private readonly appRouter: AppRouter,
  ) {
  }
  redirectToLoginPage(): void {
    this.appRouter.saveNavigation('/login');
  }
}
