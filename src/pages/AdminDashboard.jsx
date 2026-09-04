import { useState, useEffect } from 'react'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'
import MapTab from './MapTab'
import {
  LayoutDashboard, Users, Globe, DollarSign, TrendingUp,
  LogOut, Shield, RefreshCw, Search, CheckCircle2,
  Clock, ExternalLink, BarChart2, Zap, Settings,
  ArrowUpRight, ArrowDownRight, Activity, CreditCard,
  UserX, Moon, Sun, MapPin, Tag, Save, Plus, Trash2, ToggleLeft, ToggleRight,
  Receipt, AlertCircle, XCircle, RotateCcw, Download, Filter
} from 'lucide-react'

// ─── Admin Route Guard ────────────────────────────────────────────
export function AdminRoute({ children }) {
  const { isAuthenticated, isSuperAdmin, loading, user, profile } = useAuth()
  const [profileWait, setProfileWait] = useState(true)

  useEffect(() => {
    if (!loading && user) {
      const t = setTimeout(() => setProfileWait(false), 2000)
      return () => clearTimeout(t)
    }
    if (!user) setProfileWait(false)
  }, [loading, user])

  const spinner = (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F9FAFB' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: 40, height: 40, borderRadius: '50%', border: '3px solid #00C896', borderTopColor: 'transparent', animation: 'spin 0.8s linear infinite', margin: '0 auto 14px' }} />
        <p style={{ color: '#9CA3AF', fontSize: '0.8125rem', fontFamily: 'system-ui' }}>Verificando acceso...</p>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )

  if (loading || (user && !profile && profileWait)) return spinner
  if (!isAuthenticated) return <Navigate to="/login" replace />
  if (!isSuperAdmin) return <Navigate to="/app/dashboard" replace />
  return children
}

// ─── Helpers ──────────────────────────────────────────────────────
const fmt = (n) => new Intl.NumberFormat('es').format(n)
const fmtUSD = (n) => `$${fmt(n)}`
const fmtDate = (d) => d ? new Date(d).toLocaleDateString('es', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'

const ROLE_STYLE = {
  super_admin: { bg: 'rgba(239,68,68,0.1)', color: '#EF4444', label: 'Super Admin' },
  admin:       { bg: 'rgba(245,158,11,0.1)', color: '#D97706', label: 'Admin' },
  client:      { bg: 'rgba(99,102,241,0.1)', color: '#6366F1', label: 'Cliente' },
}
const PLAN_STYLE = {
  free:    { color: '#6B7280', label: 'Free' },
  starter: { color: '#6366F1', label: 'Starter' },
  pro:     { color: '#00A87A', label: 'Pro' },
  agency:  { color: '#D97706', label: 'Agency' },
}
const STATUS_STYLE = {
  active:   { color: '#10B981', label: 'Activo' },
  canceled: { color: '#EF4444', label: 'Cancelado' },
  past_due: { color: '#D97706', label: 'Vencido' },
  trialing: { color: '#06B6D4', label: 'Trial' },
}

// ─── Theme tokens helper ──────────────────────────────────────────
function t(dark, light, isDark) { return isDark ? dark : light }

// ─── Sidebar ──────────────────────────────────────────────────────
const NAV = [
  { id: 'overview',  icon: <LayoutDashboard size={17}/>, label: 'Resumen' },
  { id: 'clients',   icon: <Users size={17}/>,           label: 'Clientes' },
  { id: 'revenue',   icon: <DollarSign size={17}/>,      label: 'Ingresos' },
  { id: 'invoices',  icon: <Receipt size={17}/>,         label: 'Facturas' },
  { id: 'websites',  icon: <Globe size={17}/>,           label: 'Sitios Web' },
  { id: 'pricing',   icon: <Tag size={17}/>,             label: 'Precios' },
  { id: 'map',       icon: <MapPin size={17}/>,          label: 'Mapa' },
  { id: 'settings',  icon: <Settings size={17}/>,        label: 'Configuración' },
]

function AdminSidebar({ active, onNav, onSignOut, isDark, onToggleDark }) {
  const bg    = isDark ? '#080F0C' : '#fff'
  const border = isDark ? 'rgba(255,255,255,0.07)' : '#E5E7EB'
  const text  = isDark ? 'rgba(255,255,255,0.45)' : '#4B5563'
  const activeColor = '#00A87A'
  const activeBg = isDark ? 'rgba(0,200,150,0.12)' : 'rgba(0,200,150,0.08)'

  return (
    <aside style={{ width: 220, minHeight: '100vh', background: bg, borderRight: `1px solid ${border}`, display: 'flex', flexDirection: 'column', padding: '20px 0', position: 'sticky', top: 0, height: '100vh', transition: 'all 0.2s' }}>
      {/* Logo */}
      <div style={{ padding: '0 16px 20px', borderBottom: `1px solid ${border}`, marginBottom: 8 }}>
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: 'linear-gradient(135deg,#00C896,#00A87A)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '0.8rem', color: '#fff' }}>S</div>
          <span style={{ fontWeight: 800, fontSize: '0.9375rem', color: isDark ? '#fff' : '#111827' }}>SaaSWeb</span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 10px', borderRadius: 8, background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.15)' }}>
          <Shield size={11} color="#EF4444" />
          <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#EF4444', letterSpacing: '0.05em' }}>SUPER ADMIN</span>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '0 10px', display: 'flex', flexDirection: 'column', gap: 2 }}>
        {NAV.map(item => (
          <button key={item.id} onClick={() => onNav(item.id)} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 9, border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left', fontFamily: 'system-ui', fontSize: '0.875rem', fontWeight: 600, background: active === item.id ? activeBg : 'transparent', color: active === item.id ? activeColor : text, transition: 'all 0.15s' }}
            onMouseEnter={e => { if (active !== item.id) e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.04)' : '#F9FAFB' }}
            onMouseLeave={e => { if (active !== item.id) e.currentTarget.style.background = 'transparent' }}>
            <span style={{ opacity: active === item.id ? 1 : 0.65 }}>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      {/* Bottom */}
      <div style={{ padding: '12px 10px 0', borderTop: `1px solid ${border}`, marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 2 }}>
        {/* Dark mode toggle */}
        <button onClick={onToggleDark} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 12px', borderRadius: 9, border: 'none', background: 'transparent', cursor: 'pointer', color: text, fontFamily: 'system-ui', fontSize: '0.8rem', fontWeight: 600, width: '100%' }}>
          {isDark ? <Sun size={14}/> : <Moon size={14}/>}
          {isDark ? 'Modo claro' : 'Modo oscuro'}
        </button>
        <Link to="/app/dashboard" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', borderRadius: 9, color: text, textDecoration: 'none', fontSize: '0.8rem', fontWeight: 600 }}>
          <LayoutDashboard size={14}/> Vista cliente
        </Link>
        <button onClick={onSignOut} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', borderRadius: 9, border: 'none', background: 'none', cursor: 'pointer', color: isDark ? 'rgba(255,255,255,0.3)' : '#9CA3AF', fontFamily: 'system-ui', fontSize: '0.8rem', fontWeight: 600, width: '100%' }}>
          <LogOut size={14}/> Cerrar sesión
        </button>
      </div>
    </aside>
  )
}

// ─── KPI Card ─────────────────────────────────────────────────────
function KPI({ label, value, sub, icon, color, trend, trendUp, isDark }) {
  const cardBg = isDark ? 'rgba(255,255,255,0.04)' : '#fff'
  const cardBorder = isDark ? 'rgba(255,255,255,0.08)' : '#E5E7EB'
  const valColor = isDark ? '#fff' : '#111827'
  const subColor = isDark ? 'rgba(255,255,255,0.35)' : '#6B7280'

  return (
    <div style={{ background: cardBg, border: `1.5px solid ${cardBorder}`, borderRadius: 16, padding: '22px 24px', position: 'relative', overflow: 'hidden', boxShadow: isDark ? 'none' : '0 1px 4px rgba(0,0,0,0.04)' }}>
      <div style={{ position: 'absolute', top: -20, right: -20, width: 80, height: 80, borderRadius: '50%', background: `${color}10` }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
        <div style={{ width: 40, height: 40, borderRadius: 12, background: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color }}>{icon}</div>
        {trend !== undefined && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '3px 8px', borderRadius: 999, background: trendUp !== false ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)', color: trendUp !== false ? '#10B981' : '#EF4444', fontSize: '0.72rem', fontWeight: 700 }}>
            {trendUp !== false ? <ArrowUpRight size={11}/> : <ArrowDownRight size={11}/>} {trend}%
          </div>
        )}
      </div>
      <div style={{ fontWeight: 900, fontSize: '2rem', color: valColor, letterSpacing: '-0.05em', lineHeight: 1, marginBottom: 4 }}>{value}</div>
      <div style={{ fontWeight: 600, fontSize: '0.8125rem', color: subColor, marginBottom: sub ? 4 : 0 }}>{label}</div>
      {sub && <div style={{ fontSize: '0.72rem', color: isDark ? 'rgba(255,255,255,0.2)' : '#9CA3AF' }}>{sub}</div>}
    </div>
  )
}

// ─── Overview Tab ─────────────────────────────────────────────────
function OverviewTab({ profiles, sites, subscriptions, refreshing, onRefresh, isDark }) {
  const active = subscriptions.filter(s => s.status === 'active')
  const mrr = active.reduce((sum, s) => sum + (s.mrr_usd || 0), 0)
  const arr = mrr * 12
  const published = sites.filter(s => s.status === 'published').length
  const recent = [...profiles].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 8)

  const cardBg = isDark ? 'rgba(255,255,255,0.03)' : '#fff'
  const cardBorder = isDark ? 'rgba(255,255,255,0.07)' : '#E5E7EB'
  const headColor = isDark ? '#fff' : '#111827'
  const subColor = isDark ? 'rgba(255,255,255,0.35)' : '#6B7280'
  const rowBorder = isDark ? 'rgba(255,255,255,0.04)' : '#F3F4F6'
  const thColor = isDark ? 'rgba(255,255,255,0.3)' : '#9CA3AF'

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontWeight: 900, fontSize: '1.75rem', letterSpacing: '-0.04em', color: headColor, marginBottom: 4 }}>Panel de Control</h1>
          <p style={{ color: subColor, fontSize: '0.9375rem' }}>Vista global del negocio en tiempo real</p>
        </div>
        <button onClick={onRefresh} disabled={refreshing} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 9, background: isDark ? 'rgba(255,255,255,0.06)' : '#F9FAFB', border: `1px solid ${cardBorder}`, color: isDark ? 'rgba(255,255,255,0.6)' : '#6B7280', cursor: 'pointer', fontFamily: 'system-ui', fontSize: '0.8125rem', fontWeight: 600 }}>
          <RefreshCw size={13} style={{ animation: refreshing ? 'spin 1s linear infinite' : 'none' }}/> Actualizar
        </button>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 20 }}>
        <KPI isDark={isDark} label="Clientes totales" value={fmt(profiles.length)} sub={`${active.length} con plan activo`} icon={<Users size={18}/>} color="#6366F1" trend={profiles.length > 0 ? 12 : 0} trendUp={true} />
        <KPI isDark={isDark} label="MRR" value={fmtUSD(mrr)} sub="Ingresos recurrentes/mes" icon={<DollarSign size={18}/>} color="#00C896" trend={mrr > 0 ? 8 : 0} trendUp={true} />
        <KPI isDark={isDark} label="ARR Estimado" value={fmtUSD(arr)} sub="Proyección anual" icon={<TrendingUp size={18}/>} color="#F59E0B" />
        <KPI isDark={isDark} label="Sitios creados" value={fmt(sites.length)} sub={`${published} publicados`} icon={<Globe size={18}/>} color="#06B6D4" />
      </div>

      {/* Secondary KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 28 }}>
        {[
          { label: 'Tasa de conversión', value: profiles.length > 0 ? `${Math.round((active.length / profiles.length) * 100)}%` : '0%', color: '#10B981', icon: <Activity size={15}/> },
          { label: 'Churn mensual', value: `${subscriptions.filter(s => s.status === 'canceled').length}`, color: '#EF4444', icon: <UserX size={15}/> },
          { label: 'Trials activos', value: `${subscriptions.filter(s => s.status === 'trialing').length}`, color: '#06B6D4', icon: <Clock size={15}/> },
          { label: 'ARPU', value: active.length > 0 ? fmtUSD(Math.round(mrr / active.length)) : '$0', color: '#F59E0B', icon: <CreditCard size={15}/> },
        ].map(k => (
          <div key={k.label} style={{ background: cardBg, border: `1.5px solid ${cardBorder}`, borderRadius: 12, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, boxShadow: isDark ? 'none' : '0 1px 3px rgba(0,0,0,0.04)' }}>
            <div style={{ width: 34, height: 34, borderRadius: 9, background: `${k.color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: k.color, flexShrink: 0 }}>{k.icon}</div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '1.2rem', color: headColor, letterSpacing: '-0.03em' }}>{k.value}</div>
              <div style={{ fontSize: '0.72rem', color: subColor, fontWeight: 600 }}>{k.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent clients */}
      <div style={{ background: cardBg, border: `1.5px solid ${cardBorder}`, borderRadius: 16, overflow: 'hidden', boxShadow: isDark ? 'none' : '0 1px 4px rgba(0,0,0,0.04)' }}>
        <div style={{ padding: '18px 24px', borderBottom: `1px solid ${cardBorder}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontWeight: 700, fontSize: '0.9375rem', color: headColor }}>Clientes recientes</h2>
          <span style={{ fontSize: '0.75rem', color: subColor }}>{profiles.length} total</span>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${cardBorder}` }}>
                {['Cliente', 'Rol', 'Plan', 'Sitios', 'Registro'].map(h => (
                  <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: '0.71rem', fontWeight: 700, color: thColor, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recent.length === 0 ? (
                <tr><td colSpan={5} style={{ padding: '40px', textAlign: 'center', color: subColor, fontSize: '0.875rem' }}>Sin clientes aún</td></tr>
              ) : recent.map(p => {
                const sub = subscriptions.find(s => s.user_id === p.id)
                const siteCount = sites.filter(s => s.user_id === p.id).length
                const rs = ROLE_STYLE[p.role] || ROLE_STYLE.client
                const ps = sub ? (PLAN_STYLE[sub.plan] || PLAN_STYLE.free) : PLAN_STYLE.free
                return (
                  <tr key={p.id} style={{ borderBottom: `1px solid ${rowBorder}` }}
                    onMouseEnter={e => e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.02)' : '#F9FAFB'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ width: 34, height: 34, borderRadius: '50%', background: `hsl(${(p.id?.charCodeAt(0)||0)*5},50%,${isDark?35:60}%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.8rem', color: '#fff', flexShrink: 0 }}>
                          {(p.full_name||'U')[0].toUpperCase()}
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, color: headColor, fontSize: '0.875rem' }}>{p.full_name||'(Sin nombre)'}</div>
                          {p.company_name && <div style={{ fontSize: '0.7rem', color: subColor }}>{p.company_name}</div>}
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '12px 16px' }}><span style={{ padding: '3px 9px', borderRadius: 999, background: rs.bg, color: rs.color, fontSize: '0.7rem', fontWeight: 700 }}>{rs.label}</span></td>
                    <td style={{ padding: '12px 16px' }}><span style={{ fontWeight: 700, color: ps.color, fontSize: '0.8rem' }}>{ps.label}</span></td>
                    <td style={{ padding: '12px 16px', textAlign: 'center' }}><span style={{ fontWeight: 700, color: headColor }}>{siteCount}</span></td>
                    <td style={{ padding: '12px 16px', fontSize: '0.8rem', color: subColor }}>{fmtDate(p.created_at)}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// ─── Clients Tab ──────────────────────────────────────────────────
function ClientsTab({ profiles, sites, subscriptions, onRoleChange, isDark }) {
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const cardBg = isDark ? 'rgba(255,255,255,0.03)' : '#fff'
  const cardBorder = isDark ? 'rgba(255,255,255,0.07)' : '#E5E7EB'
  const headColor = isDark ? '#fff' : '#111827'
  const subColor = isDark ? 'rgba(255,255,255,0.35)' : '#6B7280'
  const rowBorder = isDark ? 'rgba(255,255,255,0.04)' : '#F3F4F6'

  const filtered = profiles.filter(p => {
    const ok = !search || p.full_name?.toLowerCase().includes(search.toLowerCase()) || p.company_name?.toLowerCase().includes(search.toLowerCase())
    return ok && (roleFilter === 'all' || p.role === roleFilter)
  })

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontWeight: 900, fontSize: '1.75rem', letterSpacing: '-0.04em', color: headColor, marginBottom: 4 }}>Clientes</h1>
          <p style={{ color: subColor, fontSize: '0.875rem' }}>{profiles.length} usuarios registrados</p>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 18 }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
          <input placeholder="Buscar por nombre o empresa..." value={search} onChange={e => setSearch(e.target.value)}
            style={{ width: '100%', paddingLeft: 36, paddingRight: 16, paddingTop: 9, paddingBottom: 9, background: isDark ? 'rgba(255,255,255,0.05)' : '#F9FAFB', border: `1.5px solid ${cardBorder}`, borderRadius: 9, color: headColor, fontSize: '0.875rem', fontFamily: 'system-ui', outline: 'none', boxSizing: 'border-box' }} />
        </div>
        {['all','client','admin','super_admin'].map(r => (
          <button key={r} onClick={() => setRoleFilter(r)} style={{ padding: '8px 14px', borderRadius: 9, border: '1.5px solid', borderColor: roleFilter === r ? '#00A87A' : cardBorder, background: roleFilter === r ? 'rgba(0,200,150,0.08)' : 'transparent', color: roleFilter === r ? '#00A87A' : subColor, fontWeight: 700, fontSize: '0.75rem', cursor: 'pointer', fontFamily: 'system-ui' }}>
            {{ all:'Todos', client:'Clientes', admin:'Admin', super_admin:'Super Admin' }[r]}
          </button>
        ))}
      </div>

      <div style={{ background: cardBg, border: `1.5px solid ${cardBorder}`, borderRadius: 16, overflow: 'hidden', boxShadow: isDark ? 'none' : '0 1px 4px rgba(0,0,0,0.04)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${cardBorder}` }}>
              {['Cliente','Empresa','Rol','Plan','Sitios','MRR','Registro','Acciones'].map(h => (
                <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '0.71rem', fontWeight: 700, color: subColor, textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={8} style={{ padding: '60px', textAlign: 'center', color: subColor }}>Sin resultados</td></tr>
            ) : filtered.map(p => {
              const sub = subscriptions.find(s => s.user_id === p.id)
              const siteCount = sites.filter(s => s.user_id === p.id).length
              const rs = ROLE_STYLE[p.role] || ROLE_STYLE.client
              const ps = sub ? (PLAN_STYLE[sub.plan] || PLAN_STYLE.free) : PLAN_STYLE.free
              const ss = sub ? (STATUS_STYLE[sub.status] || {}) : {}
              return (
                <tr key={p.id} style={{ borderBottom: `1px solid ${rowBorder}` }}
                  onMouseEnter={e => e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.02)' : '#F9FAFB'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <td style={{ padding: '13px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 36, height: 36, borderRadius: '50%', background: `hsl(${(p.id?.charCodeAt(0)||0)*5},50%,${isDark?35:60}%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.8rem', color: '#fff', flexShrink: 0 }}>
                        {(p.full_name||'U')[0].toUpperCase()}
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, color: headColor, fontSize: '0.875rem' }}>{p.full_name||'(Sin nombre)'}</div>
                        <div style={{ fontSize: '0.68rem', color: subColor, fontFamily: 'monospace' }}>{p.id?.slice(0,12)}…</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '13px 16px', fontSize: '0.8rem', color: subColor }}>{p.company_name || '—'}</td>
                  <td style={{ padding: '13px 16px' }}><span style={{ padding: '3px 9px', borderRadius: 999, background: rs.bg, color: rs.color, fontSize: '0.7rem', fontWeight: 700 }}>{rs.label}</span></td>
                  <td style={{ padding: '13px 16px' }}>
                    <div style={{ fontWeight: 700, color: ps.color, fontSize: '0.8rem' }}>{ps.label}</div>
                    {sub && <div style={{ fontSize: '0.68rem', color: ss.color }}>{ss.label}</div>}
                  </td>
                  <td style={{ padding: '13px 16px', textAlign: 'center', fontWeight: 700, color: headColor }}>{siteCount}</td>
                  <td style={{ padding: '13px 16px', fontWeight: 700, color: '#00A87A' }}>${sub?.mrr_usd || 0}</td>
                  <td style={{ padding: '13px 16px', fontSize: '0.78rem', color: subColor, whiteSpace: 'nowrap' }}>{fmtDate(p.created_at)}</td>
                  <td style={{ padding: '13px 16px' }}>
                    <select value={p.role} onChange={e => onRoleChange(p.id, e.target.value)}
                      style={{ padding: '5px 8px', borderRadius: 8, background: isDark ? 'rgba(255,255,255,0.06)' : '#F9FAFB', border: `1px solid ${cardBorder}`, color: headColor, fontSize: '0.75rem', fontFamily: 'system-ui', cursor: 'pointer' }}>
                      <option value="client">Cliente</option>
                      <option value="admin">Admin</option>
                      <option value="super_admin">Super Admin</option>
                    </select>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ─── Revenue Tab ──────────────────────────────────────────────────
function RevenueTab({ subscriptions, profiles, isDark }) {
  const active = subscriptions.filter(s => s.status === 'active')
  const mrr = active.reduce((sum, s) => sum + (s.mrr_usd || 0), 0)
  const cardBg = isDark ? 'rgba(255,255,255,0.03)' : '#fff'
  const cardBorder = isDark ? 'rgba(255,255,255,0.07)' : '#E5E7EB'
  const headColor = isDark ? '#fff' : '#111827'
  const subColor = isDark ? 'rgba(255,255,255,0.35)' : '#6B7280'
  const rowBorder = isDark ? 'rgba(255,255,255,0.04)' : '#F3F4F6'

  const planDist = ['starter','pro','agency'].map(plan => ({
    plan, count: active.filter(s => s.plan === plan).length,
    revenue: active.filter(s => s.plan === plan).reduce((sum, s) => sum + (s.mrr_usd || 0), 0),
  }))

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontWeight: 900, fontSize: '1.75rem', letterSpacing: '-0.04em', color: headColor, marginBottom: 4 }}>Ingresos</h1>
        <p style={{ color: subColor, fontSize: '0.875rem' }}>Desglose de facturación y suscripciones</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
        <KPI isDark={isDark} label="MRR Total" value={fmtUSD(mrr)} icon={<DollarSign size={18}/>} color="#00C896" trend={8} trendUp={true} />
        <KPI isDark={isDark} label="ARR Proyectado" value={fmtUSD(mrr * 12)} icon={<TrendingUp size={18}/>} color="#F59E0B" />
        <KPI isDark={isDark} label="Suscripciones activas" value={active.length} sub={`${subscriptions.filter(s=>s.status==='canceled').length} canceladas`} icon={<CreditCard size={18}/>} color="#6366F1" />
      </div>

      <div style={{ background: cardBg, border: `1.5px solid ${cardBorder}`, borderRadius: 16, padding: 24, marginBottom: 20, boxShadow: isDark ? 'none' : '0 1px 4px rgba(0,0,0,0.04)' }}>
        <h2 style={{ fontWeight: 700, fontSize: '0.9375rem', color: headColor, marginBottom: 20 }}>Ingresos por plan</h2>
        {planDist.map(({ plan, count, revenue }) => {
          const pct = mrr > 0 ? Math.round((revenue / mrr) * 100) : 0
          const ps = PLAN_STYLE[plan] || PLAN_STYLE.free
          return (
            <div key={plan} style={{ marginBottom: 18 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontWeight: 700, color: ps.color, fontSize: '0.875rem' }}>{ps.label}</span>
                  <span style={{ fontSize: '0.75rem', color: subColor }}>{count} clientes</span>
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                  <span style={{ fontWeight: 700, color: headColor, fontSize: '0.875rem' }}>{fmtUSD(revenue)}/mes</span>
                  <span style={{ fontSize: '0.75rem', color: subColor }}>{pct}%</span>
                </div>
              </div>
              <div style={{ height: 8, background: isDark ? 'rgba(255,255,255,0.06)' : '#F3F4F6', borderRadius: 999 }}>
                <div style={{ height: '100%', width: `${pct}%`, background: ps.color, borderRadius: 999 }} />
              </div>
            </div>
          )
        })}
        {planDist.every(p => p.count === 0) && <p style={{ color: subColor, textAlign: 'center', padding: '20px 0', fontSize: '0.875rem' }}>Sin suscripciones de pago — conecta Stripe para ver ingresos reales</p>}
      </div>

      <div style={{ background: cardBg, border: `1.5px solid ${cardBorder}`, borderRadius: 16, overflow: 'hidden', boxShadow: isDark ? 'none' : '0 1px 4px rgba(0,0,0,0.04)' }}>
        <div style={{ padding: '16px 22px', borderBottom: `1px solid ${cardBorder}` }}>
          <h2 style={{ fontWeight: 700, fontSize: '0.9375rem', color: headColor }}>Todas las suscripciones</h2>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${cardBorder}` }}>
              {['Cliente','Plan','Estado','MRR','Inicio','Próxima factura'].map(h => (
                <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: '0.71rem', fontWeight: 700, color: subColor, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {subscriptions.length === 0 ? (
              <tr><td colSpan={6} style={{ padding: '50px', textAlign: 'center', color: subColor, fontSize: '0.875rem' }}>Sin suscripciones registradas</td></tr>
            ) : subscriptions.map(s => {
              const profile = profiles.find(p => p.id === s.user_id)
              const ps = PLAN_STYLE[s.plan] || PLAN_STYLE.free
              const ss = STATUS_STYLE[s.status] || {}
              return (
                <tr key={s.id} style={{ borderBottom: `1px solid ${rowBorder}` }}>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: headColor, fontSize: '0.875rem' }}>{profile?.full_name||'(Sin nombre)'}</td>
                  <td style={{ padding: '12px 16px' }}><span style={{ fontWeight: 700, color: ps.color }}>{ps.label}</span></td>
                  <td style={{ padding: '12px 16px' }}><span style={{ fontSize: '0.78rem', fontWeight: 700, color: ss.color }}>{ss.label||s.status}</span></td>
                  <td style={{ padding: '12px 16px', fontWeight: 700, color: '#00A87A' }}>${s.mrr_usd||0}</td>
                  <td style={{ padding: '12px 16px', fontSize: '0.78rem', color: subColor }}>{fmtDate(s.created_at)}</td>
                  <td style={{ padding: '12px 16px', fontSize: '0.78rem', color: subColor }}>{fmtDate(s.current_period_end)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ─── Websites Tab ─────────────────────────────────────────────────
function WebsitesTab({ sites, profiles, isDark }) {
  const [search, setSearch] = useState('')
  const cardBg = isDark ? 'rgba(255,255,255,0.03)' : '#fff'
  const cardBorder = isDark ? 'rgba(255,255,255,0.07)' : '#E5E7EB'
  const headColor = isDark ? '#fff' : '#111827'
  const subColor = isDark ? 'rgba(255,255,255,0.35)' : '#6B7280'
  const rowBorder = isDark ? 'rgba(255,255,255,0.04)' : '#F3F4F6'

  const filtered = sites.filter(s => !search || s.name?.toLowerCase().includes(search.toLowerCase()) || s.industry?.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontWeight: 900, fontSize: '1.75rem', letterSpacing: '-0.04em', color: headColor, marginBottom: 4 }}>Sitios Web</h1>
          <p style={{ color: subColor, fontSize: '0.875rem' }}>{sites.length} sitios creados en la plataforma</p>
        </div>
      </div>

      <div style={{ position: 'relative', marginBottom: 18 }}>
        <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
        <input placeholder="Buscar por nombre o industria..." value={search} onChange={e => setSearch(e.target.value)}
          style={{ width: '100%', paddingLeft: 36, paddingRight: 16, paddingTop: 9, paddingBottom: 9, background: isDark ? 'rgba(255,255,255,0.05)' : '#F9FAFB', border: `1.5px solid ${cardBorder}`, borderRadius: 9, color: headColor, fontSize: '0.875rem', fontFamily: 'system-ui', outline: 'none', boxSizing: 'border-box' }} />
      </div>

      <div style={{ background: cardBg, border: `1.5px solid ${cardBorder}`, borderRadius: 16, overflow: 'hidden', boxShadow: isDark ? 'none' : '0 1px 4px rgba(0,0,0,0.04)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${cardBorder}` }}>
              {['Sitio','Dueño','Industria','Estado','Visitas','Creado','Ver'].map(h => (
                <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '0.71rem', fontWeight: 700, color: subColor, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={7} style={{ padding: '60px', textAlign: 'center', color: subColor }}>Sin sitios aún</td></tr>
            ) : filtered.map(site => {
              const owner = profiles.find(p => p.id === site.user_id)
              const isPublished = site.status === 'published'
              return (
                <tr key={site.id} style={{ borderBottom: `1px solid ${rowBorder}` }}
                  onMouseEnter={e => e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.02)' : '#F9FAFB'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <td style={{ padding: '13px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 36, height: 36, borderRadius: 9, background: `linear-gradient(135deg, ${site.json_data?.primaryColor||'#6366F1'}, ${site.json_data?.secondaryColor||'#818CF8'})`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Globe size={14} color="rgba(255,255,255,0.7)"/>
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, color: headColor, fontSize: '0.875rem' }}>{site.name}</div>
                        {site.subdomain && <div style={{ fontSize: '0.68rem', color: subColor }}>{site.subdomain}.saasweb.app</div>}
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '13px 16px', fontSize: '0.8rem', color: subColor }}>{owner?.full_name||'—'}</td>
                  <td style={{ padding: '13px 16px', fontSize: '0.8rem', color: subColor }}>{site.industry||'—'}</td>
                  <td style={{ padding: '13px 16px' }}>
                    <span style={{ padding: '3px 9px', borderRadius: 999, fontSize: '0.7rem', fontWeight: 700, background: isPublished ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.1)', color: isPublished ? '#10B981' : '#D97706' }}>
                      {isPublished ? 'Publicado' : 'Borrador'}
                    </span>
                  </td>
                  <td style={{ padding: '13px 16px', fontWeight: 700, color: headColor }}>{fmt(site.visits_total||0)}</td>
                  <td style={{ padding: '13px 16px', fontSize: '0.78rem', color: subColor, whiteSpace: 'nowrap' }}>{fmtDate(site.created_at)}</td>
                  <td style={{ padding: '13px 16px' }}>
                    {site.published_url ? (
                      <a href={site.published_url} target="_blank" rel="noopener noreferrer" style={{ color: subColor, display: 'flex' }}><ExternalLink size={14}/></a>
                    ) : <span style={{ color: subColor }}>—</span>}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ─── Pricing Tab ──────────────────────────────────────────────────
function PricingTab({ isDark }) {
  const cardBg     = isDark ? 'rgba(255,255,255,0.03)' : '#fff'
  const cardBorder = isDark ? 'rgba(255,255,255,0.07)' : '#E5E7EB'
  const headColor  = isDark ? '#fff' : '#111827'
  const subColor   = isDark ? 'rgba(255,255,255,0.35)' : '#6B7280'
  const inputBg    = isDark ? 'rgba(255,255,255,0.06)' : '#F9FAFB'

  const [plans, setPlans]     = useState([])
  const [saving, setSaving]   = useState(null)
  const [saved,  setSaved]    = useState(null)
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState(null)

  useEffect(() => {
    supabase.from('plan_prices').select('*').order('sort_order')
      .then(({ data }) => { if (data) setPlans(data) })
      .finally(() => setLoading(false))
  }, [])

  const update = (id, field, val) =>
    setPlans(ps => ps.map(p => p.id === id ? { ...p, [field]: val } : p))

  const updateFeature = (id, idx, val) =>
    setPlans(ps => ps.map(p => {
      if (p.id !== id) return p
      const f = [...p.features]; f[idx] = val
      return { ...p, features: f }
    }))

  const addFeature    = (id) =>
    setPlans(ps => ps.map(p => p.id === id ? { ...p, features: [...p.features, ''] } : p))

  const removeFeature = (id, idx) =>
    setPlans(ps => ps.map(p => {
      if (p.id !== id) return p
      return { ...p, features: p.features.filter((_, i) => i !== idx) }
    }))

  const savePlan = async (plan) => {
    setSaving(plan.id)
    const { error } = await supabase.from('plan_prices').update({
      name: plan.name, description: plan.description,
      monthly_cents: plan.monthly_cents, annual_cents: plan.annual_cents,
      site_limit: plan.site_limit, is_contact: plan.is_contact,
      is_active: plan.is_active, features: plan.features,
      updated_at: new Date().toISOString(),
    }).eq('id', plan.id)
    setSaving(null)
    if (!error) { setSaved(plan.id); setTimeout(() => setSaved(null), 2000) }
  }

  const COLOR = { free: '#6B7280', starter: '#6366F1', pro: '#00A87A', agency: '#D97706' }
  const inp = (extra = {}) => ({
    background: 'transparent', border: 'none', outline: 'none',
    fontFamily: 'system-ui', color: headColor, ...extra,
  })

  if (loading) return <div style={{ padding: 40, textAlign: 'center', color: subColor, fontSize: '0.875rem' }}>Cargando...</div>

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontWeight: 800, fontSize: '1.25rem', color: headColor, marginBottom: 2 }}>Gestión de Precios</h1>
        <p style={{ color: subColor, fontSize: '0.8125rem' }}>Edita precios y características en tiempo real. Los cambios se aplican inmediatamente.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {plans.filter(p => p.id !== 'free').map(plan => {
          const color    = COLOR[plan.id] || '#6B7280'
          const isSaved  = saved  === plan.id
          const isSaving = saving === plan.id
          const isOpen   = expanded === plan.id

          return (
            <div key={plan.id} style={{
              background: cardBg,
              border: `1px solid ${isSaved ? '#10B981' : cardBorder}`,
              borderRadius: 16,
              overflow: 'hidden',
              transition: 'border-color 0.25s, box-shadow 0.25s',
              boxShadow: isDark
                ? `0 0 0 1px ${color}20`
                : `0 4px 16px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)`,
            }}>

              {/* ── Hero gradient header ── */}
              <div style={{
                background: `linear-gradient(135deg, ${color}18 0%, ${color}06 100%)`,
                borderBottom: `1px solid ${color}20`,
                padding: '18px 20px 14px',
                position: 'relative',
              }}>
                {/* Top row: badge + active toggle */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 28, height: 28, borderRadius: 8, background: `${color}20`, border: `1px solid ${color}35`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Tag size={13} color={color} />
                    </div>
                    <div>
                      <input value={plan.name} onChange={e => update(plan.id, 'name', e.target.value)}
                        style={{ ...inp({ fontWeight: 800, fontSize: '0.9375rem', letterSpacing: '-0.02em', width: 100 }) }} />
                      <div style={{ fontSize: '0.62rem', color: `${color}`, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 1 }}>{plan.id}</div>
                    </div>
                  </div>
                  <button onClick={() => update(plan.id, 'is_active', !plan.is_active)}
                    style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '3px 9px', borderRadius: 20, border: `1px solid ${plan.is_active ? '#10B981' : cardBorder}`, background: plan.is_active ? 'rgba(16,185,129,0.1)' : (isDark ? 'rgba(255,255,255,0.04)' : '#F9FAFB'), color: plan.is_active ? '#10B981' : '#9CA3AF', fontSize: '0.65rem', fontWeight: 700, cursor: 'pointer', fontFamily: 'system-ui', transition: 'all 0.15s' }}>
                    {plan.is_active ? <ToggleRight size={12}/> : <ToggleLeft size={12}/>}
                    {plan.is_active ? 'Activo' : 'Oculto'}
                  </button>
                </div>

                {/* Description */}
                <input value={plan.description || ''} onChange={e => update(plan.id, 'description', e.target.value)}
                  placeholder="Descripción del plan"
                  style={{ ...inp({ fontSize: '0.75rem', color: subColor, width: '100%' }) }} />
              </div>

              {/* ── Price section ── */}
              <div style={{ padding: '14px 20px', borderBottom: `1px solid ${cardBorder}` }}>
                {plan.is_contact ? (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#D97706', letterSpacing: '-0.04em', lineHeight: 1 }}>A medida</div>
                      <div style={{ fontSize: '0.7rem', color: subColor, marginTop: 3 }}>Precio personalizado por cliente</div>
                    </div>
                    {plan.id === 'agency' && (
                      <button onClick={() => update(plan.id, 'is_contact', false)}
                        style={{ padding: '3px 8px', borderRadius: 6, background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)', color: '#D97706', fontSize: '0.65rem', fontWeight: 700, cursor: 'pointer', fontFamily: 'system-ui' }}>
                        Precio fijo
                      </button>
                    )}
                  </div>
                ) : (
                  <div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 80px', gap: 8 }}>
                      {[
                        ['/mes', 'monthly_cents', false],
                        ['/año', 'annual_cents', false],
                        ['sitios', 'site_limit', true],
                      ].map(([label, field, isCount]) => (
                        <div key={field}>
                          <div style={{ fontSize: '0.6rem', fontWeight: 700, color: subColor, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>{label}</div>
                          <div style={{ display: 'flex', alignItems: 'center', background: inputBg, border: `1px solid ${cardBorder}`, borderRadius: 8, padding: '5px 8px', gap: 3 }}>
                            {!isCount && <span style={{ fontSize: '0.7rem', color: subColor, fontWeight: 700 }}>$</span>}
                            <input type="number" min={0}
                              value={isCount ? plan[field] : (plan[field] / 100).toFixed(0)}
                              onChange={e => update(plan.id, field, isCount
                                ? parseInt(e.target.value || 1)
                                : Math.round(parseFloat(e.target.value || 0) * 100))}
                              style={{ ...inp({ fontWeight: 800, fontSize: '1rem', width: '100%', textAlign: 'center', letterSpacing: '-0.03em' }) }} />
                          </div>
                        </div>
                      ))}
                    </div>
                    {plan.id === 'agency' && (
                      <button onClick={() => update(plan.id, 'is_contact', true)}
                        style={{ marginTop: 8, fontSize: '0.65rem', color: '#D97706', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'system-ui', fontWeight: 700, padding: 0 }}>
                        → Cambiar a modo "Contactar ventas"
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* ── Features ── */}
              <div style={{ padding: '12px 20px' }}>
                <button onClick={() => setExpanded(isOpen ? null : plan.id)}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginBottom: isOpen ? 10 : 0 }}>
                  <span style={{ fontSize: '0.65rem', fontWeight: 700, color: subColor, textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: 'system-ui' }}>
                    {plan.features.length} características incluidas
                  </span>
                  <span style={{ fontSize: '0.6rem', color: `${color}`, fontWeight: 800 }}>{isOpen ? '▲ Cerrar' : '▼ Editar'}</span>
                </button>

                {isOpen && (
                  <div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 8 }}>
                      {plan.features.map((f, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', background: isDark ? `${color}12` : `${color}08`, border: `1px solid ${color}22`, borderRadius: 6, padding: '3px 6px 3px 8px', gap: 4 }}>
                          <input value={f} onChange={e => updateFeature(plan.id, i, e.target.value)}
                            style={{ ...inp({ fontSize: '0.7rem', color: headColor, width: Math.max(50, f.length * 6.5) + 'px' }) }} />
                          <button onClick={() => removeFeature(plan.id, i)}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#EF4444', display: 'flex', padding: 0, opacity: 0.6 }}>
                            <Trash2 size={10}/>
                          </button>
                        </div>
                      ))}
                      <button onClick={() => addFeature(plan.id)}
                        style={{ display: 'flex', alignItems: 'center', gap: 2, padding: '3px 8px', borderRadius: 6, background: 'transparent', border: `1.5px dashed ${color}35`, color, fontSize: '0.7rem', fontWeight: 700, cursor: 'pointer', fontFamily: 'system-ui' }}>
                        <Plus size={9}/> Añadir
                      </button>
                    </div>
                  </div>
                )}

                {/* Save */}
                <button onClick={() => savePlan(plan)} disabled={isSaving}
                  style={{
                    width: '100%', marginTop: isOpen ? 4 : 10,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                    padding: '8px 12px',
                    background: isSaved
                      ? 'linear-gradient(135deg,#10B981,#059669)'
                      : `linear-gradient(135deg, ${color}, ${color}CC)`,
                    border: 'none', borderRadius: 9, color: '#fff',
                    fontWeight: 700, fontSize: '0.78rem', cursor: isSaving ? 'wait' : 'pointer',
                    fontFamily: 'system-ui', transition: 'opacity 0.15s',
                    boxShadow: isSaved ? '0 3px 10px rgba(16,185,129,0.3)' : `0 3px 10px ${color}35`,
                    opacity: isSaving ? 0.7 : 1,
                  }}>
                  {isSaved ? <><CheckCircle2 size={13}/> ¡Guardado!</> : isSaving ? 'Guardando…' : <><Save size={13}/> Guardar cambios</>}
                </button>
              </div>
            </div>
          )
        })}
      </div>

      <div style={{ marginTop: 14, padding: '8px 14px', background: isDark ? 'rgba(0,200,150,0.04)' : '#F0FDF4', border: '1px solid rgba(0,200,150,0.15)', borderRadius: 8, fontSize: '0.72rem', color: subColor }}>
        <strong style={{ color: '#00A87A' }}>Nota:</strong> Los cambios se aplican inmediatamente a todos los clientes nuevos.
      </div>
    </div>
  )
}

// ─── Invoices Tab ──────────────────────────────────────────────────
const INV_STATUS = {
  paid:     { color: '#10B981', bg: 'rgba(16,185,129,0.1)',  icon: <CheckCircle2 size={11}/>, label: 'Pagado'    },
  pending:  { color: '#F59E0B', bg: 'rgba(245,158,11,0.1)',  icon: <Clock size={11}/>,        label: 'Pendiente' },
  failed:   { color: '#EF4444', bg: 'rgba(239,68,68,0.1)',   icon: <XCircle size={11}/>,      label: 'Fallido'   },
  refunded: { color: '#6B7280', bg: 'rgba(107,114,128,0.1)', icon: <RotateCcw size={11}/>,    label: 'Reembolso' },
  void:     { color: '#9CA3AF', bg: 'rgba(156,163,175,0.1)', icon: <AlertCircle size={11}/>,  label: 'Anulado'   },
}
const PLAN_COLOR_INV = { free: '#6B7280', starter: '#6366F1', pro: '#00A87A', agency: '#D97706' }

function InvoicesTab({ isDark }) {
  const cardBg     = isDark ? 'rgba(255,255,255,0.03)' : '#fff'
  const cardBorder = isDark ? 'rgba(255,255,255,0.07)' : '#E5E7EB'
  const headColor  = isDark ? '#fff' : '#111827'
  const subColor   = isDark ? 'rgba(255,255,255,0.35)' : '#6B7280'
  const rowHover   = isDark ? 'rgba(255,255,255,0.02)' : '#F9FAFB'
  const thColor    = isDark ? 'rgba(255,255,255,0.3)' : '#9CA3AF'

  const [invoices, setInvoices] = useState([])
  const [loading, setLoading]   = useState(true)
  const [filter, setFilter]     = useState('all')   // all | paid | pending | failed
  const [search, setSearch]     = useState('')
  const [hover, setHover]       = useState(null)

  useEffect(() => {
    supabase.from('invoices').select('*').order('created_at', { ascending: false })
      .then(({ data }) => { if (data) setInvoices(data) })
      .finally(() => setLoading(false))
  }, [])

  const filtered = invoices.filter(inv => {
    if (filter !== 'all' && inv.status !== filter) return false
    if (search) {
      const q = search.toLowerCase()
      return inv.client_email.toLowerCase().includes(q) ||
             inv.client_name.toLowerCase().includes(q) ||
             inv.invoice_number.toLowerCase().includes(q)
    }
    return true
  })

  // KPIs
  const totalRevenue  = invoices.filter(i => i.status === 'paid').reduce((s, i) => s + i.amount_cents, 0)
  const pendingAmount = invoices.filter(i => i.status === 'pending').reduce((s, i) => s + i.amount_cents, 0)
  const paidCount     = invoices.filter(i => i.status === 'paid').length
  const failedCount   = invoices.filter(i => i.status === 'failed').length
  const thisMonth     = invoices.filter(i => {
    const d = new Date(i.created_at)
    const now = new Date()
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear() && i.status === 'paid'
  }).reduce((s, i) => s + i.amount_cents, 0)

  const fmt$ = cents => `$${(cents / 100).toFixed(2)}`

  const TABS = [
    { id: 'all',     label: 'Todas',     count: invoices.length },
    { id: 'paid',    label: 'Pagadas',   count: paidCount },
    { id: 'pending', label: 'Pendiente', count: invoices.filter(i=>i.status==='pending').length },
    { id: 'failed',  label: 'Fallidas',  count: failedCount },
  ]

  if (loading) return <div style={{ padding: 40, textAlign: 'center', color: subColor, fontSize: '0.875rem' }}>Cargando facturas...</div>

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontWeight: 800, fontSize: '1.25rem', color: headColor, marginBottom: 2 }}>Facturas y Pagos</h1>
        <p style={{ color: subColor, fontSize: '0.8125rem' }}>Historial completo de transacciones de todos los clientes. Como Stripe Dashboard.</p>
      </div>

      {/* KPI strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 20 }}>
        {[
          { label: 'Ingresos totales',     value: fmt$(totalRevenue),  color: '#10B981', icon: <DollarSign size={16}/>,  sub: `${paidCount} facturas pagadas` },
          { label: 'Este mes',             value: fmt$(thisMonth),     color: '#6366F1', icon: <TrendingUp size={16}/>,  sub: 'Mes actual' },
          { label: 'Por cobrar',           value: fmt$(pendingAmount), color: '#F59E0B', icon: <Clock size={16}/>,       sub: `${invoices.filter(i=>i.status==='pending').length} pendientes` },
          { label: 'Cobros fallidos',      value: `${failedCount}`,    color: '#EF4444', icon: <AlertCircle size={16}/>, sub: 'Requieren atención' },
        ].map(k => (
          <div key={k.label} style={{ background: cardBg, border: `1px solid ${cardBorder}`, borderRadius: 12, padding: '14px 16px', boxShadow: isDark ? 'none' : '0 1px 4px rgba(0,0,0,0.04)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -16, right: -16, width: 60, height: 60, borderRadius: '50%', background: `${k.color}10` }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <div style={{ width: 30, height: 30, borderRadius: 8, background: `${k.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: k.color }}>{k.icon}</div>
            </div>
            <div style={{ fontWeight: 900, fontSize: '1.375rem', color: headColor, letterSpacing: '-0.04em', lineHeight: 1, marginBottom: 3 }}>{k.value}</div>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: subColor }}>{k.label}</div>
            <div style={{ fontSize: '0.65rem', color: isDark ? 'rgba(255,255,255,0.2)' : '#9CA3AF', marginTop: 1 }}>{k.sub}</div>
          </div>
        ))}
      </div>

      {/* Filter bar */}
      <div style={{ background: cardBg, border: `1px solid ${cardBorder}`, borderRadius: 12, overflow: 'hidden', boxShadow: isDark ? 'none' : '0 1px 4px rgba(0,0,0,0.04)' }}>
        <div style={{ padding: '12px 16px', borderBottom: `1px solid ${cardBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          {/* Status tabs */}
          <div style={{ display: 'flex', gap: 4 }}>
            {TABS.map(t => (
              <button key={t.id} onClick={() => setFilter(t.id)}
                style={{ padding: '4px 12px', borderRadius: 7, border: `1px solid ${filter===t.id ? '#6366F1' : cardBorder}`, background: filter===t.id ? 'rgba(99,102,241,0.08)' : 'transparent', color: filter===t.id ? '#6366F1' : subColor, fontSize: '0.72rem', fontWeight: 700, cursor: 'pointer', fontFamily: 'system-ui', display: 'flex', alignItems: 'center', gap: 5 }}>
                {t.label}
                <span style={{ background: filter===t.id ? '#6366F120' : (isDark ? 'rgba(255,255,255,0.08)' : '#F3F4F6'), borderRadius: 4, padding: '0 5px', fontSize: '0.6rem', fontWeight: 800 }}>{t.count}</span>
              </button>
            ))}
          </div>
          {/* Search */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: isDark ? 'rgba(255,255,255,0.05)' : '#F9FAFB', border: `1px solid ${cardBorder}`, borderRadius: 8, padding: '5px 10px' }}>
            <Search size={12} color={subColor}/>
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Buscar cliente o factura..."
              style={{ background: 'none', border: 'none', outline: 'none', fontSize: '0.78rem', color: headColor, fontFamily: 'system-ui', width: 180 }} />
          </div>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${cardBorder}` }}>
                {['#', 'Cliente', 'Plan', 'Periodo', 'Monto', 'Estado', 'Fecha pago', 'Stripe ID'].map(h => (
                  <th key={h} style={{ padding: '9px 14px', textAlign: 'left', fontSize: '0.64rem', fontWeight: 700, color: thColor, textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={8} style={{ padding: 40, textAlign: 'center', color: subColor, fontSize: '0.8125rem' }}>No se encontraron facturas</td></tr>
              ) : filtered.map((inv, idx) => {
                const st = INV_STATUS[inv.status] || INV_STATUS.pending
                const pc = PLAN_COLOR_INV[inv.plan] || '#6B7280'
                return (
                  <tr key={inv.id}
                    onMouseEnter={() => setHover(idx)} onMouseLeave={() => setHover(null)}
                    style={{ borderBottom: `1px solid ${cardBorder}`, background: hover===idx ? rowHover : 'transparent', transition: 'background 0.1s' }}>

                    {/* Invoice # */}
                    <td style={{ padding: '10px 14px', whiteSpace: 'nowrap' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: headColor, fontFamily: 'monospace' }}>{inv.invoice_number}</span>
                    </td>

                    {/* Client */}
                    <td style={{ padding: '10px 14px' }}>
                      <div style={{ fontWeight: 700, fontSize: '0.8125rem', color: headColor }}>{inv.client_name}</div>
                      <div style={{ fontSize: '0.7rem', color: subColor }}>{inv.client_email}</div>
                    </td>

                    {/* Plan */}
                    <td style={{ padding: '10px 14px' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', padding: '2px 8px', borderRadius: 5, background: `${pc}12`, border: `1px solid ${pc}25`, color: pc, fontSize: '0.68rem', fontWeight: 700, textTransform: 'capitalize' }}>{inv.plan}</span>
                    </td>

                    {/* Period */}
                    <td style={{ padding: '10px 14px', whiteSpace: 'nowrap' }}>
                      <span style={{ fontSize: '0.72rem', color: subColor }}>
                        {inv.billing_period_start ? new Date(inv.billing_period_start).toLocaleDateString('es', { month: 'short', year: 'numeric' }) : '—'}
                      </span>
                    </td>

                    {/* Amount */}
                    <td style={{ padding: '10px 14px', whiteSpace: 'nowrap' }}>
                      <span style={{ fontWeight: 800, fontSize: '0.875rem', color: headColor, letterSpacing: '-0.02em' }}>{fmt$(inv.amount_cents)}</span>
                      <span style={{ fontSize: '0.62rem', color: subColor, marginLeft: 3 }}>{inv.currency}</span>
                    </td>

                    {/* Status */}
                    <td style={{ padding: '10px 14px' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 8px', borderRadius: 20, background: st.bg, color: st.color, fontSize: '0.68rem', fontWeight: 700, whiteSpace: 'nowrap' }}>
                        {st.icon} {st.label}
                      </span>
                    </td>

                    {/* Paid at */}
                    <td style={{ padding: '10px 14px', whiteSpace: 'nowrap' }}>
                      <span style={{ fontSize: '0.72rem', color: inv.paid_at ? headColor : subColor }}>
                        {inv.paid_at ? new Date(inv.paid_at).toLocaleDateString('es', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}
                      </span>
                    </td>

                    {/* Stripe ID */}
                    <td style={{ padding: '10px 14px' }}>
                      {inv.stripe_invoice_id
                        ? <span style={{ fontFamily: 'monospace', fontSize: '0.65rem', color: subColor, background: isDark ? 'rgba(255,255,255,0.05)' : '#F3F4F6', padding: '2px 6px', borderRadius: 4 }}>{inv.stripe_invoice_id}</span>
                        : <span style={{ fontSize: '0.65rem', color: subColor }}>—</span>}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div style={{ padding: '10px 16px', borderTop: `1px solid ${cardBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '0.72rem', color: subColor }}>{filtered.length} facturas mostradas</span>
          <span style={{ fontSize: '0.72rem', color: subColor }}>Total ingresado: <strong style={{ color: headColor }}>{fmt$(totalRevenue)}</strong></span>
        </div>
      </div>
    </div>
  )
}

// ─── Settings Tab ─────────────────────────────────────────────────
function SettingsTab({ user, isDark }) {
  const cardBg = isDark ? 'rgba(255,255,255,0.03)' : '#fff'
  const cardBorder = isDark ? 'rgba(255,255,255,0.07)' : '#E5E7EB'
  const headColor = isDark ? '#fff' : '#111827'
  const subColor = isDark ? 'rgba(255,255,255,0.35)' : '#6B7280'

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontWeight: 900, fontSize: '1.75rem', letterSpacing: '-0.04em', color: headColor, marginBottom: 4 }}>Configuración</h1>
        <p style={{ color: subColor }}>Ajustes del sistema y de la plataforma</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {[
          { label: 'Email de la cuenta', value: user?.email, icon: <Shield size={16}/>, color: '#6366F1' },
          { label: 'Stripe Integration', value: 'Pendiente de configurar', icon: <CreditCard size={16}/>, color: '#00C896', action: 'Conectar Stripe' },
          { label: 'Dominio de la plataforma', value: 'saasweb.app', icon: <Globe size={16}/>, color: '#06B6D4' },
          { label: 'Acceso', value: 'Super Admin ilimitado', icon: <Zap size={16}/>, color: '#F59E0B' },
        ].map(item => (
          <div key={item.label} style={{ background: cardBg, border: `1.5px solid ${cardBorder}`, borderRadius: 14, padding: '18px 22px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: isDark ? 'none' : '0 1px 3px rgba(0,0,0,0.04)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: `${item.color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: item.color }}>{item.icon}</div>
              <div>
                <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: subColor, marginBottom: 2 }}>{item.label}</div>
                <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: headColor }}>{item.value}</div>
              </div>
            </div>
            {item.action && (
              <button style={{ padding: '7px 14px', borderRadius: 8, background: 'rgba(0,200,150,0.08)', border: '1px solid rgba(0,200,150,0.2)', color: '#00A87A', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer', fontFamily: 'system-ui' }}>
                {item.action}
              </button>
            )}
          </div>
        ))}
      </div>
      <div style={{ marginTop: 20, padding: '18px 22px', background: isDark ? 'rgba(239,68,68,0.06)' : '#FEF2F2', border: '1px solid rgba(239,68,68,0.15)', borderRadius: 14 }}>
        <h3 style={{ fontWeight: 700, color: '#EF4444', fontSize: '0.9375rem', marginBottom: 8 }}>Próximos pasos</h3>
        <ul style={{ color: subColor, fontSize: '0.875rem', lineHeight: 2, paddingLeft: 20, margin: 0 }}>
          <li>Conectar Stripe para recibir pagos reales</li>
          <li>Configurar dominio personalizado</li>
          <li>Activar Google OAuth para login social</li>
        </ul>
      </div>
    </div>
  )
}

// ─── MAIN ADMIN DASHBOARD ─────────────────────────────────────────
export default function AdminDashboard() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [tab, setTab] = useState('overview')
  const [isDark, setIsDark] = useState(false)   // ← LIGHT by default
  const [data, setData] = useState({ profiles: [], sites: [], subscriptions: [], loading: true })
  const [refreshing, setRefreshing] = useState(false)

  const loadAll = async () => {
    setRefreshing(true)
    try {
      const [pR, sR, subR] = await Promise.allSettled([
        supabase.from('profiles').select('*').order('created_at', { ascending: false }),
        supabase.from('websites').select('*').order('created_at', { ascending: false }),
        supabase.from('subscriptions').select('*').order('created_at', { ascending: false }),
      ])
      setData({
        profiles: pR.status === 'fulfilled' ? (pR.value.data || []) : [],
        sites: sR.status === 'fulfilled' ? (sR.value.data || []) : [],
        subscriptions: subR.status === 'fulfilled' ? (subR.value.data || []) : [],
        loading: false,
      })
    } catch { setData(d => ({ ...d, loading: false })) }
    finally { setRefreshing(false) }
  }

  useEffect(() => { loadAll() }, [])

  const handleRoleChange = async (profileId, newRole) => {
    await supabase.from('profiles').update({ role: newRole }).eq('id', profileId)
    setData(d => ({ ...d, profiles: d.profiles.map(p => p.id === profileId ? { ...p, role: newRole } : p) }))
  }

  const handleSignOut = async () => { await signOut(); navigate('/') }

  const bg = isDark ? '#060D09' : '#F9FAFB'
  const headerBg = isDark ? 'rgba(0,0,0,0.4)' : '#fff'
  const headerBorder = isDark ? 'rgba(255,255,255,0.07)' : '#E5E7EB'
  const headColor = isDark ? '#fff' : '#111827'
  const subColor = isDark ? 'rgba(255,255,255,0.35)' : '#6B7280'

  if (data.loading) {
    return (
      <div style={{ minHeight: '100vh', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', border: '3px solid #00C896', borderTopColor: 'transparent', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px' }} />
          <p style={{ color: subColor, fontSize: '0.875rem', fontFamily: 'system-ui' }}>Cargando panel...</p>
        </div>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    )
  }

  const tabLabels = { overview: 'Resumen', clients: 'Clientes', revenue: 'Ingresos', invoices: 'Facturas', websites: 'Sitios Web', pricing: 'Precios', map: 'Mapa de Clientes', settings: 'Configuración' }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: bg, fontFamily: 'system-ui', transition: 'background 0.2s' }}>
      <AdminSidebar active={tab} onNav={setTab} onSignOut={handleSignOut} isDark={isDark} onToggleDark={() => setIsDark(d => !d)} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <header style={{ background: headerBg, backdropFilter: 'blur(20px)', borderBottom: `1px solid ${headerBorder}`, padding: '0 36px', height: 58, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 40, transition: 'all 0.2s' }}>
          <span style={{ fontSize: '0.875rem', fontWeight: 700, color: subColor }}>{tabLabels[tab]}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 12px', borderRadius: 10, border: `1.5px solid ${headerBorder}` }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg,#00C896,#6366F1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.75rem', color: '#fff' }}>J</div>
            <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: headColor }}>{user?.email}</span>
          </div>
        </header>

        {/* Content */}
        <main style={{ flex: 1, padding: tab === 'map' ? '24px 24px' : '36px 40px', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
          {tab === 'overview'  && <OverviewTab  profiles={data.profiles} sites={data.sites} subscriptions={data.subscriptions} refreshing={refreshing} onRefresh={loadAll} isDark={isDark} />}
          {tab === 'clients'   && <ClientsTab   profiles={data.profiles} sites={data.sites} subscriptions={data.subscriptions} onRoleChange={handleRoleChange} isDark={isDark} />}
          {tab === 'revenue'   && <RevenueTab   subscriptions={data.subscriptions} profiles={data.profiles} isDark={isDark} />}
          {tab === 'invoices'  && <InvoicesTab  isDark={isDark} />}
          {tab === 'websites'  && <WebsitesTab  sites={data.sites} profiles={data.profiles} isDark={isDark} />}
          {tab === 'pricing'   && <PricingTab   isDark={isDark} />}
          {tab === 'map'       && <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}><MapTab profiles={data.profiles} /></div>}
          {tab === 'settings'  && <SettingsTab  user={user} isDark={isDark} />}
        </main>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}
