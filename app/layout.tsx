import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "XIPA — Ecodiseño y economía circular",
    template: "%s — XIPA",
  },
  description:
    "XIPA: soluciones de ecodiseño para reducir, rediseñar, repensar y reutilizar el plástico. Economía circular con impacto medible.",
  icons: { icon: "/favicon.svg" },
};

// Set the persisted theme before paint to avoid a flash.
const themeScript = `(function(){try{var t=localStorage.getItem('xipa-theme')||'light';document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="overflow-x-clip">{children}</body>
    </html>
  );
}
