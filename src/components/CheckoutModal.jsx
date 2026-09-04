/**
 * CheckoutModal.jsx — SiteGen AI
 * ─────────────────────────────────────────────────────────────────
 * Unified checkout modal. Used from both the landing page (App.jsx)
 * and the user dashboard (UserDashboard.jsx).
 *
 * Props:
 *  · plan         {string}   'starter' | 'pro' | 'agency'
 *  · billingCycle {string}   'monthly' | 'annual'
 *  · onClose      {function} called when user dismisses
 *  · onSuccess    {function} called after successful payment
 * ─────────────────────────────────────────────────────────────────
 */

import { useState } from 'react'
import { X, Shield, CreditCard, CheckCircle2, Lock, Zap } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import {
  initiateCheckout,
  PLAN_CONFIG,
  getPriceDisplay,
  IS_STRIPE_LIVE,
} from '../lib/paymentService'

// ── Small helper: a single feature check line ─────────────────────
function Feature({ text }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.8375rem', color: '#374151' }}>
      <CheckCircle2 size={14} color="#10B981" style={{ flexShrink: 0 }} />
      {text}
    </div>
  )
}

// ── Card input component ──────────────────────────────────────────
function CardInput({ placeholder, style = {} }) {
  return (
    <input
      placeholder={placeholder}
      style={{
        width: '100%',
        padding: '10px 14px',
        border: '1.5px solid #E5E7EB',
        borderRadius: 10,
        fontSize: '0.875rem',
        fontFamily: 'var(--font, Inter, sans-serif)',
        color: '#111827',
        background: '#F9FAFB',
        outline: 'none',
        boxSizing: 'border-box',
        transition: 'border-color 0.15s',
        ...style,
      }}
      onFocus={e => (e.target.style.borderColor = '#00C896')}
      onBlur={e => (e.target.style.borderColor = '#E5E7EB')}
    />
  )
}

// ─────────────────────────────────────────────────────────────────
export default function CheckoutModal({ plan, billingCycle, onClose, onSuccess }) {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const config = PLAN_CONFIG[plan] || PLAN_CONFIG.pro
  const { cents, monthly_equivalent, label } = getPriceDisplay(plan, billingCycle)

  // Annual savings vs monthly
  const monthlyCents = config.monthly_cents
  const annualSavings = billingCycle === 'annual'
    ? ((monthlyCents - monthly_equivalent) * 12 / 100).toFixed(0)
    : 0

  const handlePay = async () => {
    setLoading(true)
    setError('')
    try {
      await initiateCheckout({
        plan,
        billingCycle,
        userId:    user.id,
        userEmail: user.email,
      })
      onSuccess()
    } catch (err) {
      setError(err.message || 'Error al procesar. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  // Prevent body scroll while modal is open
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(10px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 16,
        animation: 'fadeIn 0.2s ease',
      }}
    >
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: scale(0.97); } to { opacity: 1; transform: scale(1); } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#fff',
          borderRadius: 20,
          width: '100%',
          maxWidth: 460,
          boxShadow: '0 32px 80px rgba(0,0,0,0.22)',
          animation: 'slideUp 0.25s ease',
          overflow: 'hidden',
        }}
      >
        {/* ── Header ── */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '20px 24px 18px',
          borderBottom: '1px solid #F3F4F6',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: 'linear-gradient(135deg, #00C896, #00A87A)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <CreditCard size={17} color="#fff" />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '1rem', color: '#111827', lineHeight: 1.2 }}>
                Activar Plan {config.name}
              </div>
              <div style={{ fontSize: '0.73rem', color: '#9CA3AF', fontWeight: 500 }}>
                {IS_STRIPE_LIVE ? 'Checkout seguro · Stripe' : 'Modo demostración · Sin cargo real'}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: '#F3F4F6', border: 'none', cursor: 'pointer',
              width: 32, height: 32, borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#9CA3AF', transition: 'background 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#E5E7EB')}
            onMouseLeave={e => (e.currentTarget.style.background = '#F3F4F6')}
          >
            <X size={15} />
          </button>
        </div>

        <div style={{ padding: '20px 24px 24px' }}>

          {/* ── Order summary ── */}
          <div style={{
            background: 'linear-gradient(135deg, #F0FDF4, #ECFDF5)',
            border: '1.5px solid #A7F3D0',
            borderRadius: 14,
            padding: '16px 18px',
            marginBottom: 20,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#065F46' }}>
                  Plan {config.name} · {billingCycle === 'annual' ? 'Anual' : 'Mensual'}
                </div>
                {billingCycle === 'annual' && (
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 4,
                    marginTop: 4, padding: '2px 8px',
                    background: '#10B981', borderRadius: 999,
                    fontSize: '0.68rem', fontWeight: 700, color: '#fff',
                  }}>
                    <Zap size={9} />
                    Ahorras ${annualSavings} al año
                  </div>
                )}
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 900, fontSize: '1.75rem', color: '#111827', letterSpacing: '-0.04em', lineHeight: 1 }}>
                  {label}
                </div>
                {billingCycle === 'annual' && (
                  <div style={{ fontSize: '0.72rem', color: '#6B7280', marginTop: 2 }}>
                    ${(cents / 100).toFixed(0)} facturado anualmente
                  </div>
                )}
              </div>
            </div>

            {/* Features mini-list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginTop: 10, paddingTop: 10, borderTop: '1px solid #D1FAE5' }}>
              {config.features.slice(0, 3).map(f => <Feature key={f} text={f} />)}
            </div>
          </div>

          {/* ── Card inputs (decorative in sim mode) ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 18 }}>
            <CardInput placeholder="Nombre en la tarjeta" />
            <CardInput placeholder="1234  5678  9012  3456" />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <CardInput placeholder="MM / AA" />
              <CardInput placeholder="CVC" />
            </div>
          </div>

          {/* ── CTA ── */}
          <button
            onClick={handlePay}
            disabled={loading}
            style={{
              width: '100%',
              padding: '13px',
              background: loading
                ? '#9CA3AF'
                : 'linear-gradient(135deg, #00C896, #00A87A)',
              border: 'none',
              borderRadius: 12,
              color: '#fff',
              fontWeight: 800,
              fontSize: '0.9375rem',
              cursor: loading ? 'wait' : 'pointer',
              fontFamily: 'var(--font, Inter, sans-serif)',
              boxShadow: loading ? 'none' : '0 4px 16px rgba(0,200,150,0.35)',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}
          >
            {loading ? (
              <>
                <div style={{
                  width: 16, height: 16, border: '2px solid rgba(255,255,255,0.4)',
                  borderTopColor: '#fff', borderRadius: '50%',
                  animation: 'spin 0.7s linear infinite',
                }} />
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                Procesando pago...
              </>
            ) : (
              <>
                <Lock size={15} />
                {IS_STRIPE_LIVE
                  ? `Pagar ${label} · ${config.name}`
                  : `Activar ${config.name} · ${label} (Demo)`
                }
              </>
            )}
          </button>

          {/* ── Error ── */}
          {error && (
            <div style={{
              marginTop: 10, padding: '10px 14px',
              background: '#FEF2F2', border: '1px solid #FECACA',
              borderRadius: 9, fontSize: '0.8125rem',
              color: '#DC2626', fontWeight: 600, textAlign: 'center',
            }}>
              {error}
            </div>
          )}

          {/* ── Trust line ── */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: 14, marginTop: 14,
            fontSize: '0.72rem', color: '#9CA3AF',
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <Shield size={11} /> SSL 256-bit
            </span>
            <span>·</span>
            <span>Cancela cuando quieras</span>
            <span>·</span>
            <span>Garantía 14 días</span>
          </div>
        </div>
      </div>
    </div>
  )
}
