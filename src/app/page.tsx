"use client";

import { useState } from "react";
import Link from "next/link";
import devlogData from "@/data/devlog.json";
import type { DevlogCategory, DevlogEntry } from "@/types";
import { CalendarIcon } from "@/components/ui/Icons";
import { TagList } from "@/components/ui/TagBadge";
import { sortByDateDesc } from "@/lib/utils";

type HomeEntry = DevlogEntry & { category: DevlogCategory };

const categoryInfo: Record<DevlogCategory, { label: string; description: string }> = {
  tech_study: { label: "기술 학습", description: "새롭게 익힌 기술과 핵심 개념" },
  problem_solving: { label: "문제 해결", description: "실무 장애 분석과 개선 과정" },
  competition_event: { label: "대회·행사", description: "도전과 경험에서 얻은 인사이트" },
  blog: { label: "개인일지", description: "개발과 커리어에 대한 생각" },
};

const categories = Object.keys(categoryInfo) as DevlogCategory[];
const allEntries: HomeEntry[] = categories.flatMap((category) =>
  ((devlogData[category] || []) as DevlogEntry[]).map((entry) => ({ ...entry, category })),
);
const sortedHomeEntries = sortByDateDesc(allEntries);

const recentEntries = sortedHomeEntries.slice(0, 6);
const tagCounts = allEntries.flatMap((entry) => entry.tags).reduce<Record<string, number>>((counts, tag) => {
  counts[tag] = (counts[tag] || 0) + 1;
  return counts;
}, {});
const popularTags = Object.entries(tagCounts).sort((a, b) => b[1] - a[1]).slice(0, 16);

export default function TechBlogHome() {
  const [activeCategory, setActiveCategory] = useState<"all" | DevlogCategory>("all");
  const visibleEntries = sortedHomeEntries
    .filter((entry) => activeCategory === "all" || entry.category === activeCategory)
    .slice(0, 3);

  const selectCategory = (category: "all" | DevlogCategory, focusRecent = false) => {
    setActiveCategory(category);
    if (focusRecent) {
      requestAnimationFrame(() => {
        document.getElementById("recent-posts")?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  };

  const categoryListHref = activeCategory === "all"
    ? "/devlog"
    : activeCategory === "blog"
      ? "/devlog?tab=journal&journal=blog&pkg=All&page=1"
      : `/devlog?tab=${activeCategory}&pkg=All&page=1`;

  return (
    <main className="tech-home">
      <section className="tech-hero">
        <div className="tech-hero-copy">
          <span className="tech-hero-kicker">ENGINEERING NOTES · {sortedHomeEntries.length} ARTICLES</span>
          <h1>개발 지식과 경험을<br />기록합니다</h1>
          <p>Java, Spring Boot, 아키텍처와 DevOps까지.<br />실무에서 배운 문제 해결 과정과 기술적 인사이트를 공유합니다.</p>
          <div className="tech-hero-actions">
            <Link href="/devlog" className="tech-primary-button">전체 글 보기 <span>→</span></Link>
            <Link href="/about" className="tech-secondary-button">작성자 소개</Link>
          </div>
        </div>
        <div className="tech-hero-visual" aria-hidden="true">
          <div className="tech-orbit tech-orbit-one" />
          <div className="tech-orbit tech-orbit-two" />
          <div className="tech-code-layer tech-code-layer-back"><span>DATA</span></div>
          <div className="tech-code-layer tech-code-layer-mid"><span>API</span></div>
          <div className="tech-code-layer tech-code-layer-front"><strong>&lt;/&gt;</strong></div>
          <div className="tech-mini-code"><i /><i /><i /><b>spring.boot.run()</b></div>
        </div>
      </section>

      <section className="tech-category-bar" aria-label="글 카테고리">
        <button type="button" className={activeCategory === "all" ? "active" : ""} onClick={() => selectCategory("all")}>
          전체
        </button>
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={activeCategory === category ? "active" : ""}
            onClick={() => selectCategory(category)}
          >
            {categoryInfo[category].label}
          </button>
        ))}
      </section>

      <div className="tech-content-layout">
        <section className="tech-posts-section" id="recent-posts">
          <div className="tech-section-heading tech-recent-heading">
            <div>
              <span>RECENT POSTS</span>
              <h2>{activeCategory === "all" ? "최근 기록" : `${categoryInfo[activeCategory].label} 최신 기록`}</h2>
            </div>
            <Link href={categoryListHref}>모든 글 보기 →</Link>
          </div>

          <div className="tech-featured-grid">
            {visibleEntries.map((entry, index) => (
              <Link key={`${entry.category}-${entry.id}`} href={`/devlog/${entry.category}/${entry.id}`} className="tech-post-card">
                <div className={`tech-post-cover cover-${index + 1}`}>
                  <span>{entry.package || categoryInfo[entry.category].label}</span>
                  <strong>{index === 0 ? "{ code }" : index === 1 ? "API → DB" : "◫  ◧  ◨"}</strong>
                </div>
                <div className="tech-post-body">
                  <span className="tech-post-category">{categoryInfo[entry.category].label}</span>
                  <h3>{entry.title}</h3>
                  <p>{entry.description}</p>
                  <TagList tags={entry.tags.slice(0, 3)} />
                  <div className="tech-post-meta"><span><CalendarIcon /> {entry.date}</span><span>자세히 읽기 →</span></div>
                </div>
              </Link>
            ))}
          </div>

          {visibleEntries.length === 0 && <div className="tech-empty-state">이 카테고리에는 아직 기록이 없습니다.</div>}

          <div className="tech-category-cards">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={`tech-category-card${activeCategory === category ? " active" : ""}`}
                onClick={() => selectCategory(category, true)}
              >
                <span>{String((devlogData[category] || []).length).padStart(2, "0")}</span>
                <div><strong>{categoryInfo[category].label}</strong><p>{categoryInfo[category].description}</p></div>
                <b>→</b>
              </button>
            ))}
          </div>
        </section>

        <aside className="tech-home-sidebar">
          <section className="tech-sidebar-card">
            <h2>최근 업데이트</h2>
            <div className="tech-update-list">
              {recentEntries.slice(0, 5).map((entry, index) => (
                <Link key={`${entry.category}-${entry.id}`} href={`/devlog/${entry.category}/${entry.id}`}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div><strong>{entry.title}</strong><time>{entry.date}</time></div>
                </Link>
              ))}
            </div>
          </section>

          <section className="tech-sidebar-card">
            <h2>인기 태그</h2>
            <div className="tech-tag-cloud">
              {popularTags.map(([tag, count]) => (
                <Link key={tag} href={`/devlog?tab=all&pkg=All&q=${encodeURIComponent(tag)}&page=1`}>
                  {tag}<small>{count}</small>
                </Link>
              ))}
            </div>
            <Link href="/devlog" className="tech-sidebar-more">전체 태그와 글 보기 →</Link>
          </section>
        </aside>
      </div>
    </main>
  );
}
