# Expendedora de comida peruana — guía para agentes

Proyecto académico de Design Thinking: simulación web de la pantalla táctil de una
máquina expendedora de almuerzos peruanos. **No hay cobros ni entregas reales.**

## Al empezar una sesión

1. Lee `ESTADO_PROYECTO.md` (qué está hecho, qué sigue). Es la fuente de verdad del avance.
2. Para saber dónde vive cada cosa sin releer el código, lee `Mapa_del_codigo.md` en el
   vault de Obsidian (MCP `obsidian-vault`, o directamente en
   `D:\Obsidian_vaults\Proyectos_PizzIA\App_Expendedora_comida_peruana_JP`).
3. Consulta `PLANNING.md` (alcance y reglas) y `STACK_TECNICO.md` solo en la sección que necesites.

## Al terminar una sesión

- Actualiza `ESTADO_PROYECTO.md`.
- En el vault: copia el estado a `Estado_del_proyecto.md`, añade una entrada en
  `Bitacora/AAAA-MM-DD.md` y ajusta `Mapa_del_codigo.md` si cambió la estructura.

## Etapa vigente

**M0 — maqueta navegable.** No avanzar a V1 (Supabase, eventos, cronometraje, CSV) sin
que el usuario lo pida. No instalar dependencias de backend ni usar `localStorage`.

## Comandos

```bash
npm run dev        # http://localhost:5173
npm run typecheck
npm run build      # typecheck + build de producción en dist/
```

## Reglas del producto que no se negocian

- Indicador de **cuatro** etapas: Elegir → Confirmar → Pagar → Retirar.
- Pedido con **varios platos y cantidades**: máximo **5 platos por pedido en total**
  (`limits.maxPerOrder`) y, por plato, como máximo su **stock** (`stock` en `dishes.json`).
  Mensajes: «Has alcanzado la cantidad disponible de este plato» / máximo por pedido.
- Al agregar un plato se abre la ventana «¿Deseas agregar una salsa o crema?» (`SaucePicker`):
  se pueden marcar **varias salsas, sin repetir ninguna**, o ninguna. Las salsas son las mismas para
  todos los platos (`src/data/sauces.ts`): ají amarillo, crema de rocoto, mayonesa y ketchup. Cada combinación plato + salsas es una línea del pedido.
- Agotado (stock 0): etiqueta «Agotado», selección bloqueada, foto **a color** (sin gris).
- Orden del menú (`catalogOrder`): sugeridos primero, luego alfabético y los agotados al final.
- **Calentamiento** (retomado el 2026-11-25): pantalla «¿Cómo deseas recibir tu comida?»
  (`HeatingScreen`) entre el resumen y el pago, dentro de la etapa «Confirmar»; elección obligatoria
  (calentar / sin calentar). Tras el pago, solo si eligió calentar, `WarmingScreen` con barra de avance
  y luego la entrega. Sin el recuadro «Ten en cuenta» de la referencia.
- Cancelar el pedido lo vacía y vuelve al **menú**, no a la bienvenida.
- Precios del Word (céntimos en `src/data/dishes.json`), no los de las imágenes de referencia.
- Agotados bloqueados en la interfaz **y** en el reducer.
- Pago y entrega ficticios; nunca pedir datos bancarios ni mostrar logos de marcas de pago.
- Marca provisional y configurable (`src/config/brand.ts`); no usar Vendomática/VMarket.
- Aviso de simulación **solo donde hay cobro** (resumen y pago); en el resto de pantallas no se
  repite (pedido del usuario, 2026-11-16). El detalle conserva el aviso de información alimentaria
  referencial y la evaluación aclara que no guarda respuestas.

## Convenciones de código

- React 19 + Vite + TypeScript estricto + Tailwind CSS v4 (tema en `src/index.css`, sin `tailwind.config`).
- Navegación sin router: `state.screen` en `src/features/order/orderReducer.ts`. Toda guarda
  de flujo va en el reducer; los botones solo despachan acciones.
- Variante `kiosk:` = horizontal (≥1024 px de ancho y ≥560 px de alto): la pantalla cabe sin
  scroll y todo escala con `rem`. La raíz usa el **menor** entre ancho y alto
  (`min(1.06vw + 1.4px, 2.07vh)`), así una ventana ancha y baja no se desborda. En el catálogo cada
  fila mide el alto visible y la foto absorbe la diferencia. Fuera de `kiosk:` es móvil con scroll.
- Botones con `src/components/Button.tsx` (mínimo 56 px). Iconos solo de `lucide-react`.
- Textos de interfaz en español; avisos y marca desde `src/config/brand.ts`.
- Verificar cambios visuales en 1920×1080, 1366×768 y 390×844.

## Skills y herramientas

- Skills del proyecto en `.agents/skills/` (leer el `SKILL.md` pertinente antes de usarla):
  `frontend-design`, `tailwind-design-system`, `vercel-react-best-practices`,
  `typescript-advanced-types`; `supabase-postgres-best-practices` y `sql-code-review` para V1.
- Vault de Obsidian por MCP: `.mcp.json` (Claude Code), `.agents/mcp_config.json`
  (Antigravity), `opencode.json` (opencode).

## Git

- `main` = versión vigente (V2 del cliente), publicada en la URL principal de Vercel.
- `v1` = maqueta del primer testeo, congelada en `1d38525`. **No hacer commits en `v1`.**
  Su copia accesible es el despliegue inmutable de ese commit en Vercel:
  `app-expendedora-comida-peruana-opjd8z4a6-pizz-ia.vercel.app` (requiere que el usuario desactive
  *Vercel Authentication* en *Deployment Protection* para abrirse sin iniciar sesión).
- No hacer commit ni push sin que el usuario lo pida.
