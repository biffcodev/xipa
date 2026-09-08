import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import SmartImage from "@/components/SmartImage";
import { hasImg, type Img } from "@/lib/img";
import { getProject, getProjectSlugs } from "@/lib/content";
import { adjacent } from "@/lib/projects";

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = await getProject(slug);
  if (!p) return {};
  return { title: `${p.title} — Proyectos`, description: `${p.title}: ${p.subtitle ?? ""}` };
}

const eyebrow = "block text-xs tracking-[0.22em] uppercase text-brand font-bold";
const heading = "text-fg font-extrabold text-[clamp(30px,4.4vw,56px)] tracking-[-0.03em] leading-[0.95]";

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const { prev, next } = adjacent(slug);

  const heroImage = (project as { heroImage?: Img }).heroImage;
  const featuredImage = (project as { featuredImage?: Img }).featuredImage;
  const gallery = (project as { gallery?: Img[] }).gallery ?? [];
  const processImg: Img = featuredImage ?? gallery[0];
  const showProcessImg = hasImg(processImg);

  const sector = project.tag || "Diseño";
  const cliente = project.meta?.cliente || "el cliente";
  const anio = project.meta?.anio || "";
  const rol = project.meta?.rol || "Diseño sistémico";
  const metaBottom = [cliente, anio, rol].filter(Boolean).join(" · ");

  return (
    <main>
      {/* 1 — HERO */}
      <section className="relative h-screen overflow-hidden bg-bg1">
        <div className="absolute inset-0">
          <SmartImage img={heroImage} alt={project.title} priority sizes="100vw" />
        </div>
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(110deg,rgba(0,0,0,0.72)_0%,rgba(0,0,0,0.34)_46%,rgba(0,0,0,0.04)_74%)]" />
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(0deg,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0)_38%)]" />
        <div className="absolute left-8 md:left-16 right-8 md:right-16 bottom-[15vh] max-w-[960px] animate-[heroIn_1s_cubic-bezier(.2,.7,.2,1)_.15s_both]">
          <Link
            href="/proyectos"
            className="inline-block text-white/75 text-[13px] font-semibold tracking-[0.14em] uppercase no-underline mb-[18px]"
          >
            ← Proyectos
          </Link>
          <span className="block text-brand text-[13px] font-bold tracking-[0.2em]">
            {sector} → Diseño sistémico
          </span>
          <h1 className="mt-3.5 text-white font-extrabold text-[clamp(52px,9vw,120px)] leading-[0.9] tracking-[-0.03em] [text-shadow:0_4px_50px_rgba(0,0,0,0.5)]">
            {project.title}
          </h1>
          <span className="mt-4 block text-white/70 text-sm font-medium tracking-[0.02em]">{metaBottom}</span>
          <p className="mt-[22px] max-w-[600px] text-white/[0.88] text-[clamp(17px,1.6vw,22px)] font-light leading-[1.5] [text-shadow:0_2px_20px_rgba(0,0,0,0.5)]">
            {project.subtitle}
          </p>
        </div>
        <a
          href="#desafio"
          aria-label="Ver más"
          className="absolute left-1/2 bottom-10 -translate-x-1/2 flex flex-col items-center gap-2.5 text-brand no-underline"
        >
          <span className="text-[11px] tracking-[0.24em] uppercase font-semibold">Scroll</span>
          <span className="text-[26px] leading-none animate-[bounceArrow_1.8s_ease-in-out_infinite]">↓</span>
        </a>
      </section>

      {/* 2 — EL DESAFÍO */}
      <section id="desafio" className="max-w-[1100px] mx-auto px-6 md:px-16 pt-[110px] pb-[80px]">
        <Reveal>
          <span className={eyebrow}>El desafío</span>
          <p className="mt-6 max-w-[860px] text-fg font-light text-[clamp(24px,3.2vw,42px)] leading-[1.25] tracking-[-0.01em]">
            {project.desafio}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <figure className="mt-14 max-w-[760px] border-l-2 border-brand pl-6 md:pl-9">
            <blockquote className="text-fg font-light text-[clamp(22px,2.8vw,34px)] leading-[1.3] tracking-[-0.01em]">
              “Trabajar con XIPA nos permitió resolver el diseño sin resignar negocio.”
            </blockquote>
            <figcaption className="mt-5 text-muted text-sm font-medium">
              <span className="text-fg font-semibold">{cliente}</span> · Dirección de producto
              <span className="mt-1 block text-muted text-[11px] tracking-[0.14em] uppercase">Cita de referencia</span>
            </figcaption>
          </figure>
        </Reveal>
      </section>

      {/* 3 — ¿CÓMO LO RESOLVIMOS? */}
      <section className="w-full bg-bg2 border-y border-line">
        <div className="max-w-[1280px] mx-auto px-6 md:px-16 py-[100px]">
          <Reveal>
            <span className={eyebrow}>El proceso</span>
          </Reveal>
          <Reveal as="h2" className={`mt-3.5 ${heading}`}>
            ¿Cómo lo resolvimos?
          </Reveal>
          <div className={`mt-12 grid items-start gap-10 md:gap-16 ${showProcessImg ? "md:grid-cols-2" : "grid-cols-1"}`}>
            <div className="flex flex-col">
              {(project.proceso || []).map((s, i) => (
                <Reveal key={i} className="flex gap-5 border-t border-line py-6">
                  <span className="w-8 shrink-0 pt-1 text-brand font-extrabold text-[15px] tracking-[0.1em]">{s.n}</span>
                  <div>
                    <h3 className="text-fg font-bold text-[19px] tracking-[-0.01em]">{s.title}</h3>
                    <p className="mt-1.5 text-muted text-[15px] font-light leading-[1.6]">{s.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            {showProcessImg && (
              <Reveal delay={0.1} className="md:sticky md:top-[110px]">
                <div className="relative aspect-[4/5] rounded-[20px] overflow-hidden shadow-[0_24px_56px_rgba(0,0,0,0.18)]">
                  <SmartImage img={processImg} alt={`${project.title} — proceso`} sizes="(max-width:768px) 100vw, 50vw" />
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {/* 4 — ¿QUÉ CAMBIÓ? */}
      <section className="max-w-[1100px] mx-auto px-6 md:px-16 py-[100px]">
        <Reveal>
          <span className={eyebrow}>Qué cambió</span>
        </Reveal>
        <Reveal as="h2" className={`mt-3.5 ${heading}`}>
          ¿Qué cambió?
        </Reveal>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
          <Reveal>
            <h3 className="text-fg font-extrabold text-[22px] tracking-[-0.01em]">El producto</h3>
            <p className="mt-4 text-muted text-[16px] font-light leading-[1.7]">{project.solucion}</p>
            <div className="mt-7">
              {(project.ficha || []).map((r, i) => (
                <div key={i} className="flex justify-between gap-5 border-t border-line py-3.5">
                  <span className="text-muted text-xs font-medium tracking-[0.04em] uppercase">{r.k}</span>
                  <span className="text-fg text-sm font-semibold text-right">{r.v}</span>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h3 className="text-fg font-extrabold text-[22px] tracking-[-0.01em]">El sistema</h3>
            <p className="mt-4 text-muted text-[16px] font-light leading-[1.7]">
              La solución no termina en el objeto: se integra a la logística de distribución y retorno, se adapta a los
              hábitos de consumo del público y se comunica con claridad en cada punto de contacto. Así el diseño escala
              más allá del producto y sostiene el resultado en el tiempo.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 5 — LOS RESULTADOS */}
      <section className="w-full bg-brand">
        <div className="max-w-[1280px] mx-auto px-6 md:px-16 py-[100px]">
          <Reveal>
            <span className="block text-xs tracking-[0.22em] uppercase text-white font-bold opacity-80">Los resultados</span>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {(project.impacto || []).map((s, i) => (
              <Reveal key={i} delay={i * 0.08} className="border-t border-white/30 pt-6">
                <span className="block font-extrabold text-[clamp(44px,5.5vw,80px)] text-white tracking-[-0.03em] leading-[0.9]">
                  {s.stat}
                </span>
                <p className="mt-4 text-white/85 text-[15px] font-light leading-[1.5]">{s.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6 — CÓMO TRABAJAMOS JUNTOS */}
      <section className="max-w-[1100px] mx-auto px-6 md:px-16 py-[100px]">
        <Reveal>
          <span className={eyebrow}>El proceso de trabajo</span>
        </Reveal>
        <Reveal as="h2" className={`mt-3.5 ${heading}`}>
          Cómo trabajamos juntos
        </Reveal>
        <Reveal>
          <p className="mt-8 max-w-[820px] text-muted text-[clamp(17px,2vw,22px)] font-light leading-[1.65]">
            Desde XIPA lideramos el diseño y la estrategia del proyecto ({rol}), coordinando cada etapa de punta a punta.
            {" "}
            {cliente} aportó el conocimiento de su negocio, sus tiempos y sus restricciones reales de producción. Y sumamos
            una red de aliados —proveedores, especialistas y fabricantes— que se integró según lo que cada etapa necesitaba.
          </p>
        </Reveal>
      </section>

      {/* 7 — RECONOCIMIENTOS · QUÉ SIGUE */}
      <section className="w-full bg-bg2 border-y border-line">
        <div className="max-w-[1100px] mx-auto px-6 md:px-16 py-[90px] grid grid-cols-1 md:grid-cols-2 gap-12">
          <Reveal>
            <span className={eyebrow}>Reconocimientos</span>
            <p className="mt-5 max-w-[420px] text-muted text-[16px] font-light leading-[1.7]">
              El proyecto fue destacado en instancias de diseño e innovación sustentable y quedó como caso de referencia
              para nuevos desarrollos del sector. (Contenido de referencia.)
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <span className={eyebrow}>Qué sigue</span>
            <p className="mt-5 max-w-[420px] text-muted text-[16px] font-light leading-[1.7]">
              La próxima etapa apunta a escalar la solución a nuevos contextos y a medir su impacto con datos en el tiempo,
              ajustando el sistema a partir de lo aprendido.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 8 — PROYECTOS RELACIONADOS */}
      <section className="max-w-[1280px] mx-auto px-6 md:px-16 py-[100px]">
        <Reveal>
          <span className={eyebrow}>Proyectos relacionados</span>
        </Reveal>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href={`/proyectos/${prev.slug}`}
            className="flex flex-col gap-2 p-8 border border-line rounded-[18px] no-underline transition-colors hover:bg-surface"
          >
            <span className="text-muted text-xs tracking-[0.16em] uppercase font-semibold">← Anterior</span>
            <span className="text-fg font-extrabold text-[26px] tracking-[-0.02em]">{prev.title}</span>
            <span className="text-muted text-sm font-light">{prev.subtitle}</span>
          </Link>
          <Link
            href={`/proyectos/${next.slug}`}
            className="flex flex-col gap-2 p-8 border border-line rounded-[18px] no-underline md:text-right transition-colors hover:bg-surface"
          >
            <span className="text-muted text-xs tracking-[0.16em] uppercase font-semibold">Siguiente →</span>
            <span className="text-fg font-extrabold text-[26px] tracking-[-0.02em]">{next.title}</span>
            <span className="text-muted text-sm font-light">{next.subtitle}</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
