# Especificaciones técnicas

Este archivo complementa PLANNING.md.

La prioridad sigue siendo entregar primero M0:
la maqueta navegable con diseño para mañana.

## 1. Stack de M0 — Implementar ahora

| Componente | Tecnología | Coste |
|---|---|---|
| Interfaz | React | Gratuito |
| Desarrollo y compilación | Vite | Gratuito |
| Lenguaje | TypeScript | Gratuito |
| Estilos | Tailwind CSS | Gratuito |
| Iconos | Lucide, paquete lucide-react | Gratuito |
| Estado | React Context + reducer o estado local | Gratuito |
| Catálogo | Archivo JSON local | Gratuito |
| Fotografías | Archivos locales del proyecto | Recursos proporcionados o gratuitos |
| Hosting | Vercel, plan gratuito para el uso previsto | Sujeto a límites |
| Dirección web | Subdominio incluido por el hosting | Gratuito |

Si existe un repositorio adecuado, conservar su stack y convenciones.

M0 no necesita:

- Base de datos.
- Autenticación.
- Credenciales privadas.
- Supabase.
- Persistencia central.
- Registro de eventos.
- Cronometraje.
- Exportación CSV.

Usar estado en memoria. No hace falta localStorage para esta maqueta.

## 2. Stack de V1 — Incorporar después

| Componente | Tecnología | Uso |
|---|---|---|
| Base de datos | Supabase Postgres | Sesiones, eventos y evaluaciones |
| Backend mínimo | Supabase Edge Functions | Validación e ingesta de datos |
| Acceso a datos | Supabase RLS | Impedir lectura pública de resultados |
| Pruebas de lógica | Vitest | Reglas y transiciones |
| Pruebas de recorrido | Playwright | Flujos completos en navegador |

Supabase se utilizará dentro de los límites de su plan gratuito.

Las claves privadas permanecen en backend.
Nunca exponer service_role en el frontend o en variables VITE_*.

El almacenamiento local puede servir como cola de reintentos,
pero no sustituye la persistencia central para pruebas remotas.

## 3. Verificación por etapa

### M0

- Ejecutar typecheck.
- Ejecutar build.
- Recorrer las siete pantallas en navegador.
- Revisar selección, agotados, cancelación y reinicio.
- Revisar horizontal y móvil.
- Corregir botones muertos, recortes y errores visibles.

No dedicar el plazo de M0 a configurar una suite compleja de pruebas.

### V1

Añadir Vitest para:

- Selección válida.
- Bloqueo de agotados.
- Cancelación.
- Transiciones.
- Prevención de finalizaciones duplicadas.

Añadir Playwright para:

- Compra simulada completa.
- Navegación hacia atrás.
- Cambio de plato.
- Cancelación.
- Evaluación opcional.

Verificar también persistencia, reintentos y exportación CSV.

## 4. Versiones y dependencias

- Utilizar versiones estables compatibles.
- Conservar el archivo de bloqueo de dependencias.
- Documentar requisitos y comandos en README.
- No instalar dependencias para funcionalidades aplazadas.
- Reutilizar los componentes de M0 al construir V1.

## 5. Presupuesto

Objetivo: infraestructura sin coste utilizando planes gratuitos
dentro de sus límites. No implica uso ilimitado.

No comprar dominio ni contratar pasarelas de pago.
No activar planes de pago sin instrucción explícita del usuario.

Si un límite gratuito bloquea una función, informar y proponer
una alternativa gratuita antes de contratar servicios.

El coste de Claude Code o Antigravity depende de la cuenta utilizada
y es independiente del alojamiento de la aplicación.

## 6. Instrucción para Claude Code / Antigravity

Lee PLANNING.md y STACK_TECNICO.md antes de desarrollar.

En la ejecución actual implementa únicamente M0 con el stack frontend.

No instales dependencias de Supabase ni configures infraestructura
de V1 durante esta entrega.

Entrega la maqueta verificada y no avances automáticamente a V1.