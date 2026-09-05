import React from 'react'
import TemplateDragHandles from './TemplateDragHandles'

export default function ChurchTemplatePoster({ data = {}, editMode = false, activeField, onElementClick, onQuickUpdate, onQuickUpdateBatch }) {
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
    ctaText: rawPlan.ctaText || 'PLAN A VISIT',
    ctaLink: '#wp-contact',
    image: rawPlan.image || 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1200&q=85&fit=crop'
  }

  const rawCols = data.nucleusColumns || {}
  const nucleusColumns = {
    col1: {
      eyebrow: 'Meet Our Team',
      title: 'Leaders & Staff',
      text: 'Our dedicated team of pastors and staff are here to provide spiritual guidance and support - as well as resources to help you on your faith journey.',
      image: 'https://images.unsplash.com/photo-1477281765962-ef34e8bb0967?w=1000&q=85&fit=crop',
      ctaText: 'NUESTRO EQUIPO',
      ctaLink: '#wp-contact',
      ...(rawCols.col1 || {})
    },
    col2: {
      eyebrow: 'Our Calendar',
      title: "See What's Happening",
      text: "Check out this month's events to find out what's happening and how you can be involved. Explore the full list of upcoming ministries and services.",
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
    <div style={{ fontFamily: `'${activeFont}', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`, color: '#000000', background: '#FFFFFF', minHeight: '100vh', width: '100%', overflowX: 'hidden' }}>
      <link rel="stylesheet" href={`https://fonts.googleapis.com/css2?family=${encodeURIComponent(activeFont.replace(/'/g, ''))}:wght@400;500;600;700;800;900&display=swap`} />
      <style>{`
        .editable-element {
          cursor: ${editMode ? 'pointer' : 'default'};
          transition: all 0.15s ease;
        }
        .editable-element:hover {
          ${editMode ? 'outline: 2px dashed #000000; outline-offset: 4px;' : ''}
        }
        .poster-card {
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .poster-card:hover {
          transform: translateY(-2px);
        }
        .poster-btn-primary {
          background: #000000;
          color: #FFFFFF;
          border-radius: 8px;
          transition: all 0.2s ease;
          display: inline-block;
          text-align: center;
        }
        .poster-btn-primary:hover {
          background: #222222;
          transform: translateY(-1px);
        }
      `}</style>

      {/* ── 1. NAVBAR / HEADER BLANCA Y COMPACTA (MENOS ALTA) ── */}
      <header style={{ position: 'sticky', top: 0, zIndex: 100, background: '#FFFFFF', borderBottom: '1px solid #E2E8F0', width: '100%', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
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

          <nav style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
            {((Array.isArray(data.navLinks) && data.navLinks.length > 0) ? data.navLinks : [
              { text: nav.item1 || 'Planifica tu Visita', href: '#wp-plan-visit' },
              { text: nav.item2 || 'Sobre Nosotros', href: '#wp-welcome' },
              { text: nav.item3 || 'Ministerios', href: '#wp-columns' },
              { text: nav.item4 || 'Próximos Pasos', href: '#wp-next-steps-split' },
            ]).map((item, idx) => {
              const itemLabel = item.text || item.label || 'Link'
              return (
                <a
                  key={idx}
                  data-field={`navLinks.${idx}.text`}
                  data-ovkey={`navLinks.${idx}.text`}
                  href={item.href || '#wp-hero'}
                  onClick={(e) => handleNavClick(e, item.href || '#wp-hero', `navLinks.${idx}.text`, `Menú: ${itemLabel}`, itemLabel)}
                  style={{ color: '#334155', textDecoration: 'none', fontSize: '0.82rem', fontWeight: 700, letterSpacing: '-0.01em', transition: 'color 0.15s', ...ost(`navLinks.${idx}.text`) }}
                  className="editable-element"
                >
                  {itemLabel}
                </a>
              )
            })}
            <a
              data-field="hero.ctaText"
              data-ovkey="hero.ctaText"
              href={data.hero?.ctaLink || data.navCtaLink || '#wp-plan-visit'}
              onClick={(e) => handleNavClick(e, data.hero?.ctaLink || data.navCtaLink || '#wp-plan-visit', 'hero.ctaText', 'Botón Navbar Visítanos', data.hero?.ctaText || data.navCtaText || 'PLANIFICA TU VISITA')}
              style={{ padding: '8px 20px', background: '#0F172A', color: '#FFFFFF', borderRadius: 8, textDecoration: 'none', fontSize: '0.78rem', fontWeight: 800, letterSpacing: '0.04em', textTransform: 'uppercase', transition: 'all 0.2s', ...ost('hero.ctaText') }}
              className="editable-element"
            >
              {data.hero?.ctaText || data.navCtaText || 'PLANIFICA TU VISITA'}
            </a>
          </nav>
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
              {hero.ctaText || 'PLAN A VISIT'}
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
              {planAVisit.ctaText || 'PLAN A VISIT'}
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
                  {nucleusColumns.col1.eyebrow || 'Meet Our Team'}
                </div>
                <h3
                  data-field="nucleusColumns.col1.title"
                  data-ovkey="nucleusColumns.col1.title"
                  className="editable-element"
                  onClick={(e) => handleEdit(e, 'nucleusColumns.col1.title', 'Título Columna 1', 'text', nucleusColumns.col1.title)}
                  style={{ fontSize: 'clamp(2.4rem, 4vw, 3.4rem)', fontWeight: 900, color: '#FFFFFF', margin: '0 0 20px', letterSpacing: '-0.02em', lineHeight: 1.1, ...ost('nucleusColumns.col1.title') }}
                >
                  {nucleusColumns.col1.title || 'Leaders & Staff'}
                </h3>
                <p
                  data-field="nucleusColumns.col1.description"
                  data-ovkey="nucleusColumns.col1.description"
                  className="editable-element"
                  onClick={(e) => handleEdit(e, 'nucleusColumns.col1.description', 'Descripción Columna 1', 'textarea', nucleusColumns.col1.description)}
                  style={{ fontSize: '1.1rem', lineHeight: 1.7, color: 'rgba(255, 255, 255, 0.85)', margin: '0 0 32px', maxWidth: 560, fontFamily: 'Georgia, serif', ...ost('nucleusColumns.col1.description') }}
                >
                  {nucleusColumns.col1.description || nucleusColumns.col1.text || 'Our dedicated team of pastors and staff are here to provide spiritual guidance and support - as well as resources to help you on your faith journey.'}
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
                  {nucleusColumns.col2.eyebrow || 'Our Calendar'}
                </div>
                <h3
                  data-field="nucleusColumns.col2.title"
                  data-ovkey="nucleusColumns.col2.title"
                  className="editable-element"
                  onClick={(e) => handleEdit(e, 'nucleusColumns.col2.title', 'Título Columna 2', 'text', nucleusColumns.col2.title)}
                  style={{ fontSize: 'clamp(2.4rem, 4vw, 3.4rem)', fontWeight: 900, color: '#FFFFFF', margin: '0 0 20px', letterSpacing: '-0.02em', lineHeight: 1.1, ...ost('nucleusColumns.col2.title') }}
                >
                  {nucleusColumns.col2.title || "See What's Happening"}
                </h3>
                <p
                  data-field="nucleusColumns.col2.text"
                  data-ovkey="nucleusColumns.col2.text"
                  className="editable-element"
                  onClick={(e) => handleEdit(e, 'nucleusColumns.col2.text', 'Texto Columna 2', 'textarea', nucleusColumns.col2.text)}
                  style={{ fontSize: '1.1rem', lineHeight: 1.7, color: 'rgba(255, 255, 255, 0.85)', margin: '0 0 32px', maxWidth: 560, fontFamily: 'Georgia, serif', ...ost('nucleusColumns.col2.text') }}
                >
                  {nucleusColumns.col2.text || "Check out this month's events to find out what's happening and how you can be involved. Explore the full list of upcoming ministries and services."}
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
              onClick={(e) => handleEdit(e, 'nextSteps.eyebrow', 'Etiqueta Próximos Pasos', 'text', data.nextSteps?.eyebrow || 'Get Involved')}
              style={{ fontSize: '0.9rem', fontWeight: 700, color: '#000000', letterSpacing: '-0.01em', marginBottom: 20, ...ost('nextSteps.eyebrow') }}
            >
              {data.nextSteps?.eyebrow || 'Get Involved'}
            </div>

            <h2
              data-field="nextSteps.title"
              data-ovkey="nextSteps.title"
              className="editable-element"
              onClick={(e) => handleEdit(e, 'nextSteps.title', 'Título Próximos Pasos', 'text', data.nextSteps?.title || 'Next Steps')}
              style={{ fontSize: 'clamp(2.8rem, 5.5vw, 4.2rem)', fontWeight: 900, color: '#000000', margin: '0 0 24px', letterSpacing: '-0.03em', lineHeight: 1.05, ...ost('nextSteps.title') }}
            >
              {data.nextSteps?.title || 'Next Steps'}
            </h2>

            <p
              data-field="nextSteps.subtitle"
              data-ovkey="nextSteps.subtitle"
              className="editable-element"
              onClick={(e) => handleEdit(e, 'nextSteps.subtitle', 'Subtítulo Próximos Pasos', 'textarea', data.nextSteps?.subtitle || 'Explore the life of our church including our vibrant ministries, upcoming events, and service opportunities.')}
              style={{ fontSize: '1.15rem', lineHeight: 1.7, color: '#222222', margin: '0 0 40px', maxWidth: 520, fontFamily: 'Georgia, serif', ...ost('nextSteps.subtitle') }}
            >
              {data.nextSteps?.subtitle || 'Explore the life of our church including our vibrant ministries, upcoming events, and service opportunities.'}
            </p>

            <a
              data-field="nextSteps.ctaText"
              data-ovkey="nextSteps.ctaText"
              href="#wp-contact"
              onClick={(e) => handleNavClick(e, '#wp-contact', 'nextSteps.ctaText', 'Texto Botón Próximos Pasos', data.nextSteps?.ctaText || 'TAKE YOUR NEXT STEP')}
              className="poster-btn-primary editable-element"
              style={{ padding: '18px 40px', borderRadius: 8, textDecoration: 'none', fontSize: '0.85rem', fontWeight: 900, letterSpacing: '0.06em', textTransform: 'uppercase', ...ost('nextSteps.ctaText') }}
            >
              {data.nextSteps?.ctaText || 'TAKE YOUR NEXT STEP'}
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
              <h4 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#FFFFFF', marginBottom: 20 }}>Visita & Comunidad</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, fontSize: '0.95rem', color: '#A1A1AA' }}>
                <div>Plan Your Visit</div>
                <div>Leaders & Staff</div>
                <div>Next Steps</div>
                <div>Prayer Support</div>
              </div>
            </div>

            <div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#FFFFFF', marginBottom: 20 }}>Recursos & Redes</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, fontSize: '0.95rem', color: '#A1A1AA' }}>
                <div>Sermones</div>
                <div>Calendario</div>
                <div>Instagram</div>
                <div>YouTube</div>
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
