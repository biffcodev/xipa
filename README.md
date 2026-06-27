# XIPA — Sitio web (Next.js)

Sitio institucional de **XIPA** (ecodiseño y economía circular), implementado
como una app **Next.js (App Router) + TypeScript + Tailwind CSS**, fiel al
diseño original de Claude Design.

> **Re-evolucionemos el plástico** — Reducir · Rediseñar · Repensar · Reutilizar

## Stack

- **Next.js 16** (App Router, React 19) — páginas estáticas (SSG)
- **TypeScript**
- **Tailwind CSS v4** (tokens de tema via CSS variables, modo claro/oscuro)
- Tipografía **Inter** · idiomas **ES / EN / FR / PT** · tema claro/oscuro

## Correr en local

```bash
npm install
npm run dev      # http://localhost:3000
```

Build de producción:

```bash
npm run build
npm start
```

## Desplegar

Ya está pensado para **Vercel** (importá el repo y listo, sin configuración).
También funciona en cualquier host que soporte Next.js. Es un sitio estático
(todas las rutas se pre-renderizan), así que es rápido y bueno para SEO.

## Estructura

```
app/
  layout.tsx              Layout raíz: fuentes, providers, Nav, Footer
  globals.css             Tailwind + tokens de tema (claro/oscuro) + keyframes
  page.tsx                Home
  oportunidad/            La oportunidad
  metodologia/            Metodología
  equipo/                 Equipo
  proyectos/              Listado de proyectos
  proyectos/[slug]/       Ficha de proyecto (7: grido, revasos, bio4,
                          cafezazo, cosquin, vial, baldes)
  contacto/               Contacto + mapa
components/
  Nav, Footer, PageHero, Reveal, SlotImage, ProjectShowcase,
  ProjectDetail, MethodologyTimeline, ContactForm
  home/                   Secciones del home (Hero, Pillars, ProjectsRail,
                          Choice, Stats, Manifesto, Methodology, Team, Newsletter)
  providers/              ThemeProvider, I18nProvider
lib/
  i18n.ts                 Diccionario ES/EN/FR/PT + traductor
  projects.ts             Datos de los 7 proyectos
public/images/            hero-*.jpg, pilar-*.jpg
public/images/slots/      Fotos de proyectos / equipo / proceso (*.webp)
```

- **Idioma**: botón 🌐 en la barra (preferencia en `localStorage`).
- **Tema**: botón claro/oscuro en la barra (también persistido).

## Imágenes pendientes

Algunas galerías de proyectos todavía no tienen foto y se muestran como un
marco con ícono (placeholder). Para completarlas, agregá la imagen en
`public/images/slots/<id>.webp` y registrá el id en el `Set` `FILLED` de
`components/SlotImage.tsx`. IDs pendientes: `det-baldes-1…4`,
`det-cafezazo-1…4`, `det-cosquin-1…4`, `det-vial-1…4`, `det-bio4-2…4`,
`det-grido-2…4`, `det-revasos-3…4`.

---
Diseño y contenido © XIPA. Implementado desde un proyecto de Claude Design.
