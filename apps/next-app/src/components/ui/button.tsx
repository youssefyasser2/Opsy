import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

type ButtonVariant = "default" | "outline" | "ghost" | "secondary" | "destructive";
type ButtonSize = "sm" | "md" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  default:
    "bg-slate-950 text-white shadow-sm hover:bg-slate-800 focus-visible:outline-slate-950",
  outline:
    "border border-slate-200 bg-white text-slate-950 shadow-sm hover:bg-slate-50 focus-visible:outline-slate-950",
  ghost:
    "bg-transparent text-slate-700 hover:bg-slate-100 hover:text-slate-950 focus-visible:outline-slate-950",
  secondary:
    "bg-slate-100 text-slate-950 shadow-sm hover:bg-slate-200 focus-visible:outline-slate-950",
  destructive:
    "bg-rose-600 text-white shadow-sm hover:bg-rose-500 focus-visible:outline-rose-600",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 rounded-lg px-3 text-sm",
  md: "h-11 rounded-xl px-4 text-sm",
  lg: "h-12 rounded-xl px-5 text-base",
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

export function Button({
  className,
  children,
  variant = "default",
  size = "md",
  loading = false,
  disabled,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl border border-transparent font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-60",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          <span>Loading</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}

export { variantClasses as buttonVariants };

