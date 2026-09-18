import { useAuth } from '../context/AuthContext'
import { LayoutDashboard, LogOut, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
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
    <nav className="nav" style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(255,255,255,0.08)', position: 'sticky', top: 0, zIndex: 100 }}>
      <div className="container">
        <div style={{ height: 68, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          {/* Logo — Pure Black & White */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <svg width="30" height="30" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="8" fill="#FFFFFF"/>
              <path d="M9 22L16 10L23 22" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M11.5 18H20.5" stroke="#000000" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
            <span style={{ fontWeight: 900, fontSize: '1.05rem', letterSpacing: '-0.02em', color: '#FFFFFF' }}>
              SaaS<span style={{ color: '#E5E5E5' }}>Web</span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="nav-links-wrap" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {links.map(l => (
              <a
                key={l.label}
                href={l.href}
                style={{
                  padding: '8px 14px', borderRadius: 8,
                  textDecoration: 'none', fontSize: '0.85rem', fontWeight: 500,
                  color: 'rgba(255,255,255,0.6)', transition: 'color 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#FFFFFF'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Right — Único botón principal para crear página web */}
          <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>

            {/* Si está autenticado, muestra enlace discreto a su panel */}
            {!loading && isAuthenticated && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Link
                  to="/app/dashboard"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    padding: '8px 14px', borderRadius: 999,
                    border: '1px solid rgba(255,255,255,0.18)',
                    background: 'rgba(255,255,255,0.06)',
                    color: '#fff', fontWeight: 600, fontSize: '0.82rem',
                    textDecoration: 'none', whiteSpace: 'nowrap',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
                >
                  <LayoutDashboard size={13} />
                  Mi panel
                </Link>

                <div style={{ position: 'relative' }}>
                  <button
                    onClick={() => setAvatarOpen(!avatarOpen)}
                    style={{
                      width: 32, height: 32, borderRadius: '50%',
                      background: '#FFFFFF', color: '#000000',
                      border: 'none', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontWeight: 800, fontSize: '0.78rem',
                      fontFamily: 'var(--font)',
                    }}
                  >
                    {initials}
                  </button>

                  {avatarOpen && (
                    <div style={{
                      position: 'absolute', top: 'calc(100% + 10px)', right: 0,
                      background: '#111114', border: '1px solid rgba(255,255,255,0.15)',
                      borderRadius: 14, padding: 8, minWidth: 210,
                      boxShadow: '0 16px 48px rgba(0,0,0,0.8)',
                      zIndex: 100,
                    }}>
                      <p style={{ padding: '6px 10px', fontSize: '0.73rem', color: '#9CA3AF', borderBottom: '1px solid rgba(255,255,255,0.08)', marginBottom: 6 }}>
                        {user?.email}
                      </p>
                      <Link
                        to="/app/dashboard"
                        onClick={() => setAvatarOpen(false)}
                        style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', borderRadius: 8, textDecoration: 'none', color: '#fff', fontSize: '0.875rem', fontWeight: 600 }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'none'}
                      >
                        <LayoutDashboard size={15} />
                        Mi panel
                      </Link>
                      <button
                        onClick={handleSignOut}
                        style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%', padding: '8px 10px', borderRadius: 8, background: 'none', border: 'none', cursor: 'pointer', color: '#EF4444', fontSize: '0.875rem', fontWeight: 600, fontFamily: 'var(--font)' }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.1)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'none'}
                      >
                        <LogOut size={15} />
                        Cerrar sesión
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ── BOTÓN ÚNICO: Crear mi página web ── */}
            <Link
              to="/app/new"
              id="nav-create-btn"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '10px 24px', borderRadius: 999,
                background: '#FFFFFF',
                color: '#000000', fontWeight: 800, fontSize: '0.875rem',
                textDecoration: 'none', whiteSpace: 'nowrap',
                transition: 'all 0.2s cubic-bezier(0.34,1.4,0.64,1)',
                fontFamily: 'var(--font)',
                boxShadow: '0 4px 14px rgba(255,255,255,0.15)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#E5E5E5'
                e.currentTarget.style.transform = 'translateY(-1px)'
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(255,255,255,0.3)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = '#FFFFFF'
                e.currentTarget.style.transform = 'none'
                e.currentTarget.style.boxShadow = '0 4px 14px rgba(255,255,255,0.15)'
              }}
            >
              Crear mi página web →
            </Link>

            {/* Hamburger — solo en móvil */}
            <button
              className="theme-btn mobile-menu-btn"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Abrir menú"
              style={{ color: '#fff', background: 'transparent', border: 'none', cursor: 'pointer', display: 'none' }}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div style={{
          background: '#0C0C0E', borderBottom: '1px solid rgba(255,255,255,0.1)',
          padding: '16px 20px 24px',
          display: 'flex', flexDirection: 'column', gap: 16,
          boxShadow: '0 8px 32px rgba(0,0,0,0.8)',
          position: 'relative', zIndex: 99,
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {links.map(l => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                style={{ padding: '11px 14px', borderRadius: 10, textDecoration: 'none', fontSize: '0.9375rem', fontWeight: 600, color: '#fff', background: 'rgba(255,255,255,0.04)' }}
              >
                {l.label}
              </a>
            ))}
          </div>
          <div style={{ height: 1, background: 'rgba(255,255,255,0.08)' }} />
          <Link
            to="/app/new"
            onClick={() => setMenuOpen(false)}
            style={{ padding: '14px', textAlign: 'center', borderRadius: 999, background: '#FFFFFF', textDecoration: 'none', color: '#000000', fontWeight: 800, fontSize: '0.95rem' }}
          >
            Crear mi página web →
          </Link>
        </div>
      )}

      {avatarOpen && <div onClick={() => setAvatarOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 99 }} />}
    </nav>
  )
}
