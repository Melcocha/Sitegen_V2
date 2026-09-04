import { useState, useEffect } from 'react'
import {
  Globe, Shield, TrendingUp, Eye, Server, Activity,
  ArrowUpRight, RefreshCw, Clock, Zap
} from 'lucide-react'

// Simulated metrics — in production these come from Vercel API
function useMetrics() {
  const [metrics, setMetrics] = useState({
    visitsToday: 142,
    visitsYesterday: 98,
    sslStatus: 'active',
    serverStatus: 'online',
    responseTime: 89,
    uptime: 99.98,
    lastDeploy: '2h ago',
    pageViews: 384,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((m) => ({
        ...m,
        visitsToday: m.visitsToday + Math.floor(Math.random() * 3),
        responseTime: 75 + Math.floor(Math.random() * 30),
      }))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return metrics
}

const METRIC_CARDS = (m) => [
  {
    title: 'Visitas hoy',
    value: m.visitsToday.toLocaleString(),
    icon: <Eye size={18} style={{ color: '#6366F1' }} />,
    trend: `+${Math.round(((m.visitsToday - m.visitsYesterday) / m.visitsYesterday) * 100)}%`,
    trendUp: true,
    sub: `vs ayer: ${m.visitsYesterday}`,
    accent: '#6366F1',
  },
  {
    title: 'Estado SSL',
    value: 'Activo',
    icon: <Shield size={18} style={{ color: '#10B981' }} />,
    trend: '✓ HTTPS',
    trendUp: true,
    sub: 'Certificado válido',
    accent: '#10B981',
  },
  {
    title: 'Servidor Vercel',
    value: 'Online',
    icon: <Server size={18} style={{ color: '#06B6D4' }} />,
    trend: `Uptime ${m.uptime}%`,
    trendUp: true,
    sub: `Último deploy: ${m.lastDeploy}`,
    accent: '#06B6D4',
  },
  {
    title: 'Tiempo respuesta',
    value: `${m.responseTime}ms`,
    icon: <Zap size={18} style={{ color: '#F59E0B' }} />,
    trend: 'Excelente',
    trendUp: true,
    sub: 'CDN global activo',
    accent: '#F59E0B',
  },
]

export default function Dashboard({ websiteName }) {
  const metrics = useMetrics()
  const cards = METRIC_CARDS(metrics)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 1000)
  }

  if (!websiteName) return null

  return (
    <section style={{ padding: '48px 0', background: 'var(--bg-secondary)' }} id="dashboard">
      <div className="container">
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
          <div>
            <h3 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: 4 }}>
              📊 Dashboard — {websiteName}
            </h3>
            <p className="text-caption">Métricas en tiempo real vía Vercel API</p>
          </div>
          <button
            className="btn btn-secondary btn-sm"
            onClick={handleRefresh}
            style={{ display: 'flex', alignItems: 'center', gap: 6 }}
          >
            <RefreshCw size={13} style={{ animation: isRefreshing ? 'spin 1s linear infinite' : 'none' }} />
            Actualizar
          </button>
        </div>

        {/* Bento Metrics Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 16,
          }}
        >
          {cards.map((card) => (
            <div
              key={card.title}
              className="card"
              style={{
                padding: 20,
                background: 'var(--bg-primary)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: -10, right: -10,
                  width: 60, height: 60,
                  background: `${card.accent}12`,
                  borderRadius: '50%',
                }}
              />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div
                  style={{
                    width: 36, height: 36,
                    borderRadius: 10,
                    background: `${card.accent}15`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  {card.icon}
                </div>
                <span
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    color: card.trendUp ? '#10B981' : '#EF4444',
                    background: card.trendUp ? '#ECFDF5' : '#FEF2F2',
                    padding: '2px 7px',
                    borderRadius: 999,
                  }}
                >
                  {card.trend}
                </span>
              </div>

              <div className="metric-value" style={{ marginBottom: 4, color: 'var(--text-primary)' }}>
                {card.value}
              </div>
              <div style={{ fontWeight: 600, fontSize: '0.875rem', marginBottom: 3 }}>{card.title}</div>
              <div className="text-caption">{card.sub}</div>
            </div>
          ))}
        </div>

        {/* Mini Activity Chart */}
        <div
          className="card"
          style={{
            marginTop: 16,
            padding: 20,
            background: 'var(--bg-primary)',
            display: 'flex',
            alignItems: 'center',
            gap: 20,
          }}
        >
          <Activity size={18} style={{ color: 'var(--accent)', flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, fontSize: '0.875rem', marginBottom: 8 }}>
              Actividad últimas 7 días
            </div>
            <div style={{ display: 'flex', align: 'flex-end', gap: 4, height: 40 }}>
              {[65, 78, 55, 90, 82, 110, metrics.visitsToday].map((v, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    background: i === 6
                      ? 'linear-gradient(to top, #6366F1, #8B5CF6)'
                      : 'var(--accent-light)',
                    borderRadius: '3px 3px 0 0',
                    height: `${(v / 120) * 100}%`,
                    alignSelf: 'flex-end',
                    transition: 'height 0.5s ease',
                    minHeight: 4,
                  }}
                />
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
              {['L', 'M', 'X', 'J', 'V', 'S', 'Hoy'].map((d, i) => (
                <div
                  key={d}
                  style={{
                    flex: 1,
                    textAlign: 'center',
                    fontSize: '0.65rem',
                    color: i === 6 ? 'var(--accent)' : 'var(--text-muted)',
                    fontWeight: i === 6 ? 700 : 400,
                  }}
                >
                  {d}
                </div>
              ))}
            </div>
          </div>
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <div style={{ fontWeight: 800, fontSize: '1.5rem', letterSpacing: '-0.03em', color: 'var(--accent)' }}>
              {metrics.pageViews}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Page views today</div>
          </div>
        </div>
      </div>
    </section>
  )
}
