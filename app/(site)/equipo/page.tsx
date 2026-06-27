import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SmartImage from "@/components/SmartImage";
import { getPage, getTeam } from "@/lib/content";

export const metadata: Metadata = {
  title: "Equipo",
  description: "El equipo de XIPA: diseño, materiales y comunicación para la economía circular.",
};

export default async function Equipo() {
  const [p, team] = await Promise.all([getPage("equipo"), getTeam()]);
  return (
    <main>
      <PageHero image={p.hero.image} alt={p.hero.eyebrow} eyebrow={p.hero.eyebrow} line1={p.hero.line1} line2={p.hero.line2} subtitle={p.hero.subtitle} scrollHref="#integrantes" />

      <section className="max-w-[1100px] mx-auto px-6 md:px-16 pt-[140px] pb-5">
        <Reveal as="h2" className="m-0 text-fg tracking-[-0.03em] leading-[1.04] text-[clamp(32px,4.6vw,62px)]">
          <span className="font-extralight">{p.statement.plain}</span>
          <span className="font-extrabold">{p.statement.bold}</span>
        </Reveal>
      </section>

      <section id="integrantes" className="max-w-[1280px] mx-auto px-6 md:px-16 pt-[50px] pb-[130px]">
        <Reveal as="span" className="block text-xs tracking-[0.24em] uppercase text-brand font-bold mb-10">Quiénes somos</Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
          {team.map((m, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="flex flex-col">
                <div className="relative w-full aspect-[3/4] rounded-[18px] overflow-hidden shadow-[0_24px_56px_rgba(0,0,0,0.2)]">
                  <SmartImage img={m.image} alt={m.name} />
                </div>
                <span className="mt-5 text-fg font-bold text-[19px]">{m.name}</span>
                <span className="mt-1 text-brand text-[13px] font-semibold uppercase tracking-[0.06em]">{m.role}</span>
                <p className="mt-3 text-muted text-[15px] font-light leading-[1.55]">{m.bio}</p>
                {m.linkedin && <a href={m.linkedin} target="_blank" rel="noopener" className="mt-3.5 text-fg text-[13px] font-semibold no-underline border-b border-brand self-start pb-0.5">LinkedIn ↗</a>}
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
