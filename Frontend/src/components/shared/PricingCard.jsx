import { Check } from "lucide-react";
import Button from "../ui/Button";

export default function PricingCard({ plan }) {
  return (
    <div
      className={`relative rounded-2xl border p-8 flex flex-col ${
        plan.popular
          ? "bg-surface-secondary border-brand-500/30 shadow-xl shadow-brand-500/10"
          : "bg-surface-secondary border-edge hover:border-edge-hover"
      } transition-all duration-300`}
    >
      {/* Popular badge */}
      {plan.popular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="px-4 py-1 text-xs font-semibold bg-brand-500 text-white rounded-full shadow-lg shadow-brand-500/30">
            Most Popular
          </span>
        </div>
      )}

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
        variant={plan.popular ? "primary" : "outline"}
        size="lg"
        className="w-full"
      >
        {plan.cta}
      </Button>
    </div>
  );
}
