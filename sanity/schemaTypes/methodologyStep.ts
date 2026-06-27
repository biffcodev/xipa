import { defineField, defineType } from "sanity";

export const methodologyStep = defineType({
  name: "methodologyStep",
  title: "Paso de metodología",
  type: "document",
  fields: [
    defineField({ name: "order", title: "Orden", type: "number", validation: (r) => r.required() }),
    defineField({ name: "badge", title: "Etiqueta (badge)", type: "string" }),
    defineField({ name: "title", title: "Título", type: "string", validation: (r) => r.required() }),
    defineField({ name: "text", title: "Texto", type: "text", rows: 3 }),
    defineField({ name: "image", title: "Imagen", type: "image", options: { hotspot: true } }),
  ],
  orderings: [{ title: "Orden", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "badge", media: "image" } },
});
