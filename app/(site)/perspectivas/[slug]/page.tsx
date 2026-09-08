import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import { getPerspectiva, getPerspectivaSlugs } from "@/lib/perspectivas";

export function generateStaticParams() {
  return getPerspectivaSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = getPerspectiva(slug);
  if (!a) return {};
  return { title: `${a.title} — Perspectivas`, description: a.excerpt };
}

export default async function PerspectivaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = getPerspectiva(slug);
  if (!a) notFound();

  return (
    <main className="bg-bg0">
      <article className="max-w-[760px] mx-auto px-6 md:px-8 pt-[160px] pb-[130px]">
        <Link href="/perspectivas" className="text-muted text-[14px] font-semibold no-underline hover:text-fg">
          ← Perspectivas
        </Link>

        <Reveal className="mt-12">
          <span className="block text-[11px] font-bold uppercase tracking-[0.16em] text-brand">{a.category}</span>
          <h1 className="mt-4 text-fg tracking-[-0.03em] leading-[1.05] text-[clamp(34px,5vw,64px)] font-extrabold">
            {a.title}
          </h1>
          <p className="mt-5 text-muted text-[14px] font-medium">{a.date}</p>
        </Reveal>

        <div className="mt-12 border-t border-line2 pt-12">
          {a.body.map((p, i) => (
            <p key={i} className="mb-7 text-fg/90 text-[18px] font-light leading-[1.7]">
              {p}
            </p>
          ))}
        </div>

        <div className="mt-14 border-t border-line2 pt-10">
          <Link href="/perspectivas" className="text-fg text-[14px] font-semibold no-underline border-b border-brand pb-0.5">
            Volver a Perspectivas
          </Link>
        </div>
      </article>
    </main>
  );
}
