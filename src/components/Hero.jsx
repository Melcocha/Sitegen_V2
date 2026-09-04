import { useState, useEffect } from 'react'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { HERO_SITES, BrowserMockup } from '../data/sites'

/* ─── Word rotation ──────────────────────────────────────────────── */
const WORDS = ['Médicos', 'Restaurantes', 'Dentistas', 'Arquitectos', 'Consultoras', 'Gimnasios', 'Boutiques', 'Agencias', 'Inmobiliarias', 'Abogados']

/* ─── HERO ───────────────────────────────────────────────────────── */
export default function Hero({ onStartGenerator }) {
  const [idx, setIdx] = useState(0)
  const [fading, setFading] = useState(false)
  const [wIdx, setWIdx] = useState(0)
  const [wFade, setWFade] = useState(false)

  useEffect(() => {
    const t = setInterval(() => {
      setFading(true); setWFade(true)
      setTimeout(() => {
        setIdx(i => (i + 1) % HERO_SITES.length)
        setWIdx(i => (i + 1) % WORDS.length)
        setFading(false); setWFade(false)
      }, 380)
    }, 7000)
    return () => clearInterval(t)
  }, [])

  const go = i => {
    setFading(true); setWFade(true)
    setTimeout(() => { setIdx(i); setWIdx(i % WORDS.length); setFading(false); setWFade(false) }, 300)
  }

  const S = HERO_SITES[idx]
  const DSite = S.site

  return (
    <>
      <style>{`
        .hg  { display:grid; grid-template-columns:1fr 1.25fr; gap:52px; align-items:center; }
        .hmc { display:flex; flex-direction:column; align-items:flex-start; gap:16px; width:100%; }
        @media(max-width:1020px){ .hg{ gap:32px; } }
        @media(max-width:800px){
          .hg { grid-template-columns:1fr !important; gap:32px !important; }
          .hmc{ align-items:center; }
        }
      `}</style>

      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: 80, position: 'relative', overflow: 'hidden', background: 'var(--bg)' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(var(--border) 1px,transparent 1px),linear-gradient(90deg,var(--border) 1px,transparent 1px)', backgroundSize: '64px 64px', opacity: 0.4, pointerEvents: 'none', maskImage: 'radial-gradient(ellipse 90% 80% at 30% 50%,black 30%,transparent 100%)', WebkitMaskImage: 'radial-gradient(ellipse 90% 80% at 30% 50%,black 30%,transparent 100%)' }} />
        <div style={{ position: 'absolute', top: '8%', left: '-6%', width: 560, height: 560, background: 'radial-gradient(ellipse,rgba(0,200,150,0.07) 0%,transparent 70%)', pointerEvents: 'none' }} />

        <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: 24, paddingBottom: 48 }}>
          <div className="hg">

            {/* ── Copy ── */}
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 14px 5px 8px', background: 'var(--bg)', border: '1px solid var(--border-2)', borderRadius: 'var(--radius-full)', marginBottom: 28, boxShadow: 'var(--shadow-xs)' }}>
                <span style={{ background: 'var(--brand)', color: 'var(--ink)', padding: '2px 8px', borderRadius: 'var(--radius-full)', fontSize: '0.68rem', fontWeight: 800 }}>NUEVO</span>
                <span style={{ fontSize: '0.78rem', color: 'var(--ink-3)', fontWeight: 500 }}>Motor IA · Gemini 2.5 · Vercel Edge</span>
              </div>
              <h1 style={{ fontSize: 'clamp(2.2rem,4vw,3.5rem)', fontWeight: 900, lineHeight: 1.08, letterSpacing: '-0.04em', marginBottom: 20, color: 'var(--ink)' }}>
                El sitio web de tu{' '}
                <span style={{ color: 'var(--brand)', display: 'inline-block', transition: 'opacity 0.35s,transform 0.35s', opacity: wFade ? 0 : 1, transform: wFade ? 'translateY(-10px)' : 'translateY(0)', minWidth: 200 }}>
                  {WORDS[wIdx]}
                </span>
                <br />en línea en 10 min.
              </h1>
              <p style={{ fontSize: '1.0625rem', color: 'var(--muted)', lineHeight: 1.75, marginBottom: 36, maxWidth: 420 }}>
                Describe tu negocio. La IA diseña, escribe y despliega tu sitio profesional con SSL — listo para recibir clientes hoy.
              </p>
              <div style={{ display: 'flex', gap: 12, marginBottom: 44, flexWrap: 'wrap' }}>
                <button className="btn btn-primary btn-xl" onClick={onStartGenerator} style={{ fontWeight: 800 }}>
                  Crear mi sitio gratis <ArrowRight size={18} strokeWidth={2.5} />
                </button>
                <a href="#examples" className="btn btn-ghost btn-xl" style={{ textDecoration: 'none' }}>
                  Ver ejemplos <ChevronDown size={16} />
                </a>
              </div>
              <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
                {[{ n: '10 min', l: 'De idea a publicado' }, { n: '99.9%', l: 'Uptime garantizado' }, { n: 'SSL', l: 'Incluido automático' }].map(s => (
                  <div key={s.l}>
                    <div style={{ fontWeight: 900, fontSize: '1.375rem', letterSpacing: '-0.04em', color: 'var(--brand)', lineHeight: 1 }}>{s.n}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: 3 }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Browser mockup only (no phone) ── */}
            <div className="hmc">
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 14px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-full)', transition: 'opacity 0.35s', opacity: fading ? 0 : 1 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: S.color, boxShadow: `0 0 7px ${S.color}99` }} />
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--ink-3)' }}>{S.label}</span>
                <span style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>· generado con IA</span>
              </div>

              {/* Browser — full width now */}
              <div style={{ width: '100%' }}>
                <BrowserMockup accent={S.color}>
                  <div style={{ transition: 'opacity 0.4s', opacity: fading ? 0 : 1 }}>
                    <DSite />
                  </div>
                </BrowserMockup>
              </div>

              {/* Dots */}
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                {HERO_SITES.map((s, i) => (
                  <button key={s.label} onClick={() => go(i)} title={s.label} style={{ width: i === idx ? 34 : 10, height: 10, borderRadius: 7, border: 'none', cursor: 'pointer', padding: 0, flexShrink: 0, background: i === idx ? s.color : 'var(--border-2)', boxShadow: i === idx ? `0 0 10px ${s.color}77` : 'none', transition: 'all 0.35s cubic-bezier(0.34,1.56,0.64,1)' }} />
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
