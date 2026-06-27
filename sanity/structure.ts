import type { StructureResolver } from "sanity/structure";

// Singletons (siteSettings, homePage) open straight to their single document;
// the rest are normal document lists.
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Contenido")
    .items([
      S.listItem().title("⚙️ Configuración del sitio").id("siteSettings")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.listItem().title("🏠 Home").id("homePage")
        .child(S.document().schemaType("homePage").documentId("homePage")),
      S.listItem().title("📄 Páginas").child(S.documentTypeList("page").title("Páginas")),
      S.divider(),
      S.listItem().title("🗂️ Proyectos").child(S.documentTypeList("project").title("Proyectos")),
      S.listItem().title("👥 Equipo").child(S.documentTypeList("teamMember").title("Equipo")),
      S.listItem().title("♻️ Pilares").child(S.documentTypeList("pillar").title("Pilares")),
      S.listItem().title("🧭 Metodología (pasos)").child(S.documentTypeList("methodologyStep").title("Pasos")),
      S.listItem().title("📊 Estadísticas").child(S.documentTypeList("stat").title("Estadísticas")),
    ]);
