import React from "react";

export function SvgIcon({ children, className = "", style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={`block shrink-0 w-[1em] h-[1em] ${className}`}
      style={style}
    >
      {children}
    </svg>
  );
}


export const Icons = {
  Lock: ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
    <SvgIcon className={className} style={style}>
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </SvgIcon>
  ),
  Key: ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
    <SvgIcon className={className} style={style}>
      <circle cx="7.5" cy="15.5" r="5.5" />
      <path d="m21 2-9.6 9.6" />
      <path d="m15.5 7.5 3 3L22 7l-3-3" />
    </SvgIcon>
  ),
  Shield: ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
    <SvgIcon className={className} style={style}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      <path d="m9 12 2 2 4-4" />
    </SvgIcon>
  ),
  Refresh: ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
    <SvgIcon className={className} style={style}>
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
    </SvgIcon>
  ),
  Target: ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
    <SvgIcon className={className} style={style}>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </SvgIcon>
  ),
  Clipboard: ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
    <SvgIcon className={className} style={style}>
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path d="M12 11h4" />
      <path d="M12 16h4" />
      <path d="M8 11h.01" />
      <path d="M8 16h.01" />
    </SvgIcon>
  ),
  Building: ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
    <SvgIcon className={className} style={style}>
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M12 6h.01" />
      <path d="M12 10h.01" />
      <path d="M12 14h.01" />
      <path d="M16 10h.01" />
      <path d="M16 14h.01" />
      <path d="M8 10h.01" />
      <path d="M8 14h.01" />
    </SvgIcon>
  ),
  Container: ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
    <SvgIcon className={className} style={style}>
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </SvgIcon>
  ),
  Architecture: ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
    <SvgIcon className={className} style={style}>
      <path d="M3 21h18" />
      <path d="M5 21V7l8-4v18" />
      <path d="M19 21V11l-6-3" />
      <path d="M9 9h.01" />
      <path d="M9 13h.01" />
      <path d="M9 17h.01" />
    </SvgIcon>
  ),
  Users: ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
    <SvgIcon className={className} style={style}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </SvgIcon>
  ),
  Package: ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
    <SvgIcon className={className} style={style}>
      <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" />
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </SvgIcon>
  ),
  Wrench: ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
    <SvgIcon className={className} style={style}>
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </SvgIcon>
  ),
  Monitor: ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
    <SvgIcon className={className} style={style}>
      <rect width="20" height="14" x="2" y="3" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </SvgIcon>
  ),
  BarChart: ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
    <SvgIcon className={className} style={style}>
      <line x1="12" y1="20" x2="12" y2="10" />
      <line x1="18" y1="20" x2="18" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </SvgIcon>
  ),
  Settings: ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
    <SvgIcon className={className} style={style}>
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </SvgIcon>
  ),
  Rocket: ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
    <SvgIcon className={className} style={style}>
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </SvgIcon>
  ),
  Coins: ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
    <SvgIcon className={className} style={style}>
      <circle cx="8" cy="8" r="6" />
      <path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
      <path d="M7 6h1v4" />
      <path d="m16.71 13.88.7.71-2.82 2.82" />
    </SvgIcon>
  ),
  TrendingUp: ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
    <SvgIcon className={className} style={style}>
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </SvgIcon>
  ),
  Zap: ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
    <SvgIcon className={className} style={style}>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </SvgIcon>
  ),
  Radio: ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
    <SvgIcon className={className} style={style}>
      <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9" />
      <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5" />
      <circle cx="12" cy="12" r="2" />
      <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5" />
      <path d="M19.1 4.9C23 8.8 23 15.1 19.1 19" />
    </SvgIcon>
  ),
  Laptop: ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
    <SvgIcon className={className} style={style}>
      <path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16" />
    </SvgIcon>
  ),
  Globe: ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
    <SvgIcon className={className} style={style}>
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </SvgIcon>
  ),
  Folder: ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
    <SvgIcon className={className} style={style}>
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </SvgIcon>
  ),
  Database: ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
    <SvgIcon className={className} style={style}>
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </SvgIcon>
  ),
  HardDrive: ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
    <SvgIcon className={className} style={style}>
      <line x1="22" y1="12" x2="2" y2="12" />
      <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
      <line x1="6" y1="16" x2="6.01" y2="16" />
      <line x1="10" y1="16" x2="10.01" y2="16" />
    </SvgIcon>
  ),
  ServerRack: ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
    <SvgIcon className={className} style={style}>
      <rect x="2" y="3" width="20" height="6" rx="1" />
      <rect x="2" y="15" width="20" height="6" rx="1" />
    </SvgIcon>
  ),
  DatabaseStack: ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
    <SvgIcon className={className} style={style}>
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <ellipse cx="12" cy="12" rx="9" ry="3" />
      <ellipse cx="12" cy="19" rx="9" ry="3" />
    </SvgIcon>
  ),
  ServerNAS: ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
    <SvgIcon className={className} style={style}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 11h.01M11 11h.01M15 11h.01" />
    </SvgIcon>
  ),
};
