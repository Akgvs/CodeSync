import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, LogIn, Trash2 } from "lucide-react";
import StatCard from "../components/shared/StatCard";
import CreateRoomModal from "../components/shared/CreateRoomModal";
import { DASHBOARD_STATS } from "../utils/constants";
import { useAppDispatch } from "../store/hooks";
import { addToast } from "../store/toastSlice";
import { ACTION_COLOR_MAP } from "../utils/colorMaps";

const QUICK_ACTIONS = [
  { label: "Create Room", description: "Start a new coding session", icon: Plus, color: "brand" },
  { label: "Join Room", description: "Join with a room ID", icon: LogIn, color: "success" },
  { label: "Remove Room", description: "Delete an existing room", icon: Trash2, color: "danger" },
];

export default function Dashboard() {
  const [createRoomOpen, setCreateRoomOpen] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleQuickAction = (action) => {
    if (action === "Create Room") {
      setCreateRoomOpen(true);
    } else if (action === "Join Room") {
      navigate("/join");
    } else if (action === "Remove Room") {
      dispatch(addToast("Select a room to remove (Coming Soon)", "warning"));
    }
  };

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto">
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-text-heading">Dashboard</h1>
        <p className="text-text-muted mt-1">Welcome back! Here's what's happening with your projects.</p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        {DASHBOARD_STATS.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-text-heading mb-4">Quick Actions</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {QUICK_ACTIONS.map((action) => {
            const Icon = action.icon;
            // Provide a fallback for danger color map if it's missing in ACTION_COLOR_MAP
            const colorClass = ACTION_COLOR_MAP[action.color] || "bg-danger-muted text-danger group-hover:bg-danger/20";
            return (
              <button
                key={action.label}
                onClick={() => handleQuickAction(action.label)}
                className="group flex items-center gap-4 p-4 rounded-2xl bg-surface-secondary border border-edge hover:border-edge-hover transition-all duration-200 text-left"
              >
                <div className={`p-3 rounded-xl transition-colors ${colorClass}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-heading">{action.label}</p>
                  <p className="text-xs text-text-muted">{action.description}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Create Room Modal */}
      <CreateRoomModal
        isOpen={createRoomOpen}
        onClose={() => setCreateRoomOpen(false)}
      />
    </div>
  );
}
