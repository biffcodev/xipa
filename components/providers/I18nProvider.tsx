"use client";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { applyI18n, LABELS, LANGS } from "@/lib/i18n";

type Lang = "es" | "en" | "pt" | "fr";
type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  /** Re-translate a freshly rendered subtree (e.g. after a client re-render). */
  applyTo: (root: HTMLElement | null) => void;
  LANGS: string[];
  LABELS: Record<string, string>;
};
const I18nCtx = createContext<Ctx>({ lang: "es", setLang: () => {}, applyTo: () => {}, LANGS, LABELS });

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("es");
  const langRef = useRef<Lang>("es");
  langRef.current = lang;
  const pathname = usePathname();

  useEffect(() => {
    const stored = (typeof localStorage !== "undefined" && (localStorage.getItem("xipa-lang") as Lang)) || "es";
    setLangState(stored);
  }, []);

  // Re-translate the whole document after every navigation or language change.
  useEffect(() => {
    applyI18n(document.body, lang);
  }, [lang, pathname]);

  const setLang = useCallback((l: Lang) => {
    try { localStorage.setItem("xipa-lang", l); } catch {}
    setLangState(l);
  }, []);

  const applyTo = useCallback((root: HTMLElement | null) => {
    if (root) applyI18n(root, langRef.current);
  }, []);

  return <I18nCtx.Provider value={{ lang, setLang, applyTo, LANGS, LABELS }}>{children}</I18nCtx.Provider>;
}

export const useI18n = () => useContext(I18nCtx);
