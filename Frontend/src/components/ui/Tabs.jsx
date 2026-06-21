import { useState } from "react";

export default function Tabs({ tabs, defaultTab, className = "" }) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);
  const activeContent = tabs.find((t) => t.id === activeTab);

  return (
    <div className={className}>
      {/* Tab Headers */}
      <div className="flex gap-1 p-1 bg-surface-tertiary/50 rounded-xl border border-edge mb-6 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 whitespace-nowrap flex-1 ${
              activeTab === tab.id
                ? "text-text-heading bg-surface-elevated border border-edge"
                : "text-text-muted hover:text-text-secondary"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div
        key={activeTab}
        className="animate-fade-in"
      >
        {activeContent?.content}
      </div>
    </div>
  );
}
