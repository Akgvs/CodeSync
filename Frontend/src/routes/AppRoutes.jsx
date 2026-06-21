import { Routes, Route } from "react-router-dom";

import PublicLayout from "../components/layout/PublicLayout";
import DashboardLayout from "../components/layout/DashboardLayout";

import Landing from "../pages/Landing";
import Features from "../pages/Features";
import Pricing from "../pages/Pricing";
import About from "../pages/About";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import JoinRoom from "../pages/JoinRoom";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";
import Teams from "../pages/Teams";
import SharedRooms from "../pages/SharedRooms";
import Room from "../pages/Room";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/features" element={<Features />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/about" element={<About />} />
        <Route path="/login/*" element={<Login />} />
        <Route path="/signup/*" element={<Signup />} />
        <Route path="/join" element={<JoinRoom />} />
      </Route>

      {/* Protected dashboard routes */}
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/shared" element={<SharedRooms />} />
        <Route path="/dashboard/teams" element={<Teams />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      {/* Room route (protected but outside standard dashboard layout) */}
      <Route path="/room/:roomId" element={<Room />} />
    </Routes>
  );
}
