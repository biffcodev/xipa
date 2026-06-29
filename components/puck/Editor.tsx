"use client";
import { Puck, type Data } from "@measured/puck";
import "@measured/puck/puck.css";
import Link from "next/link";
import { useState } from "react";
import { config } from "@/lib/puck/config";

export default function Editor({
  slug,
  title,
  initialData,
}: {
  slug: string;
  title: string;
  initialData: Data;
}) {
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  async function publish(data: Data) {
    setStatus("saving");
    try {
      const res = await fetch("/api/admin/save-page", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, title, data }),
      });
      if (!res.ok) throw new Error();
      setStatus("saved");
      setTimeout(() => setStatus("idle"), 2500);
    } catch {
      setStatus("error");
    }
  }

  return (
    <div style={{ height: "100vh" }}>
      <Puck
        config={config}
        data={initialData}
        onPublish={publish}
        headerTitle={title}
        headerPath={`/p/${slug}`}
        overrides={{
          headerActions: ({ children }) => (
            <>
              <Link
                href="/admin/paginas-visuales"
                style={{ display: "inline-flex", alignItems: "center", padding: "0 12px", fontSize: 14, color: "#6f6e6a", textDecoration: "none" }}
              >
                ← Volver
              </Link>
              <Link
                href={`/p/${slug}`}
                target="_blank"
                style={{ display: "inline-flex", alignItems: "center", padding: "0 12px", fontSize: 14, color: "#6f6e6a", textDecoration: "none" }}
              >
                Ver ↗
              </Link>
              {status === "saved" && (
                <span style={{ display: "inline-flex", alignItems: "center", padding: "0 10px", fontSize: 13, color: "#0a8a3f", fontWeight: 600 }}>
                  ✓ Guardado
                </span>
              )}
              {status === "saving" && (
                <span style={{ display: "inline-flex", alignItems: "center", padding: "0 10px", fontSize: 13, color: "#6f6e6a" }}>Guardando…</span>
              )}
              {children}
            </>
          ),
        }}
      />
    </div>
  );
}
