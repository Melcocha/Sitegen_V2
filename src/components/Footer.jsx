export default function Footer() {
  const links = {
    Producto: ['Generador IA', 'Editor visual', 'Dominios', 'Hosting', 'SSL Automático'],
    Empresa: ['Sobre nosotros', 'Blog', 'Casos de éxito', 'Contacto'],
    Soporte: ['Centro de ayuda', 'Estado del sistema', 'Términos', 'Privacidad'],
  }

  return (
    <footer style={{ background: '#000000', color: '#FFFFFF', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="container">

        {/* Main grid */}
        <div className="footer-grid" style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: 48, padding: '80px 0 56px',
        }}>

          {/* Brand column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
              <svg width="30" height="30" viewBox="0 0 32 32" fill="none">
                <rect width="32" height="32" rx="8" fill="#FFFFFF"/>
                <path d="M9 22L16 10L23 22" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M11.5 18H20.5" stroke="#000000" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
              <span style={{ fontWeight: 900, fontSize: '1.05rem', letterSpacing: '-0.02em', color: '#FFFFFF' }}>
                SaaS<span style={{ color: 'rgba(255,255,255,0.7)' }}>Web</span>
              </span>
            </div>
            <p style={{
              fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)',
              lineHeight: 1.75, maxWidth: 300, marginBottom: 28,
            }}>
              La plataforma de nueva generación para crear sitios web profesionales con inteligencia artificial. De idea a online en 10 minutos.
            </p>

            {/* Status indicator — Monochrome */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '7px 14px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 999,
            }}>
              <div style={{
                width: 7, height: 7, borderRadius: '50%',
                background: '#FFFFFF',
                boxShadow: '0 0 8px rgba(255,255,255,0.6)',
              }} />
              <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.8)', fontWeight: 600, letterSpacing: '0.04em' }}>
                Todos los sistemas operando al 100%
              </span>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([cat, items]) => (
            <div key={cat}>
              <h4 style={{
                fontSize: '0.72rem', fontWeight: 800,
                letterSpacing: '0.12em', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.35)', marginBottom: 20,
              }}>
                {cat}
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
                {items.map(item => (
                  <a
                    key={item} href="#"
                    style={{
                      color: 'rgba(255,255,255,0.55)',
                      textDecoration: 'none', fontSize: '0.875rem',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={e => e.target.style.color = '#FFFFFF'}
                    onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.55)'}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom-bar" style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          padding: '24px 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.78rem',
          color: 'rgba(255,255,255,0.3)',
        }}>
          <span>© {new Date().getFullYear()} SaaSWeb. Todos los derechos reservados.</span>
          <div style={{ display: 'flex', gap: 24 }}>
            {['Términos', 'Privacidad', 'Cookies'].map(t => (
              <a
                key={t} href="#"
                style={{ color: 'rgba(255,255,255,0.3)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = '#FFFFFF'}
                onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.3)'}
              >
                {t}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  )
}
