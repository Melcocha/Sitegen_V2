import React, { useState } from 'react'
import TemplateDragHandles from './TemplateDragHandles'
import SectionControlBar from './SectionControlBar'
import {
  HeroVisualLayout,
  HeroSplitLayout,
  WelcomeVisualLayout,
  WelcomeSplitLayout,
  VisitVisualLayout,
  VisitCardsLayout,
  ValuesVisualLayout,
  ValuesMinimalLayout,
  MinistriesVisualLayout,
  MinistriesGridLayout,
  NextStepsVisualLayout,
  NextStepsNumberedLayout,
  SermonsVisualLayout,
  SermonsCardsLayout,
  EventsVisualLayout,
  EventsCardsLayout,
  AboutVisualLayout,
  AboutSplitLayout
} from './ChurchSectionLayouts'

export default function ChurchTemplateMyGateway({ data = {}, editMode = false, activeField, onElementClick, onSectionChange, onQuickUpdate, onQuickUpdateBatch, device = 'desktop' }) {
  const isMobileDevice = device === 'mobile'
  const isTabletDevice = device === 'tablet'
  const rootClassName = `mygateway-template-root ${isMobileDevice ? 'is-mobile-device' : ''} ${isTabletDevice ? 'is-tablet-device' : ''}`.trim()

  const [menuOpen, setMenuOpen] = useState(false)

  const businessName = data.businessName || 'Calvary Chapel Northside'
  const logoImage = data.logoImage || ''
  const nav = data.nav || {}

  // Style override helper
  const ov = (k) => {
    if (!k || !data?.elementStyles) return {}
    if (data.elementStyles[k]) return data.elementStyles[k]
    const keys = k.split('.')
    let cur = data.elementStyles
    for (const key of keys) {
      if (!cur || typeof cur !== 'object') return {}
      cur = cur[key]
    }
    return (cur && typeof cur === 'object') ? cur : {}
  }
  const isActive = (k) => editMode && activeField && activeField === k
  const ost = (k) => ({
    ...(ov(k).textColor ? { color: ov(k).textColor } : {}),
    ...(ov(k).bgColor ? { background: ov(k).bgColor } : {}),
    ...(ov(k).boxShadow ? { boxShadow: ov(k).boxShadow } : {}),
    ...(ov(k).fontWeight ? { fontWeight: ov(k).fontWeight } : {}),
    ...(ov(k).fontSize ? { fontSize: ov(k).fontSize } : {}),
    ...(ov(k).fontFamily ? { fontFamily: ov(k).fontFamily } : {}),
    ...(ov(k).lineHeight ? { lineHeight: ov(k).lineHeight } : {}),
    ...(ov(k).opacity !== undefined && ov(k).opacity !== null ? { opacity: ov(k).opacity } : {}),
    ...(ov(k).textAlign ? { textAlign: ov(k).textAlign } : {}),
    ...(ov(k).width ? { width: ov(k).width } : {}),
    ...(ov(k).maxWidth ? { maxWidth: ov(k).maxWidth } : {}),
    ...(ov(k).maxHeight ? { maxHeight: ov(k).maxHeight } : {}),
    ...(ov(k).height ? { height: ov(k).height } : {}),
    ...(ov(k).margin ? { margin: ov(k).margin } : {}),
    ...(ov(k).transform ? { transform: ov(k).transform } : {}),
    ...(ov(k).borderRadius ? { borderRadius: ov(k).borderRadius } : {}),
    ...(ov(k).objectFit ? { objectFit: ov(k).objectFit } : {}),
    ...(ov(k).filter ? { filter: ov(k).filter } : {}),
  })

  const rdh = (k) => isActive(k) && (
    <TemplateDragHandles
      ovKey={k}
      isActive={true}
      ovStyle={ov(k)}
      onQuickUpdate={onQuickUpdate}
      onQuickUpdateBatch={onQuickUpdateBatch}
    />
  )

  const hero = data.hero || {
    eyebrow: 'BIENVENIDO A CASA',
    headline: '¿Listo para hacer de esta tu iglesia?',
    subheadline: '¡Estamos tan alegres de que hayas elegido adorar con nosotros! Si estás listo para hacer de nuestra iglesia tu hogar espiritual, aquí están tus siguientes pasos.',
    ctaText: 'Planifica tu Visita',
    ctaLink: '#wp-plan-visit',
    ctaSecondary: 'Da tu Siguiente Paso',
    ctaSecondaryLink: '#wp-next-steps'
  }

  const eventsRaw = data.events || {}
  const events = Array.isArray(eventsRaw)
    ? eventsRaw
    : (Array.isArray(eventsRaw.items) ? eventsRaw.items : [
        {
          dateDay: '15',
          day: '15',
          dateMonth: 'SEP',
          month: 'SEP',
          title: 'Conferencia de Jóvenes: "Fuego & Fe"',
          time: '6:30 PM — Auditorio Central',
          desc: 'Una noche inmersiva de adoración, palabra y conexión para jóvenes de 12 a 28 años.',
          description: 'Una noche inmersiva de adoración, palabra y conexión para jóvenes de 12 a 28 años.',
          btnText: 'Inscribirme al Evento',
          image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=85&fit=crop'
        },
        {
          dateDay: '22',
          day: '22',
          dateMonth: 'SEP',
          month: 'SEP',
          title: 'Noche Especial de Oración & Adoración',
          time: '7:00 PM — Templo Principal',
          desc: 'Nos unimos como una sola voz para clamar por nuestras familias, ciudad y país.',
          description: 'Nos unimos como una sola voz para clamar por nuestras familias, ciudad y país.',
          btnText: 'Inscribirme al Evento',
          image: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?w=800&q=85&fit=crop'
        },
        {
          dateDay: '05',
          day: '05',
          dateMonth: 'OCT',
          month: 'OCT',
          title: 'Taller para Matrimonios & Parejas',
          time: '9:00 AM — Salón de Eventos',
          desc: 'Herramientas prácticas y principios bíblicos para fortalecer la comunicación y el amor en el hogar.',
          description: 'Herramientas prácticas para fortalecer el hogar y el matrimonio.',
          btnText: 'Inscribirme al Evento',
          image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=85&fit=crop'
        }
      ])
  const evPrefix = Array.isArray(eventsRaw) ? 'events' : 'events.items'

  const testimonials = data.testimonials || [
    {
      quote: 'Llegué buscando respuestas en un momento oscuro y encontré una familia que me recibió con los brazos abiertos. Mi vida y mi matrimonio fueron restaurados.',
      author: 'Carlos & María Delgado',
      role: 'Miembros desde 2022',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=85&fit=crop'
    },
    {
      quote: 'Mis hijos aman venir los domingos al KidZone. Saber que están seguros y aprendiendo de Dios me da una paz inmensa.',
      author: 'Elena Fuentes',
      role: 'Madre de Familia',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=85&fit=crop'
    }
  ]

  const nextStepsSection = data.nextSteps || {
    eyebrow: 'INVOLÚCRATE',
    title: 'Próximos Pasos',
    subtitle: 'Explora la vida de nuestra iglesia incluyendo nuestros ministerios, próximos eventos y oportunidades para servir a la comunidad.',
    ctaPrimary: 'Da tu Siguiente Paso',
    ctaSecondary: 'Comparte tu Historia',
    image: 'https://images.unsplash.com/photo-1544427920-c49ccfb85579?w=1400&q=85&fit=crop'
  }

  const planAVisit = data.planAVisit || {
    eyebrow: 'DOMINGOS A LAS 9:00 & 11:00 AM',
    title: 'Planifica tu Visita',
    subtitle: '¡Acompáñanos en persona! Nos encantaría recibirte. Encuentra horarios, direcciones y todo lo necesario para tu primera visita haciendo clic abajo.',
    ctaText: 'Planifica tu Visita',
    image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1400&q=85&fit=crop'
  }

  const heroImage = data.heroImage || 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1920&q=85&fit=crop'

  const isVideoUrl = (url) => {
    if (!url || typeof url !== 'string') return false
    return /\.(mp4|webm|mov|ogg)($|\?)/i.test(url) || url.startsWith('data:video/')
  }

  const handleEdit = (e, fieldKey, fieldLabel, fieldType = 'text', currentVal = '', extra = {}) => {
    if (editMode && onElementClick) {
      e.preventDefault()
      e.stopPropagation()
      const r = e.currentTarget ? e.currentTarget.getBoundingClientRect() : { left: e.clientX, bottom: e.clientY }
      onElementClick({
        field: fieldKey,
        key: fieldKey,
        ovKey: fieldKey,
        label: fieldLabel,
        type: fieldType,
        value: currentVal || '',
        x: r.left || e.clientX,
        y: (r.bottom ? r.bottom + 8 : e.clientY),
        ...extra
      })
    }
  }

  const handleNavClick = (e, targetHash, fieldKey, fieldLabel, currentText, extra = {}) => {
    if (editMode && onElementClick) {
      e.preventDefault()
      e.stopPropagation()
      handleEdit(e, fieldKey, fieldLabel, 'text', currentText, extra)
      return
    }
    if (targetHash) {
      if (targetHash.startsWith('http://') || targetHash.startsWith('https://') || targetHash.startsWith('mailto:') || targetHash.startsWith('tel:')) {
        return
      }
      if (targetHash.startsWith('#')) {
        e.preventDefault()
        try {
          const targetEl = document.querySelector(targetHash)
          if (targetEl) {
            targetEl.scrollIntoView({ behavior: 'smooth' })
          }
        } catch (err) {
          console.warn('Navigation selector error:', err)
        }
      }
    }
  }

  const activeFont = data.font || 'Plus Jakarta Sans'
  const primaryBg = data.primaryColor || '#05070C'
  const accentCyan = data.accentColor || '#00D8F6'

  const DEFAULT_MYGATEWAY_ORDER = [
    'hero',
    'nextSteps',
    'nucleusColumns',
    'testimonials',
    'planAVisit',
    'welcome',
    'values',
    'ministries',
    'sermons',
    'donation',
    'prayerRequest',
    'about',
    'contact'
  ]
  const activeOrder = (Array.isArray(data.sectionOrder) && data.sectionOrder.length > 0) ? data.sectionOrder : DEFAULT_MYGATEWAY_ORDER
  const visibility = data.sectionsVisibility || {}
  const welcome = data.welcome || {}
  const layouts = data.sectionLayouts || {}

  const handleMoveUp = (key) => {
    const curIdx = activeOrder.indexOf(key)
    if (curIdx > 0) {
      const newOrder = [...activeOrder]
      const temp = newOrder[curIdx]
      newOrder[curIdx] = newOrder[curIdx - 1]
      newOrder[curIdx - 1] = temp
      if (onSectionChange) onSectionChange('sectionOrder', newOrder)
      else if (onQuickUpdate) onQuickUpdate('sectionOrder', newOrder)
    }
  }

  const handleMoveDown = (key) => {
    const curIdx = activeOrder.indexOf(key)
    if (curIdx >= 0 && curIdx < activeOrder.length - 1) {
      const newOrder = [...activeOrder]
      const temp = newOrder[curIdx]
      newOrder[curIdx] = newOrder[curIdx + 1]
      newOrder[curIdx + 1] = temp
      if (onSectionChange) onSectionChange('sectionOrder', newOrder)
      else if (onQuickUpdate) onQuickUpdate('sectionOrder', newOrder)
    }
  }

  const handleDeleteSection = (key) => {
    if (onSectionChange) onSectionChange(`sectionsVisibility.${key}`, false)
    else if (onQuickUpdate) onQuickUpdate(`sectionsVisibility.${key}`, false)
  }

  return (
    <div className={rootClassName} style={{ position: 'relative', containerType: 'inline-size', fontFamily: `'${activeFont}', 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif`, color: '#111827', background: primaryBg, margin: 0, padding: 0, width: '100%', overflowX: 'hidden' }}>
      <link rel="stylesheet" href={`https://fonts.googleapis.com/css2?family=${encodeURIComponent(activeFont.replace(/'/g, ''))}:wght@400;500;600;700;800;900&display=swap`} />
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
        
        .mygateway-template-root {
          container-type: inline-size;
        }
        .mygateway-template-root .northside-hero-h1 {
          font-family: '${activeFont}', system-ui, sans-serif;
          font-weight: 900;
          letter-spacing: -0.04em;
          line-height: 1.05;
          color: #FFFFFF;
          text-shadow: 0 4px 30px rgba(0,0,0,0.7);
        }
        .mygateway-template-root .northside-btn-vibrant {
          background: ${accentCyan};
          color: #0F172A;
          font-weight: 900;
          transition: all 0.2s ease;
          box-shadow: 0 6px 20px ${accentCyan}55;
        }
        .mygateway-template-root .northside-btn-vibrant:hover {
          background: #BE123C;
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(225, 29, 72, 0.55);
        }
        .mygateway-template-root .northside-btn-vibrant-outline {
          border: 2px solid #E11D48;
          color: #E11D48;
          background: transparent;
          font-weight: 800;
          transition: all 0.2s ease;
        }
        .mygateway-template-root .northside-btn-vibrant-outline:hover {
          background: #E11D48;
          color: #FFFFFF;
          transform: translateY(-2px);
        }
        .mygateway-template-root .northside-btn-white {
          background: #FFFFFF;
          color: #000000;
          font-weight: 800;
          transition: all 0.2s ease;
        }
        .mygateway-template-root .northside-btn-white:hover {
          background: #F3F4F6;
          transform: translateY(-2px);
        }
        .mygateway-template-root .northside-btn-white-outline {
          border: 1.5px solid #FFFFFF;
          color: #FFFFFF;
          background: transparent;
          font-weight: 800;
          transition: all 0.2s ease;
        }
        .mygateway-template-root .northside-btn-white-outline:hover {
          background: #FFFFFF;
          color: #000000;
          transform: translateY(-2px);
        }
        .mygateway-template-root .editable-element {
          cursor: ${editMode ? 'pointer' : 'default'};
          transition: outline 0.15s ease;
        }
        .mygateway-template-root .editable-element:hover {
          ${editMode ? 'outline: 2px dashed #E11D48; outline-offset: 4px;' : ''}
        }

        @container (max-width: 768px) {
          .mygateway-template-root img[data-field="logoImage"] {
            max-width: 180px !important;
            max-height: 44px !important;
          }
          .mygateway-template-root section {
            padding: 40px 16px !important;
          }
          .mygateway-template-root .northside-hero-h1, 
          .mygateway-template-root h1 {
            font-size: clamp(1.6rem, 7.5vw, 2.5rem) !important;
            line-height: 1.15 !important;
            margin-bottom: 16px !important;
            word-break: break-word !important;
            overflow-wrap: break-word !important;
          }
          .mygateway-template-root h2 {
            font-size: clamp(1.6rem, 6.5vw, 2.4rem) !important;
            word-break: break-word !important;
          }
          .mygateway-template-root p {
            font-size: 0.95rem !important;
            line-height: 1.5 !important;
          }
          .mygateway-template-root section div[style*="display: grid"], 
          .mygateway-template-root section div[style*="display:grid"] {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
        }

        @media (max-width: 768px) {
          .mygateway-template-root img[data-field="logoImage"] {
            max-width: 180px !important;
            max-height: 44px !important;
          }
          .mygateway-template-root section {
            padding: 40px 16px !important;
          }
          .mygateway-template-root .northside-hero-h1, 
          .mygateway-template-root h1 {
            font-size: clamp(1.6rem, 7.5vw, 2.5rem) !important;
            line-height: 1.15 !important;
            margin-bottom: 16px !important;
            word-break: break-word !important;
            overflow-wrap: break-word !important;
          }
          .mygateway-template-root h2 {
            font-size: clamp(1.6rem, 6.5vw, 2.4rem) !important;
            word-break: break-word !important;
          }
          .mygateway-template-root p {
            font-size: 0.95rem !important;
            line-height: 1.5 !important;
          }
          .mygateway-template-root section div[style*="display: grid"], 
          .mygateway-template-root section div[style*="display:grid"] {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
        }
      `}</style>

      {/* ── DYNAMIC SECTIONS LOOP ── */}
      {activeOrder.map((sectionKey, sIdx) => {
        if (visibility[sectionKey] === false) return null
        const canUp = sIdx > 0
        const canDown = sIdx < activeOrder.length - 1

        const wrap = (secContent, label) => (
          <SectionControlBar
            key={sectionKey}
            sectionKey={sectionKey}
            label={label}
            canMoveUp={canUp}
            canMoveDown={canDown}
            onMoveUp={() => handleMoveUp(sectionKey)}
            onMoveDown={() => handleMoveDown(sectionKey)}
            onDelete={() => handleDeleteSection(sectionKey)}
            editMode={editMode}
            accentColor="#E11D48"
            primaryColor="#05070C"
          >
            {secContent}
          </SectionControlBar>
        )

        switch (sectionKey) {
          case 'hero':
            if (layouts.hero === 'visual') {
              return wrap(
                <HeroVisualLayout
                  data={data}
                  hero={hero}
                  editMode={editMode}
                  handleEdit={handleEdit}
                  handleNavClick={handleNavClick}
                  ost={ost}
                  rdh={rdh}
                  accentColor={accentCyan}
                  font={activeFont}
                />,
                'Hero Portada (Visual)'
              )
            }
            if (layouts.hero === 'split') {
              return wrap(
                <HeroSplitLayout
                  data={data}
                  hero={hero}
                  editMode={editMode}
                  handleEdit={handleEdit}
                  handleNavClick={handleNavClick}
                  ost={ost}
                  rdh={rdh}
                  accentColor={accentCyan}
                  primaryBg={'#0B0F19'}
                  font={activeFont}
                />,
                'Hero Portada (Split)'
              )
            }
            return wrap(
              <section id="wp-hero" style={{ position: 'relative', width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '36px 5% 50px', boxSizing: 'border-box', background: '#05070C', overflow: 'hidden' }}>
        <div
          data-field="heroImage"
          data-ovkey="heroImage"
          className="editable-element"
          onClick={(e) => handleEdit(e, 'heroImage', 'Imagen de Portada (Hero)', 'image', heroImage)}
          style={{ ...ost('heroImage'), position: 'absolute', inset: 0, width: '100%', height: '100%', margin: 0, maxWidth: 'none', maxHeight: 'none', zIndex: 0, cursor: editMode ? 'pointer' : 'default' }}
        >
          {data.heroVideo || isVideoUrl(heroImage) ? (
            <video
              src={data.heroVideo || heroImage}
              autoPlay
              loop
              muted
              playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', filter: 'brightness(0.68) contrast(1.08)' }}
            />
          ) : (
            <img
              src={heroImage || 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1920&q=85&fit=crop'}
              alt={businessName}
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1920&q=85&fit=crop'
              }}
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', filter: 'brightness(0.68) contrast(1.08)' }}
            />
          )}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(5,7,12,0.4) 0%, rgba(5,7,12,0.15) 50%, rgba(5,7,12,0.85) 100%)', pointerEvents: 'none' }} />
        </div>

        <div style={{ position: 'relative', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {logoImage ? (
              <img
                data-field="logoImage"
                data-ovkey="logoImage"
                src={logoImage}
                alt={businessName}
                className="editable-element"
                onClick={(e) => handleEdit(e, 'logoImage', 'Imagen de Logo (Subir o Cambiar)', 'image', logoImage)}
                style={{ maxHeight: 68, maxWidth: 360, objectFit: 'contain', cursor: editMode ? 'pointer' : 'default', ...ost('logoImage') }}
              />
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div
                  data-field="logoImage"
                  data-ovkey="logoImage"
                  className="editable-element"
                  onClick={(e) => handleEdit(e, 'logoImage', 'Subir Imagen de Logo', 'image', logoImage)}
                  title="Haz clic para subir un logo en imagen"
                  style={{ width: 44, height: 44, borderRadius: '38% 62% 63% 37% / 41% 44% 56% 59%', background: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000000', fontWeight: 900, fontSize: '1.25rem', boxShadow: '0 4px 20px rgba(0,0,0,0.4)', cursor: editMode ? 'pointer' : 'default', ...ost('logoImage') }}
                >
                  {(businessName || 'N')[0]}
                </div>
                <div
                  data-field="businessName"
                  data-ovkey="businessName"
                  className="editable-element"
                  onClick={(e) => handleEdit(e, 'businessName', 'Nombre de la Iglesia', 'text', businessName)}
                  style={{ color: '#FFFFFF', fontWeight: 900, fontSize: '1.1rem', letterSpacing: '-0.02em', textShadow: '0 2px 10px rgba(0,0,0,0.8)', cursor: editMode ? 'pointer' : 'default', ...ost('businessName') }}
                >
                  {businessName}
                </div>
              </div>
            )}
          </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <a
            data-field="nav.ctaText"
            data-ovkey="nav.ctaText"
            href={data.nav?.ctaLink || data.hero?.ctaLink || data.navCtaLink || '#wp-plan-visit'}
            onClick={(e) => handleNavClick(e, data.nav?.ctaLink || data.hero?.ctaLink || data.navCtaLink || '#wp-plan-visit', 'nav.ctaText', 'Botón Navbar — Texto y Estilo', data.nav?.ctaText || data.hero?.ctaText || data.navCtaText || 'Planifica tu Visita')}
            className="editable-element"
            style={{
              background: '#E11D48',
              color: '#FFFFFF',
              padding: '8px 20px',
              borderRadius: 999,
              textDecoration: 'none',
              fontSize: '0.85rem',
              fontWeight: 800,
              ...ost('nav.ctaText')
            }}
          >
            {data.nav?.ctaText || data.hero?.ctaText || data.navCtaText || 'Planifica tu Visita'}
          </a>
          {/* Hamburger button wrapper — always opens menu; in edit mode a pencil badge appears on hover */}
          <div style={{ position: 'relative', display: 'inline-flex' }}>
            <button
              data-field="nav.menuBtn"
              data-ovkey="nav.menuBtn"
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
              onClick={() => setMenuOpen(!menuOpen)}
              className={editMode ? 'editable-element' : ''}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 0,
                width: 44, height: 44,
                background: menuOpen ? '#E11D48' : 'rgba(255,255,255,0.12)',
                backdropFilter: 'blur(10px)',
                border: menuOpen ? '1.5px solid #E11D48' : '1.5px solid rgba(255,255,255,0.25)',
                borderRadius: 12,
                cursor: 'pointer',
                transition: 'all 0.22s cubic-bezier(0.22,1,0.36,1)',
                padding: 0,
                ...ost('nav.menuBtn'),
              }}
            >
              <svg
                viewBox="0 0 24 24"
                width="20" height="20"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="2.2"
                strokeLinecap="round"
                style={{ transition: 'all 0.22s', pointerEvents: 'none' }}
              >
                {menuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="4" y1="7" x2="20" y2="7" />
                    <line x1="4" y1="12" x2="20" y2="12" />
                    <line x1="4" y1="17" x2="20" y2="17" />
                  </>
                )}
              </svg>
            </button>

            {/* Edit badge — only visible in edit mode on hover */}
            {editMode && (
              <button
                onClick={(e) => handleEdit(e, 'nav.menuBtn', 'Botón Menú Hamburguesa', 'style', '')}
                title="Editar estilos del botón"
                style={{
                  position: 'absolute',
                  top: -8, right: -8,
                  width: 20, height: 20,
                  borderRadius: '50%',
                  background: '#6366F1',
                  border: '2px solid #fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 20,
                  padding: 0,
                  boxShadow: '0 2px 8px rgba(99,102,241,0.5)',
                }}
              >
                <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="#fff" strokeWidth="2.5">
                  <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                  <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
              </button>
            )}
          </div>
        </div>

        {menuOpen && (
          <>
            {/* Backdrop overlay to close menu */}
            <div
              onClick={() => setMenuOpen(false)}
              style={{ position: 'fixed', inset: 0, zIndex: 98, cursor: 'default' }}
            />
            <div style={{
              position: 'absolute', top: 64, right: 0, zIndex: 99,
              background: 'rgba(8,10,16,0.97)',
              backdropFilter: 'blur(24px)',
              border: '1px solid rgba(255,255,255,0.10)',
              borderRadius: 18,
              padding: '8px 0',
              display: 'flex', flexDirection: 'column',
              boxShadow: '0 24px 60px rgba(0,0,0,0.9)',
              minWidth: 240,
              animation: 'mgMenuIn 0.22s cubic-bezier(0.22,1,0.36,1)',
            }}>
              <style>{`
                @keyframes mgMenuIn {
                  from { opacity: 0; transform: translateY(-8px) scale(0.97); }
                  to   { opacity: 1; transform: translateY(0) scale(1); }
                }
                .mg-nav-item {
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  padding: 14px 24px;
                  color: #FFFFFF;
                  text-decoration: none;
                  font-weight: 700;
                  font-size: 0.95rem;
                  border-radius: 0;
                  transition: background 0.15s, color 0.15s;
                  cursor: pointer;
                }
                .mg-nav-item:hover {
                  background: rgba(225,29,72,0.15);
                  color: #E11D48;
                }
                .mg-nav-item svg {
                  opacity: 0;
                  transition: opacity 0.15s, transform 0.15s;
                  transform: translateX(-4px);
                }
                .mg-nav-item:hover svg {
                  opacity: 1;
                  transform: translateX(0);
                }
              `}</style>

              {((Array.isArray(data.navLinks) && data.navLinks.length > 0) ? data.navLinks : [
                { text: nav.item1 || 'Planifica tu Visita', href: '#wp-plan-visit' },
                { text: nav.item2 || 'Próximos Pasos', href: '#wp-next-steps' },
                { text: nav.item3 || 'Próximos Eventos', href: '#wp-eventos' },
                { text: nav.item4 || 'Ubicación & Contacto', href: '#wp-contact' },
              ]).map((item, idx, arr) => {
                const itemLabel = item.text || item.label || 'Link'
                return (
                  <div key={idx}>
                    <a
                      data-field={`navLinks.${idx}.text`}
                      data-ovkey={`navLinks.${idx}.text`}
                      href={editMode ? undefined : (item.href || '#wp-hero')}
                      onClick={(e) => {
                        if (editMode) {
                          e.preventDefault()
                          handleEdit(e, `navLinks.${idx}.text`, `Menú: ítem ${idx + 1}`, 'text', itemLabel)
                        } else {
                          setMenuOpen(false)
                          handleNavClick(e, item.href || '#wp-hero', `navLinks.${idx}.text`, `Menú: ${itemLabel}`, itemLabel)
                        }
                      }}
                      className="mg-nav-item editable-element"
                      style={ost(`navLinks.${idx}.text`)}
                    >
                      {itemLabel}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="5" y1="12" x2="19" y2="12"/>
                        <polyline points="12 5 19 12 12 19"/>
                      </svg>
                    </a>
                    {idx < arr.length - 1 && (
                      <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '0 16px' }} />
                    )}
                  </div>
                )
              })}
            </div>
          </>
        )}
        </div>

        <div style={{ position: 'relative', zIndex: 5, maxWidth: 640, width: '100%', margin: '40px 0 20px', justifySelf: 'start' }}>
          {hero.eyebrow && (
            <div
              data-field="hero.eyebrow"
              data-ovkey="hero.eyebrow"
              className="editable-element"
              onClick={(e) => handleEdit(e, 'hero.eyebrow', 'Etiqueta Hero', 'text', hero.eyebrow)}
              style={{ fontSize: '0.85rem', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: accentCyan, marginBottom: 12, ...ost('hero.eyebrow') }}
            >
              {hero.eyebrow}
            </div>
          )}
          <h1
            data-field="hero.headline"
            data-ovkey="hero.headline"
            className="northside-hero-h1 editable-element"
            onClick={(e) => handleEdit(e, 'hero.headline', 'Título Principal (Hero)', 'text', hero.headline)}
            style={{ fontSize: 'clamp(3rem, 6.5vw, 5.4rem)', margin: '0 0 20px', ...ost('hero.headline') }}
          >
            {hero.headline}
          </h1>
          <p
            data-field="hero.subheadline"
            data-ovkey="hero.subheadline"
            className="editable-element"
            onClick={(e) => handleEdit(e, 'hero.subheadline', 'Descripción Principal (Hero)', 'textarea', hero.subheadline)}
            style={{ fontSize: '1.15rem', lineHeight: 1.6, color: '#E2E8F0', margin: '0 0 32px', fontWeight: 500, textShadow: '0 2px 10px rgba(0,0,0,0.8)', maxWidth: 540, ...ost('hero.subheadline') }}
          >
            {hero.subheadline}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
            <a
              data-field="hero.ctaText"
              data-ovkey="hero.ctaText"
              href={hero.ctaLink || '#wp-plan-visit'}
              className="northside-btn-vibrant editable-element"
              onClick={(e) => handleNavClick(e, hero.ctaLink || '#wp-plan-visit', 'hero.ctaText', 'Texto Botón Principal', hero.ctaText)}
              style={{ display: 'inline-block', padding: '16px 36px', borderRadius: 999, textDecoration: 'none', fontSize: '0.95rem', ...ost('hero.ctaText') }}
            >
              {hero.ctaText}
            </a>
            <a
              data-field="hero.ctaSecondary"
              data-ovkey="hero.ctaSecondary"
              href={hero.ctaSecondaryLink || '#wp-next-steps'}
              className="editable-element"
              onClick={(e) => handleNavClick(e, hero.ctaSecondaryLink || '#wp-next-steps', 'hero.ctaSecondary', 'Texto Botón Secundario', hero.ctaSecondary)}
              style={{ display: 'inline-block', padding: '15px 34px', borderRadius: 999, textDecoration: 'none', fontSize: '0.95rem', background: 'rgba(0,0,0,0.5)', border: '1.5px solid #FFFFFF', color: '#FFFFFF', fontWeight: 800, backdropFilter: 'blur(8px)', ...ost('hero.ctaSecondary') }}
            >
              {hero.ctaSecondary}
            </a>
          </div>
        </div>

        <div style={{ position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
          <a
            href="#wp-next-steps"
            onClick={(e) => handleNavClick(e, '#wp-next-steps', 'nextSteps.title', 'Menú Flotante Próximos Pasos', 'Próximos Pasos')}
            style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,0.92)', color: '#000000', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.4)', fontSize: '0.62rem', fontWeight: 900, lineHeight: 1.1 }}
          >
            <span>Próximos</span>
            <span>Pasos</span>
          </a>
        </div>
      </section>,
              'Hero Portada'
            )
          case 'nextSteps':
            if (layouts.nextSteps === 'visual') {
              return wrap(
                <NextStepsVisualLayout
                  data={data}
                  nextSteps={data.nextSteps || {}}
                  editMode={editMode}
                  handleEdit={handleEdit}
                  handleNavClick={handleNavClick}
                  ost={ost}
                  accentColor={accentCyan}
                  primaryBg={'#0B0F19'}
                  font={activeFont}
                />,
                'Próximos Pasos (Solo Fotos)'
              )
            }
            if (layouts.nextSteps === 'steps') {
              return wrap(
                <NextStepsNumberedLayout
                  data={data}
                  nextSteps={data.nextSteps || {}}
                  editMode={editMode}
                  handleEdit={handleEdit}
                  handleNavClick={handleNavClick}
                  ost={ost}
                  accentColor={accentCyan}
                  primaryBg={'#0B0F19'}
                  font={activeFont}
                />,
                'Próximos Pasos (3 Pasos)'
              )
            }
            return wrap(
              <section id="wp-next-steps" style={{ width: '100%', margin: 0, padding: 0, background: '#FFFFFF', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', alignItems: 'stretch' }}>
        <div style={{ padding: '100px 10%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', background: '#FFFFFF' }}>
          <div
            data-field="nextSteps.eyebrow"
            data-ovkey="nextSteps.eyebrow"
            className="editable-element"
            onClick={(e) => handleEdit(e, 'nextSteps.eyebrow', 'Etiqueta Próximos Pasos', 'text', nextStepsSection.eyebrow)}
            style={{ fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#4B5563', marginBottom: 18, ...ost('nextSteps.eyebrow') }}
          >
            {nextStepsSection.eyebrow}
          </div>
          <h2
            data-field="nextSteps.title"
            data-ovkey="nextSteps.title"
            className="editable-element"
            onClick={(e) => handleEdit(e, 'nextSteps.title', 'Título Próximos Pasos', 'text', nextStepsSection.title)}
            style={{ fontSize: 'clamp(2.8rem, 5vw, 4.2rem)', fontWeight: 900, color: '#000000', margin: '0 0 20px', letterSpacing: '-0.03em', lineHeight: 1.05, ...ost('nextSteps.title') }}
          >
            {nextStepsSection.title}
          </h2>
          <p
            data-field="nextSteps.subtitle"
            data-ovkey="nextSteps.subtitle"
            className="editable-element"
            onClick={(e) => handleEdit(e, 'nextSteps.subtitle', 'Descripción Próximos Pasos', 'textarea', nextStepsSection.subtitle)}
            style={{ fontSize: '1.125rem', lineHeight: 1.7, color: '#4B5563', margin: '0 0 36px', maxWidth: 460, ...ost('nextSteps.subtitle') }}
          >
            {nextStepsSection.subtitle}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', maxWidth: 300 }}>
            <a
              data-field="nextSteps.ctaPrimary"
              data-ovkey="nextSteps.ctaPrimary"
              href="#wp-contact"
              className="northside-btn-vibrant editable-element"
              onClick={(e) => handleNavClick(e, '#wp-contact', 'nextSteps.ctaPrimary', 'Botón Principal Próximos Pasos', nextStepsSection.ctaPrimary || nextStepsSection.ctaText || 'Da tu Siguiente Paso')}
              style={{ display: 'block', textAlign: 'center', padding: '16px 28px', borderRadius: 999, textDecoration: 'none', fontSize: '0.9rem', ...ost('nextSteps.ctaPrimary') }}
            >
              {nextStepsSection.ctaPrimary || nextStepsSection.ctaText || 'Da tu Siguiente Paso'}
            </a>
            <a
              data-field="nextSteps.ctaSecondary"
              data-ovkey="nextSteps.ctaSecondary"
              href="#wp-plan-visit"
              className="northside-btn-vibrant-outline editable-element"
              onClick={(e) => handleNavClick(e, '#wp-plan-visit', 'nextSteps.ctaSecondary', 'Botón Secundario Próximos Pasos', nextStepsSection.ctaSecondary || 'Comparte tu Historia')}
              style={{ display: 'block', textAlign: 'center', padding: '15px 28px', borderRadius: 999, textDecoration: 'none', fontSize: '0.9rem', ...ost('nextSteps.ctaSecondary') }}
            >
              {nextStepsSection.ctaSecondary || nextStepsSection.ctaSecondaryText || 'Comparte tu Historia'}
            </a>
          </div>
        </div>

        <div
          data-field="nextSteps.image"
          data-ovkey="nextSteps.image"
          className="editable-element"
          onClick={(e) => handleEdit(e, 'nextSteps.image', 'Foto Sección Próximos Pasos', 'image', nextStepsSection.image)}
          style={{ minHeight: 600, position: 'relative', overflow: 'hidden', cursor: editMode ? 'pointer' : 'default', ...ost('nextSteps.image') }}
        >
          {isVideoUrl(nextStepsSection.image) ? (
            <video
              src={nextStepsSection.image}
              autoPlay
              loop
              muted
              playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          ) : (
            <img
              src={nextStepsSection.image || 'https://images.unsplash.com/photo-1544427920-c49ccfb85579?w=1400&q=85&fit=crop'}
              alt="Fachada de Iglesia"
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1544427920-c49ccfb85579?w=1400&q=85&fit=crop'
              }}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          )}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, #FFFFFF 0%, transparent 20%)', pointerEvents: 'none' }} />
        </div>
      </section>,
              'Próximos Pasos'
            )
          case 'nucleusColumns':
          case 'events':
            if (layouts.events === 'visual') {
              return wrap(
                <EventsVisualLayout
                  data={data}
                  events={data.events || []}
                  editMode={editMode}
                  handleEdit={handleEdit}
                  handleNavClick={handleNavClick}
                  ost={ost}
                  accentColor={accentCyan}
                  primaryBg={'#0B0F19'}
                  font={activeFont}
                />,
                'Eventos (Solo Afiches)'
              )
            }
            if (layouts.events === 'cards') {
              return wrap(
                <EventsCardsLayout
                  data={data}
                  events={data.events || []}
                  editMode={editMode}
                  handleEdit={handleEdit}
                  handleNavClick={handleNavClick}
                  ost={ost}
                  accentColor={accentCyan}
                  primaryBg={'#0B0F19'}
                  font={activeFont}
                />,
                'Eventos (Tarjetas)'
              )
            }
            return wrap(
              <section id="wp-eventos" style={{ width: '100%', background: '#F8FAFC', padding: '120px 8%', boxSizing: 'border-box' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 70px' }}>
            <div
              data-field="events.eyebrow"
              data-ovkey="events.eyebrow"
              className="editable-element"
              onClick={(e) => handleEdit(e, 'events.eyebrow', 'Etiqueta Sección Eventos', 'text', data.events?.eyebrow || data.eventsHeader?.eyebrow || 'CALENDARIO DE ACTIVIDADES')}
              style={{ fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#E11D48', marginBottom: 12, ...ost('events.eyebrow') }}
            >
              {data.events?.eyebrow || data.eventsHeader?.eyebrow || 'CALENDARIO DE ACTIVIDADES'}
            </div>
            <h2
              data-field="events.title"
              data-ovkey="events.title"
              className="editable-element"
              onClick={(e) => handleEdit(e, 'events.title', 'Título Sección Eventos', 'text', data.events?.title || data.eventsHeader?.title || 'Próximos Eventos & Reuniones')}
              style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.5rem)', fontWeight: 900, color: '#0F172A', margin: 0, letterSpacing: '-0.03em', ...ost('events.title') }}
            >
              {data.events?.title || data.eventsHeader?.title || 'Próximos Eventos & Reuniones'}
            </h2>
          </div>

          <style>{`
            .mg-event-card {
              background: #FFFFFF;
              border-radius: 20px;
              overflow: visible;
              box-shadow: 0 4px 24px rgba(15, 23, 42, 0.07);
              border: 1px solid #F1F5F9;
              display: flex;
              flex-direction: column;
            }
            .mg-event-img-wrap {
              position: relative;
              height: 230px;
              overflow: hidden;
              border-radius: 20px 20px 0 0;
            }
            .mg-event-img-wrap img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
            .mg-event-date-badge {
              position: absolute;
              top: 16px;
              left: 16px;
              background: #FFFFFF;
              border-radius: 14px;
              padding: 10px 14px;
              display: flex;
              flex-direction: column;
              align-items: center;
              line-height: 1;
              box-shadow: 0 4px 16px rgba(0,0,0,0.15);
              min-width: 52px;
            }
            .mg-event-date-badge .day {
              font-size: 1.5rem;
              font-weight: 900;
              color: #E11D48;
              line-height: 1;
            }
            .mg-event-date-badge .month {
              font-size: 0.65rem;
              font-weight: 800;
              text-transform: uppercase;
              color: #64748B;
              letter-spacing: 0.06em;
              margin-top: 2px;
            }
            .mg-event-body {
              padding: 24px 28px 28px;
              display: flex;
              flex-direction: column;
              flex: 1;
            }
            .mg-event-time {
              display: inline-flex;
              align-items: center;
              gap: 6px;
              font-size: 0.78rem;
              font-weight: 700;
              color: #94A3B8;
              text-transform: uppercase;
              letter-spacing: 0.07em;
              margin-bottom: 14px;
            }
            .mg-event-cta {
              display: inline-flex;
              align-items: center;
              gap: 6px;
              margin-top: auto;
              padding-top: 20px;
              color: #E11D48;
              font-weight: 900;
              font-size: 0.88rem;
              text-decoration: none;
              border-top: 1px solid #F1F5F9;
              transition: gap 0.2s;
            }
            .mg-event-cta:hover {
              gap: 10px;
            }
          `}</style>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 28 }}>
            {events.map((ev, idx) => {
              const dayVal = ev.day || ev.dateDay || '15'
              const monthVal = ev.month || ev.dateMonth || 'SEP'
              const descVal = ev.description || ev.desc || ''
              const btnVal = ev.btnText || 'Inscribirme al Evento'
              return (
              <div key={idx} className="mg-event-card">
                {/* Image with date badge overlay */}
                <div
                  className="mg-event-img-wrap editable-element"
                  data-field={`${evPrefix}.${idx}.image`}
                  data-ovkey={`${evPrefix}.${idx}.image`}
                  onClick={(e) => handleEdit(e, `${evPrefix}.${idx}.image`, `Foto Evento ${idx + 1}`, 'image', ev.image)}
                  style={{ cursor: editMode ? 'pointer' : 'default', ...ost(`${evPrefix}.${idx}.image`) }}
                >
                  {isVideoUrl(ev.image) ? (
                    <video
                      src={ev.image}
                      autoPlay
                      loop
                      muted
                      playsInline
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <img
                      src={ev.image || 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=85&fit=crop'}
                      alt={ev.title}
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=85&fit=crop'
                      }}
                    />
                  )}
                  {/* Subtle dark overlay for contrast */}
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.28) 100%)', pointerEvents: 'none' }} />
                  {/* Floating date badge */}
                  <div className="mg-event-date-badge">
                    <span
                      className="day editable-element"
                      data-field={`${evPrefix}.${idx}.day`}
                      data-ovkey={`${evPrefix}.${idx}.day`}
                      onClick={(e) => { e.stopPropagation(); handleEdit(e, `${evPrefix}.${idx}.day`, `Día Evento ${idx + 1}`, 'text', dayVal) }}
                      style={ost(`${evPrefix}.${idx}.day`)}
                    >{dayVal}</span>
                    <span
                      className="month editable-element"
                      data-field={`${evPrefix}.${idx}.month`}
                      data-ovkey={`${evPrefix}.${idx}.month`}
                      onClick={(e) => { e.stopPropagation(); handleEdit(e, `${evPrefix}.${idx}.month`, `Mes Evento ${idx + 1}`, 'text', monthVal) }}
                      style={ost(`${evPrefix}.${idx}.month`)}
                    >{monthVal}</span>
                  </div>
                </div>

                {/* Card body */}
                <div className="mg-event-body">
                  <div
                    className="mg-event-time editable-element"
                    data-field={`${evPrefix}.${idx}.time`}
                    data-ovkey={`${evPrefix}.${idx}.time`}
                    onClick={(e) => handleEdit(e, `${evPrefix}.${idx}.time`, `Horario Evento ${idx + 1}`, 'text', ev.time)}
                    style={ost(`${evPrefix}.${idx}.time`)}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#E11D48" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    {ev.time}
                  </div>
                  <h3
                    data-field={`${evPrefix}.${idx}.title`}
                    data-ovkey={`${evPrefix}.${idx}.title`}
                    className="editable-element"
                    onClick={(e) => handleEdit(e, `${evPrefix}.${idx}.title`, `Título Evento ${idx + 1}`, 'text', ev.title)}
                    style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0F172A', margin: '0 0 10px', lineHeight: 1.25, ...ost(`${evPrefix}.${idx}.title`) }}
                  >
                    {ev.title}
                  </h3>
                  <p
                    data-field={`${evPrefix}.${idx}.description`}
                    data-ovkey={`${evPrefix}.${idx}.description`}
                    className="editable-element"
                    onClick={(e) => handleEdit(e, `${evPrefix}.${idx}.description`, `Descripción Evento ${idx + 1}`, 'textarea', descVal)}
                    style={{ fontSize: '0.9rem', color: '#64748B', lineHeight: 1.65, margin: 0, ...ost(`${evPrefix}.${idx}.description`) }}
                  >
                    {descVal}
                  </p>
                  <a
                    href="#wp-contact"
                    className="mg-event-cta editable-element"
                    data-field={`${evPrefix}.${idx}.btnText`}
                    data-ovkey={`${evPrefix}.${idx}.btnText`}
                    onClick={(e) => {
                      if (editMode) {
                        e.preventDefault()
                        handleEdit(e, `${evPrefix}.${idx}.btnText`, `Botón Evento ${idx + 1}`, 'text', btnVal)
                      } else {
                        handleNavClick(e, '#wp-contact', `${evPrefix}.${idx}.title`, `Inscripción Evento ${idx + 1}`, ev.title)
                      }
                    }}
                    style={ost(`${evPrefix}.${idx}.btnText`)}
                  >
                    {btnVal}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                  </a>
                </div>
              </div>
            )})}
          </div>
        </div>
      </section>,
              'Eventos & Calendario'
            )
          case 'testimonials':
            return wrap(
              <section id="wp-testimonials" style={{ width: '100%', background: '#FFFFFF', padding: '100px 8%', boxSizing: 'border-box' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 60px' }}>
            <div
              data-field="testimonialsHeader.eyebrow"
              data-ovkey="testimonialsHeader.eyebrow"
              className="editable-element"
              onClick={(e) => handleEdit(e, 'testimonialsHeader.eyebrow', 'Etiqueta Testimonios', 'text', data.testimonialsHeader?.eyebrow || 'TRANSFORMACIÓN REAL')}
              style={{ fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#475569', marginBottom: 12, ...ost('testimonialsHeader.eyebrow') }}
            >
              {data.testimonialsHeader?.eyebrow || 'TRANSFORMACIÓN REAL'}
            </div>
            <h2
              data-field="testimonialsHeader.title"
              data-ovkey="testimonialsHeader.title"
              className="editable-element"
              onClick={(e) => handleEdit(e, 'testimonialsHeader.title', 'Título Sección Testimonios', 'text', data.testimonialsHeader?.title || 'Historias de Nuestra Iglesia')}
              style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.5rem)', fontWeight: 900, color: '#0F172A', margin: 0, letterSpacing: '-0.03em', ...ost('testimonialsHeader.title') }}
            >
              {data.testimonialsHeader?.title || 'Historias de Nuestra Iglesia'}
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 48 }}>
            {testimonials.map((item, idx) => (
              <div key={idx} style={{ background: 'transparent', padding: '0 10px' }}>
                <div style={{ fontSize: '3rem', color: '#E11D48', lineHeight: 1, marginBottom: 16 }}>“</div>
                <p data-field={`testimonials.${idx}.quote`} data-ovkey={`testimonials.${idx}.quote`} className="editable-element" onClick={(e) => handleEdit(e, `testimonials.${idx}.quote`, `Testimonio ${idx + 1}`, 'textarea', item.quote)} style={{ fontSize: '1.15rem', lineHeight: 1.65, color: '#334155', fontWeight: 500, margin: '0 0 28px', ...ost(`testimonials.${idx}.quote`) }}>
                  {item.quote}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <img
                    data-field={`testimonials.${idx}.avatar`}
                    data-ovkey={`testimonials.${idx}.avatar`}
                    src={item.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=85&fit=crop'}
                    alt={item.author}
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=85&fit=crop'
                    }}
                    className="editable-element"
                    onClick={(e) => handleEdit(e, `testimonials.${idx}.avatar`, `Avatar Testimonio ${idx + 1}`, 'image', item.avatar)}
                    style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover', ...ost(`testimonials.${idx}.avatar`) }}
                  />
                  <div>
                    <div data-field={`testimonials.${idx}.author`} data-ovkey={`testimonials.${idx}.author`} className="editable-element" onClick={(e) => handleEdit(e, `testimonials.${idx}.author`, `Autor Testimonio ${idx + 1}`, 'text', item.author)} style={{ fontSize: '0.95rem', fontWeight: 900, color: '#0F172A', ...ost(`testimonials.${idx}.author`) }}>{item.author}</div>
                    <div data-field={`testimonials.${idx}.role`} data-ovkey={`testimonials.${idx}.role`} className="editable-element" onClick={(e) => handleEdit(e, `testimonials.${idx}.role`, `Rol Testimonio ${idx + 1}`, 'text', item.role)} style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 600, ...ost(`testimonials.${idx}.role`) }}>{item.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>,
              'Testimonios'
            )
          case 'planAVisit':
            if (layouts.visit === 'visual') {
              return wrap(
                <VisitVisualLayout
                  data={data}
                  planAVisit={data.planAVisit || {}}
                  editMode={editMode}
                  handleEdit={handleEdit}
                  handleNavClick={handleNavClick}
                  ost={ost}
                  accentColor={accentCyan}
                  primaryBg={'#0B0F19'}
                  font={activeFont}
                />,
                'Visítanos (Solo Fotos)'
              )
            }
            if (layouts.visit === 'cards') {
              return wrap(
                <VisitCardsLayout
                  data={data}
                  planAVisit={data.planAVisit || {}}
                  editMode={editMode}
                  handleEdit={handleEdit}
                  handleNavClick={handleNavClick}
                  ost={ost}
                  accentColor={accentCyan}
                  primaryBg={'#F8FAFC'}
                  font={activeFont}
                />,
                'Visítanos (Horarios Card)'
              )
            }
            return wrap(
              <section id="wp-plan-visit" style={{ width: '100%', margin: 0, padding: 0, background: '#F8FAFC', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', alignItems: 'stretch' }}>
        <div
          data-field="planAVisit.image"
          data-ovkey="planAVisit.image"
          className="editable-element"
          onClick={(e) => handleEdit(e, 'planAVisit.image', 'Foto Sección Visítanos', 'image', planAVisit.image)}
          style={{ minHeight: 600, position: 'relative', overflow: 'hidden', cursor: editMode ? 'pointer' : 'default', ...ost('planAVisit.image') }}
        >
          {isVideoUrl(planAVisit.image) ? (
            <video
              src={planAVisit.image}
              autoPlay
              loop
              muted
              playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          ) : (
            <img
              src={planAVisit.image || 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1400&q=85&fit=crop'}
              alt="Visítanos este Fin de Semana"
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1400&q=85&fit=crop'
              }}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          )}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent 70%, #F8FAFC 100%)', pointerEvents: 'none' }} />
        </div>

        <div style={{ padding: '100px 10%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', background: '#F8FAFC' }}>
          <div data-field="planAVisit.eyebrow" data-ovkey="planAVisit.eyebrow" className="editable-element" onClick={(e) => handleEdit(e, 'planAVisit.eyebrow', 'Etiqueta Visítanos', 'text', planAVisit.eyebrow)} style={{ fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#475569', marginBottom: 18, ...ost('planAVisit.eyebrow') }}>
            {planAVisit.eyebrow}
          </div>
          <h2 data-field="planAVisit.title" data-ovkey="planAVisit.title" className="editable-element" onClick={(e) => handleEdit(e, 'planAVisit.title', 'Título Visítanos', 'text', planAVisit.title)} style={{ fontSize: 'clamp(2.8rem, 4.8vw, 4.2rem)', fontWeight: 900, color: '#0F172A', margin: '0 0 22px', letterSpacing: '-0.03em', lineHeight: 1.05, ...ost('planAVisit.title') }}>
            {planAVisit.title}
          </h2>
          <p data-field="planAVisit.subtitle" data-ovkey="planAVisit.subtitle" className="editable-element" onClick={(e) => handleEdit(e, 'planAVisit.subtitle', 'Descripción Visítanos', 'textarea', planAVisit.subtitle)} style={{ fontSize: '1.125rem', lineHeight: 1.7, color: '#475569', margin: '0 0 36px', maxWidth: 480, ...ost('planAVisit.subtitle') }}>
            {planAVisit.subtitle}
          </p>
          <a
            data-field="planAVisit.ctaText"
            data-ovkey="planAVisit.ctaText"
            href="#wp-contact"
            className="editable-element"
            onClick={(e) => handleNavClick(e, '#wp-contact', 'planAVisit.ctaText', 'Texto Botón Visítanos', planAVisit.ctaText)}
            style={{ display: 'inline-block', padding: '16px 36px', borderRadius: 999, textDecoration: 'none', fontSize: '0.95rem', background: '#0F172A', color: '#FFFFFF', fontWeight: 900, ...ost('planAVisit.ctaText') }}
          >
            {planAVisit.ctaText}
          </a>
        </div>
      </section>,
              'Planifica tu Visita'
            )
          case 'welcome':
            if (layouts.welcome === 'visual') {
              return wrap(
                <WelcomeVisualLayout
                  data={data}
                  welcome={data.welcome || {}}
                  editMode={editMode}
                  handleEdit={handleEdit}
                  handleNavClick={handleNavClick}
                  ost={ost}
                  accentColor={accentCyan}
                  primaryBg={'#0F172A'}
                  font={activeFont}
                />,
                'Bienvenida a Casa (Solo Fotos)'
              )
            }
            if (layouts.welcome === 'split') {
              return wrap(
                <WelcomeSplitLayout
                  data={data}
                  welcome={data.welcome || {}}
                  editMode={editMode}
                  handleEdit={handleEdit}
                  handleNavClick={handleNavClick}
                  ost={ost}
                  accentColor={accentCyan}
                  primaryBg={'#0F172A'}
                  font={activeFont}
                />,
                'Bienvenida a Casa (Split Tarjeta)'
              )
            }
            return wrap(
              <section id="wp-welcome" style={{ width: '100%', background: '#FFFFFF', padding: '100px 8%', boxSizing: 'border-box' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
          <div data-field="welcome.label" data-ovkey="welcome.label" className="editable-element" onClick={(e) => handleEdit(e, 'welcome.label', 'Etiqueta Bienvenida', 'text', data.welcome?.label || 'BIENVENIDO A CASA')} style={{ fontSize: '0.8rem', fontWeight: 800, color: accentCyan, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 16, ...ost('welcome.label') }}>
            {data.welcome?.label || 'BIENVENIDO A CASA'}
          </div>
          <h2 data-field="welcome.title" data-ovkey="welcome.title" className="editable-element" onClick={(e) => handleEdit(e, 'welcome.title', 'Título Bienvenida', 'text', data.welcome?.title || 'Una comunidad apasionada por Jesús y dedicada a amar a las personas.')} style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)', fontWeight: 900, color: '#0F172A', margin: '0 0 24px', letterSpacing: '-0.03em', lineHeight: 1.1, ...ost('welcome.title') }}>
            {data.welcome?.title || 'Una comunidad apasionada por Jesús y dedicada a amar a las personas.'}
          </h2>
          <p data-field="welcome.text" data-ovkey="welcome.text" className="editable-element" onClick={(e) => handleEdit(e, 'welcome.text', 'Mensaje Pastoral', 'textarea', data.welcome?.text || 'Sin importar de dónde vengas o dónde te encuentres en tu viaje espiritual, aquí hay un lugar para ti.')} style={{ fontSize: '1.125rem', color: '#475569', lineHeight: 1.7, margin: '0 0 36px', maxWidth: 800, marginLeft: 'auto', marginRight: 'auto', ...ost('welcome.text') }}>
            {data.welcome?.text || 'Sin importar de dónde vengas o dónde te encuentres en tu viaje espiritual, aquí hay un lugar para ti.'}
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
            <a data-field="welcome.ctaText" data-ovkey="welcome.ctaText" href="#wp-plan-visit" className="northside-btn-vibrant editable-element" onClick={(e) => handleNavClick(e, '#wp-plan-visit', 'welcome.ctaText', 'Botón Primario Bienvenida', data.welcome?.ctaText || 'Conoce Nuestra Visión')} style={{ padding: '14px 32px', borderRadius: 999, textDecoration: 'none', fontSize: '0.9rem', ...ost('welcome.ctaText') }}>
              {data.welcome?.ctaText || 'Conoce Nuestra Visión'}
            </a>
            <a data-field="welcome.ctaSecondaryText" data-ovkey="welcome.ctaSecondaryText" href="#wp-prayer" className="northside-btn-vibrant-outline editable-element" onClick={(e) => handleNavClick(e, '#wp-prayer', 'welcome.ctaSecondaryText', 'Botón Secundario Bienvenida', data.welcome?.ctaSecondaryText || 'Pide Oración')} style={{ padding: '14px 32px', borderRadius: 999, textDecoration: 'none', fontSize: '0.9rem', ...ost('welcome.ctaSecondaryText') }}>
              {data.welcome?.ctaSecondaryText || 'Pide Oración'}
            </a>
          </div>
        </div>
      </section>,
              'Bienvenida'
            )
          case 'values':
            if (layouts.values === 'visual') {
              return wrap(
                <ValuesVisualLayout
                  data={data}
                  values={data.values || []}
                  editMode={editMode}
                  handleEdit={handleEdit}
                  handleNavClick={handleNavClick}
                  ost={ost}
                  accentColor={accentCyan}
                  primaryBg={'#0B0F19'}
                  font={activeFont}
                />,
                'Valores (Solo Imágenes)'
              )
            }
            if (layouts.values === 'minimal') {
              return wrap(
                <ValuesMinimalLayout
                  data={data}
                  values={data.values || []}
                  editMode={editMode}
                  handleEdit={handleEdit}
                  handleNavClick={handleNavClick}
                  ost={ost}
                  accentColor={accentCyan}
                  primaryBg={'#0B0F19'}
                  font={activeFont}
                />,
                'Valores (Minimalista)'
              )
            }
            return wrap(
              <section id="wp-values" style={{ width: '100%', background: '#F8FAFC', padding: '100px 8%', boxSizing: 'border-box' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 60px' }}>
            <div
              data-field="values.eyebrow"
              data-ovkey="values.eyebrow"
              className="editable-element"
              onClick={(e) => handleEdit(e, 'values.eyebrow', 'Etiqueta Valores', 'text', data.values?.eyebrow || 'FUNDAMENTOS DE FE')}
              style={{ fontSize: '0.8rem', fontWeight: 800, color: accentCyan, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 12, ...ost('values.eyebrow') }}
            >
              {data.values?.eyebrow || 'FUNDAMENTOS DE FE'}
            </div>
            <h2
              data-field="values.title"
              data-ovkey="values.title"
              className="editable-element"
              onClick={(e) => handleEdit(e, 'values.title', 'Título Valores', 'text', data.values?.title || 'Nuestros Valores')}
              style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)', fontWeight: 900, color: '#0F172A', margin: 0, letterSpacing: '-0.03em', ...ost('values.title') }}
            >
              {data.values?.title || 'Nuestros Valores'}
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 32 }}>
            {(data.values || [
              { icon: 'heart', title: 'Amor Incondicional', text: 'Recibimos a cada persona con gracia y calidez.' },
              { icon: 'users', title: 'Comunidad Auténtica', text: 'Crecemos juntos a través de grupos de amistad.' },
              { icon: 'book', title: 'Verdad Bíblica', text: 'Enseñanza práctica basada en la Palabra de Dios.' },
              { icon: 'globe', title: 'Impacto y Misión', text: 'Servimos con generosidad a nuestra ciudad.' }
            ]).map((val, idx) => (
              <div key={idx} style={{ background: '#FFFFFF', borderRadius: 16, padding: '32px 24px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid #E2E8F0' }}>
                <div style={{ color: accentCyan, fontSize: '1.8rem', marginBottom: 16 }}>✦</div>
                <h3 data-field={`values.${idx}.title`} data-ovkey={`values.${idx}.title`} className="editable-element" onClick={(e) => handleEdit(e, `values.${idx}.title`, `Título Valor ${idx+1}`, 'text', val.title)} style={{ fontSize: '1.3rem', fontWeight: 900, color: '#0F172A', margin: '0 0 12px', ...ost(`values.${idx}.title`) }}>
                  {val.title}
                </h3>
                <p data-field={`values.${idx}.text`} data-ovkey={`values.${idx}.text`} className="editable-element" onClick={(e) => handleEdit(e, `values.${idx}.text`, `Texto Valor ${idx+1}`, 'textarea', val.text)} style={{ fontSize: '0.95rem', color: '#64748B', lineHeight: 1.6, margin: 0, ...ost(`values.${idx}.text`) }}>
                  {val.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>,
              'Valores & Creencias'
            )
          case 'ministries':
            if (layouts.ministries === 'visual') {
              return wrap(
                <MinistriesVisualLayout
                  data={data}
                  ministries={data.ministries || []}
                  editMode={editMode}
                  handleEdit={handleEdit}
                  handleNavClick={handleNavClick}
                  ost={ost}
                  accentColor={accentCyan}
                  primaryBg={'#0F172A'}
                  font={activeFont}
                />,
                'Ministerios (Solo Imágenes)'
              )
            }
            if (layouts.ministries === 'grid') {
              return wrap(
                <MinistriesGridLayout
                  data={data}
                  ministries={data.ministries || []}
                  editMode={editMode}
                  handleEdit={handleEdit}
                  handleNavClick={handleNavClick}
                  ost={ost}
                  accentColor={accentCyan}
                  primaryBg={'#0F172A'}
                  font={activeFont}
                />,
                'Ministerios (Mosaico)'
              )
            }
            return wrap(
              <section id="wp-ministries" style={{ width: '100%', background: '#FFFFFF', padding: '100px 8%', boxSizing: 'border-box' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 60px' }}>
            <div
              data-field="ministries.eyebrow"
              data-ovkey="ministries.eyebrow"
              className="editable-element"
              onClick={(e) => handleEdit(e, 'ministries.eyebrow', 'Etiqueta Ministerios', 'text', data.ministries?.eyebrow || 'MINISTERIOS Y FAMILIAS')}
              style={{ fontSize: '0.8rem', fontWeight: 800, color: accentCyan, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 12, ...ost('ministries.eyebrow') }}
            >
              {data.ministries?.eyebrow || 'MINISTERIOS Y FAMILIAS'}
            </div>
            <h2 data-field="ministriesTitle" data-ovkey="ministriesTitle" className="editable-element" onClick={(e) => handleEdit(e, 'ministriesTitle', 'Título Ministerios', 'text', data.ministriesTitle || 'Nuestros Ministerios')} style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)', fontWeight: 900, color: '#0F172A', margin: '0 0 16px', letterSpacing: '-0.03em', ...ost('ministriesTitle') }}>
              {data.ministriesTitle || 'Nuestros Ministerios'}
            </h2>
            <p data-field="ministriesSubtitle" data-ovkey="ministriesSubtitle" className="editable-element" onClick={(e) => handleEdit(e, 'ministriesSubtitle', 'Subtítulo Ministerios', 'textarea', data.ministriesSubtitle || 'Espacios diseñados para cada etapa de la vida.')} style={{ fontSize: '1.05rem', color: '#64748B', margin: 0, ...ost('ministriesSubtitle') }}>
              {data.ministriesSubtitle || 'Espacios diseñados para cada etapa de la vida.'}
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32 }}>
            {(data.ministries || [
              { name: 'KidZone (Niños)', ageRange: '0 a 12 años', description: 'Espacio seguro y divertido para los más pequeños.', ctaText: 'Conoce KidZone', image: 'https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?w=800&q=85&fit=crop' },
              { name: 'Jóvenes & Estudiantes', ageRange: '13 a 25 años', description: 'Comunidad vibrante con reuniones semanales.', ctaText: 'Únete a Jóvenes', image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=85&fit=crop' },
              { name: 'Matrimonios & Familias', ageRange: 'Todas las edades', description: 'Talleres y actividades para fortalecer el hogar.', ctaText: 'Saber Más', image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&q=85&fit=crop' }
            ]).map((m, idx) => (
              <div key={idx} style={{ background: '#F8FAFC', borderRadius: 16, overflow: 'hidden', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column' }}>
                <div data-field={`ministries.${idx}.image`} data-ovkey={`ministries.${idx}.image`} className="editable-element" onClick={(e) => handleEdit(e, `ministries.${idx}.image`, `Foto Ministerio ${idx+1}`, 'image', m.image)} style={{ height: 200, position: 'relative', overflow: 'hidden', ...ost(`ministries.${idx}.image`) }}>
                  {isVideoUrl(m.image) ? (
                    <video src={m.image} autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <img src={m.image || 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&q=85&fit=crop'} alt={m.name || m.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  )}
                </div>
                <div style={{ padding: 24, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div data-field={`ministries.${idx}.ageRange`} data-ovkey={`ministries.${idx}.ageRange`} className="editable-element" onClick={(e) => handleEdit(e, `ministries.${idx}.ageRange`, `Edad Ministerio ${idx+1}`, 'text', m.ageRange)} style={{ fontSize: '0.78rem', color: accentCyan, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8, ...ost(`ministries.${idx}.ageRange`) }}>
                      {m.ageRange || 'Comunidad'}
                    </div>
                    <h3 data-field={`ministries.${idx}.name`} data-ovkey={`ministries.${idx}.name`} className="editable-element" onClick={(e) => handleEdit(e, `ministries.${idx}.name`, `Nombre Ministerio ${idx+1}`, 'text', m.name || m.title)} style={{ fontSize: '1.35rem', fontWeight: 900, color: '#0F172A', margin: '0 0 10px', ...ost(`ministries.${idx}.name`) }}>
                      {m.name || m.title}
                    </h3>
                    <p data-field={`ministries.${idx}.description`} data-ovkey={`ministries.${idx}.description`} className="editable-element" onClick={(e) => handleEdit(e, `ministries.${idx}.description`, `Descripción Ministerio ${idx+1}`, 'textarea', m.description || m.desc)} style={{ fontSize: '0.92rem', color: '#64748B', lineHeight: 1.6, margin: '0 0 20px', ...ost(`ministries.${idx}.description`) }}>
                      {m.description || m.desc}
                    </p>
                  </div>
                  {m.ctaText && (
                    <a data-field={`ministries.${idx}.ctaText`} data-ovkey={`ministries.${idx}.ctaText`} href="#wp-contact" className="northside-btn-vibrant-outline editable-element" onClick={(e) => handleNavClick(e, '#wp-contact', `ministries.${idx}.ctaText`, `Botón Ministerio ${idx+1}`, m.ctaText)} style={{ display: 'inline-block', textAlign: 'center', padding: '10px 20px', borderRadius: 999, textDecoration: 'none', fontSize: '0.8rem', ...ost(`ministries.${idx}.ctaText`) }}>
                      {m.ctaText}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>,
              'Ministerios'
            )
          case 'sermons':
            if (layouts.sermons === 'visual') {
              return wrap(
                <SermonsVisualLayout
                  data={data}
                  sermons={data.sermons || []}
                  editMode={editMode}
                  handleEdit={handleEdit}
                  handleNavClick={handleNavClick}
                  ost={ost}
                  accentColor={accentCyan}
                  primaryBg={'#0F172A'}
                  font={activeFont}
                />,
                'Sermones (Solo Portadas)'
              )
            }
            if (layouts.sermons === 'cards') {
              return wrap(
                <SermonsCardsLayout
                  data={data}
                  sermons={data.sermons || []}
                  title={data.sermonsTitle}
                  subtitle={data.sermonsSubtitle}
                  editMode={editMode}
                  handleEdit={handleEdit}
                  handleNavClick={handleNavClick}
                  ost={ost}
                  accentColor={accentCyan}
                  primaryBg={'#0F172A'}
                  font={activeFont}
                />,
                'Sermones (Tarjetas)'
              )
            }
            return wrap(
              <section id="wp-sermons" style={{ width: '100%', background: '#F8FAFC', padding: '100px 8%', boxSizing: 'border-box' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 60px' }}>
            <div
              data-field="sermons.eyebrow"
              data-ovkey="sermons.eyebrow"
              className="editable-element"
              onClick={(e) => handleEdit(e, 'sermons.eyebrow', 'Etiqueta Prédicas', 'text', data.sermons?.eyebrow || 'ENSEÑANZA Y MENSAJES')}
              style={{ fontSize: '0.8rem', fontWeight: 800, color: accentCyan, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 12, ...ost('sermons.eyebrow') }}
            >
              {data.sermons?.eyebrow || 'ENSEÑANZA Y MENSAJES'}
            </div>
            <h2 data-field="sermonsTitle" data-ovkey="sermonsTitle" className="editable-element" onClick={(e) => handleEdit(e, 'sermonsTitle', 'Título Prédicas', 'text', data.sermonsTitle || 'Mensajes Recientes')} style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)', fontWeight: 900, color: '#0F172A', margin: '0 0 16px', letterSpacing: '-0.03em', ...ost('sermonsTitle') }}>
              {data.sermonsTitle || 'Mensajes Recientes'}
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32 }}>
            {(data.sermons || [
              { title: 'Caminando por Fe en Tiempos de Cambio', series: 'Serie: Imparables', speaker: 'Pastor Principal', image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=85&fit=crop' },
              { title: 'El Poder de la Gracia Incondicional', series: 'Serie: Fundamentos', speaker: 'Equipo Pastoral', image: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?w=800&q=85&fit=crop' }
            ]).map((sermon, idx) => (
              <div key={idx} style={{ background: '#FFFFFF', borderRadius: 16, overflow: 'hidden', border: '1px solid #E2E8F0', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
                <div data-field={`sermons.${idx}.image`} data-ovkey={`sermons.${idx}.image`} className="editable-element" onClick={(e) => handleEdit(e, `sermons.${idx}.image`, `Foto Prédica ${idx+1}`, 'image', sermon.image)} style={{ height: 200, position: 'relative', overflow: 'hidden', ...ost(`sermons.${idx}.image`) }}>
                  {isVideoUrl(sermon.image) ? (
                    <video src={sermon.image} autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <img src={sermon.image || 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=85&fit=crop'} alt={sermon.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  )}
                </div>
                <div style={{ padding: 24 }}>
                  <div data-field={`sermons.${idx}.series`} data-ovkey={`sermons.${idx}.series`} className="editable-element" onClick={(e) => handleEdit(e, `sermons.${idx}.series`, `Serie Prédica ${idx+1}`, 'text', sermon.series)} style={{ fontSize: '0.78rem', color: accentCyan, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8, ...ost(`sermons.${idx}.series`) }}>
                    {sermon.series}
                  </div>
                  <h3 data-field={`sermons.${idx}.title`} data-ovkey={`sermons.${idx}.title`} className="editable-element" onClick={(e) => handleEdit(e, `sermons.${idx}.title`, `Título Prédica ${idx+1}`, 'text', sermon.title)} style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0F172A', margin: '0 0 10px', ...ost(`sermons.${idx}.title`) }}>
                    {sermon.title}
                  </h3>
                  <div data-field={`sermons.${idx}.speaker`} data-ovkey={`sermons.${idx}.speaker`} className="editable-element" onClick={(e) => handleEdit(e, `sermons.${idx}.speaker`, `Predicador ${idx+1}`, 'text', sermon.speaker)} style={{ fontSize: '0.88rem', color: '#64748B', fontWeight: 600, ...ost(`sermons.${idx}.speaker`) }}>
                    🎙️ {sermon.speaker}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>,
              'Prédicas & Mensajes'
            )
          case 'donation':
            return wrap(
              <section id="wp-donations" style={{ width: '100%', background: '#FFFFFF', padding: '100px 8%', boxSizing: 'border-box' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 24, padding: '50px 32px' }}>
          <div
            data-field="donation.eyebrow"
            data-ovkey="donation.eyebrow"
            className="editable-element"
            onClick={(e) => handleEdit(e, 'donation.eyebrow', 'Etiqueta Donaciones', 'text', data.donation?.eyebrow || 'GENEROSIDAD')}
            style={{ fontSize: '0.8rem', fontWeight: 800, color: accentCyan, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 14, ...ost('donation.eyebrow') }}
          >
            {data.donation?.eyebrow || 'GENEROSIDAD'}
          </div>
          <h2 data-field="donation.title" data-ovkey="donation.title" className="editable-element" onClick={(e) => handleEdit(e, 'donation.title', 'Título Donaciones', 'text', data.donation?.title || 'Generosidad que Transforma Vidas')} style={{ fontSize: 'clamp(2rem, 3.8vw, 3.2rem)', fontWeight: 900, color: '#0F172A', margin: '0 0 16px', letterSpacing: '-0.03em', ...ost('donation.title') }}>
            {data.donation?.title || 'Generosidad que Transforma Vidas'}
          </h2>
          <p data-field="donation.subtitle" data-ovkey="donation.subtitle" className="editable-element" onClick={(e) => handleEdit(e, 'donation.subtitle', 'Subtítulo Donaciones', 'textarea', data.donation?.subtitle || 'Gracias a tu ofrenda podemos seguir extendiendo el mensaje de esperanza.')} style={{ fontSize: '1.05rem', color: '#64748B', lineHeight: 1.7, margin: '0 0 32px', maxWidth: 700, marginLeft: 'auto', marginRight: 'auto', ...ost('donation.subtitle') }}>
            {data.donation?.subtitle || 'Gracias a tu ofrenda podemos seguir extendiendo el mensaje de esperanza.'}
          </p>
          <a
            data-field="donation.ctaText"
            data-ovkey="donation.ctaText"
            href={data.donation?.ctaLink || '#wp-contact'}
            target={(data.donation?.ctaLink || '').startsWith('http') ? '_blank' : undefined}
            rel={(data.donation?.ctaLink || '').startsWith('http') ? 'noopener noreferrer' : undefined}
            className="northside-btn-vibrant editable-element"
            onClick={(e) => {
              const btnLabel = (data.donation?.ctaText === 'Ofrendar con Stripe' || data.donation?.ctaText === 'Donar con Stripe') ? 'Ofrendar' : (data.donation?.ctaText || 'Ofrendar')
              handleNavClick(e, data.donation?.ctaLink || '#wp-contact', 'donation.ctaText', 'Botón Donaciones', btnLabel, {
                linkField: 'donation.ctaLink',
                linkValue: data.donation?.ctaLink || '#wp-contact'
              })
            }}
            style={{ padding: '16px 36px', borderRadius: 999, textDecoration: 'none', fontSize: '0.9rem', ...ost('donation.ctaText') }}
          >
            {(data.donation?.ctaText === 'Ofrendar con Stripe' || data.donation?.ctaText === 'Donar con Stripe') ? 'Ofrendar' : (data.donation?.ctaText || 'Ofrendar')}
          </a>
          <div
            data-field="donation.note"
            data-ovkey="donation.note"
            className="editable-element"
            onClick={(e) => handleEdit(e, 'donation.note', 'Nota Donaciones', 'text', data.donation?.note || 'Todas las donaciones son procesadas de manera segura y confidencial.')}
            style={{ marginTop: 24, fontSize: '0.8rem', color: '#64748B', ...ost('donation.note') }}
          >
            🔒 {data.donation?.note || 'Todas las donaciones son procesadas de manera segura y confidencial.'}
          </div>
        </div>
      </section>,
              'Ofrendas / Donaciones'
            )
          case 'prayerRequest':
            return wrap(
              <section id="wp-prayer" style={{ width: '100%', background: '#F8FAFC', padding: '100px 8%', boxSizing: 'border-box' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <div
            data-field="prayerRequest.eyebrow"
            data-ovkey="prayerRequest.eyebrow"
            className="editable-element"
            onClick={(e) => handleEdit(e, 'prayerRequest.eyebrow', 'Etiqueta Oración', 'text', data.prayerRequest?.eyebrow || 'ESTAMOS PARA TI')}
            style={{ fontSize: '0.8rem', fontWeight: 800, color: accentCyan, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 14, ...ost('prayerRequest.eyebrow') }}
          >
            {data.prayerRequest?.eyebrow || 'ESTAMOS PARA TI'}
          </div>
          <h2 data-field="prayerRequest.title" data-ovkey="prayerRequest.title" className="editable-element" onClick={(e) => handleEdit(e, 'prayerRequest.title', 'Título Oración', 'text', data.prayerRequest?.title || '¿Podemos Orar por Ti?')} style={{ fontSize: 'clamp(2rem, 3.8vw, 3.2rem)', fontWeight: 900, color: '#0F172A', margin: '0 0 16px', letterSpacing: '-0.03em', ...ost('prayerRequest.title') }}>
            {data.prayerRequest?.title || '¿Podemos Orar por Ti?'}
          </h2>
          <p data-field="prayerRequest.subtitle" data-ovkey="prayerRequest.subtitle" className="editable-element" onClick={(e) => handleEdit(e, 'prayerRequest.subtitle', 'Subtítulo Oración', 'textarea', data.prayerRequest?.subtitle || 'Nuestro equipo pastoral ora cada semana por cada necesidad planteada.')} style={{ fontSize: '1.05rem', color: '#64748B', lineHeight: 1.7, margin: '0 0 32px', ...ost('prayerRequest.subtitle') }}>
            {data.prayerRequest?.subtitle || 'Nuestro equipo pastoral ora cada semana por cada necesidad planteada.'}
          </p>
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 16, padding: 32, textAlign: 'left', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: '0.8rem', color: '#475569', fontWeight: 700, marginBottom: 6 }}>Tu Nombre</label>
              <input type="text" placeholder="Ej: Juan Pérez" style={{ width: '100%', padding: '12px 16px', borderRadius: 8, background: '#F8FAFC', border: '1px solid #CBD5E1', color: '#0F172A', fontSize: '0.9rem' }} />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: '0.8rem', color: '#475569', fontWeight: 700, marginBottom: 6 }}>Tu Petición de Oración</label>
              <textarea rows={4} placeholder="Escribe tu motivo de oración..." style={{ width: '100%', padding: '12px 16px', borderRadius: 8, background: '#F8FAFC', border: '1px solid #CBD5E1', color: '#0F172A', fontSize: '0.9rem', resize: 'vertical' }} />
            </div>
            <button data-field="prayerRequest.ctaText" data-ovkey="prayerRequest.ctaText" className="northside-btn-vibrant editable-element" onClick={(e) => handleEdit(e, 'prayerRequest.ctaText', 'Texto Botón Oración', 'text', data.prayerRequest?.ctaText || 'Enviar Petición de Oración')} style={{ width: '100%', padding: '16px', borderRadius: 999, border: 'none', cursor: 'pointer', fontSize: '0.9rem', ...ost('prayerRequest.ctaText') }}>
              {data.prayerRequest?.ctaText || 'Enviar Petición de Oración'}
            </button>
          </div>
        </div>
      </section>,
              'Petición de Oración'
            )
          case 'about':
            if (layouts.about === 'visual') {
              return wrap(
                <AboutVisualLayout
                  data={data}
                  editMode={editMode}
                  handleEdit={handleEdit}
                  handleNavClick={handleNavClick}
                  ost={ost}
                  accentColor={accentCyan}
                  primaryBg={'#0F172A'}
                  font={activeFont}
                />,
                'Sobre Nosotros (Muro de Fotos)'
              )
            }
            if (layouts.about === 'split') {
              return wrap(
                <AboutSplitLayout
                  data={data}
                  about={data.about || {}}
                  editMode={editMode}
                  handleEdit={handleEdit}
                  handleNavClick={handleNavClick}
                  ost={ost}
                  accentColor={accentCyan}
                  primaryBg={'#0F172A'}
                  font={activeFont}
                />,
                'Sobre Nosotros (Split Comunidad)'
              )
            }
            return wrap(
              <section id="wp-about" style={{ width: '100%', background: '#FFFFFF', padding: '100px 8%', boxSizing: 'border-box' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 60, alignItems: 'center' }}>
            <div>
              <div
                data-field="about.eyebrow"
                data-ovkey="about.eyebrow"
                className="editable-element"
                onClick={(e) => handleEdit(e, 'about.eyebrow', 'Etiqueta Sobre Nosotros', 'text', data.about?.eyebrow || 'QUIÉNES SOMOS')}
                style={{ fontSize: '0.8rem', fontWeight: 800, color: accentCyan, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 12, ...ost('about.eyebrow') }}
              >
                {data.about?.eyebrow || 'QUIÉNES SOMOS'}
              </div>
              <h2 data-field="about.title" data-ovkey="about.title" className="editable-element" onClick={(e) => handleEdit(e, 'about.title', 'Título Sobre Nosotros', 'text', data.about?.title || 'Nuestra Historia')} style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)', fontWeight: 900, color: '#0F172A', margin: '0 0 20px', letterSpacing: '-0.03em', ...ost('about.title') }}>
                {data.about?.title || 'Nuestra Historia'}
              </h2>
              <p data-field="about.text" data-ovkey="about.text" className="editable-element" onClick={(e) => handleEdit(e, 'about.text', 'Texto Sobre Nosotros', 'textarea', data.about?.text || '')} style={{ fontSize: '1.05rem', color: '#475569', lineHeight: 1.7, margin: 0, ...ost('about.text') }}>
                {data.about?.text || 'Somos una iglesia comprometida con compartir el amor de Dios, servir a nuestra comunidad y acompañarte en cada paso de tu fe.'}
              </p>
            </div>
            {data.aboutImage && (
              <div data-field="aboutImage" data-ovkey="aboutImage" className="editable-element" onClick={(e) => handleEdit(e, 'aboutImage', 'Foto Sobre Nosotros', 'image', data.aboutImage)} style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', height: 360, ...ost('aboutImage') }}>
                {isVideoUrl(data.aboutImage) ? (
                  <video src={data.aboutImage} autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <img src={data.aboutImage} alt="Sobre Nosotros" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                )}
              </div>
            )}
          </div>
        </section>,
              'Sobre Nosotros'
            )
          case 'contact':
            return wrap(
              <footer id="wp-contact" style={{ width: '100%', background: '#000000', color: '#FFFFFF', padding: '90px 8% 50px', boxSizing: 'border-box' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 60, alignItems: 'start' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              {logoImage ? (
                <img
                  data-field="logoImage"
                  data-ovkey="logoImage"
                  src={logoImage}
                  alt={businessName}
                  className="editable-element"
                  onClick={(e) => handleEdit(e, 'logoImage', 'Imagen de Logo Footer', 'image', logoImage)}
                  style={{ maxHeight: 44, maxWidth: 180, objectFit: 'contain', cursor: editMode ? 'pointer' : 'default', ...ost('logoImage') }}
                />
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div
                    data-field="logoImage"
                    data-ovkey="logoImage"
                    className="editable-element"
                    onClick={(e) => handleEdit(e, 'logoImage', 'Subir Imagen de Logo', 'image', logoImage)}
                    style={{ width: 42, height: 42, borderRadius: '38% 62% 63% 37% / 41% 44% 56% 59%', background: '#FFFFFF', color: '#000000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1.25rem', cursor: editMode ? 'pointer' : 'default', ...ost('logoImage') }}
                  >
                    {(businessName || 'N')[0]}
                  </div>
                  <div data-field="businessName" data-ovkey="businessName" className="editable-element" onClick={(e) => handleEdit(e, 'businessName', 'Nombre Iglesia Footer', 'text', businessName)} style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '-0.02em', color: '#FFFFFF', ...ost('businessName') }}>
                    {businessName}
                  </div>
                </div>
              )}
            </div>

            <p
              data-field="contact.schedule"
              data-ovkey="contact.schedule"
              className="editable-element"
              onClick={(e) => handleEdit(e, 'contact.schedule', 'Horarios de Servicios', 'text', data.contact?.schedule || 'Cultos los Domingos a las 9:00 AM y 11:00 AM.')}
              style={{ color: '#D1D5DB', fontSize: '0.95rem', margin: '0 0 8px', fontWeight: 600, ...ost('contact.schedule') }}
            >
              {data.contact?.schedule || 'Cultos los Domingos a las 9:00 AM y 11:00 AM.'}
            </p>
            <p
              data-field="contact.officeHours"
              data-ovkey="contact.officeHours"
              className="editable-element"
              onClick={(e) => handleEdit(e, 'contact.officeHours', 'Horario de Oficina', 'text', data.contact?.officeHours || 'Atención Pastoral: Lunes a Viernes, 9:00 AM – 5:00 PM.')}
              style={{ color: '#9CA3AF', fontSize: '0.875rem', margin: '0 0 28px', ...ost('contact.officeHours') }}
            >
              {data.contact?.officeHours || 'Atención Pastoral: Lunes a Viernes, 9:00 AM – 5:00 PM.'}
            </p>

            <div style={{ color: '#FFFFFF', fontSize: '0.9rem', lineHeight: 1.8 }}>
              <p data-field="contact.email" data-ovkey="contact.email" className="editable-element" onClick={(e) => handleEdit(e, 'contact.email', 'Email de Contacto', 'text', data.contact?.email || 'contacto@tu-iglesia.org')} style={{ margin: '0 0 6px', fontWeight: 700, ...ost('contact.email') }}>{data.contact?.email || 'contacto@tu-iglesia.org'}</p>
              <p data-field="contact.phone" data-ovkey="contact.phone" className="editable-element" onClick={(e) => handleEdit(e, 'contact.phone', 'Teléfono de Contacto', 'text', data.contact?.phone || '+1 (555) 842-0110')} style={{ margin: '0 0 16px', fontWeight: 700, ...ost('contact.phone') }}>{data.contact?.phone || '+1 (555) 842-0110'}</p>
              <p data-field="contact.address" data-ovkey="contact.address" className="editable-element" onClick={(e) => handleEdit(e, 'contact.address', 'Dirección de Contacto', 'text', data.contact?.address || '8615 Hixson Pike, San Salvador, El Salvador')} style={{ color: '#9CA3AF', margin: 0, fontSize: '0.85rem', ...ost('contact.address') }}>
                {data.contact?.address || '8615 Hixson Pike, San Salvador, El Salvador'}
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, paddingTop: 20 }}>
            <div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <a href="#wp-plan-visit" onClick={(e) => handleNavClick(e, '#wp-plan-visit', 'planAVisit.title', 'Menú Planifica tu Visita', 'Planifica tu Visita')} style={{ color: '#FFFFFF', textDecoration: 'none', fontWeight: 800, fontSize: '1rem' }} className="editable-element">Planifica tu Visita</a>
                <a href="#wp-next-steps" onClick={(e) => handleNavClick(e, '#wp-next-steps', 'nextSteps.title', 'Menú Próximos Pasos', 'Próximos Pasos')} style={{ color: '#FFFFFF', textDecoration: 'none', fontWeight: 800, fontSize: '1rem' }} className="editable-element">Próximos Pasos</a>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <a href="#wp-next-steps" onClick={(e) => handleNavClick(e, '#wp-next-steps', 'nextSteps.title', 'Menú Sobre Nosotros', 'Sobre Nosotros')} style={{ color: '#FFFFFF', textDecoration: 'none', fontWeight: 800, fontSize: '1rem' }} className="editable-element">Sobre Nosotros</a>
                <div>
                  <div style={{ color: '#FFFFFF', fontWeight: 800, fontSize: '1rem', marginBottom: 10 }}>Redes Sociales</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <a href="#facebook" style={{ color: '#9CA3AF', textDecoration: 'underline', fontSize: '0.875rem' }}>Facebook</a>
                    <a href="#instagram" style={{ color: '#9CA3AF', textDecoration: 'underline', fontSize: '0.875rem' }}>Instagram</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: 1320, margin: '70px auto 0', paddingTop: 28, borderTop: '1px solid rgba(255,255,255,0.1)', color: '#6B7280', fontSize: '0.8rem' }}>
          Copyright © {new Date().getFullYear()} {businessName}. Todos los derechos reservados.
        </div>
      </footer>,
              'Contacto & Footer'
            )
          default:
            return null
        }
      })}

    </div>
  )
}
