import { useState } from 'react'
import { Link } from 'react-router-dom'
import { LayoutGrid, Stethoscope, Building2, Cpu, Sparkles, Church, ArrowRight } from 'lucide-react'
import { ALL_SITES, TOTAL, BrowserMockup } from '../data/sites'

const CATS = [
  { id: 'all',      label: 'Todos',       Icon: LayoutGrid },
  { id: 'iglesia',  label: 'Iglesias',    Icon: Church },
  { id: 'negocio',  label: 'Negocios',    Icon: Building2 },
  { id: 'servicios',label: 'Servicios',   Icon: Cpu },
  { id: 'moda',     label: 'Moda & Estilo', Icon: Sparkles },
]

export default function Examples() {
  const [cat, setCat] = useState('all')
  const [hovered, setHovered] = useState(null)

  const filtered = cat === 'all' ? ALL_SITES : ALL_SITES.filter(s => s.category === cat)

  return (
    <section id="examples" style={{ padding: '100px 0', background: '#000000', position: 'relative', overflow: 'hidden', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '5px 16px', background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.15)', borderRadius: 999,
            marginBottom: 20,
          }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#FFFFFF', boxShadow: '0 0 8px #FFFFFF' }} />
            <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'rgba(255,255,255,0.8)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Sitios generados con IA
            </span>
          </div>
          <h2 style={{
            fontSize: 'clamp(2rem,4vw,3.2rem)',
            fontWeight: 900,
            letterSpacing: '-0.035em',
            color: '#FFFFFF',
            marginBottom: 16,
            lineHeight: 1.15,
          }}>
            Tu sitio web, <span style={{ color: 'rgba(255,255,255,0.6)', fontStyle: 'italic' }}>profesional desde el día 1</span>
          </h2>
          <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.6)', maxWidth: 540, margin: '0 auto', lineHeight: 1.7 }}>
            Mira cómo se ven los sitios generados para diferentes industrias. Cada uno creado en minutos con IA.
          </p>
        </div>

        {/* Filter tabs — Pure Black & White */}
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
                  borderRadius: 999,
                  border: active ? 'none' : '1px solid rgba(255,255,255,0.12)',
                  background: active ? '#FFFFFF' : 'rgba(255,255,255,0.04)',
                  color: active ? '#000000' : 'rgba(255,255,255,0.7)',
                  fontWeight: active ? 800 : 500,
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: active ? '0 4px 20px rgba(255,255,255,0.2)' : 'none',
                  fontFamily: 'var(--font)',
                }}
              >
                <Icon size={15} strokeWidth={active ? 2.5 : 2} />
                {label}
              </button>
            )
          })}
        </div>

        {/* Grid — 2 columns */}
        <div className="examples-grid" style={{
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
                  borderRadius: 18,
                  overflow: 'hidden',
                  border: isHov ? '1px solid rgba(255,255,255,0.4)' : '1px solid rgba(255,255,255,0.08)',
                  background: '#0B0B0E',
                  boxShadow: isHov ? '0 20px 60px rgba(0,0,0,0.9), 0 0 30px rgba(255,255,255,0.04)' : 'none',
                  transition: 'all 0.3s cubic-bezier(0.34,1.2,0.64,1)',
                  transform: isHov ? 'translateY(-6px)' : 'translateY(0)',
                }}
              >
                {/* Browser preview */}
                <div style={{ borderRadius: '17px 17px 0 0', overflow: 'hidden' }}>
                  <BrowserMockup accent={s.color} height={TOTAL}>
                    <Site />
                  </BrowserMockup>
                </div>

                {/* Card footer */}
                <div style={{ padding: '16px 22px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#0E0E12', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 34, height: 34, borderRadius: 10, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ width: 10, height: 10, borderRadius: '50%', background: s.color }} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#FFFFFF' }}>{s.label}</div>
                      <div style={{ fontSize: '0.74rem', color: 'rgba(255,255,255,0.5)' }}>Generado con IA · SSL incluido</div>
                    </div>
                  </div>
                  <Link
                    to={`/app/new?prompt=${encodeURIComponent(s.prompt || s.label)}`}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      padding: '8px 18px',
                      borderRadius: 999,
                      background: isHov ? '#FFFFFF' : 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      color: isHov ? '#000000' : '#FFFFFF',
                      textDecoration: 'none',
                      fontSize: '0.82rem',
                      fontWeight: 800,
                      transition: 'all 0.25s',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Crear el mío <Sparkles size={13} />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div style={{ textAlign: 'center', marginTop: 64 }}>
          <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.6)', marginBottom: 20 }}>
            ¿Cuál es tu negocio? La IA lo adapta en segundos.
          </p>
          <Link
            to="/app/new"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '16px 40px', borderRadius: 999,
              background: '#FFFFFF', color: '#000000',
              fontWeight: 900, fontSize: '1rem',
              textDecoration: 'none',
              boxShadow: '0 8px 30px rgba(255,255,255,0.18)',
              transition: 'all 0.2s',
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
            Crear mi página web gratis →
          </Link>
        </div>

      </div>
    </section>
  )
}
