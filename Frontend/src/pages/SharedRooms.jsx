import { useState, useEffect } from "react";
import { Share2, Globe, ArrowRight } from "lucide-react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { useAppDispatch } from "../store/hooks";
import { addToast } from "../store/toastSlice";
import { getSharedRooms } from "../utils/api";
import { useUser, useAuth } from "@clerk/clerk-react";

export default function SharedRooms() {
  const dispatch = useAppDispatch();
  const { user } = useUser();
  const { getToken } = useAuth();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      getSharedRooms(user.id, getToken)
        .then(res => {
          if (res.success) setRooms(res.data);
        })
        .catch(err => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [user, getToken]);

  const handleJoin = (roomId) => {
    window.location.href = `/room/${roomId}`;
  };

  return (
    <div className="p-4 lg:p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-text-heading">Shared Rooms</h1>
        <p className="text-text-muted mt-1">Rooms that have been shared with you by other users</p>
      </div>

      {loading ? (
        <div className="text-center py-20 text-text-muted">Loading shared rooms...</div>
      ) : rooms.length > 0 ? (
        <div className="flex flex-col gap-4">
          {rooms.map(room => (
            <Card key={room.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${room.active ? 'bg-success-muted text-success' : 'bg-surface-tertiary text-text-muted'}`}>
                  {room.active ? <Globe className="w-6 h-6" /> : <Share2 className="w-6 h-6" />}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-text-heading flex items-center gap-2">
                    {room.name}
                    {room.active && <span className="w-2 h-2 rounded-full bg-success animate-pulse" />}
                  </h3>
                  <p className="text-sm text-text-muted">Shared by {room.ownerId?.firstName || "Unknown"} • {room.language}</p>
                </div>
              </div>
              <Button onClick={() => handleJoin(room.roomId)} variant={room.active ? "primary" : "secondary"} icon={ArrowRight}>
                Join Room
              </Button>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-surface-secondary border border-edge rounded-2xl">
          <Share2 className="w-12 h-12 text-text-muted mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-text-heading">No shared rooms</h3>
          <p className="text-text-muted mb-4">When someone shares a room link with you, it will appear here.</p>
        </div>
      )}
    </div>
  );
}
