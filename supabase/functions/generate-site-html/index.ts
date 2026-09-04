import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const INDUSTRY_HERO: Record<string,string> = {
  'Legal & Jurídico':'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1400&q=85&fit=crop',
  'Gastronomía':'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1400&q=85&fit=crop',
  'Salud & Odontología':'https://images.unsplash.com/photo-1588776814546-1ffbb172d936?w=1400&q=85&fit=crop',
  'Fitness & Deportes':'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1400&q=85&fit=crop',
  'Inmobiliaria':'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1400&q=85&fit=crop',
  'Tecnología':'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&q=85&fit=crop',
  'Educación':'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1400&q=85&fit=crop',
  'Construcción':'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1400&q=85&fit=crop',
  'default':'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=85&fit=crop',
};

const INDUSTRY_ABOUT: Record<string,string> = {
  'Legal & Jurídico':'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80&fit=crop',
  'Gastronomía':'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&q=80&fit=crop',
  'Salud & Odontología':'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80&fit=crop',
  'Fitness & Deportes':'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&q=80&fit=crop',
  'Inmobiliaria':'https://images.unsplash.com/photo-1582407947304-fd86f28f3dde?w=800&q=80&fit=crop',
  'default':'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80&fit=crop',
};

function hPhoto(ind: string) {
  if (!ind) return INDUSTRY_HERO.default;
  if (INDUSTRY_HERO[ind]) return INDUSTRY_HERO[ind];
  const lower = ind.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const keywords = [
    ['software', 'Software Empresarial'], ['erp', 'ERP'], ['tecnolog', 'Tecnología'],
    ['defensa', 'Defensa & Seguridad'], ['defense', 'Defensa & Seguridad'], ['seguridad', 'Seguridad'],
    ['salud', 'Salud & Odontología'], ['dental', 'Salud & Odontología'], ['medic', 'Salud & Odontología'], ['clinic', 'Salud & Odontología'],
    ['legal', 'Legal & Jurídico'], ['juridic', 'Legal & Jurídico'], ['abogad', 'Legal & Jurídico'],
    ['gastro', 'Gastronomía'], ['restaur', 'Gastronomía'], ['comida', 'Gastronomía'],
    ['fitness', 'Fitness & Deportes'], ['deporte', 'Fitness & Deportes'], ['gym', 'Fitness & Deportes'],
    ['inmobi', 'Inmobiliaria'], ['propiedad', 'Inmobiliaria'],
    ['marketing', 'Marketing'], ['publicidad', 'Marketing'],
    ['construc', 'Construcción'], ['arquitect', 'Construcción'],
    ['finanz', 'Finanzas'], ['inversion', 'Inversión'], ['invers', 'Inversión'],
    ['infraestruc', 'Infraestructura'], ['gobierno', 'Gobierno'], ['publico', 'Sector Público'],
    ['auto', 'Automóviles'], ['logist', 'Logistica'], ['transport', 'Logistica'],
    ['educ', 'Educación'], ['escuela', 'Educación'],
    ['moda', 'Moda'], ['fashion', 'Moda'], ['ropa', 'Moda'],
    ['perfum', 'Perfumes'], ['fragranc', 'Perfumes'], ['colonia', 'Perfumes'],
    ['cosmet', 'Cosmética'], ['makeup', 'Cosmética'], ['maquillaj', 'Cosmética'],
    ['belleza', 'Belleza'], ['beauty', 'Belleza'], ['peluquer', 'Belleza'], ['estetica', 'Belleza'],
    ['spa', 'Spa & Bienestar'], ['bienestar', 'Spa & Bienestar'], ['masaj', 'Spa & Bienestar'],
    ['joyeria', 'Joyeria'], ['joya', 'Joyeria'], ['acceso', 'Moda & Accesorios'], ['cartera', 'Moda & Accesorios'],
    ['lujo', 'Lujo'], ['luxury', 'Lujo'], ['premium', 'Lujo'],
    ['retail', 'Retail'], ['tienda', 'Retail'], ['boutique', 'Retail'],
    ['ecommerce', 'E-commerce'], ['comercio', 'E-commerce'],
    ['fotograf', 'Fotografía'], ['photo', 'Fotografía'],
    ['eventos', 'Eventos'], ['boda', 'Eventos'], ['event', 'Eventos'],
    ['veterinar', 'Veterinaria'], ['animal', 'Veterinaria'],
    ['agricult', 'Agricultura'], ['agro', 'Agricultura'],
    ['turism', 'Turismo'], ['viaje', 'Turismo'], ['travel', 'Turismo'], ['tour', 'Turismo'],
    ['cultura', 'Cultura y Turismo'], ['patrimon', 'Patrimonio Cultural'],
    ['herencia', 'Herencia Cultural'], ['tradicion', 'Tradiciones'],
    ['artesani', 'Artesanias'], ['folkl', 'Tradiciones'], ['pueblo', 'Turismo'],
    ['salvadore', 'Turismo'], ['guatemal', 'Turismo'], ['hondure', 'Turismo'],
  ];
  for (const [kw, key] of keywords) {
    if (lower.includes(kw) && INDUSTRY_HERO[key]) return INDUSTRY_HERO[key];
  }
  return INDUSTRY_HERO.default;
}

function aPhoto(ind: string) {
  if (!ind) return INDUSTRY_ABOUT.default;
  if (INDUSTRY_ABOUT[ind]) return INDUSTRY_ABOUT[ind];
  const lower = ind.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const keywords = [
    ['software', 'Software Empresarial'], ['erp', 'Software Empresarial'], ['tecnolog', 'Tecnología'],
    ['infraestruc', 'Infraestructura'], ['invers', 'Inversión'], ['gobierno', 'Gobierno'],
    ['defensa', 'Defensa & Seguridad'], ['seguridad', 'Defensa & Seguridad'],
    ['salud', 'Salud & Odontología'], ['dental', 'Salud & Odontología'], ['medic', 'Salud & Odontología'],
    ['legal', 'Legal & Jurídico'], ['juridic', 'Legal & Jurídico'], ['abogad', 'Legal & Jurídico'],
    ['gastro', 'Gastronomía'], ['restaur', 'Gastronomía'],
    ['fitness', 'Fitness & Deportes'], ['deporte', 'Fitness & Deportes'], ['gym', 'Fitness & Deportes'],
    ['inmobi', 'Inmobiliaria'], ['marketing', 'Marketing'],
    ['construc', 'Construcción'], ['finanz', 'Finanzas'], ['educ', 'Educación'],
    ['moda', 'Moda'], ['fashion', 'Moda'], ['ropa', 'Moda'],
    ['perfum', 'Perfumes'], ['fragranc', 'Perfumes'],
    ['cosmet', 'Cosmética'], ['makeup', 'Cosmética'], ['maquillaj', 'Cosmética'],
    ['belleza', 'Belleza'], ['beauty', 'Belleza'], ['peluquer', 'Belleza'],
    ['spa', 'Spa & Bienestar'], ['bienestar', 'Spa & Bienestar'],
    ['joyeria', 'Joyeria'], ['acceso', 'Moda & Accesorios'], ['cartera', 'Moda & Accesorios'],
    ['lujo', 'Lujo'], ['luxury', 'Lujo'],
    ['retail', 'Retail'], ['tienda', 'Retail'], ['boutique', 'Retail'],
    ['ecommerce', 'E-commerce'], ['fotograf', 'Fotografía'],
    ['eventos', 'Eventos'], ['boda', 'Eventos'],
    ['veterinar', 'Veterinaria'], ['agricult', 'Agricultura'],
    ['turism', 'Turismo'], ['viaje', 'Turismo'], ['travel', 'Turismo'], ['tour', 'Turismo'],
    ['cultura', 'Cultura y Turismo'], ['patrimon', 'Patrimonio Cultural'],
    ['herencia', 'Herencia Cultural'], ['tradicion', 'Tradiciones'],
    ['artesani', 'Artesanias'], ['folkl', 'Tradiciones'], ['pueblo', 'Turismo'],
    ['salvadore', 'Turismo'], ['guatemal', 'Turismo'], ['hondure', 'Turismo'],
  ];
  for (const [kw, key] of keywords) {
    if (lower.includes(kw) && INDUSTRY_ABOUT[key]) return INDUSTRY_ABOUT[key];
  }
  return INDUSTRY_ABOUT.default;
}

function fontStack(font: string) {
  const m: Record<string, string> = {
    Inter:"'Inter',sans-serif", Poppins:"'Poppins',sans-serif", Montserrat:"'Montserrat',sans-serif",
    Lato:"'Lato',sans-serif", Raleway:"'Raleway',sans-serif",
    'Playfair Display':"'Playfair Display',Georgia,serif", Merriweather:"'Merriweather',Georgia,serif",
    Oswald:"'Oswald',sans-serif", Nunito:"'Nunito',sans-serif", Roboto:"'Roboto',sans-serif",
  };
  return m[font] || m.Inter;
}

const SVGICONS: Record<string, string> = {
  shield: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="22" height="22"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  star: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="22" height="22"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  zap: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="22" height="22"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="22" height="22"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
  globe: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="22" height="22"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>`,
  users: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="22" height="22"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>`,
  award: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="22" height="22"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>`,
  heart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="22" height="22"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>`,
  tool: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="22" height="22"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>`,
  home: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="22" height="22"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  book: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="22" height="22"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>`,
  chart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="22" height="22"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
};

const EMOJI_TO_ICON: Record<string, string> = {
  '📊': 'chart', '📈': 'chart', '📊⃣': 'chart', '📉': 'chart',
  '🛡️': 'shield', '🛡': 'shield', '🔒': 'shield', '🔐': 'shield',
  '⭐': 'star', '🌟': 'star', '💫': 'star',
  '⚡': 'zap', '⚡️': 'zap', '🔥': 'zap',
  '✅': 'check', '✔️': 'check', '✔': 'check',
  '🌐': 'globe', '🔮': 'globe', '💻': 'globe', '🖥️': 'globe',
  '👥': 'users', '👤': 'users', '🤝': 'users', '👨‍💼': 'users',
  '🏆': 'award', '🥇': 'award', '💰': 'award', '💎': 'award',
  '❤️': 'heart', '❤': 'heart', '💚': 'heart', '🩺': 'heart',
  '🔧': 'tool', '⚙️': 'tool', '⚙': 'tool', '💊': 'tool',
  '🏠': 'home', '🏗️': 'home',
  '📚': 'book', '📝': 'book', '📜': 'book',
  '🗢️': 'check', '✏️': 'book', '🔓': 'shield',
  '💳': 'chart', '💱': 'chart', '🧩': 'tool', '🚀': 'zap',
  '🎭': 'users', '🔭': 'chart', '💡': 'zap', '📱': 'globe',
  '🏢': 'users', '🔁': 'tool', '📪': 'globe', '📰': 'book',
};

function getIcon(sv: any, idx: number) {
  if (sv.iconId && SVGICONS[sv.iconId]) return SVGICONS[sv.iconId];
  if (sv.icon && SVGICONS[sv.icon]) return SVGICONS[sv.icon];
  if (sv.icon && EMOJI_TO_ICON[sv.icon]) return SVGICONS[EMOJI_TO_ICON[sv.icon]];
  const t = (sv.title || '').toLowerCase();
  if (/crm|client|relaci/.test(t)) return SVGICONS.users;
  if (/erp|factur|invoice|contab/.test(t)) return SVGICONS.chart;
  if (/software|digital|tech|desarr/.test(t)) return SVGICONS.zap;
  if (/segur|shield|protect/.test(t)) return SVGICONS.shield;
  if (/web|global|internet/.test(t)) return SVGICONS.globe;
  if (/libro|book|cap|educ/.test(t)) return SVGICONS.book;
  if (/soport|manten|tool/.test(t)) return SVGICONS.tool;
  if (/casa|home|inmobi/.test(t)) return SVGICONS.home;
  if (/premio|award|certif/.test(t)) return SVGICONS.award;
  if (/salud|health|medic/.test(t)) return SVGICONS.heart;
  const keys = Object.keys(SVGICONS);
  return SVGICONS[keys[idx % keys.length]];
}

function getGalleryPhotos(d: Record<string, any>): string[] {
  if (d.galleryPhotos && d.galleryPhotos.length > 0) return d.galleryPhotos;
  return [
    hPhoto(d.industry || ''),
    aPhoto(d.industry || ''),
    INDUSTRY_HERO.default
  ];
}

function buildHTML(d: Record<string,any>, subdomain: string): string {
  const p = d.primaryColor || '#1E3A5F';
  const s = d.secondaryColor || '#F5F0E8';
  const a = d.accentColor || '#C9A84C';
  const font = d.font || 'Inter';
  const biz = d.businessName || 'Mi Empresa';
  const yr = new Date().getFullYear();
  const gFont = font.replace(/ /g, '+');
  
  const isDark = d.layoutVariant === 2 || p.toLowerCase() === '#0a0a0a' || p.toLowerCase() === '#000000';
  const bgMain     = isDark ? '#050505' : '#FAFAFA';
  const bgSec      = isDark ? '#0A0A0A' : '#ffffff';
  const bgAlt      = isDark ? '#111111' : '#F3F4F6';
  const textHD     = isDark ? '#ffffff' : p;
  const textMain   = isDark ? '#E4E4E7' : '#1F2937';
  const textMuted  = isDark ? '#A1A1AA' : '#6B7280';
  const borderCol  = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.06)';
  const cardBg     = isDark ? 'rgba(255,255,255,0.03)' : '#ffffff';
  const cardHover  = isDark ? 'rgba(255,255,255,0.06)' : '#ffffff';
  const badgeBg    = isDark ? 'rgba(255,255,255,0.06)' : '#fff';
  const navBg      = isDark ? 'rgba(10,10,10,0.88)' : 'rgba(255,255,255,0.88)';
  const glowSoft   = isDark ? `${a}15` : `${a}08`;

  const lv = d.layoutVariant || 1;
  const heroV = d.variants?.hero || (lv === 2 ? 2 : lv === 3 ? 3 : lv === 4 ? 4 : 1);
  const servicesV = d.variants?.services || (lv === 3 ? 3 : lv === 4 ? 4 : lv === 2 ? 2 : 1);
  const aboutV = d.variants?.about || (lv === 2 ? 2 : lv === 3 ? 3 : lv === 4 ? 4 : 1);
  const testimonialsV = d.variants?.testimonials || (lv === 2 ? 2 : lv === 3 ? 3 : lv === 4 ? 4 : 1);
  const contactV = d.variants?.contact || (lv === 2 ? 2 : lv === 3 ? 3 : lv === 4 ? 4 : 1);
  const footerV = d.variants?.footer || (lv === 2 ? 2 : lv === 3 ? 3 : lv === 4 ? 4 : 1);

  // ──────────────────────────────────────────
  // DYNAMIC COMPONENT RENDERERS
  // ──────────────────────────────────────────

  const renderHero = (): string => {
    const hero = d.heroImage || hPhoto(d.industry || '');
    const isVideo = hero.match(/\.(mp4|webm|mov)$/i);
    const mediaHtml = isVideo 
      ? `<video src="${hero}" autoplay loop muted playsinline style="width:100%; height:100%; object-fit:cover;"></video>` 
      : `<img src="${hero}" alt="${biz}" loading="eager">`;

    const stats = (d.stats || [{ value: '500+', label: 'Clientes' },{ value: '98%', label: 'Satisfacción' }]);
    const statsHtml = stats.map((st: any) => `
      <div><div class="wp-stat-v">${st.value}</div><div class="wp-stat-l">${st.label}</div></div>
    `).join('');

    const trustHtml = `
    <div class="wp-trust">
      <div class="wp-trust-l">${stats[0]?.value ? `Más de ${stats[0].value} empresas confían en nosotros` : 'Nuestros clientes confían en nosotros'}</div>
      <div class="wp-trust-row" style="user-select:none; pointer-events:none;">
        ${['Forbes','Google','Stripe','Amazon','Spotify'].map(l=>`<span style="font-size:1.2rem;font-weight:800;letter-spacing:-.05em">${l}</span>`).join('')}
      </div>
    </div>`;

    if (heroV === 2) {
      return `
      <section class="wp-hero v2" id="wp-hero">
        <div class="wp-hero-bg rev">
          ${mediaHtml}
        </div>
        <div class="wp-hero-content">
          <div class="wp-hero-txt rev" style="transition-delay:0.1s">
            <div class="wp-badge">
              <span class="wp-badge-dot"></span>
              <span class="wp-badge-t">${d.tagline || d.industry || 'PRESENCIA PROFESIONAL'}</span>
            </div>
            <h1 class="wp-h1">${d.hero?.headline || 'Presencia Digital Profesional'}</h1>
            <p class="wp-sub">${d.hero?.subheadline || d.description || ''}</p>
            <div class="wp-btns">
              <a href="${d.hero?.ctaLink || '#wp-contact'}" class="wp-btn-p" ${d.hero?.ctaLink?.startsWith('http') ? 'target="_blank"' : ''}>${d.hero?.ctaText || 'Empezar ahora'}</a>
              <a href="${d.hero?.ctaSecondaryLink || '#wp-services'}" class="wp-btn-g" ${d.hero?.ctaSecondaryLink?.startsWith('http') ? 'target="_blank"' : ''}>${d.hero?.ctaSecondary || 'Ver más'}</a>
            </div>
            <div class="wp-stats">${statsHtml}</div>
          </div>
        </div>
      </section>
      ${trustHtml}`;
    }

    if (heroV === 3) {
      return `
      <section class="wp-hero v3" id="wp-hero">
        <div class="wp-hero-content">
          <div class="wp-hero-txt rev" style="transition-delay:0.1s">
            <div class="wp-badge">
              <span class="wp-badge-dot"></span>
              <span class="wp-badge-t">${d.tagline || d.industry || 'PRESENCIA PROFESIONAL'}</span>
            </div>
            <div class="wp-divider"></div>
            <h1 class="wp-h1">${d.hero?.headline || 'Presencia Digital Profesional'}</h1>
            <p class="wp-sub">${d.hero?.subheadline || d.description || ''}</p>
            <div class="wp-btns">
              <a href="${d.hero?.ctaLink || '#wp-contact'}" class="wp-btn-p" ${d.hero?.ctaLink?.startsWith('http') ? 'target="_blank"' : ''}>${d.hero?.ctaText || 'Empezar ahora'}</a>
              <a href="${d.hero?.ctaSecondaryLink || '#wp-services'}" class="wp-btn-g" ${d.hero?.ctaSecondaryLink?.startsWith('http') ? 'target="_blank"' : ''}>${d.hero?.ctaSecondary || 'Ver más'}</a>
            </div>
            <div class="wp-stats">${statsHtml}</div>
          </div>
        </div>
      </section>
      ${trustHtml}`;
    }

    if (heroV === 4) {
      return `
      <section class="wp-hero v4" id="wp-hero">
        <div class="wp-hero-left">
          <div class="wp-badge">
            <span class="wp-badge-dot"></span>
            <span class="wp-badge-t">Garantía de Satisfacción</span>
          </div>
          <h1 class="wp-h1">${d.hero?.headline || 'Potenciamos tu presencia digital'}</h1>
          <p class="wp-sub">${d.hero?.subheadline || d.description || ''}</p>
          <div class="wp-btns">
            <a href="${d.hero?.ctaLink || '#wp-contact'}" class="wp-btn-p" ${d.hero?.ctaLink?.startsWith('http') ? 'target="_blank"' : ''}>${d.hero?.ctaText || 'Empezar ahora'}</a>
            <a href="${d.hero?.ctaSecondaryLink || '#wp-services'}" class="wp-btn-g" ${d.hero?.ctaSecondaryLink?.startsWith('http') ? 'target="_blank"' : ''}>${d.hero?.ctaSecondary || 'Ver más'}</a>
          </div>
          <div class="wp-stats">${statsHtml}</div>
        </div>
        <div class="wp-hero-right rev" style="transition-delay: 0.15s">
          ${mediaHtml}
        </div>
      </section>
      ${trustHtml}`;
    }

    // Default V1
    return `
    <section class="wp-hero v1" id="wp-hero">
      <div class="wp-hero-content">
        <div class="wp-hero-txt">
          <div class="wp-badge">
            <span class="wp-badge-dot"></span>
            <span class="wp-badge-t">${d.tagline || d.industry || 'PRESENCIA PROFESIONAL'}</span>
          </div>
          <h1 class="wp-h1">${d.hero?.headline || 'Diseño web inteligente'}</h1>
          <p class="wp-sub">${d.hero?.subheadline || d.description || ''}</p>
          <div class="wp-btns">
            <a href="${d.hero?.ctaLink || '#wp-contact'}" class="wp-btn-p" ${d.hero?.ctaLink?.startsWith('http') ? 'target="_blank"' : ''}>${d.hero?.ctaText || 'Empezar ahora'}</a>
            <a href="${d.hero?.ctaSecondaryLink || '#wp-services'}" class="wp-btn-g" ${d.hero?.ctaSecondaryLink?.startsWith('http') ? 'target="_blank"' : ''}>${d.hero?.ctaSecondary || 'Ver más'}</a>
          </div>
        </div>
        <div class="wp-hero-img-w rev" style="transition-delay: 0.2s">
          ${mediaHtml}
        </div>
      </div>
      <div class="wp-hero-content" style="margin-top:-40px">
        <div class="wp-stats" style="width:100%">${statsHtml}</div>
      </div>
    </section>
    ${trustHtml}`;
  };

  const renderServices = (): string => {
    const servicesItems = (d.services || []).map((sv: any, idx: number) => {
      const iconHtml = getIcon(sv, idx);
      if (servicesV === 2) {
        return `
        <div class="wp-scard">
          <div class="wp-sicon-wrap">${iconHtml}</div>
          <div>
            <h3 class="wp-s-h3">${sv.title}</h3>
            <p class="wp-s-p">${sv.description}</p>
            <div class="wp-s-more">${sv.cta || 'Saber más'} &rarr;</div>
          </div>
        </div>`;
      }
      if (servicesV === 3) {
        return `
        <div class="wp-scard">
          <div class="wp-sicon-wrap">${iconHtml}</div>
          <div>
            <h3 class="wp-s-h3">${sv.title}</h3>
            <p class="wp-s-p">${sv.description}</p>
            <div class="wp-s-more">${sv.cta || 'Saber más'} &rarr;</div>
          </div>
        </div>`;
      }
      if (servicesV === 4) {
        return `
        <div class="wp-scard">
          <div class="wp-sicon-wrap-col">
            <div class="wp-sicon-wrap">${iconHtml}</div>
          </div>
          <div class="wp-stext-col">
            <h3 class="wp-s-h3">${sv.title}</h3>
            <p class="wp-s-p">${sv.description}</p>
            <div class="wp-s-more">${sv.cta || 'Saber más'} &rarr;</div>
          </div>
        </div>`;
      }
      // servicesV === 1
      return `
      <div class="wp-scard">
        <div class="wp-sicon-wrap">${iconHtml}</div>
        <h3 class="wp-s-h3">${sv.title}</h3>
        <p class="wp-s-p">${sv.description}</p>
        <div class="wp-s-more">${sv.cta || 'Saber más'} &rarr;</div>
      </div>`;
    }).join('\n');

    if (servicesV === 4) {
      return `
      <section class="wp-sec" id="wp-services" style="text-align:center; padding:100px 0;">
        <div style="padding:0 5%">
          <div class="wp-sec-lbl">${d.servicesLabel || 'Nuestros Servicios'}</div>
          <h2 class="wp-h2">${d.servicesTitle || 'Lo que hacemos mejor'}</h2>
          <p class="wp-sec-sub">${d.servicesSubtitle || 'Soluciones pensadas para tu negocio.'}</p>
        </div>
        <div class="wp-grid v4-outer">
          <div class="wp-grid v4">${servicesItems}</div>
        </div>
      </section>`;
    }

    return `
    <section class="wp-sec" id="wp-services" style="text-align:center;">
      <div>
        <div class="wp-sec-lbl">${d.servicesLabel || 'Nuestros Servicios'}</div>
        <h2 class="wp-h2">${d.servicesTitle || 'Lo que hacemos mejor'}</h2>
        <p class="wp-sec-sub">${d.servicesSubtitle || 'Soluciones pensadas para tu negocio.'}</p>
      </div>
      <div class="wp-grid v${servicesV}">${servicesItems}</div>
    </section>`;
  };

  const renderAbout = (): string => {
    if (!d.about) return '';
    const aboutImg = aPhoto(d.industry || '');
    const highlightsList = d.about?.highlights?.length
      ? d.about.highlights
      : ['Calidad garantizada', 'Atención personalizada', 'Experiencia comprobada', 'Resultados garantizados'];

    if (aboutV === 2) {
      return `
      <section class="wp-sec" id="wp-nosotros">
        <div style="max-width: 860px; margin: 0 auto; text-align: center;">
          <div class="wp-sec-lbl">${d.about?.sectionLabel || 'Sobre nosotros'}</div>
          <h2 class="wp-h2">${d.about.title}</h2>
          <p class="wp-a-sub" style="max-width: 680px; margin: 0 auto 36px;">${d.about.text}</p>
          <div style="display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; margin-bottom: 36px;">
            ${highlightsList.map((h: string) => `
              <div style="background: ${a}10; padding: 8px 20px; border-radius: 99px; font-size: .85rem; font-weight: 600; color: ${p};">✓ ${h}</div>
            `).join('')}
          </div>
          <a href="#wp-contact" class="wp-btn-p" style="display:inline-flex; margin: 0 auto;">${d.about?.ctaText || 'Contáctanos'} &rarr;</a>
        </div>
      </section>`;
    }

    if (aboutV === 3) {
      return `
      <section class="wp-sec" id="wp-nosotros">
        <div style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 48px; max-width: 1240px; margin: 0 auto; align-items: center;">
          <div>
            <div class="wp-sec-lbl">${d.about?.sectionLabel || 'Sobre nosotros'}</div>
            <h2 class="wp-h2" style="text-align:left;">${d.about.title}</h2>
            <p class="wp-a-sub">${d.about.text}</p>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 24px; margin-bottom: 32px;">
              <div style="padding: 16px; background: ${a}08; border-radius: 12px; border: 1px solid ${a}15;">
                <div style="font-size: 1.6rem; font-weight: 900; color: ${a};">${d.about?.badge?.value || '500+'}</div>
                <div style="font-size: .75rem; font-weight: 700; color: ${p}; text-transform: uppercase; margin-top: 4px;">${d.about?.badge?.label || 'Clientes'}</div>
              </div>
              <div style="padding: 16px; background: ${p}08; border-radius: 12px; border: 1px solid ${p}15;">
                <div style="font-size: 1.6rem; font-weight: 900; color: ${p};">100%</div>
                <div style="font-size: .75rem; font-weight: 700; color: ${a}; text-transform: uppercase; margin-top: 4px;">Garantizado</div>
              </div>
            </div>
            <a href="#wp-contact" class="wp-btn-p" style="display:inline-flex;">${d.about?.ctaText || 'Contáctanos'}</a>
          </div>
          <div>
            <img class="wp-img" src="${aboutImg}" alt="Nosotros" loading="lazy" style="max-height: 480px; width: 100%; object-fit: cover; border-radius: 20px;">
          </div>
        </div>
      </section>`;
    }

    if (aboutV === 4) {
      return `
      <section class="wp-sec" id="wp-nosotros">
        <div style="position: relative; border-radius: 28px; overflow: hidden; min-height: 520px; display: flex; align-items: center; justify-content: flex-start; padding: 60px 8%;">
          <div style="position: absolute; inset: 0; z-index: 0;">
            <img src="${aboutImg}" alt="Nosotros" style="width: 100%; height: 100%; object-fit: cover;">
            <div style="position: absolute; inset: 0; background: linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.15) 100%);"></div>
          </div>
          <div style="position: relative; z-index: 1; max-width: 560px; background: rgba(255,255,255,0.06); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.15); border-radius: 24px; padding: 40px; color: #fff;">
            <div class="wp-sec-lbl" style="background: ${a}30; color: #fff; border-color: rgba(255,255,255,0.2);">${d.about?.sectionLabel || 'Sobre nosotros'}</div>
            <h2 class="wp-h2" style="color: #fff; text-align:left;">${d.about.title}</h2>
            <p class="wp-a-sub" style="color: rgba(255,255,255,0.85);">${d.about.text}</p>
            <div style="display: grid; grid-template-columns: 1fr; gap: 10px; margin: 24px 0 28px;">
              ${highlightsList.slice(0, 2).map((h: string) => `
                <div style="display: flex; align-items: center; gap: 10px; font-size: .9rem;"><span style="color: ${a}; font-weight: 900;">✓</span> ${h}</div>
              `).join('')}
            </div>
            <a href="#wp-contact" class="wp-btn-p" style="display:inline-flex; background: ${a}; color: #000;">${d.about?.ctaText || 'Contáctanos'}</a>
          </div>
        </div>
      </section>`;
    }

    // Default V1
    return `
    <section class="wp-sec" id="wp-nosotros">
      <div class="wp-about">
        <div class="wp-img-w">
          <img class="wp-img" src="${aboutImg}" alt="Nosotros" loading="lazy">
          <div class="wp-abnd">
            <div class="wp-abnd-ic">★</div>
            <div>
              <div class="wp-abnd-v">${d.about?.badge?.value || '500+'}</div>
              <div class="wp-abnd-l">${d.about?.badge?.label || 'Clientes satisfechos'}</div>
            </div>
          </div>
        </div>
        <div>
          <div class="wp-sec-lbl">${d.about?.sectionLabel || 'Sobre nosotros'}</div>
          <h2 class="wp-h2" style="text-align:left;">${d.about.title}</h2>
          <p class="wp-a-sub">${d.about.text}</p>
          <div class="wp-checks">
            ${highlightsList.map((h: string) => `
              <div class="wp-check">
                <div class="wp-ck-dot">✓</div>
                <span class="wp-ck-t">${h}</span>
              </div>
            `).join('')}
          </div>
          <a href="#wp-contact" class="wp-btn-p" style="display:inline-flex;">${d.about?.ctaText || 'Hablar con un experto'} &rarr;</a>
        </div>
      </div>
    </section>`;
  };

  const renderGallery = (): string => {
    if (!d.heroImageQuery) return '';
    const photos = getGalleryPhotos(d);
    return `
    <section class="wp-sec" id="wp-galeria" style="padding:90px 4%">
      <div class="wp-sec-lbl">Galería</div>
      <h2 class="wp-h2" style="margin-bottom:48px">${d.galleryTitle || 'Conoce nuestro trabajo'}</h2>
      <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:24px; max-width:1100px; margin:0 auto">
        ${photos.map((src: string) => `
          <div class="wp-gal-card">
            <img src="${src}" alt="gallery" loading="lazy" style="width:100%; height:100%; object-fit:cover; display:block; transition:transform .4s">
          </div>
        `).join('')}
      </div>
    </section>`;
  };

  const renderTeam = (): string => {
    if (!d.team || d.team.length === 0) return '';
    return `
    <section class="wp-sec" id="wp-equipo" style="text-align:center">
      <div class="wp-sec-lbl">Nuestro Equipo</div>
      <h2 class="wp-h2">${d.teamTitle || 'Conoce a nuestros Especialistas'}</h2>
      <div class="wp-team-grid">
        ${d.team.map((mbr: any) => `
          <div class="wp-team-card">
            <div class="wp-team-ic">${mbr.icon || '👨‍🦱'}</div>
            <div style="font-size:1.4rem; font-weight:800; margin-bottom:8px">${mbr.name}</div>
            <div style="font-size:.95rem; opacity:0.8; margin-bottom:32px; font-weight:500; letter-spacing:0.03em; text-transform:uppercase">${mbr.role}</div>
            ${mbr.ctaLink ? `
              <a href="${mbr.ctaLink}" target="_blank" rel="noopener noreferrer" class="wp-btn-p" style="width:100%; padding:16px">${mbr.ctaText || 'Reservar Cita'}</a>
            ` : ''}
          </div>
        `).join('')}
      </div>
    </section>`;
  };

  const renderBeforeAfter = (): string => {
    if (!d.beforeAfter || d.beforeAfter.length === 0) return '';
    return `
    <section class="wp-sec" id="wp-resultados" style="text-align:center">
      <div class="wp-sec-lbl">Transformaciones</div>
      <h2 class="wp-h2">${d.beforeAfterTitle || 'Antes y Después'}</h2>
      <p class="wp-sec-sub" style="margin-bottom:48px">${d.beforeAfterSubtitle || 'Resultados reales de nuestros clientes.'}</p>
      <div class="wp-ba-grid">
        ${d.beforeAfter.map((ba: any) => `
          <div class="wp-ba-card">
            <div style="display:flex; height:280px">
              <div style="flex:1; position:relative; border-right:2px solid ${isDark ? '#333' : '#fff'}">
                <div style="position:absolute; top:12px; left:12px; background:rgba(0,0,0,.7); color:#fff; padding:4px 12px; border-radius:8px; font-size:.7rem; font-weight:800; backdrop-filter:blur(4px); z-index:2">Antes</div>
                <img src="${ba.before}" alt="Antes" loading="lazy" style="width:100%; height:100%; object-fit:cover; filter:grayscale(30%)">
              </div>
              <div style="flex:1; position:relative">
                <div style="position:absolute; top:12px; right:12px; background:${a}; color:${isDark ? '#000' : '#fff'}; padding:4px 12px; border-radius:8px; font-size:.7rem; font-weight:900; box-shadow:0 4px 12px rgba(0,0,0,.3); z-index:2">Después</div>
                <img src="${ba.after}" alt="Después" loading="lazy" style="width:100%; height:100%; object-fit:cover">
              </div>
            </div>
            ${ba.caption ? `<div style="padding:16px 20px; font-size:.95rem; font-weight:600; text-align:center">${ba.caption}</div>` : ''}
          </div>
        `).join('')}
      </div>
    </section>`;
  };

  const renderTestimonials = (): string => {
    if (!d.testimonials || d.testimonials.length === 0) return '';
    
    const avGrads = [
      'linear-gradient(135deg, #3B82F6, #1D4ED8)',
      'linear-gradient(135deg, #10B981, #047857)',
      'linear-gradient(135deg, #F59E0B, #B45309)',
    ];

    let testHtml = '';

    if (testimonialsV === 2) {
      const t = d.testimonials[0];
      testHtml = `
      <div style="max-width: 800px; margin: 36px auto 0; padding: 0 24px;">
        <div style="font-size: 4.5rem; color: ${a}; line-height: 0.1; font-family: serif; margin-bottom: 12px;">“</div>
        <p style="font-size: 1.4rem; font-weight: 500; font-style: italic; line-height: 1.7; color: ${isDark ? '#FFF' : p}; margin-bottom: 28px;">
          ${t.text}
        </p>
        <div style="display: flex; align-items: center; justify-content: center; gap: 12px;">
          <div style="width: 44px; height: 44px; border-radius: 50%; background: ${avGrads[0]}; display: flex; align-items: center; justify-content: center; font-weight: bold; color: #fff;">
            ${(t.name || 'C')[0]}
          </div>
          <div style="text-align: left;">
            <div style="font-weight: 800; color: ${isDark ? '#fff' : '#111827'}; font-size: .95rem;">${t.name}</div>
            <div style="font-size: .75rem; color: #888; font-weight: 600;">${t.role}</div>
          </div>
        </div>
      </div>`;
    } else if (testimonialsV === 3) {
      testHtml = `
      <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 40px; max-width: 1240px; margin: 32px auto 0; text-align: left;">
        <div>
          <div style="font-size: 1.8rem; font-weight: 900; color: ${p}; line-height: 1.25; margin-bottom: 16px;">Opiniones de líderes del sector</div>
          <p style="font-size: .9rem; color: #6B7280; line-height: 1.6;">Nos esforzamos por ofrecer la mejor calidad y servicio técnico del mercado.</p>
        </div>
        <div class="wp-tgrid" style="grid-template-columns: 1fr;">
          ${d.testimonials.map((t: any, i: number) => `
            <div class="wp-tcard" style="background: #fff; border: 1px solid rgba(0,0,0,0.06);">
              <div class="wp-stars">${'★'.repeat(t.rating || 5)}</div>
              <p style="margin: 12px 0 16px; font-size: .92rem; line-height: 1.6; font-style: italic;">"${t.text}"</p>
              <div style="display: flex; align-items: center; gap: 10px;">
                <div class="wp-tav" style="background: ${avGrads[i % 3]}; width: 32px; height: 32px; font-size: .8rem;">${(t.name || 'C')[0]}</div>
                <div>
                  <div style="font-weight: 800; font-size: .85rem;">${t.name}</div>
                  <div style="font-size: .7rem; color: #888;">${t.role}</div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>`;
    } else if (testimonialsV === 4) {
      testHtml = `
      <div style="max-width: 860px; margin: 36px auto 0; text-align: left;">
        ${d.testimonials.map((t: any, i: number) => `
          <div style="padding: 24px 0; border-bottom: ${i < d.testimonials.length - 1 ? '1.5px solid rgba(0,0,0,0.06)' : 'none'};">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
              <div style="display: flex; align-items: center; gap: 10px;">
                <div class="wp-tav" style="background: ${avGrads[i % 3]}; width: 36px; height: 36px;">${(t.name || 'C')[0]}</div>
                <div>
                  <div style="font-weight: 800; font-size: .9rem; color: ${p};">${t.name}</div>
                  <div style="font-size: .75rem; color: #888;">${t.role}</div>
                </div>
              </div>
              <div class="wp-stars" style="color: ${a}; font-size: .9rem;">${'★'.repeat(t.rating || 5)}</div>
            </div>
            <p style="font-size: 1rem; line-height: 1.7; color: #4B5563; font-style: italic;">"${t.text}"</p>
          </div>
        `).join('')}
      </div>`;
    } else {
      // testimonialsV === 1
      testHtml = `
      <div class="wp-tgrid">
        ${d.testimonials.map((t: any, i: number) => `
          <div class="wp-tcard">
            <div class="wp-stars">${'★'.repeat(t.rating || 5)}</div>
            <p class="wp-ttxt">"${t.text}"</p>
            <div class="wp-tav-row">
              <div class="wp-tav" style="background: ${avGrads[i % 3]}">${(t.name || 'C')[0]}</div>
              <div>
                <div class="wp-tn">${t.name}</div>
                <div class="wp-tr">${t.role}</div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>`;
    }

    return `
    <section class="wp-sec" id="wp-testimonios" style="text-align:center;">
      <div class="wp-sec-lbl">Testimonios</div>
      <h2 class="wp-h2">${d.testimonialsTitle || 'Lo que dicen nuestros clientes'}</h2>
      ${testHtml}
    </section>`;
  };

  const renderContact = (): string => {
    if (!d.contact) return '';

    let contactHtml = '';

    if (contactV === 2) {
      contactHtml = `
      <div style="max-width: 860px; margin: 0 auto; text-align: center; color: #fff;">
        <div class="wp-sec-lbl" style="background:${a}28; color:${a}">Contacto</div>
        <h2 class="wp-h2" style="color: #fff;">${d.contact?.sectionTitle || 'Contáctanos hoy'}</h2>
        <p style="margin-bottom: 40px;">${d.contact?.subtitle || 'Estamos a tu entera disposición para resolver cualquier duda.'}</p>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)) ; gap: 24px; margin-bottom: 36px;">
          ${[
            { label: 'Teléfono', val: d.contact.phone },
            d.contact.whatsapp && { label: 'WhatsApp', val: d.contact.whatsapp },
            { label: 'Email', val: d.contact.email },
          ].filter(Boolean).map((c: any) => `
            <div style="padding: 24px; background: rgba(255,255,255,0.06); border-radius: 16px; border: 1px solid rgba(255,255,255,0.1)">
              <div style="font-size: .75rem; text-transform: uppercase; color: ${a}; font-weight: 700; margin-bottom: 6px;">${c.label}</div>
              <div style="font-size: 1rem; font-weight: 600;">${c.val}</div>
            </div>
          `).join('')}
        </div>
        <div class="wp-call">
          <a href="tel:${d.contact.phone}" class="wp-btn-c">Llamar ahora</a>
        </div>
      </div>`;
    } else if (contactV === 3) {
      contactHtml = `
      <div style="max-width: 720px; margin: 0 auto; background: rgba(255,255,255,0.05); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.12); border-radius: 24px; padding: 48px 32px; color: #fff; box-shadow: 0 24px 64px rgba(0,0,0,0.3)">
        <div style="text-align: center; margin-bottom: 32px;">
          <div class="wp-sec-lbl" style="background:${a}28; color:${a}">Contacto</div>
          <h2 class="wp-h2" style="color: #fff; margin-bottom: 12px;">${d.contact?.sectionTitle || '¿Hablamos?'}</h2>
          <p style="font-size: .9rem; opacity: 0.8;">${d.contact?.subtitle || 'Envíanos un mensaje y te responderemos en menos de 24 horas.'}</p>
        </div>
        <div style="display: flex; gap: 16px; flex-wrap: wrap; justify-content: center; margin-bottom: 32px; font-size: .85rem;">
          <div>📞 ${d.contact.phone}</div>
          ${d.contact.whatsapp ? `<div>🟢 WhatsApp: ${d.contact.whatsapp}</div>` : ''}
          <div>✉️ ${d.contact.email}</div>
        </div>
        <form onsubmit="event.preventDefault(); alert('Mensaje enviado con éxito'); this.reset();">
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:10px;">
            <input required placeholder="Tu nombre" style="padding:11px 14px; background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.15); border-radius:10px; color:#fff; font-size:.8125rem; outline:none; font-family:inherit; width:100%; box-sizing:border-box;" />
            <input required placeholder="Tu email" type="email" style="padding:11px 14px; background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.15); border-radius:10px; color:#fff; font-size:.8125rem; outline:none; font-family:inherit; width:100%; box-sizing:border-box;" />
          </div>
          <textarea required placeholder="¿En qué te podemos ayudar?" rows="4" style="width:100%; padding:11px 14px; background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.15); border-radius:10px; color:#fff; font-size:.8125rem; outline:none; font-family:inherit; resize:none; box-sizing:border-box; margin-bottom:14px;"></textarea>
          <button type="submit" style="width:100%; padding:13px; background:${a}; border:none; border-radius:10px; color:#000; font-weight:800; font-size:.875rem; cursor:pointer; font-family:inherit; box-shadow:0 4px 16px ${a}55">
            Enviar mensaje &rarr;
          </button>
        </form>
      </div>`;
    } else if (contactV === 4) {
      contactHtml = `
      <div style="max-width: 1100px; margin: 0 auto; color: #fff;">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 32px; padding-bottom: 24px;">
          <div>
            <div style="font-size: 1.2rem; font-weight: 800; color: ${a}; margin-bottom: 12px;">Contacto</div>
            <p style="font-size: .85rem; opacity: 0.8; line-height: 1.6;">${d.contact?.subtitle || 'Estamos a tu disposición para proyectos y consultas.'}</p>
          </div>
          <div>
            <div style="font-size: .75rem; text-transform: uppercase; color: ${a}; font-weight: 700; margin-bottom: 8px; letter-spacing: .05em;">Vías rápidas</div>
            <div style="font-size: .9rem; display: flex; flex-direction: column; gap: 8px;">
              <div>📞 ${d.contact.phone}</div>
              ${d.contact.whatsapp ? `<div>🟢 WhatsApp: ${d.contact.whatsapp}</div>` : ''}
              <div>✉️ ${d.contact.email}</div>
            </div>
          </div>
          <div>
            <div style="font-size: .75rem; text-transform: uppercase; color: ${a}; font-weight: 700; margin-bottom: 8px; letter-spacing: .05em;">Horario comercial</div>
            ${(d.contact.businessHours || []).slice(0, 3).map((h: any) => `
              <div style="font-size: .8rem; display: flex; justify-content: space-between; margin-bottom: 4px;">
                <span>${h.day}</span>
                <span style="font-weight: bold;">${h.hours}</span>
              </div>
            `).join('')}
          </div>
          <div>
            <div style="font-size: .75rem; text-transform: uppercase; color: ${a}; font-weight: 700; margin-bottom: 8px; letter-spacing: .05em;">Acción Directa</div>
            <a href="tel:${d.contact.phone}" class="wp-btn-c" style="width: 100%; text-align: center; display: block; padding: 10px 0;">Llamar ahora</a>
          </div>
        </div>
      </div>`;
    } else {
      // contactV === 1
      const items = [
        { svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="22" height="22"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.71a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .84h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.63a16 16 0 006.29 6.29l1.45-1.45a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>`, label: 'Teléfono', val: d.contact.phone },
        d.contact.whatsapp && { svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="22" height="22"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>`, label: 'WhatsApp', val: d.contact.whatsapp },
        { svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="22" height="22"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`, label: 'Email', val: d.contact.email },
        d.contact.address && { svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="22" height="22"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>`, label: 'Dirección', val: d.contact.address },
      ].filter(Boolean);

      contactHtml = `
      <div class="wp-cont-in">
        <div class="wp-cont-h">
          <div class="wp-sec-lbl" style="background:${a}28; color:${a}">Contacto</div>
          <h2 class="wp-h2">${d.contact?.sectionTitle || '¿Listo para empezar?'}</h2>
          <p>${d.contact?.subtitle || 'Estamos aquí para ayudarte. Contáctanos hoy mismo.'}</p>
        </div>
        <div class="wp-ccards">
          ${items.map((c: any) => `
            <div class="wp-ccard">
              <div class="wp-cicon">${c.svg}</div>
              <div style="flex:1; min-width:0;">
                <div class="wp-clbl">${c.label}</div>
                <div class="wp-cval">${c.val}</div>
              </div>
            </div>
          `).join('')}
        </div>

        ${(d.contact.businessHours || []).length > 0 ? `
          <div style="margin:0 auto 28px; max-width:480px; background:rgba(255,255,255,.08); border:1px solid rgba(255,255,255,.15); border-radius:14px; overflow:hidden">
            <div style="padding:10px 16px; border-bottom:1px solid rgba(255,255,255,.1); font-size:.72rem; font-weight:700; color:rgba(255,255,255,.7); text-transform:uppercase; letter-spacing:.07em; display:flex; align-items:center; gap:7px">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              Horario de atención
            </div>
            ${(d.contact.businessHours).map((h: any, i: number) => `
              <div style="display:flex; justify-content:space-between; align-items:center; padding:9px 16px; border-bottom: ${i < d.contact.businessHours.length - 1 ? '1px solid rgba(255,255,255,.07)' : 'none'}">
                <span style="font-size:.79rem; color:rgba(255,255,255,.8); font-weight:500">${h.day}</span>
                <span style="font-size:.79rem; color: ${h.hours?.toLowerCase() === 'cerrado' ? '#F87171' : 'rgba(255,255,255,.95)'}; font-weight:700">${h.hours}</span>
              </div>
            `).join('')}
          </div>
        ` : ''}

        <div class="wp-call">
          <a href="tel:${d.contact.phone}" class="wp-btn-c">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="16" height="16"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.71a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .84h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.63a16 16 0 006.29 6.29l1.45-1.45a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
            ${d.contact?.ctaText || 'Llamar ahora'}
          </a>
          ${d.contact.whatsapp ? `
            <a href="https://wa.me/${(d.contact.whatsapp || '').replace(/[^0-9]/g, '')}" target="_blank" rel="noopener noreferrer" class="wp-btn-c" style="background:#25D366; box-shadow:0 5px 18px rgba(37,211,102,.45); margin-left:10px">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="16" height="16"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>
              WhatsApp
            </a>
          ` : ''}
        </div>

        ${d.contact.showForm ? `
          <div style="margin-top:36px; max-width:520px; margin:36px auto 0">
            <div style="font-size:.75rem; font-weight:700; color:rgba(255,255,255,.6); text-align:center; text-transform:uppercase; letter-spacing:.07em; margin-bottom:18px">Envíanos un mensaje</div>
            <form onsubmit="event.preventDefault(); alert('Mensaje enviado con éxito'); this.reset();">
              <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:10px">
                <input required placeholder="Tu nombre" style="padding:11px 14px; background:rgba(255,255,255,.1); border:1.5px solid rgba(255,255,255,.2); border-radius:10px; color:#fff; font-size:.8125rem; outline:none; font-family:inherit; width:100%; box-sizing:border-box" />
                <input required placeholder="Tu email" type="email" style="padding:11px 14px; background:rgba(255,255,255,.1); border:1.5px solid rgba(255,255,255,.2); border-radius:10px; color:#fff; font-size:.8125rem; outline:none; font-family:inherit; width:100%; box-sizing:border-box" />
              </div>
              <textarea required placeholder="¿En qué podemos ayudarte?" rows="4" style="width:100%; padding:11px 14px; background:rgba(255,255,255,.1); border:1.5px solid rgba(255,255,255,.2); border-radius:10px; color:#fff; font-size:.8125rem; outline:none; font-family:inherit; resize:none; box-sizing:border-box; margin-bottom:10px"></textarea>
              <button type="submit" style="width:100%; padding:13px; background:${a}; border:none; border-radius:10px; color:#fff; font-weight:800; font-size:.875rem; cursor:pointer; font-family:inherit; box-shadow:0 4px 16px ${a}55; letter-spacing:.01em">
                Enviar mensaje →
              </button>
            </form>
          </div>
        ` : ''}
      </div>`;
    }

    return `
    <section class="wp-cont" id="wp-contact">
      ${contactHtml}
    </section>`;
  };

  const renderFooter = (): string => {
    let footerHtml = '';

    if (footerV === 2) {
      footerHtml = `
      <div style="text-align: center; padding: 40px 24px 20px;">
        <div class="wp-logo" style="justify-content: center; margin-bottom: 20px;">
          ${d.logoImage ? `
            <img src="${d.logoImage}" alt="${biz}" style="max-height: ${d.logoSize || 40}px; max-width: 200px; object-fit: contain; width: auto;" />
          ` : `
            <div style="display: flex; align-items: center; gap: 10px; justify-content: center;">
              <div class="wp-logo-ic">${(biz || 'M')[0]}</div>
              <div style="font-weight:800; color:#fff; font-size:1.1rem;">${biz}</div>
            </div>
          `}
        </div>
        ${d.tagline ? `<div style="font-size:.8rem; color:rgba(255,255,255,0.5); margin-bottom: 24px;">${d.tagline}</div>` : ''}
        
        ${d.social && Object.values(d.social).some(Boolean) ? `
          <div style="display:flex; gap:12px; justify-content: center; margin-bottom:28px; flex-wrap:wrap;">
            ${[
              { key: 'facebook', label: 'Facebook' },
              { key: 'instagram', label: 'Instagram' },
              { key: 'twitter', label: 'Twitter' },
              { key: 'linkedin', label: 'LinkedIn' },
              { key: 'tiktok', label: 'TikTok' },
              { key: 'youtube', label: 'YouTube' },
            ].filter(s => d.social?.[s.key]).map(s => `
              <a href="${d.social[s.key]}" target="_blank" rel="noopener noreferrer"
                style="font-size:.75rem; font-weight:600; color:rgba(255,255,255,.6); text-decoration:none; padding:6px 14px; border:1px solid rgba(255,255,255,0.12); border-radius:20px; background: rgba(255,255,255,0.02)">
                ${s.label}
              </a>
            `).join('')}
          </div>
        ` : ''}
        <div style="height: 1px; background: rgba(255,255,255,0.08); margin: 0 auto 20px; max-width: 400px;"></div>
        <p style="font-size: .75rem; color: rgba(255,255,255,0.4)">© ${yr} ${biz}. Todos los derechos reservados. Creado con SiteGen AI.</p>
      </div>`;
    } else if (footerV === 3) {
      footerHtml = `
      <div style="display: flex; flex-direction: column; gap: 20px; padding: 30px 4%;">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 20px;">
          <div class="wp-logo">
            ${d.logoImage ? `
              <img src="${d.logoImage}" alt="${biz}" style="max-height: ${d.logoSize || 36}px; max-width: 160px; object-fit: contain;" />
            ` : `
              <div style="font-weight:800; color:#fff; font-size:.95rem;">${biz}</div>
            `}
          </div>
          <p style="font-size: .75rem; color: rgba(255,255,255,0.45)">© ${yr} ${biz}.</p>
          
          ${d.social && Object.values(d.social).some(Boolean) ? `
            <div style="display:flex; gap:8px;">
              ${[
                { key: 'facebook', label: 'FB' },
                { key: 'instagram', label: 'IG' },
                { key: 'twitter', label: 'TW' },
                { key: 'linkedin', label: 'LN' },
              ].filter(s => d.social?.[s.key]).map(s => `
                <a href="${d.social[s.key]}" target="_blank" rel="noopener noreferrer"
                  style="font-size:.7rem; font-weight:600; color:rgba(255,255,255,.5); text-decoration:none; width: 28px; height: 28px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center;">
                  ${s.label}
                </a>
              `).join('')}
            </div>
          ` : ''}
        </div>
      </div>`;
    } else if (footerV === 4) {
      footerHtml = `
      <div style="padding: 60px 8% 30px; background: linear-gradient(180deg, rgba(0,0,0,0) 0%, ${p}33 100%); border-top: 1px solid ${borderCol}">
        <div style="display: grid; grid-template-columns: 1.5fr 1fr; gap: 40px; margin-bottom: 40px;">
          <div>
            <div style="font-size: 2.2rem; font-weight: 900; color: #fff; letter-spacing: -.04em; margin-bottom: 12px;">${biz}</div>
            ${d.tagline ? `<p style="font-size: .9rem; color: rgba(255,255,255,0.6); line-height: 1.6; max-width: 460px;">${d.tagline}</p>` : ''}
          </div>
          <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 16px;">
            <div class="wp-ft-tags" style="justify-content: flex-end;">
              ${['SSL Seguro', 'Alto Rendimiento', 'SEO Optimo'].map(t => `
                <span class="wp-ft-tag" style="background: rgba(255,255,255,0.06)">${t}</span>
              `).join('')}
            </div>
            ${d.social && Object.values(d.social).some(Boolean) ? `
              <div style="display:flex; gap:10px;">
                ${[
                  { key: 'facebook', label: 'Facebook' },
                  { key: 'instagram', label: 'Instagram' },
                  { key: 'linkedin', label: 'LinkedIn' },
                ].filter(s => d.social?.[s.key]).map(s => `
                  <a href="${d.social[s.key]}" target="_blank" rel="noopener noreferrer"
                    style="font-size:.72rem; font-weight:600; color: ${a}; text-decoration: none;">
                    ${s.label}
                  </a>
                `).join('')}
              </div>
            ` : ''}
          </div>
        </div>
        <div style="height: 1px; background: rgba(255,255,255,0.08); margin-bottom: 20px;"></div>
        <div style="display: flex; justify-content: space-between; font-size: .75rem; color: rgba(255,255,255,0.4)">
          <span>© ${yr} ${biz}.</span>
          <span>Diseño y tecnología por SiteGen AI</span>
        </div>
      </div>`;
    } else {
      // footerV === 1
      footerHtml = `
      <div class="wp-ft-top">
        <div class="wp-logo">
          ${d.logoImage ? `
            <img src="${d.logoImage}" alt="${biz}" style="max-height: ${d.logoSize || 40}px; max-width: 200px; object-fit: contain; width: auto; transition: max-height 0.2s;" />
          ` : `
            <div style="display:flex; align-items:center; gap:10px;">
              <div class="wp-logo-ic">${(biz || 'M')[0]}</div>
              <span class="wp-logo-nm" style="color: #fff;">${biz}</span>
            </div>
          `}
        </div>
        <div class="wp-ft-tags">
          ${['SSL Seguro', 'Carga rápida', 'SEO Optimizado', 'Mobile Ready'].map(t => `
            <span class="wp-ft-tag">${t}</span>
          `).join('')}
        </div>
      </div>
      ${d.social && Object.values(d.social).some(Boolean) ? `
        <div style="display: flex; gap: 10px; margin-bottom: 24px; flex-wrap: wrap; border-bottom: 1px solid rgba(255,255,255,.08); padding-bottom: 20px;">
          ${[
            { key: 'facebook', label: 'Facebook' },
            { key: 'instagram', label: 'Instagram' },
            { key: 'twitter', label: 'Twitter' },
            { key: 'linkedin', label: 'LinkedIn' },
            { key: 'tiktok', label: 'TikTok' },
            { key: 'youtube', label: 'YouTube' },
          ].filter(s => d.social?.[s.key]).map(s => `
            <a href="${d.social[s.key]}" target="_blank" rel="noopener noreferrer"
              style="font-size:.72rem; font-weight:600; color:rgba(255,255,255,.55); text-decoration:none; padding:3px 8px; border:1px solid rgba(255,255,255,.1); border-radius:6px;">
              ${s.label}
            </a>
          `).join('')}
        </div>
      ` : ''}
      <div class="wp-ft-bot">
        <p class="wp-ft-cp">© ${yr} ${biz}. Todos los derechos reservados.</p>
        <p class="wp-ft-br">Creado con <span>SiteGen AI</span></p>
      </div>`;
    }

    return `
    <footer class="wp-foot v${footerV}">
      ${footerHtml}
    </footer>`;
  };

  // ──────────────────────────────────────────
  // BUILD BODY LAYOUT DYNAMICALLY
  // ──────────────────────────────────────────
  
  const DEFAULT_ORDER = ['hero', 'services', 'about', 'gallery', 'team', 'beforeAfter', 'testimonials', 'contact'];
  const order = d.sectionOrder || DEFAULT_ORDER;
  const visibility = d.sectionsVisibility || {};

  const mainBodyHtml = order.map((sectionKey: string) => {
    if (visibility[sectionKey] === false) return '';
    switch (sectionKey) {
      case 'hero':
        return renderHero();
      case 'services':
        return renderServices();
      case 'about':
        return renderAbout();
      case 'gallery':
        return renderGallery();
      case 'team':
        return renderTeam();
      case 'beforeAfter':
        return renderBeforeAfter();
      case 'testimonials':
        return renderTestimonials();
      case 'contact':
        return renderContact();
      default:
        return '';
    }
  }).join('\n');

  // Google Analytics ID configuration
  const gaId = d.seo?.googleAnalyticsId || d.gaId || '';
  const gaSnippet = gaId ? `
  <!-- Global site tag (gtag.js) - Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=${gaId}"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${gaId}');
  </script>
  ` : '';

  // WhatsApp Widget Configuration
  const whatsappNum = d.contact?.whatsapp || '';
  const cleanWhatsapp = whatsappNum.replace(/[^0-9]/g, '');
  const whatsappWidget = cleanWhatsapp ? `
  <a href="https://wa.me/${cleanWhatsapp}" class="wa-widget" target="_blank" rel="noopener noreferrer" title="Chatear en WhatsApp">
    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.966a9.782 9.782 0 00-6.978-2.879c-5.442 0-9.866 4.372-9.87 9.802 0 1.714.478 3.39 1.386 4.882l-.994 3.63 3.733-.969zM15.85 17.5c-.27-.13-.59-.29-.75-.36-.16-.07-.27-.1-.38.07-.11.17-.43.54-.53.65-.1.11-.2.13-.47 0-.26-.13-1.12-.41-2.13-1.31-.79-.7-1.32-1.57-1.48-1.84-.16-.27-.02-.42.12-.55.12-.12.27-.32.41-.48.14-.16.19-.27.28-.45.09-.18.04-.34-.02-.47-.06-.13-.53-1.28-.73-1.76-.19-.47-.39-.4-.53-.41-.14-.01-.3-.01-.46-.01-.16 0-.43.06-.65.3-.22.24-.85.83-.85 2.02s.87 2.33.99 2.5c.12.17 1.71 2.61 4.14 3.66.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07.97-.4 1.11-.79.14-.39.14-.72.1-.79-.04-.07-.15-.11-.42-.24z"/></svg>
  </a>
  ` : '';

  // Nav dynamic links matching the data navLinks or default
  const navItems = (d.navLinks || ['Inicio','Servicios','Nosotros','Testimonios','Contacto']);
  const navHtml = navItems.map((l: any) => {
    const label = typeof l === 'string' ? l : l.label;
    const href = typeof l === 'string' ? `#wp-${l.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/\s+/g,'-')}` : (l.href || '#');
    return `<a href="${href}">${label}</a>`;
  }).join('');

  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${d.seo?.title || biz}</title>
<meta name="description" content="${d.seo?.description || d.description || ''}">
<meta property="og:title" content="${d.seo?.title || biz}">
<meta property="og:description" content="${d.seo?.description || ''}">
<meta property="og:type" content="website">
<!-- Schema.org -->
<script type="application/ld+json">{"@context":"https://schema.org","@type":"LocalBusiness","name":"${biz}","telephone":"${d.contact?.phone||""}"}</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=${gFont}:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400&display=swap" rel="stylesheet">
${gaSnippet}
<style>
* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-family: ${fontStack(font)};
  color: ${textMain};
  background: ${bgMain};
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

/* ─── NAV (Premium Pill) ────────── */
.wp-nav {
  position: sticky; top: 16px; z-index: 99;
  margin: 0 3%; border-radius: 100px;
  background: ${navBg}; backdrop-filter: blur(28px) saturate(180%); -webkit-backdrop-filter: blur(28px) saturate(180%);
  border: 1px solid ${borderCol};
  box-shadow: 0 8px 32px -8px rgba(0,0,0,${isDark?0.4:0.08}), 0 1px 0 ${isDark?'rgba(255,255,255,0.04)':'rgba(255,255,255,0.8)'} inset;
  padding: 10px 28px; min-height: 68px;
  display: flex; align-items: center; justify-content: space-between; gap: 12px;
}
.wp-logo { display: flex; align-items: center; gap: 10px; flex: 0 1 auto; min-width: 0; }
.wp-logo-ic {
  width: 40px; height: 40px; border-radius: 14px; flex-shrink: 0;
  background: linear-gradient(135deg,${a},${p});
  display: flex; align-items: center; justify-content: center;
  font-weight: 900; color: #fff; font-size: 1.1rem;
  box-shadow: 0 4px 16px ${a}33;
}
.wp-logo-nm { font-weight: 800; font-size: 1.1rem; color: ${textHD}; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 180px; letter-spacing:-0.03em; }
.wp-nav-lks { display: none; flex: 1 1 auto; justify-content: center; gap: 32px; min-width: 0; overflow: hidden; }
.wp-nav-lks a { font-size: .82rem; font-weight: 600; color: ${textMuted}; text-decoration: none; white-space: nowrap; transition: color .25s; position:relative; }
.wp-nav-lks a:hover { color: ${textHD}; }
.wp-nav-lks a::after { content:''; position:absolute; bottom:-4px; left:50%; width:0; height:2px; background:${a}; border-radius:2px; transition:all .25s; transform:translateX(-50%); }
.wp-nav-lks a:hover::after { width:100%; }
.wp-nav-cta {
  padding: 12px 28px; background: ${a}; color: ${isDark?'#000':'#fff'};
  border-radius: 999px; font-weight: 800; font-size: .82rem;
  text-decoration: none; box-shadow: 0 4px 20px ${a}44;
  flex-shrink: 0; white-space: nowrap; transition: all .25s cubic-bezier(0.16,1,0.3,1); cursor:pointer;
}
.wp-nav-cta:hover { transform: translateY(-2px); box-shadow: 0 8px 28px ${a}55; }

/* ─── HERO (V1: Premium Split) ────── */
.wp-hero.v1 { padding: 100px 4% 100px; overflow: hidden; background: linear-gradient(180deg, ${bgMain} 0%, ${bgAlt} 100%); position:relative; }
.wp-hero.v1::before { content:''; position:absolute; top:-250px; left:-250px; width:700px; height:700px; background: radial-gradient(circle, ${a}${isDark?'22':'11'}, transparent 70%); border-radius:50%; z-index:0; pointer-events:none; }
.wp-hero.v1::after { content:''; position:absolute; bottom:-150px; right:-150px; width:500px; height:500px; background: radial-gradient(circle, ${p}${isDark?'18':'08'}, transparent 70%); border-radius:50%; z-index:0; pointer-events:none; }
.wp-hero.v1 .wp-hero-content { position: relative; z-index: 2; width: 100%; max-width: 1240px; margin: 0 auto; display: flex; flex-direction: column; gap: 56px; }
.wp-hero.v1 .wp-hero-txt { flex: 1; text-align: center; display: flex; flex-direction: column; justify-content: center; align-items: center; }
.wp-hero.v1 .wp-hero-img-w { flex: 1; position: relative; display:flex; justify-content:center; }
.wp-hero.v1 .wp-hero-img-w img, .wp-hero.v1 .wp-hero-img-w video { width: 100%; max-width:560px; height: auto; aspect-ratio:4/5; object-fit: cover; border-radius: 28px; box-shadow: 0 40px 80px -20px rgba(0,0,0,${isDark?.6:.25}), 0 0 0 1px ${borderCol}; }

/* ─── HERO (V2: Cinematic Fullscreen) ────── */
.wp-hero.v2 { padding: 0; min-height: 92vh; position: relative; display:flex; align-items:center; justify-content:center; text-align:center; overflow:hidden; }
.wp-hero.v2 .wp-hero-content { position: relative; z-index: 2; display: flex; flex-direction: column; align-items: center; max-width: 900px; margin: 0 auto; padding: 60px 24px; }
.wp-hero.v2 .wp-hero-bg { position: absolute; top:0; left:0; width:100%; height:100%; z-index: 0; }
.wp-hero.v2 .wp-hero-bg::after { content: ''; position:absolute; top:0; left:0; width:100%; height:100%; background: linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.65) 60%, rgba(0,0,0,0.88) 100%); z-index: 1; }
.wp-hero.v2 .wp-hero-bg img, .wp-hero.v2 .wp-hero-bg video { width:100%; height:100%; object-fit:cover; }
.wp-hero.v2 .wp-h1 { font-size: clamp(2.8rem, 6vw, 5.5rem); color: #FFF; text-shadow: 0 2px 40px rgba(0,0,0,0.5); margin-bottom:28px; font-weight:900; letter-spacing: -.04em; line-height:1; }
.wp-hero.v2 .wp-sub { color: rgba(255,255,255,0.85); font-size: clamp(1.05rem, 2.5vw, 1.35rem); max-width: 680px; margin: 0 auto 44px; font-weight:400; line-height:1.7; }
.wp-hero.v2 .wp-btn-p { background: ${a}; box-shadow: 0 8px 32px ${a}55; }
.wp-hero.v2 .wp-btn-g { color: #FFF; border-color: rgba(255,255,255,0.25); backdrop-filter:blur(8px); }
.wp-hero.v2 .wp-btn-g:hover { background: rgba(255,255,255,0.1); color: #FFF; }
.wp-hero.v2 .wp-stats { display: flex; gap: 48px; margin-top: 64px; padding-top: 44px; border-top: 1px solid rgba(255,255,255,0.12); justify-content: center; flex-wrap: wrap; width: 100%; }
.wp-hero.v2 .wp-stat-v { font-size: 2.8rem; font-weight: 900; color: #FFF; line-height: 1; letter-spacing: -.03em; }
.wp-hero.v2 .wp-stat-l { font-size: .75rem; font-weight: 600; color: rgba(255,255,255,0.55); margin-top: 10px; text-transform:uppercase; letter-spacing:.08em; }

/* ─── HERO V3 — Minimal / Editorial ── */
.wp-hero.v3 { padding: 140px 5% 120px; background: ${bgSec}; position:relative; text-align:center; overflow:hidden; }
.wp-hero.v3::before { content:''; position:absolute; top:0; left:0; right:0; height:4px; background:linear-gradient(90deg,${a},${p}); }
.wp-hero.v3 .wp-hero-content { max-width:880px; margin:0 auto; display:flex; flex-direction:column; align-items:center; position:relative; z-index:2; }
.wp-hero.v3 .wp-h1 { font-size:clamp(3.2rem,9vw,6.5rem); font-weight:900; letter-spacing:-.055em; line-height:0.95; margin-bottom:36px; color:${textHD}; }
.wp-hero.v3 .wp-h1 em { font-style:normal; color:${a}; }
.wp-hero.v3 .wp-sub { font-size:clamp(1.1rem,2.5vw,1.35rem); max-width:620px; }
.wp-hero.v3 .wp-divider { width:56px; height:4px; background:${a}; border-radius:2px; margin:0 auto 36px; }
.wp-hero.v3 .wp-stats { justify-content:center; margin-top:72px; padding-top:48px; border-top:1px solid ${borderCol}; }

/* ─── HERO V4 — Bold Split-Screen ── */
.wp-hero.v4 { padding:0; min-height:90vh; display:grid; grid-template-columns:1fr 1fr; position:relative; overflow:hidden; }
.wp-hero.v4 .wp-hero-left { background:linear-gradient(150deg,${p} 0%,${p}EE 100%); display:flex; flex-direction:column; justify-content:center; padding:80px 64px; position:relative; overflow:hidden; z-index:1; }
.wp-hero.v4 .wp-hero-left::before { content:''; position:absolute; top:-120px; right:-120px; width:420px; height:420px; border-radius:50%; background:${a}22; pointer-events:none; }
.wp-hero.v4 .wp-hero-left::after { content:''; position:absolute; bottom:-100px; left:-80px; width:320px; height:320px; border-radius:50%; background:rgba(255,255,255,0.04); pointer-events:none; }
.wp-hero.v4 .wp-hero-right { position:relative; overflow:hidden; min-height:500px; }
.wp-hero.v4 .wp-hero-right img, .wp-hero.v4 .wp-hero-right video { width:100%; height:100%; object-fit:cover; display:block; }
.wp-hero.v4 .wp-h1 { color:#fff; font-size:clamp(2.4rem,4.5vw,3.8rem); letter-spacing:-.04em; line-height:1.02; margin-bottom:24px; font-weight:900; }
.wp-hero.v4 .wp-sub { color:rgba(255,255,255,0.82); max-width:100%; margin-left:0; font-size:1.1rem; }
.wp-hero.v4 .wp-badge { margin:0 0 28px 0; background:rgba(255,255,255,0.1); border-color:rgba(255,255,255,0.2); align-self:flex-start; }
.wp-hero.v4 .wp-badge-t { color:rgba(255,255,255,0.88); }
.wp-hero.v4 .wp-btns { justify-content:flex-start; }
.wp-hero.v4 .wp-btn-p { background:${a}; }
.wp-hero.v4 .wp-btn-g { color:#fff; border-color:rgba(255,255,255,0.3); }
.wp-hero.v4 .wp-btn-g:hover { background:rgba(255,255,255,0.1); }
.wp-hero.v4 .wp-stats { justify-content:flex-start; margin-top:56px; padding-top:40px; border-top:1px solid rgba(255,255,255,0.15); }
.wp-hero.v4 .wp-stat-v { color:#fff; font-size:2.2rem; }
.wp-hero.v4 .wp-stat-l { color:rgba(255,255,255,0.55); }

/* ─── SERVICES V3 — Editorial Numbered ── */
.wp-grid.v3 { display:flex; flex-direction:column; gap:0; max-width:860px; margin:0 auto; }
.wp-grid.v3 .wp-scard { background:transparent; border:none; border-bottom:1px solid ${borderCol}; border-radius:0; padding:44px 0; display:grid; grid-template-columns:72px 1fr; gap:32px; align-items:flex-start; text-align:left; box-shadow:none; }
.wp-grid.v3 .wp-scard::before { display:none; }
.wp-grid.v3 .wp-scard:last-child { border-bottom:none; }
.wp-grid.v3 .wp-scard:hover { transform:none; box-shadow:none; }
.wp-grid.v3 .wp-sicon-wrap { width:64px; height:64px; border-radius:16px; border:2px solid ${a}44; transition:all .3s; flex-shrink:0; }
.wp-grid.v3 .wp-scard:hover .wp-sicon-wrap { background:${a}; color:#fff; transform:none; border-color:${a}; }
.wp-grid.v3 .wp-s-h3 { font-size:1.35rem; margin-bottom:12px; }
.wp-grid.v3 .wp-s-p { font-size:.95rem; }

/* ─── SERVICES V4 — Alternating Full-width Strips ── */
.wp-grid.v4-outer { margin:0 -5%; width:calc(100% + 10%); }
.wp-grid.v4 { display:flex; flex-direction:column; gap:0; width:100%; }
.wp-grid.v4 .wp-scard { background:transparent; border:none; border-radius:0; padding:80px 5%; display:grid; grid-template-columns:1fr 1fr; gap:64px; align-items:center; text-align:left; box-shadow:none; transition:background .3s; }
.wp-grid.v4 .wp-scard::before { display:none; }
.wp-grid.v4 .wp-scard:nth-child(even) { background:${bgAlt}; flex-direction:row-reverse; }
.wp-grid.v4 .wp-scard:nth-child(even) .wp-sicon-wrap-col { order:2; }
.wp-grid.v4 .wp-scard:nth-child(even) .wp-stext-col { order:1; }
.wp-grid.v4 .wp-scard:hover { transform:none; box-shadow:none; background:${a}08; }
.wp-grid.v4 .wp-sicon-wrap { width:88px; height:88px; border-radius:24px; font-size:1.8rem; margin-bottom:0; }
.wp-grid.v4 .wp-sicon-wrap-col { display:flex; align-items:center; justify-content:center; }
.wp-grid.v4 .wp-s-h3 { font-size:1.7rem; margin-bottom:14px; }
.wp-grid.v4 .wp-s-p { font-size:1rem; line-height:1.85; }
.wp-grid.v4 .wp-s-more { margin-top:24px; font-size:.9rem; }

/* Hero Shared */
.wp-badge { display: inline-flex; align-items: center; gap: 8px; padding: 7px 18px; background: ${badgeBg}; border: 1px solid ${borderCol}; border-radius: 999px; margin: 0 auto 28px; box-shadow: 0 4px 16px rgba(0,0,0,.04); backdrop-filter:blur(12px); }
.wp-hero.v2 .wp-badge { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.15); }
.wp-hero.v2 .wp-badge-t { color: rgba(255,255,255,0.9); }
.wp-badge-dot { width: 7px; height: 7px; border-radius: 50%; background: ${a}; flex-shrink: 0; animation: wp-glow 2s ease-in-out infinite; }
.wp-badge-t { font-size: .72rem; font-weight: 700; color: ${textMuted}; text-transform: uppercase; letter-spacing: .1em; }
.wp-h1 { font-size: clamp(2.5rem,7vw,4.5rem); font-weight: 900; color: ${textHD}; line-height: 1.02; margin-bottom: 28px; letter-spacing: -.045em; text-wrap: balance; }
.wp-sub { font-size: clamp(1.05rem,3vw,1.25rem); color: ${textMuted}; line-height: 1.7; max-width: 580px; margin: 0 auto 44px; font-weight: 400; }
.wp-a-sub { font-size: 1.05rem; color: ${textMuted}; line-height: 1.75; margin-bottom: 8px; }

.wp-btns { display: flex; gap: 16px; flex-direction: column; align-items: center; }
.wp-btn-p { display: flex; align-items: center; justify-content: center; gap: 8px; padding: 16px 40px; background: ${a}; color: ${isDark?'#000':'#fff'}; border-radius: 999px; font-weight: 800; font-size: 1rem; text-decoration: none; box-shadow: 0 8px 32px ${a}44; transition: all .3s cubic-bezier(0.16,1,0.3,1); letter-spacing: -.01em; }
.wp-btn-p:hover { transform: translateY(-3px); box-shadow: 0 16px 40px ${a}55; }
.wp-btn-g { display: flex; align-items: center; justify-content: center; gap: 8px; padding: 15px 40px; background: transparent; color: ${textHD}; border-radius: 999px; font-weight: 700; font-size: 1rem; text-decoration: none; border: 1.5px solid ${borderCol}; transition: all .3s cubic-bezier(0.16,1,0.3,1); }
.wp-btn-g:hover { background: ${isDark?'rgba(255,255,255,0.06)':borderCol}; border-color: ${isDark?'rgba(255,255,255,0.15)':'rgba(0,0,0,0.1)'}; }

.wp-stats { display: flex; gap: 48px; margin-top: 56px; padding-top: 44px; border-top: 1px solid ${borderCol}; justify-content: center; flex-wrap: wrap; }
.wp-stat-v { font-size: 2.5rem; font-weight: 900; color: ${textHD}; line-height: 1; letter-spacing: -.03em; }
.wp-stat-l { font-size: .73rem; font-weight: 600; color: ${textMuted}; margin-top: 10px; text-transform:uppercase; letter-spacing:.08em; }

/* Trust strip */
.wp-trust { text-align: center; padding: 48px 5%; background: ${bgAlt}; border-bottom: 1px solid ${borderCol}; border-top: 1px solid ${borderCol}; }
.wp-trust-l { font-size: .72rem; font-weight: 700; color: ${textMuted}; text-transform: uppercase; letter-spacing: .12em; margin-bottom: 28px; }
.wp-trust-row { display: flex; justify-content: center; gap: 56px; flex-wrap: wrap; opacity: ${isDark?0.5:0.35}; filter: grayscale(100%); }

/* ─── SECTIONS ────────────── */
.wp-sec { padding: 100px 5%; position:relative; }
.wp-sec:nth-child(odd) { background: ${bgSec}; }
.wp-sec:nth-child(even) { background: ${bgAlt}; }
.wp-sec-lbl { display: inline-flex; align-items:center; gap:6px; padding: 8px 20px; background: ${glowSoft}; border-radius: 999px; font-size: .72rem; font-weight: 700; color: ${a}; text-transform: uppercase; letter-spacing: .1em; margin-bottom: 20px; border: 1px solid ${a}22; }
.wp-h2 { font-size: clamp(2rem,5vw,3.2rem); font-weight: 900; color: ${textHD}; letter-spacing: -.035em; margin-bottom: 20px; line-height: 1.08; display:inline-block; text-wrap: balance; }
.wp-sec-sub { color: ${textMuted}; font-size: clamp(1rem,3vw,1.12rem); line-height: 1.75; max-width: 600px; margin: 0 auto 72px; font-weight: 400; }

/* Services Base */
.wp-grid { display: grid; gap: 24px; grid-template-columns: 1fr; max-width: 1240px; margin: 0 auto; }
.wp-grid.v2 { display: flex; flex-direction: column; gap: 0; }
.wp-scard { background: ${cardBg}; border: 1px solid ${borderCol}; border-radius: 24px; padding: 36px 28px; position: relative; overflow: hidden; transition: all .35s cubic-bezier(0.16,1,0.3,1); text-align: left; }
.wp-scard::before { content:''; position:absolute; top:0; left:0; right:0; height:3px; background: linear-gradient(90deg, ${a}, ${p}); opacity:0; transition: opacity .3s; }
.wp-scard:hover { transform: translateY(-8px); box-shadow: 0 32px 64px -16px rgba(0,0,0,${isDark?.35:.12}); border-color: ${a}33; }
.wp-scard:hover::before { opacity:1; }
.wp-sicon-wrap { width: 52px; height: 52px; border-radius: 14px; background: ${a}12; display: flex; align-items: center; justify-content: center; color: ${a}; margin-bottom: 24px; font-size: 1.5rem; border:1px solid ${a}22; transition: all .3s; }
.wp-scard:hover .wp-sicon-wrap { background: ${a}22; transform: scale(1.1); }
.wp-s-h3 { font-size: 1.2rem; font-weight: 800; color: ${textHD}; margin-bottom: 12px; letter-spacing:-0.02em; }
.wp-s-p { font-size: .9rem; color: ${textMuted}; line-height: 1.7; }
.wp-s-more { margin-top: 20px; font-size: .85rem; font-weight: 700; color: ${a}; display: inline-flex; align-items: center; gap: 6px; transition: gap .2s; }
.wp-scard:hover .wp-s-more { gap: 10px; }

/* V2 Overrides */
.wp-grid.v2 .wp-scard { background: transparent; border: none; border-bottom: 1px solid ${borderCol}; padding: 32px 0; box-shadow: none; display: flex; flex-direction: column; align-items: flex-start; text-align: left; border-radius: 0; }
.wp-grid.v2 .wp-scard::before { display:none; }
.wp-grid.v2 .wp-scard:last-child { border-bottom: none; }
.wp-grid.v2 .wp-scard:hover { transform: none; }
.wp-grid.v2 .wp-sicon-wrap { width: 52px; height: 52px; margin-bottom: 20px; }
.wp-grid.v2 .wp-s-h3 { font-size: 1.35rem; }

/* About Section */
.wp-about { display: grid; grid-template-columns: 1fr; gap: 56px; align-items: center; max-width:1240px; margin:0 auto; }
.wp-img-w { position: relative; }
.wp-img { width: 100%; height: auto; aspect-ratio: 4/5; object-fit: cover; border-radius: 28px; box-shadow: 0 32px 64px -16px rgba(0,0,0,${isDark?.5:.2}); border:1px solid ${borderCol}; }
.wp-abnd { position: absolute; bottom: -20px; right: -10px; background: ${isDark?'rgba(20,20,20,0.9)':'rgba(255,255,255,0.95)'}; backdrop-filter: blur(16px); border-radius: 20px; padding: 18px 22px; display: flex; align-items: center; gap: 14px; border: 1px solid ${borderCol}; box-shadow: 0 16px 40px -8px rgba(0,0,0,${isDark?.4:.12}); }
.wp-abnd-ic { width: 44px; height: 44px; border-radius: 12px; background: ${a}15; color: ${a}; display: flex; align-items: center; justify-content: center; font-size: 1.4rem; border: 1px solid ${a}22; }
.wp-abnd-v { font-size: 1.5rem; font-weight: 900; color: ${textHD}; letter-spacing: -.03em; line-height: 1; }
.wp-abnd-l { font-size: .7rem; font-weight: 600; color: ${textMuted}; text-transform: uppercase; letter-spacing: .06em; margin-top: 3px; }
.wp-checks { display: flex; flex-direction: column; gap: 18px; margin: 36px 0 44px; }
.wp-check { display: flex; align-items: center; gap: 16px; font-size: .95rem; font-weight: 500; color: ${textMain}; }
.wp-ck-dot { width: 28px; height: 28px; border-radius: 50%; background: ${a}15; color: ${a}; display: flex; align-items: center; justify-content: center; font-size: .85rem; font-weight: 900; border:1px solid ${a}33; flex-shrink:0; }
.wp-ck-t { line-height: 1.5; }

/* Team & Before/After */
.wp-team-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 28px; max-width: 1000px; margin: 48px auto 0; }
.wp-team-card { background: ${cardBg}; border: 1px solid ${borderCol}; border-radius: 24px; padding: 44px 32px; box-shadow: 0 8px 24px -8px rgba(0,0,0,${isDark?.2:.05}); display: flex; flex-direction: column; align-items: center; transition: all .35s cubic-bezier(0.16,1,0.3,1); }
.wp-team-card:hover { transform: translateY(-8px); box-shadow: 0 24px 48px -12px rgba(0,0,0,${isDark?.3:.1}); }
.wp-team-ic { width: 100px; height: 100px; border-radius: 50%; background: linear-gradient(135deg, ${a}15, ${p}15); display: flex; align-items: center; justify-content: center; font-size: 3rem; margin-bottom: 24px; border:1px solid ${borderCol}; }

.wp-ba-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 28px; max-width: 1100px; margin: 0 auto; }
.wp-ba-card { border-radius: 20px; overflow: hidden; border: 1px solid ${borderCol}; background: ${cardBg}; box-shadow: 0 16px 40px -10px rgba(0,0,0,${isDark?.2:.08}); transition: all .3s; }
.wp-ba-card:hover { transform: translateY(-4px); box-shadow: 0 24px 48px -12px rgba(0,0,0,${isDark?.3:.12}); }
.wp-gal-card { border-radius: 20px; overflow: hidden; aspect-ratio: 4/3; background: ${bgMain}; box-shadow: 0 8px 24px rgba(0,0,0,${isDark?.2:.08}); border:1px solid ${borderCol}; transition: all .35s; }
.wp-gal-card:hover { box-shadow: 0 16px 40px rgba(0,0,0,${isDark?.3:.15}); }

/* Testimonials */
.wp-tgrid { display: grid; grid-template-columns: 1fr; gap: 24px; margin-top: 48px; max-width:1240px; margin:48px auto 0; }
.wp-tcard { background: ${cardBg}; border: 1px solid ${borderCol}; border-radius: 24px; padding: 36px 28px; box-shadow: 0 8px 24px -8px rgba(0,0,0,${isDark?.15:.05}); position:relative; transition: all .35s; }
.wp-tcard:hover { transform: translateY(-4px); box-shadow: 0 20px 40px -10px rgba(0,0,0,${isDark?.25:.1}); }
.wp-tcard::before { content:'\u201C'; position:absolute; top:16px; right:24px; font-size:5rem; color: ${a}10; font-family:Georgia,serif; line-height:1; pointer-events:none; }
.wp-stars { color: ${a}; font-size: 1rem; margin-bottom: 18px; display:flex; gap:3px; }
.wp-ttxt { font-size: 1rem; color: ${textMain}; line-height: 1.75; font-style: italic; margin-bottom: 28px; }
.wp-tav-row { display: flex; align-items: center; gap: 14px; }
.wp-tav { width: 46px; height: 46px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800; color: #fff; font-size: 1.1rem; }
.wp-tn { font-weight: 800; font-size: .95rem; color: ${textHD}; margin-bottom:2px; }
.wp-tr { font-size: .8rem; color: ${textMuted}; }

/* Contact */
.wp-cont { padding: 110px 5%; background: ${isDark?'#070707':bgMain}; color: ${textMain}; position: relative; overflow: hidden; }
.wp-cont::before { content: ''; position: absolute; top:-120px; right:-120px; width:500px; height:500px; border-radius:50%; background: radial-gradient(circle, ${a}${isDark?'18':'06'}, transparent 70%); pointer-events:none; }
.wp-cont::after { content: ''; position: absolute; bottom:-100px; left:-100px; width:400px; height:400px; border-radius:50%; background: radial-gradient(circle, ${p}${isDark?'12':'04'}, transparent 70%); pointer-events:none; }
.wp-cont-in { position: relative; z-index: 1; max-width:1200px; margin:0 auto; }
.wp-cont-h { text-align: center; margin-bottom: 60px; }
.wp-cont-h .wp-h2 { color: ${textHD}; margin-bottom: 16px; }
.wp-cont-h p { color: ${textMuted}; font-size: 1.1rem; line-height: 1.7; }
.wp-ccards { display: flex; flex-direction: column; gap: 16px; margin: 0 auto 52px; max-width: 640px; align-items: stretch; }
.wp-ccard { background: ${cardBg}; border: 1px solid ${borderCol}; border-radius: 20px; padding: 22px 20px; display: flex; align-items: center; gap: 18px; text-align: left; width: 100%; transition:all .25s; }
.wp-ccard:hover { transform:translateY(-2px); border-color:${a}44; box-shadow: 0 8px 24px -4px rgba(0,0,0,${isDark?.2:.06}); }
.wp-cicon { width: 52px; height: 52px; border-radius: 14px; background: ${a}12; color: ${a}; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size:1.4rem; border: 1px solid ${a}22; }
.wp-clbl { font-size: .7rem; font-weight: 700; color: ${textMuted}; text-transform: uppercase; letter-spacing: .1em; margin-bottom: 5px; }
.wp-cval { font-weight: 700; color: ${textHD}; font-size: .95rem; word-break: break-word; }
.wp-call { text-align: center; margin-top: 20px; }
.wp-btn-c { display: inline-flex; align-items: center; gap: 10px; padding: 18px 48px; background: ${a}; color: ${isDark?'#000':'#fff'}; border-radius: 999px; font-weight: 800; font-size: 1.05rem; text-decoration: none; box-shadow: 0 12px 32px ${a}44; transition: all .3s cubic-bezier(0.16,1,0.3,1); }
.wp-btn-c:hover { transform: translateY(-4px); box-shadow: 0 16px 40px ${a}55; }

/* Footer */
.wp-foot { background: ${isDark?'#000':'#0A0A0A'}; padding: 64px 5% 36px; border-top:1px solid rgba(255,255,255,0.05); }
.wp-ft-top { display: flex; align-items: center; justify-content: space-between; padding-bottom: 36px; margin-bottom: 36px; border-bottom: 1px solid rgba(255,255,255,.06); flex-wrap: wrap; gap: 24px; max-width:1240px; margin:0 auto 36px; }
.wp-ft-tags { display: flex; gap: 8px; flex-wrap: wrap; }
.wp-ft-tag { padding: 6px 14px; background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.08); border-radius: 8px; font-size: .72rem; font-weight: 600; color: rgba(255,255,255,.45); white-space: nowrap; display: inline-flex; align-items: center; gap: 6px; }
.wp-ft-bot { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; max-width:1240px; margin:0 auto; }
.wp-ft-cp { font-size: .78rem; color: rgba(255,255,255,.25); }
.wp-ft-br { font-size: .78rem; color: rgba(255,255,255,.25); }
.wp-ft-br span { color: ${a}; font-weight: 700; }

/* WhatsApp Floating Widget styling */
.wa-widget {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 60px;
  height: 60px;
  background: #25D366;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 16px rgba(0,0,0,0.3);
  z-index: 9999;
  transition: transform 0.3s, box-shadow 0.3s;
}
.wa-widget:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 24px rgba(0,0,0,0.4);
}
.wa-widget svg {
  width: 30px;
  height: 30px;
}

/* Animations */
.rev { opacity:0; transform:translateY(30px); transition:all 0.7s cubic-bezier(0.16,1,0.3,1); }
.rev-act { opacity:1; transform:translateY(0); }
@keyframes wp-glow { 0%,100%{box-shadow:0 0 0 4px ${a}33} 50%{box-shadow:0 0 0 8px ${a}22} }

/* Responsive Media Queries */
@media (min-width: 480px) {
  .wp-btns { flex-direction: row; justify-content: center; }
  .wp-tgrid { grid-template-columns: repeat(2, 1fr); }
}
@media (min-width: 640px) {
  .wp-grid.v1 { grid-template-columns: repeat(2, 1fr); }
  .wp-grid.v3 { grid-template-columns: repeat(2, 1fr); }
}
@media (min-width: 820px) {
  .wp-nav-lks { display: flex; }
  .wp-logo-nm { font-size: 1.15rem; max-width: 240px; }
  .wp-hero.v1 { padding: 130px 5% 140px; }
  .wp-hero-ct { flex-direction: row; text-align: left; align-items: center; }
  .wp-hero-txt { text-align: left; padding-right: 64px; align-items: flex-start; }
  .wp-badge { margin: 0 0 32px 0; }
  .wp-sub { margin-left: 0; font-size:1.2rem; }
  .wp-stats { justify-content: flex-start; gap:56px; }
  
  .wp-trust-row { gap: 80px; }
  
  .wp-grid.v1 { grid-template-columns: repeat(3, 1fr); gap: 24px; }
  .wp-grid.v1 .wp-scard:nth-child(1) { grid-column: span 2; }
  .wp-grid.v1 .wp-scard:nth-child(4) { grid-column: span 2; }
  
  .wp-grid.v2 .wp-scard { flex-direction: row; align-items: flex-start; gap: 32px; padding: 40px 0; }
  .wp-grid.v2 .wp-sicon-wrap { width: 60px; height: 60px; font-size: 1.6rem; margin-bottom: 0; flex-shrink: 0; }
  .wp-grid.v2 .wp-s-h3 { font-size: 1.5rem; margin-top: 0; margin-bottom: 12px; }
  
  .wp-grid.v3 { grid-template-columns: repeat(3, 1fr); gap: 24px; }
  
  .wp-about { grid-template-columns: 1fr 1fr; gap: 80px; }
  
  .wp-tgrid { grid-template-columns: repeat(3, 1fr); gap:24px; }
  .wp-ccards { flex-direction: row; max-width: 1000px; gap: 24px; }
  .wp-ccard { flex-direction: column; text-align: center; align-items: center; padding: 36px 20px; }
  
  .wp-sec { padding: 120px 5%; }
  .wp-nav { margin: 0 3%; min-height: 72px; padding: 10px 32px; }
}
</style>
</head>
<body>

<!-- NAV -->
<nav class="wp-nav">
  <div class="wp-logo">
    ${d.logoImage 
      ? `<img src="${d.logoImage}" alt="${biz}" style="max-height:${d.logoSize||56}px; max-width:280px; object-fit:contain; width:auto">` 
      : `<div class="wp-logo-ic">${biz[0]}</div><span class="wp-logo-nm">${biz}</span>`
    }
  </div>
  <div class="wp-nav-lks">${navHtml}</div>
  <a href="${d.hero?.ctaLink||'#wp-contact'}" class="wp-nav-cta" ${d.hero?.ctaLink?.startsWith('http')?'target="_blank"':''}>${d.hero?.ctaText||'Empezar Ahora'}</a>
</nav>

${mainBodyHtml}

<!-- WHATSAPP FLOATING WIDGET -->
${whatsappWidget}

<script>
// Scroll Animation Observer
const ob = new IntersectionObserver(e => {
  e.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('rev-act');
      ob.unobserve(entry.target);
    }
  })
}, { threshold: 0.1 });
document.querySelectorAll('.rev').forEach(el => ob.observe(el));

// Smooth Scroll to internal sections
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (!href || href === '#') return;
    const targetEl = document.querySelector(href);
    if (targetEl) {
      e.preventDefault();
      window.scrollTo({
        top: targetEl.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});
</script>
</body>
</html>`;
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'authorization, content-type' } });
  }
  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
    const { siteId } = await req.json();
    if (!siteId) return new Response(JSON.stringify({ error: 'siteId required' }), { status: 400 });

    const { data: site, error: siteErr } = await supabase.from('websites').select('*').eq('id', siteId).maybeSingle();
    if (siteErr || !site) return new Response(JSON.stringify({ error: 'Site not found' }), { status: 404 });

    const json = site.site_json || {};
    const slugBase = (json.businessName || site.name || 'sitio').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9\s-]/g,'').trim().replace(/\s+/g,'-').slice(0,30);
    const subdomain = `${slugBase}-${siteId.slice(0,6)}`;
    const filePath = `${subdomain}/index.html`;
    const html = buildHTML(json, subdomain);

    const { error: uploadErr } = await supabase.storage.from('sites').upload(filePath, new Blob([html], { type: 'text/html; charset=utf-8' }), { upsert: true, contentType: 'text/html; charset=utf-8' });
    if (uploadErr) throw new Error(uploadErr.message);

    const publishedUrl = `${SUPABASE_URL}/storage/v1/object/public/sites/${filePath}`;
    await supabase.from('websites').update({ status: 'published', subdomain, vercel_url: publishedUrl, published_url: publishedUrl, last_deployed_at: new Date().toISOString(), deploy_count: (site.deploy_count || 0) + 1 }).eq('id', siteId);

    return new Response(JSON.stringify({ success: true, publishedUrl, subdomain }), { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } });
  }
});
