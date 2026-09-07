/**
 * NewSitePage — /app/new
 * AI Generator integrado para usuarios logueados.
 * Genera el sitio y lo guarda directo a Supabase → redirige al editor.
 */
import { useState, useRef, useEffect, useCallback } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { generateWebsiteJSON } from '../lib/aiGenerator'
import { saveSite, checkSiteLimit } from '../lib/websiteService'
import { fetchSubscription } from '../lib/paymentService'
import WebsitePreview from '../components/WebsitePreview'
import { useVoiceToText } from '../hooks/useVoiceToText'
import {
  Sparkles, ArrowLeft, RefreshCw, AlertCircle,
  CheckCircle2, Save, Zap, Mic, MicOff, Volume2
} from 'lucide-react'

const EXAMPLES = [
  { label: 'Iglesia', text: 'Iglesia Cristiana con horarios dominicales, prédicas recientes y ministerios para toda la familia' },
]

// Extract first http/https URL from any text
function extractUrl(text) {
  const m = text.match(/https?:\/\/[^\s]+/i)
  return m ? m[0].replace(/[.,;!?'"]+$/, '') : ''
}

function LoadingSteps({ hasUrl }) {
  const [step, setStep] = useState(0)
  const steps = hasUrl
    ? ['Leyendo tu sitio web actual...', 'Extrayendo info del negocio...', 'Generando versión moderna...', 'Aplicando diseño profesional...']
    : ['Analizando tu negocio...', 'Generando contenido con IA...', 'Aplicando diseño profesional...', 'Preparando tu sitio...']
  useEffect(() => {
    const iv = setInterval(() => setStep(s => Math.min(s + 1, steps.length - 1)), 900)
    return () => clearInterval(iv)
  }, [])
  return (
    <div style={{ marginTop: 16 }}>
      <div style={{ height: 4, background: '#E5E7EB', borderRadius: 999, overflow: 'hidden', marginBottom: 10 }}>
        <div style={{ height: '100%', background: 'linear-gradient(90deg,#00C896,#00A87A)', borderRadius: 999, width: `${((step + 1) / steps.length) * 100}%`, transition: 'width 0.8s ease' }} />
      </div>
      <p style={{ fontSize: '0.8125rem', color: '#6B7280', textAlign: 'center', fontWeight: 500 }}>{steps[step]}</p>
    </div>
  )
}

export default function NewSitePage() {
  const { user, profile } = useAuth()
  const navigate = useNavigate()

  const [prompt,       setPrompt]       = useState('')
  const [detectedUrl,  setDetectedUrl]  = useState('')
  const [generating,   setGenerating]   = useState(false)
  const [saving,       setSaving]       = useState(false)
  const [siteJson,     setSiteJson]     = useState(null)
  const [error,        setError]        = useState('')
  const [limitInfo,    setLimitInfo]    = useState(null)
  const textareaRef = useRef(null)
  const previewRef  = useRef(null)
  const basePromptRef = useRef('')

  // Check plan limit on mount
  useEffect(() => {
    if (!user?.id) return
    const plan = profile?.current_plan || 'free'
    import('../lib/websiteService').then(({ checkSiteLimit }) => {
      checkSiteLimit(user.id, plan).then(info => setLimitInfo(info))
    })
  }, [user?.id, profile?.current_plan])

  // Voice to text integration
  const handleVoiceTranscript = useCallback((spokenText, isFinal) => {
    const base = basePromptRef.current ? basePromptRef.current.trim() : ''
    const combined = base ? `${base} ${spokenText}` : spokenText
    const clamped = combined.slice(0, 500)
    setPrompt(clamped)
    setDetectedUrl(extractUrl(clamped))
    if (isFinal) {
      basePromptRef.current = clamped
    }
  }, [])

  const {
    isListening,
    isSupported: isVoiceSupported,
    voiceError,
    toggleListening,
    stopListening,
    setVoiceError
  } = useVoiceToText({
    onTranscript: handleVoiceTranscript,
    lang: 'es-ES'
  })

  const handleToggleVoice = () => {
    if (!isListening) {
      basePromptRef.current = prompt
    }
    toggleListening()
  }

  const handleGenerate = async () => {
    if (isListening) stopListening()
    if (!prompt.trim() || generating) return
    setGenerating(true)
    setError('')
    setSiteJson(null)
    try {
      const url = detectedUrl || extractUrl(prompt)
      const data = await generateWebsiteJSON(prompt, url)
      setSiteJson(data)
      setTimeout(() => previewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 150)
    } catch {
      setError('Error al generar. Intenta de nuevo.')
    } finally {
      setGenerating(false)
    }
  }

  const handleSave = async () => {
    if (!siteJson || saving) return
    setSaving(true)
    setError('')
    try {
      const plan = profile?.current_plan || 'free'
      const { allowed, current, limit } = await checkSiteLimit(user.id, plan)
      if (!allowed) {
        setError(`Tu plan ${plan.toUpperCase()} permite ${limit === 0 ? 'guardar 0 sitios (solo preview)' : `${limit} sitios — ya tienes ${current}`}. Mejora tu plan.`)
        setSaving(false)
        return
      }
      const site = await saveSite({
        userId:   user.id,
        name:     siteJson.businessName || 'Mi Sitio',
        prompt,
        siteJson,
        industry: siteJson.industry,
      })
      navigate(`/app/editor/${site.id}`)
    } catch (e) {
      setError('Error al guardar: ' + e.message)
      setSaving(false)
    }
  }

  const planKey = profile?.current_plan || 'free'
  const blocked = limitInfo && !limitInfo.allowed

  return (
    <div style={{ minHeight: '100vh', background: '#F9FAFB', fontFamily: "'Inter', sans-serif" }}>

      {/* Top bar */}
      <header className="new-site-header" style={{ background: '#ffffff', borderBottom: '1px solid #E5E7EB', height: 56, display: 'flex', alignItems: 'center', gap: 16, position: 'sticky', top: 0, zIndex: 40 }}>
        <Link to="/app/dashboard" style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#6B7280', textDecoration: 'none', fontSize: '0.8125rem', fontWeight: 600, padding: '6px 12px', borderRadius: 8, border: '1px solid #E5E7EB', background: '#ffffff' }}>
          <ArrowLeft size={14} /> Mis sitios
        </Link>
        <div className="topbar-divider" style={{ height: 18, width: 1, minWidth: 1, maxWidth: 1, background: '#E5E7EB', padding: 0, margin: 0, flexShrink: 0 }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: 'linear-gradient(135deg,#00C896,#00A87A)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Sparkles size={14} color="#fff" />
          </div>
          <span style={{ fontWeight: 700, fontSize: '0.9375rem', color: '#111827' }}>Crear nuevo sitio con IA</span>
        </div>
      </header>

      <div className="new-site-container" style={{ maxWidth: siteJson ? '1560px' : '840px', width: '100%', margin: '0 auto', transition: 'max-width 0.4s ease' }}>

        {/* Plan limit warning */}
        {blocked && (
          <div style={{ maxWidth: 840, margin: '0 auto 28px', padding: '16px 20px', background: '#FEF3C7', border: '1.5px solid #F59E0B', borderRadius: 14, display: 'flex', alignItems: 'center', gap: 12 }}>
            <AlertCircle size={20} color="#D97706" />
            <div>
              <div style={{ fontWeight: 700, color: '#92400E', marginBottom: 2 }}>Límite de sitios alcanzado</div>
              <div style={{ fontSize: '0.8125rem', color: '#B45309' }}>
                Tu plan <strong>{planKey.toUpperCase()}</strong> permite {limitInfo?.limit === 0 ? 'solo preview (sin guardar)' : `${limitInfo?.limit} sitios`}.
                {' '}<Link to="/app/dashboard" onClick={() => {}} style={{ color: '#D97706', fontWeight: 700 }}>Mejora tu plan →</Link>
              </div>
            </div>
          </div>
        )}

        {/* Generator card */}
        <div className="new-site-card" style={{ maxWidth: 840, margin: '0 auto 32px', background: '#fff', border: '1.5px solid #E5E7EB', borderRadius: 20, boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>

          {/* Header */}
          <div className="new-site-card-header" style={{ marginBottom: 28, textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 14px', background: 'rgba(0,200,150,0.08)', border: '1px solid rgba(0,200,150,0.2)', borderRadius: 999, fontSize: '0.75rem', fontWeight: 700, color: '#00A87A', marginBottom: 14, whiteSpace: 'nowrap', flexShrink: 0 }}>
              <Zap size={12} /> Generación con IA — Listo en segundos
            </div>
            <h1 style={{ fontSize: 'clamp(1.35rem, 5vw, 1.75rem)', fontWeight: 900, color: '#111827', letterSpacing: '-0.03em', marginBottom: 8, lineHeight: 1.25 }}>
              ¿Cuál es tu negocio?
            </h1>
            <p style={{ color: '#6B7280', fontSize: '0.9375rem', lineHeight: 1.6 }}>
              Describe tu empresa en lenguaje natural o habla por tu micrófono. La IA generará un sitio web profesional completo.
            </p>
          </div>

          {/* Textarea */}
          <div style={{ marginBottom: 14 }}>
            <div className="new-site-label-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, flexWrap: 'wrap', gap: 10 }}>
              <label style={{ fontWeight: 700, fontSize: '0.875rem', color: '#374151' }}>Describe tu negocio</label>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                {isVoiceSupported && (
                  <button
                    type="button"
                    className="new-site-voice-btn" onClick={handleToggleVoice}
                    title={isListening ? 'Detener dictado por voz' : 'Dictar por voz usando tu micrófono'}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      padding: '5px 13px',
                      borderRadius: 999,
                      border: `1.5px solid ${isListening ? '#EF4444' : '#00C896'}`,
                      background: isListening ? '#FEF2F2' : 'rgba(0,200,150,0.08)',
                      color: isListening ? '#DC2626' : '#00A87A',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: isListening ? '0 0 0 3px rgba(239,68,68,0.18)' : 'none',
                      animation: isListening ? 'voicePulse 1.5s infinite' : 'none'
                    }}
                  >
                    {isListening ? (
                      <>
                        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#EF4444', display: 'inline-block', animation: 'voicePing 1s infinite' }} />
                        <Mic size={13} color="#DC2626" />
                        <span>Escuchando... (clic para parar)</span>
                      </>
                    ) : (
                      <>
                        <Mic size={13} color="#00A87A" />
                        <span>Dictar por voz</span>
                      </>
                    )}
                  </button>
                )}
                <span style={{ fontSize: '0.72rem', color: '#9CA3AF' }}>{prompt.length}/500</span>
              </div>
            </div>

            <div style={{ position: 'relative' }}>
              <textarea
                ref={textareaRef}
                className="new-site-textarea"
                value={prompt}
                onChange={e => {
                  setPrompt(e.target.value)
                  basePromptRef.current = e.target.value
                  setDetectedUrl(extractUrl(e.target.value))
                }}
                onKeyDown={e => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleGenerate() }}
                placeholder='Ej: "Iglesia Cristiana Vida Nueva con horarios dominicales, prédicas y ministerios..." o presiona "Dictar por voz" 🎙️'
                maxLength={500}
                rows={3}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  border: `1.5px solid ${isListening ? '#EF4444' : detectedUrl ? '#00C896' : '#E5E7EB'}`,
                  borderRadius: 12,
                  fontSize: '0.9375rem',
                  fontFamily: "'Inter', sans-serif",
                  resize: 'none',
                  outline: 'none',
                  lineHeight: 1.65,
                  boxSizing: 'border-box',
                  transition: 'all 0.15s',
                  color: '#111827',
                  boxShadow: isListening ? '0 0 0 4px rgba(239,68,68,0.1)' : 'none'
                }}
                onFocus={e => { if (!isListening) e.target.style.borderColor = '#00C896' }}
                onBlur={e => { if (!isListening) e.target.style.borderColor = detectedUrl ? '#00C896' : '#E5E7EB' }}
              />

              {isListening && (
                <div style={{
                  position: 'absolute',
                  bottom: 12,
                  right: 12,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  background: 'rgba(239,68,68,0.92)',
                  color: '#fff',
                  padding: '4px 10px',
                  borderRadius: 999,
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  backdropFilter: 'blur(4px)',
                  boxShadow: '0 2px 8px rgba(239,68,68,0.3)',
                  pointerEvents: 'none'
                }}>
                  <Volume2 size={12} />
                  <span>Micrófono activo</span>
                </div>
              )}
            </div>

            {voiceError && (
              <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6, padding: '8px 12px', background: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: 8, fontSize: '0.78rem', color: '#B91C1C' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <AlertCircle size={14} color="#DC2626" />
                  <span>{voiceError}</span>
                </div>
                <button type="button" onClick={() => setVoiceError('')} style={{ border: 'none', background: 'transparent', color: '#991B1B', cursor: 'pointer', fontWeight: 800, fontSize: '0.8rem' }}>✕</button>
              </div>
            )}

            {isListening && (
              <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, padding: '8px 12px', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 8, fontSize: '0.78rem', color: '#991B1B' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#EF4444', display: 'inline-block', animation: 'voicePing 1s infinite' }} />
                  <span>Habla claro hacia tu micrófono. Lo que digas se escribirá en tiempo real.</span>
                </div>
                <button
                  type="button"
                  onClick={stopListening}
                  style={{ border: 'none', background: '#DC2626', color: '#fff', borderRadius: 6, padding: '3px 8px', fontSize: '0.72rem', fontWeight: 700, cursor: 'pointer' }}
                >
                  Detener
                </button>
              </div>
            )}

            {detectedUrl && (
              <div style={{ marginTop: 6, display: 'flex', alignItems: 'center', gap: 6, padding: '5px 10px', background: 'rgba(0,200,150,0.08)', border: '1px solid rgba(0,200,150,0.25)', borderRadius: 8, fontSize: '0.75rem', color: '#00A87A', fontWeight: 600 }}>
                <span>🔗</span>
                <span>URL detectada — leeré el sitio para crear tu versión mejorada:</span>
                <span style={{ color: '#374151', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 200 }}>{detectedUrl}</span>
              </div>
            )}
          </div>

          {/* Examples */}
          <div style={{ marginBottom: 20, display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Ejemplo rápido:</span>
            {EXAMPLES.map(ex => (
              <button key={ex.label} onClick={() => { setPrompt(ex.text); basePromptRef.current = ex.text; textareaRef.current?.focus() }}
                style={{ padding: '6px 14px', borderRadius: 999, border: '1.5px solid #00C896', background: 'rgba(0,200,150,0.08)', fontSize: '0.8125rem', fontWeight: 700, cursor: 'pointer', color: '#00A87A', fontFamily: 'inherit', transition: 'all 0.15s', display: 'inline-flex', alignItems: 'center', gap: 6 }}
                onMouseEnter={e => { e.currentTarget.style.background = '#00C896'; e.currentTarget.style.color = '#fff' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,200,150,0.08)'; e.currentTarget.style.color = '#00A87A' }}
              >
                <span>⛪</span> {ex.label}
              </button>
            ))}
          </div>

          {/* Error */}
          {error && (
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 16, padding: '12px 16px', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 10, color: '#DC2626', fontSize: '0.875rem' }}>
              <AlertCircle size={15} style={{ flexShrink: 0, marginTop: 1 }} />{error}
            </div>
          )}

          {/* Generate button */}
          <button
            onClick={handleGenerate}
            disabled={!prompt.trim() || generating}
            className="new-site-gen-btn"
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '14px 20px', background: (!prompt.trim() || generating) ? 'rgba(0,200,150,0.4)' : 'linear-gradient(135deg,#00C896,#00A87A)', border: 'none', borderRadius: 12, color: '#fff', fontWeight: 800, fontSize: '0.95rem', cursor: (!prompt.trim() || generating) ? 'not-allowed' : 'pointer', fontFamily: 'inherit', boxShadow: prompt.trim() ? '0 4px 16px rgba(0,200,150,0.35)' : 'none', transition: 'all 0.2s', whiteSpace: 'normal', textAlign: 'center' }}
          >
            {generating
              ? <><RefreshCw size={17} style={{ animation: 'spin 1s linear infinite' }} /> Generando tu sitio web...</>
              : <><Sparkles size={17} /> Generar sitio web con IA <span style={{ opacity: 0.6, fontSize: '0.78rem', marginLeft: 4 }}>⌘↵</span></>
            }
          </button>
          {generating && <LoadingSteps hasUrl={!!detectedUrl} />}
        </div>

        {/* Preview + Save */}
        {siteJson && (
          <div ref={previewRef}>
            {/* Action & Template Selector Bar */}
            <div style={{ marginBottom: 20, padding: '16px 20px', background: '#FFFFFF', border: '1.5px solid #E5E7EB', borderRadius: 16, boxShadow: '0 4px 20px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', gap: 14 }}>
              
              {/* Row 1: Status + Actions */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, borderBottom: '1px solid #F3F4F6', paddingBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <CheckCircle2 size={18} color="#00A87A" />
                  <span style={{ fontWeight: 800, color: '#111827', fontSize: '0.95rem' }}>
                    Sitio generado — <span style={{ color: '#00A87A' }}>{siteJson.businessName}</span>
                  </span>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={handleGenerate} disabled={generating}
                    style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', background: '#F9FAFB', border: '1.5px solid #E5E7EB', borderRadius: 9, color: '#374151', fontWeight: 700, fontSize: '0.8125rem', cursor: 'pointer', fontFamily: 'inherit' }}>
                    <RefreshCw size={13} /> Regenerar
                  </button>
                  <button onClick={handleSave} disabled={saving || blocked}
                    style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '8px 20px', background: (saving || blocked) ? 'rgba(0,200,150,0.4)' : 'linear-gradient(135deg,#00C896,#00A87A)', border: 'none', borderRadius: 9, color: '#fff', fontWeight: 700, fontSize: '0.875rem', cursor: (saving || blocked) ? 'not-allowed' : 'pointer', fontFamily: 'inherit', boxShadow: '0 2px 8px rgba(0,200,150,0.3)' }}>
                    {saving
                      ? <><div style={{ width: 12, height: 12, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.4)', borderTopColor: '#fff', animation: 'spin 0.8s linear infinite' }} /> Guardando...</>
                      : <><Save size={14} /> Guardar y editar</>
                    }
                  </button>
                </div>
              </div>

              {/* Row 2: Dedicated Template Selector for Churches */}
              {(siteJson.industry?.toLowerCase().includes('iglesi') || siteJson.industry?.toLowerCase().includes('church') || Boolean(siteJson.planAVisit) || Boolean(siteJson.ministries)) && (
                <div>
                  <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span>🎨</span> Elige la plantilla y estilo de tu iglesia (4 Opciones únicas):
                  </div>
                  <div className="template-selector-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
                    <button
                      type="button"
                      onClick={() => setSiteJson(prev => ({
                        ...prev,
                        churchTemplateVariant: 'nucleus',
                        font: 'Playfair Display',
                        primaryColor: '#080A10',
                        accentColor: '#C4A35A',
                      }))}
                      style={{
                        padding: '12px 10px', borderRadius: 10,
                        border: (siteJson.churchTemplateVariant === 'nucleus' || !siteJson.churchTemplateVariant) ? '2px solid #00C896' : '1.5px solid #E5E7EB',
                        background: (siteJson.churchTemplateVariant === 'nucleus' || !siteJson.churchTemplateVariant) ? 'rgba(0,200,150,0.08)' : '#F9FAFB',
                        color: (siteJson.churchTemplateVariant === 'nucleus' || !siteJson.churchTemplateVariant) ? '#00A87A' : '#374151',
                        fontWeight: 800, fontSize: '0.8rem', cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, transition: 'all 0.15s', minHeight: 46, boxSizing: 'border-box'
                      }}
                    >
                      <span>👑</span> 1. Obsidian & Gold
                    </button>

                    <button
                      type="button"
                      onClick={() => setSiteJson(prev => ({
                        ...prev,
                        churchTemplateVariant: 'mygateway',
                        font: 'Plus Jakarta Sans',
                        primaryColor: '#0F172A',
                        accentColor: '#E11D48',
                      }))}
                      style={{
                        padding: '12px 10px', borderRadius: 10,
                        border: siteJson.churchTemplateVariant === 'mygateway' ? '2px solid #00C896' : '1.5px solid #E5E7EB',
                        background: siteJson.churchTemplateVariant === 'mygateway' ? 'rgba(0,200,150,0.08)' : '#F9FAFB',
                        color: siteJson.churchTemplateVariant === 'mygateway' ? '#00A87A' : '#374151',
                        fontWeight: 800, fontSize: '0.8rem', cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, transition: 'all 0.15s', minHeight: 46, boxSizing: 'border-box'
                      }}
                    >
                      <span>🌊</span> 2. Life Moderno
                    </button>

                    <button
                      type="button"
                      onClick={() => setSiteJson(prev => ({
                        ...prev,
                        churchTemplateVariant: 'poster',
                        font: 'Plus Jakarta Sans',
                        primaryColor: '#4F46E5',
                        accentColor: '#10B981',
                      }))}
                      style={{
                        padding: '12px 10px', borderRadius: 10,
                        border: siteJson.churchTemplateVariant === 'poster' ? '2px solid #00C896' : '1.5px solid #E5E7EB',
                        background: siteJson.churchTemplateVariant === 'poster' ? 'rgba(0,200,150,0.08)' : '#F9FAFB',
                        color: siteJson.churchTemplateVariant === 'poster' ? '#00A87A' : '#374151',
                        fontWeight: 800, fontSize: '0.8rem', cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, transition: 'all 0.15s', minHeight: 46, boxSizing: 'border-box'
                      }}
                    >
                      <span>✨</span> 3. Experiencia Simbólica
                    </button>

                    <button
                      type="button"
                      onClick={() => setSiteJson(prev => ({
                        ...prev,
                        churchTemplateVariant: 'afiche',
                        font: 'Syne',
                        primaryColor: '#090B10',
                        accentColor: '#FACC15',
                      }))}
                      style={{
                        padding: '12px 10px', borderRadius: 10,
                        border: siteJson.churchTemplateVariant === 'afiche' ? '2px solid #00C896' : '1.5px solid #E5E7EB',
                        background: siteJson.churchTemplateVariant === 'afiche' ? 'rgba(0,200,150,0.08)' : '#F9FAFB',
                        color: siteJson.churchTemplateVariant === 'afiche' ? '#00A87A' : '#374151',
                        fontWeight: 800, fontSize: '0.8rem', cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, transition: 'all 0.15s', minHeight: 46, boxSizing: 'border-box'
                      }}
                    >
                      <span>🎨</span> 4. Afiche Cinemático
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Preview */}
            <div style={{ borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.1)', border: '1.5px solid #E5E7EB', minWidth: 0, width: '100%' }}>
              <WebsitePreview data={siteJson} />
            </div>
          </div>
        )}
      </div>
      <style>{`
        .new-site-header {
          padding: 0 32px !important;
          background-color: #ffffff !important;
          border-bottom: 1px solid #E5E7EB !important;
        }
        .topbar-divider {
          width: 1px !important;
          min-width: 1px !important;
          max-width: 1px !important;
          height: 18px !important;
          padding: 0 !important;
          margin: 0 !important;
          background-color: #E5E7EB !important;
          flex-shrink: 0 !important;
        }
        .template-selector-grid {
          display: grid !important;
          grid-template-columns: repeat(2, 1fr) !important;
          gap: 8px !important;
        }
        .new-site-container {
          padding: 48px 24px;
        }
        .new-site-card {
          padding: 36px 40px;
        }
        @media (max-width: 640px) {
          .new-site-header {
            padding: 0 14px !important;
          }
          .new-site-container {
            padding: 16px 10px !important;
          }
          .new-site-card {
            padding: 20px 14px !important;
            border-radius: 16px !important;
            border: 1.5px solid #E5E7EB !important;
            box-shadow: 0 2px 10px rgba(0,0,0,0.03) !important;
            margin-bottom: 20px !important;
          }
          .new-site-card-header {
            margin-bottom: 18px !important;
          }
          .new-site-card-header h1 {
            font-size: 1.45rem !important;
            margin-bottom: 6px !important;
          }
          .new-site-card-header p {
            font-size: 0.875rem !important;
            line-height: 1.5 !important;
          }
          .new-site-label-row {
            flex-direction: row !important;
            align-items: center !important;
            justify-content: space-between !important;
            gap: 8px !important;
            margin-bottom: 8px !important;
          }
          .new-site-voice-btn {
            width: auto !important;
            padding: 4px 10px !important;
            font-size: 0.75rem !important;
          }
          .new-site-textarea {
            min-height: 160px !important;
            padding: 16px !important;
            font-size: 0.95rem !important;
            border-radius: 14px !important;
            line-height: 1.6 !important;
          }
          .new-site-gen-btn {
            padding: 15px 18px !important;
            font-size: 0.95rem !important;
            border-radius: 12px !important;
          }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes voicePulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); }
          50% { box-shadow: 0 0 0 6px rgba(239, 68, 68, 0); }
        }
        @keyframes voicePing {
          0% { transform: scale(0.9); opacity: 1; }
          50% { transform: scale(1.3); opacity: 0.7; }
          100% { transform: scale(0.9); opacity: 1; }
        }
      `}</style>
    </div>
  )
}
