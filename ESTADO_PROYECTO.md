# Estado del proyecto

Última actualización: 2026-11-16

## Etapa actual

**M0 — maqueta navegable: implementada y verificada en local. Demo publicada en Vercel desde `main`. Ajustes previos a la demostración (avisos, diez platos) sin commit. Sin etiqueta.**

## Hecho

- Proyecto base: React 19, Vite 8, TypeScript 7, Tailwind CSS 4, lucide-react, fuentes locales
  (Bricolage Grotesque + DM Sans vía `@fontsource-variable`).
- Siete pantallas: bienvenida, catálogo, detalle, resumen, pago simulado, entrega simulada, evaluación.
- Catálogo de diez platos en `src/data/dishes.json`: cinco del Word (precios del Word) y cinco de
  ejemplo con ilustración provisional; tallarines rojos y olluquito agotados. En kiosco la grilla
  desplaza en vertical; en móvil «Ver mi pedido» queda fijo abajo.
- Aviso de simulación solo en resumen y pago; se quitó de cabecera, bienvenida, catálogo y entrega.
- Pedido con varios platos y cantidades (máx. 5 por plato); se agrega desde el catálogo o desde el detalle.
- Flujo y guardas en el reducer: agotados bloqueados, editar el pedido limpia el método de pago,
  cancelar pide confirmación y vuelve al catálogo, pago exige método y bloquea doble toque.
- Indicador de cuatro etapas, marca provisional «Sazón al Paso».
- Configuración de agentes: `opencode.json`, `.mcp.json`, `.agents/mcp_config.json` y plugin
  apuntando al vault de este proyecto.
- Documentación: `README.md`, `CLAUDE.md`, `AGENTS.md`, `docs/`.

## Verificado (2026-11-16)

- `npm run typecheck` y `npm run build` sin errores.
- Recorrido completo en navegador a 1366×768, revisando visualmente las siete pantallas.
- Reglas comprobadas en navegador: agotado no se puede agregar, agregar desde catálogo y detalle,
  sumar/restar/eliminar, tope de 5, totales correctos, cancelar vuelve al catálogo vacío, vaciar el
  resumen vuelve al catálogo, doble toque en «Simular pago» produce un solo pedido, finalizar reinicia.
- Sin scroll horizontal ni contenido recortado a 1920×1080, 1366×768 y 390×844 (y, tras el catálogo
  de diez platos, también a 1024×600 y 768×1024).

## No verificado

- Recorrido completo solo con teclado (los controles son nativos y hay foco visible, pero no se
  probó tecla a tecla).
- Contraste medido con herramienta; la paleta se eligió para cumplir AA pero no se auditó.
- Dispositivos táctiles reales.

## Pendiente de M0

- [x] Primer commit subido a GitHub (`d4c20fa`).
- [x] Commit de los cambios de la primera revisión subido a GitHub (`fc418d4`).
- [ ] Etiqueta `m0-maqueta`.
- [x] Demo publicada en Vercel (plan Hobby): https://app-expendedora-comida-peruana-jp.vercel.app/
      — despliegue automático desde `main`; flujo básico comprobado en producción.
- [ ] Guardar capturas de las pantallas en `docs/screenshots/`.
- [ ] Fotos definitivas: las actuales son recortes de las imágenes de referencia, de baja
      resolución (ver `docs/assets.md`).
- [ ] Revisión del equipo: nombre de marca, textos, ingredientes y alérgenos (todo provisional).

## Siguiente etapa (no iniciar sin pedido explícito)

V1: sesiones anónimas, eventos, Supabase, evaluación guardada, CSV. Ver `PLANNING.md` §13.
Agregar o editar platos sin tocar código (panel de administración) **está excluido** en el
planning («No crear un panel administrativo»); hoy se editan en `src/data/dishes.json`.
Sería una ampliación a decidir con el equipo.

## Decisiones tomadas

Ver `docs/decisions.md`.
