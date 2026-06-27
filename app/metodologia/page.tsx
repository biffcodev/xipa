import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import MethodologyTimeline from "@/components/MethodologyTimeline";

export const metadata: Metadata = {
  title: "Metodología",
  description: "Cómo trabajamos: un proceso circular que convierte el residuo en un nuevo recurso, paso a paso.",
};

export default function Metodologia() {
  return (
    <main>
      <PageHero
        image="/images/hero-diseno.jpg"
        alt="Investigación y diseño"
        eyebrow="Metodología"
        line1="Un proceso circular:"
        line2="cómo trabajamos."
        subtitle="Cada paso conecta con el siguiente para convertir el residuo en un nuevo recurso."
        scrollHref="#proceso"
      />
      <section className="max-w-[1100px] mx-auto px-6 md:px-16 pt-[140px] pb-5">
        <Reveal as="h2" className="m-0 text-fg tracking-[-0.03em] leading-[1.04] text-[clamp(32px,4.6vw,62px)]">
          <span className="font-extralight">Del residuo al recurso, </span>
          <span className="font-extrabold">paso a paso.</span>
        </Reveal>
      </section>
      <MethodologyTimeline />
    </main>
  );
}
