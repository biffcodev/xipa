import "server-only";
import { serverClient, addKeys } from "@/lib/server/sanity";

/* Read a single document by its fixed _id (e.g. "siteSettings", "homePage",
   "project-grido"). Returns null if it doesn't exist yet. */
export async function getDoc<T = Record<string, unknown>>(id: string): Promise<T | null> {
  try {
    return await serverClient.fetch<T | null>(`*[_id==$id][0]`, { id });
  } catch {
    return null;
  }
}

/* Read all documents of a type, ordered by `order` when present. */
export async function getByType<T = Record<string, unknown>>(type: string): Promise<T[]> {
  try {
    return await serverClient.fetch<T[]>(`*[_type==$type]|order(order asc, _createdAt asc)`, { type });
  } catch {
    return [];
  }
}

/* Create or replace a document. Always passes through addKeys so every array
   item keeps a valid _key (avoids the "Missing keys" problem). */
export async function saveDoc(doc: Record<string, unknown> & { _id: string; _type: string }) {
  return serverClient.createOrReplace(addKeys(doc));
}

/* Upload an image asset and return an image field value ready to store. */
export async function uploadImage(buffer: Buffer, filename: string) {
  const asset = await serverClient.assets.upload("image", buffer, { filename });
  return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
}

/* ── Visual pages (built with the Puck editor) ──
   The Puck document is stored as a JSON string in `dataJson` to avoid any
   array/_key concerns in Sanity. */

const EMPTY_PUCK = { content: [], root: { props: {} } };

export type VisualPageMeta = { slug: string; title: string };

export async function listVisualPages(): Promise<VisualPageMeta[]> {
  const docs = await getByType<{ slug?: string; title?: string; _id: string }>("visualPage");
  return docs.map((d) => ({ slug: d.slug || d._id.replace("visualPage-", ""), title: d.title || d.slug || "Página" }));
}

export async function getVisualPage(slug: string): Promise<{ title: string; data: unknown }> {
  const doc = await getDoc<{ title?: string; dataJson?: string }>(`visualPage-${slug}`);
  let data: unknown = EMPTY_PUCK;
  if (doc?.dataJson) {
    try {
      data = JSON.parse(doc.dataJson);
    } catch {
      data = EMPTY_PUCK;
    }
  }
  return { title: doc?.title || slug, data };
}

export async function visualPageExists(slug: string): Promise<boolean> {
  const doc = await getDoc<{ _id: string }>(`visualPage-${slug}`);
  return Boolean(doc);
}

export async function saveVisualPage(slug: string, title: string, data: unknown) {
  return saveDoc({
    _id: `visualPage-${slug}`,
    _type: "visualPage",
    slug,
    title,
    dataJson: JSON.stringify(data ?? EMPTY_PUCK),
  });
}
