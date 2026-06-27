import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import ProjectShowcase from "@/components/ProjectShowcase";
import SmartImage from "@/components/SmartImage";
import { getPage, getProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Proyectos",
  description: "Proyectos de ecodiseño de XIPA: Grido, Re-vasos, BIO 4, Cafezazo, Cosquín Rock, Seguridad Vial y Abre Baldes.",
};

export default async function Proyectos() {
  const [p, projects] = await Promise.all([getPage("proyectos"), getProjects()]);
  const total = projects.length;
  const showcase = projects.slice(0, 3);
  const cards = projects.slice(3);
  return (
    <main>
      <PageHero image={p.hero.image} alt={p.hero.eyebrow} eyebrow={p.hero.eyebrow} line1={p.hero.line1} line2={p.hero.line2} subtitle={p.hero.subtitle} scrollHref="#proyectos-lista" />

      <div id="proyectos-lista">
        {showcase.map((pr, i) => (
          <ProjectShowcase
            key={pr.slug}
            img={(pr as { heroImage?: never }).heroImage}
            tag={`0${i + 1} — ${(pr.tag || "").toUpperCase()}`}
            title={pr.title}
            desc={pr.subtitle}
            year={pr.meta?.anio}
            href={`/proyectos/${pr.slug}`}
            counter={`0${i + 1} / 0${total}`}
          />
        ))}
      </div>

      <section className="max-w-[1280px] mx-auto px-6 md:px-16 py-[120px]">
        <span className="block text-xs tracking-[0.22em] uppercase text-brand font-bold">Más proyectos</span>
        <h2 className="mt-3.5 mb-12 text-fg tracking-[-0.03em] text-[clamp(34px,4.4vw,58px)] font-extrabold leading-none">Y muchos más.</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cards.map((c, i) => (
            <Link key={c.slug} href={`/proyectos/${c.slug}`} className="relative h-[440px] rounded-[20px] overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.4)] no-underline block group">
              <SmartImage img={(c as { heroImage?: never }).heroImage} alt={c.title} className="transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(180deg,rgba(0,0,0,0)_45%,rgba(0,0,0,0.65))]" />
              <div className="absolute left-7 bottom-7 max-w-[360px] pointer-events-none">
                <span className="block text-brand text-xs font-bold tracking-[0.18em]">0{i + 4} — {(c.tag || "").toUpperCase()}</span>
                <span className="block text-onimg font-extrabold text-[34px] tracking-[-0.02em] mt-2">{c.title}</span>
                <span className="block text-white/[0.78] font-light text-[15px] mt-2 leading-[1.5]">{c.subtitle}</span>
                <span className="block text-white/50 text-[13px] font-medium mt-3">{c.meta?.anio}</span>
              </div>
            </Link>
          ))}
          <div className="col-span-1 md:col-span-2 relative h-[300px] rounded-[24px] border border-dashed border-line5 flex flex-col items-center justify-center text-center px-6">
            <span className="text-brand text-xs font-bold tracking-[0.18em]">PRÓXIMAMENTE</span>
            <span className="text-fg font-extrabold text-[40px] tracking-[-0.02em] mt-2.5">Próximos proyectos</span>
            <span className="text-muted font-light text-base mt-2">Lo que viene en economía circular.</span>
          </div>
        </div>
      </section>
    </main>
  );
}
