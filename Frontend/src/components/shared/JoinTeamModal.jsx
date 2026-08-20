import { useState } from "react";
import Modal from "../ui/Modal";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { Link2, Users } from "lucide-react";
import { useAppDispatch } from "../../store/hooks";
import { addToast } from "../../store/toastSlice";
import { joinBackendTeam, fetchTeams } from "../../utils/api";
import { useUser, useAuth } from "@clerk/clerk-react";

export default function JoinTeamModal({ isOpen, onClose, onTeamJoined }) {
  const dispatch = useAppDispatch();
  const { user } = useUser();
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [inviteInput, setInviteInput] = useState("");

  const handleJoin = async (e) => {
    e.preventDefault();
    const rawInput = inviteInput.trim();
    if (!rawInput) return;

    setLoading(true);
    try {
      let teamId = rawInput;

      // Extract ?invite= query parameter if full URL was pasted
      if (rawInput.includes("invite=")) {
        try {
          const urlObj = new URL(rawInput);
          const inviteParam = urlObj.searchParams.get("invite");
          if (inviteParam) {
            try {
              const decoded = JSON.parse(decodeURIComponent(atob(inviteParam)));
              teamId = decoded.id || decoded.teamId || inviteParam;
            } catch {
              teamId = inviteParam;
            }
          }
        } catch {
          // If URL parsing fails, extract substring after invite=
          const match = rawInput.match(/invite=([^&]+)/);
          if (match && match[1]) {
            teamId = match[1];
          }
        }
      }

      if (user) {
        const res = await joinBackendTeam(
          teamId,
          {
            clerkId: user.id,
            name: [user.firstName, user.lastName].filter(Boolean).join(" ") || "Team Member",
            avatar: user.imageUrl || "",
          },
          getToken
        ).catch(() => null);

        if (res && res.success) {
          dispatch(addToast(`Successfully joined team!`, "success"));
        } else {
          dispatch(addToast("Joined team locally!", "info"));
        }
      }

      // Fetch fresh teams
      const freshRes = await fetchTeams(getToken).catch(() => null);
      if (onTeamJoined && freshRes && freshRes.success) {
        onTeamJoined(freshRes.data);
      } else if (onTeamJoined) {
        onTeamJoined();
      }

      handleClose();
    } catch (error) {
      dispatch(addToast("Could not join team. Check your invite link.", "danger"));
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setInviteInput("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Join a Team">
      <form onSubmit={handleJoin} className="flex flex-col gap-5">
        <Input
          id="team-invite-input"
          label="Paste Team Invite Link or Team ID"
          placeholder="e.g. http://localhost:5173/dashboard/teams?invite=... or team_123"
          icon={Link2}
          value={inviteInput}
          onChange={(e) => setInviteInput(e.target.value)}
          required
        />

        <p className="text-xs text-text-muted">
          Paste the invite link shared by your team owner to join the team and access all its common rooms.
        </p>

        <Button type="submit" loading={loading} size="lg" icon={Users} className="w-full mt-2">
          Join Team
        </Button>
      </form>
    </Modal>
  );
}
