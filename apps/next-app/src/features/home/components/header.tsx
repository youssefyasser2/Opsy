"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

import { routePaths } from "@/lib/config/routes";

const NAV_ITEMS = [
  { label: "Features", href: "#features" },
  { label: "Integrations", href: "#integrations" },
  { label: "Security", href: "#security" },
] as const;

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-background/60 backdrop-blur-2xl">
      <div className="w-full px-8 lg:px-12 xl:px-16">
        <div className="flex h-20 items-center justify-between">
          <Link href={routePaths.home} className="flex items-center -ml-4">
            <Image
              src="/logo.svg"
              alt="Opsy Logo"
              width={80}
              height={80}
              className="text-cyan drop-shadow-[0_0_12px_rgba(34,211,238,0.3)]"
            />
            <span className="font-sans text-2xl font-bold tracking-tight text-foreground -ml-3">
              Opsy
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="font-mono text-xs uppercase tracking-widest text-muted-foreground/80 transition-colors hover:text-cyan"
              >
                {item.label}
              </a>
            ))}
            <Link
              href={routePaths.login}
              className="font-mono text-xs uppercase tracking-widest text-muted-foreground/80 transition-colors hover:text-cyan"
            >
              Sign In
            </Link>
            <Link
              href={routePaths.register}
              className="rounded-lg bg-gradient-to-r from-cyan-400 to-cyan-500 px-6 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-background shadow-lg shadow-cyan/15 transition-all hover:shadow-cyan/35 hover:brightness-110 active:scale-95"
            >
              GET STARTED
            </Link>
          </nav>

          <button
            onClick={() => setOpen((value) => !value)}
            className="text-foreground md:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-border/60 bg-background/95 md:hidden">
          <nav className="flex flex-col gap-1 px-6 py-4">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="py-3 font-mono text-xs uppercase tracking-widest text-muted-foreground"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <Link
              href={routePaths.login}
              className="py-3 font-mono text-xs uppercase tracking-widest text-muted-foreground"
              onClick={() => setOpen(false)}
            >
              Sign In
            </Link>
            <Link
              href={routePaths.register}
              className="mt-2 rounded-lg bg-gradient-to-r from-cyan-400 to-cyan-500 px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider text-background text-center shadow-lg shadow-cyan/15"
              onClick={() => setOpen(false)}
            >
              GET STARTED
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
