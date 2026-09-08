import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SmartImage from "@/components/SmartImage";
import OpportunityScroll, { type Beat } from "@/components/oportunidad/OpportunityScroll";
import { getPage, getPillars, getStats } from "@/lib/content";

export const metadata: Metadata = {
  title: "La oportunidad",
  description: "La oportunidad de transformar el plástico en un recurso a través del ecodiseño y la economía circular.",
};

export default async function Oportunidad() {
  const [p, pillars, stats] = await Promise.all([getPage("oportunidad"), getPillars(), getStats()]);

  const statBeats: Beat[] = stats
    .slice(0, 3)
    .map((s) => ({ kind: "stat" as const, value: s.value, unit: s.unit, label: s.label, desc: s.desc }));
  if (statBeats[0]) statBeats[0].image = "/images/hero-circular.jpg";

  const beats: Beat[] = [
    { kind: "intro", eyebrow: "El problema", headline: "Más plástico del que podemos reciclar." },
    ...statBeats,
    { kind: "pivot", eyebrow: "El giro", plain: p.statement.plain, bold: p.statement.bold, image: "/images/pilar-redisenar.jpg" },
    {
      kind: "pivot",
      eyebrow: "La oportunidad",
      plain: "Hacé lo que estás pensando, ",
      bold: "con más valor.",
      sub: "En el mismo tiempo y al mismo costo. Resolvemos diseño industrial, mejoramos el desempeño y reducimos el impacto ambiental.",
      image: "/images/slots/proc-4.webp",
    },
  ];

  return (
    <main>
      <PageHero
        image={p.hero.image}
        alt={p.hero.eyebrow}
        eyebrow={p.hero.eyebrow}
        line1={p.hero.line1}
        line2={p.hero.line2}
        subtitle={p.hero.subtitle}
        scrollHref="#pilares"
      />

      <OpportunityScroll beats={beats} />

      <section id="pilares" className="max-w-[1280px] mx-auto px-6 md:px-16 pt-[80px] pb-10">
        <Reveal as="span" className="block text-xs tracking-[0.24em] uppercase text-brand font-bold">
          Cuatro soluciones
        </Reveal>
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
              {imgLeft ? (
                <>
                  {Img}
                  {Text}
                </>
              ) : (
                <>
                  {Text}
                  {Img}
                </>
              )}
            </div>
          );
        })}
      </section>
    </main>
  );
}
