import { useState, useRef } from 'react'
import { Search, CheckCircle2, XCircle, Loader2, ArrowRight } from 'lucide-react'
import { checkDomainAvailability } from '../lib/domainChecker'

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
    <section className="section" id="domains" style={{ background: '#F9FAFB', padding: '100px 0' }}>
      <div className="container">
        <div style={{ maxWidth: 660, margin: '0 auto' }}>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 44 }}>
            <span style={{
              display: 'inline-block',
              fontSize: '0.72rem', fontWeight: 800,
              letterSpacing: '0.2em', textTransform: 'uppercase',
              color: '#4B5563', marginBottom: 14,
              padding: '6px 16px', borderRadius: 999,
              border: '1px solid #E5E7EB',
              background: '#FFFFFF',
            }}>
              Paso 4 · Dominio Propio
            </span>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 900,
              letterSpacing: '-0.035em',
              color: '#0A0A0A',
              lineHeight: 1.15,
              marginBottom: 14,
            }}>
              Encuentra tu dominio perfecto
            </h2>
            <p style={{ maxWidth: 420, margin: '0 auto', fontSize: '1rem', color: '#4B5563', lineHeight: 1.65 }}>
              Disponibilidad en tiempo real con sugerencias instantáneas.
            </p>
          </div>

          {/* Search box — Crisp Light with Black Button */}
          <div style={{
            display: 'flex', gap: 10, alignItems: 'center',
            background: '#FFFFFF',
            border: '1.5px solid #D1D5DB',
            borderRadius: 999,
            padding: '8px 8px 8px 22px',
            boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
            transition: 'border-color 0.2s, box-shadow 0.2s',
          }}>
            <div style={{ color: '#9CA3AF', display: 'flex', alignItems: 'center' }}>
              {isSearching
                ? <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
                : <Search size={18} />
              }
            </div>
            <input
              type="text"
              value={query}
              onChange={handleChange}
              placeholder="tuiglesia o tuempresa"
              style={{
                flex: 1, background: 'transparent', border: 'none', outline: 'none',
                fontSize: '1rem', fontWeight: 600, color: '#0A0A0A', fontFamily: 'var(--font)',
              }}
            />
            <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#6B7280', padding: '0 4px' }}>
              .com
            </span>
            <button
              onClick={() => handleSearch(query)}
              disabled={!query.trim()}
              style={{
                padding: '12px 26px',
                borderRadius: 999,
                background: '#000000',
                color: '#FFFFFF',
                border: 'none',
                fontWeight: 800,
                fontSize: '0.875rem',
                cursor: query.trim() ? 'pointer' : 'default',
                opacity: query.trim() ? 1 : 0.45,
                transition: 'all 0.2s',
                fontFamily: 'var(--font)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              }}
            >
              Buscar
            </button>
          </div>

          {/* Results */}
          {results && (
            <div style={{ marginTop: 20 }}>
              {results.results?.map(item => (
                <div
                  key={item.domain}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '14px 20px', borderRadius: 14,
                    background: '#FFFFFF', border: '1px solid #E5E7EB',
                    marginBottom: 8,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    {item.available
                      ? <CheckCircle2 size={18} color="#059669" strokeWidth={2.5} />
                      : <XCircle size={18} color="#EF4444" strokeWidth={2.5} />
                    }
                    <span style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0A0A0A' }}>
                      {item.domain}
                    </span>
                    {item.popular && item.available && (
                      <span style={{ fontSize: '0.68rem', fontWeight: 800, padding: '3px 8px', borderRadius: 999, background: '#000000', color: '#FFFFFF' }}>
                        Recomendado
                      </span>
                    )}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ fontSize: '0.875rem', fontWeight: 700, color: item.available ? '#0A0A0A' : '#9CA3AF' }}>
                      {item.available ? item.price + '/año' : 'No disponible'}
                    </span>
                    {item.available && (
                      <button style={{
                        display: 'inline-flex', alignItems: 'center', gap: 6,
                        padding: '6px 14px', borderRadius: 999,
                        background: '#000000', color: '#FFFFFF',
                        border: 'none', fontWeight: 800, fontSize: '0.78rem',
                        cursor: 'pointer', fontFamily: 'var(--font)',
                      }}>
                        Registrar <ArrowRight size={11} />
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {results.alternatives?.length > 0 && (
                <div style={{
                  marginTop: 16, padding: '18px 22px',
                  background: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  borderRadius: 16,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6B7280', marginBottom: 10 }}>
                    Sugerencias alternativas
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {results.alternatives.map(alt => (
                      <button
                        key={alt}
                        onClick={() => { setQuery(alt); handleSearch(alt) }}
                        style={{
                          padding: '6px 14px', borderRadius: 999,
                          background: '#F3F4F6', border: '1px solid #E5E7EB',
                          color: '#0A0A0A', fontSize: '0.82rem', fontWeight: 600,
                          cursor: 'pointer', fontFamily: 'var(--font)',
                        }}
                      >
                        {alt}.com
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Trust badges */}
          <div style={{
            display: 'flex', justifyContent: 'center',
            gap: 28, marginTop: 36, flexWrap: 'wrap',
          }}>
            {TRUST_BADGES.map(b => (
              <div key={b.label} style={{
                display: 'flex', alignItems: 'center', gap: 8,
                color: '#4B5563', fontSize: '0.8125rem', fontWeight: 600,
              }}>
                <span style={{ color: '#000000', display: 'flex' }}>{b.icon}</span>
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
