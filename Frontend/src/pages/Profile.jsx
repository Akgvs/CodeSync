import { FolderOpen, Users, Globe } from "lucide-react";
import { UserProfile } from "@clerk/clerk-react";
import Card from "../components/ui/Card";
import { ICON_COLOR_MAP } from "../utils/colorMaps";

const PROFILE_STATS = [
  { label: "Projects Created", value: "24", icon: FolderOpen, color: "brand" },
  { label: "Rooms Joined", value: "42", icon: Globe, color: "success" },
  { label: "Collaborations", value: "16", icon: Users, color: "info" },
];

export default function Profile() {
  return (
    <div className="p-4 lg:p-8 max-w-4xl mx-auto flex flex-col gap-8">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-text-heading">Profile</h1>
        <p className="text-text-muted mt-1">Manage your personal information and statistics</p>
      </div>

      {/* Clerk Profile Component */}
      <div className="clerk-profile-wrapper">
        <UserProfile 
          appearance={{
            elements: {
              rootBox: "w-full shadow-2xl rounded-2xl",
              card: "w-full bg-surface-secondary border border-edge rounded-2xl shadow-none",
              navbar: "border-edge border-r",
              navbarButton: "text-text-body hover:bg-surface-tertiary",
              navbarButton__active: "text-brand-400 bg-brand-500/10",
              headerTitle: "text-text-heading",
              headerSubtitle: "text-text-muted",
              profileSectionTitle: "text-text-heading border-b border-edge pb-2",
              profileSectionTitleText: "text-text-heading",
              profileSectionPrimaryButton: "text-brand-400 hover:text-brand-300",
              avatarImageActionsUpload: "text-brand-400",
              badge: "bg-brand-500/20 text-brand-400",
              formButtonPrimary: "bg-brand-500 hover:bg-brand-400 text-white",
              formButtonReset: "text-text-muted hover:text-text-body",
              formFieldLabel: "text-text-secondary",
              formFieldInput: "bg-surface-tertiary border-edge text-text-body focus:ring-brand-500 focus:border-brand-500",
            }
          }}
        />
      </div>

      {/* Statistics */}
      <div>
        <h2 className="text-lg font-semibold text-text-heading mb-4">Statistics</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {PROFILE_STATS.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} hover={false}>
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${ICON_COLOR_MAP[stat.color]}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-text-heading">{stat.value}</p>
                    <p className="text-sm text-text-muted">{stat.label}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
