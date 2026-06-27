import { defineField, defineType } from "sanity";

export const pillar = defineType({
  name: "pillar",
  title: "Pilar (Reducir/Rediseñar/…)",
  type: "document",
  fields: [
    defineField({ name: "order", title: "Orden", type: "number", validation: (r) => r.required() }),
    defineField({ name: "title", title: "Título", type: "string", validation: (r) => r.required() }),
    defineField({ name: "text", title: "Texto", type: "text", rows: 3 }),
    defineField({ name: "image", title: "Imagen", type: "image", options: { hotspot: true } }),
  ],
  orderings: [{ title: "Orden", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "order", media: "image" } },
});
