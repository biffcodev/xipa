"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const DUR = 5500;
const SLIDES = [
  { img: "/images/hero-productos.jpg", alt: "Productos de ecodiseño", eyebrow: "Ecodiseño · Economía Circular", l1: "Evolucionemos", l2: "el plástico.", p: "Brindamos soluciones de ecodiseño para reducir, rediseñar, repensar y reutilizar." },
  { img: "/images/hero-circular.jpg", alt: "Economía circular", eyebrow: "Economía Circular", l1: "De residuos", l2: "a recursos.", p: "Cerramos el ciclo: lo que hoy se descarta, mañana es la materia prima de un nuevo producto." },
  { img: "/images/hero-diseno.jpg", alt: "Investigación y diseño", eyebrow: "Investigación + Diseño", l1: "Repensamos", l2: "desde el origen.", p: "Diseñamos productos y envases que nacen del residuo, con materiales trazables e impacto medible." },
];
const OVERLAY = "bg-[linear-gradient(180deg,rgba(0,0,0,0.34)_0%,rgba(0,0,0,0.08)_38%,rgba(0,0,0,0.26)_70%,rgba(0,0,0,0.58)_100%)]";
const ARROW = "absolute top-1/2 -translate-y-1/2 z-[8] w-[52px] h-[52px] flex items-center justify-center bg-white/12 border border-white/30 rounded-full text-white cursor-pointer backdrop-blur-[8px] transition-colors hover:bg-[rgba(255,77,14,0.9)]";

export default function Hero() {
  const [cur, setCur] = useState(0);
  const [paused, setPaused] = useState(false);
  const touch = useRef({ x: 0, y: 0, on: false });

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => setCur((c) => (c + 1) % SLIDES.length), DUR);
    return () => clearTimeout(t);
  }, [cur, paused]);

  const go = (n: number) => setCur((n + SLIDES.length) % SLIDES.length);

  return (
    <section
      id="top"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => { const t = e.changedTouches[0]; touch.current = { x: t.clientX, y: t.clientY, on: true }; }}
      onTouchEnd={(e) => {
        if (!touch.current.on) return; touch.current.on = false;
        const t = e.changedTouches[0]; const dx = t.clientX - touch.current.x; const dy = t.clientY - touch.current.y;
        if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.3) go(cur + (dx < 0 ? 1 : -1));
      }}
      className="relative h-screen w-full overflow-hidden bg-[#0d0d0c]"
    >
      {SLIDES.map((s, i) => (
        <div key={i} className="absolute inset-0 transition-opacity duration-[1100ms] ease-out" style={{ opacity: i === cur ? 1 : 0 }}>
          <div className="absolute inset-[-6%_-2%]" style={{ transform: i === cur ? "scale(1.06)" : "scale(1)", transition: i === cur ? `transform ${DUR + 1100}ms ease-out` : "transform .6s ease" }}>
            <Image src={s.img} alt={s.alt} fill sizes="100vw" priority={i === 0} className="object-cover" />
          </div>
          <div className={`absolute inset-0 pointer-events-none ${OVERLAY}`} />
          <div className="relative z-[5] h-full flex flex-col items-center justify-center text-center px-6">
            <span className="block text-xs tracking-[0.34em] uppercase font-semibold text-white/80 mb-[22px]">{s.eyebrow}</span>
            <h1 className="m-0 text-white max-w-[1000px] tracking-[-0.03em] [text-shadow:0_4px_50px_rgba(0,0,0,0.45)]">
              <span className="block font-extralight text-[clamp(34px,6vw,50px)] leading-none">{s.l1}</span>
              <span className="block font-extrabold text-[clamp(56px,12vw,92px)] leading-[0.96]">{s.l2}</span>
            </h1>
            <p className="mt-[30px] mx-auto max-w-[560px] text-white/90 text-base font-normal leading-[1.5] [text-shadow:0_2px_20px_rgba(0,0,0,0.5)]">{s.p}</p>
          </div>
        </div>
      ))}

      <button aria-label="Anterior" onClick={() => go(cur - 1)} className={`${ARROW} left-8`}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
      </button>
      <button aria-label="Siguiente" onClick={() => go(cur + 1)} className={`${ARROW} right-8`}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
      </button>

      <div className="absolute bottom-11 left-1/2 -translate-x-1/2 z-[8] flex gap-3.5">
        {SLIDES.map((_, i) => (
          <button key={i} aria-label={`Imagen ${i + 1}`} onClick={() => go(i)} className="relative h-1 p-0 border-none rounded-full bg-white/30 cursor-pointer overflow-hidden transition-[width] duration-500" style={{ width: i === cur ? 88 : 64 }}>
            {i === cur && <span key={cur} className="absolute left-0 top-0 h-full bg-brand rounded-full animate-[heroFill_5500ms_linear]" style={{ width: "100%" }} />}
          </button>
        ))}
      </div>
    </section>
  );
}
