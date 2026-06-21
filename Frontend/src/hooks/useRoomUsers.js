import { useEffect, useState } from "react";
import { useSocket } from "./useSocket";

/**
 * useRoomUsers — Hook for live user presence tracking.
 *
 * Listens for "room:users-updated" socket events and maintains
 * the current list of connected users in the room.
 *
 * @returns {{ users: Array<{ socketId: string, id: string, name: string, avatar: string }>, userCount: number }}
 */
export function useRoomUsers() {
  const { socket } = useSocket();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!socket) return;

    const handleUsersUpdated = ({ roomId, users: updatedUsers }) => {
      setUsers(updatedUsers || []);
    };

    socket.on("room:users-updated", handleUsersUpdated);

    return () => {
      socket.off("room:users-updated", handleUsersUpdated);
    };
  }, [socket]);

  return {
    users,
    userCount: users.length,
  };
}
