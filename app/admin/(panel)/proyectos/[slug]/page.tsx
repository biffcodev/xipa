import { notFound } from "next/navigation";
import DocEditor, { type Block } from "@/components/admin/DocEditor";
import { getDoc } from "@/lib/admin/store";
import { PROJECTS } from "@/lib/projects";

export const dynamic = "force-dynamic";

const blocks: Block[] = [
  { type: "group", label: "Datos principales", fields: [
    { name: "title", label: "Título", type: "text" },
    { name: "tag", label: "Etiqueta (categoría)", type: "text" },
    { name: "subtitle", label: "Subtítulo", type: "textarea" },
  ] },
  { type: "group", label: "Imágenes principales", fields: [
    { name: "heroImage", label: "Imagen de portada (lista de proyectos)", type: "image" },
    { name: "featuredImage", label: "Imagen destacada (dentro del proyecto)", type: "image" },
  ] },
  { type: "imageList", name: "gallery", label: "Galería de imágenes", help: "Imágenes extra que se muestran en el proyecto." },
  { type: "group", label: "Introducción", fields: [
    { name: "intro.lead", label: "Texto principal", type: "textarea" },
    { name: "intro.body", label: "Texto secundario", type: "textarea" },
  ] },
  { type: "group", label: "Ficha (datos del proyecto)", fields: [
    { name: "meta.cliente", label: "Cliente", type: "text" },
    { name: "meta.anio", label: "Año", type: "text" },
    { name: "meta.rol", label: "Rol", type: "text" },
    { name: "meta.pilares", label: "Pilares", type: "text" },
  ] },
  { type: "group", label: "Desafío y solución", fields: [
    { name: "desafio", label: "El desafío", type: "textarea" },
    { name: "solucion", label: "La solución", type: "textarea" },
  ] },
  { type: "array", name: "proceso", label: "Proceso (pasos)", itemTitle: "Paso", itemFields: [
    { name: "n", label: "Número", type: "text" },
    { name: "title", label: "Título", type: "text" },
    { name: "text", label: "Texto", type: "textarea" },
  ] },
  { type: "array", name: "impacto", label: "Impacto", itemTitle: "Dato", itemFields: [
    { name: "stat", label: "Número/dato", type: "text" },
    { name: "text", label: "Texto", type: "text" },
  ] },
  { type: "array", name: "ficha", label: "Ficha técnica", itemTitle: "Fila", itemFields: [
    { name: "k", label: "Clave", type: "text" },
    { name: "v", label: "Valor", type: "text" },
  ] },
];

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const fallback = PROJECTS.find((p) => p.slug === slug);
  if (!fallback) notFound();
  const doc = await getDoc(`project-${slug}`);
  const data = {
    ...fallback,
    ...(doc || {}),
    _id: `project-${slug}`,
    _type: "project",
    slug: { _type: "slug", current: slug },
  };
  return (
    <DocEditor
      doc={data as never}
      title={`Proyecto: ${fallback.title}`}
      intro="Editá todos los contenidos de este proyecto."
      viewHref={`/proyectos/${slug}`}
      blocks={blocks}
    />
  );
}
