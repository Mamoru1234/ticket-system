export interface LoginBody {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface SetPasswordPayload {
  token: string;
  password: string;
}
