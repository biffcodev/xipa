"use client";
import { useEffect, useRef } from "react";
import { homeContent, stats as defaultStats } from "@/lib/defaults";

type Intro = typeof homeContent.stats;
type Stat = { value: number; unit?: string; label?: string; desc?: string };

export default function Stats({ intro = homeContent.stats, stats = defaultStats as Stat[] }: { intro?: Intro; stats?: Stat[] }) {
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    const countUp = (el: HTMLElement) => {
      const target = parseFloat(el.getAttribute("data-count") || "0") || 0;
      const dur = 1500, start = performance.now();
      const step = (now: number) => {
        const p = Math.min(1, (now - start) / dur);
        el.textContent = Math.round(ease(p) * target).toString();
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    const play = (el: HTMLElement) => {
      const num = el.querySelector<HTMLElement>("[data-count]"); if (num) countUp(num);
      const rule = el.querySelector<HTMLElement>("[data-rule]"); if (rule) rule.style.width = "100%";
    };
    const reset = (el: HTMLElement) => {
      const num = el.querySelector<HTMLElement>("[data-count]"); if (num) num.textContent = "0";
      const rule = el.querySelector<HTMLElement>("[data-rule]"); if (rule) rule.style.width = "0%";
    };
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target as HTMLElement;
        el.style.opacity = "1"; el.style.transform = "translateY(0)";
        play(el); io.unobserve(el);
      });
    }, { threshold: 0.45 });
    const cleanups: (() => void)[] = [];
    rowRefs.current.forEach((s, i) => {
      if (!s) return;
      s.style.transitionDelay = `${i * 0.09}s`;
      io.observe(s);
      const onClick = () => { reset(s); requestAnimationFrame(() => requestAnimationFrame(() => play(s))); };
      s.addEventListener("click", onClick);
      cleanups.push(() => s.removeEventListener("click", onClick));
    });
    return () => { io.disconnect(); cleanups.forEach((c) => c()); };
  }, []);

  return (
    <section className="relative w-full bg-bg3 pt-[120px] pb-[130px] border-t border-line4 overflow-hidden">
      <div className="relative px-6 md:px-16 max-w-[1200px] mx-auto">
        <span className="block text-xs tracking-[0.22em] uppercase text-brand font-bold">{intro.eyebrow}</span>
        <h2 className="mt-3.5 text-fg tracking-[-0.03em] leading-[0.98]">
          <span className="block font-extralight text-[34px]">{intro.line1}</span>
          <span className="block font-extrabold text-[clamp(40px,8vw,62px)]">{intro.line2}</span>
        </h2>
        <span className="inline-block mt-[18px] text-muted text-[13px] font-medium tracking-[0.14em] uppercase">{intro.hint}</span>
      </div>
      <div className="max-w-[1200px] mx-auto mt-14 px-6 md:px-16 border-b border-line">
        {stats.map((s, i) => (
          <div
            key={i}
            ref={(el) => { rowRefs.current[i] = el; }}
            className="grid grid-cols-1 md:grid-cols-[1.25fr_1fr] gap-12 items-end py-[42px] border-t border-line cursor-pointer opacity-0 translate-y-10 transition-[opacity,transform] duration-700 ease-out"
          >
            <div>
              <span className="block text-brand text-[13px] font-bold tracking-[0.14em]">0{i + 1}</span>
              <div className="flex items-baseline gap-3 mt-3">
                <span data-count={s.value} className="font-extrabold text-[clamp(68px,8.5vw,124px)] leading-[0.8] text-fg tracking-[-0.045em]">0</span>
                <span className="font-light text-[clamp(26px,3.4vw,44px)] text-brand leading-none">{s.unit}</span>
              </div>
              <div className="mt-[22px] h-0.5 bg-line max-w-[320px]"><div data-rule className="h-0.5 w-0 bg-brand transition-[width] duration-[1300ms] ease-out" /></div>
            </div>
            <div className="pb-4">
              <span className="block text-fg font-semibold text-[19px] tracking-[-0.01em]">{s.label}</span>
              <p className="mt-2.5 text-muted text-base font-light leading-[1.55] max-w-[380px]">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
