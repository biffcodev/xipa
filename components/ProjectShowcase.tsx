"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import SmartImage from "@/components/SmartImage";
import type { Img } from "@/lib/img";

type Props = { img: Img; tag: string; title: string; desc?: string; year?: string; href: string; counter: string };

export default function ProjectShowcase({ img, tag, title, desc, year, href, counter }: Props) {
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
    <section className="relative h-screen overflow-hidden">
      <div ref={bgRef} className="absolute inset-[-10%_-2%] will-change-transform scale-[1.12]">
        <SmartImage img={img} alt={title} />
      </div>
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(110deg,rgba(0,0,0,0.72)_0%,rgba(0,0,0,0.34)_46%,rgba(0,0,0,0.04)_72%)]" />
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(0deg,rgba(0,0,0,0.5)_0%,rgba(0,0,0,0)_38%)]" />
      <div className="absolute left-8 md:left-16 right-8 md:right-16 bottom-[13vh] max-w-[760px]">
        <span className="block text-brand text-[13px] font-bold tracking-[0.2em]">{tag}</span>
        <h2 className="mt-3.5 text-white font-extrabold text-[clamp(48px,9vw,81px)] leading-[0.9] tracking-[-0.03em] [text-shadow:0_4px_40px_rgba(0,0,0,0.5)]">{title}</h2>
        <p className="mt-[22px] text-white/85 text-[clamp(17px,1.5vw,21px)] font-light leading-[1.55] max-w-[600px] [text-shadow:0_2px_20px_rgba(0,0,0,0.5)]">{desc}</p>
        <div className="flex items-center gap-[22px] mt-7">
          <span className="text-white/60 text-sm font-medium">{year}</span>
          <Link href={href} className="inline-flex items-center gap-2 px-[26px] py-[13px] border border-white/45 text-white rounded-full no-underline text-[15px] font-semibold transition-colors hover:bg-brand hover:border-brand">Ver proyecto →</Link>
        </div>
      </div>
      <span className="absolute top-[14vh] right-8 md:right-16 text-white/70 text-[13px] font-bold tracking-[0.14em]">{counter}</span>
    </section>
  );
}
