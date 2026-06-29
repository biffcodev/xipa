import DocEditor, { type Block } from "@/components/admin/DocEditor";
import { getDoc } from "@/lib/admin/store";
import { homeContent as defaults } from "@/lib/defaults";

export const dynamic = "force-dynamic";

const blocks: Block[] = [
  {
    type: "array",
    name: "heroSlides",
    label: "Slider del hero",
    itemTitle: "Slide",
    help: "Las diapositivas grandes del inicio. Se muestran en orden.",
    itemFields: [
      { name: "image", label: "Imagen de fondo", type: "image" },
      { name: "eyebrow", label: "Antetítulo", type: "text" },
      { name: "line1", label: "Título — línea 1", type: "text" },
      { name: "line2", label: "Título — línea 2", type: "text" },
      { name: "paragraph", label: "Párrafo", type: "textarea" },
    ],
  },
  {
    type: "group",
    label: "Proyectos — placa final ('Y muchos más')",
    fields: [
      { name: "railOutro.eyebrow", label: "Antetítulo", type: "text" },
      { name: "railOutro.line1", label: "Línea 1", type: "text" },
      { name: "railOutro.line2", label: "Línea 2", type: "text" },
      { name: "railOutro.paragraph", label: "Párrafo", type: "textarea" },
    ],
  },
  {
    type: "group",
    label: "Sección 'una elección' — títulos",
    fields: [
      { name: "choice.titlePlain", label: "Título (parte normal)", type: "text" },
      { name: "choice.titleBold", label: "Título (parte en negrita)", type: "text" },
    ],
  },
  {
    type: "array",
    name: "choice.lineal",
    label: "Economía lineal (columna izquierda)",
    itemTitle: "Dato",
    itemFields: [
      { name: "label", label: "Etiqueta", type: "text" },
      { name: "stat", label: "Número/dato", type: "text" },
      { name: "desc", label: "Descripción", type: "text" },
    ],
  },
  {
    type: "array",
    name: "choice.circular",
    label: "Economía circular (columna derecha)",
    itemTitle: "Dato",
    itemFields: [
      { name: "label", label: "Etiqueta", type: "text" },
      { name: "stat", label: "Número/dato", type: "text" },
      { name: "desc", label: "Descripción", type: "text" },
    ],
  },
  {
    type: "group",
    label: "Estadísticas — encabezado",
    fields: [
      { name: "stats.eyebrow", label: "Antetítulo", type: "text" },
      { name: "stats.line1", label: "Línea 1", type: "text" },
      { name: "stats.line2", label: "Línea 2", type: "text" },
      { name: "stats.hint", label: "Texto de ayuda", type: "text" },
    ],
  },
  {
    type: "group",
    label: "Manifiesto",
    fields: [
      { name: "manifesto.eyebrow", label: "Antetítulo", type: "text" },
      { name: "manifesto.sub", label: "Subtítulo", type: "text" },
      { name: "manifesto.body", label: "Texto", type: "textarea" },
    ],
  },
  {
    type: "array",
    name: "manifesto.words",
    label: "Manifiesto — palabras destacadas",
    itemTitle: "Palabra",
    help: "Color: brand (naranja), brand2, brand3 o fg (color de texto).",
    itemFields: [
      { name: "text", label: "Palabra", type: "text" },
      { name: "color", label: "Color", type: "text" },
    ],
  },
  {
    type: "group",
    label: "Metodología — intro",
    fields: [
      { name: "methodologyIntro.eyebrow", label: "Antetítulo", type: "text" },
      { name: "methodologyIntro.titlePlain", label: "Título (parte normal)", type: "text" },
      { name: "methodologyIntro.titleBold", label: "Título (negrita)", type: "text" },
      { name: "methodologyIntro.sub", label: "Subtítulo", type: "textarea" },
    ],
  },
  {
    type: "group",
    label: "Equipo — intro",
    fields: [
      { name: "teamIntro.titlePlain", label: "Título (parte normal)", type: "text" },
      { name: "teamIntro.titleBold", label: "Título (negrita)", type: "text" },
      { name: "teamIntro.sub", label: "Subtítulo", type: "textarea" },
    ],
  },
  {
    type: "group",
    label: "Newsletter",
    fields: [
      { name: "newsletter.eyebrow", label: "Antetítulo", type: "text" },
      { name: "newsletter.line1", label: "Línea 1", type: "text" },
      { name: "newsletter.line2", label: "Línea 2", type: "text" },
      { name: "newsletter.paragraph", label: "Párrafo", type: "textarea" },
      { name: "newsletter.okText", label: "Mensaje de éxito", type: "text" },
      { name: "newsletter.privacy", label: "Texto de privacidad", type: "text" },
    ],
  },
];

export default async function Page() {
  const doc = await getDoc("homePage");
  const data = { ...defaults, ...(doc || {}), _id: "homePage", _type: "homePage" };
  return (
    <DocEditor
      doc={data}
      title="Home"
      intro="Todo lo que se ve en la portada del sitio."
      viewHref="/"
      blocks={blocks}
    />
  );
}
