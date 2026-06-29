import Link from "next/link";
import { listVisualPages } from "@/lib/admin/store";
import NewPageForm from "@/components/admin/NewPageForm";

export const dynamic = "force-dynamic";

export default async function Page() {
  const pages = await listVisualPages();
  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight text-fg">Páginas visuales</h1>
      <p className="mt-1 max-w-2xl text-sm text-muted">
        Páginas que armás vos con el editor visual (arrastrando bloques). Creá una nueva o editá una existente.
      </p>

      <div className="mt-6">
        <NewPageForm />
      </div>

      <h2 className="mt-8 mb-3 text-sm font-semibold uppercase tracking-wide text-muted">Tus páginas</h2>
      {pages.length === 0 ? (
        <p className="rounded-xl border border-dashed border-line2 bg-bg1 p-6 text-sm text-muted">
          Todavía no creaste ninguna página. Usá el formulario de arriba para empezar.
        </p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {pages.map((p) => (
            <div key={p.slug} className="flex items-center justify-between rounded-xl border border-line2 bg-bg1 p-4">
              <div className="min-w-0">
                <div className="truncate font-semibold text-fg">{p.title}</div>
                <div className="truncate text-xs text-muted">/p/{p.slug}</div>
              </div>
              <div className="flex shrink-0 gap-2">
                <Link href={`/p/${p.slug}`} target="_blank" className="rounded-lg border border-line2 px-3 py-1.5 text-sm text-fg transition hover:bg-surface">
                  Ver
                </Link>
                <Link href={`/admin/editor/${p.slug}`} className="rounded-lg bg-brand px-3 py-1.5 text-sm font-semibold text-white transition hover:opacity-90">
                  Editar
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
