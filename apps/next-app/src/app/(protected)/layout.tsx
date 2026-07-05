import type { ReactNode } from "react";
import { ProtectedRoute } from "@/components/common/protected-route";
import { DashboardShell } from "@/components/layouts/dashboard-shell";

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute>
      <DashboardShell>{children}</DashboardShell>
    </ProtectedRoute>
  );
}

