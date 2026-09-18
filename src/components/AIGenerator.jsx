import { useState, useRef, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sparkles, Send, RefreshCw, AlertCircle, CheckCircle2, Save, X, LogIn, Mic, MicOff, Volume2 } from 'lucide-react'
import { generateWebsiteJSON } from '../lib/aiGenerator'
import { saveSite, checkSiteLimit } from '../lib/websiteService'
import { useAuth } from '../context/AuthContext'
import { useVoiceToText } from '../hooks/useVoiceToText'
import WebsitePreview from './WebsitePreview'
import WebsiteEditor from './WebsiteEditor'

const PROMPT_EXAMPLES = [
  { label: '⛪ Iglesia', text: 'Iglesia Cristiana con horarios dominicales, prédicas recientes y ministerios para toda la familia' },
]

// ─── Loading steps animation ──────────────────────────────────────
function AILoadingProgress() {
  const [step, setStep] = useState(0)
  const steps = [
    'Analizando tu negocio...',
    'Generando contenido profesional...',
    'Aplicando diseño personalizado...',
    'Preparando vista previa...',
  ]
  useEffect(() => {
    const iv = setInterval(() => setStep(s => s < steps.length - 1 ? s + 1 : s), 700)
    return () => clearInterval(iv)
  }, [])
  return (
    <div style={{ marginTop: 16 }}>
      <div style={{ height: 3, background: 'var(--border)', borderRadius: 999, overflow: 'hidden', marginBottom: 10 }}>
        <div style={{ height: '100%', background: 'var(--brand)', borderRadius: 999, width: `${((step + 1) / steps.length) * 100}%`, transition: 'width 0.6s var(--ease)' }} />
      </div>
      <p style={{ fontSize: '0.8125rem', color: 'var(--muted)', textAlign: 'center', fontWeight: 500 }}>{steps[step]}</p>
    </div>
  )
}

// ─── Quick Register / Login Modal ─────────────────────────────────
function SaveModal({ onClose, onLogin, onRegister }) {
  const [mode, setMode] = useState('choice') // choice | login | register
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')

  const inp = { width: '100%', padding: '10px 14px', border: '1.5px solid #E5E7EB', borderRadius: 10, fontSize: '0.875rem', fontFamily: 'var(--font)', boxSizing: 'border-box', outline: 'none', marginBottom: 10 }

  const handleSubmit = async () => {
    setErr('')
    setBusy(true)
    try {
      if (mode === 'login')    await onLogin({ email, password })
      if (mode === 'register') await onRegister({ email, password, fullName: name })
    } catch (e) {
      setErr(e.message || 'Error')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#fff', borderRadius: 20, padding: '32px 36px', width: 400, maxWidth: '90vw', boxShadow: '0 24px 80px rgba(0,0,0,0.2)', fontFamily: 'var(--font)', position: 'relative' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF' }}><X size={18} /></button>

        {mode === 'choice' && (
          <>
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <div style={{ width: 52, height: 52, borderRadius: 14, background: '#000000', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
                <Save size={22} color="#fff" />
              </div>
              <h2 style={{ fontWeight: 800, fontSize: '1.25rem', color: '#111827', marginBottom: 6 }}>Guarda tu sitio web</h2>
              <p style={{ color: '#6B7280', fontSize: '0.875rem' }}>Crea una cuenta gratuita para guardar y publicar tu sitio en segundos.</p>
            </div>
            <button onClick={() => setMode('register')} style={{ width: '100%', padding: '12px', background: '#000000', border: 'none', borderRadius: 11, color: '#fff', fontWeight: 700, fontSize: '0.9375rem', cursor: 'pointer', marginBottom: 10, fontFamily: 'var(--font)' }}>
              Crear cuenta gratis
            </button>
            <button onClick={() => setMode('login')} style={{ width: '100%', padding: '11px', background: '#F9FAFB', border: '1.5px solid #E5E7EB', borderRadius: 11, color: '#374151', fontWeight: 700, fontSize: '0.875rem', cursor: 'pointer', fontFamily: 'var(--font)' }}>
              Ya tengo cuenta — Iniciar sesión
            </button>
          </>
        )}

        {(mode === 'login' || mode === 'register') && (
          <>
            <h2 style={{ fontWeight: 800, fontSize: '1.125rem', color: '#111827', marginBottom: 20 }}>
              {mode === 'login' ? 'Iniciar sesión' : 'Crear cuenta gratuita'}
            </h2>
            {mode === 'register' && (
              <input value={name} onChange={e => setName(e.target.value)} placeholder="Tu nombre" style={inp} />
            )}
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="tu@email.com" style={inp} />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Contraseña" style={{ ...inp, marginBottom: 16 }} onKeyDown={e => e.key === 'Enter' && handleSubmit()} />
            {err && <p style={{ color: '#EF4444', fontSize: '0.8125rem', marginBottom: 10, fontWeight: 600 }}>{err}</p>}
            <button onClick={handleSubmit} disabled={busy} style={{ width: '100%', padding: '12px', background: '#000000', border: 'none', borderRadius: 11, color: '#fff', fontWeight: 700, fontSize: '0.9375rem', cursor: busy ? 'wait' : 'pointer', fontFamily: 'var(--font)', marginBottom: 10 }}>
              {busy ? 'Procesando...' : mode === 'login' ? 'Entrar' : 'Crear cuenta y guardar'}
            </button>
            <button onClick={() => { setMode('choice'); setErr('') }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF', fontSize: '0.8rem', fontFamily: 'var(--font)' }}>← Volver</button>
          </>
        )}
      </div>
    </div>
  )
}

// ─── Preview + Save section ───────────────────────────────────────
function PreviewSection({ websiteData, setWebsiteData, prompt, onSaved }) {
  const { user, profile, signIn, signUp } = useAuth()
  const navigate = useNavigate()
  const [showEditor, setShowEditor] = useState(false)
  const [showModal,  setShowModal]  = useState(false)
  const [saving,     setSaving]     = useState(false)
  const [saveErr,    setSaveErr]    = useState('')

  const doSave = async (userId) => {
    setSaving(true)
    setSaveErr('')
    try {
      // Check plan limit
      const plan = profile?.current_plan || 'free'
      const { allowed, current, limit } = await checkSiteLimit(userId, plan)
      if (!allowed) {
        setSaveErr(`Plan ${plan.toUpperCase()} permite ${limit} sitios. Ya tienes ${current}. Mejora tu plan.`)
        setSaving(false)
        return
      }

      const site = await saveSite({
        userId,
        name:     websiteData.businessName || 'Mi Sitio',
        prompt,
        siteJson: websiteData,
        industry: websiteData.industry,
      })
      onSaved?.(site)
      navigate(`/app/editor/${site.id}`)
    } catch (e) {
      setSaveErr('Error al guardar: ' + e.message)
      setSaving(false)
    }
  }

  const handleSaveClick = () => {
    const targetUserId = user?.id || 'saasweb_dev_user'
    doSave(targetUserId)
  }

  return (
    <div>
      {/* Success bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 24, padding: '14px 20px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 14, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <CheckCircle2 size={18} color="#FFFFFF" strokeWidth={2.5} />
          <span style={{ fontWeight: 700, color: '#FFFFFF', fontSize: '0.875rem' }}>
            Sitio generado · Listo para guardar y editar
          </span>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          {saveErr && <span style={{ fontSize: '0.78rem', color: '#EF4444', fontWeight: 600, maxWidth: 260 }}>{saveErr}</span>}
          <button className="btn btn-ghost btn-sm" onClick={() => setShowEditor(!showEditor)} style={{ color: '#FFFFFF', border: '1px solid rgba(255,255,255,0.2)' }}>
            {showEditor ? 'Ver preview' : 'Editar contenido'}
          </button>
          <button
            onClick={handleSaveClick}
            disabled={saving}
            style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '8px 20px', background: saving ? 'rgba(255,255,255,0.4)' : '#FFFFFF', border: 'none', borderRadius: 999, color: '#000000', fontWeight: 800, fontSize: '0.875rem', cursor: saving ? 'wait' : 'pointer', fontFamily: 'var(--font)' }}
          >
            {saving
              ? <><div style={{ width: 12, height: 12, borderRadius: '50%', border: '2px solid rgba(0,0,0,0.4)', borderTopColor: '#000', animation: 'spin 0.8s linear infinite' }} /> Guardando...</>
              : <><Save size={15} /> Guardar y editar →</>
            }
          </button>
        </div>
      </div>

      {/* Editor + Preview */}
      <div className="ai-generator-preview-wrapper" style={{ display: 'flex', gap: 20 }}>
        {showEditor && <WebsiteEditor websiteData={websiteData} onChange={setWebsiteData} />}
        <div style={{ flex: 1, minWidth: 0, width: '100%', overflow: 'hidden' }}>
          <WebsitePreview data={websiteData} />
        </div>
      </div>
      <style>{`
        .ai-generator-card {
          padding: 28px 32px;
        }
        @media (max-width: 640px) {
          .ai-generator-card {
            padding: 20px 16px !important;
          }
          .ai-generator-header-row {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 8px !important;
          }
          .ai-generator-voice-btn {
            width: 100% !important;
            justify-content: center !important;
          }
          .ai-generator-preview-wrapper {
            flex-direction: column !important;
          }
        }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
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

// ─── MAIN COMPONENT ───────────────────────────────────────────────
export default function AIGenerator({ scrollRef }) {
  const [prompt,       setPrompt]       = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [websiteData,  setWebsiteData]  = useState(null)
  const [error,        setError]        = useState('')
  const [charCount,    setCharCount]    = useState(0)
  const textareaRef = useRef(null)
  const basePromptRef = useRef('')

  const handleVoiceTranscript = useCallback((spokenText, isFinal) => {
    const base = basePromptRef.current ? basePromptRef.current.trim() : ''
    const combined = base ? `${base} ${spokenText}` : spokenText
    const clamped = combined.slice(0, 500)
    setPrompt(clamped)
    setCharCount(clamped.length)
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
    if (!prompt.trim() || isGenerating) return
    setIsGenerating(true)
    setError('')
    setWebsiteData(null)
    try {
      const data = await generateWebsiteJSON(prompt)
      setWebsiteData(data)
      setTimeout(() => scrollRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
    } catch (err) {
      setError('Error al generar el sitio. Intenta de nuevo.')
    } finally {
      setIsGenerating(false)
    }
  }

  const handlePromptChange = (e) => {
    setPrompt(e.target.value)
    basePromptRef.current = e.target.value
    setCharCount(e.target.value.length)
  }
  const handleKeyDown = (e) => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleGenerate() }

  return (
    <section id="generator" style={{ background: '#000000', paddingTop: 90, paddingBottom: 90, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="container">
        {/* Header */}
        <div style={{ maxWidth: 760, margin: '0 auto', marginBottom: 28, textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 14px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 999, marginBottom: 16 }}>
            <Sparkles size={13} color="#FFFFFF" />
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'rgba(255,255,255,0.8)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Motor IA · Paso 2
            </span>
          </div>
          <h2 style={{ fontWeight: 900, fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', letterSpacing: '-0.035em', color: '#FFFFFF', marginBottom: 12, lineHeight: 1.2 }}>
            Describe tu visión, ve el resultado en segundos
          </h2>
          <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, maxWidth: 500, margin: '0 auto' }}>
            Escribe en lenguaje natural o habla por tu micrófono en español.
          </p>
        </div>

        {/* Generator card */}
        <div className="ai-generator-card" style={{ maxWidth: 760, margin: '0 auto', background: '#0B0B0E', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: 32 }}>
          <div className="ai-generator-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, flexWrap: 'wrap', gap: 10 }}>
            <label htmlFor="business-prompt" style={{ fontWeight: 700, fontSize: '0.875rem', color: '#FFFFFF' }}>¿Qué tipo de negocio tienes?</label>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              {isVoiceSupported && (
                <button
                  type="button"
                  className="ai-generator-voice-btn" onClick={handleToggleVoice}
                  title={isListening ? 'Detener dictado por voz' : 'Dictar por voz usando tu micrófono'}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '5px 14px',
                    borderRadius: 999,
                    border: `1.5px solid ${isListening ? '#EF4444' : 'rgba(255,255,255,0.2)'}`,
                    background: isListening ? 'rgba(239,68,68,0.1)' : 'rgba(255,255,255,0.06)',
                    color: isListening ? '#EF4444' : '#FFFFFF',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {isListening ? (
                    <>
                      <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#EF4444', display: 'inline-block', animation: 'voicePing 1s infinite' }} />
                      <Mic size={13} color="#EF4444" />
                      <span>Escuchando...</span>
                    </>
                  ) : (
                    <>
                      <Mic size={13} color="#FFFFFF" />
                      <span>Dictar por voz</span>
                    </>
                  )}
                </button>
              )}
              <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>{charCount}/500</span>
            </div>
          </div>

          <div style={{ position: 'relative' }}>
            <textarea
              id="business-prompt"
              ref={textareaRef}
              value={prompt}
              onChange={handlePromptChange}
              onKeyDown={handleKeyDown}
              placeholder='Ej: "Iglesia Cristiana Vida Nueva con horarios dominicales, eventos y donaciones..."'
              maxLength={500}
              rows={3}
              style={{
                width: '100%',
                padding: '14px 16px',
                background: '#050508',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: 14,
                color: '#FFFFFF',
                resize: 'none',
                fontSize: '0.95rem',
                marginBottom: 14,
                lineHeight: 1.6,
                fontFamily: 'var(--font)',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <div style={{ marginBottom: 20, display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
            <span style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 600, fontSize: '0.8rem' }}>Ejemplo rápido:</span>
            {PROMPT_EXAMPLES.map(ex => (
              <button
                key={ex.label}
                type="button"
                onClick={() => { setPrompt(ex.text); basePromptRef.current = ex.text; setCharCount(ex.text.length); textareaRef.current?.focus() }}
                style={{
                  padding: '6px 14px',
                  borderRadius: 999,
                  border: '1px solid rgba(255,255,255,0.18)',
                  background: 'rgba(255,255,255,0.06)',
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  color: '#FFFFFF',
                  fontFamily: 'var(--font)',
                  transition: 'all 0.2s',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#FFFFFF'; e.currentTarget.style.color = '#000000' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = '#FFFFFF' }}
              >
                {ex.label}
              </button>
            ))}
          </div>

          {error && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14, padding: '10px 14px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 10, color: '#EF4444', fontSize: '0.875rem' }}>
              <AlertCircle size={15} />{error}
            </div>
          )}

          <button
            onClick={handleGenerate}
            disabled={!prompt.trim() || isGenerating}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              padding: '16px',
              borderRadius: 999,
              background: '#FFFFFF',
              color: '#000000',
              border: 'none',
              fontWeight: 900,
              fontSize: '1rem',
              cursor: !prompt.trim() || isGenerating ? 'not-allowed' : 'pointer',
              opacity: !prompt.trim() ? 0.45 : 1,
              boxShadow: '0 4px 20px rgba(255,255,255,0.15)',
              transition: 'all 0.2s',
              fontFamily: 'var(--font)',
            }}
            onMouseEnter={e => { if (prompt.trim()) e.currentTarget.style.background = '#E5E5E5' }}
            onMouseLeave={e => { if (prompt.trim()) e.currentTarget.style.background = '#FFFFFF' }}
          >
            {isGenerating
              ? <><RefreshCw size={17} style={{ animation: 'spin 1s linear infinite' }} /> Generando tu sitio web...</>
              : <><Sparkles size={17} strokeWidth={2.5} /> Generar mi sitio web con IA →</>
            }
          </button>
          {isGenerating && <AILoadingProgress />}
        </div>

        {/* Preview + Save */}
        {websiteData && (
          <div ref={scrollRef} style={{ marginTop: 32, maxWidth: '1480px', width: '100%', margin: '32px auto 0' }}>
            <PreviewSection
              websiteData={websiteData}
              setWebsiteData={setWebsiteData}
              prompt={prompt}
              onSaved={() => {}}
            />
          </div>
        )}
      </div>
      <style>{`
        .ai-generator-card {
          padding: 28px 32px;
        }
        @media (max-width: 640px) {
          .ai-generator-card {
            padding: 20px 16px !important;
          }
          .ai-generator-header-row {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 8px !important;
          }
          .ai-generator-voice-btn {
            width: 100% !important;
            justify-content: center !important;
          }
        }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
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
    </section>
  )
}
