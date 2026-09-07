"use client";

import { useEffect, useRef } from "react";
import styles from "./surprise.module.css";

const COLORS = ["#f3c6d5", "#d98fa8", "#f7e6b8", "#dbe7f6", "#d8cdea", "#ffffff"];

type Petal = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  spin: number;
  angle: number;
  color: string;
  life: number;
};

/**
 * The petals that scatter outwards after the flower blooms.
 * Plain canvas — no animation library.
 */
export default function PetalCanvas({ burstKey }: { burstKey: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const petals = useRef<Petal[]>([]);
  const frame = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      petals.current = petals.current.filter((p) => p.life > 0);
      for (const p of petals.current) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.055; // gravity
        p.vx *= 0.992; // drag
        p.angle += p.spin;
        p.life -= 0.006;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.globalAlpha = Math.max(0, Math.min(1, p.life));
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size * 0.55, p.size, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      frame.current = requestAnimationFrame(draw);
    };
    frame.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frame.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // Every change of burstKey throws a fresh handful of petals.
  useEffect(() => {
    if (burstKey === 0) return;

    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const count = 46;

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2.5 + Math.random() * 5.5;
      petals.current.push({
        x: cx + (Math.random() - 0.5) * 30,
        y: cy + (Math.random() - 0.5) * 30,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2.5,
        size: 6 + Math.random() * 8,
        spin: (Math.random() - 0.5) * 0.22,
        angle: Math.random() * Math.PI,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        life: 1,
      });
    }
  }, [burstKey]);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
}
