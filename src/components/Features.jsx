import { ArrowRight } from 'lucide-react'

// Clean SVG icons — no emojis, professional
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
    title: 'GPT-4o genera todo',
    body: 'Un párrafo de descripción. La IA interpreta la industria, el tono y el público objetivo para crear contenido 100% profesional y relevante a tu negocio.',
    span: 4,
    accent: '#00C896',
  },
  {
    icon: <IconDeploy />,
    tag: 'Infraestructura',
    title: 'Vercel Edge Network',
    body: 'Tu sitio vive en 38 regiones globales simultáneamente. CDN automático, cero downtime, velocidad de carga sub-100ms.',
    span: 4,
    accent: '#0EA5E9',
  },
  {
    icon: <IconEdit />,
    tag: 'Editor visual',
    title: 'Sin tocar código',
    body: 'Cambia textos, colores y layouts con un editor lateral intuitivo. Lo que ves es lo que publicas.',
    span: 4,
    accent: '#8B5CF6',
  },
  {
    icon: <IconDomain />,
    tag: 'Tu marca',
    title: 'Dominio propio',
    body: 'Busca y conecta tu .com en segundos. Verificación en tiempo real y sugerencias inteligentes incluidas.',
    span: 3,
    accent: '#F59E0B',
  },
  {
    icon: <IconSSL />,
    tag: 'Seguridad',
    title: 'SSL automático',
    body: 'HTTPS configurado sin intervención. Tu sitio nace seguro.',
    span: 3,
    accent: '#10B981',
  },
  {
    icon: <IconMetrics />,
    tag: 'Analytics',
    title: 'Dashboard en vivo',
    body: 'Visitas, fuente de tráfico, estado del servidor. Todo en tiempo real.',
    span: 3,
    accent: '#06B6D4',
  },
  {
    icon: <IconStripe />,
    tag: 'Pagos',
    title: 'Stripe integrado',
    body: 'Checkout nativo mensual o anual con descuento automático aplicado.',
    span: 3,
    accent: '#635BFF',
  },
]

export default function Features() {
  return (
    <section className="section" id="features" style={{ background: 'var(--bg-2)' }}>
      <div className="container">

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <span className="t-label" style={{ marginBottom: 12, display: 'block' }}>
            Plataforma completa
          </span>
          <h2 className="t-headline" style={{ marginBottom: 16 }}>
            Todo lo que necesitas.<br />Nada que no necesitas.
          </h2>
          <p className="t-body" style={{ maxWidth: 460, margin: '0 auto' }}>
            Construido para profesionales que valoran su tiempo.
            Sin configuraciones. Sin sorpresas.
          </p>
        </div>

        {/* Bento grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 16 }}>
          {FEATURES.map(f => (
            <div
              key={f.title}
              className="card"
              style={{
                gridColumn: `span ${f.span}`,
                padding: 28,
                background: 'var(--bg)',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'default',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-3px)'
                e.currentTarget.style.borderColor = f.accent + '60'
                e.currentTarget.style.boxShadow = `0 12px 40px ${f.accent}12`
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = ''
                e.currentTarget.style.borderColor = ''
                e.currentTarget.style.boxShadow = ''
              }}
            >
              {/* Accent dot top right */}
              <div style={{
                position: 'absolute', top: 20, right: 20,
                width: 6, height: 6, borderRadius: '50%',
                background: f.accent,
              }} />

              {/* Icon */}
              <div style={{
                width: 44, height: 44, borderRadius: 'var(--radius-md)',
                background: f.accent + '12',
                color: f.accent,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 18,
                border: `1px solid ${f.accent}25`,
              }}>
                {f.icon}
              </div>

              <div className="t-label" style={{ color: f.accent, marginBottom: 8 }}>{f.tag}</div>
              <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 8, letterSpacing: '-0.01em', color: 'var(--ink)' }}>
                {f.title}
              </h3>
              <p className="t-caption" style={{ lineHeight: 1.65 }}>{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
