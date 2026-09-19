/**
 * PublicSitePage — /site/:siteId
 * Full-screen public view of published websites.
 */
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getSite } from '../lib/websiteService'
import WebsitePreview from '../components/WebsitePreview'
import { Globe, ArrowLeft, ExternalLink, Sparkles } from 'lucide-react'

export default function PublicSitePage() {
  const { siteId } = useParams()
  const [site, setSite] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!siteId) return
    setLoading(true)
    getSite(siteId)
      .then((data) => {
        setSite(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [siteId])

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0F172A', color: '#FFF', fontFamily: 'Inter, sans-serif' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 44, height: 44, borderRadius: '50%', border: '3px solid #00C896', borderTopColor: 'transparent', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px' }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          <div style={{ fontWeight: 600, color: '#94A3B8' }}>Cargando página web...</div>
        </div>
      </div>
    )
  }

  if (!site || !site.site_json) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#F8FAFC', padding: 20, fontFamily: 'Inter, sans-serif' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A', marginBottom: 12 }}>Sitio no encontrado</h2>
        <p style={{ color: '#64748B', marginBottom: 20 }}>No se pudo cargar la página web solicitada.</p>
        <Link to="/app/dashboard" style={{ padding: '10px 20px', background: '#0F172A', color: '#FFF', borderRadius: 8, textDecoration: 'none', fontWeight: 700, fontSize: '0.85rem' }}>
          Volver al Dashboard
        </Link>
      </div>
    )
  }

  const siteJson = site.site_json

  return (
    <div style={{ minHeight: '100vh', width: '100%', background: '#FFFFFF' }}>
      {/* Top Banner indicating published site */}
      <div style={{ background: '#0F172A', color: '#FFFFFF', padding: '8px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 600, borderBottom: '1px solid rgba(255,255,255,0.1)', position: 'sticky', top: 0, zIndex: 1000 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: 'rgba(16,185,129,0.2)', color: '#10B981', padding: '2px 8px', borderRadius: 999, fontSize: '0.72rem', fontWeight: 800 }}>
            🟢 PUBLICADO EN VIVO
          </span>
          <span>{siteJson.businessName || site.name}</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Link to={`/app/editor/${site.id}`} style={{ color: '#00C896', textDecoration: 'none', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            ✏️ Volver al Editor
          </Link>
          <Link to="/app/dashboard" style={{ color: '#94A3B8', textDecoration: 'none' }}>
            Dashboard
          </Link>
        </div>
      </div>

      {/* Main Website Preview Component (100% Fullscreen) */}
      <WebsitePreview
        data={siteJson}
        editMode={false}
        device="desktop"
        isPublicSite={true}
      />
    </div>
  )
}
