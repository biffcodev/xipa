"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { hasImg, imgSrc, type Img } from "@/lib/img";

type Props = {
  image: Img;
  alt: string;
  eyebrow: string;
  line1: string;
  line2: string;
  subtitle?: string;
  scrollHref?: string;
};

export default function PageHero({ image, alt, eyebrow, line1, line2, subtitle, scrollHref }: Props) {
  const bgRef = useRef<HTMLDivElement>(null);
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

  return (
    <section className="relative h-screen overflow-hidden bg-[#0d0d0c]">
      <div ref={bgRef} className="absolute inset-[-10%_-2%] will-change-transform scale-[1.12]">
        {hasImg(image) && <Image src={imgSrc(image)} alt={alt} fill sizes="100vw" priority className="object-cover" />}
      </div>
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(110deg,rgba(0,0,0,0.7)_0%,rgba(0,0,0,0.32)_48%,rgba(0,0,0,0.05)_74%)]" />
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(0deg,rgba(0,0,0,0.5)_0%,rgba(0,0,0,0)_36%)]" />
      <div className="absolute left-8 md:left-16 right-8 md:right-16 bottom-[16vh] max-w-[920px]">
        <span className="block text-xs tracking-[0.28em] uppercase text-brand font-bold">{eyebrow}</span>
        <h1 className="mt-[18px] text-white tracking-[-0.03em] leading-[0.92] [text-shadow:0_4px_50px_rgba(0,0,0,0.5)]">
          <span className="block font-extralight text-[clamp(34px,4.4vw,58px)]">{line1}</span>
          <span className="block font-extrabold text-[clamp(52px,8vw,118px)]">{line2}</span>
        </h1>
        {subtitle && <p className="mt-6 max-w-[600px] text-white/85 text-[clamp(17px,1.5vw,21px)] font-light leading-[1.55] [text-shadow:0_2px_20px_rgba(0,0,0,0.5)]">{subtitle}</p>}
      </div>
      {scrollHref && (
        <a href={scrollHref} aria-label="Ver más" className="absolute left-1/2 bottom-10 -translate-x-1/2 flex flex-col items-center gap-2.5 text-brand no-underline">
          <span className="text-[11px] tracking-[0.24em] uppercase font-semibold">Scroll</span>
          <span className="text-[26px] leading-none animate-[bounceArrow_1.8s_ease-in-out_infinite]">↓</span>
        </a>
      )}
    </section>
  );
}
