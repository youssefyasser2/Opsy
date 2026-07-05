import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { Activity, ArrowRight, Cpu, GitCommit, Play, TrendingUp } from "lucide-react";

import { routePaths } from "@/lib/config/routes";
import { cn } from "@/lib/utils/cn";

function TerminalCard({
  className = "",
  style,
  children,
}: Readonly<{
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}>) {
  return (
    <div
      style={style}
      className={cn(
        "rounded-xl border border-border/40 bg-[#0b1120]/45 backdrop-blur-md transition-all duration-300 hover:border-cyan/30 hover:shadow-[0_0_30px_rgba(34,211,238,0.05)]",
        className
      )}
    >
      <div className="flex items-center gap-1.5 border-b border-border/30 px-4 py-2.5">
        <div className="h-2 w-2 rounded-full bg-red-500/40" />
        <div className="h-2 w-2 rounded-full bg-yellow-500/40" />
        <div className="h-2 w-2 rounded-full bg-green-500/40" />
        <span className="ml-2 font-mono text-[10px] tracking-wide text-muted-foreground/60">opsy@dev-01: ~</span>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative py-8">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
        <h1 className="mx-auto max-w-4xl text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-7xl lg:leading-[1.05]">
          Ship software with{" "}
          <span className="text-gradient">confidence and control</span>
        </h1>

        <p className="mx-auto mt-8 max-w-2xl text-center text-base text-muted-foreground/90 sm:text-lg lg:text-xl">
          Opsy unifies deployment, observability, infrastructure, and security into one
          developer-friendly platform so your team can move fast without breaking things.
        </p>

        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href={routePaths.register}
            className="group inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-400 to-cyan-500 px-8 py-3.5 font-mono text-xs font-bold uppercase tracking-wider text-background shadow-lg shadow-cyan/15 transition-all hover:shadow-cyan/35 hover:brightness-110 active:scale-95"
          >
            Get Started Free
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <a
            href="#features"
            className="inline-flex items-center gap-2 rounded-lg border border-border/80 bg-card/30 px-8 py-3.5 font-mono text-xs font-bold uppercase tracking-wider text-foreground backdrop-blur-sm transition-all hover:border-cyan/30 hover:bg-card/60 active:scale-95"
          >
            <Play size={12} className="text-cyan fill-cyan/10" />
            Explore Features
          </a>
        </div>

        <div className="mt-24 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          <TerminalCard className="animate-float">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Activity size={14} className="text-cyan" />
              <span className="font-mono text-[10px] tracking-wider uppercase">System Load</span>
            </div>
            <div className="mt-2 font-mono text-2xl font-bold text-foreground">0.42</div>
            <div className="mt-3 flex h-10 items-end gap-1">
              {[40, 65, 30, 80, 55, 70, 45, 90, 60, 35, 75, 50].map((height, index) => (
                <div
                  key={index}
                  className="flex-1 rounded-sm bg-gradient-to-t from-cyan/20 to-cyan"
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
          </TerminalCard>

          <TerminalCard className="animate-float" style={{ animationDelay: "0.2s" } as any}>
            <div className="flex items-center gap-2 text-muted-foreground">
              <GitCommit size={14} className="text-green-400" />
              <span className="font-mono text-[10px] tracking-wider uppercase">Deployments</span>
            </div>
            <div className="mt-2 font-mono text-2xl font-bold text-foreground">1,284</div>
            <div className="mt-2 font-mono text-[10px] text-green-400 font-medium">▲ 12% this week</div>
            <div className="mt-3 space-y-1.5">
              <div className="flex items-center gap-2 font-mono text-[10px] text-muted-foreground/80">
                <span className="text-green-400 animate-pulse">●</span> prod-api ✓
              </div>
              <div className="flex items-center gap-2 font-mono text-[10px] text-muted-foreground/80">
                <span className="text-green-400 animate-pulse">●</span> web-frontend ✓
              </div>
              <div className="flex items-center gap-2 font-mono text-[10px] text-muted-foreground/80">
                <span className="text-yellow-400">●</span> worker-svc ⏳
              </div>
            </div>
          </TerminalCard>

          <TerminalCard className="animate-float" style={{ animationDelay: "0.4s" } as any}>
            <div className="flex items-center gap-2 text-muted-foreground">
              <TrendingUp size={14} className="text-purple" />
              <span className="font-mono text-[10px] tracking-wider uppercase">Commit Activity</span>
            </div>
            <div className="mt-4 flex h-14 items-end gap-1">
              {[30, 50, 40, 70, 55, 85, 60, 75, 45, 90, 65, 80].map((height, index) => (
                <div
                  key={index}
                  className="flex-1 rounded-sm bg-gradient-to-t from-purple/20 to-purple"
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
            <div className="mt-3 font-mono text-[10px] text-muted-foreground/60">+342 commits / 7d</div>
          </TerminalCard>

          <TerminalCard className="animate-float" style={{ animationDelay: "0.6s" } as any}>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Cpu size={14} className="text-orange-400" />
              <span className="font-mono text-[10px] tracking-wider uppercase">CPU Usage</span>
            </div>
            <div className="mt-2 font-mono text-2xl font-bold text-foreground">68%</div>
            <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-secondary">
              <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-orange-400 to-yellow-400" />
            </div>
            <div className="mt-3 font-mono text-[10px] text-muted-foreground/60">8 cores · 3.2GHz avg</div>
          </TerminalCard>
        </div>
      </div>
    </section>
  );
}
