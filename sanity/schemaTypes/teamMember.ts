import { defineField, defineType } from "sanity";

export const teamMember = defineType({
  name: "teamMember",
  title: "Integrante del equipo",
  type: "document",
  fields: [
    defineField({ name: "order", title: "Orden", type: "number", validation: (r) => r.required() }),
    defineField({ name: "name", title: "Nombre", type: "string", validation: (r) => r.required() }),
    defineField({ name: "role", title: "Rol", type: "string" }),
    defineField({ name: "bio", title: "Bio", type: "text", rows: 3 }),
    defineField({ name: "linkedin", title: "LinkedIn (URL)", type: "url" }),
    defineField({ name: "photo", title: "Foto", type: "image", options: { hotspot: true } }),
  ],
  orderings: [{ title: "Orden", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "role", media: "photo" } },
});
