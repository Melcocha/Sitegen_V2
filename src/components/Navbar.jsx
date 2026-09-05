import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'
import { Sun, Moon, LayoutDashboard, LogOut, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const { isDark, toggle } = useTheme()
  const { isAuthenticated, user, signOut, loading } = useAuth()
  const navigate = useNavigate()
  const [avatarOpen, setAvatarOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const links = [
    { label: 'Características', href: '#features' },
    { label: 'Ejemplos', href: '#examples' },
    { label: 'Cómo funciona', href: '#how-it-works' },
    { label: 'Precios', href: '#pricing' },
  ]

  const handleSignOut = async () => {
    await signOut()
    setAvatarOpen(false)
    setMenuOpen(false)
    navigate('/')
  }

  const initials = user?.email?.[0]?.toUpperCase() || 'U'

  return (
    <nav className="nav">
      <div className="container">
        <div style={{ height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          {/* Logo */}
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="9" fill="var(--brand)"/>
              <path d="M9 22L16 10L23 22" stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M11.5 18H20.5" stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
            <span style={{ fontWeight: 800, fontSize: '1.05rem', letterSpacing: '-0.02em', color: 'var(--ink)' }}>
              SaaS<span style={{ color: 'var(--brand)' }}>Web</span>
            </span>
          </a>

          {/* Desktop nav links */}
          <div className="nav-links-wrap" style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {links.map(l => (
              <a
                key={l.label}
                href={l.href}
                style={{
                  padding: '8px 14px', borderRadius: 'var(--radius-sm)',
                  textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500,
                  color: 'var(--muted)', transition: 'color var(--dur)',
                }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--ink)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Right — auth-aware */}
          <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button className="theme-btn" onClick={toggle} title={isDark ? 'Modo claro' : 'Modo oscuro'}>
              {isDark ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            {/* Desktop Auth Links */}
            {!loading && (
              isAuthenticated ? (
                <div className="nav-auth-links" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Link
                    to="/app/dashboard"
                    className="btn btn-ghost btn-sm nav-cta-btn"
                    style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap' }}
                  >
                    <LayoutDashboard size={14} />
                    Mi panel
                  </Link>

                  {/* Avatar menu */}
                  <div style={{ position: 'relative' }}>
                    <button
                      onClick={() => setAvatarOpen(!avatarOpen)}
                      style={{
                        width: 34, height: 34, borderRadius: '50%',
                        background: 'linear-gradient(135deg, #00C896, #00A87A)',
                        border: 'none', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontWeight: 800, fontSize: '0.8125rem', color: '#080F0C',
                        fontFamily: 'var(--font)',
                      }}
                    >
                      {initials}
                    </button>

                    {avatarOpen && (
                      <div style={{
                        position: 'absolute', top: 'calc(100% + 8px)', right: 0,
                        background: 'var(--bg)', border: '1.5px solid var(--border)',
                        borderRadius: 12, padding: 8, minWidth: 200,
                        boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                        zIndex: 100,
                      }}>
                        <p style={{
                          padding: '6px 10px', fontSize: '0.75rem',
                          color: 'var(--muted)', borderBottom: '1px solid var(--border)',
                          marginBottom: 6,
                        }}>
                          {user?.email}
                        </p>
                        <Link
                          to="/app/dashboard"
                          onClick={() => setAvatarOpen(false)}
                          style={{
                            display: 'flex', alignItems: 'center', gap: 8,
                            padding: '7px 10px', borderRadius: 8,
                            textDecoration: 'none', color: 'var(--ink)',
                            fontSize: '0.875rem', fontWeight: 600,
                          }}
                          onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-2)'}
                          onMouseLeave={e => e.currentTarget.style.background = 'none'}
                        >
                          <LayoutDashboard size={15} />
                          Mi panel
                        </Link>
                        <button
                          onClick={handleSignOut}
                          style={{
                            display: 'flex', alignItems: 'center', gap: 8, width: '100%',
                            padding: '7px 10px', borderRadius: 8,
                            background: 'none', border: 'none', cursor: 'pointer',
                            color: '#EF4444', fontSize: '0.875rem', fontWeight: 600,
                            fontFamily: 'var(--font)',
                          }}
                          onMouseEnter={e => e.currentTarget.style.background = '#FEF2F2'}
                          onMouseLeave={e => e.currentTarget.style.background = 'none'}
                        >
                          <LogOut size={15} />
                          Cerrar sesión
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="nav-auth-links" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Link
                    to="/login"
                    className="nav-login-link"
                    style={{
                      padding: '7px 12px', borderRadius: 'var(--radius-sm)',
                      textDecoration: 'none', fontSize: '0.875rem', fontWeight: 600,
                      color: 'var(--muted)', whiteSpace: 'nowrap',
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--ink)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
                  >
                    Iniciar sesión
                  </Link>
                  <a href="#generator" className="btn btn-primary btn-sm nav-cta-btn" style={{ textDecoration: 'none', fontWeight: 700, whiteSpace: 'nowrap' }}>
                    Crear mi web →
                  </a>
                </div>
              )
            )}

            {/* Mobile Hamburger Toggle Button */}
            <button
              className="theme-btn mobile-menu-btn"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Abrir menú"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Panel */}
      {menuOpen && (
        <div className="mobile-dropdown-panel" style={{
          background: 'var(--bg)',
          borderBottom: '1px solid var(--border)',
          padding: '16px 20px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          boxShadow: 'var(--shadow-md)',
          position: 'relative',
          zIndex: 99,
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {links.map(l => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  padding: '11px 14px',
                  borderRadius: 'var(--radius-md)',
                  textDecoration: 'none',
                  fontSize: '0.9375rem',
                  fontWeight: 600,
                  color: 'var(--ink)',
                  background: 'var(--bg-2)',
                }}
              >
                {l.label}
              </a>
            ))}
          </div>

          <div style={{ height: 1, background: 'var(--border)' }} />

          {!loading && (
            isAuthenticated ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <Link
                  to="/app/dashboard"
                  onClick={() => setMenuOpen(false)}
                  className="btn btn-ghost"
                  style={{ justifyContent: 'center', width: '100%', textDecoration: 'none', padding: '12px' }}
                >
                  <LayoutDashboard size={16} />
                  Mi panel
                </Link>
                <button
                  onClick={handleSignOut}
                  style={{
                    padding: '12px', borderRadius: 'var(--radius-full)', background: '#FEF2F2',
                    border: '1px solid #FECACA', color: '#EF4444', fontWeight: 700,
                    cursor: 'pointer', fontFamily: 'var(--font)', fontSize: '0.875rem'
                  }}
                >
                  Cerrar sesión ({user?.email})
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  style={{
                    padding: '12px', textAlign: 'center', borderRadius: 'var(--radius-full)',
                    border: '1.5px solid var(--border-2)', textDecoration: 'none',
                    fontSize: '0.9rem', fontWeight: 600, color: 'var(--ink)',
                    background: 'var(--bg-2)'
                  }}
                >
                  Iniciar sesión
                </Link>
                <a
                  href="#generator"
                  onClick={() => setMenuOpen(false)}
                  className="btn btn-primary"
                  style={{ justifyContent: 'center', width: '100%', textDecoration: 'none', fontWeight: 700, padding: '13px' }}
                >
                  Crear mi web →
                </a>
              </div>
            )
          )}
        </div>
      )}

      {/* Close avatar dropdown on click outside */}
      {avatarOpen && (
        <div
          onClick={() => setAvatarOpen(false)}
          style={{ position: 'fixed', inset: 0, zIndex: 99 }}
        />
      )}
    </nav>
  )
}
