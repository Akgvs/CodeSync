import { useEffect, useState } from "react";

const CODE_LINES = [
  { text: 'import { Server } from "express";', color: "text-blue-400" },
  { text: "", color: "" },
  { text: "const app = new Server();", color: "text-emerald-400" },
  { text: "", color: "" },
  { text: 'app.get("/api/rooms", async (req, res) => {', color: "text-amber-300" },
  { text: "  const rooms = await db.findAll();", color: "text-purple-400" },
  { text: "  res.json({ rooms, count: rooms.length });", color: "text-sky-400" },
  { text: "});", color: "text-amber-300" },
  { text: "", color: "" },
  { text: 'app.post("/api/collaborate", (req, res) => {', color: "text-amber-300" },
  { text: '  const { roomId, userId } = req.body;', color: "text-rose-400" },
  { text: "  socket.joinRoom(roomId, userId);", color: "text-emerald-400" },
  { text: '  res.status(200).send("Connected!");', color: "text-sky-400" },
  { text: "});", color: "text-amber-300" },
  { text: "", color: "" },
  { text: "app.listen(3000);", color: "text-emerald-400" },
];

const CURSORS = [
  { name: "Sarah", color: "#f43f5e", line: 5, col: 35 },
  { name: "Marcus", color: "#22c55e", line: 10, col: 20 },
  { name: "Priya", color: "#6366f1", line: 12, col: 28 },
];

export default function HeroEditor() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [activeCursors, setActiveCursors] = useState([]);

  // Typing animation
  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev >= CODE_LINES.length) {
          clearInterval(timer);
          return prev;
        }
        return prev + 1;
      });
    }, 150);
    return () => clearInterval(timer);
  }, []);

  // Show cursors after typing
  useEffect(() => {
    if (visibleLines >= 8) {
      setActiveCursors(CURSORS);
    }
  }, [visibleLines]);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Glow behind */}
      <div className="absolute -inset-4 bg-brand-500/5 blur-3xl rounded-3xl" />

      {/* Editor window */}
      <div className="relative rounded-2xl overflow-hidden border border-edge shadow-2xl shadow-black/40">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 bg-surface-secondary border-b border-edge">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="text-xs text-text-muted ml-2 font-mono">server.js — CodeSync</span>

          {/* Online users */}
          <div className="ml-auto flex items-center gap-1">
            {CURSORS.map((cursor) => (
              <div
                key={cursor.name}
                className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium"
                style={{ backgroundColor: `${cursor.color}20`, color: cursor.color }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cursor.color }} />
                {cursor.name}
              </div>
            ))}
          </div>
        </div>

        {/* Code area */}
        <div className="bg-[#0d1117] p-4 font-mono text-sm leading-6 min-h-[380px] relative overflow-hidden">
          {CODE_LINES.map((line, i) => (
            <div
              key={i}
              className={`flex transition-opacity duration-300 ${
                i < visibleLines ? "opacity-100" : "opacity-0"
              }`}
            >
              {/* Line number */}
              <span className="w-8 text-right mr-4 text-text-muted/40 select-none text-xs leading-6">
                {i + 1}
              </span>
              {/* Code */}
              <span className={line.color}>
                {line.text}
                {/* Show cursor on specific lines */}
                {activeCursors.map((cursor) =>
                  cursor.line === i + 1 ? (
                    <span
                      key={cursor.name}
                      className="inline-block w-0.5 h-5 animate-typing-cursor ml-px align-middle"
                      style={{ backgroundColor: cursor.color }}
                    />
                  ) : null
                )}
              </span>
            </div>
          ))}
        </div>

        {/* Status bar */}
        <div className="flex items-center justify-between px-4 py-1.5 bg-surface-secondary border-t border-edge text-[11px] text-text-muted">
          <div className="flex items-center gap-3">
            <span>JavaScript</span>
            <span>UTF-8</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
              3 collaborators online
            </span>
            <span>Ln 16, Col 1</span>
          </div>
        </div>
      </div>
    </div>
  );
}
