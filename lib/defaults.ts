/* Single source of truth for the site's content.
   - The components render from here when Sanity has no data (fallback), so the
     site always works even before the CMS is wired/seeded.
   - The seed script (scripts/seed.ts) reads from here to populate Sanity.
   Image fields here are local paths under /public; in Sanity they become
   uploaded image assets. */

export type ImgRef = string; // local path fallback; Sanity returns an image object

export const siteSettings = {
  brand: "XIPA",
  whatsappUrl: "https://wa.me/5493512550067",
  whatsappLabel: "WhatsApp +54 351 2550067 ↗",
  instagram: "https://instagram.com/xipa.ok",
  linkedin: "https://www.linkedin.com/company/xipa-s-a",
  youtube: "https://www.youtube.com/channel/UCVbcT6h5xlVJE-UPdggeq9Q",
  addressLines: ["Río de Janeiro 137", "Villa Allende, Córdoba", "Argentina"],
  hours: "Lunes a viernes · 9:00 – 18:00 h",
  mapCoords: "31.29° S · 64.29° O",
  mapQuery: "Xipa Villa Allende Córdoba",
  footerCtaLine1: "Hablemos de tu",
  footerCtaLine2: "próximo proyecto.",
  copyright: "© 2026 Xipa · Re-Evolucionemos el plástico",
};

export const homeContent = {
  heroSlides: [
    { image: "/images/hero-productos.jpg", eyebrow: "Ecodiseño · Economía Circular", line1: "Evolucionemos", line2: "el plástico.", paragraph: "Brindamos soluciones de ecodiseño para reducir, rediseñar, repensar y reutilizar." },
    { image: "/images/hero-circular.jpg", eyebrow: "Economía Circular", line1: "De residuos", line2: "a recursos.", paragraph: "Cerramos el ciclo: lo que hoy se descarta, mañana es la materia prima de un nuevo producto." },
    { image: "/images/hero-diseno.jpg", eyebrow: "Investigación + Diseño", line1: "Repensamos", line2: "desde el origen.", paragraph: "Diseñamos productos y envases que nacen del residuo, con materiales trazables e impacto medible." },
  ],
  railOutro: { eyebrow: "Y muchos más", line1: "7 proyectos.", line2: "Un mismo propósito.", paragraph: "Cafezazo, Cosquín Rock, Seguridad vial, Abre Baldes y lo que viene." },
  choice: {
    titlePlain: "Hoy, tenemos ", titleBold: "una elección.",
    lineal: [
      { label: "Producción global", stat: "400Mt", desc: "de plástico se producen cada año" },
      { label: "Un solo uso", stat: "50%", desc: "del plástico es descartable" },
      { label: "Reciclaje real", stat: "9%", desc: "del plástico se recicla efectivamente" },
      { label: "Océanos", stat: "11Mt", desc: "llegan al mar cada año" },
      { label: "Permanencia", stat: "500", desc: "años tarda en degradarse una botella" },
      { label: "Telgopor", stat: "+1000", desc: "años persiste el poliestireno expandido" },
      { label: "Microplásticos", stat: "5g", desc: "ingerimos por semana, ≈ una tarjeta" },
      { label: "Destino final", stat: "79%", desc: "del plástico termina en vertederos" },
    ],
    circular: [
      { label: "Materia prima", stat: "100%", desc: "reciclada y con trazabilidad" },
      { label: "Reciclabilidad", stat: "100%", desc: "monomaterial, totalmente reciclable" },
      { label: "Reutilización", stat: "∞", desc: "ciclos en productos reutilizables" },
      { label: "Origen", stat: "Local", desc: "proveedores y producción local" },
      { label: "Impresión", stat: "Agua", desc: "tintas al agua, sin solventes" },
      { label: "Residuos", stat: "→ Recursos", desc: "de basura a materia prima" },
      { label: "Huella", stat: "−CO₂", desc: "menos kilos de CO₂ emitidos" },
      { label: "Diseño", stat: "+ Vida", desc: "productos pensados para durar" },
    ],
  },
  stats: { eyebrow: "El problema", line1: "Los números que", line2: "no podemos ignorar.", hint: "Tocá un dato para reproducir" },
  manifesto: {
    eyebrow: "El manifiesto",
    words: [
      { text: "Reducir.", color: "brand" }, { text: "Rediseñar.", color: "brand2" },
      { text: "Repensar.", color: "brand3" }, { text: "Reutilizar.", color: "fg" },
    ],
    sub: "Cuatro principios, una misión.",
    body: "Inspirarnos con otros para re-evolucionar el plástico y convertirlo en una oportunidad para el planeta.",
  },
  methodologyIntro: { eyebrow: "Metodología", titlePlain: "Cómo ", titleBold: "trabajamos.", sub: "Un proceso circular: cada paso conecta con el siguiente para convertir el residuo en un nuevo recurso." },
  teamIntro: { titlePlain: "El ", titleBold: "equipo.", sub: "Tocá un integrante para conocer más · diseño, materiales y comunicación para la economía circular." },
  newsletter: { eyebrow: "Newsletter", line1: "Sumate a la evolución", line2: "del plástico.", paragraph: "Novedades de ecodiseño, economía circular y nuevos proyectos. Sin spam, solo lo que importa.", okText: "¡Gracias! Te sumaste a la newsletter.", privacy: "Al suscribirte aceptás nuestra política de privacidad." },
};

export const pillars = [
  { order: 1, title: "Reducir", image: "/images/pilar-reducir.jpg", text: "Reducimos el peso de los productos mediante mejoras técnicas en los materiales o eliminando elementos del envase." },
  { order: 2, title: "Rediseñar", image: "/images/pilar-redisenar.jpg", text: "Rediseñamos los productos para aumentar su capacidad, rendir más su contenido y mejorar los procesos involucrados." },
  { order: 3, title: "Repensar", image: "/images/pilar-repensar.jpg", text: "Incorporamos material reciclado en nuevos productos, con piezas fácilmente separables y compatibles para el reciclado." },
  { order: 4, title: "Reutilizar", image: "/images/pilar-reutilizar.jpg", text: "Sustituimos productos de un solo uso por reutilizables y mejoramos sus características para alargar su vida útil." },
];

export const stats = [
  { order: 1, value: 400, unit: "Mt", label: "Producción global", desc: "de plástico se producen cada año en el mundo" },
  { order: 2, value: 9, unit: "%", label: "Reciclaje real", desc: "del plástico producido se recicla realmente" },
  { order: 3, value: 11, unit: "Mt", label: "Contaminación", desc: "de plástico llegan al océano cada año" },
  { order: 4, value: 500, unit: "años", label: "Degradación", desc: "tarda en descomponerse una botella plástica" },
  { order: 5, value: 79, unit: "%", label: "Destino final", desc: "termina en vertederos o en el ambiente" },
];

export const team = [
  { order: 1, slot: "team-alejandro", name: "Alejandro Romano Rusiñol", role: "Fundador", bio: "Lidera Xipa con la misión de re-evolucionar el plástico desde el ecodiseño y la economía circular.", linkedin: "https://www.linkedin.com/in/alejandroromanorusiñol", image: "/images/slots/team-alejandro.webp" },
  { order: 2, slot: "team-melina", name: "Melina Lerda", role: "Co-líder", bio: "Coordina proyectos y alianzas para escalar soluciones de economía circular con marcas y eventos.", linkedin: "https://www.linkedin.com/in/melina-lerda/", image: "/images/slots/team-melina.webp" },
  { order: 3, slot: "team-lucia", name: "Lucía Ferre Cinelli", role: "Ecodiseño", bio: "Diseña productos y envases que nacen del residuo, aplicando ecodiseño en cada detalle.", linkedin: "https://www.linkedin.com/in/lucia-v-ferre-cinelli/", image: "/images/slots/team-lucia.webp" },
  { order: 4, slot: "team-delfina", name: "Delfina Romano", role: "Comunicación e imagen", bio: "Cuenta la historia de cada proyecto y construye la identidad de la marca Xipa.", linkedin: "https://www.linkedin.com/in/delfina-romano-2b0b84180/", image: "/images/slots/team-delfina.webp" },
];

export const methodologySteps = [
  { order: 1, badge: "Reducir · Rediseñar", title: "Ecodiseño de envases y productos", text: "Repensamos el producto desde su origen: menos material, más vida útil y pensado para volver a empezar.", image: "/images/slots/proc-1.webp" },
  { order: 2, badge: "I+D+i", title: "Investigación y desarrollo", text: "De la idea a una solución viable: investigamos materiales, validamos hipótesis y desarrollamos el diseño.", image: "/images/slots/proc-2.webp" },
  { order: 3, badge: "Prototipo", title: "Matricería y prototipado", text: "Materializamos el diseño con precisión: matrices, moldes y prototipos funcionales listos para producir.", image: "/images/slots/proc-3.webp" },
  { order: 4, badge: "100% reciclado", title: "Producción con material reciclado", text: "Producimos con materia prima reciclada, trazable y local. Tintas al agua y monomaterial para reciclar otra vez.", image: "/images/slots/proc-4.webp" },
  { order: 5, badge: "Circular", title: "Consultoría en economía circular", text: "Acompañamos a marcas y eventos a cerrar el ciclo: de residuos a recursos, con impacto medible.", image: "/images/slots/proc-5.webp" },
];

export const pages = {
  oportunidad: {
    hero: { image: "/images/hero-circular.jpg", eyebrow: "Oportunidad", line1: "Re-evolucionar el plástico", line2: "es la oportunidad.", subtitle: "Cuatro soluciones de ecodiseño para convertir un problema global en valor para las empresas y el planeta." },
    statement: { plain: "Cada residuo es una ", bold: "oportunidad de diseño." },
  },
  metodologia: {
    hero: { image: "/images/hero-diseno.jpg", eyebrow: "Metodología", line1: "Un proceso circular:", line2: "cómo trabajamos.", subtitle: "Cada paso conecta con el siguiente para convertir el residuo en un nuevo recurso." },
    statement: { plain: "Del residuo al recurso, ", bold: "paso a paso." },
  },
  equipo: {
    hero: { image: "/images/hero-diseno.jpg", eyebrow: "Equipo", line1: "Diseño, materiales y comunicación", line2: "para la economía circular.", subtitle: "Un equipo cordobés que convierte el residuo plástico en una oportunidad para el planeta." },
    statement: { plain: "Detrás de cada proyecto, ", bold: "personas." },
  },
  proyectos: {
    hero: { image: "/images/hero-productos.jpg", eyebrow: "Proyectos", line1: "De residuos a recursos,", line2: "caso por caso.", subtitle: "Cada proyecto es una prueba de que el plástico puede tener una segunda vida a través del ecodiseño." },
    statement: { plain: "", bold: "" },
  },
  contacto: {
    hero: { image: "", eyebrow: "Contacto", line1: "Dejanos tu mensaje", line2: "y te respondemos.", subtitle: "Contanos sobre tu producto, envase o evento. Buscamos juntos la solución de ecodiseño que mejor encaje." },
    statement: { plain: "", bold: "" },
  },
};
