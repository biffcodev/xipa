"use client";
import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/components/providers/I18nProvider";

const LINEAL = [
  { label: "Producción global", stat: "400Mt", desc: "de plástico se producen cada año" },
  { label: "Un solo uso", stat: "50%", desc: "del plástico es descartable" },
  { label: "Reciclaje real", stat: "9%", desc: "del plástico se recicla efectivamente" },
  { label: "Océanos", stat: "11Mt", desc: "llegan al mar cada año" },
  { label: "Permanencia", stat: "500", desc: "años tarda en degradarse una botella" },
  { label: "Telgopor", stat: "+1000", desc: "años persiste el poliestireno expandido" },
  { label: "Microplásticos", stat: "5g", desc: "ingerimos por semana, ≈ una tarjeta" },
  { label: "Destino final", stat: "79%", desc: "del plástico termina en vertederos" },
];
const CIRCULAR = [
  { label: "Materia prima", stat: "100%", desc: "reciclada y con trazabilidad" },
  { label: "Reciclabilidad", stat: "100%", desc: "monomaterial, totalmente reciclable" },
  { label: "Reutilización", stat: "∞", desc: "ciclos en productos reutilizables" },
  { label: "Origen", stat: "Local", desc: "proveedores y producción local" },
  { label: "Impresión", stat: "Agua", desc: "tintas al agua, sin solventes" },
  { label: "Residuos", stat: "→ Recursos", desc: "de basura a materia prima" },
  { label: "Huella", stat: "−CO₂", desc: "menos kilos de CO₂ emitidos" },
  { label: "Diseño", stat: "+ Vida", desc: "productos pensados para durar" },
];

const pill = "px-[22px] py-2.5 rounded-full text-[15px] font-medium cursor-pointer transition-all whitespace-nowrap border-none";

export default function Choice() {
  const [choice, setChoice] = useState(0);
  const gridRef = useRef<HTMLDivElement>(null);
  const { applyTo } = useI18n();
  const cards = choice === 0 ? LINEAL : CIRCULAR;

  useEffect(() => { applyTo(gridRef.current); }, [choice, applyTo]);

  return (
    <section className="min-h-screen w-full bg-bg5 py-[120px] px-6 md:px-16">
      <div className="text-center">
        <h2 className="m-0 mx-auto text-[clamp(38px,7vw,64px)] text-fg tracking-[-0.03em]">
          <span className="font-extralight">Hoy, tenemos </span>
          <span className="font-extrabold">una elección.</span>
        </h2>
        <div className="inline-flex mt-9 bg-line3 rounded-full p-1 gap-1">
          <button onClick={() => setChoice(0)} className={`${pill} ${choice === 0 ? "bg-brand text-onimg" : "bg-transparent text-muted"}`}>Economía lineal</button>
          <button onClick={() => setChoice(1)} className={`${pill} ${choice === 1 ? "bg-brand text-onimg" : "bg-transparent text-muted"}`}>Economía circular</button>
        </div>
      </div>
      <div ref={gridRef} className="max-w-[1280px] mx-auto mt-14 grid grid-cols-2 md:grid-cols-4 gap-[18px]">
        {cards.map((c, i) => (
          <div key={i} className="bg-surface border border-line3 rounded-2xl p-6 min-h-[200px] flex flex-col">
            <span className="text-[11px] tracking-[0.1em] uppercase text-muted font-semibold">{c.label}</span>
            <span className="mt-auto font-light text-[38px] text-fg leading-none">{c.stat}</span>
            <span className="mt-3 text-sm text-muted font-light leading-[1.4]">{c.desc}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
