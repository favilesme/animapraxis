import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useMemo, useState } from 'react'

type Status = 'checking' | 'valid' | 'invalid' | 'done' | 'error'

export const Route = createFileRoute('/unsubscribe')({
  component: UnsubscribePage,
})

function UnsubscribePage() {
  const [status, setStatus] = useState<Status>('checking')
  const [message, setMessage] = useState('')
  const token = useMemo(() => {
    if (typeof window === 'undefined') return ''
    return new URLSearchParams(window.location.search).get('token') ?? ''
  }, [])

  useEffect(() => {
    if (!token) {
      setStatus('invalid')
      setMessage('El enlace no es válido o ya expiró.')
      return
    }

    void fetch(`/email/unsubscribe?token=${encodeURIComponent(token)}`)
      .then(async (response) => {
        if (!response.ok) throw new Error('invalid')
        return response.json() as Promise<{ valid?: boolean; reason?: string }>
      })
      .then((data) => {
        if (data.valid) {
          setStatus('valid')
          setMessage('Puedes confirmar que no deseas recibir más correos de seguimiento.')
        } else {
          setStatus('invalid')
          setMessage(
            data.reason === 'already_unsubscribed'
              ? 'Este correo ya fue dado de baja.'
              : 'El enlace no es válido o ya expiró.',
          )
        }
      })
      .catch(() => {
        setStatus('invalid')
        setMessage('El enlace no es válido o ya expiró.')
      })
  }, [token])

  const confirm = async () => {
    if (!token) return
    setStatus('checking')
    try {
      const response = await fetch('/email/unsubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      })
      const data = (await response.json().catch(() => ({}))) as { success?: boolean; reason?: string }
      if (response.ok && data.success) {
        setStatus('done')
        setMessage('Listo. Tu correo fue dado de baja correctamente.')
        return
      }
      if (data.reason === 'already_unsubscribed') {
        setStatus('done')
        setMessage('Este correo ya estaba dado de baja.')
        return
      }
      throw new Error('failed')
    } catch {
      setStatus('error')
      setMessage('No pudimos procesar la solicitud. Intenta nuevamente en unos minutos.')
    }
  }

  return (
    <section className="min-h-[60vh] bg-background px-4 py-20">
      <div className="mx-auto max-w-xl text-center">
        <p className="text-sm font-semibold uppercase text-muted-foreground">Anima Praxis</p>
        <h1 className="mt-3 font-display text-4xl text-deep md:text-5xl">Preferencias de correo</h1>
        <p className="mt-4 text-base text-muted-foreground">{message || 'Estamos verificando tu enlace…'}</p>

        {status === 'valid' && (
          <button
            type="button"
            onClick={confirm}
            className="mt-8 inline-flex items-center justify-center rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
          >
            Confirmar baja
          </button>
        )}

        {status === 'checking' && <p className="mt-8 text-sm text-muted-foreground">Procesando…</p>}

        {(status === 'invalid' || status === 'done' || status === 'error') && (
          <a
            href="/"
            className="mt-8 inline-flex items-center justify-center rounded-md border border-border px-5 py-3 text-sm font-semibold transition-colors hover:bg-cream"
          >
            Volver al inicio
          </a>
        )}
      </div>
    </section>
  )
}