import { Link } from "react-router-dom";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import Button from "../components/ui/Button";
import FeatureCard from "../components/shared/FeatureCard";
import PricingCard from "../components/shared/PricingCard";
import TestimonialCard from "../components/shared/TestimonialCard";
import HeroEditor from "../components/shared/HeroEditor";
import { FEATURES, HOW_IT_WORKS, PRICING_PLANS, TESTIMONIALS, STATS } from "../utils/constants";

/* ── Section Header (DRY — reused across multiple sections) ── */
function SectionHeader({ badge, title, description }) {
  return (
    <div className="text-center max-w-2xl mx-auto mb-14">
      {badge && (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-brand-500/10 text-brand-400 border border-brand-500/20 mb-4">
          <Sparkles className="w-3 h-3" />
          {badge}
        </span>
      )}
      <h2 className="text-3xl lg:text-4xl font-bold text-text-heading mb-4">{title}</h2>
      <p className="text-text-muted leading-relaxed">{description}</p>
    </div>
  );
}

/* ── Hero ───────────────────────────────────────────── */
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-brand-500/8 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-surface-primary to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium bg-brand-500/10 text-brand-400 border border-brand-500/20 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
            Now in Public Beta — Join 89,000+ developers
          </span>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-text-heading leading-tight mb-6">
            Code Together.{" "}
            <span className="text-gradient">Build Faster.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg lg:text-xl text-text-muted max-w-2xl leading-relaxed mb-10">
            Real-time collaborative coding platform where developers can create rooms,
            share invite links, and code together instantly.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Link to="/signup">
              <Button variant="glow" size="lg" iconRight={ArrowRight}>
                Start Coding
              </Button>
            </Link>
            <Button variant="secondary" size="lg" icon={Play}>
              Watch Demo
            </Button>
          </div>

          {/* Hero Editor */}
          <HeroEditor />
        </div>
      </div>
    </section>
  );
}

/* ── Features ──────────────────────────────────────── */
function FeaturesSection() {
  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Features"
          title="Everything you need to code collaboratively"
          description="Powerful tools designed for modern development teams. Real-time editing, execution, and communication — all in one place."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── How It Works ──────────────────────────────────── */
function HowItWorks() {
  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Simple Workflow"
          title="Start collaborating in 3 steps"
          description="No complex setup. Create a room, share the link, and start coding together in seconds."
        />
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {HOW_IT_WORKS.map((step, i) => (
            <div key={step.step} className="relative text-center">
              {/* Connector line */}
              {i < HOW_IT_WORKS.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-px bg-gradient-to-r from-edge to-transparent" />
              )}

              {/* Step number */}
              <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-brand-500/10 border border-brand-500/20 mb-5 mx-auto">
                <step.icon className="w-8 h-8 text-brand-400" />
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-brand-500 text-white text-xs font-bold flex items-center justify-center">
                  {step.step}
                </span>
              </div>

              <h3 className="text-lg font-semibold text-text-heading mb-2">{step.title}</h3>
              <p className="text-sm text-text-muted leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Stats ─────────────────────────────────────────── */
function StatsSection() {
  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-3 gap-8">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-8 rounded-2xl bg-surface-secondary border border-edge"
            >
              <stat.icon className="w-8 h-8 text-brand-400 mx-auto mb-3" />
              <p className="text-3xl lg:text-4xl font-extrabold text-text-heading mb-1">{stat.value}</p>
              <p className="text-sm text-text-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Testimonials ──────────────────────────────────── */
function TestimonialsSection() {
  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Testimonials"
          title="Loved by developers worldwide"
          description="Hear what our community has to say about coding collaboratively with CodeSync."
        />
        <div className="grid md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t) => (
            <TestimonialCard key={t.name} {...t} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Pricing ───────────────────────────────────────── */
function PricingSection() {
  return (
    <section id="pricing" className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Pricing"
          title="Simple, transparent pricing"
          description="Start for free. Upgrade when your team grows. No hidden fees, no surprises."
        />
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {PRICING_PLANS.map((plan) => (
            <PricingCard key={plan.name} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── CTA Banner ────────────────────────────────────── */
function CTABanner() {
  return (
    <section id="about" className="py-20 lg:py-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-brand animate-gradient-shift" />
          <div className="absolute inset-0 bg-dots opacity-20" />

          <div className="relative px-8 py-16 sm:px-16 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Ready to code together?
            </h2>
            <p className="text-white/70 max-w-xl mx-auto mb-8 leading-relaxed">
              Join thousands of developers who are already building faster with CodeSync.
              Get started in seconds — no credit card required.
            </p>
            <Link to="/signup">
              <Button
                variant="secondary"
                size="lg"
                iconRight={ArrowRight}
                className="bg-white/10 hover:bg-white/20 border-white/20 text-white backdrop-blur-sm"
              >
                Get Started Free
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Landing Page ──────────────────────────────────── */
export default function Landing() {
  return (
    <div className="overflow-hidden">
      <Hero />
      <FeaturesSection />
      <HowItWorks />
      <StatsSection />
      <TestimonialsSection />
      <PricingSection />
      <CTABanner />
    </div>
  );
}
