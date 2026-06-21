import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link2, Hash, ArrowRight, AlertCircle } from "lucide-react";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

export default function JoinRoom() {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState("");
  const [inviteLink, setInviteLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleJoinById = async (e) => {
    e.preventDefault();
    if (!roomId.trim()) {
      setError("Please enter a Room ID");
      return;
    }
    setError("");
    setLoading(true);
    // Simulate validation
    await new Promise((r) => setTimeout(r, 1500));
    if (roomId.length < 4) {
      setError("Invalid Room ID. Please check and try again.");
      setLoading(false);
      return;
    }
    // Navigate to room using React Router (client-side, no page reload)
    navigate(`/room/${roomId}`);
  };

  const handleJoinByLink = async (e) => {
    e.preventDefault();
    if (!inviteLink.trim()) {
      setError("Please paste an invite link");
      return;
    }
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));

    // Extract room ID from link
    const match = inviteLink.match(/room\/([a-zA-Z0-9]+)/);
    if (!match) {
      setError("Invalid invite link format.");
      setLoading(false);
      return;
    }
    navigate(`/room/${match[1]}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 relative">
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-brand-500/8 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative w-full max-w-md">
        <div className="glass-strong rounded-2xl p-8">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center mx-auto mb-4">
              <Link2 className="w-7 h-7 text-brand-400" />
            </div>
            <h1 className="text-2xl font-bold text-text-heading">Join a Room</h1>
            <p className="text-sm text-text-muted mt-1">
              Enter a Room ID or paste an invite link to start collaborating
            </p>
          </div>

          {/* Join by ID */}
          <form onSubmit={handleJoinById} className="mb-6">
            <Input
              id="room-id"
              label="Room ID"
              placeholder="e.g., abc123"
              icon={Hash}
              value={roomId}
              onChange={(e) => {
                setRoomId(e.target.value);
                setError("");
              }}
            />
            <Button type="submit" loading={loading} size="lg" className="w-full mt-3" iconRight={ArrowRight}>
              Join Room
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-edge" />
            <span className="text-xs text-text-muted">or</span>
            <div className="flex-1 h-px bg-edge" />
          </div>

          {/* Join by Link */}
          <form onSubmit={handleJoinByLink}>
            <Input
              id="invite-link"
              label="Invite Link"
              placeholder="https://codesync.com/room/..."
              icon={Link2}
              value={inviteLink}
              onChange={(e) => {
                setInviteLink(e.target.value);
                setError("");
              }}
            />
            <Button type="submit" variant="secondary" loading={loading} size="lg" className="w-full mt-3">
              Join via Link
            </Button>
          </form>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 mt-4 p-3 rounded-xl bg-danger-muted border border-danger/20">
              <AlertCircle className="w-4 h-4 text-danger shrink-0" />
              <p className="text-sm text-danger">{error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
