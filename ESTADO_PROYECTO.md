# Estado del proyecto

Última actualización: 2026-11-25

## Etapa actual

**Maqueta V2 del cliente (primera iteración): publicada en `main` (URL principal de Vercel). Ajuste de escala en kiosco sin commit. La V1 del primer testeo queda congelada en la rama `v1`. Sigue siendo M0 en términos de PLANNING (sin backend).**

## Hecho

- Proyecto base: React 19, Vite 8, TypeScript 7, Tailwind CSS 4, lucide-react, fuentes locales
  (Bricolage Grotesque + DM Sans vía `@fontsource-variable`).
- Siete pantallas: bienvenida, catálogo, detalle, resumen, pago simulado, entrega simulada, evaluación.
- Catálogo de 11 platos en `src/data/dishes.json`: 5 del Word, 3 de ejemplo (tacu tacu, carapulcra,
  olluquito) y 3 pedidos por el cliente (arroz chaufa, pollo a la plancha, tallarines verdes).
  Cada plato tiene `stock` (0 = agotado: tallarines rojos y olluquito).
- Salsas y cremas: ventana «¿Deseas agregar una salsa o crema?» al agregar un plato, con fotos reales;
  se pueden marcar varias sin repetir (ají amarillo, crema de rocoto, mayonesa, ketchup) o ninguna; sin costo;
  iguales para todos los platos. Cada plato + combinación de salsas es una línea del pedido.
- Límite de 5 platos por pedido en total y, por plato, su stock; mensajes al intentar superarlos.
  El stock baja con cada compra simulada (en memoria; vuelve al inicial al recargar).
- Agotado con la foto a color; sección «Presentación y conservación» en el detalle; etiqueta «Nuevo».
- Menú ordenado: sugeridos primero, el resto alfabético y los agotados al final (un plato que se
  agota en una compra simulada pasa al final).
- En kiosco la grilla del catálogo desplaza en vertical; en móvil «Ver mi pedido» queda fijo abajo.
- Kiosco escala por ancho **y** alto (el menor): en ventanas anchas y bajas (navegador con barras)
  la barra inferior ya no tapa los botones de las tarjetas. Cada fila del catálogo cabe entera en el
  alto visible y la siguiente asoma. Medido a 1920×1080, 1920×915, 1536×730, 1366×768, 1366×657,
  1280×620, 1280×1024 y 1024×600.
- Aviso de simulación solo en resumen y pago; se quitó de cabecera, bienvenida, catálogo y entrega.
- Pedido con varios platos y cantidades; se agrega desde el catálogo o desde el detalle.
- Flujo y guardas en el reducer: agotados bloqueados, editar el pedido limpia el método de pago,
  cancelar pide confirmación y vuelve al catálogo, pago exige método y bloquea doble toque.
- Indicador de cuatro etapas, marca provisional «Sazón al Paso».
- Configuración de agentes: `opencode.json`, `.mcp.json`, `.agents/mcp_config.json` y plugin
  apuntando al vault de este proyecto.
- Documentación: `README.md`, `CLAUDE.md`, `AGENTS.md`, `docs/`.

## Verificado (2026-11-25, salsas múltiples)

- Typecheck y build. Varias salsas por plato; la misma combinación en otro orden suma a la misma
  línea; «Sin acompañamiento» desmarca todo. Con 4 salsas (fotos del usuario) la ventana cabe sin
  desplazarse a 1366×768, 1024×600 y 390×844.

## Verificado (2026-11-24, V2)

- Typecheck y build correctos.
- En navegador: ventana de salsas (elegir, omitir, cerrar), dos líneas del mismo plato con salsas
  distintas, stock (mensaje al superar 3 de carapulcra), límite de 5 (mensaje), agotados bloqueados,
  totales, pago completo y descuento de stock en la siguiente compra.
- Sin desbordes a 1920×1080, 1366×768, 768×1024 y 390×844. A 1024×600 la columna del detalle
  desplaza (no cabe entera), sin quedar bajo los botones.

## Verificado (2026-11-16, V1)

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

## Pendiente

- [x] V2 subida a `main` (2026-11-25); Vercel la publica en la URL principal.
- [ ] V1 accesible: el usuario debe desactivar *Vercel Authentication* (Settings → Deployment
      Protection) para que `…-opjd8z4a6-pizz-ia.vercel.app` (V1) se abra sin iniciar sesión.
- [ ] El equipo define precios de los 3 platos nuevos y valida stock inicial y salsas por plato.
- [ ] Foto propia de tallarines verdes con pollo (la actual es referencial, con filete apanado).

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
