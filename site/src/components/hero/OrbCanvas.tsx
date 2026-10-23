"use client";

import { useEffect, useRef } from "react";

const GOLD = [200, 169, 107] as const;
const PINK = [232, 167, 189] as const;

/**
 * Lightweight 2D-canvas "armillary" sphere: a Fibonacci point cloud with
 * meridian rings and a pink orbit. No WebGL, ~900 points, paused off-screen.
 */
export function OrbCanvas({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.innerWidth < 768;
    const COUNT = small ? 380 : 880;

    // Fibonacci sphere
    const pts = new Float32Array(COUNT * 3);
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < COUNT; i++) {
      const y = 1 - (i / (COUNT - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const th = golden * i;
      pts[i * 3] = Math.cos(th) * r;
      pts[i * 3 + 1] = y;
      pts[i * 3 + 2] = Math.sin(th) * r;
    }

    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;
    let visible = true;
    let rotY = 0.6;
    const tiltX = 0.38;
    let tx = 0;
    let ty = 0;
    let px = 0;
    let py = 0;
    let last = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reduce) draw(0);
    };

    const rgba = (c: readonly number[], a: number) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;

    // projects a unit-sphere vector (already rotated) to screen space
    const project = (x: number, y: number, z: number, R: number, cx: number, cy: number) => {
      const p = 1 / (1.9 - z * 0.55);
      return { sx: cx + x * R * p * 1.9, sy: cy + y * R * p * 1.9, z, p };
    };

    function rotate(x: number, y: number, z: number, ay: number, ax: number) {
      const cy = Math.cos(ay);
      const sy = Math.sin(ay);
      const x1 = x * cy + z * sy;
      const z1 = -x * sy + z * cy;
      const cx = Math.cos(ax);
      const sx = Math.sin(ax);
      const y2 = y * cx - z1 * sx;
      const z2 = y * sx + z1 * cx;
      return [x1, y2, z2] as const;
    }

    function ring(
      tiltA: number,
      tiltB: number,
      radius: number,
      ay: number,
      ax: number,
      R: number,
      cx: number,
      cy: number,
      color: readonly number[],
      alpha: number,
      lineWidth: number,
    ) {
      const steps = 120;
      ctx!.lineWidth = lineWidth;
      let prev: { sx: number; sy: number; z: number } | null = null;
      for (let i = 0; i <= steps; i++) {
        const a = (i / steps) * Math.PI * 2;
        let x = Math.cos(a) * radius;
        let y = 0;
        let z = Math.sin(a) * radius;
        // local ring tilt
        const ca = Math.cos(tiltA);
        const sa = Math.sin(tiltA);
        [y, z] = [y * ca - z * sa, y * sa + z * ca];
        const cb = Math.cos(tiltB);
        const sb = Math.sin(tiltB);
        [x, y] = [x * cb - y * sb, x * sb + y * cb];
        const [rx, ry, rz] = rotate(x, y, z, ay, ax);
        const s = project(rx, ry, rz, R, cx, cy);
        if (prev) {
          const depth = (s.z + prev.z) / 2;
          ctx!.strokeStyle = rgba(color, alpha * (0.25 + 0.75 * ((depth + 1) / 2)));
          ctx!.beginPath();
          ctx!.moveTo(prev.sx, prev.sy);
          ctx!.lineTo(s.sx, s.sy);
          ctx!.stroke();
        }
        prev = s;
      }
    }

    function draw(t: number) {
      ctx!.clearRect(0, 0, w, h);
      const cx = w / 2;
      const cy = h / 2;
      const R = Math.min(w, h) * 0.26;

      // soft glow
      const g = ctx!.createRadialGradient(cx, cy, R * 0.2, cx, cy, R * 2.6);
      g.addColorStop(0, rgba(GOLD, 0.2));
      g.addColorStop(0.45, rgba(GOLD, 0.04));
      g.addColorStop(1, rgba(GOLD, 0));
      ctx!.fillStyle = g;
      ctx!.fillRect(0, 0, w, h);
      const g2 = ctx!.createRadialGradient(cx + R * 0.9, cy - R * 0.8, 0, cx + R * 0.9, cy - R * 0.8, R * 1.4);
      g2.addColorStop(0, rgba(PINK, 0.09));
      g2.addColorStop(1, rgba(PINK, 0));
      ctx!.fillStyle = g2;
      ctx!.fillRect(0, 0, w, h);

      const ay = rotY + px;
      const ax = tiltX + py;

      // far-side ring pieces + sphere points back→front handled by alpha
      ring(0, 0, 1.0, ay, ax, R, cx, cy, GOLD, 0.2, 1);
      ring(Math.PI / 2, 0, 1.0, ay, ax, R, cx, cy, GOLD, 0.14, 1);
      ring(0.9, 0.5, 1.0, ay, ax, R, cx, cy, GOLD, 0.12, 1);

      // points
      for (let i = 0; i < COUNT; i++) {
        const [x, y, z] = rotate(pts[i * 3], pts[i * 3 + 1], pts[i * 3 + 2], ay, ax);
        const s = project(x, y, z, R, cx, cy);
        const depth = (z + 1) / 2;
        const size = (0.8 + depth * 1.7) * (small ? 1.1 : 1);
        const accent = i % 29 === 0;
        ctx!.fillStyle = rgba(accent ? PINK : GOLD, (accent ? 0.45 : 0.16) + depth * (accent ? 0.55 : 0.84));
        ctx!.fillRect(s.sx - size / 2, s.sy - size / 2, size, size);
      }

      // pink orbit with traveling bead
      const orbitR = 1.5;
      ring(1.15, -0.35, orbitR, ay * 0.35 + 0.4, ax * 0.6, R, cx, cy, PINK, 0.4, 1);
      const a = t * 0.0006;
      let ox = Math.cos(a) * orbitR;
      let oy = 0;
      let oz = Math.sin(a) * orbitR;
      const ca = Math.cos(1.15);
      const sa = Math.sin(1.15);
      [oy, oz] = [oy * ca - oz * sa, oy * sa + oz * ca];
      const cb = Math.cos(-0.35);
      const sb = Math.sin(-0.35);
      [ox, oy] = [ox * cb - oy * sb, ox * sb + oy * cb];
      const [bx, by, bz] = rotate(ox, oy, oz, ay * 0.35 + 0.4, ax * 0.6);
      const bead = project(bx, by, bz, R, cx, cy);
      const bg = ctx!.createRadialGradient(bead.sx, bead.sy, 0, bead.sx, bead.sy, 16);
      bg.addColorStop(0, rgba(PINK, 0.9));
      bg.addColorStop(1, rgba(PINK, 0));
      ctx!.fillStyle = bg;
      ctx!.fillRect(bead.sx - 16, bead.sy - 16, 32, 32);
      ctx!.fillStyle = rgba(PINK, 1);
      ctx!.beginPath();
      ctx!.arc(bead.sx, bead.sy, 2.2, 0, Math.PI * 2);
      ctx!.fill();
    }

    const frame = (t: number) => {
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      const dt = Math.min(48, t - last || 16);
      last = t;
      rotY += dt * 0.00018;
      px += (tx - px) * 0.04;
      py += (ty - py) * 0.04;
      draw(t);
    };

    const onPointer = (e: PointerEvent) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 0.9;
      ty = (e.clientY / window.innerHeight - 0.5) * 0.5;
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(canvas);

    if (!reduce) {
      raf = requestAnimationFrame(frame);
      window.addEventListener("pointermove", onPointer, { passive: true });
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className={className} />;
}
