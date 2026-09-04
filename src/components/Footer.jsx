export default function Footer() {
  const links = {
    Producto: ['Generador IA', 'Editor visual', 'Dominios', 'Hosting', 'SSL Automático'],
    Empresa: ['Sobre nosotros', 'Blog', 'Casos de éxito', 'Afiliados'],
    Soporte: ['Centro de ayuda', 'Estado del sistema', 'Contacto', 'Privacidad'],
  }

  return (
    <footer style={{ background: '#080F0C', color: '#fff' }}>
      <div className="container">

        {/* Main grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: 48, padding: '72px 0 56px',
        }}>

          {/* Brand column */}
          <div>
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
              <svg width="30" height="30" viewBox="0 0 32 32" fill="none">
                <rect width="32" height="32" rx="9" fill="#00C896"/>
                <path d="M9 22L16 10L23 22" stroke="#080F0C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M11.5 18H20.5" stroke="#080F0C" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
              <span style={{ fontWeight: 800, fontSize: '1rem', letterSpacing: '-0.02em' }}>
                SaaS<span style={{ color: '#00C896' }}>Web</span>
              </span>
            </div>
            <p style={{
              fontSize: '0.875rem', color: 'rgba(255,255,255,0.45)',
              lineHeight: 1.75, maxWidth: 280, marginBottom: 28,
            }}>
              La plataforma más rápida para crear sitios web profesionales con inteligencia artificial. De idea a online en 10 minutos.
            </p>

            {/* Status indicator */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              padding: '7px 14px',
              background: 'rgba(0,200,150,0.08)',
              border: '1px solid rgba(0,200,150,0.2)',
              borderRadius: 'var(--radius-full)',
            }}>
              <div style={{
                width: 7, height: 7, borderRadius: '50%',
                background: '#00C896',
                animation: 'pulse-brand 2s infinite',
              }} />
              <span style={{ fontSize: '0.72rem', color: '#00C896', fontWeight: 600, letterSpacing: '0.04em' }}>
                Todos los sistemas operativos
              </span>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([cat, items]) => (
            <div key={cat}>
              <h4 style={{
                fontSize: '0.72rem', fontWeight: 700,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.3)', marginBottom: 20,
              }}>
                {cat}
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
                {items.map(item => (
                  <a
                    key={item} href="#"
                    style={{
                      color: 'rgba(255,255,255,0.5)',
                      textDecoration: 'none', fontSize: '0.875rem',
                      transition: 'color var(--dur)',
                    }}
                    onMouseEnter={e => e.target.style.color = '#fff'}
                    onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.5)'}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.07)',
          padding: '24px 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.78rem',
          color: 'rgba(255,255,255,0.25)',
        }}>
          <span>© {new Date().getFullYear()} SaaSWeb. Todos los derechos reservados.</span>
          <div style={{ display: 'flex', gap: 24 }}>
            {['Términos', 'Privacidad', 'Cookies'].map(t => (
              <a key={t} href="#" style={{ color: 'inherit', textDecoration: 'none', transition: 'color var(--dur)' }}
                onMouseEnter={e => e.target.style.color = '#fff'}
                onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.25)'}
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
