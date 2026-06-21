import * as Y from "yjs";

/**
 * YjsManager — Server-side Y.Doc lifecycle management per room.
 *
 * Each room gets its own Y.Doc to keep collaborative state isolated.
 * Documents are lazily created and cleaned up with a grace period when
 * the last user leaves, so brief disconnects don't lose state.
 *
 * NOTE: The actual Yjs sync transport is handled by y-socket.io's YSocketIO.
 * This manager handles the *application-level* lifecycle: when to create,
 * reuse, and destroy Y.Doc instances based on room occupancy.
 */

/** @type {Map<string, Y.Doc>} roomId → Y.Doc */
const docs = new Map();

/** @type {Map<string, NodeJS.Timeout>} roomId → cleanup timer */
const cleanupTimers = new Map();

/** Grace period before destroying a Y.Doc after last user leaves (ms) */
const CLEANUP_DELAY_MS = 30_000; // 30 seconds

/**
 * Get or create a Y.Doc for a room.
 * If a cleanup timer is pending, it will be cancelled (user rejoined).
 * @param {string} roomId
 * @returns {Y.Doc}
 */
export function getOrCreateDoc(roomId) {
  // Cancel any pending cleanup — someone is (re)joining
  cancelCleanup(roomId);

  if (docs.has(roomId)) {
    console.log(`[YjsManager] Reusing existing Y.Doc for room "${roomId}"`);
    return docs.get(roomId);
  }

  const ydoc = new Y.Doc();
  docs.set(roomId, ydoc);
  console.log(`[YjsManager] Created new Y.Doc for room "${roomId}" — ${docs.size} active doc(s)`);

  return ydoc;
}

/**
 * Schedule cleanup of a room's Y.Doc after a grace period.
 * This is called when the last user leaves a room.
 * If another user joins before the timer expires, the cleanup is cancelled.
 * @param {string} roomId
 * @param {number} [delayMs=CLEANUP_DELAY_MS]
 */
export function scheduleCleanup(roomId, delayMs = CLEANUP_DELAY_MS) {
  // Don't schedule if doc doesn't exist
  if (!docs.has(roomId)) return;

  // Don't double-schedule
  cancelCleanup(roomId);

  console.log(`[YjsManager] Scheduling Y.Doc cleanup for room "${roomId}" in ${delayMs / 1000}s`);

  const timer = setTimeout(() => {
    destroyDoc(roomId);
    cleanupTimers.delete(roomId);
  }, delayMs);

  cleanupTimers.set(roomId, timer);
}

/**
 * Cancel a pending cleanup timer (called when a user joins a room
 * that was about to be cleaned up).
 * @param {string} roomId
 */
export function cancelCleanup(roomId) {
  const timer = cleanupTimers.get(roomId);
  if (timer) {
    clearTimeout(timer);
    cleanupTimers.delete(roomId);
    console.log(`[YjsManager] Cancelled cleanup for room "${roomId}" (user rejoined)`);
  }
}

/**
 * Immediately destroy a room's Y.Doc and free memory.
 * @param {string} roomId
 */
export function destroyDoc(roomId) {
  const ydoc = docs.get(roomId);
  if (ydoc) {
    ydoc.destroy();
    docs.delete(roomId);
    console.log(`[YjsManager] Destroyed Y.Doc for room "${roomId}" — ${docs.size} active doc(s)`);
  }
}

/**
 * Get the number of active Y.Docs (for monitoring/debugging).
 * @returns {number}
 */
export function getDocCount() {
  return docs.size;
}
