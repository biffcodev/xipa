"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function NewPageForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const slug = slugify(name);

  return (
    <div className="rounded-xl border border-line2 bg-bg1 p-5">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">Crear una página nueva</h2>
      <form
        className="mt-3 flex flex-wrap items-end gap-3"
        onSubmit={(e) => {
          e.preventDefault();
          if (slug) router.push(`/admin/editor/${slug}`);
        }}
      >
        <label className="min-w-0 flex-1">
          <span className="mb-1.5 block text-sm font-medium text-fg">Nombre de la página</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ej: Servicios"
            className="w-full rounded-lg border border-line2 bg-bg0 px-3 py-2 text-sm text-fg outline-none focus:border-brand"
          />
          {slug && <span className="mt-1 block text-xs text-muted">Dirección: /p/{slug}</span>}
        </label>
        <button
          type="submit"
          disabled={!slug}
          className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
        >
          Crear y editar →
        </button>
      </form>
    </div>
  );
}
