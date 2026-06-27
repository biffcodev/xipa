"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "./providers/ThemeProvider";
import { useI18n } from "./providers/I18nProvider";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/oportunidad", label: "Oportunidad" },
  { href: "/metodologia", label: "Metodología" },
  { href: "/equipo", label: "Equipo" },
  { href: "/proyectos", label: "Proyectos" },
  { href: "/contacto", label: "Contacto" },
];

const Moon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
);
const Sun = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4.2" /><line x1="12" y1="2" x2="12" y2="4.5" /><line x1="12" y1="19.5" x2="12" y2="22" /><line x1="2" y1="12" x2="4.5" y2="12" /><line x1="19.5" y1="12" x2="22" y2="12" /><line x1="4.6" y1="4.6" x2="6.4" y2="6.4" /><line x1="17.6" y1="17.6" x2="19.4" y2="19.4" /><line x1="4.6" y1="19.4" x2="6.4" y2="17.6" /><line x1="17.6" y1="6.4" x2="19.4" y2="4.6" /></svg>
);

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href === "/proyectos") return pathname.startsWith("/proyectos");
  return pathname === href;
}

export default function Nav() {
  const pathname = usePathname();
  const { theme, toggle } = useTheme();
  const { lang, setLang, LANGS, LABELS } = useI18n();
  const navRef = useRef<HTMLElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const [collapsed, setCollapsed] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  // Nav collapse on scroll-down, expand on scroll-up, hide near footer.
  useEffect(() => {
    let lastY = window.scrollY;
    let expandTimer: ReturnType<typeof setTimeout> | null = null;
    let cur: boolean | null = null;
    const apply = (c: boolean) => { if (c !== cur) { cur = c; setCollapsed(c); } };
    const onScroll = () => {
      const y = window.scrollY;
      const down = y > lastY;
      if (y <= 60) { if (expandTimer) { clearTimeout(expandTimer); expandTimer = null; } apply(false); }
      else if (down) { if (expandTimer) { clearTimeout(expandTimer); expandTimer = null; } apply(true); }
      else if (!expandTimer) { expandTimer = setTimeout(() => { expandTimer = null; apply(false); }, 280); }
      const footer = document.getElementById("site-footer");
      if (footer) setHidden(footer.getBoundingClientRect().top <= window.innerHeight * 0.5);
      lastY = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => { setDrawer(false); setLangOpen(false); }, [pathname]);
  useEffect(() => { document.body.style.overflow = drawer ? "hidden" : ""; }, [drawer]);

  return (
    <>
      <nav
        ref={navRef}
        style={{
          width: collapsed ? "260px" : "calc(100% - 80px)",
          justifyContent: collapsed ? "center" : "space-between",
          opacity: hidden ? 0 : 1,
          pointerEvents: hidden ? "none" : "auto",
          transform: hidden ? "translateX(-50%) translateY(-150%)" : "translateX(-50%)",
        }}
        className="fixed top-3 left-1/2 flex items-center max-w-[1600px] pl-[30px] pr-4 py-[13px] border border-line2 rounded-full z-[200] bg-[rgba(40,40,38,0.30)] backdrop-blur-[32px] transition-[width,padding,justify-content,opacity,transform] duration-[550ms] ease-[cubic-bezier(.4,0,.2,1)]"
      >
        <Link href="/" className="font-extrabold text-xl text-onimg tracking-[0.04em] no-underline whitespace-nowrap">XIPA</Link>
        <div className="flex items-center gap-[30px]">
          <div
            ref={linksRef}
            style={{ opacity: collapsed ? 0 : 1, width: collapsed ? 0 : "auto", pointerEvents: collapsed ? "none" : "auto" }}
            className="hidden md:flex items-center gap-[30px] overflow-hidden transition-opacity duration-300"
          >
            {LINKS.map((l) => {
              const active = isActive(pathname, l.href);
              return (
                <Link key={l.href} href={l.href} className="relative text-onimg text-sm font-medium no-underline transition-opacity hover:opacity-100" style={{ opacity: active ? 1 : 0.6 }}>
                  {active && <span className="absolute -top-3 left-1/2 -translate-x-1/2 w-[5px] h-[5px] rounded-full bg-brand" />}
                  {l.label}
                </Link>
              );
            })}
          </div>
          <div className="flex items-center gap-1.5">
            {/* hamburger (mobile) */}
            <button aria-label="Menú" onClick={() => setDrawer((d) => !d)} className="md:hidden inline-flex items-center justify-center w-[38px] h-[38px] p-0 bg-white/12 border border-white/22 text-white rounded-full cursor-pointer">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="7" x2="21" y2="7" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="17" x2="21" y2="17" /></svg>
            </button>
            {/* language */}
            <div data-no-i18n className="relative">
              <button aria-label="Idioma" onClick={(e) => { e.stopPropagation(); setLangOpen((o) => !o); }} className="inline-flex items-center justify-center w-[38px] h-[38px] p-0 bg-white/12 border border-white/22 text-white rounded-full cursor-pointer transition-colors hover:bg-white/20">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9.2" /><path d="M2.8 12h18.4" /><path d="M12 2.8c2.6 2.6 4 5.8 4 9.2s-1.4 6.6-4 9.2c-2.6-2.6-4-5.8-4-9.2s1.4-6.6 4-9.2z" /></svg>
              </button>
              {langOpen && (
                <div className="absolute top-[46px] right-0 min-w-[148px] bg-[rgba(24,24,22,0.97)] backdrop-blur-[20px] border border-white/16 rounded-[14px] p-1.5 flex flex-col gap-0.5 z-[300] shadow-[0_22px_50px_rgba(0,0,0,0.45)]">
                  {LANGS.map((l) => (
                    <button
                      key={l}
                      onClick={(e) => { e.stopPropagation(); setLang(l as "es" | "en" | "pt" | "fr"); setLangOpen(false); }}
                      className="text-left px-3 py-[9px] border-none rounded-[9px] cursor-pointer text-sm"
                      style={{ background: lang === l ? "rgba(255,77,14,0.9)" : "transparent", color: lang === l ? "#fff" : "rgba(255,255,255,0.7)", fontWeight: lang === l ? 600 : 400 }}
                    >
                      {l === "es" ? "Español" : l === "en" ? "English" : l === "fr" ? "Français" : "Português"}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {/* theme */}
            <button aria-label="Cambiar tema" onClick={toggle} className="inline-flex items-center justify-center w-[38px] h-[38px] p-0 bg-white/12 border border-white/22 text-white rounded-full cursor-pointer transition-colors hover:bg-white/20">
              {theme === "dark" ? <Sun /> : <Moon />}
            </button>
          </div>
        </div>
      </nav>

      {/* mobile drawer */}
      {drawer && (
        <div className="fixed inset-0 z-[190] bg-[rgba(20,20,18,0.97)] backdrop-blur-[22px] flex flex-col items-center justify-center gap-1" onClick={() => setDrawer(false)}>
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="text-white text-[30px] font-bold tracking-[-0.01em] no-underline py-2.5">{l.label}</Link>
          ))}
        </div>
      )}
    </>
  );
}
