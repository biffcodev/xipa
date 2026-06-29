import CollectionList, { type ListItem } from "@/components/admin/CollectionList";

export const dynamic = "force-static";

const PAGES: { key: string; label: string }[] = [
  { key: "oportunidad", label: "Oportunidad" },
  { key: "metodologia", label: "Metodología" },
  { key: "equipo", label: "Equipo" },
  { key: "proyectos", label: "Proyectos" },
  { key: "contacto", label: "Contacto" },
];

export default function Page() {
  const items: ListItem[] = PAGES.map((p) => ({ href: `/admin/paginas/${p.key}`, title: p.label, sub: "Encabezado y frase" }));
  return <CollectionList title="Páginas" intro="Encabezado (hero) y frase destacada de cada página interna." items={items} />;
}
