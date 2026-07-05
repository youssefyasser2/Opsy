import type { ReactNode } from "react";
import { siteConfig } from "@/lib/config/site";

interface AuthShellProps {
  children: ReactNode;
}

export function AuthShell({ children }: AuthShellProps) {
  return (
    <section className="grid min-h-screen lg:grid-cols-[1.1fr_0.9fr]">
      <div className="relative hidden overflow-hidden bg-slate-950 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.25),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.2),_transparent_30%)]" />
        <div className="relative z-10 flex flex-1 flex-col justify-between p-12 xl:p-16">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-slate-300">
              {siteConfig.title}
            </p>
            <h1 className="mt-6 max-w-xl text-5xl font-semibold leading-tight tracking-tight xl:text-6xl">
              Secure authentication that stays clean as the product grows.
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-8 text-slate-300">
              Route guards, token persistence, typed API calls, and reusable
              form surfaces built for a production Next.js app.
            </p>
          </div>
          <div className="grid max-w-lg grid-cols-3 gap-4 text-sm">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-slate-400">Layered</p>
              <p className="mt-1 font-medium">UI, service, storage</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-slate-400">Type-safe</p>
              <p className="mt-1 font-medium">Zod + strict TS</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-slate-400">Ready</p>
              <p className="mt-1 font-medium">Protected routes</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center bg-slate-50 px-6 py-12 sm:px-8">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </section>
  );
}

