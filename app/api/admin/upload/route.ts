import { NextResponse } from "next/server";
import { uploadImage } from "@/lib/admin/store";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const file = form.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Falta el archivo" }, { status: 400 });
    }
    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "El archivo debe ser una imagen" }, { status: 400 });
    }
    const buffer = Buffer.from(await file.arrayBuffer());
    const image = await uploadImage(buffer, file.name || "imagen");
    return NextResponse.json({ ok: true, image });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "No se pudo subir la imagen" },
      { status: 500 },
    );
  }
}
