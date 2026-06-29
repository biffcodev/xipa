import "server-only";
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/env";

/* Server-only Sanity client that carries the write/read token.
   Used by the site content layer (reads) and the custom /admin (read + write).
   The token is NEVER exposed to the browser (this module is server-only and
   the env var is not prefixed with NEXT_PUBLIC). */
const token = process.env.SANITY_API_TOKEN;

export const hasToken = Boolean(token);

export const serverClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token,
  perspective: "published",
});

/* Recursively add a `_key` to every object inside an array, as Sanity requires.
   Keeps existing keys. Used before writing documents so arrays stay editable. */
export function addKeys<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map((item) => {
      if (item && typeof item === "object") {
        const fixed: Record<string, unknown> = {};
        for (const k of Object.keys(item)) fixed[k] = addKeys((item as Record<string, unknown>)[k]);
        if (!("_key" in fixed) || !fixed._key) fixed._key = randomKey();
        return fixed;
      }
      return item;
    }) as unknown as T;
  }
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const k of Object.keys(value as object)) out[k] = addKeys((value as Record<string, unknown>)[k]);
    return out as unknown as T;
  }
  return value;
}

function randomKey() {
  return (
    Math.random().toString(36).slice(2, 10) + Math.random().toString(36).slice(2, 6)
  );
}
