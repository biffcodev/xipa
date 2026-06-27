import { defineArrayMember, defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Proyecto",
  type: "document",
  fields: [
    defineField({ name: "order", title: "Orden", type: "number", validation: (r) => r.required() }),
    defineField({ name: "title", title: "Título", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug (URL)", type: "slug", options: { source: "title", maxLength: 96 }, validation: (r) => r.required() }),
    defineField({ name: "tag", title: "Categoría / etiqueta", type: "string", description: "Ej. Envase reutilizable, Eventos, Industria…" }),
    defineField({ name: "subtitle", title: "Subtítulo (hero)", type: "text", rows: 2 }),
    defineField({ name: "heroImage", title: "Imagen de portada (hero/fondo)", type: "image", options: { hotspot: true } }),
    defineField({ name: "featuredImage", title: "Imagen destacada (16:9)", type: "image", options: { hotspot: true } }),
    defineField({
      name: "gallery", title: "Galería", type: "array",
      of: [defineArrayMember({ type: "image", options: { hotspot: true } })],
    }),
    defineField({
      name: "intro", title: "Intro", type: "object",
      fields: [
        defineField({ name: "lead", title: "Frase principal", type: "text", rows: 3 }),
        defineField({ name: "body", title: "Párrafo", type: "text", rows: 4 }),
      ],
    }),
    defineField({
      name: "meta", title: "Ficha rápida (sidebar)", type: "object",
      fields: [
        defineField({ name: "cliente", title: "Cliente", type: "string" }),
        defineField({ name: "anio", title: "Año", type: "string" }),
        defineField({ name: "rol", title: "Rol", type: "string" }),
        defineField({ name: "pilares", title: "Pilares", type: "string" }),
      ],
    }),
    defineField({ name: "desafio", title: "El desafío", type: "text", rows: 4 }),
    defineField({ name: "solucion", title: "La solución", type: "text", rows: 4 }),
    defineField({
      name: "proceso", title: "El proceso", type: "array",
      of: [defineArrayMember({
        type: "object",
        fields: [
          defineField({ name: "n", title: "Número", type: "string" }),
          defineField({ name: "title", title: "Título", type: "string" }),
          defineField({ name: "text", title: "Texto", type: "text", rows: 2 }),
        ],
        preview: { select: { title: "title", subtitle: "n" } },
      })],
    }),
    defineField({
      name: "impacto", title: "El impacto", type: "array",
      of: [defineArrayMember({
        type: "object",
        fields: [
          defineField({ name: "stat", title: "Dato", type: "string" }),
          defineField({ name: "text", title: "Texto", type: "string" }),
        ],
        preview: { select: { title: "stat", subtitle: "text" } },
      })],
    }),
    defineField({
      name: "ficha", title: "Ficha técnica", type: "array",
      of: [defineArrayMember({
        type: "object",
        fields: [
          defineField({ name: "k", title: "Campo", type: "string" }),
          defineField({ name: "v", title: "Valor", type: "string" }),
        ],
        preview: { select: { title: "k", subtitle: "v" } },
      })],
    }),
  ],
  orderings: [{ title: "Orden", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "tag", media: "heroImage" } },
});
