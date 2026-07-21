"use client";

import React, { useState } from "react";

export function NotionCode({ language, children }: { language?: string, children: React.ReactNode }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    // A simple copy implementation extracting text content
    // We can get the text content from the innerText of the code block
    const pre = document.getElementById(`notion-code-${language}-${Math.random()}`)?.parentElement;
    if (pre && pre.innerText) {
      navigator.clipboard.writeText(pre.innerText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="notion-code-block my-4 rounded-xl border border-[var(--border-color)] overflow-hidden bg-[var(--bg-tertiary)] shadow-sm">
      <div className="flex justify-between items-center px-4 py-2 bg-[var(--bg-secondary)] border-b border-[var(--border-color)] text-xs text-[var(--text-secondary)]">
        <span className="uppercase font-semibold tracking-wider">{language === 'plain text' ? 'TEXT' : language}</span>
        <button 
          onClick={handleCopy}
          className="hover:text-white transition-colors flex items-center gap-1 px-2 py-1 rounded hover:bg-[#373e47]"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <div className="overflow-x-auto text-sm [&_pre]:!p-4 [&_pre]:!my-0 [&_pre]:!rounded-none [&_pre]:!border-none" onClick={(e) => {
        // Add an ID to the pre element inside children for copying
        const pre = e.currentTarget.querySelector('pre');
        if (pre && !pre.id) pre.id = `notion-code-${language}-${Math.random()}`;
      }}>
        {children}
      </div>
    </div>
  );
}
