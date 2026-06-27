"use client";
import { useState } from "react";
import SmartImage from "@/components/SmartImage";
import { homeContent, team as defaultTeam } from "@/lib/defaults";
import type { Img } from "@/lib/img";

type Intro = typeof homeContent.teamIntro;
type Member = { name: string; role?: string; bio?: string; linkedin?: string; image?: Img };

export default function Team({ intro = homeContent.teamIntro, members = defaultTeam as Member[] }: { intro?: Intro; members?: Member[] }) {
  const [sel, setSel] = useState(-1);
  return (
    <section id="equipo" className="w-full bg-bg5 py-[90px] px-6 md:px-12">
      <div className="max-w-[1500px] mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <h2 className="m-0 text-fg tracking-[-0.03em] text-[clamp(40px,7vw,56px)] leading-none"><span className="font-extralight">{intro.titlePlain}</span><span className="font-extrabold">{intro.titleBold}</span></h2>
        <p className="m-0 max-w-[420px] text-muted text-base font-light leading-[1.5] md:text-right">{intro.sub}</p>
      </div>
      <div className="flex flex-col md:flex-row gap-3.5 max-w-[1500px] mx-auto mt-11 md:h-[74vh]">
        {members.map((m, i) => {
          const grow = sel === i ? 2.6 : sel >= 0 ? 0.78 : 1;
          const op = sel >= 0 && sel !== i ? 0.55 : 1;
          const open = sel === i;
          return (
            <div
              key={i}
              onClick={(e) => { if ((e.target as HTMLElement).closest("a")) return; setSel(open ? -1 : i); }}
              style={{ flexGrow: grow, opacity: op }}
              className="group relative overflow-hidden rounded-[18px] cursor-pointer min-w-0 min-h-[320px] md:min-h-0 shadow-[0_24px_60px_rgba(0,0,0,0.3)] transition-[flex-grow,opacity] duration-[600ms] ease-out basis-0"
            >
              <SmartImage img={m.image} alt={m.name} className="transition-transform duration-700 group-hover:scale-[1.06]" />
              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(180deg,rgba(0,0,0,0)_38%,rgba(0,0,0,0.82))]" />
              <div className="absolute left-0 bottom-0 w-full p-7">
                <span className="block text-white font-extrabold text-[23px] tracking-[-0.01em] [text-shadow:0_2px_20px_rgba(0,0,0,0.5)]">{m.name}</span>
                <span className="block text-brand text-xs font-bold mt-[5px] uppercase tracking-[0.08em]">{m.role}</span>
                <div className="overflow-hidden transition-[max-height,opacity] duration-[600ms]" style={{ maxHeight: open ? 220 : 0, opacity: open ? 1 : 0 }}>
                  <p className="mt-3.5 text-white/80 text-sm font-light leading-[1.55]">{m.bio}</p>
                  {m.linkedin && <a href={m.linkedin} target="_blank" rel="noopener" className="inline-flex items-center gap-[7px] mt-4 text-white text-[13px] font-semibold no-underline border border-white/35 px-4 py-2 rounded-full pointer-events-auto transition-colors hover:bg-brand hover:border-brand">LinkedIn ↗</a>}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
