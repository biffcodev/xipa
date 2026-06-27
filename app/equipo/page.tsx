import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SlotImage from "@/components/SlotImage";

export const metadata: Metadata = {
  title: "Equipo",
  description: "El equipo de XIPA: diseño, materiales y comunicación para la economía circular.",
};

const TEAM = [
  { slot: "team-alejandro", name: "Alejandro Romano Rusiñol", role: "Fundador", bio: "Lidera Xipa con la misión de re-evolucionar el plástico desde el ecodiseño y la economía circular.", linkedin: "https://www.linkedin.com/in/alejandroromanorusiñol" },
  { slot: "team-melina", name: "Melina Lerda", role: "Co-líder", bio: "Coordina proyectos y alianzas para escalar soluciones de economía circular con marcas y eventos.", linkedin: "https://www.linkedin.com/in/melina-lerda/" },
  { slot: "team-lucia", name: "Lucía Ferre Cinelli", role: "Ecodiseño", bio: "Diseña productos y envases que nacen del residuo, aplicando ecodiseño en cada detalle.", linkedin: "https://www.linkedin.com/in/lucia-v-ferre-cinelli/" },
  { slot: "team-delfina", name: "Delfina Romano", role: "Comunicación e imagen", bio: "Cuenta la historia de cada proyecto y construye la identidad de la marca Xipa.", linkedin: "https://www.linkedin.com/in/delfina-romano-2b0b84180/" },
];

export default function Equipo() {
  return (
    <main>
      <PageHero
        image="/images/hero-diseno.jpg"
        alt="Equipo Xipa"
        eyebrow="Equipo"
        line1="Diseño, materiales y comunicación"
        line2="para la economía circular."
        subtitle="Un equipo cordobés que convierte el residuo plástico en una oportunidad para el planeta."
        scrollHref="#integrantes"
      />

      <section className="max-w-[1100px] mx-auto px-6 md:px-16 pt-[140px] pb-5">
        <Reveal as="h2" className="m-0 text-fg tracking-[-0.03em] leading-[1.04] text-[clamp(32px,4.6vw,62px)]">
          <span className="font-extralight">Detrás de cada proyecto, </span>
          <span className="font-extrabold">personas.</span>
        </Reveal>
      </section>

      <section id="integrantes" className="max-w-[1280px] mx-auto px-6 md:px-16 pt-[50px] pb-[130px]">
        <Reveal as="span" className="block text-xs tracking-[0.24em] uppercase text-brand font-bold mb-10">Quiénes somos</Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
          {TEAM.map((m, i) => (
            <Reveal key={m.slot} delay={i * 0.1}>
              <div className="flex flex-col">
                <div className="relative w-full aspect-[3/4] rounded-[18px] overflow-hidden shadow-[0_24px_56px_rgba(0,0,0,0.2)]">
                  <SlotImage id={m.slot} alt={m.name} className="absolute inset-0 w-full h-full" />
                </div>
                <span className="mt-5 text-fg font-bold text-[19px]">{m.name}</span>
                <span className="mt-1 text-brand text-[13px] font-semibold uppercase tracking-[0.06em]">{m.role}</span>
                <p className="mt-3 text-muted text-[15px] font-light leading-[1.55]">{m.bio}</p>
                <a href={m.linkedin} target="_blank" rel="noopener" className="mt-3.5 text-fg text-[13px] font-semibold no-underline border-b border-brand self-start pb-0.5">LinkedIn ↗</a>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
