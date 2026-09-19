import React from 'react'
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

export default function ChurchTemplateNucleus({ data = {}, editMode = false, activeField, onElementClick, onSectionChange, onQuickUpdate, onQuickUpdateBatch, device = 'desktop' }) {
  const isMobileDevice = device === 'mobile'
  const isTabletDevice = device === 'tablet'
  const rootClassName = `nucleus-template-root ${isMobileDevice ? 'is-mobile-device' : ''} ${isTabletDevice ? 'is-tablet-device' : ''}`.trim()

  const businessName = data.businessName || 'Gateway Church'
  const logoImage = data.logoImage || ''
  const accentGold = data.accentColor || '#C4A35A'

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

  const nav = data.nav || {}
  const hero = data.hero || {
    eyebrow: 'DOMINGOS A LAS 10:30 A.M.',
    headline: 'Encuentra a Dios como nunca antes.',
    subheadline: 'Un espacio inmersivo para encontrarte con Dios, conectar con personas reales y vivir con propósito eterno en tu ciudad.',
    ctaText: 'PLANIFICA TU VISITA',
    ctaLink: '#wp-plan-visit',
    ctaSecondary: 'CONOCE MÁS',
    ctaSecondaryLink: '#wp-panoramas'
  }

  const rawEyebrow = hero.eyebrow || 'DOMINGOS 10:30 A.M.'
  const cleanEyebrow = rawEyebrow.replace(/^[✦\s\u2726]+|[✦\s\u2726]+$/g, '').trim() || 'DOMINGOS 10:30 A.M.'

  const panoramas = data.panoramas || [
    {
      title: 'Alabanza & Adoración',
      subtitle: 'Música contemporánea en vivo y momentos profundos de presencia.',
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1600&q=85&fit=crop'
    },
    {
      title: 'Niños & KidZone',
      subtitle: 'Cuidado amoroso y seguro para tus hijos cada fin de semana.',
      image: 'https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?w=1600&q=85&fit=crop'
    },
    {
      title: 'Jóvenes & Comunidad',
      subtitle: 'Amistades auténticas y grupos en casa en toda la ciudad.',
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1600&q=85&fit=crop'
    }
  ]

  const sermons = data.sermons || [
    {
      title: 'El Poder de la Gracia Incondicional',
      series: 'Serie: Fundamentos Inmovibles',
      speaker: 'Pastor Principal',
      image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=85&fit=crop'
    },
    {
      title: 'Caminando sobre el Agua en Tiempos Difíciles',
      series: 'Serie: Fe Firme',
      speaker: 'Equipo Pastoral',
      image: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?w=800&q=85&fit=crop'
    },
    {
      title: 'El Propósito de tu Vida en la Ciudad',
      series: 'Serie: Misión Diaria',
      speaker: 'Pastor de Jóvenes',
      image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800&q=85&fit=crop'
    }
  ]

  const planAVisit = data.planAVisit || {
    eyebrow: '10:30 A.M. CADA DOMINGO',
    title: 'Planifica tu Visita',
    subtitle: 'Acompáñanos en persona este fin de semana. Encuentra horarios, ubicación y todo lo necesario para tu primera reunión haciendo clic abajo.',
    ctaText: 'PLANIFICA TU VISITA',
    image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1400&q=85&fit=crop'
  }

  const heroImage = data.heroImage || 'https://images.unsplash.com/photo-1548625149-fc4a29cf7092?w=1920&q=85&fit=crop'
  const visionImage = data.visionImage || 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1200&q=85&fit=crop'

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
        e.stopPropagation()
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

  const activeFont = data.font || 'Playfair Display'
  const primaryBg = data.primaryColor || '#07080D'

  const DEFAULT_NUCLEUS_ORDER = [
    'hero',
    'missionBlock',
    'panoramas',
    'sermons',
    'planAVisit',
    'welcome',
    'values',
    'ministries',
    'nextSteps',
    'events',
    'donation',
    'prayerRequest',
    'about',
    'contact'
  ]
  const activeOrder = (Array.isArray(data.sectionOrder) && data.sectionOrder.length > 0) ? data.sectionOrder : DEFAULT_NUCLEUS_ORDER
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
    <div className={rootClassName} style={{ containerType: 'inline-size', position: 'relative', fontFamily: `'${activeFont}', 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif`, color: '#111827', background: primaryBg, margin: 0, padding: 0, width: '100%', overflowX: 'hidden' }}>
      <link rel="stylesheet" href={`https://fonts.googleapis.com/css2?family=${encodeURIComponent(activeFont.replace(/'/g, ''))}:wght@400;500;600;700;800;900&display=swap`} />
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,600;0,700;0,800;0,900;1,700&display=swap');
        
        .nucleus-template-root {
          container-type: inline-size;
        }
        .nucleus-template-root .afiche3-hero-h1 {
          font-family: '${activeFont}', Georgia, serif;
          font-weight: 900;
          letter-spacing: -0.02em;
          line-height: 1.05;
          color: #FFFFFF;
        }
        .nucleus-template-root .afiche3-btn-gold {
          background: ${accentGold};
          color: ${primaryBg};
          font-weight: 900;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          transition: all 0.25s ease;
          box-shadow: 0 10px 30px ${accentGold}55;
        }
        .nucleus-template-root .afiche3-btn-gold:hover {
          filter: brightness(1.15);
          transform: translateY(-2px);
        }
        .nucleus-template-root .afiche3-btn-outline-gold {
          border: 2px solid ${accentGold};
          color: ${accentGold};
          background: transparent;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          transition: all 0.25s ease;
        }
        .nucleus-template-root .afiche3-btn-outline-gold:hover {
          background: rgba(196, 163, 90, 0.15);
          transform: translateY(-2px);
        }
        .nucleus-template-root .editable-element {
          cursor: ${editMode ? 'pointer' : 'default'};
          transition: outline 0.15s ease;
        }
        .nucleus-template-root .editable-element:hover {
          ${editMode ? 'outline: 2px dashed #C4A35A; outline-offset: 4px;' : ''}
        }

        @container (max-width: 768px) {
          .nucleus-template-root #wp-announcement {
            padding: 8px 12px !important;
            font-size: 0.75rem !important;
            gap: 6px !important;
          }
          .nucleus-template-root #wp-announcement span {
            font-size: 0.75rem !important;
          }

          .nucleus-template-root header.nucleus-header {
            top: 0 !important;
            position: relative !important;
            background: #07080D !important;
          }
          .nucleus-template-root header.nucleus-header > div {
            padding: 12px 16px !important;
            flex-wrap: wrap !important;
            gap: 12px !important;
          }
          .nucleus-template-root header.nucleus-header img[data-field="logoImage"] {
            max-height: 44px !important;
            max-width: 180px !important;
          }
          .nucleus-template-root header.nucleus-header nav {
            gap: 6px !important;
            width: 100% !important;
            justify-content: space-between !important;
          }
          .nucleus-template-root header.nucleus-header nav a[data-field^="navLinks"] {
            display: none !important;
          }
          .nucleus-template-root header.nucleus-header nav a:not([data-field^="navLinks"]) {
            padding: 8px 16px !important;
            font-size: 0.75rem !important;
            margin-left: auto !important;
          }
        }

        @media (max-width: 768px) {
          .nucleus-template-root #wp-announcement {
            padding: 8px 12px !important;
            font-size: 0.75rem !important;
            gap: 6px !important;
          }
          .nucleus-template-root #wp-announcement span {
            font-size: 0.75rem !important;
          }

          .nucleus-template-root header.nucleus-header {
            top: 0 !important;
            position: relative !important;
            background: #07080D !important;
          }
          .nucleus-template-root header.nucleus-header > div {
            padding: 12px 16px !important;
            flex-wrap: wrap !important;
            gap: 12px !important;
          }
          .nucleus-template-root header.nucleus-header img[data-field="logoImage"] {
            max-height: 44px !important;
            max-width: 180px !important;
          }
          .nucleus-template-root header.nucleus-header nav {
            gap: 6px !important;
            width: 100% !important;
            justify-content: space-between !important;
          }
          .nucleus-template-root header.nucleus-header nav a[data-field^="navLinks"] {
            display: none !important;
          }
          .nucleus-template-root header.nucleus-header nav a:not([data-field^="navLinks"]) {
            padding: 8px 16px !important;
            font-size: 0.75rem !important;
            margin-left: auto !important;
          }

          .nucleus-template-root #wp-hero {
            min-height: auto !important;
            padding: 0 !important;
          }
          .nucleus-template-root #wp-hero > div:nth-of-type(2) {
            padding: 36px 16px 40px !important;
            max-width: 100% !important;
            box-sizing: border-box !important;
          }
          .nucleus-template-root .afiche3-hero-h1 {
            font-size: clamp(1.6rem, 7.5vw, 2.4rem) !important;
            line-height: 1.15 !important;
            margin-bottom: 16px !important;
            word-break: break-word !important;
            overflow-wrap: break-word !important;
          }
          .nucleus-template-root #wp-hero p {
            font-size: 0.95rem !important;
            line-height: 1.5 !important;
            margin-bottom: 24px !important;
          }
          .nucleus-template-root #wp-hero div[style*="display: flex"] {
            flex-direction: column !important;
            width: 100% !important;
          }
          .nucleus-template-root #wp-hero a {
            width: 100% !important;
            text-align: center !important;
            box-sizing: border-box !important;
            padding: 14px 20px !important;
          }

          .nucleus-template-root #wp-vision {
            padding: 44px 16px !important;
            box-sizing: border-box !important;
          }
          .nucleus-template-root #wp-vision > div {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
            width: 100% !important;
          }
          .nucleus-template-root #wp-vision h2 {
            font-size: clamp(1.6rem, 6.5vw, 2.4rem) !important;
            line-height: 1.2 !important;
            word-break: break-word !important;
          }
          .nucleus-template-root #wp-vision p {
            font-size: 0.95rem !important;
          }
          .nucleus-template-root #wp-vision > div > div:nth-child(2) {
            padding-left: 12px !important;
          }
          .nucleus-template-root #wp-vision div[data-field="visionImage"] {
            height: 220px !important;
          }

          .nucleus-template-root #wp-panoramas div[data-field*="panoramas"] {
            height: 240px !important;
          }
          .nucleus-template-root #wp-panoramas div[style*="padding: 0 8%"] {
            padding: 0 16px !important;
          }
          .nucleus-template-root #wp-panoramas h3 {
            font-size: clamp(1.5rem, 6.5vw, 2rem) !important;
            word-break: break-word !important;
          }
          .nucleus-template-root #wp-panoramas p {
            font-size: 0.9rem !important;
          }

          .nucleus-template-root #wp-sermons {
            padding: 44px 16px !important;
          }
          .nucleus-template-root #wp-sermons h2 {
            font-size: clamp(1.6rem, 6.5vw, 2.4rem) !important;
            word-break: break-word !important;
          }
          .nucleus-template-root #wp-sermons > div > div:nth-child(2) {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
          }
          .nucleus-template-root #wp-sermons div[data-field*="sermons"] {
            height: 200px !important;
          }

          .nucleus-template-root #wp-plan-visit {
            grid-template-columns: 1fr !important;
          }
          .nucleus-template-root #wp-plan-visit > div:nth-child(1) {
            min-height: 220px !important;
            height: 220px !important;
          }
          .nucleus-template-root #wp-plan-visit > div:nth-child(2) {
            padding: 36px 16px !important;
          }
          .nucleus-template-root #wp-plan-visit h2 {
            font-size: clamp(1.6rem, 6.5vw, 2.4rem) !important;
            word-break: break-word !important;
          }
          .nucleus-template-root #wp-plan-visit a {
            width: 100% !important;
            text-align: center !important;
            box-sizing: border-box !important;
          }

          .nucleus-template-root #wp-welcome {
            padding: 44px 16px !important;
          }
          .nucleus-template-root #wp-welcome h2 {
            font-size: clamp(1.5rem, 6vw, 2.2rem) !important;
            word-break: break-word !important;
          }
          .nucleus-template-root #wp-welcome p {
            font-size: 0.95rem !important;
          }

          .nucleus-template-root #wp-values {
            padding: 44px 16px !important;
          }
          .nucleus-template-root #wp-values > div > div:nth-child(2) {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }

          .nucleus-template-root #wp-ministries {
            padding: 44px 16px !important;
          }
          .nucleus-template-root #wp-ministries > div > div:nth-child(2) {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .nucleus-template-root #wp-ministries div[data-field*="ministries"] {
            height: 180px !important;
          }

          .nucleus-template-root #wp-next-steps {
            padding: 44px 16px !important;
          }
          .nucleus-template-root #wp-next-steps > div > div:nth-child(2) {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }

          .nucleus-template-root #wp-donations {
            padding: 44px 16px !important;
          }
          .nucleus-template-root #wp-donations > div {
            padding: 32px 16px !important;
          }
          .nucleus-template-root #wp-donations h2 {
            font-size: clamp(1.5rem, 6vw, 2.2rem) !important;
            word-break: break-word !important;
          }
          .nucleus-template-root #wp-donations a {
            width: 100% !important;
            text-align: center !important;
            box-sizing: border-box !important;
          }

          .nucleus-template-root #wp-prayer {
            padding: 44px 16px !important;
          }
          .nucleus-template-root #wp-prayer > div > div {
            padding: 24px 16px !important;
          }
          .nucleus-template-root #wp-prayer h2 {
            font-size: clamp(1.5rem, 6vw, 2.2rem) !important;
            word-break: break-word !important;
          }

          .nucleus-template-root #wp-about {
            padding: 44px 16px !important;
          }
          .nucleus-template-root #wp-about > div {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
          }
          .nucleus-template-root #wp-about div[data-field="aboutImage"] {
            height: 220px !important;
          }

          .nucleus-template-root #wp-widget {
            bottom: 12px !important;
            right: 12px !important;
            left: 12px !important;
            max-width: none !important;
            padding: 14px 18px !important;
          }

          .nucleus-template-root #wp-contact {
            padding: 44px 16px 36px !important;
          }
          .nucleus-template-root #wp-contact > div:nth-child(1) {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
          }

          .nucleus-template-root h1, 
          .nucleus-template-root h2, 
          .nucleus-template-root h3, 
          .nucleus-template-root h4 {
            word-break: break-word !important;
            overflow-wrap: break-word !important;
          }
          .nucleus-template-root img {
            max-width: 100% !important;
          }
        }
      `}</style>

      {/* ── 0. TOP ANNOUNCEMENT BAR ── */}
      {data.announcementBar?.visible !== false && data.sectionsVisibility?.announcementBar !== false && (
        <div id="wp-announcement" style={{ background: accentGold, color: primaryBg, padding: '10px 24px', textAlign: 'center', fontSize: '0.85rem', fontWeight: 800, letterSpacing: '0.04em', zIndex: 101, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
          <span data-field="announcementBar.text" data-ovkey="announcementBar.text" className="editable-element" onClick={(e) => handleEdit(e, 'announcementBar.text', 'Texto del Anuncio', 'text', data.announcementBar?.text || '👋 Weekly Check-In: ¿Necesitas oración o información de nuestros servicios?')}>
            {data.announcementBar?.text || '👋 Weekly Check-In: ¿Necesitas oración o información de nuestros servicios?'}
          </span>
          {(data.announcementBar?.ctaText || 'Conéctate') && (
            <a data-field="announcementBar.ctaText" data-ovkey="announcementBar.ctaText" href={data.announcementBar?.ctaLink || '#wp-plan-visit'} onClick={(e) => handleNavClick(e, data.announcementBar?.ctaLink || '#wp-plan-visit', 'announcementBar.ctaText', 'Texto Botón Anuncio', data.announcementBar?.ctaText || 'Conéctate')} className="editable-element" style={{ background: primaryBg, color: '#FFFFFF', padding: '4px 14px', borderRadius: 999, textDecoration: 'none', fontSize: '0.78rem', fontWeight: 800 }}>
              {data.announcementBar?.ctaText || 'Conéctate'} →
            </a>
          )}
        </div>
      )}

      {/* ── 1. TOPBAR EDITORIAL CON MENÚ Y LOGO CAMBIABLE ── */}
      <header className="nucleus-header" style={{ position: 'absolute', top: data.announcementBar?.visible !== false ? 40 : 0, left: 0, right: 0, zIndex: 100, background: 'linear-gradient(180deg, rgba(7,8,13,0.85) 0%, transparent 100%)' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto', padding: '24px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span
                  data-field="logoImage"
                  data-ovkey="logoImage"
                  className="editable-element"
                  onClick={(e) => handleEdit(e, 'logoImage', 'Subir Imagen de Logo', 'image', logoImage)}
                  title="Haz clic para subir una imagen de logo"
                  style={{ color: accentGold, fontSize: '1.5rem', cursor: editMode ? 'pointer' : 'default', ...ost('logoImage') }}
                >
                  †
                </span>
                <span
                  data-field="businessName"
                  data-ovkey="businessName"
                  className="editable-element"
                  onClick={(e) => handleEdit(e, 'businessName', 'Nombre de la Iglesia', 'text', businessName)}
                  style={{ color: '#FFFFFF', fontFamily: 'Playfair Display, serif', fontSize: '1.35rem', fontWeight: 800, letterSpacing: '0.04em', ...ost('businessName') }}
                >
                  {businessName}
                </span>
              </div>
            )}
          </div>
          {(() => {
            const headerCtaText = data.hero?.ctaText || data.navCtaText || hero.ctaText || 'PLANIFICA TU VISITA'
            const headerCtaLink = data.hero?.ctaLink || data.navCtaLink || hero.ctaLink || '#wp-plan-visit'
            const rawNavs = (Array.isArray(data.navLinks) && data.navLinks.length > 0) ? data.navLinks : [
              { text: nav.item1 || 'INICIO', href: '#wp-hero' },
              { text: nav.item2 || 'VISIÓN', href: '#wp-vision' },
              { text: nav.item3 || 'EXPERIENCIA', href: '#wp-panoramas' },
              { text: nav.item4 || 'MENSAJES', href: '#wp-sermons' },
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
                    const itemLabel = item.text || item.label || 'Link'
                    return (
                      <a
                        key={idx}
                        data-field={`navLinks.${idx}.text`}
                        data-ovkey={`navLinks.${idx}.text`}
                        href={item.href || '#wp-hero'}
                        onClick={(e) => handleNavClick(e, item.href || '#wp-hero', `navLinks.${idx}.text`, `Menú: ${itemLabel}`, itemLabel)}
                        style={{ color: '#FFFFFF', textDecoration: 'none', fontSize: '0.8125rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', whiteSpace: 'nowrap', ...ost(`navLinks.${idx}.text`) }}
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
                  onClick={(e) => handleNavClick(e, headerCtaLink, 'hero.ctaText', 'Botón Navbar Visítanos', headerCtaText)}
                  className="afiche3-btn-gold editable-element"
                  style={{ padding: '10px 24px', borderRadius: 999, textDecoration: 'none', fontSize: '0.8125rem', whiteSpace: 'nowrap', flexShrink: 0, ...ost('hero.ctaText') }}
                >
                  {headerCtaText}
                </a>
              </div>
            )
          })()}
        </div>
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
            accentColor={accentGold}
            primaryColor={primaryBg}
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
                  accentColor={accentGold}
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
                  accentColor={accentGold}
                  primaryBg={primaryBg}
                  font={activeFont}
                />,
                'Hero Portada (Split)'
              )
            }
            return wrap(
              <section id="wp-hero" style={{ position: 'relative', width: '100%', minHeight: '100vh', display: 'flex', alignItems: 'center', background: '#07080D', overflow: 'hidden', boxSizing: 'border-box' }}>
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
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', filter: 'brightness(0.65)' }}
            />
          ) : (
            <img
              src={heroImage}
              alt={businessName}
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', filter: 'brightness(0.65)' }}
            />
          )}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, #07080D 0%, rgba(7,8,13,0.65) 50%, rgba(7,8,13,0.15) 100%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 60%, #07080D 100%)', pointerEvents: 'none' }} />
        </div>

        <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: 640, padding: '160px 8% 80px', display: 'flex', flexDirection: 'column', justifyContent: 'center', boxSizing: 'border-box' }}>
          <div
            data-field="hero.eyebrow"
            data-ovkey="hero.eyebrow"
            className="editable-element"
            onClick={(e) => handleEdit(e, 'hero.eyebrow', 'Subtítulo Superior (Eyebrow)', 'text', cleanEyebrow)}
            style={{ fontSize: '0.8rem', fontWeight: 800, color: '#DFCA88', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 20, ...ost('hero.eyebrow') }}
          >
            ✦ {cleanEyebrow} ✦
          </div>

          <h1
            data-field="hero.headline"
            data-ovkey="hero.headline"
            className="afiche3-hero-h1 editable-element"
            onClick={(e) => handleEdit(e, 'hero.headline', 'Título Principal (Hero)', 'text', hero.headline)}
            style={{ fontSize: 'clamp(2.8rem, 5vw, 4.2rem)', margin: '0 0 24px', ...ost('hero.headline') }}
          >
            {hero.headline}
          </h1>

          <div style={{ borderLeft: `3px solid ${accentGold}`, paddingLeft: 20, marginBottom: 40 }}>
            <p
              data-field="hero.subheadline"
              data-ovkey="hero.subheadline"
              className="editable-element"
              onClick={(e) => handleEdit(e, 'hero.subheadline', 'Descripción Principal (Hero)', 'textarea', hero.subheadline)}
              style={{ fontSize: '1.1rem', lineHeight: 1.7, color: '#E2E8F0', margin: 0, fontWeight: 400, ...ost('hero.subheadline') }}
            >
              {hero.subheadline}
            </p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
            <a
              data-field="hero.ctaText"
              data-ovkey="hero.ctaText"
              href={hero.ctaLink || '#wp-plan-visit'}
              className="afiche3-btn-gold editable-element"
              onClick={(e) => handleNavClick(e, hero.ctaLink || '#wp-plan-visit', 'hero.ctaText', 'Texto Botón Principal', hero.ctaText)}
              style={{ display: 'inline-block', padding: '18px 38px', borderRadius: 999, textDecoration: 'none', fontSize: '0.875rem', ...ost('hero.ctaText') }}
            >
              {hero.ctaText}
            </a>
            <a
              data-field="hero.ctaSecondary"
              data-ovkey="hero.ctaSecondary"
              href={hero.ctaSecondaryLink || '#wp-panoramas'}
              className="afiche3-btn-outline-gold editable-element"
              onClick={(e) => handleNavClick(e, hero.ctaSecondaryLink || '#wp-panoramas', 'hero.ctaSecondary', 'Texto Botón Secundario', hero.ctaSecondary)}
              style={{ display: 'inline-block', padding: '17px 34px', borderRadius: 999, textDecoration: 'none', fontSize: '0.875rem', ...ost('hero.ctaSecondary') }}
            >
              {hero.ctaSecondary}
            </a>
          </div>
        </div>
      </section>,
              'Hero Portada'
            )
          case 'missionBlock':
          case 'vision':
            return wrap(
              <section id="wp-vision" style={{ width: '100%', background: '#07080D', padding: '120px 8%', boxSizing: 'border-box' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 80, alignItems: 'center' }}>
          <div>
            <div
              data-field="vision.eyebrow"
              data-ovkey="vision.eyebrow"
              className="editable-element"
              onClick={(e) => handleEdit(e, 'vision.eyebrow', 'Etiqueta Visión', 'text', data.vision?.eyebrow || '✦ NUESTRA IDENTIDAD ✦')}
              style={{ fontSize: '0.8rem', fontWeight: 800, color: accentGold, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 16, ...ost('vision.eyebrow') }}
            >
              {data.vision?.eyebrow || '✦ NUESTRA IDENTIDAD ✦'}
            </div>
            <h2
              data-field="vision.title"
              data-ovkey="vision.title"
              className="editable-element"
              onClick={(e) => handleEdit(e, 'vision.title', 'Título Visión', 'text', data.vision?.title || 'Una visión arraigada en la verdad y el amor.')}
              style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2.5rem, 4vw, 3.8rem)', color: '#FFFFFF', margin: '0 0 24px', lineHeight: 1.1, ...ost('vision.title') }}
            >
              {data.vision?.title || 'Una visión arraigada en la verdad y el amor.'}
            </h2>
            <p
              data-field="vision.desc"
              data-ovkey="vision.desc"
              className="editable-element"
              onClick={(e) => handleEdit(e, 'vision.desc', 'Descripción Visión', 'textarea', data.vision?.desc || 'Existimos para ser una luz encendida en medio de la ciudad, capacitando a hombres y mujeres para vivir con fe profunda, esperanza inamovible y propósito eterno.')}
              style={{ fontSize: '1.15rem', color: '#94A3B8', lineHeight: 1.7, margin: '0 0 36px', ...ost('vision.desc') }}
            >
              {data.vision?.desc || 'Existimos para ser una luz encendida en medio de la ciudad, capacitando a hombres y mujeres para vivir con fe profunda, esperanza inamovible y propósito eterno.'}
            </p>
            
            <div
              data-field="visionImage"
              data-ovkey="visionImage"
              className="editable-element"
              onClick={(e) => handleEdit(e, 'visionImage', 'Foto Sección Visión', 'image', visionImage)}
              style={{ position: 'relative', width: '100%', height: 320, overflow: 'hidden', cursor: editMode ? 'pointer' : 'default', ...ost('visionImage') }}
            >
              {isVideoUrl(visionImage) ? (
                <video
                  src={visionImage}
                  autoPlay loop muted playsInline
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <img
                  src={visionImage}
                  alt="Enseñanza"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              )}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 50%, #07080D 100%)', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, #07080D 0%, transparent 20%, transparent 80%, #07080D 100%)', pointerEvents: 'none' }} />
            </div>
          </div>

          <div style={{ paddingLeft: 24, borderLeft: '2px solid rgba(196,163,90,0.5)' }}>
            <div style={{ color: accentGold, fontSize: '3.5rem', lineHeight: 1, marginBottom: 12 }}>“</div>
            <p
              data-field="vision.quote"
              data-ovkey="vision.quote"
              className="editable-element"
              onClick={(e) => handleEdit(e, 'vision.quote', 'Frase / Cita Visión', 'textarea', data.vision?.quote || 'Amar a Dios sobre todas las cosas, amar al prójimo como a nosotros mismos y hacer discípulos en todas las naciones.')}
              style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.45rem', color: '#DFCA88', lineHeight: 1.6, fontStyle: 'italic', margin: '0 0 32px', ...ost('vision.quote') }}
            >
              {data.vision?.quote || 'Amar a Dios sobre todas las cosas, amar al prójimo como a nosotros mismos y hacer discípulos en todas las naciones.'}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, color: '#E2E8F0', fontSize: '1rem' }}>
              <div data-field="vision.p1" data-ovkey="vision.p1" className="editable-element" onClick={(e) => handleEdit(e, 'vision.p1', 'Pilar 1 Visión', 'text', 'Adoración genuina e inmersiva')} style={{ display: 'flex', alignItems: 'center', gap: 14, ...ost('vision.p1') }}>
                <span style={{ color: accentGold, fontSize: '1.2rem' }}>✦</span> {data.vision?.p1 || 'Adoración genuina e inmersiva'}
              </div>
              <div data-field="vision.p2" data-ovkey="vision.p2" className="editable-element" onClick={(e) => handleEdit(e, 'vision.p2', 'Pilar 2 Visión', 'text', 'Discipulado bíblico profundo')} style={{ display: 'flex', alignItems: 'center', gap: 14, ...ost('vision.p2') }}>
                <span style={{ color: accentGold, fontSize: '1.2rem' }}>✦</span> {data.vision?.p2 || 'Discipulado bíblico profundo'}
              </div>
              <div data-field="vision.p3" data-ovkey="vision.p3" className="editable-element" onClick={(e) => handleEdit(e, 'vision.p3', 'Pilar 3 Visión', 'text', 'Impacto social y generosidad radical')} style={{ display: 'flex', alignItems: 'center', gap: 14, ...ost('vision.p3') }}>
                <span style={{ color: accentGold, fontSize: '1.2rem' }}>✦</span> {data.vision?.p3 || 'Impacto social y generosidad radical'}
              </div>
            </div>
          </div>
        </div>
      </section>,
              'Visión & Propósito'
            )
          case 'panoramas':
            return wrap(
              <section id="wp-panoramas" style={{ width: '100%', margin: 0, padding: 0 }}>
        {panoramas.map((pano, idx) => (
          <div key={idx}
            data-field={`panoramas.${idx}.image`}
            data-ovkey={`panoramas.${idx}.image`}
            className="editable-element"
            onClick={(e) => handleEdit(e, `panoramas.${idx}.image`, `Foto Panorama ${idx + 1}`, 'image', pano.image)}
            style={{ position: 'relative', width: '100%', height: 420, overflow: 'hidden', cursor: editMode ? 'pointer' : 'default', ...ost(`panoramas.${idx}.image`) }}
          >
            {isVideoUrl(pano.image) ? (
              <video
                src={pano.image}
                autoPlay loop muted playsInline
                style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.55)' }}
              />
            ) : (
              <img
                src={pano.image}
                alt={pano.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.55)' }}
              />
            )}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, #07080D 0%, transparent 60%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 60%, #07080D 100%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', inset: 0, padding: '0 8%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', color: '#FFFFFF', pointerEvents: 'none' }}>
              <h3
                data-field={`panoramas.${idx}.title`}
                data-ovkey={`panoramas.${idx}.title`}
                className="editable-element"
                onClick={(e) => handleEdit(e, `panoramas.${idx}.title`, `Título Panorama ${idx + 1}`, 'text', pano.title)}
                style={{ fontFamily: 'Playfair Display, serif', fontSize: '3rem', fontWeight: 900, margin: '0 0 10px', color: '#FFFFFF', pointerEvents: 'auto', ...ost(`panoramas.${idx}.title`) }}
              >
                {pano.title}
              </h3>
              <p
                data-field={`panoramas.${idx}.subtitle`}
                data-ovkey={`panoramas.${idx}.subtitle`}
                className="editable-element"
                onClick={(e) => handleEdit(e, `panoramas.${idx}.subtitle`, `Subtítulo Panorama ${idx + 1}`, 'text', pano.subtitle)}
                style={{ fontSize: '1.15rem', color: '#DFCA88', margin: 0, maxWidth: 580, pointerEvents: 'auto', ...ost(`panoramas.${idx}.subtitle`) }}
              >
                {pano.subtitle}
              </p>
            </div>
          </div>
        ))}
      </section>,
              'Franjas Panorámicas'
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
                  accentColor={accentGold}
                  primaryBg={'#07080D'}
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
                  accentColor={accentGold}
                  primaryBg={'#07080D'}
                  font={activeFont}
                />,
                'Sermones (Tarjetas)'
              )
            }
            return wrap(
              <section id="wp-sermons" style={{ width: '100%', background: '#07080D', padding: '120px 8%', boxSizing: 'border-box' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 70px' }}>
            <div
              data-field="sermonsHeader.eyebrow"
              data-ovkey="sermonsHeader.eyebrow"
              className="editable-element"
              onClick={(e) => handleEdit(e, 'sermonsHeader.eyebrow', 'Etiqueta Sección Prédicas', 'text', data.sermonsHeader?.eyebrow || '✦ ENSEÑANZA & RECURSOS ✦')}
              style={{ fontSize: '0.8rem', fontWeight: 800, color: accentGold, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 14, ...ost('sermonsHeader.eyebrow') }}
            >
              {data.sermonsHeader?.eyebrow || '✦ ENSEÑANZA & RECURSOS ✦'}
            </div>
            <h2
              data-field="sermonsHeader.title"
              data-ovkey="sermonsHeader.title"
              className="editable-element"
              onClick={(e) => handleEdit(e, 'sermonsHeader.title', 'Título Sección Prédicas', 'text', data.sermonsHeader?.title || 'Mensajes & Prédicas Recientes')}
              style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2.5rem, 4.5vw, 3.6rem)', color: '#FFFFFF', margin: 0, ...ost('sermonsHeader.title') }}
            >
              {data.sermonsHeader?.title || 'Mensajes & Prédicas Recientes'}
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 48 }}>
            {sermons.map((sermon, idx) => (
              <div key={idx} style={{ background: 'transparent', display: 'flex', flexDirection: 'column' }}>
                <div
                  data-field={`sermons.${idx}.image`}
                  data-ovkey={`sermons.${idx}.image`}
                  className="editable-element"
                  onClick={(e) => handleEdit(e, `sermons.${idx}.image`, `Foto Prédica ${idx + 1}`, 'image', sermon.image)}
                  style={{ position: 'relative', height: 240, overflow: 'hidden', marginBottom: 24, cursor: editMode ? 'pointer' : 'default', ...ost(`sermons.${idx}.image`) }}
                >
                  {isVideoUrl(sermon.image) ? (
                    <video
                      src={sermon.image}
                      autoPlay loop muted playsInline
                      style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.75)' }}
                    />
                  ) : (
                    <img
                      src={sermon.image}
                      alt={sermon.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.75)' }}
                    />
                  )}
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 40%, #07080D 100%)', pointerEvents: 'none' }} />
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
                    <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#C4A35A', color: '#07080D', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1.3rem', boxShadow: '0 8px 30px rgba(196,163,90,0.6)' }}>
                      ▶
                    </div>
                  </div>
                </div>
                <div>
                  <div
                    data-field={`sermons.${idx}.series`}
                    data-ovkey={`sermons.${idx}.series`}
                    className="editable-element"
                    onClick={(e) => handleEdit(e, `sermons.${idx}.series`, `Serie Prédica ${idx + 1}`, 'text', sermon.series)}
                    style={{ fontSize: '0.78rem', color: accentGold, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 10, ...ost(`sermons.${idx}.series`) }}
                  >
                    {sermon.series}
                  </div>
                  <h4
                    data-field={`sermons.${idx}.title`}
                    data-ovkey={`sermons.${idx}.title`}
                    className="editable-element"
                    onClick={(e) => handleEdit(e, `sermons.${idx}.title`, `Título Prédica ${idx + 1}`, 'text', sermon.title)}
                    style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.45rem', color: '#FFFFFF', margin: '0 0 12px', lineHeight: 1.3, ...ost(`sermons.${idx}.title`) }}
                  >
                    {sermon.title}
                  </h4>
                  <div
                    data-field={`sermons.${idx}.speaker`}
                    data-ovkey={`sermons.${idx}.speaker`}
                    className="editable-element"
                    onClick={(e) => handleEdit(e, `sermons.${idx}.speaker`, `Predicador ${idx + 1}`, 'text', sermon.speaker)}
                    style={{ fontSize: '0.9rem', color: '#94A3B8', fontWeight: 500, ...ost(`sermons.${idx}.speaker`) }}
                  >
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
                  accentColor={accentGold}
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
                  accentColor={accentGold}
                  primaryBg={primaryBg}
                  font={activeFont}
                />,
                'Visítanos (Horarios Card)'
              )
            }
            return wrap(
              <section id="wp-plan-visit" style={{ width: '100%', margin: 0, padding: 0, background: '#07080D', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', alignItems: 'stretch' }}>
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
              autoPlay loop muted playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'brightness(0.7)' }}
            />
          ) : (
            <img
              src={planAVisit.image || 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1400&q=85&fit=crop'}
              alt="Visítanos este Fin de Semana"
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1400&q=85&fit=crop'
              }}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'brightness(0.7)' }}
            />
          )}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent 60%, #07080D 100%)', pointerEvents: 'none' }} />
        </div>

        <div style={{ padding: '100px 10%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', background: '#07080D', color: '#FFFFFF' }}>
          <div
            data-field="planAVisit.eyebrow"
            data-ovkey="planAVisit.eyebrow"
            className="editable-element"
            onClick={(e) => handleEdit(e, 'planAVisit.eyebrow', 'Etiqueta Horarios', 'text', planAVisit.eyebrow)}
            style={{ fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase', color: accentGold, marginBottom: 18, ...ost('planAVisit.eyebrow') }}
          >
            ✦ {planAVisit.eyebrow}
          </div>
          <h2
            data-field="planAVisit.title"
            data-ovkey="planAVisit.title"
            className="editable-element"
            onClick={(e) => handleEdit(e, 'planAVisit.title', 'Título Horarios', 'text', planAVisit.title)}
            style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2.8rem, 4.8vw, 4rem)', fontWeight: 800, color: '#FFFFFF', margin: '0 0 24px', lineHeight: 1.1, ...ost('planAVisit.title') }}
          >
            {planAVisit.title}
          </h2>
          <p
            data-field="planAVisit.subtitle"
            data-ovkey="planAVisit.subtitle"
            className="editable-element"
            onClick={(e) => handleEdit(e, 'planAVisit.subtitle', 'Descripción Horarios', 'textarea', planAVisit.subtitle)}
            style={{ fontSize: '1.15rem', lineHeight: 1.7, color: '#94A3B8', margin: '0 0 40px', maxWidth: 480, ...ost('planAVisit.subtitle') }}
          >
            {planAVisit.subtitle}
          </p>
          <a
            data-field="planAVisit.ctaText"
            data-ovkey="planAVisit.ctaText"
            href="#wp-contact"
            className="afiche3-btn-gold editable-element"
            onClick={(e) => handleNavClick(e, '#wp-contact', 'planAVisit.ctaText', 'Texto Botón Horarios', planAVisit.ctaText)}
            style={{ display: 'inline-block', padding: '18px 40px', borderRadius: 999, textDecoration: 'none', fontSize: '0.875rem', ...ost('planAVisit.ctaText') }}
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
                  accentColor={accentGold}
                  primaryBg={'#07080D'}
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
                  accentColor={accentGold}
                  primaryBg={'#07080D'}
                  font={activeFont}
                />,
                'Bienvenida a Casa (Split Tarjeta)'
              )
            }
            return wrap(
              <section id="wp-welcome" style={{ width: '100%', background: '#0D0F17', padding: '100px 8%', boxSizing: 'border-box', borderBottom: '1px solid rgba(196,163,90,0.15)' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
          <div data-field="welcome.label" data-ovkey="welcome.label" className="editable-element" onClick={(e) => handleEdit(e, 'welcome.label', 'Etiqueta Bienvenida', 'text', data.welcome?.label || '✦ BIENVENIDO A CASA ✦')} style={{ fontSize: '0.8rem', fontWeight: 800, color: accentGold, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 16, ...ost('welcome.label') }}>
            {data.welcome?.label || '✦ BIENVENIDO A CASA ✦'}
          </div>
          <h2 data-field="welcome.title" data-ovkey="welcome.title" className="editable-element" onClick={(e) => handleEdit(e, 'welcome.title', 'Título Bienvenida', 'text', data.welcome?.title || 'Una comunidad apasionada por Jesús y dedicada a amar a las personas.')} style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2.2rem, 4vw, 3.4rem)', color: '#FFFFFF', margin: '0 0 24px', lineHeight: 1.15, ...ost('welcome.title') }}>
            {data.welcome?.title || 'Una comunidad apasionada por Jesús y dedicada a amar a las personas.'}
          </h2>
          <p data-field="welcome.text" data-ovkey="welcome.text" className="editable-element" onClick={(e) => handleEdit(e, 'welcome.text', 'Mensaje Pastoral', 'textarea', data.welcome?.text || 'Sin importar de dónde vengas o dónde te encuentres en tu viaje espiritual, aquí hay un lugar para ti. Te invitamos a adorar, crecer y servir junto a nosotros.')} style={{ fontSize: '1.15rem', color: '#94A3B8', lineHeight: 1.7, margin: '0 0 36px', maxWidth: 800, marginLeft: 'auto', marginRight: 'auto', ...ost('welcome.text') }}>
            {data.welcome?.text || 'Sin importar de dónde vengas o dónde te encuentres en tu viaje espiritual, aquí hay un lugar para ti. Te invitamos a adorar, crecer y servir junto a nosotros.'}
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
            <a data-field="welcome.ctaText" data-ovkey="welcome.ctaText" href="#wp-plan-visit" className="afiche3-btn-gold editable-element" onClick={(e) => handleNavClick(e, '#wp-plan-visit', 'welcome.ctaText', 'Botón Primario Bienvenida', data.welcome?.ctaText || 'Conoce Nuestra Visión')} style={{ padding: '14px 32px', borderRadius: 999, textDecoration: 'none', fontSize: '0.85rem', ...ost('welcome.ctaText') }}>
              {data.welcome?.ctaText || 'Conoce Nuestra Visión'}
            </a>
            <a data-field="welcome.ctaSecondaryText" data-ovkey="welcome.ctaSecondaryText" href="#wp-prayer" className="afiche3-btn-outline-gold editable-element" onClick={(e) => handleNavClick(e, '#wp-prayer', 'welcome.ctaSecondaryText', 'Botón Secundario Bienvenida', data.welcome?.ctaSecondaryText || 'Pide Oración')} style={{ padding: '14px 32px', borderRadius: 999, textDecoration: 'none', fontSize: '0.85rem', ...ost('welcome.ctaSecondaryText') }}>
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
                  accentColor={accentGold}
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
                  accentColor={accentGold}
                  primaryBg={primaryBg}
                  font={activeFont}
                />,
                'Valores (Minimalista)'
              )
            }
            return wrap(
              <section id="wp-values" style={{ width: '100%', background: '#07080D', padding: '100px 8%', boxSizing: 'border-box', borderBottom: '1px solid rgba(196,163,90,0.15)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 60px' }}>
            <div
              data-field="values.eyebrow"
              data-ovkey="values.eyebrow"
              className="editable-element"
              onClick={(e) => handleEdit(e, 'values.eyebrow', 'Etiqueta Valores', 'text', data.values?.eyebrow || '✦ FUNDAMENTOS ✦')}
              style={{ fontSize: '0.8rem', fontWeight: 800, color: accentGold, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 12, ...ost('values.eyebrow') }}
            >
              {data.values?.eyebrow || '✦ FUNDAMENTOS ✦'}
            </div>
            <h2
              data-field="values.title"
              data-ovkey="values.title"
              className="editable-element"
              onClick={(e) => handleEdit(e, 'values.title', 'Título Valores', 'text', data.values?.title || 'Nuestros Valores Core')}
              style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', color: '#FFFFFF', margin: 0, ...ost('values.title') }}
            >
              {data.values?.title || 'Nuestros Valores Core'}
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 32 }}>
            {(data.values || [
              { icon: 'heart', title: 'Amor Incondicional', text: 'Recibimos a cada persona con gracia y calidez.' },
              { icon: 'users', title: 'Comunidad Auténtica', text: 'Crecemos juntos a través de grupos de amistad.' },
              { icon: 'book', title: 'Verdad Bíblica', text: 'Enseñanza práctica basada en la Palabra de Dios.' },
              { icon: 'globe', title: 'Impacto y Misión', text: 'Servimos con generosidad a nuestra ciudad.' }
            ]).map((val, idx) => (
              <div key={idx} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(196,163,90,0.2)', borderRadius: 16, padding: '32px 24px' }}>
                <div style={{ color: accentGold, fontSize: '1.8rem', marginBottom: 16 }}>✦</div>
                <h3 data-field={`values.${idx}.title`} data-ovkey={`values.${idx}.title`} className="editable-element" onClick={(e) => handleEdit(e, `values.${idx}.title`, `Título Valor ${idx+1}`, 'text', val.title)} style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.35rem', color: '#FFFFFF', margin: '0 0 12px', ...ost(`values.${idx}.title`) }}>
                  {val.title}
                </h3>
                <p data-field={`values.${idx}.text`} data-ovkey={`values.${idx}.text`} className="editable-element" onClick={(e) => handleEdit(e, `values.${idx}.text`, `Texto Valor ${idx+1}`, 'textarea', val.text)} style={{ fontSize: '0.95rem', color: '#94A3B8', lineHeight: 1.6, margin: 0, ...ost(`values.${idx}.text`) }}>
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
                  accentColor={accentGold}
                  primaryBg={'#07080D'}
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
                  accentColor={accentGold}
                  primaryBg={'#07080D'}
                  font={activeFont}
                />,
                'Ministerios (Mosaico)'
              )
            }
            return wrap(
              <section id="wp-ministries" style={{ width: '100%', background: '#0B0D14', padding: '100px 8%', boxSizing: 'border-box', borderBottom: '1px solid rgba(196,163,90,0.15)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 60px' }}>
            <div
              data-field="ministries.eyebrow"
              data-ovkey="ministries.eyebrow"
              className="editable-element"
              onClick={(e) => handleEdit(e, 'ministries.eyebrow', 'Etiqueta Ministerios', 'text', data.ministries?.eyebrow || '✦ PARA TODA LA FAMILIA ✦')}
              style={{ fontSize: '0.8rem', fontWeight: 800, color: accentGold, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 12, ...ost('ministries.eyebrow') }}
            >
              {data.ministries?.eyebrow || '✦ PARA TODA LA FAMILIA ✦'}
            </div>
            <h2 data-field="ministriesTitle" data-ovkey="ministriesTitle" className="editable-element" onClick={(e) => handleEdit(e, 'ministriesTitle', 'Título Ministerios', 'text', data.ministriesTitle || 'Nuestros Ministerios')} style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', color: '#FFFFFF', margin: '0 0 16px', ...ost('ministriesTitle') }}>
              {data.ministriesTitle || 'Nuestros Ministerios'}
            </h2>
            <p data-field="ministriesSubtitle" data-ovkey="ministriesSubtitle" className="editable-element" onClick={(e) => handleEdit(e, 'ministriesSubtitle', 'Subtítulo Ministerios', 'textarea', data.ministriesSubtitle || 'Espacios diseñados para cada etapa de la vida.')} style={{ fontSize: '1.05rem', color: '#94A3B8', margin: 0, ...ost('ministriesSubtitle') }}>
              {data.ministriesSubtitle || 'Espacios diseñados para cada etapa de la vida.'}
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32 }}>
            {(data.ministries || [
              { name: 'KidZone (Niños)', ageRange: '0 a 12 años', description: 'Espacio seguro y divertido para los más pequeños.', ctaText: 'Conoce KidZone', image: 'https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?w=800&q=85&fit=crop' },
              { name: 'Jóvenes & Estudiantes', ageRange: '13 a 25 años', description: 'Comunidad vibrante con reuniones semanales y música en vivo.', ctaText: 'Únete a Jóvenes', image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=85&fit=crop' },
              { name: 'Matrimonios & Familias', ageRange: 'Todas las edades', description: 'Talleres y actividades para fortalecer el hogar.', ctaText: 'Saber Más', image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&q=85&fit=crop' }
            ]).map((m, idx) => (
              <div key={idx} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(196,163,90,0.2)', borderRadius: 16, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div data-field={`ministries.${idx}.image`} data-ovkey={`ministries.${idx}.image`} className="editable-element" onClick={(e) => handleEdit(e, `ministries.${idx}.image`, `Foto Ministerio ${idx+1}`, 'image', m.image)} style={{ height: 200, position: 'relative', overflow: 'hidden', ...ost(`ministries.${idx}.image`) }}>
                  {isVideoUrl(m.image) ? (
                    <video src={m.image} autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <img src={m.image || 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&q=85&fit=crop'} alt={m.name || m.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  )}
                </div>
                <div style={{ padding: 24, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div data-field={`ministries.${idx}.ageRange`} data-ovkey={`ministries.${idx}.ageRange`} className="editable-element" onClick={(e) => handleEdit(e, `ministries.${idx}.ageRange`, `Edad Ministerio ${idx+1}`, 'text', m.ageRange)} style={{ fontSize: '0.78rem', color: accentGold, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8, ...ost(`ministries.${idx}.ageRange`) }}>
                      {m.ageRange || 'Comunidad'}
                    </div>
                    <h3 data-field={`ministries.${idx}.name`} data-ovkey={`ministries.${idx}.name`} className="editable-element" onClick={(e) => handleEdit(e, `ministries.${idx}.name`, `Nombre Ministerio ${idx+1}`, 'text', m.name || m.title)} style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.4rem', color: '#FFFFFF', margin: '0 0 10px', ...ost(`ministries.${idx}.name`) }}>
                      {m.name || m.title}
                    </h3>
                    <p data-field={`ministries.${idx}.description`} data-ovkey={`ministries.${idx}.description`} className="editable-element" onClick={(e) => handleEdit(e, `ministries.${idx}.description`, `Descripción Ministerio ${idx+1}`, 'textarea', m.description || m.desc)} style={{ fontSize: '0.92rem', color: '#94A3B8', lineHeight: 1.6, margin: '0 0 20px', ...ost(`ministries.${idx}.description`) }}>
                      {m.description || m.desc}
                    </p>
                  </div>
                  {m.ctaText && (
                    <a data-field={`ministries.${idx}.ctaText`} data-ovkey={`ministries.${idx}.ctaText`} href="#wp-contact" className="afiche3-btn-outline-gold editable-element" onClick={(e) => handleNavClick(e, '#wp-contact', `ministries.${idx}.ctaText`, `Botón Ministerio ${idx+1}`, m.ctaText)} style={{ display: 'inline-block', textAlign: 'center', padding: '10px 20px', borderRadius: 999, textDecoration: 'none', fontSize: '0.8rem', ...ost(`ministries.${idx}.ctaText`) }}>
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
                  accentColor={accentGold}
                  primaryBg={'#07080D'}
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
                  accentColor={accentGold}
                  primaryBg={'#07080D'}
                  font={activeFont}
                />,
                'Próximos Pasos (3 Pasos)'
              )
            }
            return wrap(
              <section id="wp-next-steps" style={{ width: '100%', background: '#07080D', padding: '100px 8%', boxSizing: 'border-box', borderBottom: '1px solid rgba(196,163,90,0.15)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 60px' }}>
            <div
              data-field="nextSteps.eyebrow"
              data-ovkey="nextSteps.eyebrow"
              className="editable-element"
              onClick={(e) => handleEdit(e, 'nextSteps.eyebrow', 'Etiqueta Próximos Pasos', 'text', data.nextSteps?.eyebrow || '✦ CRECIMIENTO ESPIRITUAL ✦')}
              style={{ fontSize: '0.8rem', fontWeight: 800, color: accentGold, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 12, ...ost('nextSteps.eyebrow') }}
            >
              {data.nextSteps?.eyebrow || '✦ CRECIMIENTO ESPIRITUAL ✦'}
            </div>
            <h2 data-field="nextSteps.title" data-ovkey="nextSteps.title" className="editable-element" onClick={(e) => handleEdit(e, 'nextSteps.title', 'Título Próximos Pasos', 'text', data.nextSteps?.title || 'Tus Próximos Pasos en la Fe')} style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', color: '#FFFFFF', margin: '0 0 16px', ...ost('nextSteps.title') }}>
              {data.nextSteps?.title || 'Tus Próximos Pasos en la Fe'}
            </h2>
            <p data-field="nextSteps.subtitle" data-ovkey="nextSteps.subtitle" className="editable-element" onClick={(e) => handleEdit(e, 'nextSteps.subtitle', 'Subtítulo Próximos Pasos', 'textarea', data.nextSteps?.subtitle || 'Te acompañamos en cada etapa de tu crecimiento espiritual.')} style={{ fontSize: '1.05rem', color: '#94A3B8', margin: 0, ...ost('nextSteps.subtitle') }}>
              {data.nextSteps?.subtitle || 'Te acompañamos en cada etapa de tu crecimiento espiritual.'}
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32 }}>
            {(data.nextSteps?.steps || [
              { title: '1. Creer & Conocer a Jesús', description: 'Descubre el amor de Dios y su propósito para tu vida.' },
              { title: '2. Conectar en Comunidad', description: 'Participa en nuestros grupos semanales de amistad y oración.' },
              { title: '3. Servir y Marcar la Diferencia', description: 'Bendice a otros uniéndote a un equipo de voluntarios.' }
            ]).map((st, idx) => (
              <div key={idx} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(196,163,90,0.2)', borderRadius: 16, padding: 32 }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: accentGold, color: primaryBg, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', marginBottom: 20 }}>
                  {idx + 1}
                </div>
                <h3 data-field={`nextSteps.steps.${idx}.title`} data-ovkey={`nextSteps.steps.${idx}.title`} className="editable-element" onClick={(e) => handleEdit(e, `nextSteps.steps.${idx}.title`, `Paso ${idx+1} Título`, 'text', st.title)} style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.3rem', color: '#FFFFFF', margin: '0 0 12px', ...ost(`nextSteps.steps.${idx}.title`) }}>
                  {st.title}
                </h3>
                <p data-field={`nextSteps.steps.${idx}.description`} data-ovkey={`nextSteps.steps.${idx}.description`} className="editable-element" onClick={(e) => handleEdit(e, `nextSteps.steps.${idx}.description`, `Paso ${idx+1} Descripción`, 'textarea', st.description)} style={{ fontSize: '0.95rem', color: '#94A3B8', lineHeight: 1.6, margin: 0, ...ost(`nextSteps.steps.${idx}.description`) }}>
                  {st.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>,
              'Próximos Pasos'
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
                  accentColor={accentGold}
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
                  accentColor={accentGold}
                  primaryBg={primaryBg}
                  font={activeFont}
                />,
                'Eventos (Tarjetas)'
              )
            }
            return wrap(
              <section id="wp-events" style={{ width: '100%', background: '#05070C', padding: '100px 6%', boxSizing: 'border-box', borderTop: '1px solid rgba(196,163,90,0.08)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48, flexWrap: 'wrap', gap: 20 }}>
            <div>
              <div
                data-field="events.eyebrow" data-ovkey="events.eyebrow"
                className="editable-element"
                onClick={(e) => handleEdit(e, 'events.eyebrow', 'Etiqueta Sección Eventos', 'text', data.events?.eyebrow || 'PRÓXIMOS EVENTOS')}
                style={{ fontSize: '0.75rem', fontWeight: 800, color: accentGold, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 12, ...ost('events.eyebrow') }}
              >
                {data.events?.eyebrow || 'PRÓXIMOS EVENTOS'}
              </div>
              <h2
                data-field="events.title" data-ovkey="events.title"
                className="editable-element"
                onClick={(e) => handleEdit(e, 'events.title', 'Título Sección Eventos', 'text', data.events?.title || 'Lo Que Viene')}
                style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 900, color: '#FFFFFF', margin: 0, letterSpacing: '-0.03em', lineHeight: 1.1, fontFamily: 'Playfair Display, serif', ...ost('events.title') }}
              >
                {data.events?.title || 'Lo Que Viene'}
              </h2>
            </div>
            <a
              data-field="events.allLinkText" data-ovkey="events.allLinkText"
              className="editable-element"
              href={data.events?.allLink || '#wp-contact'}
              onClick={(e) => handleEdit(e, 'events.allLinkText', 'Texto Enlace Eventos', 'text', data.events?.allLinkText || 'Ver todos los eventos →')}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: accentGold, fontWeight: 700, fontSize: '0.85rem', textDecoration: 'none', opacity: 0.8, whiteSpace: 'nowrap', ...ost('events.allLinkText') }}
            >
              {data.events?.allLinkText || 'Ver todos los eventos →'}
            </a>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            {(() => {
              const evData = data.events || {}
              const rawList = Array.isArray(evData) ? evData : (Array.isArray(evData.items) ? evData.items : [
                { image: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&q=85&fit=crop', day: '18', month: 'OCT', dateDay: '18', dateMonth: 'OCT', title: 'Noche de Adoración', time: '7:00 PM', location: 'Auditorio Principal', description: 'Una noche especial de adoración colectiva. Ven con tu familia.', desc: 'Una noche especial de adoración colectiva. Ven con tu familia.', link: '#wp-contact', btnText: 'Inscribirme →' },
                { image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=85&fit=crop', day: '25', month: 'OCT', dateDay: '25', dateMonth: 'OCT', title: 'Conferencia de Familias', time: '9:00 AM', location: 'Sede Norte', description: 'Herramientas prácticas para fortalecer el hogar y el matrimonio.', desc: 'Herramientas prácticas para fortalecer el hogar y el matrimonio.', link: '#wp-contact', btnText: 'Inscribirme →' },
                { image: 'https://images.unsplash.com/photo-1510936111840-65e151ad71bb?w=800&q=85&fit=crop', day: '1', month: 'NOV', dateDay: '01', dateMonth: 'NOV', title: 'Retiro Juvenil', time: '8:00 AM', location: 'Campo Retiro El Pedregal', description: 'Un fin de semana de conexión, aventura y crecimiento espiritual.', desc: 'Un fin de semana de conexión, aventura y crecimiento espiritual.', link: '#wp-contact', btnText: 'Inscribirme →' },
              ])
              const evList = (rawList || []).filter(Boolean)
              const evPrefix = Array.isArray(evData) ? 'events' : 'events.items'
              return evList.map((ev, idx) => (
                <div key={idx} style={{ background: '#0D0F16', border: '1px solid rgba(196,163,90,0.12)', borderRadius: 20, overflow: 'hidden', transition: 'border-color 0.2s, transform 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = `rgba(196,163,90,0.35)`; e.currentTarget.style.transform = 'translateY(-4px)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(196,163,90,0.12)'; e.currentTarget.style.transform = 'translateY(0)' }}
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
                      <img src={ev?.image || 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&q=85&fit=crop'} alt={ev?.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => { e.currentTarget.style.display='none' }} />
                    )}
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 40%, rgba(13,15,22,0.9) 100%)', pointerEvents: 'none' }} />
                    <div style={{ position: 'absolute', top: 16, left: 16, background: accentGold, color: '#05070C', borderRadius: 10, padding: '8px 14px', textAlign: 'center', minWidth: 52 }}>
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
                        style={{ fontWeight: 800, fontSize: '0.62rem', letterSpacing: '0.12em', ...ost(`${evPrefix}.${idx}.month`) }}
                      >
                        {ev.month || ev.dateMonth}
                      </div>
                    </div>
                  </div>
                  <div style={{ padding: '20px 22px 24px' }}>
                    <h3
                      data-field={`${evPrefix}.${idx}.title`} data-ovkey={`${evPrefix}.${idx}.title`}
                      className="editable-element"
                      onClick={(e) => handleEdit(e, `${evPrefix}.${idx}.title`, `Título Evento ${idx + 1}`, 'text', ev.title)}
                      style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.2rem', fontWeight: 800, color: '#FFFFFF', margin: '0 0 8px', letterSpacing: '-0.01em', ...ost(`${evPrefix}.${idx}.title`) }}
                    >
                      {ev.title}
                    </h3>
                    <div style={{ display: 'flex', gap: 16, marginBottom: 12, flexWrap: 'wrap' }}>
                      <span
                        data-field={`${evPrefix}.${idx}.time`} data-ovkey={`${evPrefix}.${idx}.time`}
                        className="editable-element"
                        onClick={(e) => handleEdit(e, `${evPrefix}.${idx}.time`, `Horario Evento ${idx + 1}`, 'text', ev.time)}
                        style={{ fontSize: '0.78rem', color: accentGold, fontWeight: 700, ...ost(`${evPrefix}.${idx}.time`) }}
                      >
                        ⏰ {ev.time}
                      </span>
                      <span
                        data-field={`${evPrefix}.${idx}.location`} data-ovkey={`${evPrefix}.${idx}.location`}
                        className="editable-element"
                        onClick={(e) => handleEdit(e, `${evPrefix}.${idx}.location`, `Ubicación Evento ${idx + 1}`, 'text', ev.location)}
                        style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', fontWeight: 500, ...ost(`${evPrefix}.${idx}.location`) }}
                      >
                        📍 {ev.location}
                      </span>
                    </div>
                    <p
                      data-field={`${evPrefix}.${idx}.description`} data-ovkey={`${evPrefix}.${idx}.description`}
                      className="editable-element"
                      onClick={(e) => handleEdit(e, `${evPrefix}.${idx}.description`, `Descripción Evento ${idx + 1}`, 'textarea', ev.description || ev.desc)}
                      style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.65, margin: '0 0 18px', ...ost(`${evPrefix}.${idx}.description`) }}
                    >
                      {ev.description || ev.desc}
                    </p>
                    <a
                      data-field={`${evPrefix}.${idx}.btnText`} data-ovkey={`${evPrefix}.${idx}.btnText`}
                      href={ev.link || '#wp-contact'}
                      className="editable-element"
                      onClick={(e) => handleEdit(e, `${evPrefix}.${idx}.btnText`, `Botón Evento ${idx + 1}`, 'text', ev.btnText || 'Inscribirme →')}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '9px 20px', borderRadius: 999, border: `1px solid rgba(196,163,90,0.4)`, color: accentGold, fontSize: '0.8rem', fontWeight: 700, textDecoration: 'none', transition: 'all 0.2s', ...ost(`${evPrefix}.${idx}.btnText`) }}
                      onMouseEnter={e => { e.currentTarget.style.background = accentGold; e.currentTarget.style.color = '#05070C' }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = accentGold }}
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
          case 'donation':
            return wrap(
              <section id="wp-donations" style={{ width: '100%', background: '#040508', padding: '100px 8%', boxSizing: 'border-box' }}>
        <div style={{
          maxWidth: 860, margin: '0 auto', textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(196,163,90,0.08) 0%, rgba(196,163,90,0.03) 100%)',
          border: '1px solid rgba(196,163,90,0.2)',
          borderRadius: 28, padding: '60px 40px',
          boxShadow: '0 0 80px rgba(196,163,90,0.05)',
        }}>
          <div
            data-field="donation.eyebrow" data-ovkey="donation.eyebrow"
            className="editable-element"
            onClick={(e) => handleEdit(e, 'donation.eyebrow', 'Etiqueta Donaciones', 'text', data.donation?.eyebrow || '✦ GENEROSIDAD ✦')}
            style={{ fontSize: '0.78rem', fontWeight: 800, color: accentGold, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 16, ...ost('donation.eyebrow') }}
          >
            {data.donation?.eyebrow || '✦ GENEROSIDAD ✦'}
          </div>
          <h2
            data-field="donation.title" data-ovkey="donation.title"
            className="editable-element"
            onClick={(e) => handleEdit(e, 'donation.title', 'Título Donaciones', 'text', data.donation?.title || 'Tu Generosidad Transforma Vidas')}
            style={{ fontSize: 'clamp(2rem, 3.8vw, 3.2rem)', fontWeight: 900, color: '#FFFFFF', margin: '0 0 20px', letterSpacing: '-0.03em', lineHeight: 1.1, fontFamily: 'Playfair Display, serif', ...ost('donation.title') }}
          >
            {data.donation?.title || 'Tu Generosidad Transforma Vidas'}
          </h2>
          <p
            data-field="donation.subtitle" data-ovkey="donation.subtitle"
            className="editable-element"
            onClick={(e) => handleEdit(e, 'donation.subtitle', 'Descripción Donaciones', 'textarea', data.donation?.subtitle || 'Cada ofrenda nos permite seguir extendiendo el mensaje de esperanza en nuestra ciudad y más allá.')}
            style={{ fontSize: '1.05rem', color: '#94A3B8', lineHeight: 1.75, margin: '0 0 36px', maxWidth: 600, marginLeft: 'auto', marginRight: 'auto', ...ost('donation.subtitle') }}
          >
            {data.donation?.subtitle || 'Cada ofrenda nos permite seguir extendiendo el mensaje de esperanza en nuestra ciudad y más allá.'}
          </p>
          <a
            data-field="donation.ctaText" data-ovkey="donation.ctaText"
            href={data.donation?.ctaLink || '#wp-contact'}
            target={(data.donation?.ctaLink || '').startsWith('http') ? '_blank' : undefined}
            rel={(data.donation?.ctaLink || '').startsWith('http') ? 'noopener noreferrer' : undefined}
            className="editable-element"
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
              background: accentGold,
              color: '#040508', fontWeight: 900, fontSize: '0.9rem',
              textDecoration: 'none',
              boxShadow: `0 8px 32px rgba(196,163,90,0.3)`,
              transition: 'all 0.2s ease',
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
              style={{ marginTop: 24, fontSize: '0.8rem', color: '#64748B', ...ost('donation.note') }}
            >
              🔒 {data.donation.note}
            </div>
          )}
        </div>
      </section>,
              'Ofrendas / Donaciones'
            )
          case 'prayerRequest':
            return wrap(
              <section id="wp-prayer" style={{ width: '100%', background: '#07080D', padding: '100px 8%', boxSizing: 'border-box', borderBottom: '1px solid rgba(196,163,90,0.15)' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <div
            data-field="prayerRequest.eyebrow"
            data-ovkey="prayerRequest.eyebrow"
            className="editable-element"
            onClick={(e) => handleEdit(e, 'prayerRequest.eyebrow', 'Etiqueta Oración', 'text', data.prayerRequest?.eyebrow || '✦ ESTAMOS PARA TI ✦')}
            style={{ fontSize: '0.8rem', fontWeight: 800, color: accentGold, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 14, ...ost('prayerRequest.eyebrow') }}
          >
            {data.prayerRequest?.eyebrow || '✦ ESTAMOS PARA TI ✦'}
          </div>
          <h2 data-field="prayerRequest.title" data-ovkey="prayerRequest.title" className="editable-element" onClick={(e) => handleEdit(e, 'prayerRequest.title', 'Título Petición de Oración', 'text', data.prayerRequest?.title || '¿Podemos Orar por Ti?')} style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 3.8vw, 3.2rem)', color: '#FFFFFF', margin: '0 0 16px', ...ost('prayerRequest.title') }}>
            {data.prayerRequest?.title || '¿Podemos Orar por Ti?'}
          </h2>
          <p data-field="prayerRequest.subtitle" data-ovkey="prayerRequest.subtitle" className="editable-element" onClick={(e) => handleEdit(e, 'prayerRequest.subtitle', 'Subtítulo Petición de Oración', 'textarea', data.prayerRequest?.subtitle || 'Nuestro equipo pastoral y de intercesión ora cada semana por cada necesidad planteada. Déjanos saber cómo podemos apoyarte.')} style={{ fontSize: '1.05rem', color: '#94A3B8', lineHeight: 1.7, margin: '0 0 32px', ...ost('prayerRequest.subtitle') }}>
            {data.prayerRequest?.subtitle || 'Nuestro equipo pastoral y de intercesión ora cada semana por cada necesidad planteada. Déjanos saber cómo podemos apoyarte.'}
          </p>
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(196,163,90,0.2)', borderRadius: 16, padding: 32, textAlign: 'left' }}>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: '0.8rem', color: '#DFCA88', fontWeight: 700, marginBottom: 6 }}>Tu Nombre</label>
              <input type="text" placeholder="Ej: María González" style={{ width: '100%', padding: '12px 16px', borderRadius: 8, background: '#0B0D14', border: '1px solid rgba(196,163,90,0.3)', color: '#FFF', fontSize: '0.9rem' }} />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: '0.8rem', color: '#DFCA88', fontWeight: 700, marginBottom: 6 }}>Tu Petición o Necesidad</label>
              <textarea rows={4} placeholder="Escribe tu motivo de oración aquí..." style={{ width: '100%', padding: '12px 16px', borderRadius: 8, background: '#0B0D14', border: '1px solid rgba(196,163,90,0.3)', color: '#FFF', fontSize: '0.9rem', resize: 'vertical' }} />
            </div>
            <button data-field="prayerRequest.ctaText" data-ovkey="prayerRequest.ctaText" className="afiche3-btn-gold editable-element" onClick={(e) => handleEdit(e, 'prayerRequest.ctaText', 'Texto Botón Oración', 'text', data.prayerRequest?.ctaText || 'Enviar Petición de Oración')} style={{ width: '100%', padding: '16px', borderRadius: 999, border: 'none', cursor: 'pointer', fontSize: '0.9rem', ...ost('prayerRequest.ctaText') }}>
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
                  accentColor={accentGold}
                  primaryBg={'#07080D'}
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
                  accentColor={accentGold}
                  primaryBg={'#07080D'}
                  font={activeFont}
                />,
                'Sobre Nosotros (Split Comunidad)'
              )
            }
            return wrap(
              <section id="wp-about" style={{ width: '100%', background: '#0B0D14', padding: '100px 8%', boxSizing: 'border-box', borderBottom: '1px solid rgba(196,163,90,0.15)' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 60, alignItems: 'center' }}>
            <div>
              <div
                data-field="about.eyebrow"
                data-ovkey="about.eyebrow"
                className="editable-element"
                onClick={(e) => handleEdit(e, 'about.eyebrow', 'Etiqueta Sobre Nosotros', 'text', data.about?.eyebrow || '✦ QUIÉNES SOMOS ✦')}
                style={{ fontSize: '0.8rem', fontWeight: 800, color: accentGold, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 12, ...ost('about.eyebrow') }}
              >
                {data.about?.eyebrow || '✦ QUIÉNES SOMOS ✦'}
              </div>
              <h2 data-field="about.title" data-ovkey="about.title" className="editable-element" onClick={(e) => handleEdit(e, 'about.title', 'Título Sobre Nosotros', 'text', data.about?.title || 'Nuestra Historia')} style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', color: '#FFFFFF', margin: '0 0 20px', ...ost('about.title') }}>
                {data.about?.title || 'Nuestra Historia'}
              </h2>
              <p data-field="about.text" data-ovkey="about.text" className="editable-element" onClick={(e) => handleEdit(e, 'about.text', 'Texto Sobre Nosotros', 'textarea', data.about?.text || '')} style={{ fontSize: '1.05rem', color: '#94A3B8', lineHeight: 1.7, margin: 0, ...ost('about.text') }}>
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
              <footer id="wp-contact" style={{ width: '100%', background: '#040508', color: '#FFFFFF', padding: '100px 6% 40px', boxSizing: 'border-box', borderTop: '1px solid rgba(196,163,90,0.15)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 48, marginBottom: 60 }}>
          <div>
            {logoImage ? (
              <img
                data-field="logoImage"
                data-ovkey="logoImage"
                src={logoImage}
                alt={businessName}
                className="editable-element"
                onClick={(e) => handleEdit(e, 'logoImage', 'Imagen de Logo Footer', 'image', logoImage)}
                style={{ maxHeight: 44, maxWidth: 180, objectFit: 'contain', marginBottom: 16, cursor: editMode ? 'pointer' : 'default', ...ost('logoImage') }}
              />
            ) : (
              <h3 data-field="businessName" data-ovkey="businessName" className="editable-element" onClick={(e) => handleEdit(e, 'businessName', 'Nombre Iglesia Footer', 'text', businessName)} style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.8rem', fontWeight: 900, margin: '0 0 16px', color: '#FFFFFF', ...ost('businessName') }}>{businessName}</h3>
            )}
            <p
              data-field="contact.scheduleSummary"
              data-ovkey="contact.scheduleSummary"
              className="editable-element"
              onClick={(e) => handleEdit(e, 'contact.scheduleSummary', 'Resumen de Cultos', 'text', data.contact?.scheduleSummary || 'Reuniones: Domingos 10:30 a.m. | Oración: Jueves 7:00 p.m.')}
              style={{ color: '#94A3B8', fontSize: '0.95rem', lineHeight: 1.7, maxWidth: 360, margin: '0 0 28px', ...ost('contact.scheduleSummary') }}
            >
              {data.contact?.scheduleSummary || 'Reuniones: Domingos 10:30 a.m. | Oración: Jueves 7:00 p.m.'}
            </p>
          </div>
          <div>
            <div
              data-field="contact.servicesTitle"
              data-ovkey="contact.servicesTitle"
              className="editable-element"
              onClick={(e) => handleEdit(e, 'contact.servicesTitle', 'Título Servicios Footer', 'text', data.contact?.servicesTitle || 'SERVICIOS')}
              style={{ color: accentGold, fontWeight: 800, fontSize: '0.85rem', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 16, ...ost('contact.servicesTitle') }}
            >
              {data.contact?.servicesTitle || 'SERVICIOS'}
            </div>
            <p
              data-field="contact.scheduleDetails"
              data-ovkey="contact.scheduleDetails"
              className="editable-element"
              onClick={(e) => handleEdit(e, 'contact.scheduleDetails', 'Detalle de Horarios', 'textarea', data.contact?.scheduleDetails || '• Domingos: 10:30 AM (Servicio Central)\n• Jueves: 7:00 PM (Reunión de Oración)')}
              style={{ color: '#E2E8F0', fontSize: '0.95rem', lineHeight: 1.8, margin: 0, whiteSpace: 'pre-line', ...ost('contact.scheduleDetails') }}
            >
              {data.contact?.scheduleDetails || '• Domingos: 10:30 AM (Servicio Central)\n• Jueves: 7:00 PM (Reunión de Oración)'}
            </p>
          </div>
          <div>
            <div
              data-field="contact.contactTitle"
              data-ovkey="contact.contactTitle"
              className="editable-element"
              onClick={(e) => handleEdit(e, 'contact.contactTitle', 'Título Contacto Footer', 'text', data.contact?.contactTitle || 'CONTACTO')}
              style={{ color: accentGold, fontWeight: 800, fontSize: '0.85rem', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 16, ...ost('contact.contactTitle') }}
            >
              {data.contact?.contactTitle || 'CONTACTO'}
            </div>
            <p style={{ color: '#E2E8F0', fontSize: '0.95rem', lineHeight: 1.8, margin: 0 }}>
              📍 <span data-field="contact.address" data-ovkey="contact.address" className="editable-element" onClick={(e) => handleEdit(e, 'contact.address', 'Dirección de Contacto', 'text', data.contact?.address || 'Sede Principal')} style={ost('contact.address')}>{data.contact?.address || 'Sede Principal'}</span><br />
              📞 <span data-field="contact.phone" data-ovkey="contact.phone" className="editable-element" onClick={(e) => handleEdit(e, 'contact.phone', 'Teléfono de Contacto', 'text', data.contact?.phone || '+1 (555) 123-4567')} style={ost('contact.phone')}>{data.contact?.phone || '+1 (555) 123-4567'}</span>
            </p>
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(196,163,90,0.15)', paddingTop: 28, textAlign: 'center', color: '#64748B', fontSize: '0.85rem' }}>
          © {new Date().getFullYear()} {businessName}. Todos los derechos reservados.
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
