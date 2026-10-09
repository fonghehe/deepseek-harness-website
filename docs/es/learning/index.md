---
title: 'Ruta de aprendizaje'
description: 'Orden de lectura del código y seis ejercicios para modificar y comprobar el sitio.'
---

# Ruta de aprendizaje

Abre el sitio y localiza el código que genera la página. Los seis ejercicios revisan tarjetas, idiomas, caché, animaciones, metadatos de artículos y recursos.

## Primero observa y traza

Abre inglés y árabe, cambia el tamaño de pantalla, navega con teclado y activa movimiento reducido. Anota estados del encabezado, menús y demostraciones. Luego sigue `page.tsx` → `layout.tsx` → `landing-page.tsx` → componentes → diccionario → metadata. Explica qué HTML produce el servidor y qué añaden los eventos del cliente.

## Ejercicio 1: Una tarjeta compartida

Modifica una tarjeta en `site-content.json` para todos los idiomas. Conserva su ID estable y destino. Comprueba el contenido antes y después de hidratar, sin JavaScript y en árabe móvil. El resultado debe usar el mismo árbol JSX y conservar las demostraciones originales.

## Ejercicio 2: Un idioma de extremo a extremo

Sigue español desde el registro a menú, layout, diccionario, cinco documentos y sitemap. Cambia idioma con query y fragmento. Abre un capítulo y cambia a portugués conservando el capítulo. Comprueba canonical y dirección después de la navegación. Explica por qué traducir un archivo JSON no completa la localización.

## Ejercicio 3: Entrega y caché

En modo servidor solicita `/docs/en/architecture/`, reutiliza su ETag real y observa un `304` vacío. Con `SITE_URL` sin configurar cambia el host de preview y comprueba aislamiento de origen. Lee `document-cache.ts`: entradas acotadas, agrupación de promesas, expiración y expulsión de errores.

Compara con el mismo artículo exportado a Pages. Explica qué decide el build y qué controlaba el servidor; no esperes que Pages reproduzca ETags de la aplicación.

## Ejercicio 4: Una regresión de movimiento

Pausa y reanuda una escena. Muévela fuera del viewport, cambia de pestaña y activa movimiento reducido. Observa si mantiene su progreso y si el fondo GPU deja de trabajar. Identifica el responsable entre `use-demo-scene`, CSS, Framer Motion y Three.js. Una captura no demuestra estos estados.

## Ejercicio 5: SEO durante navegación

Mejora una descripción en `docs/descriptions.json` y el frontmatter correspondiente. Construye docs, cambia de capítulo e idioma y cuenta los nodos canonical y alternativos. Comprueba que los metadatos anteriores desaparezcan y las URLs utilicen el origen y prefijo publicados.

## Ejercicio 6: Propiedad y publicación

Lee el inventario de recursos, cambia un input solo si es necesario y revisa su hash. Exporta con un prefijo de repositorio, ejecuta `check:pages` y comprueba que fonts, favicon, escenas y docs carguen. Distingue `.pages-build`, `out`, código original y material de terceros.

## Verifica y explica el resultado

```sh
pnpm verify
E2E_PORT=3101 pnpm test:e2e
pnpm perf:check
pnpm check:links --strict
```

Usa un puerto libre y un build de producción para el navegador. Los resultados locales y los de GitHub Actions son evidencias distintas. Una explicación profesional conecta problema del visitante, límite del código, escenario probado y limitación pendiente. No presenta una lista de librerías como prueba de rendimiento, accesibilidad o fidelidad.

## Seguir una mejora completa

Localiza una tarea larga en los archivos siguientes, aplica un cambio acotado y compara bytes, interacción y capturas. Guarda informes fuera de las fuentes versionadas. Revisa diferencias antes de actualizar referencias; las imágenes locales no demuestran fidelidad píxel a píxel al original.

```sh
pnpm analyze
pnpm perf:repeat
pnpm test:visual
```

| Término           | Significado                                          |
| ----------------- | ---------------------------------------------------- |
| SSR               | Renderizado en el servidor                           |
| Hydration         | Hidratación: añadir interacción al HTML del servidor |
| Reduced motion    | Preferencia de movimiento reducido                   |
| RTL               | Diseño de derecha a izquierda                        |
| Visual regression | Pruebas de regresión visual                          |
| Resource budget   | Presupuesto de recursos                              |
