"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type DeferredContentProps = {
  children: ReactNode;
  label?: string;
  className?: string;
  minHeight?: number;
  rootMargin?: string;
};

export function LoadingPlaceholder({
  label = "콘텐츠 불러오는 중",
  minHeight = 180,
  className = "",
}: Omit<DeferredContentProps, "children" | "rootMargin">) {
  return (
    <div
      className={`loading-placeholder${className ? ` ${className}` : ""}`}
      style={{ minHeight }}
      role="status"
      aria-live="polite"
    >
      <span className="loading-placeholder-icon" aria-hidden="true">{"{ … }"}</span>
      <span>{label}</span>
    </div>
  );
}

export function DeferredContent({
  children,
  label = "콘텐츠 불러오는 중",
  className = "",
  minHeight = 180,
  rootMargin = "320px 0px",
}: DeferredContentProps) {
  const anchorRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const anchor = anchorRef.current;
    if (!anchor || ready) return;

    let idleId: number | undefined;
    let timerId: ReturnType<typeof setTimeout> | undefined;

    const reveal = () => {
      if ("requestIdleCallback" in window) {
        idleId = window.requestIdleCallback(() => setReady(true), { timeout: 900 });
      } else {
        timerId = setTimeout(() => setReady(true), 1);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        reveal();
      },
      { rootMargin },
    );

    observer.observe(anchor);
    return () => {
      observer.disconnect();
      if (idleId !== undefined && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
      if (timerId !== undefined) clearTimeout(timerId);
    };
  }, [ready, rootMargin]);

  return (
    <div ref={anchorRef} className={className} aria-busy={!ready}>
      {ready ? children : <LoadingPlaceholder label={label} minHeight={minHeight} />}
    </div>
  );
}
