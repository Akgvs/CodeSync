import { useEffect } from "react";
import { X, CheckCircle2, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { removeToast } from "../../store/toastSlice";

const ICONS = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
  warning: AlertTriangle,
};

const COLORS = {
  success: "border-l-success text-success",
  error: "border-l-danger text-danger",
  info: "border-l-info text-info",
  warning: "border-l-warning text-warning",
};

const BG_COLORS = {
  success: "bg-success-muted",
  error: "bg-danger-muted",
  info: "bg-info-muted",
  warning: "bg-warning-muted",
};

const TOAST_DURATION = 4000;

export default function ToastContainer() {
  const toasts = useAppSelector((state) => state.toast.toasts);
  const dispatch = useAppDispatch();

  // Auto-dismiss toasts
  useEffect(() => {
    if (toasts.length === 0) return;

    const latestToast = toasts[toasts.length - 1];
    const timer = setTimeout(() => {
      dispatch(removeToast(latestToast.id));
    }, TOAST_DURATION);

    return () => clearTimeout(timer);
  }, [toasts, dispatch]);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const Icon = ICONS[toast.type] || Info;
        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 px-4 py-3 rounded-xl border-l-4 ${COLORS[toast.type]} ${BG_COLORS[toast.type]} bg-surface-secondary/90 backdrop-blur-xl border border-edge shadow-2xl animate-slide-in-right`}
          >
            <Icon className="w-5 h-5 shrink-0 mt-0.5" />
            <p className="text-sm text-text-body flex-1">{toast.message}</p>
            <button
              onClick={() => dispatch(removeToast(toast.id))}
              className="text-text-muted hover:text-text-body transition-colors shrink-0"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
