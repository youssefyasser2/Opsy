"use client";

import type { PropsWithChildren } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { routePaths } from "@/lib/config/routes";
import { useAuth } from "@/lib/hooks/use-auth";
import { Spinner } from "@/components/ui/spinner";

export function GuestRoute({ children }: PropsWithChildren) {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace(routePaths.dashboard);
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated) {
    return (
      <div className="grid min-h-screen place-items-center bg-slate-50">
        <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 shadow-sm">
          <Spinner />
          <span>Redirecting</span>
        </div>
      </div>
    );
  }

  return children;
}
