import Link from "next/link";
import { getSession } from "@/lib/admin/session";

const CARDS = [
  { href: "/admin/paginas-visuales", title: "Editor visual ✦", desc: "Armá páginas arrastrando bloques (tipo Wix), con el estilo de XIPA." },
  { href: "/admin/configuracion", title: "Configuración del sitio", desc: "Marca, WhatsApp, redes, dirección y pie de página." },
  { href: "/admin/home", title: "Home", desc: "Slider principal, textos y secciones de la portada." },
  { href: "/admin/proyectos", title: "Proyectos", desc: "Los 7 proyectos: textos, imágenes y fichas." },
  { href: "/admin/equipo", title: "Equipo", desc: "Integrantes, roles, bios y fotos." },
  { href: "/admin/pilares", title: "Pilares", desc: "Reducir, Rediseñar, Repensar, Reutilizar." },
  { href: "/admin/estadisticas", title: "Estadísticas", desc: "Los números del problema del plástico." },
  { href: "/admin/metodologia", title: "Metodología", desc: "Los pasos del proceso circular." },
  { href: "/admin/paginas", title: "Páginas", desc: "Encabezados y frases de cada página interna." },
];

export default async function Dashboard() {
  const session = await getSession();
  const first = session?.name?.split(" ")[0] || "";
  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight text-fg">Hola{first ? `, ${first}` : ""} 👋</h1>
      <p className="mt-1 text-sm text-muted">
        Editá el contenido del sitio desde acá. Los cambios se publican y aparecen en la web en aproximadamente un minuto.
      </p>

      <div className="mt-7 grid gap-4 sm:grid-cols-2">
        {CARDS.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="group rounded-xl border border-line2 bg-bg1 p-5 transition hover:border-brand"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-fg">{c.title}</h2>
              <span className="text-muted transition group-hover:translate-x-0.5 group-hover:text-brand">→</span>
            </div>
            <p className="mt-1 text-sm text-muted">{c.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
