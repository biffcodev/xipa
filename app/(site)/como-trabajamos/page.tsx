import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Cómo trabajamos",
  description:
    "Integramos diseño y estrategia para que la sustentabilidad entre a tu negocio de forma orgánica: exploración, ideación, definición, diseño, materialización y medición.",
};

const STEPS = [
  { n: "01", title: "Exploración", text: "Entendemos el negocio, el producto y el sistema donde vive." },
  { n: "02", title: "Ideación", text: "Abrimos posibilidades sumando miradas y disciplinas." },
  { n: "03", title: "Definición", text: "Elegimos el camino que cierra en función, costo e impacto." },
  { n: "04", title: "Diseño", text: "Materializamos la solución con criterio industrial." },
  { n: "05", title: "Materialización", text: "Prototipo, matricería y producción con material trazable." },
  { n: "06", title: "Medición", text: "Datos de impacto para mejorar de forma continua." },
];

const RESUELVE = [
  "Resolvemos diseño industrial.",
  "Logramos y mejoramos desempeño funcional.",
  "Reducimos impacto ambiental, medido.",
  "Creamos historias para inspirar a otros.",
];

const HERRAMIENTAS = [
  "Ecodiseño",
  "Estrategias de circularidad",
  "Análisis de ciclo de vida",
  "Triple impacto",
  "Design Thinking",
  "Normativas de calidad",
];

const RECONOCIMIENTOS = [
  { title: "Empresa B certificada", text: "Certificación que acredita estándares de impacto social y ambiental." },
  { title: "Sello del Buen Diseño", text: "Distinción a proyectos por su calidad de diseño y aporte de valor." },
];

export default function ComoTrabajamos() {
  return (
    <main>
      <PageHero
        image="/images/hero-diseno.jpg"
        alt="Cómo trabajamos"
        eyebrow="Cómo trabajamos"
        line1="Integramos diseño y estrategia"
        line2="para tu negocio."
        subtitle="Fusionamos metodologías tradicionales, ágiles e innovadoras con las estrategias de la economía circular, las normativas de calidad y el análisis de ciclo de vida de cada producto que diseñamos."
        scrollHref="#proceso"
      />

      {/* El proceso */}
      <section id="proceso" className="max-w-[1280px] mx-auto px-6 md:px-16 pt-[130px] pb-16">
        <Reveal as="span" className="block text-xs tracking-[0.24em] uppercase text-brand font-bold">
          El proceso
        </Reveal>
        <Reveal as="h2" className="mt-4 mb-12 text-fg tracking-[-0.03em] leading-[1.02] text-[clamp(32px,4.6vw,62px)] font-extrabold">
          Seis etapas, un método flexible.
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.05}>
              <div className="h-full rounded-[20px] border border-line2 bg-bg1 p-7">
                <span className="block text-brand text-sm font-bold tracking-[0.16em]">{s.n}</span>
                <h3 className="mt-3 text-fg font-extrabold text-2xl tracking-[-0.02em]">{s.title}</h3>
                <p className="mt-2.5 text-muted font-light leading-[1.55]">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="mt-10 max-w-[720px] text-muted text-lg font-light leading-[1.6]">
            Adaptamos las herramientas de cada etapa a nuestros saberes y a las necesidades de cada cliente. El método es
            flexible: <span className="text-fg font-medium">nos armamos y desarmamos en función del proyecto</span>, sumando
            alianzas, profesionales y herramientas según lo que cada desafío pide.
          </p>
        </Reveal>
      </section>

      {/* Qué resolvemos */}
      <section className="bg-bg2">
        <div className="max-w-[1280px] mx-auto px-6 md:px-16 py-[110px]">
          <Reveal as="span" className="block text-xs tracking-[0.24em] uppercase text-brand font-bold">
            Qué resolvemos
          </Reveal>
          <ul className="mt-8 space-y-5 max-w-[860px]">
            {RESUELVE.map((r, i) => (
              <li key={i}>
                <Reveal delay={i * 0.05}>
                  <span className="flex items-start gap-4 text-fg tracking-[-0.02em] text-[clamp(24px,3vw,40px)] font-light leading-[1.15]">
                    <span className="mt-3 h-2 w-2 shrink-0 rounded-full bg-brand" />
                    <span>{r}</span>
                  </span>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Con qué trabajamos */}
      <section className="max-w-[1280px] mx-auto px-6 md:px-16 py-[110px]">
        <Reveal as="span" className="block text-xs tracking-[0.24em] uppercase text-brand font-bold">
          Con qué trabajamos
        </Reveal>
        <div className="mt-7 flex flex-wrap gap-3">
          {HERRAMIENTAS.map((h) => (
            <span key={h} className="rounded-full border border-line5 px-5 py-2.5 text-fg text-base font-light">
              {h}
            </span>
          ))}
        </div>
      </section>

      {/* Reconocimientos */}
      <section className="max-w-[1280px] mx-auto px-6 md:px-16 pb-[110px]">
        <Reveal as="span" className="block text-xs tracking-[0.24em] uppercase text-brand font-bold">
          Reconocimientos
        </Reveal>
        <div className="mt-7 grid grid-cols-1 md:grid-cols-2 gap-5">
          {RECONOCIMIENTOS.map((r) => (
            <Reveal key={r.title}>
              <div className="rounded-[20px] border border-line2 bg-bg1 p-8">
                <h3 className="text-fg font-extrabold text-2xl tracking-[-0.02em]">{r.title}</h3>
                <p className="mt-2.5 text-muted font-light leading-[1.55]">{r.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-[1100px] mx-auto px-6 md:px-16 pb-[130px]">
        <div className="rounded-[28px] bg-brand px-8 md:px-16 py-16 text-center text-white">
          <Reveal as="h2" className="font-extrabold tracking-[-0.03em] text-[clamp(30px,4vw,56px)] leading-[1.02]">
            Así se ve en la práctica.
          </Reveal>
          <Reveal>
            <Link
              href="/proyectos"
              className="mt-8 inline-block rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-brand no-underline transition hover:opacity-90"
            >
              Ver proyectos →
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
