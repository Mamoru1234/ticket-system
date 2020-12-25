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

  email: string;
}
