"use client";
import { useEffect, useRef } from "react";
import Reveal from "@/components/Reveal";
import SmartImage from "@/components/SmartImage";
import { methodologySteps as defaultSteps } from "@/lib/defaults";
import type { Img } from "@/lib/img";

type Step = { title: string; text?: string; image?: Img };

export default function MethodologyTimeline({ steps = defaultSteps as Step[] }: { steps?: Step[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onScroll = () => {
      const fill = fillRef.current, track = trackRef.current;
      if (!fill || !track) return;
      const r = track.getBoundingClientRect();
      const prog = Math.min(1, Math.max(0, (window.innerHeight * 0.55 - r.top) / r.height));
      fill.style.height = `${prog * 100}%`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="proceso" className="max-w-[1280px] mx-auto px-6 md:px-16 pt-[50px] pb-[130px]">
      <Reveal as="span" className="block text-xs tracking-[0.24em] uppercase text-brand font-bold mb-2.5">Cinco etapas</Reveal>
      <div ref={trackRef} className="relative">
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-line -translate-x-1/2 hidden md:block">
          <div ref={fillRef} className="absolute left-0 top-0 w-full h-0 bg-brand [box-shadow:0_0_12px_rgba(255,77,14,0.6)]" />
        </div>
        {steps.map((s, i) => {
          const textLeft = i % 2 === 0;
          const Text = (
            <div>
              <span className="block text-brand text-[clamp(40px,5vw,72px)] font-extrabold tracking-[-0.02em] leading-[0.9]">0{i + 1}</span>
              <h3 className="mt-[18px] text-fg font-extrabold text-[clamp(26px,2.8vw,38px)] tracking-[-0.02em] leading-none">{s.title}</h3>
              <p className="mt-4 max-w-[460px] text-muted text-[17px] font-light leading-[1.6]">{s.text}</p>
            </div>
          );
          const Img = (
            <div className="relative rounded-[20px] overflow-hidden aspect-[4/3] shadow-[0_28px_64px_rgba(0,0,0,0.18)]">
              <SmartImage img={s.image} alt={s.title} />
            </div>
          );
          return (
            <Reveal key={i}>
              <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-14 items-center py-12 md:py-[60px]">
                {textLeft ? (<>{Text}{Img}</>) : (<>{Img}{Text}</>)}
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
