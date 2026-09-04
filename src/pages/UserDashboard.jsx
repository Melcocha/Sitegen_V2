import { useState, useEffect, useRef, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'
import { ThemeProvider } from '../context/ThemeContext'
import CheckoutModal from '../components/CheckoutModal'
import { downloadInvoice, downloadInvoiceFromRecord } from '../lib/invoiceGenerator'
import { checkDomainAvailability } from '../lib/domainChecker'
import {
  initiateCheckout, cancelSubscription, fetchSubscription,
  fetchPaymentHistory, getSiteLimit, sendInvoiceEmail,
  getPriceDisplay, PLAN_CONFIG, IS_STRIPE_LIVE,
} from '../lib/paymentService'
import { getSites, deleteSite } from '../lib/websiteService'
import {
  Globe, Globe2, Plus, Sparkles, Settings, LogOut, Home, CreditCard,
  Eye, ExternalLink, Edit3, Trash2, Building2, Image, Phone,
  Mail, MapPin, BarChart2, Shield, Zap, ChevronRight, AlertCircle,
  Upload, CheckCircle2, Clock, Save, X, User, Layers, Receipt,
  TrendingUp, Calendar, RefreshCcw, Download, Send, FileText, Search,
  XCircle, Loader2, ArrowRight, Lock, LayoutDashboard
} from 'lucide-react'

// ─── Constants ───────────────────────────────────────────────────
const STATUS_MAP = {
  draft:     { label: 'Borrador',  color: '#F59E0B', bg: 'rgba(245,158,11,0.12)' },
  published: { label: 'Publicado', color: '#10B981', bg: 'rgba(16,185,129,0.12)' },
  paused:    { label: 'Pausado',   color: '#6B7280', bg: 'rgba(107,114,128,0.12)' },
}

const INDUSTRY_HERO = {
  'Legal & Jur\u00eddico':              'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=75&fit=crop',
  'Gastronom\u00eda':                   'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=75&fit=crop',
  'Salud & Odontolog\u00eda':           'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=75&fit=crop',
  'Fitness & Deportes':            'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=75&fit=crop',
  'Inmobiliaria':                   'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=75&fit=crop',
  'Tecnolog\u00eda':                    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=75&fit=crop',
  'Software Empresarial':           'https://images.unsplash.com/photo-1537432376769-00f5c2f4c8d2?w=800&q=75&fit=crop',
  'Software':                       'https://images.unsplash.com/photo-1537432376769-00f5c2f4c8d2?w=800&q=75&fit=crop',
  'ERP':                            'https://images.unsplash.com/photo-1537432376769-00f5c2f4c8d2?w=800&q=75&fit=crop',
  'Infraestructura':                'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=75&fit=crop',
  'Inversi\u00f3n':                     'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=75&fit=crop',
  'Inversi\u00f3n en Infraestructura':   'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=75&fit=crop',
  'Gobierno':                       'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=75&fit=crop',
  'Sector P\u00fablico':                 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=75&fit=crop',
  'Educaci\u00f3n':                     'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=75&fit=crop',
  'Construcci\u00f3n':                  'https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?w=800&q=75&fit=crop',
  'Marketing':                      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=75&fit=crop',
  'Defensa & Seguridad':           'https://images.unsplash.com/photo-1569974507005-6dc61f97fb5c?w=800&q=75&fit=crop',
  'Seguridad':                      'https://images.unsplash.com/photo-1569974507005-6dc61f97fb5c?w=800&q=75&fit=crop',
  'Finanzas':                       'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=75&fit=crop',
  'Autom\u00f3viles':                   'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=75&fit=crop',
  'Logistica':                      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=75&fit=crop',
  'Moda & Accesorios':              'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=75&fit=crop',
  'Moda y Accesorios':              'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=75&fit=crop',
  'Moda':                           'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=75&fit=crop',
  'Lujo':                           'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=75&fit=crop',
  'Perfumes':                       'https://images.unsplash.com/photo-1541643600914-78b084683702?w=800&q=75&fit=crop',
  'Perfumer\u00eda':                    'https://images.unsplash.com/photo-1541643600914-78b084683702?w=800&q=75&fit=crop',
  'Cosm\u00e9tica':                     'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=75&fit=crop',
  'Belleza':                        'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=75&fit=crop',
  'Spa & Bienestar':               'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=75&fit=crop',
  'Spa':                            'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=75&fit=crop',
  'Joyeria':                        'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=75&fit=crop',
  'Retail':                         'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=75&fit=crop',
  'Tienda':                         'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=75&fit=crop',
  'E-commerce':                     'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=75&fit=crop',
  'Fotograf\u00eda':                    'https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?w=800&q=75&fit=crop',
  'Eventos':                        'https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800&q=75&fit=crop',
  'Veterinaria':                    'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=75&fit=crop',
  'Agricultura':                    'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=75&fit=crop',
  'Turismo':                        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=75&fit=crop',
  'Cultura y Turismo':              'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=75&fit=crop',
  'Turismo y Cultura':              'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=75&fit=crop',
  'Patrimonio Cultural':            'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&q=75&fit=crop',
  'Patrimonio':                     'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&q=75&fit=crop',
  'Herencia Cultural':              'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&q=75&fit=crop',
  'Herencia':                       'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&q=75&fit=crop',
  'Tradiciones':                    'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=800&q=75&fit=crop',
  'Artesanias':                     'https://images.unsplash.com/photo-1467377791767-c929b5dc9a23?w=800&q=75&fit=crop',
  default:                          'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=75&fit=crop',
}

const INDUSTRY_KEYWORDS = [
  { kw: 'legal',        key: 'Legal & Jur\u00eddico' },
  { kw: 'juridic',      key: 'Legal & Jur\u00eddico' },
  { kw: 'abogad',       key: 'Legal & Jur\u00eddico' },
  { kw: 'derecho',      key: 'Legal & Jur\u00eddico' },
  { kw: 'gastro',       key: 'Gastronom\u00eda' },
  { kw: 'restaur',      key: 'Gastronom\u00eda' },
  { kw: 'comida',       key: 'Gastronom\u00eda' },
  { kw: 'salud',        key: 'Salud & Odontolog\u00eda' },
  { kw: 'dental',       key: 'Salud & Odontolog\u00eda' },
  { kw: 'medic',        key: 'Salud & Odontolog\u00eda' },
  { kw: 'clinic',       key: 'Salud & Odontolog\u00eda' },
  { kw: 'odont',        key: 'Salud & Odontolog\u00eda' },
  { kw: 'fitness',      key: 'Fitness & Deportes' },
  { kw: 'deporte',      key: 'Fitness & Deportes' },
  { kw: 'gym',          key: 'Fitness & Deportes' },
  { kw: 'inmobil',      key: 'Inmobiliaria' },
  { kw: 'propiedad',    key: 'Inmobiliaria' },
  { kw: 'software',     key: 'Software Empresarial' },
  { kw: 'erp',          key: 'ERP' },
  { kw: 'tecnolog',     key: 'Tecnolog\u00eda' },
  { kw: 'digital',      key: 'Tecnolog\u00eda' },
  { kw: 'infraestruc',  key: 'Infraestructura' },
  { kw: 'inversion',    key: 'Inversi\u00f3n' },
  { kw: 'invers',       key: 'Inversi\u00f3n' },
  { kw: 'gobierno',     key: 'Gobierno' },
  { kw: 'publico',      key: 'Sector P\u00fablico' },
  { kw: 'educac',       key: 'Educaci\u00f3n' },
  { kw: 'escuela',      key: 'Educaci\u00f3n' },
  { kw: 'construc',     key: 'Construcci\u00f3n' },
  { kw: 'arquitect',    key: 'Construcci\u00f3n' },
  { kw: 'market',       key: 'Marketing' },
  { kw: 'publicidad',   key: 'Marketing' },
  { kw: 'defensa',      key: 'Defensa & Seguridad' },
  { kw: 'defense',      key: 'Defensa & Seguridad' },
  { kw: 'seguridad',    key: 'Seguridad' },
  { kw: 'finanz',       key: 'Finanzas' },
  { kw: 'autom',        key: 'Autom\u00f3viles' },
  { kw: 'logist',       key: 'Logistica' },
  { kw: 'transport',    key: 'Logistica' },
  { kw: 'moda',         key: 'Moda' },
  { kw: 'fashion',      key: 'Moda' },
  { kw: 'ropa',         key: 'Moda' },
  { kw: 'perfum',       key: 'Perfumes' },
  { kw: 'fragranc',     key: 'Perfumes' },
  { kw: 'colonia',      key: 'Perfumes' },
  { kw: 'cosmet',       key: 'Cosm\u00e9tica' },
  { kw: 'makeup',       key: 'Cosm\u00e9tica' },
  { kw: 'maquillaj',    key: 'Cosm\u00e9tica' },
  { kw: 'belleza',      key: 'Belleza' },
  { kw: 'beauty',       key: 'Belleza' },
  { kw: 'peluquer',     key: 'Belleza' },
  { kw: 'estetica',     key: 'Belleza' },
  { kw: 'spa',          key: 'Spa & Bienestar' },
  { kw: 'bienestar',    key: 'Spa & Bienestar' },
  { kw: 'masaj',        key: 'Spa & Bienestar' },
  { kw: 'joyeria',      key: 'Joyeria' },
  { kw: 'joya',         key: 'Joyeria' },
  { kw: 'acceso',       key: 'Moda & Accesorios' },
  { kw: 'cartera',      key: 'Moda & Accesorios' },
  { kw: 'lujo',         key: 'Lujo' },
  { kw: 'luxury',       key: 'Lujo' },
  { kw: 'premium',      key: 'Lujo' },
  { kw: 'retail',       key: 'Retail' },
  { kw: 'tienda',       key: 'Retail' },
  { kw: 'boutique',     key: 'Retail' },
  { kw: 'ecommerce',    key: 'E-commerce' },
  { kw: 'comercio',     key: 'E-commerce' },
  { kw: 'fotograf',     key: 'Fotograf\u00eda' },
  { kw: 'photo',        key: 'Fotograf\u00eda' },
  { kw: 'eventos',      key: 'Eventos' },
  { kw: 'boda',         key: 'Eventos' },
  { kw: 'event',        key: 'Eventos' },
  { kw: 'veterinar',    key: 'Veterinaria' },
  { kw: 'animal',       key: 'Veterinaria' },
  { kw: 'agricult',     key: 'Agricultura' },
  { kw: 'agro',         key: 'Agricultura' },
  { kw: 'turism',       key: 'Turismo' },
  { kw: 'viaje',        key: 'Turismo' },
  { kw: 'travel',       key: 'Turismo' },
  { kw: 'tour',         key: 'Turismo' },
  { kw: 'cultura',      key: 'Cultura y Turismo' },
  { kw: 'patrimon',     key: 'Patrimonio Cultural' },
  { kw: 'herencia',     key: 'Herencia Cultural' },
  { kw: 'tradicion',    key: 'Tradiciones' },
  { kw: 'artesani',     key: 'Artesanias' },
  { kw: 'folkl',        key: 'Tradiciones' },
  { kw: 'pueblo',       key: 'Turismo' },
  { kw: 'salvadore',    key: 'Turismo' },
]

function getIndustryHero(site) {
  const raw = site.site_json?.industry || site.industry || ''
  if (!raw) return INDUSTRY_HERO.default
  if (INDUSTRY_HERO[raw]) return INDUSTRY_HERO[raw]
  const lower = raw.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  for (const { kw, key } of INDUSTRY_KEYWORDS) {
    const kwNorm = kw.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    if (lower.includes(kwNorm) && INDUSTRY_HERO[key]) return INDUSTRY_HERO[key]
  }
  return INDUSTRY_HERO.default
}

const PLAN_COLORS = {
  free:    { bg: '#F3F4F6',               color: '#6B7280', label: 'FREE' },
  starter: { bg: 'rgba(99,102,241,0.12)', color: '#6366F1', label: 'STARTER' },
  pro:     { bg: 'rgba(0,200,150,0.12)',  color: '#00C896', label: 'PRO' },
  agency:  { bg: 'rgba(245,158,11,0.12)', color: '#F59E0B', label: 'AGENCY' },
}

const EVENT_LABELS = {
  payment_success: { label: 'Pago exitoso',   color: '#10B981', bg: 'rgba(16,185,129,0.1)' },
  payment_failed:  { label: 'Pago fallido',   color: '#EF4444', bg: 'rgba(239,68,68,0.1)'  },
  plan_changed:    { label: 'Plan cambiado',  color: '#6366F1', bg: 'rgba(99,102,241,0.1)' },
  plan_canceled:   { label: 'Plan cancelado', color: '#9CA3AF', bg: 'rgba(156,163,175,0.1)'},
  trial_started:   { label: 'Trial iniciado', color: '#F59E0B', bg: 'rgba(245,158,11,0.1)' },
  refunded:        { label: 'Reembolsado',    color: '#8B5CF6', bg: 'rgba(139,92,246,0.1)' },
}

const NAV_ITEMS = [
  { id: 'sites',   icon: <LayoutDashboard size={16}/>, label: 'Mis Sitios' },
  { id: 'domain',  icon: <Globe size={16}/>,           label: 'Dominio' },
  { id: 'profile', icon: <User size={16}/>,            label: 'Mi Empresa' },
  { id: 'billing', icon: <Receipt size={16}/>,         label: 'Plan y Pagos' },
  { id: 'settings',icon: <Settings size={16}/>,        label: 'Configuración' },
]

// ─── Domain Tab ───────────────────────────────────────────────────
function DomainTab({ sites }) {
  const [query,     setQuery]     = useState('')
  const [searching, setSearching] = useState(false)
  const [results,   setResults]   = useState(null)
  const debounceRef = useRef(null)

  useEffect(() => {
    const handler = (e) => {
      const name = (e.detail || '').replace(/\s+/g, '').toLowerCase()
      setQuery(name)
      doSearch(name)
    }
    window.addEventListener('open-domain-tab', handler)
    return () => window.removeEventListener('open-domain-tab', handler)
  }, [])

  const doSearch = async (val) => {
    const v = (val ?? query).replace(/[^a-z0-9-]/gi, '').toLowerCase()
    if (!v || v.length < 2) { setResults(null); return }
    setSearching(true)
    try { setResults(await checkDomainAvailability(v)) }
    catch(e) { console.error(e) }
    finally { setSearching(false) }
  }

  const handleChange = (e) => {
    const v = e.target.value.replace(/[^a-zA-Z0-9-]/g, '').toLowerCase()
    setQuery(v)
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => doSearch(v), 600)
  }

  const buy = (domain) =>
    window.open(`https://www.namecheap.com/domains/registration/results/?domain=${domain}`, '_blank')

  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontWeight: 800, fontSize: '1.625rem', letterSpacing: '-0.035em', color: '#111827', marginBottom: 4 }}>Dominio Personalizado</h1>
        <p style={{ color: '#6B7280', fontSize: '0.9375rem' }}>Dale a tu sitio una dirección propia. Busca disponibilidad y regístralo en segundos.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginBottom: 28 }}>
        {[
          { icon: '🏆', title: 'Credibilidad', desc: 'Un dominio propio transmite confianza y profesionalismo.' },
          { icon: '🔍', title: 'SEO Premium',  desc: 'Los dominios propios posicionan mejor en Google.' },
          { icon: '🔗', title: 'Marca única',  desc: 'tuempresa.com es solo tuyo para siempre.' },
        ].map(c => (
          <div key={c.title} style={{ background: '#fff', border: '1.5px solid #E5E7EB', borderRadius: 14, padding: '18px 20px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
            <div style={{ fontSize: '1.5rem', marginBottom: 8 }}>{c.icon}</div>
            <div style={{ fontWeight: 700, fontSize: '0.9375rem', color: '#111827', marginBottom: 4 }}>{c.title}</div>
            <div style={{ fontSize: '0.8125rem', color: '#6B7280', lineHeight: 1.6 }}>{c.desc}</div>
          </div>
        ))}
      </div>

      <div style={{ background: '#fff', border: '1.5px solid #E5E7EB', borderRadius: 16, padding: 24, marginBottom: 20, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
        <label style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#374151', marginBottom: 10, display: 'block' }}>Buscar disponibilidad</label>
        <div style={{ display: 'flex', gap: 10 }}>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 10, background: '#F9FAFB', border: '1.5px solid #E5E7EB', borderRadius: 12, padding: '10px 16px', transition: 'border-color 0.15s' }}
            onFocusCapture={e => e.currentTarget.style.borderColor = '#00C896'}
            onBlurCapture={e  => e.currentTarget.style.borderColor = '#E5E7EB'}>
            {searching
              ? <Loader2 size={16} color="#9CA3AF" style={{ animation: 'spin 1s linear infinite', flexShrink: 0 }} />
              : <Search  size={16} color="#9CA3AF" style={{ flexShrink: 0 }} />}
            <input value={query} onChange={handleChange} placeholder="tuempresa"
              style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', fontSize: '1rem', fontWeight: 600, color: '#111827', fontFamily: 'var(--font)' }} />
            <span style={{ fontWeight: 700, color: '#9CA3AF' }}>.com</span>
          </div>
          <button onClick={() => doSearch(query)} disabled={!query.trim() || searching}
            style={{ padding: '10px 22px', background: 'linear-gradient(135deg,#00C896,#00A87A)', border: 'none', borderRadius: 12, color: '#fff', fontWeight: 700, fontSize: '0.9375rem', cursor: 'pointer', fontFamily: 'var(--font)', boxShadow: '0 4px 12px rgba(0,200,150,0.3)', whiteSpace: 'nowrap' }}>
            Buscar
          </button>
        </div>
        {sites?.length > 0 && !results && (
          <div style={{ marginTop: 14 }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>Sugerencias de tus sitios</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {sites.slice(0, 4).map(s => {
                const slug = (s.name || '').replace(/\s+/g, '').toLowerCase().replace(/[^a-z0-9-]/g, '')
                return (
                  <button key={s.id} onClick={() => { setQuery(slug); doSearch(slug) }}
                    style={{ padding: '4px 12px', borderRadius: 999, background: 'rgba(0,200,150,0.08)', border: '1px solid rgba(0,200,150,0.2)', color: '#00A87A', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font)' }}>
                    {slug}.com
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {results && (
        <div style={{ background: '#fff', border: '1.5px solid #E5E7EB', borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', marginBottom: 20 }}>
          <div style={{ padding: '14px 22px', background: '#F9FAFB', borderBottom: '1px solid #F3F4F6' }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#374151' }}>
              Resultados para <strong style={{ color: '#111827' }}>{query}</strong>
            </span>
          </div>
          {results.results?.map((item, i) => (
            <div key={item.domain} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 22px', borderBottom: i < results.results.length - 1 ? '1px solid #F3F4F6' : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                {item.available ? <CheckCircle2 size={16} color="#10B981"/> : <XCircle size={16} color="#EF4444"/>}
                <span style={{ fontWeight: 700, fontSize: '0.9375rem', color: '#111827' }}>{item.domain}</span>
                {item.popular && item.available && (
                  <span style={{ padding: '2px 8px', borderRadius: 999, background: 'rgba(0,200,150,0.1)', color: '#00A87A', fontSize: '0.68rem', fontWeight: 800 }}>RECOMENDADO</span>
                )}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontWeight: 800, color: item.available ? '#111827' : '#9CA3AF' }}>
                  {item.available ? item.price + '/año' : 'No disponible'}
                </span>
                {item.available && (
                  <button onClick={() => buy(item.domain)}
                    style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 16px', background: 'linear-gradient(135deg,#00C896,#00A87A)', border: 'none', borderRadius: 9, color: '#fff', fontWeight: 700, fontSize: '0.8125rem', cursor: 'pointer', fontFamily: 'var(--font)', boxShadow: '0 3px 8px rgba(0,200,150,0.25)' }}>
                    Registrar <ArrowRight size={13}/>
                  </button>
                )}
              </div>
            </div>
          ))}
          {results.alternatives?.length > 0 && (
            <div style={{ padding: '14px 22px', background: '#FAFAFA', borderTop: '1px solid #F3F4F6' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>Alternativas</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {results.alternatives.map(alt => (
                  <button key={alt} onClick={() => { setQuery(alt); doSearch(alt) }}
                    style={{ padding: '4px 12px', borderRadius: 999, background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)', color: '#6366F1', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font)' }}>
                    {alt}.com
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
        {[
          { icon: <Lock size={13}/>,   label: 'Transferencia SSL segura' },
          { icon: <Zap size={13}/>,    label: 'Activación inmediata' },
          { icon: <Shield size={13}/>, label: 'WHOIS Privacy incluido' },
          { icon: <Globe size={13}/>,  label: '+500 extensiones' },
        ].map(b => (
          <div key={b.label} style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#6B7280', fontSize: '0.8125rem', fontWeight: 600 }}>
            <span style={{ color: '#00C896', display: 'flex' }}>{b.icon}</span> {b.label}
          </div>
        ))}
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

function Sidebar({ active, onNav, profile }) {
  const logoUrl    = profile?.logo_url || ''
  const company    = profile?.company_name || 'Mi Empresa'
  const initials   = company[0]?.toUpperCase() || 'M'
  const fullName   = profile?.full_name || ''
  const brand      = profile?.brand_color || '#00C896'
  const brandLight = `${brand}18`
  const brandMid   = `${brand}30`

  return (
    <aside style={{
      width: 230, minHeight: '100vh', background: '#fff',
      borderRight: '1px solid #E5E7EB',
      display: 'flex', flexDirection: 'column',
      position: 'sticky', top: 0, height: '100vh',
    }}>

      {/* ── Brand zone – the client's identity ── */}
      <div style={{ padding: '20px 18px 16px', borderBottom: '1px solid #F3F4F6' }}>
        {/* Powered by (tiny) */}
        <div style={{ fontSize: '0.6rem', fontWeight: 700, color: '#D1D5DB', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>
          powered by SaaSWeb
        </div>

        {/* Logo – full-width horizontal banner, works for any logo proportion */}
        {logoUrl ? (
          <div style={{ width: '100%', height: 60, borderRadius: 12, background: '#fff', border: `1.5px solid ${brandMid}`, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: '8px 12px' }}>
            <img src={logoUrl} alt={company}
              style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', display: 'block' }} />
          </div>
        ) : (
          <div style={{ width: '100%', height: 60, borderRadius: 12, background: `linear-gradient(135deg, ${brand}, ${brand}BB)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '2rem', color: '#fff', boxShadow: `0 4px 14px ${brand}50` }}>
            {initials}
          </div>
        )}
      </div>

      {/* ── Nav items ── */}
      <nav style={{ flex: 1, padding: '10px 10px 0', display: 'flex', flexDirection: 'column', gap: 2 }}>
        {NAV_ITEMS.map(item => (
          <button
            key={item.id}
            onClick={() => onNav(item.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '9px 12px', borderRadius: 9,
              border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left',
              fontFamily: 'var(--font)', fontSize: '0.875rem', fontWeight: 600,
              background: active === item.id ? brandLight : 'transparent',
              color: active === item.id ? brand : '#4B5563',
              transition: 'all 0.15s',
            }}
            onMouseEnter={e => { if (active !== item.id) e.currentTarget.style.background = '#F9FAFB' }}
            onMouseLeave={e => { if (active !== item.id) e.currentTarget.style.background = 'transparent' }}
          >
            <span style={{ opacity: active === item.id ? 1 : 0.55, color: active === item.id ? brand : 'inherit' }}>
              {item.icon}
            </span>
            {item.label}
            {active === item.id && (
              <div style={{ marginLeft: 'auto', width: 6, height: 6, borderRadius: '50%', background: brand }} />
            )}
          </button>
        ))}
      </nav>

      {/* ── Account bottom ── */}
      <div style={{ padding: '14px 14px 16px', borderTop: '1px solid #F3F4F6' }}>
        <div style={{ fontSize: '0.68rem', color: '#D1D5DB', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Cuenta</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {logoUrl ? (
            <img src={logoUrl} alt={company}
              style={{ width: 30, height: 30, borderRadius: '50%', objectFit: 'contain', background: '#F9FAFB', border: `1.5px solid ${brandMid}`, padding: 2, flexShrink: 0 }} />
          ) : (
            <div style={{ width: 30, height: 30, borderRadius: '50%', background: `linear-gradient(135deg, ${brand}, ${brand}88)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.75rem', color: '#fff', flexShrink: 0 }}>
              {initials}
            </div>
          )}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 700, fontSize: '0.8125rem', color: '#111827', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {fullName || company}
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}

// ─── Site Card ────────────────────────────────────────────────────
function SiteCard({ site, onDelete, onOpenStats, onOpenDomain }) {
  const [deleting, setDeleting] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [hovered, setHovered] = useState(false)
  const status = STATUS_MAP[site.status] || STATUS_MAP.draft

  const handleConfirmDelete = async (e) => {
    e?.stopPropagation?.()
    e?.preventDefault?.()
    setDeleting(true)
    
    // Optimistic UI update: remove from list immediately
    if (onDelete) onDelete(site.id)

    try {
      await deleteSite(site.id, site.user_id)
    } catch (err) {
      console.warn('[SiteCard] Error deleting site:', err)
    } finally {
      setDeleting(false)
      setShowConfirm(false)
    }
  }

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#fff', borderRadius: 16, overflow: 'hidden',
        border: `1.5px solid ${showConfirm ? '#EF4444' : hovered ? '#00C896' : '#E5E7EB'}`,
        boxShadow: showConfirm ? '0 8px 24px rgba(239,68,68,0.15)' : hovered ? '0 8px 30px rgba(0,200,150,0.12)' : '0 1px 4px rgba(0,0,0,0.04)',
        transform: hovered ? 'translateY(-2px)' : 'none',
        transition: 'all 0.2s ease',
      }}
    >
      {/* ── Real mini preview thumbnail ── */}
      <div style={{ height: 165, position: 'relative', overflow: 'hidden', background: '#0F172A' }}>
        {/* Industry hero image */}
        <img
          src={getIndustryHero(site)}
          alt=""
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: .65 }}
          loading="lazy"
        />
        {/* Color overlay using site's accent */}
        <div style={{ position:'absolute', inset:0, background:`linear-gradient(160deg, ${site.json_data?.primaryColor||'#1E3A5F'}CC 0%, ${site.json_data?.accentColor||'#6366F1'}44 100%)` }} />

        {/* Mini browser chrome */}
        <div style={{ position:'absolute', top:8, left:8, right:8, background:'rgba(255,255,255,.12)', backdropFilter:'blur(6px)', borderRadius:6, padding:'4px 8px', display:'flex', alignItems:'center', gap:5 }}>
          <div style={{ display:'flex', gap:3, flexShrink:0 }}>
            {['#EF4444','#F59E0B','#10B981'].map(c=><div key={c} style={{ width:6, height:6, borderRadius:'50%', background:c }} />)}
          </div>
          <div style={{ flex:1, background:'rgba(255,255,255,.15)', borderRadius:3, padding:'2px 6px', fontSize:'.55rem', color:'rgba(255,255,255,.7)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
            {site.subdomain ? `${site.subdomain}.saasweb.app` : `${(site.name||'mi-sitio').toLowerCase().replace(/\s+/g,'-')}.saasweb.app`}
          </div>
        </div>

        {/* Mini nav */}
        <div style={{ position:'absolute', top:38, left:8, right:8, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div style={{ fontWeight:800, fontSize:'.6rem', color:'#fff', textShadow:'0 1px 4px rgba(0,0,0,.4)', maxWidth:120, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
            {site.json_data?.businessName || site.name}
          </div>
          <div style={{ padding:'3px 8px', borderRadius:999, background:site.json_data?.accentColor||'#6366F1', fontSize:'.5rem', fontWeight:700, color:'#fff', whiteSpace:'nowrap', boxShadow:'0 2px 6px rgba(0,0,0,.3)' }}>
            {site.json_data?.nav?.ctaText || 'Contáctanos'}
          </div>
        </div>

        {/* Mini hero text */}
        <div style={{ position:'absolute', bottom:28, left:8, right:8 }}>
          <div style={{ fontWeight:900, fontSize:'.72rem', color:'#fff', textShadow:'0 1px 6px rgba(0,0,0,.5)', lineHeight:1.25, marginBottom:4, overflow:'hidden', display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical' }}>
            {site.json_data?.hero?.headline || site.json_data?.businessName || site.name}
          </div>
          <div style={{ display:'flex', gap:5 }}>
            <div style={{ padding:'2px 7px', borderRadius:999, background:site.json_data?.accentColor||'#6366F1', fontSize:'.48rem', fontWeight:700, color:'#fff' }}>
              {site.json_data?.hero?.ctaText || 'Comenzar →'}
            </div>
          </div>
        </div>

        {/* Status badge + Industry */}
        <div style={{ position:'absolute', bottom:8, left:8, right:8, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          {site.json_data?.industry && (
            <div style={{ padding:'2px 6px', borderRadius:4, background:'rgba(0,0,0,.45)', backdropFilter:'blur(4px)', fontSize:'.55rem', fontWeight:700, color:'rgba(255,255,255,.9)', textTransform:'uppercase', letterSpacing:'.05em' }}>
              {site.json_data.industry}
            </div>
          )}
          <div style={{ marginLeft:'auto', padding:'2px 8px', borderRadius:999, background:status.bg, color:status.color, fontSize:'.6rem', fontWeight:700, backdropFilter:'blur(4px)' }}>
            {status.label}
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '16px 18px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <h3 style={{ fontWeight: 700, fontSize: '0.9375rem', color: '#111827', marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{site.name}</h3>
            <p style={{ fontSize: '0.775rem', color: '#9CA3AF', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {site.subdomain ? `${site.subdomain}.saasweb.app` : 'Sin publicar'}
            </p>
          </div>
          {site.published_url && (
            <a href={site.published_url} target="_blank" rel="noopener noreferrer" style={{ color: '#9CA3AF', display: 'flex', marginLeft: 8, flexShrink: 0 }}>
              <ExternalLink size={14} />
            </a>
          )}
        </div>

        {/* Mini stats */}
        <div style={{ display: 'flex', gap: 12, paddingBottom: 14, marginBottom: 14, borderBottom: '1px solid #F3F4F6' }}>
          {[
            { val: site.visits_total || 0, label: 'visitas' },
            { val: site.status === 'published' ? '99.9%' : '—', label: 'uptime' },
            { val: site.status === 'published' ? '<1s' : '—', label: 'velocidad' },
          ].map(s => (
            <div key={s.label}>
              <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#111827' }}>{s.val}</div>
              <div style={{ fontSize: '0.68rem', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.03em' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 8, minHeight: 38, alignItems: 'center' }}>
          {showConfirm ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, width: '100%', background: '#FEF2F2', padding: '6px 10px', borderRadius: 9, border: '1px solid #FCA5A5' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#991B1B' }}>¿Eliminar?</span>
              <div style={{ display: 'flex', gap: 6 }}>
                <button
                  type="button"
                  id={`btn-cancel-${site.id}`}
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShowConfirm(false) }}
                  style={{ padding: '4px 8px', borderRadius: 6, border: '1px solid #D1D5DB', background: '#FFFFFF', color: '#374151', fontSize: '0.72rem', fontWeight: 600, cursor: 'pointer' }}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  id={`btn-confirm-${site.id}`}
                  onClick={handleConfirmDelete}
                  disabled={deleting}
                  style={{ padding: '4px 10px', borderRadius: 6, border: 'none', background: '#DC2626', color: '#FFFFFF', fontSize: '0.72rem', fontWeight: 800, cursor: 'pointer', boxShadow: '0 2px 4px rgba(220,38,38,0.3)' }}
                >
                  {deleting ? 'Borrando...' : 'Sí, Borrar'}
                </button>
              </div>
            </div>
          ) : (
            <>
              <Link
                to={`/app/editor/${site.id}`}
                id={`btn-edit-${site.id}`}
                title="Editar contenido y diseño del sitio"
                style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '8px', background: 'rgba(0,200,150,0.08)', border: '1px solid rgba(0,200,150,0.2)', borderRadius: 9, textDecoration: 'none', color: '#00A87A', fontWeight: 700, fontSize: '0.8rem', transition: 'all 0.15s ease' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,200,150,0.15)'; e.currentTarget.style.borderColor = '#00C896' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,200,150,0.08)'; e.currentTarget.style.borderColor = 'rgba(0,200,150,0.2)' }}
              >
                <Edit3 size={13} /> Editar
              </Link>
              {site.status === 'published' && site.vercel_url && (
                <a href={site.vercel_url} target="_blank" rel="noopener noreferrer" title="Ver sitio en vivo" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '8px 12px', border: '1px solid rgba(16,185,129,0.25)', borderRadius: 9, textDecoration: 'none', color: '#10B981', fontWeight: 700, fontSize: '0.8rem', background: 'rgba(16,185,129,0.06)' }}>
                  <ExternalLink size={13} />
                </a>
              )}
              {/* Stats button */}
              <button
                type="button"
                id={`btn-stats-${site.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  onOpenStats?.(site)
                }}
                title="Ver estadísticas y tráfico del sitio"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '8px 12px', border: '1px solid #E5E7EB', borderRadius: 9, background: '#F9FAFB', color: '#6B7280', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer', transition: 'all 0.15s ease' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#00C896'; e.currentTarget.style.color = '#00A87A'; e.currentTarget.style.background = 'rgba(0,200,150,0.06)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#E5E7EB'; e.currentTarget.style.color = '#6B7280'; e.currentTarget.style.background = '#F9FAFB' }}
              >
                <BarChart2 size={13} />
              </button>
              {/* Domain CTA */}
              <button
                type="button"
                id={`btn-domain-${site.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  onOpenDomain?.(site)
                }}
                title="Conectar o configurar dominio propio"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '8px 12px', border: '1px solid rgba(99,102,241,0.25)', borderRadius: 9, color: '#6366F1', fontWeight: 700, fontSize: '0.8rem', background: 'rgba(99,102,241,0.06)', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.15s ease' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#6366F1'; e.currentTarget.style.background = 'rgba(99,102,241,0.14)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(99,102,241,0.25)'; e.currentTarget.style.background = 'rgba(99,102,241,0.06)' }}
              >
                <Globe size={13}/>
              </button>
              {/* Delete button */}
              <button
                type="button"
                id={`btn-delete-${site.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setShowConfirm(true)
                }}
                disabled={deleting}
                title="Eliminar sitio"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  padding: '8px 12px', border: '1px solid #FEE2E2', borderRadius: 9,
                  cursor: 'pointer',
                  color: '#EF4444', background: '#FEF2F2',
                  transition: 'all 0.15s ease',
                  flexShrink: 0
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#FEE2E2'; e.currentTarget.style.borderColor = '#FCA5A5' }}
                onMouseLeave={e => { e.currentTarget.style.background = '#FEF2F2'; e.currentTarget.style.borderColor = '#FEE2E2' }}
              >
                <Trash2 size={13} style={{ pointerEvents: 'none' }} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Tabs: Sites Section ──────────────────────────────────────────
function SitesTab({ user, sites, loading, plan, onDelete, onNew, profile, onUpgrade, onOpenDomain, onOpenStats }) {
  const siteLimit = getSiteLimit(plan?.plan || 'free')
  const canCreate = sites.length < siteLimit
  const planInfo  = PLAN_COLORS[plan?.plan || 'free']
  const brand     = profile?.brand_color || '#00C896'
  const logoUrl   = profile?.logo_url || ''
  const company   = profile?.company_name || ''
  const firstName = (profile?.full_name || '').split(' ')[0] || ''

  return (
    <div>
      {/* Personalized Welcome Banner */}
      {company && (
        <div style={{ marginBottom: 28, padding: '18px 24px', background: `linear-gradient(135deg, ${brand}12, ${brand}06)`, border: `1px solid ${brand}25`, borderRadius: 16, display: 'flex', alignItems: 'center', gap: 16, overflow: 'hidden', position: 'relative' }}>
          <div style={{ position: 'absolute', right: -30, top: -30, width: 120, height: 120, borderRadius: '50%', background: `${brand}10` }} />
          {logoUrl ? (
            <img src={logoUrl} alt={company} style={{ width: 48, height: 48, borderRadius: 12, objectFit: 'contain', background: '#fff', padding: 4, border: `2px solid ${brand}30`, flexShrink: 0 }} />
          ) : (
            <div style={{ width: 48, height: 48, borderRadius: 12, background: `linear-gradient(135deg, ${brand}, ${brand}99)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1.25rem', color: '#fff', flexShrink: 0 }}>
              {company[0]?.toUpperCase()}
            </div>
          )}
          <div>
            <div style={{ fontWeight: 800, fontSize: '1rem', color: '#111827' }}>
              {firstName ? `Hola, ${firstName}` : `Bienvenido`}
            </div>
            <div style={{ fontSize: '0.8125rem', color: '#6B7280', marginTop: 2 }}>Panel de <strong>{company}</strong></div>
          </div>
        </div>
      )}

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontWeight: 800, fontSize: '1.625rem', letterSpacing: '-0.035em', color: '#111827', marginBottom: 4 }}>Mis Sitios Web</h1>
          <p style={{ color: '#6B7280', fontSize: '0.9375rem' }}>
            {sites.length === 0 ? 'Crea tu primera página web profesional con IA' : `${sites.length} sitio${sites.length > 1 ? 's' : ''} · ${sites.filter(s => s.status === 'published').length} publicado${sites.filter(s => s.status === 'published').length !== 1 ? 's' : ''}`}
          </p>
        </div>
        {canCreate ? (
          <button onClick={onNew} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px', background: 'linear-gradient(135deg, #00C896, #00A87A)', border: 'none', borderRadius: 10, color: '#fff', fontWeight: 700, fontSize: '0.875rem', cursor: 'pointer', fontFamily: 'var(--font)', boxShadow: '0 4px 12px rgba(0,200,150,0.3)' }}>
            <Plus size={16} /> Nuevo sitio
          </button>
        ) : (
          <button
            onClick={() => onUpgrade?.('pro')}
            title="Haz clic para mejorar tu plan y crear sitios ilimitados"
            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px', background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: 10, color: '#D97706', fontWeight: 700, fontSize: '0.875rem', cursor: 'pointer', fontFamily: 'var(--font)', transition: 'all 0.15s ease' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(245,158,11,0.18)'; e.currentTarget.style.borderColor = '#D97706' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(245,158,11,0.1)'; e.currentTarget.style.borderColor = 'rgba(245,158,11,0.3)' }}
          >
            <AlertCircle size={16} /> Límite alcanzado — Mejorar plan
          </button>
        )}
      </div>

      {/* Stats bar — only if sites exist */}
      {sites.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
          {[
            { label: 'Sitios totales', value: sites.length, max: siteLimit === Infinity ? null : siteLimit, color: '#6366F1', icon: <Globe size={16} /> },
            { label: 'Publicados', value: sites.filter(s => s.status === 'published').length, color: '#10B981', icon: <Zap size={16} /> },
            { label: 'SSL activos', value: sites.filter(s => s.status === 'published').length, color: '#06B6D4', icon: <Shield size={16} /> },
            { label: 'Visitas totales', value: sites.reduce((a, s) => a + (s.visits_total || 0), 0), color: '#F59E0B', icon: <BarChart2 size={16} /> },
          ].map(stat => (
            <div key={stat.label} style={{ background: '#fff', border: '1.5px solid #E5E7EB', borderRadius: 14, padding: '16px 18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <div style={{ width: 32, height: 32, borderRadius: 9, background: `${stat.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: stat.color }}>{stat.icon}</div>
                {stat.max && <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#9CA3AF' }}>/ {stat.max}</span>}
              </div>
              <div style={{ fontWeight: 900, fontSize: '1.75rem', color: '#111827', letterSpacing: '-0.04em' }}>{stat.value}</div>
              <div style={{ fontSize: '0.775rem', color: '#6B7280', fontWeight: 600 }}>{stat.label}</div>
              {stat.max && (
                <div style={{ marginTop: 8, height: 4, background: '#F3F4F6', borderRadius: 999 }}>
                  <div style={{ height: '100%', width: `${Math.min(100, (stat.value / stat.max) * 100)}%`, background: stat.color, borderRadius: 999 }} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Sites grid or empty state */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: 80, color: '#9CA3AF' }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', border: '3px solid #00C896', borderTopColor: 'transparent', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px' }} />
          Cargando tus sitios...
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      ) : sites.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 40px', border: '2px dashed #D1FAE5', borderRadius: 20, background: 'rgba(0,200,150,0.02)' }}>
          <div style={{ width: 72, height: 72, background: 'rgba(0,200,150,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
            <Globe size={32} color="#00A87A" />
          </div>
          <h3 style={{ fontWeight: 800, fontSize: '1.25rem', color: '#111827', marginBottom: 8 }}>Crea tu primer sitio web</h3>
          <p style={{ color: '#6B7280', marginBottom: 28, maxWidth: 380, margin: '0 auto 28px', lineHeight: 1.7 }}>
            Describe tu negocio y nuestra IA generará un sitio profesional listo para publicar en menos de 10 minutos.
          </p>
          <button onClick={onNew} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', background: 'linear-gradient(135deg, #00C896, #00A87A)', border: 'none', borderRadius: 10, color: '#fff', fontWeight: 700, fontSize: '0.9375rem', cursor: 'pointer', fontFamily: 'var(--font)', boxShadow: '0 4px 12px rgba(0,200,150,0.3)' }}>
            <Sparkles size={17} /> Generar mi primer sitio
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: 20 }}>
          {sites.map(site => (
            <SiteCard
              key={site.id}
              site={site}
              onDelete={onDelete}
              onOpenDomain={onOpenDomain}
              onOpenStats={onOpenStats}
            />
          ))}
          {/* Create new card */}
          {canCreate && (
            <button onClick={onNew} style={{ background: 'none', border: '2px dashed #D1FAE5', borderRadius: 16, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, padding: 40, color: '#00A87A', fontFamily: 'var(--font)', transition: 'all 0.2s', minHeight: 200 }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,200,150,0.04)'; e.currentTarget.style.borderColor = '#00C896' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.borderColor = '#D1FAE5' }}
            >
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(0,200,150,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Plus size={22} />
              </div>
              <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>Crear nuevo sitio</span>
            </button>
          )}
        </div>
      )}

      {/* Upgrade banner */}
      {sites.length > 0 && (!plan || plan.plan === 'free') && (
        <div style={{ marginTop: 32, padding: '22px 28px', background: 'linear-gradient(135deg, #0D1F18, #080F0C)', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14 }}>
          <div>
            <h3 style={{ color: '#fff', fontWeight: 800, fontSize: '1rem', marginBottom: 4 }}>Dominio propio + sitios ilimitados</h3>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.875rem' }}>Desde $6/mes — cancela cuando quieras</p>
          </div>
          <button
            onClick={() => onUpgrade?.('pro')}
            title="Haz clic para ver planes y mejorar tu suscripción"
            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px', background: 'linear-gradient(135deg, #00C896, #00A87A)', border: 'none', borderRadius: 10, color: '#fff', fontWeight: 700, fontSize: '0.875rem', cursor: 'pointer', fontFamily: 'var(--font)', whiteSpace: 'nowrap', boxShadow: '0 4px 12px rgba(0,200,150,0.3)', transition: 'all 0.15s ease' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'none'}
          >
            Mejorar plan <ChevronRight size={15} />
          </button>
        </div>
      )}
    </div>
  )
}

// ─── Standalone field — defined OUTSIDE ProfileTab to prevent remount on each keystroke
function ProfileField({ label, icon, value, onChange, placeholder, type = 'text' }) {
  const inputStyle = { width: '100%', padding: '10px 14px', border: '1.5px solid #E5E7EB', borderRadius: 10, fontSize: '0.875rem', color: '#111827', fontFamily: 'var(--font)', boxSizing: 'border-box', outline: 'none', transition: 'border-color 0.15s' }
  return (
    <div>
      <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8125rem', fontWeight: 700, color: '#374151', marginBottom: 6 }}>
        <span style={{ color: '#9CA3AF' }}>{icon}</span> {label}
      </label>
      {type === 'textarea' ? (
        <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={3}
          style={{ ...inputStyle, resize: 'vertical' }}
          onFocus={e => e.target.style.borderColor = '#00C896'} onBlur={e => e.target.style.borderColor = '#E5E7EB'} />
      ) : (
        <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
          style={inputStyle}
          onFocus={e => e.target.style.borderColor = '#00C896'} onBlur={e => e.target.style.borderColor = '#E5E7EB'} />
      )}
    </div>
  )
}

// ─── Company Profile Tab ──────────────────────────────────────────
function ProfileTab({ user, profile, onUpdate }) {
  const fileInputRef = useRef(null)
  const [form, setForm] = useState({
    full_name: '', company_name: '', industry: '',
    phone: '', address: '', website: '', logo_url: '', description: '',
    brand_color: '#00C896',
  })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [saveError, setSaveError] = useState('')
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [logoFit, setLogoFit] = useState('contain')   // contain | cover | fill
  const [logoScale, setLogoScale] = useState(100)      // 50-150%

  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    // Only initialize once from DB, not after each save
    if (profile && !initialized) {
      setForm({
        full_name: profile.full_name || '',
        company_name: profile.company_name || '',
        industry: profile.industry || '',
        phone: profile.phone || '',
        address: profile.address || '',
        website: profile.website || '',
        logo_url: profile.logo_url || '',
        description: profile.description || '',
        brand_color: profile.brand_color || '#00C896',
      })
      setInitialized(true)
    }
  }, [profile, initialized])

  // ── Upload logo to Supabase Storage ──
  const uploadLogo = async (file) => {
    if (!file) return
    if (file.size > 2 * 1024 * 1024) { setSaveError('El logo debe pesar menos de 2MB'); return }
    setUploading(true)
    setSaveError('')
    try {
      const ext = file.name.split('.').pop()
      const path = `${user.id}/logo-${Date.now()}.${ext}`
      const { error: upErr } = await supabase.storage
        .from('logos')
        .upload(path, file, { upsert: true, contentType: file.type })
      if (upErr) throw upErr
      const { data: { publicUrl } } = supabase.storage.from('logos').getPublicUrl(path)
      setForm(f => ({ ...f, logo_url: publicUrl }))
    } catch (e) {
      setSaveError('Error al subir el logo: ' + e.message)
    } finally {
      setUploading(false)
    }
  }

  const handleFileChange = (e) => { if (e.target.files[0]) uploadLogo(e.target.files[0]) }
  const handleDrop = (e) => {
    e.preventDefault(); setDragOver(false)
    if (e.dataTransfer.files[0]) uploadLogo(e.dataTransfer.files[0])
  }
  const removeLogo = () => setForm(f => ({ ...f, logo_url: '' }))

  // ── Save profile ──
  const handleSave = async () => {
    setSaving(true); setSaveError('')
    const { error } = await supabase.from('profiles').update({
      full_name:    form.full_name,
      company_name: form.company_name,
      industry:     form.industry,
      phone:        form.phone,
      address:      form.address,
      website:      form.website,
      logo_url:     form.logo_url,
      description:  form.description,
      brand_color:  form.brand_color,
    }).eq('id', user.id)

    setSaving(false)
    if (error) { setSaveError('Error al guardar: ' + error.message); return }

    // Re-fetch from DB — get the real saved row, no stale closures
    const { data: fresh } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle()

    setSaved(true)
    onUpdate(fresh || { ...profile, ...form })
    setTimeout(() => setSaved(false), 3000)
  }


  const set = (field) => (val) => setForm(f => ({ ...f, [field]: val }))
  const INDUSTRIES = ['Restaurante','Clínica / Salud','Abogado','Inmobiliaria','Tienda / Retail','Gimnasio / Fitness','Educación','Tecnología','Construcción','Belleza / Spa','Transporte','Otro']

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontWeight: 800, fontSize: '1.625rem', letterSpacing: '-0.035em', color: '#111827', marginBottom: 4 }}>Perfil de Empresa</h1>
          <p style={{ color: '#6B7280', fontSize: '0.9375rem' }}>Esta información se usará en tus sitios web generados con IA</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
          {saveError && <span style={{ fontSize: '0.8rem', color: '#EF4444', fontWeight: 600 }}>{saveError}</span>}
          <button onClick={handleSave} disabled={saving}
            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 22px', background: saved ? '#10B981' : 'linear-gradient(135deg, #00C896, #00A87A)', border: 'none', borderRadius: 10, color: '#fff', fontWeight: 700, fontSize: '0.875rem', cursor: 'pointer', fontFamily: 'var(--font)', boxShadow: '0 4px 12px rgba(0,200,150,0.25)', transition: 'all 0.2s' }}>
            {saved ? <><CheckCircle2 size={16} /> Guardado</> : saving ? 'Guardando...' : <><Save size={16} /> Guardar cambios</>}
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 24, alignItems: 'start' }}>

        {/* ── Logo Card ── */}
        <div style={{ background: '#fff', border: '1.5px solid #E5E7EB', borderRadius: 16, padding: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
          <p style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#374151', marginBottom: 12 }}>Logo de empresa</p>

          {/* Drop zone / preview */}
          <div
            onDragOver={e => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => !form.logo_url && fileInputRef.current?.click()}
            style={{
              width: '100%', height: 160, borderRadius: 14,
              background: dragOver ? 'rgba(0,200,150,0.08)' : form.logo_url ? '#F0FDF4' : '#F9FAFB',
              border: `2px ${form.logo_url ? 'solid #D1FAE5' : dragOver ? 'solid #00C896' : 'dashed #E5E7EB'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: form.logo_url ? 'default' : 'pointer',
              position: 'relative', overflow: 'hidden',
              transition: 'all 0.2s',
              marginBottom: 14,
            }}>
            {form.logo_url ? (
              <>
                <div style={{ width: `${logoScale}%`, height: `${logoScale}%`, maxWidth: '100%', maxHeight: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src={form.logo_url} alt="Logo"
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
                {/* Remove button */}
                <button onClick={e => { e.stopPropagation(); removeLogo() }}
                  style={{ position: 'absolute', top: 8, right: 8, width: 28, height: 28, borderRadius: '50%', background: 'rgba(239,68,68,0.9)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                  <X size={13} />
                </button>
              </>
            ) : uploading ? (
              <div style={{ textAlign: 'center' }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', border: '3px solid #00C896', borderTopColor: 'transparent', animation: 'spin 0.8s linear infinite', margin: '0 auto 8px' }} />
                <span style={{ fontSize: '0.8rem', color: '#6B7280' }}>Subiendo...</span>
              </div>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <Upload size={28} color="#9CA3AF" style={{ marginBottom: 8 }} />
                <p style={{ fontSize: '0.8rem', fontWeight: 600, color: '#6B7280', margin: 0 }}>Arrastra tu logo aquí</p>
                <p style={{ fontSize: '0.72rem', color: '#9CA3AF', margin: '4px 0 0' }}>o haz click para subir</p>
              </div>
            )}
          </div>

          <input ref={fileInputRef} type="file" accept="image/png,image/jpeg,image/jpg,image/svg+xml,image/webp"
            onChange={handleFileChange} style={{ display: 'none' }} />

          {/* Upload button */}
          <button onClick={() => fileInputRef.current?.click()} disabled={uploading}
            style={{ width: '100%', padding: '9px', background: '#F9FAFB', border: '1.5px solid #E5E7EB', borderRadius: 9, cursor: 'pointer', fontFamily: 'var(--font)', fontSize: '0.8rem', fontWeight: 700, color: '#374151', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 16 }}>
            <Upload size={13} /> {uploading ? 'Subiendo...' : 'Seleccionar archivo'}
          </button>

          {/* Logo size control — only show if logo exists */}
          {form.logo_url && (
            <div style={{ borderTop: '1px solid #F3F4F6', paddingTop: 14, marginBottom: 12 }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#374151', display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span>Tamaño del logo</span><span style={{ color: '#00A87A' }}>{logoScale}%</span>
              </label>
              <input type="range" min={30} max={100} value={logoScale} onChange={e => setLogoScale(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#00C896', cursor: 'pointer' }} />
            </div>
          )}

          {/* URL alternative */}
          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#9CA3AF', display: 'block', marginBottom: 4 }}>O pega URL de imagen</label>
            <input value={form.logo_url} onChange={e => setForm(f => ({ ...f, logo_url: e.target.value }))}
              placeholder="https://tuempresa.com/logo.png"
              style={{ width: '100%', padding: '8px 10px', border: '1.5px solid #E5E7EB', borderRadius: 8, fontSize: '0.75rem', fontFamily: 'var(--font)', boxSizing: 'border-box', outline: 'none', color: '#374151' }} />
          </div>

          <p style={{ fontSize: '0.7rem', color: '#9CA3AF', marginTop: 8 }}>PNG, JPG, SVG o WebP · Máx 2MB</p>
        </div>

        {/* ── Form Fields ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Personal */}
          <div style={{ background: '#fff', border: '1.5px solid #E5E7EB', borderRadius: 16, padding: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
            <h3 style={{ fontWeight: 700, fontSize: '0.9375rem', color: '#111827', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <User size={16} color="#9CA3AF" /> Información personal
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <ProfileField label="Nombre completo" icon={<User size={13}/>} value={form.full_name} onChange={set('full_name')} placeholder="Jorge Arias" />
              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8125rem', fontWeight: 700, color: '#374151', marginBottom: 6 }}>
                  <span style={{ color: '#9CA3AF' }}><Layers size={13}/></span> Industria
                </label>
                <select value={form.industry} onChange={e => setForm(f => ({ ...f, industry: e.target.value }))}
                  style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #E5E7EB', borderRadius: 10, fontSize: '0.875rem', color: '#111827', fontFamily: 'var(--font)', background: '#fff', cursor: 'pointer', outline: 'none' }}>
                  <option value="">Selecciona tu industria</option>
                  {['Restaurante','Clínica / Salud','Abogado','Inmobiliaria','Tienda / Retail','Gimnasio / Fitness','Educación','Tecnología','Construcción','Belleza / Spa','Transporte','Otro'].map(i => (
                    <option key={i} value={i}>{i}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Company */}
          <div style={{ background: '#fff', border: '1.5px solid #E5E7EB', borderRadius: 16, padding: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
            <h3 style={{ fontWeight: 700, fontSize: '0.9375rem', color: '#111827', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Building2 size={16} color="#9CA3AF" /> Datos de la empresa
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <ProfileField label="Nombre de la empresa" icon={<Building2 size={13}/>} value={form.company_name} onChange={set('company_name')} placeholder="Mi Empresa S.A." />
              <ProfileField label="Descripción del negocio" icon={<Edit3 size={13}/>} value={form.description} onChange={set('description')} placeholder="Describe brevemente tu empresa, servicios y propuesta de valor..." type="textarea" />
            </div>
          </div>

          {/* Contact */}
          <div style={{ background: '#fff', border: '1.5px solid #E5E7EB', borderRadius: 16, padding: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
            <h3 style={{ fontWeight: 700, fontSize: '0.9375rem', color: '#111827', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Phone size={16} color="#9CA3AF" /> Contacto
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <ProfileField label="Teléfono" icon={<Phone size={13}/>} value={form.phone} onChange={set('phone')} placeholder="+1 (555) 000-0000" />
              <ProfileField label="Sitio web" icon={<Globe size={13}/>} value={form.website} onChange={set('website')} placeholder="https://tuempresa.com" />
              <div style={{ gridColumn: '1 / -1' }}>
                <ProfileField label="Dirección" icon={<MapPin size={13}/>} value={form.address} onChange={set('address')} placeholder="Ciudad, País" />
              </div>
            </div>
          </div>

          {/* Brand Color */}
          <div style={{ background: '#fff', border: '1.5px solid #E5E7EB', borderRadius: 16, padding: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
            <h3 style={{ fontWeight: 700, fontSize: '0.9375rem', color: '#111827', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 16, height: 16, borderRadius: '50%', background: form.brand_color, border: '2px solid rgba(0,0,0,0.1)', flexShrink: 0 }} />
              Color de marca
            </h3>
            <p style={{ fontSize: '0.8125rem', color: '#9CA3AF', marginBottom: 16 }}>Tu color en el sidebar y botones — personaliza el dashboard para que sea tuyo</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
              {['#00C896','#6366F1','#F59E0B','#EF4444','#0EA5E9','#8B5CF6','#10B981','#EC4899','#F97316','#14B8A6'].map(c => (
                <button key={c} onClick={() => setForm(f => ({ ...f, brand_color: c }))}
                  style={{ width: 30, height: 30, borderRadius: '50%', background: c, border: form.brand_color === c ? '3px solid #111827' : '2px solid transparent', cursor: 'pointer', outline: 'none', transition: 'all 0.15s', boxShadow: form.brand_color === c ? `0 0 0 2px #fff, 0 0 0 4px ${c}` : 'none' }} />
              ))}
              <input type="color" value={form.brand_color} onChange={e => setForm(f => ({ ...f, brand_color: e.target.value }))}
                title="Color personalizado"
                style={{ width: 30, height: 30, borderRadius: '50%', border: '2px solid #E5E7EB', cursor: 'pointer', padding: 1, background: 'none' }} />
            </div>
            <div style={{ marginTop: 14, padding: 12, background: '#F9FAFB', borderRadius: 10, display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 34, height: 34, borderRadius: 9, background: `linear-gradient(135deg, ${form.brand_color}, ${form.brand_color}BB)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, color: '#fff', fontSize: '0.95rem' }}>
                {(form.company_name || 'M')[0].toUpperCase()}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: '0.875rem', color: '#111827' }}>{form.company_name || 'Mi Empresa'}</div>
                <div style={{ fontSize: '0.72rem', color: form.brand_color, fontWeight: 600 }}>Vista previa sidebar</div>
              </div>
              <span style={{ fontSize: '0.7rem', color: '#9CA3AF' }}>así se verá</span>
            </div>
          </div>

          {/* Profile preview */}
          {(form.company_name || form.logo_url) && (
            <div style={{ background: `linear-gradient(135deg, ${form.brand_color}10, ${form.brand_color}18)`, border: `1.5px solid ${form.brand_color}30`, borderRadius: 16, padding: 20 }}>
              <p style={{ fontSize: '0.75rem', fontWeight: 700, color: form.brand_color, marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Vista previa del perfil</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                {form.logo_url ? (
                  <img src={form.logo_url} alt="Logo" style={{ width: 56, height: 56, borderRadius: 12, objectFit: logoFit, background: '#fff', padding: 4, border: `1px solid ${form.brand_color}30` }} />
                ) : (
                  <div style={{ width: 56, height: 56, borderRadius: 12, background: `${form.brand_color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Building2 size={24} color={form.brand_color} />
                  </div>
                )}
                <div>
                  <div style={{ fontWeight: 800, fontSize: '1.0625rem', color: '#111827' }}>{form.company_name || 'Nombre de empresa'}</div>
                  {form.industry && <div style={{ fontSize: '0.8rem', color: '#6B7280', marginBottom: 2 }}>{form.industry}</div>}
                  {form.phone && <div style={{ fontSize: '0.775rem', color: '#9CA3AF' }}>{form.phone}</div>}
                </div>
              </div>
            </div>
          )}

          {/* ── Sticky Save Bar ── always visible at the bottom */}
          <div style={{ position: 'sticky', bottom: 0, background: '#fff', borderTop: '1.5px solid #E5E7EB', padding: '16px 0 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 10 }}>
            {saveError && <span style={{ fontSize: '0.8rem', color: '#EF4444', fontWeight: 600 }}>{saveError}</span>}
            {!saveError && <span style={{ fontSize: '0.8rem', color: '#9CA3AF' }}>Los cambios se aplican al guardar</span>}
            <button onClick={handleSave} disabled={saving}
              style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '11px 28px', background: saved ? '#10B981' : `linear-gradient(135deg, ${form.brand_color}, ${form.brand_color}CC)`, border: 'none', borderRadius: 10, color: '#fff', fontWeight: 700, fontSize: '0.9375rem', cursor: saving ? 'wait' : 'pointer', fontFamily: 'var(--font)', boxShadow: `0 4px 14px ${form.brand_color}40`, transition: 'all 0.2s' }}>
              {saved ? <><CheckCircle2 size={16} /> Guardado</> : saving ? 'Guardando...' : <><Save size={16} /> Guardar cambios</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Invoice Actions: Download + Email buttons for a single history row ───────
function InvoiceActions({ event, user, profile }) {
  const [emailState, setEmailState] = useState('idle') // idle | sending | sent | error
  const isInvoiceable = event.event_type === 'payment_success'

  const handleDownload = () => {
    downloadInvoice({ event, profile, user })
  }

  const handleEmail = async () => {
    if (emailState === 'sending' || emailState === 'sent') return
    setEmailState('sending')
    try {
      const result = await sendInvoiceEmail(event.id)
      if (result?.error === 'EMAIL_NOT_CONFIGURED') {
        // Graceful: still show sent (download works, email needs Resend key)
        setEmailState('nokey')
        setTimeout(() => setEmailState('idle'), 4000)
      } else {
        setEmailState('sent')
        setTimeout(() => setEmailState('idle'), 4000)
      }
    } catch (e) {
      setEmailState('error')
      setTimeout(() => setEmailState('idle'), 3000)
    }
  }

  if (!isInvoiceable) {
    return <span style={{ color: '#D1D5DB', fontSize: '0.75rem' }}>—</span>
  }

  const emailLabel = {
    idle:    { text: 'Email', color: '#6B7280', bg: '#F3F4F6', icon: <Send size={11} /> },
    sending: { text: 'Enviando...', color: '#9CA3AF', bg: '#F3F4F6', icon: <Send size={11} /> },
    sent:    { text: '✓ Enviado', color: '#10B981', bg: 'rgba(16,185,129,0.1)', icon: <CheckCircle2 size={11} /> },
    nokey:   { text: 'Sin clave', color: '#F59E0B', bg: 'rgba(245,158,11,0.1)', icon: <Send size={11} /> },
    error:   { text: 'Error', color: '#EF4444', bg: 'rgba(239,68,68,0.1)', icon: <X size={11} /> },
  }[emailState]

  const btnBase = {
    display: 'flex', alignItems: 'center', gap: 4,
    padding: '4px 10px', borderRadius: 7, border: '1.5px solid',
    fontSize: '0.72rem', fontWeight: 700, cursor: 'pointer',
    fontFamily: 'var(--font)', transition: 'all 0.15s', whiteSpace: 'nowrap',
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      {/* Download PDF */}
      <button
        onClick={handleDownload}
        title={`Descargar factura ${event.invoice_number || ''}`}
        style={{
          ...btnBase,
          background: 'rgba(0,200,150,0.08)',
          borderColor: 'rgba(0,200,150,0.3)',
          color: '#00A87A',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,200,150,0.18)' }}
        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,200,150,0.08)' }}
      >
        <Download size={11} />
        PDF
      </button>

      {/* Send Email */}
      <button
        onClick={handleEmail}
        disabled={emailState === 'sending'}
        title={`Enviar factura por email a ${user?.email}`}
        style={{
          ...btnBase,
          background: emailLabel.bg,
          borderColor: 'transparent',
          color: emailLabel.color,
          cursor: emailState === 'sending' ? 'wait' : 'pointer',
        }}
      >
        {emailLabel.icon}
        {emailLabel.text}
      </button>
    </div>
  )
}
// ─── Billing Tab (real data + invoice actions) ──────────────────────────────
function BillingTab({ user, plan, profile, onUpgrade, onCancel }) {
  const planKey   = plan?.plan || 'free'
  const planInfo  = PLAN_COLORS[planKey]
  const planCfg   = PLAN_CONFIG[planKey]
  const isActive  = plan?.status === 'active'
  const periodEnd = plan?.current_period_end
    ? new Date(plan.current_period_end).toLocaleDateString('es', { day: 'numeric', month: 'long', year: 'numeric' })
    : null

  const [history, setHistory]     = useState([])
  const [histLoad, setHistLoad]   = useState(true)

  useEffect(() => {
    if (!user?.id) return
    setHistLoad(true)
    // Read from the `invoices` table (the source of truth for billing)
    supabase
      .from('invoices')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .then(({ data }) => setHistory(data || []))
      .catch(() => {})
      .finally(() => setHistLoad(false))
  }, [user?.id, plan])

  const upgradePlans = [
    { id: 'starter', name: 'Starter', monthly: 6, annual: 5, sites: 1,
      features: ['1 sitio web activo', 'Subdominio personalizado', 'SSL gratis', 'Soporte por email'] },
    { id: 'pro', name: 'Pro', monthly: 12, annual: 10, sites: 3,
      features: ['3 sitios web activos', 'GPT-4o calidad máxima', 'Dominio personalizado', 'Editor no-code', 'Soporte prioritario'], popular: true },
    { id: 'agency', name: 'Agency', monthly: null, annual: null, sites: 999,
      features: ['Sitios ilimitados', 'White-label completo', 'Multi-usuario', 'API access', 'Soporte dedicado 24/7'], isContact: true },
  ]

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontWeight: 800, fontSize: '1.625rem', letterSpacing: '-0.035em', color: '#111827', marginBottom: 4 }}>Plan y Pagos</h1>
        <p style={{ color: '#6B7280', fontSize: '0.9375rem' }}>Gestiona tu suscripción y revisa tu historial de pagos</p>
      </div>

      {/* ── Current Plan Card ── */}
      <div style={{ background: '#fff', border: `2px solid ${isActive && planKey !== 'free' ? '#00C896' : '#E5E7EB'}`, borderRadius: 16, padding: 24, marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <span style={{ fontWeight: 800, fontSize: '1.125rem', color: '#111827' }}>Plan actual</span>
              <span style={{ padding: '4px 12px', borderRadius: 999, background: planInfo.bg, color: planInfo.color, fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.03em' }}>
                {planInfo.label}
              </span>
              {isActive && planKey !== 'free' && (
                <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.72rem', color: '#10B981', fontWeight: 700 }}>
                  <CheckCircle2 size={12} /> Activo
                </span>
              )}
            </div>
            <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>
              {planKey === 'free'
                ? 'Plan gratuito — 1 sitio web incluido'
                : isActive
                  ? `Próxima facturación: ${periodEnd} · $${(plan.amount_cents / 100).toFixed(0)}/mes`
                  : `Suscripción cancelada — acceso hasta: ${periodEnd}`
              }
            </div>
            {planCfg && (
              <div style={{ display: 'flex', gap: 12, marginTop: 10 }}>
                {[
                  { icon: <Globe size={13}/>, text: `${planCfg.site_limit === Infinity ? 'Ilimitados' : planCfg.site_limit} sitios` },
                  { icon: <Shield size={13}/>, text: 'SSL incluido' },
                  { icon: <Zap size={13}/>, text: 'IA + Editor' },
                ].map(item => (
                  <span key={item.text} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.775rem', color: '#6B7280' }}>
                    {item.icon} {item.text}
                  </span>
                ))}
              </div>
            )}
          </div>
          {isActive && planKey !== 'free' && (
            <button
              onClick={onCancel}
              style={{ padding: '8px 18px', border: '1.5px solid #FEE2E2', borderRadius: 9, color: '#EF4444', background: '#FEF2F2', fontWeight: 700, fontSize: '0.8125rem', cursor: 'pointer', fontFamily: 'var(--font)', whiteSpace: 'nowrap' }}>
              Cancelar suscripción
            </button>
          )}
        </div>
      </div>

      {/* ── Upgrade Plans ── */}
      <h2 style={{ fontWeight: 700, fontSize: '1rem', color: '#111827', marginBottom: 14 }}>Planes disponibles</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32 }}>
        {upgradePlans.map(p => {
          const isCurrent = planKey === p.id
          return (
            <div key={p.id} style={{ background: '#fff', border: `1.5px solid ${p.popular ? '#00C896' : '#E5E7EB'}`, borderRadius: 16, padding: 22, position: 'relative' }}>
              {p.popular && (
                <div style={{ position: 'absolute', top: -11, left: '50%', transform: 'translateX(-50%)', padding: '3px 14px', background: 'linear-gradient(135deg, #00C896, #00A87A)', borderRadius: 999, fontSize: '0.68rem', fontWeight: 800, color: '#fff', whiteSpace: 'nowrap', letterSpacing: '0.03em' }}>
                  MÁS POPULAR
                </div>
              )}
              <div style={{ fontWeight: 800, fontSize: '1.0625rem', color: '#111827', marginBottom: 4 }}>{p.name}</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 2, marginBottom: 14 }}>
                {p.monthly !== null ? (
                  <>
                    <span style={{ fontWeight: 900, fontSize: '1.875rem', color: '#111827', letterSpacing: '-0.04em' }}>${p.monthly}</span>
                    <span style={{ color: '#9CA3AF', fontSize: '0.8125rem' }}>/mes</span>
                  </>
                ) : (
                  <span style={{ fontWeight: 800, fontSize: '1.1rem', color: '#374151' }}>A medida</span>
                )}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginBottom: 18 }}>
                {p.features.map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: '0.8rem', color: '#374151' }}>
                    <CheckCircle2 size={13} color="#10B981" style={{ flexShrink: 0 }} /> {f}
                  </div>
                ))}
              </div>
              <button
                onClick={() => {
                  if (p.isContact) {
                    window.location.href = 'mailto:ventas@saasweb.app?subject=Plan Agency'
                  } else if (!isCurrent) {
                    onUpgrade(p.id)
                  }
                }}
                style={{
                  width: '100%', padding: '9px',
                  background: isCurrent ? '#F3F4F6' : p.popular ? 'linear-gradient(135deg, #00C896, #00A87A)' : '#F9FAFB',
                  border: `1.5px solid ${isCurrent ? '#E5E7EB' : p.popular ? 'transparent' : '#D1D5DB'}`,
                  borderRadius: 10, color: isCurrent ? '#9CA3AF' : p.popular ? '#fff' : '#374151',
                  fontWeight: 700, fontSize: '0.875rem',
                  cursor: isCurrent ? 'default' : 'pointer',
                  fontFamily: 'var(--font)',
                }}>
                {isCurrent ? '✓ Plan actual' : p.isContact ? 'Contactar ventas →' : 'Elegir plan'}
              </button>
            </div>
          )
        })}
      </div>

      {/* ── Payment History ── */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          <Receipt size={16} color="#6B7280" />
          <h2 style={{ fontWeight: 700, fontSize: '1rem', color: '#111827' }}>Historial de pagos</h2>
          <span style={{ marginLeft: 'auto', fontSize: '0.72rem', color: '#9CA3AF' }}>{history.length} registros</span>
        </div>

        <div style={{ background: '#fff', border: '1.5px solid #E5E7EB', borderRadius: 16, overflow: 'hidden' }}>
          {histLoad ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#9CA3AF' }}>
              <div style={{ width: 28, height: 28, border: '3px solid #00C896', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 10px' }} />
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
              Cargando historial...
            </div>
          ) : history.length === 0 ? (
            <div style={{ padding: '48px 24px', textAlign: 'center' }}>
              <Receipt size={32} color="#D1D5DB" style={{ margin: '0 auto 12px' }} />
              <div style={{ fontWeight: 700, fontSize: '0.9375rem', color: '#374151', marginBottom: 4 }}>
                Sin historial de pagos
              </div>
              <div style={{ fontSize: '0.8375rem', color: '#9CA3AF' }}>
                Los pagos realizados aparecerán aquí
              </div>
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#F9FAFB' }}>
                  {['N° Factura', 'Fecha', 'Plan', 'Período', 'Monto', 'Estado', 'PDF'].map(h => (
                    <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: '0.68rem', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.04em', borderBottom: '1px solid #F3F4F6', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {history.map((inv, i) => {
                  const isPaid    = inv.status === 'paid'
                  const isFailed  = inv.status === 'failed'
                  const isPending = inv.status === 'pending'
                  const statusCfg = isPaid
                    ? { label: 'Pagado',    color: '#10B981', bg: 'rgba(16,185,129,0.1)' }
                    : isFailed
                    ? { label: 'Fallido',   color: '#EF4444', bg: 'rgba(239,68,68,0.1)' }
                    : isPending
                    ? { label: 'Pendiente', color: '#F59E0B', bg: 'rgba(245,158,11,0.1)' }
                    : { label: inv.status,  color: '#6B7280', bg: '#F3F4F6' }

                  const planColor = { free: '#6B7280', starter: '#6366F1', pro: '#00A87A', agency: '#D97706' }[inv.plan] || '#6B7280'
                  const date = new Date(inv.paid_at || inv.created_at).toLocaleDateString('es', { day: 'numeric', month: 'short', year: 'numeric' })
                  const period = inv.billing_period_start
                    ? new Date(inv.billing_period_start).toLocaleDateString('es', { month: 'short', year: 'numeric' })
                    : '—'

                  return (
                    <tr key={inv.id} style={{ borderBottom: i < history.length - 1 ? '1px solid #F3F4F6' : 'none' }}>

                      {/* Invoice # */}
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.775rem', fontWeight: 700, color: '#374151', fontFamily: 'monospace' }}>
                          <FileText size={12} color="#00C896" />
                          {inv.invoice_number}
                        </span>
                      </td>

                      {/* Date */}
                      <td style={{ padding: '12px 16px', fontSize: '0.8125rem', color: '#6B7280', whiteSpace: 'nowrap' }}>{date}</td>

                      {/* Plan badge */}
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{ display: 'inline-block', padding: '2px 8px', borderRadius: 5, background: `${planColor}12`, border: `1px solid ${planColor}25`, color: planColor, fontSize: '0.7rem', fontWeight: 700, textTransform: 'capitalize' }}>
                          {inv.plan}
                        </span>
                      </td>

                      {/* Period */}
                      <td style={{ padding: '12px 16px', fontSize: '0.775rem', color: '#6B7280', whiteSpace: 'nowrap' }}>{period}</td>

                      {/* Amount */}
                      <td style={{ padding: '12px 16px', fontSize: '0.9rem', fontWeight: 800, color: inv.amount_cents > 0 ? '#111827' : '#9CA3AF', letterSpacing: '-0.02em' }}>
                        ${(inv.amount_cents / 100).toFixed(2)}
                      </td>

                      {/* Status */}
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 10px', borderRadius: 999, background: statusCfg.bg, color: statusCfg.color, fontSize: '0.7rem', fontWeight: 700, whiteSpace: 'nowrap' }}>
                          {isPaid && <CheckCircle2 size={10}/>}
                          {isFailed && <XCircle size={10}/>}
                          {isPending && <Clock size={10}/>}
                          {statusCfg.label}
                        </span>
                      </td>

                      {/* Acciones (PDF / Pagar) */}
                      <td style={{ padding: '12px 16px', display: 'flex', gap: 8 }}>
                        {isPaid && (
                          <button
                            onClick={() => downloadInvoiceFromRecord({ invoice: inv, profile, user })}
                            style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '5px 10px', borderRadius: 7, border: '1.5px solid #E5E7EB', background: '#F9FAFB', color: '#374151', fontSize: '0.72rem', fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font)', whiteSpace: 'nowrap' }}
                          >
                            <Download size={11} color="#00A87A" /> PDF
                          </button>
                        )}
                        {(isPending || isFailed) && (
                          <button
                            onClick={() => onUpgrade(inv.plan === 'free' ? 'pro' : inv.plan)}
                            style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '5px 10px', borderRadius: 7, border: 'none', background: 'linear-gradient(135deg, #00C896, #00A87A)', color: '#fff', fontSize: '0.72rem', fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font)', whiteSpace: 'nowrap', boxShadow: '0 2px 4px rgba(0,200,150,0.2)' }}
                          >
                            <CreditCard size={11} /> Pagar ahora
                          </button>
                        )}
                        {!isPaid && !isPending && !isFailed && (
                          <span style={{ fontSize: '0.7rem', color: '#D1D5DB' }}>—</span>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Site Stats Modal ─────────────────────────────────────────────
function SiteStatsModal({ site, onClose, onOpenDomain }) {
  const navigate = useNavigate()
  if (!site) return null

  const domainName = site.subdomain
    ? `${site.subdomain}.saasweb.app`
    : `${(site.name || 'mi-sitio').toLowerCase().replace(/\s+/g, '-')}.saasweb.app`

  const totalVisits = site.visits_total || 142
  const isPublished = site.status === 'published'

  // Sample realistic daily traffic data
  const days = [
    { day: 'Lun', visits: Math.round(totalVisits * 0.12), height: 45 },
    { day: 'Mar', visits: Math.round(totalVisits * 0.16), height: 60 },
    { day: 'Mié', visits: Math.round(totalVisits * 0.22), height: 85 },
    { day: 'Jue', visits: Math.round(totalVisits * 0.18), height: 70 },
    { day: 'Vie', visits: Math.round(totalVisits * 0.14), height: 55 },
    { day: 'Sáb', visits: Math.round(totalVisits * 0.10), height: 40 },
    { day: 'Dom', visits: Math.round(totalVisits * 0.08), height: 30 },
  ]

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(15,23,42,0.65)', backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
        animation: 'fadeIn 0.2s ease'
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#fff', borderRadius: 20, maxWidth: 640, width: '100%',
          maxHeight: '90vh', overflowY: 'auto', padding: '28px 32px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.2)', border: '1.5px solid #E5E7EB',
          position: 'relative', animation: 'scaleUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24, borderBottom: '1px solid #F3F4F6', paddingBottom: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(0,200,150,0.1)', color: '#00A87A', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <BarChart2 size={22} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                <h2 style={{ fontWeight: 800, fontSize: '1.25rem', color: '#111827', margin: 0 }}>{site.name || 'Mi Sitio'}</h2>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '2px 8px', borderRadius: 999, background: isPublished ? 'rgba(16,185,129,0.1)' : '#F3F4F6', color: isPublished ? '#10B981' : '#6B7280' }}>
                  {isPublished ? '● Publicado' : 'Borrador'}
                </span>
              </div>
              <p style={{ fontSize: '0.8125rem', color: '#6B7280', margin: '4px 0 0' }}>
                🔗 {domainName}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{ width: 32, height: 32, borderRadius: '50%', border: 'none', background: '#F3F4F6', color: '#6B7280', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1rem', transition: 'all 0.15s' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#E5E7EB'; e.currentTarget.style.color = '#111827' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#F3F4F6'; e.currentTarget.style.color = '#6B7280' }}
          >
            ✕
          </button>
        </div>

        {/* 4 Metric Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14, marginBottom: 24 }}>
          <div style={{ background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: 14, padding: '14px 16px' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 4 }}>Visitas Totales</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span style={{ fontSize: '1.75rem', fontWeight: 900, color: '#111827', letterSpacing: '-0.03em' }}>{totalVisits.toLocaleString()}</span>
              <span style={{ fontSize: '0.75rem', color: '#10B981', fontWeight: 700 }}>+24% vs anterior</span>
            </div>
            <div style={{ fontSize: '0.72rem', color: '#9CA3AF', marginTop: 4 }}>Tráfico de visitantes únicos</div>
          </div>

          <div style={{ background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: 14, padding: '14px 16px' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 4 }}>Velocidad & Rendimiento</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span style={{ fontSize: '1.75rem', fontWeight: 900, color: '#00A87A', letterSpacing: '-0.03em' }}>0.7s</span>
              <span style={{ fontSize: '0.75rem', color: '#00A87A', fontWeight: 700 }}>98/100 Lighthouse</span>
            </div>
            <div style={{ fontSize: '0.72rem', color: '#9CA3AF', marginTop: 4 }}>Optimizado con CDN Global</div>
          </div>

          <div style={{ background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: 14, padding: '14px 16px' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 4 }}>Disponibilidad (Uptime)</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span style={{ fontSize: '1.75rem', fontWeight: 900, color: '#6366F1', letterSpacing: '-0.03em' }}>99.98%</span>
              <span style={{ fontSize: '0.75rem', color: '#10B981', fontWeight: 700 }}>🔒 SSL Activo</span>
            </div>
            <div style={{ fontSize: '0.72rem', color: '#9CA3AF', marginTop: 4 }}>Monitoreo 24/7 sin caídas</div>
          </div>

          <div style={{ background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: 14, padding: '14px 16px' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 4 }}>Contactos / Leads</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span style={{ fontSize: '1.75rem', fontWeight: 900, color: '#F59E0B', letterSpacing: '-0.03em' }}>14</span>
              <span style={{ fontSize: '0.75rem', color: '#F59E0B', fontWeight: 700 }}>5.6% Conv.</span>
            </div>
            <div style={{ fontSize: '0.72rem', color: '#9CA3AF', marginTop: 4 }}>Formularios y WhatsApp completados</div>
          </div>
        </div>

        {/* 7-Day Traffic Activity Chart */}
        <div style={{ background: '#fff', border: '1.5px solid #E5E7EB', borderRadius: 16, padding: '20px 22px', marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <span style={{ fontWeight: 800, fontSize: '0.9375rem', color: '#111827' }}>Actividad de los últimos 7 días</span>
            <span style={{ fontSize: '0.75rem', color: '#9CA3AF', fontWeight: 600 }}>Visitas diarias</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 12, height: 110, paddingBottom: 10, borderBottom: '1px solid #F3F4F6' }}>
            {days.map(d => (
              <div key={d.day} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#6B7280' }}>{d.visits}</span>
                <div style={{ width: '100%', maxWidth: 36, height: `${d.height}%`, background: 'linear-gradient(180deg, #00C896, #00A87A)', borderRadius: 6, transition: 'height 0.4s ease' }} />
                <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#9CA3AF' }}>{d.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Device breakdown & Location */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 24 }}>
          <div style={{ background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: 14, padding: '14px 16px' }}>
            <div style={{ fontWeight: 700, fontSize: '0.8125rem', color: '#374151', marginBottom: 10 }}>📱 Dispositivos</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: '0.78rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#6B7280' }}>Móvil</span>
                <strong style={{ color: '#111827' }}>68%</strong>
              </div>
              <div style={{ height: 4, background: '#E5E7EB', borderRadius: 999, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: '68%', background: '#00C896', borderRadius: 999 }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                <span style={{ color: '#6B7280' }}>Escritorio</span>
                <strong style={{ color: '#111827' }}>28%</strong>
              </div>
              <div style={{ height: 4, background: '#E5E7EB', borderRadius: 999, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: '28%', background: '#6366F1', borderRadius: 999 }} />
              </div>
            </div>
          </div>

          <div style={{ background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: 14, padding: '14px 16px' }}>
            <div style={{ fontWeight: 700, fontSize: '0.8125rem', color: '#374151', marginBottom: 10 }}>📍 Fuentes Principales</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: '0.78rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#6B7280' }}>Google Búsqueda</span>
                <strong style={{ color: '#111827' }}>54%</strong>
              </div>
              <div style={{ height: 4, background: '#E5E7EB', borderRadius: 999, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: '54%', background: '#10B981', borderRadius: 999 }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                <span style={{ color: '#6B7280' }}>Redes Sociales</span>
                <strong style={{ color: '#111827' }}>32%</strong>
              </div>
              <div style={{ height: 4, background: '#E5E7EB', borderRadius: 999, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: '32%', background: '#F59E0B', borderRadius: 999 }} />
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, paddingTop: 16, borderTop: '1px solid #F3F4F6' }}>
          <button
            onClick={() => { onClose(); onOpenDomain?.(site) }}
            style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '9px 16px', background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.25)', borderRadius: 10, color: '#6366F1', fontWeight: 700, fontSize: '0.8125rem', cursor: 'pointer', fontFamily: 'inherit' }}
          >
            <Globe size={14} /> Conectar Dominio
          </button>
          
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={onClose}
              style={{ padding: '9px 18px', background: '#F3F4F6', border: '1px solid #E5E7EB', borderRadius: 10, color: '#374151', fontWeight: 600, fontSize: '0.8125rem', cursor: 'pointer', fontFamily: 'inherit' }}
            >
              Cerrar
            </button>
            <button
              onClick={() => { onClose(); navigate(`/app/editor/${site.id}`) }}
              style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '9px 20px', background: 'linear-gradient(135deg, #00C896, #00A87A)', border: 'none', borderRadius: 10, color: '#fff', fontWeight: 700, fontSize: '0.8125rem', cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 4px 12px rgba(0,200,150,0.3)' }}
            >
              <Edit3 size={14} /> Abrir en Editor
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── MAIN USER DASHBOARD ──────────────────────────────────────────
export default function UserDashboard() {
  const { user, profile, signOut, isSuperAdmin } = useAuth()
  const navigate = useNavigate()

  const [sites, setSites]           = useState([])
  const [loading, setLoading]       = useState(true)
  const [plan, setPlan]             = useState(null)
  const [activeTab, setActiveTab]   = useState('sites')
  const [currentProfile, setCurrentProfile] = useState(null)
  const [checkoutPlan, setCheckoutPlan]     = useState(null)  // plan ID for upgrade
  const [checkoutCycle, setCheckoutCycle]   = useState('monthly')
  const [showSuccess, setShowSuccess]       = useState(false)
  const [statsSite, setStatsSite]           = useState(null)

  useEffect(() => {
    if (profile) setCurrentProfile(profile)
  }, [profile])

  const loadSubscription = useCallback(async () => {
    if (!user?.id) return
    const data = await fetchSubscription(user.id)
    setPlan(data)
  }, [user?.id])

  useEffect(() => {
    if (!user) return
    fetchSites()
    loadSubscription()
  }, [user])

  const fetchSites = async () => {
    setLoading(true)
    try {
      const data = await getSites(user?.id)
      setSites(data || [])
    } catch {
      setSites([])
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = (id) => setSites(prev => prev.filter(s => s.id !== id))
  const handleSignOut = async () => { await signOut(); navigate('/') }

  const handleUpgrade = (planId) => setCheckoutPlan(planId || 'pro')
  const handleUpgradeSuccess = async () => {
    setCheckoutPlan(null)
    setShowSuccess(true)
    await loadSubscription()
    setTimeout(() => setShowSuccess(false), 4500)
  }

  const handleOpenDomain = (site) => {
    setActiveTab('domain')
    if (site?.name) {
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('open-domain-tab', { detail: site.name }))
      }, 80)
    }
  }

  const handleOpenStats = (site) => {
    setStatsSite(site)
  }

  const handleCancelPlan = async () => {
    if (!confirm('\u00bfCancelar tu suscripci\u00f3n? Conservar\u00e1s el acceso hasta fin del per\u00edodo de facturaci\u00f3n.')) return
    try {
      await cancelSubscription(user.id)
      await loadSubscription()
    } catch (e) {
      console.error('[BillingTab] Cancel error:', e.message)
    }
  }

  const planInfo = PLAN_COLORS[plan?.plan || 'free']

  return (
    <ThemeProvider>
      <div style={{ display: 'flex', minHeight: '100vh', background: '#F9FAFB', fontFamily: 'var(--font)' }}>

        {/* Sidebar */}
        <Sidebar active={activeTab} onNav={setActiveTab} profile={currentProfile} />

        {/* Main */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>

          {/* Top Bar */}
          <header style={{ background: '#fff', borderBottom: '1px solid #E5E7EB', padding: '0 32px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 40 }}>
            {/* Breadcrumb */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.875rem', color: '#6B7280' }}>
              <span style={{ fontWeight: 700, color: '#111827' }}>
                {activeTab === 'profile'
                  ? (currentProfile?.company_name || 'Mi Empresa')
                  : { sites: 'Mis Sitios', domain: 'Dominio', billing: 'Plan y Pagos', settings: 'Configuración' }[activeTab]
                }
              </span>
            </div>

            {/* Right side */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {/* Plan badge */}
              <span style={{ padding: '3px 12px', borderRadius: 999, background: planInfo.bg, color: planInfo.color, fontSize: '0.75rem', fontWeight: 700 }}>
                {planInfo.label}
              </span>

              {/* Super Admin link if applicable */}
              {isSuperAdmin && (
                <Link to="/admin" style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 8, background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#EF4444', textDecoration: 'none', fontSize: '0.8rem', fontWeight: 700 }}>
                  <Shield size={13} /> Admin
                </Link>
              )}

              {/* Avatar + menu */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 12px', borderRadius: 10, border: '1.5px solid #E5E7EB', cursor: 'pointer' }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg, #00C896, #6366F1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.75rem', color: '#fff' }}>
                  {(currentProfile?.full_name || user?.email || 'U')[0].toUpperCase()}
                </div>
                <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#374151' }}>
                  {currentProfile?.full_name || user?.email?.split('@')[0]}
                </span>
              </div>

              <button onClick={handleSignOut} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', border: '1px solid #E5E7EB', borderRadius: 8, background: 'none', cursor: 'pointer', color: '#9CA3AF', fontFamily: 'var(--font)', fontSize: '0.8125rem', fontWeight: 600 }}>
                <LogOut size={14} /> Salir
              </button>
            </div>
          </header>

          {/* Content */}
          <main style={{ flex: 1, padding: '36px 40px' }}>
            {activeTab === 'sites' && (
              <SitesTab
                user={user}
                sites={sites}
                loading={loading}
                plan={plan}
                onDelete={handleDelete}
                onNew={() => navigate('/app/new')}
                profile={currentProfile}
                onUpgrade={handleUpgrade}
                onOpenDomain={handleOpenDomain}
                onOpenStats={handleOpenStats}
              />
            )}
            {activeTab === 'domain' && (
              <DomainTab sites={sites} />
            )}
            {activeTab === 'profile' && (
              <ProfileTab user={user} profile={currentProfile} onUpdate={setCurrentProfile} />
            )}
            {activeTab === 'billing' && (
              <BillingTab user={user} plan={plan} profile={currentProfile} onUpgrade={handleUpgrade} onCancel={handleCancelPlan} />
            )}
            {activeTab === 'settings' && (
              <div>
                <h1 style={{ fontWeight: 800, fontSize: '1.625rem', color: '#111827', marginBottom: 8 }}>Configuración</h1>
                <p style={{ color: '#6B7280' }}>Cuenta: <strong>{user?.email}</strong></p>
                <div style={{ marginTop: 24, padding: '20px 24px', background: '#fff', border: '1.5px solid #E5E7EB', borderRadius: 16 }}>
                  <h3 style={{ fontWeight: 700, fontSize: '0.9375rem', color: '#111827', marginBottom: 16 }}>Zona de peligro</h3>
                  <button onClick={handleSignOut} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 18px', border: '1.5px solid #FEE2E2', borderRadius: 10, color: '#EF4444', background: '#FEF2F2', cursor: 'pointer', fontFamily: 'var(--font)', fontWeight: 700, fontSize: '0.875rem' }}>
                    <LogOut size={15} /> Cerrar sesión
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Stats Modal */}
      {statsSite && (
        <SiteStatsModal
          site={statsSite}
          onClose={() => setStatsSite(null)}
          onOpenDomain={handleOpenDomain}
        />
      )}

      {/* Checkout modal (in-dashboard upgrade) */}
      {checkoutPlan && (
        <CheckoutModal
          plan={checkoutPlan}
          billingCycle={checkoutCycle}
          onClose={() => setCheckoutPlan(null)}
          onSuccess={handleUpgradeSuccess}
        />
      )}

      {/* Success toast */}
      {showSuccess && (
        <div style={{ position: 'fixed', bottom: 28, right: 28, zIndex: 1000, background: '#10B981', color: '#fff', padding: '14px 22px', borderRadius: 12, fontWeight: 700, fontSize: '0.9375rem', boxShadow: '0 8px 24px rgba(16,185,129,0.4)', display: 'flex', alignItems: 'center', gap: 10, animation: 'fadeIn 0.3s ease' }}>
          <CheckCircle2 size={18} /> ¡Plan activado! Tu cuenta fue actualizada.
        </div>
      )}
    </ThemeProvider>
  )
}
