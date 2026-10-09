---
title: 'Requisitos del sitio'
description: 'Comprobaciones de diseño, navegación, accesibilidad, publicación y rendimiento.'
---

# Requisitos del sitio

## Aceptación visual y funcional

Una recreación de componentes solo se acepta al comparar geometría, fuentes, espacios, capas, controles y etapas de animación con la referencia. Prueba los cuatro demos, copiar comandos, opciones de descarga y encabezado a 0, 80 y más de 80 píxeles. No basta una captura del estado final.

En móvil comprueba menús, scroll y áreas táctiles. Con teclado comprueba foco, Escape y activación nativa. En árabe revisa lectura y código LTR. El pie chino abre el QR; otros idiomas enlazan a X. El selector de idiomas debe caber en el viewport y permitir desplazarse por todas las opciones.

## Contrato de contenido

Cada idioma necesita diccionario, tarjetas, etiquetas accesibles, metadatos, navegación y cinco artículos. Mantén los placeholders y etiquetas de rich text. Las descripciones de frontmatter coinciden con `docs/descriptions.json`. Inglés sigue siendo la entrada de documentación; cambiar idioma conserva el artículo.

## Fuente y salidas

Mantén `src`, Markdown, configuración e recursos de entrada estáticos. Ignora dependencias, cachés, informes, `.next`, `.pages-build`, `public/docs` y `out`. No subas archivos privados ni añadas HTML o chunks capturados. Los hashes demuestran integridad, no licencia.

## Publicar en Pages

Añade el remote, sube la rama predeterminada y selecciona **Settings → Pages → Build and deployment → GitHub Actions**. El workflow `Publish website` obtiene la URL, verifica el código, compila el sitio, valida enlaces locales, sube el artefacto y publica en el entorno `github-pages`.

Para reproducir una URL con subruta:

```sh
SITE_URL=https://example.github.io/repository/ pnpm build:pages
SITE_URL=https://example.github.io/repository/ pnpm check:pages
```

Un sitio raíz usa una URL sin nombre de repositorio. Pages no ejecuta Node.js: los metadatos se generan en build y no aplica la caché dinámica de Next.js. El workflow proporciona la URL pública como resultado; un build local no prueba un despliegue remoto.

## Entrega Next.js

Para un servidor Node.js usa `pnpm build` y `pnpm start`, con `SITE_URL` correspondiente al dominio público. Incluye todo `public/docs` generado. Verifica headers, ETags, errores de ruta y canonical en el dominio publicado.

## Medición y colaboración

Ejecuta `pnpm verify`, pruebas de navegador y presupuestos cuando la modificación lo requiera. No relajes la línea base para obtener éxito. Lighthouse describe el entorno medido; complementa con dispositivos reales y revisión humana. Usa las plantillas de issues y PR, respeta `CONTRIBUTING.md` y comunica vulnerabilidades de manera privada según `SECURITY.md`.

## Validación manual

Comprueba teclado, Escape y recuperación del foco en los menús, y los avisos de copia con un lector de pantalla. Examina desplazamiento y etapas animadas en un teléfono. Repite en árabe con textos largos y comandos bidireccionales. Registra dispositivo, navegador, preferencia de movimiento y evidencia. Las traducciones necesitan revisión de hablantes nativos.

```sh
pnpm verify:full
SITE_URL=https://example.github.io/repository/ pnpm build:pages
SITE_URL=https://example.github.io/repository/ pnpm check:pages
SITE_URL=https://example.github.io/repository/ pnpm perf:pages
```
