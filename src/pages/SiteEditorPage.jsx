/**
 * SiteEditorPage — Sprint 6: Website Studio
 * Full no-code editor with live preview, Supabase persistence, and publish flow.
 *
 * Route: /app/editor/:siteId
 * Protected: yes (ProtectedRoute)
 */

import { useState, useEffect, useRef, useCallback } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'
import WebsiteEditor from '../components/WebsiteEditor'
import QuickEditPanel from '../components/QuickEditPanel'
import { publishSite } from '../lib/publishService'
import { getSite, updateSiteContent, migrateLocalSiteToRemote } from '../lib/websiteService'
import WebsitePreview from '../components/WebsitePreview'
import {
  ArrowLeft, Save, Globe, Eye, EyeOff, Smartphone, Monitor,
  Tablet, CheckCircle2, AlertCircle, Zap, Clock, RotateCcw,
  ExternalLink, Layers, ChevronDown, Sparkles, Undo2, Redo2
} from 'lucide-react'
import { PRESET_TEMPLATES } from '../data/templates'

// ─── Default site_json structure ─────────────────────────────────
const DEFAULT_SITE_JSON = {
  businessName: 'Mi Empresa',
  tagline: 'Tu tagline aquí',
  description: 'Descripción de tu negocio',
  primaryColor: '#1E3A5F',
  secondaryColor: '#F5F0E8',
  accentColor: '#C9A84C',
  font: 'Inter',
  hero: {
    headline: 'Bienvenidos a nuestro negocio',
    subheadline: 'Ofrecemos los mejores servicios de la región con calidad y experiencia.',
    ctaText: 'Contáctanos',
  },
  services: [
    { icon: '⚡', title: 'Servicio 1', description: 'Descripción breve del servicio.' },
    { icon: '🎯', title: 'Servicio 2', description: 'Descripción breve del servicio.' },
    { icon: '🛡️', title: 'Servicio 3', description: 'Descripción breve del servicio.' },
  ],
  about: {
    title: 'Quiénes somos',
    text: 'Somos una empresa comprometida con la excelencia y la satisfacción de nuestros clientes.',
  },
  testimonials: [
    { name: 'Cliente Feliz', role: 'CEO, Empresa X', text: 'Excelente servicio, muy recomendados.', rating: 5 },
    { name: 'Ana García', role: 'Directora', text: 'Profesionales y comprometidos con los resultados.', rating: 5 },
  ],
  contact: {
    phone: '+1 (555) 000-0000',
    email: 'info@miempresa.com',
    address: 'Ciudad, País',
  },
  seo: {
    title: 'Mi Empresa — Servicios profesionales',
    description: 'Descripción para buscadores de tu empresa y servicios.',
  },
}

// ─── Device frame sizes ──────────────────────────────────────────
const DEVICES = [
  { id: 'desktop',  icon: <Monitor size={15} />,    label: 'Escritorio', width: '100%' },
  { id: 'tablet',   icon: <Tablet size={15} />,     label: 'Tablet',     width: 768 },
  { id: 'mobile',   icon: <Smartphone size={15} />, label: 'Móvil',      width: 390 },
]

// ─── Status badge ─────────────────────────────────────────────────
const STATUS_STYLE = {
  draft:     { color: '#F59E0B', bg: 'rgba(245,158,11,0.12)',  label: 'Borrador' },
  published: { color: '#10B981', bg: 'rgba(16,185,129,0.12)', label: 'Publicado' },
  paused:    { color: '#6B7280', bg: 'rgba(107,114,128,0.12)', label: 'Pausado' },
}

// ─── Version History Drawer ───────────────────────────────────────
function VersionDrawer({ siteId, onRestore, onClose }) {
  const [versions, setVersions] = useState([])
  const [loading, setLoading]   = useState(true)

  useEffect(() => {
    supabase
      .from('website_versions')
      .select('id, label, created_at')
      .eq('website_id', siteId)
      .order('created_at', { ascending: false })
      .limit(20)
      .then(({ data }) => { setVersions(data || []); setLoading(false) })
  }, [siteId])

  return (
    <div style={{
      position: 'absolute', top: 0, right: 0, bottom: 0, width: 320,
      background: '#fff', borderLeft: '1px solid #E5E7EB', zIndex: 50,
      display: 'flex', flexDirection: 'column', boxShadow: '-8px 0 32px rgba(0,0,0,0.08)',
    }}>
      <div style={{ padding: '16px 20px', borderBottom: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, fontSize: '0.9375rem', color: '#111827' }}>
          <Clock size={16} color="#6B7280" /> Historial de versiones
        </div>
        <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF', padding: 4 }}>✕</button>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 0' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: 40, color: '#9CA3AF', fontSize: '0.875rem' }}>Cargando...</div>
        ) : versions.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: '#9CA3AF' }}>
            <Clock size={28} style={{ margin: '0 auto 12px', display: 'block', opacity: 0.4 }} />
            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151', marginBottom: 4 }}>Sin versiones guardadas</div>
            <div style={{ fontSize: '0.8rem' }}>Publica tu sitio para crear una versión.</div>
          </div>
        ) : versions.map((v, i) => (
          <div key={v.id} style={{ padding: '12px 20px', borderBottom: '1px solid #F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.8125rem', color: '#111827' }}>
                {v.label || `Versión ${versions.length - i}`}
              </div>
              <div style={{ fontSize: '0.72rem', color: '#9CA3AF', marginTop: 2 }}>
                {new Date(v.created_at).toLocaleString('es', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
            <button
              onClick={() => onRestore(v.id)}
              style={{ padding: '4px 12px', background: 'rgba(0,200,150,0.08)', border: '1px solid rgba(0,200,150,0.25)', borderRadius: 7, color: '#00A87A', fontSize: '0.72rem', fontWeight: 700, cursor: 'pointer' }}
            >
              Restaurar
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── MAIN PAGE ────────────────────────────────────────────────────
export default function SiteEditorPage() {
  const { siteId }   = useParams()
  const { user }     = useAuth()
  const navigate     = useNavigate()

  const [site,       setSite]       = useState(null)
  const [siteJson,   setSiteJson]   = useState(null)
  const [loading,    setLoading]    = useState(true)
  const [saving,     setSaving]     = useState(false)
  const [publishing, setPublishing] = useState(false)
  const [saveState,  setSaveState]  = useState('idle') // idle | saved | error
  const [device,     setDevice]     = useState('desktop')
  const [showVersions, setShowVersions] = useState(false)
  const [isDirty,    setIsDirty]    = useState(false)
  const [quickEdit,  setQuickEdit]  = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [saveToast,  setSaveToast]  = useState(false) // floating toast confirmation
  const [showTemplates, setShowTemplates] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('Todas')
  const [confirmingTemplate, setConfirmingTemplate] = useState(null)

  // Auto-save timer
  const autoSaveRef = useRef(null)

  // ── Load template ──
  const handleLoadTemplate = (template) => {
    setConfirmingTemplate(template)
  }

  const handleConfirmLoad = async () => {
    if (!confirmingTemplate) return
    const template = confirmingTemplate
    const newJson = JSON.parse(JSON.stringify(template.site_json))
    if (siteJson && siteJson.subdomain) {
      newJson.subdomain = siteJson.subdomain
    }
    setSiteJson(newJson)
    setIsDirty(true)
    setConfirmingTemplate(null)
    setShowTemplates(false)
    await _saveDraft(newJson)
  }

  // ── History Stack (Undo / Redo) ──
  const [history, setHistory] = useState([])
  const [historyIdx, setHistoryIdx] = useState(-1)
  const isUndoRedoRef = useRef(false)

  const pushHistory = (newJson) => {
    if (isUndoRedoRef.current) {
      isUndoRedoRef.current = false
      return
    }
    setHistory(prev => {
      const sliced = prev.slice(0, historyIdx + 1)
      const next = [...sliced, JSON.parse(JSON.stringify(newJson))]
      if (next.length > 30) next.shift()
      return next
    })
    setHistoryIdx(prev => Math.min(prev + 1, 29))
  }

  const handleUndo = () => {
    if (historyIdx > 0) {
      const prevIdx = historyIdx - 1
      const prevJson = history[prevIdx]
      if (prevJson) {
        isUndoRedoRef.current = true
        setHistoryIdx(prevIdx)
        setSiteJson(JSON.parse(JSON.stringify(prevJson)))
        setIsDirty(true)
        clearTimeout(autoSaveRef.current)
        autoSaveRef.current = setTimeout(() => _saveDraft(prevJson), 2500)
      }
    }
  }

  const handleRedo = () => {
    if (historyIdx < history.length - 1) {
      const nextIdx = historyIdx + 1
      const nextJson = history[nextIdx]
      if (nextJson) {
        isUndoRedoRef.current = true
        setHistoryIdx(nextIdx)
        setSiteJson(JSON.parse(JSON.stringify(nextJson)))
        setIsDirty(true)
        clearTimeout(autoSaveRef.current)
        autoSaveRef.current = setTimeout(() => _saveDraft(nextJson), 2500)
      }
    }
  }

  // Keyboard shortcut listener (Ctrl+Z, Ctrl+Y, Ctrl+Shift+Z)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        if (e.shiftKey) {
          e.preventDefault()
          handleRedo()
        } else {
          e.preventDefault()
          handleUndo()
        }
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
        e.preventDefault()
        handleRedo()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [historyIdx, history])

  // ── Load site from Supabase or Local Storage ───────────
  useEffect(() => {
    if (!siteId || !user?.id) return
    setLoading(true)
    getSite(siteId, user.id)
      .then((data) => {
        if (!data) { navigate('/app/dashboard'); return }
        const initialJson = data.site_json || { ...DEFAULT_SITE_JSON, businessName: data.name }
        setSite(data)
        setSiteJson(initialJson)
        setHistory([JSON.parse(JSON.stringify(initialJson))])
        setHistoryIdx(0)
        setLoading(false)
      })
      .catch(() => {
        navigate('/app/dashboard')
      })
  }, [siteId, user?.id])

  // ── Quick-edit: update a specific field from floating panel ────
  const handleQuickUpdate = (field, value) => {
    setSiteJson(prev => {
      const keys = field.split('.')
      const d = JSON.parse(JSON.stringify(prev))
      let obj = d
      for (let i = 0; i < keys.length - 1; i++) {
        const k = keys[i]
        const nextKey = keys[i + 1]
        const nextIsIndex = /^\d+$/.test(nextKey)
        if (obj[k] === undefined || obj[k] === null) obj[k] = nextIsIndex ? [] : {}
        obj = obj[k]
      }
      const lastKey = keys[keys.length - 1]
      obj[/^\d+$/.test(lastKey) ? Number(lastKey) : lastKey] = value
      pushHistory(d)
      clearTimeout(autoSaveRef.current)
      autoSaveRef.current = setTimeout(() => _saveDraft(d), 2500)
      return d
    })
    setQuickEdit(prev => (prev && prev.field === field ? { ...prev, value } : prev))
    setIsDirty(true)
  }

  // Batch: apply multiple [field, value] pairs in ONE setSiteJson — no race conditions
  const handleQuickUpdateBatch = (pairs) => {
    setSiteJson(prev => {
      const d = JSON.parse(JSON.stringify(prev))
      for (const [field, value] of pairs) {
        const keys = field.split('.')
        let obj = d
        for (let i = 0; i < keys.length - 1; i++) {
          const k = keys[i]
          const nextKey = keys[i + 1]
          if (obj[k] === undefined || obj[k] === null)
            obj[k] = /^\d+$/.test(nextKey) ? [] : {}
          obj = obj[k]
        }
        const lastKey = keys[keys.length - 1]
        obj[/^\d+$/.test(lastKey) ? Number(lastKey) : lastKey] = value
      }
      pushHistory(d)
      clearTimeout(autoSaveRef.current)
      autoSaveRef.current = setTimeout(() => _saveDraft(d), 2500)
      return d
    })
    setIsDirty(true)
  }

  // ── Handle editor changes (debounced auto-save) ───────────
  const handleChange = useCallback((newJson) => {
    setSiteJson(newJson)
    pushHistory(newJson)
    setIsDirty(true)
    clearTimeout(autoSaveRef.current)
    autoSaveRef.current = setTimeout(() => {
      _saveDraft(newJson)
    }, 2500)
  }, [siteId, historyIdx])

  // ── Save draft silently ───────────────
  const _saveDraft = async (json) => {
    if (!siteId) return
    try {
      if (siteId.startsWith('site-local-')) {
        await updateSiteContent(siteId, json)
      } else {
        await supabase
          .from('websites')
          .update({ site_json: json, updated_at: new Date().toISOString() })
          .eq('id', siteId)
      }
      setIsDirty(false)
    } catch (e) {
      // Leave isDirty=true so "• Sin guardar" keeps showing — the next
      // manual Guardar click will retry and surface the error properly.
      console.error('[Autosave]', e.message)
    }
  }

  // ── Manual save ──────────────────────
  const handleSave = async () => {
    setSaving(true)
    clearTimeout(autoSaveRef.current)
    let error = null
    if (siteId.startsWith('site-local-')) {
      try {
        await updateSiteContent(siteId, siteJson)
      } catch (e) {
        error = e
      }
    } else {
      const res = await supabase
        .from('websites')
        .update({
          site_json:  siteJson,
          name:       siteJson.businessName || site?.name,
          updated_at: new Date().toISOString(),
        })
        .eq('id', siteId)
      error = res.error
    }
    setSaving(false)
    setSaveState(error ? 'error' : 'saved')
    if (error) {
      console.error('[Save]', error.message)
      // Leave isDirty=true — the change genuinely did not persist
    } else {
      setIsDirty(false)
      setSaveToast(true)
      setTimeout(() => setSaveToast(false), 2500)
    }
    setTimeout(() => setSaveState('idle'), 3000)
  }

  // ── Publish — calls Edge Function → uploads HTML to Supabase Storage ──
  const handlePublish = async () => {
    if (publishing) return
    setPublishing(true)
    try {
      // Local-only drafts don't exist in Supabase yet — the Edge Function
      // and website_versions table can't see them, so migrate first.
      let activeSiteId = siteId
      if (siteId.startsWith('site-local-')) {
        const remote = await migrateLocalSiteToRemote({ ...site, site_json: siteJson }, user.id)
        activeSiteId = remote.id
        setSite(remote)
        navigate(`/app/editor/${remote.id}`, { replace: true })
      } else {
        // Save latest JSON first
        await supabase.from('websites').update({ site_json: siteJson, name: siteJson.businessName || site?.name }).eq('id', siteId)
      }

      // Save version snapshot
      await supabase.from('website_versions').insert({
        website_id: activeSiteId,
        user_id:    user.id,
        json_data:  siteJson,
        label:      `Publicación — ${new Date().toLocaleDateString('es', { day: 'numeric', month: 'short', year: 'numeric' })}`,
      })

      // Call Edge Function → generates HTML + uploads to Storage
      const { publishedUrl, subdomain } = await publishSite(activeSiteId)

      setSite(prev => ({ ...prev, id: activeSiteId, status: 'published', vercel_url: publishedUrl, subdomain }))
      setIsDirty(false)
      setSaveState('saved')
      setTimeout(() => setSaveState('idle'), 4000)
    } catch (e) {
      console.error('[Publish]', e.message)
      setSaveState('error')
      setTimeout(() => setSaveState('idle'), 3000)
    } finally {
      setPublishing(false)
    }
  }

  // ── Restore version ──────────────────
  const handleRestoreVersion = async (versionId) => {
    const { data } = await supabase
      .from('website_versions')
      .select('json_data')
      .eq('id', versionId)
      .maybeSingle()
    if (data?.json_data) {
      setSiteJson(data.json_data)
      setIsDirty(true)
      setShowVersions(false)
    }
  }

  // ── Loading skeleton ─────────────────
  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F9FAFB', fontFamily: "'Inter', sans-serif" }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 44, height: 44, borderRadius: '50%', border: '3px solid #00C896', borderTopColor: 'transparent', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px' }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          <div style={{ fontWeight: 600, color: '#6B7280' }}>Cargando editor...</div>
        </div>
      </div>
    )
  }

  if (!site || !siteJson) return null

  const statusStyle = STATUS_STYLE[site.status] || STATUS_STYLE.draft
  const currentDevice = DEVICES.find(d => d.id === device)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#F9FAFB', fontFamily: "'Inter', sans-serif" }}>

      {/* ── TOP BAR ── */}
      <header style={{
        height: 56, background: '#fff', borderBottom: '1px solid #E5E7EB',
        display: 'flex', alignItems: 'center', padding: '0 20px', gap: 12,
        position: 'sticky', top: 0, zIndex: 100, flexShrink: 0,
      }}>
        {/* Back */}
        <Link to="/app/dashboard" style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#6B7280', textDecoration: 'none', fontSize: '0.8125rem', fontWeight: 600, padding: '6px 10px', borderRadius: 8, border: '1px solid #E5E7EB', whiteSpace: 'nowrap' }}>
          <ArrowLeft size={14} /> Panel
        </Link>

        {/* Sidebar toggle — like Figma/Webflow, always visible in toolbar */}
        <button
          onClick={() => setSidebarOpen(o => !o)}
          title={sidebarOpen ? 'Ocultar panel de edición' : 'Mostrar panel de edición'}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: 34, height: 34, borderRadius: 8, border: '1px solid #E5E7EB',
            background: sidebarOpen ? '#EEF2FF' : '#fff',
            cursor: 'pointer', flexShrink: 0, transition: 'all .15s',
            color: sidebarOpen ? '#6366F1' : '#6B7280',
          }}
        >
          {/* Panel icon — two vertical bars like Figma's layout toggle */}
          <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
            <rect x="2" y="2" width="5" height="16" rx="1.5" opacity={sidebarOpen ? 1 : 0.4} />
            <rect x="9" y="2" width="9" height="16" rx="1.5" opacity="0.25" />
          </svg>
        </button>

        {/* Site name + status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, minWidth: 0 }}>
          <div style={{ height: 18, width: 1, background: '#E5E7EB' }} />
          <span style={{ fontWeight: 700, fontSize: '0.9375rem', color: '#111827', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {siteJson.businessName || site.name}
          </span>
          <span style={{ padding: '2px 10px', borderRadius: 999, background: statusStyle.bg, color: statusStyle.color, fontSize: '0.68rem', fontWeight: 800, flexShrink: 0 }}>
            {statusStyle.label}
          </span>
          {saveState === 'error' ? (
            <span title="El guardado local falló — probablemente el navegador se quedó sin espacio (foto/video muy pesado)" style={{ fontSize: '0.72rem', color: '#DC2626', fontWeight: 700, flexShrink: 0, cursor: 'help' }}>
              ⚠ Error al guardar
            </span>
          ) : isDirty && (
            <span style={{ fontSize: '0.72rem', color: '#F59E0B', fontWeight: 600, flexShrink: 0 }}>
              • Sin guardar
            </span>
          )}
        </div>

        {/* Undo / Redo buttons */}
        <div style={{ display: 'flex', background: '#F3F4F6', borderRadius: 9, padding: 3, gap: 2 }}>
          <button
            onClick={handleUndo}
            disabled={historyIdx <= 0}
            title="Deshacer cambio (Ctrl+Z)"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '5px 8px', borderRadius: 7, border: 'none',
              cursor: historyIdx > 0 ? 'pointer' : 'default',
              background: 'transparent',
              color: historyIdx > 0 ? '#111827' : '#9CA3AF',
              opacity: historyIdx > 0 ? 1 : 0.4,
              transition: 'all 0.15s',
            }}
          >
            <Undo2 size={15} />
          </button>
          <button
            onClick={handleRedo}
            disabled={historyIdx >= history.length - 1}
            title="Rehacer cambio (Ctrl+Y o Ctrl+Shift+Z)"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '5px 8px', borderRadius: 7, border: 'none',
              cursor: historyIdx < history.length - 1 ? 'pointer' : 'default',
              background: 'transparent',
              color: historyIdx < history.length - 1 ? '#111827' : '#9CA3AF',
              opacity: historyIdx < history.length - 1 ? 1 : 0.4,
              transition: 'all 0.15s',
            }}
          >
            <Redo2 size={15} />
          </button>
        </div>

        <div style={{ height: 18, width: 1, background: '#E5E7EB' }} />

        {/* Device switcher */}
        <div style={{ display: 'flex', background: '#F3F4F6', borderRadius: 9, padding: 3, gap: 2 }}>
          {DEVICES.map(d => (
            <button
              key={d.id}
              onClick={() => setDevice(d.id)}
              title={d.label}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '5px 10px', borderRadius: 7, border: 'none', cursor: 'pointer',
                background: device === d.id ? '#fff' : 'transparent',
                color: device === d.id ? '#111827' : '#9CA3AF',
                boxShadow: device === d.id ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
                transition: 'all 0.15s',
              }}
            >
              {d.icon}
            </button>
          ))}
        </div>

        <div style={{ height: 18, width: 1, background: '#E5E7EB' }} />

        {/* Version history button */}
        <button
          onClick={() => setShowVersions(v => !v)}
          style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 12px', borderRadius: 8, border: '1px solid #E5E7EB', background: showVersions ? '#F3F4F6' : '#fff', cursor: 'pointer', color: '#6B7280', fontSize: '0.8rem', fontWeight: 600 }}
        >
          <Clock size={14} /> Historial
        </button>

        {/* Live URL */}
        {site.status === 'published' && site.vercel_url && (
          <a href={site.vercel_url} target="_blank" rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 12px', borderRadius: 8, border: '1px solid rgba(16,185,129,0.3)', background: 'rgba(16,185,129,0.08)', color: '#10B981', textDecoration: 'none', fontSize: '0.8rem', fontWeight: 600, whiteSpace: 'nowrap' }}>
            <ExternalLink size={13} /> Ver sitio
          </a>
        )}

        {/* Save button — always clickable */}
        <button
          onClick={handleSave}
          disabled={saving}
          onMouseEnter={e => {
            if (!saving) {
              e.currentTarget.style.background = '#10B981'
              e.currentTarget.style.color = '#fff'
              e.currentTarget.style.borderColor = '#10B981'
            }
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = saveState === 'saved' ? '#10B981' : (isDirty ? '#F0FDF4' : '#F3F4F6')
            e.currentTarget.style.color = saveState === 'saved' ? '#fff' : (isDirty ? '#10B981' : '#9CA3AF')
            e.currentTarget.style.borderColor = isDirty ? 'rgba(16,185,129,0.3)' : '#E5E7EB'
          }}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '7px 16px', borderRadius: 8, border: 'none', cursor: saving ? 'default' : 'pointer',
            background: saveState === 'saved' ? '#10B981' : (isDirty ? '#F0FDF4' : '#F3F4F6'),
            color: saveState === 'saved' ? '#fff' : (isDirty ? '#10B981' : '#9CA3AF'),
            fontWeight: 700, fontSize: '0.8125rem', transition: 'all 0.2s',
            border: `1px solid ${isDirty ? 'rgba(16,185,129,0.3)' : '#E5E7EB'}`,
          }}
        >
          {saveState === 'saved' ? <><CheckCircle2 size={14} /> Guardado</> : <><Save size={14} /> {saving ? 'Guardando...' : 'Guardar'}</>}
        </button>

        {/* Publish button */}
        <button
          onClick={handlePublish}
          disabled={publishing}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '7px 18px', borderRadius: 8, border: 'none', cursor: publishing ? 'wait' : 'pointer',
            background: publishing ? 'rgba(0,200,150,0.5)' : 'linear-gradient(135deg, #00C896, #00A87A)',
            color: '#fff', fontWeight: 700, fontSize: '0.875rem',
            boxShadow: '0 2px 8px rgba(0,200,150,0.35)',
            transition: 'all 0.2s',
          }}
        >
          {publishing
            ? <><div style={{ width: 12, height: 12, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.5)', borderTopColor: '#fff', animation: 'spin 0.8s linear infinite' }} /> Publicando...</>
            : <><Zap size={14} /> Publicar</>
          }
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </button>
      </header>

      {/* ── EDITOR + PREVIEW BODY ── */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden', position: 'relative' }}>

        {/* LEFT PANEL — collapsible sidebar */}
        <div style={{
          width: sidebarOpen ? 300 : 0,
          flexShrink: 0,
          background: '#fff',
          borderRight: sidebarOpen ? '1px solid #E5E7EB' : 'none',
          overflowY: sidebarOpen ? 'auto' : 'hidden',
          display: 'flex', flexDirection: 'column',
          transition: 'width .22s cubic-bezier(.4,0,.2,1)',
          position: 'relative',
        }}>
          {sidebarOpen && (
            <>
              {/* Panel header */}
              <div style={{ padding: '14px 20px', borderBottom: '1px solid #F3F4F6', background: '#F9FAFB', display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#9CA3AF', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Diseño y Contenido</div>
                <button
                  onClick={() => setShowTemplates(true)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    background: 'linear-gradient(135deg, #6366F1, #4F46E5)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 8,
                    cursor: 'pointer',
                    fontWeight: 800,
                    fontSize: '0.76rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6,
                    boxShadow: '0 4px 12px rgba(99,102,241,0.25)',
                    transition: 'all 0.15s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-1px)'
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(99,102,241,0.35)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'none'
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(99,102,241,0.25)'
                  }}
                >
                  <Sparkles size={13} />
                  Cargar Plantilla Premium
                </button>
              </div>
              <div style={{ flex: 1, overflowY: 'auto' }}>
                <WebsiteEditor
                  websiteData={siteJson}
                  onChange={handleChange}
                  onSectionFocus={(secId) => {
                    const map = {
                      churchAnnounce: ['wp-announcement', 'announcementBar'],
                      hero: ['wp-hero', 'inicio', 'wp-afiche-hero'],
                      welcome: ['wp-welcome', 'wp-vision', 'welcome'],
                      visit: ['wp-plan-visit', 'visita', 'horarios'],
                      values: ['wp-values', 'valores'],
                      ministries: ['wp-ministerios', 'wp-ministries', 'ministerios'],
                      nextSteps: ['wp-next-steps', 'pasos'],
                      sermons: ['wp-sermons', 'sermones'],
                      donation: ['wp-donations', 'wp-donation', 'ofrendas'],
                      prayer: ['wp-prayer', 'oracion'],
                      about: ['wp-about', 'wp-nosotros', 'nosotros'],
                      contact: ['wp-contact', 'contacto'],
                      floatingWidget: ['wp-widget']
                    }
                    const candidates = map[secId] || [`wp-${secId}`, secId]
                    for (const id of candidates) {
                      const el = document.getElementById(id) || document.querySelector(`[data-section="${id}"]`) || document.querySelector(`#${id}`)
                      if (el) {
                        el.scrollIntoView({ behavior: 'smooth', block: 'center' })
                        break
                      }
                    }
                  }}
                />
              </div>
              {/* Bottom info */}
              <div style={{ padding: '12px 20px', borderTop: '1px solid #F3F4F6', background: '#F9FAFB' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.72rem', color: '#9CA3AF' }}>
                  <Layers size={11} />
                  Deploy #{site.deploy_count || 0}
                  {site.last_deployed_at && (
                    <span>· {new Date(site.last_deployed_at).toLocaleDateString('es', { day: 'numeric', month: 'short' })}</span>
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        {/* RIGHT PANEL — Preview */}
        <div style={{
          flex: 1, overflow: 'auto',
          background: '#E5E7EB',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          padding: '20px',
          gap: 12,
        }}>
          {/* Active QuickEdit hint banner */}
          {quickEdit && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '8px 18px', background: '#4F46E5', color: '#ffffff',
              borderRadius: 30, fontSize: '0.8rem', fontWeight: 600,
              boxShadow: '0 6px 18px rgba(79,70,229,0.35)',
              flexShrink: 0
            }}>
              <span style={{ fontSize: '1rem' }}>✏️</span>
              <span>Editando: <strong style={{ color: '#FDE047' }}>{quickEdit.label || quickEdit.field}</strong></span>
              <span style={{ opacity: 0.8, fontSize: '0.72rem', marginLeft: 4 }}>— Ajusta texto, imagen o estilos en el panel flotante</span>
              <button
                onClick={() => setQuickEdit(null)}
                style={{
                  background: 'rgba(255,255,255,0.25)', border: 'none', color: '#fff',
                  borderRadius: '50%', width: 20, height: 20,
                  display: 'flex', alignItems: 'center', justify: 'center',
                  cursor: 'pointer', fontSize: '0.75rem', fontWeight: 800, marginLeft: 6
                }}
                title="Cerrar edición"
              >
                ✕
              </button>
            </div>
          )}

          {/* Preview label */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.72rem', fontWeight: 700, color: '#9CA3AF', letterSpacing: '0.04em', textTransform: 'uppercase', flexShrink: 0 }}>
            {currentDevice.icon} {currentDevice.label} — Vista previa en tiempo real
          </div>

          {/* Preview frame */}
          <div style={{
            width: device === 'desktop' ? '100%' : currentDevice.width,
            maxWidth: '100%',
            background: '#fff',
            borderRadius: 12,
            overflow: 'hidden',
            boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
            flexShrink: 0,
            position: 'relative',
          }}>
            <WebsitePreview
              data={siteJson}
              editMode={true}
              activeField={quickEdit?.field}
              onElementClick={(target) => setQuickEdit(target)}
              onSectionChange={handleQuickUpdate}
              onQuickUpdate={handleQuickUpdate}
              onQuickUpdateBatch={handleQuickUpdateBatch}
            />
          </div>

          {/* Published URL bar */}
          {site.status === 'published' && site.vercel_url && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 9, fontSize: '0.8rem', color: '#059669', fontWeight: 600 }}>
              <CheckCircle2 size={14} />
              Publicado en: <a href={site.vercel_url} target="_blank" rel="noopener noreferrer" style={{ color: '#059669', textDecoration: 'underline' }}>{site.vercel_url}</a>
            </div>
          )}
        </div>

        {/* VERSION HISTORY DRAWER */}
        {showVersions && (
          <VersionDrawer
            siteId={siteId}
            onRestore={handleRestoreVersion}
            onClose={() => setShowVersions(false)}
          />
        )}

        {/* QUICK EDIT FLOATING PANEL */}
        {quickEdit && (
          <QuickEditPanel
            target={quickEdit}
            elementStyles={siteJson?.elementStyles}
            onUpdate={handleQuickUpdate}
            onUpdateBatch={handleQuickUpdateBatch}
            onClose={() => setQuickEdit(null)}
          />
        )}

        {/* ── SAVE TOAST ── appears 2.5s after successful save */}
        {saveToast && (
          <div style={{
            position: 'fixed', bottom: 32, left: '50%', transform: 'translateX(-50%)',
            zIndex: 99999, pointerEvents: 'none',
            animation: 'slideUpFade 0.3s ease',
          }}>
            <style>{`
              @keyframes slideUpFade {
                from { opacity: 0; transform: translateX(-50%) translateY(16px); }
                to   { opacity: 1; transform: translateX(-50%) translateY(0); }
              }
            `}</style>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10,
              background: '#064E3B', color: '#fff',
              padding: '12px 22px', borderRadius: 14,
              boxShadow: '0 8px 32px rgba(0,0,0,.22)',
              fontSize: '.875rem', fontWeight: 700, fontFamily: "'Inter',sans-serif",
              whiteSpace: 'nowrap',
            }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#34D399" strokeWidth="2.5" width="18" height="18">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
              Cambios guardados correctamente
            </div>
          </div>
        )}
        {/* ── TEMPLATES SELECTOR MODAL ── */}
        {showTemplates && (
          <div style={{
            position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.4)',
            backdropFilter: 'blur(8px)', zIndex: 99999,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 24, animation: 'fadeIn 0.2s ease',
          }}>
            <style>{`
              @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
              @keyframes modalScale { from { transform: scale(0.96); opacity: 0; } to { transform: scale(1); opacity: 1; } }
            `}</style>
            <div style={{
              background: '#fff', borderRadius: 20, width: '100%', maxWidth: 860,
              maxHeight: '85vh', display: 'flex', flexDirection: 'column',
              boxShadow: '0 24px 50px -12px rgba(15,23,42,0.18)',
              animation: 'modalScale 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              overflow: 'hidden', border: '1px solid rgba(15,23,42,0.08)'
            }}>
              {/* Header */}
              <div style={{ padding: '20px 28px', borderBottom: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Sparkles color="#6366F1" size={20} />
                    Plantillas Listas Premium
                  </h2>
                  <p style={{ fontSize: '0.8rem', color: '#64748B', margin: '4px 0 0 0' }}>
                    Selecciona una plantilla de diseño completa. Reemplazará los textos e imágenes con estructuras listas.
                  </p>
                </div>
                <button onClick={() => setShowTemplates(false)} style={{ background: '#F1F5F9', border: 'none', borderRadius: '50%', width: 32, height: 32, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748B', fontWeight: 'bold', fontSize: '0.875rem' }}>✕</button>
              </div>

              {/* Category tabs */}
              <div style={{ display: 'flex', gap: 8, padding: '12px 28px', background: '#F8FAFC', borderBottom: '1px solid #F1F5F9', flexWrap: 'wrap' }}>
                {['Todas', 'Captar Clientes', 'Vender'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    style={{
                      padding: '6px 14px', borderRadius: 20, border: 'none', cursor: 'pointer',
                      fontWeight: 700, fontSize: '0.78rem',
                      background: selectedCategory === cat ? '#6366F1' : 'transparent',
                      color: selectedCategory === cat ? '#fff' : '#64748B',
                      transition: 'all 0.15s'
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Grid List */}
              <div style={{ flex: 1, overflowY: 'auto', padding: '24px 28px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20, position: 'relative' }}>
                
                {/* Visual confirmation dialog */}
                {confirmingTemplate && (
                  <div style={{
                    position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.96)',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    padding: 40, zIndex: 10, animation: 'fadeIn 0.2s ease', textAlign: 'center',
                  }}>
                    <div style={{
                      maxWidth: 420, padding: '32px 24px', background: '#fff', borderRadius: 20,
                      border: '1.5px solid #F1F5F9', boxShadow: '0 10px 30px rgba(15,23,42,0.06)'
                    }}>
                      <div style={{ background: '#EEF2F6', width: 48, height: 48, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                        <Sparkles color="#6366F1" size={24} />
                      </div>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A', margin: '0 0 10px 0' }}>¿Cargar plantilla "{confirmingTemplate.name}"?</h3>
                      <p style={{ fontSize: '0.8rem', color: '#64748B', lineHeight: 1.5, margin: '0 0 24px 0' }}>
                        Esta acción reemplazará todo el contenido y el diseño actual de tu página. Esta operación no se puede deshacer.
                      </p>
                      <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
                        <button
                          onClick={() => setConfirmingTemplate(null)}
                          style={{
                            padding: '10px 20px', borderRadius: 10, border: '1.5px solid #E2E8F0',
                            background: '#fff', color: '#64748B', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer',
                          }}
                        >
                          Cancelar
                        </button>
                        <button
                          onClick={handleConfirmLoad}
                          style={{
                            padding: '10px 22px', borderRadius: 10, border: 'none',
                            background: 'linear-gradient(135deg, #6366F1, #4F46E5)', color: '#fff',
                            fontWeight: 800, fontSize: '0.8rem', cursor: 'pointer',
                            boxShadow: '0 4px 12px rgba(99,102,241,0.2)'
                          }}
                        >
                          Sí, Reemplazar
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {PRESET_TEMPLATES.filter(t => selectedCategory === 'Todas' || t.category === selectedCategory).map(tpl => (
                  <div
                    key={tpl.id}
                    onClick={() => handleLoadTemplate(tpl)}
                    style={{
                      border: '1.5px solid #E2E8F0', borderRadius: 16, padding: 20,
                      cursor: 'pointer', display: 'flex', flexDirection: 'column',
                      transition: 'all 0.2s', position: 'relative', overflow: 'hidden'
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = '#6366F1'
                      e.currentTarget.style.transform = 'translateY(-2px)'
                      e.currentTarget.style.boxShadow = '0 10px 20px -5px rgba(99,102,241,0.1)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = '#E2E8F0'
                      e.currentTarget.style.transform = 'none'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  >
                    <span style={{ position: 'absolute', top: 12, right: 12, fontSize: '0.625rem', fontWeight: 800, background: `${tpl.previewColor}18`, color: tpl.previewColor, padding: '2px 8px', borderRadius: 99 }}>
                      {tpl.category}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                      <div style={{ width: 10, height: 10, borderRadius: '50%', background: tpl.previewColor }} />
                      <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>{tpl.name}</h3>
                    </div>
                    <p style={{ fontSize: '0.78rem', color: '#64748B', lineHeight: 1.4, margin: '0 0 16px 0', flex: 1 }}>{tpl.description}</p>
                    
                    <div style={{ background: '#F8FAFC', borderRadius: 8, padding: '8px 10px', display: 'flex', gap: 4, alignItems: 'center', justifyContent: 'space-between', border: '1px solid #EDF2F7' }}>
                      <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#718096' }}>Estructura</span>
                      <div style={{ display: 'flex', gap: 2 }}>
                        {tpl.site_json.sectionOrder.map(sec => (
                          <span key={sec} style={{ width: 6, height: 6, borderRadius: '50%', background: '#CBD5E1' }} title={sec} />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
