"use client";
import { useEffect, useRef } from "react";
import SmartImage from "@/components/SmartImage";
import { homeContent, methodologySteps as defaultSteps } from "@/lib/defaults";
import type { Img } from "@/lib/img";

type Intro = typeof homeContent.methodologyIntro;
type Step = { badge?: string; title: string; text?: string; image?: Img };

const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-block px-3 py-[5px] border border-[rgba(255,77,14,0.4)] text-brand text-[11px] font-semibold tracking-[0.08em] uppercase rounded-full">{children}</span>
);
const ImageBox = ({ img, title }: { img?: Img; title: string }) => (
  <div className="relative h-[300px] rounded-[20px] overflow-hidden shadow-[0_26px_60px_rgba(0,0,0,0.5)]">
    <SmartImage img={img} alt={title} />
    <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(180deg,rgba(0,0,0,0)_60%,rgba(0,0,0,0.45))]" />
  </div>
);

export default function Methodology({ intro = homeContent.methodologyIntro, steps = defaultSteps as Step[] }: { intro?: Intro; steps?: Step[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-step]"));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target as HTMLElement;
        el.style.opacity = "1"; el.style.transform = "translateY(0)";
        const node = el.querySelector<HTMLElement>("[data-node]");
        if (node) { node.style.borderColor = "#FF4D0E"; node.style.color = "#FF4D0E"; node.style.background = "var(--bgnode)"; node.style.animation = "nodeGlow 2.2s ease-out infinite"; }
        io.unobserve(el);
      });
    }, { threshold: 0.3 });
    els.forEach((s) => io.observe(s));

    const onScroll = () => {
      const fill = fillRef.current, track = trackRef.current;
      if (!fill || !track) return;
      const r = track.getBoundingClientRect();
      const prog = Math.min(1, Math.max(0, (window.innerHeight * 0.55 - r.top) / r.height));
      fill.style.height = `${prog * 100}%`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { io.disconnect(); window.removeEventListener("scroll", onScroll); };
  }, [steps.length]);

  return (
    <section id="metodologia" className="relative w-full bg-bg2 pt-[130px] pb-[150px] px-6 md:px-16 overflow-hidden">
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full pointer-events-none bg-[radial-gradient(circle,rgba(255,77,14,0.10),transparent_60%)]" />
      <div className="max-w-[1080px] mx-auto mb-20 text-center relative">
        <span className="block text-xs tracking-[0.22em] uppercase text-brand font-bold">{intro.eyebrow}</span>
        <h2 className="mt-4 text-fg tracking-[-0.03em] text-[clamp(40px,7vw,60px)] leading-none"><span className="font-extralight">{intro.titlePlain}</span><span className="font-extrabold">{intro.titleBold}</span></h2>
        <p className="mt-5 mx-auto max-w-[560px] text-muted text-lg font-light leading-[1.5]">{intro.sub}</p>
      </div>

      <div ref={trackRef} className="relative max-w-[1080px] mx-auto">
        <div className="absolute left-1/2 top-6 bottom-6 -translate-x-1/2 w-0.5 bg-line2 hidden md:block">
          <div ref={fillRef} className="absolute top-0 left-0 w-0.5 h-0 bg-[linear-gradient(180deg,#FF8C5A,#FF4D0E)] [box-shadow:0_0_16px_rgba(255,77,14,0.8)] transition-[height] duration-150 ease-linear" />
        </div>

        {steps.map((s, i) => {
          const textLeft = i % 2 === 0;
          const Text = (
            <div className={textLeft ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"}>
              <Badge>{s.badge}</Badge>
              <h3 className="mt-4 text-fg font-bold text-[30px] tracking-[-0.02em]">{s.title}</h3>
              <p className="mt-3 text-muted text-base font-light leading-[1.55]">{s.text}</p>
            </div>
          );
          const Img = <div className={textLeft ? "md:pl-12" : "md:pr-12"}><ImageBox img={s.image} title={s.title} /></div>;
          return (
            <div key={i} data-step className="relative grid grid-cols-1 md:grid-cols-[1fr_88px_1fr] items-center mb-20 last:mb-0 opacity-0 translate-y-12 transition-[opacity,transform] duration-[800ms] ease-out gap-6 md:gap-0">
              {textLeft ? Text : Img}
              <div className="hidden md:flex justify-center">
                <div data-node className="w-[60px] h-[60px] rounded-full bg-bg3 border-[1.5px] border-line5 text-fg flex items-center justify-center font-bold text-lg transition-all duration-500 relative z-[3]">0{i + 1}</div>
              </div>
              {textLeft ? Img : Text}
            </div>
          );
        })}
      </div>
    </section>
  );
}
