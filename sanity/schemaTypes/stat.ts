import { defineField, defineType } from "sanity";

export const stat = defineType({
  name: "stat",
  title: "Estadística (El problema)",
  type: "document",
  fields: [
    defineField({ name: "order", title: "Orden", type: "number", validation: (r) => r.required() }),
    defineField({ name: "value", title: "Número", type: "number", description: "Sólo el número (ej. 400). Se anima de 0 a este valor.", validation: (r) => r.required() }),
    defineField({ name: "unit", title: "Unidad", type: "string", description: "Ej. Mt, %, años" }),
    defineField({ name: "label", title: "Etiqueta", type: "string" }),
    defineField({ name: "desc", title: "Descripción", type: "text", rows: 2 }),
  ],
  orderings: [{ title: "Orden", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "label", subtitle: "value" } },
});
