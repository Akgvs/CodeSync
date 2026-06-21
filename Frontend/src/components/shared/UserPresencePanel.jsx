import { useRoomUsers } from "../../hooks/useRoomUsers";
import { Users } from "lucide-react";

/**
 * UserPresencePanel — Displays a live list of connected users in the room.
 *
 * Shows each user's avatar (or initials fallback), display name,
 * and a "You" badge for the current user.
 *
 * @param {{ currentUserId: string }} props
 */
export default function UserPresencePanel({ currentUserId }) {
  const { users, userCount } = useRoomUsers();

  /**
   * Generate initials from a name (e.g., "John Doe" → "JD").
   * @param {string} name
   * @returns {string}
   */
  const getInitials = (name) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  /**
   * Deterministic color for user avatar based on their ID.
   * Creates visual distinction between users.
   */
  const getAvatarColor = (id) => {
    const colors = [
      "bg-brand-500",
      "bg-success",
      "bg-info",
      "bg-warning",
      "bg-danger",
      "bg-brand-400",
      "bg-brand-700",
    ];
    let hash = 0;
    for (let i = 0; i < (id || "").length; i++) {
      hash = id.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  return (
    <div className="flex items-center gap-3">
      {/* Stacked avatars (show up to 5) */}
      <div className="flex -space-x-2">
        {users.slice(0, 5).map((user) => (
          <div
            key={user.socketId}
            className="relative group"
          >
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-full border-2 border-surface-secondary object-cover"
              />
            ) : (
              <div
                className={`w-8 h-8 rounded-full border-2 border-surface-secondary flex items-center justify-center text-xs font-bold text-white ${getAvatarColor(user.id)}`}
              >
                {getInitials(user.name)}
              </div>
            )}

            {/* Online indicator dot */}
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-success border-2 border-surface-secondary" />

            {/* Tooltip */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2.5 py-1 rounded-lg bg-surface-elevated border border-edge text-xs text-text-heading font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 shadow-lg">
              {user.name}
              {user.id === currentUserId && (
                <span className="text-brand-400 ml-1">(You)</span>
              )}
            </div>
          </div>
        ))}
        {userCount > 5 && (
          <div className="w-8 h-8 rounded-full border-2 border-surface-secondary bg-surface-tertiary flex items-center justify-center text-xs font-bold text-text-muted">
            +{userCount - 5}
          </div>
        )}
      </div>

      {/* User count badge */}
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-tertiary border border-edge">
        <Users className="w-4 h-4 text-text-muted" />
        <span className="text-sm font-medium text-text-body">
          {userCount} Online
        </span>
      </div>
    </div>
  );
}
