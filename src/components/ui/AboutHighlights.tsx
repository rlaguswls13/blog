"use client";

import { useEffect, useState } from "react";

interface HighlightItem {
  title: string;
  description: string;
}

const GRID_SIZE = 4; // items per "page" in 2×2

export function AboutHighlights({ items }: { items: HighlightItem[] }) {
  const [isJumping, setIsJumping] = useState(false);

  const totalPages = Math.ceil(items.length / GRID_SIZE);
  const needsCarousel = items.length > GRID_SIZE;

  // Build display pages: [last, ...real, first] for infinite loop
  const pages = Array.from({ length: totalPages }, (_, i) =>
    items.slice(i * GRID_SIZE, (i + 1) * GRID_SIZE)
  );
  const displayPages = needsCarousel
    ? [pages[totalPages - 1], ...pages, pages[0]]
    : pages;

  // trackPage: 1-based within displayPages (0 = clone-last, N+1 = clone-first)
  const [trackPage, setTrackPage] = useState(1);

  const goNext = () => {
    if (!needsCarousel) return;
    setIsJumping(false);
    setTrackPage((p) => Math.min(p + 1, totalPages + 1));
  };

  const goPrev = () => {
    if (!needsCarousel) return;
    setIsJumping(false);
    setTrackPage((p) => Math.max(p - 1, 0));
  };

  useEffect(() => {
    if (!isJumping) return;
    const id = requestAnimationFrame(() => setIsJumping(false));
    return () => cancelAnimationFrame(id);
  }, [isJumping]);

  const handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget || e.propertyName !== "transform") return;
    if (!needsCarousel) return;
    if (trackPage === 0) {
      setIsJumping(true);
      setTrackPage(totalPages);
    } else if (trackPage === totalPages + 1) {
      setIsJumping(true);
      setTrackPage(1);
    }
  };

  const effective = needsCarousel
    ? Math.min(Math.max(trackPage, 0), totalPages + 1)
    : 0;
  const activeDot = needsCarousel
    ? (effective - 1 + totalPages) % totalPages
    : 0;

  if (!needsCarousel) {
    // Simple 2×2 grid, no carousel
    return (
      <div className="about-highlights-section">
        {items.map((item, i) => (
          <HighlightCard key={i} item={item} index={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="about-highlights-carousel-wrap">
      <div className="about-highlights-carousel-viewport">
        <div
          className={`about-highlights-carousel-track${isJumping ? " no-transition" : ""}`}
          style={{ transform: `translateX(-${effective * 100}%)` }}
          onTransitionEnd={handleTransitionEnd}
        >
          {displayPages.map((pageItems, pi) => (
            <div key={pi} className="about-highlights-carousel-page">
              <div className="about-highlights-section">
                {pageItems.map((item, i) => (
                  <HighlightCard key={i} item={item} index={(activeDot * GRID_SIZE) + i} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="about-highlights-carousel-footer">
        <div className="about-highlights-dots">
          {pages.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`about-highlights-dot${i === activeDot ? " active" : ""}`}
              onClick={() => { setIsJumping(false); setTrackPage(i + 1); }}
              aria-label={`${i + 1}페이지`}
            />
          ))}
        </div>
        <div className="about-highlights-controls">
          <button type="button" className="about-highlights-nav" onClick={goPrev} aria-label="이전">‹</button>
          <button type="button" className="about-highlights-nav" onClick={goNext} aria-label="다음">›</button>
        </div>
      </div>
    </div>
  );
}

function HighlightCard({ item, index }: { item: HighlightItem; index: number }) {
  return (
    <article className="about-highlights-card">
      <span className="about-intro-highlight-index">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="about-intro-highlight-title">{item.title}</div>
      <p className="about-intro-highlight-description">{item.description}</p>
    </article>
  );
}
