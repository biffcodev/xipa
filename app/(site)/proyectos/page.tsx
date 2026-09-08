import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import SmartImage from "@/components/SmartImage";
import { getPage, getProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Proyectos",
  description:
    "Proyectos de diseño sistémico de XIPA: rediseños, nuevos diseños y sistemas que reducen impacto sin resignar negocio.",
};

const FILTERS = ["Todos", "Packaging", "Rediseño", "Nuevo diseño", "Sistema"];

export default async function Proyectos() {
  const [p, projects] = await Promise.all([getPage("proyectos"), getProjects()]);

  return (
    <main>
      <PageHero
        image={p.hero.image}
        alt="Proyectos XIPA"
        eyebrow="Proyectos"
        line1="Soluciones que ya están"
        line2="en el mercado."
        subtitle="Rediseños, nuevos diseños y sistemas que reducen impacto sin resignar negocio."
        scrollHref="#proyectos-lista"
      />

      {/* Barra de filtros — sólo visual en esta etapa */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-16 pt-[70px]">
        <div className="flex flex-wrap gap-2.5">
          {FILTERS.map((f, i) => (
            <span
              key={f}
              className={
                i === 0
                  ? "px-4 py-2 rounded-full text-sm font-semibold bg-brand text-white"
                  : "px-4 py-2 rounded-full text-sm font-semibold border border-line5 text-muted"
              }
            >
              {f}
            </span>
          ))}
        </div>
      </div>

      <section id="proyectos-lista" className="max-w-[1280px] mx-auto px-6 md:px-16 pt-10 pb-[120px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((pr) => (
            <Link key={pr.slug} href={`/proyectos/${pr.slug}`} className="group block no-underline">
              <div className="relative aspect-[4/3] rounded-[18px] overflow-hidden bg-bg2 shadow-[0_16px_40px_rgba(0,0,0,0.16)]">
                <SmartImage
                  img={(pr as { heroImage?: never }).heroImage}
                  alt={pr.title}
                  sizes="(max-width:768px) 100vw, (max-width:1280px) 50vw, 33vw"
                  className="transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <h3 className="mt-4 text-fg font-extrabold text-[22px] tracking-[-0.02em] transition-colors group-hover:text-brand">
                {pr.title}
              </h3>
              <p className="mt-1 text-muted text-[13px] font-medium tracking-[0.02em]">
                {[pr.meta?.cliente, pr.tag, pr.meta?.anio].filter(Boolean).join(" · ")}
              </p>
            </Link>
          ))}

          <div className="relative aspect-[4/3] rounded-[18px] border border-dashed border-line5 flex flex-col items-center justify-center text-center px-6">
            <span className="text-brand text-xs font-bold tracking-[0.18em]">PRÓXIMAMENTE</span>
            <span className="text-fg font-extrabold text-[26px] tracking-[-0.02em] mt-2.5">Próximos proyectos</span>
            <span className="text-muted font-light text-sm mt-2">Nuevos sistemas en desarrollo.</span>
          </div>
        </div>
      </section>
    </main>
  );
}
