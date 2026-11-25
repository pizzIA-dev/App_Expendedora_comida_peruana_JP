# Decisiones y pendientes de contenido

## Decisiones de M0 (2026-11-16)

| Tema | Decisión | Motivo |
|---|---|---|
| Marca | «Sazón al Paso» (provisional), en `src/config/brand.ts` | El Word pide marca provisional; no usar Vendomática/VMarket |
| Indicador | Cuatro etapas fijas | PLANNING §7; las referencias alternan 4 y 5 |
| Cantidad | ~~Una unidad, sin controles +/−~~ → sustituida, ver «Cambios tras la primera revisión» | Requisito del Word |
| Precios | Los del Word (S/ 13–16) | PLANNING §9; no copiar los de las imágenes |
| Medios de pago | Sin logos de Yape, Plin, Izipay, Visa o Mastercard | No sugerir integración ni alianza |
| QR | Gráfico decorativo sin datos, tapado con «DEMO» | No debe contener una solicitud real de pago |
| Navegación | Estado en reducer, sin router | Guardas de flujo en un solo lugar; recarga vuelve al inicio |
| Layout | Horizontal 16:9 primero (variante `kiosk:`), móvil con scroll | Prioridad de PLANNING §6 |
| Etiqueta del plato destacado | «Sugerencia» en vez de «Más elegido» | No hay datos que respalden «más elegido» |
| Fotos | Recortes de las referencias | No había fotos propias; ver `assets.md` |
| Ramas | Solo `main` + etiquetas por entrega | Menos fricción para M0; ver abajo |

## Cambios tras la primera revisión del usuario (2026-11-16)

| Cambio | Antes | Ahora |
|---|---|---|
| Agregar desde el catálogo | Solo desde el detalle | Botón «Agregar» en cada tarjeta; «Ver detalles» queda como enlace |
| Varios platos | Un plato, una unidad | Varios platos con cantidad (− / +), máximo 5 por plato |
| Cancelar pedido | Volvía a la bienvenida | Vacía el pedido y vuelve al catálogo |

| Avisos de simulación | En cabecera, bienvenida, catálogo y entrega | Solo en resumen y pago (donde hay cobro) |
| Código de pedido | «código ficticio» en la entrega | Solo el código |
| Catálogo | 5 platos en una fila | 10 platos (5 nuevos con ilustración provisional SVG); en kiosco la grilla desplaza en vertical y en móvil «Ver mi pedido» queda fijo abajo |

Los cinco platos nuevos (tacu tacu, carapulcra, causa limeña, papa a la huancaína, olluquito)
no están en el Word: precios, ingredientes y alérgenos son de ejemplo. Sus fotos son de Wikimedia
Commons con licencia libre (créditos en `assets.md`).

El segundo cambio contradice el Word («una unidad por pedido», «sin carrito complejo») y
PLANNING §15 (carrito multiproducto fuera de alcance). Lo pidió el usuario de forma explícita;
conviene que el equipo lo sepa por si el docente evalúa contra el Word.

## Primera iteración del cliente — «V2» (2026-11-24)

Fuente: `Primera iteración.docx` + capturas de conversación con el cliente.

| Pedido | Decisión |
|---|---|
| 3 platos nuevos | Arroz chaufa de pollo, pollo a la plancha, tallarines verdes con pollo; precios referenciales S/ 14–15 (el equipo aún los define) |
| Salsas y cremas | Ventana al agregar (no pantalla nueva, para mantener 4 etapas); ají amarillo, crema de rocoto, mayonesa o sin acompañamiento; sin costo. **Revisión del usuario (2026-11-25):** varias salsas por plato sin repetir, las mismas para todos los platos, con fotos reales; se agrega ketchup y las fotos son las que entregó el usuario |
| Stock | `stock` por plato en `dishes.json`; baja con cada compra simulada dentro de la sesión y vuelve al valor inicial al recargar |
| Límite | 5 platos por pedido en total (imagen «Límite por pedido: máximo 5 platos»); el Word no da número |
| Agotado | Foto a color con velo claro, etiqueta «Agotado» |
| Escala en kiosco | Pedido del usuario (2026-11-25): la barra inferior tapaba los botones en ventanas anchas y bajas. La raíz escala por el menor entre ancho y alto, y las filas del catálogo miden el alto visible |
| Orden del menú | Pedido del usuario (2026-11-25): sugeridos primero, resto alfabético, agotados al final (según el stock de la sesión) |
| Calentamiento | 2026-11-24 se descartó; **2026-11-25 se retoma** por pedido del usuario: elección antes del pago (etapa «Confirmar», el indicador sigue con 4 etapas) y pantalla «Calentando tu pedido» tras el pago solo si se eligió calentar. Sin «Ten en cuenta» |
| Envase | Sección «Presentación y conservación» en el detalle |
| Entradas | Se quitan papa a la huancaína y causa limeña: el cliente no pidió entradas |
| Categorías y buscador de la imagen | No se implementan; el cliente pidió mantener el aspecto de la primera versión |
| V1 accesible | Rama `v1` congelada; Vercel no generó despliegue para la rama (mismo commit que producción). La copia accesible es la URL inmutable del despliegue de `1d38525` (`…-opjd8z4a6-pizz-ia.vercel.app`), que exige desactivar *Vercel Authentication* |

«V1/V2» del cliente son iteraciones de la maqueta (sin backend). No confundir con la V1 de
PLANNING (Supabase), que sigue sin empezar.

### Ramas

Por ahora una sola rama. El planning ya exige congelar cada versión con una etiqueta y una URL
propia, y eso cubre «lo que ve el cliente». Cuando empiece V1 conviene pasar a `dev` (trabajo)
y `main` (lo publicado), con Vercel desplegando `main` como producción y `dev` como vista previa.

## Pendiente de aprobación del equipo

- Nombre e identidad visual definitivos.
- Platos, precios, porciones y fotografías definitivos.
- Ingredientes y alérgenos: redactados como ejemplo, **sin revisión**. Arroz con pollo y seco
  de pollo figuran como «pendiente de revisión».
- Fecha/hora de preparación y conservación: ficticias.
- Textos de las tres preguntas de evaluación.
