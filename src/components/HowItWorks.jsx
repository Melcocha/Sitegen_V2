import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'

/* ─── SVG Illustrations (Crisp Dark-on-Light) ──────────────────── */
const IllustrationDescribe = () => (
  <svg width="140" height="130" viewBox="0 0 140 130" fill="none">
    <circle cx="70" cy="65" r="58" fill="#F3F4F6" />
    <circle cx="70" cy="65" r="44" fill="#E5E7EB" />
    <rect x="20" y="84" width="100" height="7" rx="3.5" fill="#D1D5DB" />
    <rect x="35" y="91" width="8" height="25" rx="2" fill="#E5E7EB" />
    <rect x="97" y="91" width="8" height="25" rx="2" fill="#E5E7EB" />
    <rect x="30" y="65" width="80" height="20" rx="4" fill="#111827" opacity="0.08" />
    <rect x="32" y="26" width="76" height="40" rx="5" fill="#FFFFFF" stroke="#D1D5DB" strokeWidth="1.5" />
    <rect x="40" y="36" width="40" height="3" rx="1.5" fill="#111827" />
    <rect x="40" y="42" width="30" height="2" rx="1" fill="#6B7280" />
    <rect x="40" y="47" width="36" height="2" rx="1" fill="#9CA3AF" />
    <circle cx="70" cy="14" r="8" fill="#D1D5DB" />
  </svg>
)

const IllustrationAI = () => (
  <svg width="140" height="130" viewBox="0 0 140 130" fill="none">
    <circle cx="70" cy="65" r="58" fill="#F3F4F6" />
    <rect x="45" y="40" width="50" height="50" rx="8" fill="#FFFFFF" stroke="#111827" strokeWidth="1.5" />
    <line x1="45" y1="55" x2="95" y2="55" stroke="#E5E7EB" strokeWidth="1" />
    <line x1="45" y1="65" x2="95" y2="65" stroke="#E5E7EB" strokeWidth="1" />
    <line x1="45" y1="75" x2="95" y2="75" stroke="#E5E7EB" strokeWidth="1" />
    <circle cx="70" cy="65" r="14" fill="#000000" />
    <path d="M66 65l3 3 6-6" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const IllustrationEdit = () => (
  <svg width="140" height="130" viewBox="0 0 140 130" fill="none">
    <circle cx="70" cy="65" r="58" fill="#F3F4F6" />
    <rect x="25" y="32" width="90" height="66" rx="6" fill="#FFFFFF" stroke="#D1D5DB" strokeWidth="1.5" />
    <line x1="25" y1="44" x2="115" y2="44" stroke="#E5E7EB" strokeWidth="1.5" />
    <rect x="32" y="52" width="28" height="38" rx="4" fill="#000000" />
    <rect x="68" y="52" width="40" height="14" rx="3" fill="#E5E7EB" />
    <rect x="68" y="72" width="40" height="14" rx="3" fill="#F3F4F6" />
  </svg>
)

const IllustrationDomain = () => (
  <svg width="140" height="130" viewBox="0 0 140 130" fill="none">
    <circle cx="70" cy="65" r="58" fill="#F3F4F6" />
    <rect x="22" y="46" width="96" height="38" rx="8" fill="#FFFFFF" stroke="#111827" strokeWidth="1.5" />
    <rect x="32" y="59" width="48" height="12" rx="3" fill="#E5E7EB" />
    <circle cx="98" cy="65" r="8" fill="#000000" />
    <path d="M95 65l2 2 4-4" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const IllustrationPublish = () => (
  <svg width="140" height="130" viewBox="0 0 140 130" fill="none">
    <circle cx="70" cy="65" r="58" fill="#F3F4F6" />
    <circle cx="70" cy="65" r="38" stroke="#111827" strokeWidth="1.5" strokeDasharray="4 4" />
    <circle cx="70" cy="65" r="22" fill="#000000" />
    <path d="M70 52v18M64 58l6-6 6 6" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

function Connector({ isEven }) {
  const [drawn, setDrawn] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setDrawn(true); obs.disconnect() } },
      { threshold: 0.5 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const w = 860
  const h = 54
  const x1 = isEven ? w * 0.28 : w * 0.72
  const x2 = isEven ? w * 0.72 : w * 0.28
  const dashLen = 320

  return (
    <div
      ref={ref}
      style={{
        maxWidth: w,
        margin: '0 auto',
        height: h,
        position: 'relative',
        overflow: 'visible',
        pointerEvents: 'none',
      }}
    >
      <svg
        width="100%"
        height={h}
        viewBox={`0 0 ${w} ${h}`}
        preserveAspectRatio="none"
        style={{ position: 'absolute', inset: 0 }}
      >
        <path
          d={`M${x1},0 C${x1},${h / 2} ${x2},${h / 2} ${x2},${h}`}
          stroke="#E5E7EB"
          strokeWidth="2"
          strokeDasharray="5 6"
          fill="none"
        />
        <path
          d={`M${x1},0 C${x1},${h / 2} ${x2},${h / 2} ${x2},${h}`}
          stroke="#111827"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          strokeDasharray={dashLen}
          strokeDashoffset={drawn ? 0 : dashLen}
          style={{
            transition: drawn ? 'stroke-dashoffset 0.9s cubic-bezier(0.4,0,0.2,1)' : 'none',
          }}
        />
        {drawn && (
          <circle r="4.5" fill="#000000" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}>
            <animateMotion
              dur="2s"
              begin="0.1s"
              repeatCount="indefinite"
              path={`M${x1},0 C${x1},${h / 2} ${x2},${h / 2} ${x2},${h}`}
            />
          </circle>
        )}
      </svg>
    </div>
  )
}

function StepCard({ step, i }) {
  const { Illustration } = step
  const isEven = i % 2 === 1
  const [hov, setHov] = useState(false)

  return (
    <div
      className="responsive-step-card"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex',
        flexDirection: isEven ? 'row-reverse' : 'row',
        alignItems: 'stretch',
        background: '#F9FAFB',
        border: `1.5px solid ${hov ? '#000000' : '#E5E7EB'}`,
        borderRadius: 20,
        overflow: 'hidden',
        boxShadow: hov ? '0 16px 40px rgba(0,0,0,0.06)' : 'none',
        transition: 'all 0.25s ease',
        maxWidth: 860,
        margin: '0 auto',
        width: '100%',
      }}
    >
      {/* Illustration panel */}
      <div className="responsive-step-illustration" style={{
        width: 220,
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '36px 16px',
        background: '#FFFFFF',
        borderRight: isEven ? 'none' : '1px solid #E5E7EB',
        borderLeft: isEven ? '1px solid #E5E7EB' : 'none',
      }}>
        <div style={{ transform: hov ? 'scale(1.05)' : 'scale(1)', transition: 'transform 0.3s ease' }}>
          <Illustration />
        </div>
      </div>

      {/* Content */}
      <div className="responsive-step-content" style={{ flex: 1, padding: '40px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <div style={{
            width: 36, height: 36, borderRadius: '50%',
            background: '#000000',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.8rem', fontWeight: 900,
            color: '#FFFFFF', letterSpacing: '0.02em', flexShrink: 0,
          }}>
            {step.n}
          </div>
          <span style={{
            fontSize: '0.75rem', fontWeight: 700,
            padding: '4px 12px', borderRadius: 999,
            background: '#FFFFFF',
            border: '1px solid #E5E7EB',
            color: '#4B5563',
          }}>
            {step.time}
          </span>
        </div>

        <h3 style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#0A0A0A', marginBottom: 10 }}>
          {step.title}
        </h3>

        <p style={{ fontSize: '0.95rem', color: '#4B5563', lineHeight: 1.65, marginBottom: 14 }}>
          {step.body}
        </p>

        <div style={{
          padding: '10px 14px', borderRadius: 8,
          background: '#FFFFFF',
          borderLeft: '2px solid #000000',
          borderTop: '1px solid #E5E7EB',
          borderRight: '1px solid #E5E7EB',
          borderBottom: '1px solid #E5E7EB',
          fontSize: '0.82rem', color: '#6B7280', fontStyle: 'italic',
        }}>
          {step.example}
        </div>
      </div>
    </div>
  )
}

const STEPS = [
  {
    n: '01', title: 'Describe tu negocio o iglesia',
    body: 'Escribe en una oración qué haces y dónde operas. No necesitas saber nada técnico — habla como hablarías con un cliente.',
    example: '"Iglesia cristiana con cultos dominicales, ministerios y donaciones."',
    time: '30 segundos', Illustration: IllustrationDescribe,
  },
  {
    n: '02', title: 'GPT-4o diseña tu sitio',
    body: 'La IA interpreta tu industria, genera la estructura perfecta, redacta el contenido y organiza tus eventos y donaciones.',
    example: 'Sin plantillas genéricas. Tu sitio es único para tu visión.',
    time: '~2 minutos', Illustration: IllustrationAI,
  },
  {
    n: '03', title: 'Edita sin tocar código',
    body: 'Panel lateral intuitivo donde cambias textos, imágenes y eventos. Lo que ves en pantalla es exactamente lo que publicas.',
    example: 'Cualquier persona sabe usarlo. Cero curva técnica.',
    time: '5 minutos', Illustration: IllustrationEdit,
  },
  {
    n: '04', title: 'Elige tu dominio .com',
    body: 'Escribe el nombre que quieres. Verificación de disponibilidad en tiempo real con sugerencias inteligentes automáticas.',
    example: 'miiglesia.com · casadedios.org · vidanueva.tv',
    time: '2 minutos', Illustration: IllustrationDomain,
  },
  {
    n: '05', title: 'Tu web sale en vivo',
    body: 'Vercel despliega tu sitio globalmente con certificado SSL activo y CDN en menos de 30 segundos.',
    example: 'Ya estás en internet. Las personas pueden encontrarte ahora.',
    time: '1 minuto', Illustration: IllustrationPublish,
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" style={{ background: '#FFFFFF', padding: '110px 0' }}>
      <div className="container">

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 72 }}>
          <span style={{
            display: 'inline-block',
            fontSize: '0.72rem', fontWeight: 800,
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color: '#4B5563', marginBottom: 14,
            padding: '6px 16px', borderRadius: 999,
            border: '1px solid #E5E7EB',
            background: '#F3F4F6',
          }}>
            Proceso · 5 pasos
          </span>
          <h2 style={{
            fontSize: 'clamp(2.2rem, 4vw, 3.4rem)',
            fontWeight: 900,
            letterSpacing: '-0.035em',
            color: '#0A0A0A',
            lineHeight: 1.15,
            marginBottom: 16,
          }}>
            De cero a publicado en 10 minutos
          </h2>
          <p style={{ maxWidth: 480, margin: '0 auto', fontSize: '1.05rem', color: '#4B5563', lineHeight: 1.7 }}>
            Sin conocimientos técnicos. Un proceso tan simple que lo completas
            en una sola sesión sin complicaciones.
          </p>
        </div>

        {/* Steps + connectors */}
        <div>
          {STEPS.map((step, i) => (
            <div key={step.n}>
              <StepCard step={step} i={i} />
              {i < STEPS.length - 1 && (
                <Connector isEven={i % 2 === 0} />
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA Banner — Black Anchor */}
        <div style={{
          maxWidth: 860, margin: '64px auto 0',
          background: '#000000',
          borderRadius: 24,
          padding: '36px 44px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20,
          flexWrap: 'wrap',
          boxShadow: '0 20px 50px rgba(0,0,0,0.12)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <div style={{
              width: 48, height: 48, borderRadius: 14,
              background: 'rgba(255,255,255,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#FFFFFF',
            }}>
              <Sparkles size={24} />
            </div>
            <div>
              <h4 style={{ fontWeight: 800, fontSize: '1.15rem', color: '#FFFFFF', marginBottom: 4 }}>
                ¿Listo para crear tu sitio hoy?
              </h4>
              <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.65)' }}>
                Escribe tu idea y ten tu página web profesional en minutos.
              </p>
            </div>
          </div>

          <Link
            to="/app/new"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '14px 32px', borderRadius: 999,
              background: '#FFFFFF',
              color: '#000000', fontWeight: 800, fontSize: '0.925rem',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 16px rgba(255,255,255,0.2)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#E5E5E5'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = '#FFFFFF'
              e.currentTarget.style.transform = 'none'
            }}
          >
            Comenzar ahora <ArrowRight size={16} />
          </Link>
        </div>

      </div>
    </section>
  )
}
