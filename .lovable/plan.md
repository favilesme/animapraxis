Análisis de consumo actual
Basado en el balance del periodo de facturación (4 jun–4 jul 2026), el mayor gasto no está en AI Gateway sino en Build mode (139 cr) y Cloud compute pico (26.59 cr). AI Gateway suma ~0.27 cr. Esto significa que el chatbot y Telegram son baratos en créditos de IA, pero su Cloud backend (tabla de conversaciones, edge functions, webhook) y el ritmo de edición/reconstrucción son los que más pesan. El plan se enfoca en AI Gateway + Cloud, pero incluye las medidas de build que más impactan.

Objetivo
Reducir el consumo diario de créditos de Lovable en el backend Cloud y AI Gateway, manteniendo la conversión del sitio y la funcionalidad del chatbot web y Telegram.

1. Optimizar AI Gateway (chatbot web + Telegram)

1.1. Reducir tamaño del system prompt
- El prompt actual en `src/lib/anima-ai.server.ts` incluye todo el contexto de servicios, reglas de captura, formato y guardrails. Cada mensaje de usuario y cada mensaje de Telegram lo envía completo.
- Acción: compactar el prompt eliminando texto redundante y ejemplos extensos. Mantener las reglas obligatorias (terminología, enlaces enmascarados, no diagnóstico) pero en menos tokens.
- Impacto: menos tokens de entrada en cada llamada.

1.2. Limitar historial enviado al modelo
- Web: el chat actual no guarda historial en la UI, pero el backend recibe el array `messages` completo de la sesión. Si un usuario hace muchas preguntas, el array crece.
- Telegram: `telegram-webhook` carga `telegram_conversations.messages` y lo envía completo (truncado a 20 mensajes en código, pero el slice se hace después de responder).
- Acción: truncar el historial antes de llamar al modelo, no después. Enviar solo los últimos 6-8 mensajes relevantes. Para Telegram, esto también reduce lecturas de base de datos.
- Impacto: menos tokens de entrada por mensaje y menos egress de base de datos.

1.3. Elegir modelo más económico para respuestas simples
- Actualmente usa `google/gemini-3-flash-preview` para todo.
- Acción: para mensajes de saludo, sugerencias o respuestas de una sola línea, evaluar `google/gemini-3.1-flash-lite` o `google/gemini-2.5-flash-lite`. Dejar el modelo actual solo para respuestas complejas o cuando se invoque `submit_lead`.
- Impacto: menor costo por token de salida.
- Nota: requiere una pequeña clasificación de intención o un router simple.

1.4. Cachear respuestas frecuentes
- Las preguntas comunes ("¿Qué servicios ofrecen?", "¿Cómo agendo?", "¿Quién es Francisco?") tienen respuestas estables.
- Acción: agregar un mapa de respuestas predefinidas en el backend para las 5-10 preguntas más frecuentes, antes de llamar al modelo. Esto evita AI Gateway por completo en esos mensajes.
- Impacto: elimina llamadas a la IA en buena parte del tráfico.

1.5. Evitar llamadas de IA cuando el chat no está abierto
- El botón de sugerencias en `AnimaChat.tsx` puede hacer clic accidental. El chat se abre con el FAB.
- Acción: no hay cambio estructural necesario, pero sí confirmar que solo se llama a `/api/chat` cuando el usuario envía un mensaje, no al abrir el widget.
- Impacto: evita llamadas espontáneas.

1.6. Reducir pasos de tool loop
- Tanto web como Telegram usan `stopWhen: stepCountIs(5)`.
- Acción: bajar a `stepCountIs(3)` para respuestas simples, y solo usar 5 cuando el usuario confirma explícitamente que quiere dejar datos. El `submit_lead` no necesita múltiples pasos de IA.
- Impacto: menos tokens y menos latencia.

2. Optimizar Cloud compute y base de datos

2.1. Reducir lecturas/escrituras en `telegram_conversations`
- Telegram webhook carga todo el historial, responde, y luego hace `upsert`.
- Acción: solo leer historial si el mensaje no es de una intención cacheable. Al escribir, no reescribir `updated_at` si no hay cambios. Considerar TTL para conversaciones inactivas >30 días para reducir tamaño de tabla.
- Impacto: menos operaciones de base de datos y menos almacenamiento.

2.2. Revisar instancia de Cloud
- El consumo de Cloud compute pico (26.59 cr) puede deberse a una instancia que está siempre activa o a una configuración sobreprovisionada.
- Acción: verificar en Backend → Advanced settings si el tamaño de instancia puede bajarse, o si hay procesos recurrentes (pg_cron, webhooks) que la mantienen despierta. Solo subir de tamaño si hay problemas de latencia reales.
- Impacto: reduce créditos de compute base.

2.3. Eliminar webhooks o funciones no usadas
- Revisar si quedan Edge Functions o rutas públicas del proyecto anterior que aún consumen recursos. El webhook de Telegram es necesario; verificar si hay otros endpoints ociosos.
- Impacto: reduce carga del backend.

2.4. Desactivar Project Monitoring si no es necesario
- Project Monitoring consume 2.50 cr en el periodo.
- Acción: si el scan de seguridad no se usa activamente, reducir frecuencia o desactivar scans automáticos.
- Impacto: ahorro directo de créditos de monitoreo.

3. Optimizar Build mode (aunque no es el foco, tiene alto impacto)

3.1. Agrupar ediciones en lotes
- Cada mensaje de build mode consume créditos. 139 cr en el periodo indica muchas ediciones pequeñas.
- Acción: planificar cambios y hacerlos en una sola sesión de build, en lugar de múltiples mensajes sueltos. Usar el modo planificador para definir todo antes de editar.
- Impacto: disminuye el número de mensajes de build.

3.2. Evitar rebuilds completos por cambios menores
- Algunos cambios de texto o imágenes no requieren reconstruir todo el bundle. Separar contenido estático en archivos de datos o markdown permite actualizar sin rebuild costoso.
- Acción: mover FAQs, testimonios y textos de secciones a `src/data/` o a un JSON externo, y leerlos en el componente. Así los cambios de copy son ediciones de datos, no rebuilds de toda la aplicación.
- Impacto: menos tiempo de build y menos créditos.

3.3. Reducir dependencias pesadas
- El `package.json` incluye muchos paquetes de Radix, Recharts y otros. Si no se usan todos, eliminarlos reduce el tamaño del bundle y la velocidad de build.
- Acción: auditar imports de `@radix-ui/*`, `recharts`, `react-day-picker`, etc., y eliminar los que no se usan.
- Impacto: builds más rápidos y menos consumo de CPU en build.

4. Optimizaciones específicas de la estructura del website

4.1. Página de inicio (`index.tsx`)
- El FAQ schema en línea genera un JSON-LD grande. Esto es contenido estático que puede moverse a `src/data/faq-schema.ts` y ser importado.
- Las tarjetas de dimensiones son estáticas. Idealmente extraer a un archivo de datos para que cambios futuros no requieran rebuild del componente.
- La imagen de Francisco se carga eager; si es muy grande, convertir a formato optimizado (WebP) y usar loading="lazy" si no es el LCP crítico.

4.2. Chatbot flotante (`FAB.tsx` + `AnimaChat.tsx`)
- El chat se renderiza en el DOM aunque esté cerrado, porque el FAB está siempre presente. Esto es correcto, pero `AnimaChat` no debería inicializar el transporte hasta abrirse.
- Acción: cambiar para que `AnimaChat` solo cree el transporte/useChat cuando `open` sea true.
- Impacto: menos listeners y menos riesgo de llamadas accidentales.

4.3. Imágenes de infografías
- Las infografías de servicios son grandes y se cargan en cada página. Verificar que estén en CDN y comprimidas.
- Acción: usar `.asset.json` y el skill de migración a assets si aún están en `src/assets/`. Convertir a JPG/WebP y servir con lazy loading.
- Impacto: menos transferencia de datos (Cloud egress) y menos CPU en renderizado.

4.4. Rutas legales y estáticas
- `aviso-legal`, `politica-privacidad`, `politica-cookies` y `sitemap.xml` son contenido poco cambiante. Si se generan en build, no requieren acción. Si se generan en SSR, considerar SSG o cacheo.

5. Medidas de control y seguimiento

5.1. Agregar rate limiting por IP/Usuario
- En `/api/chat` y `/api/public/telegram/webhook`, limitar mensajes por minuto/hora por IP o chat_id para evitar abuso que consuma créditos.
- Acción: implementar un contador simple en memoria (o en la base de datos para Telegram) que rechace excesos con 429.
- Impacto: protege contra picos de uso inesperados.

5.2. Logging de uso de AI Gateway
- El helper `createLovableAiGatewayProvider` ya captura `runId`. Agregar un log interno ligero que registre tokens usados por conversación para identificar spikes.
- Impacto: visibilidad del gasto real.

5.3. Alertas de créditos
- Configurar alertas cuando el balance baje de 5 créditos o cuando el uso diario supere 3 créditos.
- Acción: usar `credits--update_limit` si existe una regla, o sugerir al usuario configurarla en Settings → Plans & credits.

Orden de implementación recomendado
1. Compactar system prompt y truncar historial antes del modelo (bajo esfuerzo, alto impacto).
2. Implementar cache de respuestas frecuentes (elimina llamadas de IA).
3. Reducir pasos de tool loop a 3 para respuestas simples.
4. Optimizar lectura/escritura de `telegram_conversations`.
5. Migrar imágenes grandes a assets CDN y comprimirlas.
6. Auditar y eliminar dependencias no usadas.
7. Mover contenido estático (FAQs, dimensiones) a archivos de datos para reducir rebuilds.
8. Revisar tamaño de instancia de Cloud y Project Monitoring.
9. Implementar rate limiting en endpoints de chat.
10. Configurar alertas de créditos.

Resultado esperado
- Reducción de tokens de entrada en AI Gateway por prompt más corto e historial acotado.
- Menor número de llamadas a AI Gateway por cache de FAQs.
- Menos operaciones de base de datos y almacenamiento en Cloud.
- Builds más rápidos y menos costosos por contenido desacoplado y dependencias reducidas.
- Protección contra picos de uso por rate limiting.
