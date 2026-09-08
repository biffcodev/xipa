"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";

/* Full-bleed image with a subtle parallax drift. Place inside a
   `relative overflow-hidden` parent — the image is oversized so the drift
   never reveals an edge. */
export default function ParallaxImage({
  src,
  alt = "",
  speed = 0.12,
  sizes = "100vw",
  priority = false,
  className = "",
}: {
  src: string;
  alt?: string;
  speed?: number;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const frame = () => {
      const el = ref.current;
      const parent = el?.parentElement;
      if (el && parent) {
        const r = parent.getBoundingClientRect();
        const vh = window.innerHeight || 1;
        if (r.bottom > -200 && r.top < vh + 200) {
          const offset = r.top + r.height / 2 - vh / 2;
          el.style.transform = `translate3d(0, ${(-offset * speed).toFixed(1)}px, 0)`;
        }
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [speed]);

  return (
    <div ref={ref} className="absolute inset-[-16%]" style={{ willChange: "transform" }}>
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={`object-cover ${className}`} />
    </div>
  );
}
