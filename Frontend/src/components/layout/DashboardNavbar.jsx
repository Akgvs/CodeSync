import { useState } from "react";
import { Search, Bell, Menu } from "lucide-react";
import { UserButton } from "@clerk/clerk-react";

export default function DashboardNavbar({ onMenuClick }) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="h-16 bg-surface-secondary/50 backdrop-blur-xl border-b border-edge px-4 lg:px-6 flex items-center justify-between shrink-0 sticky top-0 z-30">
      {/* Left: Hamburger + Search */}
      <div className="flex items-center gap-3 flex-1">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg text-text-muted hover:text-text-body hover:bg-surface-glass transition-colors"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="relative max-w-md w-full hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input
            type="text"
            placeholder="Search projects, rooms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm bg-surface-tertiary/50 text-text-body border border-edge hover:border-edge-hover focus:border-brand-500/50 focus:ring-2 focus:ring-brand-500/20 rounded-xl placeholder:text-text-muted focus:outline-none transition-all"
          />
        </div>
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
