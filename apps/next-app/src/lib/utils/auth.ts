import type { AuthUser } from "@/lib/types/auth";

export function normalizeAuthUser(user: AuthUser): AuthUser {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}

export function getDisplayName(user: AuthUser | null | undefined) {
  return user?.name?.trim() || user?.email?.trim() || "Authenticated user";
}

export function shortenToken(token: string | null | undefined) {
  if (!token) {
    return "No token available";
  }

  if (token.length <= 14) {
    return token;
  }

  return `${token.slice(0, 8)}…${token.slice(-6)}`;
}

