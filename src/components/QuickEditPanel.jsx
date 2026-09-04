/**
 * QuickEditPanel — Premium Floating In-Context Editor
 * High-performance, intuitive, draggable pop-over editor for SiteGen AI.
 * Supports live preview updates, image & video uploads, preset libraries, theme palettes, and image-specific filters/styles.
 */
import { useEffect, useRef, useState } from 'react'
import { supabase } from '../lib/supabase'

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = () => reject(reader.error || new Error('No se pudo leer el archivo'))
    reader.readAsDataURL(file)
  })
}

const TC_SWATCHES = ['#ffffff', '#000000', '#111827', '#374151', '#6B7280', '#1E3A5F', '#4C1D95', '#064E3B', '#7F1D1D', '#9A3412']
const BG_SWATCHES = ['#6366F1', '#8B5CF6', '#10B981', '#F97316', '#EF4444', '#38BDF8', '#C9A84C', '#1E3A5F', '#0F172A', '#F9FAFB', '#ffffff', 'transparent']
const FONTS = [
  { l: 'Por defecto (Tema)', v: '' },
  { l: 'Playfair Display (Serif Elegante)', v: "'Playfair Display', Georgia, serif" },
  { l: 'Inter (Limpia & Moderna)', v: 'Inter, sans-serif' },
  { l: 'Plus Jakarta Sans (Editorial)', v: "'Plus Jakarta Sans', sans-serif" },
  { l: 'Poppins (Geométrica Redonda)', v: 'Poppins, sans-serif' },
  { l: 'DM Sans (Corporativa)', v: "'DM Sans', sans-serif" },
  { l: 'Montserrat (Fuerte & Impacto)', v: 'Montserrat, sans-serif' },
  { l: 'Outfit (Minimalista)', v: 'Outfit, sans-serif' },
]

const WEIGHTS = [
  { l: 'Normal', v: 400 },
  { l: 'Medio', v: 500 },
  { l: 'Semi', v: 600 },
  { l: 'Bold', v: 700 },
  { l: 'Extra', v: 800 },
  { l: 'Black', v: 900 },
]

// Preset stock photos
const PRESET_IMAGES = [
  { name: '🎵 Alabanza & Luces', url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1600&q=85&fit=crop' },
  { name: '🙏 Oración Comunitaria', url: 'https://images.unsplash.com/photo-1509021436471-18736672b71e?w=1600&q=85&fit=crop' },
  { name: '✝️ Cruz & Atardecer', url: 'https://images.unsplash.com/photo-1544427920-c49ccfb85579?w=1600&q=85&fit=crop' },
  { name: '🏛️ Auditorio Templo', url: 'https://images.unsplash.com/photo-1548625149-fc4a29cf7092?w=1600&q=85&fit=crop' },
  { name: '👨‍👩‍👧 Familia Feliz', url: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1600&q=85&fit=crop' },
  { name: '🌟 Jóvenes Unidos', url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1600&q=85&fit=crop' },
  { name: '📺 Prédica en Vivo', url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1600&q=85&fit=crop' },
  { name: '🍎 Pastores & Líderes', url: 'https://images.unsplash.com/photo-1477281765962-ef34e8bb0967?w=1600&q=85&fit=crop' },
  { name: '👶 Niños KidZone', url: 'https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?w=1600&q=85&fit=crop' },
  { name: '🎉 Evento Especial', url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1600&q=85&fit=crop' },
  { name: '🌅 Amanecer & Fe', url: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?w=1600&q=85&fit=crop' },
  { name: '🌿 Comunidad & Café', url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&q=85&fit=crop' },
  { name: '🎙️ Coro & Adoración', url: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?w=1600&q=85&fit=crop' },
  { name: '📖 Estudio Bíblico', url: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=1600&q=85&fit=crop' },
  { name: '💍 Matrimonios', url: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=1600&q=85&fit=crop' },
  { name: '🌃 Noche de Adoración', url: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=1600&q=85&fit=crop' },
  { name: '🕊️ Bautismos & Esperanza', url: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=1600&q=85&fit=crop' },
  { name: '☕ Bienvenida & Conexión', url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1600&q=85&fit=crop' },
  { name: '🎸 Banda en Vivo', url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1600&q=85&fit=crop' },
  { name: '🤝 Voluntarios & Servicio', url: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1600&q=85&fit=crop' },
]

// Preset videos
const PRESET_VIDEOS = [
  { name: '✨ Partículas de Gracia', url: 'https://assets.mixkit.co/videos/preview/mixkit-worship-lights-and-smoke-41527-large.mp4' },
  { name: '🌌 Luces de Adoración', url: 'https://assets.mixkit.co/videos/preview/mixkit-concert-lights-flashing-in-a-dark-stage-41525-large.mp4' },
  { name: '🌅 Atardecer Espiritual', url: 'https://assets.mixkit.co/videos/preview/mixkit-sun-setting-over-the-ocean-horizon-4061-large.mp4' },
  { name: '📖 Hojas de Biblia', url: 'https://assets.mixkit.co/videos/preview/mixkit-turning-pages-of-an-old-book-42861-large.mp4' },
]

function generateLogoSvgDataUrl(name, type, sub) {
  const cleanName = (name || 'Iglesia Cristiana').replace(/[<>&'"]/g, '').trim()
  const cleanSub = (sub || 'COMUNIDAD DE FE').replace(/[<>&'"]/g, '').trim()

  const len = cleanName.length
  let fontSize = 21
  let yPos = 44
  if (len > 30) { fontSize = 15; yPos = 40 }
  else if (len > 22) { fontSize = 17; yPos = 42 }
  else if (len > 14) { fontSize = 19; yPos = 43 }

  const svgWidth = Math.max(420, Math.min(620, 120 + len * 14))
  let iconSvg = ''

  if (type === 'gold_cross') {
    iconSvg = `
      <defs>
        <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#F59E0B" />
          <stop offset="50%" stop-color="#FBBF24" />
          <stop offset="100%" stop-color="#D97706" />
        </linearGradient>
      </defs>
      <circle cx="44" cy="44" r="36" stroke="url(#gold)" stroke-width="3" fill="none" opacity="0.8"/>
      <path d="M40 18 h8 v18 h18 v8 h-18 v26 h-8 v-26 h-18 v-8 h18 z" fill="url(#gold)"/>
      <circle cx="44" cy="27" r="3" fill="#FFFFFF"/>
    `
  } else if (type === 'dove') {
    iconSvg = `
      <defs>
        <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#38BDF8" />
          <stop offset="100%" stop-color="#0284C7" />
        </linearGradient>
        <linearGradient id="goldAccent" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#F59E0B" />
          <stop offset="100%" stop-color="#D97706" />
        </linearGradient>
      </defs>
      <path d="M40 16 L48 16 L48 32 L62 32 L62 38 L48 38 L48 70 L40 70 L40 38 L26 38 L26 32 L40 32 Z" fill="url(#goldAccent)"/>
      <path d="M 22 46 C 28 38, 42 32, 54 30 C 44 36, 40 44, 46 50 C 50 54, 54 50, 50 60 C 44 56, 38 58, 34 64 C 36 58, 30 52, 22 46 Z" fill="none" stroke="url(#blueGrad)" stroke-width="3.5" stroke-linecap="round"/>
      <circle cx="54" cy="30" r="2.5" fill="#38BDF8"/>
    `
  } else if (type === 'flame') {
    iconSvg = `
      <defs>
        <linearGradient id="flameG" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stop-color="#EF4444"/>
          <stop offset="50%" stop-color="#F97316"/>
          <stop offset="100%" stop-color="#FBBF24"/>
        </linearGradient>
      </defs>
      <path d="M 38 22 C 22 28, 12 40, 14 56 C 16 70, 36 78, 58 70 C 68 66, 74 58, 74 48 C 72 58, 64 66, 48 66 C 32 66, 22 56, 22 44 C 22 34, 28 26, 38 22 Z" fill="url(#flameG)"/>
      <path d="M 40 16 h8 v18 h16 v7 h-16 v26 h-8 v-26 h-16 v-7 h16 z" fill="#FFFFFF"/>
    `
  } else if (type === 'temple') {
    iconSvg = `
      <path d="M 44 14 L 44 26 M 38 18 L 50 18" stroke="#38BDF8" stroke-width="3" stroke-linecap="round"/>
      <path d="M 38 26 L 50 26 L 50 66 L 38 66 Z" fill="none" stroke="#FFFFFF" stroke-width="2.5"/>
      <path d="M 38 38 L 24 46 L 24 66 M 50 38 L 64 46 L 64 66" fill="none" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="18" y1="66" x2="70" y2="66" stroke="#38BDF8" stroke-width="3" stroke-linecap="round"/>
    `
  } else if (type === 'shield') {
    iconSvg = `
      <defs>
        <linearGradient id="goldS" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#F59E0B"/><stop offset="100%" stop-color="#78350F"/>
        </linearGradient>
      </defs>
      <path d="M44 16 L68 24 C68 50, 44 68, 44 72 C44 68, 20 50, 20 24 Z" fill="none" stroke="url(#goldS)" stroke-width="3.5"/>
      <path d="M40 28 h8 v14 h12 v7 h-12 v18 h-8 v-18 h-12 v-7 h12 z" fill="url(#goldS)"/>
    `
  } else if (type === 'star') {
    iconSvg = `
      <defs>
        <linearGradient id="cyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#06B6D4"/><stop offset="100%" stop-color="#3B82F6"/>
        </linearGradient>
      </defs>
      <polygon points="44,14 51,32 70,32 55,44 60,62 44,50 28,62 33,44 18,32 37,32" fill="none" stroke="url(#cyanGrad)" stroke-width="2.5"/>
      <path d="M41 24 h6 v14 h14 v6 h-14 v18 h-6 v-18 h-14 v-6 h14 z" fill="url(#cyanGrad)"/>
    `
  } else if (type === 'bible') {
    iconSvg = `
      <defs>
        <linearGradient id="goldB" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FBBF24"/><stop offset="100%" stop-color="#D97706"/>
        </linearGradient>
      </defs>
      <path d="M 20 48 Q 32 40, 44 46 Q 56 40, 68 48 L 68 66 Q 56 58, 44 64 Q 32 58, 20 66 Z" fill="none" stroke="#FFFFFF" stroke-width="2.5"/>
      <line x1="44" y1="46" x2="44" y2="64" stroke="#FFFFFF" stroke-width="2.5"/>
      <path d="M41 16 h6 v14 h14 v5 h-14 v15 h-6 v-15 h-14 v-5 h14 z" fill="url(#goldB)"/>
    `
  } else if (type === 'tree') {
    iconSvg = `
      <defs>
        <linearGradient id="treeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#10B981"/><stop offset="100%" stop-color="#047857"/>
        </linearGradient>
      </defs>
      <circle cx="44" cy="36" r="22" fill="url(#treeGrad)" opacity="0.85"/>
      <path d="M41 30 h6 v14 h12 v6 h-12 v22 h-6 v-22 h-12 v-6 h12 z" fill="#FFFFFF"/>
    `
  } else if (type === 'sun') {
    iconSvg = `
      <defs>
        <linearGradient id="sunGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#F59E0B"/><stop offset="100%" stop-color="#EF4444"/>
        </linearGradient>
      </defs>
      <circle cx="44" cy="44" r="28" fill="url(#sunGrad)" opacity="0.3"/>
      <path d="M44 12 L44 76 M12 44 L76 44" stroke="url(#sunGrad)" stroke-width="2.5" opacity="0.6"/>
      <path d="M40 22 h8 v16 h16 v8 h-16 v22 h-8 v-22 h-16 v-8 h16 z" fill="#FFFFFF"/>
    `
  } else if (type === 'shield_faith') {
    iconSvg = `
      <defs>
        <linearGradient id="crimson" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#DC2626"/><stop offset="100%" stop-color="#991B1B"/>
        </linearGradient>
      </defs>
      <path d="M44 14 L68 22 C68 48, 44 66, 44 70 C44 66, 20 48, 20 22 Z" fill="url(#crimson)"/>
      <path d="M41 24 h6 v14 h14 v6 h-14 v18 h-6 v-18 h-14 v-6 h14 z" fill="#FBBF24"/>
    `
  } else if (type === 'wave') {
    iconSvg = `
      <defs>
        <linearGradient id="waveG" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#06B6D4"/><stop offset="100%" stop-color="#0284C7"/>
        </linearGradient>
      </defs>
      <path d="M 18 56 Q 30 46, 44 56 T 70 56 L 70 66 Q 56 56, 44 66 T 18 66 Z" fill="url(#waveG)"/>
      <path d="M40 16 h8 v18 h18 v7 h-18 v22 h-8 v-22 h-18 v-7 h18 z" fill="#FFFFFF"/>
    `
  } else {
    iconSvg = `
      <defs>
        <linearGradient id="goldC" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FBBF24"/><stop offset="100%" stop-color="#B45309"/>
        </linearGradient>
      </defs>
      <path d="M 28 24 Q 44 18, 60 24 L 56 46 Q 44 56, 32 46 Z" fill="url(#goldC)"/>
      <line x1="44" y1="52" x2="44" y2="68" stroke="url(#goldC)" stroke-width="4"/>
      <line x1="30" y1="68" x2="58" y2="68" stroke="url(#goldC)" stroke-width="4" stroke-linecap="round"/>
      <path d="M42 28 h4 v10 h10 v4 h-10 v12 h-4 v-12 h-10 v-4 h10 z" fill="#FFFFFF"/>
    `
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${svgWidth} 88" width="${svgWidth}" height="88">
    <g transform="translate(4, 0)">
      ${iconSvg}
    </g>
    <text x="96" y="${yPos}" font-family="'Plus Jakarta Sans', 'Inter', sans-serif" font-size="${fontSize}" font-weight="900" fill="#FFFFFF">${cleanName}</text>
    <text x="97" y="65" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="800" fill="#94A3B8" letter-spacing="2.5">${cleanSub}</text>
  </svg>`

  if (typeof btoa !== 'undefined') {
    try {
      return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`
    } catch (e) {
      // fallback
    }
  }
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

function getPresetLogos(bizName = 'Iglesia Cristiana') {
  const name = bizName || 'Iglesia Cristiana'
  return [
    { name: '✝️ Cruz Elegante Dorada', url: generateLogoSvgDataUrl(name, 'gold_cross', 'ESPÍRITU & PAZ') },
    { name: '🕊️ Paloma & Paz', url: generateLogoSvgDataUrl(name, 'dove', 'GRACIA & VERDAD') },
    { name: '🔥 Fuego & Cruz', url: generateLogoSvgDataUrl(name, 'flame', 'FUEGO DE VIDA') },
    { name: '⛪ Templo & Llenura', url: generateLogoSvgDataUrl(name, 'temple', 'COMUNIDAD DE FE') },
    { name: '👑 Escudo & Corona', url: generateLogoSvgDataUrl(name, 'shield', 'REINO & GLORIA') },
    { name: '🌟 Estrella de Esperanza', url: generateLogoSvgDataUrl(name, 'star', 'LUZ DEL MUNDO') },
    { name: '📖 Biblia Abierta', url: generateLogoSvgDataUrl(name, 'bible', 'PALABRA VIVA') },
    { name: '🌿 Árbol de Vida', url: generateLogoSvgDataUrl(name, 'tree', 'CRECIMIENTO & FE') },
    { name: '☀️ Sol Cresta', url: generateLogoSvgDataUrl(name, 'sun', 'NUEVA VIDA') },
    { name: '🛡️ Escudo de Fe', url: generateLogoSvgDataUrl(name, 'shield_faith', 'FORTALEZA & VICTORIA') },
    { name: '🌊 Aguas de Vida', url: generateLogoSvgDataUrl(name, 'wave', 'RENOVACIÓN & ESPERANZA') },
    { name: '🍷 Cáliz & Gracia', url: generateLogoSvgDataUrl(name, 'chalice', 'COMUNIÓN & GRACIA') },
  ]
}

const SHADOW_PRESETS = [
  { label: 'Ninguna', value: 'none' },
  { label: 'Suave', value: '0 10px 25px rgba(0,0,0,0.15)' },
  { label: 'Elevada', value: '0 20px 40px rgba(0,0,0,0.3)' },
  { label: 'Glow Dorado', value: '0 0 30px rgba(234, 179, 8, 0.4)' },
  { label: 'Glow Neón', value: '0 0 30px rgba(99, 102, 241, 0.5)' },
]

export default function QuickEditPanel({ target, elementStyles, onUpdate, onUpdateBatch, onClose }) {
  const panelRef = useRef()
  const dragState = useRef(null)

  const [activeTab, setActiveTab] = useState('content') // 'content' | 'style' | 'layout'
  const [applyGlobal, setApplyGlobal] = useState(false)
  const [textVal, setTextVal] = useState('')
  const [curTC, setCurTC] = useState('')
  const [curBG, setCurBG] = useState('')
  const [curFW, setCurFW] = useState(0)
  const [curFS, setCurFS] = useState(0)   // font-size override
  const [curFF, setCurFF] = useState('')   // font-family override
  const [curLH, setCurLH] = useState(0)    // line-height override
  const [curOp, setCurOp] = useState(1)   // opacity override
  const [curMW, setCurMW] = useState('')   // max-width / stretch override
  const [curTA, setCurTA] = useState('')   // text-align / alignment override
  const [curPosX, setCurPosX] = useState(0) // translateX (mobility)
  const [curPosY, setCurPosY] = useState(0) // translateY (mobility)

  // Image / Media Specific Styles
  const [curObjectFit, setCurObjectFit] = useState('cover')
  const [curBorderRadius, setCurBorderRadius] = useState(0)
  const [curBrightness, setCurBrightness] = useState(100)
  const [curContrast, setCurContrast] = useState(100)
  const [curBlur, setCurBlur] = useState(0)
  const [curGrayscale, setCurGrayscale] = useState(0)
  const [curShadow, setCurShadow] = useState('none')

  const [pos, setPos] = useState(null)
  const [isUploading, setIsUploading] = useState(false)

  const [assets, setAssets] = useState([])
  const [loadingAssets, setLoadingAssets] = useState(false)
  const [imgMode, setImgMode] = useState('presets') // 'presets' | 'upload' | 'video' | 'url' | 'library'
  const [videoUrlInput, setVideoUrlInput] = useState('')

  // Configure position and initial values on target or elementStyles change
  useEffect(() => {
    if (!target) return
    const PW = target.type === 'image' ? 380 : 330
    const left = Math.min(Math.max(target.x || 20, 12), window.innerWidth - PW - 12)
    const top = Math.min(Math.max(target.y || 40, 12), window.innerHeight - 580)
    setPos({ left, top })

    setTextVal(target.value || '')
    setApplyGlobal(target.applyGlobalDefault === true)
    setCurTC(target.textColor || '')
    setCurBG(target.bgColor || '')
    setCurFW(target.fontWeight || 0)
    setCurFS(target.fontSize || 0)
    setCurFF(target.fontFamily || '')
    setCurLH(target.lineHeight || 0)
    setCurOp(target.opacity ?? 1)
    setCurMW(target.maxWidth || '')
    setCurTA(target.textAlign || '')

    // Load elementStyles overrides if available
    const ovKey = target.ovKey
    const allStyles = elementStyles || target.elementStyles || {}
    const st = (ovKey && allStyles[ovKey]) ? allStyles[ovKey] : {}

    setCurObjectFit(st.objectFit || 'cover')

    let br = 0
    if (st.borderRadius) {
      if (st.borderRadius === '999px' || st.borderRadius === '9999px' || st.borderRadius === '50%') {
        br = 999
      } else {
        br = parseInt(st.borderRadius, 10) || 0
      }
    }
    setCurBorderRadius(br)

    setCurShadow(st.boxShadow || 'none')

    // Parse filter string e.g. "brightness(110%) contrast(105%) blur(2px) grayscale(50%)"
    const filterStr = st.filter || ''
    const bMatch = filterStr.match(/brightness\((\d+)%\)/)
    const cMatch = filterStr.match(/contrast\((\d+)%\)/)
    const blMatch = filterStr.match(/blur\((\d+)px\)/)
    const gMatch = filterStr.match(/grayscale\((\d+)%\)/)

    setCurBrightness(bMatch ? parseInt(bMatch[1], 10) : 100)
    setCurContrast(cMatch ? parseInt(cMatch[1], 10) : 100)
    setCurBlur(blMatch ? parseInt(blMatch[1], 10) : 0)
    setCurGrayscale(gMatch ? parseInt(gMatch[1], 10) : 0)

    let initX = target.posX || 0
    let initY = target.posY || 0
    const tr = target.transform || st.transform
    if (tr) {
      const match = String(tr).match(/translate\(\s*(-?\d+)px\s*,\s*(-?\d+)px\s*\)/)
      if (match) {
        initX = parseInt(match[1], 10) || 0
        initY = parseInt(match[2], 10) || 0
      }
    }
    setCurPosX(initX)
    setCurPosY(initY)
  }, [target?.field, target?.ovKey])

  // Load cloud assets if editing an image
  useEffect(() => {
    if (target?.type !== 'image') return
    const fetchAssets = async () => {
      setLoadingAssets(true)
      try {
        const { data } = await supabase.storage
          .from('web_assets')
          .list('uploads', { sortBy: { column: 'created_at', order: 'desc' }, limit: 30 })
        if (data) {
          const urls = data
            .filter(f => f.name && f.name !== '.emptyFolderPlaceholder')
            .map(f => supabase.storage.from('web_assets').getPublicUrl(`uploads/${f.name}`).data.publicUrl)
          setAssets(urls)
        }
      } catch (err) {
        console.warn('[QuickEditPanel] Storage list failed:', err)
      }
      setLoadingAssets(false)
    }
    fetchAssets()
  }, [target?.type])

  // Close handlers
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    const onClick = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        onClose()
      }
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onClick)
    }
  }, [onClose])

  // Dragging logic
  const startDrag = (e) => {
    if (!pos) return
    dragState.current = { startX: e.clientX, startY: e.clientY, startLeft: pos.left, startTop: pos.top }
    const onMove = (ev) => {
      if (!dragState.current) return
      const dx = ev.clientX - dragState.current.startX
      const dy = ev.clientY - dragState.current.startY
      setPos({
        left: Math.min(Math.max(dragState.current.startLeft + dx, 10), window.innerWidth - 360),
        top: Math.min(Math.max(dragState.current.startTop + dy, 10), window.innerHeight - 200)
      })
    }
    const onUp = () => {
      dragState.current = null
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onUp)
    }
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
    e.preventDefault()
  }

  if (!target || !pos) return null

  const { ovKey, field, label, value, type = 'text' } = target
  const isLogoField = Boolean(
    (field && String(field).toLowerCase().includes('logo')) ||
    (label && String(label).toLowerCase().includes('logo')) ||
    target?.isLogo
  )
  const activePresetLogos = getPresetLogos(target?.businessName || 'Iglesia Cristiana')

  // Palette derivation helper
  const derivePalette = (hex) => {
    if (!hex || hex.length < 7) return {}
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    const h = n => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, '0')
    return {
      primary: `#${h(r * 0.22)}${h(g * 0.22)}${h(b * 0.22)}`,
      secondary: `#${h(r + (255 - r) * 0.9)}${h(g + (255 - g) * 0.9)}${h(b + (255 - b) * 0.9)}`,
    }
  }

  // Value update actions
  const onText = (v) => {
    setTextVal(v)
    onUpdate(field, v)
  }

  const pickImage = (url) => {
    setTextVal(url)
    if (field === 'heroImage') {
      onUpdateBatch([['heroVideo', null], ['heroImage', url]])
    } else {
      onText(url)
    }
  }

  const pickVideo = (vUrl) => {
    if (field === 'heroImage') {
      onUpdateBatch([['heroVideo', vUrl]])
    } else {
      onText(vUrl)
    }
  }

  const onTC = (v) => {
    setCurTC(v)
    if (applyGlobal) {
      onUpdateBatch([
        ['primaryColor', v],
        ...(ovKey ? [[`elementStyles.${ovKey}.textColor`, null]] : []),
      ])
    } else if (ovKey) {
      onUpdate(`elementStyles.${ovKey}.textColor`, v)
    }
  }

  const onBG = (v) => {
    const color = v === 'transparent' ? '' : v
    setCurBG(color)
    if (applyGlobal && color) {
      const pal = derivePalette(color)
      onUpdateBatch([
        ['accentColor', color],
        ['primaryColor', pal.primary],
        ['secondaryColor', pal.secondary],
        ...(ovKey ? [[`elementStyles.${ovKey}.bgColor`, null], [`elementStyles.${ovKey}.boxShadow`, null]] : []),
      ])
    } else if (applyGlobal && !color) {
      onUpdateBatch([['accentColor', color]])
    } else if (ovKey) {
      onUpdateBatch([
        [`elementStyles.${ovKey}.bgColor`, color],
        [`elementStyles.${ovKey}.boxShadow`, 'none'],
      ])
    }
  }

  const onFW = (v) => {
    setCurFW(v)
    if (ovKey) onUpdate(`elementStyles.${ovKey}.fontWeight`, v)
  }

  const onFS = (v) => {
    setCurFS(v)
    if (ovKey) onUpdate(`elementStyles.${ovKey}.fontSize`, v ? `${v}px` : null)
  }

  const onOp = (v) => {
    setCurOp(v)
    if (ovKey) onUpdate(`elementStyles.${ovKey}.opacity`, v)
  }

  const onFF = (v) => {
    setCurFF(v)
    if (ovKey) onUpdate(`elementStyles.${ovKey}.fontFamily`, v || null)
  }

  const onLH = (v) => {
    setCurLH(v)
    if (ovKey) onUpdate(`elementStyles.${ovKey}.lineHeight`, v || null)
  }

  const onMW = (v) => {
    setCurMW(v)
    if (ovKey) onUpdate(`elementStyles.${ovKey}.maxWidth`, v ? (typeof v === 'number' ? `${v}px` : v) : null)
  }

  const onTA = (v) => {
    setCurTA(v)
    if (ovKey) {
      let marginVal = null
      if (v === 'center') marginVal = '0 auto'
      if (v === 'right') marginVal = '0 0 0 auto'
      if (v === 'left') marginVal = '0 auto 0 0'
      onUpdateBatch([
        [`elementStyles.${ovKey}.textAlign`, v],
        ...(marginVal ? [[`elementStyles.${ovKey}.margin`, marginVal]] : []),
      ])
    }
  }

  const onPosX = (val) => {
    setCurPosX(val)
    if (ovKey) {
      const transformStr = (val !== 0 || curPosY !== 0) ? `translate(${val}px, ${curPosY}px)` : null
      onUpdate(`elementStyles.${ovKey}.transform`, transformStr)
    }
  }

  const onPosY = (val) => {
    setCurPosY(val)
    if (ovKey) {
      const transformStr = (curPosX !== 0 || val !== 0) ? `translate(${curPosX}px, ${val}px)` : null
      onUpdate(`elementStyles.${ovKey}.transform`, transformStr)
    }
  }

  // Image Style Handlers
  const onObjectFitChange = (val) => {
    setCurObjectFit(val)
    if (ovKey) onUpdate(`elementStyles.${ovKey}.objectFit`, val)
  }

  const onBorderRadiusChange = (val) => {
    setCurBorderRadius(val)
    if (ovKey) onUpdate(`elementStyles.${ovKey}.borderRadius`, val ? (typeof val === 'number' ? `${val}px` : val) : null)
  }

  const onShadowChange = (val) => {
    setCurShadow(val)
    if (ovKey) onUpdate(`elementStyles.${ovKey}.boxShadow`, val === 'none' ? null : val)
  }

  const updateFilterCss = (b, c, blurVal, g) => {
    if (!ovKey) return
    const parts = []
    if (b !== 100) parts.push(`brightness(${b}%)`)
    if (c !== 100) parts.push(`contrast(${c}%)`)
    if (blurVal > 0) parts.push(`blur(${blurVal}px)`)
    if (g > 0) parts.push(`grayscale(${g}%)`)
    const filterCss = parts.length > 0 ? parts.join(' ') : null
    onUpdate(`elementStyles.${ovKey}.filter`, filterCss)
  }

  const onReset = () => {
    if (ovKey) onUpdate(`elementStyles.${ovKey}`, null)
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const isVideo = file.type.startsWith('video/')

    try {
      setIsUploading(true)
      let url = null

      try {
        const fileExt = file.name.split('.').pop()
        const fileName = `${Math.random()}.${fileExt}`
        const filePath = `uploads/${fileName}`
        const { error: uploadError } = await supabase.storage.from('web_assets').upload(filePath, file)
        if (uploadError) throw uploadError
        url = supabase.storage.from('web_assets').getPublicUrl(filePath).data?.publicUrl || null
      } catch (cloudErr) {
        console.warn('[QuickEditPanel] Supabase Storage upload error:', cloudErr.message)
      }

      if (!url) {
        url = await fileToDataUrl(file)
      }

      if (field === 'heroImage' && isVideo) {
        onUpdateBatch([['heroVideo', url]])
      } else if (field === 'heroImage') {
        onUpdateBatch([['heroVideo', null], ['heroImage', url]])
      } else {
        onText(url)
      }
    } catch (err) {
      console.error('Error al subir archivo:', err)
      alert('Error al procesar el archivo: ' + err.message)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div
      ref={panelRef}
      style={{
        position: 'fixed',
        top: pos.top,
        left: pos.left,
        zIndex: 99999,
        width: type === 'image' ? 380 : 340,
        background: '#FFFFFF',
        borderRadius: 18,
        boxShadow: '0 20px 60px rgba(15, 23, 42, 0.25), 0 4px 16px rgba(0,0,0,0.08)',
        border: '1px solid #E2E8F0',
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        maxHeight: '88vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        animation: 'quickEditFade 0.18s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <style>{`
        @keyframes quickEditFade {
          from { opacity: 0; transform: scale(0.96) translateY(-4px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>

      {/* ── HEADER (DRAGGABLE) ── */}
      <div
        onMouseDown={startDrag}
        style={{
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'grab',
          borderBottom: '1px solid #F1F5F9',
          background: '#F8FAFC',
          userSelect: 'none',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
          <div style={{ color: '#94A3B8', display: 'flex', alignItems: 'center', cursor: 'grab' }}>
            <svg viewBox="0 0 12 20" width="8" height="14" fill="currentColor">
              <circle cx="3" cy="4" r="1.8"/><circle cx="9" cy="4" r="1.8"/>
              <circle cx="3" cy="10" r="1.8"/><circle cx="9" cy="10" r="1.8"/>
              <circle cx="3" cy="16" r="1.8"/><circle cx="9" cy="16" r="1.8"/>
            </svg>
          </div>

          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              background: type === 'image' ? 'linear-gradient(135deg, #10B981, #059669)' : 'linear-gradient(135deg, #6366F1, #4F46E5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: type === 'image' ? '0 2px 6px rgba(16,185,129,0.3)' : '0 2px 6px rgba(99,102,241,0.3)',
            }}
          >
            {type === 'image' ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" width="14" height="14">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21 15 16 10 5 21"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" width="14" height="14">
                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
            )}
          </div>

          <div style={{ minWidth: 0 }}>
            <div style={{ fontWeight: 800, fontSize: '0.84rem', color: '#0F172A', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 170 }}>
              {label || (type === 'image' ? 'Imagen de Sección' : 'Edición Rápida')}
            </div>
            <div style={{ fontSize: '0.65rem', color: '#64748B', fontWeight: 600 }}>
              {field || 'Propiedad activa'}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }} onMouseDown={e => e.stopPropagation()}>
          {ovKey && (
            <button
              onClick={onReset}
              title="Restablecer estilos personalizados"
              style={{
                border: 'none',
                background: '#FEF2F2',
                borderRadius: 7,
                cursor: 'pointer',
                padding: '4px 8px',
                fontSize: '0.68rem',
                fontWeight: 700,
                color: '#EF4444',
              }}
            >
              Reset
            </button>
          )}
          <button
            onClick={onClose}
            title="Cerrar panel (Esc)"
            style={{
              border: 'none',
              background: '#E2E8F0',
              borderRadius: 7,
              cursor: 'pointer',
              width: 24,
              height: 24,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#475569',
              transition: 'all 0.15s',
            }}
          >
            ✕
          </button>
        </div>
      </div>

      {/* ── TAB NAVIGATOR ── */}
      <div style={{ display: 'flex', borderBottom: '1px solid #F1F5F9', background: '#FFFFFF', padding: '4px 6px 0' }}>
        <button
          onClick={() => setActiveTab('content')}
          style={{
            flex: 1,
            padding: '8px 4px',
            border: 'none',
            background: 'none',
            borderBottom: activeTab === 'content' ? '2px solid #6366F1' : '2px solid transparent',
            color: activeTab === 'content' ? '#6366F1' : '#64748B',
            fontWeight: activeTab === 'content' ? 800 : 600,
            fontSize: '0.74rem',
            cursor: 'pointer',
            transition: 'all 0.15s',
          }}
        >
          {type === 'image' ? '📷 Imagen / Video' : '✏️ Texto'}
        </button>
        <button
          onClick={() => setActiveTab('style')}
          style={{
            flex: 1,
            padding: '8px 4px',
            border: 'none',
            background: 'none',
            borderBottom: activeTab === 'style' ? '2px solid #6366F1' : '2px solid transparent',
            color: activeTab === 'style' ? '#6366F1' : '#64748B',
            fontWeight: activeTab === 'style' ? 800 : 600,
            fontSize: '0.74rem',
            cursor: 'pointer',
            transition: 'all 0.15s',
          }}
        >
          🎨 Estilo
        </button>
        <button
          onClick={() => setActiveTab('layout')}
          style={{
            flex: 1,
            padding: '8px 4px',
            border: 'none',
            background: 'none',
            borderBottom: activeTab === 'layout' ? '2px solid #6366F1' : '2px solid transparent',
            color: activeTab === 'layout' ? '#6366F1' : '#64748B',
            fontWeight: activeTab === 'layout' ? 800 : 600,
            fontSize: '0.74rem',
            cursor: 'pointer',
            transition: 'all 0.15s',
          }}
        >
          📐 Posición
        </button>
      </div>

      {/* ── BODY SCROLLABLE CONTENT ── */}
      <div style={{ flex: 1, overflowY: 'auto', padding: 16 }}>

        {/* ── TAB 1: CONTENT (IMAGE / VIDEO / TEXT) ── */}
        {activeTab === 'content' && (
          <div>
            {type === 'image' ? (
              <div>
                {/* CURRENT IMAGE PREVIEW */}
                {value && (
                  <div style={{ borderRadius: 12, overflow: 'hidden', height: 110, background: '#0F172A', border: '1px solid #E2E8F0', marginBottom: 14, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', padding: isLogoField ? 8 : 0 }}>
                    {/\.(mp4|webm|mov)(\?|$)/i.test(value) ? (
                      <video src={value} autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <img src={value} alt="Preview" style={{ width: '100%', height: '100%', objectFit: isLogoField ? 'contain' : 'cover' }} />
                    )}
                    <div style={{ position: 'absolute', bottom: 8, right: 8, background: 'rgba(15,23,42,0.85)', color: '#fff', fontSize: '0.64rem', padding: '3px 9px', borderRadius: 999, fontWeight: 800, backdropFilter: 'blur(4px)' }}>
                      {/\.(mp4|webm|mov)(\?|$)/i.test(value) ? '🎥 Video actual' : isLogoField ? '🏷️ Logo actual' : '🖼️ Imagen actual'}
                    </div>
                  </div>
                )}

                {/* IMAGE SUB-TABS */}
                <div style={{ display: 'flex', gap: 4, background: '#F1F5F9', borderRadius: 10, padding: 3, marginBottom: 14 }}>
                  {[
                    { id: 'presets', label: '⭐ Ejemplos' },
                    { id: 'upload', label: '📁 Subir' },
                    !isLogoField && { id: 'video', label: '🎥 Video' },
                    { id: 'url', label: '🔗 URL' },
                    { id: 'library', label: '🖼️ Mis Subidas' },
                  ].filter(Boolean).map(m => (
                    <button
                      key={m.id}
                      onClick={() => setImgMode(m.id)}
                      style={{
                        flex: 1,
                        padding: '6px 2px',
                        borderRadius: 7,
                        border: 'none',
                        background: imgMode === m.id ? '#FFFFFF' : 'transparent',
                        color: imgMode === m.id ? '#6366F1' : '#64748B',
                        fontWeight: imgMode === m.id ? 800 : 600,
                        fontSize: '0.68rem',
                        cursor: 'pointer',
                        boxShadow: imgMode === m.id ? '0 1px 4px rgba(0,0,0,0.1)' : 'none',
                        transition: 'all 0.15s',
                      }}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>

                {/* MODE 1: STOCK PRESET GALERÍA */}
                {imgMode === 'presets' && (
                  <div>
                    <div style={{ fontSize: '0.68rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
                      {isLogoField ? 'Galería de Logos de Ejemplo (1 Clic para Aplicar)' : 'Galería de Fotos de Ejemplo (1 Clic para Aplicar)'}
                    </div>
                    {isLogoField ? (
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: 8, maxHeight: 250, overflowY: 'auto', paddingRight: 2 }}>
                        {activePresetLogos.map((preset, idx) => (
                          <button
                            key={idx}
                            onClick={() => pickImage(preset.url)}
                            style={{
                              padding: 6,
                              borderRadius: 10,
                              border: value === preset.url ? '2px solid #6366F1' : '1px solid #CBD5E1',
                              background: value === preset.url ? '#EEF2FF' : '#0F172A',
                              cursor: 'pointer',
                              textAlign: 'left',
                              overflow: 'hidden',
                              transition: 'all 0.15s',
                            }}
                          >
                            <img src={preset.url} style={{ width: '100%', height: 56, objectFit: 'contain', borderRadius: 6 }} alt={preset.name} />
                            <div style={{ fontSize: '0.68rem', fontWeight: 800, color: '#F8FAFC', marginTop: 4, textAlign: 'center' }}>
                              {preset.name}
                            </div>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, maxHeight: 240, overflowY: 'auto', paddingRight: 2 }}>
                        {PRESET_IMAGES.map((preset, idx) => (
                          <button
                            key={idx}
                            onClick={() => pickImage(preset.url)}
                            style={{
                              padding: 4,
                              borderRadius: 10,
                              border: value === preset.url ? '2px solid #6366F1' : '1px solid #E2E8F0',
                              background: value === preset.url ? '#EEF2FF' : '#FFFFFF',
                              cursor: 'pointer',
                              textAlign: 'left',
                              overflow: 'hidden',
                              transition: 'all 0.15s',
                            }}
                          >
                            <img src={preset.url} style={{ width: '100%', height: 50, objectFit: 'cover', borderRadius: 7 }} alt={preset.name} />
                            <div style={{ fontSize: '0.66rem', fontWeight: 800, color: '#0F172A', marginTop: 4, textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {preset.name}
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* MODE 2: UPLOAD FILE */}
                {imgMode === 'upload' && (
                  <label
                    style={{
                      display: 'block',
                      width: '100%',
                      padding: '28px 16px',
                      background: '#F8FAFC',
                      border: '2px dashed #CBD5E1',
                      borderRadius: 12,
                      cursor: isUploading ? 'wait' : 'pointer',
                      textAlign: 'center',
                      transition: 'all 0.2s',
                    }}
                    onMouseOver={e => (e.currentTarget.style.borderColor = '#6366F1')}
                    onMouseOut={e => (e.currentTarget.style.borderColor = '#CBD5E1')}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="#6366F1" strokeWidth="2" width="32" height="32" style={{ margin: '0 auto 10px' }}>
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                      <polyline points="17 8 12 3 7 8"/>
                      <line x1="12" y1="3" x2="12" y2="15"/>
                    </svg>
                    <div style={{ fontSize: '0.86rem', fontWeight: 800, color: '#0F172A', marginBottom: 4 }}>
                      {isUploading ? 'Subiendo archivo...' : 'Haz clic para seleccionar Imagen o Video'}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: '#64748B', lineHeight: 1.4 }}>
                      Soporta JPG, PNG, WEBP o MP4/MOV de video (hasta 15MB)
                    </div>
                    <input type="file" accept="image/*,video/mp4,video/webm,video/quicktime" style={{ display: 'none' }} onChange={handleImageUpload} disabled={isUploading} />
                  </label>
                )}

                {/* MODE 3: VIDEO SELECTOR & URL */}
                {imgMode === 'video' && (
                  <div>
                    <div style={{ marginBottom: 12 }}>
                      <label style={{ fontSize: '0.68rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: 6 }}>
                        Enlace de Video (MP4 / WebM):
                      </label>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <input
                          type="text"
                          value={videoUrlInput || value || ''}
                          onChange={e => setVideoUrlInput(e.target.value)}
                          placeholder="https://assets.mixkit.co/video.mp4"
                          style={{
                            flex: 1,
                            padding: '8px 10px',
                            border: '1.5px solid #CBD5E1',
                            borderRadius: 8,
                            fontSize: '0.8rem',
                            outline: 'none',
                          }}
                        />
                        <button
                          onClick={() => videoUrlInput && pickVideo(videoUrlInput)}
                          style={{
                            padding: '8px 14px',
                            background: '#6366F1',
                            color: '#fff',
                            border: 'none',
                            borderRadius: 8,
                            fontWeight: 800,
                            fontSize: '0.74rem',
                            cursor: 'pointer'
                          }}
                        >
                          Aplicar
                        </button>
                      </div>
                    </div>

                    <div style={{ fontSize: '0.68rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
                      Ejemplos de Videos de Fondo (1 Clic)
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
                      {PRESET_VIDEOS.map((vPreset, idx) => (
                        <button
                          key={idx}
                          onClick={() => pickVideo(vPreset.url)}
                          style={{
                            padding: 8,
                            borderRadius: 10,
                            border: value === vPreset.url ? '2px solid #6366F1' : '1px solid #E2E8F0',
                            background: value === vPreset.url ? '#EEF2FF' : '#F8FAFC',
                            cursor: 'pointer',
                            textAlign: 'left',
                            transition: 'all 0.15s',
                          }}
                        >
                          <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#0F172A', display: 'flex', alignItems: 'center', gap: 4 }}>
                            <span>🎥</span> {vPreset.name}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* MODE 4: DIRECT IMAGE URL */}
                {imgMode === 'url' && (
                  <div>
                    <label style={{ fontSize: '0.68rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: 6 }}>
                      Enlace directo de imagen (URL HTTP/HTTPS):
                    </label>
                    <input
                      type="text"
                      value={value || ''}
                      onChange={e => pickImage(e.target.value)}
                      placeholder="https://images.unsplash.com/photo-..."
                      style={{
                        width: '100%',
                        padding: '9px 12px',
                        border: '1.5px solid #CBD5E1',
                        borderRadius: 10,
                        fontSize: '0.82rem',
                        outline: 'none',
                        boxSizing: 'border-box',
                        background: '#FFFFFF',
                      }}
                    />
                  </div>
                )}

                {/* MODE 5: CLOUD ASSETS LIBRARY */}
                {imgMode === 'library' && (
                  <div>
                    <div style={{ fontSize: '0.68rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
                      Tus Subidas Recientes {loadingAssets && <span style={{ color: '#6366F1' }}>(cargando...)</span>}
                    </div>
                    {assets.length === 0 ? (
                      <div style={{ textAlign: 'center', padding: 24, color: '#94A3B8', fontSize: '0.76rem', background: '#F8FAFC', borderRadius: 10 }}>
                        No tienes archivos subidos aún.
                      </div>
                    ) : (
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6, maxHeight: 180, overflowY: 'auto' }}>
                        {assets.map((src, i) => (
                          <div
                            key={i}
                            onClick={() => pickImage(src)}
                            style={{
                              aspectRatio: '1',
                              borderRadius: 8,
                              background: '#F1F5F9',
                              cursor: 'pointer',
                              border: value === src ? '2px solid #6366F1' : '1px solid transparent',
                              overflow: 'hidden',
                              position: 'relative',
                            }}
                          >
                            <img src={src} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="asset" />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div>
                {/* TEXT INPUT OR TEXTAREA */}
                {type === 'textarea' || (typeof value === 'string' && value.length > 50) ? (
                  <div>
                    <label style={{ display: 'block', fontSize: '0.68rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>
                      Texto del elemento
                    </label>
                    <textarea
                      value={textVal}
                      onChange={e => onText(e.target.value)}
                      rows={4}
                      autoFocus
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        border: '1.5px solid #CBD5E1',
                        borderRadius: 10,
                        fontSize: '0.84rem',
                        fontFamily: 'inherit',
                        lineHeight: 1.5,
                        color: '#0F172A',
                        outline: 'none',
                        boxSizing: 'border-box',
                        background: '#FFFFFF',
                        resize: 'vertical',
                      }}
                      onFocus={e => (e.target.style.borderColor = '#6366F1')}
                      onBlur={e => (e.target.style.borderColor = '#CBD5E1')}
                    />
                  </div>
                ) : (
                  <div>
                    <label style={{ display: 'block', fontSize: '0.68rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>
                      Texto del elemento
                    </label>
                    <input
                      type="text"
                      value={textVal}
                      onChange={e => onText(e.target.value)}
                      autoFocus
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        border: '1.5px solid #CBD5E1',
                        borderRadius: 10,
                        fontSize: '0.84rem',
                        fontFamily: 'inherit',
                        color: '#0F172A',
                        outline: 'none',
                        boxSizing: 'border-box',
                        background: '#FFFFFF',
                      }}
                      onFocus={e => (e.target.style.borderColor = '#6366F1')}
                      onBlur={e => (e.target.style.borderColor = '#CBD5E1')}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ── TAB 2: STYLES & FILTERS (DEDICATED FOR IMAGE VS TEXT) ── */}
        {activeTab === 'style' && (
          <div>
            {type === 'image' ? (
              <div>
                {/* 1. AJUSTE DE IMAGEN (OBJECT FIT) */}
                <div style={{ marginBottom: 14 }}>
                  <label style={{ display: 'block', fontSize: '0.68rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>
                    Ajuste de Imagen (Encuadre)
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
                    {[
                      { id: 'cover', l: '🖼️ Cubrir' },
                      { id: 'contain', l: '🔍 Completa' },
                      { id: 'fill', l: '↔️ Rellenar' },
                    ].map(fit => (
                      <button
                        key={fit.id}
                        onClick={() => onObjectFitChange(fit.id)}
                        style={{
                          padding: '7px 4px',
                          borderRadius: 8,
                          border: `1.5px solid ${curObjectFit === fit.id ? '#6366F1' : '#E2E8F0'}`,
                          background: curObjectFit === fit.id ? '#EEF2FF' : '#FFFFFF',
                          color: curObjectFit === fit.id ? '#4338CA' : '#0F172A',
                          fontWeight: 700,
                          fontSize: '0.72rem',
                          cursor: 'pointer'
                        }}
                      >
                        {fit.l}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. BORDES REDONDEADOS (BORDER RADIUS) */}
                <div style={{ marginBottom: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <label style={{ fontSize: '0.68rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      Bordes Redondeados
                    </label>
                    <span style={{ fontWeight: 800, fontSize: '0.8rem', color: '#6366F1' }}>
                      {curBorderRadius === 999 ? 'Círculo / Óvalo' : `${curBorderRadius}px`}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: 4, marginBottom: 8 }}>
                    {[
                      { l: '0px', v: 0 },
                      { l: '12px', v: 12 },
                      { l: '24px', v: 24 },
                      { l: 'Óvalo', v: 999 },
                    ].map(b => (
                      <button
                        key={b.l}
                        onClick={() => onBorderRadiusChange(b.v)}
                        style={{
                          flex: 1,
                          padding: '5px 2px',
                          borderRadius: 6,
                          border: `1.5px solid ${curBorderRadius === b.v ? '#6366F1' : '#E2E8F0'}`,
                          background: curBorderRadius === b.v ? '#EEF2FF' : '#FFFFFF',
                          color: curBorderRadius === b.v ? '#4338CA' : '#0F172A',
                          fontWeight: 700,
                          fontSize: '0.7rem',
                          cursor: 'pointer'
                        }}
                      >
                        {b.l}
                      </button>
                    ))}
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={60}
                    step={2}
                    value={curBorderRadius === 999 ? 60 : curBorderRadius}
                    onChange={e => onBorderRadiusChange(Number(e.target.value))}
                    style={{ width: '100%', accentColor: '#6366F1' }}
                  />
                </div>

                {/* 3. SOMBRA DE IMAGEN (BOX SHADOW) */}
                <div style={{ marginBottom: 14 }}>
                  <label style={{ display: 'block', fontSize: '0.68rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>
                    Sombra & Resplandor (Glow)
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 6 }}>
                    {SHADOW_PRESETS.map(sPreset => (
                      <button
                        key={sPreset.label}
                        onClick={() => onShadowChange(sPreset.value)}
                        style={{
                          padding: '7px 6px',
                          borderRadius: 8,
                          border: `1.5px solid ${curShadow === sPreset.value ? '#6366F1' : '#E2E8F0'}`,
                          background: curShadow === sPreset.value ? '#EEF2FF' : '#FFFFFF',
                          color: curShadow === sPreset.value ? '#4338CA' : '#0F172A',
                          fontWeight: 700,
                          fontSize: '0.72rem',
                          cursor: 'pointer',
                          textAlign: 'center',
                        }}
                      >
                        {sPreset.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. FILTROS VISUALES (BRILLO, CONTRASTE, DESENFOQUE, ESCALA DE GRISES) */}
                <div style={{ background: '#F8FAFC', borderRadius: 12, padding: 12, border: '1px solid #E2E8F0', marginBottom: 14 }}>
                  <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>
                    🎛️ Filtros & Aspectos Visuales
                  </div>

                  {/* BRILLO */}
                  <div style={{ marginBottom: 10 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', fontWeight: 700, color: '#475569', marginBottom: 4 }}>
                      <span>☀️ Brillo</span>
                      <span>{curBrightness}%</span>
                    </div>
                    <input
                      type="range"
                      min={30}
                      max={150}
                      step={5}
                      value={curBrightness}
                      onChange={e => {
                        const val = Number(e.target.value)
                        setCurBrightness(val)
                        updateFilterCss(val, curContrast, curBlur, curGrayscale)
                      }}
                      style={{ width: '100%', accentColor: '#6366F1' }}
                    />
                  </div>

                  {/* CONTRASTE */}
                  <div style={{ marginBottom: 10 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', fontWeight: 700, color: '#475569', marginBottom: 4 }}>
                      <span>☯️ Contraste</span>
                      <span>{curContrast}%</span>
                    </div>
                    <input
                      type="range"
                      min={50}
                      max={150}
                      step={5}
                      value={curContrast}
                      onChange={e => {
                        const val = Number(e.target.value)
                        setCurContrast(val)
                        updateFilterCss(curBrightness, val, curBlur, curGrayscale)
                      }}
                      style={{ width: '100%', accentColor: '#6366F1' }}
                    />
                  </div>

                  {/* DESENFOQUE (BLUR) */}
                  <div style={{ marginBottom: 10 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', fontWeight: 700, color: '#475569', marginBottom: 4 }}>
                      <span>💧 Desenfoque (Blur)</span>
                      <span>{curBlur}px</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={20}
                      step={1}
                      value={curBlur}
                      onChange={e => {
                        const val = Number(e.target.value)
                        setCurBlur(val)
                        updateFilterCss(curBrightness, curContrast, val, curGrayscale)
                      }}
                      style={{ width: '100%', accentColor: '#6366F1' }}
                    />
                  </div>

                  {/* ESCALA DE GRISES */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', fontWeight: 700, color: '#475569', marginBottom: 4 }}>
                      <span>📷 Blanco y Negro (Grayscale)</span>
                      <span>{curGrayscale}%</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      step={10}
                      value={curGrayscale}
                      onChange={e => {
                        const val = Number(e.target.value)
                        setCurGrayscale(val)
                        updateFilterCss(curBrightness, curContrast, curBlur, val)
                      }}
                      style={{ width: '100%', accentColor: '#6366F1' }}
                    />
                  </div>
                </div>

                {/* OPACIDAD DE LA IMAGEN */}
                <div style={{ marginBottom: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <label style={{ fontSize: '0.68rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      Opacidad de Imagen
                    </label>
                    <span style={{ fontWeight: 800, fontSize: '0.8rem', color: '#6366F1' }}>
                      {Math.round(curOp * 100)}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0.1}
                    max={1}
                    step={0.05}
                    value={curOp}
                    onChange={e => onOp(Number(e.target.value))}
                    style={{ width: '100%', accentColor: '#6366F1' }}
                  />
                </div>

                {/* COLOR DE FONDO DEL CONTENEDOR */}
                <div style={{ marginBottom: 14 }}>
                  <label style={{ display: 'block', fontSize: '0.68rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>
                    Color de Fondo del Contenedor
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <input
                      type="color"
                      value={curBG || '#ffffff'}
                      onChange={e => onBG(e.target.value)}
                      style={{ width: 34, height: 34, borderRadius: 8, border: '1.5px solid #CBD5E1', cursor: 'pointer', padding: 2, flexShrink: 0 }}
                    />
                    <input
                      value={curBG || ''}
                      onChange={e => onBG(e.target.value)}
                      placeholder="Transparente / Fondo"
                      style={{
                        flex: 1,
                        padding: '7px 10px',
                        border: '1.5px solid #CBD5E1',
                        borderRadius: 8,
                        fontSize: '0.8rem',
                        outline: 'none',
                      }}
                    />
                  </div>
                </div>
              </div>
            ) : (
              /* TEXT STYLE CONTROLS FOR NON-IMAGE ELEMENTS */
              <div>
                {/* Global vs Local Switcher */}
                <div
                  style={{
                    padding: '10px 12px',
                    background: applyGlobal ? '#EEF2FF' : '#F8FAFC',
                    border: `1.5px solid ${applyGlobal ? '#6366F1' : '#E2E8F0'}`,
                    borderRadius: 10,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 14,
                  }}
                >
                  <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 800, color: applyGlobal ? '#4338CA' : '#0F172A' }}>
                      {applyGlobal ? '🌐 Aplicar en toda la página' : '🎯 Solo este elemento'}
                    </div>
                    <div style={{ fontSize: '0.64rem', color: '#64748B', marginTop: 1 }}>
                      {applyGlobal ? 'Modifica los colores del tema global' : 'Aplica un estilo único a este bloque'}
                    </div>
                  </div>
                  <button
                    onClick={() => setApplyGlobal(g => !g)}
                    style={{
                      width: 40,
                      height: 22,
                      borderRadius: 999,
                      border: 'none',
                      cursor: 'pointer',
                      position: 'relative',
                      flexShrink: 0,
                      background: applyGlobal ? '#6366F1' : '#CBD5E1',
                      transition: 'background 0.2s',
                    }}
                  >
                    <span
                      style={{
                        position: 'absolute',
                        top: 2,
                        left: applyGlobal ? 20 : 2,
                        width: 18,
                        height: 18,
                        borderRadius: '50%',
                        background: '#FFFFFF',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                        transition: 'left 0.2s',
                      }}
                    />
                  </button>
                </div>

                {/* COLOR DEL TEXTO */}
                <div style={{ marginBottom: 14 }}>
                  <label style={{ display: 'block', fontSize: '0.68rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>
                    Color del Texto
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <input
                      type="color"
                      value={curTC || '#000000'}
                      onChange={e => onTC(e.target.value)}
                      style={{ width: 34, height: 34, borderRadius: 8, border: '1.5px solid #CBD5E1', cursor: 'pointer', padding: 2, flexShrink: 0 }}
                    />
                    <input
                      value={curTC || ''}
                      onChange={e => onTC(e.target.value)}
                      placeholder="#000000"
                      style={{
                        flex: 1,
                        padding: '7px 10px',
                        border: '1.5px solid #CBD5E1',
                        borderRadius: 8,
                        fontSize: '0.8rem',
                        outline: 'none',
                      }}
                    />
                  </div>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {TC_SWATCHES.map(c => (
                      <button
                        key={c}
                        onClick={() => onTC(c)}
                        style={{
                          width: 22,
                          height: 22,
                          borderRadius: '50%',
                          background: c,
                          border: `2px solid ${curTC === c ? '#6366F1' : 'rgba(0,0,0,0.1)'}`,
                          cursor: 'pointer',
                          padding: 0,
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* COLOR DE FONDO */}
                <div style={{ marginBottom: 14 }}>
                  <label style={{ display: 'block', fontSize: '0.68rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>
                    Color de Fondo / Acento
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <input
                      type="color"
                      value={curBG || '#ffffff'}
                      onChange={e => onBG(e.target.value)}
                      style={{ width: 34, height: 34, borderRadius: 8, border: '1.5px solid #CBD5E1', cursor: 'pointer', padding: 2, flexShrink: 0 }}
                    />
                    <input
                      value={curBG || ''}
                      onChange={e => onBG(e.target.value)}
                      placeholder="Vacío = acento"
                      style={{
                        flex: 1,
                        padding: '7px 10px',
                        border: '1.5px solid #CBD5E1',
                        borderRadius: 8,
                        fontSize: '0.8rem',
                        outline: 'none',
                      }}
                    />
                  </div>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {BG_SWATCHES.map(c => (
                      <button
                        key={c}
                        onClick={() => onBG(c)}
                        style={{
                          width: 22,
                          height: 22,
                          borderRadius: '50%',
                          background: c,
                          border: `2px solid ${curBG === c ? '#6366F1' : 'rgba(0,0,0,0.1)'}`,
                          cursor: 'pointer',
                          padding: 0,
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* PESO DE LA FUENTE */}
                <div style={{ marginBottom: 14 }}>
                  <label style={{ display: 'block', fontSize: '0.68rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>
                    Grosor de la Fuente (Peso)
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
                    {WEIGHTS.map(w => (
                      <button
                        key={w.v}
                        onClick={() => onFW(w.v)}
                        style={{
                          padding: '6px 4px',
                          borderRadius: 8,
                          border: `1.5px solid ${curFW === w.v ? '#6366F1' : '#E2E8F0'}`,
                          background: curFW === w.v ? '#EEF2FF' : '#FFFFFF',
                          color: curFW === w.v ? '#4338CA' : '#0F172A',
                          fontWeight: w.v,
                          fontSize: '0.72rem',
                          cursor: 'pointer',
                        }}
                      >
                        {w.l}
                      </button>
                    ))}
                  </div>
                </div>

                {/* TAMAÑO DE FUENTE */}
                {ovKey && (
                  <div style={{ marginBottom: 14 }}>
                    <label style={{ display: 'block', fontSize: '0.68rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>
                      Tamaño de Fuente
                    </label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <input
                        type="range"
                        min={10}
                        max={120}
                        step={1}
                        value={curFS || 16}
                        onChange={e => onFS(Number(e.target.value))}
                        style={{ flex: 1, accentColor: '#6366F1' }}
                      />
                      <span style={{ fontWeight: 800, fontSize: '0.8rem', color: '#374151', minWidth: 36, textAlign: 'right' }}>
                        {curFS || 16}px
                      </span>
                    </div>
                  </div>
                )}

                {/* TIPO DE LETRA (FONT FAMILY) */}
                {ovKey && (
                  <div style={{ marginBottom: 14 }}>
                    <label style={{ display: 'block', fontSize: '0.68rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>
                      Tipo de Letra (Tipografía)
                    </label>
                    <select
                      value={curFF || ''}
                      onChange={e => onFF(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        border: '1.5px solid #CBD5E1',
                        borderRadius: 9,
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        color: '#0F172A',
                        background: '#FFFFFF',
                        outline: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      {FONTS.map(f => (
                        <option key={f.v} value={f.v} style={{ fontFamily: f.v || 'inherit' }}>
                          {f.l}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* ALINEACIÓN HORIZONTAL */}
                <div style={{ marginBottom: 14 }}>
                  <label style={{ display: 'block', fontSize: '0.68rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>
                    Alineación del Bloque
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
                    {[
                      { id: 'left', l: '⬅️ Izquierda' },
                      { id: 'center', l: '↔️ Centro' },
                      { id: 'right', l: '➡️ Derecha' },
                    ].map(a => (
                      <button
                        key={a.id}
                        onClick={() => onTA(a.id)}
                        style={{
                          padding: '7px 4px',
                          borderRadius: 8,
                          border: `1.5px solid ${curTA === a.id ? '#6366F1' : '#E2E8F0'}`,
                          background: curTA === a.id ? '#EEF2FF' : '#FFFFFF',
                          color: curTA === a.id ? '#4338CA' : '#0F172A',
                          fontWeight: 700,
                          fontSize: '0.72rem',
                          cursor: 'pointer'
                        }}
                      >
                        {a.l}
                      </button>
                    ))}
                  </div>
                </div>

                {/* INTERLINEADO (ALTURA DE LÍNEA) */}
                {ovKey && (
                  <div style={{ marginBottom: 14 }}>
                    <label style={{ display: 'block', fontSize: '0.68rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>
                      Interlineado (Espaciado de Líneas)
                    </label>
                    <div style={{ display: 'flex', gap: 5, marginBottom: 8 }}>
                      {[
                        { l: '1.0', v: 1.0 },
                        { l: '1.2', v: 1.2 },
                        { l: '1.4', v: 1.4 },
                        { l: '1.6', v: 1.6 },
                        { l: '2.0', v: 2.0 },
                      ].map(lh => (
                        <button
                          key={lh.v}
                          onClick={() => onLH(lh.v)}
                          style={{
                            flex: 1,
                            padding: '5px 2px',
                            borderRadius: 6,
                            border: `1.5px solid ${curLH === lh.v ? '#6366F1' : '#E2E8F0'}`,
                            background: curLH === lh.v ? '#EEF2FF' : '#FFFFFF',
                            color: curLH === lh.v ? '#4338CA' : '#0F172A',
                            fontWeight: 700,
                            fontSize: '0.7rem',
                            cursor: 'pointer'
                          }}
                        >
                          {lh.l}
                        </button>
                      ))}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <input
                        type="range"
                        min={0.8}
                        max={3.0}
                        step={0.1}
                        value={curLH || 1.2}
                        onChange={e => onLH(Number(e.target.value))}
                        style={{ flex: 1, accentColor: '#6366F1' }}
                      />
                      <span style={{ fontWeight: 800, fontSize: '0.8rem', color: '#374151', minWidth: 36, textAlign: 'right' }}>
                        {curLH || 1.2}
                      </span>
                    </div>
                  </div>
                )}

                {/* OPACIDAD */}
                {ovKey && (
                  <div style={{ marginBottom: 14 }}>
                    <label style={{ display: 'block', fontSize: '0.68rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>
                      Opacidad del Elemento
                    </label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <input
                        type="range"
                        min={0.05}
                        max={1}
                        step={0.05}
                        value={curOp}
                        onChange={e => onOp(Number(e.target.value))}
                        style={{ flex: 1, accentColor: '#6366F1' }}
                      />
                      <span style={{ fontWeight: 800, fontSize: '0.8rem', color: '#374151', minWidth: 36, textAlign: 'right' }}>
                        {Math.round(curOp * 100)}%
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ── TAB 3: POSICIÓN Y TAMAÑO (LAYOUT & MOBILITY) ── */}
        {activeTab === 'layout' && (
          <div>
            {/* POSICIÓN HORIZONTAL X */}
            <div style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <label style={{ fontSize: '0.68rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Posición Horizontal (X)
                </label>
                <span style={{ fontWeight: 800, fontSize: '0.8rem', color: '#6366F1' }}>
                  {curPosX > 0 ? `+${curPosX}px` : `${curPosX}px`}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <input
                  type="range"
                  min={-400}
                  max={400}
                  step={5}
                  value={curPosX}
                  onChange={e => onPosX(Number(e.target.value))}
                  style={{ flex: 1, accentColor: '#6366F1' }}
                />
                <input
                  type="number"
                  value={curPosX}
                  onChange={e => onPosX(Number(e.target.value) || 0)}
                  style={{ width: 56, padding: '4px 6px', border: '1.5px solid #CBD5E1', borderRadius: 7, fontSize: '0.78rem', fontWeight: 700, textAlign: 'center' }}
                />
              </div>
            </div>

            {/* POSICIÓN VERTICAL Y */}
            <div style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <label style={{ fontSize: '0.68rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Posición Vertical (Y)
                </label>
                <span style={{ fontWeight: 800, fontSize: '0.8rem', color: '#6366F1' }}>
                  {curPosY > 0 ? `+${curPosY}px` : `${curPosY}px`}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <input
                  type="range"
                  min={-400}
                  max={400}
                  step={5}
                  value={curPosY}
                  onChange={e => onPosY(Number(e.target.value))}
                  style={{ flex: 1, accentColor: '#6366F1' }}
                />
                <input
                  type="number"
                  value={curPosY}
                  onChange={e => onPosY(Number(e.target.value) || 0)}
                  style={{ width: 56, padding: '4px 6px', border: '1.5px solid #CBD5E1', borderRadius: 7, fontSize: '0.78rem', fontWeight: 700, textAlign: 'center' }}
                />
              </div>
            </div>

            {/* ANCHO MÁXIMO / ESTIRAR (MAX-WIDTH) */}
            <div style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <label style={{ fontSize: '0.68rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Ancho Máximo / Estirar
                </label>
                <span style={{ fontWeight: 800, fontSize: '0.8rem', color: '#6366F1' }}>
                  {curMW || '100%'}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <input
                  type="range"
                  min={100}
                  max={1200}
                  step={20}
                  value={parseInt(curMW, 10) || 600}
                  onChange={e => onMW(Number(e.target.value))}
                  style={{ flex: 1, accentColor: '#6366F1' }}
                />
                <button
                  onClick={() => onMW('')}
                  style={{ padding: '4px 8px', borderRadius: 6, border: '1.5px solid #CBD5E1', background: '#FFFFFF', fontSize: '0.7rem', fontWeight: 700, cursor: 'pointer' }}
                >
                  Auto
                </button>
              </div>
            </div>

            {/* RESTABLECER POSICIÓN Y TAMAÑO */}
            <button
              onClick={() => {
                onPosX(0)
                onPosY(0)
                onMW('')
                onTA('')
              }}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: 9,
                border: '1px solid #FCA5A5',
                background: '#FEF2F2',
                color: '#EF4444',
                fontWeight: 800,
                fontSize: '0.76rem',
                cursor: 'pointer',
                marginTop: 6,
              }}
            >
              🔄 Restablecer Posición y Tamaño Original
            </button>
          </div>
        )}
      </div>

      {/* ── FOOTER ACTION BAR (APLICAR & GUARDAR) ── */}
      <div
        style={{
          padding: '12px 16px',
          background: '#F8FAFC',
          borderTop: '1px solid #F1F5F9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: 10,
        }}
      >
        <button
          onClick={onClose}
          style={{
            width: '100%',
            padding: '10px 16px',
            borderRadius: 10,
            border: 'none',
            background: 'linear-gradient(135deg, #10B981, #059669)',
            color: '#FFFFFF',
            fontWeight: 800,
            fontSize: '0.84rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.25)',
            transition: 'all 0.15s',
          }}
        >
          ✓ Guardar y Listo
        </button>
      </div>
    </div>
  )
}
