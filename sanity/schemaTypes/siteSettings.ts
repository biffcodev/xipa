import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Configuración del sitio",
  type: "document",
  fields: [
    defineField({ name: "brand", title: "Marca", type: "string", initialValue: "XIPA" }),
    defineField({ name: "whatsappUrl", title: "WhatsApp (URL wa.me)", type: "url" }),
    defineField({ name: "whatsappLabel", title: "WhatsApp (texto en footer)", type: "string" }),
    defineField({ name: "instagram", title: "Instagram (URL)", type: "url" }),
    defineField({ name: "linkedin", title: "LinkedIn (URL)", type: "url" }),
    defineField({ name: "youtube", title: "YouTube (URL)", type: "url" }),
    defineField({ name: "addressLines", title: "Dirección (una línea por renglón)", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "hours", title: "Horario", type: "string" }),
    defineField({ name: "mapCoords", title: "Coordenadas (texto del mapa)", type: "string" }),
    defineField({ name: "mapQuery", title: "Mapa — búsqueda de Google Maps", type: "string", description: "Texto para 'Cómo llegar', ej. Xipa Villa Allende Córdoba" }),
    defineField({ name: "footerCtaLine1", title: "Footer CTA — línea 1 (fina)", type: "string" }),
    defineField({ name: "footerCtaLine2", title: "Footer CTA — línea 2 (bold)", type: "string" }),
    defineField({ name: "copyright", title: "Copyright", type: "string" }),
  ],
  preview: { prepare: () => ({ title: "Configuración del sitio" }) },
});
