"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/devlog", label: "Devlog" },
  { href: "/blog", label: "Resume" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();

  const getActiveLabel = () => {
    const match = navItems.find((item) => {
      if (item.href === "/") return pathname === "/";
      return pathname.startsWith(item.href);
    });
    return match?.label || "My Portfolio";
  };

  return (
    <nav>
      <div className="nav-brand">{getActiveLabel()}</div>
      <div className="nav-links">
        {navItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={isActive ? "active" : ""}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
