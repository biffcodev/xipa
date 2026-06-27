import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Stats from "@/components/home/Stats";
import SmartImage from "@/components/SmartImage";
import { getPage, getPillars, getStats } from "@/lib/content";

export const metadata: Metadata = {
  title: "La oportunidad",
  description: "La oportunidad de transformar el plástico en un recurso a través del ecodiseño y la economía circular.",
};

export default async function Oportunidad() {
  const [p, pillars, stats] = await Promise.all([getPage("oportunidad"), getPillars(), getStats()]);
  return (
    <main>
      <PageHero image={p.hero.image} alt={p.hero.eyebrow} eyebrow={p.hero.eyebrow} line1={p.hero.line1} line2={p.hero.line2} subtitle={p.hero.subtitle} scrollHref="#pilares" />

      <section className="max-w-[1100px] mx-auto px-6 md:px-16 pt-[140px] pb-10">
        <Reveal as="h2" className="m-0 text-fg tracking-[-0.03em] leading-[1.04] text-[clamp(32px,4.6vw,62px)]">
          <span className="font-extralight">{p.statement.plain}</span>
          <span className="font-extrabold">{p.statement.bold}</span>
        </Reveal>
      </section>

      <section id="pilares" className="max-w-[1280px] mx-auto px-6 md:px-16 pt-[60px] pb-10">
        <Reveal as="span" className="block text-xs tracking-[0.24em] uppercase text-brand font-bold">Cuatro soluciones</Reveal>
        {pillars.map((pl, i) => {
          const imgLeft = i % 2 === 0;
          const Img = (
            <Reveal>
              <div className="relative rounded-[22px] overflow-hidden aspect-[4/3] shadow-[0_30px_70px_rgba(0,0,0,0.18)]">
                <SmartImage img={pl.image} alt={pl.title} />
              </div>
            </Reveal>
          );
          const Text = (
            <Reveal delay={0.12}>
              <span className="block text-brand text-sm font-bold tracking-[0.16em]">0{i + 1}</span>
              <h3 className="mt-3.5 text-fg font-extrabold text-[clamp(40px,5vw,68px)] tracking-[-0.03em] leading-[0.95]">{pl.title}</h3>
              <p className="mt-5 text-muted text-lg font-light leading-[1.6] max-w-[440px]">{pl.text}</p>
            </Reveal>
          );
          return (
            <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center py-12 md:py-16">
              {imgLeft ? (<>{Img}{Text}</>) : (<>{Text}{Img}</>)}
            </div>
          );
        })}
      </section>

      <Stats stats={stats} />
    </main>
  );
}
