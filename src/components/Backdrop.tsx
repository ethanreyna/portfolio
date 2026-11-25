import { useEffect, useRef } from "react";

type Blob = { size: number; color: string; lag: number; offset: [number, number] };

const blobs: Blob[] = [
  { size: 620, color: "var(--blob-a)", lag: 0.06, offset: [0, 0] },
  { size: 520, color: "var(--blob-b)", lag: 0.035, offset: [220, 160] },
  { size: 860, color: "var(--blob-c)", lag: 0.02, offset: [-260, -120] },
];

/**
 * Fixed page backdrop: a dot grid with soft color blobs. The blobs drift on their own,
 * trail the mouse on devices with a fine pointer, and stay still for reduced motion.
 */
export default function Backdrop() {
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const w = () => window.innerWidth;
    const h = () => window.innerHeight;
    const pos = blobs.map((_, i) => ({ x: w() * (0.25 + i * 0.3), y: h() * (0.2 + i * 0.25) }));
    const place = () =>
      pos.forEach((p, i) => {
        const el = refs.current[i];
        const r = blobs[i].size / 2;
        if (el) el.style.transform = `translate3d(${p.x - r}px, ${p.y - r}px, 0)`;
      });
    place();

    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const wander = () => ({ x: Math.random() * w(), y: Math.random() * h() });
    const targets = pos.map(wander);
    let mouse: { x: number; y: number } | null = null;
    let idle = 0;
    let frame = 0;

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      mouse = { x: e.clientX, y: e.clientY };
      idle = 0;
    };

    const tick = () => {
      // Two seconds after the mouse stops, go back to wandering.
      if (mouse && ++idle > 120) mouse = null;
      pos.forEach((p, i) => {
        const b = blobs[i];
        let t = targets[i];
        if (mouse) {
          t = { x: mouse.x + b.offset[0], y: mouse.y + b.offset[1] };
        } else if (Math.hypot(t.x - p.x, t.y - p.y) < 40) {
          targets[i] = t = wander();
        }
        const speed = mouse ? b.lag : b.lag * 0.12;
        p.x += (t.x - p.x) * speed;
        p.y += (t.y - p.y) * speed;
      });
      place();
      frame = requestAnimationFrame(tick);
    };

    const onVisibility = () => {
      cancelAnimationFrame(frame);
      if (!document.hidden) frame = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div aria-hidden="true" className="backdrop pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-bg">
      <div className="dot-grid absolute inset-0" />
      {blobs.map((b, i) => (
        <div
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          className="blob"
          style={{
            width: b.size,
            height: b.size,
            background: `radial-gradient(circle at center, ${b.color} 0%, transparent 70%)`,
          }}
        />
      ))}
    </div>
  );
}
