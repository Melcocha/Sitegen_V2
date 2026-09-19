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
import { getSite, updateSiteContent, migrateLocalSiteToRemote, markPublished } from '../lib/websiteService'
import WebsitePreview from '../components/WebsitePreview'
import FloatingWhatsAppButton from '../components/FloatingWhatsAppButton'
import { checkDomainAvailability } from '../lib/domainChecker'
import {
  ArrowLeft, Save, Globe, Eye, EyeOff, Smartphone, Monitor,
  Tablet, CheckCircle2, AlertCircle, Zap, Clock, RotateCcw,
  ExternalLink, Layers, ChevronDown, Sparkles, Undo2, Redo2, Search, X
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
  const [sidebarWidth, setSidebarWidth] = useState(410)
  const [activeMobileTab, setActiveMobileTab] = useState('editor') // 'editor' | 'preview'
  const [saveToast,  setSaveToast]  = useState(false) // floating toast confirmation
  const [showTemplates, setShowTemplates] = useState(false)
  const [showPublishModal, setShowPublishModal] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [isPublishingLoading, setIsPublishingLoading] = useState(false)
  const [publishProgressStep, setPublishProgressStep] = useState(0)
  const [customSubdomain, setCustomSubdomain]   = useState('')
  const [copiedLink, setCopiedLink]             = useState(false)
  const [domainSearchQuery, setDomainSearchQuery] = useState('')
  const [searchingDomain, setSearchingDomain]   = useState(false)
  const [domainResults, setDomainResults]       = useState(null)
  const [selectedDomain, setSelectedDomain]     = useState('')

  const handleSearchDomain = async (queryToSearch) => {
    const term = (queryToSearch || domainSearchQuery || customSubdomain || 'mi-sitio').trim()
    if (!term) return
    setSearchingDomain(true)
    try {
      const res = await checkDomainAvailability(term)
      setDomainResults(res.results || [])
    } catch {
      setDomainResults([])
    } finally {
      setSearchingDomain(false)
    }
  }

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

  // Keyboard shortcut listener (Ctrl+Z, Ctrl+Y, Ctrl+Shift+Z, Escape)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setShowSuccessModal(false)
        setShowPublishModal(false)
        setShowTemplates(false)
        return
      }
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
    if (!siteId) return
    const effectiveUserId = user?.id || 'saasweb_dev_user'

    let isCancelled = false
    setLoading(true)

    // Fail-safe safety timer: if anything hangs, unlock editor after 3 seconds
    const safetyTimer = setTimeout(() => {
      if (!isCancelled) {
        setSite(prev => prev || {
          id: siteId,
          user_id: effectiveUserId,
          name: 'Mi Sitio Web',
          status: 'draft',
          site_json: DEFAULT_SITE_JSON
        })
        setSiteJson(prev => prev || DEFAULT_SITE_JSON)
        setHistory(prev => (prev.length === 0 ? [JSON.parse(JSON.stringify(DEFAULT_SITE_JSON))] : prev))
        setHistoryIdx(prev => (prev === -1 ? 0 : prev))
        setLoading(false)
      }
    }, 3000)

    getSite(siteId, effectiveUserId)
      .then((data) => {
        if (isCancelled) return
        clearTimeout(safetyTimer)
        const initialSite = data || {
          id: siteId,
          user_id: effectiveUserId,
          name: 'Mi Sitio Web',
          status: 'draft',
          site_json: DEFAULT_SITE_JSON
        }
        const initialJson = initialSite.site_json || { ...DEFAULT_SITE_JSON, businessName: initialSite.name }
        setSite(initialSite)
        setSiteJson(initialJson)
        setHistory([JSON.parse(JSON.stringify(initialJson))])
        setHistoryIdx(0)
        const sub = initialSite.subdomain || initialJson.subdomain || (initialJson.businessName || initialSite.name || 'mi-sitio')
          .toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
        setCustomSubdomain(sub)
        setLoading(false)
      })
      .catch((err) => {
        if (isCancelled) return
        clearTimeout(safetyTimer)
        console.warn('[SiteEditorPage] Fallback site initialization:', err)
        const fallback = {
          id: siteId,
          user_id: effectiveUserId,
          name: 'Mi Sitio Web',
          status: 'draft',
          site_json: DEFAULT_SITE_JSON
        }
        setSite(fallback)
        setSiteJson(DEFAULT_SITE_JSON)
        setHistory([JSON.parse(JSON.stringify(DEFAULT_SITE_JSON))])
        setHistoryIdx(0)
        setLoading(false)
      })

    return () => {
      isCancelled = true
      clearTimeout(safetyTimer)
    }
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
      if (obj && typeof obj === 'object') {
        obj[/^\d+$/.test(lastKey) ? Number(lastKey) : lastKey] = value
        // Sync aliases for cross-template compatibility
        if (lastKey === 'day') obj.dateDay = value
        if (lastKey === 'dateDay') obj.day = value
        if (lastKey === 'month') obj.dateMonth = value
        if (lastKey === 'dateMonth') obj.month = value
        if (lastKey === 'description') obj.desc = value
        if (lastKey === 'desc') obj.description = value
      }

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
        if (obj && typeof obj === 'object') {
          obj[/^\d+$/.test(lastKey) ? Number(lastKey) : lastKey] = value
          if (lastKey === 'day') obj.dateDay = value
          if (lastKey === 'dateDay') obj.day = value
          if (lastKey === 'month') obj.dateMonth = value
          if (lastKey === 'dateMonth') obj.month = value
          if (lastKey === 'description') obj.desc = value
          if (lastKey === 'desc') obj.description = value
        }
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

  // ── Publish — handles local-only sites without Supabase Edge Functions ──
  const handlePublish = async () => {
    if (publishing) return
    setPublishing(true)
    try {
      // ── LOCAL MODE: simulate publish without Supabase ──
      if (siteId.startsWith('site-local-')) {
        // Save latest JSON first
        await updateSiteContent(siteId, siteJson)

        // Build local public URL (works without Vercel or Edge Functions)
        const subdomain = customSubdomain || siteId
        const publicUrl = `${window.location.origin}/site/${siteId}`

        // Persist publish status using websiteService (correct localStorage key)
        await markPublished(siteId, { subdomain, publishedUrl: publicUrl })

        setSite(prev => ({ ...prev, status: 'published', vercel_url: publicUrl, subdomain }))
        setIsDirty(false)
        setSaveState('saved')
        setTimeout(() => setSaveState('idle'), 4000)
        return
      }

      // ── REMOTE MODE: use Supabase + Edge Function ──
      let activeSiteId = siteId
      // Save latest JSON first
      await supabase.from('websites').update({ site_json: siteJson, name: siteJson.businessName || site?.name }).eq('id', siteId)

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

  // ── Animated Publish Flow: Domain Modal -> Loading Steps -> Success Modal ──
  const handleStartPublish = async () => {
    setShowPublishModal(false)
    setIsPublishingLoading(true)
    setPublishProgressStep(0)

    setTimeout(() => setPublishProgressStep(1), 700)
    setTimeout(() => setPublishProgressStep(2), 1400)
    setTimeout(() => setPublishProgressStep(3), 2100)

    setTimeout(async () => {
      await handlePublish()
      setIsPublishingLoading(false)
      setShowSuccessModal(true)
    }, 2600)
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
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000000', fontFamily: "'Inter', sans-serif" }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 44, height: 44, borderRadius: '50%', border: '3px solid rgba(255,255,255,0.18)', borderTopColor: '#FFFFFF', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px' }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          <div style={{ fontWeight: 600, color: '#FFFFFF', letterSpacing: '-0.01em', fontSize: '0.95rem' }}>Cargando editor...</div>
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
      <header className="site-editor-header" style={{
        height: 56, background: '#fff', borderBottom: '1px solid #E5E7EB',
        display: 'flex', alignItems: 'center', padding: '0 20px', gap: 12,
        position: 'sticky', top: 0, zIndex: 100, flexShrink: 0,
      }}>
        {/* Back */}
        <Link to="/app/dashboard" style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#6B7280', textDecoration: 'none', fontSize: '0.8125rem', fontWeight: 600, padding: '6px 10px', borderRadius: 8, border: '1px solid #E5E7EB', whiteSpace: 'nowrap' }}>
          <ArrowLeft size={14} /> <span className="site-editor-desktop-label">Panel</span>
        </Link>

        {/* Sidebar toggle — like Figma/Webflow, always visible in toolbar */}
        <button
          className="site-editor-desktop-only"
          onClick={() => {
            setSidebarOpen(o => !o)
            if (activeMobileTab === 'preview') setActiveMobileTab('editor')
          }}
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
          <div style={{ height: 18, width: 1, background: '#E5E7EB' }} className="site-editor-desktop-only" />
          <span style={{ fontWeight: 700, fontSize: '0.9375rem', color: '#111827', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {siteJson.businessName || site.name}
          </span>
          <span style={{ padding: '2px 10px', borderRadius: 999, background: statusStyle.bg, color: statusStyle.color, fontSize: '0.68rem', fontWeight: 800, flexShrink: 0 }}>
            {statusStyle.label}
          </span>
          {saveState === 'error' ? (
            <span title="El guardado local falló" style={{ fontSize: '0.72rem', color: '#DC2626', fontWeight: 700, flexShrink: 0, cursor: 'help' }}>
              ⚠ Error
            </span>
          ) : isDirty && (
            <span style={{ fontSize: '0.72rem', color: '#F59E0B', fontWeight: 600, flexShrink: 0 }}>
              • Sin guardar
            </span>
          )}
        </div>

        {/* Undo / Redo buttons */}
        <div className="site-editor-desktop-only" style={{ display: 'flex', background: '#F3F4F6', borderRadius: 9, padding: 3, gap: 2 }}>
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

        <div style={{ height: 18, width: 1, background: '#E5E7EB' }} className="site-editor-desktop-only" />

        {/* Device switcher */}
        <div className="site-editor-desktop-only" style={{ display: 'flex', background: '#F3F4F6', borderRadius: 9, padding: 3, gap: 2 }}>
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

        <div style={{ height: 18, width: 1, background: '#E5E7EB' }} className="site-editor-desktop-only" />

        {/* Version history button */}
        <button
          onClick={() => setShowVersions(v => !v)}
          className="site-editor-desktop-only"
          style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 12px', borderRadius: 8, border: '1px solid #E5E7EB', background: showVersions ? '#F3F4F6' : '#fff', cursor: 'pointer', color: '#6B7280', fontSize: '0.8rem', fontWeight: 600 }}
        >
          <Clock size={14} /> Historial
        </button>

        {/* Live URL */}
        {site.status === 'published' && site.vercel_url && (
          <a href={site.vercel_url} target="_blank" rel="noopener noreferrer" className="site-editor-desktop-only"
            style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 12px', borderRadius: 8, border: '1px solid rgba(16,185,129,0.3)', background: 'rgba(16,185,129,0.08)', color: '#10B981', textDecoration: 'none', fontSize: '0.8rem', fontWeight: 600, whiteSpace: 'nowrap' }}>
            <ExternalLink size={13} /> Ver sitio
          </a>
        )}

        {/* Save button — always clickable */}
        <button
          onClick={handleSave}
          disabled={saving}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '7px 14px', borderRadius: 8, border: 'none', cursor: saving ? 'default' : 'pointer',
            background: saveState === 'saved' ? '#10B981' : (isDirty ? '#F0FDF4' : '#F3F4F6'),
            color: saveState === 'saved' ? '#fff' : (isDirty ? '#10B981' : '#9CA3AF'),
            fontWeight: 700, fontSize: '0.8125rem', transition: 'all 0.2s', flexShrink: 0,
            border: `1px solid ${isDirty ? 'rgba(16,185,129,0.3)' : '#E5E7EB'}`,
          }}
        >
          {saveState === 'saved' ? <><CheckCircle2 size={14} /> <span className="site-editor-desktop-label">Guardado</span></> : <><Save size={14} /> <span>{saving ? '...' : 'Guardar'}</span></>}
        </button>

        {/* Publish & Domain button */}
        <button
          onClick={() => setShowPublishModal(true)}
          disabled={publishing}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '7px 16px', borderRadius: 8, border: 'none', cursor: publishing ? 'wait' : 'pointer',
            background: publishing ? 'rgba(0,200,150,0.5)' : 'linear-gradient(135deg, #00C896, #00A87A)',
            color: '#fff', fontWeight: 700, fontSize: '0.875rem', flexShrink: 0,
            boxShadow: '0 2px 8px rgba(0,200,150,0.35)',
            transition: 'all 0.2s',
          }}
        >
          {publishing
            ? <><div style={{ width: 12, height: 12, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.5)', borderTopColor: '#fff', animation: 'spin 0.8s linear infinite' }} /> <span className="site-editor-desktop-label">Publicando...</span></>
            : <><Globe size={14} /> <span>Dominio & Publicar</span></>
          }
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </button>
      </header>

      {/* ── MOBILE TAB SWITCHER BAR ── */}
      <div className="site-editor-mobile-tabbar">
        <button
          type="button"
          onClick={() => { setActiveMobileTab('editor'); setSidebarOpen(true); }}
          className={`site-editor-mobile-tab ${activeMobileTab === 'editor' ? 'active' : ''}`}
        >
          📝 Contenido
        </button>
        <button
          type="button"
          onClick={() => setActiveMobileTab('preview')}
          className={`site-editor-mobile-tab ${activeMobileTab === 'preview' ? 'active' : ''}`}
        >
          👁️ Vista Previa
        </button>
      </div>

      {/* ── EDITOR + PREVIEW BODY ── */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden', position: 'relative' }}>

        {/* LEFT PANEL — collapsible sidebar */}
        <div
          className={`site-editor-sidebar ${activeMobileTab === 'editor' ? 'mobile-active' : 'mobile-hidden'}`}
          style={{
            width: sidebarOpen ? sidebarWidth : 0,
            flexShrink: 0,
            background: '#fff',
            borderRight: sidebarOpen ? '1px solid #E5E7EB' : 'none',
            overflowY: sidebarOpen ? 'auto' : 'hidden',
            display: 'flex', flexDirection: 'column',
            transition: 'width .22s cubic-bezier(.4,0,.2,1)',
            position: 'relative',
          }}
        >
          {sidebarOpen && (
            <>
              {/* Panel header */}
              <div style={{ padding: '12px 18px', borderBottom: '1px solid #E5E7EB', background: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#334155', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Diseño y Contenido</div>
                <button
                  type="button"
                  onClick={() => setSidebarWidth(w => w === 410 ? 500 : 410)}
                  title={sidebarWidth === 410 ? "Expandir barra a 500px para más espacio" : "Volver a 410px"}
                  style={{
                    border: '1px solid #CBD5E1',
                    background: '#FFFFFF',
                    borderRadius: 6,
                    padding: '3px 9px',
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    color: '#475569',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    transition: 'all 0.15s ease'
                  }}
                >
                  <span>{sidebarWidth === 410 ? '↔️ Expandir' : '➡️ 410px'}</span>
                </button>
              </div>
              <div style={{ flex: 1, overflowY: 'auto' }}>
                <WebsiteEditor
                  websiteData={siteJson}
                  onChange={handleChange}
                  onSectionFocus={(secId) => {
                    const map = {
                      hero: ['wp-hero', 'wp-afiche-hero', 'inicio'],
                      welcome: ['wp-welcome', 'wp-vision', 'welcome'],
                      visit: ['wp-plan-visit', 'visita', 'horarios'],
                      values: ['wp-values', 'valores'],
                      ministries: ['wp-ministerios', 'wp-ministries', 'ministerios'],
                      nextSteps: ['wp-next-steps', 'wp-next-steps-split', 'pasos'],
                      sermons: ['wp-sermons', 'sermones'],
                      events: ['wp-events', 'wp-eventos', 'eventos', 'calendario'],
                      donation: ['wp-donations', 'wp-donation', 'ofrendas'],
                      prayer: ['wp-prayer', 'oracion'],
                      about: ['wp-about', 'wp-nosotros', 'nosotros'],
                      contact: ['wp-contact', 'contacto'],
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
        <div
          className={`site-editor-preview ${activeMobileTab === 'preview' ? 'mobile-active' : 'mobile-hidden'}`}
          style={{
            flex: 1, height: '100%', overflow: 'hidden',
            background: '#E5E7EB',
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            padding: '16px',
            gap: 10,
            boxSizing: 'border-box'
          }}
        >
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
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.72rem', fontWeight: 700, color: '#6B7280', letterSpacing: '0.04em', textTransform: 'uppercase', flexShrink: 0 }}>
            {currentDevice.icon} {currentDevice.label} — Vista previa en tiempo real
          </div>

          {/* Preview frame wrapper with WhatsApp anchored strictly inside */}
          <div style={{
            width: device === 'desktop' ? '100%' : currentDevice.width,
            maxWidth: '100%',
            flex: 1,
            height: '100%',
            minHeight: 0,
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            borderRadius: 12,
            boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
            background: '#fff',
            transition: 'width 0.22s cubic-bezier(.4,0,.2,1)',
          }}>
            <div style={{
              width: '100%',
              height: '100%',
              overflowY: 'auto',
              position: 'relative',
            }}>
              <WebsitePreview
                data={siteJson}
                editMode={true}
                device={device}
                activeField={quickEdit?.field}
                onElementClick={(target) => setQuickEdit(target)}
                onSectionChange={handleQuickUpdate}
                onQuickUpdate={handleQuickUpdate}
                onQuickUpdateBatch={handleQuickUpdateBatch}
                hideFloatingWhatsApp={true}
              />
            </div>

            {/* Always pinned strictly INSIDE the device canvas frame */}
            <FloatingWhatsAppButton
              data={siteJson}
              editMode={true}
              contained={true}
              onElementClick={(target) => setQuickEdit(target)}
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
                {['Todas', 'Iglesias', 'Captar Clientes', 'Vender'].map(cat => (
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
      <style>{`
        .site-editor-mobile-tabbar {
          display: none;
        }
        @media (max-width: 768px) {
          .site-editor-header {
            padding: 0 10px !important;
            gap: 6px !important;
            height: 52px !important;
          }
          .site-editor-desktop-only {
            display: none !important;
          }
          .site-editor-desktop-label {
            display: none !important;
          }
          .site-editor-mobile-tabbar {
            display: flex !important;
            background: #FFFFFF;
            border-bottom: 1px solid #E5E7EB;
            padding: 6px 10px;
            gap: 8px;
            position: relative;
            z-index: 90;
          }
          .site-editor-mobile-tab {
            flex: 1;
            padding: 8px 12px;
            border-radius: 8px;
            border: 1.5px solid #E5E7EB;
            background: #F9FAFB;
            color: #4B5563;
            font-weight: 700;
            font-size: 0.8125rem;
            cursor: pointer;
            text-align: center;
            transition: all 0.15s ease;
          }
          .site-editor-mobile-tab.active {
            background: #00C896 !important;
            color: #FFFFFF !important;
            border-color: #00A87A !important;
            box-shadow: 0 2px 8px rgba(0, 200, 150, 0.25);
          }
          .site-editor-sidebar {
            width: 100% !important;
            border-right: none !important;
          }
          .site-editor-sidebar.mobile-hidden {
            display: none !important;
          }
          .site-editor-sidebar.mobile-active {
            display: flex !important;
            width: 100% !important;
            flex: 1 !important;
          }
          .site-editor-preview {
            width: 100% !important;
          }
          .site-editor-preview.mobile-hidden {
            display: none !important;
          }
          .site-editor-preview.mobile-active {
            display: flex !important;
            width: 100% !important;
            flex: 1 !important;
            padding: 8px !important;
          }
        }
      `}</style>

      {/* ── MODAL: ELEGIR DOMINIO & PUBLICAR ── */}
      {showPublishModal && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowPublishModal(false)
          }}
          style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(15,23,42,0.7)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}
        >
          <div style={{ background: '#FFFFFF', borderRadius: 20, width: '100%', maxWidth: 720, padding: '28px 36px', boxShadow: '0 25px 60px rgba(0,0,0,0.3)', border: '1px solid #E2E8F0', position: 'relative' }}>
            <button onClick={() => setShowPublishModal(false)} style={{ position: 'absolute', top: 18, right: 18, background: '#F1F5F9', border: 'none', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748B', cursor: 'pointer' }}>
              <X size={18} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: '#ECFDF5', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900 }}>
                <Globe size={22} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>Dominio & Publicación</h3>
                <span style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 500 }}>Configura la dirección web de tu sitio</span>
              </div>
            </div>

            <div style={{ height: 1, background: '#F1F5F9', margin: '16px 0 20px' }} />

            {/* Subdomain Input */}
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#334155', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>
                Subdominio Gratuito
              </label>
              <div style={{ display: 'flex', alignItems: 'center', background: '#F8FAFC', border: '1.5px solid #CBD5E1', borderRadius: 10, overflow: 'hidden', padding: '0 14px' }}>
                <input
                  type="text"
                  value={customSubdomain}
                  onChange={(e) => {
                    const slug = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '')
                    setCustomSubdomain(slug)
                    setDomainSearchQuery(slug)
                    setSiteJson(prev => ({ ...prev, subdomain: slug }))
                    setIsDirty(true)
                  }}
                  placeholder="iglesiadebo"
                  style={{ flex: 1, border: 'none', background: 'transparent', padding: '12px 0', fontSize: '0.95rem', fontWeight: 700, color: '#0F172A', outline: 'none' }}
                />
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#64748B' }}>.saasweb.app</span>
              </div>
              <div style={{ fontSize: '0.78rem', color: '#64748B', marginTop: 8 }}>
                🌐 Dirección web gratuita: <strong style={{ color: '#0284C7' }}>https://{customSubdomain || 'tu-sitio'}.saasweb.app</strong>
              </div>
            </div>

            {/* Interactive Custom Domain Search (Demo) */}
            <div style={{ background: '#F8FAFC', borderRadius: 14, padding: '18px 20px', marginBottom: 24, border: '1.5px solid #E2E8F0' }}>
              <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#0F172A', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                <Sparkles size={16} color="#F59E0B" /> Buscar Dominio Personalizado (.com, .org, .sv)
              </div>
              <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <Search size={16} style={{ position: 'absolute', left: 12, color: '#94A3B8' }} />
                  <input
                    type="text"
                    value={domainSearchQuery || customSubdomain}
                    onChange={(e) => setDomainSearchQuery(e.target.value)}
                    placeholder="Ej: iglesiadebo.com"
                    style={{ width: '100%', padding: '10px 12px 10px 36px', borderRadius: 8, border: '1px solid #CBD5E1', fontSize: '0.875rem', outline: 'none', fontWeight: 600 }}
                  />
                </div>
                <button
                  onClick={() => handleSearchDomain(domainSearchQuery || customSubdomain)}
                  disabled={searchingDomain}
                  style={{ padding: '10px 16px', borderRadius: 8, border: 'none', background: '#0F172A', color: '#FFF', fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer', whiteSpace: 'nowrap' }}
                >
                  {searchingDomain ? 'Buscando...' : '🔍 Buscar'}
                </button>
              </div>

              {/* Domain Search Results */}
              {domainResults && domainResults.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12, maxH: 180, overflowY: 'auto' }}>
                  {domainResults.map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        setSelectedDomain(item.domain)
                        setCustomSubdomain(item.domain.split('.')[0])
                        setSiteJson(prev => ({ ...prev, subdomain: item.domain.split('.')[0], customDomain: item.domain }))
                        setIsDirty(true)
                      }}
                      style={{
                        padding: '10px 14px', borderRadius: 8,
                        background: selectedDomain === item.domain ? '#EEF2FF' : '#FFFFFF',
                        border: selectedDomain === item.domain ? '2px solid #6366F1' : '1px solid #E2E8F0',
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        cursor: 'pointer', transition: 'all 0.15s'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0F172A' }}>{item.domain}</span>
                        {item.available ? (
                          <span style={{ fontSize: '0.7rem', fontWeight: 800, background: '#DCFCE7', color: '#15803D', padding: '2px 8px', borderRadius: 999 }}>
                            🟢 Disponible ({item.price})
                          </span>
                        ) : (
                          <span style={{ fontSize: '0.7rem', fontWeight: 800, background: '#FEE2E2', color: '#B91C1C', padding: '2px 8px', borderRadius: 999 }}>
                            🔴 Ocupado
                          </span>
                        )}
                      </div>
                      <button style={{ padding: '4px 10px', borderRadius: 6, border: 'none', background: selectedDomain === item.domain ? '#4F46E5' : '#F1F5F9', color: selectedDomain === item.domain ? '#FFF' : '#334155', fontSize: '0.72rem', fontWeight: 800 }}>
                        {selectedDomain === item.domain ? '✓ Seleccionado' : 'Seleccionar'}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 12 }}>
              <button onClick={() => setShowPublishModal(false)} style={{ padding: '10px 18px', borderRadius: 10, border: '1px solid #CBD5E1', background: '#FFF', color: '#475569', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}>
                Cancelar
              </button>
              <button
                onClick={handleStartPublish}
                disabled={publishing || isPublishingLoading}
                style={{ padding: '11px 24px', borderRadius: 10, border: 'none', background: 'linear-gradient(135deg, #00C896, #00A87A)', color: '#FFF', fontWeight: 800, fontSize: '0.9rem', cursor: (publishing || isPublishingLoading) ? 'wait' : 'pointer', display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 4px 14px rgba(0,200,150,0.35)' }}
              >
                <Sparkles size={16} /> 🚀 Publicar Sitio Ahora
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL DE PROCESO DE PUBLICACIÓN (TIEMPO DE ESPERA) ── */}
      {isPublishingLoading && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 10000, background: 'rgba(15,23,42,0.75)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div style={{ background: '#FFFFFF', borderRadius: 24, width: 440, maxWidth: '92vw', padding: '36px 30px', boxShadow: '0 25px 50px rgba(0,0,0,0.3)', textAlign: 'center', border: '1px solid #E2E8F0' }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(0,200,150,0.12)', border: '3px solid #00C896', borderTopColor: 'transparent', margin: '0 auto 20px', animation: 'spin 0.9s linear infinite' }} />

            <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0F172A', marginBottom: 6, letterSpacing: '-0.02em' }}>
              Publicando tu sitio web...
            </h3>
            <p style={{ fontSize: '0.84rem', color: '#64748B', marginBottom: 20 }}>
              Por favor espera unos segundos mientras preparamos tu sitio en línea.
            </p>

            {/* Progress Bar */}
            <div style={{ height: 6, background: '#E2E8F0', borderRadius: 999, overflow: 'hidden', marginBottom: 14 }}>
              <div
                style={{
                  height: '100%',
                  background: 'linear-gradient(90deg, #00C896, #00A87A)',
                  borderRadius: 999,
                  width: publishProgressStep === 0 ? '25%' : publishProgressStep === 1 ? '55%' : publishProgressStep === 2 ? '85%' : '100%',
                  transition: 'width 0.6s ease'
                }}
              />
            </div>

            {/* Step label */}
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#00A87A', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              <Sparkles size={14} />
              <span>
                {publishProgressStep === 0 && 'Configurando subdominio y certificados SSL...'}
                {publishProgressStep === 1 && 'Compilando componentes y optimizando diseño...'}
                {publishProgressStep === 2 && 'Sincronizando con la red CDN global...'}
                {publishProgressStep === 3 && '¡Sitio publicado con éxito!'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL DEDICADA DE ÉXITO DE PUBLICACIÓN ── */}
      {showSuccessModal && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowSuccessModal(false)
          }}
          style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.65)', backdropFilter: 'blur(8px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}
        >
          <div style={{ background: '#FFFFFF', borderRadius: 24, width: 520, maxWidth: '95vw', padding: '36px 32px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', border: '1px solid #E2E8F0', textAlign: 'center', position: 'relative' }}>
            <button onClick={() => setShowSuccessModal(false)} style={{ position: 'absolute', top: 18, right: 18, border: 'none', background: '#F1F5F9', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748B', cursor: 'pointer' }}>
              <X size={18} />
            </button>

            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'linear-gradient(135deg, #10B981, #059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', boxShadow: '0 10px 25px rgba(16,185,129,0.35)' }}>
              <CheckCircle2 size={36} color="#FFF" />
            </div>

            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#0F172A', marginBottom: 6, letterSpacing: '-0.02em' }}>
              ¡Tu Sitio Web está Publicado!
            </h2>
            <p style={{ fontSize: '0.88rem', color: '#64748B', marginBottom: 24, lineHeight: 1.5 }}>
              Tu página ya se encuentra en línea y lista para recibir visitantes.
            </p>

            {/* Link Box */}
            <div style={{ background: '#F8FAFC', border: '1.5px solid #E2E8F0', borderRadius: 14, padding: '16px 20px', marginBottom: 24, textAlign: 'left' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>
                Dirección Web En Línea
              </div>
              <a
                href={site?.vercel_url || `${window.location.origin}/site/${siteId}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: '1rem', fontWeight: 800, color: '#00A87A', textDecoration: 'underline', wordBreak: 'break-all', display: 'inline-flex', alignItems: 'center', gap: 6 }}
              >
                {site?.vercel_url || `${window.location.origin}/site/${siteId}`}
                <ExternalLink size={15} />
              </a>
            </div>

            {/* Action Buttons Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
              <a
                href={site?.vercel_url || `${window.location.origin}/site/${siteId}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, height: 44, borderRadius: 12, background: 'linear-gradient(135deg, #00C896, #00A87A)', color: '#FFF', textDecoration: 'none', fontWeight: 800, fontSize: '0.86rem', boxShadow: '0 4px 14px rgba(0,200,150,0.3)' }}
              >
                <ExternalLink size={15} /> Ver Sitio en Vivo
              </a>

              <button
                onClick={() => {
                  setShowSuccessModal(false)
                  navigate('/app/dashboard')
                }}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, height: 44, borderRadius: 12, background: '#0F172A', color: '#FFF', border: 'none', fontWeight: 800, fontSize: '0.86rem', cursor: 'pointer' }}
              >
                📊 Ir al Dashboard
              </button>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(site?.vercel_url || `${window.location.origin}/site/${siteId}`)
                  setCopiedLink(true)
                  setTimeout(() => setCopiedLink(false), 2000)
                }}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, height: 40, borderRadius: 10, border: '1px solid #CBD5E1', background: '#F8FAFC', color: '#334155', fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer' }}
              >
                {copiedLink ? '✓ Enlace Copiado' : '📋 Copiar Enlace'}
              </button>

              <button
                onClick={() => setShowSuccessModal(false)}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, height: 40, borderRadius: 10, border: '1px solid #CBD5E1', background: '#FFF', color: '#64748B', fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer' }}
              >
                ✏️ Seguir Editando
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
