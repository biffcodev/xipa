import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import MethodologyTimeline from "@/components/MethodologyTimeline";
import { getMethodologySteps, getPage } from "@/lib/content";

export const metadata: Metadata = {
  title: "Metodología",
  description: "Cómo trabajamos: un proceso circular que convierte el residuo en un nuevo recurso, paso a paso.",
};

export default async function Metodologia() {
  const [p, steps] = await Promise.all([getPage("metodologia"), getMethodologySteps()]);
  return (
    <main>
      <PageHero image={p.hero.image} alt={p.hero.eyebrow} eyebrow={p.hero.eyebrow} line1={p.hero.line1} line2={p.hero.line2} subtitle={p.hero.subtitle} scrollHref="#proceso" />
      <section className="max-w-[1100px] mx-auto px-6 md:px-16 pt-[140px] pb-5">
        <Reveal as="h2" className="m-0 text-fg tracking-[-0.03em] leading-[1.04] text-[clamp(32px,4.6vw,62px)]">
          <span className="font-extralight">{p.statement.plain}</span>
          <span className="font-extrabold">{p.statement.bold}</span>
        </Reveal>
      </section>
      <MethodologyTimeline steps={steps} />
    </main>
  );
}
