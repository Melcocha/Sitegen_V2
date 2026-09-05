/**
 * WebsitePreview — Premium, fluid responsive via CSS Container Queries
 * Container queries fire at CONTAINER width, not viewport — works inside editor panels.
 */
import { useState, useEffect, useRef } from 'react'
import LauncherWidget from './LauncherWidget'
import ChurchTemplateMyGateway from './ChurchTemplateMyGateway'
import ChurchTemplateNucleus from './ChurchTemplateNucleus'
import ChurchTemplatePoster from './ChurchTemplatePoster'
import ChurchTemplateAfiche from './ChurchTemplateAfiche'
import CanvasTransformerOverlay from './CanvasTransformerOverlay'

const INDUSTRY_HERO = {
  // ── Professional services ─────────────────────────────────────
  'Legal & Jur\u00eddico':              'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1400&q=85&fit=crop',
  'Salud & Odontolog\u00eda':           'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1400&q=85&fit=crop',
  'Educaci\u00f3n':                     'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1400&q=85&fit=crop',
  'Marketing':                      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&q=85&fit=crop',
  'Finanzas':                       'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1400&q=85&fit=crop',
  // ── Tech / Software ──────────────────────────────────────────
  'Tecnolog\u00eda':                    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1400&q=85&fit=crop',
  'Software Empresarial':           'https://images.unsplash.com/photo-1537432376769-00f5c2f4c8d2?w=1400&q=85&fit=crop',
  'Desarrollo de Software':         'https://images.unsplash.com/photo-1537432376769-00f5c2f4c8d2?w=1400&q=85&fit=crop',
  'Desarrollo de Software Empresarial': 'https://images.unsplash.com/photo-1537432376769-00f5c2f4c8d2?w=1400&q=85&fit=crop',
  'Software':                       'https://images.unsplash.com/photo-1537432376769-00f5c2f4c8d2?w=1400&q=85&fit=crop',
  'ERP':                            'https://images.unsplash.com/photo-1537432376769-00f5c2f4c8d2?w=1400&q=85&fit=crop',
  // ── Infrastructure / Government ──────────────────────────────
  'Infraestructura':                'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1400&q=85&fit=crop',
  'Inversi\u00f3n':                     'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1400&q=85&fit=crop',
  'Inversi\u00f3n en Infraestructura':   'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1400&q=85&fit=crop',
  'Gobierno':                       'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1400&q=85&fit=crop',
  'Sector P\u00fablico':                 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1400&q=85&fit=crop',
  'Construcci\u00f3n':                  'https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?w=1400&q=85&fit=crop',
  'Defensa & Seguridad':           'https://images.unsplash.com/photo-1569974507005-6dc61f97fb5c?w=1400&q=85&fit=crop',
  'Seguridad':                      'https://images.unsplash.com/photo-1569974507005-6dc61f97fb5c?w=1400&q=85&fit=crop',
  'Defense':                        'https://images.unsplash.com/photo-1569974507005-6dc61f97fb5c?w=1400&q=85&fit=crop',
  // ── Consumer / Lifestyle ─────────────────────────────────────
  'Moda & Accesorios':              'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1400&q=85&fit=crop',
  'Moda y Accesorios':              'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1400&q=85&fit=crop',
  'Moda':                           'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1400&q=85&fit=crop',
  'Lujo':                           'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1400&q=85&fit=crop',
  'Perfumes':                       'https://images.unsplash.com/photo-1541643600914-78b084683702?w=1400&q=85&fit=crop',
  'Perfumer\u00eda':                    'https://images.unsplash.com/photo-1541643600914-78b084683702?w=1400&q=85&fit=crop',
  'Cosm\u00e9tica':                     'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1400&q=85&fit=crop',
  'Belleza':                        'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1400&q=85&fit=crop',
  'Spa & Bienestar':               'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1400&q=85&fit=crop',
  'Spa':                            'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1400&q=85&fit=crop',
  'Joyeria':                        'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1400&q=85&fit=crop',
  'Joy\u00e9r\u00eda':                      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1400&q=85&fit=crop',
  'Retail':                         'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1400&q=85&fit=crop',
  'Tienda':                         'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1400&q=85&fit=crop',
  'E-commerce':                     'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1400&q=85&fit=crop',
  'Fotograf\u00eda':                    'https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?w=1400&q=85&fit=crop',
  'Eventos':                        'https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=1400&q=85&fit=crop',
  'Veterinaria':                    'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1400&q=85&fit=crop',
  'Agricultura':                    'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1400&q=85&fit=crop',
  // ── Tourism / Culture / Heritage ───────────────────────────────
  'Turismo':                        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=85&fit=crop',
  'Cultura y Turismo':              'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=85&fit=crop',
  'Turismo y Cultura':              'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=85&fit=crop',
  'Patrimonio Cultural':            'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1400&q=85&fit=crop',
  'Patrimonio':                     'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1400&q=85&fit=crop',
  'Herencia Cultural':              'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1400&q=85&fit=crop',
  'Herencia':                       'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1400&q=85&fit=crop',
  'Tradiciones':                    'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1400&q=85&fit=crop',
  'Artesanias':                     'https://images.unsplash.com/photo-1467377791767-c929b5dc9a23?w=1400&q=85&fit=crop',
  // ── Church / Faith / Ministry ─────────────────────────────────
  'Iglesia / Ministerio / Fe':      'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=1600&q=85&fit=crop',
  'Iglesia':                        'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=1600&q=85&fit=crop',
  'Ministerio':                     'https://images.unsplash.com/photo-1519491050282-cf00c82424b4?w=1600&q=85&fit=crop',
  'Culto':                          'https://images.unsplash.com/photo-1544427920-c49ccfb85579?w=1600&q=85&fit=crop',
  'Fe':                             'https://images.unsplash.com/photo-1507692049790-de58290a4334?w=1600&q=85&fit=crop',
  // ── Food & Fitness ─────────────────────────────────────────────
  'Gastronom\u00eda':                   'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1400&q=85&fit=crop',
  'Fitness & Deportes':            'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1400&q=85&fit=crop',
  'Inmobiliaria':                   'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1400&q=85&fit=crop',
  'Autom\u00f3viles':                   'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1400&q=85&fit=crop',
  'Logistica':                      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1400&q=85&fit=crop',
  default:                          'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=85&fit=crop',
}
const INDUSTRY_ABOUT = {
  'Iglesia / Ministerio / Fe': 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&q=80&fit=crop',
  'Iglesia':                  'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&q=80&fit=crop',
  'Ministerio':               'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&q=80&fit=crop',
  'Legal & Jur\u00eddico':   'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80&fit=crop',
  'Gastronom\u00eda':        'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&q=80&fit=crop',
  'Salud & Odontolog\u00eda':'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80&fit=crop',
  'Fitness & Deportes': 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&q=80&fit=crop',
  'Inmobiliaria':       'https://images.unsplash.com/photo-1582407947304-fd86f28f3dde?w=800&q=80&fit=crop',
  'Tecnolog\u00eda':         'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80&fit=crop',
  'Software Empresarial': 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&q=80&fit=crop',
  'Desarrollo de Software': 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&q=80&fit=crop',
  'Software':           'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&q=80&fit=crop',
  'Infraestructura':    'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80&fit=crop',
  'Inversi\u00f3n':          'https://images.unsplash.com/photo-1460472178825-e5240623afd5?w=800&q=80&fit=crop',
  'Inversi\u00f3n en Infraestructura': 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80&fit=crop',
  'Gobierno':           'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80&fit=crop',
  'Finanzas':           'https://images.unsplash.com/photo-1460472178825-e5240623afd5?w=800&q=80&fit=crop',
  'Construcci\u00f3n':       'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80&fit=crop',
  'Marketing':          'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80&fit=crop',
  'Defensa & Seguridad':'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80&fit=crop',
  'Educaci\u00f3n':          'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80&fit=crop',
  // Consumer / Lifestyle
  'Moda & Accesorios':  'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80&fit=crop',
  'Moda y Accesorios':  'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80&fit=crop',
  'Moda':               'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80&fit=crop',
  'Lujo':               'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80&fit=crop',
  'Perfumes':           'https://images.unsplash.com/photo-1541643600914-78b084683702?w=800&q=80&fit=crop',
  'Perfumer\u00eda':         'https://images.unsplash.com/photo-1541643600914-78b084683702?w=800&q=80&fit=crop',
  'Cosm\u00e9tica':          'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80&fit=crop',
  'Belleza':            'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80&fit=crop',
  'Spa & Bienestar':   'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80&fit=crop',
  'Spa':                'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80&fit=crop',
  'Joyeria':            'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80&fit=crop',
  'Retail':             'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80&fit=crop',
  'E-commerce':         'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80&fit=crop',
  'Fotograf\u00eda':         'https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?w=800&q=80&fit=crop',
  'Eventos':            'https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800&q=80&fit=crop',
  'Veterinaria':        'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80&fit=crop',
  'Agricultura':        'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80&fit=crop',
  // Tourism / Culture — Latin American people & landscapes
  'Turismo':            'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80&fit=crop',
  'Cultura y Turismo':  'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80&fit=crop',
  'Turismo y Cultura':  'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80&fit=crop',
  'Patrimonio Cultural':'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80&fit=crop',
  'Patrimonio':         'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80&fit=crop',
  'Herencia Cultural':  'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80&fit=crop',
  'Herencia':           'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80&fit=crop',
  'Tradiciones':        'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80&fit=crop',
  'Arte & Cultura':     'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80&fit=crop',
  'Artesanias':         'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80&fit=crop',
  default:              'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80&fit=crop',
}

function getYouTubeEmbedUrl(url) {
  if (!url) return null
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
  const match = String(url).match(regExp)
  return (match && match[2].length === 11)
    ? `https://www.youtube-nocookie.com/embed/${match[2]}?autoplay=1`
    : null
}

// SVG icons library — matches WebsiteEditor iconId values
const SVGICONS = {
  shield:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="22" height="22"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  star:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="22" height="22"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  zap:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="22" height="22"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  check:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="22" height="22"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
  globe:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="22" height="22"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>,
  users:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="22" height="22"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>,
  award:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="22" height="22"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>,
  heart:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="22" height="22"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>,
  tool:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="22" height="22"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>,
  home:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="22" height="22"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  book:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="22" height="22"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>,
  chart:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="22" height="22"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
}

// Map emoji → SVG icon key so AI-returned emojis become vector icons
const EMOJI_TO_ICON = {
  '📊':  'chart',  '📈':  'chart',  '📊⃣': 'chart',  '📉': 'chart',
  '🛡️': 'shield', '🛡':  'shield', '🔒': 'shield', '🔐': 'shield',
  '⭐':    'star',   '🌟': 'star',   '💫': 'star',
  '⚡':    'zap',    '⚡️': 'zap',    '🔥': 'zap',
  '✅':    'check',  '✔️': 'check',  '✔':    'check',
  '🌐': 'globe',  '🔮': 'globe',  '💻': 'globe',  '🖥️': 'globe',
  '👥': 'users',  '👤': 'users',  '🤝': 'users',  '👨‍💼': 'users',
  '🏆': 'award',  '🥇': 'award',  '💰': 'award',  '💎': 'award',
  '❤️':  'heart',  '❤':    'heart',  '💚': 'heart',  '🩺': 'heart',
  '🔧': 'tool',   '⚙️': 'tool',   '⚙':    'tool',   '💊': 'tool',
  '🏠': 'home',   '🏗️': 'home',
  '📚': 'book',   '📝': 'book',   '📜': 'book',
  '🗢️': 'check', '✏️': 'book',   '🔓': 'shield',
  '💳': 'chart',  '💱': 'chart',  '🧩': 'tool',   '🚀': 'zap',
  '🎭': 'users',  '🔭': 'chart',  '💡': 'zap',    '📱': 'globe',
  '🏢': 'users',  '🔁': 'tool',   '📪': 'globe',  '📰': 'book',
}
function getIcon(sv) {
  // Priority 1: explicit iconId from editor
  if (sv.iconId && SVGICONS[sv.iconId]) return SVGICONS[sv.iconId]
  // Priority 2: icon field is a keyword like 'chart'
  if (sv.icon && SVGICONS[sv.icon]) return SVGICONS[sv.icon]
  // Priority 3: icon field is an emoji — map to vector
  if (sv.icon && EMOJI_TO_ICON[sv.icon]) return SVGICONS[EMOJI_TO_ICON[sv.icon]]
  // Priority 4: guess from title keywords
  const t = (sv.title || '').toLowerCase()
  if (/crm|client|relaci/.test(t))     return SVGICONS.users
  if (/erp|factur|invoice|contab/.test(t)) return SVGICONS.chart
  if (/software|digital|tech|desarr/.test(t)) return SVGICONS.zap
  if (/segur|shield|protect/.test(t))  return SVGICONS.shield
  if (/web|global|internet/.test(t))   return SVGICONS.globe
  if (/libro|book|cap|educ/.test(t))   return SVGICONS.book
  if (/soport|manten|tool/.test(t))    return SVGICONS.tool
  if (/casa|home|inmobi/.test(t))      return SVGICONS.home
  if (/premio|award|certif/.test(t))   return SVGICONS.award
  if (/salud|health|medic/.test(t))    return SVGICONS.heart
  // Fallback: rotate through icons based on position
  const keys = Object.keys(SVGICONS)
  return SVGICONS[keys[(sv._idx || 0) % keys.length]]
}

// Flexible industry match: exact first, then partial keyword
function hPhoto(ind) {
  if (!ind) return INDUSTRY_HERO.default
  if (INDUSTRY_HERO[ind]) return INDUSTRY_HERO[ind]
  const lower = ind.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  const keywords = [
    ['iglesi', 'Iglesia / Ministerio / Fe'], ['church', 'Iglesia / Ministerio / Fe'], ['ministerio', 'Iglesia / Ministerio / Fe'], ['culto', 'Iglesia / Ministerio / Fe'], ['fe', 'Iglesia / Ministerio / Fe'], ['pastor', 'Iglesia / Ministerio / Fe'],
    ['software', 'Software Empresarial'], ['erp', 'ERP'], ['tecnolog', 'Tecnolog\u00eda'],
    ['defensa', 'Defensa & Seguridad'], ['defense', 'Defensa & Seguridad'], ['seguridad', 'Seguridad'],
    ['salud', 'Salud & Odontolog\u00eda'], ['dental', 'Salud & Odontolog\u00eda'], ['medic', 'Salud & Odontolog\u00eda'], ['clinic', 'Salud & Odontolog\u00eda'],
    ['legal', 'Legal & Jur\u00eddico'], ['juridic', 'Legal & Jur\u00eddico'], ['abogad', 'Legal & Jur\u00eddico'],
    ['gastro', 'Gastronom\u00eda'], ['restaur', 'Gastronom\u00eda'], ['comida', 'Gastronom\u00eda'],
    ['fitness', 'Fitness & Deportes'], ['deporte', 'Fitness & Deportes'], ['gym', 'Fitness & Deportes'],
    ['inmobi', 'Inmobiliaria'], ['propiedad', 'Inmobiliaria'],
    ['marketing', 'Marketing'], ['publicidad', 'Marketing'],
    ['construc', 'Construcci\u00f3n'], ['arquitect', 'Construcci\u00f3n'],
    ['finanz', 'Finanzas'], ['inversion', 'Inversi\u00f3n'], ['invers', 'Inversi\u00f3n'],
    ['infraestruc', 'Infraestructura'], ['gobierno', 'Gobierno'], ['publico', 'Sector P\u00fablico'],
    ['auto', 'Autom\u00f3viles'], ['logist', 'Logistica'], ['transport', 'Logistica'],
    ['educ', 'Educaci\u00f3n'], ['escuela', 'Educaci\u00f3n'],
    ['moda', 'Moda'], ['fashion', 'Moda'], ['ropa', 'Moda'],
    ['perfum', 'Perfumes'], ['fragranc', 'Perfumes'], ['colonia', 'Perfumes'],
    ['cosmet', 'Cosm\u00e9tica'], ['makeup', 'Cosm\u00e9tica'], ['maquillaj', 'Cosm\u00e9tica'],
    ['belleza', 'Belleza'], ['beauty', 'Belleza'], ['peluquer', 'Belleza'], ['estetica', 'Belleza'],
    ['spa', 'Spa & Bienestar'], ['bienestar', 'Spa & Bienestar'], ['masaj', 'Spa & Bienestar'],
    ['joyeria', 'Joyeria'], ['joya', 'Joyeria'], ['acceso', 'Moda & Accesorios'], ['cartera', 'Moda & Accesorios'],
    ['lujo', 'Lujo'], ['luxury', 'Lujo'], ['premium', 'Lujo'],
    ['retail', 'Retail'], ['tienda', 'Retail'], ['boutique', 'Retail'],
    ['ecommerce', 'E-commerce'], ['comercio', 'E-commerce'],
    ['fotograf', 'Fotograf\u00eda'], ['photo', 'Fotograf\u00eda'],
    ['eventos', 'Eventos'], ['boda', 'Eventos'], ['event', 'Eventos'],
    ['veterinar', 'Veterinaria'], ['animal', 'Veterinaria'],
    ['agricult', 'Agricultura'], ['agro', 'Agricultura'],
    ['turism', 'Turismo'], ['viaje', 'Turismo'], ['travel', 'Turismo'], ['tour', 'Turismo'],
    ['cultura', 'Cultura y Turismo'], ['patrimon', 'Patrimonio Cultural'],
    ['herencia', 'Herencia Cultural'], ['tradicion', 'Tradiciones'],
    ['artesani', 'Artesanias'], ['folkl', 'Tradiciones'], ['pueblo', 'Turismo'],
    ['salvadore', 'Turismo'], ['guatemal', 'Turismo'], ['hondure', 'Turismo'],
  ]
  for (const [kw, key] of keywords) {
    if (lower.includes(kw) && INDUSTRY_HERO[key]) return INDUSTRY_HERO[key]
  }
  return INDUSTRY_HERO.default
}
function aPhoto(ind) {
  if (!ind) return INDUSTRY_ABOUT.default
  if (INDUSTRY_ABOUT[ind]) return INDUSTRY_ABOUT[ind]
  const lower = ind.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  const keywords = [
    ['iglesi', 'Iglesia / Ministerio / Fe'], ['church', 'Iglesia / Ministerio / Fe'], ['ministerio', 'Iglesia / Ministerio / Fe'], ['culto', 'Iglesia / Ministerio / Fe'], ['fe', 'Iglesia / Ministerio / Fe'], ['pastor', 'Iglesia / Ministerio / Fe'],
    ['software', 'Software Empresarial'], ['erp', 'Software Empresarial'], ['tecnolog', 'Tecnolog\u00eda'],
    ['infraestruc', 'Infraestructura'], ['invers', 'Inversi\u00f3n'], ['gobierno', 'Gobierno'],
    ['defensa', 'Defensa & Seguridad'], ['seguridad', 'Defensa & Seguridad'],
    ['salud', 'Salud & Odontolog\u00eda'], ['dental', 'Salud & Odontolog\u00eda'], ['medic', 'Salud & Odontolog\u00eda'],
    ['legal', 'Legal & Jur\u00eddico'], ['juridic', 'Legal & Jur\u00eddico'], ['abogad', 'Legal & Jur\u00eddico'],
    ['gastro', 'Gastronom\u00eda'], ['restaur', 'Gastronom\u00eda'],
    ['fitness', 'Fitness & Deportes'], ['deporte', 'Fitness & Deportes'], ['gym', 'Fitness & Deportes'],
    ['inmobi', 'Inmobiliaria'], ['marketing', 'Marketing'],
    ['construc', 'Construcci\u00f3n'], ['finanz', 'Finanzas'], ['educ', 'Educaci\u00f3n'],
    // Consumer
    ['moda', 'Moda'], ['fashion', 'Moda'], ['ropa', 'Moda'],
    ['perfum', 'Perfumes'], ['fragranc', 'Perfumes'],
    ['cosmet', 'Cosm\u00e9tica'], ['makeup', 'Cosm\u00e9tica'], ['maquillaj', 'Cosm\u00e9tica'],
    ['belleza', 'Belleza'], ['beauty', 'Belleza'], ['peluquer', 'Belleza'],
    ['spa', 'Spa & Bienestar'], ['bienestar', 'Spa & Bienestar'],
    ['joyeria', 'Joyeria'], ['acceso', 'Moda & Accesorios'], ['cartera', 'Moda & Accesorios'],
    ['lujo', 'Lujo'], ['luxury', 'Lujo'],
    ['retail', 'Retail'], ['tienda', 'Retail'], ['boutique', 'Retail'],
    ['ecommerce', 'E-commerce'], ['fotograf', 'Fotograf\u00eda'],
    ['eventos', 'Eventos'], ['boda', 'Eventos'],
    ['veterinar', 'Veterinaria'], ['agricult', 'Agricultura'],
    // Tourism / Culture
    ['turism', 'Turismo'], ['viaje', 'Turismo'], ['travel', 'Turismo'], ['tour', 'Turismo'],
    ['cultura', 'Cultura y Turismo'], ['patrimon', 'Patrimonio Cultural'],
    ['herencia', 'Herencia Cultural'], ['tradicion', 'Tradiciones'],
    ['artesani', 'Artesanias'], ['folkl', 'Tradiciones'], ['pueblo', 'Turismo'],
    ['salvadore', 'Turismo'], ['guatemal', 'Turismo'], ['hondure', 'Turismo'],
  ]
  for (const [kw, key] of keywords) {
    if (lower.includes(kw) && INDUSTRY_ABOUT[key]) return INDUSTRY_ABOUT[key]
  }
  return INDUSTRY_ABOUT.default
}
function fontStack(font) {
  const m = {
    Inter:"'Inter',sans-serif", Poppins:"'Poppins',sans-serif", Montserrat:"'Montserrat',sans-serif",
    'DM Sans':"'DM Sans',sans-serif",
    Lato:"'Lato',sans-serif", Raleway:"'Raleway',sans-serif",
    'Playfair Display':"'Playfair Display',Georgia,serif", Merriweather:"'Merriweather',Georgia,serif",
    Oswald:"'Oswald',sans-serif", Nunito:"'Nunito',sans-serif", Roboto:"'Roboto',sans-serif",
  }
  return m[font] || m.Inter
}

// ULTIMATE AI PHOTO SYSTEM — Pollinations.ai generative imagery
// Guarantees 100% coherence because the photo is generated specifically for that exact keyword!
function extractBestQuery(query, fallback) {
  if (!query) return fallback || 'business office';
  // Keep the query as complete as possible for AI image generation, just clean it
  return query.replace(/[^a-zA-Z0-9\s,]/g, ' ').trim() || fallback;
}

function aiImageOne(prompt, w, h, seed) {
  if (!prompt) return null;
  const s = seed != null ? seed : Math.floor(Math.random() * 9999);
  const finalPrompt = prompt + ', highly detailed professional photography, realistic';
  return 'https://image.pollinations.ai/prompt/' + encodeURIComponent(finalPrompt) + '?nologo=true&width=' + w + '&height=' + h + '&seed=' + s;
}

function getHeroPhoto(data) {
  if (data.heroImage) return data.heroImage;
  return hPhoto(data.industry);
}

function getAboutPhoto(data) {
  return aPhoto(data.industry);
}

// For gallery: grab the specific descriptions
function getGalleryPhotos(data) {
  if (data.galleryPhotos && data.galleryPhotos.length > 0) return data.galleryPhotos;
  return [
    hPhoto(data.industry),
    aPhoto(data.industry),
    INDUSTRY_HERO.default
  ];
}

// Prevent pure white / near-white secondaryColor from becoming a section background
// (looks broken when text is dark and bg is #fff)
function safeBg(secondaryColor, primaryColor) {
  if (!secondaryColor) return '#F8FAFC'
  const norm = secondaryColor.replace(/\s/g,'').toLowerCase()
  // Reject pure white, near-white hex values
  if (norm === '#fff' || norm === '#ffffff' || norm === '#f8fafc' || norm === '#f9fafb' || norm === '#fafafa' || norm === '#f5f5f5') {
    // Return a subtle tint of the primary color instead
    return primaryColor ? `${primaryColor}12` : '#F0F4F8'
  }
  return secondaryColor
}

function Styles({ p, a, s, font, em, isDark }) {
  const gf = (font || 'Inter').replace(/ /g, '+')
  
  // Theme Variables — richer palette
  const bgMain     = isDark ? '#050505' : '#FAFAFA'
  const bgSec      = isDark ? '#0A0A0A' : '#ffffff'
  const bgAlt      = isDark ? '#111111' : '#F3F4F6'  // alternating section bg
  const textHD     = isDark ? '#ffffff' : p
  const textMain   = isDark ? '#E4E4E7' : '#1F2937'
  const textMuted  = isDark ? '#A1A1AA' : '#6B7280'
  const borderCol  = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.06)'
  const cardBg     = isDark ? 'rgba(255,255,255,0.03)' : '#ffffff'
  const cardHover  = isDark ? 'rgba(255,255,255,0.06)' : '#ffffff'
  const badgeBg    = isDark ? 'rgba(255,255,255,0.06)' : '#fff'
  const navBg      = isDark ? 'rgba(10,10,10,0.88)' : 'rgba(255,255,255,0.88)'
  const glowSoft   = isDark ? `${a}15` : `${a}08`
  
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,400&family=Playfair+Display:ital,wght@0,600;0,700;0,800;0,900;1,600;1,700&family=Poppins:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700;800;900&display=swap');
      @import url('https://fonts.googleapis.com/css2?family=${gf}:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400&display=swap');
      @keyframes wp-pulse { 0%,100%{opacity:1} 50%{opacity:.4} }
      @keyframes wp-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
      @keyframes wp-glow { 0%,100%{box-shadow:0 0 0 4px ${a}33} 50%{box-shadow:0 0 0 8px ${a}22} }
      /* Edit mode hover */
      ${em ? '.wp-editable { cursor: pointer; border-radius: 4px; transition: outline .15s, box-shadow .15s; outline: 2px solid transparent; outline-offset: 3px; } .wp-editable:hover { outline: 2px solid rgba(99,102,241,.5); box-shadow: 0 0 0 6px rgba(99,102,241,.06); }' : ''}
      /* Remove (X) controls only appear on hover of their parent, so the live preview stays clean */
      ${em ? '.wp-remove-x { opacity: 0; transform: scale(.85); transition: opacity .15s, transform .15s; } .wp-hero-cta:hover .wp-remove-x, .wp-announce-bar:hover .wp-remove-x { opacity: 1; transform: scale(1); }' : ''}
      .wp-hero-cta:hover { transform: translateY(-3px); box-shadow: 0 10px 28px rgba(0,0,0,0.22); }

      /* Container */
      .wp-wrap {
        container-type: inline-size;
        container-name: wp;
        font-family: ${fontStack(font)};
        color: ${textMain};
        background: ${bgMain};
        overflow-x: hidden;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-rendering: optimizeLegibility;
      }
      .wp-wrap * { box-sizing: border-box; margin: 0; padding: 0; }

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
      .wp-hero.v2 .wp-h1 { font-size: clamp(2.8rem, 6cqi, 5.5rem); color: #FFF; text-shadow: 0 2px 40px rgba(0,0,0,0.5); margin-bottom:28px; font-weight:900; letter-spacing: -.04em; line-height:1; }
      .wp-hero.v2 .wp-sub { color: rgba(255,255,255,0.85); font-size: clamp(1.05rem, 2.5cqi, 1.35rem); max-width: 680px; margin: 0 auto 44px; font-weight:400; line-height:1.7; }
      .wp-hero.v2 .wp-btn-p { background: ${a}; box-shadow: 0 8px 32px ${a}55; }
      .wp-hero.v2 .wp-btn-g { color: #FFF; border-color: rgba(255,255,255,0.25); backdrop-filter:blur(8px); }
      .wp-hero.v2 .wp-btn-g:hover { background: rgba(255,255,255,0.1); color: #FFF; }
      .wp-hero.v2 .wp-stats { display: flex; gap: 48px; margin-top: 64px; padding-top: 44px; border-top: 1px solid rgba(255,255,255,0.12); justify-content: center; flex-wrap: wrap; width: 100%; }
      .wp-hero.v2 .wp-stat-v { font-size: 2.8rem; font-weight: 900; color: #FFF; line-height: 1; letter-spacing: -.03em; }
      .wp-hero.v2 .wp-stat-l { font-size: .75rem; font-weight: 600; color: rgba(255,255,255,0.55); margin-top: 10px; text-transform:uppercase; letter-spacing:.08em; }

      /* ─── HERO V3 — Minimal / Editorial (centered, big type, NO image) ── */
      .wp-hero.v3 { padding: 140px 5% 120px; background: ${bgSec}; position:relative; text-align:center; overflow:hidden; }
      .wp-hero.v3::before { content:''; position:absolute; top:0; left:0; right:0; height:4px; background:linear-gradient(90deg,${a},${p}); }
      .wp-hero.v3 .wp-hero-content { max-width:880px; margin:0 auto; display:flex; flex-direction:column; align-items:center; position:relative; z-index:2; }
      .wp-hero.v3 .wp-h1 { font-size:clamp(3.2rem,9cqi,6.5rem); font-weight:900; letter-spacing:-.055em; line-height:0.95; margin-bottom:36px; color:${textHD}; }
      .wp-hero.v3 .wp-h1 em { font-style:normal; color:${a}; }
      .wp-hero.v3 .wp-sub { font-size:clamp(1.1rem,2.5cqi,1.35rem); max-width:620px; }
      .wp-hero.v3 .wp-divider { width:56px; height:4px; background:${a}; border-radius:2px; margin:0 auto 36px; }
      .wp-hero.v3 .wp-stats { justify-content:center; margin-top:72px; padding-top:48px; border-top:1px solid ${borderCol}; }

      /* ─── HERO V4 — Bold Split-Screen (colored panel left, photo right) ── */
      .wp-hero.v4 { padding:0; min-height:90vh; display:grid; grid-template-columns:1fr 1fr; position:relative; overflow:hidden; }
      .wp-hero.v4 .wp-hero-left { background:linear-gradient(150deg,${p} 0%,${p}EE 100%); display:flex; flex-direction:column; justify-content:center; padding:80px 64px; position:relative; overflow:hidden; z-index:1; }
      .wp-hero.v4 .wp-hero-left::before { content:''; position:absolute; top:-120px; right:-120px; width:420px; height:420px; border-radius:50%; background:${a}22; pointer-events:none; }
      .wp-hero.v4 .wp-hero-left::after { content:''; position:absolute; bottom:-100px; left:-80px; width:320px; height:320px; border-radius:50%; background:rgba(255,255,255,0.04); pointer-events:none; }
      .wp-hero.v4 .wp-hero-right { position:relative; overflow:hidden; min-height:500px; }
      .wp-hero.v4 .wp-hero-right img { width:100%; height:100%; object-fit:cover; display:block; }
      .wp-hero.v4 .wp-h1 { color:#fff; font-size:clamp(2.4rem,4.5cqi,3.8rem); letter-spacing:-.04em; line-height:1.02; margin-bottom:24px; font-weight:900; }
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
      @container wp (max-width: 700px) {
        .wp-hero.v4 { grid-template-columns:1fr; }
        .wp-hero.v4 .wp-hero-right { display:none; }
        .wp-hero.v4 .wp-hero-left { padding:80px 28px; }
        .wp-hero.v4 .wp-badge { align-self:center; }
        .wp-hero.v4 .wp-btns { justify-content:center; }
        .wp-hero.v4 .wp-stats { justify-content:center; }
      }

      /* ─── SERVICES V3 — Editorial Numbered (icon+number left, text right) ── */
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
      @container wp (max-width: 640px) {
        .wp-grid.v4 .wp-scard { grid-template-columns:1fr; padding:56px 5%; gap:32px; }
        .wp-grid.v4 .wp-scard:nth-child(even) .wp-sicon-wrap-col { order:1; }
        .wp-grid.v4 .wp-scard:nth-child(even) .wp-stext-col { order:2; }
        .wp-grid.v4-outer { margin:0 -5%; }
      }

      /* Hero Shared */
      .wp-badge { display: inline-flex; align-items: center; gap: 8px; padding: 7px 18px; background: ${badgeBg}; border: 1px solid ${borderCol}; border-radius: 999px; margin: 0 auto 28px; box-shadow: 0 4px 16px rgba(0,0,0,.04); backdrop-filter:blur(12px); }
      .wp-hero.v2 .wp-badge { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.15); }
      .wp-hero.v2 .wp-badge-t { color: rgba(255,255,255,0.9); }
      .wp-badge-dot { width: 7px; height: 7px; border-radius: 50%; background: ${a}; flex-shrink: 0; animation: wp-glow 2s ease-in-out infinite; }
      .wp-badge-t { font-size: .72rem; font-weight: 700; color: ${textMuted}; text-transform: uppercase; letter-spacing: .1em; }
      .wp-h1 { font-size: clamp(2.5rem,7cqi,4.5rem); font-weight: 900; color: ${textHD}; line-height: 1.02; margin-bottom: 28px; letter-spacing: -.045em; text-wrap: balance; }
      .wp-sub { font-size: clamp(1.05rem,3cqi,1.25rem); color: ${textMuted}; line-height: 1.7; max-width: 580px; margin: 0 auto 44px; font-weight: 400; }
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
      .wp-h2 { font-size: clamp(2rem,5cqi,3.2rem); font-weight: 900; color: ${textHD}; letter-spacing: -.035em; margin-bottom: 20px; line-height: 1.08; display:inline-block; text-wrap: balance; }
      .wp-sec-sub { color: ${textMuted}; font-size: clamp(1rem,3cqi,1.12rem); line-height: 1.75; max-width: 600px; margin: 0 auto 72px; font-weight: 400; }

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

      /* ══════════════════════════════════════════════
         CONTAINER QUERIES — MOBILE FIRST
         ══════════════════════════════════════════════ */
      @container wp (min-width: 480px) {
        .wp-btns { flex-direction: row; justify-content: center; }
        .wp-tgrid { grid-template-columns: repeat(2, 1fr); }
      }
      @container wp (min-width: 640px) {
        .wp-grid.v1 { grid-template-columns: repeat(2, 1fr); }
        .wp-grid.v3 { grid-template-columns: repeat(2, 1fr); }
      }
      @container wp (min-width: 820px) {
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
      
      .rev { opacity:0; transform:translateY(30px); transition:all 0.7s cubic-bezier(0.16,1,0.3,1); }
      .rev-act { opacity:1; transform:translateY(0); }
    `}</style>
  )
}

function BrowserBar({ biz }) {
  const slug = (biz || 'mi-empresa').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,24)
  return (
    <div style={{ background:'#F1F3F4', padding:'9px 12px', display:'flex', alignItems:'center', gap:10, borderBottom:'1px solid #E5E7EB' }}>
      <div style={{ display:'flex', gap:5 }}>
        {['#FF5F57','#FEBC2E','#28C840'].map(c=><div key={c} style={{ width:11, height:11, borderRadius:'50%', background:c }} />)}
      </div>
      <div style={{ flex:1, background:'#fff', borderRadius:6, padding:'4px 10px', fontSize:'.72rem', color:'#5F6368', display:'flex', alignItems:'center', gap:5, border:'1px solid #E5E7EB', minWidth:0 }}>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#34A853" strokeWidth="3"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        <span style={{ overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{slug}.saasweb.app</span>
      </div>
      <span style={{ fontSize:'.63rem', fontWeight:700, color:'#34A853', background:'rgba(52,168,83,.1)', padding:'3px 7px', borderRadius:5, whiteSpace:'nowrap', flexShrink:0 }}>SSL activo</span>
    </div>
  )
}

// ─── Section Hover Toolbar — the premium builder experience ─────────
// Shows on hover: layout variant thumbnails + move/hide controls
const VARIANT_THUMBS = {
  hero: [
    { v:1, label:'Split', thumb: (a,p) => (
      <svg viewBox="0 0 60 36" width="60" height="36">
        <rect width="60" height="36" rx="4" fill={p}/>
        <rect x="4" y="6" width="26" height="5" rx="2" fill="rgba(255,255,255,0.9)"/>
        <rect x="4" y="14" width="20" height="3" rx="1" fill="rgba(255,255,255,0.5)"/>
        <rect x="4" y="22" width="14" height="6" rx="3" fill={a}/>
        <rect x="34" y="4" width="22" height="28" rx="3" fill="rgba(255,255,255,0.15)"/>
      </svg>
    )},
    { v:2, label:'Full BG', thumb: (a,p) => (
      <svg viewBox="0 0 60 36" width="60" height="36">
        <rect width="60" height="36" rx="4" fill="#555"/>
        <rect width="60" height="36" rx="4" fill="rgba(0,0,0,0.5)"/>
        <rect x="10" y="8" width="40" height="5" rx="2" fill="rgba(255,255,255,0.9)"/>
        <rect x="15" y="16" width="30" height="3" rx="1" fill="rgba(255,255,255,0.5)"/>
        <rect x="20" y="23" width="20" height="6" rx="3" fill={a}/>
      </svg>
    )},
    { v:3, label:'Minimal', thumb: (a,p) => (
      <svg viewBox="0 0 60 36" width="60" height="36">
        <rect width="60" height="36" rx="4" fill="#fff"/>
        <rect x="4" y="5" width="6" height="2" rx="1" fill={a}/>
        <rect x="4" y="10" width="35" height="6" rx="2" fill={p}/>
        <rect x="4" y="20" width="28" height="3" rx="1" fill="#ddd"/>
        <rect x="4" y="27" width="16" height="5" rx="2" fill={p}/>
      </svg>
    )},
    { v:4, label:'Bold', thumb: (a,p) => (
      <svg viewBox="0 0 60 36" width="60" height="36">
        <rect width="60" height="36" rx="4" fill={p}/>
        <rect width="8" height="36" rx="0" fill={a}/>
        <rect x="12" y="7" width="30" height="7" rx="2" fill="rgba(255,255,255,0.95)"/>
        <rect x="12" y="18" width="22" height="3" rx="1" fill="rgba(255,255,255,0.5)"/>
        <rect x="12" y="25" width="18" height="6" rx="3" fill={a}/>
      </svg>
    )},
  ],
  services: [
    { v:1, label:'Cards', thumb: (a,p) => (
      <svg viewBox="0 0 60 36" width="60" height="36">
        <rect width="60" height="36" rx="4" fill="#f8f9fa"/>
        <rect x="4" y="4" width="16" height="28" rx="3" fill="#fff" stroke="#e5e7eb" strokeWidth="1"/>
        <rect x="22" y="4" width="16" height="28" rx="3" fill="#fff" stroke="#e5e7eb" strokeWidth="1"/>
        <rect x="40" y="4" width="16" height="28" rx="3" fill="#fff" stroke="#e5e7eb" strokeWidth="1"/>
        <rect x="8" y="8" width="8" height="8" rx="2" fill={a}/>
        <rect x="26" y="8" width="8" height="8" rx="2" fill={a}/>
        <rect x="44" y="8" width="8" height="8" rx="2" fill={a}/>
      </svg>
    )},
    { v:2, label:'List', thumb: (a,p) => (
      <svg viewBox="0 0 60 36" width="60" height="36">
        <rect width="60" height="36" rx="4" fill="#f8f9fa"/>
        <rect x="4" y="5" width="52" height="7" rx="3" fill="#fff" stroke="#e5e7eb" strokeWidth="1"/>
        <rect x="4" y="14" width="52" height="7" rx="3" fill="#fff" stroke="#e5e7eb" strokeWidth="1"/>
        <rect x="4" y="23" width="52" height="7" rx="3" fill="#fff" stroke="#e5e7eb" strokeWidth="1"/>
        <rect x="7" y="8" width="4" height="4" rx="1" fill={a}/>
        <rect x="7" y="17" width="4" height="4" rx="1" fill={a}/>
        <rect x="7" y="26" width="4" height="4" rx="1" fill={a}/>
      </svg>
    )},
    { v:3, label:'Highlight', thumb: (a,p) => (
      <svg viewBox="0 0 60 36" width="60" height="36">
        <rect width="60" height="36" rx="4" fill={p}/>
        <rect x="4" y="4" width="25" height="28" rx="3" fill="rgba(255,255,255,0.08)"/>
        <rect x="32" y="4" width="24" height="13" rx="3" fill={a} opacity="0.8"/>
        <rect x="32" y="19" width="24" height="13" rx="3" fill="rgba(255,255,255,0.08)"/>
      </svg>
    )},
    { v:4, label:'Grid Bold', thumb: (a,p) => (
      <svg viewBox="0 0 60 36" width="60" height="36">
        <rect width="60" height="36" rx="4" fill="#111"/>
        <rect x="4" y="4" width="25" height="13" rx="3" fill={a}/>
        <rect x="31" y="4" width="25" height="13" rx="3" fill="rgba(255,255,255,0.08)"/>
        <rect x="4" y="19" width="25" height="13" rx="3" fill="rgba(255,255,255,0.08)"/>
        <rect x="31" y="19" width="25" height="13" rx="3" fill="rgba(255,255,255,0.08)"/>
      </svg>
    )},
  ],
  about: [
    { v:1, label:'Split', thumb: (a,p) => (
      <svg viewBox="0 0 60 36" width="60" height="36">
        <rect width="60" height="36" rx="4" fill="#f8f9fa"/>
        <rect x="4" y="4" width="25" height="28" rx="3" fill="#e5e7eb"/>
        <rect x="33" y="6" width="23" height="5" rx="2" fill={p}/>
        <rect x="33" y="14" width="20" height="3" rx="1" fill="#ccc"/>
        <rect x="33" y="19" width="18" height="3" rx="1" fill="#ccc"/>
        <rect x="33" y="27" width="12" height="5" rx="2" fill={a}/>
      </svg>
    )},
    { v:2, label:'Centered', thumb: (a,p) => (
      <svg viewBox="0 0 60 36" width="60" height="36">
        <rect width="60" height="36" rx="4" fill="#fff"/>
        <rect x="15" y="4" width="30" height="5" rx="2" fill={p}/>
        <rect x="10" y="12" width="40" height="3" rx="1" fill="#ddd"/>
        <rect x="12" y="17" width="36" height="3" rx="1" fill="#ddd"/>
        <rect x="20" y="25" width="20" height="6" rx="3" fill={a}/>
      </svg>
    )},
    { v:3, label:'Dark', thumb: (a,p) => (
      <svg viewBox="0 0 60 36" width="60" height="36">
        <rect width="60" height="36" rx="4" fill={p}/>
        <rect x="4" y="6" width="25" height="24" rx="3" fill="rgba(255,255,255,0.06)"/>
        <rect x="33" y="8" width="23" height="5" rx="2" fill="rgba(255,255,255,0.9)"/>
        <rect x="33" y="16" width="20" height="3" rx="1" fill="rgba(255,255,255,0.4)"/>
        <rect x="33" y="22" width="15" height="5" rx="2" fill={a}/>
      </svg>
    )},
    { v:4, label:'Stats', thumb: (a,p) => (
      <svg viewBox="0 0 60 36" width="60" height="36">
        <rect width="60" height="36" rx="4" fill="#f8f9fa"/>
        <rect x="4" y="4" width="52" height="14" rx="3" fill={p}/>
        <rect x="4" y="21" width="16" height="11" rx="3" fill="#fff" stroke="#e5e7eb" strokeWidth="1"/>
        <rect x="22" y="21" width="16" height="11" rx="3" fill="#fff" stroke="#e5e7eb" strokeWidth="1"/>
        <rect x="40" y="21" width="16" height="11" rx="3" fill="#fff" stroke="#e5e7eb" strokeWidth="1"/>
        <rect x="7" y="24" width="10" height="4" rx="1" fill={a}/>
      </svg>
    )},
  ],
  testimonials: [
    { v:1, label:'Grid', thumb: (a,p) => (
      <svg viewBox="0 0 60 36" width="60" height="36">
        <rect width="60" height="36" rx="4" fill="#f8f9fa"/>
        <rect x="4" y="10" width="25" height="22" rx="3" fill="#fff" stroke="#e5e7eb" strokeWidth="1"/>
        <rect x="31" y="10" width="25" height="22" rx="3" fill="#fff" stroke="#e5e7eb" strokeWidth="1"/>
        <rect x="7" y="13" width="8" height="1.5" rx="1" fill={a}/>
        <rect x="7" y="17" width="19" height="2" rx="1" fill="#ddd"/>
        <rect x="7" y="21" width="15" height="2" rx="1" fill="#ddd"/>
      </svg>
    )},
    { v:2, label:'Spotlight', thumb: (a,p) => (
      <svg viewBox="0 0 60 36" width="60" height="36">
        <rect width="60" height="36" rx="4" fill="#fff"/>
        <rect x="10" y="6" width="40" height="20" rx="4" fill="#f8f9fa" stroke="#e5e7eb" strokeWidth="1"/>
        <rect x="3" y="5" width="5" height="5" rx="1" fill={a}/>
        <rect x="14" y="10" width="32" height="3" rx="1" fill="#ccc"/>
        <rect x="18" y="15" width="24" height="2" rx="1" fill="#ddd"/>
      </svg>
    )},
    { v:3, label:'Side', thumb: (a,p) => (
      <svg viewBox="0 0 60 36" width="60" height="36">
        <rect width="60" height="36" rx="4" fill="#fff"/>
        <rect x="4" y="4" width="18" height="28" rx="3" fill={p}/>
        <rect x="25" y="6" width="31" height="11" rx="3" fill="#f8f9fa" stroke="#e5e7eb" strokeWidth="1"/>
        <rect x="25" y="19" width="31" height="11" rx="3" fill="#f8f9fa" stroke="#e5e7eb" strokeWidth="1"/>
      </svg>
    )},
    { v:4, label:'List', thumb: (a,p) => (
      <svg viewBox="0 0 60 36" width="60" height="36">
        <rect width="60" height="36" rx="4" fill="#fff"/>
        <rect x="4" y="4" width="52" height="9" rx="3" fill="#f8f9fa" stroke="#e5e7eb" strokeWidth="1"/>
        <rect x="4" y="15" width="52" height="9" rx="3" fill="#f8f9fa" stroke="#e5e7eb" strokeWidth="1"/>
        <rect x="4" y="26" width="52" height="9" rx="3" fill="#f8f9fa" stroke="#e5e7eb" strokeWidth="1"/>
      </svg>
    )},
  ],
  contact: [
    { v:1, label:'Map+Form', thumb: (a,p) => (
      <svg viewBox="0 0 60 36" width="60" height="36">
        <rect width="60" height="36" rx="4" fill="#f8f9fa"/>
        <rect x="4" y="4" width="27" height="28" rx="3" fill="#e5e7eb"/>
        <rect x="33" y="4" width="23" height="8" rx="2" fill="#fff" stroke="#e5e7eb" strokeWidth="1"/>
        <rect x="33" y="14" width="23" height="8" rx="2" fill="#fff" stroke="#e5e7eb" strokeWidth="1"/>
        <rect x="33" y="27" width="23" height="5" rx="2" fill={a}/>
      </svg>
    )},
    { v:2, label:'Full Dark', thumb: (a,p) => (
      <svg viewBox="0 0 60 36" width="60" height="36">
        <rect width="60" height="36" rx="4" fill={p}/>
        <rect x="10" y="6" width="40" height="5" rx="2" fill="rgba(255,255,255,0.9)"/>
        <rect x="10" y="14" width="40" height="7" rx="2" fill="rgba(255,255,255,0.08)"/>
        <rect x="10" y="24" width="40" height="7" rx="2" fill="rgba(255,255,255,0.08)"/>
      </svg>
    )},
    { v:3, label:'Cards', thumb: (a,p) => (
      <svg viewBox="0 0 60 36" width="60" height="36">
        <rect width="60" height="36" rx="4" fill="#f8f9fa"/>
        <rect x="4" y="4" width="16" height="28" rx="3" fill="#fff" stroke="#e5e7eb" strokeWidth="1"/>
        <rect x="22" y="4" width="16" height="28" rx="3" fill="#fff" stroke="#e5e7eb" strokeWidth="1"/>
        <rect x="40" y="4" width="16" height="28" rx="3" fill="#fff" stroke="#e5e7eb" strokeWidth="1"/>
        <rect x="7" y="8" width="8" height="8" rx="4" fill={a}/>
      </svg>
    )},
    { v:4, label:'Minimal', thumb: (a,p) => (
      <svg viewBox="0 0 60 36" width="60" height="36">
        <rect width="60" height="36" rx="4" fill="#fff"/>
        <rect x="4" y="14" width="28" height="4" rx="2" fill={p}/>
        <rect x="4" y="21" width="20" height="3" rx="1" fill="#ddd"/>
        <rect x="34" y="12" width="22" height="13" rx="3" fill={a}/>
      </svg>
    )},
  ],
}

function SectionToolbar({ sectionKey, variantVal, accentColor, primaryColor, onVariantChange, onMoveUp, onMoveDown, canMoveUp, canMoveDown, label, children }) {
  const [hov, setHov] = useState(false)
  const thumbs = VARIANT_THUMBS[sectionKey]
  const a = accentColor || '#6366F1'
  const p = primaryColor || '#1E3A5F'

  return (
    <div
      style={{ position:'relative' }}
      onMouseEnter={()=>setHov(true)}
      onMouseLeave={()=>setHov(false)}
    >
      {/* Top toolbar — visible on hover */}
      <div style={{
        position:'absolute', top:0, left:0, right:0, zIndex:200,
        display:'flex', alignItems:'stretch',
        opacity: hov ? 1 : 0,
        pointerEvents: hov ? 'all' : 'none',
        transition:'opacity .15s',
      }}>
        {/* Section label */}
        <div style={{
          background:'#6366F1', color:'#fff', padding:'5px 12px',
          fontSize:'.7rem', fontWeight:800, display:'flex', alignItems:'center', gap:5,
          borderRadius:'0 0 8px 0', userSelect:'none',
        }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="10" height="10"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          {label}
        </div>
        <div style={{ flex:1 }}/>
        {/* Move controls */}
        <div style={{ display:'flex', gap:2, padding:'4px 6px', background:'rgba(0,0,0,0.6)', backdropFilter:'blur(8px)', borderRadius:'0 0 0 8px' }}>
          <button onClick={e=>{e.stopPropagation();onMoveUp()}} disabled={!canMoveUp}
            style={{ border:'none', background: canMoveUp?'rgba(255,255,255,0.15)':'rgba(255,255,255,0.05)', color: canMoveUp?'#fff':'rgba(255,255,255,0.3)', borderRadius:5, padding:'3px 7px', cursor: canMoveUp?'pointer':'default', fontSize:'.7rem', fontWeight:700, display:'flex', alignItems:'center', gap:3 }}>
            ↑ Subir
          </button>
          <button onClick={e=>{e.stopPropagation();onMoveDown()}} disabled={!canMoveDown}
            style={{ border:'none', background: canMoveDown?'rgba(255,255,255,0.15)':'rgba(255,255,255,0.05)', color: canMoveDown?'#fff':'rgba(255,255,255,0.3)', borderRadius:5, padding:'3px 7px', cursor: canMoveDown?'pointer':'default', fontSize:'.7rem', fontWeight:700, display:'flex', alignItems:'center', gap:3 }}>
            ↓ Bajar
          </button>
        </div>
      </div>

      {/* Left layout picker — appears on hover if thumbs exist */}
      {thumbs && hov && (
        <div style={{
          position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', zIndex:200,
          display:'flex', flexDirection:'column', gap:6,
          background:'rgba(0,0,0,0.82)', backdropFilter:'blur(16px)',
          borderRadius:12, padding:'10px 8px',
          boxShadow:'0 8px 32px rgba(0,0,0,0.4)',
        }} onMouseDown={e=>e.stopPropagation()}>
          <div style={{ fontSize:'.58rem', fontWeight:800, color:'rgba(255,255,255,0.5)', textAlign:'center', letterSpacing:'.08em', textTransform:'uppercase', marginBottom:2 }}>LAYOUT</div>
          {thumbs.map(({ v, label: lbl, thumb }) => (
            <button
              key={v}
              onClick={e=>{e.stopPropagation();onVariantChange(v)}}
              title={lbl}
              style={{
                border: `2px solid ${variantVal===v ? a : 'rgba(255,255,255,0.15)'}`,
                borderRadius:8, background: variantVal===v ? `${a}22` : 'rgba(255,255,255,0.05)',
                padding:3, cursor:'pointer', display:'flex', flexDirection:'column', alignItems:'center', gap:3,
                transition:'all .12s',
                boxShadow: variantVal===v ? `0 0 0 2px ${a}55` : 'none',
              }}>
              {thumb(a, p)}
              <span style={{ fontSize:'.55rem', color: variantVal===v ? a : 'rgba(255,255,255,0.5)', fontWeight:700, whiteSpace:'nowrap' }}>{lbl}</span>
            </button>
          ))}
        </div>
      )}

      {/* Section content */}
      <div style={{ position:'relative' }}>{children}</div>

      {/* Outline on hover */}
      {hov && (
        <div style={{
          position:'absolute', inset:0, pointerEvents:'none', zIndex:100,
          border:'2px solid #6366F1', borderRadius:2,
          boxShadow:'inset 0 0 0 1px rgba(99,102,241,0.2)',
        }}/>
      )}
    </div>
  )
}

// ─── Editable element wrapper (click-to-edit in editMode) ─────────
function EditableEl({ children, label, onClick, editMode }) {
  const [hov, setHov] = useState(false)
  if (!editMode) return children
  return (
    <div style={{ position:'relative', display:'contents' }}
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}>
      {children}
      {hov && (
        <button
          onMouseDown={e => { e.stopPropagation(); onClick(e) }}
          style={{
            position:'absolute', top:-6, right:-6, zIndex:50,
            background:'#6366F1', color:'#fff', border:'none', borderRadius:6,
            padding:'3px 8px', fontSize:'.68rem', fontWeight:700, cursor:'pointer',
            boxShadow:'0 2px 8px rgba(99,102,241,.5)', whiteSpace:'nowrap',
            display:'flex', alignItems:'center', gap:4,
            pointerEvents:'all',
          }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="10" height="10"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          {label}
        </button>
      )}
    </div>
  )
}


export default function WebsitePreview({ data, editMode=false, activeField, onElementClick, onSectionChange, onQuickUpdate, onQuickUpdateBatch }) {
  const previewWrapRef = useRef(null)
  const [testPage, setTestPage] = useState(0)
  const [activeVideoModal, setActiveVideoModal] = useState(null)
  const [showChurchLauncher, setShowChurchLauncher] = useState(true)

  // ── Smooth scroll nav links within the preview container ────
  const SECTION_MAP = {
    '#inicio':'wp-hero', '#home':'wp-hero', '#servicios':'wp-services', '#services':'wp-services',
    '#nosotros':'wp-nosotros', '#about':'wp-nosotros', '#testimonios':'wp-testimonios',
    '#contact':'wp-contact', '#contacto':'wp-contact', '#visita':'wp-plan-visit',
    '#plan-visit':'wp-plan-visit', '#ministerios':'wp-ministerios', '#sermones':'wp-sermons',
    '#predicas':'wp-sermons', '#next-steps':'wp-next-steps', '#pasos':'wp-next-steps',
    '#donations':'wp-donations', '#ofrendar':'wp-donations', '#oracion':'wp-prayer', '#prayer':'wp-prayer'
  }
  const scrollToSection = (href, e) => {
    e?.preventDefault?.()
    const targetId = SECTION_MAP[href?.toLowerCase()] || href?.replace('#','wp-')
    const el = document.getElementById(targetId)
    if (!el) return
    let container = el.parentElement
    while (container && container !== document.body) {
      if (container.scrollHeight > container.clientHeight + 10) break
      container = container.parentElement
    }
    if (container) container.scrollTo({ top: el.offsetTop - 64, behavior: 'smooth' })
  }

  // ── Helper: fire quick edit panel at cursor position ────────
  const ec = (e, opts) => {
    if (!editMode || !onElementClick) return
    e.preventDefault(); e.stopPropagation()
    const r = e.currentTarget.getBoundingClientRect()
    onElementClick({ x: r.left, y: r.bottom + 8, ...opts })
  }

  useEffect(() => {
    const ob = new IntersectionObserver(entries => {
      entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('rev-act') })
    }, { threshold: 0.1 })
    document.querySelectorAll('.rev').forEach(el => ob.observe(el))
    return () => ob.disconnect()
  }, [])

  if (!data) return null
  const { primaryColor:p='#1E3A5F', secondaryColor:sRaw='#F5F0E8', accentColor:a='#C9A84C', font, industry, businessName:biz='Mi Empresa' } = data
  const s = safeBg(sRaw, p)   // Bug fix: prevent white/near-white section backgrounds
  const avGrads = [`linear-gradient(135deg,${p},${a})`,`linear-gradient(135deg,${a},${p}88)`,`linear-gradient(135deg,#6366F1,#8B5CF6)`]
  // ── Style override helpers ─────────────────────────────
  const ov  = (k) => data?.elementStyles?.[k] || {}
  const ost = (k) => ({
    ...(ov(k).textColor  ? { color:      ov(k).textColor  } : {}),
    ...(ov(k).bgColor    ? { background: ov(k).bgColor, boxShadow: ov(k).boxShadow ?? 'none' } : {}),
    ...(ov(k).fontWeight ? { fontWeight: ov(k).fontWeight } : {}),
  })

  const isDark = data.layoutVariant === 2 || p.toLowerCase() === '#0a0a0a' || p.toLowerCase() === '#000000';
  const lv = data.layoutVariant || 1;
  const CHURCH_VARIANTS = ['afiche', 'noche_adoracion', 'poster', 'mygateway', 'nucleus']
  const isChurch = CHURCH_VARIANTS.includes(data.churchTemplateVariant)
    || data.industry?.toLowerCase().includes('iglesi')
    || data.industry?.toLowerCase().includes('church')
    || Boolean(data.planAVisit)
    || Boolean(data.ministries)
    || Boolean(data.sermons);

  if (isChurch) {
    if (data.churchTemplateVariant === 'afiche' || data.churchTemplateVariant === 'noche_adoracion') {
      return <ChurchTemplateAfiche data={data} editMode={editMode} activeField={activeField} onElementClick={onElementClick} onQuickUpdate={onQuickUpdate} onQuickUpdateBatch={onQuickUpdateBatch} />
    }
    if (data.churchTemplateVariant === 'poster') {
      return <ChurchTemplatePoster data={data} editMode={editMode} activeField={activeField} onElementClick={onElementClick} onQuickUpdate={onQuickUpdate} onQuickUpdateBatch={onQuickUpdateBatch} />
    }
    if (data.churchTemplateVariant === 'mygateway') {
      return <ChurchTemplateMyGateway data={data} editMode={editMode} activeField={activeField} onElementClick={onElementClick} onQuickUpdate={onQuickUpdate} onQuickUpdateBatch={onQuickUpdateBatch} />
    }
    // Default or 'nucleus' (Option 1 now):
    return <ChurchTemplateNucleus data={data} editMode={editMode} activeField={activeField} onElementClick={onElementClick} onQuickUpdate={onQuickUpdate} onQuickUpdateBatch={onQuickUpdateBatch} />
  }

  const heroV = data.variants?.hero || (lv === 2 ? 2 : lv === 3 ? 3 : lv === 4 ? 4 : 1);
  const servicesV = data.variants?.services || (lv === 3 ? 3 : lv === 4 ? 4 : lv === 2 ? 2 : 1);
  const aboutV = data.variants?.about || (lv === 2 ? 2 : lv === 3 ? 3 : lv === 4 ? 4 : 1);
  const testimonialsV = data.variants?.testimonials || (lv === 2 ? 2 : lv === 3 ? 3 : lv === 4 ? 4 : 1);
  const contactV = data.variants?.contact || (lv === 2 ? 2 : lv === 3 ? 3 : lv === 4 ? 4 : 1);
  const footerV = data.variants?.footer || (lv === 2 ? 2 : lv === 3 ? 3 : lv === 4 ? 4 : 1);

  // NAV — dynamic links, smooth scroll to sections
  const renderNav = (overlay) => (
    <nav className="wp-nav" style={overlay ? {
      position: 'absolute', top: 0, left: 0, right: 0, zIndex: 250,
      background: 'linear-gradient(180deg, rgba(15,23,42,0.65) 0%, rgba(15,23,42,0.05) 100%)',
      border: 'none', borderRadius: 0, boxShadow: 'none',
      margin: 0, padding: '18px 5%',
    } : {}}>
            <div className="wp-logo">
              {data.logoImage ? (
                <img className={editMode?'wp-editable':''} src={data.logoImage} alt={biz} onClick={editMode?e=>ec(e,{field:'logoImage',label:'Logo URL',value:data.logoImage,type:'image'}):undefined} style={{ maxHeight: data.logoSize || 40, maxWidth: 200, objectFit: 'contain', width: 'auto', transition: 'max-height 0.2s' }} />
              ) : (
                <>
                  <div
                    className={editMode?'wp-logo-ic wp-editable':'wp-logo-ic'}
                    onClick={editMode?e=>ec(e,{ovKey:'nav_brand',field:'businessName',label:'Nombre del negocio',value:data.businessName,type:'text',textColor:ov('nav_brand').textColor||'#ffffff',bgColor:ov('nav_brand').bgColor,fontWeight:ov('nav_brand').fontWeight||700}):undefined}
                    style={ost('nav_brand')}>
                    {(biz||'M')[0]}
                  </div>
                  <span className={editMode?'wp-logo-nm wp-editable':'wp-logo-nm'}
                    onClick={editMode?e=>ec(e,{ovKey:'nav_brand',field:'businessName',label:'Nombre del negocio',value:data.businessName,type:'text',textColor:ov('nav_brand').textColor||(isChurch ? '#FFFFFF' : p),bgColor:ov('nav_brand').bgColor,fontWeight:ov('nav_brand').fontWeight||800}):undefined}
                    style={{ color: isChurch ? '#FFFFFF' : undefined, ...ost('nav_brand') }}>
                    {biz}
                  </span>
                </>
              )}
            </div>
            <div className="wp-nav-lks">
              {(data.navLinks||(isChurch ? ['Inicio','Planifica tu Visita','Ministerios','Sermones','Próximos Pasos','Contacto'] : ['Inicio','Servicios','Nosotros','Testimonios','Contacto'])).map((l,i)=>{
                const label = typeof l === 'string' ? l : l.label
                const href  = typeof l === 'string' ? `#${l.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/\s+/g,'-')}` : (l.href||'#')
                return <a href={href} key={i} onClick={e=>scrollToSection(href,e)} style={isChurch ? { color: '#FFFFFF', fontWeight: 700 } : {}}>{label}</a>
              })}
            </div>
            <a data-field="navCtaText" data-ovkey="navCtaText" href={data.hero?.ctaLink||(isChurch?'#wp-plan-visit':'#wp-contact')} className={editMode?'wp-nav-cta wp-editable':'wp-nav-cta'} target={data.hero?.ctaLink?.startsWith('http')?'_blank':undefined}
              onClick={editMode?e=>ec(e,{ovKey:'navCtaText',field:'navCtaText',label:'Botón Nav CTA',value:data.navCtaText||(isChurch?'Planifica tu Visita':'Contáctanos'),type:'text',textColor:ov('navCtaText').textColor||(isChurch?'#0F172A':'#ffffff'),bgColor:ov('navCtaText').bgColor||(isChurch?'#00D8F6':a),fontWeight:ov('navCtaText').fontWeight||(isChurch?900:700),applyGlobalDefault:!isChurch}):(data.hero?.ctaLink?.startsWith('http') ? undefined : e=>scrollToSection(data.hero?.ctaLink||(isChurch?'#wp-plan-visit':'#wp-contact'),e))}
              style={isChurch ? { background: ov('navCtaText').bgColor || '#00D8F6', color: ov('navCtaText').textColor || '#0F172A', fontWeight: ov('navCtaText').fontWeight || 900, ...ost('navCtaText') } : ost('navCtaText')} rel="noreferrer">
              {data.navCtaText||(isChurch?'Planifica tu Visita':'Contáctanos')}
            </a>
    </nav>
  )

  return (
    <div className="preview-browser">
      <BrowserBar biz={biz} />
      <div style={{ maxHeight:'80vh', overflowY:'auto' }}>
        <div className="wp-wrap" ref={previewWrapRef} style={{ position: 'relative' }}>
          {editMode && activeField && (
            <CanvasTransformerOverlay
              containerRef={previewWrapRef}
              activeField={activeField}
              ovStyle={data?.elementStyles?.[activeField] || {}}
              onQuickUpdate={onQuickUpdate}
              onQuickUpdateBatch={onQuickUpdateBatch}
            />
          )}
          {isChurch ? (
            data.churchTemplateVariant === 'afiche' || data.churchTemplateVariant === 'noche_adoracion' ? (
              <ChurchTemplateAfiche
                data={data}
                editMode={editMode}
                activeField={activeField}
                onElementClick={onElementClick}
                onQuickUpdate={onQuickUpdate}
                onQuickUpdateBatch={onQuickUpdateBatch}
              />
            ) : data.churchTemplateVariant === 'nucleus' ? (
              <ChurchTemplateNucleus
                data={data}
                editMode={editMode}
                activeField={activeField}
                onElementClick={onElementClick}
                onQuickUpdate={onQuickUpdate}
                onQuickUpdateBatch={onQuickUpdateBatch}
              />
            ) : data.churchTemplateVariant === 'poster' ? (
              <ChurchTemplatePoster
                data={data}
                editMode={editMode}
                activeField={activeField}
                onElementClick={onElementClick}
                onQuickUpdate={onQuickUpdate}
                onQuickUpdateBatch={onQuickUpdateBatch}
              />
            ) : (
              <ChurchTemplateMyGateway
                data={data}
                editMode={editMode}
                activeField={activeField}
                onElementClick={onElementClick}
                onQuickUpdate={onQuickUpdate}
                onQuickUpdateBatch={onQuickUpdateBatch}
              />
            )
          ) : (
            <>
              <Styles p={p} a={a} s={s} font={font} em={editMode} isDark={isDark} />

              {/* Church sites float the nav on top of the full-bleed hero photo
                  instead (rendered inside the hero section below); everyone else
                  gets the normal solid bar here. */}
              {!isChurch && renderNav(false)}

              {/* DYNAMIC SECTIONS LOOP */}
          {(() => {
            const CHURCH_ORDER = ['hero', 'missionBlock', 'welcome', 'planAVisit', 'nucleusColumns', 'values', 'ministries', 'nextSteps', 'sermons', 'donation', 'prayerRequest', 'about', 'testimonials', 'contact']
            const DEFAULT_ORDER = isChurch ? CHURCH_ORDER : ['hero', 'services', 'about', 'gallery', 'team', 'beforeAfter', 'testimonials', 'contact']
            const order = data.sectionOrder || DEFAULT_ORDER
            const visibility = data.sectionsVisibility || {}
            const SECTION_LABELS = {
              hero: 'Hero',
              missionBlock: 'Misión & Visión (Nucleus)',
              welcome: 'Bienvenida (MyGateway)',
              planAVisit: 'Planifica tu Visita',
              nucleusColumns: 'Líderes & Calendario (Nucleus)',
              values: 'Valores & Fe',
              ministries: 'Ministerios',
              nextSteps: 'Próximos Pasos',
              sermons: 'Sermones & Mensajes',
              donation: 'Ofrendas / Donaciones',
              prayerRequest: 'Petición de Oración',
              services: 'Servicios',
              about: 'Sobre Nosotros',
              gallery: 'Galería',
              team: 'Equipo',
              beforeAfter: 'Antes/Después',
              testimonials: 'Testimonios',
              contact: 'Contacto'
            }

            // ── Premium section wrapper: shows hover toolbar with layout thumbnails ──
            const wrapSection = (key, variantVal, content, idx) => {
              if (!editMode) return content
              const visibleOrder = order.filter(k => visibility[k] !== false)
              const visIdx = visibleOrder.indexOf(key)
              return (
                <SectionToolbar
                  key={key}
                  sectionKey={key}
                  label={SECTION_LABELS[key] || key}
                  variantVal={variantVal}
                  accentColor={a}
                  primaryColor={p}
                  onVariantChange={(v) => onSectionChange && onSectionChange(`variants.${key}`, v)}
                  onMoveUp={() => {
                    const i = order.indexOf(key)
                    if (i > 0) {
                      const newOrder = [...order]
                      const temp = newOrder[i]
                      newOrder[i] = newOrder[i - 1]
                      newOrder[i - 1] = temp
                      onSectionChange && onSectionChange('sectionOrder', newOrder)
                    }
                  }}
                  onMoveDown={() => {
                    if (idx >= order.length-1) return
                    const next = [...order]
                    ;[next[idx], next[idx+1]] = [next[idx+1], next[idx]]
                    onSectionChange && onSectionChange('sectionOrder', next)
                  }}
                  canMoveUp={idx > 0}
                  canMoveDown={idx < order.length - 1}
                >
                  {content}
                </SectionToolbar>
              )
            }

            return order.map((sectionKey, sIdx) => {
              if (visibility[sectionKey] === false) return null

              switch (sectionKey) {
                case 'missionBlock':
                  return (data.missionBlock || data.churchTemplateVariant === 'nucleus') ? wrapSection('missionBlock', 1, (
                    <section key="missionBlock" id="wp-mission" className="wp-sec" style={{ background: '#F8FAFC', padding: '96px 6% 88px', textAlign: 'center', width: '100%', overflow: 'hidden' }}>
                      <div style={{ maxWidth: 840, margin: '0 auto' }}>
                        <h2 className={editMode ? 'wp-h2 wp-editable' : 'wp-h2'}
                          onClick={editMode ? e => ec(e, { ovKey: 'mission_heading', field: 'missionBlock.heading', label: 'Título Misión', value: data.missionBlock?.heading || 'Buscando a Dios Juntos', type: 'text' }) : undefined}
                          style={{ color: '#000000', fontSize: 'clamp(2.4rem, 4.5cqi, 3.2rem)', fontWeight: 900, marginBottom: 20, letterSpacing: '-0.03em', ...ost('mission_heading') }}>
                          {data.missionBlock?.heading || 'Buscando a Dios Juntos'}
                        </h2>
                        <p className={editMode ? 'wp-sec-sub wp-editable' : 'wp-sec-sub'}
                          onClick={editMode ? e => ec(e, { ovKey: 'mission_text', field: 'missionBlock.text', label: 'Texto Misión', value: data.missionBlock?.text || 'Existimos para ayudar a las personas a conocer a Dios, encontrar libertad, descubrir su propósito y marcar una diferencia en el mundo.', type: 'textarea' }) : undefined}
                          style={{ color: '#475569', fontSize: 'clamp(1.05rem, 2cqi, 1.2rem)', lineHeight: 1.7, margin: '0 auto 36px', maxWidth: 720, ...ost('mission_text') }}>
                          {data.missionBlock?.text || 'Existimos para ayudar a las personas a conocer a Dios, encontrar libertad, descubrir su propósito y marcar una diferencia en el mundo.'}
                        </p>
                        <a href={data.missionBlock?.ctaLink || '#wp-plan-visit'} onClick={e => scrollToSection(data.missionBlock?.ctaLink || '#wp-plan-visit', e)}
                          style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '16px 36px', borderRadius: 999, background: '#C4A35A', color: '#0A0A0F', fontWeight: 900, fontSize: '0.875rem', letterSpacing: '0.12em', textTransform: 'uppercase', textDecoration: 'none', transition: 'all 0.2s', boxShadow: '0 6px 20px rgba(196,163,90,0.35)' }}>
                          {data.missionBlock?.ctaText || 'SOBRE NOSOTROS'}
                        </a>
                      </div>
                    </section>
                  ), sIdx) : null

                case 'nucleusColumns': {
                  const col1 = data.nucleusColumns?.col1 || {
                    eyebrow: 'Conoce al Equipo',
                    title: 'Líderes & Pastores',
                    text: 'Nuestro equipo pastoral está para servirte, guiarte y caminar contigo en cada etapa de tu vida.',
                    image: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=900&q=85&fit=crop',
                    ctaText: 'NUESTRO EQUIPO',
                    ctaLink: '#wp-contact'
                  }
                  const col2 = data.nucleusColumns?.col2 || {
                    eyebrow: 'Nuestro Calendario',
                    title: 'Mira lo que está pasando',
                    text: 'Siempre hay algo sucediendo en nuestra iglesia. Descubre eventos, reuniones semanales y actividades para toda la familia.',
                    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=900&q=85&fit=crop',
                    ctaText: 'NUESTRO CALENDARIO',
                    ctaLink: '#wp-contact'
                  }

                  return (data.nucleusColumns || data.churchTemplateVariant === 'nucleus') ? wrapSection('nucleusColumns', 1, (
                    <section key="nucleusColumns" id="wp-nucleus-columns" className="wp-sec" style={{ background: '#080A10', padding: '110px 6%', width: '100%', overflow: 'hidden' }}>
                      <div style={{ maxWidth: 1240, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 48 }}>
                        {/* Col 1 */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', background: 'rgba(255,255,255,0.03)', padding: 32, borderRadius: 24, border: '1px solid rgba(196,163,90,0.18)', boxShadow: '0 12px 40px rgba(0,0,0,0.4)' }}>
                          <div style={{ width: '100%', height: 340, borderRadius: 18, overflow: 'hidden', marginBottom: 24, boxShadow: '0 8px 24px rgba(0,0,0,0.6)' }}>
                            <img src={col1.image} alt={col1.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          </div>
                          <span style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#DFCA88', marginBottom: 8 }}>
                            ✦ {col1.eyebrow}
                          </span>
                          <h3 style={{ fontSize: '2rem', fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 900, color: '#FFFFFF', margin: '0 0 14px', letterSpacing: '-0.02em' }}>
                            {col1.title}
                          </h3>
                          <p style={{ fontSize: '0.98rem', lineHeight: 1.65, color: '#CBD5E1', margin: '0 0 28px', maxWidth: 480 }}>
                            {col1.text}
                          </p>
                          <a href={col1.ctaLink || '#wp-contact'} onClick={e => scrollToSection(col1.ctaLink || '#wp-contact', e)}
                            style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '14px 32px', borderRadius: 999, background: '#C4A35A', color: '#0A0A0F', fontWeight: 900, fontSize: '0.82rem', letterSpacing: '0.12em', textTransform: 'uppercase', textDecoration: 'none', transition: 'all 0.2s', boxShadow: '0 4px 16px rgba(196,163,90,0.3)' }}>
                            {col1.ctaText}
                          </a>
                        </div>

                        {/* Col 2 */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', background: 'rgba(255,255,255,0.03)', padding: 32, borderRadius: 24, border: '1px solid rgba(196,163,90,0.18)', boxShadow: '0 12px 40px rgba(0,0,0,0.4)' }}>
                          <div style={{ width: '100%', height: 340, borderRadius: 18, overflow: 'hidden', marginBottom: 24, boxShadow: '0 8px 24px rgba(0,0,0,0.6)' }}>
                            <img src={col2.image} alt={col2.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          </div>
                          <span style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#DFCA88', marginBottom: 8 }}>
                            ✦ {col2.eyebrow}
                          </span>
                          <h3 style={{ fontSize: '2rem', fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 900, color: '#FFFFFF', margin: '0 0 14px', letterSpacing: '-0.02em' }}>
                            {col2.title}
                          </h3>
                          <p style={{ fontSize: '0.98rem', lineHeight: 1.65, color: '#CBD5E1', margin: '0 0 28px', maxWidth: 480 }}>
                            {col2.text}
                          </p>
                          <a href={col2.ctaLink || '#wp-contact'} onClick={e => scrollToSection(col2.ctaLink || '#wp-contact', e)}
                            style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '14px 32px', borderRadius: 999, background: '#C4A35A', color: '#0A0A0F', fontWeight: 900, fontSize: '0.82rem', letterSpacing: '0.12em', textTransform: 'uppercase', textDecoration: 'none', transition: 'all 0.2s', boxShadow: '0 4px 16px rgba(196,163,90,0.3)' }}>
                            {col2.ctaText}
                          </a>
                        </div>
                      </div>
                    </section>
                  ), sIdx) : null
                }
                case 'welcome':
                  return (data.welcome || isChurch) ? wrapSection('welcome', 1, (
                    <section key="welcome" id="wp-welcome" className="wp-sec" style={{ background: isDark ? '#0B132B' : '#FFFFFF', padding: '36px 0 0', textAlign: 'center', width: '100%', overflow: 'hidden' }}>
                      <div style={{ display: 'flex', gap: 14, justifyContent: 'center', marginBottom: 28, padding: '0 20px', flexWrap: 'wrap' }}>
                        <a href="#wp-about" onClick={e => scrollToSection('#wp-about', e)}
                          style={{ padding: '12px 30px', borderRadius: 999, border: `2px solid ${isDark ? '#FFFFFF' : '#0F172A'}`, color: isDark ? '#FFFFFF' : '#0F172A', fontWeight: 800, fontSize: '0.92rem', textDecoration: 'none', background: 'transparent', transition: 'all 0.2s' }}>
                          {data.welcome?.ctaText || 'Sobre Nosotros'}
                        </a>
                        <a href="#wp-contact" onClick={e => scrollToSection('#wp-contact', e)}
                          style={{ padding: '12px 30px', borderRadius: 999, border: `2px solid ${isDark ? '#FFFFFF' : '#0F172A'}`, color: isDark ? '#FFFFFF' : '#0F172A', fontWeight: 800, fontSize: '0.92rem', textDecoration: 'none', background: 'transparent', transition: 'all 0.2s' }}>
                          {data.welcome?.ctaSecondaryText || 'Escríbenos'}
                        </a>
                      </div>

                      {/* 3 Full-Bleed Emotional Photos */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 0, width: '100%', overflow: 'hidden' }}>
                        <div style={{ height: 420, overflow: 'hidden', position: 'relative' }}>
                          <img src={data.welcome?.photo1 || 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&q=85&fit=crop'} alt="Familia" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div style={{ height: 420, overflow: 'hidden', position: 'relative' }}>
                          <img src={data.welcome?.photo2 || 'https://images.unsplash.com/photo-1544427920-c49ccfb85579?w=800&q=85&fit=crop'} alt="Alabanza" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div style={{ height: 420, overflow: 'hidden', position: 'relative' }}>
                          <img src={data.welcome?.photo3 || 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=85&fit=crop'} alt="Comunidad" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                      </div>
                    </section>
                  ), sIdx) : null

                case 'planAVisit':
                  return wrapSection('planAVisit', 1, (
                    <section key="planAVisit" id="wp-plan-visit" className="wp-sec" style={{ background: isDark ? '#020617' : '#FFFFFF', padding: 0, overflow: 'hidden' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', alignItems: 'stretch', minHeight: 520 }}>
                        {/* Left: Clean Minimal Content */}
                        <div style={{ padding: '80px 8%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', background: isDark ? '#0B132B' : '#FFFFFF' }}>
                          <span style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: isDark ? a : '#0F172A', marginBottom: 16 }}>
                            {data.planAVisit?.eyebrow || data.planAVisit?.serviceTimes?.[0] || 'DOMINGOS 9:00 AM & 11:00 AM'}
                          </span>
                          <h2 className={editMode ? 'wp-h2 wp-editable' : 'wp-h2'}
                            onClick={editMode ? e => ec(e, { ovKey: 'visit_title', field: 'planAVisit.title', label: 'Título Visita', value: data.planAVisit?.title || 'Acompáñanos este Domingo', type: 'text' }) : undefined}
                            style={{ textAlign: 'left', margin: '0 0 20px', fontSize: 'clamp(2.2rem, 3.8cqi, 3.2rem)', fontWeight: 900, lineHeight: 1.12, color: isDark ? '#FFFFFF' : '#0F172A', ...ost('visit_title') }}>
                            {data.planAVisit?.title || 'Acompáñanos este Domingo'}
                          </h2>
                          <p className={editMode ? 'wp-sec-sub wp-editable' : 'wp-sec-sub'}
                            onClick={editMode ? e => ec(e, { ovKey: 'visit_sub', field: 'planAVisit.subtitle', label: 'Texto Visita', value: data.planAVisit?.subtitle || 'Encuentra horarios, ubicación y todo lo que necesitas saber para tu primera visita haciendo clic en el botón abajo.', type: 'textarea' }) : undefined}
                            style={{ fontSize: '1.05rem', lineHeight: 1.6, color: isDark ? '#94A3B8' : '#475569', margin: '0 0 36px', maxWidth: 460, textAlign: 'left', ...ost('visit_sub') }}>
                            {data.planAVisit?.subtitle || 'Encuentra horarios, ubicación y todo lo que necesitas saber para tu primera visita haciendo clic en el botón abajo.'}
                          </p>
                          <a href="#wp-contact" onClick={e => scrollToSection('#wp-contact', e)}
                            style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '16px 36px', borderRadius: 12, background: isDark ? '#FFFFFF' : '#0F172A', color: isDark ? '#0F172A' : '#FFFFFF', fontWeight: 800, fontSize: '0.95rem', textDecoration: 'none', transition: 'all 0.2s', boxShadow: '0 4px 14px rgba(0,0,0,0.1)' }}>
                            {data.planAVisit?.ctaText || 'Planifica tu Visita'}
                          </a>
                        </div>

                        {/* Right: Crisp Full-Bleed Image */}
                        <div style={{ minHeight: 460, position: 'relative', overflow: 'hidden' }}>
                          <img src={data.planAVisit?.image || 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=1200&q=85&fit=crop'} alt="Domingo en Comunidad" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                      </div>
                    </section>
                  ), sIdx)

                case 'nextSteps': {
                  if (!data.nextSteps && !isChurch) return null
                  const ns = data.nextSteps || {
                    label: 'Involúcrate',
                    title: 'Próximos Pasos',
                    subtitle: 'Explora nuestra comunidad incluyendo ministerios, próximos eventos y oportunidades para crecer en tu fe.',
                    ctaText: 'Dar tu Siguiente Paso',
                    image: 'https://images.unsplash.com/photo-1519491050282-cf00c82424b4?w=1200&q=85&fit=crop'
                  }

                  return wrapSection('nextSteps', 1, (
                    <section key="nextSteps" id="wp-next-steps" className="wp-sec" style={{ background: isDark ? '#0F172A' : '#F8FAFC', padding: 0, overflow: 'hidden' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', alignItems: 'stretch', minHeight: 520 }}>
                        {/* Left: Clean Minimal Content */}
                        <div style={{ padding: '80px 8%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', background: isDark ? '#0F172A' : '#F8FAFC' }}>
                          <span style={{ fontSize: '0.95rem', fontStyle: 'italic', fontWeight: 600, color: isDark ? '#94A3B8' : '#64748B', marginBottom: 16 }}>
                            {ns.label || 'Involúcrate'}
                          </span>
                          <h2 className={editMode ? 'wp-h2 wp-editable' : 'wp-h2'}
                            onClick={editMode ? e => ec(e, { ovKey: 'next_steps_title', field: 'nextSteps.title', label: 'Título Próximos Pasos', value: ns.title || 'Próximos Pasos', type: 'text' }) : undefined}
                            style={{ textAlign: 'left', margin: '0 0 20px', fontSize: 'clamp(2.2rem, 3.8cqi, 3.2rem)', fontWeight: 900, lineHeight: 1.12, color: isDark ? '#FFFFFF' : '#0F172A', ...ost('next_steps_title') }}>
                            {ns.title || 'Próximos Pasos'}
                          </h2>
                          <p className={editMode ? 'wp-sec-sub wp-editable' : 'wp-sec-sub'}
                            onClick={editMode ? e => ec(e, { ovKey: 'next_steps_sub', field: 'nextSteps.subtitle', label: 'Texto Próximos Pasos', value: ns.subtitle || 'Explora nuestra comunidad incluyendo ministerios, próximos eventos y oportunidades para crecer en tu fe.', type: 'textarea' }) : undefined}
                            style={{ fontSize: '1.05rem', lineHeight: 1.6, color: isDark ? '#94A3B8' : '#475569', margin: '0 0 36px', maxWidth: 460, textAlign: 'left', ...ost('next_steps_sub') }}>
                            {ns.subtitle || 'Explora nuestra comunidad incluyendo ministerios, próximos eventos y oportunidades para crecer en tu fe.'}
                          </p>
                          <a href="#wp-contact" onClick={e => scrollToSection('#wp-contact', e)}
                            style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '16px 36px', borderRadius: 12, background: isDark ? '#FFFFFF' : '#0F172A', color: isDark ? '#0F172A' : '#FFFFFF', fontWeight: 800, fontSize: '0.95rem', textDecoration: 'none', transition: 'all 0.2s', boxShadow: '0 4px 14px rgba(0,0,0,0.1)' }}>
                            {ns.ctaText || 'Dar tu Siguiente Paso'}
                          </a>
                        </div>

                        {/* Right: Crisp Full-Bleed Image */}
                        <div style={{ minHeight: 460, position: 'relative', overflow: 'hidden' }}>
                          <img src={ns.image || 'https://images.unsplash.com/photo-1519491050282-cf00c82424b4?w=1200&q=85&fit=crop'} alt="Bautismos y Comunidad" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                      </div>
                    </section>
                  ), sIdx)
                }

                case 'ministries': {
                  const minList = data.ministries || (isChurch ? [
                    { name: 'Niños & Familias', ageRange: '0 a 12 años', description: 'Espacio seguro y divertido donde los más pequeños aprenden del amor de Dios.', image: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=800&q=80&fit=crop', ctaText: 'Conoce más' },
                    { name: 'Jóvenes & Universitarios', ageRange: '13 a 25 años', description: 'Comunidad vibrante con música en vivo, amistades sólidas y crecimiento espiritual.', image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80&fit=crop', ctaText: 'Conoce más' },
                    { name: 'Grupos en Casa', ageRange: 'Todas las edades', description: 'Círculos pequeños en diferentes puntos de la ciudad para compartir la fe y convivir.', image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&q=80&fit=crop', ctaText: 'Conoce más' },
                  ] : null)

                  if (!minList?.length) return null

                  return wrapSection('ministries', 1, (
                    <section key="ministries" id="wp-ministerios" className="wp-sec" style={{ background: isDark ? '#020617' : '#FFFFFF', padding: '90px 5%', textAlign: 'center' }}>
                      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
                        <span className="wp-sec-lbl">Nuestros Ministerios</span>
                        <h2 className="wp-h2" style={{ margin: '0 0 12px' }}>{data.ministriesTitle || 'Nuestros Ministerios'}</h2>
                        <p className="wp-sec-sub" style={{ margin: '0 auto 48px', maxWidth: 640 }}>
                          {data.ministriesSubtitle || 'Espacios pensados para cada miembro de la familia.'}
                        </p>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, textAlign: 'left' }}>
                          {minList.map((min, idx) => (
                            <div key={idx} style={{ background: isDark ? '#0F172A' : '#F8FAFC', borderRadius: 20, overflow: 'hidden', border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`, boxShadow: '0 6px 24px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column' }}>
                              <div style={{ height: 220, position: 'relative', overflow: 'hidden' }}>
                                <img src={min.image || (idx === 0 ? 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=800&q=80&fit=crop' : idx === 1 ? 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80&fit=crop' : 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&q=80&fit=crop')} alt={min.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                              </div>
                              <div style={{ padding: 24, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 14 }}>
                                <div>
                                  <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: isDark ? '#FFF' : '#0F172A', margin: '0 0 8px' }}>{min.name}</h3>
                                  <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: 1.55, color: isDark ? '#94A3B8' : '#64748B' }}>
                                    {min.description}
                                  </p>
                                </div>
                                <a href="#wp-contact" onClick={e => scrollToSection('#wp-contact', e)}
                                  style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: '0.86rem', fontWeight: 800, color: a, textDecoration: 'none' }}>
                                  {min.ctaText || 'Conoce más'} →
                                </a>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </section>
                  ), sIdx)
                }

                case 'values':
                  return (data.values || isChurch) ? wrapSection('values', 1, (
                    <section key="values" id="wp-values" className="wp-sec" style={{ background: isDark ? '#050B1A' : '#FFFFFF', padding: '90px 5%', textAlign: 'center' }}>
                      <div style={{ maxWidth: 1160, margin: '0 auto' }}>
                        <span className="wp-sec-lbl">Nuestros Fundamentos & Fe</span>
                        <h2 className="wp-h2" style={{ marginBottom: 16 }}>Valores que Nos Guían</h2>
                        <p className="wp-sec-sub" style={{ margin: '0 auto 48px', maxWidth: 640 }}>Principios bíblicos que inspiran todo lo que hacemos como comunidad.</p>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24, textAlign: 'left' }}>
                          {(data.values || [
                            { icon: 'heart', title: 'Amor Incondicional', text: 'Recibimos a cada persona con gracia y calidez, tal como es.' },
                            { icon: 'users', title: 'Comunidad Auténtica', text: 'Crecemos juntos a través de grupos de amistad y apoyo mutuo.' },
                            { icon: 'book', title: 'Verdad Bíblica', text: 'Enseñanza práctica basada en la Palabra de Dios para la vida diaria.' },
                            { icon: 'globe', title: 'Impacto y Misión', text: 'Servimos con generosidad a nuestra ciudad y a los más necesitados.' },
                          ]).map((val, idx) => (
                            <div key={idx} style={{ background: isDark ? '#0F172A' : '#F8FAFC', padding: 28, borderRadius: 20, border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)'}`, transition: 'transform 0.2s', display: 'flex', flexDirection: 'column', gap: 12 }}>
                              <div style={{ width: 48, height: 48, borderRadius: 14, background: `${a}18`, color: a, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900 }}>
                                {getIcon({ iconId: val.icon, icon: val.icon, _idx: idx })}
                              </div>
                              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: isDark ? '#FFF' : p, margin: 0 }}>{val.title}</h3>
                              <p style={{ fontSize: '0.88rem', lineHeight: 1.6, color: isDark ? '#94A3B8' : '#64748B', margin: 0 }}>{val.text}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </section>
                  ), sIdx) : null

                case 'nextSteps': {
                  if (!data.nextSteps && !isChurch) return null
                  const ns = data.nextSteps || {
                    title: 'Tus Próximos Pasos en la Fe',
                    subtitle: 'No camines solo. Te acompañamos en cada etapa de tu crecimiento espiritual.',
                    steps: [
                      { step: 1, title: '1. Creer & Conocer a Jesús', description: 'Descubre el amor de Dios, el significado del perdón y el propósito único que Él tiene para tu vida.' },
                      { step: 2, title: '2. Conectar en Comunidad', description: 'Haz amigos genuinos y comparte la vida participando en nuestros grupos semanales de conexión.' },
                      { step: 3, title: '3. Servir y Marcar la Diferencia', description: 'Utiliza tus talentos para bendecir a otros uniéndote a uno de nuestros equipos de voluntarios.' }
                    ]
                  }

                  return wrapSection('nextSteps', 1, (
                    <section key="nextSteps" id="wp-next-steps" className="wp-sec" style={{ background: isDark ? '#0F172A' : '#FFFFFF', padding: '100px 5%', textAlign: 'center' }}>
                      <div style={{ maxWidth: 1160, margin: '0 auto' }}>
                        <span className="wp-sec-lbl">Crecimiento Espiritual</span>
                        <h2 className="wp-h2">{ns.title || 'Tus Próximos Pasos'}</h2>
                        <p className="wp-sec-sub" style={{ margin: '0 auto 48px', maxWidth: 680 }}>{ns.subtitle || 'Un camino claro y guiado para crecer en tu fe.'}</p>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, textAlign: 'left' }}>
                          {(ns.steps || []).map((st, idx) => (
                            <div key={idx} style={{ background: isDark ? '#1E293B' : '#F8FAFC', padding: 32, borderRadius: 24, border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`, position: 'relative', overflow: 'hidden' }}>
                              <div style={{ width: 44, height: 44, borderRadius: 12, background: a, color: isDark ? '#000' : '#0F172A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 900, marginBottom: 18 }}>
                                {st.step || (idx + 1)}
                              </div>
                              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: isDark ? '#FFF' : p, marginBottom: 10 }}>{st.title}</h3>
                              <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: isDark ? '#94A3B8' : '#64748B', margin: 0 }}>{st.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </section>
                  ), sIdx)
                }

                case 'sermons': {
                  const sermonsList = data.sermons || (isChurch ? [
                    { title: 'Caminando por Fe en Tiempos de Cambio', series: 'Serie: Imparables', speaker: 'Pastor Principal', date: 'Domingo Reciente', duration: '38 min', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', image: 'https://images.unsplash.com/photo-1519491050282-cf00c82424b4?w=800&q=80&fit=crop' },
                    { title: 'El Poder de una Oración Constante', series: 'Serie: Conexión Divina', speaker: 'Pastor Principal', date: 'Semana Anterior', duration: '42 min', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', image: 'https://images.unsplash.com/photo-1544427920-c49ccfb85579?w=800&q=80&fit=crop' },
                    { title: 'Restauración y Paz para tu Hogar', series: 'Serie: Fundamentos', speaker: 'Pastor Invitado', date: 'Hace 2 Semanas', duration: '35 min', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', image: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?w=800&q=80&fit=crop' }
                  ] : null)

                  if (!sermonsList?.length) return null

                  return wrapSection('sermons', 1, (
                    <section key="sermons" id="wp-sermons" className="wp-sec" style={{ background: isDark ? '#020617' : '#0B132B', color: '#fff', padding: '100px 5%', textAlign: 'center' }}>
                      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                        <span className="wp-sec-lbl" style={{ background: `${a}22`, color: a }}>🎙️ Prédicas & Mensajes</span>
                        <h2 className="wp-h2" style={{ color: '#fff' }}>{data.sermonsTitle || 'Mensajes & Prédicas Recientes'}</h2>
                        <p className="wp-sec-sub" style={{ margin: '0 auto 48px', color: 'rgba(255,255,255,0.7)', maxWidth: 680 }}>
                          {data.sermonsSubtitle || 'Encuentra inspiración y guía bíblica para tu semana dondequiera que estés.'}
                        </p>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 28, textAlign: 'left' }}>
                          {sermonsList.map((sermon, idx) => (
                            <div key={idx} style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 8px 32px rgba(0,0,0,0.3)', display: 'flex', flexDirection: 'column' }}>
                              <div style={{ height: 180, position: 'relative', overflow: 'hidden', cursor: 'pointer' }}
                                onClick={() => setActiveVideoModal({ title: sermon.title, url: sermon.videoUrl || 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' })}>
                                <img src={sermon.image || (idx === 0 ? 'https://images.unsplash.com/photo-1519491050282-cf00c82424b4?w=800&q=80&fit=crop' : idx === 1 ? 'https://images.unsplash.com/photo-1544427920-c49ccfb85579?w=800&q=80&fit=crop' : 'https://images.unsplash.com/photo-1507692049790-de58290a4334?w=800&q=80&fit=crop')} alt={sermon.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                  <div style={{ width: 52, height: 52, borderRadius: '50%', background: a, color: '#0F172A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', boxShadow: '0 4px 20px rgba(0,0,0,0.4)', paddingLeft: 3 }}>
                                    ▶
                                  </div>
                                </div>
                                <span style={{ position: 'absolute', top: 12, left: 12, background: 'rgba(0,0,0,0.7)', color: '#fff', fontSize: '0.72rem', fontWeight: 800, padding: '3px 8px', borderRadius: 6, textTransform: 'uppercase' }}>
                                  {sermon.series || 'Serie Dominical'}
                                </span>
                                {sermon.duration && (
                                  <span style={{ position: 'absolute', bottom: 12, right: 12, background: 'rgba(0,0,0,0.7)', color: '#fff', fontSize: '0.72rem', fontWeight: 700, padding: '2px 8px', borderRadius: 4 }}>
                                    {sermon.duration}
                                  </span>
                                )}
                              </div>
                              <div style={{ padding: 22, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                <div>
                                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff', margin: '0 0 8px', lineHeight: 1.3 }}>{sermon.title}</h3>
                                  <div style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.6)' }}>
                                    {sermon.speaker || 'Pastor'} • {sermon.date || 'Reciente'}
                                  </div>
                                </div>
                                <button
                                  onClick={() => setActiveVideoModal({ title: sermon.title, url: sermon.videoUrl || 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' })}
                                  style={{ marginTop: 16, background: 'transparent', border: 'none', padding: 0, display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.84rem', fontWeight: 800, color: a, cursor: 'pointer', textAlign: 'left' }}>
                                  Ver prédica en video →
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </section>
                  ), sIdx)
                }

                case 'donation':
                  return (data.donation || isChurch) ? wrapSection('donation', 1, (
                    <section key="donation" id="wp-donations" className="wp-sec" style={{ background: `linear-gradient(135deg, ${p} 0%, #0B132B 100%)`, color: '#fff', padding: '90px 6%', textAlign: 'center', position: 'relative' }}>
                      <div style={{ maxWidth: 840, margin: '0 auto' }}>
                        <div style={{ width: 56, height: 56, borderRadius: 16, background: `${a}25`, color: a, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', margin: '0 auto 16px' }}>
                          🤲
                        </div>
                        <h2 style={{ fontSize: 'clamp(2rem, 4cqi, 2.8rem)', fontWeight: 900, color: '#fff', marginBottom: 16, letterSpacing: '-0.02em' }}>
                          {data.donation?.title || 'Generosidad que Transforma Vidas'}
                        </h2>
                        <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.85)', maxWidth: 660, margin: '0 auto 32px' }}>
                          {data.donation?.subtitle || 'Tu fidelidad y ofrendas hacen posible apoyar a familias vulnerables, sostener misiones y llevar esperanza a nuestra comunidad.'}
                        </p>
                        <button
                          onClick={() => alert('¡Gracias por tu generosidad! En producción este botón conectará con tu pasarela de ofrendas seguras.')}
                          style={{ padding: '16px 36px', borderRadius: 999, background: a, color: isDark ? '#000' : '#0F172A', fontWeight: 900, fontSize: '1.05rem', border: 'none', cursor: 'pointer', boxShadow: `0 8px 30px ${a}55`, transition: 'transform 0.2s' }}
                          onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                          onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
                          {data.donation?.ctaText || 'Ofrendar / Donar en Línea'}
                        </button>
                        <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', marginTop: 16 }}>
                          {data.donation?.note || 'Donaciones 100% seguras y transparentes. Agradecemos tu corazón generoso.'}
                        </p>
                      </div>
                    </section>
                  ), sIdx) : null

                case 'prayerRequest':
                  return (data.prayerRequest || isChurch) ? wrapSection('prayerRequest', 1, (
                    <section key="prayerRequest" id="wp-prayer" className="wp-sec" style={{ background: isDark ? '#0A0F1E' : '#F8FAFC', padding: '90px 5%', textAlign: 'center' }}>
                      <div style={{ maxWidth: 680, margin: '0 auto', background: isDark ? '#1E293B' : '#FFFFFF', padding: '48px 36px', borderRadius: 28, border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`, boxShadow: '0 12px 40px rgba(0,0,0,0.05)' }}>
                        <span className="wp-sec-lbl">Apoyo & Fe</span>
                        <h2 className="wp-h2" style={{ marginBottom: 12 }}>{data.prayerRequest?.title || '¿Podemos Orar por Ti?'}</h2>
                        <p className="wp-sec-sub" style={{ margin: '0 auto 28px', maxWidth: 520 }}>
                          {data.prayerRequest?.subtitle || 'Nuestro equipo pastoral y de intercesión ora confidencialmente por cada necesidad que recibimos.'}
                        </p>
                        <form onSubmit={e => { e.preventDefault(); alert('¡Petición recibida! Estaremos orando por ti.'); e.target.reset() }} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                          <input required placeholder="Tu Nombre (o anónimo)" style={{ padding: '12px 16px', borderRadius: 12, border: `1.5px solid ${isDark ? 'rgba(255,255,255,0.15)' : '#E2E8F0'}`, background: isDark ? 'rgba(255,255,255,0.05)' : '#fff', color: isDark ? '#fff' : '#0F172A', outline: 'none', fontFamily: 'inherit', fontSize: '0.9rem' }} />
                          <textarea required rows={4} placeholder="Escribe tu motivo o petición de oración aquí..." style={{ padding: '12px 16px', borderRadius: 12, border: `1.5px solid ${isDark ? 'rgba(255,255,255,0.15)' : '#E2E8F0'}`, background: isDark ? 'rgba(255,255,255,0.05)' : '#fff', color: isDark ? '#fff' : '#0F172A', outline: 'none', fontFamily: 'inherit', fontSize: '0.9rem', resize: 'none' }} />
                          <button type="submit" style={{ padding: '14px', borderRadius: 12, background: a, color: isDark ? '#000' : '#0F172A', fontWeight: 800, fontSize: '0.95rem', border: 'none', cursor: 'pointer', boxShadow: `0 4px 16px ${a}44` }}>
                            {data.prayerRequest?.ctaText || 'Enviar Petición de Oración'} →
                          </button>
                        </form>
                      </div>
                    </section>
                  ), sIdx) : null

                case 'hero':
                  return wrapSection('hero', heroV, (
                    <section key="hero" className={`wp-hero ${isChurch ? 'v2' : `v${heroV}`}`} id="wp-hero" style={{ position: 'relative', padding: 0, margin: 0, width: '100%', border: 'none', background: '#0F172A' }}>
                        {isChurch ? (
                          <div style={{ position: 'relative', width: '100%', minHeight: '85vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                            {/* Top Announcement Bar (Branch Life Style) — editable text/color, removable */}
                            {data.announcementBar?.visible !== false ? (
                              <div className={editMode ? 'wp-editable wp-announce-bar' : ''}
                                onClick={editMode ? e => ec(e, { ovKey: 'announce_bar', field: 'announcementBar.text', label: 'Texto y color del anuncio', value: data.announcementBar?.text || '👋 Weekly Check-In: ¿Necesitas oración o dar tu siguiente paso? ¡Estamos para ayudarte!', type: 'text', textColor: ov('announce_bar').textColor || '#0369A1', bgColor: ov('announce_bar').bgColor || '#DBEAFE', fontWeight: ov('announce_bar').fontWeight || 600, applyGlobalDefault: false }) : undefined}
                                style={{
                                position: 'relative', zIndex: 250,
                                background: ov('announce_bar').bgColor || 'linear-gradient(90deg, #E0F2FE 0%, #BAE6FD 100%)',
                                padding: '10px 24px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
                                fontSize: '0.875rem', fontWeight: ov('announce_bar').fontWeight || 600,
                                color: ov('announce_bar').textColor || '#0369A1',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                                flexWrap: 'wrap',
                                width: '100%'
                              }}>
                                <span>
                                  {data.announcementBar?.text || '👋 Weekly Check-In: ¿Necesitas oración o dar tu siguiente paso? ¡Estamos para ayudarte!'}
                                </span>
                                <a href={data.announcementBar?.ctaLink || '#wp-plan-visit'}
                                  className={editMode?'wp-editable':''}
                                  target={data.announcementBar?.ctaLink?.startsWith('http') ? '_blank' : undefined} rel="noreferrer"
                                  onClick={editMode ? e => { e.stopPropagation(); ec(e, { ovKey: 'announce_cta', field: 'announcementBar.ctaText', label: 'Botón del anuncio', value: data.announcementBar?.ctaText || 'Conéctate Ahora', type: 'text', textColor: ov('announce_cta').textColor || '#FFFFFF', bgColor: ov('announce_cta').bgColor || '#0284C7', fontWeight: ov('announce_cta').fontWeight || 800, applyGlobalDefault: false }) } : (data.announcementBar?.ctaLink?.startsWith('http') ? undefined : e => scrollToSection(data.announcementBar?.ctaLink || '#wp-plan-visit', e))}
                                  style={{
                                    padding: '4px 14px', borderRadius: 999, fontWeight: 800, fontSize: '0.78rem', textDecoration: 'none',
                                    background: '#0284C7', color: '#FFF',
                                    ...ost('announce_cta')
                                  }}>
                                  {data.announcementBar?.ctaText || 'Conéctate Ahora'}
                                </a>
                                {editMode && (
                                  <button
                                    onClick={e => { e.stopPropagation(); onSectionChange && onSectionChange('announcementBar.visible', false) }}
                                    title="Quitar barra de anuncio" className="wp-remove-x"
                                    style={{ position: 'absolute', top: 6, right: 8, width: 20, height: 20, borderRadius: 6, border: 'none', background: 'rgba(3,105,161,0.12)', color: '#0369A1', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, lineHeight: 1 }}>
                                    ✕
                                  </button>
                                )}
                              </div>
                            ) : editMode ? (
                              <div style={{ position: 'relative', zIndex: 250, padding: '6px 24px', textAlign: 'center', background: '#F8FAFC' }}>
                                <button
                                  onClick={() => onSectionChange && onSectionChange('announcementBar.visible', true)}
                                  style={{ padding: '4px 14px', borderRadius: 999, border: '1.5px dashed #94A3B8', background: 'transparent', color: '#64748B', fontSize: '0.72rem', fontWeight: 700, cursor: 'pointer' }}>
                                  + Mostrar barra de anuncio
                                </button>
                              </div>
                            ) : null}

                            {/* Full-Bleed Cover Container (Branch Life / Nucleus Full Cover Style) */}
                            <div style={{
                              minHeight: '85vh',
                              padding: '130px 5% 90px',
                              position: 'relative',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              justifyContent: 'center',
                              textAlign: 'center',
                              color: '#FFFFFF',
                              overflow: 'hidden',
                              width: '100%',
                              flex: 1
                            }}>
                              {/* Nav floats transparently on top of the cover photo/video */}
                              {renderNav(true)}

                              {/* Background Image or Video */}
                              {data.heroVideo ? (
                                <video
                                  autoPlay loop muted playsInline
                                  src={data.heroVideo}
                                  className={editMode ? 'wp-editable' : ''}
                                  onClick={editMode ? e => ec(e, { ovKey: 'hero_bg', field: 'heroImage', label: 'Foto / Video de Fondo (Cover)', value: data.heroVideo || data.heroImage || 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=1600&q=85&fit=crop', type: 'image' }) : undefined}
                                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0, cursor: editMode ? 'pointer' : 'default' }}
                                />
                              ) : (
                                <div
                                  className={editMode ? 'wp-editable' : ''}
                                  onClick={editMode ? e => ec(e, { ovKey: 'hero_bg', field: 'heroImage', label: 'Foto de Portada (Cover)', value: data.heroVideo || data.heroImage || 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=1600&q=85&fit=crop', type: 'image' }) : undefined}
                                  style={{
                                    position: 'absolute', inset: 0,
                                    backgroundImage: `url(${data.heroImage || 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=1600&q=85&fit=crop'})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    zIndex: 0
                                  }}
                                />
                              )}

                              {/* Translucent Dark Gradient Overlay for perfect text contrast — pointerEvents:none so clicks reach the photo/video underneath */}
                              <div style={{
                                position: 'absolute', inset: 0,
                                background: 'linear-gradient(180deg, rgba(15,23,42,0.45) 0%, rgba(15,23,42,0.75) 100%)',
                                zIndex: 1, pointerEvents: 'none'
                              }} />

                              {/* In Edit Mode: Floating "Cambiar Foto o Video (Cover)" Button */}
                              {editMode && (
                                <button
                                  onClick={e => ec(e, { ovKey: 'hero_bg', field: 'heroImage', label: 'Foto / Video de Fondo (Cover)', value: data.heroVideo || data.heroImage || 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=1600&q=85&fit=crop', type: 'image' })}
                                  style={{
                                    position: 'absolute', top: 20, right: 20, zIndex: 250,
                                    padding: '8px 16px', borderRadius: 999,
                                    background: 'rgba(255,255,255,0.92)', color: '#0F172A',
                                    border: 'none', fontWeight: 800, fontSize: '0.8125rem',
                                    cursor: 'pointer', boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
                                    display: 'flex', alignItems: 'center', gap: 6
                                  }}
                                >
                                  <span>🎬 / 📸</span> Cambiar Foto o Video de Fondo
                                </button>
                              )}

                              {/* Floating Content Box */}
                              <div style={{ maxWidth: 960, margin: '0 auto', position: 'relative', zIndex: 2 }}>
                                {data.hero?.eyebrow !== '' && (
                                  <div className={editMode ? 'wp-editable' : ''}
                                    onClick={editMode ? e => ec(e, { ovKey: 'hero_eyebrow', field: 'hero.eyebrow', label: 'Horario / Eyebrow', value: data.hero?.eyebrow || (data.churchTemplateVariant === 'nucleus' ? '✦ DOMINGOS 10:30 A.M. ✦' : 'DOMINGOS A LAS 9:00 AM & 11:00 AM'), type: 'text' }) : undefined}
                                    style={data.churchTemplateVariant === 'nucleus' ? {
                                      display: 'inline-flex', alignItems: 'center', gap: 8,
                                      padding: '6px 20px', borderRadius: 999,
                                      background: 'rgba(196, 163, 90, 0.15)',
                                      border: '1px solid rgba(196, 163, 90, 0.45)',
                                      color: '#DFCA88', fontSize: '0.8125rem',
                                      fontWeight: 800, letterSpacing: '0.16em',
                                      textTransform: 'uppercase', marginBottom: 24,
                                      ...ost('hero_eyebrow')
                                    } : {
                                      fontSize: 'clamp(0.85rem, 1.6cqi, 1rem)',
                                      fontWeight: 800, letterSpacing: '0.14em',
                                      textTransform: 'uppercase', color: '#FFFFFF',
                                      marginBottom: 16, textShadow: '0 2px 10px rgba(0,0,0,0.6)',
                                      ...ost('hero_eyebrow')
                                    }}>
                                    {data.hero?.eyebrow || (data.churchTemplateVariant === 'nucleus' ? '✦ DOMINGOS 10:30 A.M. ✦' : 'DOMINGOS A LAS 9:00 AM & 11:00 AM')}
                                  </div>
                                )}

                                <h1 className={editMode ? 'wp-editable' : ''}
                                  onClick={editMode ? e => ec(e, { ovKey: 'hero_h1', field: 'hero.headline', label: 'Título principal', value: data.hero?.headline, type: 'text' }) : undefined}
                                  style={{
                                    fontFamily: data.churchTemplateVariant === 'nucleus' ? "'Playfair Display', Georgia, serif" : fontStack(font),
                                    fontSize: 'clamp(2.8rem, 6.2cqi, 4.8rem)',
                                    fontWeight: data.churchTemplateVariant === 'nucleus' ? 900 : 900,
                                    color: '#FFFFFF',
                                    letterSpacing: data.churchTemplateVariant === 'nucleus' ? '-0.02em' : '-0.03em',
                                    lineHeight: 1.1,
                                    marginBottom: 20,
                                    textShadow: '0 4px 24px rgba(0,0,0,0.5)',
                                    ...ost('hero_h1')
                                  }}>
                                  {data.hero?.headline || (data.churchTemplateVariant === 'nucleus' ? 'Encuentra a Dios como nunca antes' : 'Una comunidad donde sentirte en casa')}
                                </h1>

                                <p className={editMode ? 'wp-editable' : ''}
                                  onClick={editMode ? e => ec(e, { ovKey: 'hero_sub', field: 'hero.subheadline', label: 'Subtítulo', value: data.hero?.subheadline, type: 'textarea' }) : undefined}
                                  style={{
                                    fontFamily: fontStack(font),
                                    fontSize: 'clamp(1.05rem, 2.2cqi, 1.25rem)',
                                    color: 'rgba(255,255,255,0.92)',
                                    lineHeight: 1.6,
                                    maxWidth: 680,
                                    margin: '0 auto 38px',
                                    fontWeight: 400,
                                    textShadow: '0 2px 12px rgba(0,0,0,0.5)',
                                    ...ost('hero_sub')
                                  }}>
                                  {data.hero?.subheadline || (data.churchTemplateVariant === 'nucleus' ? 'Un lugar para encontrarte con Dios, conectar con personas reales y vivir con propósito eterno.' : 'Aviva tu fe, conecta con otros y crece en Jesús en un ambiente cálido para ti y tu familia.')}
                                </p>

                                {/* Buttons: Pill style for MyGateway, Tracked Luxury for Nucleus */}
                                <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
                                  {data.hero?.ctaText !== '' ? (
                                    <a href={data.hero?.ctaLink || '#wp-plan-visit'} target={data.hero?.ctaLink?.startsWith('http') ? '_blank' : undefined} rel="noreferrer"
                                      className={editMode?'wp-editable wp-hero-cta':'wp-hero-cta'}
                                      onClick={editMode ? e => ec(e, { ovKey: 'hero_cta_p', field: 'hero.ctaText', label: 'Botón principal', value: data.hero?.ctaText || 'Planifica tu Visita', type: 'text', textColor: ov('hero_cta_p').textColor || (data.churchTemplateVariant === 'nucleus' ? '#0A0A0F' : '#0F172A'), bgColor: ov('hero_cta_p').bgColor || (data.churchTemplateVariant === 'nucleus' ? '#C4A35A' : '#FFFFFF'), fontWeight: ov('hero_cta_p').fontWeight || 900, applyGlobalDefault: false }) : (data.hero?.ctaLink?.startsWith('http') ? undefined : e => scrollToSection(data.hero?.ctaLink || '#wp-plan-visit', e))}
                                      style={data.churchTemplateVariant === 'nucleus' ? {
                                        fontFamily: fontStack(font),
                                        padding: '16px 36px', borderRadius: 999,
                                        background: '#C4A35A', color: '#0A0A0F',
                                        fontWeight: 900, fontSize: '0.875rem',
                                        letterSpacing: '0.12em', textTransform: 'uppercase',
                                        textAlign: 'center', textDecoration: 'none',
                                        boxShadow: '0 6px 24px rgba(196,163,90,0.4)',
                                        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                                        position: 'relative',
                                        ...ost('hero_cta_p')
                                      } : {
                                        fontFamily: fontStack(font),
                                        padding: '16px 36px', borderRadius: 999,
                                        background: '#FFFFFF', color: '#0F172A',
                                        fontWeight: 800, fontSize: '1rem',
                                        textAlign: 'center', textDecoration: 'none',
                                        boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                                        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                                        position: 'relative',
                                        ...ost('hero_cta_p')
                                      }}>
                                      {data.hero?.ctaText || (data.churchTemplateVariant === 'nucleus' ? 'PLANIFICA TU VISITA' : 'Planifica tu Visita')}
                                      {editMode && (
                                        <span onClick={e => { e.preventDefault(); e.stopPropagation(); onSectionChange && onSectionChange('hero.ctaText', '') }}
                                          title="Quitar botón" className="wp-remove-x"
                                          style={{ position: 'absolute', top: -8, right: -8, width: 20, height: 20, borderRadius: '50%', background: '#0F172A', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, cursor: 'pointer' }}>
                                          ✕
                                        </span>
                                      )}
                                    </a>
                                  ) : editMode ? (
                                    <button onClick={() => onSectionChange && onSectionChange('hero.ctaText', 'Planifica tu Visita')}
                                      style={{ padding: '16px 36px', borderRadius: 999, border: '2px dashed rgba(255,255,255,0.45)', background: 'transparent', color: 'rgba(255,255,255,0.75)', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer' }}>
                                      + Agregar botón
                                    </button>
                                  ) : null}

                                  {data.hero?.ctaSecondary !== '' ? (
                                    <a href={data.hero?.ctaSecondaryLink || '#wp-next-steps'} target={data.hero?.ctaSecondaryLink?.startsWith('http') ? '_blank' : undefined} rel="noreferrer"
                                      className={editMode?'wp-editable wp-hero-cta':'wp-hero-cta'}
                                      onClick={editMode ? e => ec(e, { ovKey: 'hero_cta_s', field: 'hero.ctaSecondary', label: 'Botón secundario', value: data.hero?.ctaSecondary || 'Qué está pasando', type: 'text', textColor: ov('hero_cta_s').textColor || (data.churchTemplateVariant === 'nucleus' ? '#DFCA88' : '#FFFFFF'), bgColor: ov('hero_cta_s').bgColor || 'transparent', fontWeight: ov('hero_cta_s').fontWeight || 800, applyGlobalDefault: false }) : (data.hero?.ctaSecondaryLink?.startsWith('http') ? undefined : e => scrollToSection(data.hero?.ctaSecondaryLink || '#wp-next-steps', e))}
                                      style={data.churchTemplateVariant === 'nucleus' ? {
                                        fontFamily: fontStack(font),
                                        padding: '16px 36px', borderRadius: 999,
                                        background: 'rgba(10,10,15,0.75)', color: '#DFCA88',
                                        border: '1.5px solid rgba(196,163,90,0.6)',
                                        fontWeight: 800, fontSize: '0.875rem',
                                        letterSpacing: '0.12em', textTransform: 'uppercase',
                                        textAlign: 'center', textDecoration: 'none',
                                        boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
                                        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                                        position: 'relative',
                                        ...ost('hero_cta_s')
                                      } : {
                                        fontFamily: fontStack(font),
                                        padding: '16px 36px', borderRadius: 999,
                                        background: 'rgba(15,23,42,0.6)', color: '#FFFFFF',
                                        border: '1.5px solid rgba(255,255,255,0.6)',
                                        fontWeight: 800, fontSize: '1rem',
                                        textAlign: 'center', textDecoration: 'none',
                                        boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
                                        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                                        position: 'relative',
                                        ...ost('hero_cta_s')
                                      }}>
                                      {data.hero?.ctaSecondary || (data.churchTemplateVariant === 'nucleus' ? 'INVOLÚCRATE' : 'Qué está pasando')}
                                      {editMode && (
                                        <span onClick={e => { e.preventDefault(); e.stopPropagation(); onSectionChange && onSectionChange('hero.ctaSecondary', '') }}
                                          title="Quitar botón" className="wp-remove-x"
                                          style={{ position: 'absolute', top: -8, right: -8, width: 20, height: 20, borderRadius: '50%', background: '#0F172A', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, cursor: 'pointer' }}>
                                          ✕
                                        </span>
                                      )}
                                    </a>
                                  ) : editMode ? (
                                    <button onClick={() => onSectionChange && onSectionChange('hero.ctaSecondary', 'Qué está pasando')}
                                      style={{ padding: '16px 36px', borderRadius: 999, border: '2px dashed rgba(255,255,255,0.45)', background: 'transparent', color: 'rgba(255,255,255,0.75)', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer' }}>
                                      + Agregar botón
                                    </button>
                                  ) : null}
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <>
                        {heroV === 2 && (
                          <div className="wp-hero-bg rev">
                            <img src={getHeroPhoto(data)} alt={biz} loading="eager" className={editMode?'wp-editable':''} onClick={editMode?e=>ec(e,{field:'heroImage',label:'Imagen Principal',value:getHeroPhoto(data),type:'image'}):undefined} />
                          </div>
                        )}

                        {heroV === 4 && (
                          <>
                            <div className="wp-hero-left">
                              <div className="wp-badge">
                                <span className="wp-badge-dot" />
                                <span className="wp-badge-t">Garantía de Satisfacción</span>
                              </div>
                              <h1 className={editMode?'wp-h1 wp-editable':'wp-h1'}
                                onClick={editMode?e=>ec(e,{ovKey:'hero_h1',field:'hero.headline',label:'Título principal',value:data.hero?.headline,type:'text',textColor:ov('hero_h1').textColor||'#ffffff',bgColor:ov('hero_h1').bgColor,fontWeight:ov('hero_h1').fontWeight||900}):undefined}
                                style={ost('hero_h1')}>
                                {data.hero?.headline||'Potenciamos tu presencia digital'}
                              </h1>
                              <p className={editMode?'wp-sub wp-editable':'wp-sub'}
                                onClick={editMode?e=>ec(e,{ovKey:'hero_sub',field:'hero.subheadline',label:'Subtítulo',value:data.hero?.subheadline,type:'textarea',textColor:ov('hero_sub').textColor||'#EEF2FF',bgColor:ov('hero_sub').bgColor,fontWeight:ov('hero_sub').fontWeight||400}):undefined}
                                style={ost('hero_sub')}>
                                {data.hero?.subheadline||'Creamos páginas web de alto impacto diseñadas para convertir visitas en clientes reales.'}
                              </p>
                              <div className="wp-btns">
                                <a href={data.hero?.ctaLink||'#wp-contact'} target={data.hero?.ctaLink?.startsWith('http')?'_blank':undefined}
                                  className={editMode?'wp-btn-p wp-editable':'wp-btn-p'} rel="noreferrer"
                                  onClick={editMode?e=>ec(e,{ovKey:'hero_cta_p',field:'hero.ctaText',label:'Botón primario',value:data.hero?.ctaText,type:'text',textColor:ov('hero_cta_p').textColor||'#000000',bgColor:ov('hero_cta_p').bgColor||a,fontWeight:ov('hero_cta_p').fontWeight||800}):(data.hero?.ctaLink?.startsWith('http') ? undefined : e=>scrollToSection(data.hero?.ctaLink||'#wp-contact',e))}
                                  style={ost('hero_cta_p')}>
                                  {data.hero?.ctaText||'Empezar ahora'}
                                </a>
                                <a href={data.hero?.ctaSecondaryLink||'#wp-services'} target={data.hero?.ctaSecondaryLink?.startsWith('http')?'_blank':undefined}
                                  className={editMode?'wp-btn-g wp-editable':'wp-btn-g'} rel="noreferrer"
                                  onClick={editMode?e=>ec(e,{ovKey:'hero_cta_s',field:'hero.ctaSecondary',label:'Botón secundario',value:data.hero?.ctaSecondary||'Ver servicios',type:'text',textColor:ov('hero_cta_s').textColor||'#ffffff',bgColor:ov('hero_cta_s').bgColor,fontWeight:ov('hero_cta_s').fontWeight||800}):(data.hero?.ctaSecondaryLink?.startsWith('http') ? undefined : e=>scrollToSection(data.hero?.ctaSecondaryLink||'#wp-services',e))}
                                  style={ost('hero_cta_s')}>
                                  {data.hero?.ctaSecondary||'Ver servicios'}
                                </a>
                              </div>
                              <div className="wp-stats">
                                {(data.stats || [{ value: '500+', label: 'Clientes' },{ value: '98%',  label: 'Satisfacción' }]).map((st, i) => (
                                  <div key={i}><div className="wp-stat-v">{st.value}</div><div className="wp-stat-l">{st.label}</div></div>
                                ))}
                              </div>
                            </div>
                            <div className="wp-hero-right rev" style={{ transitionDelay: '0.15s' }}>
                              <img src={getHeroPhoto(data)} alt={biz} className={editMode?'wp-editable':''} onClick={editMode?e=>ec(e,{field:'heroImage',label:'Imagen Principal',value:getHeroPhoto(data),type:'image'}):undefined} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                            </div>
                          </>
                        )}

                        {heroV !== 4 && (
                        <div className="wp-hero-content">
                          <div className="wp-hero-txt">
                            <div className="wp-badge">
                              <span className="wp-badge-dot" />
                              <span className="wp-badge-t">{data.tagline||'PRESENCIA PROFESIONAL'}</span>
                            </div>
                            {heroV === 3 && <div className="wp-divider" />}
                            <h1 className={editMode?'wp-h1 wp-editable':'wp-h1'}
                              onClick={editMode?e=>ec(e,{ovKey:'hero_h1',field:'hero.headline',label:'Título principal',value:data.hero?.headline,type:'text',textColor:ov('hero_h1').textColor||p,bgColor:ov('hero_h1').bgColor,fontWeight:ov('hero_h1').fontWeight||900}):undefined}
                              style={ost('hero_h1')}>
                              {data.hero?.headline||'Diseño web inteligente'}
                            </h1>
                            <p className={editMode?'wp-sub wp-editable':'wp-sub'}
                              onClick={editMode?e=>ec(e,{ovKey:'hero_sub',field:'hero.subheadline',label:'Subtítulo',value:data.hero?.subheadline,type:'textarea',textColor:ov('hero_sub').textColor||'#6B7280',bgColor:ov('hero_sub').bgColor,fontWeight:ov('hero_sub').fontWeight||400}):undefined}
                              style={ost('hero_sub')}>
                              {data.hero?.subheadline||'Creamos la presencia online que tu marca merece, optimizada para velocidad y SEO.'}
                            </p>
                            <div className="wp-btns">
                              <a href={data.hero?.ctaLink||'#wp-contact'} target={data.hero?.ctaLink?.startsWith('http')?'_blank':undefined}
                                className={editMode?'wp-btn-p wp-editable':'wp-btn-p'} rel="noreferrer"
                                onClick={editMode?e=>ec(e,{ovKey:'hero_cta_p',field:'hero.ctaText',label:'Botón primario',value:data.hero?.ctaText,type:'text',textColor:ov('hero_cta_p').textColor||'#ffffff',bgColor:ov('hero_cta_p').bgColor||a,fontWeight:ov('hero_cta_p').fontWeight||800}):(data.hero?.ctaLink?.startsWith('http') ? undefined : e=>scrollToSection(data.hero?.ctaLink||'#wp-contact',e))}
                                style={ost('hero_cta_p')}>
                                {data.hero?.ctaText||'Empezar ahora'}
                              </a>
                              <a href={data.hero?.ctaSecondaryLink||'#wp-services'} target={data.hero?.ctaSecondaryLink?.startsWith('http')?'_blank':undefined}
                                className={editMode?'wp-btn-g wp-editable':'wp-btn-g'} rel="noreferrer"
                                onClick={editMode?e=>ec(e,{ovKey:'hero_cta_s',field:'hero.ctaSecondary',label:'Botón secundario',value:data.hero?.ctaSecondary||'Ver más',type:'text',textColor:ov('hero_cta_s').textColor||(heroV===2?'#fff':p),bgColor:ov('hero_cta_s').bgColor,fontWeight:ov('hero_cta_s').fontWeight||800}):(data.hero?.ctaSecondaryLink?.startsWith('http') ? undefined : e=>scrollToSection(data.hero?.ctaSecondaryLink||'#wp-services',e))}
                                style={ost('hero_cta_s')}>
                                {data.hero?.ctaSecondary||'Ver más'}
                              </a>
                            </div>
                            {(heroV === 2 || heroV === 3) && (
                              <div className="wp-stats">
                                {(data.stats || [{ value: '500+', label: 'Clientes' },{ value: '98%',  label: 'Satisfacción' }]).map((st, i) => (
                                  <div key={i}><div className="wp-stat-v">{st.value}</div><div className="wp-stat-l">{st.label}</div></div>
                                ))}
                              </div>
                            )}
                          </div>
                          {heroV === 1 && (
                            <div className="wp-hero-img-w rev" style={{ transitionDelay: '0.2s' }}>
                              <img src={getHeroPhoto(data)} alt={biz} loading="eager" className={editMode?'wp-editable':''} onClick={editMode?e=>ec(e,{field:'heroImage',label:'Imagen Principal',value:getHeroPhoto(data),type:'image'}):undefined} />
                            </div>
                          )}
                        </div>
                        )}
                        {heroV === 1 && (
                          <div className="wp-hero-content" style={{ marginTop: '-40px' }}>
                            <div className="wp-stats" style={{ width: '100%' }}>
                              {(data.stats || [{ value: '500+', label: 'Clientes' },{ value: '98%',  label: 'Satisfacción' }]).map((st, i) => (
                                <div key={i}><div className="wp-stat-v">{st.value}</div><div className="wp-stat-l">{st.label}</div></div>
                              ))}
                            </div>
                          </div>
                        )}
                        </>
                        )}
                      </section>
                  ), sIdx)

                case 'services':
                  return wrapSection('services', servicesV, (
                    <section key="services" className="wp-sec" id="wp-services" style={{ textAlign:'center', padding: servicesV === 4 ? '100px 0' : undefined, position: 'relative' }}>
                      <div style={servicesV === 4 ? {padding:'0 5%'} : {}}>
                        <div className="wp-sec-lbl">{data.servicesLabel||'Nuestros Servicios'}</div>
                        <h2 className={editMode?'wp-h2 wp-editable':'wp-h2'}
                          onClick={editMode?e=>ec(e,{ovKey:'services_h2',field:'servicesTitle',label:'Título de servicios',value:data.servicesTitle||'Lo que hacemos mejor',type:'text',textColor:ov('services_h2').textColor||p,bgColor:ov('services_h2').bgColor,fontWeight:ov('services_h2').fontWeight||900}):undefined}
                          style={ost('services_h2')}>
                          {data.servicesTitle||'Lo que hacemos mejor'}
                        </h2>
                        <p className="wp-sec-sub">{data.servicesSubtitle||'Soluciones pensadas para tu negocio.'}</p>
                      </div>
                      {servicesV === 4 ? (
                        <div className="wp-grid.v4-outer">
                          <div className="wp-grid v4">
                            {(data.services||[]).map((sv,i)=>(
                              <div className="wp-scard" key={i}>
                                <div className="wp-sicon-wrap-col">
                                  <div className="wp-sicon-wrap">{getIcon({...sv,_idx:i})}</div>
                                </div>
                                <div className="wp-stext-col">
                                  <h3 className="wp-s-h3">{sv.title}</h3>
                                  <p className="wp-s-p">{sv.description}</p>
                                  <div className="wp-s-more">{sv.cta||'Saber más'} &rarr;</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className={`wp-grid v${servicesV}`}>
                          {(data.services||[]).map((sv,i)=>{
                            const tKey = `service_${i}_title`
                            const dKey = `service_${i}_desc`
                            return (
                              <div className="wp-scard" key={i}>
                                <div className="wp-sicon-wrap">
                                  {getIcon({ ...sv, _idx: i })}
                                </div>
                                {servicesV === 2 ? (
                                  <div>
                                    <h3 className={editMode?'wp-s-h3 wp-editable':'wp-s-h3'} onClick={editMode?e=>ec(e,{ovKey:tKey,field:`services.${i}.title`,label:`Servicio ${i+1}: Título`,value:sv.title,type:'text',textColor:ov(tKey).textColor||p,bgColor:ov(tKey).bgColor,fontWeight:ov(tKey).fontWeight||800}):undefined} style={ost(tKey)}>{sv.title}</h3>
                                    <p className={editMode?'wp-s-p wp-editable':'wp-s-p'} onClick={editMode?e=>ec(e,{ovKey:dKey,field:`services.${i}.description`,label:`Servicio ${i+1}: Descripción`,value:sv.description,type:'textarea',textColor:ov(dKey).textColor||'#6B7280',bgColor:ov(dKey).bgColor,fontWeight:ov(dKey).fontWeight||400}):undefined} style={ost(dKey)}>{sv.description}</p>
                                    <div className="wp-s-more">{sv.cta||'Saber más'} &rarr;</div>
                                  </div>
                                ) : (
                                  <>
                                    <h3 className={editMode?'wp-s-h3 wp-editable':'wp-s-h3'} onClick={editMode?e=>ec(e,{ovKey:tKey,field:`services.${i}.title`,label:`Servicio ${i+1}: Título`,value:sv.title,type:'text',textColor:ov(tKey).textColor||p,bgColor:ov(tKey).bgColor,fontWeight:ov(tKey).fontWeight||800}):undefined} style={ost(tKey)}>{sv.title}</h3>
                                    <p className={editMode?'wp-s-p wp-editable':'wp-s-p'} onClick={editMode?e=>ec(e,{ovKey:dKey,field:`services.${i}.description`,label:`Servicio ${i+1}: Descripción`,value:sv.description,type:'textarea',textColor:ov(dKey).textColor||'#6B7280',bgColor:ov(dKey).bgColor,fontWeight:ov(dKey).fontWeight||400}):undefined} style={ost(dKey)}>{sv.description}</p>
                                    <div className="wp-s-more">{sv.cta||'Saber más'} &rarr;</div>
                                  </>
                                )}
                              </div>
                            )
                          })}
                        </div>
                      )}
                    </section>
                  ), sIdx)

                case 'about':
                  return data.about ? wrapSection('about', aboutV, (
                    <section key="about" className="wp-sec" id="wp-nosotros" style={{ position: 'relative' }}>

                      {aboutV === 2 && (
                        <div style={{ maxWidth: 860, margin: '0 auto', textAlign: 'center' }}>
                          <div className="wp-sec-lbl">{data.about?.sectionLabel||'Sobre nosotros'}</div>
                          <h2 className={editMode?'wp-h2 wp-editable':'wp-h2'}
                            onClick={editMode?e=>ec(e,{ovKey:'about_h2',field:'about.title',label:'Título “Sobre nosotros”',value:data.about.title,type:'text',textColor:ov('about_h2').textColor||p,bgColor:ov('about_h2').bgColor,fontWeight:ov('about_h2').fontWeight||900}):undefined}
                            style={ost('about_h2')}>
                            {data.about.title}
                          </h2>
                          <p className={editMode?'wp-a-sub wp-editable':'wp-a-sub'}
                            onClick={editMode?e=>ec(e,{ovKey:'about_text',field:'about.text',label:'Texto “Sobre nosotros”',value:data.about.text,type:'textarea',textColor:ov('about_text').textColor||'#4B5563',bgColor:ov('about_text').bgColor,fontWeight:ov('about_text').fontWeight||400}):undefined}
                            style={{ ...ost('about_text'), maxWidth: 680, margin: '0 auto 36px' }}>
                            {data.about.text}
                          </p>
                          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 36 }}>
                            {(data.about?.highlights?.length
                              ? data.about.highlights
                              : ['Calidad garantizada','Atención personalizada','Experiencia comprobada']
                            ).map(b=>(
                              <div key={b} style={{ background: `${a}10`, padding: '8px 20px', borderRadius: 99, fontSize: '.85rem', fontWeight: 600, color: p }}>
                                ✓ {b}
                              </div>
                            ))}
                          </div>
                          <a href="#wp-contact"
                            className={editMode?'wp-btn-p wp-editable':'wp-btn-p'}
                            style={{ display:'inline-flex', margin: '0 auto', ...ost('about_cta') }}
                            onClick={editMode?e=>ec(e,{ovKey:'about_cta',field:'about.ctaText',label:'Botón “Sobre nosotros”',value:data.about?.ctaText||'Contáctanos',type:'text',textColor:ov('about_cta').textColor||'#ffffff',bgColor:ov('about_cta').bgColor||a,fontWeight:ov('about_cta').fontWeight||800}):e=>scrollToSection('#wp-contact',e)}>
                            {data.about?.ctaText||'Contáctanos'} &rarr;
                          </a>
                        </div>
                      )}

                      {aboutV === 3 && (
                        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 48, maxWidth: 1240, margin: '0 auto', alignItems: 'center' }}>
                          <div>
                            <div className="wp-sec-lbl">{data.about?.sectionLabel||'Sobre nosotros'}</div>
                            <h2 className={editMode?'wp-h2 wp-editable':'wp-h2'} style={{ textAlign:'left', ...ost('about_h2') }}
                              onClick={editMode?e=>ec(e,{ovKey:'about_h2',field:'about.title',label:'Título “Sobre nosotros”',value:data.about.title,type:'text',textColor:ov('about_h2').textColor||p,bgColor:ov('about_h2').bgColor,fontWeight:ov('about_h2').fontWeight||900}):undefined}>
                              {data.about.title}
                            </h2>
                            <p className={editMode?'wp-a-sub wp-editable':'wp-a-sub'}
                              onClick={editMode?e=>ec(e,{ovKey:'about_text',field:'about.text',label:'Texto “Sobre nosotros”',value:data.about.text,type:'textarea',textColor:ov('about_text').textColor||'#4B5563',bgColor:ov('about_text').bgColor,fontWeight:ov('about_text').fontWeight||400}):undefined}
                              style={ost('about_text')}>
                              {data.about.text}
                            </p>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 24, marginBottom: 32 }}>
                              <div style={{ padding: '16px', background: `${a}08`, borderRadius: 12, border: `1px solid ${a}15` }}>
                                <div style={{ fontSize: '1.6rem', fontWeight: 900, color: a }}>{data.about?.badge?.value||'500+'}</div>
                                <div style={{ fontSize: '.75rem', fontWeight: 700, color: p, textTransform: 'uppercase', marginTop: 4 }}>{data.about?.badge?.label||'Clientes'}</div>
                              </div>
                              <div style={{ padding: '16px', background: `${p}08`, borderRadius: 12, border: `1px solid ${p}15` }}>
                                <div style={{ fontSize: '1.6rem', fontWeight: 900, color: p }}>100%</div>
                                <div style={{ fontSize: '.75rem', fontWeight: 700, color: a, textTransform: 'uppercase', marginTop: 4 }}>Garantizado</div>
                              </div>
                            </div>
                            <a href="#wp-contact"
                              className={editMode?'wp-btn-p wp-editable':'wp-btn-p'}
                              style={{ display:'inline-flex', ...ost('about_cta') }}
                              onClick={editMode?e=>ec(e,{ovKey:'about_cta',field:'about.ctaText',label:'Botón “Sobre nosotros”',value:data.about?.ctaText||'Contáctanos',type:'text',textColor:ov('about_cta').textColor||'#ffffff',bgColor:ov('about_cta').bgColor||a,fontWeight:ov('about_cta').fontWeight||800}):e=>scrollToSection('#wp-contact',e)}>
                              {data.about?.ctaText||'Contáctanos'}
                            </a>
                          </div>
                          <div>
                            <img className={editMode?'wp-img wp-editable':'wp-img'} src={getAboutPhoto(data)} alt="Nosotros" loading="lazy" onClick={editMode?e=>ec(e,{field:'about.image',label:'Imagen Nosotros',value:getAboutPhoto(data),type:'image'}):undefined} style={{ maxHeight: 480, width: '100%', objectFit: 'cover', borderRadius: 20 }} />
                          </div>
                        </div>
                      )}

                      {aboutV === 4 && (
                        <div style={{ position: 'relative', borderRadius: 28, overflow: 'hidden', minHeight: 520, display: 'flex', alignItems: 'center', justifyContent: 'flex-start', padding: '60px 8%' }}>
                          <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                            <img src={getAboutPhoto(data)} alt="Nosotros" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.15) 100%)' }} />
                          </div>
                          <div style={{ position: 'relative', zIndex: 1, maxWidth: 560, background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 24, padding: '40px', color: '#fff' }}>
                            <div className="wp-sec-lbl" style={{ background: `${a}30`, color: '#fff', borderColor: 'rgba(255,255,255,0.2)' }}>{data.about?.sectionLabel||'Sobre nosotros'}</div>
                            <h2 className={editMode?'wp-h2 wp-editable':'wp-h2'} style={{ color: '#fff', textAlign:'left', ...ost('about_h2') }}
                              onClick={editMode?e=>ec(e,{ovKey:'about_h2',field:'about.title',label:'Título “Sobre nosotros”',value:data.about.title,type:'text',textColor:ov('about_h2').textColor||'#ffffff',bgColor:ov('about_h2').bgColor,fontWeight:ov('about_h2').fontWeight||900}):undefined}>
                              {data.about.title}
                            </h2>
                            <p className={editMode?'wp-a-sub wp-editable':'wp-a-sub'}
                              onClick={editMode?e=>ec(e,{ovKey:'about_text',field:'about.text',label:'Texto “Sobre nosotros”',value:data.about.text,type:'textarea',textColor:ov('about_text').textColor||'#E4E4E7',bgColor:ov('about_text').bgColor,fontWeight:ov('about_text').fontWeight||400}):undefined}
                              style={{ color: 'rgba(255,255,255,0.85)', ...ost('about_text') }}>
                              {data.about.text}
                            </p>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 10, margin: '24px 0 28px' }}>
                              {(data.about?.highlights?.length
                                ? data.about.highlights
                                : ['Calidad premium e innovación','Servicio de alta confiabilidad']
                              ).map(b=>(
                                <div key={b} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '.9rem' }}>
                                  <span style={{ color: a, fontWeight: 900 }}>✓</span> {b}
                                </div>
                              ))}
                            </div>
                            <a href="#wp-contact"
                              className={editMode?'wp-btn-p wp-editable':'wp-btn-p'}
                              style={{ display:'inline-flex', background: a, color: '#000', ...ost('about_cta') }}
                              onClick={editMode?e=>ec(e,{ovKey:'about_cta',field:'about.ctaText',label:'Botón “Sobre nosotros”',value:data.about?.ctaText||'Contáctanos',type:'text',textColor:ov('about_cta').textColor||'#000000',bgColor:ov('about_cta').bgColor||a,fontWeight:ov('about_cta').fontWeight||800}):e=>scrollToSection('#wp-contact',e)}>
                              {data.about?.ctaText||'Contáctanos'}
                            </a>
                          </div>
                        </div>
                      )}

                      {aboutV === 1 && (
                        <div className="wp-about">
                          <div className="wp-img-w">
                            <img className={editMode?'wp-img wp-editable':'wp-img'} src={getAboutPhoto(data)} alt="Nosotros" loading="lazy" onClick={editMode?e=>ec(e,{field:'about.image',label:'Imagen Nosotros',value:getAboutPhoto(data),type:'image'}):undefined} />
                            <div className="wp-abnd">
                              <div className="wp-abnd-ic">★</div>
                              <div>
                                <div className="wp-abnd-v">{data.about?.badge?.value||'500+'}</div>
                                <div className="wp-abnd-l">{data.about?.badge?.label||'Clientes satisfechos'}</div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <div className="wp-sec-lbl">{data.about?.sectionLabel||'Sobre nosotros'}</div>
                            <h2 className={editMode?'wp-h2 wp-editable':'wp-h2'} style={{ textAlign:'left', ...ost('about_h2') }}
                              onClick={editMode?e=>ec(e,{ovKey:'about_h2',field:'about.title',label:'Título “Sobre nosotros”',value:data.about.title,type:'text',textColor:ov('about_h2').textColor||p,bgColor:ov('about_h2').bgColor,fontWeight:ov('about_h2').fontWeight||900}):undefined}>
                              {data.about.title}
                            </h2>
                            <p className={editMode?'wp-a-sub wp-editable':'wp-a-sub'}
                              onClick={editMode?e=>ec(e,{ovKey:'about_text',field:'about.text',label:'Texto “Sobre nosotros”',value:data.about.text,type:'textarea',textColor:ov('about_text').textColor||'#4B5563',bgColor:ov('about_text').bgColor,fontWeight:ov('about_text').fontWeight||400}):undefined}
                              style={ost('about_text')}>
                              {data.about.text}
                            </p>
                            <div className="wp-checks">
                              {(data.about?.highlights?.length
                                ? data.about.highlights
                                : ['Calidad garantizada en cada producto','Atención personalizada','Experiencia comprobada','Compromiso con el cliente']
                              ).map(b=>(
                                <div className="wp-check" key={b}>
                                  <div className="wp-ck-dot">✓</div>
                                  <span className="wp-ck-t">{b}</span>
                                </div>
                              ))}
                            </div>
                            <a href="#wp-contact"
                              className={editMode?'wp-btn-p wp-editable':'wp-btn-p'}
                              style={{ display:'inline-flex', ...ost('about_cta') }}
                              onClick={editMode?e=>ec(e,{ovKey:'about_cta',field:'about.ctaText',label:'Botón “Sobre nosotros”',value:data.about?.ctaText||'Hablar con un experto',type:'text',textColor:ov('about_cta').textColor||'#ffffff',bgColor:ov('about_cta').bgColor||a,fontWeight:ov('about_cta').fontWeight||800}):e=>scrollToSection('#wp-contact',e)}>
                              {data.about?.ctaText||'Contáctanos'} →
                            </a>
                          </div>
                        </div>
                      )}
                    </section>
                  ), sIdx) : null

                case 'gallery':
                  return data.heroImageQuery ? (
                    <section key="gallery" className="wp-sec" id="wp-galeria" style={{ padding:'90px 4%' }}>
                      <div className="wp-sec-lbl">Galería</div>
                      <h2 className="wp-h2" style={{ marginBottom:48 }}>{data.galleryTitle||'Conoce nuestro trabajo'}</h2>
                      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:24, maxWidth:1100, margin:'0 auto' }}>
                        {getGalleryPhotos(data).map((src,i) => (
                          <div key={i} className="wp-gal-card">
                            <img src={src} alt="gallery" loading="lazy" className={editMode?'wp-editable':''}
                              onClick={editMode?e=>{e.stopPropagation(); ec(e,{field:`galleryPhotos.${i}`,label:`Imagen Galería ${i+1}`,value:src,type:'image'})}:undefined}
                              style={{ width:'100%', height:'100%', objectFit:'cover', display:'block', transition:'transform .4s' }}
                              onMouseOver={e=>e.currentTarget.style.transform='scale(1.06)'}
                              onMouseOut={e=>e.currentTarget.style.transform='scale(1)'}
                            />
                          </div>
                        ))}
                      </div>
                    </section>
                  ) : null

                case 'team':
                  return data.team?.length > 0 ? (
                    <section key="team" className="wp-sec" id="wp-equipo" style={{ textAlign:'center' }}>
                      <div className="wp-sec-lbl">Nuestro Equipo</div>
                      <h2 className="wp-h2">{data.teamTitle||'Conoce a nuestros Especialistas'}</h2>
                      <div className="wp-team-grid">
                        {data.team.map((mbr,i)=>(
                          <div key={i} className="wp-team-card">
                            <div className="wp-team-ic">{mbr.icon || '👨‍🦱'}</div>
                            <div style={{ fontSize:'1.4rem', fontWeight:800, marginBottom:8 }}>{mbr.name}</div>
                            <div style={{ fontSize:'.95rem', opacity:0.8, marginBottom:32, fontWeight:500, letterSpacing:'0.03em', textTransform:'uppercase' }}>{mbr.role}</div>
                            {mbr.ctaLink && (
                              <a href={mbr.ctaLink} target="_blank" rel="noopener noreferrer" className="wp-btn-p" style={{ width:'100%', padding:'16px' }}>
                                {mbr.ctaText || 'Reservar Cita'}
                              </a>
                            )}
                          </div>
                        ))}
                      </div>
                    </section>
                  ) : null

                case 'beforeAfter':
                  return data.beforeAfter?.length > 0 ? (
                    <section key="beforeAfter" className="wp-sec" id="wp-resultados" style={{ textAlign:'center' }}>
                      <div className="wp-sec-lbl">Transformaciones</div>
                      <h2 className="wp-h2">{data.beforeAfterTitle||'Antes y Después'}</h2>
                      <p className="wp-sec-sub" style={{marginBottom:48}}>{data.beforeAfterSubtitle||'Resultados reales de nuestros clientes.'}</p>
                      <div className="wp-ba-grid">
                        {data.beforeAfter.map((ba,i)=>(
                          <div key={i} className="wp-ba-card">
                            <div style={{ display:'flex', height:280 }}>
                              <div style={{ flex:1, position:'relative', borderRight:`2px solid ${isDark?'#333':'#fff'}` }}>
                                <div style={{ position:'absolute', top:12, left:12, background:'rgba(0,0,0,.7)', color:'#fff', padding:'4px 12px', borderRadius:8, fontSize:'.7rem', fontWeight:800, backdropFilter:'blur(4px)', zIndex:2 }}>Antes</div>
                                <img src={ba.before} alt="Antes" loading="lazy" className={editMode?'wp-editable':''} onClick={editMode?e=>ec(e,{field:`beforeAfter.${i}.before`,label:`Antes - Foto ${i+1}`,value:ba.before,type:'image'}):undefined} style={{ width:'100%', height:'100%', objectFit:'cover', filter:'grayscale(30%)' }} />
                              </div>
                              <div style={{ flex:1, position:'relative' }}>
                                <div style={{ position:'absolute', top:12, right:12, background:a, color:isDark?'#000':'#fff', padding:'4px 12px', borderRadius:8, fontSize:'.7rem', fontWeight:900, boxShadow:'0 4px 12px rgba(0,0,0,.3)', zIndex:2 }}>Después</div>
                                <img src={ba.after} alt="Después" loading="lazy" className={editMode?'wp-editable':''} onClick={editMode?e=>ec(e,{field:`beforeAfter.${i}.after`,label:`Después - Foto ${i+1}`,value:ba.after,type:'image'}):undefined} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                              </div>
                            </div>
                            {ba.caption && <div style={{ padding:'16px 20px', fontSize:'.95rem', fontWeight:600, textAlign:'center' }}>{ba.caption}</div>}
                          </div>
                        ))}
                      </div>
                    </section>
                  ) : null

                case 'testimonials':
                  return data.testimonials?.length > 0 ? (() => {
                    const PER_PAGE = testimonialsV === 2 ? 1 : 3
                    const total = data.testimonials.length
                    const pages = Math.ceil(total / PER_PAGE)
                    const safePage = Math.min(testPage, pages - 1)
                    const slice = data.testimonials.slice(safePage * PER_PAGE, (safePage + 1) * PER_PAGE)

                    return wrapSection('testimonials', testimonialsV, (
                      <section key="testimonials" className="wp-sec" id="wp-testimonios" style={{ textAlign:'center', position: 'relative' }}>

                        <div className="wp-sec-lbl">Testimonios</div>
                        <h2 className="wp-h2">{data.testimonialsTitle||'Lo que dicen nuestros clientes'}</h2>

                        {testimonialsV === 2 && slice[0] && (
                          <div style={{ maxWidth: 800, margin: '36px auto 0', padding: '0 24px' }}>
                            <div style={{ fontSize: '4.5rem', color: a, lineHeight: 0.1, fontFamily: 'serif', marginBottom: 12 }}>“</div>
                            <p style={{ fontSize: '1.4rem', fontWeight: 500, fontStyle: 'italic', lineHeight: 1.7, color: isDark ? '#FFF' : p, marginBottom: 28 }}>
                              {slice[0].text}
                            </p>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
                              <div style={{ width: 44, height: 44, borderRadius: '50%', background: avGrads[safePage % 3], display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#fff' }}>
                                {(slice[0].name||'C')[0]}
                              </div>
                              <div style={{ textAlign: 'left' }}>
                                <div style={{ fontWeight: 800, color: isDark ? '#fff' : '#111827', fontSize: '.95rem' }}>{slice[0].name}</div>
                                <div style={{ fontSize: '.75rem', color: '#888', fontWeight: 600 }}>{slice[0].role}</div>
                              </div>
                            </div>
                          </div>
                        )}

                        {testimonialsV === 3 && (
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 40, maxWidth: 1240, margin: '32px auto 0', textAlign: 'left' }}>
                            <div>
                              <div style={{ fontSize: '1.8rem', fontWeight: 900, color: p, lineHeight: 1.25, marginBottom: 16 }}>Opiniones de líderes del sector</div>
                              <p style={{ fontSize: '.9rem', color: '#6B7280', lineHeight: 1.6 }}>Nos esforzamos por ofrecer la mejor calidad y servicio técnico del mercado.</p>
                            </div>
                            <div className="wp-tgrid" style={{ gridTemplateColumns: '1fr' }}>
                              {slice.map((t,i)=>(
                                <div className="wp-tcard" key={i} style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.06)' }}>
                                  <div className="wp-stars" style={{ color: a }}>{'★'.repeat(t.rating||5)}</div>
                                  <p style={{ margin: '12px 0 16px', fontSize: '.92rem', lineHeight: 1.6, fontStyle: 'italic' }}>"{t.text}"</p>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                    <div className="wp-tav" style={{ background: avGrads[i%3], width: 32, height: 32, fontSize: '.8rem' }}>{(t.name||'C')[0]}</div>
                                    <div>
                                      <div style={{ fontWeight: 800, fontSize: '.85rem' }}>{t.name}</div>
                                      <div style={{ fontSize: '.7rem', color: '#888' }}>{t.role}</div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {testimonialsV === 4 && (
                          <div style={{ maxWidth: 860, margin: '36px auto 0', textAlign: 'left' }}>
                            {slice.map((t,i)=>(
                              <div key={i} style={{ padding: '24px 0', borderBottom: i < slice.length - 1 ? '1.5px solid rgba(0,0,0,0.06)' : 'none' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                    <div className="wp-tav" style={{ background: avGrads[i%3], width: 36, height: 36 }}>{(t.name||'C')[0]}</div>
                                    <div>
                                      <div style={{ fontWeight: 800, fontSize: '.9rem', color: p }}>{t.name}</div>
                                      <div style={{ fontSize: '.75rem', color: '#888' }}>{t.role}</div>
                                    </div>
                                  </div>
                                  <div className="wp-stars" style={{ color: a, fontSize: '.9rem' }}>{'★'.repeat(t.rating||5)}</div>
                                </div>
                                <p style={{ fontSize: '1rem', lineHeight: 1.7, color: '#4B5563', fontStyle: 'italic' }}>"{t.text}"</p>
                              </div>
                            ))}
                          </div>
                        )}

                        {testimonialsV === 1 && (
                          <div className="wp-tgrid">
                            {slice.map((t,i)=>(
                              <div className="wp-tcard" key={i} style={{ textAlign:'left' }}>
                                <div className="wp-stars">{'★'.repeat(t.rating||5)}</div>
                                <p className="wp-ttxt">"{t.text}"</p>
                                <div className="wp-tav-row">
                                  <div className="wp-tav" style={{ background:avGrads[(safePage*PER_PAGE+i)%3] }}>{(t.name||'C')[0]}</div>
                                  <div><div className="wp-tn">{t.name}</div><div className="wp-tr">{t.role}</div></div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {pages > 1 && (
                          <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:14, marginTop:28 }}>
                            <button
                              onClick={() => setTestPage(p => Math.max(0, p-1))}
                              disabled={safePage === 0}
                              style={{ width:38, height:38, borderRadius:'50%', border:'1.5px solid #E5E7EB', background:'#fff', cursor:safePage===0?'default':'pointer', display:'flex', alignItems:'center', justifyContent:'center', color: safePage===0?'#D1D5DB':'#374151', transition:'all .15s' }}
                            >
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14"><polyline points="15 18 9 12 15 6"/></svg>
                            </button>
                            <div style={{ display:'flex', gap:6 }}>
                              {Array.from({length:pages}).map((_,pi)=>(
                                <button key={pi} onClick={()=>setTestPage(pi)}
                                  style={{ width: safePage===pi?20:8, height:8, borderRadius:999, border:'none', cursor:'pointer', background: safePage===pi?a:'#E5E7EB', padding:0, transition:'all .25s' }}
                                />
                              ))}
                            </div>
                            <button
                              onClick={() => setTestPage(p => Math.min(pages-1, p+1))}
                              disabled={safePage >= pages-1}
                              style={{ width:38, height:38, borderRadius:'50%', border:'1.5px solid #E5E7EB', background:'#fff', cursor:safePage>=pages-1?'default':'pointer', display:'flex', alignItems:'center', justifyContent:'center', color: safePage>=pages-1?'#D1D5DB':'#374151', transition:'all .15s' }}
                            >
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14"><polyline points="9 18 15 12 9 6"/></svg>
                            </button>
                          </div>
                        )}
                      </section>
                    ), sIdx)
                  })() : null

                case 'contact':
                  return data.contact ? wrapSection('contact', contactV, (
                    <section key="contact" className="wp-cont" id="wp-contact" style={{ position: 'relative' }}>

                      {contactV === 2 && (
                        <div style={{ maxWidth: 860, margin: '0 auto', textAlign: 'center', color: '#fff' }}>
                          <div className="wp-sec-lbl" style={{ background:`${a}28`, color:a }}>Contacto</div>
                          <h2 className="wp-h2" style={{ color: '#fff' }}>{data.contact?.sectionTitle||'Contáctanos hoy'}</h2>
                          <p style={{ marginBottom: 40 }}>{data.contact?.subtitle||'Estamos a tu entera disposición para resolver cualquier duda.'}</p>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24, marginBottom: 36 }}>
                            {[
                              { label: 'Teléfono', val: data.contact.phone },
                              data.contact.whatsapp && { label: 'WhatsApp', val: data.contact.whatsapp },
                              { label: 'Email', val: data.contact.email },
                            ].filter(Boolean).map(c => (
                              <div key={c.label} style={{ padding: '24px', background: 'rgba(255,255,255,0.06)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.1)' }}>
                                <div style={{ fontSize: '.75rem', textTransform: 'uppercase', color: a, fontWeight: 700, marginBottom: 6 }}>{c.label}</div>
                                <div style={{ fontSize: '1rem', fontWeight: 600 }}>{c.val}</div>
                              </div>
                            ))}
                          </div>
                          <div className="wp-call">
                            <a href={`tel:${data.contact.phone}`} className="wp-btn-c">Llamar ahora</a>
                          </div>
                        </div>
                      )}

                      {contactV === 3 && (
                        <div style={{ maxWidth: 720, margin: '0 auto', background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 24, padding: '48px 32px', color: '#fff', boxShadow: `0 24px 64px rgba(0,0,0,0.3)` }}>
                          <div style={{ textAlign: 'center', marginBottom: 32 }}>
                            <div className="wp-sec-lbl" style={{ background:`${a}28`, color:a }}>Contacto</div>
                            <h2 className="wp-h2" style={{ color: '#fff', marginBottom: 12 }}>{data.contact?.sectionTitle||'¿Hablamos?'}</h2>
                            <p style={{ fontSize: '.9rem', opacity: 0.8 }}>{data.contact?.subtitle||'Envíanos un mensaje y te responderemos en menos de 24 horas.'}</p>
                          </div>
                          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 32, fontSize: '.85rem' }}>
                            <div>📞 {data.contact.phone}</div>
                            {data.contact.whatsapp && <div>🟢 WhatsApp: {data.contact.whatsapp}</div>}
                            <div>✉️ {data.contact.email}</div>
                          </div>
                          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:10 }}>
                            <input readOnly placeholder="Tu nombre" style={{ padding:'11px 14px', background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.15)', borderRadius:10, color:'#fff', fontSize:'.8125rem', outline:'none', fontFamily:'inherit', width:'100%', boxSizing:'border-box' }} />
                            <input readOnly placeholder="Tu email" type="email" style={{ padding:'11px 14px', background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.15)', borderRadius:10, color:'#fff', fontSize:'.8125rem', outline:'none', fontFamily:'inherit', width:'100%', boxSizing:'border-box' }} />
                          </div>
                          <textarea readOnly placeholder="¿En qué te podemos ayudar?" rows={4} style={{ width:'100%', padding:'11px 14px', background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.15)', borderRadius:10, color:'#fff', fontSize:'.8125rem', outline:'none', fontFamily:'inherit', resize:'none', boxSizing:'border-box', marginBottom:14 }} />
                          <button style={{ width:'100%', padding:'13px', background:a, border:'none', borderRadius:10, color:'#000', fontWeight:800, fontSize:'.875rem', cursor:'pointer', fontFamily:'inherit', boxShadow:`0 4px 16px ${a}55` }}>
                            Enviar mensaje &rarr;
                          </button>
                        </div>
                      )}

                      {contactV === 4 && (
                        <div style={{ maxWidth: 1100, margin: '0 auto', color: '#fff' }}>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 32, paddingBottom: 24 }}>
                            <div>
                              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: a, marginBottom: 12 }}>Contacto</div>
                              <p style={{ fontSize: '.85rem', opacity: 0.8, lineHeight: 1.6 }}>{data.contact?.subtitle||'Estamos a tu disposición para proyectos y consultas.'}</p>
                            </div>
                            <div>
                              <div style={{ fontSize: '.75rem', textTransform: 'uppercase', color: a, fontWeight: 700, marginBottom: 8, letterSpacing: '.05em' }}>Vías rápidas</div>
                              <div style={{ fontSize: '.9rem', display: 'flex', flexDirection: 'column', gap: 8 }}>
                                <div>📞 {data.contact.phone}</div>
                                {data.contact.whatsapp && <div>🟢 WhatsApp: {data.contact.whatsapp}</div>}
                                <div>✉️ {data.contact.email}</div>
                              </div>
                            </div>
                            <div>
                              <div style={{ fontSize: '.75rem', textTransform: 'uppercase', color: a, fontWeight: 700, marginBottom: 8, letterSpacing: '.05em' }}>Horario comercial</div>
                              {(data.contact.businessHours||[]).slice(0, 3).map((h, i) => (
                                <div key={i} style={{ fontSize: '.8rem', display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                                  <span>{h.day}</span>
                                  <span style={{ fontWeight: 'bold' }}>{h.hours}</span>
                                </div>
                              ))}
                            </div>
                            <div>
                              <div style={{ fontSize: '.75rem', textTransform: 'uppercase', color: a, fontWeight: 700, marginBottom: 8, letterSpacing: '.05em' }}>Acción Directa</div>
                              <a href={`tel:${data.contact.phone}`} className="wp-btn-c" style={{ width: '100%', textAlign: 'center', display: 'block', padding: '10px 0' }}>Llamar ahora</a>
                            </div>
                          </div>
                        </div>
                      )}

                      {contactV === 1 && (
                        <div className="wp-cont-in">
                          <div className="wp-cont-h">
                            <div className="wp-sec-lbl" style={{ background:`${a}28`, color:a }}>Contacto</div>
                            <h2 className="wp-h2">{data.contact?.sectionTitle||'¿Listo para empezar?'}</h2>
                            <p>{data.contact?.subtitle||'Estámos aquí para ayudarte. Contáctanos hoy mismo.'}</p>
                          </div>
                          <div className="wp-ccards">
                            {[
                              { svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.71a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .84h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.63a16 16 0 006.29 6.29l1.45-1.45a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>, label:'Teléfono', val:data.contact.phone },
                              data.contact.whatsapp && { svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>, label:'WhatsApp', val:data.contact.whatsapp },
                              { svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>, label:'Email', val:data.contact.email },
                              { svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>, label:'Dirección', val:data.contact.address },
                            ].filter(Boolean).filter(c=>c.val).map(c=>(
                              <div className="wp-ccard" key={c.label}>
                                <div className="wp-cicon">{c.svg}</div>
                                <div style={{ flex:1, minWidth:0 }}>
                                  <div className="wp-clbl">{c.label}</div>
                                  <div className="wp-cval">{c.val}</div>
                                </div>
                              </div>
                            ))}
                          </div>

                          {(data.contact.businessHours||[]).length > 0 && (
                            <div style={{ margin:'0 auto 28px', maxWidth:480, background:'rgba(255,255,255,.08)', border:'1px solid rgba(255,255,255,.15)', borderRadius:14, overflow:'hidden' }}>
                              <div style={{ padding:'10px 16px', borderBottom:'1px solid rgba(255,255,255,.1)', fontSize:'.72rem', fontWeight:700, color:'rgba(255,255,255,.7)', textTransform:'uppercase', letterSpacing:'.07em', display:'flex', alignItems:'center', gap:7 }}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                                Horario de atención
                              </div>
                              {(data.contact.businessHours).map((h,i)=>(
                                <div key={i} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'9px 16px', borderBottom: i < data.contact.businessHours.length-1 ? '1px solid rgba(255,255,255,.07)' : 'none' }}>
                                  <span style={{ fontSize:'.79rem', color:'rgba(255,255,255,.8)', fontWeight:500 }}>{h.day}</span>
                                  <span style={{ fontSize:'.79rem', color: h.hours?.toLowerCase()==='cerrado'?'#F87171':'rgba(255,255,255,.95)', fontWeight:700 }}>{h.hours}</span>
                                </div>
                              ))}
                            </div>
                          )}

                          <div className="wp-call">
                            <a href={`tel:${data.contact.phone}`} className="wp-btn-c">
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.71a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .84h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.63a16 16 0 006.29 6.29l1.45-1.45a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                              {data.contact?.ctaText||'Llamar ahora'}
                            </a>
                            {data.contact.whatsapp && (
                              <a href={`https://wa.me/${(data.contact.whatsapp||'').replace(/[^0-9]/g,'')}`} target="_blank" rel="noopener noreferrer" className="wp-btn-c" style={{ background:'#25D366', boxShadow:'0 5px 18px rgba(37,211,102,.45)', marginLeft:10 }}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>
                                WhatsApp
                              </a>
                            )}
                          </div>

                          {data.contact.showForm && (
                            <div style={{ marginTop:36, maxWidth:520, margin:'36px auto 0' }}>
                              <div style={{ fontSize:'.75rem', fontWeight:700, color:'rgba(255,255,255,.6)', textAlign:'center', textTransform:'uppercase', letterSpacing:'.07em', marginBottom:18 }}>Envíanos un mensaje</div>
                              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:10 }}>
                                <input readOnly placeholder="Tu nombre" style={{ padding:'11px 14px', background:'rgba(255,255,255,.1)', border:'1.5px solid rgba(255,255,255,.2)', borderRadius:10, color:'#fff', fontSize:'.8125rem', outline:'none', fontFamily:'inherit', width:'100%', boxSizing:'border-box' }} />
                                <input readOnly placeholder="Tu email" type="email" style={{ padding:'11px 14px', background:'rgba(255,255,255,.1)', border:'1.5px solid rgba(255,255,255,.2)', borderRadius:10, color:'#fff', fontSize:'.8125rem', outline:'none', fontFamily:'inherit', width:'100%', boxSizing:'border-box' }} />
                              </div>
                              <textarea readOnly placeholder="¿En qué podemos ayudarte?" rows={4} style={{ width:'100%', padding:'11px 14px', background:'rgba(255,255,255,.1)', border:'1.5px solid rgba(255,255,255,.2)', borderRadius:10, color:'#fff', fontSize:'.8125rem', outline:'none', fontFamily:'inherit', resize:'none', boxSizing:'border-box', marginBottom:10 }} />
                              <button style={{ width:'100%', padding:'13px', background:a, border:'none', borderRadius:10, color:'#fff', fontWeight:800, fontSize:'.875rem', cursor:'pointer', fontFamily:'inherit', boxShadow:`0 4px 16px ${a}55`, letterSpacing:'.01em' }}>
                                Enviar mensaje →
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </section>
                  ), sIdx) : null

                default:
                  return null
              }
            })
          })()}

          {/* Footer Component */}
          {isChurch && (data.churchTemplateVariant === 'nucleus' || data.nucleusColumns) ? (
            <footer style={{ background: '#050B14', color: '#FFFFFF', padding: '90px 6% 40px', borderTop: '1px solid rgba(255,255,255,0.08)', position: 'relative' }}>
              <div style={{ maxWidth: 1240, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 50, marginBottom: 60 }}>
                {/* Left: Church Info & Schedule */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#FFFFFF', letterSpacing: '-0.02em', marginBottom: 18 }}>
                    {biz}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 24, fontSize: '0.92rem', color: '#94A3B8' }}>
                    <div>Reuniones: Domingos 10:30 a.m.</div>
                    <div>Reunión de oración: Jueves 7:00 p.m.</div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%', maxWidth: 280, marginBottom: 30 }}>
                    <a href="#wp-contact" onClick={e => scrollToSection('#wp-contact', e)}
                      style={{ padding: '12px 24px', borderRadius: 8, background: '#FFFFFF', color: '#0F172A', fontWeight: 800, fontSize: '0.86rem', textAlign: 'center', textDecoration: 'none' }}>
                      {data.contact?.ctaPrimary || 'DI HOLA'}
                    </a>
                    <a href="#wp-next-steps" onClick={e => scrollToSection('#wp-next-steps', e)}
                      style={{ padding: '12px 24px', borderRadius: 8, background: 'transparent', border: '1.5px solid rgba(255,255,255,0.3)', color: '#FFFFFF', fontWeight: 800, fontSize: '0.86rem', textAlign: 'center', textDecoration: 'none' }}>
                      {data.contact?.ctaSecondary || 'DA TU SIGUIENTE PASO'}
                    </a>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: '0.86rem', color: '#64748B' }}>
                    {data.contact?.email && <div>{data.contact.email}</div>}
                    {data.contact?.phone && <div>{data.contact.phone}</div>}
                    {data.contact?.address && <div>{data.contact.address}</div>}
                  </div>
                </div>

                {/* Right: Multi-column Navigation */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 32 }}>
                  <div>
                    <div style={{ fontSize: '1rem', fontWeight: 800, color: '#FFFFFF', marginBottom: 16 }}>Navegación</div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10, fontSize: '0.88rem', color: '#94A3B8' }}>
                      <li><a href="#wp-plan-visit" onClick={e => scrollToSection('#wp-plan-visit', e)} style={{ color: '#94A3B8', textDecoration: 'none' }}>Planifica tu Visita</a></li>
                      <li><a href="#wp-nucleus-columns" onClick={e => scrollToSection('#wp-nucleus-columns', e)} style={{ color: '#94A3B8', textDecoration: 'none' }}>Líderes & Equipo</a></li>
                      <li><a href="#wp-next-steps" onClick={e => scrollToSection('#wp-next-steps', e)} style={{ color: '#94A3B8', textDecoration: 'none' }}>Próximos Pasos</a></li>
                      <li style={{ paddingLeft: 10, fontSize: '0.82rem', color: '#64748B' }}>• Oración</li>
                      <li style={{ paddingLeft: 10, fontSize: '0.82rem', color: '#64748B' }}>• Donar</li>
                      <li style={{ paddingLeft: 10, fontSize: '0.82rem', color: '#64748B' }}>• Niños</li>
                      <li style={{ paddingLeft: 10, fontSize: '0.82rem', color: '#64748B' }}>• Jóvenes</li>
                    </ul>
                  </div>

                  <div>
                    <div style={{ fontSize: '1rem', fontWeight: 800, color: '#FFFFFF', marginBottom: 16 }}>Comunidad</div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10, fontSize: '0.88rem', color: '#94A3B8' }}>
                      <li><a href="#wp-mission" onClick={e => scrollToSection('#wp-mission', e)} style={{ color: '#94A3B8', textDecoration: 'none' }}>Sobre Nosotros</a></li>
                      <li><a href="#wp-nucleus-columns" onClick={e => scrollToSection('#wp-nucleus-columns', e)} style={{ color: '#94A3B8', textDecoration: 'none' }}>Calendario</a></li>
                      <li style={{ marginTop: 8, fontWeight: 700, color: '#FFFFFF' }}>Redes Sociales</li>
                      <li style={{ paddingLeft: 10, fontSize: '0.82rem' }}><a href="https://facebook.com" target="_blank" rel="noreferrer" style={{ color: '#64748B', textDecoration: 'none' }}>• Facebook</a></li>
                      <li style={{ paddingLeft: 10, fontSize: '0.82rem' }}><a href="https://instagram.com" target="_blank" rel="noreferrer" style={{ color: '#64748B', textDecoration: 'none' }}>• Instagram</a></li>
                      <li style={{ paddingLeft: 10, fontSize: '0.82rem' }}><a href="https://youtube.com" target="_blank" rel="noreferrer" style={{ color: '#64748B', textDecoration: 'none' }}>• YouTube</a></li>
                      <li style={{ paddingLeft: 10, fontSize: '0.82rem' }}><a href="https://tiktok.com" target="_blank" rel="noreferrer" style={{ color: '#64748B', textDecoration: 'none' }}>• TikTok</a></li>
                    </ul>
                  </div>
                </div>
              </div>

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14, fontSize: '0.78rem', color: '#64748B' }}>
                <div>Políticas de Privacidad • Declaración de Cookies</div>
                <div>© {new Date().getFullYear()} {biz}. Todos los derechos reservados.</div>
              </div>
            </footer>
          ) : (
            <footer className={`wp-foot v${footerV}`} style={{ position: 'relative' }}>
              {footerV === 2 && (
                <div style={{ textAlign: 'center', padding: '40px 24px 20px' }}>
                  <div className="wp-logo" style={{ justifyContent: 'center', marginBottom: 20 }}>
                    {data.logoImage ? (
                      <img className={editMode?'wp-editable':''} src={data.logoImage} alt={biz} onClick={editMode?e=>ec(e,{field:'logoImage',label:'Logo URL',value:data.logoImage,type:'image'}):undefined} style={{ maxHeight: data.logoSize || 40, maxWidth: 200, objectFit: 'contain', width: 'auto' }} />
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center' }}>
                        <div className="wp-logo-ic">{(biz||'M')[0]}</div>
                        <div style={{ fontWeight:800, color:'#fff', fontSize:'1.1rem' }}>{biz}</div>
                      </div>
                    )}
                  </div>
                  {data.tagline && <div style={{ fontSize:'.8rem', color:'rgba(255,255,255,0.5)', marginBottom: 24 }}>{data.tagline}</div>}
                  
                  {data.social && Object.values(data.social).some(Boolean) && (
                    <div style={{ display:'flex', gap:12, justifyContent: 'center', marginBottom:28, flexWrap:'wrap' }}>
                      {[
                        { key:'facebook',  label:'Facebook' },
                        { key:'instagram', label:'Instagram' },
                        { key:'twitter',   label:'Twitter' },
                        { key:'linkedin',  label:'LinkedIn' },
                        { key:'tiktok',    label:'TikTok' },
                        { key:'youtube',   label:'YouTube' },
                      ].filter(s=>data.social?.[s.key]).map(s=>(
                        <a key={s.key} href={data.social[s.key]} target="_blank" rel="noopener noreferrer"
                          style={{ fontSize:'.75rem', fontWeight:600, color:'rgba(255,255,255,.6)', textDecoration:'none', padding:'6px 14px', border:'1px solid rgba(255,255,255,0.12)', borderRadius:20, background: 'rgba(255,255,255,0.02)' }}>
                          {s.label}
                        </a>
                      ))}
                    </div>
                  )}
                  <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)', margin: '0 auto 20px', maxWidth: 400 }} />
                  <p style={{ fontSize: '.75rem', color: 'rgba(255,255,255,0.4)' }}>© {new Date().getFullYear()} {biz}. Todos los derechos reservados. Creado con SiteGen AI.</p>
                </div>
              )}

              {footerV === 3 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: '30px 4%' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
                    <div className="wp-logo">
                      {data.logoImage ? (
                        <img className={editMode?'wp-editable':''} src={data.logoImage} alt={biz} onClick={editMode?e=>ec(e,{field:'logoImage',label:'Logo URL',value:data.logoImage,type:'image'}):undefined} style={{ maxHeight: data.logoSize || 36, maxWidth: 160, objectFit: 'contain' }} />
                      ) : (
                        <div style={{ fontWeight:800, color:'#fff', fontSize:'.95rem' }}>{biz}</div>
                      )}
                    </div>
                    <p style={{ fontSize: '.75rem', color: 'rgba(255,255,255,0.45)' }}>© {new Date().getFullYear()} {biz}.</p>
                    
                    {data.social && Object.values(data.social).some(Boolean) && (
                      <div style={{ display:'flex', gap:8 }}>
                        {[
                          { key:'facebook',  label:'FB' },
                          { key:'instagram', label:'IG' },
                          { key:'twitter',   label:'TW' },
                          { key:'linkedin',  label:'LN' },
                        ].filter(s=>data.social?.[s.key]).map(s=>(
                          <a key={s.key} href={data.social[s.key]} target="_blank" rel="noopener noreferrer"
                            style={{ fontSize:'.7rem', fontWeight:600, color:'rgba(255,255,255,.5)', textDecoration:'none', width: 28, height: 28, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {s.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {footerV === 4 && (
                <div style={{ padding: '60px 8% 30px', background: `linear-gradient(180deg, rgba(0,0,0,0) 0%, ${p}33 100%)`, borderTop: `1px solid ${borderCol}` }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 40, marginBottom: 40 }}>
                    <div>
                      <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#fff', letterSpacing: '-.04em', marginBottom: 12 }}>{biz}</div>
                      {data.tagline && <p style={{ fontSize: '.9rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, maxWidth: 460 }}>{data.tagline}</p>}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 16 }}>
                      <div className="wp-ft-tags" style={{ justifyContent: 'flex-end' }}>
                        {['SSL Seguro','Alto Rendimiento','SEO Optimo'].map(t=>(
                          <span className="wp-ft-tag" key={t} style={{ background: 'rgba(255,255,255,0.06)' }}>{t}</span>
                        ))}
                      </div>
                      {data.social && Object.values(data.social).some(Boolean) && (
                        <div style={{ display:'flex', gap:10 }}>
                          {[
                            { key:'facebook',  label:'Facebook' },
                            { key:'instagram', label:'Instagram' },
                            { key:'linkedin',  label:'LinkedIn' },
                          ].filter(s=>data.social?.[s.key]).map(s=>(
                            <a key={s.key} href={data.social[s.key]} target="_blank" rel="noopener noreferrer"
                              style={{ fontSize:'.72rem', fontWeight:600, color: a, textDecoration: 'none' }}>
                              {s.label}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', marginBottom: 20 }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.75rem', color: 'rgba(255,255,255,0.4)' }}>
                    <span>© {new Date().getFullYear()} {biz}.</span>
                    <span>Diseño y tecnología por SiteGen AI</span>
                  </div>
                </div>
              )}

              {footerV === 1 && (
                <>
                  <div className="wp-ft-top">
                    <div className="wp-logo">
                      {data.logoImage ? (
                        <img className={editMode?'wp-editable':''} src={data.logoImage} alt={biz} onClick={editMode?e=>ec(e,{field:'logoImage',label:'Logo URL',value:data.logoImage,type:'image'}):undefined} style={{ maxHeight: data.logoSize || 40, maxWidth: 200, objectFit: 'contain', width: 'auto', transition: 'max-height 0.2s' }} />
                      ) : (
                        <>
                          <div className="wp-logo-ic">{(biz||'M')[0]}</div>
                          <span className="wp-logo-nm" style={{ color: '#fff' }}>{biz}</span>
                        </>
                      )}
                    </div>
                    <div className="wp-ft-tags">
                      {['SSL Seguro', 'Carga rápida', 'SEO Optimizado', 'Mobile Ready'].map(t => (
                        <span className="wp-ft-tag" key={t}>{t}</span>
                      ))}
                    </div>
                  </div>
                  {data.social && Object.values(data.social).some(Boolean) && (
                    <div style={{ display: 'flex', gap: 10, marginBottom: 24, flexWrap: 'wrap', borderBottom: '1px solid rgba(255,255,255,.08)', paddingBottom: 20 }}>
                      {[
                        { key:'facebook',  label:'Facebook' },
                        { key:'instagram', label:'Instagram' },
                        { key:'twitter',   label:'Twitter' },
                        { key:'linkedin',  label:'LinkedIn' },
                        { key:'tiktok',    label:'TikTok' },
                        { key:'youtube',   label:'YouTube' },
                      ].filter(s=>data.social?.[s.key]).map(s=>(
                        <a key={s.key} href={data.social[s.key]} target="_blank" rel="noopener noreferrer"
                          style={{ fontSize:'.72rem', fontWeight:600, color:'rgba(255,255,255,.55)', textDecoration:'none', padding:'3px 8px', border:'1px solid rgba(255,255,255,.1)', borderRadius:6 }}>
                          {s.label}
                        </a>
                      ))}
                    </div>
                  )}
                  <div className="wp-ft-bot">
                    <p className="wp-ft-cp">© {new Date().getFullYear()} {biz}. Todos los derechos reservados.</p>
                    <p className="wp-ft-br">Creado con <span>SiteGen AI</span></p>
                  </div>
                </>
              )}
            </footer>
          )}
          {Boolean(data.floatingWidget?.enabled || data.showLauncherWidget) && (
            <LauncherWidget siteJson={data} />
          )}
          </>
          )}
        </div>
      </div>

      {/* YOUTUBE VIDEO MODAL OVERLAY */}
      {activeVideoModal && (
        <div
          onClick={() => setActiveVideoModal(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(8px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: 800,
              background: '#0F172A',
              borderRadius: 20,
              overflow: 'hidden',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <div
              style={{
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <h4 style={{ margin: 0, color: '#fff', fontSize: '1rem', fontWeight: 700 }}>
                {activeVideoModal.title || 'Reproducir Prédica'}
              </h4>
              <button
                onClick={() => setActiveVideoModal(null)}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: 'none',
                  color: '#fff',
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1rem',
                  fontWeight: 800,
                }}
              >
                ✕
              </button>
            </div>
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
              {getYouTubeEmbedUrl(activeVideoModal.url) ? (
                <iframe
                  src={getYouTubeEmbedUrl(activeVideoModal.url)}
                  title={activeVideoModal.title}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 0,
                  }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#94A3B8',
                    gap: 12,
                    padding: 20,
                    textAlign: 'center',
                  }}
                >
                  <span style={{ fontSize: '2rem' }}>📺</span>
                  <p style={{ margin: 0 }}>Enlace de video: {activeVideoModal.url}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Floating Church Launcher Widget (Optional - only if enabled by user) */}
      {Boolean(data.floatingWidget?.enabled) && showChurchLauncher && (
        <div
          style={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            zIndex: 900,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: 10,
            fontFamily: fontStack(font),
          }}
        >
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: 18,
              padding: '16px 20px',
              boxShadow: '0 12px 36px rgba(0,0,0,0.18)',
              border: '1px solid rgba(0,0,0,0.06)',
              maxWidth: 270,
              textAlign: 'center',
              position: 'relative',
              animation: 'fadeUp 0.3s ease',
            }}
          >
            <button
              onClick={() => setShowChurchLauncher(false)}
              title="Cerrar"
              style={{
                position: 'absolute',
                top: 8,
                right: 8,
                background: 'none',
                border: 'none',
                color: '#94A3B8',
                cursor: 'pointer',
                fontSize: '0.85rem',
                fontWeight: 700,
                padding: 2,
              }}
            >
              ✕
            </button>
            <div style={{ fontSize: '1.4rem', marginBottom: 4 }}>☀️</div>
            <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0284C7', marginBottom: 4 }}>
              Plan A Visit
            </div>
            <div style={{ fontSize: '0.78rem', color: '#64748B', lineHeight: 1.4, marginBottom: 10 }}>
              {data.planAVisit?.serviceTimes?.[0] || 'Join us on Sundays at 9AM or 11AM. Get directions, info, and more!'}
            </div>
            <a
              href="#wp-plan-visit"
              onClick={e => scrollToSection('#wp-plan-visit', e)}
              style={{
                display: 'block',
                background: '#0284C7',
                color: '#FFFFFF',
                padding: '8px 16px',
                borderRadius: 999,
                fontWeight: 800,
                fontSize: '0.78rem',
                textDecoration: 'none',
              }}
            >
              {data.planAVisit?.ctaText || 'Planifica tu Visita'}
            </a>
          </div>
          <button
            onClick={() => scrollToSection('#wp-plan-visit')}
            style={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              background: '#0284C7',
              color: '#FFFFFF',
              border: 'none',
              boxShadow: '0 6px 20px rgba(2,132,199,0.4)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.4rem',
              fontWeight: 900,
            }}
          >
            +
          </button>
        </div>
      )}
    </div>
  )
}
