import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import ProjectShowcase from "@/components/ProjectShowcase";
import SlotImage from "@/components/SlotImage";

export const metadata: Metadata = {
  title: "Proyectos",
  description: "Proyectos de ecodiseño de XIPA: Grido, Re-vasos, BIO 4, Cafezazo, Cosquín Rock, Seguridad Vial y Abre Baldes.",
};

const SHOWCASE = [
  { slot: "pf-grido", tag: "01 — ENVASE REUTILIZABLE", title: "Grido", desc: "El primer envase recargable de helados del mundo. Reduce el descarte de telgopor y se adapta a la logística de una cadena internacional.", year: "2024", href: "/proyectos/grido", counter: "01 / 07" },
  { slot: "pf-revasos", tag: "02 — REUTILIZABLES", title: "Re-vasos", desc: "Vasos 100% reutilizables, reciclados y reciclables, impresos con tintas al agua.", year: "2022", href: "/proyectos/revasos", counter: "02 / 07" },
  { slot: "pf-bio4", tag: "03 — INDUSTRIA", title: "BIO 4", desc: "Matriz desulfurizadora para bioetanol con proveedores locales y material reciclado.", year: "2020", href: "/proyectos/bio4", counter: "03 / 07" },
];

const CARDS = [
  { slot: "pf-cafezazo", tag: "04 — EVENTOS", title: "Cafezazo", desc: "Un evento de café de especialidad sin vasos de un solo uso, con nuestros Re-vasos.", year: "2023", href: "/proyectos/cafezazo" },
  { slot: "pf-cosquin", tag: "05 — EVENTOS", title: "Cosquín Rock", desc: "Decantador de vinos 100% reutilizable, alternativa segura al vidrio en recitales.", year: "2023", href: "/proyectos/cosquin" },
  { slot: "pf-vial", tag: "06 — COMUNIDAD", title: "Seguridad vial", desc: "Línea de productos viales 100% reciclados: de basura a residuo, a recurso, a seguridad.", year: "2022", href: "/proyectos/vial" },
  { slot: "pf-baldes", tag: "07 — INDUSTRIA", title: "Abre Baldes", desc: "Sistema circular para la industria de la pintura: revaloriza baldes en desuso.", year: "2024", href: "/proyectos/baldes" },
];

export default function Proyectos() {
  return (
    <main>
      <PageHero
        image="/images/hero-productos.jpg"
        alt="Proyectos de ecodiseño"
        eyebrow="Proyectos"
        line1="De residuos a recursos,"
        line2="caso por caso."
        subtitle="Cada proyecto es una prueba de que el plástico puede tener una segunda vida a través del ecodiseño."
        scrollHref="#proyectos-lista"
      />

      <div id="proyectos-lista">
        {SHOWCASE.map((s) => <ProjectShowcase key={s.slot} {...s} />)}
      </div>

      <section className="max-w-[1280px] mx-auto px-6 md:px-16 py-[120px]">
        <span className="block text-xs tracking-[0.22em] uppercase text-brand font-bold">Más proyectos</span>
        <h2 className="mt-3.5 mb-12 text-fg tracking-[-0.03em] text-[clamp(34px,4.4vw,58px)] font-extrabold leading-none">Y muchos más.</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CARDS.map((c) => (
            <Link key={c.slot} href={c.href} className="relative h-[440px] rounded-[20px] overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.4)] no-underline block group">
              <SlotImage id={c.slot} alt={c.title} className="absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(180deg,rgba(0,0,0,0)_45%,rgba(0,0,0,0.65))]" />
              <div className="absolute left-7 bottom-7 max-w-[360px] pointer-events-none">
                <span className="block text-brand text-xs font-bold tracking-[0.18em]">{c.tag}</span>
                <span className="block text-onimg font-extrabold text-[34px] tracking-[-0.02em] mt-2">{c.title}</span>
                <span className="block text-white/[0.78] font-light text-[15px] mt-2 leading-[1.5]">{c.desc}</span>
                <span className="block text-white/50 text-[13px] font-medium mt-3">{c.year}</span>
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
