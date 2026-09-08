import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { getProjects } from "@/lib/content";

type Proj = { slug: string; title: string; subtitle?: string; tag?: string; meta?: { anio?: string; cliente?: string } };

const PERSPECTIVAS_TEASER = [
  { slug: "el-problema-es-la-mirada", title: "El problema no es el plástico, es la mirada" },
  { slug: "medir-para-mejorar", title: "Medir para mejorar: sin datos no hay circularidad" },
  { slug: "de-costo-a-valor", title: "De costo a valor: sustentabilidad que cierra en negocio" },
];

export default async function Home() {
  const projects = (await getProjects()) as Proj[];
  const destacados = projects.slice(0, 3);
  const img = (slug: string) => `/images/slots/pf-${slug}.webp`;

  return (
    <main>
      {/* Hero */}
      <section className="relative h-screen overflow-hidden bg-[#0d0d0c]">
        <Image src="/images/hero-circular.jpg" alt="" fill sizes="100vw" priority className="object-cover scale-[1.08]" />
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(110deg,rgba(0,0,0,0.72)_0%,rgba(0,0,0,0.35)_50%,rgba(0,0,0,0.1)_78%)]" />
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(0deg,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0)_40%)]" />
        <div className="absolute left-8 md:left-16 right-8 md:right-16 bottom-[16vh] max-w-[1000px]">
          <span className="block text-xs tracking-[0.28em] uppercase text-brand font-bold">Diseño sistémico</span>
          <h1 className="mt-[18px] text-white font-extrabold tracking-[-0.03em] leading-[0.98] text-[clamp(40px,6.4vw,104px)] [text-shadow:0_4px_50px_rgba(0,0,0,0.5)]">
            Re-evolucionamos el plástico para cuidar el planeta.
          </h1>
          <p className="mt-6 max-w-[640px] text-white/85 text-[clamp(17px,1.5vw,21px)] font-light leading-[1.55]">
            Somos una empresa de diseño sistémico. Co-creamos, materializamos y medimos, junto a nuestros clientes,
            soluciones reales para reducir el impacto negativo del plástico.
          </p>
          <Link
            href="/proyectos"
            className="mt-8 inline-block rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-white no-underline transition hover:opacity-90"
          >
            Ver proyectos →
          </Link>
        </div>
      </section>

      {/* Ticker de proyectos */}
      <div className="border-y border-line2 bg-bg1">
        <div className="max-w-[1600px] mx-auto flex gap-10 overflow-x-auto px-6 md:px-16 py-4 text-sm text-muted whitespace-nowrap [scrollbar-width:none]">
          {projects.map((p) => (
            <Link key={p.slug} href={`/proyectos/${p.slug}`} className="no-underline text-muted hover:text-fg transition-colors">
              <span className="text-brand font-bold">— </span>
              <span className="font-semibold text-fg">{p.title}:</span> {p.subtitle}
            </Link>
          ))}
        </div>
      </div>

      {/* Teaser · La oportunidad */}
      <section className="max-w-[1100px] mx-auto px-6 md:px-16 py-[120px]">
        <Reveal as="span" className="block text-xs tracking-[0.24em] uppercase text-brand font-bold">La oportunidad</Reveal>
        <Reveal as="h2" className="mt-4 text-fg tracking-[-0.03em] leading-[1.05] text-[clamp(30px,4.4vw,60px)] font-extrabold max-w-[900px]">
          El impacto ambiental no se negocia. El punto de partida es tu negocio.
        </Reveal>
        <Reveal>
          <p className="mt-6 max-w-[720px] text-muted text-[clamp(17px,1.5vw,21px)] font-light leading-[1.6]">
            Una solución se adopta cuando opera sobre las mismas variables que estructuran la decisión empresarial:
            eficiencia operativa, viabilidad económica, tracción comercial y posicionamiento de marca. Ahí es donde la
            sustentabilidad adquiere relevancia.
          </p>
        </Reveal>
        <Reveal>
          <Link href="/la-oportunidad" className="mt-7 inline-block text-brand font-semibold no-underline hover:opacity-80">Explorar →</Link>
        </Reveal>
      </section>

      {/* Proyectos destacados */}
      <section className="bg-bg2">
        <div className="max-w-[1280px] mx-auto px-6 md:px-16 py-[110px]">
          <Reveal as="span" className="block text-xs tracking-[0.24em] uppercase text-brand font-bold">Proyectos destacados</Reveal>
          <Reveal as="h2" className="mt-4 mb-12 text-fg tracking-[-0.03em] text-[clamp(30px,4vw,54px)] font-extrabold leading-none">
            Soluciones que ya están en el mercado.
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {destacados.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.06}>
                <Link href={`/proyectos/${p.slug}`} className="group block no-underline">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[20px] shadow-[0_24px_60px_rgba(0,0,0,0.18)]">
                    <Image src={img(p.slug)} alt={p.title} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_45%,rgba(0,0,0,0.6))]" />
                    <div className="absolute left-6 bottom-6 right-6">
                      <span className="block text-brand text-xs font-bold tracking-[0.18em]">{(p.tag || "").toUpperCase()}</span>
                      <span className="block text-white font-extrabold text-2xl tracking-[-0.02em] mt-1.5">{p.title}</span>
                      <span className="block text-white/75 font-light text-sm mt-1.5">{p.subtitle}</span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <Link href="/proyectos" className="mt-10 inline-block text-brand font-semibold no-underline hover:opacity-80">Ver todos los proyectos →</Link>
          </Reveal>
        </div>
      </section>

      {/* Teaser · Equipo */}
      <section className="max-w-[1100px] mx-auto px-6 md:px-16 py-[120px]">
        <Reveal as="span" className="block text-xs tracking-[0.24em] uppercase text-brand font-bold">Equipo</Reveal>
        <Reveal as="h2" className="mt-4 text-fg tracking-[-0.03em] leading-[1.08] text-[clamp(28px,3.8vw,52px)] font-extrabold max-w-[860px]">
          Treinta años trabajando el plástico. Más de veinte investigando cómo darle otra vuelta.
        </Reveal>
        <Reveal>
          <blockquote className="mt-9 border-l-2 border-brand pl-6 max-w-[720px]">
            <p className="text-fg text-[clamp(20px,2.2vw,30px)] font-light leading-[1.35] tracking-[-0.02em]">
              “Este es el momento de rediseñar el plástico: hoy tenemos la tecnología, el conocimiento y la urgencia para
              hacerlo parte de la solución.”
            </p>
            <footer className="mt-4 text-muted text-sm font-medium">Alejandro Romano Rusiñol · Co-fundador</footer>
          </blockquote>
        </Reveal>
        <Reveal>
          <Link href="/equipo" className="mt-8 inline-block text-brand font-semibold no-underline hover:opacity-80">Conocé al equipo →</Link>
        </Reveal>
      </section>

      {/* Teaser · Cómo trabajamos */}
      <section className="bg-bg2">
        <div className="max-w-[1280px] mx-auto px-6 md:px-16 py-[110px]">
          <Reveal as="span" className="block text-xs tracking-[0.24em] uppercase text-brand font-bold">Cómo trabajamos</Reveal>
          <Reveal as="h2" className="mt-4 text-fg tracking-[-0.03em] text-[clamp(30px,4vw,54px)] font-extrabold leading-[1.02] max-w-[820px]">
            El diseño no es solo diseño. Es diseño sistémico.
          </Reveal>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { v: "30 años", l: "en la industria del plástico" },
              { v: `${projects.length}`, l: "proyectos materializados" },
              { v: "Medido", l: "impacto ambiental en cada proyecto" },
            ].map((s, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div>
                  <div className="text-brand font-extrabold tracking-[-0.03em] text-[clamp(40px,5vw,72px)] leading-none">{s.v}</div>
                  <div className="mt-2 text-muted font-light">{s.l}</div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <Link href="/como-trabajamos" className="mt-10 inline-block text-brand font-semibold no-underline hover:opacity-80">Explorar →</Link>
          </Reveal>
        </div>
      </section>

      {/* Teaser · Perspectivas */}
      <section className="max-w-[1280px] mx-auto px-6 md:px-16 py-[120px]">
        <Reveal as="span" className="block text-xs tracking-[0.24em] uppercase text-brand font-bold">Perspectivas</Reveal>
        <Reveal as="h2" className="mt-4 mb-10 text-fg tracking-[-0.03em] text-[clamp(28px,3.6vw,50px)] font-extrabold leading-[1.05] max-w-[760px]">
          Lo que aprendimos investigando circularidad y diseño.
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {PERSPECTIVAS_TEASER.map((a, i) => (
            <Reveal key={a.slug} delay={i * 0.06}>
              <Link href={`/perspectivas/${a.slug}`} className="group block h-full rounded-[18px] border border-line2 bg-bg1 p-7 no-underline">
                <span className="text-fg font-semibold text-lg leading-snug tracking-[-0.01em] group-hover:text-brand transition-colors">{a.title}</span>
                <span className="mt-4 block text-brand text-sm font-semibold">Leer →</span>
              </Link>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <Link href="/perspectivas" className="mt-9 inline-block text-brand font-semibold no-underline hover:opacity-80">Ver todas →</Link>
        </Reveal>
      </section>

      {/* Cierre */}
      <section className="max-w-[1100px] mx-auto px-6 md:px-16 pb-[130px]">
        <div className="rounded-[32px] bg-brand px-8 md:px-20 py-20 text-center text-white">
          <Reveal as="h2" className="font-extrabold tracking-[-0.03em] text-[clamp(40px,6vw,96px)] leading-[0.98]">
            Dale otra vuelta.
          </Reveal>
          <Reveal>
            <p className="mx-auto mt-6 max-w-[640px] text-white/90 text-[clamp(17px,1.5vw,21px)] font-light leading-[1.55]">
              Tenés la oportunidad de hacer lo que estás pensando con mayor valor agregado, en el mismo tiempo y al mismo
              costo.
            </p>
          </Reveal>
          <Reveal>
            <Link href="/contacto" className="mt-9 inline-block rounded-full bg-white px-8 py-4 text-sm font-semibold text-brand no-underline transition hover:opacity-90">
              Contactanos →
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
