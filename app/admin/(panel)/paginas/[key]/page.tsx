import { notFound } from "next/navigation";
import DocEditor, { type Block } from "@/components/admin/DocEditor";
import { getDoc } from "@/lib/admin/store";
import { pages as defaults } from "@/lib/defaults";

export const dynamic = "force-dynamic";

const LABELS: Record<string, string> = {
  oportunidad: "Oportunidad",
  metodologia: "Metodología",
  equipo: "Equipo",
  proyectos: "Proyectos",
  contacto: "Contacto",
};

const blocks: Block[] = [
  { type: "group", label: "Encabezado (hero)", fields: [
    { name: "hero.image", label: "Imagen de fondo", type: "image" },
    { name: "hero.eyebrow", label: "Antetítulo", type: "text" },
    { name: "hero.line1", label: "Título — línea 1", type: "text" },
    { name: "hero.line2", label: "Título — línea 2", type: "text" },
    { name: "hero.subtitle", label: "Subtítulo", type: "textarea" },
  ] },
  { type: "group", label: "Frase destacada", fields: [
    { name: "statement.plain", label: "Parte normal", type: "text" },
    { name: "statement.bold", label: "Parte en negrita", type: "text" },
  ] },
];

export default async function Page({ params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  const def = (defaults as Record<string, { hero: unknown; statement: unknown }>)[key];
  if (!def) notFound();
  const doc = (await getDoc(`page-${key}`)) as Record<string, unknown> | null;
  const data = {
    _id: `page-${key}`,
    _type: "page",
    pageKey: key,
    title: key,
    hero: doc?.hero ?? def.hero,
    statement: doc?.statement ?? def.statement,
  };
  const viewHref = key === "oportunidad" ? "/oportunidad" : `/${key}`;
  return <DocEditor doc={data} title={`Página: ${LABELS[key] || key}`} viewHref={viewHref} blocks={blocks} />;
}
