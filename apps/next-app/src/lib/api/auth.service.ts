import { clearStoredAuthSession, getStoredAuthSession, setStoredAuthSession } from "@/lib/storage/auth-session-storage";
import * as authApi from "@/lib/api/auth.api";
import type {
  AuthSession,
  ForgotPasswordPayload,
  LoginPayload,
  RegisterPayload,
} from "@/lib/types/auth";

export async function login(payload: LoginPayload): Promise<AuthSession> {
  const response = await authApi.login(payload);
  const session: AuthSession = {
    token: response.token,
    user: response.user,
  };

  setStoredAuthSession(session);
  return session;
}

export async function register(payload: RegisterPayload) {
  return authApi.register(payload);
}

export async function forgetPassword(payload: ForgotPasswordPayload) {
  return authApi.forgetPassword(payload);
}

export function getCurrentSession() {
  return getStoredAuthSession();
}

export function logout() {
  clearStoredAuthSession();
}

