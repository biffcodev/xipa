import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import OpportunityScroll, { type Beat } from "@/components/oportunidad/OpportunityScroll";

export const metadata: Metadata = {
  title: "La oportunidad",
  description:
    "El problema no es el plástico, es la mirada. XIPA nace de ver las cosas de otra manera: diseño sistémico con enfoque ambiental que opera sobre las variables del negocio.",
};

const beats: Beat[] = [
  {
    kind: "intro",
    eyebrow: "Las variables que deciden",
    headline: "Una solución se adopta cuando opera sobre lo que estructura la decisión empresarial.",
  },
  { kind: "point", eyebrow: "Eficiencia operativa", headline: "Que funcione mejor.", desc: "En la línea, el depósito y el transporte." },
  { kind: "point", eyebrow: "Viabilidad económica", headline: "Que cierre en costo.", desc: "Casi siempre, menos impacto es menos gasto." },
  { kind: "point", eyebrow: "Tracción comercial", headline: "Que el mercado lo elija.", desc: "Una solución que se prefiere a la hora de comprar." },
  { kind: "point", eyebrow: "Posicionamiento de marca", headline: "Que cuente una historia.", desc: "Que inspire a otros y diferencie a la marca." },
  {
    kind: "point",
    eyebrow: "La quinta condición",
    headline: "Medirse.",
    desc: "Sin datos no hay mejora continua ni decisiones sobre bases fehacientes.",
  },
];

export default function LaOportunidad() {
  return (
    <main>
      <PageHero
        image="/images/hero-circular.jpg"
        alt="La oportunidad"
        eyebrow="La oportunidad"
        line1="Si todos tuviésemos una única mirada,"
        line2="no existiría la innovación."
        subtitle="La mirada única nos impide encontrar soluciones al desafío ambiental que enfrentamos. XIPA nace de ver las cosas de otra manera."
        scrollHref="#mirada"
      />

      {/* El problema es la mirada */}
      <section id="mirada" className="max-w-[1100px] mx-auto px-6 md:px-16 pt-[130px] pb-16">
        <Reveal as="span" className="block text-xs tracking-[0.24em] uppercase text-brand font-bold">
          El problema no es el plástico
        </Reveal>
        <Reveal as="h2" className="mt-4 text-fg tracking-[-0.03em] leading-[1.05] text-[clamp(32px,4.6vw,62px)] font-extrabold">
          Es la mirada.
        </Reveal>
        <Reveal>
          <p className="mt-6 max-w-[680px] text-muted text-[clamp(17px,1.5vw,21px)] font-light leading-[1.6]">
            Crecimos trabajando el plástico, estudiándolo, desafiándonos. Y nos dimos cuenta de que falta otra vuelta más:
            evolucionarlo para que sea parte de la solución, no del problema.
          </p>
        </Reveal>
        <Reveal>
          <p className="mt-5 max-w-[680px] text-fg text-[clamp(18px,1.6vw,22px)] font-light leading-[1.55]">
            El impacto ambiental no se negocia. <span className="font-semibold">El punto de partida es tu negocio.</span>
          </p>
        </Reveal>
      </section>

      {/* Las variables que deciden — recorrido */}
      <OpportunityScroll beats={beats} />

      {/* Manifiesto */}
      <section className="max-w-[1100px] mx-auto px-6 md:px-16 py-[120px]">
        <Reveal as="span" className="block text-xs tracking-[0.24em] uppercase text-brand font-bold">
          Manifiesto
        </Reveal>
        <Reveal as="p" className="mt-6 text-fg tracking-[-0.02em] leading-[1.22] text-[clamp(26px,3.4vw,46px)] font-light">
          En XIPA creemos en el diseño, en la mirada sistémica con enfoque ambiental, en evolucionar al plástico para que
          sea parte de la solución. Tenemos el entendimiento y un sinfín de posibilidades, la tecnología y miles de
          oportunidades, el talento y muchas voluntades. Habilitemos el universo de posibilidades que están frente a
          nuestros ojos. <span className="font-extrabold text-brand">Sumemos miradas y re-evolucionemos el plástico.</span>
        </Reveal>
      </section>

      {/* CTA */}
      <section className="max-w-[1100px] mx-auto px-6 md:px-16 pb-[130px]">
        <div className="rounded-[28px] bg-bg2 px-8 md:px-16 py-16 text-center">
          <Reveal as="h2" className="text-fg font-extrabold tracking-[-0.03em] text-[clamp(30px,4vw,56px)] leading-[1.02]">
            ¿Cómo lo hacemos?
          </Reveal>
          <Reveal>
            <Link
              href="/como-trabajamos"
              className="mt-8 inline-block rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-white no-underline transition hover:opacity-90"
            >
              Conocé nuestra forma de trabajar →
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
