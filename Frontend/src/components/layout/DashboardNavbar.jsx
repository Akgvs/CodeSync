import { Bell, Menu } from "lucide-react";
import { UserButton } from "@clerk/clerk-react";

export default function DashboardNavbar({ onMenuClick }) {
  return (
    <header className="h-16 bg-surface-secondary/50 backdrop-blur-xl border-b border-edge px-4 lg:px-6 flex items-center justify-between shrink-0 sticky top-0 z-30">
      {/* Left: Hamburger */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg text-text-muted hover:text-text-body hover:bg-surface-glass transition-colors"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Right: Notifications + UserButton */}
      <div className="flex items-center gap-3">
        {/* Notification Bell */}
        <button
          className="relative p-2 rounded-lg text-text-muted hover:text-text-body hover:bg-surface-glass transition-colors"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-500 rounded-full" />
        </button>

        {/* Clerk User Button */}
        <div className="ml-2 flex items-center justify-center">
          <UserButton 
            afterSignOutUrl="/" 
            appearance={{
              elements: {
                avatarBox: "w-8 h-8 rounded-xl",
              }
            }}
          />
        </div>
      </div>
    </header>
  );
}
