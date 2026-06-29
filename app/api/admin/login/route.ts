import { NextResponse } from "next/server";
import { authenticate } from "@/lib/admin/users";
import { createToken, cookieOptions } from "@/lib/admin/auth";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let email = "";
  let password = "";
  try {
    const body = await req.json();
    email = String(body.email ?? "");
    password = String(body.password ?? "");
  } catch {
    return NextResponse.json({ error: "Solicitud inválida" }, { status: 400 });
  }

  let session;
  try {
    session = await authenticate(email, password);
  } catch {
    return NextResponse.json(
      { error: "No se pudo verificar. ¿Está configurado el token de Sanity?" },
      { status: 500 },
    );
  }
  if (!session) {
    return NextResponse.json({ error: "Email o contraseña incorrectos" }, { status: 401 });
  }

  const token = await createToken(session);
  const res = NextResponse.json({ ok: true, name: session.name });
  res.cookies.set({ ...cookieOptions, value: token });
  return res;
}
