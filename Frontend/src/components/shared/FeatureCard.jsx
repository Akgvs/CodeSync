import { FEATURE_COLOR_MAP } from "../../utils/colorMaps";

export default function FeatureCard({ icon: Icon, title, description, color = "brand" }) {
  const colorClasses = FEATURE_COLOR_MAP[color] || FEATURE_COLOR_MAP.brand;

  return (
    <div
      className={`group relative p-6 rounded-2xl bg-surface-secondary border border-edge hover:border-edge-hover transition-all duration-300 hover:shadow-xl ${colorClasses.glow}`}
    >
      {/* Icon */}
      <div className={`w-12 h-12 rounded-xl ${colorClasses.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
        <Icon className={`w-6 h-6 ${colorClasses.text}`} />
      </div>

      {/* Content */}
      <h3 className="text-lg font-semibold text-text-heading mb-2">{title}</h3>
      <p className="text-sm text-text-muted leading-relaxed">{description}</p>
    </div>
  );
}
