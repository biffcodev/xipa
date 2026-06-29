import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";

export function prevUrl(img: unknown): string | null {
  if (!img) return null;
  if (typeof img === "string") return img;
  try {
    return urlFor(img as never).width(240).height(160).fit("crop").url();
  } catch {
    return null;
  }
}

export type ListItem = { href: string; title: string; sub?: string; img?: string | null };

export default function CollectionList({
  title,
  intro,
  items,
}: {
  title: string;
  intro?: string;
  items: ListItem[];
}) {
  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight text-fg">{title}</h1>
      {intro && <p className="mt-1 text-sm text-muted">{intro}</p>}
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {items.map((it) => (
          <Link
            key={it.href}
            href={it.href}
            className="group flex items-center gap-3 rounded-xl border border-line2 bg-bg1 p-3 transition hover:border-brand"
          >
            <div className="grid h-16 w-20 shrink-0 place-items-center overflow-hidden rounded-lg bg-bg2">
              {it.img ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={it.img} alt="" className="h-full w-full object-cover" />
              ) : (
                <span className="text-[10px] text-muted">—</span>
              )}
            </div>
            <div className="min-w-0">
              <div className="truncate font-semibold text-fg">{it.title}</div>
              {it.sub && <div className="truncate text-xs text-muted">{it.sub}</div>}
              <div className="mt-0.5 text-xs text-muted transition group-hover:text-brand">Editar →</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
