import Link from "next/link";
import { getByType } from "@/lib/admin/store";
import { urlFor } from "@/sanity/lib/image";
import { PROJECTS } from "@/lib/projects";

export const dynamic = "force-dynamic";

type ProjectDoc = {
  _id: string;
  title?: string;
  tag?: string;
  slug?: { current?: string };
  order?: number;
  heroImage?: unknown;
};

function prev(img: unknown): string | null {
  if (!img) return null;
  if (typeof img === "string") return img;
  try {
    return urlFor(img as never).width(480).height(300).fit("crop").url();
  } catch {
    return null;
  }
}

export default async function Page() {
  const docs = await getByType<ProjectDoc>("project");
  // Fall back to the known project list if Sanity is unreachable.
  const items =
    docs.length > 0
      ? docs.map((d) => ({ slug: d.slug?.current || d._id.replace("project-", ""), title: d.title, tag: d.tag, img: prev(d.heroImage) }))
      : PROJECTS.map((p) => ({ slug: p.slug, title: p.title, tag: p.tag, img: null }));

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight text-fg">Proyectos</h1>
      <p className="mt-1 text-sm text-muted">Elegí un proyecto para editar sus textos, imágenes y ficha.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {items.map((p) => (
          <Link
            key={p.slug}
            href={`/admin/proyectos/${p.slug}`}
            className="group flex gap-4 overflow-hidden rounded-xl border border-line2 bg-bg1 p-3 transition hover:border-brand"
          >
            <div className="grid h-20 w-28 shrink-0 place-items-center overflow-hidden rounded-lg bg-bg2">
              {p.img ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.img} alt="" className="h-full w-full object-cover" />
              ) : (
                <span className="text-[11px] text-muted">Sin imagen</span>
              )}
            </div>
            <div className="min-w-0 self-center">
              {p.tag && <div className="text-xs uppercase tracking-wide text-brand">{p.tag}</div>}
              <div className="font-semibold text-fg">{p.title}</div>
              <div className="mt-0.5 text-xs text-muted transition group-hover:text-fg">Editar →</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
