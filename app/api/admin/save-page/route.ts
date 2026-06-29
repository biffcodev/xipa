import { NextResponse } from "next/server";
import { saveVisualPage } from "@/lib/admin/store";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let body: { slug?: string; title?: string; data?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Solicitud inválida" }, { status: 400 });
  }
  const slug = String(body.slug || "").trim().toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
  if (!slug) return NextResponse.json({ error: "Falta el identificador de la página" }, { status: 400 });
  try {
    await saveVisualPage(slug, String(body.title || slug), body.data);
    return NextResponse.json({ ok: true, slug });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "No se pudo guardar" }, { status: 500 });
  }
}
