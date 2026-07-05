import { httpClient } from "@/lib/api/http-client";
import {
  forgotPasswordResponseSchema,
  loginResponseSchema,
  registerResponseSchema,
} from "@/features/auth/schemas/auth.schemas";
import type {
  ForgotPasswordPayload,
  ForgotPasswordResponse,
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
} from "@/lib/types/auth";
import { normalizeAuthUser } from "@/lib/utils/auth";

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const response = await httpClient.post("/auth/login", payload);
  const parsed = loginResponseSchema.parse(response.data);

  return {
    message: parsed.message,
    token: parsed.token,
    user: normalizeAuthUser(parsed.user),
  };
}

export async function register(
  payload: RegisterPayload,
): Promise<RegisterResponse> {
  const response = await httpClient.post("/auth/register", payload);
  const parsed = registerResponseSchema.parse(response.data);

  return {
    user: normalizeAuthUser(parsed.user),
  };
}

export async function forgetPassword(
  payload: ForgotPasswordPayload,
): Promise<ForgotPasswordResponse> {
  const response = await httpClient.post("/auth/forgetpass", payload);
  return forgotPasswordResponseSchema.parse(response.data);
}

