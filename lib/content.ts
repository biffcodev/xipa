import "server-only";
import { client } from "@/sanity/lib/client";
import { projectId } from "@/sanity/env";
import * as D from "@/lib/defaults";
import { PROJECTS } from "@/lib/projects";

const enabled = projectId !== "placeholder";

// Filled local slots, used to give the fallback projects their images
// (Sanity provides heroImage/featuredImage/gallery directly).
const FILLED = new Set([
  "det-bio4-1", "det-grido-1", "det-revasos-1", "det-revasos-2",
  "pf-baldes", "pf-bio4", "pf-cafezazo", "pf-cosquin", "pf-grido", "pf-revasos", "pf-vial",
]);
function withImages<T extends { slug: string }>(p: T) {
  return {
    ...p,
    heroImage: `/images/slots/pf-${p.slug}.webp`,
    featuredImage: FILLED.has(`det-${p.slug}-1`) ? `/images/slots/det-${p.slug}-1.webp` : null,
    gallery: [2, 3, 4].map((i) => (FILLED.has(`det-${p.slug}-${i}`) ? `/images/slots/det-${p.slug}-${i}.webp` : null)),
  };
}

async function fetchSanity<T>(query: string, params: Record<string, unknown> = {}): Promise<T | null> {
  if (!enabled) return null;
  try {
    return await client.fetch<T>(query, params, { next: { revalidate: 60 } });
  } catch {
    return null;
  }
}

export async function getSettings() {
  return (await fetchSanity<typeof D.siteSettings>(`*[_type=="siteSettings"][0]`)) ?? D.siteSettings;
}

export async function getHome() {
  return (await fetchSanity<typeof D.homeContent>(`*[_type=="homePage"][0]`)) ?? D.homeContent;
}

export async function getPillars() {
  const r = await fetchSanity<typeof D.pillars>(`*[_type=="pillar"]|order(order asc)`);
  return r && r.length ? r : D.pillars;
}

export async function getStats() {
  const r = await fetchSanity<typeof D.stats>(`*[_type=="stat"]|order(order asc)`);
  return r && r.length ? r : D.stats;
}

export async function getTeam() {
  const r = await fetchSanity<typeof D.team>(`*[_type=="teamMember"]|order(order asc){order,name,role,bio,linkedin,"image":photo}`);
  return r && r.length ? r : D.team;
}

export async function getMethodologySteps() {
  const r = await fetchSanity<typeof D.methodologySteps>(`*[_type=="methodologyStep"]|order(order asc)`);
  return r && r.length ? r : D.methodologySteps;
}

export async function getPage(key: keyof typeof D.pages) {
  return (await fetchSanity<(typeof D.pages)[typeof key]>(`*[_type=="page" && pageKey==$key][0]`, { key })) ?? D.pages[key];
}

export async function getProjects() {
  const r = await fetchSanity<typeof PROJECTS>(`*[_type=="project"]|order(order asc){...,"slug":slug.current}`);
  return r && r.length ? r : PROJECTS.map(withImages);
}

export async function getProject(slug: string) {
  const r = await fetchSanity<(typeof PROJECTS)[number]>(`*[_type=="project" && slug.current==$slug][0]{...,"slug":slug.current}`, { slug });
  if (r) return r;
  const p = PROJECTS.find((x) => x.slug === slug);
  return p ? withImages(p) : null;
}

export async function getProjectSlugs(): Promise<string[]> {
  const r = await fetchSanity<string[]>(`*[_type=="project" && defined(slug.current)].slug.current`);
  return r && r.length ? r : PROJECTS.map((p) => p.slug);
}
