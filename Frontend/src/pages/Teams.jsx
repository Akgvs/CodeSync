import { useState, useEffect } from "react";
import { Users, Plus, UserPlus } from "lucide-react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { useAppDispatch } from "../store/hooks";
import { addToast } from "../store/toastSlice";

export default function Teams() {
  const dispatch = useAppDispatch();
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Currently fetching teams is not implemented in backend, so we just set empty for showcase
    setLoading(false);
    setTeams([]);
  }, []);

  const handleCreateTeam = () => {
    dispatch(addToast("Team creation coming soon!", "info"));
  };

  const handleInvite = (teamName) => {
    dispatch(addToast(`Invite link generated for ${teamName}`, "success"));
  };

  return (
    <div className="p-4 lg:p-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-text-heading">Teams</h1>
          <p className="text-text-muted mt-1">Manage your teams and collaborations</p>
        </div>
        <Button onClick={handleCreateTeam} icon={Plus}>Create Team</Button>
      </div>

      {loading ? (
        <div className="text-center py-20 text-text-muted">Loading teams...</div>
      ) : teams.length > 0 ? (
        <div className="grid sm:grid-cols-2 gap-4">
          {teams.map(team => (
            <Card key={team.id} className="flex flex-col h-full" hover>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-brand-500/10 text-brand-400 rounded-xl">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-text-heading">{team.name}</h3>
                    <p className="text-sm text-text-muted">{team.members} members</p>
                  </div>
                </div>
                <span className="text-xs font-medium bg-surface-tertiary px-2 py-1 rounded border border-edge text-text-secondary">
                  {team.role}
                </span>
              </div>
              <div className="mt-auto pt-4 flex gap-2 border-t border-edge">
                <Button variant="secondary" size="sm" className="flex-1" icon={UserPlus} onClick={() => handleInvite(team.name)}>
                  Invite
                </Button>
                <Button variant="ghost" size="sm" className="flex-1 text-text-muted">
                  View
                </Button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-surface-secondary border border-edge rounded-2xl">
          <Users className="w-12 h-12 text-text-muted mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-text-heading">No teams yet</h3>
          <p className="text-text-muted mb-4">Create a team to easily collaborate with multiple people.</p>
          <Button onClick={handleCreateTeam}>Create your first team</Button>
        </div>
      )}
    </div>
  );
}
