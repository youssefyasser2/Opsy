"use client";

import type { PropsWithChildren } from "react";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { routePaths } from "@/lib/config/routes";
import { AUTH_REDIRECT_PARAM } from "@/lib/constants/auth";
import { useAuth } from "@/lib/hooks/use-auth";
import { Spinner } from "@/components/ui/spinner";

export function ProtectedRoute({ children }: PropsWithChildren) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isReady } = useAuth();

  useEffect(() => {
    if (isReady && !isAuthenticated) {
      const searchParams = new URLSearchParams();
      searchParams.set(AUTH_REDIRECT_PARAM, pathname || routePaths.dashboard);
      router.replace(`${routePaths.login}?${searchParams.toString()}`);
    }
  }, [isAuthenticated, isReady, pathname, router]);

  if (!isReady) {
    return (
      <div className="grid min-h-screen place-items-center bg-slate-50">
        <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 shadow-sm">
          <Spinner />
          <span>Loading session</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="grid min-h-screen place-items-center bg-slate-50">
        <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 shadow-sm">
          <Spinner />
          <span>Redirecting to sign in</span>
        </div>
      </div>
    );
  }

  return children;
}

