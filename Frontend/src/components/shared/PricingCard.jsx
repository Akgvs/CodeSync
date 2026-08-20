import { Check, Loader2, Sparkles } from "lucide-react";
import Button from "../ui/Button";

export default function PricingCard({ plan, onSelectPlan, isCurrentPlan, isLoading }) {
  return (
    <div
      className={`relative rounded-2xl border p-8 flex flex-col ${
        isCurrentPlan
          ? "bg-surface-secondary border-emerald-500/50 shadow-xl shadow-emerald-500/10"
          : plan.popular
          ? "bg-surface-secondary border-brand-500/30 shadow-xl shadow-brand-500/10"
          : "bg-surface-secondary border-edge hover:border-edge-hover"
      } transition-all duration-300`}
    >
      {/* Popular or Current Plan Badge */}
      {isCurrentPlan ? (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="px-4 py-1 text-xs font-semibold bg-emerald-500 text-white rounded-full shadow-lg shadow-emerald-500/30 flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Current Plan
          </span>
        </div>
      ) : plan.popular ? (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="px-4 py-1 text-xs font-semibold bg-brand-500 text-white rounded-full shadow-lg shadow-brand-500/30">
            Most Popular
          </span>
        </div>
      ) : null}

      {/* Plan info */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-text-heading mb-1">{plan.name}</h3>
        <p className="text-sm text-text-muted">{plan.description}</p>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-1 mb-6">
        <span className="text-4xl font-extrabold text-text-heading">{plan.price}</span>
        <span className="text-text-muted text-sm">{plan.period}</span>
      </div>

      {/* Features */}
      <ul className="flex flex-col gap-3 mb-8 flex-1">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-center gap-3 text-sm text-text-body">
            <div className="w-5 h-5 rounded-full bg-brand-500/10 flex items-center justify-center shrink-0">
              <Check className="w-3 h-3 text-brand-400" />
            </div>
            {feature}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Button
        variant={isCurrentPlan ? "outline" : plan.popular ? "primary" : "outline"}
        size="lg"
        className="w-full"
        disabled={isCurrentPlan || isLoading}
        onClick={() => onSelectPlan && onSelectPlan(plan)}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" /> Processing...
          </span>
        ) : isCurrentPlan ? (
          "Active Plan"
        ) : (
          plan.cta
        )}
      </Button>
    </div>
  );
}
