"use client";
import { useRef, useEffect } from "react";

export function QuartzMechanism() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, 700, 260);

    ctx.font = "bold 18px Inter, Arial"; ctx.fillStyle = "#ffffff";
    ctx.fillText("Spring Scheduler vs Quartz Scheduler", 20, 30);
    ctx.font = "13px Inter"; ctx.fillStyle = "#888";
    ctx.fillText("Time-based Execution Mechanism Comparison", 20, 52);

    // Spring Side
    ctx.strokeStyle = "#64748b"; ctx.setLineDash([5, 5]); ctx.strokeRect(30, 70, 300, 170); ctx.setLineDash([]);
    ctx.fillStyle = "#94a3b8"; ctx.font = "600 13px Inter"; ctx.fillText("Spring Scheduler (Local)", 40, 90);
    ctx.fillStyle = "rgba(56,189,248,0.1)"; ctx.strokeStyle = "#38bdf8"; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.rect(60, 105, 240, 40); ctx.fill(); ctx.stroke();
    ctx.fillStyle = "#38bdf8"; ctx.font = "13px Inter"; ctx.fillText("Internal Memory (RAM)", 110, 130);
    ctx.strokeStyle = "#64748b"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(180, 145); ctx.lineTo(180, 170); ctx.stroke();
    ctx.fillStyle = "rgba(56,189,248,0.05)"; ctx.strokeStyle = "#475569";
    ctx.beginPath(); ctx.rect(110, 175, 140, 35); ctx.fill(); ctx.stroke();
    ctx.fillStyle = "#94a3b8"; ctx.font = "12px Inter"; ctx.fillText("Execute (Cron)", 140, 197);
    ctx.fillStyle = "#f97316"; ctx.font = "11px Inter"; ctx.fillText("⚠ 중복 실행 위험", 120, 225);

    // Quartz Side
    ctx.strokeStyle = "#64748b"; ctx.setLineDash([5, 5]); ctx.strokeRect(370, 70, 300, 170); ctx.setLineDash([]);
    ctx.fillStyle = "#94a3b8"; ctx.font = "600 13px Inter"; ctx.fillText("Quartz Scheduler (DB Persistence)", 380, 90);
    ctx.fillStyle = "rgba(168,85,247,0.1)"; ctx.strokeStyle = "#a855f7"; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.rect(400, 105, 240, 40); ctx.fill(); ctx.stroke();
    ctx.fillStyle = "#a855f7"; ctx.font = "13px Inter"; ctx.fillText("JDBC JobStore (Shared DB)", 435, 130);
    ctx.strokeStyle = "#64748b"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(520, 145); ctx.lineTo(520, 170); ctx.stroke();
    ctx.fillStyle = "rgba(168,85,247,0.05)"; ctx.strokeStyle = "#475569";
    ctx.beginPath(); ctx.rect(440, 175, 160, 35); ctx.fill(); ctx.stroke();
    ctx.fillStyle = "#94a3b8"; ctx.font = "12px Inter"; ctx.fillText("Execute (Precise Fire)", 460, 197);
    ctx.fillStyle = "#22c55e"; ctx.font = "11px Inter"; ctx.fillText("✓ 영속성 & 클러스터링 지원", 445, 225);
  }, []);

  return (
    <div className="diagram-container">
      <div style={{ background: "var(--bg-secondary)", padding: 30, borderRadius: 20, boxShadow: "var(--card-shadow)", border: "1px solid var(--border-color)" }}>
        <canvas ref={canvasRef} width={700} height={260} style={{ maxWidth: "100%", display: "block" }} />
      </div>
    </div>
  );
}
