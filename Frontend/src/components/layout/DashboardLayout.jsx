import { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useUser, useAuth } from "@clerk/clerk-react";
import Sidebar from "./Sidebar";
import DashboardNavbar from "./DashboardNavbar";
import { syncUser } from "../../utils/api";

export default function DashboardLayout() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { getToken } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Sync user with backend
  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      syncUser(user, getToken).catch(err => console.error("Failed to sync user:", err));
    }
  }, [isLoaded, isSignedIn, user, getToken]);

  // Show a loading state or nothing while checking auth
  if (!isLoaded) {
    return <div className="min-h-screen bg-surface-primary flex items-center justify-center text-text-muted">Loading...</div>;
  }

  // Redirect to login if not authenticated
  if (!isSignedIn) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen flex bg-surface-primary">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <DashboardNavbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto bg-surface-primary">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
