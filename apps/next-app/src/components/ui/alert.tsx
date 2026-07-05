import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

type AlertVariant = "default" | "destructive" | "success";

const alertClasses: Record<AlertVariant, string> = {
  default: "border-slate-200 bg-slate-50 text-slate-900",
  destructive: "border-rose-200 bg-rose-50 text-rose-900",
  success: "border-emerald-200 bg-emerald-50 text-emerald-900",
};

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
}

export function Alert({
  className,
  variant = "default",
  ...props
}: AlertProps) {
  return (
    <div
      role="alert"
      className={cn(
        "rounded-2xl border px-4 py-3 text-sm leading-6",
        alertClasses[variant],
        className,
      )}
      {...props}
    />
  );
}

