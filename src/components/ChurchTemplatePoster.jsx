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
    ...(ov(k).height ? { height: ov(k).height } : {}),
    ...(ov(k).margin ? { margin: ov(k).margin } : {}),
    ...(ov(k).transform ? { transform: ov(k).transform } : {}),
    ...(ov(k).borderRadius ? { borderRadius: ov(k).borderRadius } : {}),
    ...(ov(k).objectFit ? { objectFit: ov(k).objectFit } : {}),
    ...(ov(k).filter ? { filter: ov(k).filter } : {}),
    ...(isActive(k) ? {
      position: 'relative',
      outline: '3px dashed #6366F1',
      outlineOffset: '4px',
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
    eyebrow: 'DOMINGOS 10:30 A.M.',
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
      title: 'Líderes & Pastores',
      text: 'Nuestro dedicado equipo de pastores y servidores está aquí para brindarte guía espiritual, apoyo y recursos para acompañarte en tu caminar de fe.',
      image: 'https://images.unsplash.com/photo-1477281765962-ef34e8bb0967?w=1000&q=85&fit=crop',
      ctaText: 'NUESTRO EQUIPO',
      ctaLink: '#wp-contact',
      ...(rawCols.col1 || {})
    },
    col2: {
      eyebrow: 'Nuestro Calendario',
      title: 'Descubre Lo Que Está Pasando',
      text: 'Explora las actividades y eventos de este mes para descubrir todo lo que está sucediendo y cómo puedes participar junto a tu familia.',
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
  const primaryBg = data.primaryColor || '#000000'
  const accentIndigo = data.accentColor || '#4F46E5'

  return (
    <div style={{ fontFamily: `'${activeFont}', 'Inter', sans-serif`, color: '#111827', background: primaryBg, minHeight: '100vh', width: '100%', overflowX: 'hidden' }}>
      <link rel="stylesheet" href={`https://fonts.googleapis.com/css2?family=${encodeURIComponent(activeFont.replace(/'/g, ''))}:wght@400;500;600;700;800;900&display=swap`} />
      
      {/* ── 1. NAVBAR / HEADER 100% EN ESPAÑOL DE GATEWAY ── */}
      <header style={{ position: 'sticky', top: 0, zIndex: 100, background: '#000000', borderBottom: '1px solid rgba(255,255,255,0.1)', width: '100%' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto', padding: '18px 5%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
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
                  style={{ width: 42, height: 42, borderRadius: '50%', border: '2.5px solid #FFFFFF', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1.2rem', cursor: editMode ? 'pointer' : 'default', ...ost('logoImage') }}
                >
                  G
                </div>
                <span
                  data-field="businessName"
                  data-ovkey="businessName"
                  className="editable-element"
                  onClick={(e) => handleEdit(e, 'businessName', 'Nombre de la Iglesia', 'text', businessName)}
                  style={{ fontSize: '1.4rem', fontWeight: 900, color: '#FFFFFF', letterSpacing: '-0.02em', ...ost('businessName') }}
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
              { text: nav.item3 || 'Ministerios', href: '#wp-ministries' },
              { text: nav.item4 || 'Líderes & Equipo', href: '#wp-columns' },
              { text: nav.item5 || 'Próximos Pasos', href: '#wp-contact' },
            ]).map((item, idx) => {
              const itemLabel = item.text || item.label || 'Link'
              return (
                <a
                  key={idx}
                  data-field={`navLinks.${idx}.text`}
                  data-ovkey={`navLinks.${idx}.text`}
                  href={item.href || '#wp-hero'}
                  onClick={(e) => handleNavClick(e, item.href || '#wp-hero', `navLinks.${idx}.text`, `Menú: ${itemLabel}`, itemLabel)}
                  style={{ color: '#E5E7EB', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 700, ...ost(`navLinks.${idx}.text`) }}
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
              onClick={(e) => handleNavClick(e, data.hero?.ctaLink || data.navCtaLink || '#wp-plan-visit', 'hero.ctaText', 'Botón Navbar Visítanos', data.hero?.ctaText || data.navCtaText || 'Planifica tu Visita')}
              style={{ background: '#FFFFFF', color: '#000000', padding: '8px 20px', borderRadius: 999, textDecoration: 'none', fontSize: '0.85rem', fontWeight: 800, ...ost('hero.ctaText') }}
              className="editable-element"
            >
              {data.hero?.ctaText || data.navCtaText || 'Planifica tu Visita'}
            </a>
          </nav>
        </div>
      </header>

      {/* ── 2. HERO TOTALMENTE OSCURO CON TITULAR EN ESPAÑOL Y PALABRA SUBRAYADA ── */}
      {data.sectionsVisibility?.hero !== false && (
      <section id="wp-hero" style={{ position: 'relative', width: '100%', minHeight: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000000', overflow: 'hidden' }}>
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
            style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.45)' }}
          />
          {editMode && (
            <div style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(99,102,241,0.9)', color: '#fff', fontSize: '0.72rem', fontWeight: 800, padding: '4px 12px', borderRadius: 999, backdropFilter: 'blur(8px)', letterSpacing: '0.04em', pointerEvents: 'none' }}>
              📷 Clic para cambiar foto de portada
            </div>
          )}
        </div>
        
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 100%)', zIndex: 2, pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 10, maxWidth: 900, textAlign: 'center', padding: '100px 5%', color: '#FFFFFF' }}>
          <div
            data-field="hero.eyebrow"
            data-ovkey="hero.eyebrow"
            className="editable-element"
            onClick={(e) => handleEdit(e, 'hero.eyebrow', 'Horario (Eyebrow Superior)', 'text', hero.eyebrow || 'DOMINGOS 10:30 A.M.')}
            style={{ fontSize: '0.85rem', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.85)', marginBottom: 28, ...ost('hero.eyebrow') }}
          >
            {hero.eyebrow || 'DOMINGOS 10:30 A.M.'}
            {rdh('hero.eyebrow')}
          </div>
          <h1
            data-field="hero.headline"
            data-ovkey="hero.headline"
            className="editable-element"
            onClick={(e) => handleEdit(e, 'hero.headline', 'Título Principal', 'text', `${hero.headlinePrefix || ''}${hero.headlineKeyword || ''}${hero.headlineSuffix || ''}`)}
            style={{ fontSize: 'clamp(2.8rem, 6.5vw, 5.2rem)', fontWeight: 900, lineHeight: 1.1, margin: '0 0 40px', letterSpacing: '-0.03em', ...ost('hero.headline') }}
          >
            <span className="editable-element" onClick={(e) => handleEdit(e, 'hero.headlinePrefix', 'Prefijo del Título', 'text', hero.headlinePrefix || 'Encuentra a ')}>
              {hero.headlinePrefix || 'Encuentra a '}
            </span>
            <span style={{ borderBottom: '4px solid #FFFFFF', paddingBottom: 6 }}>
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
            style={{ color: '#E5E7EB', fontSize: '1.25rem', margin: '0 0 36px', ...ost('hero.subheadline') }}
          >
            {hero.subheadline || 'Bienvenidos a casa. Descubre un lugar donde pertenecer.'}
          </p>

          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              data-field="hero.ctaText"
              data-ovkey="hero.ctaText"
              href={hero.ctaLink || '#wp-plan-visit'}
              className="editable-element"
              onClick={(e) => handleNavClick(e, '#wp-plan-visit', 'hero.ctaText', 'Texto Botón Principal', hero.ctaText)}
              style={{ padding: '15px 42px', background: '#FFFFFF', color: '#000000', borderRadius: 999, textDecoration: 'none', fontSize: '0.9rem', fontWeight: 900, letterSpacing: '0.04em', ...ost('hero.ctaText') }}
            >
              {hero.ctaText || 'PLANIFICA TU VISITA'}
              {rdh('hero.ctaText')}
            </a>
            <a
              data-field="hero.ctaSecondary"
              data-ovkey="hero.ctaSecondary"
              href={hero.ctaSecondaryLink || '#wp-contact'}
              className="editable-element"
              onClick={(e) => handleNavClick(e, '#wp-contact', 'hero.ctaSecondary', 'Texto Botón Secundario', hero.ctaSecondary)}
              style={{ padding: '15px 42px', background: 'transparent', color: '#FFFFFF', border: '2px solid #FFFFFF', borderRadius: 999, textDecoration: 'none', fontSize: '0.9rem', fontWeight: 900, letterSpacing: '0.04em', ...ost('hero.ctaSecondary') }}
            >
              {hero.ctaSecondary || 'INVOLÚCRATE'}
              {rdh('hero.ctaSecondary')}
            </a>
          </div>
        </div>
      </section>
      )}

      {/* ── 3. BLOQUE BLANCO CENTRADO "BUSCANDO A DIOS JUNTOS" ── */}
      {data.sectionsVisibility?.missionBlock !== false && (
      <section id="wp-mission" style={{ width: '100%', background: '#FFFFFF', padding: '120px 8%', boxSizing: 'border-box' }}>
        <div style={{ maxWidth: 840, margin: '0 auto', textAlign: 'center' }}>
          <h2
            data-field="missionBlock.title"
            data-ovkey="missionBlock.title"
            className="editable-element"
            onClick={(e) => handleEdit(e, 'missionBlock.title', 'Título Sección Misión', 'text', missionBlock.title)}
            style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)', fontWeight: 900, color: '#000000', margin: '0 0 28px', letterSpacing: '-0.03em', ...ost('missionBlock.title') }}
          >
            {missionBlock.title}
          </h2>

          <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.25rem', lineHeight: 1.85, color: '#111827', margin: '0 0 44px', display: 'flex', flexDirection: 'column', gap: 20 }}>
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
            <p
              data-field="missionBlock.text3"
              data-ovkey="missionBlock.text3"
              className="editable-element"
              onClick={(e) => handleEdit(e, 'missionBlock.text3', 'Párrafo Misión 3', 'textarea', missionBlock.text3)}
              style={{ ...ost('missionBlock.text3') }}
            >
              {missionBlock.text3}
            </p>
          </div>

          <a
            data-field="missionBlock.ctaText"
            data-ovkey="missionBlock.ctaText"
            href={missionBlock.ctaLink || '#wp-plan-visit'}
            className="editable-element"
            onClick={(e) => handleNavClick(e, '#wp-plan-visit', 'missionBlock.ctaText', 'Texto Botón Misión', missionBlock.ctaText)}
            style={{ display: 'inline-block', padding: '16px 48px', background: '#000000', color: '#FFFFFF', borderRadius: 999, textDecoration: 'none', fontSize: '0.85rem', fontWeight: 900, letterSpacing: '0.06em', ...ost('missionBlock.ctaText') }}
          >
            {missionBlock.ctaText || 'SOBRE NOSOTROS'}
          </a>
        </div>
      </section>
      )}

      {/* ── 4. SECCIÓN SPLIT 50/50 PLANIFICA TU VISITA ── */}
      {data.sectionsVisibility?.planAVisit !== false && (
      <section id="wp-plan-visit" style={{ width: '100%', margin: 0, padding: 0, background: '#FFFFFF', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', alignItems: 'stretch' }}>
        <div
          data-field="planAVisit.image"
          data-ovkey="planAVisit.image"
          className="editable-element"
          onClick={(e) => handleEdit(e, 'planAVisit.image', 'Foto Sección Visítanos', 'image', planAVisit.image)}
          style={{ minHeight: 560, position: 'relative', overflow: 'hidden', cursor: editMode ? 'pointer' : 'default', ...ost('planAVisit.image') }}
        >
          <img
            src={planAVisit.image}
            alt="Planifica tu Visita"
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1200&q=85&fit=crop'
            }}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>

        <div style={{ padding: '100px 10%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', background: '#FFFFFF', color: '#000000' }}>
          <div
            data-field="planAVisit.eyebrow"
            data-ovkey="planAVisit.eyebrow"
            className="editable-element"
            onClick={(e) => handleEdit(e, 'planAVisit.eyebrow', 'Etiqueta Horarios', 'text', planAVisit.eyebrow)}
            style={{ fontSize: '0.9rem', fontWeight: 700, color: '#111827', marginBottom: 18, ...ost('planAVisit.eyebrow') }}
          >
            {planAVisit.eyebrow}
          </div>
          <h2
            data-field="planAVisit.title"
            data-ovkey="planAVisit.title"
            className="editable-element"
            onClick={(e) => handleEdit(e, 'planAVisit.title', 'Título Visítanos', 'text', planAVisit.title)}
            style={{ fontSize: 'clamp(2.5rem, 4.5vw, 3.8rem)', fontWeight: 900, color: '#000000', margin: '0 0 24px', letterSpacing: '-0.03em', lineHeight: 1.1, ...ost('planAVisit.title') }}
          >
            {planAVisit.title}
          </h2>
          <p
            data-field="planAVisit.subtitle"
            data-ovkey="planAVisit.subtitle"
            className="editable-element"
            onClick={(e) => handleEdit(e, 'planAVisit.subtitle', 'Descripción Visítanos', 'textarea', planAVisit.subtitle)}
            style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.2rem', lineHeight: 1.8, color: '#111827', margin: '0 0 36px', maxWidth: 520, ...ost('planAVisit.subtitle') }}
          >
            {planAVisit.subtitle}
          </p>

          <a
            data-field="planAVisit.ctaText"
            data-ovkey="planAVisit.ctaText"
          style={{ display: 'inline-block', padding: '16px 44px', background: '#000000', color: '#FFFFFF', borderRadius: 999, textDecoration: 'none', fontSize: '0.85rem', fontWeight: 900, letterSpacing: '0.06em', ...ost('planAVisit.ctaText') }}
          >
            {planAVisit.ctaText || 'PLANIFICA TU VISITA'}
          </a>
        </div>
      </section>
      )}

      {/* ── 5. SECCIÓN BLOQUE 2 COLUMNAS (LÍDERES Y CALENDARIO) ── */}
      {data.sectionsVisibility?.nucleusColumns !== false && (
      <section id="wp-columns" style={{ width: '100%', background: '#FFFFFF', padding: '100px 5%', boxSizing: 'border-box' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 40 }}>
          {/* Column 1 */}
          <div style={{ background: '#000000', color: '#FFFFFF', display: 'flex', flexDirection: 'column' }}>
            <div
              data-field="nucleusColumns.col1.image"
              data-ovkey="nucleusColumns.col1.image"
              className="editable-element"
              onClick={(e) => handleEdit(e, 'nucleusColumns.col1.image', 'Foto Columna 1', 'image', nucleusColumns.col1.image)}
              style={{ height: 320, position: 'relative', overflow: 'hidden', cursor: editMode ? 'pointer' : 'default', ...ost('nucleusColumns.col1.image') }}
            >
              <img
                src={nucleusColumns.col1.image || 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=1000&q=85&fit=crop'}
                alt="Columna 1"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=1000&q=85&fit=crop'
                }}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
            <div style={{ padding: '48px 40px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div
                  data-field="nucleusColumns.col1.eyebrow"
                  data-ovkey="nucleusColumns.col1.eyebrow"
                  className="editable-element"
                  onClick={(e) => handleEdit(e, 'nucleusColumns.col1.eyebrow', 'Etiqueta Columna 1', 'text', nucleusColumns.col1.eyebrow)}
                  style={{ fontSize: '0.78rem', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#9CA3AF', marginBottom: 16, ...ost('nucleusColumns.col1.eyebrow') }}
                >
                  {nucleusColumns.col1.eyebrow || 'EQUIPO PASTORAL'}
                </div>
                <h3
                  data-field="nucleusColumns.col1.title"
                  data-ovkey="nucleusColumns.col1.title"
                  className="editable-element"
                  onClick={(e) => handleEdit(e, 'nucleusColumns.col1.title', 'Título Columna 1', 'text', nucleusColumns.col1.title)}
                  style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 900, color: '#FFFFFF', margin: '0 0 20px', letterSpacing: '-0.02em', lineHeight: 1.1, ...ost('nucleusColumns.col1.title') }}
                >
                  {nucleusColumns.col1.title || 'Conoce a Nuestros Líderes y Pastores'}
                </h3>
                <p
                  data-field="nucleusColumns.col1.description"
                  data-ovkey="nucleusColumns.col1.description"
                  className="editable-element"
                  onClick={(e) => handleEdit(e, 'nucleusColumns.col1.description', 'Descripción Columna 1', 'textarea', nucleusColumns.col1.description)}
                  style={{ fontSize: '1.05rem', lineHeight: 1.7, color: '#D1D5DB', margin: '0 0 36px', ...ost('nucleusColumns.col1.description') }}
                >
                  {nucleusColumns.col1.description || nucleusColumns.col1.text || 'Un equipo comprometido con guiar, servir y acompañar a nuestra comunidad.'}
                </p>
              </div>

              <a
                data-field="nucleusColumns.col1.ctaText"
                data-ovkey="nucleusColumns.col1.ctaText"
                href={nucleusColumns.col1.ctaLink || '#wp-contact'}
                className="editable-element"
                onClick={(e) => handleNavClick(e, '#wp-contact', 'nucleusColumns.col1.ctaText', 'Texto Botón Columna 1', nucleusColumns.col1.ctaText)}
                style={{ display: 'inline-block', padding: '16px 40px', background: '#FFFFFF', color: '#000000', borderRadius: 999, textDecoration: 'none', fontSize: '0.82rem', fontWeight: 900, letterSpacing: '0.06em', ...ost('nucleusColumns.col1.ctaText') }}
              >
                {nucleusColumns.col1.ctaText || 'NUESTRO EQUIPO'}
              </a>
            </div>
          </div>

          {/* Column 2 */}
          <div style={{ background: '#000000', color: '#FFFFFF', display: 'flex', flexDirection: 'column' }}>
            <div
              data-field="nucleusColumns.col2.image"
              data-ovkey="nucleusColumns.col2.image"
              className="editable-element"
              onClick={(e) => handleEdit(e, 'nucleusColumns.col2.image', 'Foto Columna 2', 'image', nucleusColumns.col2.image)}
              style={{ position: 'relative', height: 320, overflow: 'hidden', cursor: editMode ? 'pointer' : 'default', ...ost('nucleusColumns.col2.image') }}
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
            <div style={{ padding: '60px 48px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div
                  data-field="nucleusColumns.col2.eyebrow"
                  data-ovkey="nucleusColumns.col2.eyebrow"
                  className="editable-element"
                  onClick={(e) => handleEdit(e, 'nucleusColumns.col2.eyebrow', 'Etiqueta Columna 2', 'text', nucleusColumns.col2.eyebrow)}
                  style={{ fontSize: '0.85rem', fontWeight: 700, color: '#E5E7EB', marginBottom: 16, ...ost('nucleusColumns.col2.eyebrow') }}
                >
                  {nucleusColumns.col2.eyebrow}
                </div>
                <h3
                  data-field="nucleusColumns.col2.title"
                  data-ovkey="nucleusColumns.col2.title"
                  className="editable-element"
                  onClick={(e) => handleEdit(e, 'nucleusColumns.col2.title', 'Título Columna 2', 'text', nucleusColumns.col2.title)}
                  style={{ fontSize: 'clamp(2.2rem, 3.5vw, 3rem)', fontWeight: 900, color: '#FFFFFF', margin: '0 0 20px', letterSpacing: '-0.03em', ...ost('nucleusColumns.col2.title') }}
                >
                  {nucleusColumns.col2.title}
                </h3>
                <p
                  data-field="nucleusColumns.col2.text"
                  data-ovkey="nucleusColumns.col2.text"
                  className="editable-element"
                  onClick={(e) => handleEdit(e, 'nucleusColumns.col2.text', 'Texto Columna 2', 'textarea', nucleusColumns.col2.text)}
                  style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.15rem', lineHeight: 1.8, color: '#D1D5DB', margin: '0 0 36px', ...ost('nucleusColumns.col2.text') }}
                >
                  {nucleusColumns.col2.text}
                </p>
              </div>

              <a
                data-field="nucleusColumns.col2.ctaText"
                data-ovkey="nucleusColumns.col2.ctaText"
                href={nucleusColumns.col2.ctaLink || '#wp-contact'}
                className="editable-element"
                onClick={(e) => handleNavClick(e, '#wp-contact', 'nucleusColumns.col2.ctaText', 'Texto Botón Columna 2', nucleusColumns.col2.ctaText)}
                style={{ display: 'inline-block', padding: '16px 40px', background: '#FFFFFF', color: '#000000', borderRadius: 999, textDecoration: 'none', fontSize: '0.82rem', fontWeight: 900, letterSpacing: '0.06em', ...ost('nucleusColumns.col2.ctaText') }}
              >
                {nucleusColumns.col2.ctaText || 'NUESTRO CALENDARIO'}
              </a>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* ── 5.1 BIENVENIDA A CASA ── */}
      <section id="wp-welcome" style={{ width: '100%', background: '#090A0F', padding: '100px 8%', boxSizing: 'border-box', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
          <div data-field="welcome.label" data-ovkey="welcome.label" className="editable-element" onClick={(e) => handleEdit(e, 'welcome.label', 'Etiqueta Bienvenida', 'text', data.welcome?.label || 'BIENVENIDO A CASA')} style={{ fontSize: '0.8rem', fontWeight: 800, color: accentIndigo, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 16, ...ost('welcome.label') }}>
            {data.welcome?.label || 'BIENVENIDO A CASA'}
          </div>
          <h2 data-field="welcome.title" data-ovkey="welcome.title" className="editable-element" onClick={(e) => handleEdit(e, 'welcome.title', 'Título Bienvenida', 'text', data.welcome?.title || 'Una comunidad apasionada por Jesús.')} style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)', fontWeight: 900, color: '#FFFFFF', margin: '0 0 24px', letterSpacing: '-0.03em', lineHeight: 1.1, ...ost('welcome.title') }}>
            {data.welcome?.title || 'Una comunidad apasionada por Jesús.'}
          </h2>
          <p data-field="welcome.text" data-ovkey="welcome.text" className="editable-element" onClick={(e) => handleEdit(e, 'welcome.text', 'Mensaje Pastoral', 'textarea', data.welcome?.text || 'Aquí hay un lugar para ti y tu familia.')} style={{ fontSize: '1.125rem', color: '#9CA3AF', lineHeight: 1.7, margin: '0 0 36px', maxWidth: 800, marginLeft: 'auto', marginRight: 'auto', ...ost('welcome.text') }}>
            {data.welcome?.text || 'Aquí hay un lugar para ti y tu familia.'}
          </p>
        </div>
      </section>

      {/* ── 5.2 VALORES & FUNDAMENTOS ── */}
      <section id="wp-values" style={{ width: '100%', background: '#000000', padding: '100px 8%', boxSizing: 'border-box' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 60px' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 800, color: accentIndigo, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 12 }}>FUNDAMENTOS DE FE</div>
            <h2 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)', fontWeight: 900, color: '#FFFFFF', margin: 0, letterSpacing: '-0.03em' }}>Nuestros Valores</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 32 }}>
            {(data.values || [
              { icon: 'heart', title: 'Amor Incondicional', text: 'Recibimos a cada persona con gracia y calidez.' },
              { icon: 'users', title: 'Comunidad Auténtica', text: 'Crecemos juntos a través de grupos de amistad.' },
              { icon: 'book', title: 'Verdad Bíblica', text: 'Enseñanza práctica basada en la Palabra de Dios.' },
              { icon: 'globe', title: 'Impacto y Misión', text: 'Servimos con generosidad a nuestra ciudad.' }
            ]).map((val, idx) => (
              <div key={idx} style={{ background: '#090A0F', borderRadius: 16, padding: '32px 24px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ color: accentIndigo, fontSize: '1.8rem', marginBottom: 16 }}>✦</div>
                <h3 data-field={`values.${idx}.title`} data-ovkey={`values.${idx}.title`} className="editable-element" onClick={(e) => handleEdit(e, `values.${idx}.title`, `Título Valor ${idx+1}`, 'text', val.title)} style={{ fontSize: '1.3rem', fontWeight: 900, color: '#FFFFFF', margin: '0 0 12px', ...ost(`values.${idx}.title`) }}>
                  {val.title}
                </h3>
                <p data-field={`values.${idx}.text`} data-ovkey={`values.${idx}.text`} className="editable-element" onClick={(e) => handleEdit(e, `values.${idx}.text`, `Texto Valor ${idx+1}`, 'textarea', val.text)} style={{ fontSize: '0.95rem', color: '#9CA3AF', lineHeight: 1.6, margin: 0, ...ost(`values.${idx}.text`) }}>
                  {val.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5.3 MINISTERIOS ── */}
      {data.sectionsVisibility?.ministries !== false && (
      <section id="wp-ministries" style={{ width: '100%', background: '#090A0F', padding: '100px 8%', boxSizing: 'border-box' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 60px' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 800, color: accentIndigo, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 12 }}>MINISTERIOS</div>
            <h2 data-field="ministriesTitle" data-ovkey="ministriesTitle" className="editable-element" onClick={(e) => handleEdit(e, 'ministriesTitle', 'Título Ministerios', 'text', data.ministriesTitle || 'Nuestros Ministerios')} style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)', fontWeight: 900, color: '#FFFFFF', margin: '0 0 16px', ...ost('ministriesTitle') }}>
              {data.ministriesTitle || 'Nuestros Ministerios'}
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32 }}>
            {(data.ministries || [
              { name: 'KidZone (Niños)', ageRange: '0 a 12 años', description: 'Espacio seguro y divertido.', image: 'https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?w=800&q=85&fit=crop' },
              { name: 'Jóvenes', ageRange: '13 a 25 años', description: 'Comunidad vibrante.', image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=85&fit=crop' }
            ]).map((m, idx) => (
              <div key={idx} style={{ background: '#000000', borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div data-field={`ministries.${idx}.image`} data-ovkey={`ministries.${idx}.image`} className="editable-element" onClick={(e) => handleEdit(e, `ministries.${idx}.image`, `Foto Ministerio ${idx+1}`, 'image', m.image)} style={{ height: 200, position: 'relative', overflow: 'hidden', ...ost(`ministries.${idx}.image`) }}>
                  <img src={m.image || 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&q=85&fit=crop'} alt={m.name || m.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: 24 }}>
                  <h3 data-field={`ministries.${idx}.name`} data-ovkey={`ministries.${idx}.name`} className="editable-element" onClick={(e) => handleEdit(e, `ministries.${idx}.name`, `Nombre Ministerio ${idx+1}`, 'text', m.name || m.title)} style={{ fontSize: '1.35rem', fontWeight: 900, color: '#FFFFFF', margin: '0 0 10px', ...ost(`ministries.${idx}.name`) }}>
                    {m.name || m.title}
                  </h3>
                  <p data-field={`ministries.${idx}.description`} data-ovkey={`ministries.${idx}.description`} className="editable-element" onClick={(e) => handleEdit(e, `ministries.${idx}.description`, `Descripción Ministerio ${idx+1}`, 'textarea', m.description || m.desc)} style={{ fontSize: '0.92rem', color: '#9CA3AF', margin: 0, ...ost(`ministries.${idx}.description`) }}>
                    {m.description || m.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* ── 5.4 PRÓXIMOS PASOS ── */}
      {data.sectionsVisibility?.nextSteps !== false && (
      <section id="wp-next-steps" style={{ width: '100%', background: '#000000', padding: '100px 8%', boxSizing: 'border-box' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 60px' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 800, color: accentIndigo, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 12 }}>CRECIMIENTO ESPIRITUAL</div>
            <h2 data-field="nextSteps.title" data-ovkey="nextSteps.title" className="editable-element" onClick={(e) => handleEdit(e, 'nextSteps.title', 'Título Próximos Pasos', 'text', data.nextSteps?.title || 'Tus Próximos Pasos en la Fe')} style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)', fontWeight: 900, color: '#FFFFFF', margin: '0 0 16px', ...ost('nextSteps.title') }}>
              {data.nextSteps?.title || 'Tus Próximos Pasos en la Fe'}
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32 }}>
            {(data.nextSteps?.steps || [
              { title: '1. Creer & Conocer a Jesús', description: 'Descubre el amor de Dios.' },
              { title: '2. Conectar en Comunidad', description: 'Participa en grupos semanales.' },
              { title: '3. Servir', description: 'Bendice a otros uniéndote a un equipo.' }
            ]).map((st, idx) => (
              <div key={idx} style={{ background: '#090A0F', borderRadius: 16, padding: 32, border: '1px solid rgba(255,255,255,0.1)' }}>
                <h3 data-field={`nextSteps.steps.${idx}.title`} data-ovkey={`nextSteps.steps.${idx}.title`} className="editable-element" onClick={(e) => handleEdit(e, `nextSteps.steps.${idx}.title`, `Paso ${idx+1} Título`, 'text', st.title)} style={{ fontSize: '1.3rem', color: '#FFFFFF', margin: '0 0 12px', ...ost(`nextSteps.steps.${idx}.title`) }}>
                  {st.title}
                </h3>
                <p data-field={`nextSteps.steps.${idx}.description`} data-ovkey={`nextSteps.steps.${idx}.description`} className="editable-element" onClick={(e) => handleEdit(e, `nextSteps.steps.${idx}.description`, `Paso ${idx+1} Descripción`, 'textarea', st.description)} style={{ fontSize: '0.95rem', color: '#9CA3AF', margin: 0, ...ost(`nextSteps.steps.${idx}.description`) }}>
                  {st.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* ── 5.5 SERMONES ── */}
      {data.sectionsVisibility?.sermons !== false && (
      <section id="wp-sermons" style={{ width: '100%', background: '#090A0F', padding: '100px 8%', boxSizing: 'border-box' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 60px' }}>
            <h2 data-field="sermonsTitle" data-ovkey="sermonsTitle" className="editable-element" onClick={(e) => handleEdit(e, 'sermonsTitle', 'Título Prédicas', 'text', data.sermonsTitle || 'Mensajes Recientes')} style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)', fontWeight: 900, color: '#FFFFFF', margin: 0, ...ost('sermonsTitle') }}>
              {data.sermonsTitle || 'Mensajes Recientes'}
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32 }}>
            {(data.sermons || [
              { title: 'Caminando por Fe en Tiempos de Cambio', series: 'Serie: Imparables', speaker: 'Pastor Principal', image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=85&fit=crop' }
            ]).map((sermon, idx) => (
              <div key={idx} style={{ background: '#000000', borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div data-field={`sermons.${idx}.image`} data-ovkey={`sermons.${idx}.image`} className="editable-element" onClick={(e) => handleEdit(e, `sermons.${idx}.image`, `Foto Prédica ${idx+1}`, 'image', sermon.image)} style={{ height: 200, position: 'relative', overflow: 'hidden', ...ost(`sermons.${idx}.image`) }}>
                  <img src={sermon.image || 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=85&fit=crop'} alt={sermon.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: 24 }}>
                  <h3 data-field={`sermons.${idx}.title`} data-ovkey={`sermons.${idx}.title`} className="editable-element" onClick={(e) => handleEdit(e, `sermons.${idx}.title`, `Título Prédica ${idx+1}`, 'text', sermon.title)} style={{ fontSize: '1.25rem', fontWeight: 900, color: '#FFFFFF', margin: '0 0 10px', ...ost(`sermons.${idx}.title`) }}>
                    {sermon.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* ── 5.6 DONACIONES & OFRENDAS ── */}
      {data.sectionsVisibility?.donation !== false && (
      <section id="wp-donations" style={{ width: '100%', background: '#000000', padding: '100px 8%', boxSizing: 'border-box' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center', background: '#090A0F', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 24, padding: '50px 32px' }}>
          <h2 data-field="donation.title" data-ovkey="donation.title" className="editable-element" onClick={(e) => handleEdit(e, 'donation.title', 'Título Donaciones', 'text', data.donation?.title || 'Generosidad')} style={{ fontSize: 'clamp(2rem, 3.8vw, 3.2rem)', fontWeight: 900, color: '#FFFFFF', margin: '0 0 16px', ...ost('donation.title') }}>
            {data.donation?.title || 'Generosidad'}
          </h2>
          <p data-field="donation.subtitle" data-ovkey="donation.subtitle" className="editable-element" onClick={(e) => handleEdit(e, 'donation.subtitle', 'Subtítulo Donaciones', 'textarea', data.donation?.subtitle || 'Gracias a tu ofrenda podemos seguir extendiendo el mensaje de esperanza.')} style={{ fontSize: '1.05rem', color: '#9CA3AF', margin: '0 0 32px', ...ost('donation.subtitle') }}>
            {data.donation?.subtitle || 'Gracias a tu ofrenda podemos seguir extendiendo el mensaje de esperanza.'}
          </p>
          <a data-field="donation.ctaText" data-ovkey="donation.ctaText" href="#wp-contact" className="editable-element" onClick={(e) => handleNavClick(e, '#wp-contact', 'donation.ctaText', 'Botón Donaciones', data.donation?.ctaText || 'Ofrendar en Línea')} style={{ padding: '16px 36px', background: '#FFFFFF', color: '#000000', borderRadius: 999, textDecoration: 'none', fontSize: '0.9rem', fontWeight: 900, ...ost('donation.ctaText') }}>
            {data.donation?.ctaText || 'Ofrendar en Línea'}
          </a>
        </div>
      </section>
      )}

      {/* ── 5.7 PETICIÓN DE ORACIÓN ── */}
      {data.sectionsVisibility?.prayerRequest !== false && (
      <section id="wp-prayer" style={{ width: '100%', background: '#090A0F', padding: '100px 8%', boxSizing: 'border-box' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <h2 data-field="prayerRequest.title" data-ovkey="prayerRequest.title" className="editable-element" onClick={(e) => handleEdit(e, 'prayerRequest.title', 'Título Oración', 'text', data.prayerRequest?.title || '¿Podemos Orar por Ti?')} style={{ fontSize: 'clamp(2rem, 3.8vw, 3.2rem)', fontWeight: 900, color: '#FFFFFF', margin: '0 0 16px', ...ost('prayerRequest.title') }}>
            {data.prayerRequest?.title || '¿Podemos Orar por Ti?'}
          </h2>
          <div style={{ background: '#000000', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, padding: 32, textAlign: 'left' }}>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: '0.8rem', color: '#9CA3AF', fontWeight: 700, marginBottom: 6 }}>Tu Nombre</label>
              <input type="text" placeholder="Ej: Juan Pérez" style={{ width: '100%', padding: '12px 16px', borderRadius: 8, background: '#090A0F', border: '1px solid rgba(255,255,255,0.2)', color: '#FFFFFF', fontSize: '0.9rem' }} />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: '0.8rem', color: '#9CA3AF', fontWeight: 700, marginBottom: 6 }}>Tu Petición</label>
              <textarea rows={4} placeholder="Escribe tu motivo..." style={{ width: '100%', padding: '12px 16px', borderRadius: 8, background: '#090A0F', border: '1px solid rgba(255,255,255,0.2)', color: '#FFFFFF', fontSize: '0.9rem', resize: 'vertical' }} />
            </div>
            <button data-field="prayerRequest.ctaText" data-ovkey="prayerRequest.ctaText" className="editable-element" onClick={(e) => handleEdit(e, 'prayerRequest.ctaText', 'Texto Botón Oración', 'text', data.prayerRequest?.ctaText || 'Enviar Petición')} style={{ width: '100%', padding: '16px', background: '#FFFFFF', color: '#000000', borderRadius: 999, border: 'none', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 900, ...ost('prayerRequest.ctaText') }}>
              {data.prayerRequest?.ctaText || 'Enviar Petición'}
            </button>
          </div>
        </div>
      </section>
      )}

      {/* ── 5.8 SOBRE NOSOTROS ── */}
      {data.about && data.sectionsVisibility?.about !== false && (
        <section id="wp-about" style={{ width: '100%', background: '#000000', padding: '100px 8%', boxSizing: 'border-box' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 60, alignItems: 'center' }}>
            <div>
              <h2 data-field="about.title" data-ovkey="about.title" className="editable-element" onClick={(e) => handleEdit(e, 'about.title', 'Título Sobre Nosotros', 'text', data.about.title || 'Nuestra Historia')} style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)', fontWeight: 900, color: '#FFFFFF', margin: '0 0 20px', ...ost('about.title') }}>
                {data.about.title || 'Nuestra Historia'}
              </h2>
              <p data-field="about.text" data-ovkey="about.text" className="editable-element" onClick={(e) => handleEdit(e, 'about.text', 'Texto Sobre Nosotros', 'textarea', data.about.text)} style={{ fontSize: '1.05rem', color: '#9CA3AF', lineHeight: 1.7, margin: 0, ...ost('about.text') }}>
                {data.about.text}
              </p>
            </div>
            {data.aboutImage && (
              <div data-field="aboutImage" data-ovkey="aboutImage" className="editable-element" onClick={(e) => handleEdit(e, 'aboutImage', 'Foto Sobre Nosotros', 'image', data.aboutImage)} style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', height: 360, ...ost('aboutImage') }}>
                <img src={data.aboutImage} alt="Sobre Nosotros" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── 5.9 WIDGET FLOTANTE POP-UP ── */}
      {Boolean(data.floatingWidget?.enabled) && data.sectionsVisibility?.floatingWidget !== false && (
        <div id="wp-widget" style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 999, background: '#090A0F', border: '1.5px solid #FFFFFF', borderRadius: 20, padding: '20px 24px', maxWidth: 320, boxShadow: '0 10px 40px rgba(0,0,0,0.8)', color: '#FFF' }}>
          <div data-field="floatingWidget.title" data-ovkey="floatingWidget.title" className="editable-element" onClick={(e) => handleEdit(e, 'floatingWidget.title', 'Título Pop-up Flotante', 'text', data.floatingWidget.title || 'Planifica tu Visita')} style={{ fontWeight: 900, fontSize: '1.05rem', color: '#FFFFFF', marginBottom: 6, ...ost('floatingWidget.title') }}>
            {data.floatingWidget.title || 'Planifica tu Visita'}
          </div>
          <div data-field="floatingWidget.subtitle" data-ovkey="floatingWidget.subtitle" className="editable-element" onClick={(e) => handleEdit(e, 'floatingWidget.subtitle', 'Mensaje Pop-up', 'text', data.floatingWidget.subtitle || 'Domingos 9:00 AM & 11:00 AM')} style={{ fontSize: '0.85rem', color: '#9CA3AF', marginBottom: 14, ...ost('floatingWidget.subtitle') }}>
            {data.floatingWidget.subtitle || 'Domingos 9:00 AM & 11:00 AM'}
          </div>
          <a data-field="floatingWidget.ctaText" data-ovkey="floatingWidget.ctaText" href={data.floatingWidget.ctaLink || '#wp-plan-visit'} onClick={(e) => handleNavClick(e, data.floatingWidget.ctaLink || '#wp-plan-visit', 'floatingWidget.ctaText', 'Texto Botón Pop-up', data.floatingWidget.ctaText || 'Planifica tu Visita')} className="editable-element" style={{ display: 'block', textAlign: 'center', padding: '10px 18px', background: '#FFFFFF', color: '#000000', borderRadius: 999, textDecoration: 'none', fontSize: '0.8rem', fontWeight: 900, ...ost('floatingWidget.ctaText') }}>
            {data.floatingWidget.ctaText || 'Planifica tu Visita'}
          </a>
        </div>
      )}

      {/* ── 6. FOOTER 100% NEGRO 100% ESPAÑOL ── */}
      {data.sectionsVisibility?.contact !== false && (
      <footer id="wp-contact" style={{ width: '100%', background: '#000000', color: '#FFFFFF', padding: '100px 8% 60px', boxSizing: 'border-box', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 64, marginBottom: 80 }}>
          {/* Left Footer Info */}
          <div>
            <h2
              data-field="businessName"
              data-ovkey="businessName"
              className="editable-element"
              onClick={(e) => handleEdit(e, 'businessName', 'Nombre de la Iglesia', 'text', businessName)}
              style={{ fontSize: '2.5rem', fontWeight: 900, margin: '0 0 28px', letterSpacing: '-0.03em', ...ost('businessName') }}
            >
              {businessName}
            </h2>

            <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.1rem', color: '#E5E7EB', marginBottom: 32, display: 'flex', flexDirection: 'column', gap: 8 }}>
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
                style={{ padding: '14px 36px', background: '#FFFFFF', color: '#000000', borderRadius: 999, textDecoration: 'none', fontSize: '0.82rem', fontWeight: 900, letterSpacing: '0.06em', ...ost('contact.ctaPrimary') }}
              >
                {contact.ctaPrimary || 'ENVIAR MENSAJE'}
              </a>
              <a
                data-field="contact.ctaSecondary"
                data-ovkey="contact.ctaSecondary"
                href="#wp-contact"
                className="editable-element"
                onClick={(e) => handleEdit(e, 'contact.ctaSecondary', 'Texto Botón Footer 2', 'text', contact.ctaSecondary)}
                style={{ padding: '13px 36px', background: 'transparent', color: '#FFFFFF', border: '1.5px solid #FFFFFF', borderRadius: 999, textDecoration: 'none', fontSize: '0.82rem', fontWeight: 900, letterSpacing: '0.06em', ...ost('contact.ctaSecondary') }}
              >
                {contact.ctaSecondary || 'DA TU SIGUIENTE PASO'}
              </a>
            </div>

            <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.05rem', lineHeight: 1.8, color: '#9CA3AF' }}>
              <p
                data-field="contact.email"
                data-ovkey="contact.email"
                className="editable-element"
                onClick={(e) => handleEdit(e, 'contact.email', 'Correo Electrónico', 'text', contact.email)}
                style={{ ...ost('contact.email') }}
              >
                <a href={`mailto:${contact.email}`} style={{ color: '#FFFFFF', textDecoration: 'underline' }}>{contact.email}</a>
              </p>
              <p
                data-field="contact.phone"
                data-ovkey="contact.phone"
                className="editable-element"
                onClick={(e) => handleEdit(e, 'contact.phone', 'Teléfono', 'text', contact.phone)}
                style={{ ...ost('contact.phone') }}
              >
                <a href={`tel:${contact.phone}`} style={{ color: '#FFFFFF', textDecoration: 'underline' }}>{contact.phone}</a>
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

          {/* Right Footer Links Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 40, alignItems: 'flex-start' }}>
            <div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 900, marginBottom: 16 }}>Planifica tu Visita</h4>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 900, marginBottom: 16 }}>Líderes & Equipo</h4>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 900, marginBottom: 16 }}>Próximos Pasos</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: '0.95rem', color: '#9CA3AF', fontFamily: 'Playfair Display, serif' }}>
                <div>Oración</div>
                <div>Generosidad</div>
                <div>Niños & KidZone</div>
                <div>Jóvenes</div>
              </div>
            </div>

            <div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 900, marginBottom: 16 }}>Sobre Nosotros</h4>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 900, marginBottom: 16 }}>Calendario</h4>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 900, marginBottom: 16 }}>Redes Sociales</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: '0.95rem', color: '#9CA3AF', fontFamily: 'Playfair Display, serif' }}>
                <div>Facebook</div>
                <div>Instagram</div>
                <div>YouTube</div>
                <div>TikTok</div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Footer Sub-bar */}
        <div style={{ maxWidth: 1320, margin: '0 auto', paddingTop: 32, borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: '#6B7280' }}>
          <div>
            <span style={{ cursor: 'pointer' }}>Política de Cookies</span> • <span style={{ cursor: 'pointer' }}>Privacidad</span>
          </div>
          <div>
            Copyright 2026. {businessName}. Todos los Derechos Reservados.
          </div>
        </div>
      </footer>
      )}

      {/* ── FLOATING PRÓXIMOS PASOS WIDGET ── */}
      <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 999 }}>
        <button
          onClick={(e) => handleNavClick(e, '#wp-contact', 'nav.item5', 'Widget Próximos Pasos', 'Próximos Pasos')}
          style={{ width: 60, height: 60, borderRadius: '50%', background: '#262626', color: '#FFFFFF', border: '1px solid rgba(255,255,255,0.25)', fontWeight: 800, fontSize: '0.68rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 8px 30px rgba(0,0,0,0.5)', textAlign: 'center', lineHeight: 1.1 }}
        >
          <span>Próximos</span>
          <span>Pasos</span>
        </button>
      </div>

    </div>
  )
}
