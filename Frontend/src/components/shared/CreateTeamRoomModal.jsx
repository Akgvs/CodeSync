import { useState } from "react";
import Modal from "../ui/Modal";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { LANGUAGES } from "../../utils/constants";
import { useAppDispatch } from "../../store/hooks";
import { addToast } from "../../store/toastSlice";
import { createRoom, addBackendTeamRoom } from "../../utils/api";
import { useUser, useAuth } from "@clerk/clerk-react";

export default function CreateTeamRoomModal({ isOpen, onClose, team, onRoomCreated }) {
  const dispatch = useAppDispatch();
  const { user } = useUser();
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    language: "javascript",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    setLoading(true);
    try {
      let newTeamRoom;
      const backendTeamId = team?.teamId || team?.id;

      // Try adding room via backend team API
      const backendRes = await addBackendTeamRoom(
        backendTeamId,
        {
          name: formData.name.trim(),
          language: formData.language,
          ownerClerkId: user?.id,
        },
        getToken
      ).catch(() => null);

      if (backendRes && backendRes.success && backendRes.data?.newRoom) {
        newTeamRoom = backendRes.data.newRoom;
      } else {
        // Fallback to standard room API
        const response = await createRoom(
          {
            name: `[${team?.name || "Team"}] ${formData.name.trim()}`,
            language: formData.language,
            privacy: "public",
            ownerClerkId: user?.id,
          },
          getToken
        );

        if (response.success) {
          newTeamRoom = {
            roomId: response.data.roomId,
            name: formData.name.trim(),
            language: formData.language,
            createdAt: new Date().toISOString(),
            createdBy: user?.firstName || "Team Member",
          };
        } else {
          throw new Error(response.message || "Failed to create room");
        }
      }

      dispatch(addToast(`Common room "${formData.name.trim()}" created!`, "success"));
      if (onRoomCreated) {
        onRoomCreated(team.id || team.teamId, newTeamRoom);
      }
      handleClose();
    } catch (error) {
      dispatch(addToast(error.message || "Failed to create common room", "danger"));
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({ name: "", language: "javascript" });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={`Create Common Room for ${team?.name || "Team"}`}>
      <form onSubmit={handleCreate} className="flex flex-col gap-5">
        <Input
          id="team-room-name"
          label="Room Name"
          placeholder="e.g., Daily Standup / Architecture Pairing"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          required
        />

        {/* Language selector */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-text-secondary">
            Programming Language
          </label>
          <div className="grid grid-cols-3 gap-2">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.value}
                type="button"
                onClick={() => handleChange("language", lang.value)}
                className={`px-3 py-2.5 rounded-xl text-sm font-medium border transition-all duration-200 ${
                  formData.language === lang.value
                    ? "border-brand-500/50 bg-brand-500/10 text-brand-400"
                    : "border-edge hover:border-edge-hover bg-surface-tertiary/50 text-text-secondary"
                }`}
              >
                <span className="text-xs font-bold opacity-50 block mb-0.5">{lang.icon}</span>
                {lang.label}
              </button>
            ))}
          </div>
        </div>

        <Button type="submit" loading={loading} size="lg" className="w-full mt-2">
          Create Common Room
        </Button>
      </form>
    </Modal>
  );
}
