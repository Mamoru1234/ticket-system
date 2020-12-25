import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { TokenService } from '../services/token.service';
import { Observable } from 'rxjs';

const URLS_WITHOUT_TOKEN: string[] = [
  '/api/v1/auth/login',
];

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private readonly tokenService: TokenService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.tokenService.getToken();
    if (!token) {
      return next.handle(request);
    }
    const shouldSkip = URLS_WITHOUT_TOKEN.some((it) => request.url.includes(it));
    if (shouldSkip) {
      return next.handle(request);
    }
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      },
    });
    return next.handle(request);
  }
}
