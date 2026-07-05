"use client";

import type { PropsWithChildren } from "react";
import {
  createContext,
  useEffect,
  useCallback,
  useMemo,
  useSyncExternalStore,
} from "react";
import type { AuthSession } from "@/lib/types/auth";
import {
  getStoredAuthSession,
  syncStoredAuthCookie,
} from "@/lib/storage/auth-session-storage";
import { logout as logoutAuth } from "@/lib/api/auth.service";
import {
  notifyAuthStore,
  subscribeAuthStore,
} from "@/lib/store/auth-store";

type AuthContextValue = {
  session: AuthSession | null;
  user: AuthSession["user"] | null;
  token: string | null;
  isAuthenticated: boolean;
  isReady: boolean;
  refreshSession: () => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined,
);

const subscribeMounted = () => () => {};

export function AuthProvider({ children }: PropsWithChildren) {
  const session = useSyncExternalStore(
    subscribeAuthStore,
    getStoredAuthSession,
    () => null,
  );
  const isMounted = useSyncExternalStore(subscribeMounted, () => true, () => false);

  useEffect(() => {
    syncStoredAuthCookie();
  }, []);

  const refreshSession = useCallback(() => {
    notifyAuthStore();
  }, []);

  const logout = useCallback(() => {
    logoutAuth();
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      user: session?.user ?? null,
      token: session?.token ?? null,
      isAuthenticated: Boolean(session?.token),
      isReady: isMounted,
      refreshSession,
      logout,
    }),
    [isMounted, logout, refreshSession, session],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
