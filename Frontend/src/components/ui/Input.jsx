import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function Input({
  label,
  type = "text",
  error,
  icon: Icon,
  className = "",
  id,
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-text-secondary">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none">
            <Icon className="w-4 h-4" />
          </div>
        )}
        <input
          id={id}
          type={inputType}
          className={`
            w-full px-4 py-2.5 rounded-xl text-sm
            bg-surface-tertiary/50 text-text-body
            border transition-all duration-200
            placeholder:text-text-muted
            focus:outline-none focus:border-brand-500/50 focus:ring-2 focus:ring-brand-500/20
            ${Icon ? "pl-10" : ""}
            ${isPassword ? "pr-10" : ""}
            ${error ? "border-danger/50 focus:border-danger/50 focus:ring-danger/20" : "border-edge hover:border-edge-hover"}
          `}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-body transition-colors"
            tabIndex={-1}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}
      </div>
      {error && (
        <p className="text-xs text-danger mt-0.5">{error}</p>
      )}
    </div>
  );
}
