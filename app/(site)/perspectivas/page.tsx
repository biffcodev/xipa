import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { perspectivas } from "@/lib/perspectivas";

export const metadata: Metadata = {
  title: "Perspectivas",
  description: "Ideas de XIPA sobre diseño sistémico, circularidad y el valor de negocio detrás de rediseñar el plástico.",
};

const filtros = ["Todas", "Perspectivas", "Casos", "Noticias"] as const;

export default function Perspectivas() {
  return (
    <main>
      <PageHero
        image="/images/hero-diseno.jpg"
        alt="Perspectivas"
        eyebrow="Perspectivas"
        line1="Ideas para darle"
        line2="otra vuelta al plástico."
        subtitle="Lo que aprendimos investigando circularidad y diseño sistémico."
        scrollHref="#articulos"
      />

      <section id="articulos" className="max-w-[1280px] mx-auto px-6 md:px-16 pt-[140px] pb-[130px]">
        <Reveal as="span" className="block text-xs tracking-[0.24em] uppercase text-brand font-bold mb-4">
          Lecturas
        </Reveal>
        <Reveal as="h2" className="m-0 mb-10 text-fg tracking-[-0.03em] leading-[1.02] text-[clamp(32px,4.6vw,62px)] font-extrabold">
          Lo que estamos pensando.
        </Reveal>

        <div className="flex flex-wrap gap-2.5 mb-14">
          {filtros.map((f, i) => (
            <span
              key={f}
              className={
                i === 0
                  ? "rounded-full px-4 py-2 text-[13px] font-semibold bg-brand text-onimg"
                  : "rounded-full px-4 py-2 text-[13px] font-semibold border border-line5 text-muted"
              }
            >
              {f}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {perspectivas.map((a, i) => (
            <Reveal key={a.slug} delay={(i % 3) * 0.1}>
              <Link
                href={`/perspectivas/${a.slug}`}
                className="group flex h-full flex-col rounded-[18px] border border-line2 bg-bg1 p-7 no-underline transition-colors hover:border-line5"
              >
                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand">{a.category}</span>
                <h3 className="mt-4 text-fg font-extrabold text-[22px] leading-[1.18] tracking-[-0.01em]">{a.title}</h3>
                <p className="mt-3 flex-1 text-muted text-[15px] font-light leading-[1.55]">{a.excerpt}</p>
                <span className="mt-6 flex items-center justify-between">
                  <span className="text-muted text-[13px] font-medium">{a.date}</span>
                  <span className="text-fg text-[13px] font-semibold border-b border-brand pb-0.5 transition-transform group-hover:translate-x-0.5">
                    Leer →
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
