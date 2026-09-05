import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { ThemeProvider } from '../context/ThemeContext'
import { Eye, EyeOff, Sparkles, Globe2, Mail, ArrowLeft, Shield } from 'lucide-react'

// ─── Shared brand panel ─────────────────────────────────────────────────────
function BrandPanel() {
  return (
    <div className="auth-brand-panel" style={{
      flex: '0 0 45%',
      background: 'linear-gradient(135deg, #080F0C 0%, #0D1F18 50%, #091A12 100%)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '64px 72px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: -100, right: -100,
        width: 400, height: 400, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,200,150,0.15) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: -50, left: -50,
        width: 300, height: 300, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,200,150,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <Link to="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 64 }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: 'linear-gradient(135deg, #00C896, #00A87A)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 900, fontSize: '1rem', color: '#080F0C',
        }}>A</div>
        <span style={{ color: '#fff', fontWeight: 800, fontSize: '1.1rem', letterSpacing: '-0.02em' }}>
          SaaSWeb
        </span>
      </Link>

      <div>
        <p style={{
          fontSize: '1.875rem', fontWeight: 800,
          color: '#fff', lineHeight: 1.2,
          letterSpacing: '-0.03em', marginBottom: 20,
        }}>
          "Tu sitio web<br />
          <span style={{ color: '#00C896' }}>en 10 minutos.</span><br />
          Listo para vender."
        </p>
        <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.9375rem', lineHeight: 1.6, maxWidth: 320 }}>
          Más de 500 negocios latinoamericanos ya tienen su presencia digital con SaaSWeb.
        </p>
      </div>

      <div style={{
        marginTop: 48, display: 'flex', alignItems: 'center', gap: 12,
        padding: '16px 20px',
        background: 'rgba(255,255,255,0.06)',
        backdropFilter: 'blur(10px)',
        borderRadius: 14,
        border: '1px solid rgba(255,255,255,0.1)',
      }}>
        {['M','J','C','A','R'].map((l, i) => (
          <div key={i} style={{
            width: 32, height: 32, borderRadius: '50%',
            background: `hsl(${i * 60 + 160}, 60%, 45%)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.75rem', fontWeight: 800, color: '#fff',
            marginLeft: i > 0 ? -10 : 0,
            border: '2px solid #0D1F18',
          }}>{l}</div>
        ))}
        <div style={{ marginLeft: 4 }}>
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '0.875rem' }}>+500 negocios</div>
          <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.75rem' }}>ya usan SaaSWeb</div>
        </div>
      </div>
    </div>
  )
}

function AuthCard({ children }) {
  return (
    <ThemeProvider>
      <div className="auth-card-wrapper" style={{
        minHeight: '100vh', display: 'flex',
        background: 'var(--bg)', fontFamily: 'var(--font)',
      }}>
        <BrandPanel />
        <div className="auth-form-container" style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          padding: '48px 64px',
        }}>
          <div style={{ width: '100%', maxWidth: 420 }}>
            {/* Mobile Logo Header */}
            <div className="auth-mobile-logo" style={{ display: 'none', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, width: '100%' }}>
              <Link to="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 34, height: 34, borderRadius: 9,
                  background: 'linear-gradient(135deg, #00C896, #00A87A)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 900, fontSize: '1rem', color: '#080F0C',
                }}>A</div>
                <span style={{ color: 'var(--ink)', fontWeight: 800, fontSize: '1.15rem', letterSpacing: '-0.02em' }}>
                  SaaSWeb
                </span>
              </Link>
            </div>

            {/* Back button to return to main landing page */}
            <div style={{ marginBottom: 24 }}>
              <Link
                to="/"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  textDecoration: 'none',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: 'var(--ink-3)',
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--bg-2)',
                  border: '1px solid var(--border)',
                  transition: 'all 0.2s ease',
                  boxShadow: 'var(--shadow-xs)'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = 'var(--brand-dark)'
                  e.currentTarget.style.borderColor = 'var(--brand)'
                  e.currentTarget.style.background = 'var(--brand-light)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = 'var(--ink-3)'
                  e.currentTarget.style.borderColor = 'var(--border)'
                  e.currentTarget.style.background = 'var(--bg-2)'
                }}
              >
                <ArrowLeft size={16} />
                Volver a la página principal
              </Link>
            </div>

            {children}
          </div>
        </div>
      </div>
    </ThemeProvider>
  )
}

// ─── Shared input styles ────────────────────────────────────────────────────
const inputStyle = { marginBottom: 14 }
const labelStyle = {
  display: 'block', fontWeight: 600,
  fontSize: '0.875rem', marginBottom: 6, color: 'var(--ink)'
}
const dividerStyle = {
  display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20,
  color: 'var(--subtle)', fontSize: '0.8125rem',
}

// ─── OTP Verification Step ──────────────────────────────────────────────────
function OTPStep({ email, onBack, onVerify }) {
  const [code, setCode] = useState(['', '', '', '', '', ''])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const { verifyOtp } = useAuth()

  const handleDigit = (val, idx) => {
    const next = [...code]
    next[idx] = val.replace(/\D/g, '').slice(-1)
    setCode(next)
    if (val && idx < 5) {
      document.getElementById(`otp-${idx + 1}`)?.focus()
    }
  }

  const handleKeyDown = (e, idx) => {
    if (e.key === 'Backspace' && !code[idx] && idx > 0) {
      document.getElementById(`otp-${idx - 1}`)?.focus()
    }
  }

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    if (pasted.length === 6) {
      setCode(pasted.split(''))
      document.getElementById('otp-5')?.focus()
    }
    e.preventDefault()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const token = code.join('')
    if (token.length < 6) { setError('Ingresa el código completo de 6 dígitos'); return }
    setLoading(true)
    setError('')
    try {
      await verifyOtp({ email, token })
      onVerify()
    } catch (err) {
      setError('Código incorrecto o expirado. Intenta de nuevo.')
      setCode(['', '', '', '', '', ''])
      document.getElementById('otp-0')?.focus()
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {/* Header */}
      <button
        onClick={onBack}
        style={{
          display: 'flex', alignItems: 'center', gap: 6,
          background: 'none', border: 'none', cursor: 'pointer',
          color: 'var(--muted)', fontSize: '0.875rem', fontWeight: 600,
          fontFamily: 'var(--font)', padding: 0, marginBottom: 32,
        }}
      >
        <ArrowLeft size={15} /> Volver
      </button>

      <div style={{
        width: 56, height: 56, borderRadius: 16,
        background: 'var(--brand-light)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 20,
      }}>
        <Shield size={26} color="var(--brand-dark)" />
      </div>

      <h1 style={{ fontWeight: 800, fontSize: '1.75rem', letterSpacing: '-0.035em', color: 'var(--ink)', marginBottom: 8 }}>
        Verifica tu identidad
      </h1>
      <p style={{ color: 'var(--muted)', fontSize: '0.9375rem', lineHeight: 1.5, marginBottom: 32 }}>
        Enviamos un código de 6 dígitos a<br />
        <strong style={{ color: 'var(--ink)' }}>{email}</strong>
      </p>

      <form onSubmit={handleSubmit}>
        {/* OTP boxes */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 24, justifyContent: 'center' }} onPaste={handlePaste}>
          {code.map((digit, idx) => (
            <input
              key={idx}
              id={`otp-${idx}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={e => handleDigit(e.target.value, idx)}
              onKeyDown={e => handleKeyDown(e, idx)}
              autoFocus={idx === 0}
              style={{
                width: 52, height: 60,
                textAlign: 'center',
                fontSize: '1.75rem', fontWeight: 900,
                letterSpacing: '-0.02em',
                border: `2px solid ${digit ? 'var(--brand)' : 'var(--border-2)'}`,
                borderRadius: 14,
                background: digit ? 'var(--brand-light)' : 'var(--bg)',
                color: 'var(--ink)',
                outline: 'none',
                transition: 'all 0.15s ease',
                fontFamily: 'var(--font)',
              }}
            />
          ))}
        </div>

        {error && (
          <div style={{
            padding: '10px 14px', background: '#FEF2F2',
            border: '1px solid #FECACA', borderRadius: 10,
            color: '#DC2626', fontSize: '0.875rem', marginBottom: 16,
            textAlign: 'center',
          }}>{error}</div>
        )}

        <button
          type="submit"
          disabled={loading || code.join('').length < 6}
          className="btn btn-primary btn-lg"
          style={{
            width: '100%', justifyContent: 'center', fontWeight: 800,
            opacity: code.join('').length < 6 ? 0.5 : 1,
          }}
        >
          {loading ? 'Verificando...' : 'Verificar e ingresar →'}
        </button>
      </form>

      <p style={{ textAlign: 'center', marginTop: 20, fontSize: '0.875rem', color: 'var(--muted)' }}>
        ¿No recibiste el código?{' '}
        <button
          onClick={onBack}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'var(--brand-dark)', fontWeight: 700,
            fontFamily: 'var(--font)', fontSize: '0.875rem', padding: 0,
          }}
        >
          Reenviar
        </button>
      </p>
    </div>
  )
}

// ─── LOGIN PAGE ──────────────────────────────────────────────────────────────
export function LoginPage() {
  const { signIn, signInWithGoogle, signInWithOtp, devLogin } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/app/dashboard'

  const [mode, setMode] = useState('password') // 'password' | 'magic' | 'otp-verify'
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handlePasswordLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await signIn(form)
      navigate(from, { replace: true })
    } catch (err) {
      setError(err.message || 'Credenciales incorrectas. Verifica e intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  const handleMagicLink = async (e) => {
    e.preventDefault()
    if (!form.email) { setError('Ingresa tu correo electrónico'); return }
    setLoading(true)
    setError('')
    try {
      await signInWithOtp(form.email)
      setMode('otp-verify')
    } catch (err) {
      setError(err.message || 'Error al enviar el código')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogle = async () => {
    try {
      setError('')
      await signInWithGoogle()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleOtpVerified = () => navigate(from, { replace: true })

  if (mode === 'otp-verify') {
    return (
      <AuthCard>
        <OTPStep
          email={form.email}
          onBack={() => setMode('magic')}
          onVerify={handleOtpVerified}
        />
      </AuthCard>
    )
  }

  return (
    <AuthCard>
      <div style={{ marginBottom: 36 }}>
        <h1 style={{ fontWeight: 800, fontSize: '1.875rem', letterSpacing: '-0.035em', color: 'var(--ink)', marginBottom: 8 }}>
          Bienvenido de nuevo
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: '0.9375rem', lineHeight: 1.5 }}>
          Accede a tu panel para gestionar tus sitios web.
        </p>
      </div>

      {/* Dev Mode Bypass Button (all environments) */}
      <button
          onClick={() => {
            devLogin()
            navigate(from, { replace: true })
          }}
          style={{
            width: '100%', display: 'flex', alignItems: 'center',
            justifyContent: 'center', gap: 10,
            padding: '13px 20px', borderRadius: 12,
            border: '1.5px solid #00C896',
            background: 'linear-gradient(135deg, #00C896, #00A87A)', cursor: 'pointer',
            fontFamily: 'var(--font)', fontWeight: 800, fontSize: '0.9375rem',
            color: '#fff', marginBottom: 16,
            boxShadow: '0 4px 14px rgba(0,200,150,0.3)',
            transition: 'all 0.2s ease',
          }}
        >
          <Sparkles size={18} />
          Acceso Rápido Dev Local (Sin Supabase) →
        </button>

      {/* Google OAuth */}
      <button
        onClick={handleGoogle}
        style={{
          width: '100%', display: 'flex', alignItems: 'center',
          justifyContent: 'center', gap: 10,
          padding: '12px 20px', borderRadius: 12,
          border: '1.5px solid var(--border-2)',
          background: 'var(--bg)', cursor: 'pointer',
          fontFamily: 'var(--font)', fontWeight: 600, fontSize: '0.9375rem',
          color: 'var(--ink)', marginBottom: 12,
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--brand)'}
        onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-2)'}
      >
        <Globe2 size={18} />
        Continuar con Google
      </button>

      {/* Mode toggle — Magic Link */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        <button
          onClick={() => { setMode('password'); setError('') }}
          style={{
            flex: 1, padding: '10px', borderRadius: 10,
            border: `1.5px solid ${mode === 'password' ? 'var(--brand)' : 'var(--border)'}`,
            background: mode === 'password' ? 'var(--brand-light)' : 'var(--bg)',
            color: mode === 'password' ? 'var(--brand-dark)' : 'var(--muted)',
            fontWeight: 700, fontSize: '0.8125rem', cursor: 'pointer',
            fontFamily: 'var(--font)', transition: 'all 0.2s',
          }}
        >
          Contraseña
        </button>
        <button
          onClick={() => { setMode('magic'); setError('') }}
          style={{
            flex: 1, padding: '10px', borderRadius: 10,
            border: `1.5px solid ${mode === 'magic' ? 'var(--brand)' : 'var(--border)'}`,
            background: mode === 'magic' ? 'var(--brand-light)' : 'var(--bg)',
            color: mode === 'magic' ? 'var(--brand-dark)' : 'var(--muted)',
            fontWeight: 700, fontSize: '0.8125rem', cursor: 'pointer',
            fontFamily: 'var(--font)', transition: 'all 0.2s',
          }}
        >
          Código OTP
        </button>
      </div>

      {/* Password mode */}
      {mode === 'password' && (
        <form onSubmit={handlePasswordLogin}>
          <div style={inputStyle}>
            <label style={labelStyle}>Correo electrónico</label>
            <input type="email" required autoComplete="email" placeholder="tu@empresa.com"
              className="input" value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
          </div>
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <label style={labelStyle}>Contraseña</label>
              <Link to="/forgot-password" style={{ fontSize: '0.8125rem', color: 'var(--brand-dark)', textDecoration: 'none', fontWeight: 600 }}>
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
            <div style={{ position: 'relative' }}>
              <input type={showPw ? 'text' : 'password'} required autoComplete="current-password"
                placeholder="••••••••" className="input" style={{ paddingRight: 44 }}
                value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))} />
              <button type="button" onClick={() => setShowPw(!showPw)}
                style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', padding: 0, display: 'flex' }}>
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          {error && <div style={{ padding: '10px 14px', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 10, color: '#DC2626', fontSize: '0.875rem', marginBottom: 16 }}>{error}</div>}
          <button type="submit" disabled={loading} className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center', fontWeight: 800 }}>
            {loading ? 'Iniciando sesión...' : 'Iniciar sesión →'}
          </button>
        </form>
      )}

      {/* Magic Link / OTP mode */}
      {mode === 'magic' && (
        <form onSubmit={handleMagicLink}>
          <div style={{ padding: '12px 16px', background: 'var(--brand-light)', border: '1px solid rgba(0,200,150,0.25)', borderRadius: 10, marginBottom: 18, display: 'flex', alignItems: 'flex-start', gap: 10 }}>
            <Shield size={16} color="var(--brand-dark)" style={{ flexShrink: 0, marginTop: 2 }} />
            <p style={{ fontSize: '0.8125rem', color: 'var(--brand-dark)', fontWeight: 600, margin: 0, lineHeight: 1.4 }}>
              Recibirás un código de 6 dígitos en tu email. Más seguro que una contraseña.
            </p>
          </div>
          <div style={inputStyle}>
            <label style={labelStyle}>Correo electrónico</label>
            <input type="email" required autoComplete="email" placeholder="tu@empresa.com"
              className="input" value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
          </div>
          {error && <div style={{ padding: '10px 14px', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 10, color: '#DC2626', fontSize: '0.875rem', marginBottom: 16 }}>{error}</div>}
          <button type="submit" disabled={loading} className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center', fontWeight: 800 }}>
            <Mail size={16} />
            {loading ? 'Enviando código...' : 'Enviar código OTP →'}
          </button>
        </form>
      )}

      <p style={{ textAlign: 'center', marginTop: 24, fontSize: '0.875rem', color: 'var(--muted)' }}>
        ¿No tienes cuenta?{' '}
        <Link to="/register" style={{ color: 'var(--brand-dark)', fontWeight: 700, textDecoration: 'none' }}>
          Crea una gratis
        </Link>
      </p>
    </AuthCard>
  )
}

// ─── REGISTER PAGE ───────────────────────────────────────────────────────────
export function RegisterPage() {
  const { signUp, signInWithGoogle } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({ fullName: '', email: '', password: '' })
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const pwStrength = form.password.length >= 16 ? 3 : form.password.length >= 12 ? 2 : form.password.length >= 8 ? 1 : 0
  const pwColors = ['var(--border)', '#F59E0B', '#10B981', '#00C896']
  const pwLabels = ['', 'Débil', 'Buena', 'Excelente']

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.password.length < 8) { setError('La contraseña debe tener al menos 8 caracteres'); return }
    setLoading(true)
    setError('')
    try {
      await signUp(form)
      setSuccess(true)
    } catch (err) {
      setError(err.message || 'Error al crear la cuenta')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <AuthCard>
        <div style={{ textAlign: 'center', padding: '32px 0' }}>
          <div style={{
            width: 80, height: 80, borderRadius: '50%',
            background: 'var(--brand-light)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 24px',
          }}>
            <Mail size={36} color="var(--brand-dark)" />
          </div>
          <h2 style={{ fontWeight: 800, marginBottom: 12, fontSize: '1.5rem', color: 'var(--ink)' }}>
            Revisa tu email
          </h2>
          <p style={{ color: 'var(--muted)', lineHeight: 1.6, marginBottom: 12 }}>
            Enviamos un enlace de confirmación a
          </p>
          <p style={{ fontWeight: 700, color: 'var(--ink)', fontSize: '1rem', marginBottom: 28 }}>
            {form.email}
          </p>
          <div style={{
            padding: '12px 16px', background: 'var(--brand-light)',
            border: '1px solid rgba(0,200,150,0.25)', borderRadius: 12,
            fontSize: '0.8125rem', color: 'var(--brand-dark)', fontWeight: 600,
            marginBottom: 28, textAlign: 'left',
          }}>
            Haz clic en el enlace del email para activar tu cuenta y acceder a tu panel.
          </div>
          <button className="btn btn-ghost" onClick={() => navigate('/login')} style={{ width: '100%', justifyContent: 'center' }}>
            Ya verifiqué mi email — Iniciar sesión
          </button>
        </div>
      </AuthCard>
    )
  }

  return (
    <AuthCard>
      <div style={{ marginBottom: 36 }}>
        <h1 style={{ fontWeight: 800, fontSize: '1.875rem', letterSpacing: '-0.035em', color: 'var(--ink)', marginBottom: 8 }}>
          Crea tu cuenta gratis
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: '0.9375rem', lineHeight: 1.5 }}>
          Tu primer sitio web listo en menos de 10 minutos.
        </p>
      </div>

      <button
        onClick={signInWithGoogle}
        style={{
          width: '100%', display: 'flex', alignItems: 'center',
          justifyContent: 'center', gap: 10,
          padding: '12px 20px', borderRadius: 12,
          border: '1.5px solid var(--border-2)',
          background: 'var(--bg)', cursor: 'pointer',
          fontFamily: 'var(--font)', fontWeight: 600, fontSize: '0.9375rem',
          color: 'var(--ink)', marginBottom: 20,
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--brand)'}
        onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-2)'}
      >
        <Globe2 size={18} />
        Continuar con Google
      </button>

      <div style={dividerStyle}>
        <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
        o regístrate con email
        <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
      </div>

      <form onSubmit={handleSubmit}>
        <div style={inputStyle}>
          <label style={labelStyle}>Nombre completo</label>
          <input type="text" required placeholder="Tu Nombre" className="input"
            value={form.fullName} onChange={e => setForm(f => ({ ...f, fullName: e.target.value }))} />
        </div>
        <div style={inputStyle}>
          <label style={labelStyle}>Correo electrónico</label>
          <input type="email" required autoComplete="email" placeholder="tu@empresa.com"
            className="input" value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
        </div>
        <div style={{ marginBottom: 20 }}>
          <label style={labelStyle}>Contraseña</label>
          <div style={{ position: 'relative' }}>
            <input type={showPw ? 'text' : 'password'} required minLength={8}
              placeholder="Mínimo 8 caracteres" className="input" style={{ paddingRight: 44 }}
              value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} />
            <button type="button" onClick={() => setShowPw(!showPw)}
              style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', padding: 0, display: 'flex' }}>
              {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {form.password && (
            <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ display: 'flex', gap: 4, flex: 1 }}>
                {[1, 2, 3].map(i => (
                  <div key={i} style={{ flex: 1, height: 3, borderRadius: 999, background: pwStrength >= i ? pwColors[i] : 'var(--border)', transition: 'background 0.3s' }} />
                ))}
              </div>
              {pwStrength > 0 && <span style={{ fontSize: '0.75rem', fontWeight: 700, color: pwColors[pwStrength] }}>{pwLabels[pwStrength]}</span>}
            </div>
          )}
        </div>

        {error && <div style={{ padding: '10px 14px', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 10, color: '#DC2626', fontSize: '0.875rem', marginBottom: 16 }}>{error}</div>}

        <button type="submit" disabled={loading} className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center', fontWeight: 800 }}>
          {loading ? 'Creando cuenta...' : 'Crear cuenta gratis →'}
        </button>

        <p style={{ fontSize: '0.75rem', color: 'var(--muted)', textAlign: 'center', marginTop: 14, lineHeight: 1.5 }}>
          Al registrarte aceptas los{' '}
          <Link to="/terms" style={{ color: 'var(--brand-dark)', textDecoration: 'none' }}>Términos de uso</Link>{' '}
          y la{' '}
          <Link to="/privacy" style={{ color: 'var(--brand-dark)', textDecoration: 'none' }}>Política de privacidad</Link>.
        </p>
      </form>

      <p style={{ textAlign: 'center', marginTop: 20, fontSize: '0.875rem', color: 'var(--muted)' }}>
        ¿Ya tienes cuenta?{' '}
        <Link to="/login" style={{ color: 'var(--brand-dark)', fontWeight: 700, textDecoration: 'none' }}>
          Iniciar sesión
        </Link>
      </p>
    </AuthCard>
  )
}
