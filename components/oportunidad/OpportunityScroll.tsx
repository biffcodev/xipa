"use client";
import { useEffect, useRef, useState } from "react";

export type Beat = {
  kind: "intro" | "stat" | "pivot";
  eyebrow?: string;
  headline?: string;
  value?: number;
  unit?: string;
  label?: string;
  desc?: string;
  plain?: string;
  bold?: string;
  sub?: string;
  image?: string;
};

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const smooth = (t: number) => {
  t = clamp(t);
  return t * t * (3 - 2 * t);
};

type StationMeta = { xPct: number; yPct: number; side: "left" | "right"; px: number; py: number };
type Timing = { dFrac: number; arrive: number; depart: number; inStart: number; outEnd: number };

// Smooth curve through points (Catmull-Rom -> cubic bezier). Organic, no hard angles.
function catmullRom(points: [number, number][]) {
  if (points.length < 2) return "";
  let d = `M${points[0][0].toFixed(1)} ${points[0][1].toFixed(1)}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] || points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] || p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return d;
}

const AMP = 0.06; // gentle horizontal swing — narrow & vertical
const VARY = [1, 0.82, 1.12, 0.88, 1.06, 0.9];

function buildGeom(W: number, H: number, N: number) {
  const stations: StationMeta[] = [];
  for (let i = 0; i < N; i++) {
    const sign = i % 2 === 0 ? -1 : 1; // station 0 leans left -> its text sits on the right
    const xPct = 0.5 + AMP * sign * VARY[i % VARY.length];
    const yPct = 0.2 + 0.56 * (N === 1 ? 0 : i / (N - 1));
    stations.push({ xPct, yPct, side: xPct < 0.5 ? "right" : "left", px: xPct * W, py: yPct * H });
  }
  const pts: [number, number][] = [];
  pts.push([stations[0].px, -0.08 * H]);
  stations.forEach((s) => pts.push([s.px, s.py]));
  pts.push([stations[N - 1].px, 1.08 * H]);
  return { pathD: catmullRom(pts), stations };
}

function lerpKeys(keys: [number, number][], p: number) {
  if (p <= keys[0][0]) return keys[0][1];
  for (let i = 1; i < keys.length; i++) {
    if (p <= keys[i][0]) {
      const [p0, v0] = keys[i - 1];
      const [p1, v1] = keys[i];
      return v0 + (v1 - v0) * ((p - p0) / (p1 - p0 || 1));
    }
  }
  return keys[keys.length - 1][1];
}

function beatOpacity(t: Timing, p: number) {
  if (p < t.inStart || p > t.outEnd) return 0;
  if (p < t.arrive) return smooth((p - t.inStart) / (t.arrive - t.inStart || 1));
  if (p <= t.depart) return 1;
  return 1 - smooth((p - t.depart) / (t.outEnd - t.depart || 1));
}

function BeatBody({ b, idx, total }: { b: Beat; idx: number; total: number }) {
  const num = String(idx + 1).padStart(2, "0");
  const tot = String(total).padStart(2, "0");
  return (
    <div>
      <div className="mb-4 flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-muted">
        <span className="text-brand">{num}</span>
        <span className="h-px w-8 bg-line5" />
        <span className="opacity-60">{tot}</span>
        {b.eyebrow && <span className="uppercase">{b.eyebrow}</span>}
      </div>
      {b.kind === "stat" ? (
        <>
          <div className="flex items-baseline gap-2 leading-[0.85]">
            <span className="font-extrabold tracking-[-0.03em] text-fg text-[clamp(56px,8vw,132px)]">{b.value}</span>
            <span className="font-extrabold tracking-[-0.02em] text-brand text-[clamp(26px,3vw,48px)]">{b.unit}</span>
          </div>
          <div className="mt-4 text-sm font-bold uppercase tracking-[0.18em] text-brand">{b.label}</div>
          <p className="mt-2 max-w-[24ch] text-lg font-light leading-snug text-muted">{b.desc}</p>
        </>
      ) : b.kind === "pivot" ? (
        <>
          <h2 className="text-[clamp(30px,3.6vw,54px)] font-light leading-[1.06] tracking-[-0.03em] text-fg">
            {b.plain}
            <span className="font-extrabold text-brand">{b.bold}</span>
          </h2>
          {b.sub && <p className="mt-4 max-w-[36ch] text-base font-light text-muted">{b.sub}</p>}
        </>
      ) : (
        <h2 className="text-[clamp(30px,3.4vw,52px)] font-extrabold leading-[1.0] tracking-[-0.03em] text-fg">{b.headline}</h2>
      )}
    </div>
  );
}

function Frame({ src }: { src: string }) {
  return (
    <div className="overflow-hidden rounded-[20px] shadow-[0_30px_70px_rgba(0,0,0,0.18)]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" className="aspect-[4/3] w-full object-cover" />
    </div>
  );
}

export default function OpportunityScroll({ beats }: { beats: Beat[] }) {
  const N = beats.length;
  const wrapRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGGElement>(null);
  const glowRef = useRef<SVGCircleElement>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const metaRef = useRef<StationMeta[]>([]);
  const geomRef = useRef<{ L: number; keys: [number, number][]; timing: Timing[] } | null>(null);

  const [pathD, setPathD] = useState("");
  const [stations, setStations] = useState<StationMeta[]>([]);
  const [dims, setDims] = useState({ w: 0, h: 0 });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 900px)");
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(mq.matches && !rm.matches);
    update();
    mq.addEventListener("change", update);
    rm.addEventListener("change", update);
    return () => {
      mq.removeEventListener("change", update);
      rm.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const measure = () => {
      const el = stickyRef.current;
      if (!el) return;
      const w = el.clientWidth;
      const h = el.clientHeight;
      if (w < 2 || h < 2) return;
      const g = buildGeom(w, h, N);
      metaRef.current = g.stations;
      setDims({ w, h });
      setStations(g.stations);
      setPathD(g.pathD);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [enabled, N]);

  useEffect(() => {
    const path = pathRef.current;
    const meta = metaRef.current;
    if (!path || !pathD || meta.length === 0) return;
    const L = path.getTotalLength();
    const S = 600;
    const xs: number[] = [];
    const ys: number[] = [];
    for (let s = 0; s <= S; s++) {
      const pt = path.getPointAtLength((L * s) / S);
      xs.push(pt.x);
      ys.push(pt.y);
    }
    const slot = 1 / N;
    const keys: [number, number][] = [[0, 0]];
    const timing: Timing[] = [];
    meta.forEach((m, i) => {
      let best = 0;
      let bd = Infinity;
      for (let s = 0; s <= S; s++) {
        const dx = xs[s] - m.px;
        const dy = ys[s] - m.py;
        const dd = dx * dx + dy * dy;
        if (dd < bd) {
          bd = dd;
          best = s;
        }
      }
      const dFrac = best / S;
      const center = (i + 0.5) * slot;
      const dwell = slot * 0.5 * 0.55;
      const fade = slot * 0.5 * 0.6;
      const arrive = center - dwell;
      const depart = center + dwell;
      keys.push([arrive, dFrac], [depart, dFrac]);
      timing.push({ dFrac, arrive, depart, inStart: i === 0 ? -1 : arrive - fade, outEnd: depart + fade });
    });
    keys.push([1, 1]);
    geomRef.current = { L, keys, timing };
  }, [pathD, N]);

  useEffect(() => {
    if (!enabled) return;
    let raf = 0;
    const frame = () => {
      const wrap = wrapRef.current;
      const geom = geomRef.current;
      const path = pathRef.current;
      if (wrap && geom && geom.L && path) {
        const r = wrap.getBoundingClientRect();
        if (r.bottom > -50 && r.top < window.innerHeight + 50) {
          const denom = r.height - window.innerHeight || 1;
          const p = clamp(-r.top / denom);
          const dist = lerpKeys(geom.keys, p) * geom.L;
          path.style.strokeDasharray = String(geom.L);
          path.style.strokeDashoffset = String(geom.L - dist);
          const pt = path.getPointAtLength(dist);
          dotRef.current?.setAttribute("transform", `translate(${pt.x} ${pt.y})`);
          if (glowRef.current) {
            glowRef.current.setAttribute("cx", String(pt.x));
            glowRef.current.setAttribute("cy", String(pt.y));
          }
          geom.timing.forEach((t, i) => {
            const op = beatOpacity(t, p);
            const tx = textRefs.current[i];
            if (tx) {
              tx.style.opacity = String(op);
              tx.style.transform = `translateY(calc(-50% + ${(1 - op) * 22}px))`;
            }
            const im = imgRefs.current[i];
            if (im) {
              im.style.opacity = String(op);
              im.style.transform = `translateY(calc(-50% + ${(1 - op) * 38}px))`;
            }
          });
        }
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [enabled]);

  // ---- Static fallback (mobile, reduced motion, SSR) ----
  if (!enabled) {
    return (
      <section className="relative overflow-hidden bg-bg1 text-fg">
        <div className="mx-auto max-w-3xl px-6 py-20 sm:py-28">
          <ol className="relative space-y-14 border-l border-brand/30 pl-8">
            {beats.map((b, i) => (
              <li key={i} className="relative">
                <span className="absolute -left-[38px] top-1 h-3.5 w-3.5 rounded-full bg-brand ring-4 ring-brand/15" />
                {b.image && (
                  <div className="mb-5 max-w-[280px]">
                    <Frame src={b.image} />
                  </div>
                )}
                <BeatBody b={b} idx={i} total={N} />
              </li>
            ))}
          </ol>
        </div>
      </section>
    );
  }

  // ---- Pinned scrollytelling (desktop) ----
  return (
    <section ref={wrapRef} className="relative bg-bg1" style={{ height: `${N * 105 + 30}vh` }}>
      <div ref={stickyRef} className="sticky top-0 h-screen overflow-hidden">
        <div className="pointer-events-none absolute left-8 top-8 font-mono text-[11px] uppercase tracking-[0.3em] text-fg/30">
          // La oportunidad
        </div>

        <svg className="absolute inset-0 h-full w-full" width={dims.w} height={dims.h} aria-hidden>
          <defs>
            <filter id="op-glow" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="26" />
            </filter>
          </defs>
          <circle ref={glowRef} r="150" fill="#ff4d0e" opacity="0.08" filter="url(#op-glow)" />
          <path d={pathD} fill="none" stroke="rgba(0,0,0,0.10)" strokeWidth="2" strokeLinecap="round" />
          <path
            ref={pathRef}
            d={pathD}
            fill="none"
            stroke="#ff4d0e"
            strokeWidth="2.5"
            strokeLinecap="round"
            style={{ strokeDasharray: 4000, strokeDashoffset: 4000 }}
          />
          <g ref={dotRef}>
            <circle r="18" fill="#ff4d0e" opacity="0.2">
              <animate attributeName="r" values="14;22;14" dur="2.4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.25;0.08;0.25" dur="2.4s" repeatCount="indefinite" />
            </circle>
            <circle r="7" fill="#ff4d0e" />
            <circle r="7" fill="none" stroke="#fff" strokeWidth="2.5" />
          </g>
        </svg>

        {/* text cards */}
        {stations.map((s, i) => (
          <div
            key={`t${i}`}
            ref={(el) => {
              textRefs.current[i] = el;
            }}
            className="absolute w-[min(430px,31vw)]"
            style={{
              top: `${s.yPct * 100}%`,
              transform: "translateY(-50%)",
              opacity: 0,
              willChange: "opacity, transform",
              ...(s.side === "right" ? { left: "60%" } : { right: "60%" }),
            }}
          >
            <BeatBody b={beats[i]} idx={i} total={N} />
          </div>
        ))}

        {/* images (opposite side of the text) */}
        {stations.map((s, i) =>
          beats[i].image ? (
            <div
              key={`i${i}`}
              ref={(el) => {
                imgRefs.current[i] = el;
              }}
              className="absolute w-[min(360px,26vw)]"
              style={{
                top: `${s.yPct * 100}%`,
                transform: "translateY(-50%)",
                opacity: 0,
                willChange: "opacity, transform",
                ...(s.side === "right" ? { right: "60%" } : { left: "60%" }),
              }}
            >
              <Frame src={beats[i].image!} />
            </div>
          ) : null,
        )}
      </div>
    </section>
  );
}
