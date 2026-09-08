// Sample data for the "Perspectivas" section (blog / insights).
// Skeleton content: coherent, on-brand sample articles about diseño sistémico,
// circularidad y valor de negocio. Shared by the index and the detail page.

export type PerspectivaCategory = "Perspectiva" | "Caso" | "Noticia";

export type Perspectiva = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: PerspectivaCategory;
  body: string[];
};

export const perspectivas: Perspectiva[] = [
  {
    slug: "el-problema-no-es-el-plastico",
    title: "El problema no es el plástico, es la mirada",
    excerpt: "Dejar de perseguir materiales y empezar a rediseñar el sistema que los produce.",
    date: "Mar 2026",
    category: "Perspectiva",
    body: [
      "Cada vez que aparece una foto de una playa cubierta de envases, la conversación se acomoda en el mismo lugar: el plástico es el enemigo. Es una historia cómoda porque tiene un culpable claro y una solución aparente, prohibirlo. Pero cuando uno mira de cerca, el material casi nunca es el verdadero problema.",
      "El plástico no llegó al mar por su cuenta. Llegó por un sistema que lo diseñó para durar siglos y usarlo durante minutos, por cadenas de logística que nunca previeron su retorno y por decisiones de negocio que trasladaron el costo ambiental a otro lado. Cambiar el material sin tocar ese sistema suele mover el problema de lugar, no resolverlo.",
      "El diseño sistémico propone correr el foco. En lugar de preguntar qué material usar, pregunta cómo circula el valor: quién produce, quién consume, quién recupera y qué incentivos hacen que todo eso cierre. Cuando esa pregunta se vuelve el centro, el material deja de ser una condena y pasa a ser una variable más que se puede rediseñar.",
      "No es una idea abstracta. Es la diferencia entre reemplazar un envase por otro igual de problemático y repensar por qué ese envase existe, cómo vuelve y qué vida tiene después. Ahí es donde empieza el trabajo interesante.",
    ],
  },
  {
    slug: "medir-para-mejorar",
    title: "Medir para mejorar: por qué sin datos no hay circularidad",
    excerpt: "La circularidad que no se mide se vuelve relato. Los indicadores la vuelven decisión.",
    date: "Feb 2026",
    category: "Perspectiva",
    body: [
      "Hablar de circularidad se volvió fácil. Demostrarla, mucho menos. La mayoría de las promesas ambientales se quedan en la intención porque nunca se traducen en algo que se pueda seguir en el tiempo: cuánto material se recupera, cuánta energía se ahorra, cuánto se evita mandar a disposición final.",
      "Sin datos, cada decisión se toma por intuición o por presión externa. Con datos, empieza a existir una conversación distinta, en la que un cambio de proveedor, de proceso o de diseño se puede evaluar por lo que realmente aporta y no por lo que suena bien en una presentación.",
      "Medir no es un trámite de compliance. Es la infraestructura que permite mejorar. Un indicador bien elegido muestra dónde se pierde valor, prioriza los esfuerzos y convierte la sustentabilidad en algo gestionable, con metas, responsables y revisiones.",
      "El desafío no es tener tableros llenos de números, sino elegir pocas métricas que importen y sostenerlas. Ahí la circularidad deja de ser un discurso y empieza a comportarse como cualquier otra área que la empresa toma en serio.",
    ],
  },
  {
    slug: "de-costo-a-valor",
    title: "De costo a valor: sustentabilidad que cierra en negocio",
    excerpt: "Cuando dejás de ver la sustentabilidad como un gasto, aparecen oportunidades que estaban ocultas.",
    date: "Feb 2026",
    category: "Perspectiva",
    body: [
      "En muchas empresas la sustentabilidad todavía vive en la columna de los costos. Es lo que hay que hacer para cumplir, para la foto o para evitar un problema reputacional. Mientras siga ahí, siempre va a competir en desventaja contra cualquier otra prioridad.",
      "El giro aparece cuando se la empieza a leer como una fuente de valor. Un material que vuelve es un material que no se compra dos veces. Un proceso más eficiente consume menos y produce menos merma. Un producto pensado para durar y repararse construye una relación más larga con quien lo usa.",
      "Ese cambio de encuadre no es maquillaje. Requiere trabajo de diseño, datos y a veces reformular el modelo de negocio. Pero cuando cierra, la sustentabilidad deja de pedir permiso y empieza a defenderse sola, con números.",
      "La pregunta que ordena todo esto es simple: dónde se está tirando valor. Casi siempre la respuesta señala oportunidades que estaban a la vista y que nadie miraba porque la sustentabilidad estaba archivada en el lugar equivocado.",
    ],
  },
  {
    slug: "diseno-sistemico-en-la-practica",
    title: "Diseño sistémico en la práctica: cómo empezar sin marearse",
    excerpt: "Pensar en sistemas no es pensar en todo a la vez. Es elegir bien por dónde entrar.",
    date: "Ene 2026",
    category: "Perspectiva",
    body: [
      "La palabra sistémico intimida. Suena a que hay que entender todo antes de tocar nada, y eso paraliza. En la práctica es lo contrario: se trata de aceptar que las partes están conectadas y, justamente por eso, elegir con cuidado por dónde empezar.",
      "El primer paso casi nunca es un rediseño total. Es mapear. Entender quiénes son los actores, qué flujos de materiales y de valor los conectan y en qué puntos el sistema pierde o se traba. Ese mapa, aunque sea imperfecto, ya cambia las decisiones.",
      "Después viene elegir una palanca: un punto donde una intervención acotada puede propagar efectos hacia el resto. No hace falta arreglar todo de una. Hace falta encontrar ese lugar donde el cambio rinde más de lo que cuesta.",
      "Pensar en sistemas, entonces, no es abarcar más. Es entender mejor para intervenir con precisión. La diferencia entre ambas cosas es la que separa un proyecto que se sostiene de uno que se agota en la buena intención.",
    ],
  },
  {
    slug: "revasos-caso-circularidad",
    title: "Re-vasos: circularidad que arranca en el evento",
    excerpt: "Un caso donde el vaso descartable dejó de ser basura para volverse parte del sistema.",
    date: "Dic 2025",
    category: "Caso",
    body: [
      "Un evento masivo genera montañas de vasos en pocas horas. La lógica habitual los trata como basura inevitable, un costo que se asume y se olvida apenas termina el show. El punto de partida de Re-vasos fue negarse a aceptar eso como un dato fijo.",
      "En lugar de reemplazar un descartable por otro, el trabajo consistió en diseñar el circuito completo: cómo se entrega el vaso, cómo se recupera, cómo se lava y cómo vuelve a estar disponible para el próximo uso. El material dejó de ser el centro de la discusión y pasó a serlo el recorrido.",
      "El resultado no fue solo menos residuos. Fue un sistema que se puede repetir, medir y mejorar en cada edición, con actores que entienden su rol y con números que muestran lo que antes se perdía sin registro.",
      "Es un ejemplo chico y concreto de una idea grande: cuando se diseña el retorno con la misma seriedad con la que se diseña el producto, la circularidad deja de ser una aspiración y se vuelve operación.",
    ],
  },
  {
    slug: "materiales-que-vuelven",
    title: "Materiales que vuelven: repensar el envase desde el final",
    excerpt: "Diseñar mirando primero qué pasa cuando el producto termina su vida útil.",
    date: "Nov 2025",
    category: "Caso",
    body: [
      "La mayoría de los productos se diseñan de adelante hacia atrás: primero la función, después la estética y, mucho después y casi por descarte, qué pasa cuando dejan de servir. El final queda como un problema de otro, casi siempre del sistema público o del ambiente.",
      "Dar vuelta ese orden cambia todo. Cuando el punto de partida es el final del ciclo, aparecen preguntas que antes no se hacían: este material, ¿se puede recuperar? ¿Alguien lo va a querer? ¿Qué habría que cambiar hoy para que mañana valga algo en lugar de costar?",
      "Diseñar desde el final no es una restricción, es una fuente de ideas. Obliga a simplificar, a evitar mezclas difíciles de separar y a pensar el envase como parte de un flujo y no como un objeto que muere en el tacho.",
      "El envase que vuelve no aparece por casualidad. Aparece porque alguien, en la etapa de diseño, decidió que su destino importaba tanto como su función. Esa decisión temprana es la que hace posible todo lo demás.",
    ],
  },
];

export function getPerspectiva(slug: string): Perspectiva | undefined {
  return perspectivas.find((p) => p.slug === slug);
}

export function getPerspectivaSlugs(): string[] {
  return perspectivas.map((p) => p.slug);
}
