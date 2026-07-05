import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { routePaths } from "@/lib/config/routes";

export default function CTASection() {
  return (
    <section id="cta" className="py-24">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <div className="glow-border relative overflow-hidden rounded-3xl border border-border/80 bg-card/40 p-10 text-center backdrop-blur-sm sm:p-16">
          <div className="absolute left-4 top-4 flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-red-500/50" />
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/50" />
            <div className="h-2.5 w-2.5 rounded-full bg-green-500/50" />
          </div>

          <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" />

          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/5 px-4 py-1.5">
              <div className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse-glow" />
              <span className="font-mono text-xs text-cyan">$ opsy init</span>
            </div>

            <h2 className="mx-auto mt-6 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
              Start shipping with confidence
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Join engineering teams using Opsy to build, deploy, observe, and secure their
              software.
            </p>

            <Link
              href={routePaths.register}
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-cyan px-8 py-3.5 font-mono text-sm font-semibold text-background transition-all hover:glow-cyan hover:brightness-110"
            >
              GET STARTED FREE
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
