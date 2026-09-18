import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

/* ─── Hero rediseñado — Paleta Negro & Blanco Cinematográfica ─────
   Inspirado en: https://www.mygateway.life/
   Colores: Negro puro #000000 · Blanco puro #FFFFFF · Plata #E5E5E5
   ─────────────────────────────────────────────────────────────────── */

const ROTATING_WORDS = [
  'Iglesias', 'Restaurantes', 'Dentistas', 'Arquitectos',
  'Consultoras', 'Gimnasios', 'Boutiques', 'Agencias',
  'Inmobiliarias', 'Abogados'
]

const HERO_BG = 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=1920&q=90&fit=crop'

export default function Hero() {
  const [wIdx, setWIdx]   = useState(0)
  const [wOut, setWOut]   = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const t = setInterval(() => {
      setWOut(true)
      setTimeout(() => { setWIdx(i => (i + 1) % ROTATING_WORDS.length); setWOut(false) }, 500)
    }, 4000)
    return () => clearInterval(t)
  }, [])

  return (
    <>
      <style>{`
        @keyframes gatewayFadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes gatewayBgReveal {
          from { transform: scale(1.06); opacity: 0.5; }
          to   { transform: scale(1);    opacity: 0.9; }
        }
        @keyframes whitePulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(255,255,255,0); }
          50%      { box-shadow: 0 0 0 8px rgba(255,255,255,0.12); }
        }
        @keyframes wordFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .gw-hero-word {
          display: inline-block;
          color: #FFFFFF;
          text-decoration: underline;
          text-decoration-color: rgba(255,255,255,0.4);
          text-underline-offset: 8px;
          animation: wordFadeUp 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards;
        }
        .gw-hero-word.out {
          animation: none;
          opacity: 0;
          transform: translateY(-14px);
          transition: opacity 0.4s, transform 0.4s;
        }
        .gw-cta-primary {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 18px 44px; border-radius: 999px;
          background: #FFFFFF;
          color: #000000; font-weight: 900; font-size: 1rem;
          text-decoration: none; border: none; cursor: pointer;
          font-family: var(--font); letter-spacing: -0.01em;
          transition: all 0.25s cubic-bezier(0.34,1.4,0.64,1);
          position: relative; overflow: hidden;
          box-shadow: 0 10px 30px rgba(255,255,255,0.18);
        }
        .gw-cta-primary:hover {
          background: #E5E5E5;
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 20px 50px rgba(255,255,255,0.3);
        }
        .gw-cta-secondary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 17px 36px; border-radius: 999px;
          background: transparent;
          border: 1.5px solid rgba(255,255,255,0.25);
          color: #FFFFFF; font-weight: 600; font-size: 0.95rem;
          text-decoration: none;
          transition: all 0.25s ease;
          font-family: var(--font);
        }
        .gw-cta-secondary:hover {
          border-color: rgba(255,255,255,0.7);
          background: rgba(255,255,255,0.08);
          transform: translateY(-2px);
        }
        .gw-stat {
          display: flex; flex-direction: column; gap: 4px;
          padding: 18px 24px;
          border-left: 1px solid rgba(255,255,255,0.12);
        }
        .gw-stat:first-child { border-left: none; }
        @media (max-width: 640px) {
          .gw-hero-ctas { flex-direction: column !important; }
          .gw-cta-primary, .gw-cta-secondary { justify-content: center; }
          .gw-stats-row { flex-wrap: wrap !important; }
          .gw-stat { border-left: none !important; border-top: 1px solid rgba(255,255,255,0.1); width: 50%; }
        }
      `}</style>

      <section style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        overflow: 'hidden',
        background: '#000000',
      }}>

        {/* ── Background photo (desaturated monochrome feel) ── */}
        <div style={{
          position: 'absolute', inset: 0,
          animation: mounted ? 'gatewayBgReveal 1.6s cubic-bezier(0.25,0.46,0.45,0.94) forwards' : 'none',
          filter: 'grayscale(60%) contrast(1.1)',
        }}>
          <img
            src={HERO_BG}
            alt=""
            aria-hidden="true"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%' }}
          />
        </div>

        {/* ── Gradient overlays — pure black cinematographic depth ── */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.2) 35%, rgba(0,0,0,0.7) 65%, #000000 100%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 65%, transparent 100%)', pointerEvents: 'none' }} />

        {/* ── Ambient subtle monochrome light ── */}
        <div style={{ position: 'absolute', bottom: '20%', left: '8%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(255,255,255,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

        {/* ── Content ── */}
        <div className="container" style={{
          position: 'relative', zIndex: 10,
          paddingTop: 140, paddingBottom: 90,
          width: '100%',
        }}>

          {/* Eyebrow */}
          <div style={{
            marginBottom: 28,
            opacity: mounted ? 1 : 0,
            animation: mounted ? 'gatewayFadeUp 0.8s ease 0.05s forwards' : 'none',
          }}>
            <span style={{
              display: 'inline-block',
              fontSize: '0.75rem', fontWeight: 800,
              color: '#FFFFFF',
              letterSpacing: '0.2em', textTransform: 'uppercase',
              padding: '6px 16px',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: 999,
              background: 'rgba(255,255,255,0.06)',
              backdropFilter: 'blur(8px)',
            }}>
              Inteligencia Artificial · Generador de Sitios
            </span>
          </div>

          {/* Headline — massive, pure white, left-aligned */}
          <h1 style={{
            fontSize: 'clamp(3rem, 7vw, 6.5rem)',
            fontWeight: 900,
            lineHeight: 1.02,
            letterSpacing: '-0.045em',
            color: '#FFFFFF',
            margin: '0 0 32px',
            maxWidth: 850,
            opacity: mounted ? 1 : 0,
            animation: mounted ? 'gatewayFadeUp 0.9s ease 0.12s forwards' : 'none',
          }}>
            El sitio web de<br />
            <span className={`gw-hero-word${wOut ? ' out' : ''}`}>
              {ROTATING_WORDS[wIdx]}
            </span>
            <br />
            <span style={{ color: 'rgba(255,255,255,0.85)', fontStyle: 'italic', fontWeight: 800 }}>en 10 minutos.</span>
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: 'clamp(1.05rem, 2vw, 1.3rem)',
            color: 'rgba(255,255,255,0.7)',
            maxWidth: 580,
            lineHeight: 1.65,
            margin: '0 0 44px',
            fontWeight: 400,
            opacity: mounted ? 1 : 0,
            animation: mounted ? 'gatewayFadeUp 0.9s ease 0.2s forwards' : 'none',
          }}>
            Describe tu negocio en una oración. La IA genera la estructura, el diseño,
            el contenido profesional y el hosting con dominio propio en segundos.
          </p>

          {/* ── CTAs: Blanco y Negro puros ── */}
          <div className="gw-hero-ctas" style={{
            display: 'flex', alignItems: 'center', gap: 16,
            marginBottom: 64,
            opacity: mounted ? 1 : 0,
            animation: mounted ? 'gatewayFadeUp 0.9s ease 0.28s forwards' : 'none',
          }}>
            <Link
              to="/app/new"
              className="gw-cta-primary"
              id="hero-create-site-cta"
            >
              Crear mi página web con IA →
            </Link>

            <a
              href="#examples"
              className="gw-cta-secondary"
            >
              Ver ejemplos
            </a>
          </div>

          {/* ── Stats Bar — Pure Monochrome ── */}
          <div className="gw-stats-row" style={{
            display: 'inline-flex', alignItems: 'center',
            background: 'rgba(255,255,255,0.04)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 18,
            opacity: mounted ? 1 : 0,
            animation: mounted ? 'gatewayFadeUp 0.9s ease 0.36s forwards' : 'none',
          }}>
            {[
              { val: '< 10 min', label: 'De idea a publicado' },
              { val: '100%',     label: 'Personalizable' },
              { val: 'Sub-100ms',label: 'Carga ultrarrápida' },
              { val: 'SSL & CDN',label: 'Incluidos de fábrica' },
            ].map(s => (
              <div key={s.val} className="gw-stat">
                <span style={{ fontSize: '1.25rem', fontWeight: 900, color: '#FFFFFF', letterSpacing: '-0.02em' }}>{s.val}</span>
                <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>{s.label}</span>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  )
}
