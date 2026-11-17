# Expendedora de comida peruana — M0

Maqueta navegable de la pantalla táctil de una máquina expendedora de almuerzos peruanos.
Proyecto académico de Design Thinking.

> **Simulación académica: no se realizará ningún cobro ni entrega real.**

**Demo en línea:** <https://app-expendedora-comida-peruana-jp.vercel.app/> (Vercel, se actualiza
sola con cada push a `main`).

## Requisitos

- Node.js 20 o superior (probado con 24) y npm.

## Ejecutar

```bash
npm install
npm run dev
```

Abre <http://localhost:5173>. Para presentar como kiosco, usa el navegador en pantalla
completa (F11) en un monitor horizontal 16:9.

## Build

```bash
npm run build
npm run preview
```

El resultado queda en `dist/` y es un sitio estático (se puede subir a Vercel sin configuración).

## Recorrido

Bienvenida → Catálogo → Detalle → Resumen → Pago simulado → Entrega simulada → Evaluación opcional.

## Límites de M0

- El pedido admite varios platos, con un máximo de 5 unidades por plato.
- Todo el estado vive en memoria: al recargar se vuelve a la bienvenida.
- El pago y la entrega son ficticios; no se pide ni procesa ningún dato bancario.
- La evaluación es demostrativa: **las respuestas no se guardan ni se envían**.
- No hay base de datos, sesiones, métricas, cronometraje ni exportación CSV (llegan en V1).
- Marca, fotos, precios, ingredientes, alérgenos y datos de conservación son provisionales
  e ilustrativos (ver `docs/assets.md` y `docs/decisions.md`).

## Editar contenido

- Platos y precios: `src/data/dishes.json` (precios en céntimos).
- Marca, avisos y duración de la simulación: `src/config/brand.ts`.
- Colores y tipografías: bloque `@theme` de `src/index.css`.

## Documentación

- `PLANNING.md` — alcance y reglas por etapa.
- `STACK_TECNICO.md` — tecnologías por etapa.
- `ESTADO_PROYECTO.md` — avance actual.
- `docs/` — referencias, decisiones, recursos y checklist.
