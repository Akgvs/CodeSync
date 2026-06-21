import { useContext } from "react";
import { YjsContext } from "../context/YjsContext";

/**
 * useYjs — Hook to access the YjsContext.
 *
 * Provides: { ydoc, provider, ytext, awareness, isSynced }
 *
 * Must be used inside a <YjsProvider>.
 */
export function useYjs() {
  const context = useContext(YjsContext);
  if (!context) {
    throw new Error("useYjs must be used within a <YjsProvider>");
  }
  return context;
}
