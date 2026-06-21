import { Link } from "react-router-dom";
import { Code2, Users, Zap, Globe, ArrowRight } from "lucide-react";
import TestimonialCard from "../components/shared/TestimonialCard";
import Button from "../components/ui/Button";
import { TESTIMONIALS, STATS } from "../utils/constants";

const VALUES = [
  {
    icon: Code2,
    title: "Developer-First",
    description: "Built by developers, for developers. Every feature is designed around real coding workflows.",
  },
  {
    icon: Users,
    title: "Collaboration at Core",
    description: "We believe the best software is built together. Real-time collaboration is in our DNA.",
  },
  {
    icon: Zap,
    title: "Speed Matters",
    description: "Sub-50ms latency on edits. Your collaboration should feel instant, not laggy.",
  },
  {
    icon: Globe,
    title: "Open & Accessible",
    description: "Free tier for everyone. We're committed to making collaborative coding accessible worldwide.",
  },
];

export default function About() {
  return (
    <div className="pt-24 pb-20 overflow-hidden">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20">
        <h1 className="text-4xl lg:text-5xl font-extrabold text-text-heading mb-5">
          Building the future of{" "}
          <span className="text-gradient">collaborative coding</span>
        </h1>
        <p className="text-lg text-text-muted max-w-2xl mx-auto leading-relaxed">
          CodeSync was born from a simple idea: coding is better together. We're
          on a mission to make real-time collaboration seamless for every developer.
        </p>
      </section>

      {/* Stats */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-28">
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
      </section>

      {/* Our Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-28">
        <div className="text-center mb-14">
          <h2 className="text-3xl lg:text-4xl font-bold text-text-heading mb-4">Our Values</h2>
          <p className="text-text-muted max-w-xl mx-auto">
            The principles that guide everything we build at CodeSync.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {VALUES.map((value) => {
            const Icon = value.icon;
            return (
              <div
                key={value.title}
                className="p-6 rounded-2xl bg-surface-secondary border border-edge hover:border-edge-hover transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-500/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-brand-400" />
                </div>
                <h3 className="text-lg font-semibold text-text-heading mb-2">{value.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{value.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-28">
        <div className="text-center mb-14">
          <h2 className="text-3xl lg:text-4xl font-bold text-text-heading mb-4">
            Loved by developers worldwide
          </h2>
          <p className="text-text-muted max-w-xl mx-auto">
            Hear what our community has to say about coding collaboratively with CodeSync.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t) => (
            <TestimonialCard key={t.name} {...t} />
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
              Join our growing community
            </h2>
            <p className="text-white/70 max-w-xl mx-auto mb-8 leading-relaxed">
              Thousands of developers are already building faster with CodeSync.
              Start your journey today.
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
