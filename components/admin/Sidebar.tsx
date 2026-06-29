"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/admin", label: "Inicio", icon: "■" },
  { href: "/admin/paginas-visuales", label: "Editor visual", icon: "✦" },
  { href: "/admin/configuracion", label: "Configuración del sitio", icon: "⚙" },
  { href: "/admin/home", label: "Home", icon: "⌂" },
  { href: "/admin/proyectos", label: "Proyectos", icon: "❖" },
  { href: "/admin/equipo", label: "Equipo", icon: "☺" },
  { href: "/admin/pilares", label: "Pilares", icon: "♺" },
  { href: "/admin/estadisticas", label: "Estadísticas", icon: "▤" },
  { href: "/admin/metodologia", label: "Metodología", icon: "◷" },
  { href: "/admin/paginas", label: "Páginas", icon: "▭" },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <nav className="flex flex-col gap-1 p-3">
      {NAV.map((item) => {
        const active =
          item.href === "/admin" ? pathname === "/admin" : pathname === item.href || pathname.startsWith(item.href + "/");
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
              active ? "bg-brand text-white" : "text-fg hover:bg-surface"
            }`}
          >
            <span className={`w-4 text-center ${active ? "text-white" : "text-muted"}`}>{item.icon}</span>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
