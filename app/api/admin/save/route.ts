import { NextResponse } from "next/server";
import { saveDoc } from "@/lib/admin/store";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let doc;
  try {
    doc = await req.json();
  } catch {
    return NextResponse.json({ error: "Solicitud inválida" }, { status: 400 });
  }
  if (!doc || typeof doc !== "object" || !doc._id || !doc._type) {
    return NextResponse.json({ error: "Falta _id o _type" }, { status: 400 });
  }
  try {
    const saved = await saveDoc(doc);
    return NextResponse.json({ ok: true, _id: saved._id });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "No se pudo guardar" },
      { status: 500 },
    );
  }
}
