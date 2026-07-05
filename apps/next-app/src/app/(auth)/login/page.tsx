import { Suspense } from "react";
import { LoginForm } from "@/features/auth/components/login-form";
import { Spinner } from "@/components/ui/spinner";

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="grid min-h-[560px] place-items-center">
          <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 shadow-sm">
            <Spinner />
            <span>Loading sign in</span>
          </div>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
