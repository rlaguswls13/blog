"use client";
import { useState } from "react";
import devlogData from "@/data/devlog.json";
import { TabGroup } from "@/components/ui/TabGroup";
import { TagList } from "@/components/ui/TagBadge";
import { sortByDateDesc } from "@/lib/utils";
import Link from "next/link";
import type { DevlogCategory, DevlogEntry } from "@/types";

export default function DevlogPage() {
  const [activeTab, setActiveTab] = useState<DevlogCategory>("problem_solving");

  const tabs = [
    { key: "tech_study", label: "기술 학습 기록" },
    { key: "problem_solving", label: "문제 해결 기록" },
  ];

  const entries = sortByDateDesc(devlogData[activeTab] as DevlogEntry[]);

  return (
    <>
      <header>
        <h1>기술 학습 & 문제 해결</h1>
        <p style={{ color: "var(--text-secondary)", marginTop: "-15px", marginBottom: "40px" }}>
          기술 공부 기록과 문제 해결 과정을 기록하는 공간입니다.
        </p>
      </header>

      <div className="devlog-container">
        <TabGroup
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={(key) => setActiveTab(key as DevlogCategory)}
        />

        <div className="devlog-grid">
          {entries.map((entry) => (
            <Link key={entry.id} href={`/devlog/${activeTab}/${entry.id}`} className="devlog-card-link">
              <div className="devlog-card">
                <div className="devlog-meta">
                  <span>📅 {entry.date}</span>
                </div>
                <h3>{entry.title}</h3>
                <TagList tags={entry.tags} />
                <p className="devlog-description">{entry.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
