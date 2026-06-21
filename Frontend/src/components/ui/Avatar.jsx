const SIZES = {
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-14 h-14 text-lg",
};

const COLORS = [
  "bg-brand-500/20 text-brand-300",
  "bg-emerald-500/20 text-emerald-300",
  "bg-amber-500/20 text-amber-300",
  "bg-rose-500/20 text-rose-300",
  "bg-cyan-500/20 text-cyan-300",
  "bg-violet-500/20 text-violet-300",
];

function getColorFromName(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return COLORS[Math.abs(hash) % COLORS.length];
}

export default function Avatar({
  name = "",
  src,
  size = "md",
  showStatus = false,
  online = false,
  className = "",
}) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className={`relative inline-flex ${className}`}>
      {src ? (
        <img
          src={src}
          alt={name}
          className={`${SIZES[size]} rounded-full object-cover ring-2 ring-edge`}
        />
      ) : (
        <div
          className={`${SIZES[size]} ${getColorFromName(name)} rounded-full flex items-center justify-center font-semibold ring-2 ring-edge`}
        >
          {initials || "?"}
        </div>
      )}
      {showStatus && (
        <span
          className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-surface-secondary ${online ? "bg-success" : "bg-text-muted"}`}
        />
      )}
    </div>
  );
}
