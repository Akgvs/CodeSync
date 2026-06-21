import { useState } from "react";
import { Bell, Monitor, Moon, Sun } from "lucide-react";
import Tabs from "../components/ui/Tabs";
import Card from "../components/ui/Card";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { setTheme } from "../store/themeSlice";
import { addToast } from "../store/toastSlice";

/* ── Appearance Tab ────────────────────────────────── */
function AppearanceTab() {
  const theme = useAppSelector((state) => state.theme.theme);
  const dispatch = useAppDispatch();

  const themes = [
    { id: "dark", label: "Dark", icon: Moon, description: "Dark theme for comfortable coding at night" },
    { id: "light", label: "Light", icon: Sun, description: "Light theme for bright environments" },
    { id: "system", label: "System", icon: Monitor, description: "Automatically matches your OS preference" },
  ];

  return (
    <Card>
      <h3 className="text-lg font-semibold text-text-heading mb-6">Theme</h3>
      <div className="grid sm:grid-cols-3 gap-4">
        {themes.map((t) => {
          const Icon = t.icon;
          const isActive = theme === t.id;
          return (
            <button
              key={t.id}
              onClick={() => {
                dispatch(setTheme(t.id));
                dispatch(addToast(`Theme set to ${t.label}`, "info"));
              }}
              className={`p-4 rounded-xl border text-left transition-all duration-200 ${
                isActive
                  ? "border-brand-500/50 bg-brand-500/10"
                  : "border-edge hover:border-edge-hover bg-surface-tertiary/30"
              }`}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${
                isActive ? "bg-brand-500/20 text-brand-400" : "bg-surface-tertiary text-text-muted"
              }`}>
                <Icon className="w-5 h-5" />
              </div>
              <p className={`text-sm font-semibold ${isActive ? "text-text-heading" : "text-text-secondary"}`}>
                {t.label}
              </p>
              <p className="text-xs text-text-muted mt-1">{t.description}</p>
            </button>
          );
        })}
      </div>
    </Card>
  );
}

/* ── Notifications Tab ─────────────────────────────── */
function NotificationsTab() {
  const dispatch = useAppDispatch();

  const [settings, setSettings] = useState({
    email: true,
    push: false,
    inApp: true,
    mentions: true,
    updates: false,
  });

  const toggleSetting = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
    dispatch(addToast("Notification preference updated", "info"));
  };

  const items = [
    { key: "email", label: "Email Notifications", desc: "Receive updates via email" },
    { key: "push", label: "Push Notifications", desc: "Browser push notifications" },
    { key: "inApp", label: "In-App Notifications", desc: "Notifications inside CodeSync" },
    { key: "mentions", label: "Mentions", desc: "Get notified when someone mentions you" },
    { key: "updates", label: "Product Updates", desc: "News about new features and improvements" },
  ];

  return (
    <Card>
      <h3 className="text-lg font-semibold text-text-heading mb-6">Notification Preferences</h3>
      <div className="flex flex-col divide-y divide-edge">
        {items.map((item) => (
          <div key={item.key} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
            <div>
              <p className="text-sm font-medium text-text-body">{item.label}</p>
              <p className="text-xs text-text-muted mt-0.5">{item.desc}</p>
            </div>
            <button
              onClick={() => toggleSetting(item.key)}
              className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
                settings[item.key] ? "bg-brand-500" : "bg-surface-tertiary border border-edge"
              }`}
            >
              <span
                className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                  settings[item.key] ? "translate-x-6" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>
        ))}
      </div>
    </Card>
  );
}

/* ── Settings Page ─────────────────────────────────── */
export default function Settings() {
  const tabs = [
    { id: "appearance", label: "Appearance", content: <AppearanceTab /> },
    { id: "notifications", label: "Notifications", content: <NotificationsTab /> },
  ];

  return (
    <div className="p-4 lg:p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-text-heading">Settings</h1>
        <p className="text-text-muted mt-1">Manage your application preferences</p>
      </div>

      <Tabs tabs={tabs} defaultTab="appearance" />
      
      <div className="mt-8 text-sm text-text-muted">
        <p>Looking for Account or Security settings? Manage them from your <a href="/profile" className="text-brand-400 hover:text-brand-300">Profile</a> page.</p>
      </div>
    </div>
  );
}
