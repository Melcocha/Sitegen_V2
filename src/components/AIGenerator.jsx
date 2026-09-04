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
  { label: '⛪ Iglesia',        text: 'Iglesia Cristiana con horarios dominicales, prédicas recientes y ministerios para toda la familia' },
  { label: '🏡 Bienes Raíces',  text: 'Agencia inmobiliaria premium con catálogo de propiedades exclusivas, venta de casas y asesoría personalizada' },
  { label: '🩺 Clínica & Salud', text: 'Clínica médica y odontológica especializada con tecnología de vanguardia y reserva de citas online' },
  { label: '🍽️ Restaurante',   text: 'Restaurante gastronómico con menú especial, reservaciones en línea y experiencia familiar' },
  { label: '⚖️ Abogados',      text: 'Bufete de abogados especializado en derecho corporativo, asesoría jurídica y contratos' },
  { label: '💻 SaaS & Tech',    text: 'Empresa de desarrollo de software empresarial, transformación digital y servicios cloud' },
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
              <div style={{ width: 52, height: 52, borderRadius: 14, background: 'linear-gradient(135deg,#00C896,#00A87A)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
                <Save size={22} color="#fff" />
              </div>
              <h2 style={{ fontWeight: 800, fontSize: '1.25rem', color: '#111827', marginBottom: 6 }}>Guarda tu sitio web</h2>
              <p style={{ color: '#6B7280', fontSize: '0.875rem' }}>Crea una cuenta gratuita para guardar y publicar tu sitio en segundos.</p>
            </div>
            <button onClick={() => setMode('register')} style={{ width: '100%', padding: '12px', background: 'linear-gradient(135deg,#00C896,#00A87A)', border: 'none', borderRadius: 11, color: '#fff', fontWeight: 700, fontSize: '0.9375rem', cursor: 'pointer', marginBottom: 10, fontFamily: 'var(--font)' }}>
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
            <button onClick={handleSubmit} disabled={busy} style={{ width: '100%', padding: '12px', background: 'linear-gradient(135deg,#00C896,#00A87A)', border: 'none', borderRadius: 11, color: '#fff', fontWeight: 700, fontSize: '0.9375rem', cursor: busy ? 'wait' : 'pointer', fontFamily: 'var(--font)', marginBottom: 10 }}>
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
    if (user) {
      doSave(user.id)
    } else {
      setShowModal(true)
    }
  }

  const handleLogin = async (creds) => {
    await signIn(creds)
    setShowModal(false)
    // user will be set by AuthContext — wait a tick then save
    setTimeout(() => {
      // re-read from auth
      import('../lib/supabase').then(({ supabase }) => {
        supabase.auth.getUser().then(({ data }) => {
          if (data?.user) doSave(data.user.id)
        })
      })
    }, 300)
  }

  const handleRegister = async ({ email, password, fullName }) => {
    await signUp({ email, password, fullName })
    setShowModal(false)
    // After signup user needs to confirm email, show message
    setSaveErr('Revisa tu email para confirmar la cuenta, luego haz clic en "Guardar mi sitio".')
  }

  return (
    <div>
      {/* Success bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 24, padding: '14px 20px', background: 'var(--brand-light)', border: '1px solid rgba(0,200,150,0.25)', borderRadius: 'var(--radius-lg)', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <CheckCircle2 size={18} color="var(--brand-dark)" strokeWidth={2.5} />
          <span style={{ fontWeight: 700, color: 'var(--ink)', fontSize: '0.875rem' }}>
            Sitio generado · Listo para guardar
          </span>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          {saveErr && <span style={{ fontSize: '0.78rem', color: '#EF4444', fontWeight: 600, maxWidth: 260 }}>{saveErr}</span>}
          <button className="btn btn-ghost btn-sm" onClick={() => setShowEditor(!showEditor)}>
            {showEditor ? 'Ver preview' : 'Editar contenido'}
          </button>
          <button
            onClick={handleSaveClick}
            disabled={saving}
            style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '8px 18px', background: saving ? 'rgba(0,200,150,0.5)' : 'linear-gradient(135deg,#00C896,#00A87A)', border: 'none', borderRadius: 9, color: '#fff', fontWeight: 700, fontSize: '0.875rem', cursor: saving ? 'wait' : 'pointer', fontFamily: 'var(--font)', boxShadow: '0 2px 8px rgba(0,200,150,0.3)' }}
          >
            {saving
              ? <><div style={{ width: 12, height: 12, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.4)', borderTopColor: '#fff', animation: 'spin 0.8s linear infinite' }} /> Guardando...</>
              : <><Save size={15} /> {user ? 'Guardar mi sitio' : 'Guardar — es gratis'}</>
            }
          </button>
        </div>
      </div>

      {/* Editor + Preview */}
      <div style={{ display: 'flex', gap: 20 }}>
        {showEditor && <WebsiteEditor websiteData={websiteData} onChange={setWebsiteData} />}
        <div style={{ flex: 1 }}>
          <WebsitePreview data={websiteData} />
        </div>
      </div>

      {showModal && (
        <SaveModal
          onClose={() => setShowModal(false)}
          onLogin={handleLogin}
          onRegister={handleRegister}
        />
      )}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
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
    <section id="generator" style={{ background: 'var(--bg-2)', paddingTop: 56, paddingBottom: 56 }}>
      <div className="container">
        {/* Header */}
        <div style={{ maxWidth: 760, margin: '0 auto', marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <span className="badge badge-brand"><Sparkles size={11} strokeWidth={2.5} /> Motor IA — Paso 2</span>
            <span style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>Prueba el generador ahora · sin registrarte</span>
          </div>
          <h2 style={{ fontWeight: 800, fontSize: '1.375rem', letterSpacing: '-0.025em', color: 'var(--ink)', marginBottom: 4 }}>
            Describe tu negocio, ve el resultado en segundos
          </h2>
          <p className="t-caption">Escribe en lenguaje natural o habla por tu micrófono en español.</p>
        </div>

        {/* Generator card */}
        <div className="card" style={{ maxWidth: 760, margin: '0 auto', padding: '28px 32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, flexWrap: 'wrap', gap: 8 }}>
            <label htmlFor="business-prompt" style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--ink)' }}>¿Qué tipo de negocio tienes?</label>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              {isVoiceSupported && (
                <button
                  type="button"
                  onClick={handleToggleVoice}
                  title={isListening ? 'Detener dictado por voz' : 'Dictar por voz usando tu micrófono'}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '4px 12px',
                    borderRadius: 999,
                    border: `1.5px solid ${isListening ? '#EF4444' : 'var(--brand)'}`,
                    background: isListening ? '#FEF2F2' : 'var(--brand-light)',
                    color: isListening ? '#DC2626' : 'var(--brand-dark)',
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
                      <span>Escuchando...</span>
                    </>
                  ) : (
                    <>
                      <Mic size={13} color="var(--brand-dark)" />
                      <span>Dictar por voz</span>
                    </>
                  )}
                </button>
              )}
              <span style={{ fontSize: '0.72rem', color: 'var(--subtle)' }}>{charCount}/500</span>
            </div>
          </div>

          <div style={{ position: 'relative' }}>
            <textarea
              id="business-prompt"
              ref={textareaRef}
              value={prompt}
              onChange={handlePromptChange}
              onKeyDown={handleKeyDown}
              placeholder='Ej: "Iglesia Cristiana Vida Nueva...", "Bufete de abogados especializado en derecho corporativo..." o presiona "Dictar por voz" 🎙️'
              maxLength={500}
              rows={3}
              className="input"
              style={{
                resize: 'none',
                fontSize: '0.9375rem',
                marginBottom: 14,
                lineHeight: 1.6,
                borderColor: isListening ? '#EF4444' : undefined,
                boxShadow: isListening ? '0 0 0 3px rgba(239,68,68,0.15)' : undefined
              }}
            />

            {isListening && (
              <div style={{
                position: 'absolute',
                bottom: 24,
                right: 12,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                background: 'rgba(239,68,68,0.92)',
                color: '#fff',
                padding: '3px 9px',
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
            <div style={{ marginBottom: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6, padding: '8px 12px', background: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: 8, fontSize: '0.78rem', color: '#B91C1C' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <AlertCircle size={14} color="#DC2626" />
                <span>{voiceError}</span>
              </div>
              <button type="button" onClick={() => setVoiceError('')} style={{ border: 'none', background: 'transparent', color: '#991B1B', cursor: 'pointer', fontWeight: 800, fontSize: '0.8rem' }}>✕</button>
            </div>
          )}

          {isListening && (
            <div style={{ marginBottom: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, padding: '8px 12px', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 8, fontSize: '0.78rem', color: '#991B1B' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#EF4444', display: 'inline-block', animation: 'voicePing 1s infinite' }} />
                <span>Habla claro hacia tu micrófono. Tu voz se convertirá en texto automáticamente.</span>
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

          <div style={{ marginBottom: 18 }}>
            <span className="t-label" style={{ marginRight: 10 }}>Ejemplos rápidos:</span>
            {PROMPT_EXAMPLES.map(ex => (
              <button key={ex.label} onClick={() => { setPrompt(ex.text); basePromptRef.current = ex.text; setCharCount(ex.text.length); textareaRef.current?.focus() }}
                style={{ marginRight: 6, marginBottom: 6, padding: '5px 12px', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-2)', background: 'var(--bg)', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer', color: 'var(--ink-3)', fontFamily: 'var(--font)', transition: 'all var(--dur)' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--brand)'; e.currentTarget.style.color = 'var(--brand)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = ''; e.currentTarget.style.color = '' }}
              >{ex.label}</button>
            ))}
          </div>

          {error && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14, padding: '10px 14px', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 'var(--radius-md)', color: '#DC2626', fontSize: '0.875rem' }}>
              <AlertCircle size={15} />{error}
            </div>
          )}

          <button className="btn btn-primary btn-lg" onClick={handleGenerate} disabled={!prompt.trim() || isGenerating}
            style={{ width: '100%', justifyContent: 'center', fontWeight: 800, opacity: !prompt.trim() ? 0.5 : 1, cursor: !prompt.trim() ? 'not-allowed' : 'pointer' }}>
            {isGenerating
              ? <><RefreshCw size={17} style={{ animation: 'spin 1s linear infinite' }} /> Generando tu sitio web...</>
              : <><Sparkles size={17} strokeWidth={2.5} /> Generar mi sitio web gratis <span style={{ opacity: 0.55, fontSize: '0.75rem', marginLeft: 4 }}>⌘↵</span></>
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
