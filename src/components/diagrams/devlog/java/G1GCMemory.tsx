"use client";
import { useRef, useEffect } from "react";

export function G1GCMemory() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, 600, 240);

    ctx.font = "bold 13px Arial";
    ctx.fillStyle = "#e0e0e0";
    ctx.fillText("Before Tuning (Small Regions, Humongous Allocation)", 20, 25);

    ctx.fillStyle = "#2d2d2d";
    ctx.strokeStyle = "#555";
    for (let i = 0; i < 9; i++) {
      ctx.fillRect(20 + i * 60, 40, 55, 55);
      ctx.strokeRect(20 + i * 60, 40, 55, 55);
    }

    ctx.fillStyle = "rgba(187, 134, 252, 0.4)";
    ctx.fillRect(20 + 2 * 60, 40, 55 * 3 + 10, 55);
    ctx.strokeStyle = "#BB86FC";
    ctx.strokeRect(20 + 2 * 60, 40, 55 * 3 + 10, 55);
    ctx.fillStyle = "#BB86FC";
    ctx.font = "12px Arial";
    ctx.fillText("Humongous Object (10MB)", 20 + 2 * 60 + 10, 72);
    ctx.fillText("Fragmented!", 20 + 2 * 60 + 10, 88);

    ctx.font = "bold 13px Arial";
    ctx.fillStyle = "#e0e0e0";
    ctx.fillText("After Tuning (Region Size: 32MB)", 20, 135);

    ctx.fillStyle = "#2d2d2d";
    ctx.strokeStyle = "#555";
    for (let i = 0; i < 4; i++) {
      ctx.fillRect(20 + i * 130, 150, 120, 60);
      ctx.strokeRect(20 + i * 130, 150, 120, 60);
    }

    ctx.fillStyle = "rgba(3, 218, 198, 0.4)";
    ctx.fillRect(20 + 1 * 130, 150, 90, 60);
    ctx.strokeStyle = "#03DAC6";
    ctx.strokeRect(20 + 1 * 130, 150, 90, 60);
    ctx.fillStyle = "#03DAC6";
    ctx.font = "12px Arial";
    ctx.fillText("Normal (10MB)", 20 + 1 * 130 + 5, 185);
  }, []);

  return (
    <div className="diagram-container">
      <canvas ref={canvasRef} width={600} height={240} style={{ background: "var(--bg-secondary)", borderRadius: 8, border: "1px solid var(--border-color)", maxWidth: "100%" }} />
    </div>
  );
}
