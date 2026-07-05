"use client";

import { useRouter } from "next/navigation";
import { routePaths } from "@/lib/config/routes";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/lib/hooks/use-auth";
import { logout } from "@/lib/api/auth.service";
import { shortenToken } from "@/lib/utils/auth";

export function DashboardSummary() {
  const router = useRouter();
  const { session, user, refreshSession } = useAuth();

  const handleSignOut = () => {
    logout();
    refreshSession();
    router.replace(routePaths.login);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Authenticated session</CardTitle>
        <CardDescription>
          Your protected workspace is available because the auth token is
          present.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm text-slate-500">User</p>
            <p className="mt-2 font-medium text-slate-950">
              {user?.name ?? "Session restored"}
            </p>
            <p className="text-sm text-slate-600">
              {user?.email ??
                "User profile will be available after a user profile endpoint is added."}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Token</p>
            <p className="mt-2 break-all font-mono text-sm text-slate-950">
              {shortenToken(session?.token)}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" onClick={handleSignOut}>
            Sign out
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              refreshSession();
            }}
          >
            Refresh session
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

