import { createContext, useEffect, useState, useRef } from "react";
import * as Y from "yjs";
import { SocketIOProvider } from "y-socket.io";
import { MonacoBinding } from "y-monaco";

/**
 * YjsContext — Room-scoped Yjs document and provider management.
 *
 * Creates a Y.Doc and SocketIOProvider for the given roomId.
 * The SocketIOProvider from y-socket.io uses the roomId as a namespace
 * to scope Yjs CRDT sync to only that room.
 *
 * Provides:
 *   - ydoc: The Y.Doc instance
 *   - provider: The SocketIOProvider instance
 *   - ytext: The shared Y.Text("monaco") for the editor
 *   - awareness: The awareness protocol instance for cursor sync
 *   - isSynced: Whether the initial sync with the server is complete
 *
 * Usage:
 *   <YjsProvider roomId="abc123"><CodeEditor /></YjsProvider>
 */

const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3000";

export const YjsContext = createContext(null);

export function YjsProvider({ roomId, children }) {
  const [ydoc, setYdoc] = useState(null);
  const [provider, setProvider] = useState(null);
  const [ytext, setYtext] = useState(null);
  const [awareness, setAwareness] = useState(null);
  const [isSynced, setIsSynced] = useState(false);

  // Refs to hold current instances for cleanup
  const ydocRef = useRef(null);
  const providerRef = useRef(null);

  useEffect(() => {
    if (!roomId) return;

    console.log(`[YjsContext] Initializing Yjs for room "${roomId}"`);

    // 1. Create a fresh Y.Doc for this room
    const doc = new Y.Doc();

    // 2. Connect to the y-socket.io server with roomId as the namespace
    const socketProvider = new SocketIOProvider(
      SERVER_URL,
      roomId,
      doc,
      { autoConnect: true }
    );

    // 3. Get the shared text type for Monaco
    const text = doc.getText("monaco");

    // Track sync status
    socketProvider.on("sync", (synced) => {
      console.log(`[YjsContext] Sync status for room "${roomId}":`, synced);
      setIsSynced(synced);
    });

    // Store refs for cleanup
    ydocRef.current = doc;
    providerRef.current = socketProvider;

    // Expose to context consumers
    setYdoc(doc);
    setProvider(socketProvider);
    setYtext(text);
    setAwareness(socketProvider.awareness);

    // Cleanup on unmount or roomId change
    return () => {
      console.log(`[YjsContext] Cleaning up Yjs for room "${roomId}"`);
      socketProvider.disconnect();
      doc.destroy();
      ydocRef.current = null;
      providerRef.current = null;
      setYdoc(null);
      setProvider(null);
      setYtext(null);
      setAwareness(null);
      setIsSynced(false);
    };
  }, [roomId]);

  const value = {
    ydoc,
    provider,
    ytext,
    awareness,
    isSynced,
  };

  return (
    <YjsContext.Provider value={value}>
      {children}
    </YjsContext.Provider>
  );
}
