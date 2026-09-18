// Clean SVG icons — Black on Light
const IconAI = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
  </svg>
)
const IconDeploy = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
  </svg>
)
const IconEdit = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
)
const IconDomain = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
)
const IconSSL = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <polyline points="9 12 11 14 15 10"/>
  </svg>
)
const IconMetrics = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
    <line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/>
  </svg>
)
const IconStripe = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
    <line x1="1" y1="10" x2="23" y2="10"/>
  </svg>
)

const FEATURES = [
  {
    icon: <IconAI />,
    tag: 'Motor IA',
    title: 'GPT-4o y Gemini Pro',
    body: 'Un párrafo de descripción. La IA interpreta la industria, el tono y el público objetivo para crear contenido 100% profesional y relevante a tu negocio.',
    span: 4,
  },
  {
    icon: <IconDeploy />,
    tag: 'Infraestructura',
    title: 'Vercel Edge Network',
    body: 'Tu sitio vive en 38 regiones globales simultáneamente. CDN automático, cero downtime, velocidad de carga sub-100ms.',
    span: 4,
  },
  {
    icon: <IconEdit />,
    tag: 'Editor visual',
    title: 'Sin tocar código',
    body: 'Cambia textos, imágenes y layouts con un editor lateral intuitivo. Lo que ves en pantalla es exactamente lo que publicas.',
    span: 4,
  },
  {
    icon: <IconDomain />,
    tag: 'Tu marca',
    title: 'Dominio propio',
    body: 'Busca y conecta tu .com en segundos. Verificación en tiempo real y sugerencias inteligentes incluidas.',
    span: 3,
  },
  {
    icon: <IconSSL />,
    tag: 'Seguridad',
    title: 'SSL automático',
    body: 'HTTPS configurado sin intervención. Tu sitio nace con cifrado de grado bancario activo.',
    span: 3,
  },
  {
    icon: <IconMetrics />,
    tag: 'Analytics',
    title: 'Dashboard en vivo',
    body: 'Visitas, fuentes de tráfico, rendimiento y estado en tiempo real sin scripts pesados.',
    span: 3,
  },
  {
    icon: <IconStripe />,
    tag: 'Donaciones & Pagos',
    title: 'Integración nativa',
    body: 'Botones y secciones para recibir donaciones o pagos directos con pasarelas seguras.',
    span: 3,
  },
]

export default function Features() {
  return (
    <section className="section" id="features" style={{ background: '#FFFFFF', padding: '110px 0' }}>
      <div className="container">

        {/* Header — Light mode crisp */}
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <span style={{
            display: 'inline-block',
            fontSize: '0.72rem', fontWeight: 800,
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color: '#4B5563', marginBottom: 14,
            padding: '6px 16px', borderRadius: 999,
            border: '1px solid #E5E7EB',
            background: '#F3F4F6',
          }}>
            Plataforma completa
          </span>
          <h2 style={{
            fontSize: 'clamp(2.2rem, 4vw, 3.4rem)',
            fontWeight: 900,
            letterSpacing: '-0.035em',
            color: '#0A0A0A',
            lineHeight: 1.15,
            marginBottom: 16,
          }}>
            Todo lo que necesitas.<br />
            <span style={{ color: '#6B7280', fontStyle: 'italic' }}>Nada que no necesitas.</span>
          </h2>
          <p style={{ maxWidth: 500, margin: '0 auto', fontSize: '1.05rem', color: '#4B5563', lineHeight: 1.7 }}>
            Construido para profesionales e instituciones que valoran su tiempo.
            Sin configuraciones engorrosas. Sin sorpresas.
          </p>
        </div>

        {/* Bento grid — Clean White & Light Grey Cards */}
        <div className="bento-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 18 }}>
          {FEATURES.map(f => (
            <div
              key={f.title}
              className="bento-card"
              style={{
                gridColumn: `span ${f.span}`,
                padding: 30,
                background: '#F9FAFB',
                borderRadius: 18,
                border: '1px solid #E5E7EB',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'default',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.background = '#FFFFFF'
                e.currentTarget.style.borderColor = '#000000'
                e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.07)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = ''
                e.currentTarget.style.background = '#F9FAFB'
                e.currentTarget.style.borderColor = '#E5E7EB'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {/* Subtle top-right indicator */}
              <div style={{
                position: 'absolute', top: 22, right: 22,
                width: 6, height: 6, borderRadius: '50%',
                background: '#D1D5DB',
              }} />

              {/* Icon — Solid Black Pill */}
              <div style={{
                width: 46, height: 46, borderRadius: 12,
                background: '#000000',
                color: '#FFFFFF',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 20,
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              }}>
                {f.icon}
              </div>

              <div style={{ fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6B7280', marginBottom: 8 }}>
                {f.tag}
              </div>
              <h3 style={{ fontWeight: 800, fontSize: '1.1rem', marginBottom: 10, letterSpacing: '-0.015em', color: '#0A0A0A' }}>
                {f.title}
              </h3>
              <p style={{ fontSize: '0.9rem', lineHeight: 1.65, color: '#4B5563' }}>
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
