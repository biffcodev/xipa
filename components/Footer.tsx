"use client";
import Link from "next/link";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/oportunidad", label: "Oportunidad" },
  { href: "/metodologia", label: "Metodología" },
  { href: "/equipo", label: "Equipo" },
  { href: "/proyectos", label: "Proyectos" },
];

export default function Footer() {
  return (
    <footer id="site-footer" className="relative min-h-screen w-full bg-bg0 border-t border-line flex flex-col overflow-hidden">
      <div className="absolute top-[14%] left-1/2 -translate-x-1/2 w-[900px] h-[900px] max-w-[120vw] rounded-full pointer-events-none bg-[radial-gradient(circle,rgba(255,77,14,0.12),transparent_62%)]" />

      {/* CTA */}
      <div className="relative flex-1 flex flex-col justify-center max-w-[1400px] w-full mx-auto px-6 md:px-16 pt-[130px] pb-[30px]">
        <h2 className="m-0 text-fg tracking-[-0.035em] leading-[0.9]">
          <span className="block font-extralight text-[clamp(40px,5.4vw,76px)]">Hablemos de tu</span>
          <span className="block font-extrabold text-[clamp(60px,9vw,132px)]">próximo proyecto.</span>
        </h2>
        <div className="flex flex-wrap items-center gap-[18px] mt-11">
          <a href="https://wa.me/5493512550067" className="inline-flex items-center gap-2.5 px-[38px] py-5 bg-brand text-white font-semibold text-[17px] rounded-full no-underline transition-transform hover:-translate-y-[3px]">Escribinos por WhatsApp →</a>
          <Link href="/contacto" className="inline-flex items-center gap-2 text-fg font-medium text-base no-underline opacity-70 hover:opacity-100 transition-opacity">Ir a Contacto ↗</Link>
        </div>
      </div>

      {/* columns */}
      <div className="relative max-w-[1400px] w-full mx-auto px-6 md:px-16 py-9 grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr] gap-12 items-start border-t border-line3">
        <div>
          <p className="m-0 text-muted text-sm font-light leading-relaxed max-w-[260px]">Río de Janeiro 137<br />Villa Allende, Córdoba<br />Argentina</p>
        </div>
        <div className="flex flex-col gap-3.5">
          {NAV.map((l) => (
            <Link key={l.href} href={l.href} className="text-muted text-sm no-underline transition-colors hover:text-fg">{l.label}</Link>
          ))}
        </div>
        <div className="flex flex-col gap-3.5">
          <a href="https://wa.me/5493512550067" className="text-brand text-sm no-underline">WhatsApp +54 351 2550067 ↗</a>
          <a href="https://instagram.com/xipa.ok" className="text-brand text-sm no-underline">Instagram ↗</a>
          <a href="https://www.linkedin.com/company/xipa-s-a" className="text-brand text-sm no-underline">LinkedIn ↗</a>
          <a href="https://www.youtube.com/channel/UCVbcT6h5xlVJE-UPdggeq9Q" className="text-brand text-sm no-underline">YouTube ↗</a>
        </div>
      </div>

      {/* bottom bar */}
      <div className="relative flex justify-between items-center max-w-[1400px] w-full mx-auto px-6 md:px-16 py-[18px] border-t border-line3">
        <span className="text-muted text-xs">© 2026 Xipa · Re-Evolucionemos el plástico</span>
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="text-muted text-xs bg-transparent border-none cursor-pointer transition-colors hover:text-fg">Volver arriba ↑</button>
      </div>
    </footer>
  );
}
