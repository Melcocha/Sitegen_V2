import React, { useState } from 'react'
import { Sparkles, Calendar, Clock, MapPin, Play, Heart, ChevronRight, Phone, Volume2, ArrowUpRight } from 'lucide-react'
import TemplateDragHandles from './TemplateDragHandles'

export default function ChurchTemplateAfiche({ data = {}, editMode = false, activeField, onElementClick, onQuickUpdate, onQuickUpdateBatch }) {
  const [activeGallery, setActiveGallery] = useState(0)

  const businessName = data.businessName || 'Iglesia Noche de Adoración'
  const logoImage = data.logoImage || ''
  const primaryColor = data.primaryColor || '#0A0C10'
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
    ctaText: 'Planificar por WhatsApp',
    address: 'Av. Las Palmeras #123, San Salvador',
    serviceTimes: [
      'Sábado 6:00 PM — Noche de Adoración & Oración',
      'Domingo 10:30 AM — Servicio Familiar de Celebración',
      'Miércoles 7:00 PM — Noche de Discipulado'
    ]
  }

  const heroImage = data.heroImage || 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=1600&q=85&fit=crop'

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

  const handleNavClick = (e, targetHash, fieldKey, fieldLabel, currentText) => {
    if (editMode && onElementClick) {
      e.preventDefault()
      handleEdit(e, fieldKey, fieldLabel, 'text', currentText)
    } else if (targetHash) {
      e.preventDefault()
      const targetEl = document.querySelector(targetHash)
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  const activeFont = data.font || 'Syne'
  const primaryBg = data.primaryColor || '#090B10'
  const accentYellow = data.accentColor || '#FACC15'

  return (
    <div style={{
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

        .afiche-script-font {
          font-family: 'Playfair Display', 'Italiana', serif;
          font-style: italic;
          font-weight: 900;
        }

        .afiche-title-font {
          font-family: 'Bebas Neue', 'Syne', sans-serif;
          letter-spacing: 0.04em;
          line-height: 0.95;
          text-transform: uppercase;
        }

        .afiche-glow-btn {
          background: #FACC15;
          color: #090B10;
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          transition: all 0.25s ease;
          box-shadow: 0 0 25px rgba(250, 204, 21, 0.3);
        }
        .afiche-glow-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 35px rgba(250, 204, 21, 0.5);
          background: #FFE066;
        }

        .afiche-oval-badge {
          border: 1.5px solid #FACC15;
          border-radius: 999px;
          padding: 6px 18px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(250, 204, 21, 0.08);
          backdrop-filter: blur(8px);
        }

        .afiche-photo-banner {
          position: relative;
          overflow: hidden;
          transition: transform 0.4s ease;
        }
        .afiche-photo-banner:hover img {
          transform: scale(1.04);
        }
        .editable-element {
          cursor: ${editMode ? 'pointer' : 'default'};
          transition: outline 0.15s ease;
        }
      `}</style>

      {/* NAVBAR */}
      <header style={{
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

        <nav style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
          {((Array.isArray(data.navLinks) && data.navLinks.length > 0) ? data.navLinks : [
            { text: nav.item1 || 'INICIO', href: '#wp-hero' },
            { text: nav.item2 || 'EXPERIENCIA', href: '#wp-afiche-gallery' },
            { text: nav.item3 || 'MINISTERIOS', href: '#wp-ministries' },
            { text: nav.item4 || 'HORARIOS', href: '#wp-plan-visit' },
            { text: nav.item5 || 'CONTACTO', href: '#wp-contact' },
          ]).map((item, idx) => {
            const itemLabel = item.text || item.label || 'Link'
            return (
              <a
                key={idx}
                data-field={`navLinks.${idx}.text`}
                data-ovkey={`navLinks.${idx}.text`}
                href={item.href || '#wp-hero'}
                onClick={(e) => handleNavClick(e, item.href || '#wp-hero', `navLinks.${idx}.text`, `Menú: ${itemLabel}`, itemLabel)}
                style={{ color: '#FFFFFF', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.05em', ...ost(`navLinks.${idx}.text`) }}
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
          href={data.hero?.ctaLink || data.navCtaLink || '#wp-plan-visit'}
          className="afiche-glow-btn editable-element"
          onClick={(e) => handleNavClick(e, data.hero?.ctaLink || data.navCtaLink || '#wp-plan-visit', 'hero.ctaText', 'Botón Navbar Visítanos', data.hero?.ctaText || data.navCtaText || planAVisit.ctaText || 'Planifica tu Visita')}
          style={{
            padding: '10px 22px',
            borderRadius: 999,
            fontSize: '0.75rem',
            textDecoration: 'none',
            ...ost('hero.ctaText')
          }}
        >
          {data.hero?.ctaText || data.navCtaText || planAVisit.ctaText || 'Planifica tu Visita'}
        </a>
      </header>

      {/* HERO AFICHE AMPLISÍMO A PANTALLA COMPLETA */}
      {data.sectionsVisibility?.hero !== false && (
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
        {/* Background image — now fully clickable in edit mode */}
        <div
          className="editable-element"
          onClick={(e) => handleEdit(e, 'heroImage', 'Imagen de Portada (Hero)', 'image', heroImage)}
          style={{ position: 'absolute', inset: 0, zIndex: 0, cursor: editMode ? 'pointer' : 'default' }}
        >
          <img
            src={heroImage}
            alt={businessName}
            onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=1600&q=85&fit=crop' }}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(9,11,16,0.6) 0%, rgba(9,11,16,0.85) 75%, #090B10 100%)', pointerEvents: 'none' }} />
          {editMode && (
            <div style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(99,102,241,0.9)', color: '#fff', fontSize: '0.72rem', fontWeight: 800, padding: '4px 12px', borderRadius: 999, backdropFilter: 'blur(8px)', letterSpacing: '0.04em', pointerEvents: 'none', zIndex: 2 }}>
              📷 Clic para cambiar foto de portada
            </div>
          )}
        </div>
        <div style={{ position: 'absolute', top: '18%', right: '10%', color: '#FACC15', fontSize: '2.5rem', opacity: 0.85, zIndex: 1, pointerEvents: 'none' }}>✴</div>
        <div style={{ position: 'absolute', bottom: '25%', left: '8%', color: '#FACC15', fontSize: '2rem', opacity: 0.7, zIndex: 1, pointerEvents: 'none' }}>✦</div>

        <div style={{ maxWidth: 900, margin: '0 auto', zIndex: 10, position: 'relative' }}>
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
      </section>
      )}

      {/* MOSAICO AFICHES VISUALES AMPLIOS */}
      {data.sectionsVisibility?.nucleusColumns !== false && (
      <section id="wp-afiche-gallery" style={{ padding: '100px 6%', background: '#0D0F17' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <span className="afiche-script-font" style={{ color: '#FACC15', fontSize: '1.8rem', display: 'block' }}>
            Momentos Inolvidables
          </span>
          <h2 className="afiche-title-font" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', margin: 0, color: '#FFFFFF' }}>
            VIVE LA EXPERIENCIA CON NOSOTROS
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
                <img
                  src={cardImg}
                  alt={item.title || 'Foto de tarjeta'}
                  onError={(e) => {
                    e.currentTarget.src = fallbackImg
                  }}
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                />
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
      </section>
      )}

      {/* MINISTERIOS & COMUNIDADES */}
      {data.sectionsVisibility?.ministries !== false && (
      <section id="wp-ministerios" style={{ padding: '120px 6%', background: '#090B10' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <span className="afiche-script-font" style={{ color: '#FACC15', fontSize: '1.8rem', display: 'block' }}>
            Nuestra Familia
          </span>
          <h2 className="afiche-title-font" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', margin: 0, color: '#FFFFFF' }}>
            MINISTERIOS & COMUNIDADES
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
                <img
                  src={min.image}
                  alt={min.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
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
      </section>
      )}

      {/* HORARIOS & PLANIFICA TU VISITA */}
      {data.sectionsVisibility?.planAVisit !== false && (
      <section id="wp-plan-visit" style={{
        padding: '120px 6%',
        background: 'linear-gradient(135deg, #11131E 0%, #090B10 100%)'
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 60, alignItems: 'center' }}>
          <div>
            <div className="afiche-script-font" style={{ color: '#FACC15', fontSize: '2rem', marginBottom: -6 }}>
              Te Esperamos
            </div>
            <h2 className="afiche-title-font" style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', color: '#FFFFFF', margin: '0 0 16px' }}>
              HORARIOS & UBICACIÓN
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

            <a
              data-field="planAVisit.ctaText"
              data-ovkey="planAVisit.ctaText"
              href="https://wa.me/?text=Hola,%20quisiera%20planificar%20mi%20visita"
              target="_blank"
              rel="noreferrer"
              className="afiche-glow-btn editable-element"
              onClick={(e) => handleEdit(e, 'planAVisit.ctaText', 'Texto Botón Visítanos', 'text', planAVisit.ctaText)}
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
              {planAVisit.ctaText}
              <ArrowUpRight size={18} />
            </a>
          </div>

          <div
            data-field="planAVisit.image"
            data-ovkey="planAVisit.image"
            className="editable-element"
            onClick={(e) => handleEdit(e, 'planAVisit.image', 'Foto Sección Visítanos', 'image', 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=1000&q=85&fit=crop')}
            style={{
              position: 'relative',
              height: 540,
              overflow: 'hidden',
              cursor: editMode ? 'pointer' : 'default',
              ...ost('planAVisit.image')
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=1000&q=85&fit=crop"
              alt="Adoración"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>
      </section>
      )}

      {/* ── BIENVENIDA A CASA ── */}
      {data.sectionsVisibility?.welcome !== false && (
      <section id="wp-welcome" style={{ padding: '100px 6%', background: '#090B10', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div className="afiche-script-font" style={{ color: '#FACC15', fontSize: '1.8rem', marginBottom: 8 }}>
            Bienvenido a Casa
          </div>
          <h2 className="afiche-title-font" data-field="welcome.title" data-ovkey="welcome.title" onClick={(e) => handleEdit(e, 'welcome.title', 'Título Bienvenida', 'text', data.welcome?.title || 'Una comunidad apasionada por Jesús')} style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: '#FFFFFF', margin: '0 0 20px', ...ost('welcome.title') }}>
            {data.welcome?.title || 'Una comunidad apasionada por Jesús'}
          </h2>
          <p data-field="welcome.text" data-ovkey="welcome.text" className="editable-element" onClick={(e) => handleEdit(e, 'welcome.text', 'Mensaje Pastoral', 'textarea', data.welcome?.text || 'Aquí hay un lugar para ti y tu familia.')} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '1.05rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, margin: 0, ...ost('welcome.text') }}>
            {data.welcome?.text || 'Aquí hay un lugar para ti y tu familia.'}
          </p>
        </div>
      </section>
      )}

      {/* ── VALORES & FUNDAMENTOS ── */}
      {data.sectionsVisibility?.values !== false && (
      <section id="wp-values" style={{ padding: '100px 6%', background: '#0D0F17' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <span className="afiche-script-font" style={{ color: '#FACC15', fontSize: '1.6rem' }}>Fundamentos</span>
            <h2 className="afiche-title-font" style={{ fontSize: '3.2rem', color: '#FFFFFF', margin: 0 }}>NUESTROS VALORES</h2>
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
      </section>
      )}

      {/* ── PRÓXIMOS PASOS ── */}
      {data.sectionsVisibility?.nextSteps !== false && (
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
      </section>
      )}

      {/* ── SERMONES ── */}
      {data.sectionsVisibility?.sermons !== false && (
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
                  <img src={sermon.image || 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=85&fit=crop'} alt={sermon.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
      </section>
      )}

      {/* ── DONACIONES ── */}
      {data.sectionsVisibility?.donation !== false && (
      <section id="wp-donations" style={{ padding: '100px 6%', background: '#090B10' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(250,204,21,0.3)', borderRadius: 24, padding: 48 }}>
          <h2 className="afiche-title-font" data-field="donation.title" data-ovkey="donation.title" onClick={(e) => handleEdit(e, 'donation.title', 'Título Donaciones', 'text', data.donation?.title || 'GENEROSIDAD')} style={{ fontSize: '3rem', color: '#FFFFFF', margin: '0 0 16px', ...ost('donation.title') }}>
            {data.donation?.title || 'GENEROSIDAD'}
          </h2>
          <p data-field="donation.subtitle" data-ovkey="donation.subtitle" className="editable-element" onClick={(e) => handleEdit(e, 'donation.subtitle', 'Subtítulo Donaciones', 'textarea', data.donation?.subtitle || 'Gracias a tu ofrenda podemos seguir extendiendo el mensaje.')} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '1rem', color: 'rgba(255,255,255,0.75)', margin: '0 0 28px', ...ost('donation.subtitle') }}>
            {data.donation?.subtitle || 'Gracias a tu ofrenda podemos seguir extendiendo el mensaje.'}
          </p>
          <a data-field="donation.ctaText" data-ovkey="donation.ctaText" href="#wp-contact" className="afiche-glow-btn editable-element" onClick={(e) => handleNavClick(e, '#wp-contact', 'donation.ctaText', 'Botón Donaciones', data.donation?.ctaText || 'Ofrendar en Línea')} style={{ padding: '14px 32px', borderRadius: 999, textDecoration: 'none', fontSize: '0.85rem', ...ost('donation.ctaText') }}>
            {data.donation?.ctaText || 'Ofrendar en Línea'}
          </a>
        </div>
      </section>
      )}

      {/* ── PETICIÓN DE ORACIÓN ── */}
      {data.sectionsVisibility?.prayerRequest !== false && (
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
      </section>
      )}

      {/* ── SOBRE NOSOTROS ── */}
      {data.about && data.sectionsVisibility?.about !== false && (
        <section id="wp-about" style={{ padding: '100px 6%', background: '#090B10' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 60, alignItems: 'center' }}>
            <div>
              <h2 className="afiche-title-font" data-field="about.title" data-ovkey="about.title" onClick={(e) => handleEdit(e, 'about.title', 'Título Sobre Nosotros', 'text', data.about.title || 'NUESTRA HISTORIA')} style={{ fontSize: '3rem', color: '#FFFFFF', margin: '0 0 20px', ...ost('about.title') }}>
                {data.about.title || 'NUESTRA HISTORIA'}
              </h2>
              <p data-field="about.text" data-ovkey="about.text" className="editable-element" onClick={(e) => handleEdit(e, 'about.text', 'Texto Sobre Nosotros', 'textarea', data.about.text)} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '1.05rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, margin: 0, ...ost('about.text') }}>
                {data.about.text}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ── WIDGET FLOTANTE POP-UP ── */}
      {Boolean(data.floatingWidget?.enabled) && data.sectionsVisibility?.floatingWidget !== false && (
        <div id="wp-widget" style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 999, background: '#090B10', border: '2px solid #FACC15', borderRadius: 20, padding: '20px 24px', maxWidth: 320, boxShadow: '0 10px 40px rgba(0,0,0,0.8)', color: '#FFF' }}>
          <div data-field="floatingWidget.title" data-ovkey="floatingWidget.title" className="afiche-title-font editable-element" onClick={(e) => handleEdit(e, 'floatingWidget.title', 'Título Pop-up Flotante', 'text', data.floatingWidget.title || 'Planifica tu Visita')} style={{ fontSize: '1.2rem', color: '#FACC15', marginBottom: 6, ...ost('floatingWidget.title') }}>
            {data.floatingWidget.title || 'Planifica tu Visita'}
          </div>
          <div data-field="floatingWidget.subtitle" data-ovkey="floatingWidget.subtitle" className="editable-element" onClick={(e) => handleEdit(e, 'floatingWidget.subtitle', 'Mensaje Pop-up', 'text', data.floatingWidget.subtitle || 'Domingos 9:00 AM & 11:00 AM')} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', marginBottom: 14, ...ost('floatingWidget.subtitle') }}>
            {data.floatingWidget.subtitle || 'Domingos 9:00 AM & 11:00 AM'}
          </div>
          <a data-field="floatingWidget.ctaText" data-ovkey="floatingWidget.ctaText" href={data.floatingWidget.ctaLink || '#wp-plan-visit'} onClick={(e) => handleNavClick(e, data.floatingWidget.ctaLink || '#wp-plan-visit', 'floatingWidget.ctaText', 'Texto Botón Pop-up', data.floatingWidget.ctaText || 'Planifica tu Visita')} className="afiche-glow-btn editable-element" style={{ display: 'block', textAlign: 'center', padding: '10px 18px', borderRadius: 999, textDecoration: 'none', fontSize: '0.8rem', ...ost('floatingWidget.ctaText') }}>
            {data.floatingWidget.ctaText || 'Planifica tu Visita'}
          </a>
        </div>
      )}

      {/* FOOTER */}
      {data.sectionsVisibility?.contact !== false && (
      <footer style={{
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
      </footer>
      )}
    </div>
  )
}