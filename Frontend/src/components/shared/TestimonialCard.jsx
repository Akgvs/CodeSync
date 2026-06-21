import { Quote } from "lucide-react";
import Avatar from "../ui/Avatar";

export default function TestimonialCard({ name, role, quote, avatar }) {
  return (
    <div
      className="relative p-6 rounded-2xl bg-surface-secondary border border-edge hover:border-edge-hover transition-all duration-300 group"
    >
      {/* Quote icon */}
      <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <Quote className="w-10 h-10 text-brand-400" />
      </div>

      {/* Quote text */}
      <p className="text-sm text-text-body leading-relaxed mb-6 relative z-10">
        "{quote}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-3">
        <Avatar name={name} src={avatar} size="md" />
        <div>
          <p className="text-sm font-semibold text-text-heading">{name}</p>
          <p className="text-xs text-text-muted">{role}</p>
        </div>
      </div>
    </div>
  );
}
