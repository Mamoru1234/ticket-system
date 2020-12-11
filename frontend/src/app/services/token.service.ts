import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private token: string | null = null;

  setToken(token: string): void {
    this.token = token;
    localStorage.setItem(environment.tokenKey, token);
  }

  getToken(): string | null {
    if (this.token) {
      return this.token;
    }
    this.token = localStorage.getItem(environment.tokenKey);
    return this.token;
  }

  clearToken(): void {
    this.token = null;
    localStorage.removeItem(environment.tokenKey);
  }
}
