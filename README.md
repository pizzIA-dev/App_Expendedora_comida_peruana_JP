# Expendedora de comida peruana — M0

Maqueta navegable de la pantalla táctil de una máquina expendedora de almuerzos peruanos.
Proyecto académico de Design Thinking.

> **Simulación académica: no se realizará ningún cobro ni entrega real.**

**Demo en línea (V2, versión vigente):** <https://app-expendedora-comida-peruana-jp.vercel.app/>
(Vercel, se actualiza sola con cada push a `main`).
**V1 (primer testeo):** rama `v1`; copia en <https://app-expendedora-comida-peruana-opjd8z4a6-pizz-ia.vercel.app/>
(despliegue inmutable de Vercel; se abre sin iniciar sesión solo si *Vercel Authentication* está desactivado).

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

- El pedido admite varios platos: máximo 5 por pedido y, por plato, lo que haya en stock.
- Salsas y cremas sin costo, elegidas al agregar cada plato: varias por plato, sin repetir.
- El stock baja con cada compra simulada y vuelve a su valor inicial al recargar la página.
- Todo el estado vive en memoria: al recargar se vuelve a la bienvenida.
- El pago y la entrega son ficticios; no se pide ni procesa ningún dato bancario.
- La evaluación es demostrativa: **las respuestas no se guardan ni se envían**.
- No hay base de datos, sesiones, métricas, cronometraje ni exportación CSV (llegan en V1).
- Marca, fotos, precios, ingredientes, alérgenos y datos de conservación son provisionales
  e ilustrativos (ver `docs/assets.md` y `docs/decisions.md`).

## Editar contenido

- Platos, precios y stock: `src/data/dishes.json` (precios en céntimos).
- Salsas (iguales para todos los platos) y sus fotos: `src/data/sauces.ts`, `public/images/salsas/`.
- Límite de platos por pedido y texto del envase: `src/config/brand.ts`.
- Marca, avisos y duración de la simulación: `src/config/brand.ts`.
- Colores y tipografías: bloque `@theme` de `src/index.css`.

## Créditos de imágenes

Fotos de olluquito, arroz chaufa, pollo a la plancha y tallarines verdes: Wikimedia Commons
(Dtarazona, CC BY-SA 3.0 y dominio público; Miguel Alan Córdova Silva, CC BY-SA 4.0; Ovruni,
CC BY-SA 4.0). Fotos de tacu tacu y carapulcra: proporcionadas por el equipo (origen por confirmar). Fotos de salsas: proporcionadas por el
equipo (origen por confirmar). Detalle en `docs/assets.md`.

## Documentación

- `PLANNING.md` — alcance y reglas por etapa.
- `STACK_TECNICO.md` — tecnologías por etapa.
- `ESTADO_PROYECTO.md` — avance actual.
- `docs/` — referencias, decisiones, recursos y checklist.
