import { defineField, defineType } from "sanity";

export const page = defineType({
  name: "page",
  title: "Página (subpágina)",
  type: "document",
  fields: [
    defineField({
      name: "pageKey", title: "Clave de página", type: "string",
      options: { list: ["oportunidad", "metodologia", "equipo", "proyectos", "contacto"] },
      validation: (r) => r.required(),
    }),
    defineField({ name: "title", title: "Nombre (interno)", type: "string" }),
    defineField({
      name: "hero", title: "Hero", type: "object",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
        defineField({ name: "line1", title: "Línea 1 (fina)", type: "string" }),
        defineField({ name: "line2", title: "Línea 2 (bold)", type: "string" }),
        defineField({ name: "subtitle", title: "Subtítulo", type: "text", rows: 2 }),
        defineField({ name: "image", title: "Imagen de fondo", type: "image", options: { hotspot: true }, description: "No aplica a Contacto." }),
      ],
    }),
    defineField({
      name: "statement", title: "Frase (statement)", type: "object",
      description: "Sólo para Oportunidad / Metodología / Equipo.",
      fields: [
        defineField({ name: "plain", title: "Parte fina", type: "string" }),
        defineField({ name: "bold", title: "Parte bold", type: "string" }),
      ],
    }),
  ],
  preview: { select: { title: "title", subtitle: "pageKey" } },
});
