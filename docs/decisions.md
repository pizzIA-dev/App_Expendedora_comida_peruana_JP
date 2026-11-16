# Decisiones y pendientes de contenido

## Decisiones de M0 (2026-11-16)

| Tema | Decisión | Motivo |
|---|---|---|
| Marca | «Sazón al Paso» (provisional), en `src/config/brand.ts` | El Word pide marca provisional; no usar Vendomática/VMarket |
| Indicador | Cuatro etapas fijas | PLANNING §7; las referencias alternan 4 y 5 |
| Cantidad | Una unidad, sin controles +/− | Requisito del Word; las referencias los muestran |
| Precios | Los del Word (S/ 13–16) | PLANNING §9; no copiar los de las imágenes |
| Medios de pago | Sin logos de Yape, Plin, Izipay, Visa o Mastercard | No sugerir integración ni alianza |
| QR | Gráfico decorativo sin datos, tapado con «DEMO» | No debe contener una solicitud real de pago |
| Navegación | Estado en reducer, sin router | Guardas de flujo en un solo lugar; recarga vuelve al inicio |
| Layout | Horizontal 16:9 primero (variante `kiosk:`), móvil con scroll | Prioridad de PLANNING §6 |
| Etiqueta del plato destacado | «Sugerencia» en vez de «Más elegido» | No hay datos que respalden «más elegido» |
| Fotos | Recortes de las referencias | No había fotos propias; ver `assets.md` |
| Ramas | Solo `main` + etiquetas por entrega | Menos fricción para M0; ver abajo |

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
