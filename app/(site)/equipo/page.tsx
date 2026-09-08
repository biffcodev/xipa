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
      <PageHero
        image={p.hero.image}
        alt="Equipo"
        eyebrow="Equipo"
        line1="Con quiénes"
        line2="vas a trabajar."
        subtitle="Un equipo que creció dentro de la industria del plástico y pasó más de veinte años investigando circularidad y sustentabilidad. Diseñadores, ingenieros y una red de aliados que se suma según el proyecto."
        scrollHref="#integrantes"
      />

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

      <section id="red" className="bg-bg1 border-t border-line2">
        <div className="max-w-[1280px] mx-auto px-6 md:px-16 py-[120px]">
          <Reveal as="span" className="block text-xs tracking-[0.24em] uppercase text-brand font-bold mb-9">Nuestra red</Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-14 items-start">
            <Reveal as="h2" className="m-0 text-fg tracking-[-0.03em] leading-[1.05] text-[clamp(28px,3.6vw,50px)]">
              <span className="font-extralight">Nos armamos y desarmamos </span>
              <span className="font-extrabold">según cada desafío.</span>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="text-muted text-[19px] font-light leading-[1.6]">
                Al núcleo de XIPA se suma, proyecto a proyecto, una red de aliados que amplía lo que
                podemos resolver: laboratorios que ensayan y validan materiales, proveedores industriales
                que producen a escala, universidades y centros de investigación con los que desarrollamos,
                y recicladores que cierran el ciclo. Armamos el equipo que cada desafío necesita y lo
                desarmamos cuando el proyecto termina.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {["Laboratorios", "Proveedores industriales", "Universidades", "Recicladores", "Estudios de diseño", "Cámaras y ONGs"].map((chip) => (
                  <span key={chip} className="inline-flex items-center px-4 py-2 rounded-full border border-line5 bg-bg2 text-fg text-[14px] font-medium">
                    {chip}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
