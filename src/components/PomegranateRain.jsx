import { useEffect, useRef } from "react";

/**
 * PomegranateRain — full-screen <canvas> particle layer that replaces
 * canvas-confetti. When `active` flips to true a pomegranate "breaks"
 * at screen centre: a radial burst of arils, followed by a trickle
 * falling from the top edge for a few seconds. Each aril is a shaded
 * teardrop with a highlight and an inner pit. The rAF loop stops on
 * its own once every aril has fallen below the viewport.
 */

/* ---- tunables ---- */
const BURST_COUNT = 120;      // arils in the initial burst
const TRICKLE_PER_FRAME = 3;  // arils added from the top edge per frame
const TRICKLE_MS = 6000;      // how long the trickle lasts
const GRAVITY = 0.25;         // px / frame²
const DRAG = 0.99;            // velocity multiplier per frame
const SWAY = 0.6;             // horizontal sway amplitude (px / frame)
const COLOR_OUTER = "#E0273F";
const COLOR_INNER = "#7A0E20"; // matches --red-deep
const COLOR_PIT = "#3A0810";

const rand = (min, max) => min + Math.random() * (max - min);

/* Aril factory — shared by burst and trickle */
function makeAril(x, y, vx, vy) {
  return {
    x, y, vx, vy,
    size: rand(10, 16),
    rot: rand(0, Math.PI * 2),
    spin: rand(-0.08, 0.08),
    phase: rand(0, Math.PI * 2), // sway offset so arils don't move in lockstep
    t: 0,
  };
}

/* Draw one aril: rounded teardrop, radial shading, highlight, pit */
function drawAril(ctx, a) {
  const r = a.size / 2;
  ctx.save();
  ctx.translate(a.x, a.y);
  ctx.rotate(a.rot);

  // Teardrop body: round bottom, slightly pointed top
  ctx.beginPath();
  ctx.moveTo(0, -r * 1.25);
  ctx.bezierCurveTo(r * 1.1, -r * 0.6, r, r * 0.6, 0, r);
  ctx.bezierCurveTo(-r, r * 0.6, -r * 1.1, -r * 0.6, 0, -r * 1.25);
  ctx.closePath();

  const grad = ctx.createRadialGradient(-r * 0.3, -r * 0.3, r * 0.1, 0, 0, r * 1.3);
  grad.addColorStop(0, COLOR_OUTER);
  grad.addColorStop(1, COLOR_INNER);
  ctx.fillStyle = grad;
  ctx.fill();

  // Glassy highlight, top-left
  ctx.beginPath();
  ctx.ellipse(-r * 0.35, -r * 0.45, r * 0.3, r * 0.18, -0.6, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(255, 255, 255, 0.35)";
  ctx.fill();

  // Inner pit, offset toward centre
  ctx.beginPath();
  ctx.ellipse(r * 0.1, r * 0.15, r * 0.22, r * 0.32, 0.3, 0, Math.PI * 2);
  ctx.fillStyle = COLOR_PIT;
  ctx.fill();

  ctx.restore();
}

export default function PomegranateRain({ active }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let width = 0;
    let height = 0;
    let arils = [];
    let raf = 0;
    const start = performance.now();

    /* Size the backing store for the device pixel ratio */
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    /* The pomegranate breaks: radial burst from screen centre */
    const cx = width / 2;
    const cy = height / 2;
    for (let i = 0; i < BURST_COUNT; i++) {
      const angle = rand(0, Math.PI * 2);
      const speed = rand(4, 14);
      arils.push(
        makeAril(cx, cy, Math.cos(angle) * speed, Math.sin(angle) * speed - 4)
      );
    }

    const frame = (now) => {
      // Trickle from the top edge for the first few seconds
      if (now - start < TRICKLE_MS) {
        for (let i = 0; i < TRICKLE_PER_FRAME; i++) {
          arils.push(makeAril(rand(0, width), -20, rand(-1, 1), rand(1, 3)));
        }
      }

      ctx.clearRect(0, 0, width, height);

      for (const a of arils) {
        a.t += 1;
        a.vy += GRAVITY;
        a.vx *= DRAG;
        a.vy *= DRAG;
        a.x += a.vx + Math.sin(a.t * 0.05 + a.phase) * SWAY;
        a.y += a.vy;
        a.rot += a.spin;
        drawAril(ctx, a);
      }

      // Drop arils that have left the viewport
      arils = arils.filter((a) => a.y < height + 20);

      if (arils.length > 0 || now - start < TRICKLE_MS) {
        raf = requestAnimationFrame(frame);
      } else {
        ctx.clearRect(0, 0, width, height);
      }
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
      className="pomegranate-rain"
      aria-hidden="true"
    />
  );
}
