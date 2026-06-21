import { Sparkles } from "lucide-react";
import PricingCard from "../components/shared/PricingCard";
import { PRICING_PLANS } from "../utils/constants";

export default function Pricing() {
  return (
    <div className="pt-24 pb-20 overflow-hidden">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-brand-500/10 text-brand-400 border border-brand-500/20 mb-6">
          <Sparkles className="w-3 h-3" />
          Pricing
        </span>
        <h1 className="text-4xl lg:text-5xl font-extrabold text-text-heading mb-5">
          Simple, <span className="text-gradient">transparent</span> pricing
        </h1>
        <p className="text-lg text-text-muted max-w-2xl mx-auto leading-relaxed">
          Start for free. Upgrade when your team grows. No hidden fees, no surprises.
        </p>
      </section>

      {/* Pricing Cards */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mb-28">
        <div className="grid md:grid-cols-2 gap-8">
          {PRICING_PLANS.map((plan) => (
            <PricingCard key={plan.name} plan={plan} />
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-text-heading text-center mb-10">
          Frequently Asked Questions
        </h2>
        <div className="flex flex-col gap-4">
          {[
            {
              q: "Can I switch plans later?",
              a: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.",
            },
            {
              q: "Is there a free trial for Pro?",
              a: "Yes, every Pro subscription starts with a 14-day free trial. No credit card required.",
            },
            {
              q: "What payment methods do you accept?",
              a: "We accept all major credit cards, PayPal, and bank transfers for annual plans.",
            },
            {
              q: "Can I cancel anytime?",
              a: "Absolutely. You can cancel your subscription at any time with no cancellation fees.",
            },
          ].map((faq, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl bg-surface-secondary border border-edge hover:border-edge-hover transition-colors"
            >
              <h3 className="text-sm font-semibold text-text-heading mb-2">{faq.q}</h3>
              <p className="text-sm text-text-muted leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
