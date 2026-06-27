"use client";
import { useEffect, useRef } from "react";
import SmartImage from "@/components/SmartImage";
import { pillars as defaultPillars } from "@/lib/defaults";
import type { Img } from "@/lib/img";

type Pillar = { title: string; text?: string; image?: Img };
const OVERLAY = "bg-[linear-gradient(95deg,rgba(244,241,235,0.82)_0%,rgba(244,241,235,0.35)_38%,rgba(244,241,235,0)_62%)]";

export default function Pillars({ pillars = defaultPillars as Pillar[] }: { pillars?: Pillar[] }) {
  const secRef = useRef<HTMLElement>(null);
  const scenes = useRef<(HTMLDivElement | null)[]>([]);
  const imgs = useRef<(HTMLDivElement | null)[]>([]);
  const texts = useRef<(HTMLDivElement | null)[]>([]);
  const ix = useRef<(HTMLButtonElement | null)[]>([]);
  const bar = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const count = pillars.length || 1;

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const sec = secRef.current;
      if (sec) {
        const total = sec.offsetHeight - window.innerHeight;
        const scrolled = Math.min(total, Math.max(0, -sec.getBoundingClientRect().top));
        const prog = total > 0 ? scrolled / total : 0;
        const seg = Math.min(count - 0.001, prog * count);
        const idx = Math.floor(seg);
        const frac = seg - idx;
        scenes.current.forEach((sc, k) => {
          if (!sc) return;
          sc.style.opacity = k === idx ? "1" : "0";
          if (k === idx) {
            if (imgs.current[k]) imgs.current[k]!.style.transform = `translateY(${(0.5 - frac) * 16}vh) scale(1.08)`;
            if (texts.current[k]) texts.current[k]!.style.transform = `translateY(${(0.5 - frac) * 64}px)`;
          }
        });
        if (bar.current) bar.current.style.width = `${frac * 100}%`;
        if (counter.current) counter.current.textContent = `0${idx + 1} / 0${count}`;
        ix.current.forEach((b, k) => {
          if (!b) return;
          b.style.opacity = k === idx ? "1" : "0.42";
          const num = b.querySelector<HTMLElement>(".ix-num");
          if (num) num.style.color = k === idx ? "#FF4D0E" : "#23211e";
          const line = b.querySelector<HTMLElement>(".ix-line");
          if (line) line.style.width = k === idx ? "34px" : "0";
        });
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [count]);

  const goStat = (i: number) => {
    const sec = secRef.current;
    if (!sec) return;
    const total = sec.offsetHeight - window.innerHeight;
    window.scrollTo({ top: sec.offsetTop + total * ((i + 0.5) / count), behavior: "smooth" });
  };

  return (
    <section ref={secRef} id="ecodiseno" className="relative w-full h-[460vh] bg-[#f4f1eb]">
      <div className="sticky top-0 h-screen overflow-hidden bg-[#f4f1eb]">
        {pillars.map((p, i) => (
          <div key={i} ref={(el) => { scenes.current[i] = el; }} className="absolute inset-0 transition-opacity duration-[900ms] ease-out" style={{ opacity: i === 0 ? 1 : 0 }}>
            <div ref={(el) => { imgs.current[i] = el; }} className="absolute top-[-12%] left-0 w-full h-[124%]">
              <SmartImage img={p.image} alt={p.title} />
            </div>
            <div className={`absolute inset-0 pointer-events-none ${OVERLAY}`} />
            <div ref={(el) => { texts.current[i] = el; }} className="absolute left-8 right-8 md:left-16 md:right-16 bottom-[12vh] max-w-[920px] pointer-events-none">
              <span className="block font-black text-[clamp(72px,11vw,168px)] leading-[0.85] tracking-[-0.05em] text-[#23211e] [text-shadow:0_2px_30px_rgba(244,241,235,0.7)]">{p.title}</span>
              <p className="mt-[26px] text-[#56524d] text-[clamp(17px,1.5vw,22px)] font-light leading-[1.5] max-w-[600px]">{p.text}</p>
            </div>
          </div>
        ))}

        <div className="absolute top-[13vh] left-8 right-8 md:left-16 md:right-16 flex items-center justify-between pointer-events-none">
          <span className="text-xs tracking-[0.24em] uppercase text-[#56524d] font-bold">Soluciones de ecodiseño</span>
          <span ref={counter} className="text-xs tracking-[0.14em] text-brand font-bold">01 / 0{count}</span>
        </div>

        <div className="absolute top-1/2 right-8 md:right-16 -translate-y-1/2 hidden sm:flex flex-col gap-1 items-end z-[6]">
          {pillars.map((p, i) => (
            <button key={i} ref={(el) => { ix.current[i] = el; }} onClick={() => goStat(i)} className="flex items-center gap-3 bg-transparent border-none py-[7px] cursor-pointer text-left transition-opacity" style={{ opacity: i === 0 ? 1 : 0.42 }}>
              <span className="ix-num text-[13px] font-bold tracking-[0.1em]" style={{ color: i === 0 ? "#FF4D0E" : "#23211e" }}>0{i + 1}</span>
              <span className="text-[15px] font-semibold text-[#23211e] tracking-[-0.01em]">{p.title}</span>
              <span className="ix-line block h-px bg-brand transition-[width] duration-[450ms]" style={{ width: i === 0 ? 34 : 0 }} />
            </button>
          ))}
        </div>

        <div className="absolute left-0 bottom-0 w-full h-[3px] bg-black/10">
          <div ref={bar} className="h-[3px] w-0 bg-brand [box-shadow:0_0_14px_rgba(255,77,14,0.8)]" />
        </div>
        <div className="absolute right-8 md:right-16 bottom-[26px] text-black/45 text-xs tracking-[0.16em] uppercase font-medium pointer-events-none">Scrolleá ↓</div>
      </div>
    </section>
  );
}
