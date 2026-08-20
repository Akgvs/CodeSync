import { useState } from "react";
import Modal from "../ui/Modal";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { useAppDispatch } from "../../store/hooks";
import { addToast } from "../../store/toastSlice";
import { Users } from "lucide-react";
import { createBackendTeam } from "../../utils/api";
import { useUser, useAuth } from "@clerk/clerk-react";

export default function CreateTeamModal({ isOpen, onClose, onTeamCreated }) {
  const dispatch = useAppDispatch();
  const { user } = useUser();
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    setLoading(true);
    try {
      let newTeam;
      const res = await createBackendTeam(
        {
          name: formData.name.trim(),
          description: formData.description.trim(),
          ownerClerkId: user?.id,
          ownerName: [user?.firstName, user?.lastName].filter(Boolean).join(" ") || "Team Owner",
        },
        getToken
      ).catch(() => null);

      if (res && res.success && res.data) {
        newTeam = res.data;
        newTeam.id = res.data.teamId;
      } else {
        newTeam = {
          id: `team_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
          teamId: `team_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
          name: formData.name.trim(),
          description: formData.description.trim() || "Collaborative development team",
          role: "Owner",
          members: [
            {
              clerkId: user?.id || "guest",
              name: [user?.firstName, user?.lastName].filter(Boolean).join(" ") || "Developer",
              avatar: user?.imageUrl || "",
              role: "Owner",
            },
          ],
          rooms: [],
          createdAt: new Date().toISOString(),
        };
      }

      // Save to localStorage
      const existingTeams = JSON.parse(localStorage.getItem("codesync_teams") || "[]");
      const updatedTeams = [newTeam, ...existingTeams];
      localStorage.setItem("codesync_teams", JSON.stringify(updatedTeams));

      dispatch(addToast(`Team "${newTeam.name}" created successfully!`, "success"));
      if (onTeamCreated) {
        onTeamCreated(updatedTeams);
      }
      handleClose();
    } catch (error) {
      dispatch(addToast("Failed to create team", "danger"));
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({ name: "", description: "" });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Create New Team">
      <form onSubmit={handleCreate} className="flex flex-col gap-5">
        <Input
          id="team-name"
          label="Team Name"
          placeholder="e.g., Frontend Engineering"
          icon={Users}
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          required
        />

        <div className="flex flex-col gap-1.5">
          <label htmlFor="team-desc" className="text-sm font-medium text-text-secondary">
            Description (Optional)
          </label>
          <textarea
            id="team-desc"
            rows={3}
            placeholder="What does this team focus on?"
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-surface-tertiary border border-edge hover:border-edge-hover focus:border-brand-500 text-sm text-text-body placeholder:text-text-muted focus:outline-none transition-colors resize-none"
          />
        </div>

        <Button type="submit" loading={loading} size="lg" className="w-full mt-2">
          Create Team
        </Button>
      </form>
    </Modal>
  );
}
