"use client";
import { useRef, useState } from "react";
import { urlFor } from "@/sanity/lib/image";

/* ── Low-level, presentational form controls for the admin, styled with the
   XIPA design tokens (brand orange, bg/line tokens, Inter). ── */

export function Field({
  label,
  help,
  children,
}: {
  label?: string;
  help?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      {label && <span className="mb-1.5 block text-sm font-medium text-fg">{label}</span>}
      {children}
      {help && <span className="mt-1 block text-xs text-muted">{help}</span>}
    </label>
  );
}

const inputCls =
  "w-full rounded-lg border border-line2 bg-bg0 px-3 py-2 text-sm text-fg outline-none transition focus:border-brand";

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${inputCls} ${props.className ?? ""}`} />;
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`${inputCls} min-h-[90px] resize-y ${props.className ?? ""}`} />;
}

export function previewUrl(value: unknown): string | null {
  if (!value) return null;
  if (typeof value === "string") return value; // local /public fallback path
  try {
    return urlFor(value as never)
      .width(280)
      .height(190)
      .fit("crop")
      .url();
  } catch {
    return null;
  }
}

export function ImageInput({
  value,
  onChange,
}: {
  value: unknown;
  onChange: (v: unknown) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const url = previewUrl(value);

  async function handleFile(file: File) {
    setBusy(true);
    setErr(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al subir");
      onChange(data.image);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Error al subir");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex items-center gap-4">
      <div className="grid h-[88px] w-[120px] shrink-0 place-items-center overflow-hidden rounded-lg border border-line2 bg-bg2">
        {url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={url} alt="" className="h-full w-full object-cover" />
        ) : (
          <span className="text-[11px] text-muted">Sin imagen</span>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
            e.target.value = "";
          }}
        />
        <div className="flex gap-2">
          <button
            type="button"
            disabled={busy}
            onClick={() => inputRef.current?.click()}
            className="rounded-lg bg-brand px-3 py-1.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
          >
            {busy ? "Subiendo…" : url ? "Cambiar" : "Subir imagen"}
          </button>
          {url && (
            <button
              type="button"
              onClick={() => onChange(null)}
              className="rounded-lg border border-line2 px-3 py-1.5 text-sm text-fg transition hover:bg-surface"
            >
              Quitar
            </button>
          )}
        </div>
        {err && <span className="text-xs text-brand">{err}</span>}
      </div>
    </div>
  );
}

export function Button({
  variant = "primary",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "ghost" | "danger" }) {
  const base = "rounded-lg px-4 py-2 text-sm font-semibold transition disabled:opacity-50";
  const styles = {
    primary: "bg-brand text-white hover:opacity-90",
    ghost: "border border-line2 text-fg hover:bg-surface",
    danger: "border border-line2 text-brand hover:bg-surface",
  }[variant];
  return <button {...props} className={`${base} ${styles} ${props.className ?? ""}`} />;
}
