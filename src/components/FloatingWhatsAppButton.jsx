import { useState, useEffect, useRef } from 'react'

/**
 * FloatingWhatsAppButton
 * 
 * Floating WhatsApp button anchored always inside the page container (bottom-right).
 * - In Live / Public view: Directly redirects to WhatsApp (https://wa.me/<number>?text=...)
 * - In Edit mode: Clicking allows the user to configure the phone number, welcome message,
 *   and enable/disable the button directly on the canvas.
 * - positionMode: 
 *   - 'absolute': Pinned inside an absolute frame (e.g. editor device canvas wrapper, template preview).
 *   - 'fixed': Pinned in the live viewport.
 */
export default function FloatingWhatsAppButton({
  data = {},
  editMode = false,
  contained = true,
  positionMode = (contained ? 'absolute' : 'fixed'),
  onElementClick,
  onQuickUpdate,
  onQuickUpdateBatch,
}) {
  const whatsappNumber = data.whatsappNumber || data.contact?.whatsapp || data.whatsapp || ''
  const whatsappMessage = data.whatsappMessage || '¡Hola! Me gustaría más información.'
  const whatsappEnabled = data.whatsappEnabled !== false // default true

  const [isOpen, setIsOpen] = useState(false)
  const [phoneInput, setPhoneInput] = useState(whatsappNumber)
  const [messageInput, setMessageInput] = useState(whatsappMessage)
  const [savedSuccess, setSavedSuccess] = useState(false)
  const phoneInputRef = useRef(null)

  // Sync inputs whenever modal opens or underlying data changes
  useEffect(() => {
    setPhoneInput(whatsappNumber)
  }, [whatsappNumber])

  useEffect(() => {
    setMessageInput(whatsappMessage)
  }, [whatsappMessage])

  useEffect(() => {
    if (isOpen) {
      setPhoneInput(whatsappNumber)
      setMessageInput(whatsappMessage)
      const timer = setTimeout(() => {
        phoneInputRef.current?.focus()
      }, 60)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  // If disabled and in public view, render nothing
  if (!whatsappEnabled && !editMode) return null

  const cleanPhone = (whatsappNumber || '').replace(/[^0-9]/g, '')

  const handleButtonClick = (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (editMode) {
      setIsOpen((prev) => !prev)
      return
    }

    // Public mode
    if (cleanPhone) {
      const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(whatsappMessage)}`
      window.open(url, '_blank', 'noopener,noreferrer')
    } else {
      const el = document.getElementById('wp-contact') || document.getElementById('wp-plan-visit')
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      } else {
        alert('Número de WhatsApp aún no configurado.')
      }
    }
  }

  const handleSaveConfig = (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (onQuickUpdateBatch) {
      onQuickUpdateBatch([
        ['whatsappNumber', phoneInput],
        ['contact.whatsapp', phoneInput],
        ['whatsapp', phoneInput],
        ['whatsappMessage', messageInput],
      ])
    } else if (onQuickUpdate) {
      onQuickUpdate('whatsappNumber', phoneInput)
      onQuickUpdate('contact.whatsapp', phoneInput)
      onQuickUpdate('whatsapp', phoneInput)
      onQuickUpdate('whatsappMessage', messageInput)
    }

    setSavedSuccess(true)
    setTimeout(() => {
      setSavedSuccess(false)
      setIsOpen(false)
    }, 600)
  }

  const handleToggleEnable = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (onQuickUpdate) {
      onQuickUpdate('whatsappEnabled', !whatsappEnabled)
    }
  }

  const handleTestLink = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const testClean = (phoneInput || '').replace(/[^0-9]/g, '')
    if (testClean) {
      window.open(`https://wa.me/${testClean}?text=${encodeURIComponent(messageInput)}`, '_blank')
    } else {
      alert('Ingresa un número telefónico válido con código de país (ej: +503 7700-1122).')
    }
  }

  // If disabled in editMode, show a discreet reactivation chip inside the page corner
  if (!whatsappEnabled && editMode) {
    return (
      <div
        className="floating-whatsapp-wrapper"
        style={{
          position: positionMode,
          bottom: 20,
          right: 20,
          zIndex: positionMode === 'fixed' ? 9999 : 90,
          pointerEvents: 'auto',
          fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
        }}
      >
        <button
          type="button"
          onClick={handleToggleEnable}
          title="Haz clic para volver a activar el botón flotante de WhatsApp"
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            border: '1.5px dashed #94A3B8',
            color: '#64748B',
            padding: '7px 14px',
            borderRadius: 999,
            fontSize: '0.74rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            backdropFilter: 'blur(4px)',
          }}
        >
          <span style={{ fontSize: '0.85rem' }}>⚪</span>
          <span>WhatsApp Desactivado</span>
          <span style={{ color: '#16A34A', fontWeight: 800, textDecoration: 'underline', marginLeft: 2 }}>Activar</span>
        </button>
      </div>
    )
  }

  return (
    <div
      className="floating-whatsapp-wrapper"
      style={{
        position: positionMode,
        bottom: 24,
        right: 24,
        zIndex: positionMode === 'fixed' ? 9999 : 90,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: 10,
        fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
        pointerEvents: 'auto',
      }}
    >
      <style>{`
        @keyframes waPulse {
          0% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.6); }
          70% { box-shadow: 0 0 0 10px rgba(37, 211, 102, 0); }
          100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
        }
        .wa-floating-btn {
          animation: waPulse 2.8s infinite;
          transition: transform 0.22s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.22s ease;
        }
        .wa-floating-btn:hover {
          transform: scale(1.08) translateY(-2px);
          box-shadow: 0 12px 28px rgba(37, 211, 102, 0.55) !important;
        }
        .wa-tooltip-pill {
          transition: transform 0.2s ease, opacity 0.2s ease;
        }
      `}</style>

      {/* Inline Config Popover (Editor Mode) */}
      {editMode && isOpen && (
        <div
          onClick={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
          onPointerDown={(e) => e.stopPropagation()}
          style={{
            width: 320,
            maxWidth: 'calc(100vw - 36px)',
            background: '#FFFFFF',
            color: '#0F172A',
            borderRadius: 18,
            boxShadow: '0 20px 50px rgba(15, 23, 42, 0.28), 0 4px 14px rgba(0,0,0,0.06)',
            border: '2px solid #25D366',
            padding: '18px 20px',
            marginBottom: 8,
            animation: 'fadeInUp 0.18s ease-out',
            textAlign: 'left',
            userSelect: 'text',
            cursor: 'default',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="#fff">
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.8 7.37 7.5 3.67 12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15ZM16.56 14.41C16.31 14.29 15.09 13.69 14.86 13.61C14.64 13.52 14.47 13.48 14.31 13.73C14.14 13.97 13.66 14.54 13.51 14.71C13.37 14.87 13.22 14.89 12.97 14.77C12.72 14.64 11.92 14.38 10.97 13.53C10.23 12.87 9.73 12.06 9.58 11.81C9.44 11.57 9.57 11.43 9.69 11.31C9.8 11.2 9.94 11.02 10.06 10.88C10.18 10.74 10.22 10.63 10.31 10.47C10.39 10.3 10.35 10.16 10.29 10.04C10.23 9.91 9.73 8.69 9.53 8.18C9.33 7.69 9.12 7.75 8.97 7.75C8.82 7.74 8.66 7.74 8.49 7.74C8.33 7.8 8.06 7.8 7.84 8.04C7.61 8.29 6.98 8.88 6.98 10.08C6.98 11.28 7.86 12.44 7.98 12.6C8.11 12.77 9.7 15.22 12.14 16.27C12.72 16.52 13.17 16.67 13.52 16.78C14.1 16.97 14.63 16.94 15.05 16.88C15.52 16.81 16.49 16.29 16.69 15.72C16.9 15.15 16.9 14.66 16.84 14.56C16.77 14.46 16.63 14.41 16.56 14.41Z" />
                </svg>
              </div>
              <span style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0F172A' }}>
                Botón de WhatsApp
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              style={{ background: 'none', border: 'none', fontSize: '1.1rem', cursor: 'pointer', color: '#64748B', padding: 4 }}
              title="Cerrar"
            >
              ✕
            </button>
          </div>

          {/* Enable / Disable toggle in popover */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 10px', background: whatsappEnabled ? '#F0FDF4' : '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: 10, marginBottom: 12 }}>
            <div>
              <div style={{ fontSize: '0.74rem', fontWeight: 800, color: whatsappEnabled ? '#166534' : '#64748B' }}>
                {whatsappEnabled ? '🟢 Botón Habilitado' : '⚪ Botón Deshabilitado'}
              </div>
              <div style={{ fontSize: '0.66rem', color: '#64748B' }}>
                {whatsappEnabled ? 'Visible dentro de tu página' : 'Oculto para los visitantes'}
              </div>
            </div>
            <button
              type="button"
              onClick={handleToggleEnable}
              style={{
                padding: '5px 12px',
                borderRadius: 999,
                border: 'none',
                background: whatsappEnabled ? '#FEE2E2' : '#DCFCE7',
                color: whatsappEnabled ? '#DC2626' : '#16A34A',
                fontSize: '0.72rem',
                fontWeight: 800,
                cursor: 'pointer'
              }}
            >
              {whatsappEnabled ? 'Desactivar' : 'Activar'}
            </button>
          </div>

          <div style={{ marginBottom: 12 }}>
            <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 800, color: '#334155', marginBottom: 5 }}>
              Número de Teléfono (con código de país):
            </label>
            <input
              ref={phoneInputRef}
              type="text"
              value={phoneInput}
              onChange={(e) => setPhoneInput(e.target.value)}
              onMouseDown={(e) => e.stopPropagation()}
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => e.stopPropagation()}
              onKeyUp={(e) => e.stopPropagation()}
              placeholder="Ej: +503 7700-1122"
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: 8,
                border: '1.5px solid #94A3B8',
                background: '#FFFFFF',
                color: '#0F172A',
                fontSize: '0.88rem',
                fontWeight: 600,
                outline: 'none',
                boxSizing: 'border-box',
                cursor: 'text',
                caretColor: '#16A34A',
                boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.04)',
              }}
            />
            <div style={{ fontSize: '0.68rem', color: '#64748B', marginTop: 4, fontWeight: 500 }}>
              Ejemplos: +503 7700-1122, +1 555-1234, +52 55...
            </div>
          </div>

          <div style={{ marginBottom: 14 }}>
            <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 800, color: '#334155', marginBottom: 5 }}>
              Mensaje Automático Inicial:
            </label>
            <textarea
              rows={3}
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onMouseDown={(e) => e.stopPropagation()}
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => e.stopPropagation()}
              onKeyUp={(e) => e.stopPropagation()}
              placeholder="Hola, me gustaría más información..."
              style={{
                width: '100%',
                padding: '9px 12px',
                borderRadius: 8,
                border: '1.5px solid #94A3B8',
                background: '#FFFFFF',
                color: '#0F172A',
                fontSize: '0.84rem',
                fontWeight: 500,
                outline: 'none',
                resize: 'none',
                boxSizing: 'border-box',
                cursor: 'text',
                caretColor: '#16A34A',
                boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.04)',
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            <button
              type="button"
              onClick={handleSaveConfig}
              style={{
                flex: 1,
                padding: '10px 14px',
                background: savedSuccess ? '#16A34A' : '#25D366',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: 999,
                fontWeight: 800,
                fontSize: '0.82rem',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(37,211,102,0.3)',
                transition: 'background 0.2s ease',
              }}
            >
              {savedSuccess ? '✓ ¡Guardado!' : 'Guardar Número'}
            </button>
            <button
              type="button"
              onClick={handleTestLink}
              title="Probar en una nueva pestaña"
              style={{
                padding: '10px 14px',
                background: '#F1F5F9',
                color: '#334155',
                border: '1px solid #CBD5E1',
                borderRadius: 999,
                fontWeight: 700,
                fontSize: '0.78rem',
                cursor: 'pointer',
              }}
            >
              Probar ↗
            </button>
          </div>
        </div>
      )}

      {/* Main Trigger Capsule & WhatsApp Circle */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {/* Tooltip Pill */}
        <div
          onClick={handleButtonClick}
          className="wa-tooltip-pill"
          style={{
            background: '#FFFFFF',
            padding: '7px 12px',
            borderRadius: 999,
            boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
            border: '1px solid rgba(0,0,0,0.06)',
            display: 'flex',
            alignItems: 'center',
            gap: 7,
            cursor: 'pointer',
            userSelect: 'none',
          }}
        >
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#25D366' }} />
          <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0F172A' }}>
            {editMode
              ? (cleanPhone ? `WhatsApp: ${whatsappNumber}` : '⚙️ Configurar WhatsApp')
              : '¿Dudas? Escríbenos'}
          </span>
        </div>

        {/* WhatsApp Round Button */}
        <div
          onClick={handleButtonClick}
          className="wa-floating-btn"
          title={editMode ? 'Clic para configurar WhatsApp' : 'Abrir chat de WhatsApp'}
          style={{
            width: 50,
            height: 50,
            borderRadius: '50%',
            background: '#25D366',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            cursor: 'pointer',
            boxShadow: '0 8px 24px rgba(37, 211, 102, 0.42)',
            position: 'relative',
            userSelect: 'none',
          }}
        >
          <svg viewBox="0 0 24 24" width="26" height="26" fill="white">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.8 7.37 7.5 3.67 12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15ZM16.56 14.41C16.31 14.29 15.09 13.69 14.86 13.61C14.64 13.52 14.47 13.48 14.31 13.73C14.14 13.97 13.66 14.54 13.51 14.71C13.37 14.87 13.22 14.89 12.97 14.77C12.72 14.64 11.92 14.38 10.97 13.53C10.23 12.87 9.73 12.06 9.58 11.81C9.44 11.57 9.57 11.43 9.69 11.31C9.8 11.2 9.94 11.02 10.06 10.88C10.18 10.74 10.22 10.63 10.31 10.47C10.39 10.3 10.35 10.16 10.29 10.04C10.23 9.91 9.73 8.69 9.53 8.18C9.33 7.69 9.12 7.75 8.97 7.75C8.82 7.74 8.66 7.74 8.49 7.74C8.33 7.8 8.06 7.8 7.84 8.04C7.61 8.29 6.98 8.88 6.98 10.08C6.98 11.28 7.86 12.44 7.98 12.6C8.11 12.77 9.7 15.22 12.14 16.27C12.72 16.52 13.17 16.67 13.52 16.78C14.1 16.97 14.63 16.94 15.05 16.88C15.52 16.81 16.49 16.29 16.69 15.72C16.9 15.15 16.9 14.66 16.84 14.56C16.77 14.46 16.63 14.41 16.56 14.41Z"
            />
          </svg>
          {editMode && (
            <div
              style={{
                position: 'absolute',
                top: -2,
                right: -2,
                width: 18,
                height: 18,
                borderRadius: '50%',
                background: '#0F172A',
                border: '2px solid #FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.58rem',
              }}
            >
              ✏️
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
