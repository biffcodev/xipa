/* Migrate the current content + images into Sanity.
 *
 * Usage (from the project root):
 *   NEXT_PUBLIC_SANITY_PROJECT_ID=xxxx \
 *   NEXT_PUBLIC_SANITY_DATASET=production \
 *   SANITY_API_TOKEN=<editor-token> \
 *   npx tsx scripts/seed.ts
 *
 * Re-runnable: documents use fixed _id's so it upserts (createOrReplace).
 * Images are uploaded once and cached by filename in .sanity-seed-assets.json.
 */
import { createClient } from "@sanity/client";
import { readFileSync, existsSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { siteSettings, homeContent, pillars, stats, team, methodologySteps, pages } from "../lib/defaults";
import { PROJECTS } from "../lib/projects";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_TOKEN;
if (!projectId || !token) { console.error("Faltan NEXT_PUBLIC_SANITY_PROJECT_ID o SANITY_API_TOKEN"); process.exit(1); }

const client = createClient({ projectId, dataset, apiVersion: "2024-10-01", token, useCdn: false });
const ROOT = join(process.cwd(), "public");
const CACHE = join(process.cwd(), ".sanity-seed-assets.json");
const assetMap: Record<string, string> = existsSync(CACHE) ? JSON.parse(readFileSync(CACHE, "utf8")) : {};

const FILLED = new Set([
  "det-bio4-1", "det-grido-1", "det-revasos-1", "det-revasos-2",
  "pf-baldes", "pf-bio4", "pf-cafezazo", "pf-cosquin", "pf-grido", "pf-revasos", "pf-vial",
  "proc-1", "proc-2", "proc-3", "proc-4", "proc-5",
  "team-alejandro", "team-delfina", "team-lucia", "team-melina",
]);

async function uploadImage(localPath: string): Promise<any | undefined> {
  if (!localPath) return undefined;
  const rel = localPath.replace(/^\//, "");
  const abs = join(ROOT, rel);
  if (!existsSync(abs)) return undefined;
  const key = rel;
  if (!assetMap[key]) {
    const buf = readFileSync(abs);
    const asset = await client.assets.upload("image", buf, { filename: rel.split("/").pop() });
    assetMap[key] = asset._id;
    writeFileSync(CACHE, JSON.stringify(assetMap, null, 2));
    console.log("  ↑ imagen", rel);
  }
  return { _type: "image", asset: { _type: "reference", _ref: assetMap[key] } };
}

const slot = (id: string) => (FILLED.has(id) ? `/images/slots/${id}.webp` : "");

async function run() {
  console.log("→ Subiendo imágenes y creando documentos…");
  const docs: any[] = [];

  // siteSettings (singleton)
  docs.push({ _id: "siteSettings", _type: "siteSettings", ...siteSettings });

  // homePage (singleton)
  const heroSlides = [];
  for (const s of homeContent.heroSlides) heroSlides.push({ ...s, image: await uploadImage(s.image) });
  docs.push({
    _id: "homePage", _type: "homePage",
    heroSlides,
    railOutro: homeContent.railOutro,
    choice: homeContent.choice,
    stats: homeContent.stats,
    manifesto: homeContent.manifesto,
    methodologyIntro: homeContent.methodologyIntro,
    teamIntro: homeContent.teamIntro,
    newsletter: homeContent.newsletter,
  });

  // pages
  for (const [key, p] of Object.entries(pages)) {
    docs.push({
      _id: `page-${key}`, _type: "page", pageKey: key, title: key,
      hero: { ...p.hero, image: await uploadImage((p.hero as any).image) },
      statement: p.statement,
    });
  }

  // pillars, stats, team, methodology steps
  for (const p of pillars) docs.push({ _id: `pillar-${p.order}`, _type: "pillar", order: p.order, title: p.title, text: p.text, image: await uploadImage(p.image) });
  for (const s of stats) docs.push({ _id: `stat-${s.order}`, _type: "stat", ...s });
  for (const m of team) docs.push({ _id: `team-${m.order}`, _type: "teamMember", order: m.order, name: m.name, role: m.role, bio: m.bio, linkedin: m.linkedin, photo: await uploadImage(m.image) });
  for (const s of methodologySteps) docs.push({ _id: `method-${s.order}`, _type: "methodologyStep", order: s.order, badge: s.badge, title: s.title, text: s.text, image: await uploadImage(s.image) });

  // projects
  let order = 1;
  for (const p of PROJECTS) {
    const heroImage = await uploadImage(slot(`pf-${p.slug}`));
    const featuredImage = await uploadImage(slot(`det-${p.slug}-1`));
    const gallery = (await Promise.all([2, 3, 4].map((i) => uploadImage(slot(`det-${p.slug}-${i}`))))).filter(Boolean);
    docs.push({
      _id: `project-${p.slug}`, _type: "project", order: order++,
      title: p.title, slug: { _type: "slug", current: p.slug }, tag: p.tag, subtitle: p.subtitle,
      heroImage, featuredImage, gallery,
      intro: p.intro, meta: { ...p.meta, anio: p.meta.anio },
      desafio: p.desafio, solucion: p.solucion,
      proceso: p.proceso, impacto: p.impacto, ficha: p.ficha,
    });
  }

  const tx = client.transaction();
  docs.forEach((d) => tx.createOrReplace(d));
  await tx.commit();
  console.log(`✓ Listo: ${docs.length} documentos creados/actualizados en Sanity.`);
}

run().catch((e) => { console.error(e); process.exit(1); });
