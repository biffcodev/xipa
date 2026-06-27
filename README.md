# XIPA — Sitio web (Next.js + Sanity CMS)

Sitio institucional de **XIPA** (ecodiseño y economía circular) en **Next.js
(App Router) + TypeScript + Tailwind CSS**, con **todo el contenido gestionable
desde un panel de administración (Sanity)**.

> **Re-evolucionemos el plástico** — Reducir · Rediseñar · Repensar · Reutilizar

## Stack

- **Next.js 16** (App Router, React 19) — páginas estáticas (SSG/ISR)
- **TypeScript** · **Tailwind CSS v4** (tema claro/oscuro) · tipografía Inter
- **Sanity** — CMS embebido, panel en **`/studio`**
- Idiomas ES / EN / FR / PT · tema claro/oscuro

El sitio **siempre funciona**: si Sanity está vacío o no configurado, usa el
contenido por defecto (`lib/defaults.ts`); cuando hay datos en Sanity, los usa.

## Puesta en marcha (resumen)

```bash
npm install
cp .env.local.example .env.local   # completá tus datos de Sanity
npm run dev                         # sitio en http://localhost:3000
                                    # panel en http://localhost:3000/studio
```

## Configurar Sanity (una sola vez)

1. **Proyecto Sanity** (ya creado): Project ID `vymgki3a`, dataset `production`.
2. **Variables de entorno** — en `.env.local` (local) y en **Vercel → Settings →
   Environment Variables**:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=vymgki3a
   NEXT_PUBLIC_SANITY_DATASET=production
   ```
3. **CORS** (para que el panel `/studio` funcione en tu dominio): en
   https://www.sanity.io/manage → tu proyecto → **API → CORS origins** agregá:
   - `http://localhost:3000` (con credenciales)
   - `https://TU-DOMINIO.vercel.app` (con credenciales)
4. **Dataset público**: en API → Datasets, dejá `production` como **public**
   (así el sitio lee sin token). Si lo querés privado, generá un read token y
   agregalo como `SANITY_API_TOKEN`.

## Migrar el contenido actual a Sanity

Carga todos los textos + imágenes actuales al CMS (una vez):

```bash
# 1) Generá un token con permiso de escritura:
#    sanity.io/manage -> tu proyecto -> API -> Tokens -> Add token -> "Editor"
# 2) Ponelo en .env.local como SANITY_API_TOKEN=...
npm run seed
```

Después de esto, entrá a `/studio`, iniciá sesión con tu cuenta de Sanity y vas
a ver todo el contenido cargado y editable.

## Desplegar

- En **Vercel**: agregá las variables de entorno (paso 2) y deployá. El sitio se
  pre-renderiza y revalida; al editar en Sanity, los cambios aparecen en ~1 min
  (ISR) o en el próximo deploy.

## Qué se edita desde `/studio`

- **Configuración del sitio**: marca, WhatsApp, redes, dirección, horario, footer.
- **Home**: slider, sección lineal/circular, estadísticas, manifiesto, intros.
- **Páginas**: hero + frase de Oportunidad, Metodología, Equipo, Proyectos, Contacto.
- **Proyectos** (7): todos los campos + imágenes (portada, destacada, galería).
- **Equipo, Pilares, Metodología (pasos), Estadísticas**.

## Estructura

```
app/(site)/…           Páginas del sitio (Nav + Footer)
app/studio/…           Panel de administración (Sanity Studio)
components/             UI + secciones del home + SmartImage
sanity/                 Esquemas, config y cliente de Sanity
lib/content.ts         Lee de Sanity con fallback a defaults
lib/defaults.ts        Contenido por defecto (fuente del seed y del fallback)
lib/projects.ts        Textos de los 7 proyectos
scripts/seed.ts        Migración de contenido + imágenes a Sanity
public/images/         Imágenes locales (usadas como fallback)
```

---
Diseño y contenido © XIPA.
