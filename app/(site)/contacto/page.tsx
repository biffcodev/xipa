import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import { getPage, getSettings } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Hablemos de tu próximo proyecto de ecodiseño y economía circular. Villa Allende, Córdoba, Argentina.",
};

function MapGrid() {
  const cells = Array.from({ length: 176 }, (_, i) => {
    let bg = "bg-bg6";
    if (i % 7 === 0) bg = "bg-bg5";
    else if (i === 52 || i === 123) bg = "bg-bg7";
    else if (i === 88) bg = "bg-[rgba(255,77,14,0.14)]";
    return <div key={i} className={`${bg} rounded-[4px]`} />;
  });
  return (
    <div className="absolute inset-[-8%] grid grid-cols-[repeat(16,1fr)] grid-rows-[repeat(11,1fr)] gap-4 rotate-[-4deg] opacity-95">
      {cells}
    </div>
  );
}

export default async function Contacto() {
  const [p, settings] = await Promise.all([getPage("contacto"), getSettings()]);
  const addr = settings.addressLines || [];
  const pinLabel = addr[0] || "";
  const mapHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(settings.mapQuery || "")}`;

  return (
    <main>
      <section className="relative px-6 md:px-16 pt-[180px] pb-[120px] overflow-hidden">
        <div className="absolute top-[2%] left-1/2 -translate-x-1/2 w-[820px] h-[820px] max-w-[120vw] rounded-full pointer-events-none bg-[radial-gradient(circle,rgba(255,77,14,0.12),transparent_62%)]" />
        <div className="relative max-w-[1280px] mx-auto">
          <div className="max-w-[820px]">
            <span className="block text-xs tracking-[0.24em] uppercase text-brand font-bold">{p.hero.eyebrow || "Contacto"}</span>
            <h1 className="mt-5 text-fg tracking-[-0.035em] leading-[0.94]">
              <span className="block font-extralight text-[clamp(36px,4.8vw,64px)]">Dale otra</span>
              <span className="block font-extrabold text-[clamp(48px,7vw,104px)]">vuelta.</span>
            </h1>
            <p className="mt-6 max-w-[600px] text-muted text-[19px] font-light leading-[1.55]">
              Contanos qué estás pensando. Te decimos cómo hacerlo con más valor, en el mismo tiempo y al mismo costo.
            </p>
          </div>

          <div className="mt-[72px] grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-14 items-start">
            <Reveal><ContactForm /></Reveal>
            <Reveal delay={0.12}>
              <div className="flex flex-col gap-[30px]">
                <div>
                  <span className="block text-xs tracking-[0.16em] uppercase text-brand font-bold">Dónde estamos</span>
                  <p className="mt-3.5 text-fg text-lg font-normal leading-[1.6]">{addr[0]}</p>
                  <p className="mt-0.5 text-muted text-base font-light leading-[1.6]">{addr.slice(1).join(" · ")}</p>
                </div>
                <div>
                  <span className="block text-xs tracking-[0.16em] uppercase text-brand font-bold">Horario</span>
                  <p className="mt-3.5 text-muted text-base font-light leading-[1.6]">{settings.hours}</p>
                </div>
                <a href="#mapa" className="inline-flex items-center gap-2 text-brand text-[15px] font-semibold no-underline">Ver en el mapa ↓</a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="mapa" className="relative w-full h-screen overflow-hidden bg-bg1">
        <MapGrid />
        <div className="absolute left-[-12%] top-[46%] w-[124%] h-[18px] bg-bg0 rotate-[-4deg] shadow-[0_1px_0_var(--line3),0_-1px_0_var(--line3)]" />
        <div className="absolute left-[42%] top-[-12%] w-[18px] h-[124%] bg-bg0 rotate-[-4deg] shadow-[1px_0_0_var(--line3),-1px_0_0_var(--line3)]" />
        <div className="absolute left-[-10%] top-[80%] w-[135%] h-[14px] bg-bg0 rotate-[-24deg] origin-left shadow-[0_1px_0_var(--line3),0_-1px_0_var(--line3)]" />
        <div className="absolute left-[52%] top-[42%] -translate-x-1/2 -translate-y-full">
          <div className="flex flex-col items-center">
            <div className="bg-fg text-bg0 px-4 py-2.5 rounded-[12px] shadow-[0_12px_30px_rgba(0,0,0,0.25)] whitespace-nowrap text-center">
              <span className="block text-[11px] tracking-[0.18em] text-brand font-bold">{settings.brand}</span>
              <span className="block text-sm font-semibold mt-0.5">{pinLabel}</span>
            </div>
            <div className="w-0.5 h-4 bg-fg" />
            <div className="relative w-6 h-6">
              <span className="absolute left-1/2 top-1/2 w-6 h-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[rgba(255,77,14,0.45)] animate-[pinPulse_2.4s_ease-out_infinite]" />
              <span className="absolute left-1/2 top-1/2 w-5 h-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand border-4 border-bg1 shadow-[0_4px_14px_rgba(255,77,14,0.6)]" />
            </div>
          </div>
        </div>
        <div className="absolute left-8 md:left-16 bottom-12 flex flex-col gap-2">
          <div className="flex items-center gap-2"><div className="w-[60px] h-1 bg-fg rounded-sm" /><span className="text-muted text-xs font-medium">1 km</span></div>
          <span className="text-muted text-[11px] font-semibold tracking-[0.14em]">{settings.mapCoords}</span>
        </div>
        <a href={mapHref} target="_blank" rel="noopener" className="absolute right-8 md:right-16 bottom-12 inline-flex items-center gap-2.5 px-7 py-[15px] bg-brand text-white font-semibold text-[15px] rounded-full no-underline shadow-[0_14px_34px_rgba(255,77,14,0.3)] transition-transform hover:-translate-y-0.5">Cómo llegar ↗</a>
      </section>
    </main>
  );
}
