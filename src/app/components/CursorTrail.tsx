"use client";

import { useEffect, useRef } from "react";

// Base trail length in pixels
const BASE_TRAIL_LENGTH = 360;
// Maximum trail points to keep rendering buttery smooth
const MAX_POINTS = 90;
// Lifetime when cursor stops moving (smoothly dissolves in 750ms)
const TRAIL_LIFETIME = 750;
// Easing factor for the trailing pen: responsive and natural
const EASE_FACTOR = 0.24;
// Snake head thickness (px)
const HEAD_WIDTH = 7.5;
// Snake tail tip minimum thickness (px) when moving
const TAIL_TIP_MIN = 0.4;
const TAIL_TIP_REST = 0.85;

interface TrailPoint {
  x: number;
  y: number;
  time: number;
}

function hexToRgb(hex: string) {
  const clean = hex.replace("#", "");
  const num = parseInt(clean, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trail = useRef<TrailPoint[]>([]);
  const mousePos = useRef<{ x: number; y: number } | null>(null);
  const lastMousePos = useRef<{ x: number; y: number } | null>(null);
  const penPos = useRef<{ x: number; y: number } | null>(null);
  const rawSpeed = useRef<number>(0);
  const smoothedSpeed = useRef<number>(0);
  const animRef = useRef<number>(0);
  const colorRef = useRef<{ r: number; g: number; b: number }>({ r: 5, g: 150, b: 105 });
  const targetColorRef = useRef<{ r: number; g: number; b: number }>({ r: 5, g: 150, b: 105 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.resetTransform?.();
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });

    const handleMouseMove = (e: MouseEvent) => {
      const mx = e.clientX;
      const my = e.clientY;

      if (lastMousePos.current) {
        const d = Math.hypot(mx - lastMousePos.current.x, my - lastMousePos.current.y);
        rawSpeed.current = Math.min(80, d);
      }
      lastMousePos.current = { x: mx, y: my };
      mousePos.current = { x: mx, y: my };

      if (!penPos.current) {
        penPos.current = { x: mx, y: my };
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const handleColorChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ color: string }>;
      if (customEvent.detail?.color) {
        targetColorRef.current = hexToRgb(customEvent.detail.color);
      }
    };
    window.addEventListener("theme-color-change", handleColorChange);

    const animate = () => {
      const dpr = window.devicePixelRatio || 1;
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

      const now = performance.now();

      // Smooth color transitions to match architecture accent
      colorRef.current.r += (targetColorRef.current.r - colorRef.current.r) * 0.08;
      colorRef.current.g += (targetColorRef.current.g - colorRef.current.g) * 0.08;
      colorRef.current.b += (targetColorRef.current.b - colorRef.current.b) * 0.08;
      const cr = Math.round(colorRef.current.r);
      const cg = Math.round(colorRef.current.g);
      const cb = Math.round(colorRef.current.b);

      // Track cursor motion and sustained movement
      smoothedSpeed.current += (rawSpeed.current - smoothedSpeed.current) * 0.14;
      rawSpeed.current *= 0.86;

      const motionBonus = Math.min(1, smoothedSpeed.current / 18);
      const dynamicMaxLength = BASE_TRAIL_LENGTH + motionBonus * 50;

      // Dynamic head & tail sizing: as you keep moving, head is sleek and tail tapers needle-thin
      const currentHeadWidth = HEAD_WIDTH - motionBonus * 0.8;
      const currentTailMin = TAIL_TIP_REST - motionBonus * (TAIL_TIP_REST - TAIL_TIP_MIN);
      const taperPower = 1.35 + motionBonus * 0.5;

      // Smooth trailing pen interpolation towards current mouse position
      if (mousePos.current && penPos.current) {
        const dx = mousePos.current.x - penPos.current.x;
        const dy = mousePos.current.y - penPos.current.y;
        const dist = Math.hypot(dx, dy);

        if (dist > 0.4) {
          penPos.current.x += dx * EASE_FACTOR;
          penPos.current.y += dy * EASE_FACTOR;

          const lastPoint = trail.current[trail.current.length - 1];
          const pDist = lastPoint
            ? Math.hypot(penPos.current.x - lastPoint.x, penPos.current.y - lastPoint.y)
            : 999;

          // High-resolution point spacing so curve and taper are always silky-smooth
          const STEP_DIST = 3.5;
          if (pDist >= STEP_DIST) {
            if (!lastPoint || pDist > 40) {
              trail.current.push({
                x: penPos.current.x,
                y: penPos.current.y,
                time: now,
              });
            } else {
              const steps = Math.min(10, Math.floor(pDist / STEP_DIST));
              for (let s = 1; s <= steps; s++) {
                const frac = s / steps;
                trail.current.push({
                  x: lastPoint.x + (penPos.current.x - lastPoint.x) * frac,
                  y: lastPoint.y + (penPos.current.y - lastPoint.y) * frac,
                  time: now,
                });
              }
            }
          }
        }
      }

      // Filter out points older than lifetime (smooth dissolution when stopped)
      trail.current = trail.current.filter((p) => now - p.time <= TRAIL_LIFETIME);
      const pts = trail.current;

      if (pts.length > 1) {
        // Calculate cumulative distance from the head (newest point) backwards
        const distsFromHead: number[] = new Array(pts.length).fill(0);
        let totalDist = 0;
        for (let i = pts.length - 2; i >= 0; i--) {
          const segDist = Math.hypot(pts[i + 1].x - pts[i].x, pts[i + 1].y - pts[i].y);
          totalDist += segDist;
          distsFromHead[i] = totalDist;
        }

        // Prune any points beyond current maximum length or point limit
        let firstVisibleIdx = 0;
        while (
          firstVisibleIdx < pts.length - 1 &&
          (distsFromHead[firstVisibleIdx] > dynamicMaxLength || pts.length - firstVisibleIdx > MAX_POINTS)
        ) {
          firstVisibleIdx++;
        }
        if (firstVisibleIdx > 0) {
          trail.current.splice(0, firstVisibleIdx);
        }

        // Effective trail length for normalizing snake anatomy from head (0) to tail tip (1)
        // As you keep moving, trail extends and the tail progressively thins down
        const effTrailLength = Math.max(totalDist, 60);

        // Helper function to calculate width along the snake body
        const getWidthAtDist = (dist: number) => {
          // Progress from head (0) to tail tip (1)
          const t = Math.min(1, Math.max(0, dist / effTrailLength));

          let shape: number;
          if (t < 0.12) {
            // Head & neck: rounded, full contour
            shape = 1.0 - 0.08 * (t / 0.12);
          } else {
            // Tail: graceful organic taper to razor-thin tip
            const tailProgress = (t - 0.12) / 0.88;
            shape = 0.92 * Math.pow(1 - tailProgress, taperPower);
          }

          return currentTailMin + (currentHeadWidth - currentTailMin) * Math.max(0, shape);
        };

        // Draw snake body with continuous varying width
        for (let i = 0; i < pts.length - 1; i++) {
          const p1 = pts[i];
          const p2 = pts[i + 1];
          const dist1 = distsFromHead[i] ?? 0;
          const dist2 = distsFromHead[i + 1] ?? 0;

          const w1 = getWidthAtDist(dist1);
          const w2 = getWidthAtDist(dist2);
          const segLineWidth = (w1 + w2) / 2;

          // Normalized progress for subtle feathering only at the absolute tip of tail
          const t = Math.min(1, Math.max(0, dist1 / effTrailLength));
          const tailTipFade = t > 0.88 ? Math.max(0.2, (1 - t) / 0.12) : 1;

          // Time-based fade for when the cursor comes to a stop
          const age = Math.min(1, Math.max(0, (now - p1.time) / TRAIL_LIFETIME));
          const timeFade = Math.max(0, 1 - Math.pow(age, 2.4));

          const opacity = tailTipFade * timeFade;
          if (opacity <= 0.01) continue;

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(${cr}, ${cg}, ${cb}, ${opacity})`;
          ctx.lineWidth = segLineWidth;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.stroke();
        }
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("theme-color-change", handleColorChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 99999,
      }}
    />
  );
}
