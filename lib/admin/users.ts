import "server-only";
import bcrypt from "bcryptjs";
import { serverClient } from "@/lib/server/sanity";
import type { Session } from "./auth";

type AdminUserDoc = {
  _id: string;
  email: string;
  name: string;
  passwordHash: string;
};

/* Verify email + password against the adminUser documents stored in Sanity.
   Returns a session payload on success, or null on failure. */
export async function authenticate(email: string, password: string): Promise<Session | null> {
  const clean = email.trim().toLowerCase();
  if (!clean || !password) return null;
  const user = await serverClient.fetch<AdminUserDoc | null>(
    `*[_type=="adminUser" && email==$email][0]{_id,email,name,passwordHash}`,
    { email: clean },
  );
  if (!user?.passwordHash) return null;
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return null;
  return { sub: user._id, email: user.email, name: user.name || user.email };
}

export async function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, 10);
}
