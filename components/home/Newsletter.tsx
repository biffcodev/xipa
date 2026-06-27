"use client";
import { useState } from "react";
import { homeContent } from "@/lib/defaults";

type Data = typeof homeContent.newsletter;

export default function Newsletter({ data = homeContent.newsletter }: { data?: Data }) {
  const [done, setDone] = useState(false);
  return (
    <section className="relative w-full h-[165vh] bg-bg6 border-t border-line3">
      <div className="sticky top-0 min-h-screen flex items-center justify-center px-6 md:px-12 py-[120px]">
        <div className="max-w-[760px] mx-auto text-center">
          <span className="block text-xs tracking-[0.24em] uppercase text-brand font-bold">{data.eyebrow}</span>
          <h2 className="mt-[18px] text-fg tracking-[-0.03em] leading-none">
            <span className="block font-extralight text-[clamp(30px,4vw,46px)]">{data.line1}</span>
            <span className="block font-extrabold text-[clamp(40px,5.6vw,64px)]">{data.line2}</span>
          </h2>
          <p className="mt-[22px] mx-auto max-w-[480px] text-muted text-[17px] font-light leading-[1.55]">{data.paragraph}</p>
          {!done ? (
            <form onSubmit={(e) => { e.preventDefault(); setDone(true); }} className="mt-10 mx-auto max-w-[520px] flex gap-2.5">
              <input type="email" required placeholder="Tu correo electrónico" className="flex-1 min-w-0 px-5 py-4 bg-surface border border-line2 rounded-full text-fg text-[15px] outline-none" />
              <button type="submit" className="flex-none px-7 py-4 bg-brand text-white border-none rounded-full font-semibold text-[15px] cursor-pointer transition-transform hover:-translate-y-0.5">Suscribirme</button>
            </form>
          ) : (
            <p className="mt-[18px] text-brand text-sm font-semibold">{data.okText}</p>
          )}
          <p className="mt-4 mx-auto text-muted text-xs font-light">{data.privacy}</p>
        </div>
      </div>
    </section>
  );
}
