export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

export interface AuthSession {
  token: string;
  user?: AuthUser | null;
}

export interface LoginPayload {
  identifier: string;
  password: string;
}

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface LoginResponse {
  user: AuthUser;
  message: string;
  token: string;
}

export interface RegisterResponse {
  user: AuthUser;
  message?: string;
}

export interface ForgotPasswordResponse {
  message: string;
}

