"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import SlotImage from "@/components/SlotImage";
import Reveal from "@/components/Reveal";
import type { Project } from "@/lib/projects";

export default function ProjectDetail({ project, prev, next }: { project: Project; prev: Project; next: Project }) {
  const bgRef = useRef<HTMLDivElement>(null);
  const galRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const b = bgRef.current;
      const s = b?.closest("section");
      if (!b || !s) return;
      const p = s.getBoundingClientRect().top / window.innerHeight;
      b.style.transform = `translateY(${p * -6}%) scale(1.12)`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // drag-to-scroll gallery
  useEffect(() => {
    const el = galRef.current;
    if (!el) return;
    let down = false, sx = 0, sl = 0;
    const onDown = (e: PointerEvent) => { down = true; sx = e.pageX; sl = el.scrollLeft; el.setPointerCapture(e.pointerId); };
    const onMove = (e: PointerEvent) => { if (down) el.scrollLeft = sl - (e.pageX - sx); };
    const onUp = () => { down = false; };
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    return () => { el.removeEventListener("pointerdown", onDown); el.removeEventListener("pointermove", onMove); el.removeEventListener("pointerup", onUp); el.removeEventListener("pointercancel", onUp); };
  }, []);

  const eyebrow = "block text-xs tracking-[0.22em] uppercase text-brand font-bold";

  return (
    <main>
      {/* hero */}
      <section className="relative h-screen overflow-hidden bg-[#0d0d0c]">
        <div ref={bgRef} className="absolute inset-[-10%_-2%] will-change-transform scale-[1.12]">
          <SlotImage id={`pf-${project.slug}`} alt={project.title} className="absolute inset-0 w-full h-full" />
        </div>
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(110deg,rgba(0,0,0,0.72)_0%,rgba(0,0,0,0.34)_46%,rgba(0,0,0,0.04)_74%)]" />
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(0deg,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0)_38%)]" />
        <div className="absolute left-8 md:left-16 right-8 md:right-16 bottom-[15vh] max-w-[920px] animate-[heroIn_1s_cubic-bezier(.2,.7,.2,1)_.15s_both]">
          <Link href="/proyectos" className="inline-block text-white/75 text-[13px] font-semibold tracking-[0.14em] uppercase no-underline mb-[18px]">← Proyectos</Link>
          <span className={eyebrow}>{project.tag}</span>
          <h1 className="mt-3.5 text-white font-extrabold text-[clamp(52px,9vw,128px)] leading-[0.9] tracking-[-0.03em] [text-shadow:0_4px_50px_rgba(0,0,0,0.5)]">{project.title}</h1>
          <p className="mt-[22px] max-w-[600px] text-white/[0.88] text-[clamp(17px,1.6vw,22px)] font-light leading-[1.5] [text-shadow:0_2px_20px_rgba(0,0,0,0.5)]">{project.subtitle}</p>
        </div>
        <a href="#detalle" aria-label="Ver más" className="absolute left-1/2 bottom-10 -translate-x-1/2 flex flex-col items-center gap-2.5 text-brand no-underline">
          <span className="text-[11px] tracking-[0.24em] uppercase font-semibold">Scroll</span>
          <span className="text-[26px] leading-none animate-[bounceArrow_1.8s_ease-in-out_infinite]">↓</span>
        </a>
      </section>

      {/* intro + meta */}
      <section id="detalle" className="max-w-[1280px] mx-auto px-6 md:px-16 pt-[120px] pb-10 flex flex-wrap gap-16 items-start">
        <Reveal className="flex-[1.7_1_420px]">
          <span className={eyebrow}>El proyecto</span>
          <p className="mt-[22px] text-fg font-light text-[clamp(28px,3.8vw,52px)] leading-[1.18] tracking-[-0.02em]">{project.intro.lead}</p>
          <p className="mt-7 text-muted text-[17px] font-light leading-[1.75] max-w-[600px]">{project.intro.body}</p>
        </Reveal>
        <Reveal className="flex-[1_1_230px] md:sticky md:top-[120px] border-t-2 border-brand pt-6 flex flex-col gap-5">
          {[["Cliente", project.meta.cliente], ["Año", project.meta.anio], ["Rol", project.meta.rol], ["Pilares", project.meta.pilares]].map(([k, v], i) => (
            <div key={k}>
              <span className="block text-muted text-[11px] tracking-[0.14em] uppercase font-semibold">{k}</span>
              <span className={`block mt-[5px] font-semibold text-[17px] ${i === 3 ? "text-brand" : "text-fg"}`}>{v}</span>
            </div>
          ))}
        </Reveal>
      </section>

      {/* featured */}
      <Reveal as="section" className="w-full pt-[30px] pb-2.5">
        <div className="relative w-[calc(100%-48px)] max-w-[1500px] mx-auto aspect-[16/9] rounded-[24px] overflow-hidden shadow-[0_40px_90px_rgba(0,0,0,0.22)] group">
          <SlotImage id={`det-${project.slug}-1`} alt={`${project.title} — destacada`} className="absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-[1.06]" />
        </div>
      </Reveal>

      {/* desafío / solución */}
      <section className="w-full bg-bg2 border-y border-line mt-[50px]">
        <div className="max-w-[1160px] mx-auto px-6 md:px-16 py-[110px] flex flex-wrap gap-14">
          {[["01", "El desafío", project.desafio, "text-line"], ["02", "La solución", project.solucion, "text-[rgba(255,77,14,0.16)]"]].map(([n, h, t, col]) => (
            <Reveal key={n} className="flex-[1_1_320px] relative">
              <span className={`absolute -top-[54px] -left-1.5 font-black text-[170px] leading-none ${col} tracking-[-0.05em] pointer-events-none`}>{n}</span>
              <div className="relative">
                <span className={eyebrow}>{h}</span>
                <p className="mt-4 text-muted text-[17px] font-light leading-[1.75]">{t}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* gallery */}
      <Reveal as="section" className="py-[30px] overflow-hidden">
        <div className="max-w-[1160px] mx-auto px-6 md:px-16 flex items-end justify-between gap-5">
          <span className={eyebrow}>Galería</span>
          <span className="text-muted text-xs font-semibold tracking-[0.16em] uppercase">Arrastrá →</span>
        </div>
        <div ref={galRef} className="hscroll mt-7 flex gap-4 overflow-x-auto snap-x snap-mandatory px-6 md:px-16 pb-3.5 cursor-grab active:cursor-grabbing">
          {[2, 3, 4].map((i) => (
            <div key={i} className="relative flex-none w-[min(80vw,520px)] aspect-[4/5] rounded-[18px] overflow-hidden snap-center shadow-[0_24px_56px_rgba(0,0,0,0.18)] group">
              <SlotImage id={`det-${project.slug}-${i}`} alt={`${project.title} ${i - 1}`} className="absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-[1.06]" />
            </div>
          ))}
        </div>
      </Reveal>

      {/* proceso */}
      <section className="max-w-[1160px] mx-auto px-6 md:px-16 py-[70px]">
        <Reveal><span className={eyebrow}>El proceso</span></Reveal>
        <div className="flex flex-wrap gap-7 mt-9">
          {project.proceso.map((s) => (
            <Reveal key={s.n} className="flex-[1_1_210px] border-t-2 border-brand pt-[18px]">
              <span className="block text-brand font-extrabold text-[15px] tracking-[0.1em]">{s.n}</span>
              <h4 className="mt-2.5 text-fg font-bold text-[19px] tracking-[-0.01em]">{s.title}</h4>
              <p className="mt-2 text-muted text-[15px] font-light leading-[1.55]">{s.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* impacto */}
      <section className="w-full bg-brand">
        <div className="max-w-[1160px] mx-auto px-6 md:px-16 py-[100px]">
          <Reveal><span className="block text-xs tracking-[0.22em] uppercase text-white font-bold opacity-80">El impacto</span></Reveal>
          <div className="flex flex-wrap gap-6 mt-9">
            {project.impacto.map((s, i) => (
              <Reveal key={i} className="flex-[1_1_230px] border-t border-white/30 pt-6">
                <span className="block font-extrabold text-[clamp(40px,5vw,72px)] text-white tracking-[-0.03em] leading-[0.9]">{s.stat}</span>
                <p className="mt-3.5 text-white/85 text-[15px] font-light leading-[1.5]">{s.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ficha técnica */}
      <section className="max-w-[1160px] mx-auto px-6 md:px-16 py-[90px]">
        <Reveal className="flex flex-wrap gap-12 items-start">
          <div className="flex-[1_1_260px]">
            <span className={eyebrow}>Ficha técnica</span>
            <h3 className="mt-3.5 text-fg font-extrabold text-[clamp(28px,3.4vw,44px)] tracking-[-0.02em] leading-none">En detalle.</h3>
          </div>
          <div className="flex-[2_1_420px]">
            {project.ficha.map((r) => (
              <div key={r.k} className="flex justify-between gap-5 py-[18px] border-t border-line">
                <span className="text-muted text-sm font-medium tracking-[0.04em] uppercase">{r.k}</span>
                <span className="text-fg text-base font-semibold text-right">{r.v}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* prev / next */}
      <section className="max-w-[1280px] mx-auto px-6 md:px-16 pt-2.5 pb-[120px] flex flex-wrap gap-4">
        <Link href={`/proyectos/${prev.slug}`} className="flex-[1_1_280px] flex flex-col gap-2 p-8 border border-line rounded-[18px] no-underline transition-colors hover:bg-surface">
          <span className="text-muted text-xs tracking-[0.16em] uppercase font-semibold">← Anterior</span>
          <span className="text-fg font-extrabold text-[26px] tracking-[-0.02em]">{prev.title}</span>
        </Link>
        <Link href={`/proyectos/${next.slug}`} className="flex-[1_1_280px] flex flex-col gap-2 p-8 border border-line rounded-[18px] no-underline text-right transition-colors hover:bg-surface">
          <span className="text-muted text-xs tracking-[0.16em] uppercase font-semibold">Siguiente →</span>
          <span className="text-fg font-extrabold text-[26px] tracking-[-0.02em]">{next.title}</span>
        </Link>
      </section>
    </main>
  );
}
