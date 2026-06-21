export default function Card({
  children,
  glass = false,
  hover = true,
  padding = "p-6",
  className = "",
  ...props
}) {
  return (
    <div
      className={`
        rounded-2xl border transition-all duration-300
        ${hover ? "hover:-translate-y-0.5" : ""}
        ${glass
          ? "glass glass-hover"
          : "bg-surface-secondary border-edge hover:border-edge-hover"
        }
        ${padding}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}
