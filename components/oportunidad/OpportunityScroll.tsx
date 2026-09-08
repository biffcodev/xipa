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
};

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const smooth = (t: number) => {
  t = clamp(t);
  return t * t * (3 - 2 * t);
};

type Station = {
  dFrac: number;
  xPct: number;
  yPct: number;
  side: "left" | "right";
  arrive: number;
  depart: number;
  inStart: number;
  outEnd: number;
};
type Geom = { pathD: string; keys: [number, number][]; stations: Station[]; L: number };

function computeGeom(W: number, H: number, N: number): Omit<Geom, "L"> {
  const DELTA = 0.045;
  const xs: number[] = [];
  const ys: number[] = [];
  for (let i = 0; i < N; i++) {
    xs.push(i % 2 === 0 ? 0.3 : 0.7);
    ys.push(0.2 + 0.6 * (N === 1 ? 0 : i / (N - 1)));
  }
  const pts: [number, number][] = [];
  pts.push([xs[0] * W, 0]);
  const vmidIdx: number[] = [];
  for (let i = 0; i < N; i++) {
    pts.push([xs[i] * W, (ys[i] - DELTA) * H]);
    vmidIdx.push(pts.length);
    pts.push([xs[i] * W, ys[i] * H]);
    pts.push([xs[i] * W, (ys[i] + DELTA) * H]);
  }
  pts.push([xs[N - 1] * W, H]);

  const cum: number[] = [0];
  for (let i = 1; i < pts.length; i++) {
    cum.push(cum[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
  }
  const total = cum[cum.length - 1] || 1;
  const pathD = "M" + pts.map((p) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" L");

  const keys: [number, number][] = [[0, 0]];
  const stations: Station[] = [];
  const slot = 1 / N;
  for (let i = 0; i < N; i++) {
    const dFrac = cum[vmidIdx[i]] / total;
    const center = (i + 0.5) * slot;
    const dwell = slot * 0.5 * 0.55;
    const fade = slot * 0.5 * 0.6;
    const arrive = center - dwell;
    const depart = center + dwell;
    keys.push([arrive, dFrac], [depart, dFrac]);
    stations.push({
      dFrac,
      xPct: xs[i],
      yPct: ys[i],
      side: xs[i] < 0.5 ? "right" : "left",
      arrive,
      depart,
      inStart: i === 0 ? -1 : arrive - fade,
      outEnd: depart + fade,
    });
  }
  keys.push([1, 1]);
  return { pathD, keys, stations };
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

function beatOpacity(s: Station, p: number) {
  if (p < s.inStart || p > s.outEnd) return 0;
  if (p < s.arrive) return smooth((p - s.inStart) / (s.arrive - s.inStart || 1));
  if (p <= s.depart) return 1;
  return 1 - smooth((p - s.depart) / (s.outEnd - s.depart || 1));
}

function BeatBody({ b, idx, total }: { b: Beat; idx: number; total: number }) {
  const num = String(idx + 1).padStart(2, "0");
  const tot = String(total).padStart(2, "0");
  return (
    <div>
      <div className="mb-4 flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-white/40">
        <span className="text-brand">{num}</span>
        <span className="h-px w-8 bg-white/20" />
        <span>{tot}</span>
        {b.eyebrow && <span className="uppercase">{b.eyebrow}</span>}
      </div>
      {b.kind === "stat" ? (
        <>
          <div className="flex items-baseline gap-2 leading-[0.85]">
            <span className="font-extrabold tracking-[-0.03em] text-white text-[clamp(56px,8vw,132px)]">{b.value}</span>
            <span className="font-extrabold tracking-[-0.02em] text-brand text-[clamp(26px,3vw,48px)]">{b.unit}</span>
          </div>
          <div className="mt-4 text-sm font-bold uppercase tracking-[0.18em] text-brand">{b.label}</div>
          <p className="mt-2 max-w-[24ch] text-lg font-light leading-snug text-white/70">{b.desc}</p>
        </>
      ) : b.kind === "pivot" ? (
        <>
          <h2 className="text-[clamp(30px,3.8vw,56px)] font-light leading-[1.06] tracking-[-0.03em] text-white">
            {b.plain}
            <span className="font-extrabold text-brand">{b.bold}</span>
          </h2>
          {b.sub && <p className="mt-4 max-w-[36ch] text-base font-light text-white/65">{b.sub}</p>}
        </>
      ) : (
        <h2 className="text-[clamp(30px,3.6vw,54px)] font-extrabold leading-[1.0] tracking-[-0.03em] text-white">{b.headline}</h2>
      )}
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
  const beatRefs = useRef<(HTMLDivElement | null)[]>([]);
  const geomRef = useRef<Geom | null>(null);

  const [pathD, setPathD] = useState("");
  const [dims, setDims] = useState({ w: 0, h: 0 });
  const [enabled, setEnabled] = useState(false);

  // Decide whether to run the pinned animation (desktop + motion allowed).
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

  // Measure the sticky viewport and (re)build geometry.
  useEffect(() => {
    if (!enabled) return;
    const measure = () => {
      const el = stickyRef.current;
      if (!el) return;
      const w = el.clientWidth;
      const h = el.clientHeight;
      if (w < 2 || h < 2) return;
      setDims({ w, h });
      const g = computeGeom(w, h, N);
      setPathD(g.pathD);
      geomRef.current = { ...g, L: 0 };
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [enabled, N]);

  // Once the path is in the DOM, read its true length.
  useEffect(() => {
    if (pathRef.current && geomRef.current) geomRef.current.L = pathRef.current.getTotalLength();
  }, [pathD]);

  // Scroll-driven animation loop.
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
          geom.stations.forEach((s, i) => {
            const el = beatRefs.current[i];
            if (!el) return;
            const op = beatOpacity(s, p);
            el.style.opacity = String(op);
            el.style.transform = `translateY(${(1 - op) * 26}px)`;
          });
        }
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [enabled]);

  // ---- Static fallback (mobile, reduced motion, no-JS / SSR) ----
  if (!enabled) {
    return (
      <section className="relative overflow-hidden bg-[#0b0b0a] text-white">
        <div className="mx-auto max-w-3xl px-6 py-20 sm:py-28">
          <ol className="relative space-y-14 border-l border-white/15 pl-8">
            {beats.map((b, i) => (
              <li key={i} className="relative">
                <span className="absolute -left-[38px] top-1 h-3.5 w-3.5 rounded-full bg-brand ring-4 ring-brand/20" />
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
    <section ref={wrapRef} className="relative bg-[#0b0b0a]" style={{ height: `${N * 100 + 30}vh` }}>
      <div ref={stickyRef} className="sticky top-0 h-screen overflow-hidden">
        {/* ambience */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(120% 90% at 50% 0%, rgba(255,77,14,0.10), transparent 55%)" }}
        />
        <div className="pointer-events-none absolute left-8 top-8 font-mono text-[11px] uppercase tracking-[0.3em] text-white/35">
          // La oportunidad
        </div>

        <svg className="absolute inset-0 h-full w-full" width={dims.w} height={dims.h} aria-hidden>
          <defs>
            <filter id="op-glow" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="22" />
            </filter>
          </defs>
          {/* moving light */}
          <circle ref={glowRef} r="150" fill="#ff4d0e" opacity="0.16" filter="url(#op-glow)" />
          {/* full route (faint) */}
          <path d={pathD} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
          {/* drawn route (bright) */}
          <path
            ref={pathRef}
            d={pathD}
            fill="none"
            stroke="#ff4d0e"
            strokeWidth="2.5"
            strokeLinejoin="round"
            strokeLinecap="round"
            style={{ strokeDasharray: geomRef.current?.L || 4000, strokeDashoffset: geomRef.current?.L || 4000 }}
          />
          {/* travelling dot */}
          <g ref={dotRef}>
            <circle r="18" fill="#ff4d0e" opacity="0.22">
              <animate attributeName="r" values="14;22;14" dur="2.4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.28;0.1;0.28" dur="2.4s" repeatCount="indefinite" />
            </circle>
            <circle r="6.5" fill="#ff4d0e" />
            <circle r="6.5" fill="none" stroke="#fff" strokeOpacity="0.85" strokeWidth="1.5" />
          </g>
        </svg>

        {/* beats */}
        {geomRef.current?.stations.map((s, i) => (
          <div
            key={i}
            className="absolute w-[min(480px,42vw)]"
            style={{
              top: `${s.yPct * 100}%`,
              transform: "translateY(-50%)",
              ...(s.side === "right"
                ? { left: `calc(${(s.xPct * 100).toFixed(2)}% + 3rem)` }
                : { right: `calc(${((1 - s.xPct) * 100).toFixed(2)}% + 3rem)` }),
            }}
          >
            <div
              ref={(el) => {
                beatRefs.current[i] = el;
              }}
              style={{ opacity: 0, transform: "translateY(30px)", willChange: "opacity, transform" }}
            >
              <BeatBody b={beats[i]} idx={i} total={N} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
