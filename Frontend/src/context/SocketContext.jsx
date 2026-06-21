import { createContext, useEffect, useState, useCallback, useRef } from "react";
import { io } from "socket.io-client";

/**
 * SocketContext — Provides a Socket.IO connection for application-level events.
 *
 * This is SEPARATE from the Yjs sync connection (handled by y-socket.io's SocketIOProvider).
 * This context handles: join-room, leave-room, user presence updates.
 *
 * Usage:
 *   Wrap your room page with <SocketProvider> and consume via useSocket() hook.
 */

const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3000";

export const SocketContext = createContext(null);

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState(null);
  const socketRef = useRef(null);

  // Create socket connection on mount
  useEffect(() => {
    const newSocket = io(SERVER_URL, {
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
    });

    newSocket.on("connect", () => {
      console.log("[SocketContext] Connected:", newSocket.id);
      setIsConnected(true);
      setConnectionError(null);
    });

    newSocket.on("disconnect", (reason) => {
      console.log("[SocketContext] Disconnected:", reason);
      setIsConnected(false);
    });

    newSocket.on("connect_error", (err) => {
      console.error("[SocketContext] Connection error:", err.message);
      setConnectionError(err.message);
      setIsConnected(false);
    });

    socketRef.current = newSocket;
    setSocket(newSocket);

    // Cleanup on unmount
    return () => {
      console.log("[SocketContext] Cleaning up socket connection");
      newSocket.disconnect();
      socketRef.current = null;
    };
  }, []);

  /**
   * Emit join-room event with user data from Clerk.
   * @param {string} roomId
   * @param {{ id: string, name: string, avatar: string }} userData
   */
  const emitJoinRoom = useCallback((roomId, userData) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit("join-room", { roomId, user: userData });
    }
  }, []);

  /**
   * Emit leave-room event.
   * @param {string} roomId
   */
  const emitLeaveRoom = useCallback((roomId) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit("leave-room", { roomId });
    }
  }, []);

  const value = {
    socket,
    isConnected,
    connectionError,
    emitJoinRoom,
    emitLeaveRoom,
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
}
