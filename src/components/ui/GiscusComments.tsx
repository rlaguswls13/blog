"use client";

import { useEffect, useRef } from "react";

function getThemeUrl(theme: "light" | "dark") {
  const devlogPathIndex = window.location.pathname.indexOf("/devlog/");
  const basePath = devlogPathIndex > 0
    ? window.location.pathname.slice(0, devlogPathIndex)
    : "";

  const themeUrl = new URL(
    `${basePath}/giscus-themes/${theme}.css`,
    window.location.origin,
  );
  themeUrl.searchParams.set("v", "20260721-3");
  return themeUrl.href;
}

function getCurrentTheme() {
  return document.documentElement.classList.contains("theme-dark")
    ? "dark"
    : "light";
}

function getCurrentGiscusTheme() {
  return getThemeUrl(getCurrentTheme());
}

export function GiscusComments() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    script.setAttribute("data-repo", "rlaguswls13/giscus-blog");
    script.setAttribute("data-repo-id", "R_kgDOTe9p7Q");
    script.setAttribute("data-category", "Announcements");
    script.setAttribute("data-category-id", "DIC_kwDOTe9p7c4DBpNR");
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "0");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "bottom");
    script.setAttribute("data-theme", getCurrentGiscusTheme());
    script.setAttribute("data-lang", "ko");
    container.appendChild(script);

    const syncTheme = () => {
      const theme = getCurrentGiscusTheme();
      script.setAttribute("data-theme", theme);
      const frame = container.querySelector<HTMLIFrameElement>("iframe.giscus-frame");
      if (frame) frame.style.colorScheme = getCurrentTheme();
      frame?.contentWindow?.postMessage(
        { giscus: { setConfig: { theme } } },
        "https://giscus.app",
      );
    };

    let currentFrame: HTMLIFrameElement | null = null;
    const bindFrameLoad = () => {
      const nextFrame = container.querySelector<HTMLIFrameElement>("iframe.giscus-frame");
      if (nextFrame === currentFrame) return;

      currentFrame?.removeEventListener("load", syncTheme);
      currentFrame = nextFrame;
      currentFrame?.addEventListener("load", syncTheme);
    };

    const themeObserver = new MutationObserver(syncTheme);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const frameObserver = new MutationObserver(bindFrameLoad);
    frameObserver.observe(container, { childList: true, subtree: true });

    return () => {
      themeObserver.disconnect();
      frameObserver.disconnect();
      currentFrame?.removeEventListener("load", syncTheme);
      container.replaceChildren();
    };
  }, []);

  return (
    <section className="comments-section" aria-labelledby="comments-title">
      <div className="comments-heading">
        <span className="page-heading-eyebrow">DISCUSSION</span>
        <p>GitHub 계정으로 의견이나 질문을 남길 수 있습니다.</p>
      </div>
      <div ref={containerRef} className="giscus-container" />
    </section>
  );
}
