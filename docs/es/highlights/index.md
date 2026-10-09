---
title: 'Aspectos destacados del frontend'
description: 'Notas sobre controles, idiomas, animaciones, SEO y recursos.'
---

# Aspectos destacados del frontend

## 1. Jerarquía que conduce a una acción

La introducción explica el producto, las escenas lo hacen visible y las tarjetas permiten profundizar antes de instalar. Conserva la página original y amplía la información mediante secciones adicionales. La jerarquía se comprueba con ritmo, espacio y contraste, no por cantidad de componentes.

## 2. Componentes que poseen la interfaz

Cada ilustración está construida con React y CSS legibles. Texto, geometría y tiempos son editables. Una captura sirve de referencia temporal; no sustituye un componente.

## 3. Consistencia servidor/cliente

La composición, traducción y formato de fechas se resuelven una vez en el servidor. Los controles de cliente añaden eventos sin recrear la estructura inicial. Así se evita que distintas versiones de ICU cambien fechas durante la hidratación.

## 4. Mejora progresiva

`details`, `summary`, enlaces y botones aportan semántica y comportamiento básico. JavaScript añade cierre exterior, Escape, foco y bloqueo del menú móvil. El contenido relevante permanece accesible sin JavaScript.

## 5. Idiomas como contrato

Un registro gobierna rutas, etiquetas, dirección, documentos y SEO. La validación compara claves, variables, rich text y artículos. La tipografía necesita además revisión visual: la paridad de claves no detecta textos recortados.

## 6. RTL coherente

Las propiedades lógicas alinean menús y espaciado. Árabe invierte el flujo del documento; código y comandos mantienen su orden. No se invierte el nombre de marca ni se aísla arbitrariamente cada palabra latina.

## 7. Movimiento según su finalidad

Framer Motion coordina transiciones de interfaz; CSS conserva escenas repetitivas; Three.js maneja geometría y shaders. Esta separación facilita modificar una animación sin rehacer todas las demás.

## 8. Ciclo de vida GPU explícito

Visibilidad, primer plano, compilación, límite de fps y limpieza controlan el coste. Movimiento reducido y fallback WebGL preservan el uso de la página. Una librería conocida no garantiza superar una implementación menor.

## 9. Superficies adaptables

Las escenas usan geometrías y consultas de contenedor para conservar proporciones al cambiar de tamaño. La aceptación exige observar móvil, escritorio, saltos de línea y cada etapa de animación.

## 10. SEO observable

Títulos, descripciones, canonical, alternativas, compartir y datos estructurados existen en el HTML inicial. Los documentos cambian metadatos al navegar. La publicación estática comprueba el prefijo de repositorio y las rutas reales.

## 11. Documentación como producto

La documentación abre inglés directamente, comparte idiomas con la web y cuenta con búsqueda y navegación por capítulo. Describe decisiones y límites de este frontend, no un manual de ejecución de Harness.

## 12. Verificación y propiedad

Los hashes comprueban recursos de entrada estáticos; los tests verifican comportamiento; presupuestos de payload limitan regresiones. Los informes quedan ignorados y no se reemplaza el baseline para ocultar crecimiento. `NOTICE.md` distingue código original de marca y recursos de terceros.

## Rendimiento con evidencia

La decoración espera las fuentes y la entrada del primer bloque, seguida de una actualización de pantalla y una tarea durante un periodo de inactividad del navegador. Se elimina la rama flow-map de influencia siempre nula sin cambiar el resultado. El contador de fotogramas exige activación explícita. Se conservan pausa fuera de pantalla y en segundo plano, 30fps, movimiento reducido y liberación GPU. Mide Node y Pages por separado y compara varias ejecuciones con dispositivos reales.

- `src/components/graphics/schedule-scene.ts`, `fluid-shaders.ts`
- `src/components/graphics/particle-field.tsx`, `tile-scene.ts`
- `tests/tools/audit-performance.mjs`, `tests/fixtures/performance-budgets.json`
