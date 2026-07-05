import {
  AUTH_SESSION_MAX_AGE_SECONDS,
  AUTH_SESSION_STORAGE_KEY,
  AUTH_TOKEN_COOKIE_KEY,
} from "@/lib/constants/auth";
import type { AuthSession } from "@/lib/types/auth";
import { notifyAuthStore } from "@/lib/store/auth-store";

function isBrowser() {
  return typeof window !== "undefined";
}

let cachedSnapshotKey: string | null = null;
let cachedSnapshot: AuthSession | null = null;

function readCookie(cookieName: string) {
  if (!isBrowser()) {
    return null;
  }

  const cookie = document.cookie
    .split("; ")
    .find((entry) => entry.startsWith(`${cookieName}=`));

  if (!cookie) {
    return null;
  }

  return decodeURIComponent(cookie.split("=").slice(1).join("="));
}

function writeCookie(cookieName: string, value: string) {
  if (!isBrowser()) {
    return;
  }

  document.cookie = [
    `${cookieName}=${encodeURIComponent(value)}`,
    "path=/",
    `max-age=${AUTH_SESSION_MAX_AGE_SECONDS}`,
    "sameSite=lax",
  ].join("; ");
}

function deleteCookie(cookieName: string) {
  if (!isBrowser()) {
    return;
  }

  document.cookie = [
    `${cookieName}=`,
    "path=/",
    "max-age=0",
    "sameSite=lax",
  ].join("; ");
}

function getSnapshotKey(rawSession: string | null, token: string | null) {
  return `${rawSession ?? ""}::${token ?? ""}`;
}

export function getStoredAuthToken() {
  if (!isBrowser()) {
    return null;
  }

  const session = getStoredAuthSession();
  if (session?.token) {
    return session.token;
  }

  return readCookie(AUTH_TOKEN_COOKIE_KEY);
}

export function getStoredAuthSession(): AuthSession | null {
  if (!isBrowser()) {
    return null;
  }

  const rawSession = window.localStorage.getItem(AUTH_SESSION_STORAGE_KEY);
  const token = readCookie(AUTH_TOKEN_COOKIE_KEY);
  const snapshotKey = getSnapshotKey(rawSession, token);

  if (cachedSnapshotKey === snapshotKey) {
    return cachedSnapshot;
  }

  if (rawSession) {
    try {
      const parsedSession = JSON.parse(rawSession) as AuthSession;
      if (parsedSession.token) {
        cachedSnapshotKey = snapshotKey;
        cachedSnapshot = parsedSession;
        return parsedSession;
      }
    } catch {
      window.localStorage.removeItem(AUTH_SESSION_STORAGE_KEY);
    }
  }

  if (!token) {
    cachedSnapshotKey = snapshotKey;
    cachedSnapshot = null;
    return null;
  }

  cachedSnapshotKey = snapshotKey;
  cachedSnapshot = { token, user: null };
  return cachedSnapshot;
}

export function syncStoredAuthCookie() {
  if (!isBrowser()) {
    return;
  }

  const rawSession = window.localStorage.getItem(AUTH_SESSION_STORAGE_KEY);
  if (!rawSession) {
    return;
  }

  try {
    const parsedSession = JSON.parse(rawSession) as AuthSession;
    if (parsedSession.token && !readCookie(AUTH_TOKEN_COOKIE_KEY)) {
      writeCookie(AUTH_TOKEN_COOKIE_KEY, parsedSession.token);
      cachedSnapshotKey = null;
    }
  } catch {
    window.localStorage.removeItem(AUTH_SESSION_STORAGE_KEY);
  }
}

export function setStoredAuthSession(session: AuthSession) {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(
    AUTH_SESSION_STORAGE_KEY,
    JSON.stringify(session),
  );
  writeCookie(AUTH_TOKEN_COOKIE_KEY, session.token);
  cachedSnapshotKey = null;
  notifyAuthStore();
}

export function clearStoredAuthSession() {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.removeItem(AUTH_SESSION_STORAGE_KEY);
  deleteCookie(AUTH_TOKEN_COOKIE_KEY);
  cachedSnapshotKey = null;
  notifyAuthStore();
}
