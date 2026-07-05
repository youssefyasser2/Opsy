import type { ReactNode } from "react";
import { GuestRoute } from "@/components/common/guest-route";
import { AuthShell } from "@/components/layouts/auth-shell";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <GuestRoute>
      <AuthShell>{children}</AuthShell>
    </GuestRoute>
  );
}

