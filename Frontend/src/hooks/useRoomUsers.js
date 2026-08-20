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
export function useRoomUsers(roomId) {
  const { socket } = useSocket();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!socket) return;

    const handleUsersUpdated = ({ roomId: updatedRoomId, users: updatedUsers }) => {
      if (!roomId || updatedRoomId === roomId) {
        setUsers(updatedUsers || []);
      }
    };

    socket.on("room:users-updated", handleUsersUpdated);

    // Request initial user list if roomId is supplied
    if (roomId && socket.connected) {
      socket.emit("get-room-users", { roomId });
    }

    return () => {
      socket.off("room:users-updated", handleUsersUpdated);
    };
  }, [socket, roomId]);

  return {
    users,
    userCount: users.length,
  };
}
