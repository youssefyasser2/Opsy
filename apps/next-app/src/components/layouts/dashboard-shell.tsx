"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { routePaths } from "@/lib/config/routes";
import { siteConfig } from "@/lib/config/site";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/hooks/use-auth";

interface DashboardShellProps {
  children: ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 lg:px-8">
          <Link href={routePaths.home} className="text-sm font-semibold text-slate-950">
            {siteConfig.title}
          </Link>
          <div className="flex items-center gap-3">
            <div className="hidden text-sm text-slate-600 sm:block">
              {user?.name ?? user?.email ?? "Authenticated session"}
            </div>
            <Button variant="outline" size="sm" onClick={logout}>
              Sign out
            </Button>
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl px-6 py-10 lg:px-8">{children}</main>
    </div>
  );
}
