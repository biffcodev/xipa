import DocEditor, { type Block } from "@/components/admin/DocEditor";
import { getDoc } from "@/lib/admin/store";
import { siteSettings as defaults } from "@/lib/defaults";

export const dynamic = "force-dynamic";

const blocks: Block[] = [
  { type: "group", label: "Marca", fields: [
    { name: "brand", label: "Nombre de la marca", type: "text" },
    { name: "copyright", label: "Texto de copyright", type: "text" },
  ] },
  { type: "group", label: "Contacto", fields: [
    { name: "whatsappUrl", label: "Link de WhatsApp", type: "url", help: "Ej: https://wa.me/549351..." },
    { name: "whatsappLabel", label: "Texto del botón de WhatsApp", type: "text" },
    { name: "hours", label: "Horario de atención", type: "text" },
  ] },
  { type: "group", label: "Redes sociales", fields: [
    { name: "instagram", label: "Instagram (link)", type: "url" },
    { name: "linkedin", label: "LinkedIn (link)", type: "url" },
    { name: "youtube", label: "YouTube (link)", type: "url" },
  ] },
  { type: "stringList", name: "addressLines", label: "Dirección", help: "Una línea por renglón." },
  { type: "group", label: "Mapa", fields: [
    { name: "mapCoords", label: "Coordenadas (texto)", type: "text" },
    { name: "mapQuery", label: "Búsqueda en el mapa", type: "text", help: "Lo que se busca en Google Maps." },
  ] },
  { type: "group", label: "Pie de página — llamado a la acción", fields: [
    { name: "footerCtaLine1", label: "Línea 1", type: "text" },
    { name: "footerCtaLine2", label: "Línea 2", type: "text" },
  ] },
];

export default async function Page() {
  const doc = await getDoc("siteSettings");
  const data = { ...defaults, ...(doc || {}), _id: "siteSettings", _type: "siteSettings" };
  return (
    <DocEditor
      doc={data}
      title="Configuración del sitio"
      intro="Datos generales que aparecen en el encabezado, el pie y la página de contacto."
      viewHref="/"
      blocks={blocks}
    />
  );
}
