import * as React from 'react'
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import type { TemplateEntry } from './registry'

interface LeadNotificationProps {
  origen?: string
  nombre?: string
  email?: string
  telefono?: string
  empresa?: string
  linea_interes?: string
  mensaje?: string
  resumen_conversacion?: string
}

function LeadNotificationEmail({
  origen = 'ChatBot Anima Praxis (sitio web)',
  nombre = 'No indicado',
  email = 'No indicado',
  telefono = 'No indicado',
  empresa = 'No indicada',
  linea_interes = 'No indicada',
  mensaje = 'No indicado',
  resumen_conversacion = '—',
}: LeadNotificationProps) {
  return (
    <Html lang="es" dir="ltr">
      <Head />
      <Preview>Nueva solicitud de propuesta recibida desde el chatbot.</Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={eyebrow}>Anima Praxis</Text>
          <Heading style={heading}>Nueva solicitud de propuesta</Heading>
          <Text style={intro}>
            El chatbot registró un prospecto interesado en recibir información del equipo.
          </Text>

          <Section style={panel}>
            <Field label="Nombre" value={nombre} />
            <Field label="Email" value={email} />
            <Field label="Teléfono / WhatsApp" value={telefono} />
            <Field label="Empresa u organización" value={empresa} />
            <Field label="Línea de interés" value={linea_interes} />
          </Section>

          <Section style={panel}>
            <Text style={label}>Necesidad reportada</Text>
            <Text style={value}>{mensaje}</Text>
          </Section>

          <Section style={panel}>
            <Text style={label}>Resumen de conversación</Text>
            <Text style={value}>{resumen_conversacion}</Text>
          </Section>

          <Hr style={divider} />
          <Text style={meta}>Origen: {origen}</Text>
        </Container>
      </Body>
    </Html>
  )
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <Text style={field}>
      <strong>{label}:</strong> {value || 'No indicado'}
    </Text>
  )
}

export const template = {
  component: LeadNotificationEmail,
  subject: 'Solicitud Propuesta Chatbot - Anima Praxis',
  displayName: 'Solicitud de propuesta del chatbot',
  to: 'info@animapraxis.org',
  previewData: {
    nombre: 'Pedro Liut',
    email: 'fameconsultores@gmail.com',
    telefono: 'No indicado',
    empresa: 'Fame Consultores',
    linea_interes: 'Coaching y terapia',
    mensaje: 'Conflicto con un socio en mi empresa.',
    resumen_conversacion: 'Solicita propuesta de coaching ejecutivo.',
  },
} satisfies TemplateEntry

const main = {
  backgroundColor: '#ffffff',
  color: '#192538',
  fontFamily: 'Arial, sans-serif',
}

const container = {
  width: '100%',
  maxWidth: '640px',
  margin: '0 auto',
  padding: '32px 24px',
}

const eyebrow = {
  color: '#8b7355',
  fontSize: '13px',
  letterSpacing: '0',
  margin: '0 0 8px',
  textTransform: 'uppercase' as const,
}

const heading = {
  color: '#192538',
  fontSize: '28px',
  lineHeight: '34px',
  margin: '0 0 12px',
}

const intro = {
  color: '#3d4756',
  fontSize: '15px',
  lineHeight: '23px',
  margin: '0 0 20px',
}

const panel = {
  backgroundColor: '#FCF3F1',
  border: '1px solid #E6D8CF',
  borderRadius: '8px',
  padding: '16px 18px',
  margin: '0 0 16px',
}

const field = {
  color: '#192538',
  fontSize: '15px',
  lineHeight: '22px',
  margin: '0 0 8px',
}

const label = {
  color: '#8b7355',
  fontSize: '13px',
  fontWeight: 700,
  margin: '0 0 6px',
  textTransform: 'uppercase' as const,
}

const value = {
  color: '#192538',
  fontSize: '15px',
  lineHeight: '23px',
  margin: 0,
  whiteSpace: 'pre-wrap' as const,
}

const divider = {
  borderColor: '#E6D8CF',
  margin: '20px 0',
}

const meta = {
  color: '#5A626F',
  fontSize: '12px',
  lineHeight: '18px',
  margin: 0,
}