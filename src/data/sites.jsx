/* ═══════════════════════════════════════════════════════════════════
   SHARED SITE DATA — used by Hero.jsx and Examples.jsx
   
   Layout contract (275px total):
     DNav    = 36px  (height fixed)
     DPhoto  = 152px (height fixed)
     DBottom = 87px  (height fixed — DCards / DStats / DTags / DPrices / DCal)
   ═══════════════════════════════════════════════════════════════════ */

export const FIXED = { NAV: 36, PHOTO: 152, BOTTOM: 87 }
export const TOTAL = FIXED.NAV + FIXED.PHOTO + FIXED.BOTTOM  // 275

const imgUrl = (id, w = 800) =>
  `https://images.unsplash.com/${id}?w=${w}&q=85&fit=crop&crop=center`

/* ─── Desktop nav — 36px ─────────────────────────────────────────── */
export const DNav = ({ logo, lc = '#111', links = [], cta, ctaBg, ctaC = '#fff', bg = '#fff', border }) => (
  <div style={{ height: FIXED.NAV, boxSizing: 'border-box', overflow: 'hidden', background: bg, borderBottom: border || '1px solid #E5E7EB', padding: '0 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
    <span style={{ fontWeight: 900, fontSize: 11, color: lc, whiteSpace: 'nowrap', letterSpacing: '0.02em', flexShrink: 0 }}>{logo}</span>
    <div style={{ display: 'flex', gap: 10, fontSize: 8, color: bg !== '#fff' ? 'rgba(255,255,255,0.6)' : '#9CA3AF', overflow: 'hidden', flexShrink: 1 }}>
      {links.slice(0, 3).map(l => <span key={l} style={{ whiteSpace: 'nowrap' }}>{l}</span>)}
    </div>
    <div style={{ background: ctaBg, color: ctaC, borderRadius: 20, padding: '3px 10px', fontSize: 8, fontWeight: 700, whiteSpace: 'nowrap', flexShrink: 0 }}>{cta}</div>
  </div>
)

/* ─── Desktop hero photo — 152px ─────────────────────────────────── */
export const DPhoto = ({ id, tint, tag, hl, sub, c1, c1Bg = '#fff', c1C = '#111', c2 }) => (
  <div style={{ position: 'relative', height: FIXED.PHOTO, flexShrink: 0, overflow: 'hidden' }}>
    <img src={imgUrl(id)} alt="" loading="lazy"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
    <div style={{ position: 'absolute', inset: 0, background: tint }} />
    <div style={{ position: 'absolute', inset: 0, padding: '12px 14px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
      {tag && <div style={{ fontSize: 7, fontWeight: 700, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 3 }}>{tag}</div>}
      <div style={{ fontWeight: 900, fontSize: 14, color: '#fff', lineHeight: 1.2, marginBottom: 4 }} dangerouslySetInnerHTML={{ __html: hl }} />
      <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.78)', marginBottom: 8, lineHeight: 1.4, overflow: 'hidden', maxHeight: 28 }}>{sub}</div>
      <div style={{ display: 'flex', gap: 7 }}>
        <div style={{ background: c1Bg, color: c1C, borderRadius: 20, padding: '4px 11px', fontSize: 8, fontWeight: 700 }}>{c1}</div>
        {c2 && <div style={{ border: '1px solid rgba(255,255,255,0.4)', color: '#fff', borderRadius: 20, padding: '4px 9px', fontSize: 8 }}>{c2}</div>}
      </div>
    </div>
  </div>
)

/* ─── Bottom: Photo cards — 87px ─────────────────────────────────── */
export const DCards = ({ bg, items }) => (
  <div style={{ height: FIXED.BOTTOM, boxSizing: 'border-box', overflow: 'hidden', background: bg, padding: '8px 14px', display: 'flex', gap: 5 }}>
    {items.map(it => (
      <div key={it.t} style={{ flex: 1, borderRadius: 7, overflow: 'hidden', border: `1px solid ${it.border || '#E5E7EB'}`, minWidth: 0 }}>
        <div style={{ height: 44, overflow: 'hidden', background: '#E5E7EB' }}>
          <img src={imgUrl(it.photo, 250)} alt="" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </div>
        <div style={{ padding: '4px 5px', background: it.bg || '#fff' }}>
          <div style={{ fontSize: 7, fontWeight: 700, color: it.tc || '#111', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{it.t}</div>
          {it.s && <div style={{ fontSize: 6, color: '#9CA3AF', marginTop: 1 }}>{it.s}</div>}
        </div>
      </div>
    ))}
  </div>
)

/* ─── Bottom: Stats row — 87px ───────────────────────────────────── */
export const DStats = ({ bg, stats, sc, lc }) => (
  <div style={{ height: FIXED.BOTTOM, boxSizing: 'border-box', overflow: 'hidden', background: bg, padding: '0 14px', display: 'flex', alignItems: 'center' }}>
    {stats.map((s, i) => (
      <div key={s.l} style={{ flex: 1, textAlign: 'center', borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none' }}>
        <div style={{ fontWeight: 900, fontSize: 16, color: sc, lineHeight: 1 }}>{s.n}</div>
        <div style={{ fontSize: 7.5, color: lc, marginTop: 5 }}>{s.l}</div>
      </div>
    ))}
  </div>
)

/* ─── Bottom: Tag pills — 87px ───────────────────────────────────── */
export const DTags = ({ bg, tags, tBg, tc }) => (
  <div style={{ height: FIXED.BOTTOM, boxSizing: 'border-box', overflow: 'hidden', background: bg, padding: '0 14px', display: 'flex', alignItems: 'center', gap: 5 }}>
    {tags.map(t => (
      <div key={t} style={{ flex: 1, background: tBg, border: `1px solid ${tc}33`, borderRadius: 8, height: 52, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontSize: 7.5, fontWeight: 700, color: tc, textAlign: 'center', lineHeight: 1.3, padding: '0 3px' }}>{t}</div>
      </div>
    ))}
  </div>
)

/* ─── Bottom: Price cards (barber) — 87px ────────────────────────── */
export const DPrices = ({ bg, items }) => (
  <div style={{ height: FIXED.BOTTOM, boxSizing: 'border-box', overflow: 'hidden', background: bg, padding: '0 14px', display: 'flex', alignItems: 'center', gap: 6 }}>
    {items.map(it => (
      <div key={it.s} style={{ flex: 1, background: it.bg, border: `1px solid ${it.border}`, borderRadius: 8, height: 66, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3 }}>
        <div style={{ fontSize: 7.5, fontWeight: 700, color: it.tc }}>{it.s}</div>
        <div style={{ fontSize: 10, fontWeight: 900, color: '#fff' }}>{it.p}</div>
      </div>
    ))}
  </div>
)

/* ─── Bottom: Mini calendar — 87px ──────────────────────────────── */
export const DCal = ({ bg, ac, cb, border, tc }) => (
  <div style={{ height: FIXED.BOTTOM, boxSizing: 'border-box', overflow: 'hidden', background: bg, padding: '7px 14px' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
      <span style={{ fontSize: 8, fontWeight: 800, color: tc || '#111' }}>Abril 2025</span>
      <div style={{ display: 'flex', gap: 3 }}>
        {['‹', '›'].map(ch => <div key={ch} style={{ width: 14, height: 14, borderRadius: '50%', border: `1px solid ${border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ fontSize: 9, color: tc || '#666' }}>{ch}</span></div>)}
      </div>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: '1px 2px' }}>
      {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((d, i) => <div key={i} style={{ fontSize: 6, fontWeight: 700, color: '#9CA3AF', textAlign: 'center' }}>{d}</div>)}
      {[3, 7, 14, 17, 21, 10, 1, 2, 4, 5, 6, 8, 9, 11, 12, 13, 15, 16, 18, 19, 20, 22, 23, 24, 25].map((n, i) => {
        const booked = [3, 7, 14, 17, 21].includes(n), today = n === 10
        return <div key={i} style={{ fontSize: 7, fontWeight: today ? 900 : booked ? 700 : 400, color: today ? '#fff' : booked ? ac : (tc || '#374151'), background: today ? ac : booked ? cb : 'transparent', borderRadius: 3, textAlign: 'center', padding: '1px 0' }}>{n}</div>
      })}
    </div>
    <div style={{ marginTop: 4, display: 'flex', gap: 4 }}>
      <div style={{ flex: 1, background: ac, color: '#fff', borderRadius: 5, padding: '3px 0', fontSize: 7, fontWeight: 700, textAlign: 'center' }}>Agendar cita →</div>
      <div style={{ padding: '3px 7px', border: `1px solid ${border}`, borderRadius: 5, fontSize: 7, color: tc || '#374151', fontWeight: 600 }}>12pm</div>
    </div>
  </div>
)

/* ─── Mobile site (for iPhone mockup) ───────────────────────────── */
export const MobileSite = ({ d }) => (
  <div style={{ fontFamily: 'Inter,sans-serif', height: '100%', display: 'flex', flexDirection: 'column' }}>
    <div style={{ height: 26, flexShrink: 0, background: d.navBg || '#fff', borderBottom: d.navBorder || '1px solid rgba(0,0,0,0.08)', padding: '0 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <span style={{ fontSize: 8.5, fontWeight: 900, color: d.lc || '#111', letterSpacing: '0.02em' }}>{d.logo}</span>
      <div style={{ background: d.ctaBg, color: d.ctaC || '#fff', borderRadius: 12, padding: '2px 8px', fontSize: 7, fontWeight: 700 }}>{d.cta}</div>
    </div>
    <div style={{ flex: 1, position: 'relative', overflow: 'hidden', background: '#1E293B' }}>
      <img
        src={`https://images.unsplash.com/${d.photo}?w=400&h=900&q=85&fit=crop&crop=${d.crop || 'center'}`}
        alt="" loading="lazy"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: d.pos || 'center top', display: 'block' }}
      />
      <div style={{ position: 'absolute', inset: 0, background: d.tint }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '8px 10px 12px', zIndex: 2 }}>
        <div style={{ fontWeight: 900, fontSize: 12.5, color: '#fff', lineHeight: 1.2, marginBottom: 4 }} dangerouslySetInnerHTML={{ __html: d.hl }} />
        <div style={{ fontSize: 7.5, color: 'rgba(255,255,255,0.82)', marginBottom: 8, lineHeight: 1.4 }}>{d.sub}</div>
        <div style={{ background: d.c1Bg || '#fff', color: d.c1C || '#111', borderRadius: 15, padding: '4px 12px', fontSize: 8, fontWeight: 700, display: 'inline-block' }}>{d.c1}</div>
      </div>
    </div>
    <div style={{ flexShrink: 0, background: d.pillsBg || '#F9FAFB', padding: '5px 8px', display: 'flex', gap: 4, flexWrap: 'wrap' }}>
      {(d.pills || []).map(p => (
        <div key={p} style={{ fontSize: 6.5, fontWeight: 700, color: d.pillsC || '#374151', background: '#fff', border: `1px solid ${d.pillsBorder || '#E5E7EB'}`, borderRadius: 10, padding: '2px 6px', whiteSpace: 'nowrap' }}>{p}</div>
      ))}
    </div>
  </div>
)

/* ─── ALL SITES (10 total) ────────────────────────────────────────── */
export const ALL_SITES = [
  {
    label: 'Clínica Dental', color: '#06B6D4', category: 'salud',
    mob: { navBg: '#fff', logo: 'SmileCare Dental', lc: '#0E7490', ctaBg: '#06B6D4', cta: 'Cita gratis', photo: 'photo-1606811971618-4486d14f3f99', pos: 'center top', tint: 'linear-gradient(to top,rgba(8,145,178,0.96) 0%,rgba(8,145,178,0.2) 55%,transparent 100%)', hl: 'Tu sonrisa perfecta<br/>nos espera', sub: 'Ortodoncia · Blanqueamiento · Implantes', c1: 'Primera cita →', c1Bg: '#fff', c1C: '#0E7490', pills: ['✓ 1ra cita gratis', '✓ Lun–Sáb'], pillsBg: '#ECFEFF', pillsC: '#0E7490', pillsBorder: '#A5F3FC' },
    site: () => (<div style={{ fontFamily: 'Inter,sans-serif' }}><DNav logo="SmileCare Dental" lc="#0E7490" links={['Servicios', 'Equipo', 'Contacto']} cta="Cita gratis" ctaBg="#06B6D4" /><DPhoto id="photo-1606811971618-4486d14f3f99" tint="linear-gradient(to right,rgba(8,145,178,0.88),rgba(6,182,212,0.28))" tag="Consultorio · San Salvador" hl="Tu sonrisa perfecta<br/>nos espera" sub="Ortodoncia, blanqueamiento e implantes. Primera consulta gratis." c1="Primera cita →" c1Bg="#fff" c1C="#0E7490" /><DCal bg="#ECFEFF" ac="#06B6D4" cb="#CFFAFE" border="#A5F3FC" tc="#0E7490" /></div>),
  },
  {
    label: 'Clínica Médica', color: '#0EA5E9', category: 'salud',
    mob: { navBg: '#fff', logo: 'ClinicaSalud+', lc: '#0EA5E9', ctaBg: '#0EA5E9', cta: 'Cita online', photo: 'photo-1551190822-a9333d879b1f', pos: 'center top', tint: 'linear-gradient(to top,rgba(14,165,233,0.95) 0%,rgba(14,165,233,0.2) 55%,transparent 100%)', hl: 'Tu salud,<br/>nuestra misión', sub: 'Más de 20 especialistas. Tecnología de última gen.', c1: 'Agendar cita →', c1Bg: '#fff', c1C: '#0EA5E9', pills: ['Medicina General', 'Cardiología', 'Pediatría'], pillsBg: '#F0F9FF', pillsC: '#0C4A6E', pillsBorder: '#BAE6FD' },
    site: () => (<div style={{ fontFamily: 'Inter,sans-serif' }}><DNav logo="ClinicaSalud+" lc="#0EA5E9" links={['Servicios', 'Médicos', 'Urgencias']} cta="Cita online" ctaBg="#0EA5E9" /><DPhoto id="photo-1551190822-a9333d879b1f" tint="linear-gradient(to right,rgba(14,165,233,0.86),rgba(7,89,133,0.45))" tag="Medicina · San Salvador" hl="Tu salud,<br/>nuestra misión" sub="Más de 20 especialistas. Tecnología de última generación." c1="Agendar cita →" c2="Médicos" c1Bg="#fff" c1C="#0EA5E9" /><DCards bg="#F0F9FF" items={[{ t: 'Medicina General', s: 'Atención integral', photo: 'photo-1576091160399-112ba8d25d1d', border: '#BAE6FD', bg: '#fff', tc: '#0C4A6E' }, { t: 'Cardiología', s: 'Corazón sano', photo: 'photo-1559757175-0eb30cd8c063', border: '#BAE6FD', bg: '#fff', tc: '#0C4A6E' }, { t: 'Pediatría', s: 'Cuidado infantil', photo: 'photo-1587813369290-091c9d432daf', border: '#BAE6FD', bg: '#fff', tc: '#0C4A6E' }]} /></div>),
  },
  {
    label: 'Restaurante', color: '#DC2626', category: 'negocio',
    mob: { navBg: '#7C2D12', logo: 'LA HACIENDA', lc: '#FED7AA', ctaBg: '#DC2626', cta: 'Reservar', photo: 'photo-1414235077428-338989a2e8c0', pos: 'center', tint: 'linear-gradient(to top,rgba(124,45,18,0.97) 0%,rgba(124,45,18,0.2) 55%,transparent 100%)', hl: 'Sabores que<br/>cuentan historias', sub: 'Ingredientes locales, recetas de 3 generaciones.', c1: 'Ver menú →', c1Bg: '#DC2626', c1C: '#fff', pills: ['Lun–Dom 12–10pm', '✓ Terraza', '✓ Reservas'], pillsBg: '#FFF7ED', pillsC: '#92400E', pillsBorder: '#FED7AA' },
    site: () => (<div style={{ fontFamily: 'Inter,sans-serif' }}><DNav logo="LA HACIENDA" lc="#FED7AA" links={['Menú', 'Reservas', 'Nosotros']} cta="Reservar mesa" ctaBg="#DC2626" bg="#7C2D12" /><DPhoto id="photo-1414235077428-338989a2e8c0" tint="linear-gradient(to right,rgba(124,45,18,0.92),rgba(124,45,18,0.32))" tag="Cocina salvadoreña auténtica" hl="Sabores que<br/>cuentan historias" sub="Ingredientes locales, recetas de 3 generaciones." c1="Ver menú" c2="Reservar" c1Bg="#DC2626" /><DCards bg="#FFF7ED" items={[{ t: 'Carnes a la Brasa', s: '$12.50', photo: 'photo-1565299624946-b28f40a0ae38', border: '#FED7AA' }, { t: 'Sopas del Mar', s: '$8.00', photo: 'photo-1547592180-85f173990554', border: '#FED7AA' }, { t: 'Tacos Premium', s: '$6.00', photo: 'photo-1565299585323-38d6b0865b47', border: '#FED7AA' }]} /></div>),
  },
  {
    label: 'Barbería Premium', color: '#D97706', category: 'negocio',
    site: () => (
      <div style={{ fontFamily: "'Inter',sans-serif" }}>
        <DNav
          logo="RAZOR & BLADE"
          lc="#F59E0B"
          links={['Servicios', 'Galería', 'Reservas']}
          cta="Reservar"
          ctaBg="#F59E0B"
          ctaC="#111"
          bg="#0D1117"
        />
        <DPhoto
          id="photo-1503951914875-452162b0f3f1"
          tint="linear-gradient(to right,rgba(13,17,23,0.93),rgba(13,17,23,0.35))"
          tag="Est. 2015 &#xb7; San Salvador"
          hl="Arte &amp; <span style='color:#F59E0B;font-style:italic'>Estilo</span>"
          sub="Cortes de precisión, afeitados clásicos y tratamientos premium."
          c1="Reservar turno →"
          c1Bg="#F59E0B"
          c1C="#111"
        />
        <DPrices
          bg="#161B22"
          items={[
            { s: 'Corte Clásico', p: '$15', bg: '#21262D', border: '#30363D', tc: '#F59E0B' },
            { s: 'Afeitado Real',  p: '$18', bg: '#21262D', border: '#30363D', tc: '#F59E0B' },
            { s: 'Full Grooming',  p: '$35', bg: '#21262D', border: '#30363D', tc: '#F59E0B' },
          ]}
        />
      </div>
    ),
  },
  {
    label: 'Hotel & Spa', color: '#B8965A', category: 'negocio',
    mob: { navBg: '#1C1917', logo: 'HOTEL PIEDRA BLANCA', lc: '#D4AF70', ctaBg: '#D4AF70', ctaC: '#1C1917', cta: 'Reservar', photo: 'photo-1520250497591-112ba8d25d1d', pos: 'center', tint: 'linear-gradient(to top,rgba(28,25,23,0.97) 0%,rgba(28,25,23,0.15) 55%,transparent 100%)', hl: 'Donde el lujo<br/>abraza la naturaleza', sub: 'Suite con vista al lago y spa privado.', c1: 'Ver habitaciones', c1Bg: '#D4AF70', c1C: '#1C1917', pills: ['32 Suites', '4.9 Rating', 'Spa privado'], pillsBg: '#1C1917', pillsC: '#D4AF70', pillsBorder: '#292524' },
    site: () => (<div style={{ fontFamily: 'Inter,sans-serif' }}><DNav logo="HOTEL PIEDRA BLANCA" lc="#D4AF70" links={['Habitaciones', 'Spa', 'Reservas']} cta="Reservar" ctaBg="#D4AF70" ctaC="#1C1917" bg="#1C1917" /><DPhoto id="photo-1520250497591-112ba8d25d1d" tint="linear-gradient(to right,rgba(28,25,23,0.9),rgba(28,25,23,0.26))" tag="Luxury Boutique · El Salvador" hl="Donde el lujo<br/>abraza la naturaleza" sub="Suite con vista al lago, spa privado y gastronomía de autor." c1="Ver habitaciones" c2="Más info" c1Bg="#D4AF70" c1C="#1C1917" /><DCal bg="#1C1917" ac="#D4AF70" cb="rgba(212,175,112,0.18)" border="#292524" tc="#D6D3D1" /></div>),
  },
  {
    label: 'Gimnasio Elite', color: '#F97316', category: 'negocio',
    mob: { navBg: '#0F172A', logo: 'ELITE GYM', lc: '#F97316', ctaBg: '#F97316', cta: '30 días gratis', photo: 'photo-1534438327276-14e5300c3a48', pos: 'center', tint: 'linear-gradient(to top,rgba(15,23,42,0.97) 0%,rgba(15,23,42,0.15) 55%,transparent 100%)', hl: 'Forja tu<br/><span style="color:#F97316">mejor versión</span>', sub: 'Coaches certificados y planes personalizados.', c1: '30 días gratis →', c1Bg: '#F97316', c1C: '#fff', pills: ['500+ Miembros', '20+ Clases/sem', '5am–11pm'], pillsBg: '#0F172A', pillsC: '#F97316', pillsBorder: '#1E293B' },
    site: () => (<div style={{ fontFamily: 'Inter,sans-serif' }}><DNav logo="ELITE GYM" lc="#F97316" links={['Clases', 'Planes', 'Coaches']} cta="30 días gratis" ctaBg="#F97316" bg="#0F172A" /><DPhoto id="photo-1534438327276-14e5300c3a48" tint="linear-gradient(to right,rgba(15,23,42,0.92),rgba(15,23,42,0.36))" tag="Resultados reales · Sin excusas" hl="Forja tu<br/><span style='color:#F97316'>mejor versión</span>" sub="Equipamiento premium, coaches certificados y planes personalizados." c1="30 días gratis →" c1Bg="#F97316" /><DStats bg="#0F172A" stats={[{ n: '500+', l: 'Miembros' }, { n: '20+', l: 'Clases/sem' }, { n: '5am–11pm', l: 'Horario' }]} sc="#F97316" lc="#475569" /></div>),
  },
  {
    label: 'Agencia Digital', color: '#8B5CF6', category: 'servicios',
    mob: { navBg: '#0F0A2E', logo: 'pixellabs', lc: '#A78BFA', ctaBg: '#8B5CF6', cta: 'Cotizar', photo: 'photo-1497366216548-37526070297c', pos: 'center', tint: 'linear-gradient(to top,rgba(15,10,46,0.97) 0%,rgba(15,10,46,0.15) 55%,transparent 100%)', hl: 'Hacemos crecer<br/><span style="color:#A78BFA">tu negocio online</span>', sub: 'SEO, Paid Media, Social Media y Web.', c1: 'Ver portafolio →', c1Bg: 'linear-gradient(135deg,#8B5CF6,#EC4899)', pills: ['200+ Proyectos', '98% Satisfacción', '5★ Google'], pillsBg: '#0F0A2E', pillsC: '#A78BFA', pillsBorder: '#1E1A4A' },
    site: () => (<div style={{ fontFamily: 'Inter,sans-serif' }}><DNav logo="pixellabs" lc="#A78BFA" links={['Servicios', 'Portafolio', 'Blog']} cta="Cotizar" ctaBg="linear-gradient(135deg,#8B5CF6,#EC4899)" bg="#0F0A2E" /><DPhoto id="photo-1497366216548-37526070297c" tint="linear-gradient(to right,rgba(15,10,46,0.94),rgba(88,28,135,0.42))" tag="✦ Agencia premium de marketing digital" hl="Hacemos crecer<br/><span style='background:linear-gradient(90deg,#A78BFA,#F472B6);-webkit-background-clip:text;-webkit-text-fill-color:transparent'>tu negocio online</span>" sub="SEO, Paid Media, Social Media y Web. Resultados garantizados." c1="Ver portafolio →" c1Bg="linear-gradient(135deg,#8B5CF6,#EC4899)" /><DStats bg="#0F0A2E" stats={[{ n: '200+', l: 'Proyectos' }, { n: '98%', l: 'Satisfacción' }, { n: '5★', l: 'Google' }, { n: '12', l: 'Industrias' }]} sc="#A78BFA" lc="#4B5563" /></div>),
  },
  {
    label: 'Boutique de Moda', color: '#EC4899', category: 'negocio',
    mob: { navBg: '#fff', logo: 'LUMIÈRE', lc: '#9D174D', ctaBg: '#EC4899', cta: 'Comprar', photo: 'photo-1441984904996-e0b6ba687e04', pos: 'center top', tint: 'linear-gradient(to top,rgba(131,24,67,0.97) 0%,rgba(131,24,67,0.15) 55%,transparent 100%)', hl: 'Elegancia<br/>redefinida', sub: 'Piezas únicas para la mujer contemporánea.', c1: 'Ver colección →', c1Bg: '#fff', c1C: '#9D174D', pills: ['Vestidos $89+', 'Accesorios $29+', 'Nueva llegada'], pillsBg: '#FFF1F2', pillsC: '#9D174D', pillsBorder: '#FCE7F3' },
    site: () => (<div style={{ fontFamily: 'Inter,sans-serif' }}><DNav logo="LUMIÈRE" lc="#9D174D" links={['Colección', 'Lookbook', 'Tienda']} cta="Comprar" ctaBg="#EC4899" /><DPhoto id="photo-1441984904996-e0b6ba687e04" tint="linear-gradient(to right,rgba(131,24,67,0.88),rgba(190,24,93,0.28))" tag="Nueva colección 2025" hl="Elegancia<br/>redefinida" sub="Piezas únicas para la mujer contemporánea. Diseño exclusivo." c1="Ver colección →" c2="Lookbook" c1Bg="#fff" c1C="#9D174D" /><DCards bg="#FFF1F2" items={[{ t: 'Vestidos', s: 'Desde $89', photo: 'photo-1515886657613-9f3515b0c78f', border: '#FCE7F3' }, { t: 'Accesorios', s: 'Desde $29', photo: 'photo-1492707892479-7bc8d5a4ee93', border: '#FCE7F3' }, { t: 'Tendencias', s: 'Nueva llegada', photo: 'photo-1490481651871-ab68de25d43d', border: '#FCE7F3' }]} /></div>),
  },
  {
    label: 'Inmobiliaria', color: '#0F766E', category: 'servicios',
    mob: { navBg: '#fff', logo: 'PRIME REALTY', lc: '#0F766E', ctaBg: '#0F766E', cta: 'Ver prop.', photo: 'photo-1600596542815-ffad4c1539a9', pos: 'center', tint: 'linear-gradient(to top,rgba(2,44,40,0.97) 0%,rgba(2,44,40,0.15) 55%,transparent 100%)', hl: 'Encuentra tu<br/><span style="color:#2DD4BF">hogar ideal</span>', sub: 'Casas, apartamentos y locales. Asesoría gratis.', c1: 'Buscar propiedades', c1Bg: '#0F766E', pills: ['Casas $180k+', 'Apto $65k+', 'Penthouse $320k+'], pillsBg: '#F0FDFA', pillsC: '#134E4A', pillsBorder: '#99F6E4' },
    site: () => (<div style={{ fontFamily: 'Inter,sans-serif' }}><DNav logo="PRIME REALTY" lc="#0F766E" links={['Propiedades', 'Agentes', 'Contacto']} cta="Ver propiedades" ctaBg="#0F766E" /><DPhoto id="photo-1600596542815-ffad4c1539a9" tint="linear-gradient(to right,rgba(2,44,40,0.9),rgba(15,118,110,0.32))" tag="Propiedades exclusivas · El Salvador" hl="Encuentra tu<br/><span style='color:#2DD4BF'>hogar ideal</span>" sub="Casas, apartamentos y locales comerciales. Asesoría gratuita." c1="Buscar propiedades" c2="Valuación" c1Bg="#0F766E" /><DCards bg="#F0FDFA" items={[{ t: 'Casas de Lujo', s: 'Desde $180k', photo: 'photo-1564013799919-ab600027ffc6', border: '#99F6E4', tc: '#134E4A' }, { t: 'Apartamentos', s: 'Desde $65k', photo: 'photo-1600585154340-be6161a56a0c', border: '#99F6E4', tc: '#134E4A' }, { t: 'Penthouses', s: 'Desde $320k', photo: 'photo-1600047509807-ba8f99d2cdde', border: '#99F6E4', tc: '#134E4A' }]} /></div>),
  },
]

// Prime Realty first, then rest (Dental idx=0 and Hotel idx=4 stay in Examples only)
// ALL_SITES now has 9 entries (Bufete removed): idx 8 = Inmobiliaria
export const HERO_SITES = [
  ALL_SITES[8], // Prime Realty — featured first
  ...ALL_SITES.filter((_, i) => i !== 0 && i !== 4 && i !== 8),
]

/* ─── Browser window mockup (shared by Hero + Examples) ─────────── */
export function BrowserMockup({ children, accent = '#00C896', height }) {
  return (
    <div style={{ borderRadius: 12, overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.28), 0 0 0 1px rgba(0,0,0,0.1)', background: '#1E1E20', width: '100%' }}>
      {/* Clean chrome — just the URL bar, full width */}
      <div style={{ background: 'linear-gradient(180deg,#222224,#1E1E20)', padding: '8px 14px' }}>
        <div style={{ background: '#2C2C2E', borderRadius: 8, padding: '5px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* Lock icon SVG */}
          <svg width="11" height="13" viewBox="0 0 11 13" fill="none">
            <rect x="1.5" y="5.5" width="8" height="7" rx="1.5" stroke="#30D158" strokeWidth="1.2"/>
            <path d="M3 5.5V4a2.5 2.5 0 015 0v1.5" stroke="#30D158" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
          <span style={{ fontSize: 10, color: '#9A9A9F', flex: 1, textAlign: 'center', fontWeight: 500, letterSpacing: '0.01em' }}>mipagina.sitegen.ai</span>
          {/* Favicon dot */}
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: accent, flexShrink: 0, opacity: 0.95 }} />
        </div>
      </div>
      <div style={{ height: height || TOTAL, overflow: 'hidden', background: '#fff' }}>
        {children}
      </div>
    </div>
  )
}
