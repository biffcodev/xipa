// @ts-nocheck
/* Ported from the project's original i18n.js — ES/EN/FR/PT dictionary and a
   DOM text-node translator. Reused verbatim so the site's existing copy and
   translations stay identical. */

/* Xipa — diccionario de traducción. Clave = texto original en español. */
  var T = {
    // Nav
    "Home": { en: "Home", pt: "Início", fr: "Accueil" },
    "Oportunidad": { en: "Opportunity", pt: "Oportunidade", fr: "Opportunité" },
    "Manifiesto": { en: "Manifesto", pt: "Manifesto", fr: "Manifeste" },
    "Ecodiseño": { en: "Ecodesign", pt: "Ecodesign", fr: "Écoconception" },
    "Proyectos": { en: "Projects", pt: "Projetos", fr: "Projets" },
    "Equipo": { en: "Team", pt: "Equipe", fr: "Équipe" },
    "Contacto": { en: "Contact", pt: "Contato", fr: "Contact" },

    // Hero
    "Ecodiseño · Economía Circular": { en: "Ecodesign · Circular Economy", pt: "Ecodesign · Economia Circular", fr: "Écoconception · Économie circulaire" },
    "Evolucionemos": { en: "Let's evolve", pt: "Vamos evoluir", fr: "Faisons évoluer" },
    "el plástico.": { en: "plastic.", pt: "o plástico.", fr: "le plastique." },
    "Brindamos soluciones de ecodiseño para reducir, rediseñar, repensar y reutilizar.": { en: "We deliver ecodesign solutions to reduce, redesign, rethink and reuse.", pt: "Oferecemos soluções de ecodesign para reduzir, redesenhar, repensar e reutilizar.", fr: "Nous offrons des solutions d'écoconception pour réduire, redessiner, repenser et réutiliser." },

    // Pillars
    "Soluciones de ecodiseño": { en: "Ecodesign solutions", pt: "Soluções de ecodesign", fr: "Solutions d'écoconception" },
    "Reducir": { en: "Reduce", pt: "Reduzir", fr: "Réduire" },
    "Rediseñar": { en: "Redesign", pt: "Redesenhar", fr: "Redessiner" },
    "Repensar": { en: "Rethink", pt: "Repensar", fr: "Repenser" },
    "Reutilizar": { en: "Reuse", pt: "Reutilizar", fr: "Réutiliser" },
    "Reducimos el peso de los productos mediante mejoras técnicas en los materiales o eliminando elementos del envase.": { en: "We reduce product weight through technical material improvements or by removing packaging elements.", pt: "Reduzimos o peso dos produtos com melhorias técnicas nos materiais ou eliminando elementos da embalagem.", fr: "Nous réduisons le poids des produits par des améliorations techniques des matériaux ou en supprimant des éléments d'emballage." },
    "Rediseñamos los productos para aumentar su capacidad, rendir más su contenido y mejorar los procesos involucrados.": { en: "We redesign products to increase capacity, get more from their content and improve the processes involved.", pt: "Redesenhamos os produtos para aumentar a capacidade, render mais o conteúdo e melhorar os processos envolvidos.", fr: "Nous redessinons les produits pour augmenter leur capacité, optimiser leur contenu et améliorer les procédés impliqués." },
    "Incorporamos material reciclado en nuevos productos, con piezas fácilmente separables y compatibles para el reciclado.": { en: "We incorporate recycled material into new products, with easily separable parts compatible for recycling.", pt: "Incorporamos material reciclado em novos produtos, com peças facilmente separáveis e compatíveis para reciclagem.", fr: "Nous intégrons des matériaux recyclés dans de nouveaux produits, avec des pièces facilement séparables et compatibles avec le recyclage." },
    "Sustituimos productos de un solo uso por reutilizables y mejoramos sus características para alargar su vida útil.": { en: "We replace single-use products with reusable ones and improve their features to extend their lifespan.", pt: "Substituímos produtos de uso único por reutilizáveis e melhoramos suas características para prolongar a vida útil.", fr: "Nous remplaçons les produits à usage unique par des produits réutilisables et améliorons leurs caractéristiques pour prolonger leur durée de vie." },
    "Scrolleá ↓": { en: "Scroll ↓", pt: "Role ↓", fr: "Défiler ↓" },
    "Scroll →": { en: "Scroll →", pt: "Role →", fr: "Défiler →" },

    // Editorial / mosaic
    "Economía circular": { en: "Circular economy", pt: "Economia circular", fr: "Économie circulaire" },
    "Economía lineal": { en: "Linear economy", pt: "Economia linear", fr: "Économie linéaire" },
    "De residuos a": { en: "From waste to", pt: "De resíduos a", fr: "Des déchets aux" },
    "recursos.": { en: "resources.", pt: "recursos.", fr: "ressources." },
    "Revalorizamos el plástico a través del ecodiseño: lo que hoy se descarta, mañana es un nuevo producto.": { en: "We give plastic new value through ecodesign: what is discarded today becomes a new product tomorrow.", pt: "Revalorizamos o plástico através do ecodesign: o que hoje é descartado, amanhã é um novo produto.", fr: "Nous revalorisons le plastique grâce à l'écoconception : ce qui est jeté aujourd'hui devient un nouveau produit demain." },
    "REUTILIZABLE": { en: "REUSABLE", pt: "REUTILIZÁVEL", fr: "RÉUTILISABLE" },
    "Productos que nacen del residuo": { en: "Products born from waste", pt: "Produtos que nascem do resíduo", fr: "Des produits nés du déchet" },
    "Material reciclado": { en: "Recycled material", pt: "Material reciclado", fr: "Matériau recyclé" },
    "Proceso productivo": { en: "Production process", pt: "Processo produtivo", fr: "Processus de production" },
    "Planta local": { en: "Local plant", pt: "Planta local", fr: "Usine locale" },

    // Projects (pinned)
    "Proyecto 01 — Envase reutilizable": { en: "Project 01 — Reusable packaging", pt: "Projeto 01 — Embalagem reutilizável", fr: "Projet 01 — Emballage réutilisable" },
    "Proyecto 02 — Reutilizables": { en: "Project 02 — Reusables", pt: "Projeto 02 — Reutilizáveis", fr: "Projet 02 — Réutilisables" },
    "Proyecto 03 — Industria": { en: "Project 03 — Industry", pt: "Projeto 03 — Indústria", fr: "Projet 03 — Industrie" },
    "El primer envase recargable de helados del mundo. Menos telgopor, mejor experiencia y logística para una cadena internacional.": { en: "The world's first refillable ice-cream container. Less foam, a better experience and logistics for an international chain.", pt: "A primeira embalagem recarregável de sorvetes do mundo. Menos isopor, melhor experiência e logística para uma rede internacional.", fr: "Le premier contenant de glace rechargeable au monde. Moins de polystyrène, une meilleure expérience et logistique pour une chaîne internationale." },
    "Vasos 100% reutilizables, elaborados con materia prima reciclada y trazable. Monomaterial, reciclables e impresos con tintas al agua.": { en: "100% reusable cups, made with traceable recycled raw material. Single-material, recyclable and printed with water-based inks.", pt: "Copos 100% reutilizáveis, feitos com matéria-prima reciclada e rastreável. Monomaterial, recicláveis e impressos com tintas à base de água.", fr: "Gobelets 100% réutilisables, fabriqués avec une matière première recyclée et traçable. Monomatériau, recyclables et imprimés à l'encre à base d'eau." },
    "Una matriz desulfurizadora para bioetanol, con proveedores locales y material reciclado. Economía circular en desarrollo continuo.": { en: "A desulfurizing matrix for bioethanol, with local suppliers and recycled material. Circular economy in continuous development.", pt: "Uma matriz dessulfurizadora para bioetanol, com fornecedores locais e material reciclado. Economia circular em desenvolvimento contínuo.", fr: "Une matrice de désulfuration pour le bioéthanol, avec des fournisseurs locaux et des matériaux recyclés. Économie circulaire en développement continu." },
    "2024 · Reducir · Rediseñar": { en: "2024 · Reduce · Redesign", pt: "2024 · Reduzir · Redesenhar", fr: "2024 · Réduire · Redessiner" },
    "2022 · Reutilizar": { en: "2022 · Reuse", pt: "2022 · Reutilizar", fr: "2022 · Réutiliser" },
    "2020 · Repensar": { en: "2020 · Rethink", pt: "2020 · Repensar", fr: "2020 · Repenser" },
    "Y muchos más": { en: "And many more", pt: "E muitos mais", fr: "Et bien d'autres" },
    "7 proyectos.": { en: "7 projects.", pt: "7 projetos.", fr: "7 projets." },
    "Un mismo propósito.": { en: "One shared purpose.", pt: "Um mesmo propósito.", fr: "Un même objectif." },
    "Cafezazo, Cosquín Rock, Seguridad vial, Abre Baldes y lo que viene.": { en: "Cafezazo, Cosquín Rock, Road safety, Abre Baldes and what's next.", pt: "Cafezazo, Cosquín Rock, Segurança viária, Abre Baldes e o que vem por aí.", fr: "Cafezazo, Cosquín Rock, Sécurité routière, Abre Baldes et la suite." },
    "Ver todos los proyectos →": { en: "View all projects →", pt: "Ver todos os projetos →", fr: "Voir tous les projets →" },

    // Choice section
    "Hoy, tenemos": { en: "Today, we have", pt: "Hoje, temos", fr: "Aujourd'hui, nous avons" },
    "una elección.": { en: "a choice.", pt: "uma escolha.", fr: "un choix." },
    // lineal cards
    "Producción global": { en: "Global production", pt: "Produção global", fr: "Production mondiale" },
    "de plástico se producen cada año": { en: "of plastic are produced every year", pt: "de plástico são produzidos por ano", fr: "de plastique produits chaque année" },
    "Un solo uso": { en: "Single use", pt: "Uso único", fr: "Usage unique" },
    "del plástico es descartable": { en: "of plastic is disposable", pt: "do plástico é descartável", fr: "du plastique est jetable" },
    "Reciclaje real": { en: "Real recycling", pt: "Reciclagem real", fr: "Recyclage réel" },
    "del plástico se recicla efectivamente": { en: "of plastic is effectively recycled", pt: "do plástico é efetivamente reciclado", fr: "du plastique est réellement recyclé" },
    "Océanos": { en: "Oceans", pt: "Oceanos", fr: "Océans" },
    "llegan al mar cada año": { en: "reach the sea every year", pt: "chegam ao mar por ano", fr: "atteignent la mer chaque année" },
    "Permanencia": { en: "Permanence", pt: "Permanência", fr: "Persistance" },
    "años tarda en degradarse una botella": { en: "years for a bottle to degrade", pt: "anos para uma garrafa se degradar", fr: "ans pour qu'une bouteille se dégrade" },
    "Telgopor": { en: "Styrofoam", pt: "Isopor", fr: "Polystyrène" },
    "años persiste el poliestireno expandido": { en: "years expanded polystyrene persists", pt: "anos o poliestireno expandido persiste", fr: "ans le polystyrène expansé persiste" },
    "Microplásticos": { en: "Microplastics", pt: "Microplásticos", fr: "Microplastiques" },
    "ingerimos por semana, ≈ una tarjeta": { en: "we ingest per week, ≈ one card", pt: "ingerimos por semana, ≈ um cartão", fr: "nous ingérons par semaine, ≈ une carte" },
    "Destino final": { en: "Final destination", pt: "Destino final", fr: "Destination finale" },
    "del plástico termina en vertederos": { en: "of plastic ends up in landfills", pt: "do plástico termina em aterros", fr: "du plastique finit en décharge" },
    // circular cards
    "Materia prima": { en: "Raw material", pt: "Matéria-prima", fr: "Matière première" },
    "reciclada y con trazabilidad": { en: "recycled and traceable", pt: "reciclada e rastreável", fr: "recyclée et traçable" },
    "Reciclabilidad": { en: "Recyclability", pt: "Reciclabilidade", fr: "Recyclabilité" },
    "monomaterial, totalmente reciclable": { en: "single-material, fully recyclable", pt: "monomaterial, totalmente reciclável", fr: "monomatériau, entièrement recyclable" },
    "Reutilización": { en: "Reuse", pt: "Reutilização", fr: "Réutilisation" },
    "ciclos en productos reutilizables": { en: "cycles in reusable products", pt: "ciclos em produtos reutilizáveis", fr: "cycles dans des produits réutilisables" },
    "Origen": { en: "Origin", pt: "Origem", fr: "Origine" },
    "proveedores y producción local": { en: "local suppliers and production", pt: "fornecedores e produção local", fr: "fournisseurs et production locale" },
    "Impresión": { en: "Printing", pt: "Impressão", fr: "Impression" },
    "tintas al agua, sin solventes": { en: "water-based inks, solvent-free", pt: "tintas à base de água, sem solventes", fr: "encres à base d'eau, sans solvants" },
    "Residuos": { en: "Waste", pt: "Resíduos", fr: "Déchets" },
    "de basura a materia prima": { en: "from trash to raw material", pt: "de lixo a matéria-prima", fr: "des ordures à la matière première" },
    "Huella": { en: "Footprint", pt: "Pegada", fr: "Empreinte" },
    "menos kilos de CO₂ emitidos": { en: "fewer kilos of CO₂ emitted", pt: "menos quilos de CO₂ emitidos", fr: "moins de kilos de CO₂ émis" },
    "Diseño": { en: "Design", pt: "Design", fr: "Conception" },
    "productos pensados para durar": { en: "products designed to last", pt: "produtos pensados para durar", fr: "des produits conçus pour durer" },

    // Stats band
    "El problema": { en: "The problem", pt: "O problema", fr: "Le problème" },
    "Los números que": { en: "The numbers we", pt: "Os números que", fr: "Les chiffres que" },
    "no podemos ignorar.": { en: "cannot ignore.", pt: "não podemos ignorar.", fr: "nous ne pouvons ignorer." },
    "Tocá un dato para reproducir": { en: "Tap a figure to replay", pt: "Toque em um dado para reproduzir", fr: "Touchez une donnée pour rejouer" },
    "de plástico se producen cada año en el mundo": { en: "of plastic are produced worldwide every year", pt: "de plástico são produzidos no mundo a cada ano", fr: "de plastique sont produits dans le monde chaque année" },
    "Contaminación": { en: "Pollution", pt: "Poluição", fr: "Pollution" },
    "de plástico llegan al océano cada año": { en: "of plastic reach the ocean every year", pt: "de plástico chegam ao oceano a cada ano", fr: "de plastique atteignent l'océan chaque année" },
    "años": { en: "years", pt: "anos", fr: "ans" },
    "Degradación": { en: "Degradation", pt: "Degradação", fr: "Dégradation" },
    "tarda en descomponerse una botella plástica": { en: "for a plastic bottle to break down", pt: "para uma garrafa plástica se decompor", fr: "pour qu'une bouteille en plastique se décompose" },
    "del plástico producido se recicla realmente": { en: "of plastic produced is actually recycled", pt: "do plástico produzido é realmente reciclado", fr: "du plastique produit est réellement recyclé" },
    "termina en vertederos o en el ambiente": { en: "ends up in landfills or the environment", pt: "termina em aterros ou no ambiente", fr: "finit en décharge ou dans l'environnement" },

    // Manifesto
    "El manifiesto": { en: "The manifesto", pt: "O manifesto", fr: "Le manifeste" },
    "Reducir.": { en: "Reduce.", pt: "Reduzir.", fr: "Réduire." },
    "Rediseñar.": { en: "Redesign.", pt: "Redesenhar.", fr: "Redessiner." },
    "Repensar.": { en: "Rethink.", pt: "Repensar.", fr: "Repenser." },
    "Reutilizar.": { en: "Reuse.", pt: "Reutilizar.", fr: "Réutiliser." },
    "Cuatro principios, una misión.": { en: "Four principles, one mission.", pt: "Quatro princípios, uma missão.", fr: "Quatre principes, une mission." },
    "Inspirarnos con otros para re-evolucionar el plástico y convertirlo en una oportunidad para el planeta.": { en: "To inspire one another to re-evolve plastic and turn it into an opportunity for the planet.", pt: "Inspirar-nos com outros para reevoluir o plástico e transformá-lo em uma oportunidade para o planeta.", fr: "Nous inspirer mutuellement pour faire réévoluer le plastique et en faire une opportunité pour la planète." },

    // Methodology
    "Metodología": { en: "Methodology", pt: "Metodologia", fr: "Méthodologie" },
    "Cómo": { en: "How we", pt: "Como", fr: "Comment nous" },
    "trabajamos.": { en: "work.", pt: "trabalhamos.", fr: "travaillons." },
    "Un proceso circular: cada paso conecta con el siguiente para convertir el residuo en un nuevo recurso.": { en: "A circular process: each step connects to the next to turn waste into a new resource.", pt: "Um processo circular: cada etapa conecta com a seguinte para transformar o resíduo em um novo recurso.", fr: "Un processus circulaire : chaque étape se connecte à la suivante pour transformer le déchet en nouvelle ressource." },
    "Reducir · Rediseñar": { en: "Reduce · Redesign", pt: "Reduzir · Redesenhar", fr: "Réduire · Redessiner" },
    "Ecodiseño de envases y productos": { en: "Ecodesign of packaging and products", pt: "Ecodesign de embalagens e produtos", fr: "Écoconception d'emballages et de produits" },
    "Repensamos el producto desde su origen: menos material, más vida útil y pensado para volver a empezar.": { en: "We rethink the product from its origin: less material, longer life and designed to start again.", pt: "Repensamos o produto desde a origem: menos material, mais vida útil e pensado para recomeçar.", fr: "Nous repensons le produit dès son origine : moins de matière, plus de durée de vie et conçu pour recommencer." },
    "Investigación y desarrollo": { en: "Research and development", pt: "Pesquisa e desenvolvimento", fr: "Recherche et développement" },
    "De la idea a una solución viable: investigamos materiales, validamos hipótesis y desarrollamos el diseño.": { en: "From idea to a viable solution: we research materials, validate hypotheses and develop the design.", pt: "Da ideia a uma solução viável: pesquisamos materiais, validamos hipóteses e desenvolvemos o design.", fr: "De l'idée à une solution viable : nous étudions les matériaux, validons les hypothèses et développons le design." },
    "Prototipo": { en: "Prototype", pt: "Protótipo", fr: "Prototype" },
    "Matricería y prototipado": { en: "Tooling and prototyping", pt: "Matrizaria e prototipagem", fr: "Outillage et prototypage" },
    "Materializamos el diseño con precisión: matrices, moldes y prototipos funcionales listos para producir.": { en: "We materialize the design with precision: dies, molds and functional prototypes ready to produce.", pt: "Materializamos o design com precisão: matrizes, moldes e protótipos funcionais prontos para produzir.", fr: "Nous matérialisons le design avec précision : matrices, moules et prototypes fonctionnels prêts à produire." },
    "Producción con material reciclado": { en: "Production with recycled material", pt: "Produção com material reciclado", fr: "Production avec matériau recyclé" },
    "Producimos con materia prima reciclada, trazable y local. Tintas al agua y monomaterial para reciclar otra vez.": { en: "We produce with recycled, traceable and local raw material. Water-based inks and single-material to recycle again.", pt: "Produzimos com matéria-prima reciclada, rastreável e local. Tintas à base de água e monomaterial para reciclar de novo.", fr: "Nous produisons avec une matière première recyclée, traçable et locale. Encres à base d'eau et monomatériau pour recycler à nouveau." },
    "Circular": { en: "Circular", pt: "Circular", fr: "Circulaire" },
    "Consultoría en economía circular": { en: "Circular economy consulting", pt: "Consultoria em economia circular", fr: "Conseil en économie circulaire" },
    "Acompañamos a marcas y eventos a cerrar el ciclo: de residuos a recursos, con impacto medible.": { en: "We help brands and events close the loop: from waste to resources, with measurable impact.", pt: "Acompanhamos marcas e eventos para fechar o ciclo: de resíduos a recursos, com impacto mensurável.", fr: "Nous accompagnons marques et événements pour boucler la boucle : des déchets aux ressources, avec un impact mesurable." },

    // Team
    "El": { en: "The", pt: "A", fr: "L'" },
    "equipo.": { en: "team.", pt: "equipe.", fr: "équipe." },
    "Tocá un integrante para conocer más · diseño, materiales y comunicación para la economía circular.": { en: "Tap a member to learn more · design, materials and communication for the circular economy.", pt: "Toque em um integrante para saber mais · design, materiais e comunicação para a economia circular.", fr: "Touchez un membre pour en savoir plus · design, matériaux et communication pour l'économie circulaire." },
    "Fundador": { en: "Founder", pt: "Fundador", fr: "Fondateur" },
    "Co-líder": { en: "Co-lead", pt: "Colíder", fr: "Co-responsable" },
    "Comunicación e imagen": { en: "Communication & image", pt: "Comunicação e imagem", fr: "Communication & image" },
    "Lidera Xipa con la misión de re-evolucionar el plástico desde el ecodiseño y la economía circular.": { en: "Leads Xipa with the mission to re-evolve plastic through ecodesign and the circular economy.", pt: "Lidera a Xipa com a missão de reevoluir o plástico a partir do ecodesign e da economia circular.", fr: "Dirige Xipa avec la mission de faire réévoluer le plastique par l'écoconception et l'économie circulaire." },
    "Coordina proyectos y alianzas para escalar soluciones de economía circular con marcas y eventos.": { en: "Coordinates projects and partnerships to scale circular-economy solutions with brands and events.", pt: "Coordena projetos e parcerias para escalar soluções de economia circular com marcas e eventos.", fr: "Coordonne projets et partenariats pour développer des solutions d'économie circulaire avec marques et événements." },
    "Diseña productos y envases que nacen del residuo, aplicando ecodiseño en cada detalle.": { en: "Designs products and packaging born from waste, applying ecodesign in every detail.", pt: "Projeta produtos e embalagens que nascem do resíduo, aplicando ecodesign em cada detalhe.", fr: "Conçoit produits et emballages nés du déchet, en appliquant l'écoconception dans chaque détail." },
    "Cuenta la historia de cada proyecto y construye la identidad de la marca Xipa.": { en: "Tells the story of each project and builds the Xipa brand identity.", pt: "Conta a história de cada projeto e constrói a identidade da marca Xipa.", fr: "Raconte l'histoire de chaque projet et construit l'identité de la marque Xipa." },

    // Footer
    "Hablemos de tu": { en: "Let's talk about your", pt: "Vamos falar do seu", fr: "Parlons de votre" },
    "próximo proyecto.": { en: "next project.", pt: "próximo projeto.", fr: "prochain projet." },
    "Escribinos por WhatsApp →": { en: "Message us on WhatsApp →", pt: "Fale conosco no WhatsApp →", fr: "Écrivez-nous sur WhatsApp →" },
    "Enviar e-mail ↗": { en: "Send e-mail ↗", pt: "Enviar e-mail ↗", fr: "Envoyer un e-mail ↗" },
    "Volver arriba ↑": { en: "Back to top ↑", pt: "Voltar ao topo ↑", fr: "Retour en haut ↑" },

    // Proyectos page
    "Portfolio": { en: "Portfolio", pt: "Portfólio", fr: "Portfolio" },
    "De residuos a recursos,": { en: "From waste to resources,", pt: "De resíduos a recursos,", fr: "Des déchets aux ressources," },
    "caso por caso.": { en: "case by case.", pt: "caso a caso.", fr: "cas par cas." },
    "Cada proyecto es una prueba de que el plástico puede tener una segunda vida a través del ecodiseño.": { en: "Each project is proof that plastic can have a second life through ecodesign.", pt: "Cada projeto é uma prova de que o plástico pode ter uma segunda vida através do ecodesign.", fr: "Chaque projet prouve que le plastique peut avoir une seconde vie grâce à l'écoconception." },
    "← Volver al inicio": { en: "← Back to home", pt: "← Voltar ao início", fr: "← Retour à l'accueil" },
    "PRÓXIMAMENTE": { en: "COMING SOON", pt: "EM BREVE", fr: "BIENTÔT" },
    "Próximos proyectos": { en: "Upcoming projects", pt: "Próximos projetos", fr: "Prochains projets" },
    "Lo que viene en economía circular.": { en: "What's next in the circular economy.", pt: "O que vem na economia circular.", fr: "La suite de l'économie circulaire." },
    "01 — ENVASE REUTILIZABLE": { en: "01 — REUSABLE PACKAGING", pt: "01 — EMBALAGEM REUTILIZÁVEL", fr: "01 — EMBALLAGE RÉUTILISABLE" },
    "02 — REUTILIZABLES": { en: "02 — REUSABLES", pt: "02 — REUTILIZÁVEIS", fr: "02 — RÉUTILISABLES" },
    "03 — INDUSTRIA": { en: "03 — INDUSTRY", pt: "03 — INDÚSTRIA", fr: "03 — INDUSTRIE" },
    "04 — EVENTOS": { en: "04 — EVENTS", pt: "04 — EVENTOS", fr: "04 — ÉVÉNEMENTS" },
    "05 — EVENTOS": { en: "05 — EVENTS", pt: "05 — EVENTOS", fr: "05 — ÉVÉNEMENTS" },
    "06 — COMUNIDAD": { en: "06 — COMMUNITY", pt: "06 — COMUNIDADE", fr: "06 — COMMUNAUTÉ" },
    "07 — INDUSTRIA": { en: "07 — INDUSTRY", pt: "07 — INDÚSTRIA", fr: "07 — INDUSTRIE" },
    "El primer envase recargable de helados del mundo. Reduce el descarte de telgopor y se adapta a la logística de una cadena internacional.": { en: "The world's first refillable ice-cream container. Cuts foam waste and adapts to an international chain's logistics.", pt: "A primeira embalagem recarregável de sorvetes do mundo. Reduz o descarte de isopor e se adapta à logística de uma rede internacional.", fr: "Le premier contenant de glace rechargeable au monde. Réduit les déchets de polystyrène et s'adapte à la logistique d'une chaîne internationale." },
    "Vasos 100% reutilizables, reciclados y reciclables, impresos con tintas al agua.": { en: "100% reusable, recycled and recyclable cups, printed with water-based inks.", pt: "Copos 100% reutilizáveis, reciclados e recicláveis, impressos com tintas à base de água.", fr: "Gobelets 100% réutilisables, recyclés et recyclables, imprimés à l'encre à base d'eau." },
    "Matriz desulfurizadora para bioetanol con proveedores locales y material reciclado.": { en: "Desulfurizing matrix for bioethanol with local suppliers and recycled material.", pt: "Matriz dessulfurizadora para bioetanol com fornecedores locais e material reciclado.", fr: "Matrice de désulfuration pour bioéthanol avec fournisseurs locaux et matériaux recyclés." },
    "Un evento de café de especialidad sin vasos de un solo uso, con nuestros Re-vasos.": { en: "A specialty-coffee event with no single-use cups, using our Re-vasos.", pt: "Um evento de café especial sem copos de uso único, com nossos Re-vasos.", fr: "Un événement de café de spécialité sans gobelets jetables, avec nos Re-vasos." },
    "Decantador de vinos 100% reutilizable, alternativa segura al vidrio en recitales.": { en: "100% reusable wine decanter, a safe alternative to glass at concerts.", pt: "Decantador de vinhos 100% reutilizável, alternativa segura ao vidro em shows.", fr: "Carafe à vin 100% réutilisable, alternative sûre au verre lors des concerts." },
    "Línea de productos viales 100% reciclados: de basura a residuo, a recurso, a seguridad.": { en: "Road-safety product line, 100% recycled: from trash to waste, to resource, to safety.", pt: "Linha de produtos viários 100% reciclados: de lixo a resíduo, a recurso, a segurança.", fr: "Gamme de produits routiers 100% recyclés : des ordures au déchet, à la ressource, à la sécurité." },
    "Sistema circular para la industria de la pintura: revaloriza baldes en desuso.": { en: "Circular system for the paint industry: gives unused buckets new value.", pt: "Sistema circular para a indústria de tintas: revaloriza baldes em desuso.", fr: "Système circulaire pour l'industrie de la peinture : revalorise les seaux inutilisés." }
  };

  // --- additional strings (subpages, hero slides, forms, footer) ---
  var EXTRA = {
    "Scroll": { en: "Scroll", pt: "Role", fr: "Défiler" },
    "Newsletter": { en: "Newsletter", pt: "Newsletter", fr: "Newsletter" },
    "Ver proyecto →": { en: "View project →", pt: "Ver projeto →", fr: "Voir le projet →" },
    "Volver al inicio ↑": { en: "Back to home ↑", pt: "Voltar ao início ↑", fr: "Retour à l'accueil ↑" },
    "Cómo llegar ↗": { en: "Get directions ↗", pt: "Como chegar ↗", fr: "Itinéraire ↗" },

    // Home — hero slides
    "Economía Circular": { en: "Circular Economy", pt: "Economia Circular", fr: "Économie circulaire" },
    "De residuos": { en: "From waste", pt: "De resíduos", fr: "Des déchets" },
    "a recursos.": { en: "to resources.", pt: "a recursos.", fr: "aux ressources." },
    "Cerramos el ciclo: lo que hoy se descarta, mañana es la materia prima de un nuevo producto.": { en: "We close the loop: what is discarded today becomes the raw material of a new product tomorrow.", pt: "Fechamos o ciclo: o que hoje é descartado, amanhã é a matéria-prima de um novo produto.", fr: "Nous bouclons la boucle : ce qui est jeté aujourd'hui devient la matière première d'un nouveau produit demain." },
    "Investigación + Diseño": { en: "Research + Design", pt: "Pesquisa + Design", fr: "Recherche + Design" },
    "Repensamos": { en: "We rethink", pt: "Repensamos", fr: "Nous repensons" },
    "desde el origen.": { en: "from the origin.", pt: "desde a origem.", fr: "dès l'origine." },
    "Diseñamos productos y envases que nacen del residuo, con materiales trazables e impacto medible.": { en: "We design products and packaging born from waste, with traceable materials and measurable impact.", pt: "Projetamos produtos e embalagens que nascem do resíduo, com materiais rastreáveis e impacto mensurável.", fr: "Nous concevons produits et emballages nés du déchet, avec des matériaux traçables et un impact mesurable." },
    "100% reciclado": { en: "100% recycled", pt: "100% reciclado", fr: "100% recyclé" },

    // Home — newsletter
    "Sumate a la evolución": { en: "Join the evolution", pt: "Junte-se à evolução", fr: "Rejoignez l'évolution" },
    "del plástico.": { en: "of plastic.", pt: "do plástico.", fr: "du plastique." },
    "Novedades de ecodiseño, economía circular y nuevos proyectos. Sin spam, solo lo que importa.": { en: "News on ecodesign, circular economy and new projects. No spam, only what matters.", pt: "Novidades de ecodesign, economia circular e novos projetos. Sem spam, só o que importa.", fr: "Actualités d'écoconception, d'économie circulaire et de nouveaux projets. Sans spam, seulement l'essentiel." },
    "Suscribirme": { en: "Subscribe", pt: "Inscrever-me", fr: "S'abonner" },
    "¡Gracias! Te sumaste a la newsletter.": { en: "Thank you! You've joined the newsletter.", pt: "Obrigado! Você entrou na newsletter.", fr: "Merci ! Vous êtes inscrit à la newsletter." },
    "Al suscribirte aceptás nuestra política de privacidad.": { en: "By subscribing you accept our privacy policy.", pt: "Ao se inscrever, você aceita nossa política de privacidade.", fr: "En vous abonnant, vous acceptez notre politique de confidentialité." },
    "© 2026 Xipa · Evolucionemos el plástico": { en: "© 2026 Xipa · Let's evolve plastic", pt: "© 2026 Xipa · Vamos evoluir o plástico", fr: "© 2026 Xipa · Faisons évoluer le plastique" },

    // Proyectos
    "Más proyectos": { en: "More projects", pt: "Mais projetos", fr: "Plus de projets" },
    "Y muchos más.": { en: "And many more.", pt: "E muitos mais.", fr: "Et bien d'autres." },

    // Oportunidad
    "Re-evolucionar el plástico": { en: "Re-evolving plastic", pt: "Reevoluir o plástico", fr: "Faire réévoluer le plastique" },
    "es la oportunidad.": { en: "is the opportunity.", pt: "é a oportunidade.", fr: "est l'opportunité." },
    "Cuatro soluciones de ecodiseño para convertir un problema global en valor para las empresas y el planeta.": { en: "Four ecodesign solutions to turn a global problem into value for businesses and the planet.", pt: "Quatro soluções de ecodesign para transformar um problema global em valor para as empresas e o planeta.", fr: "Quatre solutions d'écoconception pour transformer un problème mondial en valeur pour les entreprises et la planète." },
    "Cada residuo es una": { en: "Every waste is a", pt: "Cada resíduo é uma", fr: "Chaque déchet est une" },
    "oportunidad de diseño.": { en: "design opportunity.", pt: "oportunidade de design.", fr: "opportunité de design." },
    "Cuatro soluciones": { en: "Four solutions", pt: "Quatro soluções", fr: "Quatre solutions" },
    "Los números que no podemos ignorar.": { en: "The numbers we cannot ignore.", pt: "Os números que não podemos ignorar.", fr: "Les chiffres que nous ne pouvons ignorer." },

    // Metodología
    "Un proceso circular:": { en: "A circular process:", pt: "Um processo circular:", fr: "Un processus circulaire :" },
    "cómo trabajamos.": { en: "how we work.", pt: "como trabalhamos.", fr: "comment nous travaillons." },
    "Cada paso conecta con el siguiente para convertir el residuo en un nuevo recurso.": { en: "Each step connects to the next to turn waste into a new resource.", pt: "Cada etapa conecta com a seguinte para transformar o resíduo em um novo recurso.", fr: "Chaque étape se connecte à la suivante pour transformer le déchet en nouvelle ressource." },
    "Del residuo al recurso,": { en: "From waste to resource,", pt: "De resíduo a recurso,", fr: "Du déchet à la ressource," },
    "paso a paso.": { en: "step by step.", pt: "passo a passo.", fr: "étape par étape." },
    "Cinco etapas": { en: "Five stages", pt: "Cinco etapas", fr: "Cinq étapes" },

    // Equipo
    "Diseño, materiales y comunicación": { en: "Design, materials and communication", pt: "Design, materiais e comunicação", fr: "Design, matériaux et communication" },
    "para la economía circular.": { en: "for the circular economy.", pt: "para a economia circular.", fr: "pour l'économie circulaire." },
    "Un equipo cordobés que convierte el residuo plástico en una oportunidad para el planeta.": { en: "A Córdoba-based team turning plastic waste into an opportunity for the planet.", pt: "Uma equipe de Córdoba que transforma o resíduo plástico em uma oportunidade para o planeta.", fr: "Une équipe de Córdoba qui transforme le déchet plastique en opportunité pour la planète." },
    "Detrás de cada proyecto,": { en: "Behind every project,", pt: "Por trás de cada projeto,", fr: "Derrière chaque projet," },
    "personas.": { en: "people.", pt: "pessoas.", fr: "des personnes." },
    "Quiénes somos": { en: "Who we are", pt: "Quem somos", fr: "Qui nous sommes" },

    // Contacto
    "Dejanos tu mensaje": { en: "Leave us a message", pt: "Deixe sua mensagem", fr: "Laissez-nous un message" },
    "y te respondemos.": { en: "and we'll reply.", pt: "e respondemos.", fr: "et nous répondrons." },
    "Contanos sobre tu producto, envase o evento. Buscamos juntos la solución de ecodiseño que mejor encaje.": { en: "Tell us about your product, packaging or event. Together we'll find the ecodesign solution that fits best.", pt: "Conte-nos sobre seu produto, embalagem ou evento. Juntos encontramos a solução de ecodesign que melhor se encaixa.", fr: "Parlez-nous de votre produit, emballage ou événement. Ensemble, nous trouverons la solution d'écoconception la plus adaptée." },
    "Nombre": { en: "Name", pt: "Nome", fr: "Nom" },
    "Email": { en: "Email", pt: "Email", fr: "E-mail" },
    "Empresa / Proyecto": { en: "Company / Project", pt: "Empresa / Projeto", fr: "Entreprise / Projet" },
    "Mensaje": { en: "Message", pt: "Mensagem", fr: "Message" },
    "Enviar mensaje →": { en: "Send message →", pt: "Enviar mensagem →", fr: "Envoyer le message →" },
    "¡Gracias por escribirnos!": { en: "Thanks for writing!", pt: "Obrigado por escrever!", fr: "Merci de nous avoir écrit !" },
    "Recibimos tu mensaje y te respondemos a la brevedad.": { en: "We received your message and will reply shortly.", pt: "Recebemos sua mensagem e responderemos em breve.", fr: "Nous avons reçu votre message et répondrons sous peu." },
    "Dónde estamos": { en: "Where we are", pt: "Onde estamos", fr: "Où nous sommes" },
    "Horario": { en: "Hours", pt: "Horário", fr: "Horaires" },
    "Lunes a viernes · 9:00 – 18:00 h": { en: "Monday to Friday · 9:00 – 18:00", pt: "Segunda a sexta · 9:00 – 18:00 h", fr: "Lundi au vendredi · 9h00 – 18h00" },
    "Ver en el mapa ↓": { en: "View on the map ↓", pt: "Ver no mapa ↓", fr: "Voir sur la carte ↓" },
    // form placeholders
    "Tu nombre": { en: "Your name", pt: "Seu nome", fr: "Votre nom" },
    "tu@correo.com": { en: "you@email.com", pt: "voce@email.com", fr: "vous@email.com" },
    "Opcional": { en: "Optional", pt: "Opcional", fr: "Facultatif" },
    "Contanos qué necesitás…": { en: "Tell us what you need…", pt: "Conte-nos o que precisa…", fr: "Dites-nous ce dont vous avez besoin…" }
  };
  Object.keys(EXTRA).forEach(function (k) { if (!T[k]) T[k] = EXTRA[k]; });

  // Build reverse map: translatedString -> ES key (so we can switch between non-ES langs)
  var REV = {};
  Object.keys(T).forEach(function (es) {
    ["en", "pt", "fr"].forEach(function (l) {
      var v = T[es][l];
      if (v && !REV[v]) REV[v] = es;
    });
  });

  function esKeyOf(text) {
    if (T[text]) return text;
    if (REV[text]) return REV[text];
    return null;
  }

  // Walk text nodes under root and translate to lang ('es' restores original).
  function apply(root, lang) {
    if (!root) return;
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        var p = n.parentNode;
        if (!p) return NodeFilter.FILTER_REJECT;
        var tag = p.nodeName;
        if (tag === "SCRIPT" || tag === "STYLE") return NodeFilter.FILTER_REJECT;
        if (p.closest && p.closest("[data-no-i18n]")) return NodeFilter.FILTER_REJECT;
        if (!n.nodeValue || !n.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var nodes = [];
    var c;
    while ((c = walker.nextNode())) nodes.push(c);
    nodes.forEach(function (n) {
      var raw = n.nodeValue;
      var trimmed = raw.trim();
      var es = esKeyOf(trimmed);
      if (!es) return;
      var lead = raw.slice(0, raw.indexOf(trimmed));
      var tail = raw.slice(raw.indexOf(trimmed) + trimmed.length);
      var out = (lang === "es") ? es : (T[es] && T[es][lang] ? T[es][lang] : es);
      n.nodeValue = lead + out + tail;
    });
    // translate placeholder attributes on inputs/textareas
    var ph = root.querySelectorAll ? root.querySelectorAll("[placeholder]") : [];
    [].forEach.call(ph, function (el) {
      if (el.closest && el.closest("[data-no-i18n]")) return;
      var cur = el.getAttribute("placeholder");
      if (!cur) return;
      var es = esKeyOf(cur.trim());
      if (!es) return;
      el.setAttribute("placeholder", (lang === "es") ? es : (T[es] && T[es][lang] ? T[es][lang] : es));
    });
  }

export const LANGS = ['es', 'en', 'pt', 'fr'];
export const LABELS = { es: 'ES', en: 'EN', pt: 'PT', fr: 'FR' };
export function applyI18n(root, lang) { return apply(root, lang); }
export { T };
