import { DashboardSummary } from "@/features/auth/components/dashboard-summary";

export default function DashboardPage() {
  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.26em] text-slate-500">
          Protected area
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
          Dashboard
        </h1>
        <p className="mt-2 max-w-2xl text-slate-600">
          This route is guarded by middleware and client-side protection, so it
          only loads when the session token is present.
        </p>
      </div>
      <DashboardSummary />
    </section>
  );
}

