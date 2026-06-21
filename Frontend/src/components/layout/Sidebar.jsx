import { Link, useLocation } from "react-router-dom";
import { Code2, X } from "lucide-react";
import { SIDEBAR_LINKS, SIDEBAR_BOTTOM } from "../../utils/constants";
import { useAuth } from "@clerk/clerk-react";

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();
  const { signOut } = useAuth();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 z-50 lg:z-auto
          h-screen w-64 lg:w-64
          bg-surface-secondary border-r border-edge
          flex flex-col
          transition-transform duration-300 lg:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Header */}
        <div className="h-16 px-4 flex items-center justify-between border-b border-edge shrink-0">
          <Link to="/dashboard" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center">
              <Code2 className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-text-heading tracking-tight">
              Code<span className="text-brand-400">Sync</span>
            </span>
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg text-text-muted hover:text-text-body hover:bg-surface-tertiary transition-colors"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          <div className="flex flex-col gap-1">
            {SIDEBAR_LINKS.map((link) => {
              const isActive = location.pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={onClose}
                  className={`
                    relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
                    transition-all duration-200
                    ${isActive
                      ? "text-text-heading bg-brand-500/10"
                      : "text-text-muted hover:text-text-body hover:bg-surface-glass"
                    }
                  `}
                >
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-brand-500 rounded-r-full" />
                  )}
                  <Icon className={`w-5 h-5 shrink-0 ${isActive ? "text-brand-400" : ""}`} />
                  {link.label}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Bottom */}
        <div className="px-3 py-4 border-t border-edge shrink-0">
          {SIDEBAR_BOTTOM.map((link) => {
            const Icon = link.icon;
            return (
              <button
                key={link.label}
                onClick={link.danger ? () => signOut() : undefined}
                className={`
                  w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
                  transition-all duration-200
                  ${link.danger
                    ? "text-danger/70 hover:text-danger hover:bg-danger-muted"
                    : "text-text-muted hover:text-text-body hover:bg-surface-glass"
                  }
                `}
              >
                <Icon className="w-5 h-5 shrink-0" />
                {link.label}
              </button>
            );
          })}
        </div>
      </aside>
    </>
  );
}
