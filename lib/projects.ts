export type Project = {
  slug: string;
  tag: string;
  title: string;
  subtitle: string;
  intro: { lead: string; body: string };
  meta: { cliente: string; anio: string; rol: string; pilares: string };
  desafio: string;
  solucion: string;
  proceso: { n: string; title: string; text: string }[];
  impacto: { stat: string; text: string }[];
  ficha: { k: string; v: string }[];
};

export const PROJECTS: Project[] = [
  {
    slug: "grido",
    tag: "Envase reutilizable",
    title: "Grido",
    subtitle: "El primer envase recargable de helados del mundo.",
    intro: {
      lead: "Convertimos el envase de helado más vendido de Argentina en un sistema que vuelve, se lava y se recarga.",
      body: "Combinamos diseño industrial, logística inversa y un cambio de hábito en el punto de venta: el cliente devuelve el envase y recibe un beneficio, cerrando el ciclo en cada compra.",
    },
    meta: { cliente: "Grido", anio: "2024", rol: "Ecodiseño · Logística inversa", pilares: "Reducir · Rediseñar" },
    desafio: "El pote de telgopor es liviano y aislante, pero se usa una sola vez y termina como residuo no reciclable. Reemplazarlo exigía mantener la performance térmica y adaptarse a una cadena con miles de locales.",
    solucion: "Diseñamos un envase reutilizable, retornable y lavable, en material reciclado y monomaterial para reciclarse al final de su vida. Un sistema de recarga que premia a quien devuelve.",
    proceso: [
      { n: "01", title: "Comprás", text: "Llevás tu helado en el envase recargable." },
      { n: "02", title: "Disfrutás", text: "Lo usás en casa, conserva el frío." },
      { n: "03", title: "Devolvés", text: "Lo traés de vuelta al local." },
      { n: "04", title: "Recargás", text: "Se lava, se higieniza y vuelve a empezar." },
    ],
    impacto: [
      { stat: "1°", text: "envase recargable de helados del mundo" },
      { stat: "−Telgopor", text: "menos descartables por compra" },
      { stat: "100%", text: "reciclable al final de su vida" },
    ],
    ficha: [
      { k: "Material", v: "Plástico reciclado monomaterial" },
      { k: "Usos", v: "Cientos de ciclos" },
      { k: "Higiene", v: "Apto contacto alimentario" },
      { k: "Fin de vida", v: "100% reciclable" },
    ],
  },
  {
    slug: "revasos",
    tag: "Reutilizables",
    title: "Re-vasos",
    subtitle: "Vasos 100% reutilizables, reciclados y reciclables.",
    intro: {
      lead: "Sacamos de la ecuación al vaso descartable, con un producto pensado para durar cientos de usos y volver a empezar.",
      body: "Cada vaso reemplaza decenas de descartables a lo largo de su vida útil, y al final de su ciclo vuelve a ser materia prima. Monomaterial, trazable e impreso con tintas al agua.",
    },
    meta: { cliente: "Xipa", anio: "2022", rol: "Producto · Producción", pilares: "Reutilizar" },
    desafio: "Los eventos generan toneladas de vasos de un solo uso. Hacía falta una alternativa robusta, higiénica y económica adoptable a gran escala.",
    solucion: "Un vaso monomaterial con materia prima reciclada y trazable, lavable y reutilizable cientos de veces, y reciclable al final de su ciclo.",
    proceso: [
      { n: "01", title: "Materia reciclada", text: "Partimos de plástico recuperado y trazable." },
      { n: "02", title: "Producción local", text: "Fabricación e impresión al agua en Córdoba." },
      { n: "03", title: "Cientos de usos", text: "Lavado y reutilización evento tras evento." },
    ],
    impacto: [
      { stat: "∞", text: "ciclos de reutilización" },
      { stat: "Agua", text: "tintas sin solventes" },
      { stat: "100%", text: "reciclado y reciclable" },
    ],
    ficha: [
      { k: "Material", v: "Monomaterial reciclado" },
      { k: "Impresión", v: "Tintas al agua" },
      { k: "Reutilización", v: "Cientos de ciclos" },
      { k: "Reciclable", v: "Sí" },
    ],
  },
  {
    slug: "bio4",
    tag: "Industria",
    title: "BIO 4",
    subtitle: "Matriz desulfurizadora para bioetanol y economía circular.",
    intro: {
      lead: "Llevamos el ecodiseño a la industria del bioetanol con una matriz desulfurizadora de origen local.",
      body: "Un componente industrial clave, diseñado para durar y para integrarse en un esquema de mejora continua que reduce residuos y dependencia de insumos importados.",
    },
    meta: { cliente: "BIO 4", anio: "2020", rol: "I+D+i · Matricería", pilares: "Repensar" },
    desafio: "Los procesos industriales dependen de insumos importados y de un solo uso. El reto era diseñar una pieza clave, durable y de origen local, dentro de un esquema circular.",
    solucion: "Desarrollamos la matriz con materiales recuperados y proveedores de la región, en un ciclo de mejora continua que reduce residuos y dependencia externa.",
    proceso: [
      { n: "01", title: "Diagnóstico", text: "Relevamos el proceso y sus puntos críticos." },
      { n: "02", title: "Diseño", text: "Definimos la matriz con material recuperado." },
      { n: "03", title: "Validación", text: "Probamos rendimiento y durabilidad." },
    ],
    impacto: [
      { stat: "Local", text: "proveedores y producción regional" },
      { stat: "Circular", text: "desarrollo en mejora continua" },
      { stat: "−Residuos", text: "menos descarte en el proceso" },
    ],
    ficha: [
      { k: "Sector", v: "Bioetanol / energía" },
      { k: "Origen", v: "Proveedores locales" },
      { k: "Material", v: "Recuperado / reciclado" },
      { k: "Enfoque", v: "Mejora continua" },
    ],
  },
  {
    slug: "cafezazo",
    tag: "Eventos",
    title: "Cafezazo",
    subtitle: "Un evento de café de especialidad sin descartables.",
    intro: {
      lead: "Hicimos que un evento masivo de café de especialidad funcionara completamente sin descartables.",
      body: "Integrando a baristas y público en una dinámica circular simple y visible, demostramos que un evento de escala puede operar con cero descartables.",
    },
    meta: { cliente: "Cafezazo", anio: "2023", rol: "Sistema · Logística", pilares: "Reutilizar" },
    desafio: "Servir miles de cafés en un día genera una montaña de descartables. Había que sostener la agilidad del servicio sin comprometer la experiencia.",
    solucion: "Implementamos un sistema de Re-vasos con logística de lavado y retorno, integrando a baristas y público en una dinámica circular simple.",
    proceso: [
      { n: "01", title: "Entrega", text: "El público recibe su Re-vaso al ingresar." },
      { n: "02", title: "Estaciones", text: "Recarga de café en cada barra." },
      { n: "03", title: "Retorno", text: "Devolución, lavado y reúso en el día." },
    ],
    impacto: [
      { stat: "0", text: "vasos descartables en el evento" },
      { stat: "Re-vasos", text: "reutilizables en cada estación" },
      { stat: "+Conciencia", text: "público parte del ciclo" },
    ],
    ficha: [
      { k: "Formato", v: "Café de especialidad" },
      { k: "Descartables", v: "Cero" },
      { k: "Sistema", v: "Re-vasos retornables" },
      { k: "Logística", v: "Lavado in situ" },
    ],
  },
  {
    slug: "cosquin",
    tag: "Eventos",
    title: "Cosquín Rock",
    subtitle: "Decantador de vinos 100% reutilizable para recitales.",
    intro: {
      lead: "Diseñamos un decantador de vinos reutilizable: una alternativa segura al vidrio en un contexto masivo.",
      body: "Un objeto irrompible que eleva la experiencia del consumo responsable de vino en festivales, sin los riesgos del vidrio ni los residuos del descartable.",
    },
    meta: { cliente: "Cosquín Rock", anio: "2023", rol: "Producto · Evento", pilares: "Reutilizar" },
    desafio: "El vidrio está prohibido en recitales por seguridad, pero los descartables tradicionales arruinan la experiencia del vino y generan residuos.",
    solucion: "Un decantador irrompible, reutilizable y reciclable, que eleva la experiencia del vino en festivales.",
    proceso: [
      { n: "01", title: "Diseño", text: "Forma que realza aroma y servicio." },
      { n: "02", title: "Material", text: "Irrompible, apto para multitudes." },
      { n: "03", title: "Reúso", text: "Se lava y vuelve al próximo evento." },
    ],
    impacto: [
      { stat: "100%", text: "reutilizable y seguro" },
      { stat: "0", text: "vidrio en el predio" },
      { stat: "+Experiencia", text: "vino bien servido" },
    ],
    ficha: [
      { k: "Contexto", v: "Festival masivo" },
      { k: "Seguridad", v: "Sin vidrio" },
      { k: "Reutilizable", v: "100%" },
      { k: "Reciclable", v: "Sí" },
    ],
  },
  {
    slug: "vial",
    tag: "Comunidad",
    title: "Seguridad vial",
    subtitle: "Productos viales 100% reciclados: de basura a seguridad.",
    intro: {
      lead: "Transformamos residuo plástico en una línea de productos para la seguridad vial.",
      body: "Cada producto vial da un nuevo destino útil al plástico recuperado, demostrando que el residuo puede convertirse en infraestructura que cuida a las personas.",
    },
    meta: { cliente: "Comunidad", anio: "2022", rol: "Producto · Reciclado", pilares: "Repensar · Reutilizar" },
    desafio: "Los elementos viales suelen fabricarse con plástico virgen. Buscábamos cerrar el ciclo usando material recuperado sin perder resistencia.",
    solucion: "Una línea de productos viales fabricados 100% con plástico reciclado, durables y reciclables, que dan nuevo destino al residuo.",
    proceso: [
      { n: "01", title: "Recolección", text: "Recuperamos plástico en desuso." },
      { n: "02", title: "Procesado", text: "Limpieza y transformación en materia prima." },
      { n: "03", title: "Producto vial", text: "Piezas resistentes para la vía pública." },
    ],
    impacto: [
      { stat: "100%", text: "plástico reciclado" },
      { stat: "+Seguridad", text: "en calles y rutas" },
      { stat: "Circular", text: "residuo convertido en recurso" },
    ],
    ficha: [
      { k: "Material", v: "100% plástico reciclado" },
      { k: "Aplicación", v: "Seguridad vial" },
      { k: "Durabilidad", v: "Alta, intemperie" },
      { k: "Reciclable", v: "Sí" },
    ],
  },
  {
    slug: "baldes",
    tag: "Industria",
    title: "Abre Baldes",
    subtitle: "Sistema circular para la industria de la pintura.",
    intro: {
      lead: "Revalorizamos los baldes de pintura en desuso con un sistema que los reincorpora como recurso.",
      body: "Separamos, limpiamos y reincorporamos el material, cerrando el ciclo de una industria que históricamente descartaba sus envases.",
    },
    meta: { cliente: "Industria de la pintura", anio: "2024", rol: "Sistema circular", pilares: "Repensar" },
    desafio: "Los baldes de pintura quedan fuera de circuito por restos de producto y mezcla de materiales, dificultando su reciclado.",
    solucion: "Un sistema de recuperación y revalorización que separa, limpia y reincorpora el material, cerrando el ciclo de la industria de la pintura.",
    proceso: [
      { n: "01", title: "Acopio", text: "Recuperamos baldes en desuso." },
      { n: "02", title: "Acondicionado", text: "Separación y limpieza del material." },
      { n: "03", title: "Revalorización", text: "Reingreso como materia prima." },
    ],
    impacto: [
      { stat: "Circular", text: "sistema de recuperación" },
      { stat: "−Residuos", text: "baldes fuera del descarte" },
      { stat: "Local", text: "logística y proceso regional" },
    ],
    ficha: [
      { k: "Sector", v: "Industria de la pintura" },
      { k: "Insumo", v: "Baldes en desuso" },
      { k: "Proceso", v: "Separar · limpiar · reincorporar" },
      { k: "Origen", v: "Logística regional" },
    ],
  },
];

export const getProject = (slug: string) => PROJECTS.find((p) => p.slug === slug);
export const projectSlugs = PROJECTS.map((p) => p.slug);
export function adjacent(slug: string) {
  const i = PROJECTS.findIndex((p) => p.slug === slug);
  const len = PROJECTS.length;
  return { prev: PROJECTS[(i - 1 + len) % len], next: PROJECTS[(i + 1) % len] };
}
