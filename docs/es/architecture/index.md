---
title: 'Arquitectura'
description: 'Componentes React, rutas Next.js, animaciones y entrega de artículos VitePress.'
---

# Arquitectura

## De la URL al HTML

Los grupos `src/app/(chinese)` y `src/app/(localized)` seleccionan el idioma y el documento raíz. `/` y `/harness/` conservan la entrada china; los demás idiomas usan `/<locale>/harness/`. El layout fija `lang` y `dir`. La página obtiene el diccionario y compone `src/components/landing-page.tsx` en el servidor.

`website-metadata.ts` genera título, descripción, canonical, hreflang, Open Graph y datos estructurados. En producción `SITE_URL` determina el origen; las vistas previas del servidor usan la solicitud. HTML y contenido hidratado comparten datos: no hay adaptadores de HTML capturado ni modificaciones de Flight.

## Directorios con responsabilidades

| Directorio                      | Responsabilidad                              |
| ------------------------------- | -------------------------------------------- |
| `components/layout`             | Encabezado, pie y marca                      |
| `components/controls`           | Idiomas, descargas, copiado y contacto       |
| `components/sections`           | Composición de demostraciones y tarjetas     |
| `components/previews`           | Ilustraciones y líneas temporales            |
| `components/motion`             | Entradas y movimiento vinculado al scroll    |
| `components/graphics`           | Three.js, GLSL y geometría                   |
| `components/shared`, `styles`   | Texto enriquecido y estilos comunes          |
| `i18n`, `config`                | Idiomas, contenido y destinos del producto   |
| `lib`                           | SEO y entrega de documentos                  |
| `tests/tools`, `tests/fixtures` | Verificación e recursos de entrada de prueba |

Los imports directos conservan los límites servidor/cliente y la carga diferida. No se añade una capa `harness` a todos los componentes ni recursos públicos.

## Tres tipos de movimiento

Framer Motion controla entradas de secciones y resortes del encabezado y las superficies. Las líneas temporales CSS preservan la progresión de las demostraciones al pausarlas. `use-demo-scene.ts` coordina pausa del usuario, viewport, pestaña activa y movimiento reducido. Las tareas cambian de escenario al iterar su animación, no según un reloj separado.

Three.js dibuja fondos propios con shaders GLSL, un triángulo de pantalla completa para el hero y geometría instanciada para la llamada final. Los módulos se cargan cuando son necesarios, compilan antes del bucle, limitan el render a 30 fps y liberan recursos. El fondo final se desactiva en móvil; movimiento reducido evita inicializar la decoración GPU. Si WebGL falla, quedan fondos CSS y controles nativos.

## Documentación y caché

VitePress usa Vue para construir cinco artículos por idioma. Next.js lee esos HTML desde `public/docs`, añade SEO por origen y los devuelve mediante una ruta propia. La caché incluye origen y ruta, agrupa renders concurrentes, limita 128 entradas durante cinco minutos y expulsa fallos. Desarrollo evita resultados antiguos; ETag permite `304` sin cuerpo.

El tema VitePress actualiza dirección y SEO después de navegar. No puede conservar los metadatos del capítulo anterior. Los chunks con hash tienen caché inmutable; el HTML y los recursos de entrada estables requieren una política distinta.

## Exportación para GitHub Pages

`tests/tools/build-pages.mjs` crea `.pages-build` con nuestro código fuente. Allí predefine las rutas, elimina la ruta documental de servidor y usa `output: export` con imágenes sin optimizador. El build añade el prefijo de repositorio a recursos y enlaces, genera VitePress y Next.js y copia el resultado a `out`. Finalmente elimina el directorio temporal, incluso si falla.

Esto mantiene intacto el servidor de desarrollo. Pages sirve documentos directamente: no ejecuta caché ETag propia ni rutas por solicitud. `check:pages` comprueba rutas, metadatos y destinos locales antes de subir el artefacto. El workflow obtiene la URL real de Pages para repositorios, sitios raíz y dominios personalizados.

## Configuración de herramientas

`AGENTS.md` concentra instrucciones compartidas. Cursor lo referencia; Claude importa ese archivo; Codex usa su descubrimiento normal y configuración local mínima. Las preferencias privadas, tokens, MCP y estado de ejecución quedan fuera de Git. Oxlint y Oxfmt son las herramientas de lint y formato.

## Límites de renderizado y despliegue

Las ilustraciones estáticas de archivos y trazas se renderizan en el servidor. Los controles y el workflow con escenarios cambiantes son componentes cliente. El gran árbol SVG de plugins conserva una frontera cliente para limitar la serialización HTML/RSC. Compara HTML y scripts antes de mover una frontera.

```text
locale registry → deployment paths → Next.js / VitePress → metadata
server content → client controls → CSS playback / Three.js lifecycle
verify:full → Pages export → static tests + budgets → publish artifact
```

- `src/config/deployment.ts`, `src/i18n/locales.ts`
- `src/components/sections/capability-demos.tsx`, `capability-demo.tsx`
- `src/components/previews/plugins-demo.tsx`, `workflow-preview.tsx`
- `tests/tools/build-pages.mjs`, `.github/workflows/quality.yml`
