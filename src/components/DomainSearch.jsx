import { useState, useRef } from 'react'
import { Search, CheckCircle2, XCircle, Loader2, ArrowRight } from 'lucide-react'
import { checkDomainAvailability } from '../lib/domainChecker'

// Professional SVG trust icons — no emojis
const IconLock = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
)
const IconBolt = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
)
const IconRefresh = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 4 23 10 17 10"/>
    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
  </svg>
)
const IconGlobe = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
)

const TRUST_BADGES = [
  { icon: <IconLock />,    label: 'Transferencia segura' },
  { icon: <IconBolt />,   label: 'Activación inmediata' },
  { icon: <IconRefresh />, label: 'Auto-renovación' },
  { icon: <IconGlobe />,  label: '+500 extensiones' },
]

export default function DomainSearch() {
  const [query, setQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [results, setResults] = useState(null)
  const debounceRef = useRef(null)

  const handleSearch = async (value) => {
    if (!value.trim() || value.length < 2) { setResults(null); return }
    setIsSearching(true)
    try {
      const data = await checkDomainAvailability(value)
      setResults(data)
    } catch (e) {
      console.error(e)
    } finally {
      setIsSearching(false)
    }
  }

  const handleChange = (e) => {
    const v = e.target.value.replace(/[^a-zA-Z0-9-]/g, '').toLowerCase()
    setQuery(v)
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => handleSearch(v), 600)
  }

  return (
    <section className="section" id="domains" style={{ background: 'var(--bg)' }}>
      <div className="container">
        <div style={{ maxWidth: 640, margin: '0 auto' }}>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 44 }}>
            <span className="t-label" style={{ marginBottom: 12, display: 'block' }}>Paso 4</span>
            <h2 className="t-headline" style={{ marginBottom: 14 }}>
              Encuentra tu dominio perfecto
            </h2>
            <p className="t-body" style={{ maxWidth: 400, margin: '0 auto' }}>
              Disponibilidad en tiempo real. Sugerencias inteligentes si tu .com está tomado.
            </p>
          </div>

          {/* Search box */}
          <div className="domain-search-bar" style={{
            display: 'flex', gap: 10, alignItems: 'center',
            background: 'var(--bg)',
            border: '1.5px solid var(--border-2)',
            borderRadius: 'var(--radius-xl)',
            padding: '8px 8px 8px 20px',
            boxShadow: 'var(--shadow-sm)',
            transition: 'border-color var(--dur), box-shadow var(--dur)',
          }}
            onFocusCapture={e => {
              e.currentTarget.style.borderColor = 'var(--brand)'
              e.currentTarget.style.boxShadow = '0 0 0 3px var(--brand-glow)'
            }}
            onBlurCapture={e => {
              e.currentTarget.style.borderColor = 'var(--border-2)'
              e.currentTarget.style.boxShadow = 'var(--shadow-sm)'
            }}
          >
            <div style={{ color: 'var(--muted)', display: 'flex', alignItems: 'center' }}>
              {isSearching
                ? <Loader2 size={17} style={{ animation: 'spin 1s linear infinite' }} />
                : <Search size={17} />
              }
            </div>
            <input
              type="text"
              value={query}
              onChange={handleChange}
              placeholder="tuempresa"
              style={{
                flex: 1, background: 'transparent', border: 'none', outline: 'none',
                fontSize: '1rem', fontWeight: 600, color: 'var(--ink)', fontFamily: 'var(--font)',
              }}
            />
            <span style={{
              fontSize: '1rem', fontWeight: 700, color: 'var(--muted)',
              padding: '0 4px',
            }}>
              .com
            </span>
            <button
              className="btn btn-primary"
              onClick={() => handleSearch(query)}
              disabled={!query.trim()}
              style={{ borderRadius: 'var(--radius-lg)', fontWeight: 700 }}
            >
              Buscar
            </button>
          </div>

          {/* Results */}
          {results && (
            <div style={{ marginTop: 16 }}>
              {results.results?.map(item => (
                <div key={item.domain} className="domain-row">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    {item.available
                      ? <CheckCircle2 size={17} color="var(--brand)" strokeWidth={2.5} />
                      : <XCircle size={17} color="var(--danger)" strokeWidth={2.5} />
                    }
                    <span style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--ink)' }}>
                      {item.domain}
                    </span>
                    {item.popular && item.available && (
                      <span className="badge badge-brand" style={{ fontSize: '0.65rem' }}>Recomendado</span>
                    )}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{
                      fontSize: '0.875rem', fontWeight: 700,
                      color: item.available ? 'var(--ink)' : 'var(--muted)',
                    }}>
                      {item.available ? item.price + '/año' : 'No disponible'}
                    </span>
                    {item.available && (
                      <button className="btn btn-primary btn-sm">
                        Registrar <ArrowRight size={11} />
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {results.alternatives?.length > 0 && (
                <div style={{
                  marginTop: 14, padding: '16px 20px',
                  background: 'var(--brand-light)',
                  border: '1px solid rgba(0,200,150,0.2)',
                  borderRadius: 'var(--radius-lg)',
                }}>
                  <div className="t-label" style={{ color: 'var(--brand-dark)', marginBottom: 10 }}>
                    Sugerencias alternativas
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {results.alternatives.map(alt => (
                      <button
                        key={alt}
                        className="btn btn-ghost btn-sm"
                        onClick={() => { setQuery(alt); handleSearch(alt) }}
                        style={{ fontSize: '0.8rem' }}
                      >
                        {alt}.com
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Trust badges — SVG icons, no emojis */}
          <div style={{
            display: 'flex', justifyContent: 'center',
            gap: 32, marginTop: 36, flexWrap: 'wrap',
          }}>
            {TRUST_BADGES.map(b => (
              <div key={b.label} style={{
                display: 'flex', alignItems: 'center', gap: 6,
                color: 'var(--muted)', fontSize: '0.8125rem', fontWeight: 600,
              }}>
                <span style={{ color: 'var(--brand)', display: 'flex' }}>{b.icon}</span>
                {b.label}
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`@keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }`}</style>
    </section>
  )
}
