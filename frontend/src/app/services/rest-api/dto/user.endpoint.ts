export enum UserRole {
  ADMIN = 'ADMIN',
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER',
}

export interface UserResponse {
  id: number;

  firstName: string;

  lastName: string;

  role: UserRole;

  email?: string;
}

export interface CreateUserPayload {
  firstName: string;
  lastName: string;
  role: string;
}

export interface ActivateUserPayload {
  id: number;
  email: string;
}
