import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ForgotPasswordPayload, LoginBody, LoginResponse, SetPasswordPayload } from './dto/login.endpoint';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ActivateUserPayload, CreateUserPayload, UserResponse } from './dto/user.endpoint';
import { CreateGroupPayload, GroupResponse } from './dto/group.endpoint';
import { CreateLessonPayload, LessonResponse } from './dto/lesson.endpoint';

@Injectable({
  providedIn: 'root',
})
export class RestApiService {
  constructor(
    private readonly http: HttpClient,
  ) {
  }
  login(body: LoginBody): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/auth/login`, body);
  }

  setPassword(data: SetPasswordPayload): Observable<void> {
    return this.http.put<void>(`${environment.apiUrl}/auth/set-password`, data);
  }

  currentUser(): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${environment.apiUrl}/auth/me`);
  }

  getAllUsers(): Observable<UserResponse[]> {
    return this.http.get<UserResponse[]>(`${environment.apiUrl}/users/admin/all`);
  }

  createUser(data: CreateUserPayload): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${environment.apiUrl}/users/admin/create`, data);
  }

  getById(userId: number): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${environment.apiUrl}/users/${userId}`);
  }

  activateUser(data: ActivateUserPayload): Observable<UserResponse> {
    return this.http.put<UserResponse>(`${environment.apiUrl}/users/activate`, data);
  }

  forgotPassword(data: ForgotPasswordPayload): Observable<void> {
    return this.http.put<void>(`${environment.apiUrl}/auth/forgot-password`, data);
  }

  getTeacherGroups(): Observable<GroupResponse[]> {
    return this.http.get<GroupResponse[]>(`${environment.apiUrl}/student-group/teacher`);
  }

  createGroup(data: CreateGroupPayload): Observable<GroupResponse> {
    return this.http.post<GroupResponse>(`${environment.apiUrl}/student-group/create`, data);
  }

  getGroupById(groupId: string): Observable<GroupResponse> {
    return this.http.get<GroupResponse>(`${environment.apiUrl}/student-group/${groupId}`);
  }

  getLessonsByGroupId(groupId: string): Observable<LessonResponse[]> {
    return this.http.get<LessonResponse[]>(`${environment.apiUrl}/lessons/by-group/${groupId}`);
  }

  createLesson(data: CreateLessonPayload): Observable<LessonResponse> {
    return this.http.post<LessonResponse>(`${environment.apiUrl}/lessons/create`, data);
  }

  getLessonById(lessonId: string): Observable<LessonResponse> {
    return this.http.get<LessonResponse>(`${environment.apiUrl}/lessons/${lessonId}`);
  }
}
