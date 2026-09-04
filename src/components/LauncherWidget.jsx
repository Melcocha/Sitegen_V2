import { useState } from 'react'
import { Sparkles, Calendar, Video, Heart, Gift, MessageCircle, X, ChevronRight, CheckCircle2, ArrowRight } from 'lucide-react'

/**
 * LauncherWidget — Signature Floating "Next Steps" Hub inspired by Nucleus.church
 * Features the signature bottom-right capsule trigger and full-width glassmorphism modal with stacked pill cards.
 */
export default function LauncherWidget({ siteJson }) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeModal, setActiveModal] = useState(null) // 'visit' | 'prayer' | 'giving' | null
  const [prayerSubmitted, setPrayerSubmitted] = useState(false)
  const [prayerForm, setPrayerForm] = useState({ name: '', email: '', request: '', wantFollowUp: true })

  if (!siteJson || !siteJson.floatingWidget?.enabled) return null

  const brandColor = siteJson.accentColor || siteJson.primaryColor || '#0284C7'

  const handlePrayerSubmit = (e) => {
    e.preventDefault()
    setPrayerSubmitted(true)
    setTimeout(() => {
      setPrayerSubmitted(false)
      setActiveModal(null)
      setPrayerForm({ name: '', email: '', request: '', wantFollowUp: true })
    }, 3000)
  }

  const mainActions = [
    {
      id: 'visit',
      title: 'Planear una Visita',
      desc: 'Horarios, ubicación y qué esperar en tu primera visita',
      icon: <Calendar size={22} />,
      badge: 'Soy Nuevo',
      action: () => { setIsOpen(false); setActiveModal('visit'); }
    },
    {
      id: 'sermons',
      title: 'Ver Prédicas Recientes',
      desc: 'Mensajes dominicales, series y enseñanzas en video',
      icon: <Video size={22} />,
      action: () => {
        setIsOpen(false)
        const el = document.getElementById('wp-sermons') || document.getElementById('wp-services')
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }
    },
    {
      id: 'prayer',
      title: 'Petición de Oración',
      desc: 'Comparte tu necesidad. Oramos por ti confidencialmente',
      icon: <Heart size={22} />,
      badge: 'PrayerFlow',
      action: () => { setIsOpen(false); setActiveModal('prayer'); }
    },
    {
      id: 'giving',
      title: 'Diezmos y Ofrendas',
      desc: 'Apoya el crecimiento del ministerio y la comunidad',
      icon: <Gift size={22} />,
      action: () => { setIsOpen(false); setActiveModal('giving'); }
    },
    {
      id: 'contact',
      title: 'Contacto Directo',
      desc: 'Escríbenos directamente a nuestro WhatsApp o correo',
      icon: <MessageCircle size={22} />,
      action: () => {
        setIsOpen(false)
        const phone = siteJson.contact?.whatsapp || siteJson.contact?.phone || ''
        if (phone) {
          const cleanPhone = phone.replace(/[^0-9]/g, '')
          window.open(`https://wa.me/${cleanPhone}`, '_blank')
        } else {
          const el = document.getElementById('wp-contact')
          if (el) el.scrollIntoView({ behavior: 'smooth' })
        }
      }
    }
  ]

  return (
    <>
      {/* ── Signature Nucleus Floating Trigger Capsule (Bottom Right) ── */}
      <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9999 }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12,
          background: '#FFFFFF', padding: '6px 6px 6px 18px',
          borderRadius: 999, boxShadow: '0 12px 36px rgba(0,0,0,0.16)',
          border: '1.5px solid rgba(0,0,0,0.08)',
          fontFamily: 'Inter, sans-serif'
        }}>
          <div style={{ textAlign: 'left', minWidth: 150 }}>
            <div style={{ fontSize: '0.8125rem', fontWeight: 800, color: '#0F172A', lineHeight: 1.2 }}>
              ¿Cuál es tu siguiente paso?
            </div>
            <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 500 }}>
              Oración, diezmos y más
            </div>
          </div>

          <button
            onClick={() => setIsOpen(true)}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '10px 18px', borderRadius: 999,
              background: brandColor, color: '#FFFFFF',
              border: 'none', cursor: 'pointer',
              fontWeight: 800, fontSize: '0.875rem',
              boxShadow: `0 4px 14px ${brandColor}55`,
              transition: 'transform 0.2s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            <Sparkles size={16} />
            <span>Siguientes Pasos</span>
          </button>
        </div>
      </div>

      {/* ── Full Overlay Nucleus Launcher Hub ────────────────────────────── */}
      {isOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 10000,
          background: 'rgba(224, 242, 254, 0.96)',
          backdropFilter: 'blur(16px)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          padding: 24, overflowY: 'auto'
        }}>
          {/* Top Header & Close Button */}
          <div style={{ position: 'absolute', top: 24, left: 24, right: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                width: 44, height: 44, borderRadius: '50%',
                background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: '#0F172A', boxShadow: '0 4px 12px rgba(0,0,0,0.06)'
              }}
            >
              <X size={20} />
            </button>
            <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#64748B' }}>Acceso Rápido Nucleus</span>
          </div>

          {/* Centered Content Container */}
          <div style={{ maxWidth: 520, width: '100%', textAlign: 'center', marginTop: 40 }}>
            {/* Church Brand Header */}
            <div style={{ marginBottom: 32 }}>
              <div style={{
                width: 56, height: 56, borderRadius: 16,
                background: brandColor, color: '#FFF',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 16px', fontSize: '1.5rem', fontWeight: 900,
                boxShadow: `0 8px 24px ${brandColor}44`
              }}>
                {(siteJson.businessName || 'I')[0]}
              </div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#0F172A', margin: '0 0 6px', letterSpacing: '-0.03em' }}>
                {siteJson.businessName || 'Nuestra Iglesia'}
              </h2>
              <p style={{ fontSize: '0.9375rem', color: brandColor, fontWeight: 700, margin: 0 }}>
                ¿Cuál es tu siguiente paso hoy?
              </p>
            </div>

            {/* Stacked White Pill Action Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {mainActions.map(action => (
                <button
                  key={action.id}
                  onClick={action.action}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '20px 24px', borderRadius: 20,
                    background: '#FFFFFF', border: '1.5px solid rgba(0,0,0,0.06)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.05)',
                    cursor: 'pointer', textAlign: 'left',
                    transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                    width: '100%', fontFamily: 'Inter, sans-serif'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-3px)'
                    e.currentTarget.style.boxShadow = '0 16px 32px rgba(2,132,199,0.15)'
                    e.currentTarget.style.borderColor = brandColor
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.05)'
                    e.currentTarget.style.borderColor = 'rgba(0,0,0,0.06)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: `${brandColor}15`, color: brandColor, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {action.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#0F172A', display: 'flex', alignItems: 'center', gap: 8 }}>
                        {action.title}
                        {action.badge && (
                          <span style={{ fontSize: '0.65rem', fontWeight: 800, padding: '2px 8px', borderRadius: 999, background: `${brandColor}20`, color: brandColor }}>
                            {action.badge}
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: '0.8125rem', color: '#64748B', marginTop: 2, fontWeight: 500 }}>
                        {action.desc}
                      </div>
                    </div>
                  </div>
                  <ArrowRight size={20} color={brandColor} />
                </button>
              ))}
            </div>

            <div style={{ marginTop: 28, fontSize: '0.75rem', color: '#94A3B8', fontWeight: 500 }}>
              Seguro & Encriptado • Impulsado por Nucleus Engine
            </div>
          </div>
        </div>
      )}

      {/* ── Modals Triggered by Launcher ────────────────────────────── */}
      {activeModal === 'visit' && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 10001, background: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div style={{ background: '#fff', borderRadius: 24, padding: 32, maxWidth: 520, width: '100%', position: 'relative', boxShadow: '0 25px 60px rgba(0,0,0,0.3)', fontFamily: 'Inter, sans-serif' }}>
            <button onClick={() => setActiveModal(null)} style={{ position: 'absolute', top: 20, right: 20, background: '#F1F5F9', border: 'none', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#64748B' }}>
              <X size={16} />
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: brandColor, fontWeight: 800, fontSize: '0.8125rem', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
              <Calendar size={18} /> Planifica tu primera visita
            </div>
            <h2 style={{ fontWeight: 900, fontSize: '1.625rem', color: '#0F172A', marginBottom: 12 }}>Te esperamos este fin de semana</h2>
            <p style={{ color: '#475569', fontSize: '0.9375rem', lineHeight: 1.6, marginBottom: 24 }}>
              {siteJson.planAVisit?.whatToExpect || 'Encontrarás música contemporánea, un mensaje bíblico inspirador y un café listo para ti.'}
            </p>
            <div style={{ background: '#F8FAFC', borderRadius: 16, padding: 20, marginBottom: 24, border: '1px solid #E2E8F0' }}>
              <div style={{ fontWeight: 800, fontSize: '0.875rem', color: '#0F172A', marginBottom: 6 }}>⏰ Horarios de Servicio:</div>
              <ul style={{ margin: 0, paddingLeft: 20, color: '#334155', fontSize: '0.875rem', lineHeight: 1.7 }}>
                {(siteJson.planAVisit?.serviceTimes || ['Domingos: 9:00 AM y 11:30 AM']).map((time, i) => <li key={i}>{time}</li>)}
              </ul>
            </div>
            <button onClick={() => setActiveModal(null)} style={{ width: '100%', padding: '14px', background: brandColor, color: '#fff', border: 'none', borderRadius: 12, fontWeight: 800, fontSize: '0.9375rem', cursor: 'pointer' }}>
              ¡Listo, los veré el domingo!
            </button>
          </div>
        </div>
      )}

      {activeModal === 'prayer' && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 10001, background: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div style={{ background: '#fff', borderRadius: 24, padding: 32, maxWidth: 500, width: '100%', position: 'relative', boxShadow: '0 25px 60px rgba(0,0,0,0.3)', fontFamily: 'Inter, sans-serif' }}>
            <button onClick={() => setActiveModal(null)} style={{ position: 'absolute', top: 20, right: 20, background: '#F1F5F9', border: 'none', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#64748B' }}>
              <X size={16} />
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: brandColor, fontWeight: 800, fontSize: '0.8125rem', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
              <Heart size={18} /> PrayerFlow
            </div>
            <h2 style={{ fontWeight: 900, fontSize: '1.5rem', color: '#0F172A', marginBottom: 8 }}>¿Cómo podemos orar por ti?</h2>
            <p style={{ color: '#64748B', fontSize: '0.875rem', marginBottom: 20 }}>Nuestro equipo pastoral ora cada semana por todas las necesidades recibidas.</p>

            {prayerSubmitted ? (
              <div style={{ textAlign: 'center', padding: '30px 0' }}>
                <CheckCircle2 size={48} color="#10B981" style={{ margin: '0 auto 12px' }} />
                <h3 style={{ fontWeight: 800, color: '#0F172A', marginBottom: 6 }}>Petición recibida</h3>
                <p style={{ color: '#64748B', fontSize: '0.875rem' }}>Estamos orando por ti. Dios te bendiga grandemente.</p>
              </div>
            ) : (
              <form onSubmit={handlePrayerSubmit}>
                <input required placeholder="Tu nombre" value={prayerForm.name} onChange={e => setPrayerForm({ ...prayerForm, name: e.target.value })} style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1.5px solid #E2E8F0', marginBottom: 12, outline: 'none', fontSize: '0.875rem', boxSizing: 'border-box' }} />
                <input type="email" placeholder="Tu correo (opcional)" value={prayerForm.email} onChange={e => setPrayerForm({ ...prayerForm, email: e.target.value })} style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1.5px solid #E2E8F0', marginBottom: 12, outline: 'none', fontSize: '0.875rem', boxSizing: 'border-box' }} />
                <textarea required rows={4} placeholder="Escribe aquí tu petición de oración..." value={prayerForm.request} onChange={e => setPrayerForm({ ...prayerForm, request: e.target.value })} style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1.5px solid #E2E8F0', marginBottom: 16, outline: 'none', fontSize: '0.875rem', boxSizing: 'border-box', fontFamily: 'inherit' }} />
                <button type="submit" style={{ width: '100%', padding: '14px', background: brandColor, color: '#fff', border: 'none', borderRadius: 12, fontWeight: 800, fontSize: '0.9375rem', cursor: 'pointer' }}>
                  Enviar Petición de Oración
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {activeModal === 'giving' && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 10001, background: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div style={{ background: '#fff', borderRadius: 24, padding: 32, maxWidth: 480, width: '100%', position: 'relative', boxShadow: '0 25px 60px rgba(0,0,0,0.3)', fontFamily: 'Inter, sans-serif', textAlign: 'center' }}>
            <button onClick={() => setActiveModal(null)} style={{ position: 'absolute', top: 20, right: 20, background: '#F1F5F9', border: 'none', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#64748B' }}>
              <X size={16} />
            </button>
            <div style={{ width: 56, height: 56, borderRadius: 16, background: `${brandColor}18`, color: brandColor, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <Gift size={28} />
            </div>
            <h2 style={{ fontWeight: 900, fontSize: '1.5rem', color: '#0F172A', marginBottom: 8 }}>Generosidad Digital</h2>
            <p style={{ color: '#64748B', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: 24 }}>
              "Cada uno dé como propuso en su corazón". Tu aporte transforma vidas y extiende nuestra labor social.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 20 }}>
              {['$10', '$25', '$50'].map(amt => (
                <button key={amt} onClick={() => alert(`Iniciando pasarela de donación por ${amt}`)} style={{ padding: '14px', borderRadius: 12, border: `2px solid ${brandColor}`, background: `${brandColor}10`, color: brandColor, fontWeight: 900, fontSize: '1.1rem', cursor: 'pointer' }}>
                  {amt}
                </button>
              ))}
            </div>
            <button onClick={() => alert('Iniciando pasarela de donación personalizada')} style={{ width: '100%', padding: '14px', background: brandColor, color: '#fff', border: 'none', borderRadius: 12, fontWeight: 800, fontSize: '0.9375rem', cursor: 'pointer' }}>
              Donar otro monto seguro →
            </button>
          </div>
        </div>
      )}
    </>
  )
}
