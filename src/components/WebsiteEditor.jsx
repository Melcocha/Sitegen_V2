/**
 * WebsiteEditor — Professional No-Code Editor
 * Level: Framer / Wix / Webflow quality sidebar
 * Features: Typography, nav links, service editor, color pickers,
 *           font family + size controls, icon picker, about, contact, SEO
 */

import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { generateChurchLogoSvg } from '../lib/aiGenerator'
import CropperModal from './CropperModal'
import {
  Palette, Type, Phone, Globe, AlignLeft, Layout,
  ChevronDown, ChevronRight, Plus, Trash2, GripVertical,
  Star, Image, Search, Sparkles, MessageSquare, Users, Link as LinkIcon, Upload,
  Heart, Calendar, Video, BookOpen, Layers, Settings, Sliders, Radio, DollarSign, MessageCircle
} from 'lucide-react'

// ─── Google Fonts available ───────────────────────────────────────
const FONTS = [
  'Inter', 'Poppins', 'Montserrat', 'Lato', 'Raleway',
  'Playfair Display', 'Merriweather', 'Oswald', 'Nunito', 'Roboto',
]

// ─── Full Site Themes (complete visual identity) ───────────────────
const THEMES = [
  {
    name: 'Nucleus Cyan (Iglesia)',
    emoji: '⛪',
    mood: 'Moderno · Inspirador',
    primary: '#0F172A', secondary: '#F8FAFC', accent: '#00D8F6',
    font: 'Playfair Display', headingWeight: 900,
  },
  {
    name: 'Navy & Oro (Iglesia)',
    emoji: '🕊️',
    mood: 'Solemne · Acogedor',
    primary: '#0B132B', secondary: '#F5F0E8', accent: '#E5A93C',
    font: 'Playfair Display', headingWeight: 800,
  },
  {
    name: 'Corporativo Azul',
    emoji: '🏢',
    mood: 'Serio · Profesional',
    primary: '#1E3A5F', secondary: '#F5F0E8', accent: '#C9A84C',
    font: 'Inter', headingWeight: 800,
  },
  {
    name: 'Violeta SaaS',
    emoji: '💜',
    mood: 'Digital · Moderno',
    primary: '#312E81', secondary: '#EEF2FF', accent: '#818CF8',
    font: 'Inter', headingWeight: 900,
  },
  {
    name: 'Oro & Negro',
    emoji: '✨',
    mood: 'Lujo · Elegante',
    primary: '#111111', secondary: '#FFFBEB', accent: '#F59E0B',
    font: 'Playfair Display', headingWeight: 700,
  },
  {
    name: 'Slate Tecnología',
    emoji: '⚙️',
    mood: 'Técnico · Preciso',
    primary: '#0F172A', secondary: '#F8FAFC', accent: '#38BDF8',
    font: 'Roboto', headingWeight: 800,
  },
  {
    name: 'Blanco Minimal',
    emoji: '🤍',
    mood: 'Limpio · Editorial',
    primary: '#1C1C1E', secondary: '#FFFFFF', accent: '#1C1C1E',
    font: 'Inter', headingWeight: 900,
  },
]

// ─── SVG icons for services / values ──────────────────────────────
const SERVICE_ICONS = [
  { id: 'shield',   svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
  { id: 'star',     svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> },
  { id: 'zap',      svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> },
  { id: 'check',    svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg> },
  { id: 'globe',    svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg> },
  { id: 'users',    svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg> },
  { id: 'heart',    svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg> },
  { id: 'home',     svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
  { id: 'book',     svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg> },
]

// ─── Shared components ────────────────────────────────────────────
const S = {
  label: { display:'block', fontSize:'.69rem', fontWeight:700, color:'#9CA3AF', textTransform:'uppercase', letterSpacing:'.06em', marginBottom:5 },
  input: { width:'100%', padding:'8px 10px', border:'1.5px solid #E5E7EB', borderRadius:8, fontSize:'.8125rem', fontFamily:'inherit', color:'#111827', outline:'none', boxSizing:'border-box', background:'#fff' },
  textarea: { width:'100%', padding:'8px 10px', border:'1.5px solid #E5E7EB', borderRadius:8, fontSize:'.8125rem', fontFamily:'inherit', resize:'vertical', color:'#111827', outline:'none', boxSizing:'border-box', background:'#fff' },
  row: { marginBottom:13 },
  divider: { height:1, background:'#F3F4F6', margin:'14px 0' },
  addBtn: { width:'100%', display:'flex', alignItems:'center', justifyContent:'center', gap:6, padding:'8px', border:'1.5px dashed #D1D5DB', borderRadius:9, background:'transparent', cursor:'pointer', fontSize:'.78rem', fontWeight:600, color:'#6B7280', fontFamily:'inherit' },
}

function Field({ label, value, onChange, multiline, placeholder, type='text', min, max, step }) {
  const focusStyle = (e) => e.target.style.borderColor = '#6366F1'
  const blurStyle  = (e) => e.target.style.borderColor = '#E5E7EB'
  return (
    <div style={S.row}>
      {label && <label style={S.label}>{label}</label>}
      {multiline
        ? <textarea rows={3} value={value||''} onChange={e=>onChange(e.target.value)} placeholder={placeholder} style={S.textarea} onFocus={focusStyle} onBlur={blurStyle} />
        : <input type={type} value={value??''} onChange={e=>onChange(type==='number'?Number(e.target.value):e.target.value)} placeholder={placeholder} style={S.input} step={step} min={min} max={max} onFocus={focusStyle} onBlur={blurStyle} />
      }
    </div>
  )
}

function fileToDataUrl(fileOrBlob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = () => reject(reader.error || new Error('No se pudo leer el archivo'))
    reader.readAsDataURL(fileOrBlob)
  })
}

function ImageUploadBox({ label, imageUrl, onUpload, onClear, useCropper }) {
  const [uploading, setUploading] = useState(false)
  const [cropSrc, setCropSrc] = useState(null)

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    
    if (useCropper) {
      const reader = new FileReader()
      reader.addEventListener('load', () => setCropSrc(reader.result))
      reader.readAsDataURL(file)
      return
    }
    await uploadToSupabase(file)
  }

  const uploadToSupabase = async (blob) => {
    setUploading(true)
    try {
      const fileExt = blob.name ? blob.name.split('.').pop() : 'png'
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `uploads/${fileName}`
      
      const { error: uploadError } = await supabase.storage
        .from('web_assets')
        .upload(filePath, blob)
        
      if (uploadError) throw uploadError
      const { data } = supabase.storage.from('web_assets').getPublicUrl(filePath)
      onUpload(data.publicUrl)
    } catch (error) {
      console.warn('Supabase storage upload failed or offline, using Data URL fallback:', error)
      try {
        const dataUrl = await fileToDataUrl(blob)
        onUpload(dataUrl)
      } catch (err) {
        alert('Error procesando la imagen.')
      }
    } finally {
      setUploading(false)
    }
  }

  const handleCropComplete = async (croppedBlob) => {
    setCropSrc(null)
    await uploadToSupabase(croppedBlob)
  }

  return (
    <div style={{ marginTop: 10 }}>
      {cropSrc && (
        <CropperModal 
          imageSrc={cropSrc} 
          onCropComplete={handleCropComplete} 
          onCancel={() => setCropSrc(null)} 
        />
      )}
      {label && <label style={S.label}>{label}</label>}
      {imageUrl ? (
        <div style={{ position:'relative', borderRadius:10, overflow:'hidden', marginBottom:8, height:80, background:'#FAFAFA', display:'flex', alignItems:'center', justifyContent:'center', border:'1.5px solid #E5E7EB' }}>
          <img src={imageUrl} alt="preview" style={{ maxWidth:'100%', maxHeight:'100%', objectFit:'contain' }} />
          <button onClick={onClear} style={{ position:'absolute', top:5, right:5, border:'none', background:'rgba(0,0,0,.55)', borderRadius:'50%', width:22, height:22, cursor:'pointer', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', padding:0 }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="11" height="11"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
      ) : null}
      <div style={{ display:'flex', gap:7 }}>
        <label style={{ flex:1, padding:'8px 10px', border:'1.5px dashed #D1D5DB', borderRadius:9, cursor: uploading?'default':'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:6, fontSize:'.75rem', color:'#6B7280', fontWeight:600, background:uploading?'#F3F4F6':'#FAFAFA', opacity: uploading?0.7:1 }}>
          <Upload size={14} />
          {uploading ? 'Subiendo...' : 'Subir imagen'}
          <input type="file" accept="image/*" style={{ display:'none' }} disabled={uploading} onChange={handleFileChange} />
        </label>
      </div>
    </div>
  )
}

function Section({ title, icon, badge, children, isOpen, onToggle }) {
  return (
    <div style={{ borderBottom:'1px solid #F3F4F6' }}>
      <button onClick={onToggle} style={{ width:'100%', padding:'13px 18px', display:'flex', alignItems:'center', justifyContent:'space-between', background: isOpen?'#FAFAFA':'transparent', border:'none', cursor:'pointer', fontWeight:700, fontSize:'.84rem', color:'#111827', fontFamily:'inherit', transition:'background .12s' }}>
        <span style={{ display:'flex', alignItems:'center', gap:9, color:'#374151' }}>
          <span style={{ color: isOpen?'#6366F1':'#9CA3AF', transition:'color .15s' }}>{icon}</span>
          {title}
          {badge && <span style={{ padding:'1px 7px', background:'#EEF2FF', color:'#6366F1', borderRadius:999, fontSize:'.65rem', fontWeight:700 }}>{badge}</span>}
        </span>
        <span style={{ color: isOpen?'#6366F1':'#9CA3AF', transition:'transform .2s, color .15s', display:'inline-flex', transform: isOpen?'rotate(0)':'rotate(-90deg)' }}>
          <ChevronDown size={14} />
        </span>
      </button>
      {isOpen && <div style={{ padding:'4px 18px 18px' }}>{children}</div>}
    </div>
  )
}

function FontPicker({ value, onChange }) {
  return (
    <div style={S.row}>
      <label style={S.label}>Tipografía</label>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:5 }}>
        {FONTS.map(f => (
          <button key={f} onClick={()=>onChange(f)}
            style={{ padding:'7px 8px', borderRadius:8, border:`1.5px solid ${value===f?'#6366F1':'#E5E7EB'}`, background: value===f?'#EEF2FF':'#fff', cursor:'pointer', fontSize:'.75rem', fontWeight: value===f?700:500, color: value===f?'#4338CA':'#374151', fontFamily:`'${f}', sans-serif`, textAlign:'center', transition:'all .15s' }}
          >{f}</button>
        ))}
      </div>
    </div>
  )
}

function ColorRow({ label, value, onChange }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:10 }}>
      <input type="color" value={value||'#6366F1'} onChange={e=>onChange(e.target.value)}
        style={{ width:36, height:36, borderRadius:8, border:'2px solid #E5E7EB', cursor:'pointer', padding:2, flexShrink:0 }} />
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ fontSize:'.75rem', fontWeight:600, color:'#374151' }}>{label}</div>
        <div style={{ fontSize:'.68rem', color:'#9CA3AF', fontFamily:'monospace' }}>{value}</div>
      </div>
    </div>
  )
}

function IconPicker({ value, onChange }) {
  const [open, setOpen] = useState(false)
  const current = SERVICE_ICONS.find(i=>i.id===value) || SERVICE_ICONS[0]
  return (
    <div style={{ position:'relative' }}>
      <button onClick={()=>setOpen(!open)}
        style={{ display:'flex', alignItems:'center', gap:6, padding:'6px 10px', border:'1.5px solid #E5E7EB', borderRadius:8, background:'#F9FAFB', cursor:'pointer', color:'#374151', fontFamily:'inherit', fontSize:'.75rem', fontWeight:600 }}>
        {current.svg} Ícono <ChevronDown size={11} />
      </button>
      {open && (
        <div style={{ position:'absolute', top:'100%', left:0, zIndex:50, background:'#fff', border:'1px solid #E5E7EB', borderRadius:12, padding:8, display:'grid', gridTemplateColumns:'repeat(6,1fr)', gap:4, boxShadow:'0 8px 24px rgba(0,0,0,0.12)', marginTop:4, width:220 }}>
          {SERVICE_ICONS.map(ic => (
            <button key={ic.id} onClick={()=>{ onChange(ic.id); setOpen(false) }}
              style={{ width:30, height:30, borderRadius:7, border:`1.5px solid ${value===ic.id?'#6366F1':'transparent'}`, background: value===ic.id?'#EEF2FF':'#F9FAFB', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', color: value===ic.id?'#6366F1':'#6B7280', padding:0 }}>
              {ic.svg}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function NavLinksEditor({ links, onChange }) {
  const [dragIdx, setDragIdx]   = useState(null)
  const [overIdx, setOverIdx]   = useState(null)
  const [expandUrl, setExpandUrl] = useState({})

  const DEFAULT_LINKS = [
    { label: 'Inicio',            text: 'Inicio',            href: '#wp-hero'       },
    { label: 'Planifica tu Visita', text: 'Planifica tu Visita', href: '#wp-plan-visit' },
    { label: 'Próximos Pasos',    text: 'Próximos Pasos',    href: '#wp-next-steps' },
    { label: 'Ministerios',       text: 'Ministerios',       href: '#wp-ministries' },
    { label: 'Mensajes',          text: 'Mensajes',          href: '#wp-sermons'    },
    { label: 'Contacto',          text: 'Contacto',          href: '#wp-contact'    },
  ]

  const normalize = (arr) => (arr && arr.length > 0 ? arr : DEFAULT_LINKS).map(l => {
    if (typeof l === 'string') {
      return { label: l, text: l, href: `#${l.toLowerCase().replace(/\s+/g, '-')}` }
    }
    const txt = l.text || l.label || l.name || l.title || ''
    return { ...l, label: txt, text: txt }
  })

  const current = normalize(links)

  const updateLink = (i, field, val) => {
    const n = current.map((lk, j) => j === i ? {
      ...lk,
      [field]: val,
      ...(field === 'label' ? { text: val } : {}),
      ...(field === 'text' ? { label: val } : {})
    } : lk)
    onChange(n)
  }
  const remove = (i) => onChange(current.filter((_, j) => j !== i))
  const add    = ()  => onChange([...current, { label: 'Nuevo link', text: 'Nuevo link', href: '#nuevo-link' }])

  const onDragStart = (e, i) => {
    setDragIdx(i)
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', i)
  }
  const onDragOver = (e, i) => {
    e.preventDefault()
    setOverIdx(i)
  }
  const onDrop = (e, i) => {
    e.preventDefault()
    if (dragIdx === null || dragIdx === i) return
    const n = [...current]
    const [moved] = n.splice(dragIdx, 1)
    n.splice(i, 0, moved)
    onChange(n)
    setDragIdx(null)
    setOverIdx(null)
  }
  const onDragEnd = () => { setDragIdx(null); setOverIdx(null) }

  return (
    <div>
      <div style={{ display:'flex', flexDirection:'column', gap:5 }}>
        {current.map((lk, i) => (
          <div key={i}
            draggable
            onDragStart={e => onDragStart(e, i)}
            onDragOver={e => onDragOver(e, i)}
            onDrop={e => onDrop(e, i)}
            onDragEnd={onDragEnd}
            style={{
              border: `1.5px solid ${overIdx===i && dragIdx!==i ? '#6366F1' : '#E5E7EB'}`,
              borderRadius: 9, background: dragIdx===i ? '#F5F3FF' : '#FAFAFA',
              opacity: dragIdx===i ? .5 : 1, transition: 'all .15s',
            }}
          >
            <div style={{ display:'flex', alignItems:'center', gap:7, padding:'7px 8px' }}>
              <span style={{ cursor:'grab', color:'#D1D5DB', display:'flex', alignItems:'center', flexShrink:0, userSelect:'none' }}>
                <GripVertical size={14} />
              </span>
              <input
                value={lk.label}
                onChange={e => updateLink(i, 'label', e.target.value)}
                placeholder="Nombre del link"
                style={{ ...S.input, flex:1, padding:'5px 8px', minWidth:0 }}
              />
              <button onClick={() => setExpandUrl(p => ({...p, [i]: !p[i]}))}
                title="Editar URL"
                style={{ border:'none', background:expandUrl[i]?'#EEF2FF':'none', borderRadius:6, cursor:'pointer', padding:'4px 6px', display:'flex', alignItems:'center', color: expandUrl[i]?'#6366F1':'#9CA3AF', flexShrink:0 }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>
              </button>
              <button onClick={() => remove(i)}
                style={{ border:'none', background:'none', cursor:'pointer', color:'#EF4444', padding:'4px 6px', display:'flex', alignItems:'center' }}>
                <Trash2 size={12} />
              </button>
            </div>
            {expandUrl[i] && (
              <div style={{ padding:'0 8px 8px 30px' }}>
                <input
                  value={lk.href}
                  onChange={e => updateLink(i, 'href', e.target.value)}
                  placeholder="#seccion o https://..."
                  style={{ ...S.input, fontSize:'.75rem', padding:'4px 8px' }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
      <button onClick={add} style={{ ...S.addBtn, marginTop:8 }}>
        <Plus size={13} /> Agregar Link
      </button>
    </div>
  )
}

function ServiceEditor({ services, onChange }) {
  const update = (i,f,v) => { const n=[...(services||[])]; n[i]={...n[i],[f]:v}; onChange(n) }
  const remove = (i) => onChange((services||[]).filter((_,j)=>j!==i))
  const add = () => onChange([...(services||[]), { iconId:'star', title:'Nuevo Servicio', description:'Descripción del servicio.' }])

  const svgForId = (id) => {
    const found = SERVICE_ICONS.find(i=>i.id===id)
    return found ? found.svg : SERVICE_ICONS[0].svg
  }

  return (
    <div>
      {(services||[]).map((sv,i) => (
        <div key={i} style={{ border:'1.5px solid #E5E7EB', borderRadius:11, padding:13, marginBottom:10, background:'#FAFAFA', position:'relative' }}>
          <button onClick={()=>remove(i)} style={{ position:'absolute', top:8, right:8, border:'none', background:'none', cursor:'pointer', color:'#EF4444', padding:3, display:'flex', alignItems:'center' }}><Trash2 size={12} /></button>
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:10 }}>
            <div style={{ width:34, height:34, borderRadius:8, background:'#EEF2FF', display:'flex', alignItems:'center', justifyContent:'center', color:'#6366F1', flexShrink:0 }}>
              {sv.iconId ? svgForId(sv.iconId) : svgForId('star')}
            </div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontSize:'.68rem', fontWeight:700, color:'#9CA3AF', textTransform:'uppercase', letterSpacing:'.04em', marginBottom:3 }}>Ícono</div>
              <IconPicker value={sv.iconId||'star'} onChange={v=>update(i,'iconId',v)} />
            </div>
          </div>
          <Field label="Título" value={sv.title} onChange={v=>update(i,'title',v)} placeholder="Nombre del servicio" />
          <Field label="Descripción" value={sv.description} onChange={v=>update(i,'description',v)} multiline placeholder="Breve descripción..." />
        </div>
      ))}
      <button onClick={add} style={S.addBtn}><Plus size={13} /> Agregar Servicio</button>
    </div>
  )
}

function TestimonialsEditor({ testimonials, onChange }) {
  const update = (i,f,v) => { const n=[...(testimonials||[])]; n[i]={...n[i],[f]:v}; onChange(n) }
  const remove = (i) => onChange((testimonials||[]).filter((_,j)=>j!==i))
  const add = () => onChange([...(testimonials||[]), { name:'Nombre', role:'Miembro de la comunidad', text:'Testimonio y experiencia.', rating:5 }])

  return (
    <div>
      {(testimonials||[]).map((t,i) => (
        <div key={i} style={{ border:'1.5px solid #E5E7EB', borderRadius:11, padding:13, marginBottom:10, background:'#FAFAFA', position:'relative' }}>
          <button onClick={()=>remove(i)} style={{ position:'absolute', top:8, right:8, border:'none', background:'none', cursor:'pointer', color:'#EF4444', padding:3, display:'flex', alignItems:'center' }}><Trash2 size={12} /></button>
          <Field label="Nombre" value={t.name} onChange={v=>update(i,'name',v)} />
          <Field label="Detalle / Rol" value={t.role} onChange={v=>update(i,'role',v)} />
          <Field label="Testimonio" value={t.text} onChange={v=>update(i,'text',v)} multiline />
          <div style={S.row}>
            <label style={S.label}>Calificación</label>
            <div style={{ display:'flex', gap:4 }}>
              {[1,2,3,4,5].map(s => (
                <button key={s} onClick={()=>update(i,'rating',s)}
                  style={{ border:'none', background:'none', cursor:'pointer', fontSize:'1.1rem', color: s<=(t.rating||5)?'#F59E0B':'#D1D5DB', padding:0 }}>★</button>
              ))}
            </div>
          </div>
        </div>
      ))}
      <button onClick={add} style={S.addBtn}><Plus size={13} /> Agregar testimonio</button>
    </div>
  )
}

// ─── Specialized Church Editors ───────────────────────────────────

function ServiceTimesEditor({ times, onChange }) {
  const list = times || ['Domingos: 9:00 AM & 11:30 AM', 'Miércoles: 7:00 PM']
  const update = (i, v) => { const n = [...list]; n[i] = v; onChange(n) }
  const remove = (i) => onChange(list.filter((_, j) => j !== i))
  const add = () => onChange([...list, 'Nuevo Horario: 10:00 AM'])

  return (
    <div>
      {list.map((t, i) => (
        <div key={i} style={{ display: 'flex', gap: 6, marginBottom: 8, alignItems: 'center' }}>
          <input
            value={t}
            onChange={e => update(i, e.target.value)}
            placeholder="Ej: Domingos: 9:00 AM & 11:30 AM"
            style={{ ...S.input, flex: 1, fontSize: '.75rem', padding: '7px 10px' }}
          />
          <button
            onClick={() => remove(i)}
            style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#EF4444', padding: 4 }}
          >
            <Trash2 size={13} />
          </button>
        </div>
      ))}
      <button onClick={add} style={S.addBtn}>
        <Plus size={13} /> Agregar Horario de Culto
      </button>
    </div>
  )
}

function ValuesEditor({ values, onChange }) {
  const list = values || [
    { icon: 'heart', title: 'Amor Incondicional', text: 'Recibimos a cada persona con gracia y calidez.' },
    { icon: 'users', title: 'Comunidad Auténtica', text: 'Crecemos juntos a través de grupos de amistad.' },
    { icon: 'book', title: 'Verdad Bíblica', text: 'Enseñanza práctica basada en la Palabra de Dios.' },
    { icon: 'globe', title: 'Impacto y Misión', text: 'Servimos con generosidad a nuestra ciudad.' },
  ]
  const update = (i, f, v) => { const n = [...list]; n[i] = { ...n[i], [f]: v }; onChange(n) }
  const remove = (i) => onChange(list.filter((_, j) => j !== i))
  const add = () => onChange([...list, { icon: 'star', title: 'Nuevo Valor', text: 'Descripción del principio o valor.' }])

  return (
    <div>
      {list.map((val, i) => (
        <div key={i} style={{ border: '1.5px solid #E5E7EB', borderRadius: 11, padding: 12, marginBottom: 10, background: '#FAFAFA', position: 'relative' }}>
          <button onClick={() => remove(i)} style={{ position: 'absolute', top: 8, right: 8, border: 'none', background: 'none', cursor: 'pointer', color: '#EF4444', padding: 3 }}>
            <Trash2 size={12} />
          </button>
          <Field label="Título del Valor" value={val.title} onChange={v => update(i, 'title', v)} placeholder="Ej: Amor Incondicional" />
          <Field label="Descripción" value={val.text} onChange={v => update(i, 'text', v)} multiline placeholder="Descripción del valor..." />
        </div>
      ))}
      {list.length < 8 && (
        <button onClick={add} style={S.addBtn}><Plus size={13} /> Agregar Valor</button>
      )}
    </div>
  )
}

function MinistriesEditor({ ministries, onChange }) {
  const list = ministries || [
    { name: 'KidZone (Niños)', ageRange: '0 a 12 años', description: 'Espacio seguro y divertido para los más pequeños.', icon: 'heart', image: '', ctaText: 'Conoce KidZone' },
    { name: 'Jóvenes', ageRange: '13 a 25 años', description: 'Comunidad vibrante con reuniones semanales y música en vivo.', icon: 'zap', image: '', ctaText: 'Únete a Jóvenes' }
  ]
  const update = (i, f, v) => { const n = [...list]; n[i] = { ...n[i], [f]: v }; onChange(n) }
  const remove = (i) => onChange(list.filter((_, j) => j !== i))
  const add = () => onChange([...list, { name: 'Nuevo Ministerio', ageRange: 'Todas las edades', description: 'Descripción de la comunidad...', ctaText: 'Saber Más' }])

  return (
    <div>
      {list.map((m, i) => (
        <div key={i} style={{ border: '1.5px solid #E5E7EB', borderRadius: 11, padding: 13, marginBottom: 12, background: '#FAFAFA', position: 'relative' }}>
          <button onClick={() => remove(i)} style={{ position: 'absolute', top: 8, right: 8, border: 'none', background: 'none', cursor: 'pointer', color: '#EF4444', padding: 3 }}>
            <Trash2 size={12} />
          </button>
          <Field label="Nombre del Ministerio" value={m.name} onChange={v => update(i, 'name', v)} placeholder="Ej: KidZone (Niños)" />
          <Field label="Rango de Edad / Categoría" value={m.ageRange} onChange={v => update(i, 'ageRange', v)} placeholder="Ej: 0 a 12 años" />
          <Field label="Descripción" value={m.description} onChange={v => update(i, 'description', v)} multiline placeholder="Breve descripción..." />
          <Field label="Texto del Botón CTA" value={m.ctaText} onChange={v => update(i, 'ctaText', v)} placeholder="Ej: Más Información" />
          <ImageUploadBox label="Foto del Ministerio" imageUrl={m.image} onUpload={url => update(i, 'image', url)} onClear={() => update(i, 'image', '')} />
        </div>
      ))}
      <button onClick={add} style={S.addBtn}><Plus size={13} /> Agregar Ministerio</button>
    </div>
  )
}

function NextStepsEditor({ nextSteps, onChange }) {
  const ns = nextSteps || {
    title: 'Tus Próximos Pasos en la Fe',
    subtitle: 'No camines solo. Te acompañamos en cada etapa de tu crecimiento espiritual.',
    steps: [
      { step: 1, title: '1. Creer & Conocer a Jesús', description: 'Descubre el amor de Dios y su propósito para ti.' },
      { step: 2, title: '2. Conectar en Comunidad', description: 'Participa en nuestros grupos semanales de conexión.' },
      { step: 3, title: '3. Servir y Marcar la Diferencia', description: 'Bendice a otros uniéndote a un equipo de voluntarios.' }
    ]
  }
  const updateMain = (f, v) => onChange({ ...ns, [f]: v })
  const updateStep = (i, f, v) => {
    const steps = [...(ns.steps || [])]
    steps[i] = { ...steps[i], [f]: v }
    onChange({ ...ns, steps })
  }

  return (
    <div>
      <Field label="Título de la Sección" value={ns.title} onChange={v => updateMain('title', v)} placeholder="Tus Próximos Pasos en la Fe" />
      <Field label="Subtítulo" value={ns.subtitle} onChange={v => updateMain('subtitle', v)} multiline placeholder="Descripción introductoria..." />
      <div style={S.divider} />
      {(ns.steps || []).map((st, i) => (
        <div key={i} style={{ border: '1.5px solid #E5E7EB', borderRadius: 10, padding: 10, marginBottom: 10, background: '#FAFAFA' }}>
          <Field label={`Paso ${i + 1} - Título`} value={st.title} onChange={v => updateStep(i, 'title', v)} placeholder={`Paso ${i + 1}`} />
          <Field label="Descripción" value={st.description} onChange={v => updateStep(i, 'description', v)} multiline />
        </div>
      ))}
    </div>
  )
}

function SermonsEditor({ sermons, title, subtitle, onChangeData }) {
  const list = sermons || [
    { title: 'Caminando por Fe en Tiempos de Cambio', series: 'Serie: Imparables', speaker: 'Pastor Principal', date: 'Domingo Reciente', duration: '38 min', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', image: '' }
  ]
  const update = (i, f, v) => { const n = [...list]; n[i] = { ...n[i], [f]: v }; onChangeData('sermons', n) }
  const remove = (i) => onChangeData('sermons', list.filter((_, j) => j !== i))
  const add = () => onChangeData('sermons', [...list, { title: 'Nuevo Mensaje', series: 'Serie Dominical', speaker: 'Pastor', date: 'Domingo', duration: '35 min', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', image: '' }])

  return (
    <div>
      <Field label="Título de la Sección" value={title} onChange={v => onChangeData('sermonsTitle', v)} placeholder="Mensajes & Prédicas Recientes" />
      <Field label="Subtítulo" value={subtitle} onChange={v => onChangeData('sermonsSubtitle', v)} multiline placeholder="Descripción de los mensajes..." />
      <div style={S.divider} />
      {list.map((sermon, i) => (
        <div key={i} style={{ border: '1.5px solid #E5E7EB', borderRadius: 11, padding: 13, marginBottom: 12, background: '#FAFAFA', position: 'relative' }}>
          <button onClick={() => remove(i)} style={{ position: 'absolute', top: 8, right: 8, border: 'none', background: 'none', cursor: 'pointer', color: '#EF4444', padding: 3 }}>
            <Trash2 size={12} />
          </button>
          <Field label="Título de la Prédica" value={sermon.title} onChange={v => update(i, 'title', v)} placeholder="Título del mensaje" />
          <Field label="Serie" value={sermon.series} onChange={v => update(i, 'series', v)} placeholder="Ej: Serie: Imparables" />
          <Field label="Predicador / Orador" value={sermon.speaker} onChange={v => update(i, 'speaker', v)} placeholder="Ej: Pastor Principal" />
          <div style={{ display: 'flex', gap: 8 }}>
            <div style={{ flex: 1 }}><Field label="Fecha" value={sermon.date} onChange={v => update(i, 'date', v)} placeholder="Ej: 24 Ago 2026" /></div>
            <div style={{ flex: 1 }}><Field label="Duración" value={sermon.duration} onChange={v => update(i, 'duration', v)} placeholder="Ej: 38 min" /></div>
          </div>
          <Field label="Link de YouTube (Video)" value={sermon.videoUrl} onChange={v => update(i, 'videoUrl', v)} placeholder="https://www.youtube.com/watch?v=..." />
          <ImageUploadBox label="Thumbnail / Portada del Video" imageUrl={sermon.image} onUpload={url => update(i, 'image', url)} onClear={() => update(i, 'image', '')} />
        </div>
      ))}
      <button onClick={add} style={S.addBtn}><Plus size={13} /> Agregar Prédica / Sermón</button>
    </div>
  )
}



function SectionsOrderEditor({ sectionOrder, sectionsVisibility, data, onChange }) {
  const [dragIdx, setDragIdx] = useState(null)
  const [overIdx, setOverIdx] = useState(null)

  const isChurch = data.industry?.toLowerCase().includes('iglesi') || data.industry?.toLowerCase().includes('church') || Boolean(data.planAVisit) || Boolean(data.ministries) || Boolean(data.sermons) || data.churchTemplateVariant
  const CHURCH_ORDER = ['hero', 'missionBlock', 'welcome', 'planAVisit', 'nucleusColumns', 'values', 'ministries', 'nextSteps', 'sermons', 'donation', 'prayerRequest', 'about', 'testimonials', 'contact']
  const DEFAULT_ORDER = isChurch ? CHURCH_ORDER : ['hero', 'services', 'about', 'gallery', 'team', 'beforeAfter', 'testimonials', 'contact']
  const order = sectionOrder || DEFAULT_ORDER
  const visibility = sectionsVisibility || {}

  const SECTION_NAMES = {
    hero: 'Hero Principal (Portada)',
    missionBlock: 'Misión & Visión (Nucleus)',
    welcome: 'Bienvenida a Casa (MyGateway)',
    planAVisit: 'Planifica tu Visita & Horarios',
    nucleusColumns: 'Líderes & Calendario (Nucleus)',
    values: 'Valores & Fundamentos de Fe',
    ministries: 'Ministerios & Familias',
    nextSteps: 'Próximos Pasos en la Fe',
    sermons: 'Sermones & Mensajes',
    donation: 'Ofrendas / Donaciones',
    prayerRequest: 'Petición de Oración',
    services: 'Servicios',
    about: 'Sobre Nosotros',
    gallery: 'Galería de Fotos',
    team: 'Nuestro Equipo',
    beforeAfter: 'Antes y Después',
    testimonials: 'Testimonios',
    contact: 'Formulario de Contacto'
  }

  const toggleVisibility = (key) => {
    const nextVis = { ...visibility, [key]: visibility[key] === false }
    onChange('sectionsVisibility', nextVis)
  }

  const onDragStart = (e, i) => { setDragIdx(i); e.dataTransfer.effectAllowed = 'move'; }
  const onDragOver = (e, i) => { e.preventDefault(); setOverIdx(i); }
  const onDrop = (e, i) => {
    e.preventDefault()
    if (dragIdx === null || dragIdx === i) return
    const nextOrder = [...order]
    const [moved] = nextOrder.splice(dragIdx, 1)
    nextOrder.splice(i, 0, moved)
    onChange('sectionOrder', nextOrder)
    setDragIdx(null); setOverIdx(null)
  }
  const onDragEnd = () => { setDragIdx(null); setOverIdx(null) }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {order.map((key, i) => {
        const isVisible = visibility[key] !== false
        return (
          <div
            key={key}
            draggable
            onDragStart={e => onDragStart(e, i)}
            onDragOver={e => onDragOver(e, i)}
            onDrop={e => onDrop(e, i)}
            onDragEnd={onDragEnd}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px',
              border: `1.5px solid ${overIdx === i && dragIdx !== i ? '#6366F1' : '#E5E7EB'}`,
              borderRadius: 10, background: dragIdx === i ? '#F5F3FF' : isVisible ? '#fff' : '#F3F4F6',
              opacity: dragIdx === i ? 0.5 : 1, transition: 'all 0.15s'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0, flex: 1 }}>
              <span style={{ cursor: 'grab', color: '#D1D5DB', display: 'flex', alignItems: 'center', userSelect: 'none' }}>
                <GripVertical size={14} />
              </span>
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ fontSize: '.8rem', fontWeight: 700, color: isVisible ? '#1F2937' : '#9CA3AF', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {SECTION_NAMES[key] || key}
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <button onClick={() => toggleVisibility(key)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: isVisible ? '#6366F1' : '#9CA3AF', padding: 4 }}>
                {isVisible ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg> : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>}
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ─── MAIN EDITOR WITH CATEGORY TABS ───────────────────────────────
export default function WebsiteEditor({ websiteData, onChange, onSectionFocus }) {
  const [activeTab, setActiveTab] = useState('content') // content | style | structure | settings
  const [openSection, setOpenSection] = useState(null)

  const isChurch = websiteData.industry?.toLowerCase().includes('iglesi') || websiteData.industry?.toLowerCase().includes('church') || Boolean(websiteData.planAVisit) || Boolean(websiteData.ministries) || Boolean(websiteData.sermons)

  const update = (path, value) => {
    const keys = path.split('.')
    const d = JSON.parse(JSON.stringify(websiteData))
    let obj = d
    for (let i=0; i<keys.length-1; i++) { obj[keys[i]] = obj[keys[i]] || {}; obj = obj[keys[i]] }
    obj[keys[keys.length-1]] = value
    onChange(d)
  }

  const sec = (id) => ({
    isOpen: openSection === id,
    onToggle: () => {
      setOpenSection(prev => {
        const next = prev === id ? null : id
        if (next && onSectionFocus) {
          onSectionFocus(next)
        }
        return next
      })
    },
  })

  const applyTheme = (t) => onChange({ ...websiteData, primaryColor:t.primary, secondaryColor:t.secondary, accentColor:t.accent, font:t.font||websiteData.font, headingWeight:t.headingWeight||websiteData.headingWeight })

  return (
    <div style={{ fontFamily:"'Inter',sans-serif", display:'flex', flexDirection:'column', height:'100%' }}>

      {/* ── Editor Header & Category Tabs ── */}
      <div style={{ background:'#fff', borderBottom:'1.5px solid #F3F4F6', flexShrink:0 }}>
        <div style={{ padding:'12px 18px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <span style={{ fontSize:'1.1rem' }}>{isChurch ? '⛪' : '✨'}</span>
            <span style={{ fontWeight:800, fontSize:'.84rem', color:'#111827' }}>
              {isChurch ? 'Editor de Iglesia' : 'Editor No-Code'}
            </span>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:6 }}>
            <div style={{ width:7, height:7, borderRadius:'50%', background:'#10B981' }} />
            <span style={{ fontSize:'.67rem', fontWeight:700, color:'#059669' }}>En vivo</span>
          </div>
        </div>

        {/* Category Pills Navigation */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:4, padding:'0 12px 10px' }}>
          {[
            { id:'content', label:'Contenido', icon:<AlignLeft size={13}/> },
            { id:'style', label:'Diseño', icon:<Palette size={13}/> },
            { id:'structure', label:'Menú', icon:<Layers size={13}/> },
            { id:'settings', label:'Ajustes', icon:<Settings size={13}/> },
          ].map(tb => (
            <button
              key={tb.id}
              onClick={() => { setActiveTab(tb.id); setOpenSection(null) }}
              style={{
                display:'flex', alignItems:'center', justifyContent:'center', gap:5,
                padding:'7px 4px', borderRadius:8, border:'none',
                background: activeTab === tb.id ? '#EEF2FF' : '#F9FAFB',
                color: activeTab === tb.id ? '#4F46E5' : '#6B7280',
                fontWeight: activeTab === tb.id ? 800 : 600,
                fontSize:'.72rem', cursor:'pointer', transition:'all .15s'
              }}>
              {tb.icon}
              <span>{tb.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Scrollable Body per Tab ── */}
      <div style={{ overflowY:'auto', flex:1, maxHeight:'calc(100vh - 170px)' }}>

        {/* ════════ TAB 1: CONTENIDO ════════ */}
        {activeTab === 'content' && (
          <div>
            {isChurch ? (
              <>
                {/* Top Announcement Bar */}
                <Section title="Barra de Anuncios Superior" icon={<Radio size={14}/>} {...sec('churchAnnounce')}>
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:12 }}>
                    <span style={{ fontSize:'.75rem', fontWeight:600, color:'#374151' }}>Mostrar Barra de Anuncios</span>
                    <input type="checkbox" checked={websiteData.announcementBar?.visible !== false} onChange={e=>update('announcementBar.visible', e.target.checked)} style={{ width:18, height:18, accentColor:'#6366F1' }} />
                  </div>
                  <Field label="Texto del Anuncio" value={websiteData.announcementBar?.text} onChange={v=>update('announcementBar.text',v)} multiline placeholder="👋 Weekly Check-In: ¿Necesitas oración?..." />
                  <Field label="Texto del Botón" value={websiteData.announcementBar?.ctaText} onChange={v=>update('announcementBar.ctaText',v)} placeholder="Conéctate Ahora" />
                  <Field label="Enlace del Botón" value={websiteData.announcementBar?.ctaLink} onChange={v=>update('announcementBar.ctaLink',v)} placeholder="#wp-plan-visit" />
                </Section>

                {/* Hero / Portada */}
                <Section title="🌟 Portada Hero & Llamado a la Acción" icon={<Image size={14}/>} {...sec('hero')}>
                  <Field label="⏰ Horario / Eyebrow (texto dorado pequeño)" value={websiteData.hero?.eyebrow} onChange={v=>update('hero.eyebrow',v)} placeholder="DOMINGOS 10:30 A.M." />
                  <div style={S.divider} />
                  <Field label="Titular Principal" value={websiteData.hero?.headline} onChange={v=>update('hero.headline',v)} placeholder="Encuentra tu Lugar en Nuestra Familia" />
                  <Field label="Subtítulo Inspirador" value={websiteData.hero?.subheadline} onChange={v=>update('hero.subheadline',v)} multiline placeholder="Ven y acompáñanos este domingo..." />
                  <div style={S.divider} />
                  <Field label="Botón Principal (CTA)" value={websiteData.hero?.ctaText} onChange={v=>update('hero.ctaText',v)} placeholder="Planifica tu Visita" />
                  <Field label="Enlace Botón Principal" value={websiteData.hero?.ctaLink} onChange={v=>update('hero.ctaLink',v)} placeholder="#wp-plan-visit" />
                  <Field label="Botón Secundario" value={websiteData.hero?.ctaSecondary} onChange={v=>update('hero.ctaSecondary',v)} placeholder="Ver en Línea" />
                  <Field label="Enlace Botón Secundario" value={websiteData.hero?.ctaSecondaryLink} onChange={v=>update('hero.ctaSecondaryLink',v)} placeholder="#wp-sermons" />
                  <div style={S.divider} />
                  <ImageUploadBox label="📷 Foto de Fondo del Hero (Portada)" imageUrl={websiteData.heroImage} onUpload={url=>update('heroImage',url)} onClear={()=>update('heroImage','')} />
                  <div style={{ marginTop: 8 }}>
                    <label style={S.label}>Fotos de iglesia para usar rápido ⚡</label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 5 }}>
                      {[
                        { label: '☀️ Adoración', url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1800&q=85&fit=crop' },
                        { label: '🙏 Oración', url: 'https://images.unsplash.com/photo-1509021436471-18736672b71e?w=1800&q=85&fit=crop' },
                        { label: '🏛️ Templo', url: 'https://images.unsplash.com/photo-1548625149-fc4a29cf7092?w=1800&q=85&fit=crop' },
                        { label: '👨‍👩‍👧 Familia', url: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1800&q=85&fit=crop' },
                        { label: '🎵 Música', url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1800&q=85&fit=crop' },
                        { label: '🗓️ Reunión', url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1800&q=85&fit=crop' },
                      ].map((preset, i) => (
                        <button
                          key={i}
                          onClick={() => update('heroImage', preset.url)}
                          style={{
                            padding: '6px 4px',
                            borderRadius: 8,
                            border: websiteData.heroImage === preset.url ? '2px solid #6366F1' : '1.5px solid #E5E7EB',
                            background: websiteData.heroImage === preset.url ? '#EEF2FF' : '#F9FAFB',
                            cursor: 'pointer',
                            fontSize: '.68rem',
                            fontWeight: 700,
                            color: websiteData.heroImage === preset.url ? '#4F46E5' : '#374151',
                            fontFamily: 'inherit',
                            transition: 'all .15s'
                          }}
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </Section>

                {/* Bienvenida Pastoral */}
                <Section title="Bienvenida a Casa" icon={<Heart size={14}/>} {...sec('welcome')}>
                  <Field label="Etiqueta Superior" value={websiteData.welcome?.label} onChange={v=>update('welcome.label',v)} placeholder="Bienvenido a Casa" />
                  <Field label="Título de Bienvenida" value={websiteData.welcome?.title} onChange={v=>update('welcome.title',v)} placeholder="Una comunidad apasionada por Jesús..." />
                  <Field label="Mensaje Pastoral" value={websiteData.welcome?.text} onChange={v=>update('welcome.text',v)} multiline placeholder="Creemos que la iglesia es una familia..." />
                  <Field label="Botón Primario" value={websiteData.welcome?.ctaText} onChange={v=>update('welcome.ctaText',v)} placeholder="Conoce Nuestra Visión" />
                  <Field label="Botón Secundario" value={websiteData.welcome?.ctaSecondaryText} onChange={v=>update('welcome.ctaSecondaryText',v)} placeholder="Pide Oración" />
                </Section>

                {/* Planifica tu Visita & Horarios */}
                <Section title="Planifica tu Visita & Horarios" icon={<Calendar size={14}/>} {...sec('visit')}>
                  <Field label="Título de la Sección" value={websiteData.planAVisit?.title} onChange={v=>update('planAVisit.title',v)} placeholder="Planifica tu Primera Visita" />
                  <Field label="Subtítulo" value={websiteData.planAVisit?.subtitle} onChange={v=>update('planAVisit.subtitle',v)} multiline />
                  <Field label="Dirección de la Iglesia" value={websiteData.planAVisit?.address} onChange={v=>update('planAVisit.address',v)} placeholder="Sede o dirección principal de la comunidad" />
                  <div style={S.divider} />
                  <label style={S.label}>⏰ Horarios de Cultos & Servicios</label>
                  <ServiceTimesEditor times={websiteData.planAVisit?.serviceTimes} onChange={v=>update('planAVisit.serviceTimes',v)} />
                  <div style={S.divider} />
                  <Field label="👶 Info Niños / KidZone" value={websiteData.planAVisit?.kidsInfo} onChange={v=>update('planAVisit.kidsInfo',v)} multiline placeholder="Área infantil segura..." />
                  <Field label="✨ ¿Qué Esperar? (Ambiente, vestimenta, café)" value={websiteData.planAVisit?.whatToExpect} onChange={v=>update('planAVisit.whatToExpect',v)} multiline />
                </Section>

                {/* Valores & Fundamentos */}
                <Section title="Valores & Fundamentos de Fe" icon={<BookOpen size={14}/>} {...sec('values')}>
                  <ValuesEditor values={websiteData.values} onChange={v=>update('values',v)} />
                </Section>

                {/* Ministerios & Familias */}
                <Section title="Ministerios & Familias" icon={<Users size={14}/>} {...sec('ministries')}>
                  <Field label="Título de la Sección" value={websiteData.ministriesTitle} onChange={v=>update('ministriesTitle',v)} placeholder="Nuestros Ministerios y Familias" />
                  <Field label="Subtítulo" value={websiteData.ministriesSubtitle} onChange={v=>update('ministriesSubtitle',v)} multiline />
                  <div style={S.divider} />
                  <MinistriesEditor ministries={websiteData.ministries} onChange={v=>update('ministries',v)} />
                </Section>

                {/* Próximos Pasos */}
                <Section title="Próximos Pasos en la Fe" icon={<Sparkles size={14}/>} {...sec('nextSteps')}>
                  <NextStepsEditor nextSteps={websiteData.nextSteps} onChange={v=>update('nextSteps',v)} />
                </Section>

                {/* Sermones & Mensajes */}
                <Section title="Sermones & Mensajes en Video" icon={<Video size={14}/>} {...sec('sermons')}>
                  <SermonsEditor
                    sermons={websiteData.sermons}
                    title={websiteData.sermonsTitle}
                    subtitle={websiteData.sermonsSubtitle}
                    onChangeData={(f,v)=>update(f,v)}
                  />
                </Section>

                {/* Donaciones & Ofrendas */}
                <Section title="Ofrendas & Donaciones" icon={<DollarSign size={14}/>} {...sec('donation')}>
                  <Field label="Título" value={websiteData.donation?.title} onChange={v=>update('donation.title',v)} placeholder="Generosidad que Transforma Vidas" />
                  <Field label="Mensaje Motivacional" value={websiteData.donation?.subtitle} onChange={v=>update('donation.subtitle',v)} multiline />
                  <Field label="Texto del Botón CTA" value={websiteData.donation?.ctaText} onChange={v=>update('donation.ctaText',v)} placeholder="Ofrendar / Donar en Línea" />
                  <Field label="Nota de Seguridad / Transparencia" value={websiteData.donation?.note} onChange={v=>update('donation.note',v)} placeholder="Donaciones 100% seguras..." />
                </Section>

                {/* Petición de Oración */}
                <Section title="Petición de Oración" icon={<MessageCircle size={14}/>} {...sec('prayer')}>
                  <Field label="Título" value={websiteData.prayerRequest?.title} onChange={v=>update('prayerRequest.title',v)} placeholder="¿Podemos Orar por Ti?" />
                  <Field label="Subtítulo" value={websiteData.prayerRequest?.subtitle} onChange={v=>update('prayerRequest.subtitle',v)} multiline />
                  <Field label="Texto del Botón Enviar" value={websiteData.prayerRequest?.ctaText} onChange={v=>update('prayerRequest.ctaText',v)} placeholder="Enviar Petición de Oración" />
                </Section>
              </>
            ) : (
              <>
                {/* General Business Content */}
                <Section title="Portada Hero" icon={<Image size={14}/>} {...sec('hero')}>
                  <Field label="Titular Principal (H1)" value={websiteData.hero?.headline} onChange={v=>update('hero.headline',v)} />
                  <Field label="Subtítulo" value={websiteData.hero?.subheadline} onChange={v=>update('hero.subheadline',v)} multiline />
                  <Field label="Botón Principal (CTA)" value={websiteData.hero?.ctaText} onChange={v=>update('hero.ctaText',v)} />
                  <Field label="Link Principal" value={websiteData.hero?.ctaLink} onChange={v=>update('hero.ctaLink',v)} />
                </Section>

                <Section title="Servicios" icon={<Star size={14}/>} badge={`${(websiteData.services||[]).length}`} {...sec('services')}>
                  <ServiceEditor services={websiteData.services} onChange={v=>update('services',v)} />
                </Section>

                <Section title="Sobre Nosotros" icon={<Users size={14}/>} {...sec('about')}>
                  <Field label="Título" value={websiteData.about?.title} onChange={v=>update('about.title',v)} />
                  <Field label="Texto" value={websiteData.about?.text} onChange={v=>update('about.text',v)} multiline />
                </Section>

                <Section title="Testimonios" icon={<MessageSquare size={14}/>} badge={`${(websiteData.testimonials||[]).length}`} {...sec('testimonials')}>
                  <TestimonialsEditor testimonials={websiteData.testimonials} onChange={v=>update('testimonials',v)} />
                </Section>
              </>
            )}

            {/* Common About & Contact in content */}
            <Section title="Sobre Nosotros" icon={<Users size={14}/>} {...sec('about')}>
              <Field label="Título de la Sección" value={websiteData.about?.title} onChange={v=>update('about.title',v)} placeholder="Nuestra Historia y Misión" />
              <Field label="Texto Descriptivo" value={websiteData.about?.text} onChange={v=>update('about.text',v)} multiline />
              <ImageUploadBox label="Foto de la Sección Sobre Nosotros" imageUrl={websiteData.aboutImage} onUpload={url=>update('aboutImage',url)} onClear={()=>update('aboutImage','')} />
            </Section>

            <Section title="Contacto & WhatsApp" icon={<Phone size={14}/>} {...sec('contact')}>
              <Field label="Teléfono" value={websiteData.contact?.phone} onChange={v=>update('contact.phone',v)} placeholder="+1 (555) 123-4567" />
              <Field label="WhatsApp" value={websiteData.contact?.whatsapp} onChange={v=>update('contact.whatsapp',v)} placeholder="+1 (555) 987-6543" />
              <Field label="Email" value={websiteData.contact?.email} onChange={v=>update('contact.email',v)} placeholder="contacto@tu-iglesia.org" />
              <Field label="Dirección Física" value={websiteData.contact?.address} onChange={v=>update('contact.address',v)} multiline />
            </Section>

            {/* Floating Popup / Widget Option */}
            <Section title="Widget Flotante & Pop-up (Opcional)" icon={<Sparkles size={14}/>} {...sec('floatingWidget')}>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:12 }}>
                <div>
                  <div style={{ fontSize:'.78rem', fontWeight:700, color:'#111827' }}>Habilitar Pop-up Flotante</div>
                  <div style={{ fontSize:'.68rem', color:'#6B7280' }}>Muestra una burbuja/ventana flotante en la esquina inferior</div>
                </div>
                <input type="checkbox" checked={Boolean(websiteData.floatingWidget?.enabled)} onChange={e=>update('floatingWidget.enabled', e.target.checked)} style={{ width:18, height:18, accentColor:'#6366F1', cursor:'pointer' }} />
              </div>
              {Boolean(websiteData.floatingWidget?.enabled) && (
                <>
                  <Field label="Título del Pop-up" value={websiteData.floatingWidget?.title} onChange={v=>update('floatingWidget.title',v)} placeholder="Planifica tu Visita" />
                  <Field label="Subtítulo / Mensaje" value={websiteData.floatingWidget?.subtitle} onChange={v=>update('floatingWidget.subtitle',v)} placeholder="Domingos 9:00 AM & 11:00 AM" multiline />
                  <Field label="Texto del Botón" value={websiteData.floatingWidget?.ctaText} onChange={v=>update('floatingWidget.ctaText',v)} placeholder="Planifica tu Visita" />
                  <Field label="Enlace del Botón" value={websiteData.floatingWidget?.ctaLink} onChange={v=>update('floatingWidget.ctaLink',v)} placeholder="#wp-plan-visit" />
                </>
              )}
            </Section>
          </div>
        )}

        {/* ════════ TAB 2: DISEÑO & ESTILO ════════ */}
        {activeTab === 'style' && (
          <div>
            {isChurch && (
              <Section title="Plantillas y Estilos de Iglesia (1 Clic)" icon={<Sparkles size={14}/>} {...sec('churchTemplate')}>
                <p style={{ fontSize:'.72rem', color:'#6B7280', margin:'0 0 12px' }}>
                  Alterna al instante entre las 4 opciones de diseño:
                </p>
                <div style={{ display:'grid', gridTemplateColumns:'1fr', gap:10, marginBottom:16 }}>
                  {/* Option 1: Obsidian & Gold Editorial */}
                  <button
                    onClick={() => {
                      const name = websiteData.businessName || 'Comunidad de Fe'
                      const isSvg = !websiteData.logoImage || websiteData.logoImage.startsWith('data:image/svg+xml')
                      onChange({
                        ...websiteData,
                        churchTemplateVariant: 'nucleus',
                        font: 'Playfair Display',
                        primaryColor: '#080A10',
                        accentColor: '#C4A35A',
                        logoImage: isSvg ? generateChurchLogoSvg(name, 'nucleus', '#080A10', '#C4A35A') : websiteData.logoImage
                      })
                    }}
                    style={{
                      padding: '12px', borderRadius: 12, textAlign: 'left',
                      border: `2px solid ${websiteData.churchTemplateVariant === 'nucleus' || !websiteData.churchTemplateVariant ? '#C4A35A' : '#E5E7EB'}`,
                      background: websiteData.churchTemplateVariant === 'nucleus' || !websiteData.churchTemplateVariant ? 'rgba(196, 163, 90, 0.1)' : '#F9FAFB',
                      cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ fontWeight: 800, fontSize: '.84rem', color: '#111827' }}>👑 Opción 1: Obsidian & Gold</div>
                      {(websiteData.churchTemplateVariant === 'nucleus' || !websiteData.churchTemplateVariant) && (
                        <span style={{ fontSize: '.6rem', fontWeight: 800, color: '#B45309', background: '#FEF3C7', padding: '2px 6px', borderRadius: 99 }}>ACTIVO</span>
                      )}
                    </div>
                    <div style={{ fontSize: '.68rem', color: '#64748B', marginTop: 3 }}>Tipografía Playfair Display, acentos dorados, panel lateral glass de 550px y secciones panorámicas.</div>
                  </button>

                  {/* Option 2: Modern Cinematic (Life Theme) */}
                  <button
                    onClick={() => {
                      const name = websiteData.businessName || 'Comunidad de Fe'
                      const isSvg = !websiteData.logoImage || websiteData.logoImage.startsWith('data:image/svg+xml')
                      onChange({
                        ...websiteData,
                        churchTemplateVariant: 'mygateway',
                        font: 'Plus Jakarta Sans',
                        primaryColor: '#0F172A',
                        accentColor: '#00D8F6',
                        logoImage: isSvg ? generateChurchLogoSvg(name, 'mygateway', '#0F172A', '#00D8F6') : websiteData.logoImage
                      })
                    }}
                    style={{
                      padding: '12px', borderRadius: 12, textAlign: 'left',
                      border: `2px solid ${websiteData.churchTemplateVariant === 'mygateway' ? '#00D8F6' : '#E5E7EB'}`,
                      background: websiteData.churchTemplateVariant === 'mygateway' ? 'rgba(0, 216, 246, 0.08)' : '#F9FAFB',
                      cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ fontWeight: 800, fontSize: '.84rem', color: '#111827' }}>🌊 Opción 2: Life Moderno</div>
                      {websiteData.churchTemplateVariant === 'mygateway' && (
                        <span style={{ fontSize: '.6rem', fontWeight: 800, color: '#0369A1', background: '#E0F2FE', padding: '2px 6px', borderRadius: 99 }}>ACTIVO</span>
                      )}
                    </div>
                    <div style={{ fontSize: '.68rem', color: '#64748B', marginTop: 3 }}>Inspirado en Northside y Rose Church: hero amplio, sección split 50/50 y footer minimalista en negro.</div>
                  </button>

                  {/* Option 3: Experiencia Simbólica & Creativa */}
                  <button
                    onClick={() => {
                      const name = websiteData.businessName || 'Comunidad de Fe'
                      const isSvg = !websiteData.logoImage || websiteData.logoImage.startsWith('data:image/svg+xml')
                      onChange({
                        ...websiteData,
                        churchTemplateVariant: 'poster',
                        font: 'Outfit',
                        primaryColor: '#FFFFFF',
                        accentColor: '#4F46E5',
                        logoImage: isSvg ? generateChurchLogoSvg(name, 'poster', '#FFFFFF', '#4F46E5') : websiteData.logoImage
                      })
                    }}
                    style={{
                      padding: '12px', borderRadius: 12, textAlign: 'left',
                      border: `2px solid ${websiteData.churchTemplateVariant === 'poster' ? '#4F46E5' : '#E5E7EB'}`,
                      background: websiteData.churchTemplateVariant === 'poster' ? 'rgba(79, 70, 229, 0.08)' : '#F9FAFB',
                      cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ fontWeight: 800, fontSize: '.84rem', color: '#111827' }}>✨ Opción 3: Experiencia Simbólica & Creativa</div>
                      {websiteData.churchTemplateVariant === 'poster' && (
                        <span style={{ fontSize: '.6rem', fontWeight: 800, color: '#3730A3', background: '#EEF2FF', padding: '2px 6px', borderRadius: 99 }}>ACTIVO</span>
                      )}
                    </div>
                    <div style={{ fontSize: '.68rem', color: '#64748B', marginTop: 3 }}>Menú navbar limpio con enlaces, hero creativo con mosaico de fotos y 5 apartados simbólicos interactivos.</div>
                  </button>

                  {/* Option 4: Afiche Editorial & Noche de Adoración */}
                  <button
                    onClick={() => {
                      const name = websiteData.businessName || 'Comunidad de Fe'
                      const isSvg = !websiteData.logoImage || websiteData.logoImage.startsWith('data:image/svg+xml')
                      onChange({
                        ...websiteData,
                        churchTemplateVariant: 'afiche',
                        font: 'Syne',
                        primaryColor: '#090B10',
                        accentColor: '#FACC15',
                        logoImage: isSvg ? generateChurchLogoSvg(name, 'afiche', '#090B10', '#FACC15') : websiteData.logoImage
                      })
                    }}
                    style={{
                      padding: '12px', borderRadius: 12, textAlign: 'left',
                      border: `2px solid ${websiteData.churchTemplateVariant === 'afiche' ? '#FACC15' : '#E5E7EB'}`,
                      background: websiteData.churchTemplateVariant === 'afiche' ? 'rgba(250, 204, 21, 0.12)' : '#F9FAFB',
                      cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ fontWeight: 800, fontSize: '.84rem', color: '#111827' }}>🎨 Opción 4: Estilo Afiche & Noche de Evento</div>
                      {websiteData.churchTemplateVariant === 'afiche' && (
                        <span style={{ fontSize: '.6rem', fontWeight: 800, color: '#854D0E', background: '#FEF08A', padding: '2px 6px', borderRadius: 99 }}>ACTIVO</span>
                      )}
                    </div>
                    <div style={{ fontSize: '.68rem', color: '#64748B', marginTop: 3 }}>Diseño tipo afiche/cartel cinematográfico: tipografía script + mayúsculas gigantes condensadas (Noche de ADORACIÓN), fondos oscuros sin cajas encerradas, badges ovalados y mosaico de imágenes panorámicas.</div>
                  </button>
                </div>
              </Section>
            )}

            <Section title="Temas Visuales (1 Clic)" icon={<Palette size={14}/>} {...sec('themes')}>
              <p style={{ fontSize:'.72rem', color:'#6B7280', margin:'0 0 12px' }}>
                Aplica una paleta y tipografía armónica diseñada para lucir profesional de inmediato.
              </p>
              <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                {THEMES.map(t => {
                  const isActive = websiteData.primaryColor === t.primary && websiteData.accentColor === t.accent
                  return (
                    <button key={t.name} onClick={()=>applyTheme(t)}
                      style={{
                        display:'flex', alignItems:'center', gap:10, padding:'10px 12px',
                        background: isActive ? `${t.accent}12` : '#F9FAFB',
                        border: `2px solid ${isActive ? t.accent : '#E5E7EB'}`,
                        borderRadius:10, cursor:'pointer', fontFamily:'inherit',
                        transition:'all .15s', textAlign:'left', width:'100%',
                      }}>
                      <div style={{ width:36, height:36, borderRadius:8, flexShrink:0, overflow:'hidden', position:'relative', border:'1px solid rgba(0,0,0,0.1)' }}>
                        <div style={{ position:'absolute', inset:0, background: t.primary }} />
                        <div style={{ position:'absolute', bottom:0, right:0, width:16, height:16, background: t.accent }} />
                        <div style={{ position:'absolute', top:4, left:4, fontSize:'.9rem' }}>{t.emoji}</div>
                      </div>
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ fontWeight:700, fontSize:'.8rem', color:'#111827', display:'flex', alignItems:'center', gap:5 }}>
                          {t.name}
                          {isActive && <span style={{ fontSize:'.6rem', background:t.accent, color:'#fff', padding:'1px 6px', borderRadius:99, fontWeight:800 }}>ACTIVO</span>}
                        </div>
                        <div style={{ fontSize:'.67rem', color:'#6B7280' }}>{t.mood} · {t.font}</div>
                      </div>
                    </button>
                  )
                })}
              </div>
              <div style={S.divider} />
              <label style={S.label}>Colores Personalizados</label>
              <ColorRow label="Color Principal (Fondo oscuro/Nav)" value={websiteData.primaryColor} onChange={v=>update('primaryColor',v)} />
              <ColorRow label="Color de Fondo Secundario" value={websiteData.secondaryColor} onChange={v=>update('secondaryColor',v)} />
              <ColorRow label="Color de Acento (Botones & Destacados)" value={websiteData.accentColor} onChange={v=>update('accentColor',v)} />
            </Section>

            <Section title="Tipografía & Títulos" icon={<Type size={14}/>} {...sec('font')}>
              <FontPicker value={websiteData.font||'Inter'} onChange={v=>update('font',v)} />
              <div style={S.divider} />
              <label style={S.label}>Grosor de los Titulares H1 / H2</label>
              <div style={{ display:'flex', gap:6 }}>
                {[{ l:'Normal', v:700 },{ l:'Bold', v:800 },{ l:'Black', v:900 }].map(w=>(
                  <button key={w.v} onClick={()=>update('headingWeight',w.v)}
                    style={{ flex:1, padding:'7px 0', borderRadius:7, border:`1.5px solid ${websiteData.headingWeight===w.v||(!websiteData.headingWeight&&w.v===900)?'#6366F1':'#E5E7EB'}`, background: (websiteData.headingWeight===w.v||(!websiteData.headingWeight&&w.v===900))?'#EEF2FF':'#fff', cursor:'pointer', fontSize:'.75rem', fontWeight:w.v, color:'#374151' }}>
                    {w.l}
                  </button>
                ))}
              </div>
            </Section>

            <Section title="Foto & Video de Portada (Hero)" icon={<Image size={14}/>} {...sec('heroMedia')}>
              <ImageUploadBox label="Foto de Fondo Principal" imageUrl={websiteData.heroImage} onUpload={url=>update('heroImage',url)} onClear={()=>update('heroImage','')} />
              <div style={S.divider} />
              <Field label="Video de Fondo (URL MP4)" value={websiteData.heroVideo} onChange={v=>update('heroVideo',v)} placeholder="https://assets.mixkit.co/.../video.mp4" />
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:6, marginTop:8 }}>
                {[
                  { name: '🎬 Luces de Alabanza', url: 'https://assets.mixkit.co/videos/preview/mixkit-worship-lights-42887-large.mp4' },
                  { name: '☁️ Nubes & Rayos', url: 'https://assets.mixkit.co/videos/preview/mixkit-clouds-and-sun-rays-41481-large.mp4' },
                ].map((vp, idx) => (
                  <button key={idx} onClick={()=>update('heroVideo', vp.url)}
                    style={{ padding:'8px 6px', borderRadius:8, border: websiteData.heroVideo===vp.url?'2px solid #6366F1':'1px solid #E5E7EB', background: websiteData.heroVideo===vp.url?'#EEF2FF':'#fff', cursor:'pointer', fontSize:'.72rem', fontWeight:700 }}>
                    {vp.name}
                  </button>
                ))}
              </div>
            </Section>
          </div>
        )}

        {/* ════════ TAB 3: ESTRUCTURA & MENÚ ════════ */}
        {activeTab === 'structure' && (
          <div>
            <Section title="Organizar & Ocultar Secciones" icon={<GripVertical size={14}/>} {...sec('sectionsOrder')}>
              <p style={{ fontSize: '.72rem', color: '#6B7280', margin: '0 0 12px', lineHeight: 1.5 }}>
                Arrastra o usa las flechas para reordenar las secciones del sitio web. Oculta las que no desees con el icono del ojo.
              </p>
              <SectionsOrderEditor
                sectionOrder={websiteData.sectionOrder}
                sectionsVisibility={websiteData.sectionsVisibility}
                data={websiteData}
                onChange={update}
              />
            </Section>

            <Section title="Menú de Navegación" icon={<Layout size={14}/>} {...sec('navLinks')}>
              <Field label="Texto Botón Nav (CTA)" value={websiteData.hero?.ctaText} onChange={v=>update('hero.ctaText',v)} placeholder="Planifica tu Visita" />
              <Field label="Enlace Botón Nav" value={websiteData.hero?.ctaLink} onChange={v=>update('hero.ctaLink',v)} placeholder="#wp-plan-visit" />
              <div style={S.divider} />
              <label style={S.label}>Enlaces del Menú</label>
              <NavLinksEditor links={websiteData.navLinks} onChange={v=>update('navLinks',v)} />
            </Section>

            <Section title="Redes Sociales" icon={<Globe size={14}/>} {...sec('social')}>
              {[
                { label:'YouTube', key:'social.youtube', ph:'https://youtube.com/@tucanal' },
                { label:'Instagram', key:'social.instagram', ph:'https://instagram.com/tuperfil' },
                { label:'Facebook', key:'social.facebook', ph:'https://facebook.com/tupagina' },
                { label:'TikTok', key:'social.tiktok', ph:'https://tiktok.com/@tuperfil' },
              ].map(s => (
                <Field key={s.key} label={s.label} value={s.key.split('.').reduce((o,k)=>o?.[k],websiteData)} onChange={v=>update(s.key,v)} placeholder={s.ph} />
              ))}
            </Section>
          </div>
        )}

        {/* ════════ TAB 4: AJUSTES & SEO ════════ */}
        {activeTab === 'settings' && (
          <div>
            <Section title="Información General & Logotipo" icon={<AlignLeft size={14}/>} {...sec('generalInfo')}>
              <Field label="Nombre de la Iglesia / Negocio" value={websiteData.businessName} onChange={v=>update('businessName',v)} />
              <Field label="Eslogan / Lema" value={websiteData.tagline} onChange={v=>update('tagline',v)} placeholder="Un lugar donde pertenecer, creer y crecer" />
              <ImageUploadBox label="Logotipo Personalizado" imageUrl={websiteData.logoImage} onUpload={url=>update('logoImage',url)} onClear={()=>update('logoImage','')} useCropper={true} />
              
              {/* Preset Examples requested by User */}
              <div style={{ marginTop: 14, background: '#F8FAFC', padding: '12px 14px', borderRadius: 12, border: '1px solid #E2E8F0' }}>
                <label style={{ fontSize: '0.78rem', fontWeight: 800, color: '#334155', display: 'block', marginBottom: 8 }}>
                  ✨ Generar Ejemplos de Logos Integrados:
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 6 }}>
                  <button
                    type="button"
                    onClick={() => update('logoImage', generateChurchLogoSvg(websiteData.businessName || 'Comunidad de Fe', 'logo1'))}
                    style={{ padding: '8px 12px', background: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: 8, fontSize: '0.75rem', fontWeight: 700, color: '#1E293B', cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 8 }}
                  >
                    <span>🔥</span>
                    <span>Ejemplo 1: Cruz con Llama & Círculo</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => update('logoImage', generateChurchLogoSvg(websiteData.businessName || 'Comunidad de Fe', 'logo2'))}
                    style={{ padding: '8px 12px', background: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: 8, fontSize: '0.75rem', fontWeight: 700, color: '#1E293B', cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 8 }}
                  >
                    <span>🕊️</span>
                    <span>Ejemplo 2: Cruz Dorada con Paloma & Rama de Olivo</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => update('logoImage', generateChurchLogoSvg(websiteData.businessName || 'Comunidad de Fe', 'logo3'))}
                    style={{ padding: '8px 12px', background: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: 8, fontSize: '0.75rem', fontWeight: 700, color: '#1E293B', cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 8 }}
                  >
                    <span>⛪</span>
                    <span>Ejemplo 3: Templo Arquitectónico Mínimo</span>
                  </button>
                </div>
              </div>

              {websiteData.logoImage && (
                <div style={{ marginTop:12 }}>
                  <label style={S.label}>Tamaño del logotipo (px)</label>
                  <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                    <input type="range" min={24} max={140} step={2} value={websiteData.logoSize||40} onChange={e=>update('logoSize',Number(e.target.value))} style={{ flex:1, accentColor:'#6366F1' }} />
                    <span style={{ fontWeight:700, fontSize:'.8rem', color:'#374151' }}>{websiteData.logoSize||40}px</span>
                  </div>
                </div>
              )}
            </Section>

            <Section title="SEO para Google" icon={<Search size={14}/>} {...sec('seo')}>
              <Field label="Título SEO (Google)" value={websiteData.seo?.title} onChange={v=>update('seo.title',v)} placeholder="Iglesia Vida Nueva | Bienvenido a Casa" />
              <Field label="Meta Descripción" value={websiteData.seo?.description} onChange={v=>update('seo.description',v)} multiline placeholder="Una comunidad de fe donde pertenecer, creer y crecer..." />
              <Field label="Subdominio Deseado" value={websiteData.subdomain} onChange={v=>update('subdomain',v.toLowerCase().replace(/[^a-z0-9-]/g,''))} placeholder="iglesia-vida-nueva" />
              <div style={{ fontSize:'.7rem', color:'#9CA3AF', marginTop:-8, marginBottom:8 }}>tu-subdominio.sitegen.app</div>
            </Section>
          </div>
        )}

        <div style={{ height: 60 }} />
      </div>
    </div>
  )
}
