"use client";
import { useRef, useEffect } from "react";

export function QuartzSharding() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, 700, 360);

    const isDark = document.documentElement.classList.contains("theme-dark");
    const titleColor = isDark ? "#ffffff" : "#111827";
    const subColor = isDark ? "#888888" : "#6b7280";

    ctx.font = "bold 18px Inter, Arial"; ctx.fillStyle = titleColor;
    ctx.fillText("Optimized: Distributed Execution (Sharding)", 20, 30);
    ctx.font = "13px Inter"; ctx.fillStyle = subColor;
    ctx.fillText("등록/실행 역할 분리 + 쿼리 파티셔닝 기반 균등 분배", 20, 52);

    // Master
    ctx.fillStyle = "rgba(34,197,94,0.1)"; ctx.strokeStyle = "#22c55e"; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.rect(250, 70, 200, 50); ctx.fill(); ctx.stroke();
    ctx.fillStyle = "#22c55e"; ctx.font = "bold 14px Inter"; ctx.fillText("등록 엔진 (Master)", 290, 100);

    // Arrow
    ctx.strokeStyle = "#475569"; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(350, 120); ctx.lineTo(350, 150); ctx.stroke();
    ctx.fillStyle = "#94a3b8"; ctx.font = "11px Inter"; ctx.fillText("Upsert Schedule", 360, 140);

    // DB
    ctx.fillStyle = "rgba(168,85,247,0.1)"; ctx.strokeStyle = "#a855f7"; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.rect(260, 155, 180, 55); ctx.fill(); ctx.stroke();
    ctx.fillStyle = "#a855f7"; ctx.font = "bold 13px Inter"; ctx.fillText("Shared Job DB", 305, 185);

    // Workers
    const workers = [
      { label: "실행 엔진 1", cond: "ID % 4 = 0", pct: "25%" },
      { label: "실행 엔진 2", cond: "ID % 4 = 1", pct: "25%" },
      { label: "실행 엔진 3", cond: "ID % 4 = 2", pct: "25%" },
      { label: "실행 엔진 4", cond: "ID % 4 = 3", pct: "25%" },
    ];
    workers.forEach((w, i) => {
      const x = 25 + i * 170, y = 260;
      ctx.fillStyle = "rgba(56,189,248,0.1)"; ctx.strokeStyle = "#38bdf8"; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.rect(x, y, 145, 65); ctx.fill(); ctx.stroke();
      ctx.fillStyle = "#38bdf8"; ctx.font = "bold 12px Inter"; ctx.fillText(w.label, x + 30, y + 25);
      ctx.font = "11px Inter"; ctx.fillStyle = "#94a3b8"; ctx.fillText(w.cond, x + 42, y + 42);
      ctx.fillStyle = "rgba(34,197,94,0.2)"; ctx.strokeStyle = "#22c55e"; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.rect(x + 52, y + 48, 40, 16); ctx.fill(); ctx.stroke();
      ctx.fillStyle = "#22c55e"; ctx.font = "bold 10px Inter"; ctx.fillText(w.pct, x + 62, y + 60);
      ctx.strokeStyle = "#334155"; ctx.lineWidth = 1; ctx.setLineDash([3, 3]);
      ctx.beginPath(); ctx.moveTo(350, 210); ctx.lineTo(x + 72, y); ctx.stroke(); ctx.setLineDash([]);
    });

    ctx.fillStyle = "#94a3b8"; ctx.font = "italic 12px Inter";
    ctx.fillText("✓ Perfect Load Balancing via Query Partitioning", 215, 348);
  }, []);

  return (
    <div className="diagram-container">
      <div style={{ background: "var(--bg-secondary)", padding: 30, borderRadius: 20, boxShadow: "var(--card-shadow)", border: "1px solid var(--border-color)" }}>
        <canvas ref={canvasRef} width={700} height={360} style={{ maxWidth: "100%", display: "block" }} />
      </div>
    </div>
  );
}
