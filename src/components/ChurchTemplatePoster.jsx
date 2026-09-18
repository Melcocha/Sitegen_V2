import React from 'react'
import TemplateDragHandles from './TemplateDragHandles'

export default function ChurchTemplatePoster({ data = {}, editMode = false, activeField, onElementClick, onQuickUpdate, onQuickUpdateBatch, device = 'desktop' }) {
  const isMobileDevice = device === 'mobile'
  const isTabletDevice = device === 'tablet'
  const rootClassName = `poster-template-root ${isMobileDevice ? 'is-mobile-device' : ''} ${isTabletDevice ? 'is-tablet-device' : ''}`.trim()

  const businessName = data.businessName || 'Gateway & Vida'
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
    ...(isActive(k) ? {
      position: 'relative',
    } : {}),
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

  const rawHero = data.hero || {}
  const hero = {
    eyebrow: rawHero.eyebrow || '✦ DOMINGOS 10:30 A.M. & MIÉRCOLES 7:00 P.M.',
    headlinePrefix: rawHero.headlinePrefix || 'Encuentra a ',
    headlineKeyword: rawHero.headlineKeyword || 'Dios',
    headlineSuffix: rawHero.headlineSuffix || ' como nunca antes',
    subheadline: rawHero.subheadline || 'En nuestra casa creemos que hay un lugar para ti: para encontrarte con Dios, conectar con personas reales y vivir con propósito eterno.',
    ctaText: rawHero.ctaText || 'PLANIFICA TU VISITA',
    ctaLink: '#wp-plan-visit',
    ctaSecondary: rawHero.ctaSecondary || 'INVOLÚCRATE',
    ctaSecondaryLink: '#wp-contact',
    bgImage: data.heroImage || rawHero.bgImage || 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1800&q=85&fit=crop'
  }

  const rawMission = data.missionBlock || {}
  const missionBlock = {
    title: rawMission.title || 'Buscando a Dios Juntos',
    text1: rawMission.text1 || 'En nuestra casa creemos firmemente que buscar a Dios es la base fundamental de un caminar espiritual lleno de vida, gozo y propósito.',
    text2: rawMission.text2 || 'Te animamos a acompañarnos mientras profundizamos en la Palabra, nos sumergimos en alabanza genuina y buscamos la presencia de Dios a través de la oración.',
    text3: rawMission.text3 || 'Juntos nos embarcamos en una experiencia transformadora conociendo y viviendo el poder de nuestro Padre Celestial.',
    ctaText: rawMission.ctaText || 'SOBRE NOSOTROS',
    ctaLink: '#wp-plan-visit'
  }

  const rawPlan = data.planAVisit || {}
  const planAVisit = {
    eyebrow: rawPlan.eyebrow || '10:30 a.m. los Domingos',
    title: rawPlan.title || 'Planifica tu Visita',
    subtitle: rawPlan.subtitle || '¡Acompáñanos en persona este fin de semana! Nos encantará recibirte a ti y a tu familia. Encuentra horarios, dirección y todo lo necesario para tu primera visita haciendo clic abajo.',
    ctaText: rawPlan.ctaText || 'PLANIFICA TU VISITA',
    ctaLink: '#wp-contact',
    image: rawPlan.image || 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1200&q=85&fit=crop'
  }

  const rawCols = data.nucleusColumns || {}
  const nucleusColumns = {
    col1: {
      eyebrow: 'Conoce a Nuestro Equipo',
      title: 'Pastores & Equipo',
      text: 'Nuestro dedicado equipo de pastores y líderes está aquí para brindarte apoyo espiritual, consejería y recursos para fortalecer tu camino de fe.',
      image: 'https://images.unsplash.com/photo-1477281765962-ef34e8bb0967?w=1000&q=85&fit=crop',
      ctaText: 'NUESTRO EQUIPO',
      ctaLink: '#wp-contact',
      ...(rawCols.col1 || {})
    },
    col2: {
      eyebrow: 'Nuestro Calendario',
      title: 'Próximos Eventos & Actividades',
      text: 'Descubre los eventos de este mes para enterarte de lo que está sucediendo y cómo puedes participar. Explora la lista completa de próximos ministerios y reuniones.',
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1000&q=85&fit=crop',
      ctaText: 'NUESTRO CALENDARIO',
      ctaLink: '#wp-contact',
      ...(rawCols.col2 || {})
    }
  }

  const rawContact = data.contact || {}
  const contact = {
    sectionTitle: businessName,
    email: rawContact.email || 'info@tu-iglesia.org',
    phone: rawContact.phone || '+1 (555) 123-4567',
    address: rawContact.address || 'Sede Principal de la Iglesia',
    ctaPrimary: rawContact.ctaPrimary || 'ENVIAR MENSAJE',
    ctaSecondary: rawContact.ctaSecondary || 'DA TU SIGUIENTE PASO',
    ...rawContact
  }

  const meetingTimes = (Array.isArray(rawContact.meetingTimes) && rawContact.meetingTimes.length > 0)
    ? rawContact.meetingTimes
    : (Array.isArray(data.serviceTimes) && data.serviceTimes.length > 0)
      ? data.serviceTimes
      : [
          'Reuniones: Domingos 10:30 a.m.',
          'Reunión de Oración: Jueves 7:00 p.m.'
        ]

  const handleEdit = (e, fieldKey, fieldLabel, fieldType = 'text', currentVal = '') => {
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
        y: (r.bottom ? r.bottom + 8 : e.clientY)
      })
    }
  }

  const handleNavClick = (e, targetHash, fieldKey, fieldLabel, currentVal) => {
    if (editMode) {
      e.preventDefault()
      e.stopPropagation()
      handleEdit(e, fieldKey, fieldLabel, 'text', currentVal)
      return
    }
    if (targetHash && targetHash.startsWith('#')) {
      const el = document.querySelector(targetHash)
      if (el) {
        e.preventDefault()
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  const activeFont = data.font || 'Outfit'
  const accentIndigo = data.accentColor || '#000000'

  return (
    <div className={rootClassName} style={{ position: 'relative', containerType: 'inline-size', fontFamily: `'${activeFont}', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`, color: '#000000', background: '#FFFFFF', minHeight: '100vh', width: '100%', overflowX: 'hidden' }}>
      <link rel="stylesheet" href={`https://fonts.googleapis.com/css2?family=${encodeURIComponent(activeFont.replace(/'/g, ''))}:wght@400;500;600;700;800;900&display=swap`} />
      <style>{`
        .poster-template-root {
          container-type: inline-size;
        }
        .poster-template-root .editable-element {
          cursor: ${editMode ? 'pointer' : 'default'};
          transition: all 0.15s ease;
        }
        .poster-template-root .editable-element:hover {
          ${editMode ? 'outline: 2px dashed #000000; outline-offset: 4px;' : ''}
        }
        .poster-template-root .poster-card {
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .poster-template-root .poster-card:hover {
          transform: translateY(-2px);
        }
        .poster-template-root .poster-btn-primary {
          background: #000000;
          color: #FFFFFF;
          border-radius: 8px;
          transition: all 0.2s ease;
          display: inline-block;
          text-align: center;
        }
        .poster-template-root .poster-btn-primary:hover {
          background: #222222;
          transform: translateY(-1px);
        }

        @container (max-width: 768px) {
          .poster-template-root header.poster-header div {
            padding: 8px 12px !important;
          }
          .poster-template-root header.poster-header nav {
            gap: 8px !important;
          }
          .poster-template-root header.poster-header nav a[data-field^="navLinks"] {
            display: none !important;
          }
          .poster-template-root header.poster-header nav a:not([data-field^="navLinks"]) {
            padding: 6px 12px !important;
            font-size: 0.7rem !important;
          }

          .poster-template-root #wp-hero {
            min-height: 70vh !important;
          }
          .poster-template-root #wp-hero > div:nth-of-type(3) {
            padding: 50px 16px 36px !important;
          }
          .poster-template-root #wp-hero h1 {
            font-size: clamp(1.6rem, 7.5vw, 2.5rem) !important;
            line-height: 1.15 !important;
            margin-bottom: 16px !important;
            word-break: break-word !important;
            overflow-wrap: break-word !important;
            hyphens: auto !important;
          }
          .poster-template-root #wp-hero p {
            font-size: 0.95rem !important;
            line-height: 1.5 !important;
            margin-bottom: 24px !important;
            padding: 0 4px !important;
          }

          .poster-template-root #wp-plan-visit > div {
            grid-template-columns: 1fr !important;
            min-height: auto !important;
          }
          .poster-template-root #wp-plan-visit > div > div:nth-child(1) {
            min-height: 240px !important;
            height: 240px !important;
          }
          .poster-template-root #wp-plan-visit > div > div:nth-child(2) {
            padding: 32px 16px !important;
          }
          .poster-template-root #wp-plan-visit h2 {
            font-size: clamp(1.7rem, 6.5vw, 2.4rem) !important;
            margin-bottom: 16px !important;
            word-break: break-word !important;
          }
          .poster-template-root #wp-plan-visit p {
            font-size: 0.95rem !important;
            margin-bottom: 24px !important;
          }
          .poster-template-root #wp-plan-visit a.poster-btn-primary {
            padding: 14px 24px !important;
            font-size: 0.8rem !important;
            width: 100% !important;
            box-sizing: border-box !important;
          }

          .poster-template-root #wp-columns {
            padding: 40px 16px !important;
          }
          .poster-template-root #wp-columns > div {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .poster-template-root #wp-columns div[data-field="nucleusColumns.col1.image"],
          .poster-template-root #wp-columns div[data-field="nucleusColumns.col2.image"] {
            height: 220px !important;
          }
          .poster-template-root #wp-columns h3 {
            font-size: clamp(1.5rem, 6vw, 2.2rem) !important;
            word-break: break-word !important;
          }
          .poster-template-root #wp-columns p {
            font-size: 0.95rem !important;
            margin-bottom: 20px !important;
          }

          .poster-template-root #wp-next-steps-split > div {
            grid-template-columns: 1fr !important;
            min-height: auto !important;
          }
          .poster-template-root #wp-next-steps-split > div > div:nth-child(1) {
            padding: 32px 16px !important;
            order: 2;
          }
          .poster-template-root #wp-next-steps-split > div > div:nth-child(2) {
            min-height: 240px !important;
            height: 240px !important;
            order: 1;
          }
          .poster-template-root #wp-next-steps-split h2 {
            font-size: clamp(1.7rem, 6.5vw, 2.4rem) !important;
            word-break: break-word !important;
          }
          .poster-template-root #wp-next-steps-split p {
            font-size: 0.95rem !important;
          }
          .poster-template-root #wp-next-steps-split a.poster-btn-primary {
            width: 100% !important;
            box-sizing: border-box !important;
            padding: 14px 24px !important;
          }

          .poster-template-root #wp-mission {
            padding: 44px 16px !important;
          }
          .poster-template-root #wp-mission h2 {
            font-size: clamp(1.7rem, 6.5vw, 2.4rem) !important;
            margin-bottom: 20px !important;
            word-break: break-word !important;
          }
          .poster-template-root #wp-mission div {
            font-size: 0.95rem !important;
            line-height: 1.6 !important;
            margin-bottom: 28px !important;
          }
          .poster-template-root #wp-mission a.poster-btn-primary {
            width: 100% !important;
            box-sizing: border-box !important;
            padding: 14px 24px !important;
          }

          .poster-template-root #wp-contact {
            padding: 44px 16px 36px !important;
          }
          .poster-template-root #wp-contact > div:nth-child(1) {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
            margin-bottom: 32px !important;
          }
          .poster-template-root #wp-contact h2 {
            font-size: 1.7rem !important;
            word-break: break-word !important;
          }
          .poster-template-root #wp-contact > div:nth-child(2) {
            flex-direction: column !important;
            gap: 12px !important;
            text-align: center !important;
          }
        }

        @media (max-width: 768px) {
          .poster-template-root header.poster-header div {
            padding: 8px 12px !important;
          }
          .poster-template-root header.poster-header nav {
            gap: 8px !important;
          }
          .poster-template-root header.poster-header nav a[data-field^="navLinks"] {
            display: none !important;
          }
          .poster-template-root header.poster-header nav a:not([data-field^="navLinks"]) {
            padding: 6px 12px !important;
            font-size: 0.7rem !important;
          }

          .poster-template-root #wp-hero {
            min-height: 70vh !important;
          }
          .poster-template-root #wp-hero > div:nth-of-type(3) {
            padding: 50px 16px 36px !important;
          }
          .poster-template-root #wp-hero h1 {
            font-size: clamp(1.6rem, 7.5vw, 2.5rem) !important;
            line-height: 1.15 !important;
            margin-bottom: 16px !important;
            word-break: break-word !important;
            overflow-wrap: break-word !important;
            hyphens: auto !important;
          }
          .poster-template-root #wp-hero p {
            font-size: 0.95rem !important;
            line-height: 1.5 !important;
            margin-bottom: 24px !important;
            padding: 0 4px !important;
          }

          .poster-template-root #wp-plan-visit > div {
            grid-template-columns: 1fr !important;
            min-height: auto !important;
          }
          .poster-template-root #wp-plan-visit > div > div:nth-child(1) {
            min-height: 240px !important;
            height: 240px !important;
          }
          .poster-template-root #wp-plan-visit > div > div:nth-child(2) {
            padding: 32px 16px !important;
          }
          .poster-template-root #wp-plan-visit h2 {
            font-size: clamp(1.7rem, 6.5vw, 2.4rem) !important;
            margin-bottom: 16px !important;
            word-break: break-word !important;
          }
          .poster-template-root #wp-plan-visit p {
            font-size: 0.95rem !important;
            margin-bottom: 24px !important;
          }
          .poster-template-root #wp-plan-visit a.poster-btn-primary {
            padding: 14px 24px !important;
            font-size: 0.8rem !important;
            width: 100% !important;
            box-sizing: border-box !important;
          }

          .poster-template-root #wp-columns {
            padding: 40px 16px !important;
          }
          .poster-template-root #wp-columns > div {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .poster-template-root #wp-columns div[data-field="nucleusColumns.col1.image"],
          .poster-template-root #wp-columns div[data-field="nucleusColumns.col2.image"] {
            height: 220px !important;
          }
          .poster-template-root #wp-columns h3 {
            font-size: clamp(1.5rem, 6vw, 2.2rem) !important;
            word-break: break-word !important;
          }
          .poster-template-root #wp-columns p {
            font-size: 0.95rem !important;
            margin-bottom: 20px !important;
          }

          .poster-template-root #wp-next-steps-split > div {
            grid-template-columns: 1fr !important;
            min-height: auto !important;
          }
          .poster-template-root #wp-next-steps-split > div > div:nth-child(1) {
            padding: 32px 16px !important;
            order: 2;
          }
          .poster-template-root #wp-next-steps-split > div > div:nth-child(2) {
            min-height: 240px !important;
            height: 240px !important;
            order: 1;
          }
          .poster-template-root #wp-next-steps-split h2 {
            font-size: clamp(1.7rem, 6.5vw, 2.4rem) !important;
            word-break: break-word !important;
          }
          .poster-template-root #wp-next-steps-split p {
            font-size: 0.95rem !important;
          }
          .poster-template-root #wp-next-steps-split a.poster-btn-primary {
            width: 100% !important;
            box-sizing: border-box !important;
            padding: 14px 24px !important;
          }

          .poster-template-root #wp-mission {
            padding: 44px 16px !important;
          }
          .poster-template-root #wp-mission h2 {
            font-size: clamp(1.7rem, 6.5vw, 2.4rem) !important;
            margin-bottom: 20px !important;
            word-break: break-word !important;
          }
          .poster-template-root #wp-mission div {
            font-size: 0.95rem !important;
            line-height: 1.6 !important;
            margin-bottom: 28px !important;
          }
          .poster-template-root #wp-mission a.poster-btn-primary {
            width: 100% !important;
            box-sizing: border-box !important;
            padding: 14px 24px !important;
          }

          .poster-template-root #wp-contact {
            padding: 44px 16px 36px !important;
          }
          .poster-template-root #wp-contact > div:nth-child(1) {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
            margin-bottom: 32px !important;
          }
          .poster-template-root #wp-contact h2 {
            font-size: 1.7rem !important;
            word-break: break-word !important;
          }
          .poster-template-root #wp-contact > div:nth-child(2) {
            flex-direction: column !important;
            gap: 12px !important;
            text-align: center !important;
          }
        }
      `}</style>

      {/* ── 1. NAVBAR / HEADER BLANCA Y COMPACTA (MENOS ALTA) ── */}
      <header className="poster-header" style={{ position: 'sticky', top: 0, zIndex: 100, background: '#FFFFFF', borderBottom: '1px solid #E2E8F0', width: '100%', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '8px 5%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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
                    maxHeight: ov('logoImage').maxHeight || 42,
                    maxWidth: ov('logoImage').maxWidth || 260,
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
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ position: 'relative', display: 'inline-flex' }}>
                  <div
                    data-field="logoImage"
                    data-ovkey="logoImage"
                    className="editable-element"
                    onClick={(e) => handleEdit(e, 'logoImage', 'Subir Imagen de Logo', 'image', logoImage)}
                    style={{ width: 34, height: 34, borderRadius: 8, background: '#0F172A', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1rem', cursor: editMode ? 'pointer' : 'default', ...ost('logoImage') }}
                  >
                    G
                  </div>
                  {rdh('logoImage')}
                </div>
                <span
                  data-field="businessName"
                  data-ovkey="businessName"
                  className="editable-element"
                  onClick={(e) => handleEdit(e, 'businessName', 'Nombre de la Iglesia', 'text', businessName)}
                  style={{ fontSize: '1.15rem', fontWeight: 900, color: '#0F172A', letterSpacing: '-0.02em', ...ost('businessName') }}
                >
                  {businessName}
                </span>
              </div>
            )}
          </div>

          {(() => {
            const headerCtaText = data.hero?.ctaText || data.navCtaText || 'PLANIFICA TU VISITA'
            const headerCtaLink = data.hero?.ctaLink || data.navCtaLink || '#wp-plan-visit'
            const rawNavs = (Array.isArray(data.navLinks) && data.navLinks.length > 0) ? data.navLinks : [
              { text: nav.item1 || 'Planifica tu Visita', href: '#wp-plan-visit' },
              { text: nav.item2 || 'Sobre Nosotros', href: '#wp-welcome' },
              { text: nav.item3 || 'Ministerios', href: '#wp-columns' },
              { text: nav.item4 || 'Próximos Pasos', href: '#wp-next-steps-split' },
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
                        style={{ color: '#334155', textDecoration: 'none', fontSize: '0.82rem', fontWeight: 700, letterSpacing: '-0.01em', transition: 'color 0.15s', whiteSpace: 'nowrap', ...ost(`navLinks.${idx}.text`) }}
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
                  style={{ padding: '8px 20px', background: '#0F172A', color: '#FFFFFF', borderRadius: 8, textDecoration: 'none', fontSize: '0.78rem', fontWeight: 800, letterSpacing: '0.04em', textTransform: 'uppercase', transition: 'all 0.2s', whiteSpace: 'nowrap', flexShrink: 0, ...ost('hero.ctaText') }}
                  className="editable-element"
                >
                  {headerCtaText}
                </a>
              </div>
            )
          })()}
        </div>
      </header>

      {/* ── 2. HERO PRINCIPAL CON FOTO Y TEXTO SOBREIMPRESO ── */}
      {data.sectionsVisibility?.hero !== false && (
      <section id="wp-hero" style={{ position: 'relative', width: '100%', minHeight: '82vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', background: '#000000' }}>
        <div
          data-field="heroImage"
          data-ovkey="heroImage"
          className="editable-element"
          onClick={(e) => handleEdit(e, 'heroImage', 'Imagen de Portada (Hero)', 'image', hero.bgImage)}
          style={{ position: 'absolute', inset: 0, zIndex: 1, cursor: editMode ? 'pointer' : 'default', ...ost('heroImage') }}
        >
          <img
            src={hero.bgImage || 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1800&q=85&fit=crop'}
            alt={businessName}
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1800&q=85&fit=crop'
            }}
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
          />
          {editMode && (
            <div style={{ position: 'absolute', top: 16, right: 16, background: '#000000', color: '#fff', fontSize: '0.75rem', fontWeight: 800, padding: '6px 16px', borderRadius: 6, pointerEvents: 'none', zIndex: 3 }}>
              📷 Clic para cambiar foto de portada
            </div>
          )}
        </div>

        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.75) 100%)', zIndex: 2, pointerEvents: 'none' }} />
        
        <div style={{ position: 'relative', zIndex: 10, maxWidth: 960, textAlign: 'center', padding: '120px 5%', color: '#FFFFFF' }}>
          <div
            data-field="hero.eyebrow"
            data-ovkey="hero.eyebrow"
            className="editable-element"
            onClick={(e) => handleEdit(e, 'hero.eyebrow', 'Horario (Eyebrow Superior)', 'text', hero.eyebrow || '10:30 a.m. los Domingos')}
            style={{ display: 'inline-block', fontSize: '0.9rem', fontWeight: 700, color: '#E5E5E5', letterSpacing: '0.06em', textTransform: 'none', marginBottom: 20, ...ost('hero.eyebrow') }}
          >
            {hero.eyebrow || '10:30 a.m. los Domingos'}
            {rdh('hero.eyebrow')}
          </div>

          <h1
            data-field="hero.headline"
            data-ovkey="hero.headline"
            className="editable-element"
            onClick={(e) => handleEdit(e, 'hero.headline', 'Título Principal', 'text', `${hero.headlinePrefix || ''}${hero.headlineKeyword || ''}${hero.headlineSuffix || ''}`)}
            style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)', fontWeight: 900, lineHeight: 1.05, margin: '0 0 28px', letterSpacing: '-0.03em', color: '#FFFFFF', ...ost('hero.headline') }}
          >
            <span className="editable-element" onClick={(e) => handleEdit(e, 'hero.headlinePrefix', 'Prefijo del Título', 'text', hero.headlinePrefix || 'Encuentra a ')}>
              {hero.headlinePrefix || 'Encuentra a '}
            </span>
            <span style={{ color: '#FFFFFF' }}>
              {hero.headlineKeyword || 'Dios'}
            </span>
            <span className="editable-element" onClick={(e) => handleEdit(e, 'hero.headlineSuffix', 'Sufijo del Título', 'text', hero.headlineSuffix || ' como nunca antes')}>
              {hero.headlineSuffix || ' como nunca antes'}
            </span>
            {rdh('hero.headline')}
          </h1>

          <p
            data-field="hero.subheadline"
            data-ovkey="hero.subheadline"
            className="editable-element"
            onClick={(e) => handleEdit(e, 'hero.subheadline', 'Subtítulo Principal', 'textarea', hero.subheadline)}
            style={{ color: '#F5F5F5', fontSize: '1.25rem', lineHeight: 1.65, margin: '0 auto 40px', maxWidth: 760, fontWeight: 400, ...ost('hero.subheadline') }}
          >
            {hero.subheadline || 'En nuestra casa creemos que hay un lugar para ti: para encontrarte con Dios y vivir con propósito.'}
          </p>

          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              data-field="hero.ctaText"
              data-ovkey="hero.ctaText"
              href={hero.ctaLink || '#wp-plan-visit'}
              className="editable-element"
              onClick={(e) => handleNavClick(e, '#wp-plan-visit', 'hero.ctaText', 'Texto Botón Principal', hero.ctaText)}
              style={{ padding: '18px 42px', background: '#FFFFFF', color: '#000000', borderRadius: 8, textDecoration: 'none', fontSize: '0.9rem', fontWeight: 900, letterSpacing: '0.06em', textTransform: 'uppercase', ...ost('hero.ctaText') }}
            >
              {hero.ctaText || 'PLANIFICA TU VISITA'}
              {rdh('hero.ctaText')}
            </a>
          </div>
        </div>
      </section>
      )}

      {/* ── 3. SECCIÓN SPLIT 50/50: PLAN YOUR VISIT (INSPIRADO EN LA IMAGEN RECOMENDADA) ── */}
      {data.sectionsVisibility?.planAVisit !== false && (
      <section id="wp-plan-visit" style={{ width: '100%', background: '#FFFFFF', padding: 0 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', width: '100%', minHeight: 640 }}>
          
          {/* Left Column: Full Cover Edge-to-Edge Image */}
          <div
            data-field="planAVisit.image"
            data-ovkey="planAVisit.image"
            className="editable-element"
            onClick={(e) => handleEdit(e, 'planAVisit.image', 'Foto Sección Visítanos', 'image', planAVisit.image)}
            style={{ width: '100%', height: '100%', minHeight: 520, position: 'relative', overflow: 'hidden', cursor: editMode ? 'pointer' : 'default', ...ost('planAVisit.image') }}
          >
            <img
              src={planAVisit.image}
              alt="Plan Your Visit"
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1200&q=85&fit=crop'
              }}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>

          {/* Right Column: Clean White High-Contrast Typography & Spacing */}
          <div style={{ padding: '80px 10%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', background: '#FFFFFF' }}>
            <div
              data-field="planAVisit.eyebrow"
              data-ovkey="planAVisit.eyebrow"
              className="editable-element"
              onClick={(e) => handleEdit(e, 'planAVisit.eyebrow', 'Etiqueta Horarios', 'text', planAVisit.eyebrow)}
              style={{ fontSize: '0.9rem', fontWeight: 700, color: '#000000', letterSpacing: '-0.01em', marginBottom: 20, ...ost('planAVisit.eyebrow') }}
            >
              {planAVisit.eyebrow}
            </div>

            <h2
              data-field="planAVisit.title"
              data-ovkey="planAVisit.title"
              className="editable-element"
              onClick={(e) => handleEdit(e, 'planAVisit.title', 'Título Visítanos', 'text', planAVisit.title)}
              style={{ fontSize: 'clamp(2.8rem, 5.5vw, 4.2rem)', fontWeight: 900, color: '#000000', margin: '0 0 24px', letterSpacing: '-0.03em', lineHeight: 1.05, ...ost('planAVisit.title') }}
            >
              {planAVisit.title}
            </h2>

            <p
              data-field="planAVisit.subtitle"
              data-ovkey="planAVisit.subtitle"
              className="editable-element"
              onClick={(e) => handleEdit(e, 'planAVisit.subtitle', 'Descripción Visítanos', 'textarea', planAVisit.subtitle)}
              style={{ fontSize: '1.15rem', lineHeight: 1.7, color: '#222222', margin: '0 0 40px', maxWidth: 540, fontFamily: 'Georgia, serif', ...ost('planAVisit.subtitle') }}
            >
              {planAVisit.subtitle}
            </p>

            <a
              data-field="planAVisit.ctaText"
              data-ovkey="planAVisit.ctaText"
              href="#wp-contact"
              onClick={(e) => handleNavClick(e, '#wp-contact', 'planAVisit.ctaText', 'Texto Botón Visítanos', planAVisit.ctaText)}
              className="poster-btn-primary editable-element"
              style={{ padding: '18px 40px', borderRadius: 8, textDecoration: 'none', fontSize: '0.85rem', fontWeight: 900, letterSpacing: '0.06em', textTransform: 'uppercase', ...ost('planAVisit.ctaText') }}
            >
              {planAVisit.ctaText || 'PLANIFICA TU VISITA'}
            </a>
          </div>

        </div>
      </section>
      )}

      {/* ── 4. SECCIÓN 2 COLUMNAS (LÍDERES & CALENDARIO) EN FONDO NEGRO AMPIO (INSPIRADO EN LA SEGUNDA IMAGEN RECOMENDADA) ── */}
      {data.sectionsVisibility?.nucleusColumns !== false && (
      <section id="wp-columns" style={{ width: '100%', background: '#000000', color: '#FFFFFF', padding: '100px 5%', boxSizing: 'border-box' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 48 }}>
          
          {/* Column 1: Leaders & Staff */}
          <div style={{ background: '#000000', display: 'flex', flexDirection: 'column' }}>
            <div
              data-field="nucleusColumns.col1.image"
              data-ovkey="nucleusColumns.col1.image"
              className="editable-element"
              onClick={(e) => handleEdit(e, 'nucleusColumns.col1.image', 'Foto Columna 1', 'image', nucleusColumns.col1.image)}
              style={{ height: 380, width: '100%', position: 'relative', overflow: 'hidden', cursor: editMode ? 'pointer' : 'default', ...ost('nucleusColumns.col1.image') }}
            >
              <img
                src={nucleusColumns.col1.image || 'https://images.unsplash.com/photo-1477281765962-ef34e8bb0967?w=1000&q=85&fit=crop'}
                alt="Columna 1"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1477281765962-ef34e8bb0967?w=1000&q=85&fit=crop'
                }}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
            <div style={{ paddingTop: 36, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div
                  data-field="nucleusColumns.col1.eyebrow"
                  data-ovkey="nucleusColumns.col1.eyebrow"
                  className="editable-element"
                  onClick={(e) => handleEdit(e, 'nucleusColumns.col1.eyebrow', 'Etiqueta Columna 1', 'text', nucleusColumns.col1.eyebrow)}
                  style={{ fontSize: '0.85rem', fontWeight: 700, color: '#A1A1AA', marginBottom: 14, ...ost('nucleusColumns.col1.eyebrow') }}
                >
                  {nucleusColumns.col1.eyebrow || 'Conoce a Nuestro Equipo'}
                </div>
                <h3
                  data-field="nucleusColumns.col1.title"
                  data-ovkey="nucleusColumns.col1.title"
                  className="editable-element"
                  onClick={(e) => handleEdit(e, 'nucleusColumns.col1.title', 'Título Columna 1', 'text', nucleusColumns.col1.title)}
                  style={{ fontSize: 'clamp(2.4rem, 4vw, 3.4rem)', fontWeight: 900, color: '#FFFFFF', margin: '0 0 20px', letterSpacing: '-0.02em', lineHeight: 1.1, ...ost('nucleusColumns.col1.title') }}
                >
                  {nucleusColumns.col1.title || 'Pastores & Equipo'}
                </h3>
                <p
                  data-field="nucleusColumns.col1.description"
                  data-ovkey="nucleusColumns.col1.description"
                  className="editable-element"
                  onClick={(e) => handleEdit(e, 'nucleusColumns.col1.description', 'Descripción Columna 1', 'textarea', nucleusColumns.col1.description)}
                  style={{ fontSize: '1.1rem', lineHeight: 1.7, color: 'rgba(255, 255, 255, 0.85)', margin: '0 0 32px', maxWidth: 560, fontFamily: 'Georgia, serif', ...ost('nucleusColumns.col1.description') }}
                >
                  {nucleusColumns.col1.description || nucleusColumns.col1.text || 'Nuestro dedicado equipo de pastores y líderes está aquí para brindarte apoyo espiritual, consejería y recursos para fortalecer tu camino de fe.'}
                </p>
              </div>
            </div>
          </div>

          {/* Column 2: See What's Happening */}
          <div style={{ background: '#000000', display: 'flex', flexDirection: 'column' }}>
            <div
              data-field="nucleusColumns.col2.image"
              data-ovkey="nucleusColumns.col2.image"
              className="editable-element"
              onClick={(e) => handleEdit(e, 'nucleusColumns.col2.image', 'Foto Columna 2', 'image', nucleusColumns.col2.image)}
              style={{ height: 380, width: '100%', position: 'relative', overflow: 'hidden', cursor: editMode ? 'pointer' : 'default', ...ost('nucleusColumns.col2.image') }}
            >
              <img
                src={nucleusColumns.col2.image}
                alt={nucleusColumns.col2.title}
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1000&q=85&fit=crop'
                }}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{ paddingTop: 36, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div
                  data-field="nucleusColumns.col2.eyebrow"
                  data-ovkey="nucleusColumns.col2.eyebrow"
                  className="editable-element"
                  onClick={(e) => handleEdit(e, 'nucleusColumns.col2.eyebrow', 'Etiqueta Columna 2', 'text', nucleusColumns.col2.eyebrow)}
                  style={{ fontSize: '0.85rem', fontWeight: 700, color: '#A1A1AA', marginBottom: 14, ...ost('nucleusColumns.col2.eyebrow') }}
                >
                  {nucleusColumns.col2.eyebrow || 'Nuestro Calendario'}
                </div>
                <h3
                  data-field="nucleusColumns.col2.title"
                  data-ovkey="nucleusColumns.col2.title"
                  className="editable-element"
                  onClick={(e) => handleEdit(e, 'nucleusColumns.col2.title', 'Título Columna 2', 'text', nucleusColumns.col2.title)}
                  style={{ fontSize: 'clamp(2.4rem, 4vw, 3.4rem)', fontWeight: 900, color: '#FFFFFF', margin: '0 0 20px', letterSpacing: '-0.02em', lineHeight: 1.1, ...ost('nucleusColumns.col2.title') }}
                >
                  {nucleusColumns.col2.title || 'Próximos Eventos & Actividades'}
                </h3>
                <p
                  data-field="nucleusColumns.col2.text"
                  data-ovkey="nucleusColumns.col2.text"
                  className="editable-element"
                  onClick={(e) => handleEdit(e, 'nucleusColumns.col2.text', 'Texto Columna 2', 'textarea', nucleusColumns.col2.text)}
                  style={{ fontSize: '1.1rem', lineHeight: 1.7, color: 'rgba(255, 255, 255, 0.85)', margin: '0 0 32px', maxWidth: 560, fontFamily: 'Georgia, serif', ...ost('nucleusColumns.col2.text') }}
                >
                  {nucleusColumns.col2.text || 'Descubre los eventos de este mes para enterarte de lo que está sucediendo y cómo puedes participar. Explora la lista completa de próximos ministerios y reuniones.'}
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>
      )}

      {/* ── 5. SECCIÓN SPLIT INVERTIDA: NEXT STEPS (INSPIRADO EN LA TERCERA IMAGEN RECOMENDADA) ── */}
      {data.sectionsVisibility?.nextSteps !== false && (
      <section id="wp-next-steps-split" style={{ width: '100%', background: '#FFFFFF', padding: 0 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', width: '100%', minHeight: 640 }}>
          
          {/* Left Column: Clean White High-Contrast Typography */}
          <div style={{ padding: '80px 10%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', background: '#FFFFFF' }}>
            <div
              data-field="nextSteps.eyebrow"
              data-ovkey="nextSteps.eyebrow"
              className="editable-element"
              onClick={(e) => handleEdit(e, 'nextSteps.eyebrow', 'Etiqueta Próximos Pasos', 'text', data.nextSteps?.eyebrow || 'Involúcrate')}
              style={{ fontSize: '0.9rem', fontWeight: 700, color: '#000000', letterSpacing: '-0.01em', marginBottom: 20, ...ost('nextSteps.eyebrow') }}
            >
              {data.nextSteps?.eyebrow || 'Involúcrate'}
            </div>

            <h2
              data-field="nextSteps.title"
              data-ovkey="nextSteps.title"
              className="editable-element"
              onClick={(e) => handleEdit(e, 'nextSteps.title', 'Título Próximos Pasos', 'text', data.nextSteps?.title || 'Próximos Pasos')}
              style={{ fontSize: 'clamp(2.8rem, 5.5vw, 4.2rem)', fontWeight: 900, color: '#000000', margin: '0 0 24px', letterSpacing: '-0.03em', lineHeight: 1.05, ...ost('nextSteps.title') }}
            >
              {data.nextSteps?.title || 'Próximos Pasos'}
            </h2>

            <p
              data-field="nextSteps.subtitle"
              data-ovkey="nextSteps.subtitle"
              className="editable-element"
              onClick={(e) => handleEdit(e, 'nextSteps.subtitle', 'Subtítulo Próximos Pasos', 'textarea', data.nextSteps?.subtitle || 'Explora la vida de nuestra iglesia incluyendo ministerios activos, próximos eventos y oportunidades de servicio.')}
              style={{ fontSize: '1.15rem', lineHeight: 1.7, color: '#222222', margin: '0 0 40px', maxWidth: 520, fontFamily: 'Georgia, serif', ...ost('nextSteps.subtitle') }}
            >
              {data.nextSteps?.subtitle || 'Explora la vida de nuestra iglesia incluyendo ministerios activos, próximos eventos y oportunidades de servicio.'}
            </p>

            <a
              data-field="nextSteps.ctaText"
              data-ovkey="nextSteps.ctaText"
              href="#wp-contact"
              onClick={(e) => handleNavClick(e, '#wp-contact', 'nextSteps.ctaText', 'Texto Botón Próximos Pasos', data.nextSteps?.ctaText || 'DAR TU SIGUIENTE PASO')}
              className="poster-btn-primary editable-element"
              style={{ padding: '18px 40px', borderRadius: 8, textDecoration: 'none', fontSize: '0.85rem', fontWeight: 900, letterSpacing: '0.06em', textTransform: 'uppercase', ...ost('nextSteps.ctaText') }}
            >
              {data.nextSteps?.ctaText || 'DAR TU SIGUIENTE PASO'}
            </a>
          </div>

          {/* Right Column: Full Height Worship/Community Photo */}
          <div
            data-field="nextSteps.image"
            data-ovkey="nextSteps.image"
            className="editable-element"
            onClick={(e) => handleEdit(e, 'nextSteps.image', 'Foto Sección Próximos Pasos', 'image', data.nextSteps?.image || 'https://images.unsplash.com/photo-1543807535-eceef0bc6599?w=1200&q=85&fit=crop')}
            style={{ width: '100%', height: '100%', minHeight: 520, position: 'relative', overflow: 'hidden', cursor: editMode ? 'pointer' : 'default', ...ost('nextSteps.image') }}
          >
            <img
              src={data.nextSteps?.image || 'https://images.unsplash.com/photo-1543807535-eceef0bc6599?w=1200&q=85&fit=crop'}
              alt="Next Steps Worship"
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1543807535-eceef0bc6599?w=1200&q=85&fit=crop'
              }}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>

        </div>
      </section>
      )}

      {/* ── 6. SECCIÓN DE MISIÓN Y VALORES EN ESPACIO ABIERTO ── */}
      {data.sectionsVisibility?.missionBlock !== false && (
      <section id="wp-mission" style={{ width: '100%', background: '#FAFAFA', padding: '120px 8%', boxSizing: 'border-box', borderTop: '1px solid #E5E5E5' }}>
        <div style={{ maxWidth: 960, margin: '0 auto', textAlign: 'center' }}>
          <h2
            data-field="missionBlock.title"
            data-ovkey="missionBlock.title"
            className="editable-element"
            onClick={(e) => handleEdit(e, 'missionBlock.title', 'Título Sección Misión', 'text', missionBlock.title)}
            style={{ fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', fontWeight: 900, color: '#000000', margin: '0 0 36px', letterSpacing: '-0.03em', ...ost('missionBlock.title') }}
          >
            {missionBlock.title}
          </h2>

          <div style={{ fontSize: '1.2rem', lineHeight: 1.85, color: '#333333', margin: '0 0 48px', display: 'flex', flexDirection: 'column', gap: 20, fontFamily: 'Georgia, serif' }}>
            <p
              data-field="missionBlock.text1"
              data-ovkey="missionBlock.text1"
              className="editable-element"
              onClick={(e) => handleEdit(e, 'missionBlock.text1', 'Párrafo Misión 1', 'textarea', missionBlock.text1)}
              style={{ ...ost('missionBlock.text1') }}
            >
              {missionBlock.text1}
            </p>
            <p
              data-field="missionBlock.text2"
              data-ovkey="missionBlock.text2"
              className="editable-element"
              onClick={(e) => handleEdit(e, 'missionBlock.text2', 'Párrafo Misión 2', 'textarea', missionBlock.text2)}
              style={{ ...ost('missionBlock.text2') }}
            >
              {missionBlock.text2}
            </p>
          </div>

          <a
            data-field="missionBlock.ctaText"
            data-ovkey="missionBlock.ctaText"
            href={missionBlock.ctaLink || '#wp-plan-visit'}
            className="poster-btn-primary editable-element"
            onClick={(e) => handleNavClick(e, '#wp-plan-visit', 'missionBlock.ctaText', 'Texto Botón Misión', missionBlock.ctaText)}
            style={{ padding: '18px 42px', borderRadius: 8, textDecoration: 'none', fontSize: '0.85rem', fontWeight: 900, letterSpacing: '0.06em', textTransform: 'uppercase', ...ost('missionBlock.ctaText') }}
          >
            {missionBlock.ctaText || 'SOBRE NOSOTROS'}
          </a>
        </div>
      </section>
      )}

      {/* ── EVENTOS ── */}
      {data.sectionsVisibility?.events !== false && (
      <section id="wp-events" style={{ width: '100%', background: '#000000', padding: '100px 8%', boxSizing: 'border-box', borderTop: '1px solid #111' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 56, flexWrap: 'wrap', gap: 20 }}>
            <div>
              <div
                data-field="events.eyebrow" data-ovkey="events.eyebrow"
                className="editable-element"
                onClick={(e) => handleEdit(e, 'events.eyebrow', 'Etiqueta Sección Eventos', 'text', data.events?.eyebrow || 'PRÓXIMOS EVENTOS')}
                style={{ fontSize: '0.72rem', fontWeight: 800, color: '#71717A', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 14, ...ost('events.eyebrow') }}
              >
                {data.events?.eyebrow || 'PRÓXIMOS EVENTOS'}
              </div>
              <h2
                data-field="events.title" data-ovkey="events.title"
                className="editable-element"
                onClick={(e) => handleEdit(e, 'events.title', 'Título Sección Eventos', 'text', data.events?.title || 'Lo Que Viene')}
                style={{ fontSize: 'clamp(2.5rem, 4vw, 3.8rem)', fontWeight: 900, color: '#FFFFFF', margin: 0, letterSpacing: '-0.04em', lineHeight: 1.05, ...ost('events.title') }}
              >
                {data.events?.title || 'Lo Que Viene'}
              </h2>
            </div>
            <a
              data-field="events.allLinkText" data-ovkey="events.allLinkText"
              className="editable-element"
              href={data.events?.allLink || '#wp-contact'}
              onClick={(e) => handleEdit(e, 'events.allLinkText', 'Texto Enlace Eventos', 'text', data.events?.allLinkText || 'Ver todos los eventos →')}
              style={{ color: '#71717A', fontWeight: 700, fontSize: '0.85rem', textDecoration: 'none', whiteSpace: 'nowrap', ...ost('events.allLinkText') }}
            >
              {data.events?.allLinkText || 'Ver todos los eventos →'}
            </a>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 2 }}>
            {(() => {
              const evData = data.events || {}
              const evList = Array.isArray(evData) ? evData : (Array.isArray(evData.items) ? evData.items : [
                { image: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&q=85&fit=crop', day: '18', month: 'OCT', dateDay: '18', dateMonth: 'OCT', title: 'Noche de Adoración', time: '7:00 PM', location: 'Auditorio Principal', description: 'Una noche especial de adoración colectiva. Ven con tu familia.', desc: 'Una noche especial de adoración colectiva. Ven con tu familia.', link: '#wp-contact', btnText: 'Inscribirme →' },
                { image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=85&fit=crop', day: '25', month: 'OCT', dateDay: '25', dateMonth: 'OCT', title: 'Conferencia de Familias', time: '9:00 AM', location: 'Sede Norte', description: 'Herramientas prácticas para fortalecer el hogar y el matrimonio.', desc: 'Herramientas prácticas para fortalecer el hogar y el matrimonio.', link: '#wp-contact', btnText: 'Inscribirme →' },
                { image: 'https://images.unsplash.com/photo-1510936111840-65e151ad71bb?w=800&q=85&fit=crop', day: '1', month: 'NOV', dateDay: '01', dateMonth: 'NOV', title: 'Retiro Juvenil', time: '8:00 AM', location: 'Campo Retiro El Pedregal', description: 'Un fin de semana de conexión, aventura y crecimiento espiritual.', desc: 'Un fin de semana de conexión, aventura y crecimiento espiritual.', link: '#wp-contact', btnText: 'Inscribirme →' },
              ])
              const evPrefix = Array.isArray(evData) ? 'events' : 'events.items'
              return evList.map((ev, idx) => (
                <div key={idx} style={{ background: '#0A0A0A', border: '1px solid #1A1A1A', overflow: 'hidden', transition: 'background 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#111'}
                  onMouseLeave={e => e.currentTarget.style.background = '#0A0A0A'}
                >
                  <div
                    data-field={`${evPrefix}.${idx}.image`} data-ovkey={`${evPrefix}.${idx}.image`}
                    className="editable-element"
                    onClick={(e) => handleEdit(e, `${evPrefix}.${idx}.image`, `Foto Evento ${idx + 1}`, 'image', ev.image)}
                    style={{ position: 'relative', height: 220, overflow: 'hidden', cursor: editMode ? 'pointer' : 'default', ...ost(`${evPrefix}.${idx}.image`) }}
                  >
                    <img src={ev.image || 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&q=85&fit=crop'} alt={ev.title} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(20%)' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 30%, rgba(10,10,10,0.95) 100%)', pointerEvents: 'none' }} />
                    <div style={{ position: 'absolute', top: 20, left: 20, background: '#FFFFFF', color: '#000000', padding: '10px 14px', textAlign: 'center', minWidth: 52 }}>
                      <div
                        data-field={`${evPrefix}.${idx}.day`} data-ovkey={`${evPrefix}.${idx}.day`}
                        className="editable-element"
                        onClick={(e) => { e.stopPropagation(); handleEdit(e, `${evPrefix}.${idx}.day`, `Día Evento ${idx + 1}`, 'text', ev.day || ev.dateDay) }}
                        style={{ fontWeight: 900, fontSize: '1.5rem', lineHeight: 1, ...ost(`${evPrefix}.${idx}.day`) }}
                      >
                        {ev.day || ev.dateDay}
                      </div>
                      <div
                        data-field={`${evPrefix}.${idx}.month`} data-ovkey={`${evPrefix}.${idx}.month`}
                        className="editable-element"
                        onClick={(e) => { e.stopPropagation(); handleEdit(e, `${evPrefix}.${idx}.month`, `Mes Evento ${idx + 1}`, 'text', ev.month || ev.dateMonth) }}
                        style={{ fontWeight: 800, fontSize: '0.6rem', letterSpacing: '0.14em', marginTop: 2, ...ost(`${evPrefix}.${idx}.month`) }}
                      >
                        {ev.month || ev.dateMonth}
                      </div>
                    </div>
                  </div>
                  <div style={{ padding: '24px 28px 28px' }}>
                    <h3
                      data-field={`${evPrefix}.${idx}.title`} data-ovkey={`${evPrefix}.${idx}.title`}
                      className="editable-element"
                      onClick={(e) => handleEdit(e, `${evPrefix}.${idx}.title`, `Título Evento ${idx + 1}`, 'text', ev.title)}
                      style={{ fontSize: '1.3rem', fontWeight: 900, color: '#FFFFFF', margin: '0 0 10px', letterSpacing: '-0.02em', ...ost(`${evPrefix}.${idx}.title`) }}
                    >
                      {ev.title}
                    </h3>
                    <div style={{ display: 'flex', gap: 18, marginBottom: 14, flexWrap: 'wrap' }}>
                      <span
                        data-field={`${evPrefix}.${idx}.time`} data-ovkey={`${evPrefix}.${idx}.time`}
                        className="editable-element"
                        onClick={(e) => handleEdit(e, `${evPrefix}.${idx}.time`, `Horario Evento ${idx + 1}`, 'text', ev.time)}
                        style={{ fontSize: '0.78rem', color: '#FFFFFF', fontWeight: 700, ...ost(`${evPrefix}.${idx}.time`) }}
                      >
                        ⏰ {ev.time}
                      </span>
                      <span
                        data-field={`${evPrefix}.${idx}.location`} data-ovkey={`${evPrefix}.${idx}.location`}
                        className="editable-element"
                        onClick={(e) => handleEdit(e, `${evPrefix}.${idx}.location`, `Ubicación Evento ${idx + 1}`, 'text', ev.location)}
                        style={{ fontSize: '0.78rem', color: '#52525B', ...ost(`${evPrefix}.${idx}.location`) }}
                      >
                        📍 {ev.location}
                      </span>
                    </div>
                    <p
                      data-field={`${evPrefix}.${idx}.description`} data-ovkey={`${evPrefix}.${idx}.description`}
                      className="editable-element"
                      onClick={(e) => handleEdit(e, `${evPrefix}.${idx}.description`, `Descripción Evento ${idx + 1}`, 'textarea', ev.description || ev.desc)}
                      style={{ fontSize: '0.9rem', color: '#71717A', lineHeight: 1.65, margin: '0 0 20px', fontFamily: 'Georgia, serif', ...ost(`${evPrefix}.${idx}.description`) }}
                    >
                      {ev.description || ev.desc}
                    </p>
                    <a
                      data-field={`${evPrefix}.${idx}.btnText`} data-ovkey={`${evPrefix}.${idx}.btnText`}
                      href={ev.link || '#wp-contact'}
                      className="editable-element"
                      onClick={(e) => handleEdit(e, `${evPrefix}.${idx}.btnText`, `Botón Evento ${idx + 1}`, 'text', ev.btnText || 'Inscribirme →')}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '10px 22px', background: '#FFFFFF', color: '#000000', fontSize: '0.82rem', fontWeight: 900, textDecoration: 'none', transition: 'background 0.2s', ...ost(`${evPrefix}.${idx}.btnText`) }}
                      onMouseEnter={e => e.currentTarget.style.background = '#E5E5E5'}
                      onMouseLeave={e => e.currentTarget.style.background = '#FFFFFF'}
                    >
                      {ev.btnText || 'Inscribirme →'}
                    </a>
                  </div>
                </div>
              ))
            })()}
          </div>
        </div>
      </section>
      )}

      {/* ── 6.5. DONACIONES ── */}
      {data.sectionsVisibility?.donation !== false && (
      <section id="wp-donations" style={{ width: '100%', background: '#000000', padding: '100px 8%', boxSizing: 'border-box', borderTop: '1px solid #1A1A1A' }}>
        <div style={{
          maxWidth: 860, margin: '0 auto', textAlign: 'center',
          background: '#0A0A0A',
          border: '1px solid #1F1F1F',
          borderRadius: 24, padding: '64px 48px',
        }}>
          <div
            data-field="donation.eyebrow" data-ovkey="donation.eyebrow"
            className="editable-element"
            onClick={(e) => handleEdit(e, 'donation.eyebrow', 'Etiqueta Donaciones', 'text', data.donation?.eyebrow || 'GENEROSIDAD')}
            style={{ fontSize: '0.75rem', fontWeight: 800, color: '#71717A', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 16, ...ost('donation.eyebrow') }}
          >
            {data.donation?.eyebrow || 'GENEROSIDAD'}
          </div>
          <h2
            data-field="donation.title" data-ovkey="donation.title"
            className="editable-element"
            onClick={(e) => handleEdit(e, 'donation.title', 'Título Donaciones', 'text', data.donation?.title || 'Tu Generosidad Transforma Vidas')}
            style={{ fontSize: 'clamp(2rem, 3.8vw, 3.5rem)', fontWeight: 900, color: '#FFFFFF', margin: '0 0 20px', letterSpacing: '-0.04em', lineHeight: 1.05, ...ost('donation.title') }}
          >
            {data.donation?.title || 'Tu Generosidad Transforma Vidas'}
          </h2>
          <p
            data-field="donation.subtitle" data-ovkey="donation.subtitle"
            className="editable-element"
            onClick={(e) => handleEdit(e, 'donation.subtitle', 'Descripción Donaciones', 'textarea', data.donation?.subtitle || 'Cada ofrenda nos permite seguir extendiendo el mensaje de esperanza en nuestra ciudad y más allá.')}
            style={{ fontSize: '1.1rem', color: '#71717A', lineHeight: 1.75, margin: '0 0 40px', maxWidth: 580, marginLeft: 'auto', marginRight: 'auto', fontFamily: 'Georgia, serif', ...ost('donation.subtitle') }}
          >
            {data.donation?.subtitle || 'Cada ofrenda nos permite seguir extendiendo el mensaje de esperanza en nuestra ciudad y más allá.'}
          </p>
          <a
            data-field="donation.ctaText" data-ovkey="donation.ctaText"
            href={data.donation?.ctaLink || '#wp-contact'}
            className="editable-element"
            onClick={(e) => handleEdit(e, 'donation.ctaText', 'Botón Donaciones', 'text', data.donation?.ctaText || 'Ofrendar en Línea')}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '16px 40px', borderRadius: 999,
              background: '#FFFFFF',
              color: '#000000', fontWeight: 900, fontSize: '0.9rem',
              textDecoration: 'none',
              boxShadow: '0 8px 32px rgba(255,255,255,0.1)',
              transition: 'all 0.2s ease',
              ...ost('donation.ctaText')
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            {data.donation?.ctaText || 'Ofrendar en Línea'}
          </a>
          {data.donation?.note && (
            <div
              data-field="donation.note" data-ovkey="donation.note"
              className="editable-element"
              onClick={(e) => handleEdit(e, 'donation.note', 'Nota Donaciones', 'text', data.donation.note)}
              style={{ marginTop: 24, fontSize: '0.8rem', color: '#52525B', ...ost('donation.note') }}
            >
              🔒 {data.donation.note}
            </div>
          )}
        </div>
      </section>
      )}

      {/* ── 6.8. PETICIÓN DE ORACIÓN ── */}
      {data.sectionsVisibility?.prayerRequest !== false && (
      <section id="wp-prayer" style={{ width: '100%', background: '#050505', padding: '100px 8%', boxSizing: 'border-box', borderTop: '1px solid #1A1A1A' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <div
            data-field="prayerRequest.eyebrow" data-ovkey="prayerRequest.eyebrow"
            className="editable-element"
            onClick={(e) => handleEdit(e, 'prayerRequest.eyebrow', 'Etiqueta Oración', 'text', data.prayerRequest?.eyebrow || 'ESTAMOS PARA TI')}
            style={{ fontSize: '0.75rem', fontWeight: 800, color: '#71717A', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 14, ...ost('prayerRequest.eyebrow') }}
          >
            {data.prayerRequest?.eyebrow || 'ESTAMOS PARA TI'}
          </div>
          <h2
            data-field="prayerRequest.title" data-ovkey="prayerRequest.title"
            className="editable-element"
            onClick={(e) => handleEdit(e, 'prayerRequest.title', 'Título Petición de Oración', 'text', data.prayerRequest?.title || '¿Podemos Orar por Ti?')}
            style={{ fontSize: 'clamp(2rem, 3.8vw, 3.2rem)', fontWeight: 900, color: '#FFFFFF', margin: '0 0 16px', letterSpacing: '-0.03em', ...ost('prayerRequest.title') }}
          >
            {data.prayerRequest?.title || '¿Podemos Orar por Ti?'}
          </h2>
          <p
            data-field="prayerRequest.subtitle" data-ovkey="prayerRequest.subtitle"
            className="editable-element"
            onClick={(e) => handleEdit(e, 'prayerRequest.subtitle', 'Subtítulo Petición de Oración', 'textarea', data.prayerRequest?.subtitle || 'Nuestro equipo pastoral ora confidencialmente cada semana por cada necesidad planteada. Déjanos saber cómo podemos apoyarte.')}
            style={{ fontSize: '1.05rem', color: '#71717A', lineHeight: 1.7, margin: '0 0 36px', maxWidth: 640, marginLeft: 'auto', marginRight: 'auto', fontFamily: 'Georgia, serif', ...ost('prayerRequest.subtitle') }}
          >
            {data.prayerRequest?.subtitle || 'Nuestro equipo pastoral ora confidencialmente cada semana por cada necesidad planteada. Déjanos saber cómo podemos apoyarte.'}
          </p>
          <div style={{ background: '#0A0A0A', border: '1px solid #1F1F1F', borderRadius: 20, padding: 36, textAlign: 'left' }}>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: '0.8rem', color: '#A1A1AA', fontWeight: 700, marginBottom: 6 }}>Tu Nombre</label>
              <input type="text" placeholder="Ej: Juan Pérez" style={{ width: '100%', padding: '12px 16px', borderRadius: 8, background: '#000000', border: '1px solid #27272A', color: '#FFF', fontSize: '0.9rem', boxSizing: 'border-box' }} />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: '0.8rem', color: '#A1A1AA', fontWeight: 700, marginBottom: 6 }}>Tu Motivo de Oración</label>
              <textarea rows={4} placeholder="Escribe tu motivo aquí..." style={{ width: '100%', padding: '12px 16px', borderRadius: 8, background: '#000000', border: '1px solid #27272A', color: '#FFF', fontSize: '0.9rem', resize: 'vertical', boxSizing: 'border-box' }} />
            </div>
            <button
              data-field="prayerRequest.ctaText" data-ovkey="prayerRequest.ctaText"
              className="editable-element"
              onClick={(e) => handleEdit(e, 'prayerRequest.ctaText', 'Texto Botón Oración', 'text', data.prayerRequest?.ctaText || 'Enviar Petición de Oración')}
              style={{ width: '100%', padding: '16px', borderRadius: 999, border: 'none', background: '#FFFFFF', color: '#000000', fontWeight: 900, cursor: 'pointer', fontSize: '0.9rem', ...ost('prayerRequest.ctaText') }}
            >
              {data.prayerRequest?.ctaText || 'Enviar Petición de Oración'}
            </button>
          </div>
        </div>
      </section>
      )}

      {/* ── 7. FOOTER MINIMALISTA ELEGANTE ── */}
      {data.sectionsVisibility?.contact !== false && (
      <footer id="wp-contact" style={{ width: '100%', background: '#000000', color: '#FFFFFF', padding: '100px 8% 60px', boxSizing: 'border-box' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 64, marginBottom: 80 }}>
          
          {/* Left Column */}
          <div>
            <h2
              data-field="businessName"
              data-ovkey="businessName"
              className="editable-element"
              onClick={(e) => handleEdit(e, 'businessName', 'Nombre de la Iglesia', 'text', businessName)}
              style={{ fontSize: '2.5rem', fontWeight: 900, margin: '0 0 28px', letterSpacing: '-0.03em', color: '#FFFFFF', ...ost('businessName') }}
            >
              {businessName}
            </h2>

            <div style={{ fontSize: '1.1rem', color: '#A1A1AA', marginBottom: 36, display: 'flex', flexDirection: 'column', gap: 10, fontFamily: 'Georgia, serif' }}>
              {meetingTimes.map((timeStr, idx) => (
                <div
                  key={idx}
                  data-field={`contact.meetingTimes.${idx}`}
                  data-ovkey={`contact.meetingTimes.${idx}`}
                  className="editable-element"
                  onClick={(e) => handleEdit(e, `contact.meetingTimes.${idx}`, `Horario ${idx + 1}`, 'text', timeStr)}
                  style={{ ...ost(`contact.meetingTimes.${idx}`) }}
                >
                  {timeStr}
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginBottom: 40 }}>
              <a
                data-field="contact.ctaPrimary"
                data-ovkey="contact.ctaPrimary"
                href={`mailto:${contact.email}`}
                className="editable-element"
                onClick={(e) => handleEdit(e, 'contact.ctaPrimary', 'Texto Botón Footer 1', 'text', contact.ctaPrimary)}
                style={{ padding: '16px 36px', background: '#FFFFFF', color: '#000000', borderRadius: 8, textDecoration: 'none', fontSize: '0.85rem', fontWeight: 900, letterSpacing: '0.06em', textTransform: 'uppercase', ...ost('contact.ctaPrimary') }}
              >
                {contact.ctaPrimary || 'ENVIAR MENSAJE'}
              </a>
            </div>

            <div style={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#A1A1AA' }}>
              <p
                data-field="contact.email"
                data-ovkey="contact.email"
                className="editable-element"
                onClick={(e) => handleEdit(e, 'contact.email', 'Correo Electrónico', 'text', contact.email)}
                style={{ ...ost('contact.email') }}
              >
                <a href={`mailto:${contact.email}`} style={{ color: '#FFFFFF', textDecoration: 'none', fontWeight: 700 }}>{contact.email}</a>
              </p>
              <p
                data-field="contact.phone"
                data-ovkey="contact.phone"
                className="editable-element"
                onClick={(e) => handleEdit(e, 'contact.phone', 'Teléfono', 'text', contact.phone)}
                style={{ ...ost('contact.phone') }}
              >
                <a href={`tel:${contact.phone}`} style={{ color: '#FFFFFF', textDecoration: 'none', fontWeight: 700 }}>{contact.phone}</a>
              </p>
              <p
                data-field="contact.address"
                data-ovkey="contact.address"
                className="editable-element"
                onClick={(e) => handleEdit(e, 'contact.address', 'Dirección Principal', 'textarea', contact.address)}
                style={{ marginTop: 12, ...ost('contact.address') }}
              >
                {contact.address}
              </p>
            </div>
          </div>

          {/* Right Links Column */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 40, alignItems: 'flex-start' }}>
            <div>
              <h4
                data-field="contact.col1Title"
                data-ovkey="contact.col1Title"
                className="editable-element"
                onClick={(e) => handleEdit(e, 'contact.col1Title', 'Título Columna 1 Footer', 'text', data.contact?.col1Title || 'Visita & Comunidad')}
                style={{ fontSize: '1.1rem', fontWeight: 900, color: '#FFFFFF', marginBottom: 20, ...ost('contact.col1Title') }}
              >
                {data.contact?.col1Title || 'Visita & Comunidad'}
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, fontSize: '0.95rem', color: '#A1A1AA' }}>
                <a href="#wp-plan-visit" onClick={(e) => handleNavClick(e, '#wp-plan-visit', 'planAVisit.title', 'Menú Planifica tu Visita', 'Planifica tu Visita')} style={{ color: '#A1A1AA', textDecoration: 'none' }} className="editable-element">Planifica tu Visita</a>
                <a href="#wp-columns" onClick={(e) => handleNavClick(e, '#wp-columns', 'columns.title', 'Menú Pastores & Equipo', 'Pastores & Equipo')} style={{ color: '#A1A1AA', textDecoration: 'none' }} className="editable-element">Pastores & Equipo</a>
                <a href="#wp-next-steps-split" onClick={(e) => handleNavClick(e, '#wp-next-steps-split', 'nextSteps.title', 'Menú Próximos Pasos', 'Próximos Pasos')} style={{ color: '#A1A1AA', textDecoration: 'none' }} className="editable-element">Próximos Pasos</a>
                <a href="#wp-prayer" onClick={(e) => handleNavClick(e, '#wp-prayer', 'prayerRequest.title', 'Menú Apoyo en Oración', 'Apoyo en Oración')} style={{ color: '#A1A1AA', textDecoration: 'none' }} className="editable-element">Apoyo en Oración</a>
              </div>
            </div>

            <div>
              <h4
                data-field="contact.col2Title"
                data-ovkey="contact.col2Title"
                className="editable-element"
                onClick={(e) => handleEdit(e, 'contact.col2Title', 'Título Columna 2 Footer', 'text', data.contact?.col2Title || 'Recursos & Redes')}
                style={{ fontSize: '1.1rem', fontWeight: 900, color: '#FFFFFF', marginBottom: 20, ...ost('contact.col2Title') }}
              >
                {data.contact?.col2Title || 'Recursos & Redes'}
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, fontSize: '0.95rem', color: '#A1A1AA' }}>
                <a href="#wp-columns" onClick={(e) => handleNavClick(e, '#wp-columns', 'columns.title', 'Menú Mensajes', 'Sermones')} style={{ color: '#A1A1AA', textDecoration: 'none' }} className="editable-element">Sermones</a>
                <a href="#wp-events" onClick={(e) => handleNavClick(e, '#wp-events', 'events.title', 'Menú Calendario', 'Calendario')} style={{ color: '#A1A1AA', textDecoration: 'none' }} className="editable-element">Calendario</a>
                <a href="#instagram" style={{ color: '#A1A1AA', textDecoration: 'none' }}>Instagram</a>
                <a href="#youtube" style={{ color: '#A1A1AA', textDecoration: 'none' }}>YouTube</a>
              </div>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: 1400, margin: '0 auto', paddingTop: 32, borderTop: '1px solid #262626', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', color: '#71717A' }}>
          <div>
            <span>Política de Privacidad</span> • <span>Términos y Condiciones</span>
          </div>
          <div>
            © {new Date().getFullYear()} {businessName}. Todos los Derechos Reservados.
          </div>
        </div>
      </footer>
      )}

    </div>
  )
}
