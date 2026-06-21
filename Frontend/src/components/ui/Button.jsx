import { Loader2 } from "lucide-react";

const VARIANTS = {
  primary:
    "bg-brand-500 hover:bg-brand-400 text-white shadow-lg shadow-brand-500/20 hover:shadow-brand-400/30",
  secondary:
    "bg-surface-tertiary hover:bg-surface-elevated text-text-body border border-edge hover:border-edge-hover",
  ghost:
    "bg-transparent hover:bg-surface-glass text-text-secondary hover:text-text-body",
  danger:
    "bg-danger/10 hover:bg-danger/20 text-danger border border-danger/20 hover:border-danger/30",
  outline:
    "bg-transparent hover:bg-brand-500/10 text-brand-400 border border-brand-500/30 hover:border-brand-400/50",
  glow:
    "bg-brand-500 hover:bg-brand-400 text-white shadow-lg shadow-brand-500/30 hover:shadow-brand-400/50",
};

const SIZES = {
  sm: "px-3 py-1.5 text-xs gap-1.5 rounded-lg",
  md: "px-5 py-2.5 text-sm gap-2 rounded-xl",
  lg: "px-7 py-3.5 text-base gap-2.5 rounded-xl",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  icon: Icon,
  iconRight: IconRight,
  className = "",
  ...props
}) {
  return (
    <button
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center font-medium
        transition-all duration-200 cursor-pointer
        hover:scale-[1.02] active:scale-[0.97]
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
        focus-ring
        ${VARIANTS[variant]}
        ${SIZES[size]}
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : Icon ? (
        <Icon className="w-4 h-4" />
      ) : null}
      {children}
      {IconRight && !loading && <IconRight className="w-4 h-4" />}
    </button>
  );
}
