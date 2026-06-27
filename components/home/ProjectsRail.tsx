"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import SlotImage from "@/components/SlotImage";

const PANELS = [
  { slot: "pf-grido", href: "/proyectos/grido", eyebrow: "Proyecto 01 — Envase reutilizable", title: "Grido", desc: "El primer envase recargable de helados del mundo. Menos telgopor, mejor experiencia y logística para una cadena internacional.", meta: "2024 · Reducir · Rediseñar" },
  { slot: "pf-revasos", href: "/proyectos/revasos", eyebrow: "Proyecto 02 — Reutilizables", title: "Re-vasos", desc: "Vasos 100% reutilizables, elaborados con materia prima reciclada y trazable. Monomaterial, reciclables e impresos con tintas al agua.", meta: "2022 · Reutilizar" },
  { slot: "pf-bio4", href: "/proyectos/bio4", eyebrow: "Proyecto 03 — Industria", title: "BIO 4", desc: "Una matriz desulfurizadora para bioetanol, con proveedores locales y material reciclado. Economía circular en desarrollo continuo.", meta: "2020 · Repensar" },
];
const PANEL_OVERLAY = "bg-[linear-gradient(100deg,rgba(0,0,0,0.75)_0%,rgba(0,0,0,0.35)_45%,rgba(0,0,0,0.05)_70%)]";

export default function ProjectsRail() {
  const secRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const sec = secRef.current, track = trackRef.current;
      if (sec && track) {
        const panels = track.children.length;
        const total = sec.offsetHeight - window.innerHeight;
        const scrolled = Math.min(total, Math.max(0, -sec.getBoundingClientRect().top));
        const rawProg = total > 0 ? scrolled / total : 0;
        const PROG_END = 0.82;
        const prog = Math.min(1, rawProg / PROG_END);
        const maxX = track.scrollWidth - window.innerWidth;
        const steps = panels - 1;
        const p = prog * steps;
        const i = Math.floor(p);
        const fr = Math.min(1, Math.max(0, p - i));
        const mf = fr * fr * fr * (fr * (fr * 6 - 15) + 10); // smootherstep
        const pos = Math.min(steps, i + mf);
        track.style.transform = `translateX(${-((pos / steps) * maxX)}px)`;
        if (barRef.current) barRef.current.style.width = `${(pos / steps) * 100}%`;
        if (counterRef.current) {
          const projects = panels - 1;
          const idx = Math.min(projects, Math.max(1, Math.floor(pos + 0.5) + 1));
          counterRef.current.textContent = `${("0" + idx).slice(-2)} / 0${projects}`;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section ref={secRef} id="proyectos" className="relative w-full h-[480vh] bg-bg1">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div ref={trackRef} className="flex h-screen w-[400vw] will-change-transform">
          {PANELS.map((p) => (
            <div key={p.slot} className="flex-none w-screen h-screen relative">
              <SlotImage id={p.slot} alt={p.title} className="absolute inset-0 w-full h-full" />
              <div className={`absolute inset-0 pointer-events-none ${PANEL_OVERLAY}`} />
              <div className="absolute left-8 md:left-16 bottom-[14vh] max-w-[640px] pointer-events-none pr-6">
                <span className="block text-xs tracking-[0.22em] uppercase text-brand font-bold">{p.eyebrow}</span>
                <h2 className="mt-3.5 text-onimg font-extrabold text-[clamp(56px,9vw,96px)] leading-[0.92] tracking-[-0.03em] [text-shadow:0_4px_40px_rgba(0,0,0,0.5)]">{p.title}</h2>
                <p className="mt-5 text-white/80 text-xl font-light leading-[1.5]">{p.desc}</p>
                <span className="block mt-6 text-white/60 text-sm font-medium">{p.meta}</span>
                <Link href={p.href} className="inline-flex items-center gap-2 mt-[26px] px-[26px] py-[13px] border border-white/45 text-white rounded-full no-underline text-[15px] font-semibold pointer-events-auto transition-colors hover:bg-brand hover:border-brand">Ver proyecto →</Link>
              </div>
            </div>
          ))}

          {/* ver todos */}
          <div className="flex-none w-screen h-screen relative flex flex-col items-center justify-center text-center bg-bg2">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[760px] h-[760px] rounded-full pointer-events-none bg-[radial-gradient(circle,rgba(255,77,14,0.14),transparent_62%)]" />
            <div className="relative px-12">
              <span className="block text-xs tracking-[0.22em] uppercase text-brand font-bold">Y muchos más</span>
              <h2 className="mt-[18px] mx-auto text-fg tracking-[-0.03em] leading-[0.98] max-w-[900px]">
                <span className="block font-extralight text-[40px]">7 proyectos.</span>
                <span className="block font-extrabold text-[clamp(48px,8vw,76px)]">Un mismo propósito.</span>
              </h2>
              <p className="mt-6 mx-auto max-w-[560px] text-muted text-lg font-light leading-[1.5]">Cafezazo, Cosquín Rock, Seguridad vial, Abre Baldes y lo que viene.</p>
              <Link href="/proyectos" className="inline-flex items-center gap-2.5 mt-9 px-[34px] py-[18px] bg-brand text-onimg font-semibold text-[17px] rounded-full no-underline">Ver todos los proyectos →</Link>
            </div>
          </div>
        </div>

        <div className="absolute left-8 md:left-16 top-[14vh] flex items-center gap-3.5 pointer-events-none">
          <span className="text-xs tracking-[0.22em] uppercase text-white/85 font-bold">Proyectos</span>
          <span ref={counterRef} className="text-xs text-brand font-bold tracking-[0.1em]">01 / 03</span>
        </div>
        <div className="absolute right-8 md:right-16 top-[14vh] text-white/55 text-xs tracking-[0.16em] uppercase font-medium pointer-events-none">Scroll →</div>
        <div className="absolute left-0 bottom-0 w-full h-[3px] bg-line">
          <div ref={barRef} className="h-[3px] w-0 bg-brand [box-shadow:0_0_12px_rgba(255,77,14,0.8)]" />
        </div>
      </div>
    </section>
  );
}
