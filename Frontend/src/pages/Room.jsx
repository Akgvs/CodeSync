import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { ArrowLeft, Share2, Wifi, WifiOff, Loader2 } from "lucide-react";
import CodeEditor from "../components/shared/CodeEditor";
import UserPresencePanel from "../components/shared/UserPresencePanel";
import Button from "../components/ui/Button";
import { SocketProvider } from "../context/SocketContext";
import { YjsProvider } from "../context/YjsContext";
import { useSocket } from "../hooks/useSocket";
import { useAppDispatch } from "../store/hooks";
import { addToast } from "../store/toastSlice";
import { getRoom } from "../utils/api";

/**
 * RoomInner — The actual room content, rendered inside both providers.
 * Separated so it can call useSocket() which needs <SocketProvider> above it.
 */
function RoomInner({ room, roomId }) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useUser();
  const { isConnected, connectionError, emitJoinRoom, emitLeaveRoom } = useSocket();

  // Emit join-room when socket connects, leave-room on unmount
  useEffect(() => {
    if (!isConnected || !user) return;

    // Build user data from Clerk
    const userData = {
      id: user.id,
      name: [user.firstName, user.lastName].filter(Boolean).join(" ") || "Anonymous",
      avatar: user.imageUrl || "",
    };

    emitJoinRoom(roomId, userData);

    // Cleanup: leave room on unmount
    return () => {
      emitLeaveRoom(roomId);
    };
  }, [isConnected, user, roomId, emitJoinRoom, emitLeaveRoom]);

  const handleShare = () => {
    const link = `${window.location.origin}/room/${roomId}`;
    navigator.clipboard.writeText(link);
    dispatch(addToast("Room link copied to clipboard!", "success"));
  };

  return (
    <div className="flex flex-col h-screen bg-surface-primary">
      {/* Room Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-edge shrink-0 bg-surface-secondary">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="p-2 rounded-lg text-text-muted hover:text-text-body hover:bg-surface-tertiary transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-text-heading">
              {room.name}{" "}
              <span className="text-sm font-normal text-text-muted">
                ({roomId})
              </span>
            </h1>
            <div className="flex items-center gap-2 mt-0.5">
              {isConnected ? (
                <>
                  <Wifi className="w-3.5 h-3.5 text-success" />
                  <p className="text-xs text-success font-medium">Connected</p>
                </>
              ) : connectionError ? (
                <>
                  <WifiOff className="w-3.5 h-3.5 text-danger" />
                  <p className="text-xs text-danger font-medium">Disconnected</p>
                </>
              ) : (
                <>
                  <Loader2 className="w-3.5 h-3.5 text-warning animate-spin" />
                  <p className="text-xs text-warning font-medium">Connecting...</p>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Live user presence panel */}
          <UserPresencePanel currentUserId={user?.id} />
          <Button onClick={handleShare} icon={Share2} size="sm">
            Share
          </Button>
        </div>
      </header>

      {/* Editor Area */}
      <main className="flex-1 relative">
        <CodeEditor language={room.language || "javascript"} theme="vs-dark" />
      </main>
    </div>
  );
}

/**
 * Room — Top-level page that fetches room metadata, then wraps
 * the editor with SocketProvider and YjsProvider.
 */
import { useAuth } from "@clerk/clerk-react";

export default function Room() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { getToken } = useAuth();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch room metadata from REST API
  useEffect(() => {
    getRoom(roomId, getToken)
      .then((res) => {
        if (res.success) {
          setRoom(res.data);
        } else {
          setError(res.message || "Room not found");
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [roomId, getToken]);

  if (loading) {
    return (
      <div className="min-h-screen bg-surface-primary flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-brand-400 animate-spin" />
          <p className="text-text-muted font-medium">Loading Room...</p>
        </div>
      </div>
    );
  }

  if (error || !room) {
    return (
      <div className="min-h-screen bg-surface-primary flex flex-col items-center justify-center text-center p-6">
        <h2 className="text-2xl font-bold text-danger mb-2">Room Unavailable</h2>
        <p className="text-text-muted mb-6">
          {error || "This room does not exist or has been deleted."}
        </p>
        <Button onClick={() => navigate("/dashboard")} icon={ArrowLeft}>
          Back to Dashboard
        </Button>
      </div>
    );
  }

  // Wrap with providers:
  //  - SocketProvider: manages application-level socket (join/leave/presence)
  //  - YjsProvider: manages Y.Doc + SocketIOProvider for CRDT sync
  return (
    <SocketProvider>
      <YjsProvider roomId={roomId}>
        <RoomInner room={room} roomId={roomId} />
      </YjsProvider>
    </SocketProvider>
  );
}
