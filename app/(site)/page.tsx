import Link from "next/link";
import Reveal from "@/components/Reveal";
import ParallaxImage from "@/components/anim/ParallaxImage";
import AnimatedNumber from "@/components/anim/AnimatedNumber";
import { getProjects } from "@/lib/content";

type Proj = { slug: string; title: string; subtitle?: string; tag?: string; meta?: { anio?: string; cliente?: string } };

const PERSPECTIVAS_TEASER = [
  { slug: "el-problema-no-es-el-plastico", title: "El problema no es el plástico, es la mirada", cat: "Perspectiva" },
  { slug: "medir-para-mejorar", title: "Medir para mejorar: sin datos no hay circularidad", cat: "Perspectiva" },
  { slug: "de-costo-a-valor", title: "De costo a valor: sustentabilidad que cierra en negocio", cat: "Caso" },
];

export default async function Home() {
  const projects = (await getProjects()) as Proj[];
  const destacados = projects.slice(0, 3);
  const n = destacados.length;
  const img = (slug: string) => `/images/slots/pf-${slug}.webp`;

  return (
    <main>
      {/* ───────── Hero ───────── */}
      <section className="relative h-screen w-full overflow-hidden bg-[#0d0d0c]">
        <ParallaxImage src="/images/hero-circular.jpg" priority speed={0.14} />
        <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(0,0,0,0.74)_0%,rgba(0,0,0,0.34)_48%,rgba(0,0,0,0.08)_80%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0)_42%)]" />
        <div className="absolute left-6 md:left-12 lg:left-20 top-28 right-6 font-mono text-[11px] uppercase tracking-[0.34em] text-white/45 flex justify-between">
          <span>Diseño sistémico</span>
          <span className="hidden md:block">Est. Córdoba · AR</span>
        </div>
        <div className="absolute left-6 md:left-12 lg:left-20 right-6 bottom-[13vh] max-w-[1100px]">
          <h1 className="text-white font-extrabold tracking-[-0.035em] leading-[0.92] text-[clamp(46px,7.4vw,124px)] [text-shadow:0_4px_50px_rgba(0,0,0,0.5)]">
            Re-evolucionamos el plástico para cuidar el planeta.
          </h1>
          <p className="mt-7 max-w-[600px] text-white/85 text-[clamp(17px,1.4vw,21px)] font-light leading-[1.55]">
            Empresa de diseño sistémico. Co-creamos, materializamos y medimos soluciones reales para reducir el impacto
            negativo del plástico.
          </p>
          <Link href="/proyectos" className="mt-8 inline-block rounded-full bg-brand px-8 py-4 text-sm font-semibold text-white no-underline transition hover:opacity-90">
            Ver proyectos →
          </Link>
        </div>
        <div className="absolute left-1/2 bottom-8 -translate-x-1/2 flex flex-col items-center gap-2 text-brand">
          <span className="text-[10px] tracking-[0.3em] uppercase font-semibold">Scroll</span>
          <span className="text-2xl leading-none animate-[bounceArrow_1.8s_ease-in-out_infinite]">↓</span>
        </div>
      </section>

      {/* ───────── La oportunidad ───────── */}
      <section className="w-full bg-bg0 px-6 md:px-12 lg:px-20 py-[16vh]">
        <div className="mx-auto max-w-[1600px]">
          <Reveal as="span" className="block font-mono text-xs uppercase tracking-[0.3em] text-brand">01 — La oportunidad</Reveal>
          <Reveal as="h2" className="mt-8 max-w-[16ch] text-fg font-extrabold tracking-[-0.04em] leading-[0.95] text-[clamp(40px,7vw,120px)]">
            El impacto ambiental no se negocia. El punto de partida es tu negocio.
          </Reveal>
          <div className="mt-12 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <Reveal as="p" className="max-w-[54ch] text-muted text-[clamp(17px,1.5vw,22px)] font-light leading-[1.6]">
              Una solución se adopta cuando opera sobre las mismas variables que estructuran la decisión empresarial:
              eficiencia operativa, viabilidad económica, tracción comercial y posicionamiento de marca. Ahí es donde la
              sustentabilidad adquiere relevancia.
            </Reveal>
            <Reveal>
              <Link href="/la-oportunidad" className="whitespace-nowrap text-brand text-lg font-semibold no-underline hover:opacity-80">Explorar →</Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────── Proyectos — intro ───────── */}
      <section className="w-full bg-[#0d0d0c] px-6 md:px-12 lg:px-20 py-[14vh] text-white">
        <div className="mx-auto max-w-[1600px] flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="block font-mono text-xs uppercase tracking-[0.3em] text-brand">02 — Proyectos</span>
            <h2 className="mt-6 max-w-[14ch] font-extrabold tracking-[-0.04em] leading-[0.95] text-[clamp(38px,6vw,104px)]">
              Soluciones que ya están en el mercado.
            </h2>
          </div>
          <Link href="/proyectos" className="whitespace-nowrap text-brand text-lg font-semibold no-underline hover:opacity-80">Ver todos →</Link>
        </div>
      </section>

      {/* ───────── Proyectos — paneles a viewport completo ───────── */}
      {destacados.map((p, i) => {
        const left = i % 2 === 0;
        return (
          <section key={p.slug} className="relative h-screen w-full overflow-hidden bg-[#0d0d0c]">
            <ParallaxImage src={img(p.slug)} alt={p.title} sizes="100vw" speed={0.1} />
            <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,0.72)_0%,rgba(0,0,0,0.15)_45%,rgba(0,0,0,0.25)_100%)]" />
            <div
              className={`absolute bottom-[12vh] max-w-[760px] px-6 md:px-12 lg:px-20 ${left ? "left-0 text-left" : "right-0 text-left md:text-right"}`}
            >
              <span className="font-mono text-xs tracking-[0.24em] text-white/55">
                0{i + 1} / 0{n}
              </span>
              <h3 className={`mt-4 text-white font-extrabold tracking-[-0.03em] leading-[0.92] text-[clamp(46px,7vw,110px)] [text-shadow:0_4px_40px_rgba(0,0,0,0.5)] ${left ? "" : "md:ml-auto"}`}>
                {p.title}
              </h3>
              <span className="mt-4 block text-sm font-bold uppercase tracking-[0.18em] text-brand">
                {[p.tag, p.meta?.anio].filter(Boolean).join(" · ")}
              </span>
              <p className={`mt-4 max-w-[46ch] text-white/85 text-[clamp(17px,1.5vw,21px)] font-light leading-[1.55] ${left ? "" : "md:ml-auto"}`}>
                {p.subtitle}
              </p>
              <Link href={`/proyectos/${p.slug}`} className="mt-7 inline-block text-brand text-lg font-semibold no-underline hover:opacity-80">
                Ver proyecto →
              </Link>
            </div>
          </section>
        );
      })}

      {/* ───────── Equipo ───────── */}
      <section className="w-full bg-bg0 px-6 md:px-12 lg:px-20 py-[16vh]">
        <div className="mx-auto grid max-w-[1600px] items-center gap-14 md:grid-cols-[1.25fr_1fr]">
          <div>
            <Reveal as="span" className="block font-mono text-xs uppercase tracking-[0.3em] text-brand">03 — Equipo</Reveal>
            <Reveal as="h2" className="mt-8 max-w-[15ch] text-fg font-extrabold tracking-[-0.04em] leading-[0.96] text-[clamp(34px,5.2vw,84px)]">
              Treinta años trabajando el plástico. Más de veinte investigando cómo darle otra vuelta.
            </Reveal>
            <Reveal>
              <Link href="/equipo" className="mt-9 inline-block text-brand text-lg font-semibold no-underline hover:opacity-80">Conocé al equipo →</Link>
            </Reveal>
          </div>
          <Reveal>
            <figure>
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[24px]">
                <ParallaxImage src="/images/slots/team-alejandro.webp" alt="Alejandro Romano Rusiñol" sizes="(max-width:768px) 100vw, 40vw" speed={0.06} />
              </div>
              <figcaption className="mt-5 border-l-2 border-brand pl-5">
                <p className="text-fg text-lg font-light leading-[1.4] tracking-[-0.01em]">
                  “Este es el momento de rediseñar el plástico: hoy tenemos la tecnología, el conocimiento y la urgencia.”
                </p>
                <span className="mt-3 block text-muted text-sm font-medium">Alejandro Romano Rusiñol · Co-fundador</span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* ───────── Cómo trabajamos (cifras animadas) ───────── */}
      <section className="w-full bg-[#0d0d0c] px-6 md:px-12 lg:px-20 py-[16vh] text-white">
        <div className="mx-auto max-w-[1600px]">
          <Reveal as="span" className="block font-mono text-xs uppercase tracking-[0.3em] text-brand">04 — Cómo trabajamos</Reveal>
          <Reveal as="h2" className="mt-8 max-w-[16ch] font-extrabold tracking-[-0.04em] leading-[0.95] text-[clamp(40px,6.4vw,112px)]">
            El diseño no es solo diseño. Es diseño sistémico.
          </Reveal>
          <div className="mt-16 grid grid-cols-1 gap-10 border-t border-white/15 pt-12 sm:grid-cols-3">
            <div>
              <div className="text-brand font-extrabold tracking-[-0.03em] leading-[0.9] text-[clamp(44px,5.5vw,84px)]">
                <AnimatedNumber value={30} suffix=" años" />
              </div>
              <div className="mt-3 text-white/60 font-light">en la industria del plástico</div>
            </div>
            <div>
              <div className="text-brand font-extrabold tracking-[-0.03em] leading-[0.9] text-[clamp(44px,5.5vw,84px)]">
                <AnimatedNumber value={projects.length} />
              </div>
              <div className="mt-3 text-white/60 font-light">proyectos materializados</div>
            </div>
            <div>
              <div className="text-brand font-extrabold tracking-[-0.03em] leading-[0.9] text-[clamp(44px,5.5vw,84px)]">Medido</div>
              <div className="mt-3 text-white/60 font-light">impacto ambiental en cada proyecto</div>
            </div>
          </div>
          <Reveal>
            <Link href="/como-trabajamos" className="mt-14 inline-block text-brand text-lg font-semibold no-underline hover:opacity-80">Explorar →</Link>
          </Reveal>
        </div>
      </section>

      {/* ───────── Perspectivas ───────── */}
      <section className="w-full bg-bg0 px-6 md:px-12 lg:px-20 py-[16vh]">
        <div className="mx-auto max-w-[1600px]">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="block font-mono text-xs uppercase tracking-[0.3em] text-brand">05 — Perspectivas</span>
              <h2 className="mt-6 max-w-[16ch] text-fg font-extrabold tracking-[-0.04em] leading-[0.98] text-[clamp(32px,4.6vw,68px)]">
                Lo que aprendimos investigando circularidad y diseño.
              </h2>
            </div>
            <Link href="/perspectivas" className="whitespace-nowrap text-brand text-lg font-semibold no-underline hover:opacity-80">Ver todas →</Link>
          </div>
          <ul className="mt-14 border-t border-line2">
            {PERSPECTIVAS_TEASER.map((a) => (
              <li key={a.slug}>
                <Link href={`/perspectivas/${a.slug}`} className="group flex items-center justify-between gap-6 border-b border-line2 py-8 no-underline">
                  <div className="flex items-baseline gap-6">
                    <span className="hidden shrink-0 font-mono text-xs uppercase tracking-[0.2em] text-brand sm:block">{a.cat}</span>
                    <span className="text-fg font-semibold tracking-[-0.02em] text-[clamp(22px,3vw,44px)] leading-[1.05] transition-colors group-hover:text-brand">
                      {a.title}
                    </span>
                  </div>
                  <span className="shrink-0 text-brand text-2xl transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────── Cierre ───────── */}
      <section className="flex min-h-screen w-full flex-col items-center justify-center bg-brand px-6 text-center text-white">
        <Reveal as="h2" className="font-extrabold tracking-[-0.04em] leading-[0.9] text-[clamp(56px,10vw,180px)]">Dale otra vuelta.</Reveal>
        <Reveal>
          <p className="mx-auto mt-8 max-w-[640px] text-white/90 text-[clamp(18px,1.7vw,24px)] font-light leading-[1.5]">
            Tenés la oportunidad de hacer lo que estás pensando con mayor valor agregado, en el mismo tiempo y al mismo costo.
          </p>
        </Reveal>
        <Reveal>
          <Link href="/contacto" className="mt-10 inline-block rounded-full bg-white px-9 py-4 text-sm font-semibold text-brand no-underline transition hover:opacity-90">
            Contactanos →
          </Link>
        </Reveal>
      </section>
    </main>
  );
}
