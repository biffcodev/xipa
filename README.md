# XIPA — Sitio web

Sitio institucional de **XIPA** (ecodiseño y economía circular). Implementación
del diseño de Claude Design como un sitio estático autónomo, listo para desplegar.

> **Re-evolucionemos el plástico** — Reducir · Rediseñar · Repensar · Reutilizar

## Páginas

| Archivo | Sección |
| --- | --- |
| `index.html` | Home (hero slider, 4 pilares, proyectos, estadísticas, metodología, equipo, newsletter, contacto) |
| `oportunidad.html` | La oportunidad |
| `metodologia.html` | Metodología |
| `equipo.html` | Equipo |
| `proyectos.html` | Listado de proyectos |
| `contacto.html` | Contacto + mapa |
| `proyecto-grido.html` … | 7 fichas de proyecto: Grido, Re-vasos, BIO 4, Cafezazo, Cosquín Rock, Seguridad Vial, Abre Baldes |

## Cómo correrlo localmente

Es HTML estático: podés abrir `index.html` directamente, aunque se recomienda
servirlo por HTTP para que todo (rutas, tipografías) se comporte como en producción.

```bash
# opción 1 — Node (incluida en package.json)
npm run dev          # abre http://localhost:3000

# opción 2 — Python, sin dependencias
python3 -m http.server 8000   # abre http://localhost:8000
```

## Desplegar

Es un sitio 100% estático (HTML/CSS/JS, sin build). Funciona tal cual en
cualquier hosting estático:

- **Vercel / Netlify**: arrastrá la carpeta o conectá el repo. Sin configuración.
- **GitHub Pages**: activá Pages sobre la raíz de la rama.
- **Cloudflare Pages / S3 / nginx**: subí los archivos tal cual.

## Estructura técnica

Sitio estático puro: HTML con estilos inline (fieles al diseño) y JavaScript
vanilla, sin frameworks ni paso de build.

```
index.html, *.html        Páginas
home.js                   Interacciones del home (slider, pilares, proyectos,
                          metodología, stats, toggle lineal/circular, equipo, newsletter)
chrome.js                 Nav, tema claro/oscuro, selector de idioma
menu.js                   Menú hamburguesa móvil
hover.js                  Efectos hover (atributo style-hover)
i18n.js                   Traducciones ES / EN / FR / PT
responsive.css            Ajustes responsive
images/                   hero-*.jpg, pilar-*.jpg
images/slots/             Fotos de proyectos/equipo/proceso (*.webp)
```

- **Idiomas**: botón 🌐 en la barra. La preferencia se guarda en `localStorage`.
- **Tema**: botón claro/oscuro en la barra, también persistido.

## Imágenes pendientes

Las galerías de algunas fichas de proyecto todavía no tienen foto y se muestran
como un marco con ícono (placeholder). Para completarlas, agregá la imagen y
reemplazá el `<div class="slotimg slot-empty" data-slot="ID">` por:

```html
<img class="slotimg" src="images/slots/ID.webp" alt="…" loading="lazy"
     style="position:absolute; inset:0; width:100%; height:100%; object-fit:cover;">
```

Placeholders por completar: `det-baldes-1…4`, `det-cafezazo-1…4`,
`det-cosquin-1…4`, `det-vial-1…4`, `det-bio4-2…4`, `det-grido-2…4`,
`det-revasos-3…4`.

---
Diseño y contenido © XIPA. Implementado desde un proyecto de Claude Design.
