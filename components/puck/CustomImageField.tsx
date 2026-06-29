"use client";
import { useRef, useState } from "react";
import { urlFor } from "@/sanity/lib/image";

/* Puck custom field: uploads an image to Sanity (via /api/admin/upload) and
   stores its public URL string in the page data. Shows a live preview. */
export default function CustomImageField({
  value,
  onChange,
}: {
  value?: string;
  onChange: (v: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function handleFile(file: File) {
    setBusy(true);
    setErr(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al subir");
      const url = urlFor(data.image).width(1800).quality(82).url();
      onChange(url);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Error al subir");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div style={{ display: "grid", gap: 8 }}>
      {value ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={value} alt="" style={{ width: "100%", height: 120, objectFit: "cover", borderRadius: 8, border: "1px solid #e5e2db" }} />
      ) : (
        <div style={{ height: 80, display: "grid", placeItems: "center", borderRadius: 8, border: "1px dashed #cfccc4", color: "#8a877f", fontSize: 12 }}>
          Sin imagen
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleFile(f);
          e.target.value = "";
        }}
      />
      <div style={{ display: "flex", gap: 8 }}>
        <button
          type="button"
          disabled={busy}
          onClick={() => inputRef.current?.click()}
          style={{ background: "#ff4d0e", color: "#fff", border: 0, borderRadius: 8, padding: "6px 12px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}
        >
          {busy ? "Subiendo…" : value ? "Cambiar imagen" : "Subir imagen"}
        </button>
        {value && (
          <button type="button" onClick={() => onChange("")} style={{ background: "transparent", border: "1px solid #e5e2db", borderRadius: 8, padding: "6px 12px", fontSize: 13, cursor: "pointer" }}>
            Quitar
          </button>
        )}
      </div>
      {err && <span style={{ color: "#ff4d0e", fontSize: 12 }}>{err}</span>}
    </div>
  );
}
