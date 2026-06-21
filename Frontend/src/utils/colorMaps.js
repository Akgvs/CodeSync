/**
 * Shared color map constants used across multiple card/stat components.
 * Centralizes the brand/success/info/warning/danger color palette mappings
 * to avoid duplication (DRY principle).
 */

/** Icon + background color classes for stat-style cards */
export const ICON_COLOR_MAP = {
  brand: "bg-brand-500/10 text-brand-400",
  success: "bg-success-muted text-success",
  info: "bg-info-muted text-info",
  warning: "bg-warning-muted text-warning",
  danger: "bg-danger-muted text-danger",
};

/** Icon color + hover glow classes for feature-style cards */
export const FEATURE_COLOR_MAP = {
  brand: { bg: "bg-brand-500/10", text: "text-brand-400", glow: "group-hover:shadow-brand-500/10" },
  success: { bg: "bg-success-muted", text: "text-success", glow: "group-hover:shadow-success/10" },
  info: { bg: "bg-info-muted", text: "text-info", glow: "group-hover:shadow-info/10" },
  warning: { bg: "bg-warning-muted", text: "text-warning", glow: "group-hover:shadow-warning/10" },
  danger: { bg: "bg-danger-muted", text: "text-danger", glow: "group-hover:shadow-danger/10" },
};

/** Border-left + icon color classes for stat cards with accent borders */
export const STAT_COLOR_MAP = {
  brand: { icon: "text-brand-400 bg-brand-500/10", border: "border-l-brand-500" },
  success: { icon: "text-success bg-success-muted", border: "border-l-success" },
  info: { icon: "text-info bg-info-muted", border: "border-l-info" },
  warning: { icon: "text-warning bg-warning-muted", border: "border-l-warning" },
};

/** Icon + background + hover color classes for action-style cards */
export const ACTION_COLOR_MAP = {
  brand: "bg-brand-500/10 text-brand-400 group-hover:bg-brand-500/20",
  success: "bg-success-muted text-success group-hover:bg-success/20",
  info: "bg-info-muted text-info group-hover:bg-info/20",
};
