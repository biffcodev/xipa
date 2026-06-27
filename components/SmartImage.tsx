import Image from "next/image";
import { hasImg, imgSrc, type Img } from "@/lib/img";

const ImgIcon = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="opacity-50"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="m21 15-5-5L5 21" /></svg>
);

/** Fills its (positioned) parent. Renders a Sanity image, a local path, or a
 *  read-only placeholder frame when the image is missing. */
export default function SmartImage({
  img, alt = "", className = "", priority = false, sizes = "100vw",
}: { img: Img; alt?: string; className?: string; priority?: boolean; sizes?: string }) {
  if (!hasImg(img)) {
    return (
      <div className={`flex flex-col items-center justify-center gap-2 bg-surface border border-dashed border-line2 text-muted text-center p-3 ${className}`}>
        <ImgIcon />
        <span className="text-xs font-medium tracking-[0.01em] opacity-80">{alt}</span>
      </div>
    );
  }
  return <Image src={imgSrc(img)} alt={alt} fill sizes={sizes} priority={priority} className={`object-cover ${className}`} />;
}
