import { defineArrayMember, defineField, defineType } from "sanity";

const card = (name: string, title: string) =>
  defineField({
    name, title, type: "array",
    of: [defineArrayMember({
      type: "object",
      fields: [
        defineField({ name: "label", title: "Etiqueta", type: "string" }),
        defineField({ name: "stat", title: "Dato", type: "string" }),
        defineField({ name: "desc", title: "Descripción", type: "string" }),
      ],
      preview: { select: { title: "label", subtitle: "stat" } },
    })],
  });

export const homePage = defineType({
  name: "homePage",
  title: "Home",
  type: "document",
  fields: [
    defineField({
      name: "heroSlides", title: "Slider del hero", type: "array",
      of: [defineArrayMember({
        type: "object",
        fields: [
          defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
          defineField({ name: "line1", title: "Línea 1 (fina)", type: "string" }),
          defineField({ name: "line2", title: "Línea 2 (bold)", type: "string" }),
          defineField({ name: "paragraph", title: "Párrafo", type: "text", rows: 2 }),
          defineField({ name: "image", title: "Imagen", type: "image", options: { hotspot: true } }),
        ],
        preview: { select: { title: "line2", subtitle: "eyebrow", media: "image" } },
      })],
    }),
    defineField({
      name: "railOutro", title: "Proyectos — placa final ('Y muchos más')", type: "object",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
        defineField({ name: "line1", title: "Línea 1 (fina)", type: "string" }),
        defineField({ name: "line2", title: "Línea 2 (bold)", type: "string" }),
        defineField({ name: "paragraph", title: "Párrafo", type: "text", rows: 2 }),
      ],
    }),
    defineField({
      name: "choice", title: "Sección Lineal vs Circular", type: "object",
      fields: [
        defineField({ name: "titlePlain", title: "Título (fino)", type: "string" }),
        defineField({ name: "titleBold", title: "Título (bold)", type: "string" }),
        card("lineal", "Tarjetas — Economía lineal"),
        card("circular", "Tarjetas — Economía circular"),
      ],
    }),
    defineField({
      name: "stats", title: "Sección 'El problema' (intro)", type: "object",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
        defineField({ name: "line1", title: "Línea 1 (fina)", type: "string" }),
        defineField({ name: "line2", title: "Línea 2 (bold)", type: "string" }),
        defineField({ name: "hint", title: "Texto chico", type: "string" }),
      ],
    }),
    defineField({
      name: "manifesto", title: "Manifiesto", type: "object",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
        defineField({
          name: "words", title: "Palabras (con color)", type: "array",
          of: [defineArrayMember({
            type: "object",
            fields: [
              defineField({ name: "text", title: "Palabra", type: "string" }),
              defineField({ name: "color", title: "Color", type: "string", options: { list: ["brand", "brand2", "brand3", "fg"] }, initialValue: "brand" }),
            ],
            preview: { select: { title: "text", subtitle: "color" } },
          })],
        }),
        defineField({ name: "sub", title: "Subtítulo", type: "string" }),
        defineField({ name: "body", title: "Frase", type: "text", rows: 2 }),
      ],
    }),
    defineField({
      name: "methodologyIntro", title: "Metodología (intro del home)", type: "object",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
        defineField({ name: "titlePlain", title: "Título (fino)", type: "string" }),
        defineField({ name: "titleBold", title: "Título (bold)", type: "string" }),
        defineField({ name: "sub", title: "Subtítulo", type: "text", rows: 2 }),
      ],
    }),
    defineField({
      name: "teamIntro", title: "Equipo (intro del home)", type: "object",
      fields: [
        defineField({ name: "titlePlain", title: "Título (fino)", type: "string" }),
        defineField({ name: "titleBold", title: "Título (bold)", type: "string" }),
        defineField({ name: "sub", title: "Subtítulo", type: "text", rows: 2 }),
      ],
    }),
    defineField({
      name: "newsletter", title: "Newsletter", type: "object",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
        defineField({ name: "line1", title: "Línea 1 (fina)", type: "string" }),
        defineField({ name: "line2", title: "Línea 2 (bold)", type: "string" }),
        defineField({ name: "paragraph", title: "Párrafo", type: "text", rows: 2 }),
        defineField({ name: "okText", title: "Mensaje de éxito", type: "string" }),
        defineField({ name: "privacy", title: "Texto de privacidad", type: "string" }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Home" }) },
});
