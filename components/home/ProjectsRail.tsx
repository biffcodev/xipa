"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import SmartImage from "@/components/SmartImage";
import { homeContent } from "@/lib/defaults";
import { PROJECTS } from "@/lib/projects";
import type { Img } from "@/lib/img";

type P = { slug: string; tag?: string; title: string; subtitle?: string; meta?: { anio?: string; pilares?: string }; heroImage?: Img };
type Outro = typeof homeContent.railOutro;
const PANEL_OVERLAY = "bg-[linear-gradient(100deg,rgba(0,0,0,0.75)_0%,rgba(0,0,0,0.35)_45%,rgba(0,0,0,0.05)_70%)]";

export default function ProjectsRail({ projects = PROJECTS as unknown as P[], outro = homeContent.railOutro }: { projects?: P[]; outro?: Outro }) {
  const panels = projects.slice(0, 3);
  const secRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const sec = secRef.current, track = trackRef.current;
      if (sec && track) {
        const total = sec.offsetHeight - window.innerHeight;
        const scrolled = Math.min(total, Math.max(0, -sec.getBoundingClientRect().top));
        const rawProg = total > 0 ? scrolled / total : 0;
        const PROG_END = 0.82;
        const prog = Math.min(1, rawProg / PROG_END);
        const maxX = track.scrollWidth - window.innerWidth;
        const steps = track.children.length - 1;
        const p = prog * steps;
        const i = Math.floor(p);
        const fr = Math.min(1, Math.max(0, p - i));
        const mf = fr * fr * fr * (fr * (fr * 6 - 15) + 10);
        const pos = Math.min(steps, i + mf);
        track.style.transform = `translateX(${-((pos / steps) * maxX)}px)`;
        if (barRef.current) barRef.current.style.width = `${(pos / steps) * 100}%`;
        if (counterRef.current) {
          const idx = Math.min(panels.length, Math.max(1, Math.floor(pos + 0.5) + 1));
          counterRef.current.textContent = `${("0" + idx).slice(-2)} / 0${panels.length}`;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [panels.length]);

  return (
    <section ref={secRef} id="proyectos" className="relative w-full h-[480vh] bg-bg1">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div ref={trackRef} className="flex h-screen w-[400vw] will-change-transform">
          {panels.map((p, idx) => (
            <div key={p.slug} className="flex-none w-screen h-screen relative">
              <SmartImage img={p.heroImage} alt={p.title} />
              <div className={`absolute inset-0 pointer-events-none ${PANEL_OVERLAY}`} />
              <div className="absolute left-8 md:left-16 bottom-[14vh] max-w-[640px] pointer-events-none pr-6">
                <span className="block text-xs tracking-[0.22em] uppercase text-brand font-bold">Proyecto 0{idx + 1} — {p.tag}</span>
                <h2 className="mt-3.5 text-onimg font-extrabold text-[clamp(56px,9vw,96px)] leading-[0.92] tracking-[-0.03em] [text-shadow:0_4px_40px_rgba(0,0,0,0.5)]">{p.title}</h2>
                <p className="mt-5 text-white/80 text-xl font-light leading-[1.5]">{p.subtitle}</p>
                <span className="block mt-6 text-white/60 text-sm font-medium">{p.meta?.anio} · {p.meta?.pilares}</span>
                <Link href={`/proyectos/${p.slug}`} className="inline-flex items-center gap-2 mt-[26px] px-[26px] py-[13px] border border-white/45 text-white rounded-full no-underline text-[15px] font-semibold pointer-events-auto transition-colors hover:bg-brand hover:border-brand">Ver proyecto →</Link>
              </div>
            </div>
          ))}

          <div className="flex-none w-screen h-screen relative flex flex-col items-center justify-center text-center bg-bg2">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[760px] h-[760px] rounded-full pointer-events-none bg-[radial-gradient(circle,rgba(255,77,14,0.14),transparent_62%)]" />
            <div className="relative px-12">
              <span className="block text-xs tracking-[0.22em] uppercase text-brand font-bold">{outro.eyebrow}</span>
              <h2 className="mt-[18px] mx-auto text-fg tracking-[-0.03em] leading-[0.98] max-w-[900px]">
                <span className="block font-extralight text-[40px]">{outro.line1}</span>
                <span className="block font-extrabold text-[clamp(48px,8vw,76px)]">{outro.line2}</span>
              </h2>
              <p className="mt-6 mx-auto max-w-[560px] text-muted text-lg font-light leading-[1.5]">{outro.paragraph}</p>
              <Link href="/proyectos" className="inline-flex items-center gap-2.5 mt-9 px-[34px] py-[18px] bg-brand text-onimg font-semibold text-[17px] rounded-full no-underline">Ver todos los proyectos →</Link>
            </div>
          </div>
        </div>

        <div className="absolute left-8 md:left-16 top-[14vh] flex items-center gap-3.5 pointer-events-none">
          <span className="text-xs tracking-[0.22em] uppercase text-white/85 font-bold">Proyectos</span>
          <span ref={counterRef} className="text-xs text-brand font-bold tracking-[0.1em]">01 / 0{panels.length}</span>
        </div>
        <div className="absolute right-8 md:right-16 top-[14vh] text-white/55 text-xs tracking-[0.16em] uppercase font-medium pointer-events-none">Scroll →</div>
        <div className="absolute left-0 bottom-0 w-full h-[3px] bg-line">
          <div ref={barRef} className="h-[3px] w-0 bg-brand [box-shadow:0_0_12px_rgba(255,77,14,0.8)]" />
        </div>
      </div>
    </section>
  );
}
