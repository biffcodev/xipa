import { urlFor } from "@/sanity/lib/image";

// An image field is either a local path string (fallback from defaults) or a
// Sanity image object (with `.asset`). Both resolve to a usable <img> src.
export type Img = string | { asset?: unknown; _type?: string } | null | undefined;

export function hasImg(img: Img): boolean {
  if (!img) return false;
  return typeof img === "string" ? img.length > 0 : !!img.asset;
}

export function imgSrc(img: Img, width = 1600): string {
  if (!img) return "";
  if (typeof img === "string") return img;
  try {
    return urlFor(img as never).width(width).auto("format").url();
  } catch {
    return "";
  }
}
