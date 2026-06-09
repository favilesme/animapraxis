## Qué pasó

El componente `TelegramConnectButton` se construyó en fases anteriores como un botón de **vinculación de cuenta**: requería sesión activa para tomar tu `user.id` y enviarlo al bot como `/start {user_id}`, de modo que el webhook pudiera guardar el `telegram_chat_id` en tu fila de `profiles`. Como el sitio no tiene aún flujo de login para usuarios finales, el botón siempre muestra el mensaje "Inicia sesión para vincular Telegram" y nunca abre Telegram.

Quieres lo contrario: que cualquier visitante pueda abrir el chat del bot directamente, igual que el chatbot nativo del FAB de WhatsApp / Anima.

## Cambios

### 1. `src/components/TelegramConnectButton.tsx` — simplificar

- Eliminar `useState`, `useEffect`, llamada a `supabase.auth.getUser()`, estado `loading`, estado `showLoginMessage` y el tooltip de "Inicia sesión".
- Convertir el botón en un simple enlace `<a href="https://t.me/TeleAnimaPraxis_bot" target="_blank" rel="noopener noreferrer">` con el icono de Telegram, manteniendo el mismo estilo (pill `#2AABEE`, hover `#229ED9`, transición suave, label "Telegram" oculto en mobile).
- Sin estado de carga, sin dependencia de Supabase, sin parámetro `?start=`.
- Accesible: `aria-label="Abrir chat de Telegram"`.

### 2. Nada más se toca

- El endpoint `src/routes/api/public/telegram/webhook.ts` se queda igual. Sigue funcionando si en el futuro habilitas auth y vuelves a pasar `/start {user_id}`; mientras tanto simplemente ignora mensajes que no coincidan con ese patrón (return 200 OK) — el bot puede recibir mensajes libres sin romper nada.
- La columna `profiles.telegram_chat_id`, la función RPC `update_telegram_id`, las políticas RLS, el secret `TELEGRAM_BOT_TOKEN` y el webhook ya registrado en Telegram permanecen tal cual, listos para cuando agregues login.
- `FAB.tsx` no necesita cambios: sigue renderizando `<TelegramConnectButton />` en el stack flotante.

## Resultado

Cualquier visitante hace click en el FAB azul de Telegram → se abre `t.me/TeleAnimaPraxis_bot` en una nueva pestaña → puede iniciar conversación con el bot directamente, sin pasar por login.

## Nota para más adelante

Cuando implementes auth de usuarios finales (Lovable Cloud soporta email+password y Google de forma nativa), podemos restaurar la lógica de vinculación: si hay sesión activa, el botón pasa `?start={user.id}`; si no, abre el bot sin vincular. Toda la infraestructura backend (tabla, RPC, webhook, secret) ya está lista para ese día.
