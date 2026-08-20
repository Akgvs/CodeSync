import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, LogIn, FolderOpen, Users } from "lucide-react";
import StatCard from "../components/shared/StatCard";
import CreateRoomModal from "../components/shared/CreateRoomModal";
import { ACTION_COLOR_MAP } from "../utils/colorMaps";
import { fetchTeams } from "../utils/api";
import { useAuth } from "@clerk/clerk-react";

const QUICK_ACTIONS = [
  { label: "Create Room", description: "Start a new coding session", icon: Plus, color: "brand" },
  { label: "Join Room", description: "Join with a room ID", icon: LogIn, color: "success" },
];

export default function Dashboard() {
  const [createRoomOpen, setCreateRoomOpen] = useState(false);
  const navigate = useNavigate();
  const { getToken } = useAuth();

  const [stats, setStats] = useState([
    { label: "Total Projects", value: "0", change: "Active rooms & team common rooms", icon: FolderOpen, color: "brand" },
    { label: "Collaborators", value: "0", change: "Unique team members", icon: Users, color: "info" },
  ]);

  useEffect(() => {
    async function calculateRealStats() {
      try {
        const liveRes = await fetchLiveRoomStats().catch(() => null);
        const res = await fetchTeams(getToken).catch(() => null);

        let activeRooms = liveRes?.data?.activeRooms ?? 0;
        let activeCollaborators = liveRes?.data?.activeCollaborators ?? 0;

        // If no active live rooms in Redis, fall back to team counts for display
        let teamList = [];
        if (res && res.success && Array.isArray(res.data)) {
          teamList = res.data;
        } else {
          const savedTeams = localStorage.getItem("codesync_teams");
          teamList = savedTeams ? JSON.parse(savedTeams) : [];
        }

        const teamRoomsCount = teamList.reduce((acc, t) => acc + (t.rooms?.length || 0), 0);
        const collaboratorSet = new Set();
        teamList.forEach((t) => {
          if (Array.isArray(t.members)) {
            t.members.forEach((m) => {
              if (m.name || m.clerkId) collaboratorSet.add(m.name || m.clerkId);
            });
          }
        });

        // Use live active counts if present, otherwise team baseline
        const totalProjectsCount = activeRooms > 0 ? activeRooms : teamRoomsCount;
        const totalCollaboratorsCount = activeCollaborators > 0 ? activeCollaborators : collaboratorSet.size;

        setStats([
          {
            label: "Total Active Projects",
            value: String(totalProjectsCount),
            change: totalProjectsCount === 1 ? "1 active room live" : `${totalProjectsCount} active rooms live`,
            icon: FolderOpen,
            color: "brand",
          },
          {
            label: "Connected Collaborators",
            value: String(totalCollaboratorsCount),
            change: totalCollaboratorsCount === 1 ? "1 collaborator connected" : `${totalCollaboratorsCount} collaborators connected`,
            icon: Users,
            color: "info",
          },
        ]);
      } catch (e) {
        console.error("Failed to compute stats:", e);
      }
    }

    calculateRealStats();
    const interval = setInterval(calculateRealStats, 3000);
    return () => clearInterval(interval);
  }, [getToken, createRoomOpen]);

  const handleQuickAction = (action) => {
    if (action === "Create Room") {
      setCreateRoomOpen(true);
    } else if (action === "Join Room") {
      navigate("/join");
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
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-text-heading mb-4">Quick Actions</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {QUICK_ACTIONS.map((action) => {
            const Icon = action.icon;
            const colorClass = ACTION_COLOR_MAP[action.color] || "bg-brand-muted text-brand-400";
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
