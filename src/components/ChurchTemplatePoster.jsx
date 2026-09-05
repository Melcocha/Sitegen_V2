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
  const primaryBg = '#F8FAFC'
  const accentIndigo = data.accentColor || '#4F46E5'

  return (
    <div style={{ fontFamily: `'${activeFont}', 'Inter', sans-serif`, color: '#0F172A', background: primaryBg, minHeight: '100vh', width: '100%', overflowX: 'hidden' }}>
      <link rel="stylesheet" href={`https://fonts.googleapis.com/css2?family=${encodeURIComponent(activeFont.replace(/'/g, ''))}:wght@400;500;600;700;800;900&display=swap`} />
      <style>{`
        .editable-element {
          cursor: ${editMode ? 'pointer' : 'default'};
          transition: all 0.15s ease;
        }
        .editable-element:hover {
          ${editMode ? 'outline: 2px dashed #4F46E5; outline-offset: 4px;' : ''}
        }
        .poster-card {
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .poster-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(79, 70, 229, 0.1);
        }
        .poster-btn-primary {
          background: ${accentIndigo};
          color: #FFFFFF;
          transition: all 0.2s ease;
          box-shadow: 0 10px 25px rgba(79, 70, 229, 0.3);
        }
        .poster-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 30px rgba(79, 70, 229, 0.4);
          filter: brightness(1.08);
        }
      `}</style>

      {/* ── 1. NAVBAR / HEADER MODERNO CON CRISTAL TRANSLÚCIDO ── */}
      <header style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(255, 255, 255, 0.96)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #E2E8F0', width: '100%' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto', padding: '16px 5%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
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
                    maxHeight: ov('logoImage').maxHeight || 60,
                    maxWidth: ov('logoImage').maxWidth || 320,
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
                    style={{ width: 42, height: 42, borderRadius: 12, background: accentIndigo, color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1.2rem', cursor: editMode ? 'pointer' : 'default', boxShadow: '0 4px 14px rgba(79,70,229,0.3)', ...ost('logoImage') }}
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
                  style={{ fontSize: '1.35rem', fontWeight: 900, color: '#0F172A', letterSpacing: '-0.02em', ...ost('businessName') }}
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
                  style={{ color: '#475569', textDecoration: 'none', fontSize: '0.88rem', fontWeight: 700, transition: 'color 0.15s', ...ost(`navLinks.${idx}.text`) }}
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
              style={{ padding: '10px 24px', borderRadius: 999, textDecoration: 'none', fontSize: '0.85rem', fontWeight: 800, ...ost('hero.ctaText') }}
              className="poster-btn-primary editable-element"
            >
              {data.hero?.ctaText || data.navCtaText || 'Planifica tu Visita'}
            </a>
          </nav>
        </div>
      </header>

      {/* ── 2. HERO CON FOTO COMPLETA DE FONDO BIEN DISEÑADA (OPCIÓN 3) ── */}
      {data.sectionsVisibility?.hero !== false && (
      <section id="wp-hero" style={{ position: 'relative', width: '100%', minHeight: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        {/* Full background image - editable */}
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
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          {editMode && (
            <div style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(79,70,229,0.92)', color: '#fff', fontSize: '0.75rem', fontWeight: 800, padding: '6px 16px', borderRadius: 999, backdropFilter: 'blur(8px)', boxShadow: '0 4px 14px rgba(0,0,0,0.2)', pointerEvents: 'none', zIndex: 3 }}>
              📷 Clic para cambiar foto de portada
            </div>
          )}
        </div>

        {/* Elegant modern gradient overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.45) 0%, rgba(15, 23, 42, 0.78) 100%)', zIndex: 2, pointerEvents: 'none' }} />
        
        {/* Hero content overlay */}
        <div style={{ position: 'relative', zIndex: 10, maxWidth: 920, textAlign: 'center', padding: '100px 5%', color: '#FFFFFF' }}>
          <div
            data-field="hero.eyebrow"
            data-ovkey="hero.eyebrow"
            className="editable-element"
            onClick={(e) => handleEdit(e, 'hero.eyebrow', 'Horario (Eyebrow Superior)', 'text', hero.eyebrow || 'DOMINGOS 10:30 A.M.')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 22px', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: 999, fontSize: '0.82rem', fontWeight: 800, color: '#FFFFFF', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 28, ...ost('hero.eyebrow') }}
          >
            {hero.eyebrow || 'DOMINGOS 10:30 A.M.'}
            {rdh('hero.eyebrow')}
          </div>

          <h1
            data-field="hero.headline"
            data-ovkey="hero.headline"
            className="editable-element"
            onClick={(e) => handleEdit(e, 'hero.headline', 'Título Principal', 'text', `${hero.headlinePrefix || ''}${hero.headlineKeyword || ''}${hero.headlineSuffix || ''}`)}
            style={{ fontSize: 'clamp(2.8rem, 6.5vw, 5.2rem)', fontWeight: 900, lineHeight: 1.1, margin: '0 0 32px', letterSpacing: '-0.03em', textShadow: '0 10px 30px rgba(0,0,0,0.5)', ...ost('hero.headline') }}
          >
            <span className="editable-element" onClick={(e) => handleEdit(e, 'hero.headlinePrefix', 'Prefijo del Título', 'text', hero.headlinePrefix || 'Encuentra a ')}>
              {hero.headlinePrefix || 'Encuentra a '}
            </span>
            <span style={{ borderBottom: `4px solid ${accentIndigo}`, paddingBottom: 4, color: '#FFFFFF' }}>
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
            style={{ color: 'rgba(255,255,255,0.92)', fontSize: '1.25rem', lineHeight: 1.65, margin: '0 auto 40px', maxWidth: 720, textShadow: '0 2px 10px rgba(0,0,0,0.4)', ...ost('hero.subheadline') }}
          >
            {hero.subheadline || 'Bienvenidos a casa. Descubre un lugar donde pertenecer.'}
          </p>

          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              data-field="hero.ctaText"
              data-ovkey="hero.ctaText"
              href={hero.ctaLink || '#wp-plan-visit'}
              className="poster-btn-primary editable-element"
              onClick={(e) => handleNavClick(e, '#wp-plan-visit', 'hero.ctaText', 'Texto Botón Principal', hero.ctaText)}
              style={{ padding: '16px 40px', borderRadius: 999, textDecoration: 'none', fontSize: '0.9rem', fontWeight: 900, letterSpacing: '0.04em', ...ost('hero.ctaText') }}
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
              style={{ padding: '16px 36px', background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(10px)', color: '#FFFFFF', border: '1.5px solid rgba(255,255,255,0.4)', borderRadius: 999, textDecoration: 'none', fontSize: '0.9rem', fontWeight: 800, letterSpacing: '0.04em', ...ost('hero.ctaSecondary') }}
            >
              {hero.ctaSecondary || 'INVOLÚCRATE'}
              {rdh('hero.ctaSecondary')}
            </a>
          </div>
        </div>
      </section>
      )}

      {/* ── 3. BLOQUE DE MISIÓN EN TARJETA ELEGANTE ── */}
      {data.sectionsVisibility?.missionBlock !== false && (
      <section id="wp-mission" style={{ width: '100%', background: '#FFFFFF', padding: '100px 8%', boxSizing: 'border-box' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 28, padding: '60px 44px', boxShadow: '0 12px 35px rgba(0,0,0,0.03)' }}>
          <div style={{ fontSize: '2.5rem', color: accentIndigo, marginBottom: 12 }}>✦</div>
          <h2
            data-field="missionBlock.title"
            data-ovkey="missionBlock.title"
            className="editable-element"
            onClick={(e) => handleEdit(e, 'missionBlock.title', 'Título Sección Misión', 'text', missionBlock.title)}
            style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 900, color: '#0F172A', margin: '0 0 28px', letterSpacing: '-0.03em', ...ost('missionBlock.title') }}
          >
            {missionBlock.title}
          </h2>

          <div style={{ fontSize: '1.15rem', lineHeight: 1.85, color: '#334155', margin: '0 0 40px', display: 'flex', flexDirection: 'column', gap: 16 }}>
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
            className="poster-btn-primary editable-element"
            onClick={(e) => handleNavClick(e, '#wp-plan-visit', 'missionBlock.ctaText', 'Texto Botón Misión', missionBlock.ctaText)}
            style={{ display: 'inline-block', padding: '15px 42px', borderRadius: 999, textDecoration: 'none', fontSize: '0.85rem', fontWeight: 900, letterSpacing: '0.06em', ...ost('missionBlock.ctaText') }}
          >
            {missionBlock.ctaText || 'SOBRE NOSOTROS'}
          </a>
        </div>
      </section>
      )}

      {/* ── 4. SECCIÓN SPLIT 50/50 PLANIFICA TU VISITA ── */}
      {data.sectionsVisibility?.planAVisit !== false && (
      <section id="wp-plan-visit" style={{ width: '100%', padding: '100px 5%', background: '#F8FAFC', boxSizing: 'border-box' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 50, alignItems: 'center' }}>
          <div
            data-field="planAVisit.image"
            data-ovkey="planAVisit.image"
            className="editable-element"
            onClick={(e) => handleEdit(e, 'planAVisit.image', 'Foto Sección Visítanos', 'image', planAVisit.image)}
            style={{ minHeight: 480, position: 'relative', borderRadius: 24, overflow: 'hidden', boxShadow: '0 20px 45px rgba(0,0,0,0.08)', cursor: editMode ? 'pointer' : 'default', ...ost('planAVisit.image') }}
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

          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start' }}>
            <div
              data-field="planAVisit.eyebrow"
              data-ovkey="planAVisit.eyebrow"
              className="editable-element"
              onClick={(e) => handleEdit(e, 'planAVisit.eyebrow', 'Etiqueta Horarios', 'text', planAVisit.eyebrow)}
              style={{ fontSize: '0.85rem', fontWeight: 800, color: accentIndigo, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16, ...ost('planAVisit.eyebrow') }}
            >
              {planAVisit.eyebrow}
            </div>
            <h2
              data-field="planAVisit.title"
              data-ovkey="planAVisit.title"
              className="editable-element"
              onClick={(e) => handleEdit(e, 'planAVisit.title', 'Título Visítanos', 'text', planAVisit.title)}
              style={{ fontSize: 'clamp(2.3rem, 4vw, 3.4rem)', fontWeight: 900, color: '#0F172A', margin: '0 0 20px', letterSpacing: '-0.03em', lineHeight: 1.15, ...ost('planAVisit.title') }}
            >
              {planAVisit.title}
            </h2>
            <p
              data-field="planAVisit.subtitle"
              data-ovkey="planAVisit.subtitle"
              className="editable-element"
              onClick={(e) => handleEdit(e, 'planAVisit.subtitle', 'Descripción Visítanos', 'textarea', planAVisit.subtitle)}
              style={{ fontSize: '1.1rem', lineHeight: 1.75, color: '#475569', margin: '0 0 32px', maxWidth: 520, ...ost('planAVisit.subtitle') }}
            >
              {planAVisit.subtitle}
            </p>

            <a
              data-field="planAVisit.ctaText"
              data-ovkey="planAVisit.ctaText"
              href="#wp-contact"
              onClick={(e) => handleNavClick(e, '#wp-contact', 'planAVisit.ctaText', 'Texto Botón Visítanos', planAVisit.ctaText)}
              className="poster-btn-primary editable-element"
              style={{ display: 'inline-block', padding: '16px 40px', borderRadius: 999, textDecoration: 'none', fontSize: '0.85rem', fontWeight: 900, letterSpacing: '0.06em', ...ost('planAVisit.ctaText') }}
            >
              {planAVisit.ctaText || 'PLANIFICA TU VISITA'}
            </a>
          </div>
        </div>
      </section>
      )}

      {/* ── 5. SECCIÓN 2 COLUMNAS (LÍDERES Y CALENDARIO) ── */}
      {data.sectionsVisibility?.nucleusColumns !== false && (
      <section id="wp-columns" style={{ width: '100%', background: '#FFFFFF', padding: '100px 5%', boxSizing: 'border-box' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 36 }}>
          
          {/* Column 1 */}
          <div className="poster-card" style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 24, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div
              data-field="nucleusColumns.col1.image"
              data-ovkey="nucleusColumns.col1.image"
              className="editable-element"
              onClick={(e) => handleEdit(e, 'nucleusColumns.col1.image', 'Foto Columna 1', 'image', nucleusColumns.col1.image)}
              style={{ height: 280, position: 'relative', overflow: 'hidden', cursor: editMode ? 'pointer' : 'default', ...ost('nucleusColumns.col1.image') }}
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
            <div style={{ padding: '36px 32px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div
                  data-field="nucleusColumns.col1.eyebrow"
                  data-ovkey="nucleusColumns.col1.eyebrow"
                  className="editable-element"
                  onClick={(e) => handleEdit(e, 'nucleusColumns.col1.eyebrow', 'Etiqueta Columna 1', 'text', nucleusColumns.col1.eyebrow)}
                  style={{ fontSize: '0.78rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: accentIndigo, marginBottom: 12, ...ost('nucleusColumns.col1.eyebrow') }}
                >
                  {nucleusColumns.col1.eyebrow || 'EQUIPO PASTORAL'}
                </div>
                <h3
                  data-field="nucleusColumns.col1.title"
                  data-ovkey="nucleusColumns.col1.title"
                  className="editable-element"
                  onClick={(e) => handleEdit(e, 'nucleusColumns.col1.title', 'Título Columna 1', 'text', nucleusColumns.col1.title)}
                  style={{ fontSize: 'clamp(1.8rem, 3vw, 2.3rem)', fontWeight: 900, color: '#0F172A', margin: '0 0 16px', letterSpacing: '-0.02em', lineHeight: 1.2, ...ost('nucleusColumns.col1.title') }}
                >
                  {nucleusColumns.col1.title || 'Conoce a Nuestros Líderes y Pastores'}
                </h3>
                <p
                  data-field="nucleusColumns.col1.description"
                  data-ovkey="nucleusColumns.col1.description"
                  className="editable-element"
                  onClick={(e) => handleEdit(e, 'nucleusColumns.col1.description', 'Descripción Columna 1', 'textarea', nucleusColumns.col1.description)}
                  style={{ fontSize: '1rem', lineHeight: 1.7, color: '#475569', margin: '0 0 32px', ...ost('nucleusColumns.col1.description') }}
                >
                  {nucleusColumns.col1.description || nucleusColumns.col1.text || 'Un equipo comprometido con guiar, servir y acompañar a nuestra comunidad.'}
                </p>
              </div>

              <a
                data-field="nucleusColumns.col1.ctaText"
                data-ovkey="nucleusColumns.col1.ctaText"
                href={nucleusColumns.col1.ctaLink || '#wp-contact'}
                className="poster-btn-primary editable-element"
                onClick={(e) => handleNavClick(e, '#wp-contact', 'nucleusColumns.col1.ctaText', 'Texto Botón Columna 1', nucleusColumns.col1.ctaText)}
                style={{ display: 'inline-block', padding: '14px 32px', borderRadius: 999, textDecoration: 'none', fontSize: '0.82rem', fontWeight: 900, letterSpacing: '0.06em', textAlign: 'center', ...ost('nucleusColumns.col1.ctaText') }}
              >
                {nucleusColumns.col1.ctaText || 'NUESTRO EQUIPO'}
              </a>
            </div>
          </div>

          {/* Column 2 */}
          <div className="poster-card" style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 24, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div
              data-field="nucleusColumns.col2.image"
              data-ovkey="nucleusColumns.col2.image"
              className="editable-element"
              onClick={(e) => handleEdit(e, 'nucleusColumns.col2.image', 'Foto Columna 2', 'image', nucleusColumns.col2.image)}
              style={{ position: 'relative', height: 280, overflow: 'hidden', cursor: editMode ? 'pointer' : 'default', ...ost('nucleusColumns.col2.image') }}
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
            <div style={{ padding: '36px 32px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div
                  data-field="nucleusColumns.col2.eyebrow"
                  data-ovkey="nucleusColumns.col2.eyebrow"
                  className="editable-element"
                  onClick={(e) => handleEdit(e, 'nucleusColumns.col2.eyebrow', 'Etiqueta Columna 2', 'text', nucleusColumns.col2.eyebrow)}
                  style={{ fontSize: '0.78rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: accentIndigo, marginBottom: 12, ...ost('nucleusColumns.col2.eyebrow') }}
                >
                  {nucleusColumns.col2.eyebrow}
                </div>
                <h3
                  data-field="nucleusColumns.col2.title"
                  data-ovkey="nucleusColumns.col2.title"
                  className="editable-element"
                  onClick={(e) => handleEdit(e, 'nucleusColumns.col2.title', 'Título Columna 2', 'text', nucleusColumns.col2.title)}
                  style={{ fontSize: 'clamp(1.8rem, 3vw, 2.3rem)', fontWeight: 900, color: '#0F172A', margin: '0 0 16px', letterSpacing: '-0.02em', lineHeight: 1.2, ...ost('nucleusColumns.col2.title') }}
                >
                  {nucleusColumns.col2.title}
                </h3>
                <p
                  data-field="nucleusColumns.col2.text"
                  data-ovkey="nucleusColumns.col2.text"
                  className="editable-element"
                  onClick={(e) => handleEdit(e, 'nucleusColumns.col2.text', 'Texto Columna 2', 'textarea', nucleusColumns.col2.text)}
                  style={{ fontSize: '1rem', lineHeight: 1.7, color: '#475569', margin: '0 0 32px', ...ost('nucleusColumns.col2.text') }}
                >
                  {nucleusColumns.col2.text}
                </p>
              </div>

              <a
                data-field="nucleusColumns.col2.ctaText"
                data-ovkey="nucleusColumns.col2.ctaText"
                href={nucleusColumns.col2.ctaLink || '#wp-contact'}
                className="poster-btn-primary editable-element"
                onClick={(e) => handleNavClick(e, '#wp-contact', 'nucleusColumns.col2.ctaText', 'Texto Botón Columna 2', nucleusColumns.col2.ctaText)}
                style={{ display: 'inline-block', padding: '14px 32px', borderRadius: 999, textDecoration: 'none', fontSize: '0.82rem', fontWeight: 900, letterSpacing: '0.06em', textAlign: 'center', ...ost('nucleusColumns.col2.ctaText') }}
              >
                {nucleusColumns.col2.ctaText || 'NUESTRO CALENDARIO'}
              </a>
            </div>
          </div>

        </div>
      </section>
      )}

      {/* ── 5.1 BIENVENIDA A CASA ── */}
      <section id="wp-welcome" style={{ width: '100%', background: '#F8FAFC', padding: '100px 8%', boxSizing: 'border-box', borderTop: '1px solid #E2E8F0' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <div data-field="welcome.label" data-ovkey="welcome.label" className="editable-element" onClick={(e) => handleEdit(e, 'welcome.label', 'Etiqueta Bienvenida', 'text', data.welcome?.label || 'BIENVENIDO A CASA')} style={{ fontSize: '0.8rem', fontWeight: 800, color: accentIndigo, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 16, ...ost('welcome.label') }}>
            {data.welcome?.label || 'BIENVENIDO A CASA'}
          </div>
          <h2 data-field="welcome.title" data-ovkey="welcome.title" className="editable-element" onClick={(e) => handleEdit(e, 'welcome.title', 'Título Bienvenida', 'text', data.welcome?.title || 'Una comunidad apasionada por Jesús.')} style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)', fontWeight: 900, color: '#0F172A', margin: '0 0 24px', letterSpacing: '-0.03em', lineHeight: 1.2, ...ost('welcome.title') }}>
            {data.welcome?.title || 'Una comunidad apasionada por Jesús.'}
          </h2>
          <p data-field="welcome.text" data-ovkey="welcome.text" className="editable-element" onClick={(e) => handleEdit(e, 'welcome.text', 'Mensaje Pastoral', 'textarea', data.welcome?.text || 'Aquí hay un lugar para ti y tu familia.')} style={{ fontSize: '1.125rem', color: '#475569', lineHeight: 1.7, margin: '0 0 36px', maxWidth: 760, marginLeft: 'auto', marginRight: 'auto', ...ost('welcome.text') }}>
            {data.welcome?.text || 'Aquí hay un lugar para ti y tu familia.'}
          </p>
        </div>
      </section>

      {/* ── 5.2 VALORES & FUNDAMENTOS ── */}
      <section id="wp-values" style={{ width: '100%', background: '#FFFFFF', padding: '100px 8%', boxSizing: 'border-box' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 60px' }}>
            <div
              data-field="valuesHeader.eyebrow"
              data-ovkey="valuesHeader.eyebrow"
              className="editable-element"
              onClick={(e) => handleEdit(e, 'valuesHeader.eyebrow', 'Etiqueta Valores', 'text', data.valuesHeader?.eyebrow || 'FUNDAMENTOS DE FE')}
              style={{ fontSize: '0.8rem', fontWeight: 800, color: accentIndigo, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 12, ...ost('valuesHeader.eyebrow') }}
            >
              {data.valuesHeader?.eyebrow || 'FUNDAMENTOS DE FE'}
            </div>
            <h2
              data-field="valuesHeader.title"
              data-ovkey="valuesHeader.title"
              className="editable-element"
              onClick={(e) => handleEdit(e, 'valuesHeader.title', 'Título Valores', 'text', data.valuesHeader?.title || 'Nuestros Valores')}
              style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 900, color: '#0F172A', margin: 0, letterSpacing: '-0.03em', ...ost('valuesHeader.title') }}
            >
              {data.valuesHeader?.title || 'Nuestros Valores'}
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 28 }}>
            {(data.values || [
              { icon: 'heart', title: 'Amor Incondicional', text: 'Recibimos a cada persona con gracia y calidez.' },
              { icon: 'users', title: 'Comunidad Auténtica', text: 'Crecemos juntos a través de grupos de amistad.' },
              { icon: 'book', title: 'Verdad Bíblica', text: 'Enseñanza práctica basada en la Palabra de Dios.' },
              { icon: 'globe', title: 'Impacto y Misión', text: 'Servimos con generosidad a nuestra ciudad.' }
            ]).map((val, idx) => (
              <div key={idx} className="poster-card" style={{ background: '#F8FAFC', borderRadius: 20, padding: '32px 24px', border: '1px solid #E2E8F0' }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: '#EEF2FF', color: accentIndigo, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 900, marginBottom: 20 }}>✦</div>
                <h3 data-field={`values.${idx}.title`} data-ovkey={`values.${idx}.title`} className="editable-element" onClick={(e) => handleEdit(e, `values.${idx}.title`, `Título Valor ${idx+1}`, 'text', val.title)} style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0F172A', margin: '0 0 12px', ...ost(`values.${idx}.title`) }}>
                  {val.title}
                </h3>
                <p data-field={`values.${idx}.text`} data-ovkey={`values.${idx}.text`} className="editable-element" onClick={(e) => handleEdit(e, `values.${idx}.text`, `Texto Valor ${idx+1}`, 'textarea', val.text)} style={{ fontSize: '0.95rem', color: '#64748B', lineHeight: 1.6, margin: 0, ...ost(`values.${idx}.text`) }}>
                  {val.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5.3 MINISTERIOS ── */}
      {data.sectionsVisibility?.ministries !== false && (
      <section id="wp-ministries" style={{ width: '100%', background: '#F8FAFC', padding: '100px 8%', boxSizing: 'border-box' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 60px' }}>
            <div
              data-field="ministriesEyebrow"
              data-ovkey="ministriesEyebrow"
              className="editable-element"
              onClick={(e) => handleEdit(e, 'ministriesEyebrow', 'Etiqueta Ministerios', 'text', data.ministriesEyebrow || 'MINISTERIOS')}
              style={{ fontSize: '0.8rem', fontWeight: 800, color: accentIndigo, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 12, ...ost('ministriesEyebrow') }}
            >
              {data.ministriesEyebrow || 'MINISTERIOS'}
            </div>
            <h2 data-field="ministriesTitle" data-ovkey="ministriesTitle" className="editable-element" onClick={(e) => handleEdit(e, 'ministriesTitle', 'Título Ministerios', 'text', data.ministriesTitle || 'Nuestros Ministerios')} style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 900, color: '#0F172A', margin: '0 0 16px', ...ost('ministriesTitle') }}>
              {data.ministriesTitle || 'Nuestros Ministerios'}
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32 }}>
            {(data.ministries || [
              { name: 'KidZone (Niños)', ageRange: '0 a 12 años', description: 'Espacio seguro y divertido.', image: 'https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?w=800&q=85&fit=crop' },
              { name: 'Jóvenes', ageRange: '13 a 25 años', description: 'Comunidad vibrante.', image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=85&fit=crop' }
            ]).map((m, idx) => (
              <div key={idx} className="poster-card" style={{ background: '#FFFFFF', borderRadius: 20, overflow: 'hidden', border: '1px solid #E2E8F0', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                <div data-field={`ministries.${idx}.image`} data-ovkey={`ministries.${idx}.image`} className="editable-element" onClick={(e) => handleEdit(e, `ministries.${idx}.image`, `Foto Ministerio ${idx+1}`, 'image', m.image)} style={{ height: 210, position: 'relative', overflow: 'hidden', ...ost(`ministries.${idx}.image`) }}>
                  <img src={m.image || 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&q=85&fit=crop'} alt={m.name || m.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: 24 }}>
                  <h3 data-field={`ministries.${idx}.name`} data-ovkey={`ministries.${idx}.name`} className="editable-element" onClick={(e) => handleEdit(e, `ministries.${idx}.name`, `Nombre Ministerio ${idx+1}`, 'text', m.name || m.title)} style={{ fontSize: '1.3rem', fontWeight: 900, color: '#0F172A', margin: '0 0 10px', ...ost(`ministries.${idx}.name`) }}>
                    {m.name || m.title}
                  </h3>
                  <p data-field={`ministries.${idx}.description`} data-ovkey={`ministries.${idx}.description`} className="editable-element" onClick={(e) => handleEdit(e, `ministries.${idx}.description`, `Descripción Ministerio ${idx+1}`, 'textarea', m.description || m.desc)} style={{ fontSize: '0.92rem', color: '#64748B', margin: 0, lineHeight: 1.6, ...ost(`ministries.${idx}.description`) }}>
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
      <section id="wp-next-steps" style={{ width: '100%', background: '#FFFFFF', padding: '100px 8%', boxSizing: 'border-box' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 60px' }}>
            <div
              data-field="nextSteps.eyebrow"
              data-ovkey="nextSteps.eyebrow"
              className="editable-element"
              onClick={(e) => handleEdit(e, 'nextSteps.eyebrow', 'Etiqueta Próximos Pasos', 'text', data.nextSteps?.eyebrow || 'CRECIMIENTO ESPIRITUAL')}
              style={{ fontSize: '0.8rem', fontWeight: 800, color: accentIndigo, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 12, ...ost('nextSteps.eyebrow') }}
            >
              {data.nextSteps?.eyebrow || 'CRECIMIENTO ESPIRITUAL'}
            </div>
            <h2 data-field="nextSteps.title" data-ovkey="nextSteps.title" className="editable-element" onClick={(e) => handleEdit(e, 'nextSteps.title', 'Título Próximos Pasos', 'text', data.nextSteps?.title || 'Tus Próximos Pasos en la Fe')} style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 900, color: '#0F172A', margin: '0 0 16px', ...ost('nextSteps.title') }}>
              {data.nextSteps?.title || 'Tus Próximos Pasos en la Fe'}
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 28 }}>
            {(data.nextSteps?.steps || [
              { title: '1. Creer & Conocer a Jesús', description: 'Descubre el amor de Dios.' },
              { title: '2. Conectar en Comunidad', description: 'Participa en grupos semanales.' },
              { title: '3. Servir', description: 'Bendice a otros uniéndote a un equipo.' }
            ]).map((st, idx) => (
              <div key={idx} className="poster-card" style={{ background: '#F8FAFC', borderRadius: 20, padding: 32, border: '1px solid #E2E8F0' }}>
                <h3 data-field={`nextSteps.steps.${idx}.title`} data-ovkey={`nextSteps.steps.${idx}.title`} className="editable-element" onClick={(e) => handleEdit(e, `nextSteps.steps.${idx}.title`, `Paso ${idx+1} Título`, 'text', st.title)} style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0F172A', margin: '0 0 12px', ...ost(`nextSteps.steps.${idx}.title`) }}>
                  {st.title}
                </h3>
                <p data-field={`nextSteps.steps.${idx}.description`} data-ovkey={`nextSteps.steps.${idx}.description`} className="editable-element" onClick={(e) => handleEdit(e, `nextSteps.steps.${idx}.description`, `Paso ${idx+1} Descripción`, 'textarea', st.description)} style={{ fontSize: '0.95rem', color: '#64748B', margin: 0, lineHeight: 1.6, ...ost(`nextSteps.steps.${idx}.description`) }}>
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
      <section id="wp-sermons" style={{ width: '100%', background: '#F8FAFC', padding: '100px 8%', boxSizing: 'border-box' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 60px' }}>
            <h2 data-field="sermonsTitle" data-ovkey="sermonsTitle" className="editable-element" onClick={(e) => handleEdit(e, 'sermonsTitle', 'Título Prédicas', 'text', data.sermonsTitle || 'Mensajes Recientes')} style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 900, color: '#0F172A', margin: 0, ...ost('sermonsTitle') }}>
              {data.sermonsTitle || 'Mensajes Recientes'}
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32 }}>
            {(data.sermons || [
              { title: 'Caminando por Fe en Tiempos de Cambio', series: 'Serie: Imparables', speaker: 'Pastor Principal', image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=85&fit=crop' }
            ]).map((sermon, idx) => (
              <div key={idx} className="poster-card" style={{ background: '#FFFFFF', borderRadius: 20, overflow: 'hidden', border: '1px solid #E2E8F0' }}>
                <div data-field={`sermons.${idx}.image`} data-ovkey={`sermons.${idx}.image`} className="editable-element" onClick={(e) => handleEdit(e, `sermons.${idx}.image`, `Foto Prédica ${idx+1}`, 'image', sermon.image)} style={{ height: 210, position: 'relative', overflow: 'hidden', ...ost(`sermons.${idx}.image`) }}>
                  <img src={sermon.image || 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=85&fit=crop'} alt={sermon.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: 24 }}>
                  <h3 data-field={`sermons.${idx}.title`} data-ovkey={`sermons.${idx}.title`} className="editable-element" onClick={(e) => handleEdit(e, `sermons.${idx}.title`, `Título Prédica ${idx+1}`, 'text', sermon.title)} style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0F172A', margin: '0 0 10px', ...ost(`sermons.${idx}.title`) }}>
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
      <section id="wp-donations" style={{ width: '100%', background: '#FFFFFF', padding: '100px 8%', boxSizing: 'border-box' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center', background: 'linear-gradient(135deg, #EEF2FF 0%, #F8FAFC 100%)', border: '1.5px solid #C7D2FE', borderRadius: 28, padding: '50px 32px', boxShadow: '0 12px 35px rgba(79,70,229,0.06)' }}>
          <h2 data-field="donation.title" data-ovkey="donation.title" className="editable-element" onClick={(e) => handleEdit(e, 'donation.title', 'Título Donaciones', 'text', data.donation?.title || 'Generosidad')} style={{ fontSize: 'clamp(2rem, 3.8vw, 3.2rem)', fontWeight: 900, color: '#0F172A', margin: '0 0 16px', ...ost('donation.title') }}>
            {data.donation?.title || 'Generosidad'}
          </h2>
          <p data-field="donation.subtitle" data-ovkey="donation.subtitle" className="editable-element" onClick={(e) => handleEdit(e, 'donation.subtitle', 'Subtítulo Donaciones', 'textarea', data.donation?.subtitle || 'Gracias a tu ofrenda podemos seguir extendiendo el mensaje de esperanza.')} style={{ fontSize: '1.05rem', color: '#475569', margin: '0 0 32px', ...ost('donation.subtitle') }}>
            {data.donation?.subtitle || 'Gracias a tu ofrenda podemos seguir extendiendo el mensaje de esperanza.'}
          </p>
          <a data-field="donation.ctaText" data-ovkey="donation.ctaText" href="#wp-contact" className="poster-btn-primary editable-element" onClick={(e) => handleNavClick(e, '#wp-contact', 'donation.ctaText', 'Botón Donaciones', data.donation?.ctaText || 'Ofrendar en Línea')} style={{ padding: '16px 36px', borderRadius: 999, textDecoration: 'none', fontSize: '0.9rem', fontWeight: 900, ...ost('donation.ctaText') }}>
            {data.donation?.ctaText || 'Ofrendar en Línea'}
          </a>
        </div>
      </section>
      )}

      {/* ── 5.7 PETICIÓN DE ORACIÓN ── */}
      {data.sectionsVisibility?.prayerRequest !== false && (
      <section id="wp-prayer" style={{ width: '100%', background: '#F8FAFC', padding: '100px 8%', boxSizing: 'border-box' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <h2 data-field="prayerRequest.title" data-ovkey="prayerRequest.title" className="editable-element" onClick={(e) => handleEdit(e, 'prayerRequest.title', 'Título Oración', 'text', data.prayerRequest?.title || '¿Podemos Orar por Ti?')} style={{ fontSize: 'clamp(2rem, 3.8vw, 3.2rem)', fontWeight: 900, color: '#0F172A', margin: '0 0 24px', ...ost('prayerRequest.title') }}>
            {data.prayerRequest?.title || '¿Podemos Orar por Ti?'}
          </h2>
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 24, padding: 36, textAlign: 'left', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: '0.82rem', color: '#475569', fontWeight: 700, marginBottom: 6 }}>Tu Nombre</label>
              <input type="text" placeholder="Ej: Juan Pérez" style={{ width: '100%', padding: '14px 18px', borderRadius: 12, background: '#F8FAFC', border: '1px solid #CBD5E1', color: '#0F172A', fontSize: '0.95rem', outline: 'none' }} />
            </div>
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontSize: '0.82rem', color: '#475569', fontWeight: 700, marginBottom: 6 }}>Tu Petición</label>
              <textarea rows={4} placeholder="Escribe tu motivo..." style={{ width: '100%', padding: '14px 18px', borderRadius: 12, background: '#F8FAFC', border: '1px solid #CBD5E1', color: '#0F172A', fontSize: '0.95rem', resize: 'vertical', outline: 'none' }} />
            </div>
            <button data-field="prayerRequest.ctaText" data-ovkey="prayerRequest.ctaText" className="poster-btn-primary editable-element" onClick={(e) => handleEdit(e, 'prayerRequest.ctaText', 'Texto Botón Oración', 'text', data.prayerRequest?.ctaText || 'Enviar Petición')} style={{ width: '100%', padding: '16px', borderRadius: 999, border: 'none', cursor: 'pointer', fontSize: '0.92rem', fontWeight: 900, ...ost('prayerRequest.ctaText') }}>
              {data.prayerRequest?.ctaText || 'Enviar Petición'}
            </button>
          </div>
        </div>
      </section>
      )}

      {/* ── 5.8 SOBRE NOSOTROS ── */}
      {data.about && data.sectionsVisibility?.about !== false && (
        <section id="wp-about" style={{ width: '100%', background: '#FFFFFF', padding: '100px 8%', boxSizing: 'border-box' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 60, alignItems: 'center' }}>
            <div>
              <h2 data-field="about.title" data-ovkey="about.title" className="editable-element" onClick={(e) => handleEdit(e, 'about.title', 'Título Sobre Nosotros', 'text', data.about.title || 'Nuestra Historia')} style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)', fontWeight: 900, color: '#0F172A', margin: '0 0 20px', ...ost('about.title') }}>
                {data.about.title || 'Nuestra Historia'}
              </h2>
              <p data-field="about.text" data-ovkey="about.text" className="editable-element" onClick={(e) => handleEdit(e, 'about.text', 'Texto Sobre Nosotros', 'textarea', data.about.text)} style={{ fontSize: '1.05rem', color: '#475569', lineHeight: 1.7, margin: 0, ...ost('about.text') }}>
                {data.about.text}
              </p>
            </div>
            {data.aboutImage && (
              <div data-field="aboutImage" data-ovkey="aboutImage" className="editable-element" onClick={(e) => handleEdit(e, 'aboutImage', 'Foto Sobre Nosotros', 'image', data.aboutImage)} style={{ position: 'relative', borderRadius: 24, overflow: 'hidden', height: 360, ...ost('aboutImage') }}>
                <img src={data.aboutImage} alt="Sobre Nosotros" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── 5.9 WIDGET FLOTANTE POP-UP ── */}
      {Boolean(data.floatingWidget?.enabled) && data.sectionsVisibility?.floatingWidget !== false && (
        <div id="wp-widget" style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 999, background: '#FFFFFF', border: '1.5px solid #E2E8F0', borderRadius: 20, padding: '20px 24px', maxWidth: 320, boxShadow: '0 20px 50px rgba(0,0,0,0.12)', color: '#0F172A' }}>
          <div data-field="floatingWidget.title" data-ovkey="floatingWidget.title" className="editable-element" onClick={(e) => handleEdit(e, 'floatingWidget.title', 'Título Pop-up Flotante', 'text', data.floatingWidget.title || 'Planifica tu Visita')} style={{ fontWeight: 900, fontSize: '1.05rem', color: '#0F172A', marginBottom: 6, ...ost('floatingWidget.title') }}>
            {data.floatingWidget.title || 'Planifica tu Visita'}
          </div>
          <div data-field="floatingWidget.subtitle" data-ovkey="floatingWidget.subtitle" className="editable-element" onClick={(e) => handleEdit(e, 'floatingWidget.subtitle', 'Mensaje Pop-up', 'text', data.floatingWidget.subtitle || 'Domingos 9:00 AM & 11:00 AM')} style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: 14, ...ost('floatingWidget.subtitle') }}>
            {data.floatingWidget.subtitle || 'Domingos 9:00 AM & 11:00 AM'}
          </div>
          <a data-field="floatingWidget.ctaText" data-ovkey="floatingWidget.ctaText" href={data.floatingWidget.ctaLink || '#wp-plan-visit'} onClick={(e) => handleNavClick(e, data.floatingWidget.ctaLink || '#wp-plan-visit', 'floatingWidget.ctaText', 'Texto Botón Pop-up', data.floatingWidget.ctaText || 'Planifica tu Visita')} className="poster-btn-primary editable-element" style={{ display: 'block', textAlign: 'center', padding: '10px 18px', borderRadius: 999, textDecoration: 'none', fontSize: '0.8rem', fontWeight: 900, ...ost('floatingWidget.ctaText') }}>
            {data.floatingWidget.ctaText || 'Planifica tu Visita'}
          </a>
        </div>
      )}

      {/* ── 6. FOOTER LUMINOSO Y MINIMALISTA ── */}
      {data.sectionsVisibility?.contact !== false && (
      <footer id="wp-contact" style={{ width: '100%', background: '#F8FAFC', color: '#0F172A', padding: '90px 8% 50px', boxSizing: 'border-box', borderTop: '1px solid #E2E8F0' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 64, marginBottom: 70 }}>
          
          {/* Left Footer Info */}
          <div>
            <h2
              data-field="businessName"
              data-ovkey="businessName"
              className="editable-element"
              onClick={(e) => handleEdit(e, 'businessName', 'Nombre de la Iglesia', 'text', businessName)}
              style={{ fontSize: '2.3rem', fontWeight: 900, margin: '0 0 24px', letterSpacing: '-0.03em', color: '#0F172A', ...ost('businessName') }}
            >
              {businessName}
            </h2>

            <div style={{ fontSize: '1.05rem', color: '#475569', marginBottom: 28, display: 'flex', flexDirection: 'column', gap: 8 }}>
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

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginBottom: 36 }}>
              <a
                data-field="contact.ctaPrimary"
                data-ovkey="contact.ctaPrimary"
                href={`mailto:${contact.email}`}
                className="poster-btn-primary editable-element"
                onClick={(e) => handleEdit(e, 'contact.ctaPrimary', 'Texto Botón Footer 1', 'text', contact.ctaPrimary)}
                style={{ padding: '14px 32px', borderRadius: 999, textDecoration: 'none', fontSize: '0.82rem', fontWeight: 900, letterSpacing: '0.06em', ...ost('contact.ctaPrimary') }}
              >
                {contact.ctaPrimary || 'ENVIAR MENSAJE'}
              </a>
              <a
                data-field="contact.ctaSecondary"
                data-ovkey="contact.ctaSecondary"
                href="#wp-contact"
                className="editable-element"
                onClick={(e) => handleEdit(e, 'contact.ctaSecondary', 'Texto Botón Footer 2', 'text', contact.ctaSecondary)}
                style={{ padding: '13px 32px', background: '#FFFFFF', color: '#0F172A', border: '1.5px solid #CBD5E1', borderRadius: 999, textDecoration: 'none', fontSize: '0.82rem', fontWeight: 900, letterSpacing: '0.06em', ...ost('contact.ctaSecondary') }}
              >
                {contact.ctaSecondary || 'DA TU SIGUIENTE PASO'}
              </a>
            </div>

            <div style={{ fontSize: '1rem', lineHeight: 1.8, color: '#64748B' }}>
              <p
                data-field="contact.email"
                data-ovkey="contact.email"
                className="editable-element"
                onClick={(e) => handleEdit(e, 'contact.email', 'Correo Electrónico', 'text', contact.email)}
                style={{ ...ost('contact.email') }}
              >
                <a href={`mailto:${contact.email}`} style={{ color: accentIndigo, textDecoration: 'none', fontWeight: 700 }}>{contact.email}</a>
              </p>
              <p
                data-field="contact.phone"
                data-ovkey="contact.phone"
                className="editable-element"
                onClick={(e) => handleEdit(e, 'contact.phone', 'Teléfono', 'text', contact.phone)}
                style={{ ...ost('contact.phone') }}
              >
                <a href={`tel:${contact.phone}`} style={{ color: '#0F172A', textDecoration: 'none', fontWeight: 700 }}>{contact.phone}</a>
              </p>
              <p
                data-field="contact.address"
                data-ovkey="contact.address"
                className="editable-element"
                onClick={(e) => handleEdit(e, 'contact.address', 'Dirección Principal', 'textarea', contact.address)}
                style={{ marginTop: 10, ...ost('contact.address') }}
              >
                {contact.address}
              </p>
            </div>
          </div>

          {/* Right Footer Links Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 36, alignItems: 'flex-start' }}>
            <div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 900, color: '#0F172A', marginBottom: 16 }}>Visita & Comunidad</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: '0.92rem', color: '#475569' }}>
                <div>Planifica tu Visita</div>
                <div>Líderes & Pastores</div>
                <div>Próximos Pasos</div>
                <div>Oración & Apoyo</div>
                <div>Donaciones</div>
              </div>
            </div>

            <div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 900, color: '#0F172A', marginBottom: 16 }}>Recursos & Redes</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: '0.92rem', color: '#475569' }}>
                <div>Sermones & Mensajes</div>
                <div>Calendario de Eventos</div>
                <div>Instagram</div>
                <div>YouTube</div>
                <div>Facebook</div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Footer Sub-bar */}
        <div style={{ maxWidth: 1320, margin: '0 auto', paddingTop: 28, borderTop: '1px solid #E2E8F0', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.82rem', color: '#64748B' }}>
          <div>
            <span>Política de Privacidad</span> • <span>Términos y Condiciones</span>
          </div>
          <div>
            © {new Date().getFullYear()} {businessName}. Todos los Derechos Reservados.
          </div>
        </div>
      </footer>
      )}

      {/* ── FLOATING WIDGET ── */}
      <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 999 }}>
        <button
          onClick={(e) => handleNavClick(e, '#wp-contact', 'nav.item5', 'Widget Próximos Pasos', 'Próximos Pasos')}
          style={{ width: 56, height: 56, borderRadius: '50%', background: accentIndigo, color: '#FFFFFF', border: 'none', fontWeight: 800, fontSize: '0.68rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 8px 25px rgba(79,70,229,0.4)', textAlign: 'center', lineHeight: 1.1 }}
        >
          <span>Próximos</span>
          <span>Pasos</span>
        </button>
      </div>

    </div>
  )
}
