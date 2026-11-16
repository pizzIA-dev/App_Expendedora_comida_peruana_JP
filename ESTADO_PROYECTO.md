# Estado del proyecto

Última actualización: 2026-11-16

## Etapa actual

**M0 — maqueta navegable: implementada y verificada en local. Sin commit, sin etiqueta y sin publicar.**

## Hecho

- Proyecto base: React 19, Vite 8, TypeScript 7, Tailwind CSS 4, lucide-react, fuentes locales
  (Bricolage Grotesque + DM Sans vía `@fontsource-variable`).
- Siete pantallas: bienvenida, catálogo, detalle, resumen, pago simulado, entrega simulada, evaluación.
- Catálogo de cinco platos en `src/data/dishes.json` con precios del Word; tallarines rojos agotado.
- Flujo y guardas en el reducer: una unidad, agotados bloqueados, cambio de plato limpia el método
  de pago, cancelación con confirmación, pago exige método y bloquea doble toque, reinicio limpio.
- Indicador de cuatro etapas, avisos de simulación, marca provisional «Sazón al Paso».
- Configuración de agentes: `opencode.json`, `.mcp.json`, `.agents/mcp_config.json` y plugin
  apuntando al vault de este proyecto.
- Documentación: `README.md`, `CLAUDE.md`, `AGENTS.md`, `docs/`.

## Verificado (2026-11-16)

- `npm run typecheck` y `npm run build` sin errores.
- Recorrido completo en navegador a 1366×768, revisando visualmente las siete pantallas.
- Reglas comprobadas en navegador: agotado no seleccionable, cancelar/conservar, cambiar plato,
  volver al inicio con y sin selección, método de pago se limpia, doble toque en «Simular pago»
  produce un solo pedido, finalizar reinicia.
- Sin scroll horizontal ni contenido recortado a 1920×1080, 1366×768 y 390×844.

## No verificado

- Recorrido completo solo con teclado (los controles son nativos y hay foco visible, pero no se
  probó tecla a tecla).
- Contraste medido con herramienta; la paleta se eligió para cumplir AA pero no se auditó.
- Dispositivos táctiles reales.

## Pendiente de M0

- [ ] Primer commit y etiqueta `m0-maqueta`.
- [ ] Publicar demo (Vercel, plan gratuito) — requiere que el usuario inicie sesión en Vercel.
- [ ] Guardar capturas de las pantallas en `docs/screenshots/`.
- [ ] Fotos definitivas: las actuales son recortes de las imágenes de referencia, de baja
      resolución (ver `docs/assets.md`).
- [ ] Revisión del equipo: nombre de marca, textos, ingredientes y alérgenos (todo provisional).

## Siguiente etapa (no iniciar sin pedido explícito)

V1: sesiones anónimas, eventos, Supabase, evaluación guardada, CSV. Ver `PLANNING.md` §13.

## Decisiones tomadas

Ver `docs/decisions.md`.
