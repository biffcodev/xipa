"use client";
import { useState } from "react";

const field = "px-[18px] py-[15px] bg-surface border border-line2 rounded-[14px] text-fg text-[15px] outline-none transition-colors focus:border-brand";
const label = "flex flex-col gap-2";
const labelText = "text-xs tracking-[0.1em] uppercase text-muted font-semibold";

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  if (sent) {
    return (
      <div className="flex flex-col gap-3 p-10 bg-surface border border-[rgba(255,77,14,0.3)] rounded-[18px]">
        <span className="text-[32px]">✓</span>
        <span className="text-fg font-bold text-[22px] tracking-[-0.01em]">¡Gracias por escribirnos!</span>
        <span className="text-muted text-base font-light leading-[1.55]">Recibimos tu mensaje y te respondemos a la brevedad.</span>
      </div>
    );
  }
  return (
    <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <label className={label}><span className={labelText}>Nombre</span><input type="text" required placeholder="Tu nombre" className={field} /></label>
        <label className={label}><span className={labelText}>Email</span><input type="email" required placeholder="tu@correo.com" className={field} /></label>
      </div>
      <label className={label}><span className={labelText}>Empresa / Proyecto</span><input type="text" placeholder="Opcional" className={field} /></label>
      <label className={label}><span className={labelText}>Mensaje</span><textarea required rows={5} placeholder="Contanos qué necesitás…" className={`${field} resize-y`} /></label>
      <button type="submit" className="self-start mt-1 px-9 py-[17px] bg-brand text-white border-none rounded-full font-semibold text-base cursor-pointer transition-transform hover:-translate-y-0.5">Enviar mensaje →</button>
    </form>
  );
}
