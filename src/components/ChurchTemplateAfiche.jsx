import React, { useState } from 'react'
import { Sparkles, Calendar, Clock, MapPin, Play, Heart, ChevronRight, Phone, Volume2, ArrowUpRight } from 'lucide-react'
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

export default function ChurchTemplateAfiche({ data = {}, editMode = false, activeField, onElementClick, onSectionChange, onQuickUpdate, onQuickUpdateBatch, device = 'desktop' }) {
  const isMobileDevice = device === 'mobile'
  const isTabletDevice = device === 'tablet'
  const rootClassName = `afiche-template-root ${isMobileDevice ? 'is-mobile-device' : ''} ${isTabletDevice ? 'is-tablet-device' : ''}`.trim()

  const [activeGallery, setActiveGallery] = useState(0)

  const businessName = data.businessName || 'Iglesia Noche de Adoración'
  const logoImage = data.logoImage || ''
  const primaryColor = data.primaryColor || '#090B10'
  const accentColor = data.accentColor || '#FACC15'
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
  const isVideoUrl = (url) => {
    if (!url || typeof url !== 'string') return false
    return /\.(mp4|webm|mov|ogg)(\?.*)?$/i.test(url) || url.startsWith('data:video/')
  }
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
    eyebrow: '✦ SÁBADOS 6:00 PM & DOMINGOS 10:30 AM ✦',
    scriptTitle: 'Noche de',
    headline: 'ADORACIÓN & FE',
    subheadline: 'Una experiencia espiritual inmersiva. Conecta con Dios a través de alabanza en vivo, oración ferviente y mensajes transformadores.',
    ctaText: 'Planifica tu Visita',
    ctaLink: '#wp-plan-visit',
    ctaSecondary: 'Ver Próximos Eventos',
    ctaSecondaryLink: '#wp-afiche-gallery'
  }

  const rawEyebrow = hero.eyebrow || 'SÁBADOS 6:00 PM & DOMINGOS 10:30 AM'
  const cleanEyebrow = rawEyebrow.replace(/^[✦\s\u2726]+|[✦\s\u2726]+$/g, '').trim() || 'SÁBADOS 6:00 PM & DOMINGOS 10:30 AM'

  const symbolicSections = data.symbolicSections || [
    {
      id: 'adoracion',
      script: 'Culto de',
      title: 'ALABANZA & MÚSICA',
      tagline: 'Adoración viva y ambiente espiritual profundo',
      desc: 'Sumérgete en momentos de adoración en vivo con músicos dedicados y un ambiente acogedor diseñado para buscar la presencia de Dios.',
      badge: 'CADA SÁBADO 6:00 PM',
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&q=85&fit=crop'
    },
    {
      id: 'oracion',
      script: 'Tiempo de',
      title: 'ORACIÓN & PAZ',
      tagline: 'Restauración, fe y clamor comunitario',
      desc: 'Un espacio íntimo donde oramos unos por otros. Creemos en el poder transformador de la fe y en la respuesta de Dios a las peticiones del corazón.',
      badge: 'MARTES 7:00 PM',
      image: 'https://images.unsplash.com/photo-1509021436471-18736672b71e?w=1200&q=85&fit=crop'
    },
    {
      id: 'palabra',
      script: 'Enseñanza de la',
      title: 'PALABRA VIVA',
      tagline: 'Mensajes bíblicos relevantes para tu día a día',
      desc: 'Predicaciones dinámicas, profundas y prácticas que te equipan para tomar decisiones con sabiduría, fortalecer tu hogar y crecer en liderazgo.',
      badge: 'DOMINGOS 10:30 AM',
      image: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?w=1200&q=85&fit=crop'
    },
    {
      id: 'comunidad',
      script: 'Red de',
      title: 'COMUNIDAD & CAFÉ',
      tagline: 'Relaciones auténticas y fraternidad',
      desc: 'Conecta con personas amigables en nuestro espacio de café antes y después de cada reunión. Te recibirán como parte de la familia.',
      badge: 'LOBBY ABIERTO',
      image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1200&q=85&fit=crop'
    }
  ]

  const ministries = data.ministries || [
    {
      title: 'MINISTERIO DE JÓVENES',
      script: 'Generación de',
      desc: 'Reuniones dinámicas con alabanza contemporánea y mensajes reales para jóvenes de secundaria y universidad.',
      image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=85&fit=crop'
    },
    {
      title: 'MATRIMONIOS & FAMILIAS',
      script: 'Hogares en',
      desc: 'Talleres, cenas de parejas y consejería para edificar matrimonios sólidos centrados en Dios.',
      image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&q=85&fit=crop'
    },
    {
      title: 'KIDZONE INFANTIL',
      script: 'Espacio para',
      desc: 'Clases bíblicas divertidas, música y juegos con personal capacitado para niños de 0 a 11 años.',
      image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=85&fit=crop'
    }
  ]

  const planAVisit = data.planAVisit || {
    eyebrow: 'ESTÁS INVITADO',
    title: 'Acompáñanos este Fin de Semana',
    subtitle: 'Encuentra horarios, dirección y todo lo necesario para tu primera visita.',
    ctaText: 'Planifica tu Visita',
    address: 'Av. Las Palmeras #123, San Salvador',
    serviceTimes: [
      'Sábado 6:00 PM — Noche de Adoración & Oración',
      'Domingo 10:30 AM — Servicio Familiar de Celebración',
      'Miércoles 7:00 PM — Noche de Discipulado'
    ]
  }

  const heroImage = data.heroImage || 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=1600&q=85&fit=crop'

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

  const activeFont = data.font || 'Syne'
  const primaryBg = data.primaryColor || '#090B10'
  const accentYellow = data.accentColor || '#FACC15'

  const DEFAULT_AFICHE_ORDER = [
    'hero',
    'nucleusColumns',
    'ministries',
    'planAVisit',
    'welcome',
    'values',
    'nextSteps',
    'sermons',
    'events',
    'prayerRequest',
    'about',
    'donation',
    'contact'
  ]
  const activeOrder = (Array.isArray(data.sectionOrder) && data.sectionOrder.length > 0) ? data.sectionOrder : DEFAULT_AFICHE_ORDER
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
    <div className={rootClassName} style={{
      position: 'relative',
      containerType: 'inline-size',
      fontFamily: `'${activeFont}', 'Syne', 'Plus Jakarta Sans', sans-serif`,
      color: '#FFFFFF',
      background: primaryBg,
      margin: 0,
      padding: 0,
      width: '100%',
      overflowX: 'hidden'
    }}>
      <link rel="stylesheet" href={`https://fonts.googleapis.com/css2?family=${encodeURIComponent(activeFont.replace(/'/g, ''))}:wght@400;500;600;700;800;900&display=swap`} />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Italiana&family=Playfair+Display:ital,wght@1,700;1,900&family=Syne:wght@700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        .afiche-template-root {
          container-type: inline-size;
        }
        .afiche-template-root .afiche-script-font {
          font-family: 'Playfair Display', 'Italiana', serif;
          font-style: italic;
          font-weight: 900;
        }

        .afiche-template-root .afiche-title-font {
          font-family: 'Bebas Neue', 'Syne', sans-serif;
          letter-spacing: 0.04em;
          line-height: 0.95;
          text-transform: uppercase;
        }

        .afiche-template-root .afiche-glow-btn {
          background: #FACC15;
          color: #090B10;
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          transition: all 0.25s ease;
          box-shadow: 0 0 25px rgba(250, 204, 21, 0.35);
        }
        .afiche-template-root .afiche-glow-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 35px rgba(250, 204, 21, 0.55);
          background: #FFE066;
        }

        .afiche-template-root .afiche-oval-badge {
          border: 1.5px solid #FACC15;
          border-radius: 999px;
          padding: 6px 18px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(250, 204, 21, 0.08);
          backdrop-filter: blur(8px);
        }

        .afiche-template-root .afiche-photo-banner {
          position: relative;
          overflow: hidden;
          transition: transform 0.4s ease;
        }
        .afiche-template-root .afiche-photo-banner:hover img {
          transform: scale(1.04);
        }
        .afiche-template-root .editable-element {
          cursor: ${editMode ? 'pointer' : 'default'};
          transition: outline 0.15s ease;
        }
        .afiche-template-root .editable-element:hover {
          ${editMode ? 'outline: 2px dashed #FACC15; outline-offset: 4px;' : ''}
        }

        @container (max-width: 768px) {
          .afiche-template-root header.afiche-header {
            padding: 12px 16px !important;
          }
          .afiche-template-root header.afiche-header nav {
            gap: 8px !important;
          }
          .afiche-template-root header.afiche-header nav a[data-field^="navLinks"] {
            display: none !important;
          }
          .afiche-template-root header.afiche-header nav a:not([data-field^="navLinks"]) {
            padding: 6px 12px !important;
            font-size: 0.7rem !important;
          }

          .afiche-template-root section {
            padding: 40px 16px !important;
          }
          .afiche-template-root h1 {
            font-size: clamp(1.6rem, 7.5vw, 2.5rem) !important;
            line-height: 1.15 !important;
            margin-bottom: 16px !important;
            word-break: break-word !important;
          }
          .afiche-template-root h2 {
            font-size: clamp(1.6rem, 6.5vw, 2.4rem) !important;
            word-break: break-word !important;
          }
          .afiche-template-root p {
            font-size: 0.95rem !important;
            line-height: 1.5 !important;
          }
          .afiche-template-root section div[style*="display: grid"], .afiche-template-root section div[style*="display:grid"] {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
        }

        @media (max-width: 768px) {
          .afiche-template-root header.afiche-header {
            padding: 12px 16px !important;
          }
          .afiche-template-root header.afiche-header nav {
            gap: 8px !important;
          }
          .afiche-template-root header.afiche-header nav a[data-field^="navLinks"] {
            display: none !important;
          }
          .afiche-template-root header.afiche-header nav a:not([data-field^="navLinks"]) {
            padding: 6px 12px !important;
            font-size: 0.7rem !important;
          }

          .afiche-template-root section {
            padding: 40px 16px !important;
          }
          .afiche-template-root h1 {
            font-size: clamp(1.6rem, 7.5vw, 2.5rem) !important;
            line-height: 1.15 !important;
            margin-bottom: 16px !important;
            word-break: break-word !important;
          }
          .afiche-template-root h2 {
            font-size: clamp(1.6rem, 6.5vw, 2.4rem) !important;
            word-break: break-word !important;
          }
          .afiche-template-root p {
            font-size: 0.95rem !important;
            line-height: 1.5 !important;
          }
          .afiche-template-root section div[style*="display: grid"], .afiche-template-root section div[style*="display:grid"] {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
        }
      `}</style>

      {/* NAVBAR CINEMÁTICO OSCURO */}
      <header className="afiche-header" style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '24px 6%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'linear-gradient(180deg, rgba(9,11,16,0.9) 0%, rgba(9,11,16,0) 100%)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {logoImage ? (
            <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
              <img
                data-field="logoImage"
                data-ovkey="logoImage"
                src={logoImage}
                alt={businessName}
                className="editable-element"
                onClick={(e) => handleEdit(e, 'logoImage', 'Imagen de Logo (Subir o Cambiar)', 'image', logoImage)}
                style={{
                  maxHeight: ov('logoImage').maxHeight || 68,
                  maxWidth: ov('logoImage').maxWidth || 380,
                  width: ov('logoImage').width || 'auto',
                  height: ov('logoImage').height || 'auto',
                  objectFit: 'contain',
                  cursor: editMode ? 'pointer' : 'default',
                  ...ost('logoImage')
                }}
              />
              {rdh('logoImage')}
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ position: 'relative', display: 'inline-flex' }}>
                <div
                  data-field="logoImage"
                  data-ovkey="logoImage"
                  className="editable-element"
                  onClick={(e) => handleEdit(e, 'logoImage', 'Subir Imagen de Logo', 'image', logoImage)}
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: '50%',
                    border: '2px solid #FACC15',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FACC15',
                    fontSize: '1.2rem',
                    fontWeight: 900,
                    cursor: editMode ? 'pointer' : 'default',
                    ...ost('logoImage')
                  }}
                >
                  ✦
                </div>
                {rdh('logoImage')}
              </div>
              <span
                data-field="businessName"
                data-ovkey="businessName"
                className="afiche-title-font editable-element"
                onClick={(e) => handleEdit(e, 'businessName', 'Nombre de la Iglesia', 'text', businessName)}
                style={{
                  fontSize: '1.6rem',
                  letterSpacing: '0.06em',
                  color: '#FFFFFF',
                  ...ost('businessName')
                }}
              >
                {businessName}
              </span>
            </div>
          )}
        </div>

        {(() => {
          const headerCtaText = data.hero?.ctaText || data.navCtaText || planAVisit.ctaText || 'Planifica tu Visita'
          const headerCtaLink = data.hero?.ctaLink || data.navCtaLink || '#wp-plan-visit'
          const rawNavs = (Array.isArray(data.navLinks) && data.navLinks.length > 0) ? data.navLinks : [
            { text: nav.item1 || 'INICIO', href: '#wp-afiche-hero' },
            { text: nav.item2 || 'EXPERIENCIA', href: '#wp-afiche-gallery' },
            { text: nav.item3 || 'MINISTERIOS', href: '#wp-ministerios' },
            { text: nav.item4 || 'HORARIOS', href: '#wp-plan-visit' },
            { text: nav.item5 || 'CONTACTO', href: '#wp-contact' },
          ]
          const ctaClean = headerCtaText.trim().toLowerCase()
          const filteredNavs = rawNavs.filter(item => {
            const t = (item.text || item.label || '').trim().toLowerCase()
            return t !== ctaClean
          })
          return (
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexShrink: 0 }}>
              <nav style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'nowrap' }}>
                {filteredNavs.map((item, idx) => {
                  const itemLabel = item.text || item.label || 'Enlace'
                  return (
                    <a
                      key={idx}
                      data-field={`navLinks.${idx}.text`}
                      data-ovkey={`navLinks.${idx}.text`}
                      href={item.href || '#wp-afiche-hero'}
                      onClick={(e) => handleNavClick(e, item.href || '#wp-afiche-hero', `navLinks.${idx}.text`, `Menú: ${itemLabel}`, itemLabel)}
                      style={{ color: '#FFFFFF', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.05em', whiteSpace: 'nowrap', ...ost(`navLinks.${idx}.text`) }}
                      className="editable-element"
                    >
                      {itemLabel}
                    </a>
                  )
                })}
              </nav>
              <a
                data-field="hero.ctaText"
                data-ovkey="hero.ctaText"
                href={headerCtaLink}
                className="afiche-glow-btn editable-element"
                onClick={(e) => handleNavClick(e, headerCtaLink, 'hero.ctaText', 'Botón Navbar Visítanos', headerCtaText)}
                style={{
                  padding: '10px 22px',
                  borderRadius: 999,
                  fontSize: '0.75rem',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  ...ost('hero.ctaText')
                }}
              >
                {headerCtaText}
              </a>
            </div>
          )
        })()}
      </header>

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
            accentColor={data.accentColor || '#FACC15'}
            primaryColor="#090B10"
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
                  accentColor={accentYellow}
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
                  accentColor={accentYellow}
                  primaryBg={primaryBg}
                  font={activeFont}
                />,
                'Hero Portada (Split)'
              )
            }
            return wrap(
              <section id="wp-afiche-hero" style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '140px 6% 80px',
        overflow: 'hidden'
      }}>
        {/* Background image full bleed & editable */}
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
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
            />
          ) : (
            <img
              src={heroImage}
              alt={businessName}
              onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=1600&q=85&fit=crop' }}
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
            />
          )}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(9,11,16,0.6) 0%, rgba(9,11,16,0.85) 75%, #090B10 100%)', pointerEvents: 'none' }} />
          {editMode && (
            <div style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(250,204,21,0.95)', color: '#090B10', fontSize: '0.75rem', fontWeight: 900, padding: '6px 16px', borderRadius: 999, backdropFilter: 'blur(8px)', boxShadow: '0 4px 14px rgba(0,0,0,0.4)', pointerEvents: 'none', zIndex: 2 }}>
              📷 Clic para cambiar foto de portada
            </div>
          )}
        </div>

        <div style={{ position: 'absolute', top: '18%', right: '10%', color: '#FACC15', fontSize: '2.5rem', opacity: 0.85, zIndex: 1, pointerEvents: 'none' }}>✴</div>
        <div style={{ position: 'absolute', bottom: '25%', left: '8%', color: '#FACC15', fontSize: '2rem', opacity: 0.7, zIndex: 1, pointerEvents: 'none' }}>✦</div>

        <div style={{ maxWidth: 940, margin: '0 auto', zIndex: 10, position: 'relative' }}>
          <div
            data-field="hero.eyebrow"
            data-ovkey="hero.eyebrow"
            className="afiche-oval-badge editable-element"
            onClick={(e) => handleEdit(e, 'hero.eyebrow', 'Subtítulo Superior (Eyebrow)', 'text', cleanEyebrow)}
            style={{ marginBottom: 24, maxWidth: '100%', whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center', gap: 8, ...ost('hero.eyebrow') }}
          >
            <span style={{ color: '#FACC15', fontSize: '0.9rem', flexShrink: 0 }}>✦</span>
            <span className="afiche-script-font" style={{ color: '#FACC15', fontSize: '1.05rem', letterSpacing: '0.04em' }}>
              {cleanEyebrow}
            </span>
            <span style={{ color: '#FACC15', fontSize: '0.9rem', flexShrink: 0 }}>✦</span>
            {rdh('hero.eyebrow')}
          </div>

          <div
            data-field="hero.scriptTitle"
            data-ovkey="hero.scriptTitle"
            className="afiche-script-font editable-element"
            onClick={(e) => handleEdit(e, 'hero.scriptTitle', 'Título Script Secundario', 'text', hero.scriptTitle || 'Noche de')}
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.8rem)',
              color: '#FACC15',
              marginBottom: -10,
              textShadow: '0 4px 20px rgba(0,0,0,0.8)',
              ...ost('hero.scriptTitle')
            }}
          >
            {hero.scriptTitle || 'Noche de'}
            {rdh('hero.scriptTitle')}
          </div>

          <h1
            data-field="hero.headline"
            data-ovkey="hero.headline"
            className="afiche-title-font editable-element"
            onClick={(e) => handleEdit(e, 'hero.headline', 'Título Principal (Hero)', 'text', hero.headline)}
            style={{
              fontSize: 'clamp(4rem, 11vw, 9.5rem)',
              color: '#FFFFFF',
              margin: '0 0 20px',
              textShadow: '0 10px 40px rgba(0,0,0,0.9)',
              wordBreak: 'break-word',
              ...ost('hero.headline')
            }}
          >
            {hero.headline || 'ADORACIÓN & FE'}
            {rdh('hero.headline')}
          </h1>

          <p
            data-field="hero.subheadline"
            data-ovkey="hero.subheadline"
            className="editable-element"
            onClick={(e) => handleEdit(e, 'hero.subheadline', 'Descripción Principal (Hero)', 'textarea', hero.subheadline)}
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
              color: 'rgba(255,255,255,0.85)',
              maxWidth: 680,
              margin: '0 auto 36px',
              lineHeight: 1.6,
              fontWeight: 400,
              ...ost('hero.subheadline')
            }}
          >
            {hero.subheadline || 'Una experiencia espiritual inmersiva. Conecta con Dios a través de alabanza en vivo, oración ferviente y mensajes transformadores.'}
            {rdh('hero.subheadline')}
          </p>

          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              data-field="hero.ctaText"
              data-ovkey="hero.ctaText"
              href={hero.ctaLink || '#wp-plan-visit'}
              className="afiche-glow-btn editable-element"
              onClick={(e) => handleNavClick(e, hero.ctaLink || '#wp-plan-visit', 'hero.ctaText', 'Texto Botón Principal', hero.ctaText)}
              style={{
                padding: '16px 36px',
                borderRadius: 999,
                fontSize: '0.9rem',
                textDecoration: 'none',
                ...ost('hero.ctaText')
              }}
            >
              {hero.ctaText || 'Planifica tu Visita'}
              {rdh('hero.ctaText')}
            </a>
            <a
              data-field="hero.ctaSecondary"
              data-ovkey="hero.ctaSecondary"
              href={hero.ctaSecondaryLink || '#wp-afiche-gallery'}
              className="editable-element"
              onClick={(e) => handleNavClick(e, hero.ctaSecondaryLink || '#wp-afiche-gallery', 'hero.ctaSecondary', 'Texto Botón Secundario', hero.ctaSecondary)}
              style={{
                padding: '16px 32px',
                borderRadius: 999,
                border: '1.5px solid rgba(255,255,255,0.4)',
                background: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(8px)',
                color: '#FFFFFF',
                fontSize: '0.85rem',
                fontWeight: 700,
                textDecoration: 'none',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                transition: 'all 0.2s',
                ...ost('hero.ctaSecondary')
              }}
            >
              {hero.ctaSecondary || 'Ver Próximos Eventos'}
              {rdh('hero.ctaSecondary')}
            </a>
          </div>
        </div>
      </section>,
              'Hero Afiche'
            )
          case 'nucleusColumns':
          case 'gallery':
            return wrap(
              <section id="wp-afiche-gallery" style={{ padding: '100px 6%', background: '#0D0F17' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <span
            data-field="symbolicHeader.script"
            data-ovkey="symbolicHeader.script"
            className="afiche-script-font editable-element"
            onClick={(e) => handleEdit(e, 'symbolicHeader.script', 'Subtítulo Sección Galería', 'text', data.symbolicHeader?.script || 'Momentos Inolvidables')}
            style={{ color: '#FACC15', fontSize: '1.8rem', display: 'block', ...ost('symbolicHeader.script') }}
          >
            {data.symbolicHeader?.script || 'Momentos Inolvidables'}
          </span>
          <h2
            data-field="symbolicHeader.title"
            data-ovkey="symbolicHeader.title"
            className="afiche-title-font editable-element"
            onClick={(e) => handleEdit(e, 'symbolicHeader.title', 'Título Sección Galería', 'text', data.symbolicHeader?.title || 'VIVE LA EXPERIENCIA CON NOSOTROS')}
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', margin: 0, color: '#FFFFFF', ...ost('symbolicHeader.title') }}
          >
            {data.symbolicHeader?.title || 'VIVE LA EXPERIENCIA CON NOSOTROS'}
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 32
        }}>
          {symbolicSections.map((item, idx) => {
            const fallbackImg = idx === 1
              ? 'https://images.unsplash.com/photo-1509021436471-18736672b71e?w=1200&q=85&fit=crop'
              : 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&q=85&fit=crop'

            const cardImg = (item.image && !item.image.includes('photo-1499209974431')) ? item.image : fallbackImg

            return (
              <div
                key={idx}
                data-field={`symbolicSections.${idx}.image`}
                data-ovkey={`symbolicSections.${idx}.image`}
                className="afiche-photo-banner editable-element"
                onClick={(e) => handleEdit(e, `symbolicSections.${idx}.image`, `Foto Afiche: ${item.title}`, 'image', cardImg)}
                style={{
                  height: 520,
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: 16,
                  background: '#0D0F17',
                  ...ost(`symbolicSections.${idx}.image`)
                }}
              >
                {isVideoUrl(cardImg) ? (
                  <video
                    src={cardImg}
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <img
                    src={cardImg}
                    alt={item.title || 'Foto de tarjeta'}
                    onError={(e) => {
                      e.currentTarget.src = fallbackImg
                    }}
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                )}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(9,11,16,0.1) 0%, rgba(9,11,16,0.95) 85%)',
                padding: '32px 28px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                pointerEvents: 'none'
              }}>
                <div className="afiche-oval-badge" style={{ alignSelf: 'flex-start', marginBottom: 12, padding: '4px 14px', pointerEvents: 'auto' }}>
                  <span
                    data-field={`symbolicSections.${idx}.badge`}
                    data-ovkey={`symbolicSections.${idx}.badge`}
                    className="editable-element"
                    onClick={(e) => handleEdit(e, `symbolicSections.${idx}.badge`, `Insignia Afiche ${idx + 1}`, 'text', item.badge)}
                    style={{ fontSize: '0.7rem', color: '#FACC15', fontWeight: 800, ...ost(`symbolicSections.${idx}.badge`) }}
                  >
                    {item.badge}
                  </span>
                </div>

                <div
                  data-field={`symbolicSections.${idx}.script`}
                  data-ovkey={`symbolicSections.${idx}.script`}
                  className="afiche-script-font editable-element"
                  onClick={(e) => handleEdit(e, `symbolicSections.${idx}.script`, `Subtítulo Script Afiche ${idx + 1}`, 'text', item.script)}
                  style={{ color: '#FACC15', fontSize: '1.4rem', marginBottom: -4, pointerEvents: 'auto', ...ost(`symbolicSections.${idx}.script`) }}
                >
                  {item.script}
                </div>

                <h3
                  data-field={`symbolicSections.${idx}.title`}
                  data-ovkey={`symbolicSections.${idx}.title`}
                  className="afiche-title-font editable-element"
                  onClick={(e) => handleEdit(e, `symbolicSections.${idx}.title`, `Título Afiche ${idx + 1}`, 'text', item.title)}
                  style={{ fontSize: '2.2rem', color: '#FFFFFF', margin: '0 0 8px', pointerEvents: 'auto', ...ost(`symbolicSections.${idx}.title`) }}
                >
                  {item.title}
                </h3>

                <p
                  data-field={`symbolicSections.${idx}.desc`}
                  data-ovkey={`symbolicSections.${idx}.desc`}
                  className="editable-element"
                  onClick={(e) => handleEdit(e, `symbolicSections.${idx}.desc`, `Descripción Afiche ${idx + 1}`, 'textarea', item.desc)}
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: '0.85rem',
                    color: 'rgba(255,255,255,0.75)',
                    margin: 0,
                    lineHeight: 1.5,
                    fontWeight: 400,
                    pointerEvents: 'auto',
                    ...ost(`symbolicSections.${idx}.desc`)
                  }}
                >
                  {item.desc}
                </p>
              </div>
            </div>
          )
        })}
        </div>
      </section>,
              'Galería de Afiches'
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
                  accentColor={accentYellow}
                  primaryBg={'#090B10'}
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
                  accentColor={accentYellow}
                  primaryBg={'#090B10'}
                  font={activeFont}
                />,
                'Ministerios (Mosaico)'
              )
            }
            return wrap(
              <section id="wp-ministerios" style={{ padding: '120px 6%', background: '#090B10' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <span
            data-field="ministriesHeader.script"
            data-ovkey="ministriesHeader.script"
            className="afiche-script-font editable-element"
            onClick={(e) => handleEdit(e, 'ministriesHeader.script', 'Subtítulo Sección Ministerios', 'text', data.ministriesHeader?.script || 'Nuestra Familia')}
            style={{ color: '#FACC15', fontSize: '1.8rem', display: 'block', ...ost('ministriesHeader.script') }}
          >
            {data.ministriesHeader?.script || 'Nuestra Familia'}
          </span>
          <h2
            data-field="ministriesHeader.title"
            data-ovkey="ministriesHeader.title"
            className="afiche-title-font editable-element"
            onClick={(e) => handleEdit(e, 'ministriesHeader.title', 'Título Sección Ministerios', 'text', data.ministriesHeader?.title || 'MINISTERIOS & COMUNIDADES')}
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', margin: 0, color: '#FFFFFF', ...ost('ministriesHeader.title') }}
          >
            {data.ministriesHeader?.title || 'MINISTERIOS & COMUNIDADES'}
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 40, maxWidth: 1280, margin: '0 auto' }}>
          {ministries.map((min, idx) => (
            <div key={idx} style={{ background: 'transparent', display: 'flex', flexDirection: 'column' }}>
              <div
                data-field={`ministries.${idx}.image`}
                data-ovkey={`ministries.${idx}.image`}
                className="editable-element"
                onClick={(e) => handleEdit(e, `ministries.${idx}.image`, `Foto Ministerio: ${min.title}`, 'image', min.image)}
                style={{ height: 280, position: 'relative', overflow: 'hidden', marginBottom: 20, cursor: editMode ? 'pointer' : 'default', ...ost(`ministries.${idx}.image`) }}
              >
                {isVideoUrl(min.image) ? (
                  <video
                    src={min.image}
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <img
                    src={min.image}
                    alt={min.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                )}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 40%, #090B10 100%)', pointerEvents: 'none' }} />
              </div>
              <div>
                <div
                  data-field={`ministries.${idx}.script`}
                  data-ovkey={`ministries.${idx}.script`}
                  className="afiche-script-font editable-element"
                  onClick={(e) => handleEdit(e, `ministries.${idx}.script`, `Subtítulo Ministerio ${idx + 1}`, 'text', min.script)}
                  style={{ color: '#FACC15', fontSize: '1.3rem', marginBottom: -4, ...ost(`ministries.${idx}.script`) }}
                >
                  {min.script}
                </div>
                <h3
                  data-field={`ministries.${idx}.title`}
                  data-ovkey={`ministries.${idx}.title`}
                  className="afiche-title-font editable-element"
                  onClick={(e) => handleEdit(e, `ministries.${idx}.title`, `Título Ministerio ${idx + 1}`, 'text', min.title)}
                  style={{ fontSize: '2rem', color: '#FFFFFF', margin: '0 0 10px', ...ost(`ministries.${idx}.title`) }}
                >
                  {min.title}
                </h3>
                <p
                  data-field={`ministries.${idx}.desc`}
                  data-ovkey={`ministries.${idx}.desc`}
                  className="editable-element"
                  onClick={(e) => handleEdit(e, `ministries.${idx}.desc`, `Descripción Ministerio ${idx + 1}`, 'textarea', min.desc)}
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '0.92rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, margin: '0 0 20px', ...ost(`ministries.${idx}.desc`) }}
                >
                  {min.desc}
                </p>
                <a href="#wp-plan-visit" onClick={(e) => handleNavClick(e, '#wp-plan-visit', `ministries.${idx}.title`, `Botón Ministerio ${min.title}`, `Conoce más`)} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#FACC15', fontWeight: 800, textTransform: 'uppercase', fontSize: '0.8rem', textDecoration: 'none' }} className="editable-element">
                  Conoce más →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>,
              'Ministerios & Grupos'
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
                  accentColor={accentYellow}
                  primaryBg={primaryBg}
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
                  accentColor={accentYellow}
                  primaryBg={'#090B10'}
                  font={activeFont}
                />,
                'Visítanos (Horarios Card)'
              )
            }
            return wrap(
              <section id="wp-plan-visit" style={{
        padding: '120px 6%',
        background: 'linear-gradient(135deg, #11131E 0%, #090B10 100%)'
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 60, alignItems: 'center' }}>
          <div>
            <div
              data-field="planAVisit.script"
              data-ovkey="planAVisit.script"
              className="afiche-script-font editable-element"
              onClick={(e) => handleEdit(e, 'planAVisit.script', 'Subtítulo Horarios', 'text', planAVisit.script || 'Te Esperamos')}
              style={{ color: '#FACC15', fontSize: '2rem', marginBottom: -6, ...ost('planAVisit.script') }}
            >
              {planAVisit.script || 'Te Esperamos'}
            </div>
            <h2
              data-field="planAVisit.title"
              data-ovkey="planAVisit.title"
              className="afiche-title-font editable-element"
              onClick={(e) => handleEdit(e, 'planAVisit.title', 'Título Horarios', 'text', planAVisit.title || 'HORARIOS & UBICACIÓN')}
              style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', color: '#FFFFFF', margin: '0 0 16px', ...ost('planAVisit.title') }}
            >
              {planAVisit.title || 'HORARIOS & UBICACIÓN'}
            </h2>
            <p
              data-field="planAVisit.subtitle"
              data-ovkey="planAVisit.subtitle"
              className="editable-element"
              onClick={(e) => handleEdit(e, 'planAVisit.subtitle', 'Descripción Horarios', 'textarea', planAVisit.subtitle)}
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: '1rem',
                color: 'rgba(255,255,255,0.75)',
                marginBottom: 32,
                lineHeight: 1.6,
                ...ost('planAVisit.subtitle')
              }}
            >
              {planAVisit.subtitle}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 36 }}>
              {planAVisit.serviceTimes.map((time, i) => (
                <div
                  key={i}
                  data-field={`planAVisit.serviceTimes.${i}`}
                  data-ovkey={`planAVisit.serviceTimes.${i}`}
                  className="editable-element"
                  onClick={(e) => handleEdit(e, `planAVisit.serviceTimes.${i}`, `Horario ${i + 1}`, 'text', time)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                    ...ost(`planAVisit.serviceTimes.${i}`)
                  }}
                >
                  <div style={{ color: '#FACC15', fontSize: '1.2rem' }}>✦</div>
                  <span style={{ fontSize: '0.98rem', fontWeight: 700, color: '#FFFFFF' }}>{time}</span>
                </div>
              ))}
            </div>

            <div
              data-field="planAVisit.address"
              data-ovkey="planAVisit.address"
              className="editable-element"
              onClick={(e) => handleEdit(e, 'planAVisit.address', 'Dirección Principal', 'text', planAVisit.address)}
              style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', marginBottom: 28, ...ost('planAVisit.address') }}
            >
              <MapPin size={18} color="#FACC15" />
              <span>{planAVisit.address}</span>
            </div>

            {(() => {
              const waNum = (data.contact?.whatsapp || data.whatsapp || '').replace(/[^0-9]/g, '')
              const btnText = (planAVisit.ctaText && planAVisit.ctaText !== 'Planificar por WhatsApp') ? planAVisit.ctaText : 'Planifica tu Visita'
              const href = waNum ? `https://wa.me/${waNum}?text=Hola,%20quisiera%20planificar%20mi%20visita` : '#wp-contact'
              return (
                <a
                  data-field="planAVisit.ctaText"
                  data-ovkey="planAVisit.ctaText"
                  href={href}
                  target={waNum ? '_blank' : undefined}
                  rel="noreferrer"
                  className="afiche-glow-btn editable-element"
                  onClick={(e) => handleEdit(e, 'planAVisit.ctaText', 'Texto Botón Visítanos', 'text', btnText)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '16px 36px',
                    borderRadius: 999,
                    fontSize: '0.85rem',
                    textDecoration: 'none',
                    ...ost('planAVisit.ctaText')
                  }}
                >
                  {btnText}
                  <ArrowUpRight size={18} />
                </a>
              )
            })()}
          </div>

          <div
            data-field="planAVisit.image"
            data-ovkey="planAVisit.image"
            className="editable-element"
            onClick={(e) => handleEdit(e, 'planAVisit.image', 'Foto Sección Visítanos', 'image', planAVisit.image || 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=1000&q=85&fit=crop')}
            style={{
              position: 'relative',
              height: 480,
              overflow: 'hidden',
              borderRadius: 16,
              cursor: editMode ? 'pointer' : 'default',
              ...ost('planAVisit.image')
            }}
          >
            {isVideoUrl(planAVisit.image || 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=1000&q=85&fit=crop') ? (
              <video
                src={planAVisit.image || 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=1000&q=85&fit=crop'}
                autoPlay
                loop
                muted
                playsInline
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <img
                src={planAVisit.image || 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=1000&q=85&fit=crop'}
                alt="Adoración"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            )}
          </div>
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
                  accentColor={accentYellow}
                  primaryBg={'#090B10'}
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
                  accentColor={accentYellow}
                  primaryBg={'#090B10'}
                  font={activeFont}
                />,
                'Bienvenida a Casa (Split Tarjeta)'
              )
            }
            return wrap(
              <section id="wp-welcome" style={{ padding: '100px 6%', background: '#090B10', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div
            data-field="welcome.script"
            data-ovkey="welcome.script"
            className="afiche-script-font editable-element"
            onClick={(e) => handleEdit(e, 'welcome.script', 'Subtítulo Bienvenida', 'text', data.welcome?.script || 'Bienvenido a Casa')}
            style={{ color: '#FACC15', fontSize: '1.8rem', marginBottom: 8, ...ost('welcome.script') }}
          >
            {data.welcome?.script || 'Bienvenido a Casa'}
          </div>
          <h2 className="afiche-title-font" data-field="welcome.title" data-ovkey="welcome.title" onClick={(e) => handleEdit(e, 'welcome.title', 'Título Bienvenida', 'text', data.welcome?.title || 'Una comunidad apasionada por Jesús')} style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: '#FFFFFF', margin: '0 0 20px', ...ost('welcome.title') }}>
            {data.welcome?.title || 'Una comunidad apasionada por Jesús'}
          </h2>
          <p data-field="welcome.text" data-ovkey="welcome.text" className="editable-element" onClick={(e) => handleEdit(e, 'welcome.text', 'Mensaje Pastoral', 'textarea', data.welcome?.text || 'Aquí hay un lugar para ti y tu familia.')} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '1.05rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, margin: 0, ...ost('welcome.text') }}>
            {data.welcome?.text || 'Aquí hay un lugar para ti y tu familia.'}
          </p>
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
                  accentColor={accentYellow}
                  primaryBg={primaryBg}
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
                  accentColor={accentYellow}
                  primaryBg={primaryBg}
                  font={activeFont}
                />,
                'Valores (Minimalista)'
              )
            }
            return wrap(
              <section id="wp-values" style={{ padding: '100px 6%', background: '#0D0F17' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <span
              data-field="valuesHeader.script"
              data-ovkey="valuesHeader.script"
              className="afiche-script-font editable-element"
              onClick={(e) => handleEdit(e, 'valuesHeader.script', 'Subtítulo Valores', 'text', data.valuesHeader?.script || 'Fundamentos')}
              style={{ color: '#FACC15', fontSize: '1.6rem', display: 'block', ...ost('valuesHeader.script') }}
            >
              {data.valuesHeader?.script || 'Fundamentos'}
            </span>
            <h2
              data-field="valuesHeader.title"
              data-ovkey="valuesHeader.title"
              className="afiche-title-font editable-element"
              onClick={(e) => handleEdit(e, 'valuesHeader.title', 'Título Valores', 'text', data.valuesHeader?.title || 'NUESTROS VALORES')}
              style={{ fontSize: '3.2rem', color: '#FFFFFF', margin: 0, ...ost('valuesHeader.title') }}
            >
              {data.valuesHeader?.title || 'NUESTROS VALORES'}
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 32 }}>
            {(data.values || [
              { title: 'Amor Incondicional', text: 'Recibimos a cada persona con gracia y calidez.' },
              { title: 'Comunidad Auténtica', text: 'Crecemos juntos a través de grupos de amistad.' },
              { title: 'Verdad Bíblica', text: 'Enseñanza práctica basada en la Palabra de Dios.' },
              { title: 'Impacto y Misión', text: 'Servimos con generosidad a nuestra ciudad.' }
            ]).map((val, idx) => (
              <div key={idx} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(250,204,21,0.2)', borderRadius: 16, padding: 32 }}>
                <div style={{ color: '#FACC15', fontSize: '1.6rem', marginBottom: 14 }}>✦</div>
                <h3 data-field={`values.${idx}.title`} data-ovkey={`values.${idx}.title`} className="afiche-title-font editable-element" onClick={(e) => handleEdit(e, `values.${idx}.title`, `Título Valor ${idx+1}`, 'text', val.title)} style={{ fontSize: '1.5rem', color: '#FFFFFF', margin: '0 0 10px', ...ost(`values.${idx}.title`) }}>
                  {val.title}
                </h3>
                <p data-field={`values.${idx}.text`} data-ovkey={`values.${idx}.text`} className="editable-element" onClick={(e) => handleEdit(e, `values.${idx}.text`, `Texto Valor ${idx+1}`, 'textarea', val.text)} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '0.92rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, margin: 0, ...ost(`values.${idx}.text`) }}>
                  {val.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>,
              'Valores & Creencias'
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
                  accentColor={accentYellow}
                  primaryBg={'#090B10'}
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
                  accentColor={accentYellow}
                  primaryBg={'#090B10'}
                  font={activeFont}
                />,
                'Próximos Pasos (3 Pasos)'
              )
            }
            return wrap(
              <section id="wp-next-steps" style={{ padding: '100px 6%', background: '#090B10' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <h2 className="afiche-title-font" data-field="nextSteps.title" data-ovkey="nextSteps.title" onClick={(e) => handleEdit(e, 'nextSteps.title', 'Título Próximos Pasos', 'text', data.nextSteps?.title || 'PRÓXIMOS PASOS EN LA FE')} style={{ fontSize: '3.2rem', color: '#FFFFFF', margin: 0, ...ost('nextSteps.title') }}>
              {data.nextSteps?.title || 'PRÓXIMOS PASOS EN LA FE'}
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32 }}>
            {(data.nextSteps?.steps || [
              { title: '1. Creer & Conocer a Jesús', description: 'Descubre el amor de Dios.' },
              { title: '2. Conectar en Comunidad', description: 'Participa en grupos semanales.' },
              { title: '3. Servir', description: 'Bendice a otros uniéndote a un equipo.' }
            ]).map((st, idx) => (
              <div key={idx} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(250,204,21,0.2)', borderRadius: 16, padding: 32 }}>
                <h3 data-field={`nextSteps.steps.${idx}.title`} data-ovkey={`nextSteps.steps.${idx}.title`} className="afiche-title-font editable-element" onClick={(e) => handleEdit(e, `nextSteps.steps.${idx}.title`, `Paso ${idx+1} Título`, 'text', st.title)} style={{ fontSize: '1.4rem', color: '#FFFFFF', margin: '0 0 10px', ...ost(`nextSteps.steps.${idx}.title`) }}>
                  {st.title}
                </h3>
                <p data-field={`nextSteps.steps.${idx}.description`} data-ovkey={`nextSteps.steps.${idx}.description`} className="editable-element" onClick={(e) => handleEdit(e, `nextSteps.steps.${idx}.description`, `Paso ${idx+1} Descripción`, 'textarea', st.description)} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '0.92rem', color: 'rgba(255,255,255,0.7)', margin: 0, ...ost(`nextSteps.steps.${idx}.description`) }}>
                  {st.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>,
              'Próximos Pasos'
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
                  accentColor={accentYellow}
                  primaryBg={'#090B10'}
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
                  accentColor={accentYellow}
                  primaryBg={'#090B10'}
                  font={activeFont}
                />,
                'Sermones (Tarjetas)'
              )
            }
            return wrap(
              <section id="wp-sermons" style={{ padding: '100px 6%', background: '#0D0F17' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <h2 className="afiche-title-font" data-field="sermonsTitle" data-ovkey="sermonsTitle" onClick={(e) => handleEdit(e, 'sermonsTitle', 'Título Prédicas', 'text', data.sermonsTitle || 'MENSAJES RECIENTES')} style={{ fontSize: '3.2rem', color: '#FFFFFF', margin: 0, ...ost('sermonsTitle') }}>
              {data.sermonsTitle || 'MENSAJES RECIENTES'}
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32 }}>
            {(data.sermons || [
              { title: 'Caminando por Fe en Tiempos de Cambio', series: 'Serie: Imparables', speaker: 'Pastor Principal', image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=85&fit=crop' }
            ]).map((sermon, idx) => (
              <div key={idx} style={{ background: '#090B10', borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(250,204,21,0.2)' }}>
                <div data-field={`sermons.${idx}.image`} data-ovkey={`sermons.${idx}.image`} className="editable-element" onClick={(e) => handleEdit(e, `sermons.${idx}.image`, `Foto Prédica ${idx+1}`, 'image', sermon.image)} style={{ height: 200, position: 'relative', overflow: 'hidden', ...ost(`sermons.${idx}.image`) }}>
                  {isVideoUrl(sermon.image) ? (
                    <video src={sermon.image} autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <img src={sermon.image || 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=85&fit=crop'} alt={sermon.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  )}
                </div>
                <div style={{ padding: 24 }}>
                  <h3 data-field={`sermons.${idx}.title`} data-ovkey={`sermons.${idx}.title`} className="afiche-title-font editable-element" onClick={(e) => handleEdit(e, `sermons.${idx}.title`, `Título Prédica ${idx+1}`, 'text', sermon.title)} style={{ fontSize: '1.4rem', color: '#FFFFFF', margin: '0 0 10px', ...ost(`sermons.${idx}.title`) }}>
                    {sermon.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>,
              'Prédicas & Mensajes'
            )
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
                  accentColor={accentYellow}
                  primaryBg={primaryBg}
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
                  accentColor={accentYellow}
                  primaryBg={primaryBg}
                  font={activeFont}
                />,
                'Eventos (Tarjetas)'
              )
            }
            return wrap(
              <section id="wp-events" style={{ padding: '100px 6%', background: 'linear-gradient(135deg, #090B10 0%, #0D0F18 100%)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 52, flexWrap: 'wrap', gap: 20 }}>
            <div>
              <div
                data-field="events.script" data-ovkey="events.script"
                className="afiche-script-font editable-element"
                onClick={(e) => handleEdit(e, 'events.script', 'Subtítulo Sección Eventos', 'text', data.events?.script || 'Agenda')}
                style={{ color: accentColor, fontSize: '1.6rem', marginBottom: -4, ...ost('events.script') }}
              >
                {data.events?.script || 'Agenda'}
              </div>
              <h2
                data-field="events.title" data-ovkey="events.title"
                className="afiche-title-font editable-element"
                onClick={(e) => handleEdit(e, 'events.title', 'Título Sección Eventos', 'text', data.events?.title || 'PRÓXIMOS EVENTOS')}
                style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', color: '#FFFFFF', margin: 0, ...ost('events.title') }}
              >
                {data.events?.title || 'PRÓXIMOS EVENTOS'}
              </h2>
            </div>
            <a
              data-field="events.allLinkText" data-ovkey="events.allLinkText"
              className="editable-element"
              href={data.events?.allLink || '#wp-plan-visit'}
              onClick={(e) => handleEdit(e, 'events.allLinkText', 'Texto Enlace Eventos', 'text', data.events?.allLinkText || 'Ver agenda completa →')}
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: accentColor, fontWeight: 800, fontSize: '0.85rem', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.08em', whiteSpace: 'nowrap', ...ost('events.allLinkText') }}
            >
              {data.events?.allLinkText || 'Ver agenda completa →'}
            </a>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
            {(() => {
              const evData = data.events || {}
              const rawList = Array.isArray(evData) ? evData : (Array.isArray(evData.items) ? evData.items : [
                { image: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&q=85&fit=crop', day: '18', month: 'OCT', dateDay: '18', dateMonth: 'OCT', title: 'Noche de Adoración', time: '7:00 PM', location: 'Auditorio Principal', description: 'Una noche especial de adoración colectiva. Ven con tu familia.', desc: 'Una noche especial de adoración colectiva. Ven con tu familia.', link: '#wp-plan-visit', btnText: 'Inscribirme →' },
                { image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=85&fit=crop', day: '25', month: 'OCT', dateDay: '25', dateMonth: 'OCT', title: 'Conferencia de Familias', time: '9:00 AM', location: 'Sede Norte', description: 'Herramientas prácticas para fortalecer el hogar y el matrimonio.', desc: 'Herramientas prácticas para fortalecer el hogar y el matrimonio.', link: '#wp-plan-visit', btnText: 'Inscribirme →' },
                { image: 'https://images.unsplash.com/photo-1510936111840-65e151ad71bb?w=800&q=85&fit=crop', day: '1', month: 'NOV', dateDay: '01', dateMonth: 'NOV', title: 'Retiro Juvenil', time: '8:00 AM', location: 'Campo Retiro El Pedregal', description: 'Un fin de semana de conexión, aventura y crecimiento espiritual.', desc: 'Un fin de semana de conexión, aventura y crecimiento espiritual.', link: '#wp-plan-visit', btnText: 'Inscribirme →' },
              ])
              const evList = (rawList || []).filter(Boolean)
              const evPrefix = Array.isArray(evData) ? 'events' : 'events.items'
              return evList.map((ev, idx) => (
                <div key={idx} style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid rgba(250,204,21,0.1)`, borderRadius: 16, overflow: 'hidden', transition: 'border-color 0.2s, transform 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(250,204,21,0.35)'; e.currentTarget.style.transform = 'translateY(-4px)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(250,204,21,0.1)'; e.currentTarget.style.transform = 'translateY(0)' }}
                >
                  <div
                    data-field={`${evPrefix}.${idx}.image`} data-ovkey={`${evPrefix}.${idx}.image`}
                    className="editable-element"
                    onClick={(e) => handleEdit(e, `${evPrefix}.${idx}.image`, `Foto Evento ${idx + 1}`, 'image', ev?.image)}
                    style={{ position: 'relative', height: 200, overflow: 'hidden', cursor: editMode ? 'pointer' : 'default', ...ost(`${evPrefix}.${idx}.image`) }}
                  >
                    {isVideoUrl(ev?.image) ? (
                      <video src={ev?.image} autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <img src={ev?.image || 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&q=85&fit=crop'} alt={ev?.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    )}
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 35%, rgba(9,11,16,0.95) 100%)', pointerEvents: 'none' }} />
                    <div style={{ position: 'absolute', top: 16, left: 16, background: accentColor, color: '#06070A', padding: '8px 12px', borderRadius: 8, textAlign: 'center', minWidth: 48, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      <div
                        data-field={`${evPrefix}.${idx}.day`} data-ovkey={`${evPrefix}.${idx}.day`}
                        className="editable-element"
                        onClick={(e) => { e.stopPropagation(); handleEdit(e, `${evPrefix}.${idx}.day`, `Día Evento ${idx + 1}`, 'text', ev?.day || ev?.dateDay) }}
                        style={{ fontWeight: 900, fontSize: '1.4rem', lineHeight: 1, ...ost(`${evPrefix}.${idx}.day`) }}
                      >
                        {ev?.day || ev?.dateDay || '18'}
                      </div>
                      <div
                        data-field={`${evPrefix}.${idx}.month`} data-ovkey={`${evPrefix}.${idx}.month`}
                        className="editable-element"
                        onClick={(e) => { e.stopPropagation(); handleEdit(e, `${evPrefix}.${idx}.month`, `Mes Evento ${idx + 1}`, 'text', ev.month || ev.dateMonth) }}
                        style={{ fontWeight: 800, fontSize: '0.6rem', letterSpacing: '0.12em', ...ost(`${evPrefix}.${idx}.month`) }}
                      >
                        {ev.month || ev.dateMonth}
                      </div>
                    </div>
                  </div>
                  <div style={{ padding: '20px 22px 24px' }}>
                    <h3
                      data-field={`${evPrefix}.${idx}.title`} data-ovkey={`${evPrefix}.${idx}.title`}
                      className="afiche-title-font editable-element"
                      onClick={(e) => handleEdit(e, `${evPrefix}.${idx}.title`, `Título Evento ${idx + 1}`, 'text', ev.title)}
                      style={{ fontSize: '1.4rem', color: '#FFFFFF', margin: '0 0 10px', ...ost(`${evPrefix}.${idx}.title`) }}
                    >
                      {ev.title}
                    </h3>
                    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", display: 'flex', gap: 16, marginBottom: 12, flexWrap: 'wrap' }}>
                      <span
                        data-field={`${evPrefix}.${idx}.time`} data-ovkey={`${evPrefix}.${idx}.time`}
                        className="editable-element"
                        onClick={(e) => handleEdit(e, `${evPrefix}.${idx}.time`, `Horario Evento ${idx + 1}`, 'text', ev.time)}
                        style={{ fontSize: '0.78rem', color: accentColor, fontWeight: 700, ...ost(`${evPrefix}.${idx}.time`) }}
                      >
                        ⏰ {ev.time}
                      </span>
                      <span
                        data-field={`${evPrefix}.${idx}.location`} data-ovkey={`${evPrefix}.${idx}.location`}
                        className="editable-element"
                        onClick={(e) => handleEdit(e, `${evPrefix}.${idx}.location`, `Ubicación Evento ${idx + 1}`, 'text', ev.location)}
                        style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)', ...ost(`${evPrefix}.${idx}.location`) }}
                      >
                        📍 {ev.location}
                      </span>
                    </div>
                    <p
                      data-field={`${evPrefix}.${idx}.description`} data-ovkey={`${evPrefix}.${idx}.description`}
                      className="editable-element"
                      onClick={(e) => handleEdit(e, `${evPrefix}.${idx}.description`, `Descripción Evento ${idx + 1}`, 'textarea', ev.description || ev.desc)}
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '0.875rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.65, margin: '0 0 18px', ...ost(`${evPrefix}.${idx}.description`) }}
                    >
                      {ev.description || ev.desc}
                    </p>
                    <a
                      data-field={`${evPrefix}.${idx}.btnText`} data-ovkey={`${evPrefix}.${idx}.btnText`}
                      href={ev.link || '#wp-plan-visit'}
                      className="afiche-glow-btn editable-element"
                      onClick={(e) => handleEdit(e, `${evPrefix}.${idx}.btnText`, `Botón Evento ${idx + 1}`, 'text', ev.btnText || 'Inscribirme →')}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '9px 22px', borderRadius: 999, background: accentColor, color: '#06070A', fontSize: '0.8rem', fontWeight: 900, textDecoration: 'none', fontFamily: "'Plus Jakarta Sans', sans-serif", ...ost(`${evPrefix}.${idx}.btnText`) }}
                    >
                      {ev.btnText || 'Inscribirme →'}
                    </a>
                  </div>
                </div>
              ))
            })()}
          </div>
        </div>
      </section>,
              'Eventos & Calendario'
            )
          case 'prayerRequest':
            return wrap(
              <section id="wp-prayer" style={{ padding: '100px 6%', background: '#0D0F17' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <h2 className="afiche-title-font" data-field="prayerRequest.title" data-ovkey="prayerRequest.title" onClick={(e) => handleEdit(e, 'prayerRequest.title', 'Título Oración', 'text', data.prayerRequest?.title || '¿PODEMOS ORAR POR TI?')} style={{ fontSize: '3rem', color: '#FFFFFF', margin: '0 0 16px', ...ost('prayerRequest.title') }}>
            {data.prayerRequest?.title || '¿PODEMOS ORAR POR TI?'}
          </h2>
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(250,204,21,0.2)', borderRadius: 16, padding: 32, textAlign: 'left' }}>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: '0.8rem', color: '#FACC15', fontWeight: 700, marginBottom: 6 }}>Tu Nombre</label>
              <input type="text" placeholder="Ej: Juan Pérez" style={{ width: '100%', padding: '12px 16px', borderRadius: 8, background: '#090B10', border: '1px solid rgba(255,255,255,0.2)', color: '#FFFFFF', fontSize: '0.9rem' }} />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: '0.8rem', color: '#FACC15', fontWeight: 700, marginBottom: 6 }}>Tu Petición</label>
              <textarea rows={4} placeholder="Escribe tu motivo..." style={{ width: '100%', padding: '12px 16px', borderRadius: 8, background: '#090B10', border: '1px solid rgba(255,255,255,0.2)', color: '#FFFFFF', fontSize: '0.9rem', resize: 'vertical' }} />
            </div>
            <button data-field="prayerRequest.ctaText" data-ovkey="prayerRequest.ctaText" className="afiche-glow-btn editable-element" onClick={(e) => handleEdit(e, 'prayerRequest.ctaText', 'Texto Botón Oración', 'text', data.prayerRequest?.ctaText || 'Enviar Petición')} style={{ width: '100%', padding: '16px', borderRadius: 999, border: 'none', cursor: 'pointer', fontSize: '0.85rem', ...ost('prayerRequest.ctaText') }}>
              {data.prayerRequest?.ctaText || 'Enviar Petición'}
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
                  accentColor={accentYellow}
                  primaryBg={'#090B10'}
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
                  accentColor={accentYellow}
                  primaryBg={'#090B10'}
                  font={activeFont}
                />,
                'Sobre Nosotros (Split Comunidad)'
              )
            }
            return wrap(
              <section id="wp-about" style={{ padding: '100px 6%', background: '#090B10' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 60, alignItems: 'center' }}>
            <div>
              <h2 className="afiche-title-font" data-field="about.title" data-ovkey="about.title" onClick={(e) => handleEdit(e, 'about.title', 'Título Sobre Nosotros', 'text', data.about?.title || 'NUESTRA HISTORIA')} style={{ fontSize: '3rem', color: '#FFFFFF', margin: '0 0 20px', ...ost('about.title') }}>
                {data.about?.title || 'NUESTRA HISTORIA'}
              </h2>
              <p data-field="about.text" data-ovkey="about.text" className="editable-element" onClick={(e) => handleEdit(e, 'about.text', 'Texto Sobre Nosotros', 'textarea', data.about?.text || '')} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '1.05rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, margin: 0, ...ost('about.text') }}>
                {data.about?.text || 'Somos una iglesia comprometida con compartir el amor de Dios, servir a nuestra comunidad y acompañarte en cada paso de tu fe.'}
              </p>
            </div>
          </div>
        </section>,
              'Sobre Nosotros'
            )
          case 'donation':
            return wrap(
              <section id="wp-donations" style={{
        padding: '100px 6%',
        background: 'linear-gradient(135deg, #090B10 0%, #0D0F18 100%)'
      }}>
        <div style={{
          maxWidth: 860, margin: '0 auto', textAlign: 'center',
          background: 'rgba(250,204,21,0.05)',
          border: '1px solid rgba(250,204,21,0.15)',
          borderRadius: 28, padding: '60px 40px',
        }}>
          <div
            data-field="donation.eyebrow" data-ovkey="donation.eyebrow"
            className="editable-element"
            onClick={(e) => handleEdit(e, 'donation.eyebrow', 'Etiqueta Donaciones', 'text', data.donation?.eyebrow || 'GENEROSIDAD')}
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '0.75rem', fontWeight: 800, color: accentColor, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 16, ...ost('donation.eyebrow') }}
          >
            {data.donation?.eyebrow || 'GENEROSIDAD'}
          </div>
          <h2
            data-field="donation.title" data-ovkey="donation.title"
            className="afiche-title-font editable-element"
            onClick={(e) => handleEdit(e, 'donation.title', 'Título Donaciones', 'text', data.donation?.title || 'Tu Generosidad Transforma Vidas')}
            style={{ fontSize: 'clamp(2.2rem, 4.5vw, 4rem)', color: '#FFFFFF', margin: '0 0 20px', lineHeight: 1.05, ...ost('donation.title') }}
          >
            {data.donation?.title || 'Tu Generosidad Transforma Vidas'}
          </h2>
          <p
            data-field="donation.subtitle" data-ovkey="donation.subtitle"
            className="editable-element"
            onClick={(e) => handleEdit(e, 'donation.subtitle', 'Descripción Donaciones', 'textarea', data.donation?.subtitle || 'Cada ofrenda nos permite seguir extendiendo el mensaje de esperanza en nuestra ciudad y más allá.')}
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '1.05rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, margin: '0 0 40px', maxWidth: 580, marginLeft: 'auto', marginRight: 'auto', ...ost('donation.subtitle') }}
          >
            {data.donation?.subtitle || 'Cada ofrenda nos permite seguir extendiendo el mensaje de esperanza en nuestra ciudad y más allá.'}
          </p>
          <a
            data-field="donation.ctaText" data-ovkey="donation.ctaText"
            href={data.donation?.ctaLink || '#wp-contact'}
            target={(data.donation?.ctaLink || '').startsWith('http') ? '_blank' : undefined}
            rel={(data.donation?.ctaLink || '').startsWith('http') ? 'noopener noreferrer' : undefined}
            className="afiche-glow-btn editable-element"
            onClick={(e) => {
              const btnLabel = (data.donation?.ctaText === 'Ofrendar con Stripe' || data.donation?.ctaText === 'Donar con Stripe') ? 'Ofrendar' : (data.donation?.ctaText || 'Ofrendar')
              handleNavClick(e, data.donation?.ctaLink || '#wp-contact', 'donation.ctaText', 'Botón Donaciones', btnLabel, {
                linkField: 'donation.ctaLink',
                linkValue: data.donation?.ctaLink || '#wp-contact'
              })
            }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '16px 40px', borderRadius: 999,
              background: accentColor,
              color: '#06070A', fontWeight: 900, fontSize: '0.9rem',
              textDecoration: 'none',
              boxShadow: `0 8px 32px rgba(250,204,21,0.25)`,
              transition: 'all 0.2s ease',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              ...ost('donation.ctaText')
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            {(data.donation?.ctaText === 'Ofrendar con Stripe' || data.donation?.ctaText === 'Donar con Stripe') ? 'Ofrendar' : (data.donation?.ctaText || 'Ofrendar')}
          </a>
          {data.donation?.note && (
            <div
              data-field="donation.note" data-ovkey="donation.note"
              className="editable-element"
              onClick={(e) => handleEdit(e, 'donation.note', 'Nota Donaciones', 'text', data.donation.note)}
              style={{ marginTop: 24, fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', ...ost('donation.note') }}
            >
              🔒 {data.donation.note}
            </div>
          )}
        </div>
      </section>,
              'Ofrendas / Donaciones'
            )
          case 'contact':
            return wrap(
              <footer id="wp-contact" style={{
        padding: '60px 6%',
        background: '#06070A',
        textAlign: 'center',
        borderTop: '1px solid rgba(255,255,255,0.06)'
      }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          {logoImage ? (
            <img
              data-field="logoImage"
              data-ovkey="logoImage"
              src={logoImage}
              alt={businessName}
              className="editable-element"
              onClick={(e) => handleEdit(e, 'logoImage', 'Imagen de Logo Footer', 'image', logoImage)}
              style={{ maxHeight: 44, maxWidth: 190, objectFit: 'contain', cursor: editMode ? 'pointer' : 'default', ...ost('logoImage') }}
            />
          ) : (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
              <span style={{ color: '#FACC15', fontSize: '1.4rem' }}>✦</span>
              <span
                data-field="businessName"
                data-ovkey="businessName"
                className="afiche-title-font editable-element"
                onClick={(e) => handleEdit(e, 'businessName', 'Nombre Iglesia Footer', 'text', businessName)}
                style={{ fontSize: '1.8rem', color: '#FFFFFF', ...ost('businessName') }}
              >
                {businessName}
              </span>
              <span style={{ color: '#FACC15', fontSize: '1.4rem' }}>✦</span>
            </div>
          )}
        </div>
        <p style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: '0.85rem',
          color: 'rgba(255,255,255,0.5)',
          margin: '0 0 24px'
        }}>
          © {new Date().getFullYear()} {businessName}. Todos los derechos reservados.
        </p>
      </footer>,
              'Contacto & Redes'
            )
          default:
            return null
        }
      })}

    </div>
  )
}
