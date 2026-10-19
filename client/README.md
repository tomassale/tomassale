# Portfolio - Tomás Javier Sale

Sitio personal en Next.js 16 (App Router): recorrido por paneles, bilingüe (español / inglés), tema oscuro / claro, formulario de contacto propio, entrega dinámica del CV y SEO técnico completo (metadata, Open Graph, JSON-LD, robots y sitemap).

> Este repositorio es el repositorio de perfil de GitHub del autor (`tomassale/tomassale`). Por eso el `README.md` de la raíz es la ficha de perfil que muestra GitHub y no documenta el sitio. El proyecto vive entero en `client/`, y esta es su documentación técnica.

Todos los comandos de este documento se ejecutan parados en `client/`.

## Índice

1. [Arquitectura](#1-arquitectura)
2. [Stack real](#2-stack-real)
3. [Estructura de carpetas](#3-estructura-de-carpetas)
4. [El recorrido por paneles](#4-el-recorrido-por-paneles-deck)
5. [Contenido: los JSON de `public/data`](#5-contenido-los-json-de-publicdata)
6. [SEO](#6-seo)
7. [Interfaz HTTP](#7-interfaz-http)
8. [Seguridad](#8-seguridad)
9. [Idioma, tema y accesibilidad](#9-idioma-tema-y-accesibilidad)
10. [Animación y rendimiento del cliente](#10-animación-y-rendimiento-del-cliente)
11. [Puesta en marcha y despliegue](#11-puesta-en-marcha-y-despliegue)
12. [Variables de entorno](#12-variables-de-entorno)
13. [Tests](#13-tests)
14. [Convenciones](#14-convenciones-del-repositorio)
15. [Lo que parece muerto y no lo está](#15-lo-que-parece-muerto-y-no-lo-está)
16. [Pendientes y huecos conocidos](#16-pendientes-y-huecos-conocidos)

## 1. Arquitectura

Aplicación de una sola vista. Casi todo el árbol de componentes es cliente (`"use client"`): el recorrido, el idioma y el tema son estado del navegador. Del lado del servidor quedan el layout raíz (fuentes, metadata, JSON-LD), el layout de `/terminos` (su metadata), dos route handlers (`/api/contact` y `/cv`) y los archivos de metadata de Next (`robots.ts`, `sitemap.ts`, `opengraph-image.tsx`), que se resuelven en el build.

Las dependencias apuntan hacia adentro: `src/app` importa de `src/lib`, y `src/lib` no importa nada de `src/app`. La única infraestructura que toca `src/lib` es nodemailer (envío) y winston (log); validación, rate limit, resolución de IP, saneado de URLs y armado de la metadata SEO son funciones puras, testeables sin levantar Next.

```text
NAVEGADOR                                   SERVIDOR (Next runtime / build)
  layout.tsx (server)  <-- lib/seo + lib/site (metadata, JSON-LD)
    |- SettingsProvider  (idioma + tema, localStorage)
    |- CursorTrail       (cursor propio, solo puntero fino)
    `- page.tsx  "use client"
         `- DeckProvider  (indice del panel activo)
              |- Header --> HeaderLinks / HeaderActions / SettingsControls
              |- DeckViewport
              |    |- AboutMe  (#aboutMe)   + WaveField
              |    |- Skill    (#skill)     -> SkillList -> SkillItems
              |    |- Project  (#portfolio) -> ProjectList -> useMarquee
              |    `- Contact  (#contact)  --- fetch POST ---> api/contact/route.js
              `- deckBar --> DeckRail + Footer                  |- clientIp
                                                                |- rateLimit
  /terminos (page cliente + layout con metadata)                |- validation
  /_not-found (not-found.tsx)                                   `- nodemailer
  <a href="/cv"> --------------------------------------------> cv/route.ts (GET, estatico)

  GENERADOS EN EL BUILD: /robots.txt  /sitemap.xml  /opengraph-image
                         /icon.svg  /icon.png  /apple-icon.png  /favicon.ico
  CONTENIDO: public/data/*.json se importa en tiempo de build
```

## 2. Stack real

Versiones declaradas en `package.json` y, entre paréntesis, la resuelta en `node_modules` al documentar.

| Paquete | Versión | Para qué |
|---|---|---|
| `next` | ^16.1.1 (16.3.0) | App Router, route handlers, `next/image`, `next/font`, `next/og` |
| `react` / `react-dom` | ^19.2.3 (19.2.3) | UI |
| `nodemailer` | ^9.0.5 (9.0.5) | Envío del mensaje de contacto vía SMTP de Gmail |
| `winston` | ^3.19.0 (3.19.0) | Logger estructurado (JSON + timestamp), solo a consola |
| `@vercel/speed-insights` | ^1.3.1 (1.3.1) | Métricas de carga, montado en el layout raíz |
| `typescript` | ^5 (5.9.2) | Tipado, `strict: true` |
| `sass` | ^1.92.1 (1.92.1) | Compila `src/app/globals.scss`, la única hoja de estilos |
| `vitest` + `@vitejs/plugin-react` | ^4.1.10 / ^6.0.5 | Runner de tests |
| `@vitest/coverage-v8` | ^4.1.10 | Proveedor de cobertura de `test:coverage` |
| `@testing-library/react`, `jest-dom`, `user-event` | ^16.3.2 / ^7 / ^14.6.3 | Tests de componentes desde el punto de vista del usuario |
| `jsdom` | ^30.0.1 (30.0.1) | DOM de los tests de componentes |
| `eslint` + `eslint-config-next` | ^9 (9.35.0) / 15.5.3 | Lint (`next/core-web-vitals` + `next/typescript`) |

No hay PostCSS ni framework de utilidades CSS. El `package.json` no declara `engines`: la versión mínima de Node no está fijada (se probó con Node 26). Conviven `bun.lock` y `package-lock.json`, y ambos están en `.gitignore`.

## 3. Estructura de carpetas

```text
client/
  next.config.ts          cabeceras de seguridad, formatos de imagen, allowedDevOrigins
  eslint.config.mjs       flat config
  vitest.config.mts       jsdom + node por glob, alias @, cobertura v8
  tsconfig.json           strict, alias @/* -> ./src/*
  AGENTS.md / CLAUDE.md   bloque de reglas que reinyecta `next dev`
  public/
    data/header.json      navegación + enlaces externos + CV
    data/skills.json      stack por categoría
    data/project.json     8 proyectos, descripción es/en, repo, sitio e íconos
    img/personal/*.pdf    el CV que sirve /cv
    img/projects/*.webp   capturas de los proyectos
    img/skills/**         logos svg por categoría
    img/banner/Banner.png NO lo usa el sitio: lo usa el README de perfil (ver 15)
  src/
    app/
      layout.tsx          fuentes, metadata raíz, JSON-LD, script de preferencias
      page.tsx            arma el deck con los paneles de header.json
      globals.scss        única hoja de estilos (~1200 líneas)
      not-found.tsx       404
      robots.ts           /robots.txt
      sitemap.ts          /sitemap.xml
      opengraph-image.tsx tarjeta para compartir (PNG 1200x630, next/og)
      favicon.ico         16, 32 y 48 px
      icon.svg            ícono cuadrado (fuente de los demás íconos)
      icon.png            192x192
      apple-icon.png      180x180
      terminos/           términos y condiciones (page cliente + layout con metadata)
      api/contact/route.js  POST del formulario
      cv/route.ts         GET del CV más reciente
      _components/        _deck, _settings, _header, _aboutMe, _skill,
                          _project, _contact, _footer, _shared
    lib/
      site.ts             identidad del sitio: fuente única de dominio y nombres
      seo.ts              metadata por página, JSON-LD, serializado seguro
      i18n.ts legal.ts url.ts logoTone.ts
      validation.js rateLimit.js clientIp.js nodemailer.js logger.js
    test/setup.ts         stubs de jsdom
```

Las carpetas con guion bajo son *private folders* de Next: no generan rutas.

## 4. El recorrido por paneles (deck)

Vive en `src/app/_components/_deck/Deck.tsx`. Cuatro paneles (`aboutMe`, `skill`, `portfolio`, `contact`), dos modos, el mismo markup:

| Modo | Cuándo | Cómo funciona |
|---|---|---|
| Horizontal | ancho >= 900px **y** alto >= 500px | Sin scroll: la fila se corre con `transform` y el índice activo es la única verdad. Rueda y flechas dan el paso, con umbral de 16px (temblor del trackpad) y descanso de 600 ms. |
| Vertical | ancho < 900px **o** alto < 500px | Manda el scroll de la ventana y el índice lo sigue: en cada `requestAnimationFrame` se toma el panel con el centro más cerca del centro de la pantalla. |

El corte por alto existe por el celular acostado: es ancho, pero con ~430px de alto el panel se cortaba sin forma de alcanzarlo. El mismo corte está en `Deck.tsx` (`HORIZONTAL_QUERY`) y en `globals.scss`: si cambia en uno, cambia en el otro.

`DeckContext` publica `panels`, `activeIndex`, `activeId`, `progress` y `goTo(id)`. Header y riel no saben qué modo está activo. `goTo` además mueve el foco al panel destino (`tabindex -1` + `focus`) para que el próximo Tab del teclado no siga en la barra. La rueda no se intercepta si debajo del puntero hay algo que todavía puede desplazarse (`canScrollVertically`).

En modo vertical, `html` y `body` llevan `overflow-x: clip` (no `hidden`, para no romper el navbar sticky) y `overscroll-behavior-x: none`: la página solo baja, nunca se corre de costado.

**Panel hero.** El texto del primer panel no está centrado en vertical: `.panel--hero` es una columna con dos pseudo-elementos (`::before` con `flex: 1`, `::after` con `flex: 3`) que reparten el alto libre 1 a 3, así el aire bajo el header es la mitad del que daba el centrado. Con base 0, cuando el contenido no entra los separadores valen 0. En modo vertical el hero suma un `padding-top` propio.

## 5. Contenido: los JSON de `public/data`

No hay base de datos ni CMS: tres JSON importados desde los componentes y resueltos en el build. Cambiar contenido implica volver a desplegar.

| Archivo | Campos | Quién lo consume |
|---|---|---|
| `header.json` | `links[]`: id, ref, text - `icons[]`: id, ref, alt, load? | `page.tsx` (paneles), Header, HeaderActions, Contact, `lib/site.ts` (perfiles para JSON-LD) |
| `skills.json` | categoría -> `[{ id, tech, src, alt }]` | Skill -> SkillList -> SkillItems |
| `project.json` | `_id, title, description, description_en?, github?, url?, link?, img, icons{}` | Project -> ProjectList -> ProjectCard |

Algunos proyectos usan `url` y otro `link` para el sitio en vivo; `ProjectCard` resuelve `project.url ?? project.link`. Si falta `description_en` se muestra la descripción en español. La tarjeta no dibuja el botón que falta.

Todo `href` que sale de estos JSON pasa por `safeHref` (`src/lib/url.ts`): solo rutas que empiezan con `/` y URLs `http`, `https` y `mailto`.

## 6. SEO

### Fuente única: `src/lib/site.ts`

Todo lo que identifica al sitio sale de acá: canonical, sitemap, robots, Open Graph y JSON-LD.

| Constante | Valor / origen | Para qué |
|---|---|---|
| `SITE_URL` | `'https://tomasssale.com'` (apex, sin `www`) | Base de todas las URL absolutas |
| `SITE_NAME` | `'Tomás Sale'` | Marca de los títulos, `og:site_name`, nombre del WebSite |
| `PERSON_NAME` | `'Tomás Javier Sale'` | Autor, nodo Person, tarjeta Open Graph |
| `SITE_LOCALE` | `'es_AR'` | `og:locale` |
| `JOB_TITLE` | `translations.es.webDeveloper` | Mismo rol que el hero |
| `SITE_DESCRIPTION` | texto fijo | Descripción de la portada |
| `OG_IMAGE` | `/opengraph-image`, 1200x630 | Imagen para compartir que referencian las páginas |
| `SOCIAL_PROFILES` | `icons` de `header.json` con `https://` | `sameAs` del nodo Person (el CV queda afuera) |

**Cambiar el dominio es editar `SITE_URL` en `src/lib/site.ts`.** No hay otro lugar donde esté escrito. Cualquier otra variante (`www`, `*.vercel.app`) tiene que redirigir al apex desde el hosting; eso no se configura en el código.

### `src/lib/seo.ts`

| Exportación | Qué hace |
|---|---|
| `TITLE_TEMPLATE` | `'%s - Tomás Sale'`: cada página declara solo su parte |
| `HOME_TITLE` | `'Tomás Sale - Desarrollador Web'`: título completo de la portada |
| `buildPageMetadata({ path, title, description })` | Devuelve `description`, `alternates.canonical`, `openGraph` completo (type, url, siteName, locale, title, description, images) y `twitter` (`summary_large_image`) |
| `buildStructuredData()` | Grafo JSON-LD con un `WebSite` y una `Person` enlazados por `@id` (`<SITE_URL>/#website`, `<SITE_URL>/#person`) |
| `serializeJsonLd(data)` | `JSON.stringify` que escapa `<` como `<` |

Por qué `buildPageMetadata` arma el Open Graph entero: Next fusiona la metadata de los segmentos de forma superficial. Si una página declara `openGraph`, reemplaza el objeto del layout entero y se pierden en silencio `siteName`, `locale` y la imagen. Por eso cada página arma el suyo completo con la función en vez de declarar solo lo que cambia.

Por qué `serializeJsonLd` escapa `<`: el navegador cierra el `<script>` ante el primer `</script>`, aunque esté dentro de un string del JSON.

### Dónde se aplica

| Archivo | Qué declara |
|---|---|
| `src/app/layout.tsx` | `metadataBase: new URL(SITE_URL)` (sin esto las URL relativas se resolverían contra el host de cada preview), `title` con `default` y `template`, `applicationName`, `authors`, y `buildPageMetadata` de `/`. Inserta el JSON-LD en un `<script type="application/ld+json">` en todas las páginas. |
| `src/app/terminos/layout.tsx` | Título de la página (pasa por la plantilla) y `buildPageMetadata` de `/terminos`, con el título de Open Graph armado a mano porque Open Graph no pasa por la plantilla. La metadata vive en el layout porque la página es cliente y no puede exportarla. |
| `src/app/robots.ts` | `allow: '/'`, `disallow: '/api/'` y la URL del sitemap. No bloquea `/_next` ni `/img`: Google necesita CSS, JS e imágenes para renderizar. |
| `src/app/sitemap.ts` | `/` (sin fecha, a propósito: la del build diría que cambia en cada despliegue) y `/terminos` con `lastModified: LEGAL_UPDATED`. |
| `src/app/opengraph-image.tsx` | PNG de 1200x630 generado con `ImageResponse` de `next/og` en el build: marca `</>`, nombre con el apellido resaltado, rol y dominio. Usa la fuente por defecto porque Sora y Manrope vienen en woff2, que el generador no lee. |

### Íconos

Los toma Next por convención de nombre desde `src/app/`; `layout.tsx` no los declara a mano porque eso taparía los links generados.

| Archivo | Formato |
|---|---|
| `icon.svg` | 512x512, baldosa cuadrada azul noche con el `</>` en degradado. Es la fuente: los otros tres se generan desde este dibujo |
| `favicon.ico` | Multi-tamaño: 16, 32 y 48 px |
| `icon.png` | 192x192 |
| `apple-icon.png` | 180x180 |

El ícono es cuadrado porque Google descarta los favicons que no son 1:1, y el original (395x224, sin fondo) no lo era. La regeneración de los PNG/ICO desde el SVG no está automatizada en el repo.

## 7. Interfaz HTTP

**`POST /api/contact`** (`src/app/api/contact/route.js`). Recibe `{ email, number, message }` en JSON y envía el correo.

| Código | Cuándo |
|---|---|
| 200 | `{ message: 'Email sent successfully' }` |
| 400 | JSON inválido, campos faltantes o demasiado largos |
| 413 | Cuerpo de más de 10.000 bytes |
| 415 | `Content-Type` distinto de `application/json` |
| 429 | Más de 3 envíos por IP en 60 segundos |
| 500 | Falla del envío |

**`GET /cv`** (`src/app/cv/route.ts`). Devuelve el PDF más nuevo (por fecha de modificación) de `public/img/personal`, con `Content-Type: application/pdf` y `Content-Disposition: inline`; 404 `'CV no disponible'` si no hay ninguno. Es `dynamic = 'force-static'`: se resuelve una vez en el build.

Rutas que emite `next build`: `/`, `/_not-found`, `/cv`, `/terminos`, `/robots.txt`, `/sitemap.xml`, `/opengraph-image`, `/icon.svg`, `/icon.png`, `/apple-icon.png` como estáticas, y `/api/contact` como dinámica.

## 8. Seguridad

Cabeceras para todas las rutas (`source: '/:path*'`) en `next.config.ts`:

| Cabecera | Valor |
|---|---|
| `Content-Security-Policy` | `default-src 'self'; img-src 'self' data:; script-src 'self' 'unsafe-inline'` (+ `'unsafe-eval'` solo en desarrollo, por el HMR de Turbopack)`; style-src 'self' 'unsafe-inline'; font-src 'self'; connect-src 'self' https://vitals.vercel-insights.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self'` |
| `X-Frame-Options` | `DENY` |
| `X-Content-Type-Options` | `nosniff` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | camera, microphone, geolocation, payment, usb e interest-cohort deshabilitadas |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` |

Defensas de `/api/contact`, en orden:

- **Rate limit por IP**: `Map` en memoria, 3 envíos por minuto, techo de 10.000 entradas y barrido de expiradas.
- **IP del cliente**: solo `x-vercel-forwarded-for` y `x-real-ip`; si faltan, el último salto de `x-forwarded-for`, nunca el primero (lo elige quien llama).
- **`Content-Type: application/json` obligatorio**: bloquea POSTs cross-origin de formularios simples.
- **Tamaño medido dos veces**: `Content-Length` y `Buffer.byteLength` sobre el texto leído.
- **Validación** de tipos, longitudes (254 / 20 / 500) y formato; devuelve un objeto con solo los tres campos.
- **`stripCRLF`** sobre email y teléfono antes de armar el mail: evita inyección de cabeceras en el `replyTo`.
- Un JSON malformado se loguea con texto fijo, nunca con el mensaje de V8 (que incluye parte del cuerpo).

En `/cv`, el nombre del archivo se limpia de CR, LF y comillas antes del `Content-Disposition`. En el JSON-LD, `serializeJsonLd` impide cerrar el `<script>` desde el contenido.

Límite conocido, comentado en el código: el rate limit no persiste entre instancias serverless. No hay captcha.

## 9. Idioma, tema y accesibilidad

`SettingsProvider` mantiene `lang` (`'es' | 'en'`) y `theme` (`'dark' | 'light'`), los escribe en `<html>` (`lang` y `data-theme`) y los guarda en `localStorage`. El diccionario está en `src/lib/i18n.ts`, con `translateCategory`, `translateNav` y `translateLink`, que caen al valor original si falta la clave.

`layout.tsx` inyecta un script inline que corre antes del primer pintado y restaura idioma y tema; solo acepta dos valores conocidos por clave.

El HTML sale del servidor en español; el inglés lo elige el visitante en el navegador sobre la misma URL. Por eso no hay `hreflang` ni variantes por idioma que declarar en la metadata.

Decisiones de accesibilidad que no hay que deshacer: regiones `aria-live` permanentes (formulario y filtro de skills), `role='list'` explícito, `aria-pressed` en los filtros, `aria-current` en la navegación, botón de envío con `aria-disabled` en vez de `disabled`, y la copia duplicada de la marquesina con `aria-hidden` y `tabIndex -1`.

## 10. Animación y rendimiento del cliente

- **`useMarquee`**: marquesina infinita; el set de tarjetas se renderiza dos veces y el desplazamiento se toma módulo el ancho de una copia. Se mueve por `transform`, se pausa al arrastrar o recibir foco y reanuda a los 7 s; fuera del panel activo el bucle se apaga. La marquesina lleva `align-self: stretch` para que en mobile no ensanche la página.
- **`useCursorTrail`**: punto + anillo, escritos directo en el DOM desde el bucle de animación. Solo con `pointer: fine`.
- **`WaveField`**: 14 trazados SVG calculados una sola vez al cargar el módulo. Se anima el grupo `<g>` entero (`waveDrift 26s`), no cada línea: a velocidades distintas las líneas se desfasaban y el campo se deshacía. La profundidad la dan la opacidad y la amplitud. Con `prefers-reduced-motion` se detiene.
- Los enlaces del header son `<a>` y no `next/link` (el router precargaba el PDF del CV). La fuente monoespaciada sale del sistema (costaba 41 KB compitiendo con el LCP).

## 11. Puesta en marcha y despliegue

```bash
cd client
npm install
npm run dev
```

| Comando | Qué hace |
|---|---|
| `npm run dev` | `next dev` - desarrollo con Turbopack |
| `npm run build` | `next build` - compilación de producción |
| `npm start` | `next start` - sirve la compilación |
| `npm run lint` | `eslint` |
| `npm test` | `vitest run` - la suite completa una vez |
| `npm run test:watch` | `vitest` - modo interactivo |
| `npm run test:coverage` | `vitest run --coverage` - texto + HTML en `coverage/` |

**Despliegue.** El sitio está pensado para Vercel (`@vercel/speed-insights`, `connect-src` a `vitals.vercel-insights.com`, confianza en `x-vercel-forwarded-for`, `.vercel` en `.gitignore`). No hay `vercel.json` ni CI versionados: proyecto, dominio y variables de producción viven en el panel de Vercel.

**Cambiar de dominio**: editar `SITE_URL` en `src/lib/site.ts` y volver a desplegar. Canonical, `og:url`, robots, sitemap, JSON-LD y la tarjeta para compartir se recalculan solos.

## 12. Variables de entorno

Viven en `client/.env.local`, cubierto por `.env*` en `.gitignore`. No hay `.env.example`.

| Variable | Propósito | Obligatoria |
|---|---|---|
| `NODEMAILER_EMAIL` | Casilla de Gmail que envía y recibe el contacto (`from`, `to` y `auth` en `src/lib/nodemailer.js`) | Sí, para `/api/contact` |
| `NODEMAILER_PASSWORD` | Contraseña de aplicación de esa casilla | Sí, para `/api/contact` |
| `IP_MOBILE` | IP de la red local para probar desde el celular; va a `allowedDevOrigins` | No, solo desarrollo |
| `PORT` | Ningún archivo la lee; Next la toma del entorno por convención | No |

El SEO no usa variables de entorno: el dominio está fijo en `SITE_URL`. Sin las dos de nodemailer el sitio funciona entero salvo el envío del formulario (500).

## 13. Tests

Ejecutado al documentar: **19 archivos, 100 tests en verde** (vitest 4.1.10). `eslint` sin advertencias y `next build` genera las 13 páginas estáticas con Next.js 16.3.0.

Dos entornos en una corrida: `jsdom` por defecto y `node` para `src/app/api/**` y `src/app/cv/**`. `src/test/setup.ts` aporta `localStorage`/`sessionStorage` en memoria, `ResizeObserver`, `matchMedia` y un mock de `next/image`.

| Archivo | Casos | Qué garantiza |
|---|---|---|
| `app/api/contact/route.test.js` | 12 | Los códigos de respuesta, un `Content-Length` mentiroso, y que `sendEmail` reciba el objeto saneado |
| `lib/seo.test.ts` | 11 | Canonical y Open Graph completos por página, tarjeta grande de X, imagen para compartir, WebSite en el JSON-LD, ninguna referencia `@id` colgada, perfiles solo `https` y codificados, que el JSON-LD no pueda cerrar el `<script>`, robots apuntando al sitemap del dominio sin bloquear recursos, y sitemap con URLs absolutas empezando por la portada |
| `lib/validation.test.js` | 9 | Tipos, faltantes, formatos, límite de 500 y descarte de campos extra |
| `lib/i18n.test.ts` | 8 | Mismas claves en es y en, y fallback de los helpers |
| `lib/clientIp.test.js` | 7 | Precedencia de cabeceras y último salto |
| `lib/url.test.ts` | 6 | `safeHref` acepta lo permitido y neutraliza el resto |
| `lib/legal.test.ts` | 6 | Mismas secciones en ambos idiomas, sin textos vacíos, fecha ISO válida |
| `_contact/Contact.test.tsx` | 5 | Camino feliz, error sin perder lo escrito, falla de red, contador |
| `_project/ProjectList.test.tsx` | 5 | Set duplicado, copia no anunciada ni tabulable, stack anunciado |
| `lib/rateLimit.test.js` | 4 | Tope por IP, independencia entre IPs, liberación al minuto |
| `terminos/page.test.tsx` | 4 | Secciones, fecha, salida al portfolio, idioma guardado |
| `cv/route.test.ts` | 4 | PDF más nuevo, ignora no-PDF, 404, saneado del encabezado |
| `_shared/CursorTrail.test.tsx` | 4 | Solo puntero fino, cursor del sistema, desmontaje, cambio de forma |
| `_project/useMarquee.test.tsx` | 4 | Avance, cero cuadros fuera de vista, pausa, reanudación a los 7 s |
| `not-found.test.tsx` | 3 | Encabezado, enlace de vuelta, signos decorativos ocultos |
| `_header/HeaderLinks.test.tsx` | 3 | Nombre de la navegación, `aria-current`, `goTo` |
| `_skill/SkillItems.test.tsx` | 2 | Un chip por ítem, atenuado al filtrar |
| `_settings/SettingsControls.test.tsx` | 2 | Los dos toggles y sus atributos en `<html>` |
| `_skill/SkillsSelector.test.tsx` | 1 | `aria-pressed` en la categoría activa |

La cobertura excluye `src/app/layout.tsx`, `src/app/page.tsx` y `src/test`. `opengraph-image.tsx` no tiene test propio.

## 14. Convenciones del repositorio

- **Un componente, un archivo, agrupado por dominio** en carpetas privadas; el test al lado del archivo que prueba.
- **TypeScript salvo la capa de correo**: `api/contact/route.js`, `validation`, `rateLimit`, `clientIp`, `nodemailer` y `logger` siguen en JS. `tsconfig.json` incluye explícitamente `src/app/api/contact/route.js`.
- **Los comentarios explican el porqué.** Al cambiar esas líneas, actualizar el comentario.
- **Una sola hoja de estilos**: paleta en `:root`, reescrita bajo `html[data-theme='light']`; el layout horizontal es la base y el bloque `VERTICAL` lo reconvierte. Las clases `.logo--onDark`, `.logo--onLight` y `.logo--plate` las arma `logoToneClass()` en runtime.
- **Identidad y dominio solo en `src/lib/site.ts`**: no escribir el dominio ni el nombre a mano en otro archivo.
- **Metadata por página con `buildPageMetadata`**, nunca un `openGraph` parcial.
- **Nada de secretos en el repo**: `.gitignore` cubre `.env*`, lockfiles, `/coverage`, `/.next`, `/out`, `/build`, `logs/` y `*.log`.

## 15. Lo que parece muerto y no lo está

La limpieza de código muerto (Tailwind, `postcss.config.mjs`, campo `class` de `project.json`, entradas fantasma de `tsconfig`, `.gitignore`, eslint y vitest) ya está commiteada. En futuras limpiezas, esto **no** se borra:

| Elemento | Por qué está vivo |
|---|---|
| `public/img/banner/Banner.png` | Ningún archivo de `src/` lo referencia, pero lo usa la primera línea del `README.md` de la raíz (ficha de perfil) por URL cruda contra `main`. Borrarlo rompe el perfil, no el sitio. |
| `sass` | Único compilador de estilos. |
| `@vitest/coverage-v8` | Proveedor que pide `vitest.config.mts`. |
| `.logo--onDark` / `--onLight` / `--plate` | Los nombres los arma `logoToneClass()` en runtime. |
| `PORT` en `.env.local` | Next la toma del entorno por convención. |
| `icon.svg` | Es la fuente de `favicon.ico`, `icon.png` y `apple-icon.png`. |

## 16. Pendientes y huecos conocidos

Verificados contra el código:

- **El dominio no se puede verificar desde el repo.** `SITE_URL` es `https://tomasssale.com` (tres "s"), mientras que el usuario de GitHub es `tomassale`. Si no es el dominio contratado, canonical, sitemap, robots y JSON-LD apuntan a otro sitio. Confirmarlo contra el panel de Vercel.
- **Las redirecciones `www` / `*.vercel.app` -> apex** que pide el comentario de `site.ts` no viven en el código; dependen del hosting.
- **El CV "más nuevo" no es confiable en producción si hay más de un PDF.** `/cv` elige por fecha de modificación, pero git no guarda esa fecha: en un clon (como el que hace Vercel) todos los archivos tienen la del checkout. Conviene dejar un solo PDF en la carpeta.
- **El nombre del CV declarado no coincide con el archivo**: `header.json` dice `Tomás Sale - Desarrollador Web.pdf` y el archivo es `Tomas Sale - Desarrollador Web.pdf`. No rompe nada (`download` solo sugiere el nombre), pero se descarga con otro.
- **La regeneración de los íconos PNG/ICO desde `icon.svg` no está automatizada.** Si cambia el SVG, hay que regenerarlos a mano.
- **No hay `.env.example`.** TODO: agregar `client/.env.example` con las cuatro claves, sin valores.
- **Lockfiles sin versionar** y duplicados; `bun.lock` todavía menciona Tailwind.
- **El rate limit no sobrevive al modelo serverless**; no hay captcha.
- **Los términos y condiciones son un borrador** (`src/lib/legal.ts` lo declara); `LEGAL_UPDATED` se actualiza a mano y ahora también alimenta el `lastModified` del sitemap.
- **No hay `LICENSE`** en el repositorio.
