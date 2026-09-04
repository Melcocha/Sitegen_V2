import { useState } from 'react'
import { Check } from 'lucide-react'

const PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    desc: 'Ideal para proyectos personales',
    monthly: 6,
    annual: 5,
    color: 'var(--ink)',
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
    desc: 'Para creadores profesionales',
    monthly: 12,
    annual: 10,
    color: '#00C896',
    features: [
      '3 sitios web',
      'GPT-4o · calidad máxima',
      'Dominio personalizado (.com)',
      'Editor no-code avanzado',
      'Dashboard de métricas',
      'Integración con Stripe',
      'Soporte prioritario',
    ],
    cta: 'Elegir Pro',
    featured: true,
    badge: 'Más popular',
  },
  {
    id: 'agency',
    name: 'Agency',
    desc: 'Para agencias y equipos grandes',
    monthly: null,
    annual: null,
    color: 'var(--ink)',
    features: [
      'Sitios ilimitados',
      'White-label completo',
      'Multi-usuario',
      'API de generación',
      'Analytics avanzados',
      'SLA 99.9% garantizado',
      'Soporte dedicado 24/7',
    ],
    cta: 'Hablar con ventas',
    featured: false,
  },
]

export default function Pricing({ onCheckout }) {
  const [annual, setAnnual] = useState(false)

  return (
    <section className="section" id="pricing" style={{ background: 'var(--bg-2)' }}>
      <div className="container">

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span className="t-label" style={{ marginBottom: 12, display: 'block' }}>Precios</span>
          <h2 className="t-headline" style={{ marginBottom: 16 }}>
            Sin letra chica. Sin sorpresas.
          </h2>
          <p className="t-body" style={{ maxWidth: 400, margin: '0 auto 32px' }}>
            Cancela cuando quieras. Sin contratos. Sin descargos ocultos.
          </p>

          {/* Toggle */}
          <div className="pill-toggle" style={{ display: 'inline-flex' }}>
            <button className={`pill-option${!annual ? ' active' : ''}`} onClick={() => setAnnual(false)}>
              Mensual
            </button>
            <button className={`pill-option${annual ? ' active' : ''}`} onClick={() => setAnnual(true)}>
              Anual
              <span style={{
                marginLeft: 6, padding: '1px 7px',
                background: 'var(--brand)', color: 'var(--ink)',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.65rem', fontWeight: 800,
              }}>
                -20%
              </span>
            </button>
          </div>
        </div>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, alignItems: 'start' }}>
          {PLANS.map(plan => (
            <div
              key={plan.id}
              className="pricing-card"
              style={{
                background: plan.featured ? '#080F0C' : 'var(--bg)',
                borderColor: plan.featured ? 'transparent' : 'var(--border)',
                transform: plan.featured ? 'scale(1.03)' : 'none',
                padding: 36,
              }}
            >
              {/* Plan badge */}
              {plan.badge && (
                <div className="badge badge-brand" style={{ marginBottom: 16, background: 'rgba(0,200,150,0.15)', borderColor: 'rgba(0,200,150,0.3)' }}>
                  {plan.badge}
                </div>
              )}

              <div style={{ marginBottom: 24 }}>
                <h3 style={{
                  fontWeight: 800, fontSize: '1.1rem',
                  letterSpacing: '-0.02em', marginBottom: 4,
                  color: plan.featured ? '#fff' : 'var(--ink)',
                }}>
                  {plan.name}
                </h3>
                <p style={{ fontSize: '0.8125rem', color: plan.featured ? 'rgba(255,255,255,0.5)' : 'var(--muted)' }}>
                  {plan.desc}
                </p>
              </div>

              {/* Price */}
              <div style={{ marginBottom: 28 }}>
                {plan.monthly !== null ? (
                  <div style={{
                    display: 'flex', alignItems: 'baseline', gap: 4,
                  }}>
                    <span style={{
                      fontSize: '0.875rem', fontWeight: 600,
                      color: plan.featured ? 'rgba(255,255,255,0.4)' : 'var(--muted)',
                    }}>
                      $
                    </span>
                    <span style={{
                      fontSize: '2.75rem', fontWeight: 900,
                      letterSpacing: '-0.05em', lineHeight: 1,
                      color: plan.featured ? '#00C896' : 'var(--ink)',
                    }}>
                      {annual ? plan.annual : plan.monthly}
                    </span>
                    <span style={{ fontSize: '0.875rem', color: plan.featured ? 'rgba(255,255,255,0.4)' : 'var(--muted)' }}>
                      / mes
                    </span>
                  </div>
                ) : (
                  <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--ink)', height: '44px' }}>
                    Personalizado
                  </div>
                )}
                {annual && plan.monthly !== null && (
                  <div style={{ fontSize: '0.78rem', marginTop: 4, fontWeight: 600, color: plan.featured ? 'rgba(0,200,150,0.8)' : 'var(--brand)' }}>
                    Ahorras ${(plan.monthly - plan.annual) * 12} al año
                  </div>
                )}
              </div>

              {/* Features */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 11, marginBottom: 32 }}>
                {plan.features.map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                      width: 18, height: 18, borderRadius: '50%',
                      background: plan.featured ? 'rgba(0,200,150,0.2)' : 'var(--brand-light)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <Check size={10} strokeWidth={3} color={plan.featured ? '#00C896' : '#00C896'} />
                    </div>
                    <span style={{ fontSize: '0.875rem', color: plan.featured ? 'rgba(255,255,255,0.75)' : 'var(--ink-3)' }}>
                      {f}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <button
                className={plan.featured ? 'btn btn-primary btn-lg' : 'btn btn-ghost btn-lg'}
                style={{
                  width: '100%', justifyContent: 'center',
                  fontWeight: 700,
                  ...(plan.featured ? {} : { borderColor: 'var(--border-2)', color: 'var(--ink-3)' }),
                }}
                onClick={() => onCheckout({ plan: plan.id, billingCycle: annual ? 'annual' : 'monthly' })}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Trust row */}
        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <p className="t-caption">
            Garantía de devolución 14 días · Sin tarjeta para probar · Cancela en un clic
          </p>
        </div>
      </div>
    </section>
  )
}
