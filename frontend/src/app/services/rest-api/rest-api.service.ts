import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginBody, LoginResponse } from './dto/login.endpoint';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { delay } from 'rxjs/operators';
import { UserResponse } from './dto/user.endpoint';

@Injectable({
  providedIn: 'root',
})
export class RestApiService {
  constructor(
    private readonly http: HttpClient,
  ) {
  }
  login(body: LoginBody): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/auth/login`, body)
      .pipe(
        delay(5000),
      );
  }

  currentUser(): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${environment.apiUrl}/auth/me`);
  }
}
