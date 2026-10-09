---
title: 'Descripción del proyecto'
description: 'Estructura, implementación y pruebas del sitio que recrea DeepSeek Harness.'
---

# Descripción del proyecto

Este repositorio recrea el sitio DeepSeek Harness con Next.js y React. La documentación describe las páginas, los componentes, los idiomas, las animaciones y las pruebas. VitePress genera los artículos.

## La experiencia y sus límites

La página conserva la introducción, cuatro demostraciones, tarjetas de capacidades, instalación y pie. Las demostraciones muestran una conversación, plugins, archivos y tareas programadas; la traza añade una vista de ejecución. Son ilustraciones, no un agente real: no instalan plugins ni ejecutan comandos.

El encabezado se contrae al superar 80 píxeles de desplazamiento. Hasta entonces puedes cambiar de idioma; al comenzar la contracción se cierra y desaparece el selector. El menú móvil, las descargas, copiar comandos y pausar escenas tienen estados explícitos. El pie chino presenta WeChat; los demás idiomas enlazan a DeepSeek en X.

## Qué puede aprender un ingeniero frontend

- Componer HTML de servidor y controles de cliente sin duplicar la interfaz.
- Mantener una geometría compleja con CSS, consultas de contenedor y componentes semánticos.
- Separar movimiento de interfaz con Framer Motion, líneas temporales CSS y gráficos Three.js.
- Tratar idiomas, accesibilidad y SEO como contratos compartidos.
- Entregar documentación VitePress en un sitio React y comprobar navegación y metadatos.
- Distinguir recursos fuente, salidas generadas, caché y presupuestos medibles.

## Una base común para varios idiomas

`src/i18n/locales.json` define etiquetas nativas, rutas, dirección y etiquetas de idioma. Inglés es el idioma principal de la documentación, abierto directamente en `/docs/`. Español y portugués complementan inglés, chino, japonés, francés, alemán, coreano, ruso y árabe. Una cobertura amplia no equivale a representar todos los países; las traducciones necesitan revisión humana.

Árabe usa RTL; el código sigue siendo LTR. Los enlaces de idioma conservan consultas y fragmentos. La estructura de cinco artículos se mantiene en todos los idiomas, con navegación, descripciones y enlaces alternativos correspondientes.

## Entrega y propiedad

El servidor Next.js sirve HTML por solicitud y documentos con ETag y caché acotada. GitHub Pages recibe una exportación estática independiente, con prefijo de repositorio y sin necesitar Node.js en producción. En Pages los metadatos se fijan durante la compilación; la caché de servidor solo existe en el despliegue Next.js.

Se mantienen componentes, shaders, CSS, Markdown e recursos de entrada estáticos. `.next`, `public/docs`, `.pages-build` y `out` son salidas ignoradas. El material de marca sigue siendo de terceros; consulta `NOTICE.md`.

## Evidencia antes que afirmaciones

`pnpm verify` comprueba formato, lint, contratos, tipos y compilación. Playwright observa hidratación, controles, idiomas, accesibilidad y gráficos. Lighthouse aporta mediciones de laboratorio, no garantías de velocidad. Usar Three.js o Framer Motion no demuestra una mejora de rendimiento ni fidelidad de píxel.

Continúa con [Arquitectura](./architecture/), [Aspectos destacados](./highlights/), [Requisitos](./requirements/) y [Ruta de aprendizaje](./learning/).
