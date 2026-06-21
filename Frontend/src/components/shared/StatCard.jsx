import Card from "../ui/Card";
import { STAT_COLOR_MAP } from "../../utils/colorMaps";

export default function StatCard({ label, value, change, icon: Icon, color = "brand" }) {
  const colorClasses = STAT_COLOR_MAP[color] || STAT_COLOR_MAP.brand;

  return (
    <Card className={`border-l-4 ${colorClasses.border}`} hover={false}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-text-muted mb-1">{label}</p>
          <p className="text-3xl font-bold text-text-heading">{value}</p>
          {change && (
            <p className="text-xs text-text-muted mt-2">{change}</p>
          )}
        </div>
        <div className={`p-3 rounded-xl ${colorClasses.icon}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </Card>
  );
}
