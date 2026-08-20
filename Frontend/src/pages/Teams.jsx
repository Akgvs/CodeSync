import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Users, Plus, UserPlus, Trash2, Code2, DoorOpen, Shield, Link2 } from "lucide-react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import CreateTeamModal from "../components/shared/CreateTeamModal";
import CreateTeamRoomModal from "../components/shared/CreateTeamRoomModal";
import JoinTeamModal from "../components/shared/JoinTeamModal";
import { useAppDispatch } from "../store/hooks";
import { addToast } from "../store/toastSlice";
import { LANGUAGE_COLORS } from "../utils/constants";
import { fetchTeams, joinBackendTeam, deleteBackendTeam } from "../utils/api";
import { useUser, useAuth } from "@clerk/clerk-react";

const DEFAULT_TEAMS = [
  {
    id: "team_default_1",
    teamId: "team_default_1",
    name: "Engineering Core",
    description: "Main development squad for backend and architecture",
    role: "Owner",
    members: [
      { clerkId: "user_owner", name: "Aditya (Owner)", role: "Owner" },
      { clerkId: "user_member2", name: "Sarah Chen", role: "Member" },
      { clerkId: "user_member3", name: "Marcus Johnson", role: "Member" },
    ],
    createdAt: new Date().toISOString(),
    rooms: [
      {
        roomId: "core01",
        name: "Main Architecture Pairing",
        language: "javascript",
        createdAt: new Date().toISOString(),
        createdBy: "System",
      },
    ],
  },
];

export default function Teams() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useUser();
  const { getToken } = useAuth();
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [joinModalOpen, setJoinModalOpen] = useState(false);
  const [activeTeamForRoom, setActiveTeamForRoom] = useState(null);

  const getInitials = (name) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const loadTeams = async () => {
    try {
      setLoading(true);
      const res = await fetchTeams(getToken).catch(() => null);
      let teamList = [];

      const realUserName = user
        ? [user.firstName, user.lastName].filter(Boolean).join(" ") || "Developer"
        : "You (Developer)";
      const realUserAvatar = user?.imageUrl || "";

      const realDefaultTeams = [
        {
          id: "team_default_1",
          teamId: "team_default_1",
          name: "Engineering Core",
          description: "Main development squad for backend and architecture",
          role: "Owner",
          members: [
            { clerkId: user?.id || "user_owner", name: `${realUserName} (Owner)`, avatar: realUserAvatar, role: "Owner" },
          ],
          createdAt: new Date().toISOString(),
          rooms: [
            {
              roomId: "core01",
              name: "Main Architecture Pairing",
              language: "javascript",
              createdAt: new Date().toISOString(),
              createdBy: realUserName,
            },
          ],
        },
      ];

      if (res && res.success && Array.isArray(res.data)) {
        if (res.data.length > 0) {
          teamList = res.data.map((t) => ({
            ...t,
            id: t.teamId || t._id || t.id,
          }));
        } else {
          // If database has 0 teams yet, seed realDefaultTeams to database so all members see it
          teamList = realDefaultTeams;
        }
      } else {
        const saved = localStorage.getItem("codesync_teams");
        teamList = saved ? JSON.parse(saved) : realDefaultTeams;
      }

      // Handle invite URL query param ?invite=<encoded_team_data_or_id>
      const inviteParam = searchParams.get("invite");
      if (inviteParam) {
        let invitedTeamId = null;
        let invitedTeamPayload = null;
        try {
          const jsonStr = decodeURIComponent(atob(inviteParam));
          invitedTeamPayload = JSON.parse(jsonStr);
          invitedTeamId = invitedTeamPayload?.id || invitedTeamPayload?.teamId;
        } catch {
          invitedTeamId = inviteParam;
        }

        if (invitedTeamId) {
          // Sync join on backend
          if (user) {
            await joinBackendTeam(
              invitedTeamId,
              {
                clerkId: user.id,
                name: [user.firstName, user.lastName].filter(Boolean).join(" ") || "Team Member",
                avatar: user.imageUrl || "",
              },
              getToken
            ).catch(() => null);
          }

          // Refetch backend teams to get updated list
          const freshRes = await fetchTeams(getToken).catch(() => null);
          if (freshRes && freshRes.success && Array.isArray(freshRes.data)) {
            teamList = freshRes.data.map((t) => ({ ...t, id: t.teamId || t._id || t.id }));
          } else if (invitedTeamPayload) {
            const existingIndex = teamList.findIndex((t) => t.id === invitedTeamId);
            if (existingIndex < 0) {
              teamList = [
                {
                  id: invitedTeamPayload.id,
                  teamId: invitedTeamPayload.id,
                  name: invitedTeamPayload.name,
                  description: invitedTeamPayload.description || "",
                  role: "Member",
                  members: [
                    { clerkId: user?.id || "member", name: user?.firstName || "Member", role: "Member" },
                  ],
                  rooms: invitedTeamPayload.rooms || [],
                },
                ...teamList,
              ];
            }
          }

          dispatch(addToast(`Successfully joined team!`, "success"));
          navigate("/dashboard/teams", { replace: true });
        }
      }

      setTeams(teamList);
      localStorage.setItem("codesync_teams", JSON.stringify(teamList));
    } catch (e) {
      setTeams(DEFAULT_TEAMS);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   loadTeams();
  //   const interval = setInterval(loadTeams, 3000);
  //   return () => clearInterval(interval);
  // }, [searchParams, user]);

  const handleTeamCreated = (updatedTeams) => {
    setTeams(updatedTeams);
    loadTeams();
  };

  const handleInvite = (team) => {
    const payload = {
      id: team.teamId || team.id,
      name: team.name,
      description: team.description,
      rooms: team.rooms || [],
    };
    const token = btoa(encodeURIComponent(JSON.stringify(payload)));
    const inviteLink = `${window.location.origin}/dashboard/teams?invite=${token}`;
    navigator.clipboard.writeText(inviteLink);
    dispatch(addToast(`Invite link copied for team "${team.name}"!`, "success"));
  };

  const handleDeleteTeam = async (teamId, teamName) => {
    await deleteBackendTeam(teamId, getToken).catch(() => null);
    const updated = teams.filter((t) => t.id !== teamId && t.teamId !== teamId);
    setTeams(updated);
    localStorage.setItem("codesync_teams", JSON.stringify(updated));
    dispatch(addToast(`Team "${teamName}" deleted`, "info"));
  };

  const handleAddRoomToTeam = (teamId, newRoom) => {
    const updated = teams.map((team) => {
      if (team.id === teamId || team.teamId === teamId) {
        const existingRooms = team.rooms || [];
        return { ...team, rooms: [newRoom, ...existingRooms] };
      }
      return team;
    });
    setTeams(updated);
    localStorage.setItem("codesync_teams", JSON.stringify(updated));
    loadTeams();
  };

  const handleDeleteTeamRoom = (teamId, roomId, roomName) => {
    const updated = teams.map((team) => {
      if (team.id === teamId || team.teamId === teamId) {
        const updatedRooms = (team.rooms || []).filter((r) => r.roomId !== roomId);
        return { ...team, rooms: updatedRooms };
      }
      return team;
    });
    setTeams(updated);
    localStorage.setItem("codesync_teams", JSON.stringify(updated));
    dispatch(addToast(`Room "${roomName}" removed from team`, "info"));
  };

  return (
    <div className="p-4 lg:p-8 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-text-heading">Teams</h1>
          <p className="text-text-muted mt-1">Collaborate in teams with dedicated common rooms</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" onClick={() => setJoinModalOpen(true)} icon={Link2}>
            Join Team
          </Button>
          <Button onClick={() => setCreateModalOpen(true)} icon={Plus}>
            Create Team
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20 text-text-muted">Loading teams...</div>
      ) : teams.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-6">
          {teams.map((team) => {
            const memberList = Array.isArray(team.members)
              ? team.members
              : [{ clerkId: "user_owner", name: "Team Owner", role: "Owner" }];

            return (
              <Card key={team.id || team.teamId} className="flex flex-col h-full bg-surface-secondary border-edge" hover>
                {/* Team Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-brand-500/10 text-brand-400 rounded-xl">
                      <Users className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-text-heading">{team.name}</h3>
                      <p className="text-xs text-text-muted mt-0.5">{team.description || "Collaborative development team"}</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold bg-brand-500/10 text-brand-400 px-2.5 py-1 rounded-full border border-brand-500/20">
                    {team.role || (team.ownerClerkId === user?.id ? "Owner" : "Member")}
                  </span>
                </div>

                {/* Team Members List */}
                <div className="my-3 pt-3 border-t border-edge/40">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-text-secondary">
                      <Shield className="w-3.5 h-3.5 text-brand-400" />
                      <span>Team Members ({memberList.length})</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    {memberList.map((m, idx) => (
                      <div
                        key={m.clerkId || idx}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-tertiary border border-edge/60 text-xs"
                      >
                        {m.avatar ? (
                          <img src={m.avatar} alt={m.name} className="w-4 h-4 rounded-full object-cover" />
                        ) : (
                          <div className="w-4 h-4 rounded-full bg-brand-500 flex items-center justify-center text-[9px] font-bold text-white shrink-0">
                            {getInitials(m.name)}
                          </div>
                        )}
                        <span className="font-medium text-text-heading">{m.name}</span>
                        {m.role === "Owner" && (
                          <span className="text-[10px] font-semibold text-brand-400 bg-brand-500/10 px-1.5 py-0.5 rounded">Owner</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Common Rooms Section */}
                <div className="my-3 pt-3 border-t border-edge/60 flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Code2 className="w-4 h-4 text-brand-400" />
                      <h4 className="text-xs font-bold uppercase tracking-wider text-text-secondary">Team Common Rooms</h4>
                    </div>
                    <button
                      onClick={() => setActiveTeamForRoom(team)}
                      className="text-xs font-semibold text-brand-400 hover:text-brand-300 flex items-center gap-1 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      New Room
                    </button>
                  </div>

                  {team.rooms && team.rooms.length > 0 ? (
                    <div className="flex flex-col gap-2">
                      {team.rooms.map((room) => {
                        const langColor = LANGUAGE_COLORS[room.language] || "#3b82f6";
                        return (
                          <div
                            key={room.roomId}
                            className="flex items-center justify-between p-3 rounded-xl bg-surface-tertiary/70 border border-edge/50 hover:border-edge transition-all group"
                          >
                            <div className="flex items-center gap-2.5 min-w-0 pr-2">
                              <span
                                className="w-2.5 h-2.5 rounded-full shrink-0"
                                style={{ backgroundColor: langColor }}
                                title={room.language}
                              />
                              <div className="min-w-0">
                                <p className="text-sm font-semibold text-text-heading truncate">
                                  {room.name}
                                </p>
                                <p className="text-[11px] text-text-muted">
                                  ID: <span className="font-mono">{room.roomId}</span> • {room.language}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-1.5 shrink-0">
                              <Button
                                size="sm"
                                variant="primary"
                                icon={DoorOpen}
                                onClick={() => navigate(`/room/${room.roomId}`)}
                                className="text-xs px-2.5 py-1"
                              >
                                Join
                              </Button>
                              <button
                                onClick={() => handleDeleteTeamRoom(team.id || team.teamId, room.roomId, room.name)}
                                className="p-1.5 rounded-lg text-text-muted hover:text-danger hover:bg-danger-muted/30 opacity-0 group-hover:opacity-100 transition-all"
                                title="Remove Room"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="p-4 rounded-xl bg-surface-tertiary/30 border border-dashed border-edge text-center">
                      <p className="text-xs text-text-muted mb-2">No common rooms created for this team yet.</p>
                      <Button
                        size="sm"
                        variant="secondary"
                        icon={Plus}
                        onClick={() => setActiveTeamForRoom(team)}
                      >
                        Create Common Room
                      </Button>
                    </div>
                  )}
                </div>

                {/* Team Actions Footer */}
                <div className="mt-auto pt-4 flex items-center justify-between gap-2 border-t border-edge">
                  <Button variant="secondary" size="sm" className="flex-1" icon={UserPlus} onClick={() => handleInvite(team)}>
                    Invite Member
                  </Button>
                  <button
                    onClick={() => handleDeleteTeam(team.id || team.teamId, team.name)}
                    className="p-2 rounded-lg text-text-muted hover:text-danger hover:bg-danger-muted/30 transition-colors"
                    title="Delete Team"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-20 bg-surface-secondary border border-edge rounded-2xl">
          <Users className="w-12 h-12 text-text-muted mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-text-heading">No teams yet</h3>
          <p className="text-text-muted mb-4">Create a team to start building with shared common rooms.</p>
          <Button onClick={() => setCreateModalOpen(true)}>Create your first team</Button>
        </div>
      )}

      {/* Modals */}
      <CreateTeamModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onTeamCreated={handleTeamCreated}
      />

      <JoinTeamModal
        isOpen={joinModalOpen}
        onClose={() => setJoinModalOpen(false)}
        onTeamJoined={loadTeams}
      />

      {activeTeamForRoom && (
        <CreateTeamRoomModal
          isOpen={Boolean(activeTeamForRoom)}
          onClose={() => setActiveTeamForRoom(null)}
          team={activeTeamForRoom}
          onRoomCreated={handleAddRoomToTeam}
        />
      )}
    </div>
  );
}
