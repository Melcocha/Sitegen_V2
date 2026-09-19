import React from 'react'

/**
 * ChurchSectionLayouts.jsx
 * Provides alternate visual layouts for Church template sections:
 * - Text-rich / Pastoral layout ("cierto texto")
 * - Visual / Photo gallery / "Solo imágenes" layout ("solo imágenes")
 * - Split / Modern cards layout ("split / tarjetas")
 *
 * Works seamlessly across Nucleus, MyGateway, Poster, and Afiche.
 */

// Helper to detect video URLs
const isVideo = (url) => {
  if (!url || typeof url !== 'string') return false
  return /\.(mp4|webm|mov|ogg)(\?.*)?$/i.test(url) || url.startsWith('data:video/')
}

// ─────────────────────────────────────────────────────────────
// 1. HERO LAYOUTS
// ─────────────────────────────────────────────────────────────

/** Visual / Cinematic Hero: 100% focus on full-bleed background with minimal text */
export function HeroVisualLayout({
  data = {},
  hero = {},
  editMode = false,
  handleEdit,
  handleNavClick,
  ost = () => ({}),
  rdh = () => null,
  accentColor = '#C4A35A',
  font = 'inherit'
}) {
  const bgImg = hero.bgImage || data.heroImage || 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1800&q=85&fit=crop'
  const videoUrl = data.heroVideo || (isVideo(bgImg) ? bgImg : null)

  return (
    <section id="wp-hero" style={{ position: 'relative', width: '100%', minHeight: '85vh', display: 'flex', alignItems: 'flex-end', overflow: 'hidden', background: '#000000', fontFamily: font }}>
      {/* Background Media */}
      <div
        data-field="heroImage"
        data-ovkey="heroImage"
        className="editable-element"
        onClick={(e) => handleEdit && handleEdit(e, 'heroImage', 'Foto de Portada', 'image', bgImg)}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', cursor: editMode ? 'pointer' : 'default', ...ost('heroImage') }}
      >
        {videoUrl ? (
          <video src={videoUrl} autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <img src={bgImg} alt="Hero" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        )}
        {/* Subtle cinematic gradient vignette */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.92) 100%)', pointerEvents: 'none' }} />
      </div>

      {/* Floating Bottom Minimalist Typography */}
      <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: 1300, margin: '0 auto', padding: '60px 6% 80px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24, boxSizing: 'border-box' }}>
        <div style={{ maxWidth: 760 }}>
          {hero.eyebrow && (
            <div
              data-field="hero.eyebrow"
              data-ovkey="hero.eyebrow"
              className="editable-element"
              onClick={(e) => handleEdit && handleEdit(e, 'hero.eyebrow', 'Horario / Eyebrow', 'text', hero.eyebrow)}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)', padding: '6px 14px', borderRadius: 999, fontSize: '0.78rem', fontWeight: 800, color: '#FFFFFF', letterSpacing: '0.08em', marginBottom: 16, textTransform: 'uppercase', ...ost('hero.eyebrow') }}
            >
              <span style={{ color: accentColor }}>✦</span> {hero.eyebrow}
            </div>
          )}

          <h1
            data-field="hero.headline"
            data-ovkey="hero.headline"
            className="editable-element"
            onClick={(e) => handleEdit && handleEdit(e, 'hero.headline', 'Título Principal', 'text', hero.headline)}
            style={{ fontSize: 'clamp(2.6rem, 6vw, 4.8rem)', fontWeight: 900, color: '#FFFFFF', margin: 0, letterSpacing: '-0.03em', lineHeight: 1.05, textShadow: '0 2px 20px rgba(0,0,0,0.6)', ...ost('hero.headline') }}
          >
            {hero.headline || data.businessName || 'Bienvenido a Casa'}
          </h1>
        </div>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <a
            data-field="hero.ctaText"
            data-ovkey="hero.ctaText"
            href={hero.ctaLink || '#wp-plan-visit'}
            className="editable-element"
            onClick={(e) => handleNavClick && handleNavClick(e, hero.ctaLink || '#wp-plan-visit', 'hero.ctaText', 'Botón Principal', hero.ctaText || 'Planifica tu Visita')}
            style={{
              padding: '16px 36px',
              borderRadius: 999,
              background: accentColor || '#FFFFFF',
              color: '#000000',
              fontWeight: 900,
              fontSize: '0.86rem',
              textDecoration: 'none',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              boxShadow: '0 8px 30px rgba(0,0,0,0.35)',
              ...ost('hero.ctaText')
            }}
          >
            {hero.ctaText || 'Planifica tu Visita'}
          </a>
          {hero.ctaSecondary && (
            <a
              data-field="hero.ctaSecondary"
              data-ovkey="hero.ctaSecondary"
              href={hero.ctaSecondaryLink || '#wp-sermons'}
              className="editable-element"
              onClick={(e) => handleNavClick && handleNavClick(e, hero.ctaSecondaryLink || '#wp-sermons', 'hero.ctaSecondary', 'Botón Secundario', hero.ctaSecondary)}
              style={{
                padding: '16px 28px',
                borderRadius: 999,
                background: 'rgba(255,255,255,0.12)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.25)',
                color: '#FFFFFF',
                fontWeight: 800,
                fontSize: '0.86rem',
                textDecoration: 'none',
                ...ost('hero.ctaSecondary')
              }}
            >
              {hero.ctaSecondary}
            </a>
          )}
        </div>
      </div>
    </section>
  )
}

/** Split 50/50 Hero: Text on one side, large visual card on the other */
export function HeroSplitLayout({
  data = {},
  hero = {},
  editMode = false,
  handleEdit,
  handleNavClick,
  ost = () => ({}),
  rdh = () => null,
  accentColor = '#C4A35A',
  primaryBg = '#07080D',
  font = 'inherit'
}) {
  const bgImg = hero.bgImage || data.heroImage || 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1800&q=85&fit=crop'

  return (
    <section id="wp-hero" style={{ position: 'relative', width: '100%', minHeight: '82vh', display: 'flex', alignItems: 'center', background: primaryBg, color: '#FFFFFF', padding: '80px 6%', boxSizing: 'border-box', fontFamily: font }}>
      <div style={{ maxWidth: 1300, margin: '0 auto', width: '100%', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 48, alignItems: 'center' }}>
        {/* Left Column: Rich Typography */}
        <div>
          <div
            data-field="hero.eyebrow"
            data-ovkey="hero.eyebrow"
            className="editable-element"
            onClick={(e) => handleEdit && handleEdit(e, 'hero.eyebrow', 'Horario', 'text', hero.eyebrow)}
            style={{ display: 'inline-block', fontSize: '0.78rem', fontWeight: 800, color: accentColor, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 18, ...ost('hero.eyebrow') }}
          >
            ✦ {hero.eyebrow || 'DOMINGOS 10:30 A.M.'}
          </div>

          <h1
            data-field="hero.headline"
            data-ovkey="hero.headline"
            className="editable-element"
            onClick={(e) => handleEdit && handleEdit(e, 'hero.headline', 'Título Principal', 'text', hero.headline)}
            style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)', fontWeight: 900, lineHeight: 1.08, margin: '0 0 20px', letterSpacing: '-0.03em', ...ost('hero.headline') }}
          >
            {hero.headline || 'Encuentra tu Lugar en Nuestra Familia'}
          </h1>

          <p
            data-field="hero.subheadline"
            data-ovkey="hero.subheadline"
            className="editable-element"
            onClick={(e) => handleEdit && handleEdit(e, 'hero.subheadline', 'Subtítulo', 'textarea', hero.subheadline)}
            style={{ fontSize: '1.1rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.75)', margin: '0 0 32px', maxWidth: 520, ...ost('hero.subheadline') }}
          >
            {hero.subheadline || 'Somos una comunidad viva de fe, esperanza y amor. Ven a vivir la presencia de Dios con nosotros este domingo.'}
          </p>

          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <a
              data-field="hero.ctaText"
              data-ovkey="hero.ctaText"
              href={hero.ctaLink || '#wp-plan-visit'}
              className="editable-element"
              onClick={(e) => handleNavClick && handleNavClick(e, hero.ctaLink || '#wp-plan-visit', 'hero.ctaText', 'Botón Principal', hero.ctaText || 'Planifica tu Visita')}
              style={{
                padding: '16px 36px', borderRadius: 999, background: accentColor, color: '#000000', fontWeight: 900, fontSize: '0.86rem', textDecoration: 'none', letterSpacing: '0.04em', textTransform: 'uppercase', ...ost('hero.ctaText')
              }}
            >
              {hero.ctaText || 'Planifica tu Visita'}
            </a>
            {hero.ctaSecondary && (
              <a
                data-field="hero.ctaSecondary"
                data-ovkey="hero.ctaSecondary"
                href={hero.ctaSecondaryLink || '#wp-sermons'}
                className="editable-element"
                onClick={(e) => handleNavClick && handleNavClick(e, hero.ctaSecondaryLink || '#wp-sermons', 'hero.ctaSecondary', 'Botón Secundario', hero.ctaSecondary)}
                style={{
                  padding: '16px 28px', borderRadius: 999, border: '1px solid rgba(255,255,255,0.25)', color: '#FFFFFF', fontWeight: 800, fontSize: '0.86rem', textDecoration: 'none', ...ost('hero.ctaSecondary')
                }}
              >
                {hero.ctaSecondary}
              </a>
            )}
          </div>
        </div>

        {/* Right Column: Visual Feature Card */}
        <div
          data-field="heroImage"
          data-ovkey="heroImage"
          className="editable-element"
          onClick={(e) => handleEdit && handleEdit(e, 'heroImage', 'Foto Principal', 'image', bgImg)}
          style={{ position: 'relative', height: 480, borderRadius: 24, overflow: 'hidden', boxShadow: '0 25px 60px rgba(0,0,0,0.5)', border: `1px solid rgba(255,255,255,0.15)`, cursor: editMode ? 'pointer' : 'default', ...ost('heroImage') }}
        >
          <img src={bgImg} alt="Hero Card" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.85) 100%)' }} />
          <div style={{ position: 'absolute', bottom: 24, left: 24, right: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#FFFFFF', background: 'rgba(0,0,0,0.6)', padding: '6px 14px', borderRadius: 999, backdropFilter: 'blur(6px)' }}>
              🏛️ Todos los Domingos
            </span>
            <span style={{ fontSize: '0.78rem', color: accentColor, fontWeight: 800 }}>
              {hero.eyebrow || '10:30 AM'}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// 2. BIENVENIDA A CASA (SOLO IMÁGENES / MOSAICO)
// ─────────────────────────────────────────────────────────────

/** Visual Layout for Welcome: 4-Photo Church Life Mosaic ("Solo Imágenes") */
export function WelcomeVisualLayout({
  data = {},
  welcome: welcomeProp,
  editMode = false,
  handleEdit,
  handleNavClick,
  ost = () => ({}),
  accentColor = '#C4A35A',
  primaryBg = '#0A0C14',
  font = 'inherit'
}) {
  const welcome = welcomeProp || data.welcome || {}
  const photos = [
    { key: 'visionImage', label: 'Adoración en Vivo', defaultUrl: data.visionImage || welcome.image || 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&q=85&fit=crop', tag: 'Adoración & Alabanza' },
    { key: 'planAVisit.image', label: 'Comunidad & Familia', defaultUrl: data.planAVisit?.image || 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&q=85&fit=crop', tag: 'Familia de Fe' },
    { key: 'nextSteps.image', label: 'Próximos Pasos & Jóvenes', defaultUrl: data.nextSteps?.image || 'https://images.unsplash.com/photo-1543807535-eceef0bc6599?w=800&q=85&fit=crop', tag: 'Próximos Pasos' },
    { key: 'aboutImage', label: 'Reunión & Comunión', defaultUrl: data.aboutImage || 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=85&fit=crop', tag: 'Compañerismo' },
  ]

  return (
    <section id="wp-welcome" style={{ width: '100%', background: primaryBg, color: '#FFFFFF', padding: '100px 6%', boxSizing: 'border-box', fontFamily: font }}>
      <div style={{ maxWidth: 1300, margin: '0 auto' }}>
        {/* Header with minimal text */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 44, flexWrap: 'wrap', gap: 20 }}>
          <div>
            <div
              data-field="welcome.label"
              data-ovkey="welcome.label"
              className="editable-element"
              onClick={(e) => handleEdit && handleEdit(e, 'welcome.label', 'Etiqueta', 'text', welcome.label || 'Bienvenido a Casa')}
              style={{ fontSize: '0.78rem', fontWeight: 800, color: accentColor, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 10, ...ost('welcome.label') }}
            >
              ✦ {welcome.label || 'BIENVENIDO A CASA'}
            </div>
            <h2
              data-field="welcome.title"
              data-ovkey="welcome.title"
              className="editable-element"
              onClick={(e) => handleEdit && handleEdit(e, 'welcome.title', 'Título', 'text', welcome.title)}
              style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)', fontWeight: 900, margin: 0, letterSpacing: '-0.03em', ...ost('welcome.title') }}
            >
              {welcome.title || 'Nuestra Comunidad en Imágenes'}
            </h2>
          </div>

          <a
            data-field="welcome.ctaText"
            data-ovkey="welcome.ctaText"
            href={welcome.ctaLink || '#wp-plan-visit'}
            className="editable-element"
            onClick={(e) => handleNavClick && handleNavClick(e, welcome.ctaLink || '#wp-plan-visit', 'welcome.ctaText', 'Botón', welcome.ctaText || 'Visítanos')}
            style={{
              padding: '12px 28px', borderRadius: 999, background: accentColor, color: '#000000', fontWeight: 800, fontSize: '0.82rem', textDecoration: 'none', textTransform: 'uppercase', ...ost('welcome.ctaText')
            }}
          >
            {welcome.ctaText || 'Visítanos'}
          </a>
        </div>

        {/* 4-Photo Rich Grid / Mosaic ("Solo Imágenes") */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 16, minHeight: 480 }}>
          {/* Main Large Photo */}
          <div
            data-field={photos[0].key}
            data-ovkey={photos[0].key}
            className="editable-element"
            onClick={(e) => handleEdit && handleEdit(e, photos[0].key, photos[0].label, 'image', photos[0].defaultUrl)}
            style={{ gridColumn: 'span 7', position: 'relative', minHeight: 340, borderRadius: 20, overflow: 'hidden', cursor: editMode ? 'pointer' : 'default', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <img src={photos[0].defaultUrl} alt={photos[0].label} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.85) 100%)' }} />
            <span style={{ position: 'absolute', bottom: 18, left: 18, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', color: '#FFFFFF', padding: '6px 14px', borderRadius: 999, fontSize: '0.78rem', fontWeight: 800, border: '1px solid rgba(255,255,255,0.2)' }}>
              ✦ {photos[0].tag}
            </span>
          </div>

          {/* Second Top Photo */}
          <div
            data-field={photos[1].key}
            data-ovkey={photos[1].key}
            className="editable-element"
            onClick={(e) => handleEdit && handleEdit(e, photos[1].key, photos[1].label, 'image', photos[1].defaultUrl)}
            style={{ gridColumn: 'span 5', position: 'relative', minHeight: 220, borderRadius: 20, overflow: 'hidden', cursor: editMode ? 'pointer' : 'default', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <img src={photos[1].defaultUrl} alt={photos[1].label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.85) 100%)' }} />
            <span style={{ position: 'absolute', bottom: 18, left: 18, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', color: '#FFFFFF', padding: '6px 14px', borderRadius: 999, fontSize: '0.78rem', fontWeight: 800, border: '1px solid rgba(255,255,255,0.2)' }}>
              ✦ {photos[1].tag}
            </span>
          </div>

          {/* Third Bottom Left Photo */}
          <div
            data-field={photos[2].key}
            data-ovkey={photos[2].key}
            className="editable-element"
            onClick={(e) => handleEdit && handleEdit(e, photos[2].key, photos[2].label, 'image', photos[2].defaultUrl)}
            style={{ gridColumn: 'span 6', position: 'relative', minHeight: 240, borderRadius: 20, overflow: 'hidden', cursor: editMode ? 'pointer' : 'default', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <img src={photos[2].defaultUrl} alt={photos[2].label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.85) 100%)' }} />
            <span style={{ position: 'absolute', bottom: 18, left: 18, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', color: '#FFFFFF', padding: '6px 14px', borderRadius: 999, fontSize: '0.78rem', fontWeight: 800, border: '1px solid rgba(255,255,255,0.2)' }}>
              ✦ {photos[2].tag}
            </span>
          </div>

          {/* Fourth Bottom Right Photo */}
          <div
            data-field={photos[3].key}
            data-ovkey={photos[3].key}
            className="editable-element"
            onClick={(e) => handleEdit && handleEdit(e, photos[3].key, photos[3].label, 'image', photos[3].defaultUrl)}
            style={{ gridColumn: 'span 6', position: 'relative', minHeight: 240, borderRadius: 20, overflow: 'hidden', cursor: editMode ? 'pointer' : 'default', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <img src={photos[3].defaultUrl} alt={photos[3].label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.85) 100%)' }} />
            <span style={{ position: 'absolute', bottom: 18, left: 18, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', color: '#FFFFFF', padding: '6px 14px', borderRadius: 999, fontSize: '0.78rem', fontWeight: 800, border: '1px solid rgba(255,255,255,0.2)' }}>
              ✦ {photos[3].tag}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// 3. MINISTERIOS (SOLO IMÁGENES / GALERÍA VISUAL)
// ─────────────────────────────────────────────────────────────

/** Visual / Only Images for Ministries: Full-bleed photo cards with floating titles */
export function MinistriesVisualLayout({
  data = {},
  ministries = [],
  editMode = false,
  handleEdit,
  handleNavClick,
  ost = () => ({}),
  accentColor = '#C4A35A',
  primaryBg = '#07080D',
  font = 'inherit'
}) {
  const list = ministries.length > 0 ? ministries : [
    { title: 'Kids Zone', image: 'https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?w=800&q=85&fit=crop' },
    { title: 'Jóvenes & Universitarios', image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=85&fit=crop' },
    { title: 'Matrimonios & Familias', image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&q=85&fit=crop' },
    { title: 'Alabanza & Artes', image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=85&fit=crop' },
  ]

  return (
    <section id="wp-ministerios" style={{ width: '100%', background: primaryBg, color: '#FFFFFF', padding: '100px 6%', boxSizing: 'border-box', fontFamily: font }}>
      <div style={{ maxWidth: 1300, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 50 }}>
          <div style={{ fontSize: '0.78rem', fontWeight: 800, color: accentColor, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 12 }}>
            ✦ NUESTRA FAMILIA
          </div>
          <h2
            data-field="ministriesTitle"
            data-ovkey="ministriesTitle"
            className="editable-element"
            onClick={(e) => handleEdit && handleEdit(e, 'ministriesTitle', 'Título Ministerios', 'text', data.ministriesTitle || 'Ministerios y Grupos')}
            style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.4rem)', fontWeight: 900, margin: 0, letterSpacing: '-0.03em', ...ost('ministriesTitle') }}
          >
            {data.ministriesTitle || 'Ministerios y Grupos'}
          </h2>
        </div>

        {/* Visual Photo Cards Grid ("Solo Imágenes") */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {list.map((m, idx) => (
            <div
              key={idx}
              data-field={`ministries.${idx}.image`}
              data-ovkey={`ministries.${idx}.image`}
              className="editable-element"
              onClick={(e) => handleEdit && handleEdit(e, `ministries.${idx}.image`, `Foto ${m.title}`, 'image', m.image)}
              style={{
                position: 'relative',
                height: 380,
                borderRadius: 20,
                overflow: 'hidden',
                cursor: editMode ? 'pointer' : 'default',
                boxShadow: '0 12px 32px rgba(0,0,0,0.45)',
                border: '1px solid rgba(255,255,255,0.12)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}
            >
              <img src={m.image || 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&q=85&fit=crop'} alt={m.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.9) 100%)' }} />
              <div style={{ position: 'absolute', bottom: 24, left: 24, right: 24 }}>
                <h3
                  data-field={`ministries.${idx}.title`}
                  data-ovkey={`ministries.${idx}.title`}
                  className="editable-element"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleEdit && handleEdit(e, `ministries.${idx}.title`, 'Nombre del Ministerio', 'text', m.title)
                  }}
                  style={{ fontSize: '1.4rem', fontWeight: 900, color: '#FFFFFF', margin: 0, letterSpacing: '-0.02em', textTransform: 'uppercase' }}
                >
                  {m.title}
                </h3>
                <div style={{ marginTop: 8, display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.78rem', fontWeight: 800, color: accentColor }}>
                  <span>Conocer más</span> <span>→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// 4. SERMONES (SOLO PORTADAS / STREAMING NETFLIX STYLE)
// ─────────────────────────────────────────────────────────────

/** Visual / Streaming Thumbnails for Sermons */
export function SermonsVisualLayout({
  data = {},
  sermons = [],
  editMode = false,
  handleEdit,
  handleNavClick,
  ost = () => ({}),
  accentColor = '#C4A35A',
  primaryBg = '#07080D',
  font = 'inherit'
}) {
  const list = sermons.length > 0 ? sermons : [
    { title: 'El Poder de la Gracia', speaker: 'Pastor Principal', series: 'Fe Imparable', image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=85&fit=crop', duration: '42 min' },
    { title: 'Caminando sobre las Aguas', speaker: 'Pastora Asociada', series: 'Confianza Radical', image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=85&fit=crop', duration: '38 min' },
    { title: 'Un Nuevo Comienzo', speaker: 'Pastor de Jóvenes', series: 'Renovados', image: 'https://images.unsplash.com/photo-1509021436471-18736672b71e?w=800&q=85&fit=crop', duration: '45 min' },
  ]

  return (
    <section id="wp-sermons" style={{ width: '100%', background: primaryBg, color: '#FFFFFF', padding: '100px 6%', boxSizing: 'border-box', fontFamily: font }}>
      <div style={{ maxWidth: 1300, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 44, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ fontSize: '0.78rem', fontWeight: 800, color: accentColor, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 10 }}>
              ✦ MENSAJES & PRÉDICAS
            </div>
            <h2 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)', fontWeight: 900, margin: 0, letterSpacing: '-0.03em' }}>
              {data.sermonsTitle || 'Ver en Línea'}
            </h2>
          </div>
          <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>
            🎬 Biblioteca de Video & Streaming
          </span>
        </div>

        {/* Video Thumbnail Covers ("Solo Imágenes") */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
          {list.map((s, idx) => (
            <div
              key={idx}
              data-field={`sermons.${idx}.image`}
              data-ovkey={`sermons.${idx}.image`}
              className="editable-element"
              onClick={(e) => handleEdit && handleEdit(e, `sermons.${idx}.image`, `Portada Video ${idx + 1}`, 'image', s.image)}
              style={{
                position: 'relative',
                height: 240,
                borderRadius: 18,
                overflow: 'hidden',
                cursor: editMode ? 'pointer' : 'default',
                boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                border: '1px solid rgba(255,255,255,0.12)'
              }}
            >
              <img src={s.image || 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=85&fit=crop'} alt={s.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.85) 100%)' }} />
              
              {/* Play Badge */}
              <div style={{ position: 'absolute', top: 16, right: 16, background: '#DC2626', color: '#FFFFFF', padding: '4px 10px', borderRadius: 999, fontSize: '0.72rem', fontWeight: 900, display: 'flex', alignItems: 'center', gap: 4 }}>
                <span>▶</span> <span>VER</span>
              </div>

              {/* Duration badge */}
              <div style={{ position: 'absolute', top: 16, left: 16, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)', color: '#FFFFFF', padding: '4px 10px', borderRadius: 999, fontSize: '0.72rem', fontWeight: 700 }}>
                ⏱️ {s.duration || '40 min'}
              </div>

              {/* Title overlay */}
              <div style={{ position: 'absolute', bottom: 18, left: 18, right: 18 }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: accentColor, textTransform: 'uppercase', marginBottom: 4 }}>
                  {s.series || 'Serie Actual'}
                </div>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#FFFFFF', margin: 0, lineHeight: 1.2 }}>
                  {s.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// 5. EVENTOS (SOLO AFICHES / CARTELERA VISUAL)
// ─────────────────────────────────────────────────────────────

/** Visual Layout for Events: Tall 3:4 Event Flyers with Date Sticker */
export function EventsVisualLayout({
  data = {},
  events = [],
  editMode = false,
  handleEdit,
  handleNavClick,
  ost = () => ({}),
  accentColor = '#C4A35A',
  primaryBg = '#07080D',
  font = 'inherit'
}) {
  const evData = data.events || {}
  const rawList = Array.isArray(evData) ? evData : (Array.isArray(evData.items) ? evData.items : [
    { title: 'Noche de Adoración', dateDay: '18', dateMonth: 'OCT', image: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&q=85&fit=crop' },
    { title: 'Conferencia de Familias', dateDay: '25', dateMonth: 'OCT', image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=85&fit=crop' },
    { title: 'Retiro Juvenil', dateDay: '01', dateMonth: 'NOV', image: 'https://images.unsplash.com/photo-1510936111840-65e151ad71bb?w=800&q=85&fit=crop' },
  ])
  const list = (rawList || []).filter(Boolean)

  return (
    <section id="wp-events" style={{ width: '100%', background: primaryBg, color: '#FFFFFF', padding: '100px 6%', boxSizing: 'border-box', fontFamily: font }}>
      <div style={{ maxWidth: 1300, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 50 }}>
          <div style={{ fontSize: '0.78rem', fontWeight: 800, color: accentColor, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 12 }}>
            ✦ CARTELERA
          </div>
          <h2 style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.4rem)', fontWeight: 900, margin: 0, letterSpacing: '-0.03em' }}>
            Próximos Eventos
          </h2>
        </div>

        {/* Visual Poster Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          {list.map((ev, idx) => (
            <div
              key={idx}
              data-field={`events.${idx}.image`}
              data-ovkey={`events.${idx}.image`}
              className="editable-element"
              onClick={(e) => handleEdit && handleEdit(e, `events.${idx}.image`, `Afiche Evento ${idx + 1}`, 'image', ev?.image)}
              style={{
                position: 'relative',
                height: 420,
                borderRadius: 20,
                overflow: 'hidden',
                cursor: editMode ? 'pointer' : 'default',
                boxShadow: '0 15px 35px rgba(0,0,0,0.5)',
                border: '1px solid rgba(255,255,255,0.15)'
              }}
            >
              <img src={ev?.image || 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&q=85&fit=crop'} alt={ev?.title || 'Evento'} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 45%, rgba(0,0,0,0.92) 100%)' }} />

              {/* Floating Date Badge Sticker */}
              <div style={{ position: 'absolute', top: 20, left: 20, background: '#FFFFFF', color: '#000000', padding: '8px 14px', borderRadius: 12, textAlign: 'center', boxShadow: '0 8px 20px rgba(0,0,0,0.4)' }}>
                <div style={{ fontSize: '1.3rem', fontWeight: 900, lineHeight: 1 }}>{ev?.day || ev?.dateDay || '18'}</div>
                <div style={{ fontSize: '0.65rem', fontWeight: 900, letterSpacing: '0.08em', color: '#666' }}>{ev?.month || ev?.dateMonth || 'OCT'}</div>
              </div>

              {/* Event Bottom Content */}
              <div style={{ position: 'absolute', bottom: 22, left: 22, right: 22 }}>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 900, color: '#FFFFFF', margin: '0 0 10px', lineHeight: 1.15 }}>
                  {ev.title}
                </h3>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: accentColor, color: '#000000', padding: '8px 18px', borderRadius: 999, fontSize: '0.78rem', fontWeight: 900, textTransform: 'uppercase' }}>
                  <span>Inscribirme</span> <span>→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// 6. SOBRE NOSOTROS (MURO DE FOTOS DE LA COMUNIDAD)
// ─────────────────────────────────────────────────────────────

/** Visual / Photo Wall for About Us ("Solo Imágenes") */
export function AboutVisualLayout({
  data = {},
  editMode = false,
  handleEdit,
  handleNavClick,
  ost = () => ({}),
  accentColor = '#C4A35A',
  primaryBg = '#07080D',
  font = 'inherit'
}) {
  const photos = [
    data.aboutImage || 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&q=85&fit=crop',
    'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=85&fit=crop',
    'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=85&fit=crop',
    'https://images.unsplash.com/photo-1509021436471-18736672b71e?w=800&q=85&fit=crop',
  ]

  return (
    <section id="wp-about" style={{ width: '100%', background: primaryBg, color: '#FFFFFF', padding: '100px 6%', boxSizing: 'border-box', fontFamily: font }}>
      <div style={{ maxWidth: 1300, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 44 }}>
          <div style={{ fontSize: '0.78rem', fontWeight: 800, color: accentColor, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 12 }}>
            ✦ CONOCE NUESTRO CORAZÓN
          </div>
          <h2 style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.4rem)', fontWeight: 900, margin: '0 0 16px', letterSpacing: '-0.03em' }}>
            {data.about?.title || 'Una Familia en Cristo'}
          </h2>
          <p style={{ maxWidth: 640, margin: '0 auto', fontSize: '1.05rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.7 }}>
            {data.about?.text || 'Creemos que nadie debe caminar solo. En cada reunión celebramos la gracia, la familia y el propósito eterno de Dios.'}
          </p>
        </div>

        {/* 4-Image Staggered Photo Wall */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
          {photos.map((url, i) => (
            <div
              key={i}
              data-field="aboutImage"
              data-ovkey="aboutImage"
              className="editable-element"
              onClick={(e) => handleEdit && handleEdit(e, 'aboutImage', `Foto Comunidad ${i + 1}`, 'image', url)}
              style={{
                height: i % 2 === 0 ? 320 : 380,
                borderRadius: 20,
                overflow: 'hidden',
                boxShadow: '0 12px 30px rgba(0,0,0,0.4)',
                border: '1px solid rgba(255,255,255,0.12)',
                cursor: editMode ? 'pointer' : 'default'
              }}
            >
              <img src={url} alt={`Comunidad ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// 7. PLANIFICA TU VISITA (SOLO FOTOS / PANORÁMICO VISUAL)
// ─────────────────────────────────────────────────────────────

export function VisitVisualLayout({
  data = {},
  planAVisit = {},
  editMode = false,
  handleEdit,
  handleNavClick,
  ost = () => ({}),
  accentColor = '#C4A35A',
  primaryBg = '#07080D',
  font = 'inherit'
}) {
  const bgImg = planAVisit.image || data.heroImage || 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1200&q=85&fit=crop'
  const serviceTimes = (planAVisit.serviceTimes || [
    { name: 'Servicio Principal', day: 'Domingo', time: '10:30 AM' },
    { name: 'Noche de Oración', day: 'Miércoles', time: '7:30 PM' }
  ]).filter(Boolean)

  return (
    <section id="wp-plan-visit" style={{ width: '100%', background: primaryBg, color: '#FFFFFF', padding: '100px 6%', boxSizing: 'border-box', fontFamily: font }}>
      <div style={{ maxWidth: 1300, margin: '0 auto' }}>
        <div style={{ position: 'relative', minHeight: 460, borderRadius: 24, overflow: 'hidden', display: 'flex', alignItems: 'flex-end', padding: '48px 5%', border: '1px solid rgba(255,255,255,0.15)', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
          <img src={bgImg} alt="Visítanos" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.88) 100%)' }} />

          <div style={{ position: 'relative', zIndex: 10, width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24 }}>
            <div style={{ maxWidth: 640 }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 800, color: accentColor, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 12 }}>
                ✦ HORARIOS & UBICACIÓN
              </div>
              <h2 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)', fontWeight: 900, margin: '0 0 16px', lineHeight: 1.1 }}>
                {planAVisit.title || 'Planifica tu Visita'}
              </h2>
              <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.85)', margin: '0 0 24px', maxWidth: 520 }}>
                {planAVisit.subtitle || 'Te esperamos con los brazos abiertos. Hay un lugar especial reservado para ti y tu familia.'}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                {serviceTimes.map((st, i) => (
                  <div key={i} style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)', padding: '8px 16px', borderRadius: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ color: accentColor, fontSize: '0.9rem' }}>⏰</span>
                    <div>
                      <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#FFFFFF' }}>{st?.name || 'Servicio'}</div>
                      <div style={{ fontSize: '0.7rem', color: accentColor, fontWeight: 700 }}>{st?.day} · {st?.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <a
              href="#wp-contact"
              onClick={(e) => handleNavClick && handleNavClick(e, '#wp-contact', 'planAVisit.ctaText', 'Botón Visita', 'Cómo Llegar')}
              style={{ padding: '16px 36px', borderRadius: 999, background: accentColor, color: '#000000', fontWeight: 900, fontSize: '0.86rem', textDecoration: 'none', textTransform: 'uppercase' }}
            >
              Cómo Llegar
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// 8. VALORES (SOLO IMÁGENES / CARDS VISUALES)
// ─────────────────────────────────────────────────────────────

export function ValuesVisualLayout({
  data = {},
  values = [],
  editMode = false,
  handleEdit,
  handleNavClick,
  ost = () => ({}),
  accentColor = '#C4A35A',
  primaryBg = '#07080D',
  font = 'inherit'
}) {
  const defaultValues = values.length > 0 ? values : [
    { title: 'Amor y Gracia', text: 'Recibimos a todos sin juzgar, reflejando el amor incondicional de Jesús.' },
    { title: 'Adoración Apasionada', text: 'Vivimos vidas de alabanza constante y entrega total al Espíritu Santo.' },
    { title: 'Comunidad Real', text: 'Crecemos juntos en grupos pequeños, compartiendo vida, fe y oración.' }
  ]

  const photos = [
    'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=85&fit=crop',
    'https://images.unsplash.com/photo-1509021436471-18736672b71e?w=800&q=85&fit=crop',
    'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&q=85&fit=crop'
  ]

  return (
    <section id="wp-values" style={{ width: '100%', background: primaryBg, color: '#FFFFFF', padding: '100px 6%', boxSizing: 'border-box', fontFamily: font }}>
      <div style={{ maxWidth: 1300, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 50 }}>
          <div style={{ fontSize: '0.78rem', fontWeight: 800, color: accentColor, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 12 }}>
            ✦ NUESTRA IDENTIDAD
          </div>
          <h2 style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.4rem)', fontWeight: 900, margin: 0, letterSpacing: '-0.03em' }}>
            Valores & Fundamentos de Fe
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
          {defaultValues.map((val, idx) => (
            <div
              key={idx}
              style={{
                position: 'relative',
                height: 360,
                borderRadius: 20,
                overflow: 'hidden',
                boxShadow: '0 12px 35px rgba(0,0,0,0.45)',
                border: '1px solid rgba(255,255,255,0.12)'
              }}
            >
              <img src={photos[idx % photos.length]} alt={val.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.88) 100%)' }} />

              <div style={{ position: 'absolute', bottom: 24, left: 24, right: 24 }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: accentColor, color: '#000000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '0.9rem', marginBottom: 14 }}>
                  {idx + 1}
                </div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#FFFFFF', margin: '0 0 8px' }}>
                  {val.title}
                </h3>
                <p style={{ fontSize: '0.92rem', color: 'rgba(255,255,255,0.8)', margin: 0, lineHeight: 1.5 }}>
                  {val.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// 10. BIENVENIDA SPLIT (SPLIT TARJETA / EDITORIAL MODERNO)
// ─────────────────────────────────────────────────────────────

export function WelcomeSplitLayout({
  data = {},
  welcome: welcomeProp,
  editMode = false,
  handleEdit,
  handleNavClick,
  ost = () => ({}),
  accentColor = '#C4A35A',
  primaryBg = '#07080D',
  font = 'inherit'
}) {
  const welcome = welcomeProp || data.welcome || {}
  const bgPhoto = data.visionImage || welcome.image || 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1200&q=85&fit=crop'

  return (
    <section id="wp-welcome" style={{ width: '100%', background: primaryBg, color: '#FFFFFF', padding: '100px 6%', boxSizing: 'border-box', fontFamily: font, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
      <div style={{ maxWidth: 1300, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 40, alignItems: 'center' }}>
        {/* Left Side: Modern Card with Text & Actions */}
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 28, padding: 'clamp(32px, 5vw, 56px)', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
          <div
            data-field="welcome.label"
            data-ovkey="welcome.label"
            className="editable-element"
            onClick={(e) => handleEdit && handleEdit(e, 'welcome.label', 'Etiqueta', 'text', welcome.label || 'Bienvenido a Casa')}
            style={{ fontSize: '0.8rem', fontWeight: 800, color: accentColor, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 16, display: 'inline-flex', alignItems: 'center', gap: 6, ...ost('welcome.label') }}
          >
            <span>✦</span> {welcome.label || 'BIENVENIDO A CASA'}
          </div>

          <h2
            data-field="welcome.title"
            data-ovkey="welcome.title"
            className="editable-element"
            onClick={(e) => handleEdit && handleEdit(e, 'welcome.title', 'Título', 'text', welcome.title)}
            style={{ fontSize: 'clamp(2.2rem, 4vw, 3.4rem)', fontWeight: 900, margin: '0 0 20px', lineHeight: 1.15, letterSpacing: '-0.02em', color: '#FFFFFF', ...ost('welcome.title') }}
          >
            {welcome.title || 'Una familia donde pertenecer, creer y crecer juntos.'}
          </h2>

          <p
            data-field="welcome.text"
            data-ovkey="welcome.text"
            className="editable-element"
            onClick={(e) => handleEdit && handleEdit(e, 'welcome.text', 'Mensaje Pastoral', 'textarea', welcome.text)}
            style={{ fontSize: '1.08rem', color: '#94A3B8', lineHeight: 1.7, margin: '0 0 36px', ...ost('welcome.text') }}
          >
            {welcome.text || 'Sin importar de dónde vengas o dónde te encuentres en tu caminar de fe, aquí siempre serás recibido con los brazos abiertos. Creemos que Dios tiene un propósito único para tu vida.'}
          </p>

          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <a
              data-field="welcome.ctaText"
              data-ovkey="welcome.ctaText"
              href={welcome.ctaLink || '#wp-plan-visit'}
              className="editable-element"
              onClick={(e) => handleNavClick && handleNavClick(e, welcome.ctaLink || '#wp-plan-visit', 'welcome.ctaText', 'Botón Primario', welcome.ctaText || 'Conoce Nuestra Visión')}
              style={{ padding: '15px 34px', borderRadius: 999, background: accentColor, color: '#000000', fontWeight: 800, fontSize: '0.85rem', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.04em', boxShadow: '0 4px 20px rgba(0,0,0,0.3)', ...ost('welcome.ctaText') }}
            >
              {welcome.ctaText || 'Conoce Nuestra Visión'}
            </a>
            <a
              data-field="welcome.ctaSecondaryText"
              data-ovkey="welcome.ctaSecondaryText"
              href="#wp-prayer"
              className="editable-element"
              onClick={(e) => handleNavClick && handleNavClick(e, '#wp-prayer', 'welcome.ctaSecondaryText', 'Botón Secundario', welcome.ctaSecondaryText || 'Pide Oración')}
              style={{ padding: '15px 30px', borderRadius: 999, background: 'transparent', border: '1.5px solid rgba(255,255,255,0.3)', color: '#FFFFFF', fontWeight: 800, fontSize: '0.85rem', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.04em', ...ost('welcome.ctaSecondaryText') }}
            >
              {welcome.ctaSecondaryText || 'Pide Oración'}
            </a>
          </div>
        </div>

        {/* Right Side: Framed Image with Floating Verse / Tagline */}
        <div style={{ position: 'relative', minHeight: 480, height: '100%', borderRadius: 28, overflow: 'hidden', boxShadow: '0 25px 60px rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <img src={bgPhoto} alt="Comunidad" style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: 480 }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.75) 100%)' }} />

          <div style={{ position: 'absolute', bottom: 32, left: 32, right: 32, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 20, padding: '22px 26px' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: accentColor, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>
              ✦ SALMOS 133:1
            </div>
            <div style={{ fontSize: '1.02rem', fontStyle: 'italic', color: '#FFFFFF', lineHeight: 1.5 }}>
              "¡Mirad cuán bueno y cuán delicioso es habitar los hermanos juntos en armonía!"
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// 11. HORARIOS & VISITA (HORARIOS CARD / 3 TARJETAS DESTACADAS)
// ─────────────────────────────────────────────────────────────

export function VisitCardsLayout({
  data = {},
  planAVisit: planAVisitProp,
  editMode = false,
  handleEdit,
  handleNavClick,
  ost = () => ({}),
  accentColor = '#C4A35A',
  primaryBg = '#07080D',
  font = 'inherit'
}) {
  const planAVisit = planAVisitProp || data.planAVisit || {}
  const times = planAVisit.serviceTimes || ['Domingos 10:30 AM · Culto General', 'Miércoles 7:30 PM · Noche de Oración y Palabra']

  return (
    <section id="wp-plan-visit" style={{ width: '100%', background: primaryBg, color: '#FFFFFF', padding: '100px 6%', boxSizing: 'border-box', fontFamily: font, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
      <div style={{ maxWidth: 1300, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto 60px' }}>
          <div
            data-field="planAVisit.eyebrow"
            data-ovkey="planAVisit.eyebrow"
            className="editable-element"
            onClick={(e) => handleEdit && handleEdit(e, 'planAVisit.eyebrow', 'Etiqueta Horarios', 'text', planAVisit.eyebrow || '✦ HORARIOS & UBICACIÓN')}
            style={{ fontSize: '0.8rem', fontWeight: 800, color: accentColor, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 14, ...ost('planAVisit.eyebrow') }}
          >
            {planAVisit.eyebrow || '✦ HORARIOS & UBICACIÓN'}
          </div>
          <h2
            data-field="planAVisit.title"
            data-ovkey="planAVisit.title"
            className="editable-element"
            onClick={(e) => handleEdit && handleEdit(e, 'planAVisit.title', 'Título Horarios', 'text', planAVisit.title)}
            style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.6rem)', fontWeight: 900, margin: '0 0 18px', lineHeight: 1.15, letterSpacing: '-0.02em', ...ost('planAVisit.title') }}
          >
            {planAVisit.title || 'Horarios de Servicios & Ubicación'}
          </h2>
          <p
            data-field="planAVisit.subtitle"
            data-ovkey="planAVisit.subtitle"
            className="editable-element"
            onClick={(e) => handleEdit && handleEdit(e, 'planAVisit.subtitle', 'Subtítulo Horarios', 'textarea', planAVisit.subtitle)}
            style={{ fontSize: '1.1rem', color: '#94A3B8', lineHeight: 1.6, margin: 0, ...ost('planAVisit.subtitle') }}
          >
            {planAVisit.subtitle || 'Te esperamos con los brazos abiertos. Encuentra aquí todo lo necesario para tu primera visita.'}
          </p>
        </div>

        {/* 3 Prominent Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 28 }}>
          {/* Card 1: Horarios de Servicios */}
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 24, padding: 36, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 15px 40px rgba(0,0,0,0.4)' }}>
            <div>
              <div style={{ width: 52, height: 52, borderRadius: 16, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', marginBottom: 20 }}>
                ⏰
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '0 0 16px', color: '#FFFFFF' }}>
                Horarios de Cultos
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
                {times.map((t, idx) => (
                  <div key={idx} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px 16px', borderRadius: 12, fontSize: '0.95rem', fontWeight: 700, color: '#F1F5F9', display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ color: accentColor }}>✦</span>
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>
            <a
              href="#wp-sermons"
              onClick={(e) => handleNavClick && handleNavClick(e, '#wp-sermons', 'sermons', 'Ver Prédicas', 'Ver en Línea')}
              style={{ color: accentColor, fontWeight: 800, fontSize: '0.85rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}
            >
              <span>Ver transmisiones en vivo</span> <span>→</span>
            </a>
          </div>

          {/* Card 2: Dirección & Ubicación */}
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 24, padding: 36, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 15px 40px rgba(0,0,0,0.4)' }}>
            <div>
              <div style={{ width: 52, height: 52, borderRadius: 16, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', marginBottom: 20 }}>
                📍
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '0 0 12px', color: '#FFFFFF' }}>
                Nuestra Dirección
              </h3>
              <p
                data-field="planAVisit.address"
                data-ovkey="planAVisit.address"
                className="editable-element"
                onClick={(e) => handleEdit && handleEdit(e, 'planAVisit.address', 'Dirección', 'text', planAVisit.address)}
                style={{ fontSize: '1.05rem', color: '#E2E8F0', lineHeight: 1.6, margin: '0 0 16px', fontWeight: 600, ...ost('planAVisit.address') }}
              >
                {planAVisit.address || 'Av. Las Palmeras #123, San Salvador, El Salvador'}
              </p>
              <div style={{ fontSize: '0.88rem', color: '#94A3B8', lineHeight: 1.5, marginBottom: 24 }}>
                🚗 Contamos con amplio estacionamiento gratuito y acceso cómodo para toda la familia.
              </div>
            </div>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(planAVisit.address || 'Iglesia')}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: accentColor, fontWeight: 800, fontSize: '0.85rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}
            >
              <span>Abrir en Google Maps</span> <span>↗</span>
            </a>
          </div>

          {/* Card 3: Qué Esperar & CTA */}
          <div style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)', border: `1.5px solid ${accentColor}`, borderRadius: 24, padding: 36, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: `0 15px 45px rgba(0,0,0,0.5)` }}>
            <div>
              <div style={{ width: 52, height: 52, borderRadius: 16, background: accentColor, color: '#000000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', marginBottom: 20 }}>
                🤝
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '0 0 12px', color: '#FFFFFF' }}>
                ¿Primera Vez Aquí?
              </h3>
              <p style={{ fontSize: '0.98rem', color: '#CBD5E1', lineHeight: 1.6, margin: '0 0 24px' }}>
                ¡Te recibiremos como en casa! Tenemos equipo de bienvenida listo para guiarte a ti y a tus hijos a sus salones de clases.
              </p>
            </div>
            <a
              data-field="planAVisit.ctaText"
              data-ovkey="planAVisit.ctaText"
              href="#wp-contact"
              className="editable-element"
              onClick={(e) => handleNavClick && handleNavClick(e, '#wp-contact', 'planAVisit.ctaText', 'Botón Horarios', planAVisit.ctaText || 'Planifica tu Visita')}
              style={{ padding: '16px 28px', borderRadius: 999, background: accentColor, color: '#000000', fontWeight: 800, fontSize: '0.88rem', textDecoration: 'none', textAlign: 'center', textTransform: 'uppercase', letterSpacing: '0.04em', boxShadow: '0 6px 20px rgba(0,0,0,0.35)', ...ost('planAVisit.ctaText') }}
            >
              {planAVisit.ctaText || 'Planifica tu Visita'}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// 12. VALORES MINIMALISTAS (LISTA EDITORIAL CON NÚMEROS GIGANTES)
// ─────────────────────────────────────────────────────────────

export function ValuesMinimalLayout({
  data = {},
  values = [],
  editMode = false,
  handleEdit,
  handleNavClick,
  ost = () => ({}),
  accentColor = '#C4A35A',
  primaryBg = '#07080D',
  font = 'inherit'
}) {
  const defaultValues = values.length > 0 ? values : [
    { title: 'Amor y Gracia Incondicional', text: 'Recibimos a todos sin juzgar, reflejando el amor de Dios en cada acción.' },
    { title: 'Adoración Apasionada', text: 'Vivimos vidas de entrega total y reverencia profunda al Espíritu Santo.' },
    { title: 'Comunidad Real & Auténtica', text: 'Crecemos juntos en grupos semanales compartiendo vida, fe y amistad.' },
    { title: 'Generosidad Transformadora', text: 'Damos lo mejor de nuestro tiempo, dones y recursos para bendecir a otros.' }
  ]

  return (
    <section id="wp-values" style={{ width: '100%', background: primaryBg, color: '#FFFFFF', padding: '100px 6%', boxSizing: 'border-box', fontFamily: font, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ marginBottom: 60 }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 800, color: accentColor, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 12 }}>
            ✦ NUESTRA IDENTIDAD & DOCTRINA
          </div>
          <h2 style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)', fontWeight: 900, margin: 0, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
            Valores que Definen Quiénes Somos
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {defaultValues.map((val, idx) => (
            <div
              key={idx}
              style={{
                display: 'grid',
                gridTemplateColumns: 'clamp(60px, 8vw, 90px) 1fr',
                gap: 32,
                alignItems: 'baseline',
                padding: '36px 0',
                borderTop: '1px solid rgba(255,255,255,0.1)',
                borderBottom: idx === defaultValues.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none'
              }}
            >
              <div style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 900, color: accentColor, fontFamily: 'monospace', lineHeight: 1 }}>
                0{idx + 1}
              </div>
              <div>
                <h3
                  data-field={`values.${idx}.title`}
                  data-ovkey={`values.${idx}.title`}
                  className="editable-element"
                  onClick={(e) => handleEdit && handleEdit(e, `values.${idx}.title`, `Valor ${idx + 1} Título`, 'text', val.title)}
                  style={{ fontSize: 'clamp(1.3rem, 2.2vw, 1.8rem)', fontWeight: 800, color: '#FFFFFF', margin: '0 0 10px', ...ost(`values.${idx}.title`) }}
                >
                  {val.title}
                </h3>
                <p
                  data-field={`values.${idx}.text`}
                  data-ovkey={`values.${idx}.text`}
                  className="editable-element"
                  onClick={(e) => handleEdit && handleEdit(e, `values.${idx}.text`, `Valor ${idx + 1} Descripción`, 'textarea', val.text)}
                  style={{ fontSize: '1.02rem', color: '#94A3B8', lineHeight: 1.7, margin: 0, maxWidth: 800, ...ost(`values.${idx}.text`) }}
                >
                  {val.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// 13. MINISTERIOS MOSAICO (GRID BENTO DINÁMICO)
// ─────────────────────────────────────────────────────────────

export function MinistriesGridLayout({
  data = {},
  ministries = [],
  editMode = false,
  handleEdit,
  handleNavClick,
  ost = () => ({}),
  accentColor = '#C4A35A',
  primaryBg = '#07080D',
  font = 'inherit'
}) {
  const defaultMinistries = (Array.isArray(ministries) && ministries.length > 0) ? ministries : [
    { name: 'Ministerio Kids', description: 'Formando a las nuevas generaciones con historias de fe y diversión.', image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=800&q=85&fit=crop', age: '0 - 11 años' },
    { name: 'Jóvenes & Universitarios', description: 'Una comunidad apasionada buscando su propósito en Dios.', image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=85&fit=crop', age: '12 - 25 años' },
    { name: 'Matrimonios & Familias', description: 'Herramientas y talleres para construir hogares sólidos y llenos de paz.', image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&q=85&fit=crop', age: 'Familias' },
    { name: 'Alabanza & Adoración', description: 'Músicos y creativos liderando con excelencia en cada servicio.', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=85&fit=crop', age: 'Creativos' }
  ]

  return (
    <section id="wp-ministerios" style={{ width: '100%', background: primaryBg, color: '#FFFFFF', padding: '100px 6%', boxSizing: 'border-box', fontFamily: font, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
      <div style={{ maxWidth: 1300, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto 60px' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 800, color: accentColor, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 12 }}>
            ✦ COMUNIDAD ACTIVA
          </div>
          <h2 style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.6rem)', fontWeight: 900, margin: '0 0 16px', letterSpacing: '-0.02em' }}>
            {data.ministriesTitle || 'Nuestros Ministerios y Familias'}
          </h2>
          <p style={{ fontSize: '1.1rem', color: '#94A3B8', margin: 0 }}>
            {data.ministriesSubtitle || 'Hay un grupo especial esperando por ti y tu familia.'}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          {defaultMinistries.map((m, idx) => (
            <div
              key={idx}
              style={{
                position: 'relative',
                height: 380,
                borderRadius: 24,
                overflow: 'hidden',
                boxShadow: '0 15px 40px rgba(0,0,0,0.45)',
                border: '1px solid rgba(255,255,255,0.1)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: 28,
                boxSizing: 'border-box'
              }}
            >
              <img
                src={m.image || 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&q=85&fit=crop'}
                alt={m.name}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.92) 100%)' }} />

              <div style={{ position: 'relative', zIndex: 2 }}>
                <span style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)', padding: '5px 12px', borderRadius: 999, fontSize: '0.72rem', fontWeight: 800, color: accentColor, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {m.age || 'Ministerio'}
                </span>
              </div>

              <div style={{ position: 'relative', zIndex: 2 }}>
                <h3
                  data-field={`ministries.${idx}.name`}
                  data-ovkey={`ministries.${idx}.name`}
                  className="editable-element"
                  onClick={(e) => handleEdit && handleEdit(e, `ministries.${idx}.name`, `Ministerio ${idx + 1}`, 'text', m.name)}
                  style={{ fontSize: '1.45rem', fontWeight: 900, color: '#FFFFFF', margin: '0 0 8px', ...ost(`ministries.${idx}.name`) }}
                >
                  {m.name}
                </h3>
                <p
                  data-field={`ministries.${idx}.description`}
                  data-ovkey={`ministries.${idx}.description`}
                  className="editable-element"
                  onClick={(e) => handleEdit && handleEdit(e, `ministries.${idx}.description`, `Descripción ${idx + 1}`, 'textarea', m.description)}
                  style={{ fontSize: '0.92rem', color: '#CBD5E1', lineHeight: 1.5, margin: '0 0 16px', ...ost(`ministries.${idx}.description`) }}
                >
                  {m.description}
                </p>
                <a
                  href="#wp-contact"
                  onClick={(e) => handleNavClick && handleNavClick(e, '#wp-contact', 'ministries.contact', 'Conectar', 'Conectar')}
                  style={{ color: '#FFFFFF', fontSize: '0.82rem', fontWeight: 800, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}
                >
                  <span>Conectar con este grupo</span> <span>↗</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// 14. PRÓXIMOS PASOS (VISUAL: FOTO CARDS & NUMBERED: TIMELINE)
// ─────────────────────────────────────────────────────────────

export function NextStepsVisualLayout({
  data = {},
  nextSteps: nextStepsProp,
  editMode = false,
  handleEdit,
  handleNavClick,
  ost = () => ({}),
  accentColor = '#C4A35A',
  primaryBg = '#07080D',
  font = 'inherit'
}) {
  const nextSteps = nextStepsProp || data.nextSteps || {}
  const steps = nextSteps.steps || [
    { title: '1. Creer & Bautismo', description: 'Da el paso público de tu fe y conoce la nueva vida que Dios te ofrece.', image: 'https://images.unsplash.com/photo-1543807535-eceef0bc6599?w=800&q=85&fit=crop' },
    { title: '2. Conectar en Grupos', description: 'No camines solo. Intégrate a un grupo en casa para orar y crecer.', image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&q=85&fit=crop' },
    { title: '3. Servir con Pasión', description: 'Descubre tus dones y marca una diferencia real en la comunidad.', image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=85&fit=crop' }
  ]

  return (
    <section id="wp-next-steps" style={{ width: '100%', background: primaryBg, color: '#FFFFFF', padding: '100px 6%', boxSizing: 'border-box', fontFamily: font, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
      <div style={{ maxWidth: 1300, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto 60px' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 800, color: accentColor, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 12 }}>
            ✦ CRECIMIENTO PERSONAL
          </div>
          <h2 style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.6rem)', fontWeight: 900, margin: '0 0 16px', letterSpacing: '-0.02em' }}>
            {nextSteps.title || 'Tus Próximos Pasos en la Fe'}
          </h2>
          <p style={{ fontSize: '1.1rem', color: '#94A3B8', margin: 0 }}>
            {nextSteps.subtitle || 'Un sendero claro para avanzar y consolidar tu propósito.'}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 28 }}>
          {steps.map((st, idx) => (
            <div
              key={idx}
              style={{
                position: 'relative',
                height: 400,
                borderRadius: 24,
                overflow: 'hidden',
                boxShadow: '0 15px 40px rgba(0,0,0,0.5)',
                border: '1px solid rgba(255,255,255,0.1)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: 32,
                boxSizing: 'border-box'
              }}
            >
              <img src={st.image || 'https://images.unsplash.com/photo-1543807535-eceef0bc6599?w=800&q=85&fit=crop'} alt={st.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.92) 100%)' }} />

              <div style={{ position: 'relative', zIndex: 2 }}>
                <div style={{ width: 42, height: 42, borderRadius: '50%', background: accentColor, color: '#000000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1.1rem' }}>
                  {idx + 1}
                </div>
              </div>

              <div style={{ position: 'relative', zIndex: 2 }}>
                <h3
                  data-field={`nextSteps.steps.${idx}.title`}
                  data-ovkey={`nextSteps.steps.${idx}.title`}
                  className="editable-element"
                  onClick={(e) => handleEdit && handleEdit(e, `nextSteps.steps.${idx}.title`, `Paso ${idx + 1}`, 'text', st.title)}
                  style={{ fontSize: '1.45rem', fontWeight: 900, color: '#FFFFFF', margin: '0 0 10px', ...ost(`nextSteps.steps.${idx}.title`) }}
                >
                  {st.title}
                </h3>
                <p
                  data-field={`nextSteps.steps.${idx}.description`}
                  data-ovkey={`nextSteps.steps.${idx}.description`}
                  className="editable-element"
                  onClick={(e) => handleEdit && handleEdit(e, `nextSteps.steps.${idx}.description`, `Descripción ${idx + 1}`, 'textarea', st.description)}
                  style={{ fontSize: '0.94rem', color: '#CBD5E1', lineHeight: 1.6, margin: 0, ...ost(`nextSteps.steps.${idx}.description`) }}
                >
                  {st.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function NextStepsNumberedLayout({
  data = {},
  nextSteps: nextStepsProp,
  editMode = false,
  handleEdit,
  handleNavClick,
  ost = () => ({}),
  accentColor = '#C4A35A',
  primaryBg = '#07080D',
  font = 'inherit'
}) {
  const nextSteps = nextStepsProp || data.nextSteps || {}
  const steps = nextSteps.steps || [
    { title: 'Conocer a Jesús', description: 'Acepta el llamado y comienza tu relación viva con Dios.' },
    { title: 'Bautismo en Agua', description: 'Testifica tu nueva vida en Cristo ante toda la congregación.' },
    { title: 'Servir en Comunidad', description: 'Usa tus talentos para bendecir vidas y expandir el Reino.' }
  ]

  return (
    <section id="wp-next-steps" style={{ width: '100%', background: primaryBg, color: '#FFFFFF', padding: '100px 6%', boxSizing: 'border-box', fontFamily: font, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
      <div style={{ maxWidth: 1300, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto 60px' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 800, color: accentColor, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 12 }}>
            ✦ TU CAMINO DE FE
          </div>
          <h2 style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.6rem)', fontWeight: 900, margin: '0 0 16px', letterSpacing: '-0.02em' }}>
            {nextSteps.title || '3 Pasos para Tu Crecimiento'}
          </h2>
          <p style={{ fontSize: '1.1rem', color: '#94A3B8', margin: 0 }}>
            {nextSteps.subtitle || 'Cada paso te acerca más a tu propósito en Cristo.'}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32, position: 'relative' }}>
          {steps.map((st, idx) => (
            <div
              key={idx}
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1.5px solid rgba(255,255,255,0.12)',
                borderRadius: 24,
                padding: '40px 32px',
                textAlign: 'center',
                boxShadow: '0 12px 35px rgba(0,0,0,0.4)',
                position: 'relative'
              }}
            >
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: `linear-gradient(135deg, ${accentColor} 0%, rgba(255,255,255,0.2) 100%)`, color: '#000000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1.6rem', margin: '0 auto 24px', boxShadow: `0 8px 24px ${accentColor}44` }}>
                {idx + 1}
              </div>
              <h3
                data-field={`nextSteps.steps.${idx}.title`}
                data-ovkey={`nextSteps.steps.${idx}.title`}
                className="editable-element"
                onClick={(e) => handleEdit && handleEdit(e, `nextSteps.steps.${idx}.title`, `Paso ${idx + 1}`, 'text', st.title)}
                style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FFFFFF', margin: '0 0 12px', ...ost(`nextSteps.steps.${idx}.title`) }}
              >
                {st.title}
              </h3>
              <p
                data-field={`nextSteps.steps.${idx}.description`}
                data-ovkey={`nextSteps.steps.${idx}.description`}
                className="editable-element"
                onClick={(e) => handleEdit && handleEdit(e, `nextSteps.steps.${idx}.description`, `Descripción ${idx + 1}`, 'textarea', st.description)}
                style={{ fontSize: '0.98rem', color: '#94A3B8', lineHeight: 1.6, margin: 0, ...ost(`nextSteps.steps.${idx}.description`) }}
              >
                {st.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// 15. SERMONES (TARJETAS MODERNAS CON REPRODUCTOR DIRECTO)
// ─────────────────────────────────────────────────────────────

export function SermonsCardsLayout({
  data = {},
  sermons = [],
  title,
  subtitle,
  editMode = false,
  handleEdit,
  handleNavClick,
  ost = () => ({}),
  accentColor = '#C4A35A',
  primaryBg = '#07080D',
  font = 'inherit'
}) {
  const defaultSermons = (Array.isArray(sermons) && sermons.length > 0) ? sermons : [
    { title: 'El Poder de la Fe en Tiempos Difíciles', speaker: 'Pastor Principal', date: 'Domingo Pasado', videoUrl: 'https://youtube.com', thumbnail: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=85&fit=crop' },
    { title: 'Caminando sobre las Aguas', speaker: 'Pastora Asociada', date: 'Hace 2 Semanas', videoUrl: 'https://youtube.com', thumbnail: 'https://images.unsplash.com/photo-1509021436471-18736672b71e?w=800&q=85&fit=crop' },
    { title: 'Gracia Inmerecida para una Nueva Vida', speaker: 'Pastor de Jóvenes', date: 'Hace 3 Semanas', videoUrl: 'https://youtube.com', thumbnail: 'https://images.unsplash.com/photo-1548625149-fc4a29cf7092?w=800&q=85&fit=crop' }
  ]

  return (
    <section id="wp-sermons" style={{ width: '100%', background: primaryBg, color: '#FFFFFF', padding: '100px 6%', boxSizing: 'border-box', fontFamily: font, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
      <div style={{ maxWidth: 1300, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 50, flexWrap: 'wrap', gap: 20 }}>
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 800, color: accentColor, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 12 }}>
              ✦ ENSEÑANZA & PALABRA
            </div>
            <h2 style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.6rem)', fontWeight: 900, margin: 0, letterSpacing: '-0.02em' }}>
              {title || data.sermonsTitle || 'Mensajes & Prédicas Recientes'}
            </h2>
          </div>
          <p style={{ fontSize: '1.05rem', color: '#94A3B8', margin: 0, maxWidth: 440 }}>
            {subtitle || data.sermonsSubtitle || 'Nutre tu espíritu cada semana con enseñanzas bíblicas prácticas.'}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 28 }}>
          {defaultSermons.map((s, idx) => (
            <div
              key={idx}
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 24,
                overflow: 'hidden',
                boxShadow: '0 15px 40px rgba(0,0,0,0.45)',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div style={{ position: 'relative', height: 220, overflow: 'hidden' }}>
                <img src={s.thumbnail || s.coverImage || 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=85&fit=crop'} alt={s.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: 56, height: 56, borderRadius: '50%', background: accentColor, color: '#000000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', paddingLeft: 4, boxShadow: '0 8px 25px rgba(0,0,0,0.5)' }}>
                    ▶
                  </div>
                </div>
              </div>

              <div style={{ padding: 28, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.78rem', color: '#94A3B8', fontWeight: 600, marginBottom: 10 }}>
                    <span>{s.date || 'Mensaje de Fin de Semana'}</span>
                    <span style={{ color: accentColor, fontWeight: 800 }}>Video HD</span>
                  </div>
                  <h3
                    data-field={`sermons.${idx}.title`}
                    data-ovkey={`sermons.${idx}.title`}
                    className="editable-element"
                    onClick={(e) => handleEdit && handleEdit(e, `sermons.${idx}.title`, `Sermón ${idx + 1}`, 'text', s.title)}
                    style={{ fontSize: '1.35rem', fontWeight: 800, color: '#FFFFFF', margin: '0 0 10px', lineHeight: 1.3, ...ost(`sermons.${idx}.title`) }}
                  >
                    {s.title}
                  </h3>
                  <div style={{ fontSize: '0.92rem', color: '#94A3B8', marginBottom: 20 }}>
                    🎙️ {s.speaker || 'Pastor'}
                  </div>
                </div>

                <a
                  href={s.videoUrl || '#wp-sermons'}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: accentColor, fontWeight: 800, fontSize: '0.85rem', textDecoration: 'none' }}
                >
                  <span>Ver Prédica Completa</span> <span>↗</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// 16. EVENTOS (TARJETAS CON INSIGNIA DE CALENDARIO PROMINENTE)
// ─────────────────────────────────────────────────────────────

export function EventsCardsLayout({
  data = {},
  events: eventsProp,
  editMode = false,
  handleEdit,
  handleNavClick,
  ost = () => ({}),
  accentColor = '#C4A35A',
  primaryBg = '#07080D',
  font = 'inherit'
}) {
  const evList = (eventsProp?.items || (Array.isArray(eventsProp) ? eventsProp : (data.events?.items || (Array.isArray(data.events) ? data.events : []))))
  const rawEvents = evList.length > 0 ? evList : [
    { title: 'Noche de Alabanza & Clamor', day: '24', month: 'OCT', time: '7:30 PM', location: 'Templo Central', description: 'Una velada de intimidad con Dios y adoración en vivo con todo el equipo musical.' },
    { title: 'Conferencia de Familias Fuertes', day: '12', month: 'NOV', time: '9:00 AM', location: 'Salón Comunitario', description: 'Pláticas prácticas y principios bíblicos para fortalecer tu matrimonio e hijos.' },
    { title: 'Bautismos & Fiesta en la Playa', day: '05', month: 'DIC', time: '2:00 PM', location: 'Costa del Sol', description: 'Celebremos juntos el nuevo nacimiento de hermanos en la fe.' }
  ]
  const defaultEvents = (rawEvents || []).filter(Boolean)

  return (
    <section id="wp-events" style={{ width: '100%', background: primaryBg, color: '#FFFFFF', padding: '100px 6%', boxSizing: 'border-box', fontFamily: font, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
      <div style={{ maxWidth: 1300, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto 60px' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 800, color: accentColor, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 12 }}>
            ✦ AGENDA & ACTIVIDADES
          </div>
          <h2 style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.6rem)', fontWeight: 900, margin: '0 0 16px', letterSpacing: '-0.02em' }}>
            Próximos Eventos & Calendario
          </h2>
          <p style={{ fontSize: '1.1rem', color: '#94A3B8', margin: 0 }}>
            Aparta estas fechas especiales y acompáñanos junto a tus seres queridos.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 28 }}>
          {defaultEvents.map((ev, idx) => (
            <div
              key={idx}
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1.5px solid rgba(255,255,255,0.12)',
                borderRadius: 24,
                padding: 32,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 15px 40px rgba(0,0,0,0.4)'
              }}
            >
              <div>
                {/* Date Badge */}
                <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', background: accentColor, color: '#000000', borderRadius: 16, padding: '8px 18px', marginBottom: 20, boxShadow: '0 6px 18px rgba(0,0,0,0.3)' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    {ev?.month || 'MES'}
                  </span>
                  <span style={{ fontSize: '1.8rem', fontWeight: 900, lineHeight: 1 }}>
                    {ev?.day || (idx + 15)}
                  </span>
                </div>

                <h3
                  data-field={`events.items.${idx}.title`}
                  data-ovkey={`events.items.${idx}.title`}
                  className="editable-element"
                  onClick={(e) => handleEdit && handleEdit(e, `events.items.${idx}.title`, `Evento ${idx + 1}`, 'text', ev.title)}
                  style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FFFFFF', margin: '0 0 12px', lineHeight: 1.3, ...ost(`events.items.${idx}.title`) }}
                >
                  {ev.title}
                </h3>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, fontSize: '0.85rem', color: '#94A3B8', marginBottom: 16 }}>
                  <span>⏰ {ev.time || '7:00 PM'}</span>
                  <span>📍 {ev.location || 'Auditorio Principal'}</span>
                </div>

                <p style={{ fontSize: '0.95rem', color: '#CBD5E1', lineHeight: 1.6, margin: '0 0 24px' }}>
                  {ev.description || 'Únete a nosotros para una reunión inspiradora.'}
                </p>
              </div>

              <a
                href="#wp-contact"
                onClick={(e) => handleNavClick && handleNavClick(e, '#wp-contact', 'events.rsvp', 'Registrarme', 'Registrarme')}
                style={{ display: 'inline-block', padding: '12px 24px', borderRadius: 999, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)', color: '#FFFFFF', fontWeight: 800, fontSize: '0.82rem', textDecoration: 'none', textAlign: 'center', textTransform: 'uppercase', letterSpacing: '0.04em' }}
              >
                Más Información / Registrarme ↗
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// 17. SOBRE NOSOTROS (SPLIT 50/50 COMUNIDAD & PILARES)
// ─────────────────────────────────────────────────────────────

export function AboutSplitLayout({
  data = {},
  about: aboutProp,
  editMode = false,
  handleEdit,
  handleNavClick,
  ost = () => ({}),
  accentColor = '#C4A35A',
  primaryBg = '#07080D',
  font = 'inherit'
}) {
  const about = aboutProp || data.about || {}
  const photo = data.aboutImage || about.image || 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=85&fit=crop'

  return (
    <section id="wp-about" style={{ width: '100%', background: primaryBg, color: '#FFFFFF', padding: '100px 6%', boxSizing: 'border-box', fontFamily: font, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
      <div style={{ maxWidth: 1300, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 48, alignItems: 'center' }}>
        {/* Left Side: Large Photo with Founded Badge */}
        <div style={{ position: 'relative', height: 540, borderRadius: 28, overflow: 'hidden', boxShadow: '0 25px 60px rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.12)' }}>
          <img src={photo} alt="Nuestra Comunidad" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 100%)' }} />

          <div style={{ position: 'absolute', bottom: 32, left: 32, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)', padding: '14px 22px', borderRadius: 16 }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 900, color: accentColor, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              ✦ NUESTRA HISTORIA
            </div>
            <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#FFFFFF' }}>
              {data.businessName || 'Comunidad de Fe'}
            </div>
          </div>
        </div>

        {/* Right Side: Narrative and 3 Pillars */}
        <div>
          <div
            data-field="about.eyebrow"
            data-ovkey="about.eyebrow"
            className="editable-element"
            onClick={(e) => handleEdit && handleEdit(e, 'about.eyebrow', 'Etiqueta Nosotros', 'text', '✦ NUESTRO CORAZÓN Y MISIÓN')}
            style={{ fontSize: '0.8rem', fontWeight: 800, color: accentColor, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 14 }}
          >
            ✦ NUESTRO CORAZÓN Y MISIÓN
          </div>

          <h2
            data-field="about.title"
            data-ovkey="about.title"
            className="editable-element"
            onClick={(e) => handleEdit && handleEdit(e, 'about.title', 'Título Nosotros', 'text', about.title)}
            style={{ fontSize: 'clamp(2.3rem, 4vw, 3.5rem)', fontWeight: 900, margin: '0 0 20px', lineHeight: 1.15, letterSpacing: '-0.02em', color: '#FFFFFF', ...ost('about.title') }}
          >
            {about.title || 'Nuestra Historia y Pasión por Servir'}
          </h2>

          <p
            data-field="about.text"
            data-ovkey="about.text"
            className="editable-element"
            onClick={(e) => handleEdit && handleEdit(e, 'about.text', 'Texto Nosotros', 'textarea', about.text)}
            style={{ fontSize: '1.08rem', color: '#94A3B8', lineHeight: 1.7, margin: '0 0 32px', ...ost('about.text') }}
          >
            {about.text || 'Nacimos con el sueño de ser una iglesia cercana, donde el mensaje de esperanza de Jesucristo sea presentado de forma relevante, comprensible y transformadora para cada persona.'}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 36 }}>
            {[
              { icon: '🕊️', title: 'Centrados en la Gracia', desc: 'Creemos en el perdón y la restauración integral.' },
              { icon: '🤝', title: 'Familias Saludables', desc: 'Espacios de crecimiento para niños, jóvenes y matrimonios.' },
              { icon: '🌍', title: 'Impacto en la Ciudad', desc: 'Llevamos compasión y ayuda práctica a quienes más lo necesitan.' }
            ].map((pillar, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', padding: '12px 18px', borderRadius: 14 }}>
                <span style={{ fontSize: '1.4rem' }}>{pillar.icon}</span>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#FFFFFF' }}>{pillar.title}</div>
                  <div style={{ fontSize: '0.85rem', color: '#94A3B8' }}>{pillar.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <a
            href="#wp-contact"
            onClick={(e) => handleNavClick && handleNavClick(e, '#wp-contact', 'about.contact', 'Conoce Más', 'Escríbenos')}
            style={{ display: 'inline-block', padding: '16px 36px', borderRadius: 999, background: accentColor, color: '#000000', fontWeight: 800, fontSize: '0.86rem', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.04em', boxShadow: '0 4px 20px rgba(0,0,0,0.35)' }}
          >
            Contáctanos y Conócenos ↗
          </a>
        </div>
      </div>
    </section>
  )
}

