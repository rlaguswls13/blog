"use client";

import { useEffect, useState } from "react";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const system = window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
    document.documentElement.setAttribute("data-theme", stored || system);
    setTimeout(() => {
      setMounted(true);
    }, 0);
  }, []);

  const toggleTheme = () => {
    const current = document.documentElement.getAttribute("data-theme");
    const target = current === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", target);
    localStorage.setItem("theme", target);
  };

  if (!mounted) return <>{children}</>;

  return (
    <>
      {children}
      <button
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label="Toggle Dark/Light Mode"
      >
        {typeof window !== "undefined" &&
        document.documentElement.getAttribute("data-theme") === "light"
          ? "☀️"
          : "🌙"}
      </button>
    </>
  );
}
