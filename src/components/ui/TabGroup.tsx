"use client";

interface TabGroupProps {
  tabs: { key: string; label: string; href?: string; isExternal?: boolean }[];
  activeTab: string;
  onTabChange: (key: string) => void;
}

export function TabGroup({ tabs, activeTab, onTabChange }: TabGroupProps) {
  return (
    <div className="category-tabs">
      {tabs.map((tab) => {
        if (tab.href) {
          return (
            <a
              key={tab.key}
              href={tab.href}
              target={tab.isExternal !== false ? "_blank" : "_self"}
              rel={tab.isExternal !== false ? "noopener noreferrer" : undefined}
              className={`category-tab ${activeTab === tab.key ? "active" : ""}`}
              style={{ textDecoration: "none", color: "inherit", display: "flex", alignItems: "center", gap: "4px" }}
            >
              {tab.label}
              {tab.isExternal !== false && <span style={{ fontSize: "0.85em" }}>↗</span>}
            </a>
          );
        }

        return (
          <div
            key={tab.key}
            className={`category-tab ${activeTab === tab.key ? "active" : ""}`}
            onClick={() => onTabChange(tab.key)}
          >
            {tab.label}
          </div>
        );
      })}
    </div>
  );
}
