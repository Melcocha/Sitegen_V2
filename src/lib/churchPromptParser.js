/**
 * churchPromptParser.js
 * Intelligent NLP parser for church website prompts.
 * Dynamically detects church names, active sections, negations, custom times, and locations.
 */

export const CHURCH_SECTIONS = [
  {
    key: 'planAVisit',
    label: 'Horarios & Visita',
    icon: '🕒',
    keywords: ['horario', 'horarios', 'visita', 'visitanos', 'visítanos', 'domingo', 'domingos', 'culto', 'cultos', 'servicio', 'servicios', 'reunion', 'reuniones', 'ubicacion', 'ubicación', 'como llegar', 'asistir'],
    negations: ['sin horario', 'sin horarios', 'sin visita', 'no horarios', 'no visita'],
    defaultActive: true,
  },
  {
    key: 'sermons',
    label: 'Prédicas & Mensajes',
    icon: '📖',
    keywords: ['predica', 'predicas', 'prédica', 'prédicas', 'mensaje', 'mensajes', 'sermon', 'sermones', 'enseñanza', 'enseñanzas', 'estudio biblico', 'estudios biblicos', 'podcast', 'youtube', 'video', 'videos', 'transmision', 'transmisión', 'en vivo', 'palabra'],
    negations: ['sin predica', 'sin predicas', 'sin prédica', 'sin prédicas', 'no predicas', 'no prédicas', 'sin video', 'sin videos', 'no videos', 'sin mensajes'],
    defaultActive: true,
  },
  {
    key: 'ministries',
    label: 'Ministerios & Grupos',
    icon: '👥',
    keywords: ['ministerio', 'ministerios', 'joven', 'jovenes', 'jóvenes', 'niño', 'niños', 'infantil', 'kidzone', 'kids', 'matrimonio', 'matrimonios', 'pareja', 'parejas', 'familia', 'familias', 'mujer', 'mujeres', 'dama', 'damas', 'hombre', 'hombres', 'caballero', 'caballeros', 'alabanza', 'musica', 'música', 'danza', 'grupo', 'grupos', 'celula', 'célula', 'celulas', 'células'],
    negations: ['sin ministerio', 'sin ministerios', 'no ministerio', 'no ministerios', 'sin grupos'],
    defaultActive: true,
  },
  {
    key: 'welcome',
    label: 'Bienvenida & Pastores',
    icon: '🏠',
    keywords: ['bienvenida', 'bienvenido', 'bienvenidos', 'pastor', 'pastores', 'pastora', 'pastoras', 'mensaje pastoral', 'carta pastoral', 'saludo', 'lideres', 'líderes', 'equipo pastoral'],
    negations: ['sin bienvenida', 'sin pastores', 'no pastores', 'sin líderes'],
    defaultActive: true,
  },
  {
    key: 'events',
    label: 'Eventos & Calendario',
    icon: '📅',
    keywords: ['evento', 'eventos', 'calendario', 'actividad', 'actividades', 'conferencia', 'conferencias', 'campamento', 'campamentos', 'vigilia', 'vigilias', 'retiro', 'retiros', 'taller', 'talleres', 'reuniones especiales', 'aniversario'],
    negations: ['sin evento', 'sin eventos', 'no eventos', 'sin calendario', 'sin actividades'],
    defaultActive: false,
  },
  {
    key: 'donation',
    label: 'Donaciones & Ofrendas',
    icon: '💛',
    keywords: ['donacion', 'donaciones', 'donación', 'ofrenda', 'ofrendas', 'diezmo', 'diezmos', 'dar', 'apoyar', 'sembrar', 'aportar', 'donar', 'transferencia', 'colaborar'],
    negations: ['sin donacion', 'sin donaciones', 'sin donación', 'sin ofrenda', 'sin ofrendas', 'no donaciones', 'no ofrendas', 'no pedir dinero', 'sin diezmo', 'sin diezmos'],
    defaultActive: false,
  },
  {
    key: 'prayerRequest',
    label: 'Petición de Oración',
    icon: '🙏',
    keywords: ['oracion', 'oración', 'peticion', 'petición', 'peticiones', 'motivo de oracion', 'motivos de oracion', 'intercesion', 'intercesión', 'pedir oracion', 'pedir oración', 'orar por ti', 'necesitas oracion', 'necesitas oración'],
    negations: ['sin oracion', 'sin oración', 'sin peticion', 'sin peticiones', 'no oracion', 'no oración'],
    defaultActive: false,
  },
  {
    key: 'values',
    label: 'En lo que Creemos (Valores)',
    icon: '✝️',
    keywords: ['valor', 'valores', 'en lo que creemos', 'creencia', 'creencias', 'doctrina', 'declaracion de fe', 'declaración de fe', 'fundamentos', 'fe', 'nuestra fe', 'mision', 'misión', 'vision', 'visión', 'principios'],
    negations: ['sin valores', 'sin doctrina', 'sin creencias'],
    defaultActive: false,
  },
  {
    key: 'nextSteps',
    label: 'Próximos Pasos',
    icon: '🚶',
    keywords: ['proximo', 'proximos', 'próximo', 'próximos', 'paso', 'pasos', 'bautismo', 'bautismos', 'discipulado', 'membresia', 'membresía', 'primeros pasos', 'involucrate', 'involúcrate', 'crecer en la fe'],
    negations: ['sin proximos pasos', 'sin próximos pasos', 'sin pasos'],
    defaultActive: true,
  },
  {
    key: 'about',
    label: 'Quiénes Somos & Historia',
    icon: 'ℹ️',
    keywords: ['quienes somos', 'quiénes somos', 'sobre nosotros', 'historia', 'nuestra historia', 'acerca de', 'origen', 'trayectoria'],
    negations: ['sin historia', 'no historia', 'sin quienes somos'],
    defaultActive: false,
  },
  {
    key: 'contact',
    label: 'Contacto & Ubicación',
    icon: '📍',
    keywords: ['contacto', 'contactanos', 'contáctanos', 'telefono', 'teléfono', 'whatsapp', 'redes', 'email', 'correo', 'direccion', 'dirección', 'sede', 'mapa', 'donde estamos', 'dónde estamos'],
    negations: ['sin contacto', 'sin telefono', 'sin teléfono'],
    defaultActive: true,
  },
]

/**
 * Normalizes text for keyword matching: removes accents, lowers case.
 */
function normalizeText(str = '') {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

/**
 * Extracts church name from a user prompt.
 */
export function extractChurchName(promptText = '') {
  if (!promptText) return 'Comunidad de Fe'
  let text = promptText.trim()

  const stripAudienceAndNoise = (str) => {
    if (!str) return ''
    let s = str.trim()
    // 1. Remove introductory or trailing noise clauses (e.g. "sólo con horarios...", "con eventos...", "para jóvenes...")
    s = s.replace(/(?:^\s*|\s+)(?:(?:s[oó]lo|solo|solamente|[uú]nicamente|exclusivamente|tan\s+s[oó]lo|tan\s+solo|nada\s+m[aá]s)?\s*(?:con|sin|donde|en|para|que|enfocad[ao]|centrad[ao]|dedicad[ao])\b.*)$/i, '')
    // 2. Remove trailing stop words and feature words
    s = s.replace(/(?:^\s*|\s+)(?:s[oó]lo|solo|solamente|[uú]nicamente|exclusivamente|horarios?|servicios?|misas?|cultos?|contacto|datos|ubicaci[oó]n|redes|donaciones?|predicas?|prédicas?|ministerios?|eventos?|ubicad[ao]|es\s+una|es\s+un)\b.*$/i, '')
    // 3. Remove trailing connectors/prepositions
    s = s.replace(/(?:\s+|^)(?:s[oó]lo|solo|solamente|[uú]nicamente|para|con|sin|de|en|donde|que|y|e|a|del?)\s*$/i, '')
    s = s.replace(/(?:\s+|^)(?:s[oó]lo|solo|solamente|[uú]nicamente)\s*$/i, '')
    // 4. Remove trailing punctuation
    s = s.replace(/[.,;!?'"()\-]+$/, '').trim()
    return s
  }

  const formatTitle = (rawName) => {
    if (!rawName) return ''
    const clean = stripAudienceAndNoise(rawName)
    if (!clean) return ''
    const minor = ['de', 'del', 'la', 'las', 'los', 'el', 'y', 'en', 'e']
    const words = clean.split(/\s+/)
    return words.map((w, idx) => {
      const lw = w.toLowerCase()
      if (idx > 0 && lw === 'el' && words[idx + 1] && /^[A-ZÁÉÍÓÚÑ]/i.test(words[idx + 1]) && /shaddai|rey|se[nñ]or|salvador/i.test(words[idx + 1])) {
        return 'El'
      }
      if (idx > 0 && minor.includes(lw)) return lw
      return w.charAt(0).toUpperCase() + w.slice(1)
    }).join(' ')
  }

  // 1. Explicit naming quotes: e.g. "Parroquia San José" or 'Iglesia Vida Nueva'
  const quotedMatch = text.match(/["']((?:Iglesia|Parroquia|Comunidad|Ministerio|Centro|Catedral|Capilla|Bas[ií]lica|Santuario)\s+[^"']+)["']/i)
  if (quotedMatch && quotedMatch[1]) {
    const clean = formatTitle(quotedMatch[1])
    if (clean.length >= 4) return clean
  }

  // 2. Explicit phrasing: "llamada [X]", "de nombre [X]"
  const llamadaMatch = text.match(/(?:llamada|llamado|de nombre|nombre:?|denominada|titulada)\s+["']?([^"'\n,.;]+?)["']?(?:\s+(?:(?:s[oó]lo|solo|solamente|[uú]nicamente)?\s*(?:con|sin|en|para|donde|ubicad)|horarios|servicios|misas|que|\.|\,|$)|$)/i)
  if (llamadaMatch && llamadaMatch[1]) {
    let name = formatTitle(llamadaMatch[1])
    if (name) {
      if (!/(?:iglesia|parroquia|catedral|capilla|templo|ministerio|comunidad|bas[ií]lica|santuario)/i.test(name)) {
        return `Iglesia ${name}`
      }
      return name
    }
  }

  // 3. Denomination keywords
  if (/mormon|santos\s+de\s+los\s+[uú]ltimos/i.test(text)) return 'Iglesia Mormona'
  if (/bautista/i.test(text)) {
    const specific = text.match(/(?:iglesia|comunidad)\s+bautista\s+([a-záéíóúñA-ZÁÉÍÓÚÑ0-9\s'-]+)/i)
    if (specific && specific[1]) {
      const extra = formatTitle(specific[1])
      if (extra && extra.length > 2) return `Iglesia Bautista ${extra}`
    }
    return 'Iglesia Bautista'
  }
  if (/presbiteriana/i.test(text)) return 'Iglesia Presbiteriana'
  if (/metodista/i.test(text)) return 'Iglesia Metodista'
  if (/pentecostal/i.test(text)) return 'Iglesia Pentecostal'
  if (/luterana/i.test(text)) return 'Iglesia Luterana'
  if (/adventista/i.test(text)) return 'Iglesia Adventista'
  if (/anglicana/i.test(text)) return 'Iglesia Anglicana'
  if (/ortodoxa/i.test(text)) return 'Iglesia Ortodoxa'
  if (/evang[eé]lica/i.test(text)) return 'Iglesia Evangélica'

  // 4. Church prefix pattern: e.g. "Parroquia San José sólo con horarios..."
  // Stop boundary eagerly at "sólo con", "solo con", "con", "sin", "horarios", etc.
  const prefixMatch = text.match(/(?:(?:para|de|crear|hacer|generar|diseñar)\s+(?:una|un|la|el)\s+)?((?:parroquia|iglesia|catedral|capilla|bas[ií]lica|santuario|ministerio|congregaci[oó]n|comunidad cristiana|centro cristiano|comunidad de fe|templo)\s+[a-záéíóúñA-ZÁÉÍÓÚÑ0-9\s'-]+?)(?:\s+(?:(?:s[oó]lo|solo|solamente|[uú]nicamente|exclusivamente|tan\s+s[oó]lo|tan\s+solo|nada\s+m[aá]s)?\s*(?:con|sin|donde|en|para|que|enfocad[ao]|centrad[ao]|dedicad[ao])|s[oó]lo|solo|solamente|[uú]nicamente|exclusivamente|horarios?|servicios?|misas?|cultos?|contacto|datos|ubicaci[oó]n|redes|donaciones?|predicas?|prédicas?|ministerios?|eventos?|ubicad[ao]|es\s+una|es\s+un|\.|\,|$)|$)/i)
  if (prefixMatch && prefixMatch[1]) {
    let raw = prefixMatch[1].trim()
    raw = raw.replace(/^(?:para|de|crear|hacer|generar|diseñar|una|un|la|el)\s+/i, '').trim()
    raw = raw.replace(/\s+(?:llamada|llamado|de nombre)\s+/i, ' ').trim()
    const clean = formatTitle(raw)
    if (clean.length >= 4) {
      return clean
    }
  }

  // 5. Short prompts containing church terms
  if (text.length <= 60 && /(?:parroquia|iglesia|catedral|capilla|bas[ií]lica|santuario|ministerio|fe|comunidad|templo)/i.test(text)) {
    let clean = text.replace(/^(?:quiero|crear|hacer|generar|una|un|pagina|web|para|de)\s+/gi, '').trim()
    clean = formatTitle(clean)
    if (clean) {
      return clean
    }
  }

  if (/cat[oó]lica/i.test(text)) return 'Parroquia Católica'
  return 'Comunidad de Fe'
}

/**
 * Detects if the prompt is for a church / religious entity.
 */
export function isChurchPrompt(promptText = '') {
  if (!promptText) return false
  const t = normalizeText(promptText)
  return /iglesia|parroquia|pastor|cristian|predica|sermon|ministerio|oracion|biblia|dios|jes[uú]s|fe|templo|culto|congregacion|comunidad de fe|afiche|adoracion/i.test(t)
}

/**
 * Intelligent parser: determines active sections and reasons from natural language.
 */
export function parseChurchPrompt(promptText = '', manualOverrides = {}) {
  const isChurch = isChurchPrompt(promptText)
  const norm = normalizeText(promptText)
  const churchName = isChurch ? extractChurchName(promptText) : ''

  // Check for exclusive phrasing: e.g. "solo quiero...", "solamente con..."
  const isExclusive = /solo quiero|solamente quiero|unicamente quiero|solo con|solamente con|solo tendra|solo para/i.test(norm)

  const sections = {}
  const reasons = {}

  CHURCH_SECTIONS.forEach(sec => {
    // 1. If manual override is explicitly provided by user click, honor it first
    if (manualOverrides && manualOverrides[sec.key] !== undefined) {
      sections[sec.key] = Boolean(manualOverrides[sec.key])
      reasons[sec.key] = sections[sec.key] ? 'Activado manualmente' : 'Desactivado manualmente'
      return
    }

    // 2. Check for explicit negation (e.g. "sin predicas", "no ofrendas")
    const negated = sec.negations.some(neg => norm.includes(normalizeText(neg)))
    if (negated) {
      sections[sec.key] = false
      reasons[sec.key] = 'Excluido por tu texto ("sin...")'
      return
    }

    // 3. Check for positive keyword match
    const matchedKw = sec.keywords.find(kw => norm.includes(normalizeText(kw)))

    if (isExclusive) {
      // In exclusive mode, only explicitly mentioned sections are enabled (plus hero & contact anchor)
      if (sec.key === 'contact') {
        sections[sec.key] = true
        reasons[sec.key] = 'Sección de contacto esencial'
      } else if (matchedKw) {
        sections[sec.key] = true
        reasons[sec.key] = `Detectado por: "${matchedKw}"`
      } else {
        sections[sec.key] = false
        reasons[sec.key] = 'Omitido en modo exclusivo'
      }
    } else {
      if (matchedKw) {
        sections[sec.key] = true
        reasons[sec.key] = `Detectado por: "${matchedKw}"`
      } else {
        sections[sec.key] = sec.defaultActive
        reasons[sec.key] = sec.defaultActive ? 'Sección sugerida por defecto' : 'Opcional (menciónala para activar)'
      }
    }
  })

  // Hero is always active
  sections.hero = true

  // Extract custom times if mentioned (e.g. "domingos 10am y 6pm")
  let customServiceTimes = null
  if (/domingos?\s*(?:a\s*las?)?\s*(\d{1,2}(?::\d{2})?\s*(?:am|pm))/i.test(norm)) {
    const match = promptText.match(/domingos?\s*(?:a\s*las?)?\s*(\d{1,2}(?::\d{2})?\s*(?:am|pm|a\.m\.|p\.m\.))/i)
    if (match) {
      customServiceTimes = [`Domingos ${match[1].toUpperCase()}`]
    }
  }

  // Count active sections
  const activeCount = Object.values(sections).filter(Boolean).length

  return {
    isChurch,
    churchName,
    sections,
    reasons,
    customServiceTimes,
    activeCount,
  }
}

/**
 * Builds the optimal sectionOrder based on visible sections and chosen church variant.
 */
export function buildOptimalChurchOrder(sectionsVisibility = {}, variant = 'nucleus') {
  // Master ideal narrative flow for church websites
  const MASTER_FLOW = [
    'hero',
    'welcome',
    'missionBlock',
    'planAVisit',
    'values',
    'nucleusColumns',
    'ministries',
    'nextSteps',
    'sermons',
    'events',
    'donation',
    'prayerRequest',
    'about',
    'testimonials',
    'contact'
  ]

  return MASTER_FLOW.filter(key => sectionsVisibility[key] !== false)
}

/**
 * Ensures complete, rich, non-empty mock data for ANY enabled section.
 */
export function populateChurchSectionData(baseData, churchName, promptText, prefs = {}) {
  const name = churchName || baseData.businessName || 'Comunidad Cristiana'
  const isCatholicOrParish = /parroquia|cat[oó]lica|misa|bas[ií]lica|santuario/i.test((name || '') + ' ' + (promptText || ''))

  // 1. Welcome section
  if (!baseData.welcome || Object.keys(baseData.welcome).length === 0) {
    if (isCatholicOrParish) {
      baseData.welcome = {
        title: 'Bienvenidos a Nuestra Parroquia',
        pastorName: 'Pbro. Párroco & Vicario',
        role: 'Párroco',
        message: `Te damos la más cordial y fraterna bienvenida a ${name}. Te invitamos a participar en la celebración de la Santa Misa y en la vida comunitaria. Que la gracia de Dios y la bendición del Señor acompañen a tu familia.`,
        ctaText: 'Horarios de Misa',
        ctaSecondaryText: 'Contactar Despacho',
        photo1: 'https://images.unsplash.com/photo-1548625149-fc4a29cf7092?w=800&q=85&fit=crop',
        photo2: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?w=800&q=85&fit=crop',
        photo3: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&q=85&fit=crop'
      }
    } else {
      baseData.welcome = {
        title: 'Bienvenido a Casa',
        pastorName: 'Pastores Principales',
        role: 'Pastores',
        message: `Nos alegra profundamente que estés aquí. En ${name} creemos que nadie llega por casualidad. Nuestro mayor anhelo es que encuentres un hogar espiritual donde tu fe despierte y tu familia florezca.`,
        ctaText: 'Conoce Más',
        ctaSecondaryText: 'Escríbenos',
        photo1: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&q=85&fit=crop',
        photo2: 'https://images.unsplash.com/photo-1544427920-c49ccfb85579?w=800&q=85&fit=crop',
        photo3: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=85&fit=crop'
      }
    }
  }

  // 2. Plan a Visit
  const defaultTimes = isCatholicOrParish ? [
    'Domingos: 8:00 AM, 11:00 AM & 6:00 PM (Santa Misa)',
    'Lunes a Sábado: 7:00 AM & 6:00 PM (Misa Diaria)',
    'Confesiones: Sábados 4:00 PM - 5:30 PM'
  ] : [
    'Domingos: 10:00 AM & 6:00 PM',
    'Miércoles: 7:00 PM (Oración & Discipulado)'
  ]

  if (!baseData.planAVisit) {
    baseData.planAVisit = {
      eyebrow: isCatholicOrParish ? 'HORARIOS DE SANTA MISA' : 'ESTÁS INVITADO',
      title: isCatholicOrParish ? 'Acompáñanos a la Santa Misa' : 'Planifica tu Visita este Domingo',
      subtitle: isCatholicOrParish ? `Encuentra horarios de misa, confesiones y dirección de ${name}.` : `Encuentra horarios, dirección y todo lo necesario para tu primera reunión en ${name}.`,
      ctaText: isCatholicOrParish ? 'Ver Horarios de Misa' : 'Planifica tu Visita',
      address: isCatholicOrParish ? 'Sede Parroquial' : 'Sede Principal de la Iglesia',
      serviceTimes: prefs?.customServiceTimes || defaultTimes,
      image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1200&q=85&fit=crop'
    }
  } else {
    if (prefs?.customServiceTimes && prefs.customServiceTimes.length > 0) {
      baseData.planAVisit.serviceTimes = prefs.customServiceTimes
    } else if (isCatholicOrParish) {
      baseData.planAVisit.eyebrow = 'HORARIOS DE SANTA MISA'
      baseData.planAVisit.title = 'Acompáñanos a la Santa Misa'
      baseData.planAVisit.serviceTimes = defaultTimes
    }
  }

  // 3. Sermons
  if (!baseData.sermons || !Array.isArray(baseData.sermons) || baseData.sermons.length === 0) {
    baseData.sermonsTitle = 'Mensajes & Prédicas Recientes'
    baseData.sermonsSubtitle = `Inspiración y enseñanza bíblica para tu caminar diario con Jesús en ${name}.`
    baseData.sermons = [
      {
        title: 'Caminando por Fe en Medio de la Incertidumbre',
        series: 'Serie: Fe Inquebrantable',
        speaker: 'Pastor Principal',
        date: 'Domingo Reciente',
        duration: '38 min',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        image: 'https://images.unsplash.com/photo-1519491050282-cf00c82424b4?w=800&q=80&fit=crop'
      },
      {
        title: 'El Poder de la Gracia Transformadora',
        series: 'Serie: Gracia & Verdad',
        speaker: 'Equipo Pastoral',
        date: 'Domingo Anterior',
        duration: '42 min',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80&fit=crop'
      }
    ]
  }

  // 4. Ministries
  if (!baseData.ministries || !Array.isArray(baseData.ministries) || baseData.ministries.length === 0) {
    baseData.ministriesTitle = 'Nuestros Ministerios'
    baseData.ministriesSubtitle = 'Hay un lugar especial para cada miembro de la familia.'
    baseData.ministries = [
      {
        name: 'Jóvenes & Universitarios',
        title: 'Jóvenes & Universitarios',
        ageRange: '13 a 25 años',
        description: 'Reuniones vibrantes con música contemporánea, amistad genuina y mensajes reales para tu generación.',
        desc: 'Reuniones vibrantes con música contemporánea, amistad genuina y mensajes reales para tu generación.',
        image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80&fit=crop',
        ctaText: 'Conoce Más'
      },
      {
        name: 'KidZone Infantil',
        title: 'KidZone Infantil',
        ageRange: '0 a 12 años',
        description: 'Espacio seguro, divertido y educativo donde los niños aprenden valores bíblicos con maestros dedicados.',
        desc: 'Espacio seguro, divertido y educativo donde los niños aprenden valores bíblicos con maestros dedicados.',
        image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=80&fit=crop',
        ctaText: 'Conoce Más'
      },
      {
        name: 'Matrimonios & Familias',
        title: 'Matrimonios & Familias',
        ageRange: 'Parejas y Hogares',
        description: 'Talleres, consejería y conferencias para edificar hogares sólidos fundamentados en el amor y el perdón.',
        desc: 'Talleres, consejería y conferencias para edificar hogares sólidos fundamentados en el amor y el perdón.',
        image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&q=80&fit=crop',
        ctaText: 'Conoce Más'
      }
    ]
  }

  // 5. Events
  if (!baseData.events || !Array.isArray(baseData.events) || baseData.events.length === 0) {
    baseData.eventsTitle = 'Próximos Eventos & Actividades'
    baseData.eventsSubtitle = `Conéctate con todo lo que Dios está haciendo en ${name}.`
    baseData.events = [
      {
        title: 'Noche de Adoración & Oración',
        dateDay: '28',
        dateMonth: 'OCT',
        time: '7:00 PM - 9:00 PM',
        location: 'Auditorio Principal',
        desc: 'Un tiempo especial para buscar a Dios juntos en alabanza íntima e intercesión comunitaria.',
        image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&q=80&fit=crop'
      },
      {
        title: 'Campamento Anual de Familias',
        dateDay: '15',
        dateMonth: 'NOV',
        time: 'Fin de Semana',
        location: 'Centro de Retiros Monte Sinaí',
        desc: 'Tres días inolvidables de amistad, fogatas, plenarias y comunión con Dios.',
        image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80&fit=crop'
      },
      {
        title: 'Desayuno de Hombres & Mujeres',
        dateDay: '05',
        dateMonth: 'DIC',
        time: '9:00 AM',
        location: 'Salón Comunitario',
        desc: 'Un espacio inspirador con conferencias prácticas para tu crecimiento personal y espiritual.',
        image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&q=80&fit=crop'
      }
    ]
  }

  // 6. Donation / Ofrendas
  if (!baseData.donation) {
    baseData.donation = {
      eyebrow: 'GENEROSIDAD QUE TRANSFORMA',
      title: 'Ofrendas & Donaciones',
      subtitle: `Tu fidelidad y apoyo voluntario permiten que ${name} continúe llevando esperanza, ayuda comunitaria y el evangelio a cientos de familias.`,
      ctaText: 'Dar Online Ahora',
      methods: [
        { icon: '💳', title: 'Donación con Tarjeta', desc: 'A través de nuestra plataforma online rápida, encriptada y 100% segura.' },
        { icon: '🏦', title: 'Transferencia Bancaria', desc: 'Cuenta de ahorros a nombre de la iglesia para diezmos, ofrendas y misiones.' },
        { icon: '🤝', title: 'Presencial en los Cultos', desc: 'Sobres de generosidad disponibles en cada una de nuestras reuniones semanales.' }
      ]
    }
  }

  // 7. Prayer Request / Petición de Oración
  if (!baseData.prayerRequest) {
    baseData.prayerRequest = {
      eyebrow: 'NO ESTÁS SOLO',
      title: '¿Podemos Orar por Ti?',
      subtitle: `En ${name} creemos en el poder de la oración. Nuestro equipo pastoral e intercesores oran personalmente por cada petición que recibimos.`,
      ctaText: 'Enviar Petición Confidencial',
      inputPlaceholder: 'Escribe tu nombre y tu motivo de oración aquí...',
      phone: '+1 (555) 777-8899'
    }
  }

  // 8. Values / Creencias
  if (!baseData.values || !Array.isArray(baseData.values) || baseData.values.length === 0) {
    baseData.valuesTitle = 'Nuestros Valores & Creencias'
    baseData.valuesSubtitle = 'Los principios bíblicos que fundamentan cada ministerio y acción de nuestra iglesia.'
    baseData.values = [
      { icon: '✝️', title: 'Centrados en Jesús', desc: 'Cristo es el centro de todo lo que predicamos, enseñamos y vivimos día con día.' },
      { icon: '❤️', title: 'Amor Incondicional', desc: 'Recibimos a toda persona tal como es, construyendo un hogar espiritual sin barreras.' },
      { icon: '📖', title: 'La Palabra de Dios', desc: 'Creemos en la Biblia como nuestra verdad máxima, guía práctica de vida y fuente de esperanza.' },
      { icon: '🤝', title: 'Comunidad Real', desc: 'La fe no se vive en soledad: crecemos en grupos compartiendo la vida con autenticidad.' }
    ]
  }

  // 9. About / Historia
  if (!baseData.about) {
    baseData.about = {
      sectionLabel: 'Nuestra Historia & Misión',
      title: `El Corazón de ${name}`,
      text: `Fundada con la convicción de ser un faro de esperanza, ${name} ha crecido como una comunidad vibrante donde personas de todas las edades experimentan la transformación de Dios.`,
      highlights: [
        'Comunidad abierta para todas las edades y trasfondos',
        'Ministerios activos sirviendo a la comunidad local',
        'Compromiso social permanente y ayuda humanitaria',
        'Entorno de aprendizaje seguro y enriquecedor para niños'
      ],
      badge: { value: '+500', label: 'Personas reuniéndose cada fin de semana' }
    }
  }

  // 10. Next Steps
  if (!baseData.nextSteps) {
    baseData.nextSteps = {
      label: 'Tu Crecimiento Espiritual',
      title: 'Próximos Pasos en la Fe',
      subtitle: `Descubre cómo involucrarte en ${name}, desde tu primera visita hasta bautismos, membresía y liderazgo.`,
      ctaText: 'Dar Mi Siguiente Paso',
      image: 'https://images.unsplash.com/photo-1519491050282-cf00c82424b4?w=1200&q=85&fit=crop'
    }
  }

  return baseData
}
