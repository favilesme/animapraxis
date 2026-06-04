
# Plan de desarrollo — Anima Praxis

Sitio multipágina (10 rutas) en TanStack Start + Tailwind v4, con branding dorado/azul profundo, chatbot Centeia embebido una sola vez, FAB WhatsApp/Chat, banner de cookies y formulario frontend. Sin backend, sin testimonios inventados, `[FALTA]` visible donde corresponda.

## 1. Assets y branding

- Subir los 3 archivos del usuario como Lovable Assets (`lovable-assets create` desde `/mnt/user-uploads/`):
  - `Logo_Anima_Praxis.png` → logo completo (footer, sobre Francisco)
  - `Logo_Gemini.png` → espiral aislada (header, favicon temporal)
  - `FA_en_foto_Oficina.png` → foto Francisco (página Sobre + hero secundario)
- Importar como `*.asset.json` desde `src/assets/`.

## 2. Design system (`src/styles.css`)

Sustituir tokens shadcn por paleta marca en `oklch`:
- `--background` blanco, `--foreground` azul profundo `#192538`
- `--primary` dorado `#E6C99F` con foreground `#192538`
- `--primary-hover` `#D6A871`
- `--muted-bg` rosa crema `#FCF3F1`
- `--muted-foreground` gris pizarra `#5A626F`
- `--accent-warm` `#FFBE0B`, `--accent-cool` `#82D7FF`
- Token utilitario `.falta` (fondo amarillo claro, borde punteado, padding fino) para marcar `[FALTA]`
- Radio 8–12px, sombras sutiles
- Fuentes Google: Cormorant Garamond (display) + Nunito Sans (body), precargadas en `__root.tsx`

## 3. Estructura de rutas (`src/routes/`)

```text
__root.tsx              shell + fonts + script Centeia + JSON-LD + nav + footer + cookies + FAB
index.tsx               /
consultoria-ia.tsx      /consultoria-ia
coaching-terapia.tsx    /coaching-terapia
capacitacion-corporativa.tsx
sobre-francisco.tsx
insights.tsx
contacto.tsx
aviso-legal.tsx
politica-privacidad.tsx
politica-cookies.tsx
```

Cada ruta con su propio `head()` (title, description, og:* únicos). JSON-LD `ProfessionalService` con áreas Consulting/Coaching/Training en `__root.tsx`.

## 4. Componentes compartidos (`src/components/`)

- `Logo.tsx` (espiral + wordmark, escala header/footer)
- `Falta.tsx` (`<span className="falta">[FALTA: …]</span>`)
- `TopBar.tsx` — franja "Pide cita hoy…"
- `Header.tsx` — logo + menú desktop + hamburguesa accesible + CTA "Reservar cita" (WhatsApp)
- `Footer.tsx` — 4 columnas + año dinámico `new Date().getFullYear()` (el "© 2026" se mantiene visualmente correcto pero dinámico)
- `MobileStickyCTA.tsx` — botón sticky inferior "Reservar cita" → WhatsApp (`z-30`)
- `CookieBanner.tsx` — texto + Aceptar/Ver política, persiste en `localStorage` (`z-40`)
- `FAB.tsx` — mobile: WhatsApp; desktop: WhatsApp + Chatear (este último abre launcher de Centeia, sin crear segundo widget) (`z-30`)
- `ChatSection.tsx` — sección visual "Chatea con Anima Praxis" + botón que dispara launcher
- `ServiceCard.tsx` — tarjeta pack (PE/IA/CT/CA)
- `FAQ.tsx` — acordeón accesible (Radix)
- `ContactForm.tsx` — RHF + zod + estados + sin envío real (mostrar éxito frontend; nota explicativa de que no hay backend conectado todavía)

## 5. Chatbot Centeia

El prompt original pide insertar el `<iframe>` en `index.html`. En TanStack Start no existe `index.html`. **Decisión:** embeber el iframe en la sección visual "Chatea con Anima Praxis" como widget contenido (no flotante), montado **una sola vez** desde `ChatSection.tsx` (presente en home y como CTA en otras páginas mediante anchor `#chat`). El FAB "Chatear" hace `scrollIntoView` al `#chat` en lugar de invocar un launcher inexistente (el script provisto es un iframe puro, no expone launcher API).

Esto respeta la regla de "no duplicar iframe" y "cargar una sola vez", y resuelve la incompatibilidad del script con SPA. Lo confirmo explícitamente en este plan porque diverge del prompt original.

## 6. Home (`/`)

Secciones en orden: Hero (con foto Francisco como visual), Trust bar (sectores placeholder + `[FALTA: años]`→ usar 25 confirmado), Por qué Anima Praxis (3 columnas), Nuestros servicios (4 packs PE/IA/CT/CA), Chatea con Anima Praxis, Cómo llegar (link Google Maps + WhatsApp), FAQ (5 preguntas), Historias y experiencias (3 placeholders `[FALTA]`), CTA final.

## 7. Páginas de servicio

`/consultoria-ia`, `/coaching-terapia`, `/capacitacion-corporativa` con la estructura indicada (Para quién / Servicios / Enfoque / Entregables o equivalente / CTA WhatsApp). Aclaración obligatoria de IA en consultoría. Tono ético en coaching/terapia.

## 8. Sobre Francisco

Bio completa provista (25 años, ITESM, PUCE, ICF, Lux Esse, IBM, AWS, etc.), foto de oficina, secciones Historia / Enfoque / Áreas / Formación / Filosofía. CTA WhatsApp.

## 9. Insights

6 tarjetas placeholder (Estrategia, IA, Liderazgo, Coaching, Terapia, Capacitación), cada una con `[FALTA]` en título/resumen/fecha. Sin páginas internas.

## 10. Contacto

Formulario completo con RHF + zod (nombre, email validado, teléfono, empresa, perfil select, línea select, mensaje, consentimiento). Estados loading/error/éxito frontend. CTA principal WhatsApp visible aparte. Nota: el envío real a `info@animapraxis.org` requiere backend, no incluido en este alcance.

## 11. Páginas legales

`/aviso-legal`, `/politica-privacidad`, `/politica-cookies` con estructura base + `[FALTA]` en datos del titular (RUC, dirección legal, responsable LOPDP) salvo lo ya confirmado.

## 12. Detalles técnicos

- HTML `lang="es"` (estructura preparada para `/en/*` futura, sin selector visible)
- Mobile-first, breakpoints validados a 360/768/1280
- Z-index: modal/widget chat `z-50`, cookies `z-40`, FAB y sticky `z-30`
- Sin librerías nuevas pesadas; ya hay RHF, zod, Radix, Tailwind v4
- Sanitización inputs vía zod (trim, max length, regex email)
- Sin localStorage salvo preferencia cookies
- Sin Supabase, sin backend, sin login, sin pagos

## 13. Orden de construcción

1. Subir 3 assets vía `lovable-assets`
2. Tokens en `styles.css` + fuentes en `__root.tsx`
3. Componentes base: `Logo`, `Falta`, `TopBar`, `Header`, `Footer`, `CookieBanner`, `FAB`, `MobileStickyCTA`, `ChatSection`
4. `__root.tsx` con shell completo + JSON-LD + script chatbot
5. Home `index.tsx`
6. 3 páginas de servicio
7. `sobre-francisco.tsx`
8. `insights.tsx`
9. `contacto.tsx` (form con zod)
10. 3 páginas legales
11. QA: consola limpia, responsive 360/768/1280, todos los CTA WhatsApp, chatbot carga una vez, cookies persiste, FAB no tapa nada

## Riesgos / divergencias del prompt

- **Chatbot embebido como widget contenido, no flotante** (ver §5). Si quieres un launcher flotante real necesitamos una API JS del proveedor, no un iframe.
- **Formulario no envía** — solo muestra éxito visual; envío real necesita backend (Lovable Cloud o servicio externo).
- **Año footer dinámico** (confirmado antes).
- **`[FALTA]` visible** (confirmado antes) en sectores trust bar, testimonios, fechas insights, datos legales.

¿Apruebas para construir?
