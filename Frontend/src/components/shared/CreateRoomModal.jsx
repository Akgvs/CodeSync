import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, Globe, Lock } from "lucide-react";
import Modal from "../ui/Modal";
import Input from "../ui/Input";
import Button from "../ui/Button";
import InviteLinkCard from "./InviteLinkCard";
import { LANGUAGES } from "../../utils/constants";
import { useAppDispatch } from "../../store/hooks";
import { addToast } from "../../store/toastSlice";
import { createRoom } from "../../utils/api";
import { useUser, useAuth } from "@clerk/clerk-react";

export default function CreateRoomModal({ isOpen, onClose }) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useUser();
  const { getToken } = useAuth();
  const [step, setStep] = useState("form"); // 'form' | 'success'
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    language: "javascript",
    privacy: "public",
  });
  const [generatedLink, setGeneratedLink] = useState("");
  const [createdRoomId, setCreatedRoomId] = useState(null);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !user) return;

    setLoading(true);
    try {
      const response = await createRoom({
        name: formData.name,
        language: formData.language,
        privacy: formData.privacy,
        ownerClerkId: user.id
      }, getToken);

      if (response.success) {
        const newRoomId = response.data.roomId;
        setCreatedRoomId(newRoomId);
        setGeneratedLink(`${window.location.origin}/room/${newRoomId}`);
        setStep("success");
        dispatch(addToast("Room created successfully!", "success"));
      } else {
        throw new Error(response.message || "Failed to create room");
      }
    } catch (error) {
      dispatch(addToast(error.message, "danger"));
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setStep("form");
    setFormData({ name: "", language: "javascript", privacy: "public" });
    setGeneratedLink("");
    setCreatedRoomId(null);
    onClose();
  };

  /** Navigate to the newly created room */
  const handleOpenRoom = () => {
    if (createdRoomId) {
      handleClose();
      navigate(`/room/${createdRoomId}`);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={step === "form" ? "Create New Room" : null}>
      {step === "form" ? (
        <form onSubmit={handleCreate} className="flex flex-col gap-5">
          <Input
            id="room-name"
            label="Room Name"
            placeholder="e.g., API Development"
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
              {LANGUAGES.slice(0, 6).map((lang) => (
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

          {/* Privacy */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-text-secondary">Privacy</label>
            <div className="flex gap-3">
              {[
                { value: "public", label: "Public", icon: Globe, desc: "Anyone with the link can join" },
                { value: "private", label: "Private", icon: Lock, desc: "Invite-only access" },
              ].map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handleChange("privacy", opt.value)}
                  className={`flex-1 flex items-start gap-3 p-3 rounded-xl border transition-all duration-200 text-left ${
                    formData.privacy === opt.value
                      ? "border-brand-500/50 bg-brand-500/10"
                      : "border-edge hover:border-edge-hover bg-surface-tertiary/50"
                  }`}
                >
                  <opt.icon className={`w-5 h-5 shrink-0 mt-0.5 ${
                    formData.privacy === opt.value ? "text-brand-400" : "text-text-muted"
                  }`} />
                  <div>
                    <p className={`text-sm font-medium ${
                      formData.privacy === opt.value ? "text-text-heading" : "text-text-secondary"
                    }`}>
                      {opt.label}
                    </p>
                    <p className="text-xs text-text-muted mt-0.5">{opt.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <Button type="submit" loading={loading} size="lg" className="w-full mt-2">
            Create Room
          </Button>
        </form>
      ) : (
        /* Success state */
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-success-muted flex items-center justify-center mb-4">
            <CheckCircle2 className="w-8 h-8 text-success" />
          </div>
          <h3 className="text-xl font-bold text-text-heading mb-1">Room Created!</h3>
          <p className="text-sm text-text-muted mb-6">
            Share the invite link below with your collaborators.
          </p>
          <InviteLinkCard
            link={generatedLink}
            onOpenRoom={handleOpenRoom}
          />
        </div>
      )}
    </Modal>
  );
}
