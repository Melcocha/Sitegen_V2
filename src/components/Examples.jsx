import { useState } from 'react'
import { LayoutGrid, Stethoscope, Building2, Cpu, Sparkles } from 'lucide-react'
import { ALL_SITES, TOTAL, BrowserMockup } from '../data/sites'

const CATS = [
  { id: 'all',       label: 'Todos',     Icon: LayoutGrid },
  { id: 'salud',     label: 'Salud',     Icon: Stethoscope },
  { id: 'negocio',   label: 'Negocios',  Icon: Building2 },
  { id: 'servicios', label: 'Servicios', Icon: Cpu },
  { id: 'moda',      label: 'Moda & Estilo', Icon: Sparkles },
]

export default function Examples() {
  const [cat, setCat] = useState('all')
  const [hovered, setHovered] = useState(null)

  const filtered = cat === 'all' ? ALL_SITES : ALL_SITES.filter(s => s.category === cat)

  return (
    <section id="examples" style={{ padding: '96px 0', background: 'var(--bg)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '10%', right: '-10%', width: 600, height: 600, background: 'radial-gradient(ellipse,rgba(0,200,150,0.05) 0%,transparent 70%)', pointerEvents: 'none' }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 16px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-full)', marginBottom: 20 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--brand)', boxShadow: '0 0 6px var(--brand)' }} />
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--ink-3)' }}>Sitios generados con IA</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 900, letterSpacing: '-0.04em', color: 'var(--ink)', marginBottom: 16, lineHeight: 1.1 }}>
            Tu sitio web, <span style={{ color: 'var(--brand)' }}>profesional desde el día 1</span>
          </h2>
          <p style={{ fontSize: '1.0625rem', color: 'var(--muted)', maxWidth: 540, margin: '0 auto', lineHeight: 1.75 }}>
            Mira cómo se ven los sitios generados para diferentes industrias. Cada uno creado en minutos con IA.
          </p>
        </div>

        {/* Filter tabs — vector icons only */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 48, flexWrap: 'wrap' }}>
          {CATS.map(({ id, label, Icon }) => {
            const active = cat === id
            return (
              <button
                key={id}
                onClick={() => setCat(id)}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 7,
                  padding: '9px 20px',
                  borderRadius: 'var(--radius-full)',
                  border: active ? 'transparent' : '1px solid var(--border)',
                  background: active ? 'var(--brand)' : 'var(--bg)',
                  color: active ? 'var(--ink)' : 'var(--muted)',
                  fontWeight: active ? 700 : 500,
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: active ? '0 4px 20px rgba(0,200,150,0.25)' : 'none',
                }}
              >
                <Icon size={15} strokeWidth={active ? 2.5 : 2} />
                {label}
              </button>
            )
          })}
        </div>

        {/* Grid — 2 columns */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 32,
        }}>
          {filtered.map((s, i) => {
            const Site = s.site
            const isHov = hovered === i
            return (
              <div
                key={s.label}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  borderRadius: 16,
                  overflow: 'hidden',
                  border: isHov ? `1px solid ${s.color}55` : '1px solid var(--border)',
                  background: 'var(--bg)',
                  boxShadow: isHov ? `0 20px 60px rgba(0,0,0,0.15), 0 0 0 1px ${s.color}33` : 'var(--shadow-md)',
                  transition: 'all 0.3s cubic-bezier(0.34,1.2,0.64,1)',
                  transform: isHov ? 'translateY(-6px)' : 'translateY(0)',
                }}
              >
                {/* Browser preview */}
                <div style={{ borderRadius: '15px 15px 0 0', overflow: 'hidden' }}>
                  <BrowserMockup accent={s.color} height={TOTAL}>
                    <Site />
                  </BrowserMockup>
                </div>

                {/* Card footer */}
                <div style={{ padding: '16px 22px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--bg-2)', borderTop: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 34, height: 34, borderRadius: 10, background: `${s.color}18`, border: `1px solid ${s.color}33`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ width: 10, height: 10, borderRadius: '50%', background: s.color }} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--ink)' }}>{s.label}</div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--muted)' }}>Generado con IA · SSL incluido</div>
                    </div>
                  </div>
                  <a
                    href="#generator"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      padding: '8px 18px',
                      borderRadius: 'var(--radius-full)',
                      background: isHov ? s.color : 'transparent',
                      border: `1px solid ${isHov ? 'transparent' : s.color}`,
                      color: isHov
                        ? (['#D97706', '#B8965A', '#FEBC2E'].includes(s.color) ? '#111' : '#fff')
                        : s.color,
                      textDecoration: 'none',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      transition: 'all 0.25s',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Crear el mío <Sparkles size={13} />
                  </a>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div style={{ textAlign: 'center', marginTop: 64 }}>
          <p style={{ fontSize: '1rem', color: 'var(--muted)', marginBottom: 20 }}>
            ¿Cuál es tu industria? La IA lo adapta en minutos.
          </p>
          <a href="#generator" className="btn btn-primary btn-xl" style={{ textDecoration: 'none', fontWeight: 800 }}>
            Crear mi sitio web gratis →
          </a>
        </div>

      </div>
    </section>
  )
}
