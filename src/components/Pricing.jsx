import { useState } from 'react'
import { Check } from 'lucide-react'

const PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    desc: 'Ideal para proyectos personales',
    monthly: 6,
    annual: 5,
    features: [
      '1 sitio web activo',
      'Generación IA asistida',
      'Subdominio personalizado',
      'SSL automático & CDN global',
      'Soporte por email',
    ],
    cta: 'Comenzar',
    featured: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    desc: 'Para iglesias y empresas profesionales',
    monthly: 12,
    annual: 10,
    features: [
      '3 sitios web activos',
      'Motor IA · calidad máxima',
      'Dominio personalizado (.com)',
      'Editor visual en vivo',
      'Dashboard de métricas',
      'Integración con donaciones/pagos',
      'Soporte prioritario',
    ],
    cta: 'Elegir Pro',
    featured: true,
    badge: 'Más popular',
  },
  {
    id: 'agency',
    name: 'Agency',
    desc: 'Para redes y organizaciones grandes',
    monthly: null,
    annual: null,
    features: [
      'Sitios ilimitados',
      'White-label completo',
      'Multi-usuario y roles',
      'API de generación',
      'Analytics avanzados',
      'SLA 99.9% garantizado',
      'Soporte dedicado 24/7',
    ],
    cta: 'Hablar con soporte',
    featured: false,
  },
]

export default function Pricing({ onCheckout }) {
  const [annual, setAnnual] = useState(true)

  const handlePlanClick = (plan) => {
    if (plan.id === 'agency') {
      window.location.href = 'mailto:hola@saasweb.com?subject=Plan%20Agency'
      return
    }
    if (onCheckout) {
      onCheckout({ plan: plan.id, billingCycle: annual ? 'annual' : 'monthly' })
    }
  }

  return (
    <section className="section" id="pricing" style={{ background: '#000000', padding: '100px 0', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="container">

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span style={{
            display: 'inline-block',
            fontSize: '0.72rem', fontWeight: 800,
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.6)', marginBottom: 14,
            padding: '5px 14px', borderRadius: 999,
            border: '1px solid rgba(255,255,255,0.15)',
            background: 'rgba(255,255,255,0.04)',
          }}>
            Precios transparentes
          </span>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3.2rem)',
            fontWeight: 900,
            letterSpacing: '-0.035em',
            color: '#FFFFFF',
            lineHeight: 1.15,
            marginBottom: 16,
          }}>
            Invierte en tu presencia online
          </h2>
          <p style={{ maxWidth: 460, margin: '0 auto 36px', fontSize: '1rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7 }}>
            Sin sorpresas ni contratos forzosos. Cancela en cualquier momento con un clic.
          </p>

          {/* Toggle Mensual / Anual */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: 5, background: '#0E0E12',
            borderRadius: 999, border: '1px solid rgba(255,255,255,0.12)',
          }}>
            <button
              onClick={() => setAnnual(false)}
              style={{
                padding: '8px 20px', borderRadius: 999, border: 'none',
                background: !annual ? '#FFFFFF' : 'transparent',
                color: !annual ? '#000000' : 'rgba(255,255,255,0.6)',
                fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer',
                transition: 'all 0.2s', fontFamily: 'var(--font)',
              }}
            >
              Mensual
            </button>
            <button
              onClick={() => setAnnual(true)}
              style={{
                padding: '8px 20px', borderRadius: 999, border: 'none',
                background: annual ? '#FFFFFF' : 'transparent',
                color: annual ? '#000000' : 'rgba(255,255,255,0.6)',
                fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer',
                transition: 'all 0.2s', fontFamily: 'var(--font)',
              }}
            >
              Anual <span style={{ fontSize: '0.72rem', opacity: 0.85, marginLeft: 4 }}>(-20%)</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
          gap: 24, maxWidth: 1040, margin: '0 auto',
        }}>
          {PLANS.map(p => {
            const price = annual ? p.annual : p.monthly

            return (
              <div
                key={p.id}
                style={{
                  padding: 36,
                  borderRadius: 20,
                  background: p.featured ? '#121216' : '#0B0B0E',
                  border: p.featured ? '1.5px solid rgba(255,255,255,0.4)' : '1px solid rgba(255,255,255,0.08)',
                  display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                  position: 'relative',
                  boxShadow: p.featured ? '0 20px 60px rgba(0,0,0,0.8), 0 0 30px rgba(255,255,255,0.03)' : 'none',
                  transform: p.featured ? 'scale(1.02)' : 'none',
                }}
              >
                {/* Badge if featured */}
                {p.featured && (
                  <div style={{
                    position: 'absolute', top: -13, left: '50%', transform: 'translateX(-50%)',
                    background: '#FFFFFF', color: '#000000',
                    fontSize: '0.72rem', fontWeight: 900,
                    letterSpacing: '0.08em', textTransform: 'uppercase',
                    padding: '4px 14px', borderRadius: 999,
                    boxShadow: '0 4px 14px rgba(255,255,255,0.2)',
                  }}>
                    {p.badge}
                  </div>
                )}

                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF', marginBottom: 6 }}>
                    {p.name}
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.55)', marginBottom: 24, minHeight: 40 }}>
                    {p.desc}
                  </p>

                  {/* Price */}
                  <div style={{ marginBottom: 28, display: 'flex', alignItems: 'baseline', gap: 6 }}>
                    {price !== null ? (
                      <>
                        <span style={{ fontSize: '3rem', fontWeight: 900, color: '#FFFFFF', letterSpacing: '-0.03em' }}>
                          ${price}
                        </span>
                        <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)' }}>
                          USD / mes
                        </span>
                      </>
                    ) : (
                      <span style={{ fontSize: '1.8rem', fontWeight: 800, color: '#FFFFFF' }}>
                        A medida
                      </span>
                    )}
                  </div>

                  {/* Feature list */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 32 }}>
                    {p.features.map(f => (
                      <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{
                          width: 18, height: 18, borderRadius: '50%',
                          background: 'rgba(255,255,255,0.1)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          flexShrink: 0,
                        }}>
                          <Check size={11} color="#FFFFFF" strokeWidth={3} />
                        </div>
                        <span style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.75)' }}>
                          {f}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <button
                  onClick={() => handlePlanClick(p)}
                  style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: 999,
                    border: p.featured ? 'none' : '1px solid rgba(255,255,255,0.2)',
                    background: p.featured ? '#FFFFFF' : 'transparent',
                    color: p.featured ? '#000000' : '#FFFFFF',
                    fontWeight: 800,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    fontFamily: 'var(--font)',
                  }}
                  onMouseEnter={e => {
                    if (p.featured) {
                      e.currentTarget.style.background = '#E5E5E5'
                      e.currentTarget.style.transform = 'translateY(-1px)'
                    } else {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
                    }
                  }}
                  onMouseLeave={e => {
                    if (p.featured) {
                      e.currentTarget.style.background = '#FFFFFF'
                      e.currentTarget.style.transform = 'none'
                    } else {
                      e.currentTarget.style.background = 'transparent'
                    }
                  }}
                >
                  {p.cta}
                </button>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
