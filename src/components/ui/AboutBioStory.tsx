"use client";

import { useState } from "react";

interface AboutBioStoryProps {
  paragraphs: string[];
}

export function AboutBioStory({ paragraphs }: AboutBioStoryProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="about-bio-story-wrap">
      <button
        type="button"
        className={`about-bio-story-toggle${open ? " open" : ""}`}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span>상세 보기</span>
        <svg
          className="about-bio-story-chevron"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M4 6l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div
        className={`about-bio-story-body${open ? " open" : ""}`}
        aria-hidden={!open}
      >
        <div className="about-bio-story-inner">
          {paragraphs.map((text, i) => (
            <p key={i} className="about-intro-paragraph">
              {text}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
