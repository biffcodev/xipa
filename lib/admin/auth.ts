/* Edge-safe session helpers (used by middleware AND server routes).
   Only depends on `jose`, so it runs in the Edge runtime. Do NOT import
   next/headers or node-only modules here. */
import { SignJWT, jwtVerify, type JWTPayload } from "jose";

export const COOKIE_NAME = "xipa_admin";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export type Session = { sub: string; email: string; name: string };

function secretKey(): Uint8Array {
  const secret = process.env.ADMIN_JWT_SECRET;
  if (!secret) throw new Error("Falta ADMIN_JWT_SECRET");
  return new TextEncoder().encode(secret);
}

export async function createToken(session: Session): Promise<string> {
  return await new SignJWT({ email: session.email, name: session.name } as JWTPayload)
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(session.sub)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE}s`)
    .sign(secretKey());
}

export async function verifyToken(token: string | undefined | null): Promise<Session | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secretKey());
    return {
      sub: String(payload.sub ?? ""),
      email: String(payload.email ?? ""),
      name: String(payload.name ?? ""),
    };
  } catch {
    return null;
  }
}

export const cookieOptions = {
  name: COOKIE_NAME,
  httpOnly: true,
  sameSite: "lax" as const,
  secure: true,
  path: "/",
  maxAge: SESSION_MAX_AGE,
};
