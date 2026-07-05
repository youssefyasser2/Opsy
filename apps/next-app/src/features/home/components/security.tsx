import { ArrowRight, Check, ShieldCheck } from "lucide-react";

const SECURITY_ITEMS = [
  "Role-based access control (RBAC)",
  "Continuous vulnerability scanning with Trivy",
  "Automated compliance checks",
  "Real-time security scoring",
] as const;

const SCORE_BARS = [
  { label: "Vulnerability Scan", value: 92, color: "from-green-400 to-cyan" },
  { label: "Compliance", value: 85, color: "from-cyan to-purple" },
  { label: "Access Control", value: 88, color: "from-purple to-pink-400" },
  { label: "Secret Management", value: 79, color: "from-orange-400 to-yellow-400" },
  { label: "Code Quality", value: 91, color: "from-cyan to-green-400" },
] as const;

export default function Security() {
  return (
    <section id="security" className="border-y border-border/60 bg-card/30 py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/5 px-4 py-1.5">
              <ShieldCheck size={14} className="text-cyan" />
              <span className="font-mono text-xs text-cyan">Security First</span>
            </div>

            <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
              Security isn&apos;t an <span className="text-gradient">afterthought</span>
            </h2>

            <p className="mt-4 text-muted-foreground">
              Every deployment is scanned, every access is logged, every secret is encrypted. Opsy
              bakes security into your pipeline so you can ship fast without compromising on
              safety. RBAC, audit logs, and compliance reporting come standard.
            </p>

            <ul className="mt-8 space-y-3">
              {SECURITY_ITEMS.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-cyan/40 bg-cyan/10">
                    <Check size={12} className="text-cyan" />
                  </div>
                  <span className="text-sm text-foreground">{item}</span>
                </li>
              ))}
            </ul>

            <a
              href="#cta"
              className="mt-8 inline-flex items-center gap-1.5 font-mono text-sm text-cyan transition-colors hover:text-cyan/80"
            >
              Learn about security
              <ArrowRight size={14} />
            </a>
          </div>

          <div className="glow-border rounded-2xl border border-border/80 bg-background/60 p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-mono text-xs uppercase text-muted-foreground">Security Score</div>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="font-mono text-5xl font-bold text-gradient">87</span>
                  <span className="font-mono text-lg text-muted-foreground">/ 100</span>
                </div>
              </div>
              <div className="text-right">
                <div className="font-mono text-xs text-green-400">▲ +2.4%</div>
                <div className="font-mono text-[10px] text-muted-foreground">this week</div>
              </div>
            </div>

            <div className="mt-4 flex h-12 items-end gap-1">
              {[60, 55, 65, 62, 70, 68, 75, 72, 78, 80, 85, 87].map((height, index) => (
                <div
                  key={index}
                  className="flex-1 rounded-t-sm bg-gradient-to-t from-cyan/30 to-cyan/60"
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>

            <div className="mt-6 space-y-4">
              {SCORE_BARS.map((bar) => (
                <div key={bar.label}>
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="text-muted-foreground">{bar.label}</span>
                    <span className="text-foreground">{bar.value}%</span>
                  </div>
                  <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${bar.color}`}
                      style={{ width: `${bar.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
