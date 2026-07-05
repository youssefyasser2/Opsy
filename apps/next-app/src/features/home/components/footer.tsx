import { GitBranch, Link2, X } from "lucide-react";
import Link from "next/link";

import { routePaths } from "@/lib/config/routes";

const COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Security", href: "#security" },
      { label: "Get Started", href: routePaths.register },
      { label: "Sign In", href: routePaths.login },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "#features" },
      { label: "API Reference", href: "#integrations" },
      { label: "Guides", href: "#security" },
      { label: "Changelog", href: "#cta" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#cta" },
      { label: "Blog", href: "#features" },
      { label: "Careers", href: "#security" },
      { label: "Contact", href: "#footer" },
    ],
  },
] as const;

const SOCIALS = [
  { Icon: GitBranch, label: "GitHub" },
  { Icon: X, label: "Twitter" },
  { Icon: Link2, label: "LinkedIn" },
] as const;

export default function Footer() {
  return (
    <footer id="footer" className="border-t border-border/60 bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="relative flex h-8 w-8 items-center justify-center rounded-full border border-cyan/40 bg-cyan/10">
                <div className="h-2 w-2 rounded-full bg-cyan" />
              </div>
              <span className="font-mono text-lg font-semibold">Opsy</span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              The developer-friendly platform for deploying, observing, and securing your software.
            </p>
          </div>

          {COLUMNS.map((column) => (
            <div key={column.title}>
              <h4 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                {column.title}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith("#") ? (
                      <a
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-8 sm:flex-row">
          <p className="font-mono text-xs text-muted-foreground">
            © 2026 Opsy Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {SOCIALS.map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="text-muted-foreground transition-colors hover:text-cyan"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
