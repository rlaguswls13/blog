"use client";
import { useRef, useEffect } from "react";

export function QuartzHAClustering() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, 700, 320);

    ctx.font = "bold 18px Inter, Arial"; ctx.fillStyle = "#ffffff";
    ctx.fillText("Quartz HA Clustering (Greedy Locking)", 20, 30);
    ctx.font = "13px Inter"; ctx.fillStyle = "#888";
    ctx.fillText("DB Lock 선점 방식 — First-come, First-served", 20, 52);

    const nodes = ["Engine 1", "Engine 2", "Engine 3", "Engine 4"];
    nodes.forEach((name, i) => {
      const x = 40 + i * 165;
      const isWinner = i === 0;
      ctx.fillStyle = isWinner ? "rgba(244,63,94,0.15)" : "rgba(51,65,85,0.5)";
      ctx.strokeStyle = isWinner ? "#f43f5e" : "#475569";
      ctx.lineWidth = isWinner ? 2.5 : 1;
      ctx.beginPath(); ctx.rect(x, 70, 130, 55); ctx.fill(); ctx.stroke();
      ctx.fillStyle = isWinner ? "#f43f5e" : "#94a3b8";
      ctx.font = isWinner ? "bold 13px Inter" : "13px Inter";
      ctx.fillText(name, x + 35, 100);
      if (isWinner) { ctx.fillStyle = "#f43f5e"; ctx.font = "10px Inter"; ctx.fillText("(Lock 선점)", x + 37, 115); }
      ctx.setLineDash([4, 4]); ctx.strokeStyle = isWinner ? "#f43f5e" : "#334155";
      ctx.lineWidth = isWinner ? 1.5 : 0.8;
      ctx.beginPath(); ctx.moveTo(x + 65, 125); ctx.lineTo(350, 190); ctx.stroke(); ctx.setLineDash([]);
    });

    ctx.fillStyle = "rgba(168,85,247,0.1)"; ctx.strokeStyle = "#a855f7"; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.rect(240, 180, 220, 65); ctx.fill(); ctx.stroke();
    ctx.fillStyle = "#a855f7"; ctx.font = "bold 13px Inter"; ctx.fillText("QRTZ_LOCKS Table", 295, 210);
    ctx.font = "11px Inter"; ctx.fillStyle = "#94a3b8"; ctx.fillText("Row-level Exclusive Lock", 290, 230);

    ctx.fillStyle = "rgba(249,115,22,0.08)"; ctx.strokeStyle = "rgba(249,115,22,0.4)"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.rect(180, 265, 340, 40); ctx.fill(); ctx.stroke();
    ctx.fillStyle = "#f97316"; ctx.font = "bold 12px Inter";
    ctx.fillText("⚠ 문제: 특정 노드가 모든 작업을 독식 (쏠림 현상)", 195, 290);
  }, []);

  return (
    <div className="diagram-container">
      <div style={{ background: "#1a1a1a", padding: 30, borderRadius: 20, boxShadow: "0 20px 50px rgba(0,0,0,0.6)", border: "1px solid #333" }}>
        <canvas ref={canvasRef} width={700} height={320} style={{ maxWidth: "100%", display: "block" }} />
      </div>
    </div>
  );
}
