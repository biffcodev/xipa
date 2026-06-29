"use client";
import { useState } from "react";
import Link from "next/link";
import { Field, Input, Textarea, ImageInput, Button } from "./fields";

/* ── A schema-driven document editor. Sections describe the fields; the editor
   renders them, tracks state, and saves the whole document to Sanity via
   /api/admin/save. Used by every admin section so the UI stays consistent. ── */

export type Leaf =
  | { name: string; label: string; type: "text" | "textarea" | "url" | "number"; help?: string; placeholder?: string }
  | { name: string; label: string; type: "image"; help?: string };

export type Block =
  | Leaf
  | { type: "group"; label?: string; fields: Leaf[] }
  | { type: "stringList"; name: string; label: string; help?: string }
  | { type: "imageList"; name: string; label: string; help?: string }
  | {
      type: "array";
      name: string;
      label: string;
      help?: string;
      itemTitle?: string;
      itemFields: Leaf[];
    };

type Doc = Record<string, unknown> & { _id: string; _type: string };

function get(obj: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((o, k) => (o == null ? undefined : (o as Record<string, unknown>)[k]), obj);
}
function setIn(obj: Doc, path: string, val: unknown): Doc {
  const keys = path.split(".");
  const root: Record<string, unknown> = { ...obj };
  let cur = root;
  for (let i = 0; i < keys.length - 1; i++) {
    const k = keys[i];
    const child = cur[k];
    cur[k] = Array.isArray(child) ? [...child] : { ...((child as object) || {}) };
    cur = cur[k] as Record<string, unknown>;
  }
  cur[keys[keys.length - 1]] = val;
  return root as Doc;
}
function emptyItem(fields: Leaf[]): Record<string, unknown> {
  const o: Record<string, unknown> = {};
  for (const f of fields) o[f.name] = f.type === "image" ? null : "";
  return o;
}

export default function DocEditor({
  doc: initial,
  title,
  intro,
  blocks,
  viewHref,
}: {
  doc: Doc;
  title: string;
  intro?: string;
  blocks: Block[];
  viewHref?: string;
}) {
  const [doc, setDoc] = useState<Doc>(initial);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const upd = (path: string, val: unknown) => {
    setDoc((d) => setIn(d, path, val));
    setStatus("idle");
  };

  async function save() {
    setStatus("saving");
    setError(null);
    try {
      const res = await fetch("/api/admin/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(doc),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "No se pudo guardar");
      setStatus("saved");
    } catch (e) {
      setStatus("error");
      setError(e instanceof Error ? e.message : "No se pudo guardar");
    }
  }

  return (
    <div className="pb-28">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight text-fg">{title}</h1>
        {intro && <p className="mt-1 max-w-2xl text-sm text-muted">{intro}</p>}
      </div>

      <div className="grid gap-5">
        {blocks.map((block, i) => (
          <Block key={i} block={block} doc={doc} upd={upd} />
        ))}
      </div>

      {/* Sticky save bar */}
      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-line2 bg-bg1/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-3">
          <div className="text-sm">
            {status === "saving" && <span className="text-muted">Guardando…</span>}
            {status === "saved" && <span className="font-medium text-brand">✓ Guardado. Se ve en el sitio en ~1 min.</span>}
            {status === "error" && <span className="text-brand">{error}</span>}
          </div>
          <div className="flex items-center gap-3">
            {viewHref && (
              <Link href={viewHref} target="_blank" className="text-sm text-muted underline-offset-2 hover:underline">
                Ver en el sitio ↗
              </Link>
            )}
            <Button onClick={save} disabled={status === "saving"}>
              {status === "saving" ? "Guardando…" : "Guardar cambios"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Card({ label, children }: { label?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-line2 bg-bg1 p-5">
      {label && <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted">{label}</h2>}
      <div className="grid gap-4">{children}</div>
    </section>
  );
}

function LeafField({ field, doc, upd }: { field: Leaf; doc: Doc; upd: (p: string, v: unknown) => void }) {
  const value = get(doc, field.name);
  if (field.type === "image") {
    return (
      <Field label={field.label} help={field.help}>
        <ImageInput value={value} onChange={(v) => upd(field.name, v)} />
      </Field>
    );
  }
  if (field.type === "textarea") {
    return (
      <Field label={field.label} help={field.help}>
        <Textarea value={(value as string) ?? ""} onChange={(e) => upd(field.name, e.target.value)} placeholder={field.placeholder} />
      </Field>
    );
  }
  if (field.type === "number") {
    return (
      <Field label={field.label} help={field.help}>
        <Input
          type="number"
          value={value === 0 || value ? String(value) : ""}
          onChange={(e) => upd(field.name, e.target.value === "" ? null : Number(e.target.value))}
          placeholder={field.placeholder}
        />
      </Field>
    );
  }
  return (
    <Field label={field.label} help={field.help}>
      <Input
        type={field.type === "url" ? "url" : "text"}
        value={(value as string) ?? ""}
        onChange={(e) => upd(field.name, e.target.value)}
        placeholder={field.placeholder}
      />
    </Field>
  );
}

function Block({ block, doc, upd }: { block: Block; doc: Doc; upd: (p: string, v: unknown) => void }) {
  if (block.type === "group") {
    return (
      <Card label={block.label}>
        {block.fields.map((f, i) => (
          <LeafField key={i} field={f} doc={doc} upd={upd} />
        ))}
      </Card>
    );
  }
  if (block.type === "stringList") {
    const arr = (get(doc, block.name) as string[]) ?? [];
    return (
      <Card label={block.label}>
        {block.help && <p className="-mt-2 text-xs text-muted">{block.help}</p>}
        {arr.map((v, i) => (
          <div key={i} className="flex gap-2">
            <Input
              value={v}
              onChange={(e) => {
                const next = [...arr];
                next[i] = e.target.value;
                upd(block.name, next);
              }}
            />
            <Button variant="ghost" onClick={() => upd(block.name, arr.filter((_, j) => j !== i))}>
              ✕
            </Button>
          </div>
        ))}
        <div>
          <Button variant="ghost" onClick={() => upd(block.name, [...arr, ""])}>
            + Agregar
          </Button>
        </div>
      </Card>
    );
  }
  if (block.type === "imageList") {
    const arr = (get(doc, block.name) as unknown[]) ?? [];
    const setArr = (next: unknown[]) => upd(block.name, next);
    return (
      <Card label={block.label}>
        {block.help && <p className="-mt-2 text-xs text-muted">{block.help}</p>}
        <div className="grid gap-4">
          {arr.map((item, i) => (
            <div key={i} className="flex items-center gap-3 rounded-lg border border-line3 bg-bg0 p-3">
              <div className="flex-1">
                <ImageInput value={item} onChange={(v) => setArr(arr.map((it, j) => (j === i ? v : it)))} />
              </div>
              <div className="flex flex-col gap-1">
                <IconBtn label="↑" disabled={i === 0} onClick={() => setArr(move(arr, i, i - 1))} />
                <IconBtn label="↓" disabled={i === arr.length - 1} onClick={() => setArr(move(arr, i, i + 1))} />
                <IconBtn label="✕" onClick={() => setArr(arr.filter((_, j) => j !== i))} />
              </div>
            </div>
          ))}
        </div>
        <div>
          <Button variant="ghost" onClick={() => setArr([...arr, null])}>
            + Agregar imagen
          </Button>
        </div>
      </Card>
    );
  }
  if (block.type === "array") {
    const arr = (get(doc, block.name) as Record<string, unknown>[]) ?? [];
    const setArr = (next: unknown[]) => upd(block.name, next);
    return (
      <Card label={block.label}>
        {block.help && <p className="-mt-2 text-xs text-muted">{block.help}</p>}
        <div className="grid gap-4">
          {arr.map((item, i) => (
            <div key={(item._key as string) ?? i} className="rounded-lg border border-line3 bg-bg0 p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wide text-muted">
                  {block.itemTitle ?? "Elemento"} {i + 1}
                </span>
                <div className="flex gap-1">
                  <IconBtn label="↑" disabled={i === 0} onClick={() => setArr(move(arr, i, i - 1))} />
                  <IconBtn label="↓" disabled={i === arr.length - 1} onClick={() => setArr(move(arr, i, i + 1))} />
                  <IconBtn label="✕" onClick={() => setArr(arr.filter((_, j) => j !== i))} />
                </div>
              </div>
              <div className="grid gap-3">
                {block.itemFields.map((f, fi) => (
                  <LeafField
                    key={fi}
                    field={{ ...f, name: `${block.name}.${i}.${f.name}` }}
                    doc={doc}
                    upd={upd}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
        <div>
          <Button variant="ghost" onClick={() => setArr([...arr, emptyItem(block.itemFields)])}>
            + Agregar {block.itemTitle?.toLowerCase() ?? "elemento"}
          </Button>
        </div>
      </Card>
    );
  }
  return (
    <Card>
      <LeafField field={block} doc={doc} upd={upd} />
    </Card>
  );
}

function IconBtn({ label, onClick, disabled }: { label: string; onClick: () => void; disabled?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="grid h-7 w-7 place-items-center rounded-md border border-line2 text-xs text-fg transition hover:bg-surface disabled:opacity-30"
    >
      {label}
    </button>
  );
}

function move<T>(arr: T[], from: number, to: number): T[] {
  const next = [...arr];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}
