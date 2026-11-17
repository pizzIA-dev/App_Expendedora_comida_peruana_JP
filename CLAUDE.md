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
- Pedido con **varios platos y cantidades** (máximo 5 por plato, `limits.maxPerDish`). Cambio pedido
  por el usuario el 2026-11-16; sustituye la regla «una unidad» del Word y de PLANNING.
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
  scroll y todo escala con `rem`. Fuera de `kiosk:` es móvil con scroll vertical natural.
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

- Rama única `main`; cada entrega se congela con una etiqueta (`m0-maqueta`, `v1`, …).
- No hacer commit ni push sin que el usuario lo pida.
