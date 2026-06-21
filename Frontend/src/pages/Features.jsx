import { Link } from "react-router-dom";
import { Sparkles, ArrowRight } from "lucide-react";
import FeatureCard from "../components/shared/FeatureCard";
import Button from "../components/ui/Button";
import { FEATURES, HOW_IT_WORKS } from "../utils/constants";

export default function Features() {
  return (
    <div className="pt-24 pb-20 overflow-hidden">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-brand-500/10 text-brand-400 border border-brand-500/20 mb-6">
          <Sparkles className="w-3 h-3" />
          Features
        </span>
        <h1 className="text-4xl lg:text-5xl font-extrabold text-text-heading mb-5">
          Everything you need to{" "}
          <span className="text-gradient">code collaboratively</span>
        </h1>
        <p className="text-lg text-text-muted max-w-2xl mx-auto leading-relaxed">
          Powerful tools designed for modern development teams. Real-time editing,
          execution, and communication — all in one place.
        </p>
      </section>

      {/* Feature Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-28">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-28">
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-brand-500/10 text-brand-400 border border-brand-500/20 mb-4">
            <Sparkles className="w-3 h-3" />
            Simple Workflow
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-text-heading mb-4">
            Start collaborating in 3 steps
          </h2>
          <p className="text-text-muted max-w-xl mx-auto">
            No complex setup. Create a room, share the link, and start coding together in seconds.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {HOW_IT_WORKS.map((step, i) => (
            <div key={step.step} className="relative text-center">
              {i < HOW_IT_WORKS.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-px bg-gradient-to-r from-edge to-transparent" />
              )}
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
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-brand animate-gradient-shift" />
          <div className="absolute inset-0 bg-dots opacity-20" />
          <div className="relative px-8 py-16 sm:px-16 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Ready to try these features?
            </h2>
            <p className="text-white/70 max-w-xl mx-auto mb-8 leading-relaxed">
              Get started for free and experience real-time collaboration today.
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
      </section>
    </div>
  );
}
