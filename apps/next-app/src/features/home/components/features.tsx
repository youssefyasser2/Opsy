import { Activity, Rocket, Server, Shield, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
  accent: "cyan" | "purple";
  terminal: ReactNode;
};

const FEATURES: Feature[] = [
  {
    icon: Rocket,
    title: "Deploy with Confidence",
    description:
      "Automated pipelines with rollback, canary releases, and zero-downtime deploys built in.",
    accent: "cyan",
    terminal: (
      <div className="font-mono text-[10px] leading-relaxed">
        <div className="text-muted-foreground">$ opsy deploy --env=prod</div>
        <div className="text-cyan">→ Building image... ✓</div>
        <div className="text-cyan">→ Pushing registry... ✓</div>
        <div className="text-cyan">→ Rolling update... ✓</div>
        <div className="text-green-400">● Deployment successful</div>
        <div className="text-muted-foreground">commit: a3f9c2e · 1.2s</div>
      </div>
    ),
  },
  {
    icon: Activity,
    title: "Observe Everything",
    description: "Real-time metrics, distributed tracing, and structured logs in one unified view.",
    accent: "cyan",
    terminal: (
      <div className="space-y-2">
        <div className="grid grid-cols-3 gap-2 font-mono text-[10px]">
          <div className="rounded bg-secondary/50 p-2">
            <div className="text-muted-foreground">CPU</div>
            <div className="text-cyan">42%</div>
          </div>
          <div className="rounded bg-secondary/50 p-2">
            <div className="text-muted-foreground">MEM</div>
            <div className="text-purple">3.2G</div>
          </div>
          <div className="rounded bg-secondary/50 p-2">
            <div className="text-muted-foreground">LAT</div>
            <div className="text-green-400">12ms</div>
          </div>
        </div>
        <div className="font-mono text-[10px] text-muted-foreground">p99: 28ms · errors: 0.02%</div>
      </div>
    ),
  },
  {
    icon: Shield,
    title: "Secure by Default",
    description: "Vulnerability scanning, secrets management, and compliance checks on every commit.",
    accent: "purple",
    terminal: (
      <div className="space-y-1.5 font-mono text-[10px]">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">CVE Scan</span>
          <span className="text-green-400">✓ PASS</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Secrets</span>
          <span className="text-green-400">✓ PASS</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Policy</span>
          <span className="text-green-400">✓ PASS</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">SBOM</span>
          <span className="text-green-400">✓ PASS</span>
        </div>
        <div className="mt-2 text-cyan">Score: 87/100</div>
      </div>
    ),
  },
  {
    icon: Server,
    title: "Govern Infrastructure",
    description: "Policy-as-code, cost tracking, and drift detection across all your environments.",
    accent: "purple",
    terminal: (
      <div className="space-y-1.5 font-mono text-[10px]">
        <div className="flex justify-between text-muted-foreground">
          <span>prod-us-east</span>
          <span className="text-green-400">healthy</span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>prod-eu-west</span>
          <span className="text-green-400">healthy</span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>staging</span>
          <span className="text-green-400">healthy</span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>dev</span>
          <span className="text-yellow-400">drift</span>
        </div>
        <div className="mt-2 text-cyan">$1,284 / mo</div>
      </div>
    ),
  },
];

const accentMap = {
  cyan: "text-cyan border-cyan/30",
  purple: "text-purple border-purple/30",
} as const;

export default function Features() {
  return (
    <section id="features" className="py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Everything your team needs</h2>
          <p className="mt-4 text-muted-foreground">Four pillars. One platform. Zero context switching.</p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {FEATURES.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className={cn(
                  "glow-border group relative rounded-2xl border border-border/80 bg-card/40 p-6 backdrop-blur-sm transition-all hover:bg-card/60",
                )}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={cn(
                      "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border bg-background/50",
                      accentMap[feature.accent],
                    )}
                  >
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{feature.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>

                <div className="mt-5 rounded-lg border border-border/60 bg-background/80 p-3">
                  <div className="mb-2 flex items-center gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-red-500/50" />
                    <div className="h-2 w-2 rounded-full bg-yellow-500/50" />
                    <div className="h-2 w-2 rounded-full bg-green-500/50" />
                  </div>
                  {feature.terminal}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
