/* Crea (o actualiza) un usuario del panel /admin.
 *
 * Uso, desde la carpeta del proyecto:
 *   1) Cargá las variables de entorno (igual que en la migración):
 *      Get-Content .env.local | ForEach-Object { if ($_ -match '^\s*([^#=]+)=(.*)$') { Set-Item "env:$($matches[1].Trim())" $matches[2].Trim() } }
 *   2) node scripts/create-admin.mjs "email@ejemplo.com" "tu-contraseña" "Nombre Apellido"
 *
 * Re-ejecutable: si el email ya existe, actualiza la contraseña/nombre.
 */
import { createClient } from "@sanity/client";
import bcrypt from "bcryptjs";

const [, , emailArg, passwordArg, ...nameParts] = process.argv;

if (!emailArg || !passwordArg) {
  console.error('Uso: node scripts/create-admin.mjs "email@ejemplo.com" "contraseña" "Nombre"');
  process.exit(1);
}
if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.SANITY_API_TOKEN) {
  console.error("Faltan NEXT_PUBLIC_SANITY_PROJECT_ID o SANITY_API_TOKEN (cargá tu .env.local primero).");
  process.exit(1);
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-10-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const email = emailArg.trim().toLowerCase();
const name = nameParts.join(" ").trim() || email;
const passwordHash = await bcrypt.hash(passwordArg, 10);
const _id = "adminUser-" + email.replace(/[^a-z0-9]/g, "-");

await client.createOrReplace({ _id, _type: "adminUser", email, name, passwordHash });
console.log(`✓ Usuario listo: ${email}  (nombre: ${name})`);
console.log("  Ya podés entrar en /admin con ese email y contraseña.");
