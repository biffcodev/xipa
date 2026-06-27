"use client";
import { useState } from "react";
import SlotImage from "@/components/SlotImage";

const TEAM = [
  { slot: "team-alejandro", name: "Alejandro Romano Rusiñol", role: "Fundador", bio: "Lidera Xipa con la misión de re-evolucionar el plástico desde el ecodiseño y la economía circular.", linkedin: "https://www.linkedin.com/in/alejandroromanorusiñol" },
  { slot: "team-melina", name: "Melina Lerda", role: "Co-líder", bio: "Coordina proyectos y alianzas para escalar soluciones de economía circular con marcas y eventos.", linkedin: "https://www.linkedin.com/in/melina-lerda/" },
  { slot: "team-lucia", name: "Lucía Ferre Cinelli", role: "Ecodiseño", bio: "Diseña productos y envases que nacen del residuo, aplicando ecodiseño en cada detalle.", linkedin: "https://www.linkedin.com/in/lucia-v-ferre-cinelli/" },
  { slot: "team-delfina", name: "Delfina Romano", role: "Comunicación e imagen", bio: "Cuenta la historia de cada proyecto y construye la identidad de la marca Xipa.", linkedin: "https://www.linkedin.com/in/delfina-romano-2b0b84180/" },
];

export default function Team() {
  const [sel, setSel] = useState(-1);
  return (
    <section id="equipo" className="w-full bg-bg5 py-[90px] px-6 md:px-12">
      <div className="max-w-[1500px] mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <h2 className="m-0 text-fg tracking-[-0.03em] text-[clamp(40px,7vw,56px)] leading-none"><span className="font-extralight">El </span><span className="font-extrabold">equipo.</span></h2>
        <p className="m-0 max-w-[420px] text-muted text-base font-light leading-[1.5] md:text-right">Tocá un integrante para conocer más · diseño, materiales y comunicación para la economía circular.</p>
      </div>
      <div className="flex flex-col md:flex-row gap-3.5 max-w-[1500px] mx-auto mt-11 md:h-[74vh]">
        {TEAM.map((m, i) => {
          const grow = sel === i ? 2.6 : sel >= 0 ? 0.78 : 1;
          const op = sel >= 0 && sel !== i ? 0.55 : 1;
          const open = sel === i;
          return (
            <div
              key={m.slot}
              onClick={(e) => { if ((e.target as HTMLElement).closest("a")) return; setSel(open ? -1 : i); }}
              style={{ flexGrow: grow, opacity: op }}
              className="group relative overflow-hidden rounded-[18px] cursor-pointer min-w-0 min-h-[320px] md:min-h-0 shadow-[0_24px_60px_rgba(0,0,0,0.3)] transition-[flex-grow,opacity] duration-[600ms] ease-out basis-0"
            >
              <SlotImage id={m.slot} alt={m.name} className="absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-[1.06]" />
              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(180deg,rgba(0,0,0,0)_38%,rgba(0,0,0,0.82))]" />
              <div className="absolute left-0 bottom-0 w-full p-7">
                <span className="block text-white font-extrabold text-[23px] tracking-[-0.01em] [text-shadow:0_2px_20px_rgba(0,0,0,0.5)]">{m.name}</span>
                <span className="block text-brand text-xs font-bold mt-[5px] uppercase tracking-[0.08em]">{m.role}</span>
                <div className="overflow-hidden transition-[max-height,opacity] duration-[600ms]" style={{ maxHeight: open ? 220 : 0, opacity: open ? 1 : 0 }}>
                  <p className="mt-3.5 text-white/80 text-sm font-light leading-[1.55]">{m.bio}</p>
                  <a href={m.linkedin} target="_blank" rel="noopener" className="inline-flex items-center gap-[7px] mt-4 text-white text-[13px] font-semibold no-underline border border-white/35 px-4 py-2 rounded-full pointer-events-auto transition-colors hover:bg-brand hover:border-brand">LinkedIn ↗</a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
