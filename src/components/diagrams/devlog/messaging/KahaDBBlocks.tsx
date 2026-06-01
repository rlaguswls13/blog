"use client";
import { useRef, useEffect } from "react";

export function KahaDBBlocks() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.font = "bold 20px Inter, Arial";
    ctx.fillStyle = "#ffffff";
    ctx.fillText("KahaDB Log File Management", 20, 40);
    ctx.font = "14px Inter";
    ctx.fillStyle = "#888";
    ctx.fillText("Automatic Cleanup Mechanism (16MB Unit)", 20, 65);

    const blockY = 120, blockSize = 120;
    for (let b = 0; b < 4; b++) {
      const x = 20 + b * 150;
      ctx.strokeStyle = "#444"; ctx.setLineDash([6, 4]); ctx.lineWidth = 1;
      ctx.strokeRect(x, blockY, blockSize, blockSize); ctx.setLineDash([]);
      ctx.fillStyle = "#aaa"; ctx.font = "600 13px Inter, Arial";
      ctx.fillText(`db-${b + 1}.log`, x + 35, blockY - 15);

      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
          const mx = x + 12 + c * 36, my = blockY + 12 + r * 36, ms = 24;
          if (b < 2) { ctx.fillStyle = "rgba(74,222,128,0.15)"; ctx.strokeStyle = "#4ade80"; }
          else if (b === 2) {
            if (r === 1 && c === 1) { ctx.fillStyle = "rgba(248,113,113,0.9)"; ctx.strokeStyle = "#ef4444"; }
            else { ctx.fillStyle = "rgba(74,222,128,0.15)"; ctx.strokeStyle = "#4ade80"; }
          } else { ctx.fillStyle = "rgba(255,255,255,0.05)"; ctx.strokeStyle = "#555"; }
          ctx.beginPath(); ctx.rect(mx, my, ms, ms); ctx.fill(); ctx.stroke();
        }
      }

      ctx.font = "bold 12px Inter, Arial";
      if (b < 2) { ctx.fillStyle = "#4ade80"; ctx.fillText("CLEANED", x + 32, blockY + blockSize + 25); }
      else if (b === 2) { ctx.fillStyle = "#f87171"; ctx.fillText("HELD ON DISK", x + 20, blockY + blockSize + 25); }
      else { ctx.fillStyle = "#555"; ctx.fillText("PENDING", x + 35, blockY + blockSize + 25); }
    }

    // S-curve arrow
    ctx.strokeStyle = "#f87171"; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(338, 205);
    ctx.bezierCurveTo(338, 305, 310, 380, 430, 360); ctx.stroke();
    ctx.beginPath(); ctx.fillStyle = "#f87171";
    ctx.moveTo(430, 360); ctx.lineTo(422, 354); ctx.lineTo(422, 366); ctx.fill();

    // Warning box
    ctx.fillStyle = "rgba(248,113,113,0.1)"; ctx.beginPath(); ctx.rect(430, 335, 175, 65); ctx.fill();
    ctx.strokeStyle = "rgba(248,113,113,0.5)"; ctx.stroke();
    ctx.fillStyle = "#f87171"; ctx.font = "bold 13px Inter, Arial";
    ctx.fillText("단 1개의 메시지만 남아도", 440, 362);
    ctx.fillText("16MB 파일 삭제 불가!", 440, 384);

    // Legend
    const ly = 435; ctx.font = "12px Inter, Arial";
    ctx.fillStyle = "rgba(74,222,128,0.15)"; ctx.fillRect(20, ly - 12, 15, 15);
    ctx.strokeStyle = "#4ade80"; ctx.strokeRect(20, ly - 12, 15, 15);
    ctx.fillStyle = "#999"; ctx.fillText("처리 완료 (Dequeue)", 42, ly);
    ctx.fillStyle = "rgba(248,113,113,0.9)"; ctx.fillRect(180, ly - 12, 15, 15);
    ctx.strokeStyle = "#ef4444"; ctx.strokeRect(180, ly - 12, 15, 15);
    ctx.fillStyle = "#999"; ctx.fillText("미처리 데이터 (Dirty)", 202, ly);
  }, []);

  return (
    <div className="diagram-container">
      <div style={{ background: "var(--bg-secondary)", padding: 30, borderRadius: 20, boxShadow: "var(--card-shadow)", border: "1px solid var(--border-color)" }}>
        <canvas ref={canvasRef} width={620} height={460} style={{ maxWidth: "100%", display: "block" }} />
      </div>
    </div>
  );
}
