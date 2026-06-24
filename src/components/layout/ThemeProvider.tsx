"use client";

import { useEffect, useState } from "react";

/**
 * Available themes. Add custom themes here in the future (e.g. "pink", "rainbow").
 * Each entry must have a corresponding .theme-{name} block in globals.css.
 */
const THEMES = ["light", "dark"] as const;
type Theme = (typeof THEMES)[number];

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const stored = localStorage.getItem("theme") as Theme | null;
    const system = window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
    const resolved = stored && THEMES.includes(stored) ? stored : system;
    // Class-based theme switching: remove all theme classes, add the resolved one
    THEMES.forEach((t) => document.documentElement.classList.remove(`theme-${t}`));
    document.documentElement.classList.add(`theme-${resolved}`);
    setTheme(resolved as Theme);
    setTimeout(() => {
      setMounted(true);
    }, 0);
  }, []);

  const toggleTheme = () => {
    // Cycle through THEMES array. Currently light ↔ dark.
    // When custom themes are added, this cycles: light → dark → pink → rainbow → light ...
    const currentIdx = THEMES.indexOf(theme);
    const nextIdx = (currentIdx + 1) % THEMES.length;
    const target = THEMES[nextIdx];
    THEMES.forEach((t) => document.documentElement.classList.remove(`theme-${t}`));
    document.documentElement.classList.add(`theme-${target}`);
    localStorage.setItem("theme", target);
    setTheme(target);
  };

  if (!mounted) return <>{children}</>;

  return (
    <>
      {children}
      <button
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label="Toggle Theme"
      >
        {theme === "light" ? "☀️" : "🌙"}
      </button>
    </>
  );
}
