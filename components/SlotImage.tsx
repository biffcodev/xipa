import Image from "next/image";

// Slots that have a real extracted image; the rest render a placeholder frame.
const FILLED = new Set([
  "det-bio4-1", "det-grido-1", "det-revasos-1", "det-revasos-2",
  "pf-baldes", "pf-bio4", "pf-cafezazo", "pf-cosquin", "pf-grido", "pf-revasos", "pf-vial",
  "proc-1", "proc-2", "proc-3", "proc-4", "proc-5",
  "team-alejandro", "team-delfina", "team-lucia", "team-melina",
]);

const ImgIcon = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="opacity-50"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="m21 15-5-5L5 21" /></svg>
);

/** Fills its (positioned) parent. Pass `className` for positioning, e.g. "absolute inset-0". */
export default function SlotImage({ id, alt = "", className = "" }: { id: string; alt?: string; className?: string }) {
  if (FILLED.has(id)) {
    return (
      <Image
        src={`/images/slots/${id}.webp`}
        alt={alt}
        fill
        sizes="100vw"
        className={`object-cover ${className}`}
      />
    );
  }
  return (
    <div className={`flex flex-col items-center justify-center gap-2 bg-surface border border-dashed border-line2 text-muted text-center p-3 ${className}`} data-slot={id}>
      <ImgIcon />
      <span className="text-xs font-medium tracking-[0.01em] opacity-80">{alt}</span>
    </div>
  );
}
