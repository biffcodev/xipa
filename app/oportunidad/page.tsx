import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Stats from "@/components/home/Stats";

export const metadata: Metadata = {
  title: "La oportunidad",
  description: "La oportunidad de transformar el plástico en un recurso a través del ecodiseño y la economía circular.",
};

const PILLARS = [
  { n: "01", title: "Reducir", img: "/images/pilar-reducir.jpg", text: "Reducimos el peso de los productos mediante mejoras técnicas en los materiales o eliminando elementos del envase." },
  { n: "02", title: "Rediseñar", img: "/images/pilar-redisenar.jpg", text: "Rediseñamos los productos para aumentar su capacidad, rendir más su contenido y mejorar los procesos involucrados." },
  { n: "03", title: "Repensar", img: "/images/pilar-repensar.jpg", text: "Incorporamos material reciclado en nuevos productos, con piezas fácilmente separables y compatibles para el reciclado." },
  { n: "04", title: "Reutilizar", img: "/images/pilar-reutilizar.jpg", text: "Sustituimos productos de un solo uso por reutilizables y mejoramos sus características para alargar su vida útil." },
];

export default function Oportunidad() {
  return (
    <main>
      <PageHero
        image="/images/hero-circular.jpg"
        alt="Economía circular"
        eyebrow="Oportunidad"
        line1="Re-evolucionar el plástico"
        line2="es la oportunidad."
        subtitle="Cuatro soluciones de ecodiseño para convertir un problema global en valor para las empresas y el planeta."
        scrollHref="#pilares"
      />

      <section className="max-w-[1100px] mx-auto px-6 md:px-16 pt-[140px] pb-10">
        <Reveal as="h2" className="m-0 text-fg tracking-[-0.03em] leading-[1.04] text-[clamp(32px,4.6vw,62px)]">
          <span className="font-extralight">Cada residuo es una </span>
          <span className="font-extrabold">oportunidad de diseño.</span>
        </Reveal>
      </section>

      <section id="pilares" className="max-w-[1280px] mx-auto px-6 md:px-16 pt-[60px] pb-10">
        <Reveal as="span" className="block text-xs tracking-[0.24em] uppercase text-brand font-bold">Cuatro soluciones</Reveal>
        {PILLARS.map((p, i) => {
          const imgLeft = i % 2 === 0;
          const Img = (
            <Reveal>
              <div className="relative rounded-[22px] overflow-hidden aspect-[4/3] shadow-[0_30px_70px_rgba(0,0,0,0.18)]">
                <Image src={p.img} alt={p.title} fill sizes="(max-width:768px) 100vw, 640px" className="object-cover" />
              </div>
            </Reveal>
          );
          const Text = (
            <Reveal delay={0.12}>
              <span className="block text-brand text-sm font-bold tracking-[0.16em]">{p.n}</span>
              <h3 className="mt-3.5 text-fg font-extrabold text-[clamp(40px,5vw,68px)] tracking-[-0.03em] leading-[0.95]">{p.title}</h3>
              <p className="mt-5 text-muted text-lg font-light leading-[1.6] max-w-[440px]">{p.text}</p>
            </Reveal>
          );
          return (
            <div key={p.n} className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center py-12 md:py-16">
              {imgLeft ? (<>{Img}{Text}</>) : (<>{Text}{Img}</>)}
            </div>
          );
        })}
      </section>

      <Stats />
    </main>
  );
}
