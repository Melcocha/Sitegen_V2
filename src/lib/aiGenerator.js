/**
 * AI Website Generator — Motor: Gemini 2.0 Flash (principal) | GPT-4o-mini (fallback) | Demo Mode
 * 1. Si hay VITE_GEMINI_API_KEY → usa Google Gemini 2.0 Flash
 * 2. Si hay VITE_OPENAI_API_KEY → usa OpenAI GPT-4o-mini
 * 3. Si no hay ninguna clave → Smart Demo Mode con extracción de URL real
 * El JSON de salida es IDÉNTICO en los 3 modos — ningún componente se ve afectado.
 */

const SYSTEM_PROMPT = `You are a world-class web designer and copywriter fluent in Latin American Spanish. Generate a COMPLETE, 100% PERSONALIZED website JSON.

CRITICAL RULES - violating any = failure:
1. READ all content provided. EXTRACT: company name, every product/service, phone, email, address, differentiators.
2. EVERY text field must be SPECIFIC to THIS business. NEVER use generic filler.
3. BANNED generic phrases (never use):
   - "Mas de 15 anos de experiencia" (only if you know their real years)
   - "Profesionales certificados" (only for medical/legal/certified)
   - "Atencion personalizada 24/7" (only for actual 24h services)
   - "Resultados garantizados" (replace with a specific promise)
   - "Soluciones profesionales adaptadas a las necesidades" (forbidden filler)
   - "Lo que hacemos mejor" (replace with business-specific title)
4. ABOUT highlights: 4 bullets 100% specific to THIS business. For pupusas: "Masa de maiz hecha a mano cada manana", "Receta familiar de 3 generaciones", etc.
5. ABOUT badge: a specific achievement. For pupuseria: "2,000+ pupusas al mes". For gym: "500+ miembros activos".
6. servicesSubtitle: specific to THIS business. NEVER generic.
7. Contact sectionTitle/subtitle/ctaText: ALL customized for this business.
8. SERVICES: 5-6 REAL products/services. Icons: chart|users|zap|shield|globe|award|heart|tool|home|book.
9. secondaryColor: NEVER pure white (#fff or #ffffff). Use a tint, cream, or soft color.
10. Return ONLY valid JSON. No markdown, no code fences, no explanation.

JSON STRUCTURE (ALL fields required - missing fields = broken page):
{
  "businessName": "Real company name",
  "tagline": "6-10 word tagline specific to their product/service",
  "description": "120 words using ONLY real facts about this company",
  "primaryColor": "#hex",
  "secondaryColor": "#hex - soft tint NOT white",
  "accentColor": "#hex - vibrant CTA color",
  "font": "Inter | Playfair Display | Montserrat | Lato | Poppins | Raleway",
  "industry": "Exact value from: Iglesia / Ministerio / Fe, Legal & Juridico, Gastronomia, Salud & Odontologia, Fitness & Deportes, Inmobiliaria, Tecnologia, Software Empresarial, ERP, Infraestructura, Inversion, Gobierno, Sector Publico, Educacion, Construccion, Marketing, Defensa & Seguridad, Seguridad, Finanzas, Automoviles, Logistica, Moda, Moda & Accesorios, Lujo, Perfumes, Cosmetica, Belleza, Spa & Bienestar, Joyeria, Retail, E-commerce, Fotografia, Eventos, Veterinaria, Agricultura, Turismo, Cultura y Turismo, Patrimonio Cultural, Herencia Cultural, Tradiciones, Artesanias",
  "heroImageQuery": "2-3 SHORT ENGLISH WORDS ONLY - the most specific searchable terms for this business. Examples: pupusas=\"pupusa salvadoran\", coffee shop=\"coffee espresso cup\", dental=\"dental teeth smile\", gym=\"gym fitness workout\", lawyer=\"lawyer courthouse\". USE ENGLISH ONLY, never Spanish words.",
  "aboutImageQuery": "2-3 SHORT ENGLISH WORDS - team/people/workspace photo for about section. Examples: coffee=\"barista coffee making\", pupusas=\"woman making tortillas\", dental=\"dentist patient smile\", gym=\"personal trainer\". USE ENGLISH ONLY.",
  "galleryImageQueries": ["2-3 English words for gallery photo 1", "2-3 English words for gallery photo 2", "2-3 English words for gallery photo 3"],
  "galleryTitle": "Section title for gallery (e.g. Nuestras Pupusas, Nuestro Trabajo, Galeria de Casos)",
  "layoutVariant": 1,
  "navLinks": ["Nav 1", "Nav 2", "Nav 3", "Nav 4"],
  "hero": {
    "headline": "6-12 words mentioning actual product or service",
    "subheadline": "15-25 words unique to this business",
    "ctaText": "Specific CTA (e.g. Pide tus Pupusas, Agenda tu Cita, Ver Menu)",
    "ctaSecondary": "Secondary button (e.g. Ver el Menu, Conoce mas)"
  },
  "servicesLabel": "Short section label (e.g. Nuestro Menu, Nuestros Servicios)",
  "servicesTitle": "H2 title specific to this business (e.g. Pupusas que te haran volver)",
  "servicesSubtitle": "1-2 sentences describing offerings, specific to THIS business",
  "services": [
    { "icon": "zap", "title": "Real product/service name", "description": "40-60 word description with real specifics", "cta": "Short action (Ordenar, Saber mas, Ver plan)" }
  ],
  "about": {
    "sectionLabel": "Label (Nuestra Historia, Quienes Somos, Sobre Nosotros)",
    "title": "About headline specific to this business",
    "text": "100-120 words with real facts about history, mission, uniqueness",
    "highlights": [
      "Specific real fact 1 about this exact business",
      "Specific real fact 2",
      "Specific real fact 3",
      "Specific real fact 4"
    ],
    "badge": {
      "value": "Real achievement number (e.g. 2000+, 500+, 15 anos)",
      "label": "What it represents in Spanish (e.g. pupusas al mes, clientes felices)"
    },
    "ctaText": "About CTA (e.g. Visitanos hoy, Ver menu completo, Habla con nosotros)"
  },
  "testimonialsTitle": "Section title (e.g. Lo que dicen nuestros clientes habituales)",
  "testimonials": [
    { "name": "Full Name", "role": "Role or location", "text": "40-60 word testimonial mentioning specific products/services", "rating": 5 }
  ],
  "stats": [
    { "value": "Real stat", "label": "Spanish label" },
    { "value": "Real stat", "label": "Spanish label" },
    { "value": "Real stat", "label": "Spanish label" }
  ],
  "contact": {
    "sectionTitle": "Contact headline specific to business (e.g. Antojo de pupusas? Visitanos)",
    "subtitle": "1-2 sentences specific to this business location/hours",
    "ctaText": "CTA button (e.g. Llamanos ahora, Escribenos, Reserva tu mesa)",
    "phone": "real phone or empty string",
    "whatsapp": "whatsapp number or empty string",
    "email": "real email or empty string",
    "address": "real address or empty string"
  },
  "seo": {
    "title": "SEO title under 60 chars",
    "description": "120-155 char meta description"
  }
}

Generate EXACTLY 5-6 services, 3 testimonials, 4 highlights. Every text must be 100% specific to this business. Return ONLY the JSON object.`

const CHURCH_SYSTEM_PROMPT = `You are an elite web designer and copywriter specializing in ultra-clean, photo-centric, modern church websites (inspired by Gateway Community Church, Nucleus Church, and Branch Life). Fluent in Latin American Spanish.

CRITICAL DESIGN PHILOSOPHY:
1. MINIMAL TEXT & BIG EMOTIONAL PHOTOS: People connect with faces, feelings, and warmth. Do NOT generate long walls of text. Keep headlines punchy (5-8 words) and descriptions ultra-short (1-2 brief sentences max).
2. Clean, spacious, modern layout with high-impact visual sections.
3. Tone: Warm, welcoming, community-centered, hope-filled ("Bienvenido a Casa", "Una comunidad donde sentirte en casa").
4. Colors: Elegant deep slate/navy primary (#0B132B or #0F172A), clean white secondary (#FFFFFF or #F8FAFC), vibrant modern accent (#00D8F6 or #38BDF8 or #F59E0B).
5. Font: 'Inter' or 'Playfair Display' or 'Montserrat'.
6. Return ONLY valid JSON. No markdown fences, no explanatory text.

JSON STRUCTURE REQUIRED:
{
  "businessName": "Real church name (e.g. Gateway Comunidad Cristiana)",
  "tagline": "Una comunidad donde sentirte en casa",
  "description": "Aviva tu fe, conecta con personas reales y crece espiritualmente en un ambiente acogedor para toda la familia.",
  "primaryColor": "#0F172A",
  "secondaryColor": "#FFFFFF",
  "accentColor": "#00D8F6",
  "font": "Inter",
  "industry": "Iglesia / Ministerio / Fe",
  "layoutVariant": 1,
  "sectionOrder": ["hero", "welcome", "planAVisit", "nextSteps", "ministries", "sermons", "contact"],
  "sectionsVisibility": {
    "hero": true,
    "welcome": true,
    "planAVisit": true,
    "nextSteps": true,
    "ministries": true,
    "sermons": true,
    "contact": true,
    "values": false,
    "donation": false,
    "prayerRequest": false
  },
  "announcementBar": {
    "visible": true,
    "text": "👋 Mantente Conectado: Recibe noticias y eventos semanales",
    "ctaText": "¡Me Apunto!",
    "ctaLink": "#wp-contact"
  },
  "navLinks": [
    { "label": "Inicio", "href": "#wp-hero" },
    { "label": "Planifica tu Visita", "href": "#wp-plan-visit" },
    { "label": "Próximos Pasos", "href": "#wp-next-steps" },
    { "label": "Ministerios", "href": "#wp-ministerios" },
    { "label": "Mensajes", "href": "#wp-sermons" },
    { "label": "Contacto", "href": "#wp-contact" }
  ],
  "hero": {
    "eyebrow": "DOMINGOS A LAS 9:00 AM & 11:00 AM",
    "headline": "Una comunidad donde sentirte en casa",
    "subheadline": "Aviva tu fe, conecta con otros y crece en Jesús en un ambiente cálido para ti y tu familia.",
    "ctaText": "Planifica tu Visita",
    "ctaLink": "#wp-plan-visit",
    "ctaSecondary": "Qué está pasando",
    "ctaSecondaryLink": "#wp-next-steps"
  },
  "heroImageQuery": "happy diverse church community people smiling warm welcome group",
  "welcome": {
    "ctaText": "Sobre Nosotros",
    "ctaSecondaryText": "Escríbenos",
    "photo1": "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&q=85&fit=crop",
    "photo2": "https://images.unsplash.com/photo-1544427920-c49ccfb85579?w=800&q=85&fit=crop",
    "photo3": "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=85&fit=crop"
  },
  "planAVisit": {
    "eyebrow": "DOMINGOS 9:00 AM & 11:00 AM",
    "title": "Acompáñanos este Domingo",
    "subtitle": "Encuentra horarios, ubicación y todo lo que necesitas saber para tu primera visita haciendo clic en el botón abajo.",
    "ctaText": "Planifica tu Visita",
    "address": "Av. Las Palmeras #123, San Salvador",
    "serviceTimes": [
      "Domingos: 9:00 AM & 11:00 AM",
      "Miércoles: 7:00 PM"
    ],
    "image": "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=1200&q=85&fit=crop"
  },
  "nextSteps": {
    "label": "Involúcrate",
    "title": "Próximos Pasos",
    "subtitle": "Explora nuestra comunidad incluyendo ministerios, próximos eventos y oportunidades para crecer en tu fe.",
    "ctaText": "Dar tu Siguiente Paso",
    "image": "https://images.unsplash.com/photo-1519491050282-cf00c82424b4?w=1200&q=85&fit=crop"
  },
  "ministriesTitle": "Nuestros Ministerios",
  "ministriesSubtitle": "Espacios pensados para cada miembro de la familia.",
  "ministries": [
    {
      "name": "Niños & Familias",
      "ageRange": "0 a 12 años",
      "description": "Espacio seguro y divertido donde los más pequeños aprenden del amor de Dios.",
      "image": "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=800&q=80&fit=crop",
      "ctaText": "Conoce más"
    },
    {
      "name": "Jóvenes & Universitarios",
      "ageRange": "13 a 25 años",
      "description": "Comunidad vibrante con música en vivo, amistades sólidas y crecimiento espiritual.",
      "image": "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80&fit=crop",
      "ctaText": "Conoce más"
    },
    {
      "name": "Grupos en Casa",
      "ageRange": "Todas las edades",
      "description": "Círculos pequeños en diferentes puntos de la ciudad para compartir y convivir.",
      "image": "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&q=80&fit=crop",
      "ctaText": "Conoce más"
    }
  ],
  "sermonsTitle": "Mensajes & Prédicas",
  "sermonsSubtitle": "Inspiración bíblica para tu semana dondequiera que estés.",
  "sermons": [
    {
      "title": "Caminando por Fe en Tiempos de Cambio",
      "series": "Serie Actual",
      "speaker": "Pastor Principal",
      "date": "Domingo Reciente",
      "duration": "38 min",
      "videoUrl": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      "image": "https://images.unsplash.com/photo-1519491050282-cf00c82424b4?w=800&q=80&fit=crop"
    }
  ],
  "contact": {
    "sectionTitle": "Visítanos este Fin de Semana",
    "subtitle": "Nuestras puertas y brazos están siempre abiertos.",
    "phone": "+503 2200-1122",
    "whatsapp": "+503 7700-1122",
    "email": "hola@iglesia.org",
    "address": "Av. Las Palmeras #123, San Salvador"
  },
  "seo": {
    "title": "Iglesia Comunidad | Bienvenido a Casa",
    "description": "Una comunidad de fe donde pertenecer, creer y crecer. Horarios dominicales y ministerios."
  }
}
`

export function isChurchPrompt(text = '') {
  return /iglesi|church|ministerio|cristian|pastor|parroquia|templo|fe\b|evangel|congregaci|culto|sermon|predica|nucleus|branch\s*life|gateway|adoraci/i.test(text)
}

// --- URL content fetcher via Jina.ai Reader (free, no key needed) ---
export async function fetchUrlContent(url) {
  if (!url || !url.startsWith('http')) return null
  try {
    const jinaUrl = `https://r.jina.ai/${url}`
    const res = await fetch(jinaUrl, {
      headers: { Accept: 'text/plain', 'X-Return-Format': 'text' },
      signal: AbortSignal.timeout(20000),
    })
    if (!res.ok) return null
    let text = await res.text()
    // Clean markdown artifacts before sending to AI or extractor
    text = text
      .replace(/\[!\[.*?\]\(.*?\)\]\(.*?\)/g, '')   // [[Image:...](url)](url)
      .replace(/!\[.*?\]\(https?:\/\/[^\)]+\)/g, '') // ![alt](url)
      .replace(/\[([^\]]+)\]\(https?:\/\/[^\)]+\)/g, '$1') // [text](url) -> text
      .replace(/https?:\/\/\S+/g, '')                // bare URLs
      .replace(/\n{3,}/g, '\n\n')                    // collapse blank lines
      .trim()
    return text.slice(0, 14000)  // 14k chars = enough for full page content
  } catch {
    return null
  }
}

// --- Main generator - Gemini -> OpenAI -> Demo (NEVER crashes) ---
export async function generateWebsiteJSON(userPrompt, websiteUrl = '') {
  // Check if church prompt — use pre-made exact templates instantly without AI distortion
  if (isChurchPrompt(userPrompt + ' ' + (websiteUrl || ''))) {
    console.log('⚡ Church pre-made template selected directly (50/50 MyGateway vs Nucleus)')
    const churchData = mockIglesia('', userPrompt)
    return new Promise(resolve => setTimeout(() => resolve(churchData), 400))
  }

  // 1. Read FULL content from homepage + try to get sub-pages
  let urlContent = null
  if (websiteUrl) {
    urlContent = await fetchUrlContent(websiteUrl)
    // Always fetch sub-pages for maximum content extraction
    const base = websiteUrl.replace(/\/$/, '')
    const extra = await Promise.allSettled([
      fetchUrlContent(base + '/about'),
      fetchUrlContent(base + '/services'),
      fetchUrlContent(base + '/about-us'),
      fetchUrlContent(base + '/nosotros'),
      fetchUrlContent(base + '/servicios'),
      fetchUrlContent(base + '/contacto'),
    ])
    const extras = extra
      .filter(r => r.status === 'fulfilled' && r.value && r.value.length > 200)
      .map(r => r.value.slice(0, 2000))  // 2k per sub-page
    if (extras.length) urlContent = (urlContent || '') + '\n\n--- SUB-PAGES CONTENT ---\n' + extras.join('\n\n---\n')
    console.log(urlContent
      ? ('URL read OK: ' + urlContent.length + ' chars from ' + websiteUrl + ' (+' + extras.length + ' sub-pages)')
      : ('Could not read: ' + websiteUrl))
  }

  // 2. Rich prompt with all real content
  const isChurch = false
  const fullPrompt = urlContent
    ? ('WEBSITE TO REDESIGN:\nURL: ' + websiteUrl + '\n\nFULL CONTENT FROM THEIR WEBSITE (read every line carefully):\n' + urlContent + '\n\nUSER REQUEST: ' + userPrompt + '\n\nCRITICAL: Extract the REAL entity name, ALL services/ministries mentioned, contact info, and industry. Generate professional copy based on their actual activities.')
    : userPrompt

  // --- Google Gemini ---
  const geminiKey = import.meta.env.VITE_GEMINI_API_KEY
  if (geminiKey) {
    try {
      const r = await callGemini(geminiKey, fullPrompt, isChurch)
      console.log('Gemini OK (church:', isChurch, ')')
      return sanitizeAI(r)
    } catch (e) { console.error('Gemini error:', e.message) }
  }

  // 4. OpenAI GPT-4o-mini - fallback
  const openaiKey = import.meta.env.VITE_OPENAI_API_KEY
  if (openaiKey) {
    try {
      const r = await callOpenAI(openaiKey, fullPrompt, isChurch)
      console.log('OpenAI OK (church:', isChurch, ')')
      return sanitizeAI(r)
    } catch (e) { console.error('OpenAI error:', e.message) }
  }

  // 5. Smart Demo Mode - always works
  console.log('Demo mode active (church:', isChurch, ')')
  return generateSmartMock(fullPrompt, userPrompt, urlContent, websiteUrl)
}

// Strip markdown bold/italic that Gemini sometimes includes (* ** __ _)
function sanitizeAI(data) {
  if (!data || typeof data !== 'object') return data
  const clean = (s) => typeof s === 'string'
    ? s.replace(/\*{1,3}([^*]+)\*{1,3}/g, '$1').replace(/_{1,2}([^_]+)_{1,2}/g, '$1').trim()
    : s
  const walk = (obj) => {
    if (Array.isArray(obj)) return obj.map(walk)
    if (obj && typeof obj === 'object') {
      const out = {}
      for (const k of Object.keys(obj)) out[k] = walk(obj[k])
      return out
    }
    return clean(obj)
  }
  return walk(data)
}
// --- Google Gemini — maximally compatible implementation ---
async function callGemini(apiKey, prompt, isChurch = false) {
  // Embed system prompt in user message for maximum model compatibility
  const sysPrompt = isChurch ? CHURCH_SYSTEM_PROMPT : SYSTEM_PROMPT
  const fullMessage = sysPrompt + '\n\n' + prompt

  const ENDPOINTS = [
    // gemini-2.5-flash CONFIRMED working (2.0-flash returns 404 for this account)
    { url: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent',      json: false },
    { url: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent',   json: false },
  ]

  let lastErr = null
  for (const { url, json } of ENDPOINTS) {
    try {
      const body = {
        contents: [{ role: 'user', parts: [{ text: fullMessage }] }],
        generationConfig: { temperature: 0.7, maxOutputTokens: 8192 },
      }
      // responseMimeType only on models that support it
      if (json) body.generationConfig.responseMimeType = 'application/json'

      const res = await fetch(`${url}?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (!res.ok) {
        const errText = await res.text()
        console.warn('Gemini model failed:', url.split('/models/')[1], res.status)
        lastErr = new Error(errText)
        continue
      }

      const data = await res.json()
      let text = data.candidates?.[0]?.content?.parts?.[0]?.text || ''
      if (!text) { lastErr = new Error('Empty response'); continue }

      // Strip markdown code fences if present: ```json ... ``` or ``` ... ```
      text = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/i, '').trim()

      // Extract JSON object if surrounded by extra text
      const start = text.indexOf('{')
      const end   = text.lastIndexOf('}')
      if (start !== -1 && end !== -1) text = text.slice(start, end + 1)

      const parsed = JSON.parse(text)
      const modelName = url.split('/models/')[1]?.split(':')[0] || url
      console.log('✅ Gemini OK — model:', modelName)
      return parsed
    } catch (e) {
      console.warn('Gemini attempt error:', e.message?.slice(0, 80))
      lastErr = e
      continue
    }
  }
  throw lastErr || new Error('All Gemini models failed')
}

// ─── OpenAI GPT-4o-mini (fallback) ───────────────────────────────────────────
async function callOpenAI(apiKey, prompt, isChurch = false) {
  const sysPrompt = isChurch ? CHURCH_SYSTEM_PROMPT : SYSTEM_PROMPT
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: sysPrompt },
        { role: 'user', content: prompt },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.7,
      max_tokens: 4000,
    }),
  })

  if (!response.ok) throw new Error(`OpenAI error: ${response.status}`)
  const data = await response.json()
  return JSON.parse(data.choices[0].message.content)
}

// ─── Smart demo mode ──────────────────────────────────────────────────────────
function generateSmartMock(fullPrompt, userPrompt, urlContent, websiteUrl) {
  // Include the URL itself + domain in keyword analysis
  const urlText = websiteUrl ? websiteUrl.toLowerCase() : ''
  const combined = (fullPrompt + ' ' + urlText + ' ' + (urlContent || '')).toLowerCase()

  // 1. Try to extract real info from fetched URL content
  const extracted = urlContent ? extractFromContent(urlContent, websiteUrl) : {}

  // 2. Pick industry template
  const template = pickTemplate(combined)

  // 3. Merge: extracted real data wins over template defaults
  const result = { ...template, ...extracted }

  return new Promise(resolve => setTimeout(() => resolve(result), 1800))
}

// --- Content extractor - pulls REAL data from Jina.ai page content -------
function extractFromContent(content, url) {
  const lines = content.split('\n').map(l => l.trim()).filter(Boolean)

  // 1. Business name from Title: line or first H1
  let businessName = ''
  const titleLine = lines.find(l => l.startsWith('Title:'))
  if (titleLine) businessName = titleLine.replace('Title:', '').trim().split('|')[0].split('-')[0].split(':')[0].trim()
  if (!businessName) {
    const h1 = lines.find(l => l.startsWith('# '))
    if (h1) businessName = h1.replace(/^#+\s*/, '').split('|')[0].split('-')[0].trim()
  }
  if (!businessName && url) {
    try {
      const domain = new URL(url).hostname.replace('www.', '').split('.')[0]
      businessName = domain.charAt(0).toUpperCase() + domain.slice(1)
    } catch { /**/ }
  }

  // 2. Real description - find substantive paragraphs (40-250 chars, not a heading)
  const paras = lines.filter(l =>
    l.length >= 40 && l.length <= 300 &&
    !l.startsWith('#') && !l.startsWith('*') &&
    !l.startsWith('Title:') && !l.startsWith('URL:') &&
    !/^https?:\/\//.test(l)
  )
  const description = paras.slice(0, 2).join(' ').slice(0, 280) || ''

  // 3. Real tagline - short compelling line (10-60 chars)
  const taglineCandidates = lines.filter(l => l.length >= 10 && l.length <= 80 && !l.startsWith('#') && !l.startsWith('http'))
  const tagline = taglineCandidates[0] || ''

  // 4. Real services - extract H2/H3 headings as service titles
  const headings = lines
    .filter(l => /^#{2,3}\s/.test(l))
    .map(l => l.replace(/^#+\s*/, '').trim())
    .filter(h => h.length > 3 && h.length < 60)
    .slice(0, 4)

  const serviceIcons = ['⚙️', '🛡️', '🔧', '📦', '🎯', '💼', '🔬', '📋']
  const services = headings.length >= 2
    ? headings.map((title, i) => {
        // Find the paragraph right after this heading
        const hi = lines.findIndex(l => l.replace(/^#+\s*/, '').trim() === title)
        const desc = paras.find((p, pi) => pi > 0) || 'Servicio profesional de alta calidad.'
        return { icon: serviceIcons[i % serviceIcons.length], title, description: desc.slice(0, 100) }
      })
    : null

  // 5. Hero headline - best first H2 or fallback
  const heroHeadline = headings[0] ? 'El Futuro Moderno de ' + businessName : ''

  // 6. Contact info
  const phoneMatch = content.match(/(?:\+?1?[\s.-]?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}|\+?503[\s.-]?\d{4}[\s.-]?\d{4})/g)
  const phone = phoneMatch ? phoneMatch[0].trim() : ''
  const emailMatch = content.match(/[\w.-]+@[\w.-]+\.[a-z]{2,}/i)
  const email = emailMatch ? emailMatch[0] : ''

  // 7. Layout variant - pick randomly for variety
  const layoutVariant = Math.floor(Math.random() * 4) + 1

  const result = { layoutVariant }
  if (businessName) result.businessName = businessName
  if (description) result.description = description
  if (tagline && tagline !== businessName) result.tagline = tagline
  if (services) result.services = services
  if (heroHeadline) result.hero = { headline: heroHeadline, subheadline: description.slice(0, 100), ctaText: 'Ver mas' }
  if (phone || email) {
    result.contact = {
      phone: phone || '',
      email: email || '',
      address: '',
    }
  }
  return result
}

// ─── Industry template picker — ORDER MATTERS: most specific first ────────────
function pickTemplate(text) {
  // 0. Church / Faith Ministry — HIGHEST PRIORITY
  if (/iglesi|church|ministerio|cristian|pastor|parroquia|templo|fe\b|evangel|congregaci|culto|sermon|predica|nucleus|branch\s*life|gateway|adoraci/.test(text)) {
    return mockIglesia('', text)
  }
  // 1. Defense & Security
  if (/defense|defensa|tactical|firearm|firearm|arms |armas|ammunition|municion|weapon|pistol|rifle|holster|shooting|ballistic|gun |componente|scope|suppressor/.test(text)) return mockDefensa()
  // 2. Dental
  if (/dental|odontolog|sonrisa|brackets|ortodoncia/.test(text)                      ) return mockDental()
  // 3. Medical / Clinic
  if (/clinic|medic|salud|doctor|hospital|consultor/.test(text)                      ) return mockClinica()
  // 4. Restaurant / Food
  if (/restaurante|comida|food|cocina|gastro|menú|menu|pizza|burger|catering/.test(text)) return mockRestaurant()
  // 5. Gym / Fitness
  if (/gym|fitness|gimnasio|deport|muscle|entren/.test(text)                         ) return mockGym()
  // 6. Beauty / Salon — use 'spa ' with space to avoid false 'España' match
  if (/salon|salón|estética|estetica|belleza|spa |peluquer|barber/.test(text)        ) return mockSalon()
  // 7. Hotel / Hospitality
  if (/hotel|hostal|resort|habitacion|hospedaje|alojam/.test(text)                   ) return mockHotel()
  // 8. Construction
  if (/construcc|arquitec|ingenier|contratist/.test(text)                             ) return mockConstruccion()
  // 9. Real Estate
  if (/inmobil|propiedad|realty|bienes raíces|apartment|renta/.test(text)            ) return mockInmobiliaria()
  // 10. Legal
  if (/legal|jurídico|juridico|abogado|bufete|derecho|law firm/.test(text)           ) return mockLegal()
  // 11. Marketing / Digital Agency
  if (/market|publicidad|agencia digital|brand|digital agency|seo|ads/.test(text)   ) return mockMarketing()
  // 12. Technology / Software
  if (/tecnolog|software|tech|develop|app|sistema/.test(text)                        ) return mockTech()
  // 13. Education
  if (/escuela|academia|educac|colegio|univers|curso|training/.test(text)            ) return mockEducacion()
  // Default
  return mockDefault()
}


// --- Helper to generate a custom vector SVG logo for the church according to template option style ---
export function generateChurchLogoSvg(churchName = 'Comunidad de Fe', styleOption = 'nucleus', primaryColor = '', accentColor = '') {
  const cleanName = (churchName || 'Comunidad de Fe').replace(/[<>&'"]/g, '').trim()
  
  // Calculate dynamic font size and width so long names fit comfortably without cutting off
  const len = cleanName.length
  let fontSize = 24
  let yPos = 44
  if (len > 32) {
    fontSize = 16
    yPos = 40
  } else if (len > 24) {
    fontSize = 19
    yPos = 42
  } else if (len > 16) {
    fontSize = 21
    yPos = 43
  }

  const svgWidth = Math.max(400, Math.min(620, 110 + len * 14))
  const opt = String(styleOption || '').toLowerCase()

  let svg = ''

  if (opt === 'flame_cross' || opt === 'logo1' || opt === 'flame' || opt === 'poster' || opt === '3' || opt === 'afiche' || opt === '4') {
    // ── LOGO EXAMPLE 1: Cross with Flame & Swoosh Circle ──
    svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${svgWidth} 90" width="${svgWidth}" height="90">
      <defs>
        <linearGradient id="flameGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stop-color="#DC2626"/>
          <stop offset="60%" stop-color="#EA580C"/>
          <stop offset="100%" stop-color="#F97316"/>
        </linearGradient>
        <linearGradient id="crossGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#2563EB"/>
          <stop offset="100%" stop-color="#1D4ED8"/>
        </linearGradient>
      </defs>
      <g transform="translate(6, 6) scale(1.05)">
        <path d="M 38 21 C 20 28, 8 42, 10 58 C 12 74, 34 82, 58 74 C 70 70, 76 60, 76 50 C 74 62, 64 70, 48 70 C 30 70, 18 58, 18 44 C 18 34, 26 25, 38 21 Z" fill="url(#flameGrad)"/>
        <path d="M 52 10 C 60 16, 68 28, 66 44 C 64 56, 56 64, 52 68 C 60 62, 72 50, 72 32 C 72 18, 62 10, 52 10 Z" fill="url(#flameGrad)"/>
        <path d="M 38 12 L 44 12 L 44 24 L 56 24 L 56 30 L 44 30 L 44 68 L 38 68 L 38 30 L 26 30 L 26 24 L 38 24 Z" fill="url(#crossGrad)"/>
        <polygon points="41,20 42,26 48,27 42,28 41,34 40,28 34,27 40,26" fill="#FFFFFF"/>
      </g>
      <text x="96" y="${yPos}" font-family="'Plus Jakarta Sans', 'Inter', sans-serif" font-size="${fontSize}" font-weight="900" fill="#FFFFFF">${cleanName}</text>
      <text x="97" y="65" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="800" fill="#F97316" letter-spacing="2.5">IGLESIA &amp; FUEGO DE VIDA</text>
    </svg>`
  } else if (opt === 'dove_cross' || opt === 'logo2' || opt === 'dove' || opt === 'nucleus' || opt === '1') {
    // ── LOGO EXAMPLE 2: Golden Cross with Blue Dove & Olive Branch ──
    svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${svgWidth} 90" width="${svgWidth}" height="90">
      <defs>
        <linearGradient id="goldCrossGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#CA8A04"/>
          <stop offset="100%" stop-color="#854D0E"/>
        </linearGradient>
      </defs>
      <g transform="translate(6, 6) scale(1.05)">
        <path d="M 38 10 L 42 10 L 42 28 L 56 28 L 56 32 L 42 32 L 42 70 L 38 70 L 38 32 L 24 32 L 24 28 L 38 28 Z" fill="url(#goldCrossGrad)"/>
        <path d="M 22 44 C 28 36, 40 30, 52 28 C 42 34, 38 42, 44 48 C 48 52, 52 48, 48 58 C 42 54, 36 56, 32 62 C 34 56, 28 50, 22 44 Z" fill="none" stroke="#2563EB" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M 32 64 Q 48 56 60 48" fill="none" stroke="#65A30D" stroke-width="3"/>
        <ellipse cx="40" cy="61" rx="4" ry="2" fill="#65A30D" transform="rotate(-30 40 61)"/>
        <ellipse cx="48" cy="56" rx="4" ry="2" fill="#65A30D" transform="rotate(-30 48 56)"/>
        <ellipse cx="56" cy="51" rx="4" ry="2" fill="#65A30D" transform="rotate(-30 56 51)"/>
      </g>
      <text x="96" y="${yPos}" font-family="'Playfair Display', Georgia, serif" font-size="${fontSize}" font-weight="900" fill="#FFFFFF">${cleanName}</text>
      <text x="97" y="65" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="800" fill="#65A30D" letter-spacing="2.5">ESPÍRITU &amp; PAZ</text>
    </svg>`
  } else {
    // ── LOGO EXAMPLE 3: Minimalist Architectural Church Line-Art ──
    svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${svgWidth} 90" width="${svgWidth}" height="90">
      <g transform="translate(6, 6) scale(1.05)">
        <path d="M 40 10 L 40 24 M 34 15 L 46 15" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/>
        <path d="M 34 24 L 46 24 L 46 64 L 34 64 Z" fill="none" stroke="#FFFFFF" stroke-width="2.5"/>
        <path d="M 34 38 L 22 46 L 22 64 M 46 38 L 58 46 L 58 64" fill="none" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        <line x1="16" y1="64" x2="64" y2="64" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/>
      </g>
      <text x="96" y="${yPos}" font-family="'Plus Jakarta Sans', 'Inter', sans-serif" font-size="${fontSize + 1}" font-weight="900" fill="#FFFFFF" letter-spacing="0.02em">${cleanName}</text>
      <text x="97" y="65" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="800" fill="#9CA3AF" letter-spacing="2.5">COMUNIDAD CRISTIANA</text>
    </svg>`
  }

  if (typeof btoa !== 'undefined') {
    try {
      return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`
    } catch (e) {
      // fallback
    }
  }
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}

// --- Helper to extract clean church name from user prompt ---
export function extractChurchName(promptText = '') {
  if (!promptText) return 'Comunidad de Fe'
  let text = promptText.trim()

  // 1. Remove audience/purpose descriptions (e.g. "para jovenes", "para la juventud", "para niños", "para familias")
  const stripAudience = (str) => {
    return str
      .replace(/(?:^\s*|\s+)(?:para\s+(?:j[oó]venes|ni[ñn]os|familias|adultos|la\s+juventud|matrimonios|adolescentes|todos|la\s+comunidad)|de\s+j[oó]venes|con\s+j[oó]venes|enfocad[ao]\s+en\s+j[oó]venes|con\s+(?:servicios|horarios|cultos|musica|alabanza)|ubicad[ao]\s+en.*)$/i, '')
      .replace(/(?:^\s*|\s+)(?:para|con|de|en|donde|que|y)$/i, '')
      .trim()
  }

  // 2. Explicit naming: "llamada [X]", "llamado [X]", "de nombre [X]", "nombre: [X]"
  const llamadaMatch = text.match(/(?:llamada|llamado|de nombre|nombre:?|denominada|titulada)\s+["']?([^"'\n,.;]+?)["']?(?:\s+(?:con|en|para|donde|ubicad|horarios|servicios|que|\.|\,|$)|$)/i)
  if (llamadaMatch && llamadaMatch[1]) {
    let name = stripAudience(llamadaMatch[1].trim())
    if (name) {
      const cap = name.split(/\s+/).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
      if (!/(?:iglesia|parroquia|catedral|capilla|templo|ministerio|comunidad)/i.test(cap)) {
        return `Iglesia ${cap}`
      }
      return cap
    }
  }

  // 3. Denomination keywords (clean and exact)
  if (/mormon|santos\s+de\s+los\s+[uú]ltimos/i.test(text)) return 'Iglesia Mormona'
  if (/bautista/i.test(text)) {
    const specific = text.match(/(?:iglesia|comunidad)\s+bautista\s+([a-záéíóúñA-ZÁÉÍÓÚÑ0-9\s'-]+)/i)
    if (specific && specific[1]) {
      const extra = stripAudience(specific[1])
      if (extra && extra.length > 2) return `Iglesia Bautista ${extra.split(/\s+/).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}`
    }
    return 'Iglesia Bautista'
  }
  if (/cat[oó]lica/i.test(text)) return 'Parroquia Católica'
  if (/presbiteriana/i.test(text)) return 'Iglesia Presbiteriana'
  if (/metodista/i.test(text)) return 'Iglesia Metodista'
  if (/pentecostal/i.test(text)) return 'Iglesia Pentecostal'
  if (/luterana/i.test(text)) return 'Iglesia Luterana'
  if (/adventista/i.test(text)) return 'Iglesia Adventista'
  if (/anglicana/i.test(text)) return 'Iglesia Anglicana'
  if (/ortodoxa/i.test(text)) return 'Iglesia Ortodoxa'
  if (/evang[eé]lica/i.test(text)) return 'Iglesia Evangélica'

  // 4. Direct church prefix pattern: e.g. "Parroquia Santa Ana", "Iglesia Vida Nueva", "Iglesia María Auxiliadora"
  const prefixMatch = text.match(/(?:(?:para|de|crear|hacer|generar|diseñar)\s+(?:una|un|la|el)\s+)?((?:parroquia|iglesia|catedral|capilla|ministerio|congregaci[oó]n|comunidad cristiana|templo|centro cristiano)\s+[a-záéíóúñA-ZÁÉÍÓÚÑ0-9\s'-]+?)(?:\s+(?:con|donde|en|horarios|servicios|ubicad[ao]|que|\.|\,|$)|$)/i)
  if (prefixMatch && prefixMatch[1]) {
    let raw = prefixMatch[1].trim()
    raw = raw.replace(/^(?:para|de|crear|hacer|generar|diseñar|una|un|la|el)\s+/i, '').trim()
    raw = raw.replace(/\s+(?:llamada|llamado|de nombre)\s+/i, ' ').trim()
    raw = stripAudience(raw)
    if (raw.length >= 4) {
      return raw.split(/\s+/).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    }
  }

  // 5. Short prompts containing church terms
  if (text.length <= 50 && /(?:parroquia|iglesia|catedral|capilla|ministerio|fe|comunidad|templo)/i.test(text)) {
    let clean = text.replace(/^(?:quiero|crear|hacer|generar|una|un|pagina|web|para|de)\s+/gi, '').trim()
    clean = stripAudience(clean)
    if (clean) {
      return clean.split(/\s+/).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    }
  }

  return 'Comunidad de Fe'
}

// ─── Templates ────────────────────────────────────────────────────────────────

// Template 1: MyGateway Life
export function mockIglesiaMyGateway(businessName = '') {
  const name = businessName || 'Comunidad de Fe'
  const logoImage = generateChurchLogoSvg(name, 'mygateway', '#0F172A', '#00D8F6')
  return {
    businessName: name,
    logoImage,
    logoSize: 48,
    churchTemplateVariant: 'mygateway',
    tagline: 'Una comunidad donde sentirte en casa',
    description: `Bienvenido a ${name}. Aviva tu fe, conecta con personas reales y crece espiritualmente en un ambiente acogedor para toda la familia.`,
    primaryColor: '#0F172A',
    secondaryColor: '#FFFFFF',
    accentColor: '#00D8F6',
    font: 'Inter',
    industry: 'Iglesia / Ministerio / Fe',
    layoutVariant: 1,
    heroImage: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1600&q=85&fit=crop',
    sectionOrder: ['hero', 'welcome', 'planAVisit', 'nextSteps', 'ministries', 'sermons', 'contact'],
    sectionsVisibility: {
      hero: true,
      welcome: true,
      planAVisit: true,
      nextSteps: true,
      ministries: true,
      sermons: true,
      contact: true,
      values: false,
      donation: false,
      prayerRequest: false,
      about: false,
      testimonials: false,
    },
    announcementBar: {
      visible: true,
      text: `👋 Mantente Conectado con ${name}: Noticias y eventos semanales`,
      ctaText: '¡Me Apunto!',
      ctaLink: '#wp-contact'
    },
    navLinks: [
      { label: 'Inicio', href: '#wp-hero' },
      { label: 'Planifica tu Visita', href: '#wp-plan-visit' },
      { label: 'Próximos Pasos', href: '#wp-next-steps' },
      { label: 'Ministerios', href: '#wp-ministerios' },
      { label: 'Mensajes', href: '#wp-sermons' },
      { label: 'Contacto', href: '#wp-contact' }
    ],
    hero: {
      eyebrow: 'DOMINGOS A LAS 9:00 AM & 11:00 AM',
      headline: 'Una comunidad donde sentirte en casa',
      subheadline: `En ${name} te esperamos con los brazos abiertos para avivar tu fe, conectar con otros y crecer juntos en familia.`,
      ctaText: 'Planifica tu Visita',
      ctaLink: '#wp-plan-visit',
      ctaSecondary: 'Qué está pasando',
      ctaSecondaryLink: '#wp-next-steps'
    },
    welcome: {
      ctaText: 'Sobre Nosotros',
      ctaSecondaryText: 'Escríbenos',
      photo1: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&q=85&fit=crop',
      photo2: 'https://images.unsplash.com/photo-1544427920-c49ccfb85579?w=800&q=85&fit=crop',
      photo3: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=85&fit=crop'
    },
    planAVisit: {
      eyebrow: 'DOMINGOS 9:00 AM & 11:00 AM',
      title: 'Acompáñanos este Domingo',
      subtitle: `Encuentra horarios, ubicación y todo lo necesario para tu primera visita a ${name} haciendo clic en el botón abajo.`,
      ctaText: 'Planifica tu Visita',
      address: 'Sede Principal',
      serviceTimes: [
        'Domingos: 9:00 AM & 11:00 AM',
        'Miércoles: 7:00 PM'
      ],
      image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1200&q=85&fit=crop'
    },
    nextSteps: {
      label: 'Involúcrate',
      title: 'Próximos Pasos',
      subtitle: `Explora ${name} incluyendo ministerios, grupos de conexión y oportunidades para crecer en tu fe.`,
      ctaText: 'Dar tu Siguiente Paso',
      image: 'https://images.unsplash.com/photo-1519491050282-cf00c82424b4?w=1200&q=85&fit=crop'
    },
    ministriesTitle: 'Nuestros Ministerios',
    ministriesSubtitle: 'Espacios pensados para cada miembro de la familia.',
    ministries: [
      {
        name: 'Niños & Familias',
        ageRange: '0 a 12 años',
        description: 'Espacio seguro y divertido donde los más pequeños aprenden con amor y valores bíblicos.',
        image: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=800&q=80&fit=crop',
        ctaText: 'Conoce más'
      },
      {
        name: 'Jóvenes & Universitarios',
        ageRange: '13 a 25 años',
        description: 'Comunidad vibrante con reuniones semanales, música en vivo y amistades duraderas.',
        image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80&fit=crop',
        ctaText: 'Conoce más'
      },
      {
        name: 'Grupos en Casa',
        ageRange: 'Todas las edades',
        description: 'Círculos pequeños en diferentes puntos de la comunidad para convivir y crecer espiritualmente.',
        image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&q=80&fit=crop',
        ctaText: 'Conoce más'
      }
    ],
    sermonsTitle: 'Mensajes & Prédicas',
    sermonsSubtitle: 'Inspiración y enseñanza para tu semana dondequiera que estés.',
    sermons: [
      {
        title: 'Caminando por Fe en Tiempos de Cambio',
        series: 'Serie Actual',
        speaker: 'Pastor Principal',
        date: 'Domingo Reciente',
        duration: '38 min',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        image: 'https://images.unsplash.com/photo-1519491050282-cf00c82424b4?w=800&q=80&fit=crop'
      }
    ],
    contact: {
      sectionTitle: `Visítanos en ${name}`,
      subtitle: 'Nuestras puertas y brazos están siempre abiertos para ti.',
      phone: '+1 (555) 000-1122',
      whatsapp: '+1 (555) 000-3344',
      email: 'contacto@tu-iglesia.org',
      address: 'Sede Principal de la Iglesia'
    },
    social: {
      youtube: 'https://youtube.com',
      instagram: 'https://instagram.com',
      facebook: 'https://facebook.com'
    },
    seo: {
      title: `${name} | Bienvenido a Casa`,
      description: `Una comunidad de fe donde pertenecer, creer y crecer. Horarios dominicales, ministerios y actividades en ${name}.`
    }
  }
}

// Template 2: Gateway Demo Nucleus
export function mockIglesiaNucleus(businessName = '') {
  const name = businessName || 'Comunidad de Fe'
  const logoImage = generateChurchLogoSvg(name, 'nucleus', '#0A0A0F', '#C4A35A')
  return {
    businessName: name,
    logoImage,
    logoSize: 48,
    churchTemplateVariant: 'nucleus',
    tagline: 'Encuentra a Dios como nunca antes',
    description: `Buscando a Dios juntos en ${name}. Existimos para ayudarte a conocer a Dios, encontrar libertad, descubrir tu propósito y marcar una diferencia.`,
    primaryColor: '#0A0A0F',
    secondaryColor: '#FFFFFF',
    accentColor: '#C4A35A',
    font: 'Playfair Display',
    industry: 'Iglesia / Ministerio / Fe',
    layoutVariant: 2,
    heroImage: 'https://images.unsplash.com/photo-1544427920-c49ccfb85579?w=1600&q=85&fit=crop',
    sectionOrder: ['hero', 'missionBlock', 'planAVisit', 'nucleusColumns', 'nextSteps', 'contact'],
    sectionsVisibility: {
      hero: true,
      missionBlock: true,
      planAVisit: true,
      nucleusColumns: true,
      nextSteps: true,
      contact: true,
      welcome: false,
      ministries: false,
      sermons: false,
      values: false,
      donation: false,
      prayerRequest: false,
      about: false,
      testimonials: false,
    },
    announcementBar: {
      visible: false,
      text: '',
      ctaText: '',
      ctaLink: ''
    },
    navLinks: [
      { label: 'Planifica tu Visita', href: '#wp-plan-visit' },
      { label: 'Sobre Nosotros', href: '#wp-mission' },
      { label: 'Calendario', href: '#wp-columns' },
      { label: 'Líderes & Equipo', href: '#wp-columns' },
      { label: 'Próximos Pasos', href: '#wp-next-steps' }
    ],
    hero: {
      eyebrow: 'DOMINGOS 10:30 A.M.',
      headline: 'Encuentra a Dios como nunca antes',
      subheadline: `En ${name} creemos que hay un lugar para ti: para encontrarte con Dios, conectar con personas reales y vivir con propósito eterno.`,
      ctaText: 'PLANIFICA TU VISITA',
      ctaLink: '#wp-plan-visit',
      ctaSecondary: 'INVOLÚCRATE',
      ctaSecondaryLink: '#wp-next-steps'
    },
    missionBlock: {
      heading: 'Buscando a Dios Juntos',
      text: `En ${name} existimos para ayudar a las personas a conocer a Dios, encontrar libertad, descubrir su propósito y marcar una diferencia transformadora en el mundo.`,
      ctaText: 'SOBRE NOSOTROS',
      ctaLink: '#wp-plan-visit'
    },
    planAVisit: {
      eyebrow: '10:30 a.m. los Domingos',
      title: 'Planifica tu Visita',
      subtitle: `Encuentra horarios, servicios y todo lo que necesitas para tu primera reunión en ${name} haciendo clic abajo.`,
      ctaText: 'PLANIFICA TU VISITA',
      address: 'Sede Principal',
      serviceTimes: [
        'Domingos: 10:30 AM',
        'Jueves: 7:00 PM (Reunión de Oración)'
      ],
      image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1200&q=85&fit=crop'
    },
    nucleusColumns: {
      col1: {
        eyebrow: 'Conoce al Equipo',
        title: 'Líderes & Pastores',
        text: `Nuestro equipo pastoral en ${name} está listo para servirte, guiarte y acompañarte en cada etapa de tu crecimiento espiritual.`,
        image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=900&q=85&fit=crop',
        ctaText: 'NUESTRO EQUIPO',
        ctaLink: '#wp-contact'
      },
      col2: {
        eyebrow: 'Nuestro Calendario',
        title: 'Mira lo que está pasando',
        text: `Siempre hay algo sucediendo en ${name}. Descubre eventos, reuniones semanales y actividades para toda la familia.`,
        image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=900&q=85&fit=crop',
        ctaText: 'NUESTRO CALENDARIO',
        ctaLink: '#wp-contact'
      }
    },
    nextSteps: {
      eyebrow: 'Involúcrate',
      title: 'Próximos Pasos',
      subtitle: `Explora ${name} incluyendo ministerios, grupos de conexión y oportunidades para crecer en tu fe.`,
      ctaText: 'DA TU SIGUIENTE PASO',
      image: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?w=1200&q=85&fit=crop'
    },
    contact: {
      sectionTitle: name,
      subtitle: 'Reuniones: Domingos 10:30 a.m. | Oración: Jueves 7:00 p.m.',
      phone: '+1 (555) 123-4567',
      whatsapp: '+1 (555) 987-6543',
      email: 'info@tu-iglesia.org',
      address: 'Sede Principal de la Iglesia',
      ctaPrimary: 'DI HOLA',
      ctaSecondary: 'DA TU SIGUIENTE PASO'
    },
    social: {
      youtube: 'https://youtube.com',
      instagram: 'https://instagram.com',
      facebook: 'https://facebook.com',
      tiktok: 'https://tiktok.com'
    },
    seo: {
      title: `${name} | Encuentra a Dios como nunca antes`,
      description: `Buscando a Dios juntos en ${name}. Domingos a las 10:30 AM. Conéctate con nuestra comunidad.`
    }
  }
}

// Template 3: Experiencia Simbólica & Vitral (Poster)
export function mockIglesiaPoster(businessName = '') {
  const name = businessName || 'Iglesia Grace & Vida'
  const logoImage = generateChurchLogoSvg(name, 'poster', '#FFFFFF', '#4F46E5')
  return {
    businessName: name,
    logoImage,
    logoSize: 48,
    churchTemplateVariant: 'poster',
    tagline: 'Una comunidad donde tu vida encuentra luz y propósito real',
    description: `Aviva tu fe a través de una experiencia inmersiva en ${name}. Conecta con personas auténticas en un espacio cálido e inspirador para toda la familia.`,
    primaryColor: '#FFFFFF',
    secondaryColor: '#F8FAFC',
    accentColor: '#4F46E5',
    font: 'Outfit',
    industry: 'Iglesia / Ministerio / Fe',
    layoutVariant: 3,
    heroImage: 'https://images.unsplash.com/photo-1548625149-fc4a29cf7092?w=1600&q=85&fit=crop',
    generosityImage: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=1200&q=85&fit=crop',
    hero: {
      eyebrow: 'DOMINGOS 10:30 A.M.',
      headlinePrefix: 'Encuentra a ',
      headlineKeyword: 'Dios',
      headlineSuffix: ' como nunca antes',
      subheadline: `En ${name} creemos que hay un lugar para ti: para encontrarte con Dios, conectar con personas reales y vivir con propósito eterno.`,
      ctaText: 'PLANIFICA TU VISITA',
      ctaLink: '#wp-plan-visit',
      ctaSecondary: 'INVOLÚCRATE',
      ctaSecondaryLink: '#wp-contact',
      bgImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1800&q=85&fit=crop'
    },
    missionBlock: {
      title: 'Buscando a Dios Juntos',
      text1: `En ${name} creemos firmemente que buscar a Dios es la base fundamental de un caminar espiritual lleno de vida y propósito.`,
      text2: 'Te animamos a acompañarnos mientras profundizamos en la Palabra, nos sumergimos en alabanza genuina y buscamos la presencia de Dios a través de la oración.',
      text3: 'Juntos nos embarcamos en una experiencia transformadora conociendo y viviendo el poder de nuestro Padre Celestial.',
      ctaText: 'SOBRE NOSOTROS',
      ctaLink: '#wp-plan-visit'
    },
    symbolicHeader: {
      eyebrow: '✦ NUESTRA EXPERIENCIA ✦',
      title: '5 Pilar de Nuestra Casa',
      subtitle: 'Selecciona cada pilar para explorar lo que vivimos semana a semana:'
    },
    symbolicSections: [
      {
        id: 'fe',
        symbol: '✝️',
        title: 'Fe & Vitral de Verdad',
        tagline: 'LUZ BÍBLICA CLARA Y APLICABLE A TU DÍA A DÍA',
        desc: 'Enseñamos la palabra de Dios como un faro de luz: clara, profunda y con aplicación práctica para los desafíos reales de la vida moderna y tu familia.',
        accent: '#4F46E5',
        image: 'https://images.unsplash.com/photo-1548625149-fc4a29cf7092?w=1200&q=85&fit=crop'
      },
      {
        id: 'esperanza',
        symbol: '🕊️',
        title: 'Esperanza & Cristal de Paz',
        tagline: 'RESTAURACIÓN ESPIRITUAL Y ORACIÓN COMUNITARIA',
        desc: 'Creemos en el poder transformador de la oración. Como la luz que atraviesa el cristal, Dios renueva tu fe y llena tu hogar de paz en tiempos difíciles.',
        accent: '#059669',
        image: 'https://images.unsplash.com/photo-1509021436471-18736672b71e?w=1200&q=85&fit=crop'
      },
      {
        id: 'comunidad',
        symbol: '☕',
        title: 'Comunidad & Café',
        tagline: 'AMISTADES AUTÉNTICAS Y AMBIENTE ACOGEDOR',
        desc: 'Llega unos minutos antes de cada servicio, disfruta de café gourmet de cortesía en nuestro lobby y conecta con personas amigables.',
        accent: '#D97706',
        image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=1200&q=85&fit=crop'
      },
      {
        id: 'alabanza',
        symbol: '🎵',
        title: 'Alabanza & Resplandor',
        tagline: 'MÚSICA EN VIVO CONTEMPORÁNEA E INSPIRADORA',
        desc: 'Vivimos momentos de adoración vibrantes con músicos en vivo que elevan el corazón y preparan el espíritu para recibir la bendición.',
        accent: '#7C3AED',
        image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&q=85&fit=crop'
      },
      {
        id: 'kidzone',
        symbol: '👶',
        title: 'KidZone & Familias',
        tagline: 'ESPACIO SEGURO, DIVERTIDO Y LLENO DE COLOR',
        desc: 'Tus hijos tendrán lecciones bíblicas dinámicas, juegos y cuidado seguro con voluntarias capacitadas mientras disfrutas del servicio.',
        accent: '#DC2626',
        image: 'https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?w=1200&q=85&fit=crop'
      }
    ],
    faqsHeader: {
      eyebrow: '✦ ¿PRIMERA VEZ? ✦',
      title: 'Preguntas Frecuentes de Visitantes'
    },
    faqs: [
      { q: '¿Cómo debo vestirme para asistir?', a: '¡Ven tal como eres! No tenemos un código de vestimenta formal; la mayoría asiste de forma casual y cómoda.' },
      { q: '¿Qué hay disponible para mis hijos?', a: 'Contamos con KidZone, un área segura y divertida con maestros capacitados para niños de 0 a 12 años en cada servicio.' },
      { q: '¿Dónde puedo estacionar mi vehículo?', a: 'Disponemos de amplio estacionamiento gratuito frente a las instalaciones con servidores listos para orientarte.' },
      { q: '¿Cuánto dura la reunión dominical?', a: 'Cada reunión dura aproximadamente 75 minutos, incluyendo adoración en vivo, lecciones bíblicas y anuncios comunitarios.' }
    ],
    generosity: {
      eyebrow: '💰 GENEROSIDAD & DAR',
      title: 'Tu generosidad transforma vidas y la ciudad.',
      desc: 'Cuando damos, expresamos gratitud a Dios y financiamos proyectos comunitarios, alimentando familias y sosteniendo el ministerio.',
      cta1: 'Dar u Ofrendar Online',
      cta2: 'Transferencia Bancaria'
    },
    planAVisit: {
      eyebrow: 'ACOMPÁÑANOS ESTE DOMINGO',
      title: 'Horarios de Servicios & Ubicación',
      subtitle: 'Te esperamos con los brazos abiertos. Encuentra aquí todo lo necesario para tu primera visita.',
      ctaText: 'Planifica tu Visita por WhatsApp',
      address: 'Av. Las Palmeras #123, San Salvador, El Salvador',
      serviceTimes: [
        'Domingo 9:00 AM — Primer Servicio Familiar',
        'Domingo 11:00 AM — Segundo Servicio Familiar',
        'Miércoles 7:00 PM — Estudio Bíblico & Oración'
      ]
    },
    locationHeader: { title: 'Dirección de la Iglesia' },
    contact: { phone: '+1 (555) 123-4567', email: 'contacto@tu-iglesia.org', address: 'Av. Las Palmeras #123, San Salvador' },
    seo: { title: `${name} | Experiencia Luminosa de Fe`, description: `Una comunidad donde sentirte en casa en ${name}. Horarios y experiencias dominicales.` }
  }
}

// Template 4: Afiche Editorial & Noche de Adoración
export function mockIglesiaAfiche(businessName = '') {
  const name = businessName || 'Iglesia Noche de Adoración'
  const logoImage = generateChurchLogoSvg(name, 'afiche', '#090B10', '#FACC15')
  return {
    businessName: name,
    logoImage,
    logoSize: 48,
    churchTemplateVariant: 'afiche',
    tagline: 'Noche de Adoración & Fe',
    description: `Una experiencia espiritual inmersiva en ${name}. Conecta con Dios a través de alabanza en vivo, oración ferviente y mensajes transformadores.`,
    primaryColor: '#090B10',
    secondaryColor: '#0D0F17',
    accentColor: '#FACC15',
    font: 'Bebas Neue',
    industry: 'Iglesia / Ministerio / Fe',
    layoutVariant: 4,
    heroImage: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=1600&q=85&fit=crop',
    hero: {
      eyebrow: '✦ SÁBADOS 6:00 PM & DOMINGOS 10:30 AM ✦',
      scriptTitle: 'Noche de',
      headline: 'ADORACIÓN & FE',
      subheadline: 'Una experiencia espiritual inmersiva. Conecta con Dios a través de alabanza en vivo, oración ferviente y mensajes transformadores.',
      ctaText: 'Planifica tu Visita',
      ctaLink: '#wp-plan-visit',
      ctaSecondary: 'Ver Próximos Eventos',
      ctaSecondaryLink: '#wp-afiche-gallery'
    },
    symbolicSections: [
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
    ],
    ministries: [
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
    ],
    planAVisit: {
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
    },
    contact: { phone: '+1 (555) 000-7788', email: 'contacto@nochedeadoracion.org', address: 'Av. Las Palmeras #123, San Salvador' },
    seo: { title: `${name} | Noche de Adoración & Fe`, description: `Una experiencia espiritual inmersiva en ${name}. Horarios de adoración y eventos.` }
  }
}

// Main mock picker: extracts church name from prompt and selects template
function mockIglesia(businessName = '', promptText = '') {
  const extractedName = businessName || extractChurchName(promptText)
  const text = (promptText || '').toLowerCase()

  if (text.includes('nucleus') || text.includes('opcion 1') || text.includes('opción 1')) {
    return mockIglesiaNucleus(extractedName)
  }
  if (text.includes('mygateway') || text.includes('gateway') || text.includes('opcion 2') || text.includes('opción 2')) {
    return mockIglesiaMyGateway(extractedName)
  }
  if (text.includes('poster') || text.includes('vitral') || text.includes('cristal') || text.includes('opcion 3') || text.includes('opción 3')) {
    return mockIglesiaPoster(extractedName)
  }
  if (text.includes('afiche') || text.includes('adoracion') || text.includes('adoración') || text.includes('opcion 4') || text.includes('opción 4')) {
    return mockIglesiaAfiche(extractedName)
  }

  // Distribution among all 4 options when generating a general church prompt:
  const rand = Math.random()
  if (rand < 0.25) return mockIglesiaNucleus(extractedName)
  if (rand < 0.50) return mockIglesiaMyGateway(extractedName)
  if (rand < 0.75) return mockIglesiaPoster(extractedName)
  return mockIglesiaAfiche(extractedName)
}

// ─── Templates ────────────────────────────────────────────────────────────────

function mockLegal() {
  return {
    businessName: 'Bufete Jurídico Profesional',
    tagline: 'Justicia, Eficiencia, Confianza',
    description: 'Somos un bufete de abogados con amplia experiencia en el mercado regional. Ofrecemos asesoría legal integral para empresas y particulares, destacándonos por nuestra ética profesional y resultados comprobados.',
    primaryColor: '#1E3A5F', secondaryColor: '#F5F0E8', accentColor: '#C9A84C',
    font: 'Playfair Display', industry: 'Legal & Jurídico', layoutVariant: 1,
    nav: { ctaText: 'Consulta Gratis' },
    hero: { headline: 'Tu Seguridad Jurídica, Nuestra Prioridad', subheadline: 'Defendemos tus derechos con experiencia, integridad y resultados comprobados.', ctaText: 'Consulta Gratis' },
    services: [
      { icon: '⚖️', title: 'Derecho Corporativo', description: 'Constitución de empresas, contratos comerciales, fusiones y adquisiciones. Acompañamos a tu empresa en cada etapa de su crecimiento legal.' },
      { icon: '🏠', title: 'Derecho Inmobiliario', description: 'Compraventa de inmuebles, títulos de propiedad y litigios inmobiliarios con total seguridad jurídica.' },
      { icon: '👨‍👩‍👧', title: 'Derecho de Familia', description: 'Divorcios, custodia de menores, pensiones alimenticias y sucesiones tramitados con sensibilidad.' },
      { icon: '📋', title: 'Litigación Civil', description: 'Representación experta ante tribunales en disputas civiles, mercantiles y administrativas.' },
    ],
    about: { title: 'Décadas de Excelencia Jurídica', text: 'Nuestro despacho ha forjado una reputación de excelencia en el sistema judicial. Contamos con un equipo de abogados especializados, comprometidos con los más altos estándares éticos.' },
    testimonials: [
      { name: 'Carlos M.', role: 'CEO, Grupo Empresarial', text: 'Manejaron la constitución legal de nuestra holding con eficiencia extraordinaria. Dominio profundo del derecho corporativo.', rating: 5 },
      { name: 'María R.', role: 'Propietaria', text: 'Resolvieron mi complicado caso de título de propiedad en tiempo récord. Siempre dispuestos a explicar cada paso.', rating: 5 },
    ],
    contact: { phone: '+503 2234-5678', email: 'contacto@bufetejuridico.com', address: 'Col. San Benito, San Salvador' },
    seo: { title: 'Bufete de Abogados Profesional', description: 'Asesoría legal integral con experiencia comprobada.' },
  }
}

function mockDefensa() {
  return {
    businessName: 'Arias Defense Components',
    tagline: 'Precisión. Protección. Confianza.',
    description: 'Proveedor líder de componentes y accesorios de defensa para profesionales de seguridad, fuerzas del orden y entusiastas. Calidad certificada y tecnología de vanguardia en cada producto.',
    primaryColor: '#1C2B1E', secondaryColor: '#F4F1EB', accentColor: '#8B6914',
    font: 'Montserrat', industry: 'Defensa & Seguridad', layoutVariant: 4,
    nav: { ctaText: 'Ver Catálogo' },
    hero: { headline: 'Equipamiento de Defensa de Nivel Profesional', subheadline: 'Componentes tácticos certificados para uso profesional, fuerzas del orden y coleccionistas exigentes.', ctaText: 'Ver Catálogo →' },
    services: [
      { icon: '🎯', title: 'Componentes Tácticos', description: 'Accesorios de alta precisión para armas de fuego. Materiales certificados y tolerancias industriales para máximo rendimiento.' },
      { icon: '🛡️', title: 'Equipamiento de Protección', description: 'Sistemas de protección personal y equipos tácticos para profesionales de seguridad y fuerzas del orden.' },
      { icon: '🔧', title: 'Servicio Técnico', description: 'Mantenimiento especializado y modificaciones técnicas realizadas por expertos certificados con años de experiencia.' },
      { icon: '📦', title: 'Envíos Seguros', description: 'Sistema de envío discreto y seguro con empaque especializado. Nacional e internacional cumpliendo toda normativa.' },
    ],
    about: { title: 'Expertos en Defensa y Seguridad', text: 'Arias Defense Components nació de la necesidad de contar con proveedores confiables de componentes de alta calidad. Nuestra misión es proveer a profesionales y entusiastas equipamiento que rinde bajo presión. Cada producto pasa por rigurosos controles de calidad antes de llegar a tus manos.' },
    testimonials: [
      { name: 'Cdte. R. López', role: 'Fuerza de Seguridad', text: 'La calidad de los componentes es excepcional. Han soportado el uso intensivo sin ningún problema. Definitivamente mi proveedor de confianza.', rating: 5 },
      { name: 'J. Hernández', role: 'Instructor Certificado', text: 'Asesoramiento técnico impecable y productos que realmente funcionan. Sus componentes han mejorado notablemente el rendimiento de mis alumnos.', rating: 5 },
    ],
    contact: { phone: '+1 (555) 234-5678', email: 'info@ariasdefense.com', address: 'Defense Components Division, USA' },
    seo: { title: 'Arias Defense Components | Equipamiento Táctico Profesional', description: 'Proveedor de componentes de defensa de alta calidad. Productos tácticos para profesionales.' },
  }
}

function mockRestaurant() {
  return {
    businessName: 'La Terraza Gourmet', tagline: 'Sabores que Conquistan',
    description: 'Restaurante de cocina de autor con ingredientes locales frescos y técnicas gourmet. Una experiencia culinaria única en cada visita.',
    primaryColor: '#8B2635', secondaryColor: '#FFF8F0', accentColor: '#D4A853',
    font: 'Playfair Display', industry: 'Gastronomía', layoutVariant: 2,
    nav: { ctaText: 'Reservar' },
    hero: { headline: 'Una Experiencia Culinaria Inolvidable', subheadline: 'Cocina de autor con los mejores ingredientes locales e internacionales.', ctaText: 'Reservar Mesa' },
    services: [
      { icon: '🍽️', title: 'Menú Degustación', description: 'Recorre nuestra selección de platos con maridaje de vinos cuidadosamente elegidos por nuestro sommelier.' },
      { icon: '🎉', title: 'Eventos Privados', description: 'Salones exclusivos para celebraciones, cenas de negocios y eventos corporativos con menú personalizado.' },
      { icon: '🥡', title: 'Para Llevar', description: 'Nuestros platos estrella disponibles para llevar a casa sin perder su sabor y presentación premium.' },
    ],
    about: { title: 'Una Pasión por la Gastronomía', text: 'Fundados con la misión de llevar alta cocina asequible, nuestra cocina combina técnicas modernas con recetas tradicionales. Chef ejecutivo con más de 15 años de experiencia en restaurantes de renombre internacional.' },
    testimonials: [
      { name: 'Ana García', role: 'Food Blogger', text: 'Los mejores tacos de la ciudad. Cada visita es una aventura de sabores. El chef tiene un don especial para combinar ingredientes.', rating: 5 },
      { name: 'Miguel Torres', role: 'Cliente frecuente', text: 'Perfecto para cenas románticas. Ambiente inmejorable, servicio atento y platos que superan las expectativas.', rating: 5 },
    ],
    contact: { phone: '+503 2265-4321', email: 'reservas@laterrazagourmet.com', address: 'Zona Rosa, San Salvador' },
    seo: { title: 'La Terraza Gourmet | Restaurante Premium', description: 'Cocina de autor con ingredientes frescos. Reserva tu mesa hoy.' },
  }
}

function mockDental() {
  return {
    businessName: 'Clínica Dental Sonrisa Plus', tagline: 'Tu Sonrisa, Nuestra Especialidad',
    description: 'Clínica dental moderna con tecnología de vanguardia. Ortodoncistas, implantólogos y especialistas en blanqueamiento para toda la familia.',
    primaryColor: '#0EA5E9', secondaryColor: '#F0F9FF', accentColor: '#06B6D4',
    font: 'Inter', industry: 'Salud & Odontología', layoutVariant: 1,
    nav: { ctaText: 'Cita Gratis' },
    hero: { headline: 'La Sonrisa que Siempre Soñaste', subheadline: 'Tecnología de punta y especialistas certificados para tu salud dental.', ctaText: 'Agenda tu Cita' },
    services: [
      { icon: '😁', title: 'Ortodoncia & Brackets', description: 'Tratamientos de ortodoncia convencional e invisible para alinear tu sonrisa con comodidad y efectividad.' },
      { icon: '✨', title: 'Blanqueamiento Dental', description: 'Sistema de blanqueamiento profesional que aclara hasta 8 tonos en una sola sesión con resultados duraderos.' },
      { icon: '🦷', title: 'Implantes Dentales', description: 'Implantes de titanio de alta calidad con garantía de por vida. La solución permanente para dientes ausentes.' },
    ],
    about: { title: 'Cuidamos tu Sonrisa con Tecnología', text: 'Con más de 10 años de experiencia, nuestra clínica combina tecnología digital avanzada con un equipo humano de especialistas certificados. Primera consulta siempre gratis.' },
    testimonials: [
      { name: 'Sofía Martínez', role: 'Paciente Ortodóncica', text: 'En solo 14 meses logré la sonrisa que siempre quise. El trato es excelente y el resultado superó mis expectativas.', rating: 5 },
      { name: 'Pedro Alvarado', role: 'Implante Dental', text: 'Tenía miedo al procedimiento pero fue completamente indoloro. Los implantes se ven y se sienten como dientes naturales.', rating: 5 },
    ],
    contact: { phone: '+503 2244-8800', email: 'citas@dentalsoni.com', address: 'Centro Comercial Galerías, San Salvador' },
    seo: { title: 'Clínica Dental Sonrisa Plus | Orthodoncistas & Implantes', description: 'Ortodoncistas certificados, blanqueamiento e implantes. Primera consulta gratis.' },
  }
}

function mockGym() {
  return {
    businessName: 'PowerFit Centro Deportivo', tagline: 'Transforma tu Cuerpo. Transforma tu Vida.',
    description: 'Centro de fitness premium con equipamiento de última generación, coaches certificados y programas personalizados para todos los niveles.',
    primaryColor: '#111827', secondaryColor: '#F9FAFB', accentColor: '#EF4444',
    font: 'Montserrat', industry: 'Fitness & Deportes', layoutVariant: 4,
    nav: { ctaText: '30 Días Gratis' },
    hero: { headline: 'Forja tu Mejor Versión', subheadline: 'Entrenadores certificados, planes personalizados y la mejor comunidad fitness.', ctaText: 'Empieza Gratis' },
    services: [
      { icon: '💪', title: 'Entrenamiento Personal', description: 'Coach dedicado exclusivamente a ti. Plan 100% personalizado con seguimiento semanal y ajuste de rutinas.' },
      { icon: '🏃', title: 'Clases Grupales', description: 'Más de 20 clases semanales: CrossFit, Yoga, Spinning, Zumba y más. Comunidad motivadora incluida.' },
      { icon: '🥗', title: 'Nutrición Deportiva', description: 'Plan nutricional diseñado por dietistas certificados para maximizar tus resultados según tu objetivo.' },
    ],
    about: { title: 'Más que un Gimnasio, una Comunidad', text: 'PowerFit nació con la misión de hacer el fitness accesible y efectivo. Contamos con 2,000 m² de instalaciones modernas, más de 500 miembros activos y un equipo de 12 coaches certificados internacionalmente.' },
    testimonials: [
      { name: 'Laura Pérez', role: 'Miembro desde 2022', text: 'Perdí 18 kg en 6 meses con el plan personalizado. Los coaches te empujan justo lo necesario sin exagerar. ¡Cambió mi vida!', rating: 5 },
      { name: 'Diego Reyes', role: 'Atleta Amateur', text: 'La mejor inversión que he hecho. Instalaciones top, coaches expertos y una comunidad que te motiva cada día.', rating: 5 },
    ],
    contact: { phone: '+503 2201-7777', email: 'info@powerfitcenter.com', address: 'Bulevar del Ejército, San Salvador' },
    seo: { title: 'PowerFit Centro Deportivo | Gym Premium', description: 'Gimnasio premium con coaches certificados. Empieza 30 días gratis.' },
  }
}

function mockSalon() {
  return {
    businessName: 'Salón Belleza Elite', tagline: 'Donde tu Belleza Brilla',
    description: 'Salón de belleza premium con los mejores estilistas y tratamientos de vanguardia para cabello, uñas y estética facial.',
    primaryColor: '#9D174D', secondaryColor: '#FFF1F2', accentColor: '#EC4899',
    font: 'Poppins', industry: 'Belleza & Estética', layoutVariant: 2,
    nav: { ctaText: 'Reservar' },
    hero: { headline: 'Luce Radiante Cada Día', subheadline: 'Tratamientos premium y estilistas expertos para resaltar tu belleza natural.', ctaText: 'Reserva tu Cita' },
    services: [
      { icon: '💇', title: 'Corte & Peinado', description: 'Estilistas certificados con técnicas modernas y clásicas adaptadas a tu tipo de cabello y personalidad.' },
      { icon: '💅', title: 'Manicure & Pedicure', description: 'Uñas perfectas con las últimas tendencias. Gel, acrílico, nail art y tratamientos de cuidado.' },
      { icon: '✨', title: 'Tratamientos Faciales', description: 'Hidratación profunda, limpieza y rejuvenecimiento facial con productos de alta gama libres de tóxicos.' },
    ],
    about: { title: 'Tu Santuario de Belleza', text: 'Más de 8 años creando experiencias únicas de belleza. Nuestro equipo de 15 profesionales combina técnica y pasión para que salgas sintiéndote espectacular en cada visita.' },
    testimonials: [
      { name: 'Valentina Cruz', role: 'Clienta VIP', text: 'El mejor salón de la ciudad. Me atienden de maravilla, siempre salen perfectas mis uñas y el cabello queda impecable.', rating: 5 },
      { name: 'Isabella Mora', role: 'Clienta Regular', text: 'El ambiente es relajante y el personal súper profesional. Los tratamientos faciales han transformado mi piel.', rating: 5 },
    ],
    contact: { phone: '+503 2289-6543', email: 'citas@salonelite.com', address: 'Colonia Escalón, San Salvador' },
    seo: { title: 'Salón Belleza Elite | Estilistas Premium', description: 'Salón de belleza premium. Cortes, uñas y tratamientos faciales de lujo.' },
  }
}

function mockHotel() {
  return {
    businessName: 'Hotel Boutique Piedra Blanca', tagline: 'Lujo, Naturaleza y Confort',
    description: 'Hotel boutique de lujo con vista panorámica, spa privado y gastronomía de autor. La escapada perfecta para quienes buscan exclusividad.',
    primaryColor: '#1C1917', secondaryColor: '#FAFAF9', accentColor: '#D4AF70',
    font: 'Playfair Display', industry: 'Hotelería & Turismo', layoutVariant: 2,
    nav: { ctaText: 'Reservar' },
    hero: { headline: 'Donde el Lujo Abraza la Naturaleza', subheadline: 'Suite con vista al lago, spa privado y gastronomía de autor en un entorno único.', ctaText: 'Ver Habitaciones' },
    services: [
      { icon: '🛎️', title: 'Suites de Lujo', description: '32 suites únicas con vista panorámica, cama king size, bañera de hidromasaje y servicio de mayordomo 24/7.' },
      { icon: '💆', title: 'Spa & Bienestar', description: 'Spa privado con tratamientos exclusivos, piscina infinity y circuito de aguas termales para tu relajación total.' },
      { icon: '🍷', title: 'Gastronomía de Autor', description: 'Restaurante gourmet con ingredientes locales de temporada y carta de vinos seleccionada por sommelier.' },
    ],
    about: { title: 'Una Experiencia Única en su Clase', text: 'Hotel Piedra Blanca redefine el lujo boutique en la región. Cada detalle está pensado para crear recuerdos inolvidables. Nuestro equipo de 50 profesionales garantiza un servicio personalizado e impecable.' },
    testimonials: [
      { name: 'Roberto & Ana', role: 'Luna de Miel', text: 'El hotel perfecto para nuestra luna de miel. Vista espectacular, spa increíble y una atención que nos hizo sentir como realeza.', rating: 5 },
      { name: 'Ejecutivo Corp.', role: 'Cliente Business', text: 'Instalaciones perfectas para reuniones ejecutivas. Tecnología, privacidad y gastronomía de primer nivel.', rating: 5 },
    ],
    contact: { phone: '+503 2277-9900', email: 'reservas@hotelpiedral.com', address: 'Lago de Coatepeque, El Salvador' },
    seo: { title: 'Hotel Boutique Piedra Blanca | Lujo & Naturaleza', description: 'Hotel boutique de lujo con spa, gastronomía y vistas espectaculares.' },
  }
}

function mockInmobiliaria() {
  return {
    businessName: 'Prime Realty Group', tagline: 'Tu Hogar Ideal, Nuestro Compromiso',
    description: 'Agencia inmobiliaria líder con amplio portafolio de propiedades residenciales y comerciales. Asesoría integral para compra, venta y alquiler.',
    primaryColor: '#0F766E', secondaryColor: '#F0FDFA', accentColor: '#2DD4BF',
    font: 'Inter', industry: 'Inmobiliaria', layoutVariant: 1,
    nav: { ctaText: 'Buscar Propiedades' },
    hero: { headline: 'Encuentra tu Hogar Ideal', subheadline: 'Casas, apartamentos y locales comerciales. Asesoría gratuita de expertos.', ctaText: 'Ver Propiedades' },
    services: [
      { icon: '🏠', title: 'Propiedades Residenciales', description: 'Casas, apartamentos y condominios en las mejores zonas. Financiamiento disponible con las mejores tasas.' },
      { icon: '🏢', title: 'Inmuebles Comerciales', description: 'Locales, oficinas y bodegas estratégicamente ubicados para potenciar tu negocio.' },
      { icon: '📊', title: 'Valuación Gratuita', description: 'Valuación profesional de tu propiedad sin costo. Conoce el valor real de mercado hoy.' },
    ],
    about: { title: 'Expertos en Bienes Raíces', text: 'Con más de 10 años en el mercado inmobiliario, hemos concretado más de 1,500 transacciones exitosas. Nuestro equipo de 20 agentes certificados está comprometido con encontrar la propiedad perfecta para cada cliente.' },
    testimonials: [
      { name: 'Familia González', role: 'Compradores', text: 'Encontramos la casa de nuestros sueños gracias a Prime Realty. El proceso fue rápido, transparente y sin sorpresas.', rating: 5 },
      { name: 'Inversiones SA', role: 'Inversionista', text: 'El mejor rendimiento de alquiler lo encontré con su asesoría. Portafolio de 5 propiedades y creciendo.', rating: 5 },
    ],
    contact: { phone: '+503 2290-1234', email: 'info@primerealty.sv', address: 'Torre Futura, San Salvador' },
    seo: { title: 'Prime Realty | Bienes Raíces & Propiedades', description: 'Agencia inmobiliaria líder. Casas, apartamentos y locales comerciales.' },
  }
}

function mockClinica() {
  return {
    businessName: 'ClinicaSalud+', tagline: 'Tu Salud, Nuestra Misión',
    description: 'Clínica médica integral con especialistas en más de 15 áreas. Tecnología diagnóstica moderna y atención humanizada para toda la familia.',
    primaryColor: '#0369A1', secondaryColor: '#F0F9FF', accentColor: '#0EA5E9',
    font: 'Inter', industry: 'Salud & Medicina', layoutVariant: 1,
    nav: { ctaText: 'Agendar Cita' },
    hero: { headline: 'Tu Salud en las Mejores Manos', subheadline: 'Más de 20 especialistas y tecnología de última generación para tu bienestar.', ctaText: 'Agendar Cita' },
    services: [
      { icon: '🩺', title: 'Medicina General', description: 'Consultas médicas integrales, medicina preventiva y seguimiento de enfermedades crónicas con enfoque humano.' },
      { icon: '❤️', title: 'Cardiología', description: 'Especialistas en salud cardiovascular con equipos de diagnóstico de última generación.' },
      { icon: '👶', title: 'Pediatría', description: 'Cuidado integral del niño desde el nacimiento hasta la adolescencia.' },
    ],
    about: { title: 'Salud Integral para toda la Familia', text: 'ClinicaSalud+ fue fundada con la visión de democratizar el acceso a atención médica especializada de alta calidad. Más de 50,000 pacientes atendidos en 12 años de trayectoria.' },
    testimonials: [
      { name: 'Patricia Solano', role: 'Paciente', text: 'Atención rápida y profesional. Los médicos son empáticos y explican todo con claridad. Mi clínica de confianza.', rating: 5 },
      { name: 'Eduardo Méndez', role: 'Paciente', text: 'Diagnóstico preciso y oportuno. Las instalaciones son modernas y el trato es excelente en todos los departamentos.', rating: 5 },
    ],
    contact: { phone: '+503 2210-8800', email: 'citas@clinicasalud.com', address: 'Colonia Médica, San Salvador' },
    seo: { title: 'ClinicaSalud+ | Medicina Especializada', description: 'Clínica médica con más de 20 especialistas. Agenda tu cita online.' },
  }
}

function mockMarketing() {
  return {
    businessName: 'PixelLabs Digital Agency', tagline: 'Hacemos Crecer tu Negocio Online',
    description: 'Agencia de marketing digital especializada en SEO, paid media, redes sociales y desarrollo web para PYMEs y empresas en crecimiento.',
    primaryColor: '#4C1D95', secondaryColor: '#FAF5FF', accentColor: '#8B5CF6',
    font: 'Poppins', industry: 'Marketing & Digital', layoutVariant: 3,
    nav: { ctaText: 'Cotizar' },
    hero: { headline: 'Llevamos tu Negocio al Siguiente Nivel Digital', subheadline: 'SEO, Paid Media, Social Media y Web. Resultados medibles garantizados.', ctaText: 'Ver Portafolio' },
    services: [
      { icon: '🎯', title: 'Google Ads & SEO', description: 'Campañas de búsqueda pagada y posicionamiento orgánico para dominar Google en tu industria.' },
      { icon: '📱', title: 'Redes Sociales', description: 'Gestión y crecimiento de Instagram, Facebook y TikTok con contenido que convierte seguidores en clientes.' },
      { icon: '🌐', title: 'Diseño Web', description: 'Sitios web modernos, rápidos y optimizados para conversión diseñados para generar leads.' },
    ],
    about: { title: 'Tu Agencia de Confianza Digital', text: 'Con más de 200 proyectos ejecutados en 12 industrias diferentes, somos la agencia que combina creatividad con datos. Equipo de 15 especialistas certificados en Google, Meta y HubSpot.' },
    testimonials: [
      { name: 'Gerente TechCorp', role: 'Cliente 3 años', text: 'Incrementaron nuestro tráfico orgánico en 380% en 8 meses. ROI excepcional y reportes transparentes cada semana.', rating: 5 },
      { name: 'María Gutiérrez', role: 'Dueña de restaurante', text: 'Gracias a su gestión de redes aumenté reservas un 60%. El equipo es proactivo y siempre cumplen los plazos.', rating: 5 },
    ],
    contact: { phone: '+503 2268-9090', email: 'hola@pixellabs.digital', address: 'WeWork, San Salvador' },
    seo: { title: 'PixelLabs | Agencia de Marketing Digital', description: 'SEO, Google Ads y redes sociales. Hacemos crecer tu negocio online.' },
  }
}

function mockTech() {
  return {
    businessName: 'TechSolutions Pro', tagline: 'Tecnología que Transforma',
    description: 'Empresa de desarrollo de software y consultoría tecnológica. Aplicaciones web, móviles y sistemas empresariales a medida con tecnologías modernas.',
    primaryColor: '#0F172A', secondaryColor: '#F8FAFC', accentColor: '#6366F1',
    font: 'Inter', industry: 'Tecnología', layoutVariant: 3,
    nav: { ctaText: 'Cotizar Proyecto' },
    hero: { headline: 'Software a Medida que Impulsa tu Empresa', subheadline: 'Desarrollo web, apps móviles y sistemas cloud con tecnologías de vanguardia.', ctaText: 'Cotizar Gratis' },
    services: [
      { icon: '💻', title: 'Desarrollo Web', description: 'Aplicaciones web modernas con React, Vue y Next.js. Escalables, rápidas y con diseño premium.' },
      { icon: '📱', title: 'Apps Móviles', description: 'Aplicaciones nativas e híbridas para iOS y Android. De la idea al App Store en tiempo récord.' },
      { icon: '☁️', title: 'Cloud & DevOps', description: 'Migración a la nube, arquitectura moderna y pipelines CI/CD para máxima eficiencia operativa.' },
    ],
    about: { title: 'Innovación Tecnológica a tu Servicio', text: 'Fundada por ingenieros con experiencia en Silicon Valley y empresas Fortune 500. Llevamos tecnología de nivel enterprise a empresas medianas en Latinoamérica con presupuestos accesibles.' },
    testimonials: [
      { name: 'CEO StartupVerde', role: 'Cliente', text: 'Desarrollaron nuestra plataforma SaaS en 4 meses. Entrega puntual, código limpio y excelente comunicación en todo el proceso.', rating: 5 },
      { name: 'Director Retail Corp', role: 'Cliente Enterprise', text: 'La migración a la nube que realizaron redujo nuestros costos de infraestructura en un 40%. Resultado increíble.', rating: 5 },
    ],
    contact: { phone: '+503 2234-7890', email: 'proyectos@techsolutions.pro', address: 'Innovation Hub, San Salvador' },
    seo: { title: 'TechSolutions Pro | Desarrollo de Software', description: 'Desarrollo web, apps móviles y sistemas cloud a medida.' },
  }
}

function mockEducacion() {
  return {
    businessName: 'Academia Profesional Avanza', tagline: 'Aprende. Crece. Triunfa.',
    description: 'Academia de capacitación profesional con cursos presenciales y en línea. Certificados reconocidos por empresas líderes del sector.',
    primaryColor: '#1D4ED8', secondaryColor: '#EFF6FF', accentColor: '#3B82F6',
    font: 'Inter', industry: 'Educación', layoutVariant: 3,
    nav: { ctaText: 'Ver Cursos' },
    hero: { headline: 'Invierte en tu Futuro Profesional', subheadline: 'Cursos certificados en habilidades digitales, gestión y liderazgo empresarial.', ctaText: 'Ver Cursos →' },
    services: [
      { icon: '🎓', title: 'Cursos Certificados', description: 'Más de 50 cursos con certificación avalada por instituciones reconocidas. Modalidad presencial y online.' },
      { icon: '💼', title: 'Capacitación Empresarial', description: 'Programas in-company diseñados a medida para potenciar las capacidades de tu equipo de trabajo.' },
      { icon: '🚀', title: 'Bootcamps Intensivos', description: 'Programas de inmersión total de 4-12 semanas para dominar habilidades técnicas de alta demanda.' },
    ],
    about: { title: 'Formando Profesionales de Excelencia', text: 'Con 15 años de trayectoria, hemos formado a más de 10,000 profesionales. Nuestros instructores son expertos activos en la industria que aportan conocimiento real y actualizado.' },
    testimonials: [
      { name: 'Alejandro Ruiz', role: 'Egresado 2023', text: 'El bootcamp de programación cambió mi carrera completamente. A los 2 meses conseguí trabajo con salario 3x mayor.', rating: 5 },
      { name: 'HR Manager Corp', role: 'Empresa Cliente', text: 'La capacitación de nuestro equipo fue un éxito. Metodología práctica y resultados medibles desde la primera semana.', rating: 5 },
    ],
    contact: { phone: '+503 2256-4545', email: 'inscripciones@academiaavanza.com', address: 'Centro Empresarial, San Salvador' },
    seo: { title: 'Academia Avanza | Cursos y Certificaciones', description: 'Capacitación profesional certificada. Presencial y online.' },
  }
}

function mockConstruccion() {
  return {
    businessName: 'Construcciones Solidas SA', tagline: 'Construimos tus Sueños',
    description: 'Empresa constructora con experiencia en proyectos residenciales, comerciales e industriales. Calidad garantizada, plazos cumplidos.',
    primaryColor: '#92400E', secondaryColor: '#FFFBEB', accentColor: '#F59E0B',
    font: 'Montserrat', industry: 'Construcción', layoutVariant: 4,
    nav: { ctaText: 'Cotizar' },
    hero: { headline: 'Construimos con Calidad y Compromiso', subheadline: 'Proyectos residenciales, comerciales e industriales entregados a tiempo y dentro del presupuesto.', ctaText: 'Cotiza tu Proyecto' },
    services: [
      { icon: '🏠', title: 'Construcción Residencial', description: 'Casas y residencias construidas con los mejores materiales y acabados de primera calidad.' },
      { icon: '🏢', title: 'Proyectos Comerciales', description: 'Oficinas, locales y centros comerciales diseñados para maximizar funcionalidad y atractivo.' },
      { icon: '🔨', title: 'Remodelaciones', description: 'Transformamos espacios existentes con diseño moderno y ejecución precisa. Sem interrumpir tu vida.' },
    ],
    about: { title: '20 Años Construyendo Sueños', text: 'Fundada en 2004, hemos ejecutado más de 300 proyectos en todo el país. Equipo de 80 profesionales entre ingenieros, arquitectos y maestros de obra certificados.' },
    testimonials: [
      { name: 'Familia Castillo', role: 'Casa Residencial', text: 'Construyeron nuestra casa en el plazo acordado y respetando el presupuesto exacto. Calidad excepcional en cada detalle.', rating: 5 },
      { name: 'Empresas Del Valle', role: 'Local Comercial', text: 'El proyecto de nuestras oficinas quedó impecable. Comunicación constante y transparencia en todo el proceso.', rating: 5 },
    ],
    contact: { phone: '+503 2278-3344', email: 'proyectos@construccionessolidas.com', address: 'Carretera Panamericana, San Salvador' },
    seo: { title: 'Construcciones Sólidas | Empresa Constructora', description: 'Construcción residencial y comercial. 20 años de experiencia.' },
  }
}

function mockDefault() {
  return {
    businessName: 'Empresa Profesional', tagline: 'Excelencia en Cada Detalle',
    description: 'Empresa dedicada a brindar servicios profesionales de alta calidad con un enfoque personalizado para cada cliente. Experiencia, confianza y resultados.',
    primaryColor: '#1E3A5F', secondaryColor: '#F8FAFC', accentColor: '#00C896',
    font: 'Inter', industry: 'Servicios Profesionales',
    nav: { ctaText: 'Contactar' },
    hero: { headline: 'Soluciones Profesionales para tu Negocio', subheadline: 'Experiencia, calidad y compromiso en cada proyecto que emprendemos juntos.', ctaText: 'Conoce más' },
    services: [
      { icon: '⭐', title: 'Consultoría Estratégica', description: 'Análisis profundo de tu negocio y desarrollo de estrategias personalizadas para alcanzar tus objetivos.' },
      { icon: '🤝', title: 'Atención Personalizada', description: 'Servicio dedicado y asesoramiento continuo para garantizar tu satisfacción en cada etapa.' },
      { icon: '📈', title: 'Resultados Medibles', description: 'Metodología basada en datos y métricas claras para demostrar el impacto real de nuestro trabajo.' },
    ],
    about: { title: 'Comprometidos con tu Éxito', text: 'Somos un equipo de profesionales apasionados por lo que hacemos. Nuestra misión es ayudarte a alcanzar el máximo potencial de tu empresa con soluciones innovadoras y personalizadas.' },
    testimonials: [
      { name: 'Cliente Satisfecho', role: 'Empresa Mediana', text: 'El servicio superó nuestras expectativas. Profesionalismo, puntualidad y resultados tangibles desde el primer mes.', rating: 5 },
      { name: 'Emprendedor', role: 'Startup', text: 'El mejor equipo con el que hemos trabajado. Su dedicación y conocimiento marcaron la diferencia en nuestro proyecto.', rating: 5 },
    ],
    contact: { phone: '+503 2200-0000', email: 'info@empresa.com', address: 'San Salvador, El Salvador' },
    seo: { title: 'Empresa Profesional | Servicios de Calidad', description: 'Servicios profesionales con experiencia y compromiso.' },
  }
}




