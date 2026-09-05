/* 
  HowItWorks — Premium connected step flow
  - Spacious cards (no compact)
  - Animated connector line between every pair of cards
*/
import { useEffect, useRef, useState } from 'react'

/* ─── SVG Illustrations (unchanged) ────────────────────────────── */
const IllustrationDescribe = ({ accent }) => (
  <svg width="140" height="130" viewBox="0 0 140 130" fill="none">
    <circle cx="70" cy="65" r="58" fill={accent + '0D'} />
    <circle cx="70" cy="65" r="44" fill={accent + '08'} />
    <rect x="20" y="84" width="100" height="7" rx="3.5" fill={accent + '30'} />
    <rect x="35" y="91" width="8" height="25" rx="2" fill={accent + '20'} />
    <rect x="97" y="91" width="8" height="25" rx="2" fill={accent + '20'} />
    <rect x="30" y="65" width="80" height="20" rx="4" fill="var(--ink)" opacity="0.12" />
    <rect x="35" y="70" width="70" height="10" rx="2" fill="var(--ink)" opacity="0.08" />
    <rect x="32" y="26" width="76" height="40" rx="5" fill="var(--ink)" opacity="0.15" />
    <rect x="36" y="30" width="68" height="30" rx="3" fill="var(--bg-2)" opacity="0.9" />
    <rect x="40" y="36" width="40" height="3" rx="1.5" fill={accent} opacity="0.85" />
    <rect x="40" y="42" width="30" height="2" rx="1" fill="var(--muted)" opacity="0.5" />
    <rect x="40" y="47" width="36" height="2" rx="1" fill="var(--muted)" opacity="0.35" />
    <rect x="40" y="52" width="24" height="2" rx="1" fill="var(--muted)" opacity="0.25" />
    <rect x="76" y="36" width="2" height="10" rx="1" fill={accent} opacity="0.9" />
    <circle cx="70" cy="14" r="8" fill="#F5D0A9" />
    <path d="M62 12c0-4.4 3.6-8 8-8s8 3.6 8 8" fill="#3D2B1F" opacity="0.85" />
    <path d="M59 22h22c2.2 0 4 1.8 4 4v6H55v-6c0-2.2 1.8-4 4-4z" fill="var(--ink)" opacity="0.18" />
    <rect x="64" y="22" width="4" height="10" fill="var(--bg)" opacity="0.6" />
    <ellipse cx="52" cy="72" rx="6" ry="3.5" fill="#F5D0A9" opacity="0.9" />
    <ellipse cx="88" cy="72" rx="6" ry="3.5" fill="#F5D0A9" opacity="0.9" />
    <circle cx="84" cy="80" r="2" fill={accent} opacity="0.8" />
    <circle cx="90" cy="80" r="2" fill={accent} opacity="0.5" />
    <circle cx="96" cy="80" r="2" fill={accent} opacity="0.3" />
  </svg>
)

const IllustrationAI = ({ accent }) => (
  <svg width="140" height="130" viewBox="0 0 140 130" fill="none">
    <circle cx="70" cy="65" r="58" fill={accent + '0D'} />
    <circle cx="70" cy="65" r="44" fill={accent + '08'} />
    <rect x="45" y="40" width="50" height="50" rx="8" fill="var(--ink)" opacity="0.12" />
    <rect x="50" y="45" width="40" height="40" rx="5" fill="var(--ink)" opacity="0.1" />
    <line x1="45" y1="55" x2="95" y2="55" stroke={accent} strokeWidth="0.6" opacity="0.25" />
    <line x1="45" y1="65" x2="95" y2="65" stroke={accent} strokeWidth="0.6" opacity="0.25" />
    <line x1="45" y1="75" x2="95" y2="75" stroke={accent} strokeWidth="0.6" opacity="0.25" />
    <line x1="60" y1="40" x2="60" y2="90" stroke={accent} strokeWidth="0.6" opacity="0.25" />
    <line x1="70" y1="40" x2="70" y2="90" stroke={accent} strokeWidth="0.6" opacity="0.25" />
    <line x1="80" y1="40" x2="80" y2="90" stroke={accent} strokeWidth="0.6" opacity="0.25" />
    <circle cx="70" cy="65" r="12" fill={accent} opacity="0.15" />
    <circle cx="70" cy="65" r="12" stroke={accent} strokeWidth="1.5" fill="none" opacity="0.5" />
    <path d="M64 65l4 4 8-8" stroke={accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="28" y="50" width="17" height="4" rx="2" fill={accent} opacity="0.4" />
    <rect x="28" y="59" width="17" height="4" rx="2" fill={accent} opacity="0.6" />
    <rect x="28" y="68" width="17" height="4" rx="2" fill={accent} opacity="0.8" />
    <rect x="28" y="77" width="17" height="4" rx="2" fill={accent} opacity="0.4" />
    <rect x="95" y="50" width="17" height="4" rx="2" fill={accent} opacity="0.6" />
    <rect x="95" y="59" width="17" height="4" rx="2" fill={accent} opacity="0.4" />
    <rect x="95" y="68" width="17" height="4" rx="2" fill={accent} opacity="0.8" />
    <rect x="95" y="77" width="17" height="4" rx="2" fill={accent} opacity="0.3" />
    <circle cx="30" cy="30" r="4" fill={accent} opacity="0.5" />
    <circle cx="108" cy="28" r="3" fill={accent} opacity="0.4" />
    <circle cx="112" cy="102" r="4" fill={accent} opacity="0.35" />
  </svg>
)

const IllustrationEdit = ({ accent }) => (
  <svg width="140" height="130" viewBox="0 0 140 130" fill="none">
    <circle cx="70" cy="65" r="58" fill={accent + '0D'} />
    <circle cx="70" cy="65" r="44" fill={accent + '08'} />
    <rect x="18" y="22" width="88" height="66" rx="6" fill="var(--ink)" opacity="0.12" />
    <rect x="22" y="26" width="80" height="54" rx="4" fill="var(--bg-2)" opacity="0.9" />
    <rect x="26" y="32" width="44" height="4" rx="2" fill={accent} opacity="0.7" />
    <rect x="26" y="40" width="36" height="2.5" rx="1.25" fill="var(--muted)" opacity="0.4" />
    <rect x="26" y="45" width="42" height="2.5" rx="1.25" fill="var(--muted)" opacity="0.3" />
    <rect x="26" y="50" width="28" height="2.5" rx="1.25" fill="var(--muted)" opacity="0.25" />
    <rect x="74" y="28" width="24" height="48" rx="3" fill={accent} opacity="0.08" />
    <rect x="74" y="28" width="24" height="48" rx="3" stroke={accent} strokeWidth="1" fill="none" opacity="0.3" />
    <rect x="77" y="32" width="18" height="2.5" rx="1.25" fill={accent} opacity="0.6" />
    <rect x="77" y="37" width="14" height="2" rx="1" fill="var(--muted)" opacity="0.45" />
    <rect x="77" y="42" width="16" height="2" rx="1" fill="var(--muted)" opacity="0.35" />
    <circle cx="79" cy="50" r="3" fill={accent} opacity="0.9" />
    <circle cx="86" cy="50" r="3" fill="#0EA5E9" opacity="0.8" />
    <circle cx="93" cy="50" r="3" fill="#8B5CF6" opacity="0.8" />
    <rect x="77" y="57" width="18" height="2" rx="1" fill="var(--muted)" opacity="0.2" />
    <rect x="77" y="57" width="11" height="2" rx="1" fill={accent} opacity="0.6" />
    <circle cx="88" cy="58" r="3" fill="var(--bg)" stroke={accent} strokeWidth="1.5" />
    <rect x="52" y="88" width="20" height="5" rx="2" fill="var(--ink)" opacity="0.12" />
    <rect x="44" y="93" width="36" height="4" rx="2" fill="var(--ink)" opacity="0.1" />
    <path d="M100 90 L104 105 L106 102 L108 107 L110 106 L108 101 L111 100Z" fill="#F5D0A9" stroke="#E8C090" strokeWidth="0.8" />
  </svg>
)

const IllustrationDomain = ({ accent }) => (
  <svg width="140" height="130" viewBox="0 0 140 130" fill="none">
    <circle cx="70" cy="65" r="58" fill={accent + '0D'} />
    <circle cx="70" cy="65" r="44" fill={accent + '08'} />
    <circle cx="62" cy="68" r="36" fill="var(--ink)" opacity="0.07" />
    <circle cx="62" cy="68" r="36" stroke="var(--muted)" strokeWidth="1.2" fill="none" opacity="0.3" />
    <path d="M26 68 Q62 53 98 68" stroke="var(--muted)" strokeWidth="0.8" fill="none" opacity="0.35" />
    <path d="M28 53 Q62 42 96 53" stroke="var(--muted)" strokeWidth="0.6" fill="none" opacity="0.25" />
    <path d="M28 83 Q62 92 96 83" stroke="var(--muted)" strokeWidth="0.6" fill="none" opacity="0.25" />
    <ellipse cx="62" cy="68" rx="18" ry="36" stroke="var(--muted)" strokeWidth="0.8" fill="none" opacity="0.3" />
    <line x1="62" y1="32" x2="62" y2="104" stroke="var(--muted)" strokeWidth="1" opacity="0.2" />
    <line x1="26" y1="68" x2="98" y2="68" stroke="var(--muted)" strokeWidth="1" opacity="0.2" />
    <circle cx="98" cy="38" r="18" fill={accent} opacity="0.15" />
    <circle cx="98" cy="38" r="18" stroke={accent} strokeWidth="1.2" fill="none" opacity="0.4" />
    <path d="M98 26c-6.6 0-12 5.4-12 12 0 6.6 12 20 12 20s12-13.4 12-20c0-6.6-5.4-12-12-12z" fill={accent} opacity="0.85" />
    <circle cx="98" cy="38" r="4" fill="var(--bg)" opacity="0.95" />
    <rect x="24" y="90" width="44" height="18" rx="5" fill={accent} opacity="0.12" />
    <rect x="24" y="90" width="44" height="18" rx="5" stroke={accent} strokeWidth="1" fill="none" opacity="0.4" />
    <text x="46" y="102.5" textAnchor="middle" fontSize="7.5" fontWeight="800" fill={accent} fontFamily="monospace" opacity="0.9">.COM OK</text>
  </svg>
)

const IllustrationPublish = ({ accent }) => (
  <svg width="140" height="130" viewBox="0 0 140 130" fill="none">
    <circle cx="70" cy="65" r="58" fill={accent + '0D'} />
    <circle cx="70" cy="65" r="44" fill={accent + '08'} />
    <ellipse cx="70" cy="108" rx="20" ry="6" fill="var(--muted)" opacity="0.12" />
    <path d="M70 15 C57 30 53 55 53 75 L70 85 L87 75 C87 55 83 30 70 15Z" fill="var(--ink)" opacity="0.14" />
    <path d="M70 18 C59 32 55 55 55 74 L70 83 L85 74 C85 55 81 32 70 18Z" fill="var(--bg-2)" opacity="0.85" />
    <path d="M58 62 L55 74 L70 83 L85 74 L82 62Z" fill={accent} opacity="0.18" />
    <circle cx="70" cy="50" r="11" fill={accent} opacity="0.12" />
    <circle cx="70" cy="50" r="11" stroke={accent} strokeWidth="2" fill="none" opacity="0.7" />
    <circle cx="70" cy="50" r="6" fill={accent} opacity="0.25" />
    <circle cx="73" cy="47" r="2.5" fill="var(--bg)" opacity="0.7" />
    <path d="M55 74 L34 95 L55 88Z" fill={accent} opacity="0.35" />
    <path d="M85 74 L106 95 L85 88Z" fill={accent} opacity="0.35" />
    <path d="M60 83 Q70 110 80 83 Q74 100 70 93 Q66 100 60 83Z" fill="#F59E0B" opacity="0.8" />
    <path d="M63 83 Q70 104 77 83 Q73 97 70 90 Q67 97 63 83Z" fill="#FCD34D" opacity="0.9" />
    <path d="M65 87 Q70 100 75 87 Q72 94 70 91 Q68 94 65 87Z" fill="#fff" opacity="0.6" />
    <circle cx="28" cy="28" r="2.5" fill={accent} opacity="0.6" />
    <circle cx="110" cy="35" r="2" fill={accent} opacity="0.5" />
    <circle cx="108" cy="72" r="14" fill={accent} />
    <path d="M101 72l5 5 8-8" stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

/* ─── Animated Connector between cards ──────────────────────────── */
function Connector({ fromAccent, toAccent, isEven }) {
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

  /* Path: curves from bottom-center of card above to top-center of card below,
     with an "S" bend that naturally shifts left/right for alternating layout */
  const w = 860
  const h = 64
  // anchor points shift to reflect the alt illustration position
  const x1 = isEven ? w * 0.28 : w * 0.72   // bottom anchor (center of illustration panel)
  const x2 = isEven ? w * 0.72 : w * 0.28   // top anchor of next card
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
        <defs>
          <linearGradient id={`cg-${fromAccent}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={fromAccent} stopOpacity="0.7" />
            <stop offset="100%" stopColor={toAccent} stopOpacity="0.7" />
          </linearGradient>
        </defs>
        {/* Background dashed guide */}
        <path
          d={`M${x1},0 C${x1},${h / 2} ${x2},${h / 2} ${x2},${h}`}
          stroke={fromAccent}
          strokeWidth="1.5"
          strokeDasharray="5 6"
          fill="none"
          opacity="0.18"
        />
        {/* Animated solid line */}
        <path
          d={`M${x1},0 C${x1},${h / 2} ${x2},${h / 2} ${x2},${h}`}
          stroke={`url(#cg-${fromAccent})`}
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          strokeDasharray={dashLen}
          strokeDashoffset={drawn ? 0 : dashLen}
          style={{
            transition: drawn ? 'stroke-dashoffset 0.9s cubic-bezier(0.4,0,0.2,1)' : 'none',
          }}
        />
        {/* Moving dot along path — pure CSS animation */}
        {drawn && (
          <>
            <circle r="5" fill={toAccent} opacity="0.9" style={{ filter: `drop-shadow(0 0 4px ${toAccent})` }}>
              <animateMotion
                dur="1.8s"
                begin="0.1s"
                repeatCount="indefinite"
                path={`M${x1},0 C${x1},${h / 2} ${x2},${h / 2} ${x2},${h}`}
              />
            </circle>
            <circle r="3" fill="#fff" opacity="0.8">
              <animateMotion
                dur="1.8s"
                begin="0.1s"
                repeatCount="indefinite"
                path={`M${x1},0 C${x1},${h / 2} ${x2},${h / 2} ${x2},${h}`}
              />
            </circle>
          </>
        )}
      </svg>
    </div>
  )
}

/* ─── Step card ─────────────────────────────────────────────────── */
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
        background: 'var(--bg-2)',
        border: `1px solid ${hov ? step.accent + '60' : 'var(--border)'}`,
        borderRadius: 'var(--radius-xl)',
        overflow: 'hidden',
        boxShadow: hov ? `0 16px 48px ${step.accent}14` : 'var(--shadow-sm)',
        transition: 'border-color 0.25s, box-shadow 0.25s',
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
        padding: '40px 16px',
        background: step.accent + '09',
        borderRight: isEven ? 'none' : `1px solid ${step.accent}1A`,
        borderLeft: isEven ? `1px solid ${step.accent}1A` : 'none',
      }}>
        <div style={{ transform: hov ? 'scale(1.07)' : 'scale(1)', transition: 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1)' }}>
          <Illustration accent={step.accent} />
        </div>
      </div>

      {/* Content */}
      <div className="responsive-step-content" style={{ flex: 1, padding: '48px 52px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {/* Badge row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <div style={{
            width: 40, height: 40, borderRadius: '50%',
            border: `2px solid ${step.accent}`,
            background: step.accent + '14',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.7rem', fontWeight: 900,
            color: step.accent, letterSpacing: '0.02em', flexShrink: 0,
          }}>
            {step.n}
          </div>
          <span style={{
            fontSize: '0.72rem', fontWeight: 700,
            padding: '4px 12px', borderRadius: 'var(--radius-full)',
            background: step.accent + '14',
            border: `1px solid ${step.accent}28`,
            color: step.accent,
          }}>
            {step.time}
          </span>
        </div>

        <h3 style={{
          fontWeight: 800, fontSize: '1.2rem',
          letterSpacing: '-0.025em', color: 'var(--ink)',
          marginBottom: 14, lineHeight: 1.3,
        }}>
          {step.title}
        </h3>

        <p style={{
          fontSize: '0.9375rem', color: 'var(--muted)',
          lineHeight: 1.8, marginBottom: 20,
          maxWidth: 440,
        }}>
          {step.body}
        </p>

        {/* Example callout */}
        <div style={{
          padding: '10px 16px',
          background: step.accent + '0C',
          borderLeft: `3px solid ${step.accent}`,
          borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
          fontSize: '0.8125rem',
          color: 'var(--ink-3)',
          fontStyle: 'italic',
          lineHeight: 1.6,
        }}>
          {step.example}
        </div>
      </div>
    </div>
  )
}

/* ─── STEPS DATA ────────────────────────────────────────────────── */
const STEPS = [
  {
    n: '01', title: 'Describe tu negocio',
    body: 'Escribe en una oración qué haces y dónde operas. No necesitas saber nada técnico — habla como hablarías con un cliente.',
    example: '"Bufete de abogados especializado en derecho corporativo y familiar."',
    time: '30 segundos', accent: '#00C896', Illustration: IllustrationDescribe,
  },
  {
    n: '02', title: 'GPT-4o diseña tu sitio',
    body: 'La IA interpreta tu industria, elige la paleta de colores perfecta, escribe el contenido y estructura el sitio completo.',
    example: 'Sin plantillas genéricas. Tu sitio es único para tu negocio.',
    time: '~2 minutos', accent: '#0EA5E9', Illustration: IllustrationAI,
  },
  {
    n: '03', title: 'Edita sin tocar código',
    body: 'Panel lateral intuitivo donde cambias textos, colores y secciones. Lo que ves en pantalla es exactamente lo que publicas.',
    example: 'Cualquier persona sabe usarlo. Cero curva de aprendizaje.',
    time: '5 minutos', accent: '#8B5CF6', Illustration: IllustrationEdit,
  },
  {
    n: '04', title: 'Elige tu dominio .com',
    body: 'Escribe el nombre que quieres. Verificación de disponibilidad en tiempo real con sugerencias inteligentes alternativas.',
    example: 'miabogado.com · miabogados.com · ariaslaw.com',
    time: '2 minutos', accent: '#F59E0B', Illustration: IllustrationDomain,
  },
  {
    n: '05', title: 'Paga y tu web sale en vivo',
    body: 'Checkout seguro vía Stripe. Al confirmar el pago, Vercel despliega tu sitio globalmente con SSL activo en menos de 30 segundos.',
    example: 'Ya estás en internet. Los clientes pueden encontrarte ahora.',
    time: '1 minuto', accent: '#10B981', Illustration: IllustrationPublish,
  },
]

/* ─── MAIN EXPORT ───────────────────────────────────────────────── */
export default function HowItWorks() {
  return (
    <section id="how-it-works" style={{ background: 'var(--bg)' }}>
      <div className="container" style={{ paddingTop: 96, paddingBottom: 0 }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 80 }}>
          <span className="t-label" style={{ marginBottom: 14, display: 'block' }}>
            Proceso · 5 pasos
          </span>
          <h2 className="t-headline" style={{ marginBottom: 16 }}>
            De cero a publicado en 10 minutos
          </h2>
          <p className="t-body" style={{ maxWidth: 460, margin: '0 auto' }}>
            Sin conocimientos técnicos. Un proceso tan simple que lo completas
            en una sola sesión, durante tu hora de almuerzo.
          </p>
        </div>

        {/* Steps + connectors interleaved */}
        <div>
          {STEPS.map((step, i) => (
            <div key={step.n}>
              <StepCard step={step} i={i} />
              {i < STEPS.length - 1 && (
                <Connector
                  fromAccent={STEPS[i].accent}
                  toAccent={STEPS[i + 1].accent}
                  isEven={i % 2 === 0}
                />
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA bar */}
        <div className="responsive-green-banner" style={{
          maxWidth: 860, margin: '48px auto 0',
          background: 'var(--brand)',
          borderRadius: 'var(--radius-xl)',
          padding: '24px 40px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
        }}>
          <div className="responsive-green-banner-content" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{
              width: 44, height: 44, borderRadius: 'var(--radius-md)',
              background: 'rgba(8,15,12,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
            </div>
            <div>
              <div style={{ fontWeight: 900, fontSize: '1rem', letterSpacing: '-0.02em', color: 'var(--ink)' }}>
                Tiempo total: ~10 minutos
              </div>
              <div style={{ fontSize: '0.8125rem', color: 'rgba(8,15,12,0.55)', marginTop: 2 }}>
                Lo que una agencia cobra $2,000+ USD y tarda 4 semanas — tú lo haces en una sesión
              </div>
            </div>
          </div>
          <a
            href="#generator"
            className="responsive-green-banner-btn"
            style={{
              padding: '12px 28px',
              background: '#080F0C', color: '#fff',
              borderRadius: 'var(--radius-full)',
              textDecoration: 'none', fontSize: '0.9rem', fontWeight: 700,
              flexShrink: 0, transition: 'opacity 0.2s',
              display: 'inline-flex', alignItems: 'center', gap: 8,
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.82'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            Probar el generador
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </a>
        </div>

        <div style={{ height: 72 }} />
      </div>
    </section>
  )
}
