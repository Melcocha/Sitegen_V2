import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Minus, ArrowRight, Sparkles, HelpCircle } from 'lucide-react'

const FAQS = [
  {
    q: '¿Cómo funciona la creación de sitios web con Inteligencia Artificial?',
    a: 'Solo necesitas describir en lenguaje natural qué hace tu negocio, iglesia u organización. Nuestra IA interpreta tu industria, estructura las secciones, redacta textos profesionales persuasivos y compone una estética visual de alta gama en menos de 10 minutos, sin que tengas que escribir una sola línea de código.'
  },
  {
    q: '¿Puedo editar y personalizar cada elemento una vez generado?',
    a: 'Sí, al 100%. Todo en tu sitio es interactivo: puedes hacer clic directamente sobre cualquier texto, foto, horario, botón de donación o tarjeta de evento para editarlo al instante en el lienzo, o usar la barra lateral con controles avanzados.'
  },
  {
    q: '¿Puedo alternar entre las 4 opciones de plantilla?',
    a: 'Por supuesto. Cada sitio web generado te permite cambiar al instante entre 4 variantes de diseño profesionales (Afiche, Nucleus, Poster y MyGateway) conservando todo tu contenido intacto, para que elijas la estética que mejor conecte con tu público.'
  },
  {
    q: '¿Puedo conectar mi propio dominio personalizado (.com, .org, etc.)?',
    a: 'Totalmente. Incluimos un buscador de dominios con verificación de disponibilidad en tiempo real. Puedes conectar cualquier dominio que ya tengas o registrar uno nuevo directamente.'
  },
  {
    q: '¿Qué velocidad de carga y seguridad incluye mi sitio web?',
    a: 'Tu sitio se despliega en una red global Edge CDN con velocidad de carga sub-100ms. Además, cada página web nace con certificado de seguridad SSL bancario (HTTPS) activo y protección de datos sin costo adicional.'
  },
  {
    q: '¿El sitio web es compatible con teléfonos móviles y tablets?',
    a: 'Sí, todas las plantillas y componentes están optimizados para ofrecer una experiencia ultra fluida en pantallas táctiles de teléfonos móviles, tabletas y ordenadores de escritorio.'
  }
]

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(null)

  const toggle = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx)
  }

  return (
    <section id="faq" style={{ background: '#FFFFFF', padding: '110px 0', borderTop: '1px solid #E5E7EB' }}>
      <div className="container" style={{ maxWidth: 880, margin: '0 auto', padding: '0 24px' }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            fontSize: '0.72rem',
            fontWeight: 800,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#4B5563',
            marginBottom: 14,
            padding: '6px 16px',
            borderRadius: 999,
            border: '1px solid #E5E7EB',
            background: '#F9FAFB',
          }}>
            <HelpCircle size={14} /> Preguntas Frecuentes
          </span>
          <h2 style={{
            fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
            fontWeight: 900,
            letterSpacing: '-0.035em',
            color: '#0A0A0A',
            lineHeight: 1.15,
            margin: '0 0 16px',
          }}>
            Todo lo que necesitas saber
          </h2>
          <p style={{ maxWidth: 520, margin: '0 auto', fontSize: '1.05rem', color: '#4B5563', lineHeight: 1.65 }}>
            Respuestas claras y directas para que lances tu presencia online con total tranquilidad y confianza.
          </p>
        </div>

        {/* Accordion List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx
            return (
              <div
                key={idx}
                style={{
                  background: isOpen ? '#FAFAFA' : '#FFFFFF',
                  border: `1.5px solid ${isOpen ? '#000000' : '#E5E7EB'}`,
                  borderRadius: 16,
                  overflow: 'hidden',
                  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: isOpen ? '0 8px 30px rgba(0,0,0,0.06)' : 'none',
                }}
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  style={{
                    width: '100%',
                    padding: '22px 26px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 16,
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontFamily: 'inherit',
                  }}
                >
                  <span style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0A0A0A', letterSpacing: '-0.01em', lineHeight: 1.35 }}>
                    {faq.q}
                  </span>
                  <div style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: isOpen ? '#000000' : '#F3F4F6',
                    color: isOpen ? '#FFFFFF' : '#000000',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    transition: 'all 0.2s ease',
                  }}>
                    {isOpen ? <Minus size={15} strokeWidth={2.5} /> : <Plus size={15} strokeWidth={2.5} />}
                  </div>
                </button>

                {isOpen && (
                  <div style={{
                    padding: '0 26px 24px 26px',
                    fontSize: '0.95rem',
                    color: '#4B5563',
                    lineHeight: 1.7,
                    borderTop: '1px solid #F3F4F6',
                    paddingTop: 16,
                  }}>
                    {faq.a}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Bottom CTA Card */}
        <div style={{
          marginTop: 64,
          background: '#000000',
          color: '#FFFFFF',
          borderRadius: 24,
          padding: '44px 40px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 20px 50px rgba(0,0,0,0.2)',
        }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#9CA3AF', marginBottom: 12 }}>
            ✦ Comienza en 10 minutos
          </span>
          <h3 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 900, letterSpacing: '-0.03em', color: '#FFFFFF', margin: '0 0 14px' }}>
            ¿Listo para ver tu sitio web en vivo?
          </h3>
          <p style={{ maxWidth: 480, fontSize: '0.95rem', color: '#D1D5DB', lineHeight: 1.6, margin: '0 0 28px' }}>
            Crea tu página web profesional con IA hoy mismo. Sin tarjeta de crédito requerida para empezar.
          </p>
          <Link
            to="/app/new"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              padding: '14px 34px',
              borderRadius: 999,
              background: '#FFFFFF',
              color: '#000000',
              fontWeight: 900,
              fontSize: '0.95rem',
              textDecoration: 'none',
              letterSpacing: '-0.01em',
              boxShadow: '0 10px 30px rgba(255,255,255,0.25)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.background = '#E5E5E5'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = ''
              e.currentTarget.style.background = '#FFFFFF'
            }}
          >
            <Sparkles size={16} /> Crear mi página web con IA <ArrowRight size={16} />
          </Link>
        </div>

      </div>
    </section>
  )
}
