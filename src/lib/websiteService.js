/**
 * websiteService.js — SiteGen AI
 * ─────────────────────────────────────────────────────────────────
 * Single source of truth for website CRUD operations.
 * Supports remote Supabase cloud DB + automatic Local Dev Fallback
 * (localStorage) so sites can be created, saved, and edited 100% offline
 * even when Supabase Cloud is paused.
 */

import { supabase } from './supabase'

const STORAGE_KEY = 'saasweb_local_sites'

function getLocalSites() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveLocalSites(sites) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sites))
    return true
  } catch (e) {
    console.error('Error saving local sites to localStorage', e)
    return false
  }
}

// ─────────────────────────────────────────────────────────────────
// READ
// ─────────────────────────────────────────────────────────────────

/**
 * getSites — fetch all websites for a user, newest first
 */
export async function getSites(userId) {
  const local = getLocalSites().filter(s => !userId || s.user_id === userId)
  try {
    const { data, error } = await supabase
      .from('websites')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error || !data) return local
    // Merge remote and local (prevent duplicates)
    const remoteIds = new Set(data.map(s => s.id))
    const uniqueLocal = local.filter(s => !remoteIds.has(s.id))
    return [...data, ...uniqueLocal]
  } catch {
    return local
  }
}

/**
 * getSite — fetch a single website
 */
export async function getSite(siteId, userId) {
  // Check local first if siteId starts with site-local-
  if (siteId?.startsWith('site-local-')) {
    const local = getLocalSites()
    return local.find(s => s.id === siteId) || null
  }

  try {
    const { data, error } = await supabase
      .from('websites')
      .select('*')
      .eq('id', siteId)
      .maybeSingle()

    if (error || !data) {
      const local = getLocalSites()
      return local.find(s => s.id === siteId) || null
    }
    return data
  } catch {
    const local = getLocalSites()
    return local.find(s => s.id === siteId) || null
  }
}

// ─────────────────────────────────────────────────────────────────
// WRITE
// ─────────────────────────────────────────────────────────────────

/**
 * saveSite — create a new website row
 */
export async function saveSite({ userId, name, prompt, siteJson, industry }) {
  const newSite = {
    id: `site-local-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
    user_id: userId || 'saasweb_dev_user',
    name: name || siteJson?.businessName || 'Mi Sitio',
    prompt: prompt || '',
    site_json: siteJson,
    industry: industry || siteJson?.industry || '',
    prompt_used: prompt || '',
    status: 'draft',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }

  try {
    const { data, error } = await supabase
      .from('websites')
      .insert({
        user_id: userId,
        name: name || siteJson?.businessName || 'Mi Sitio',
        prompt: prompt || '',
        site_json: siteJson,
        industry: industry || siteJson?.industry || '',
        prompt_used: prompt || '',
        status: 'draft',
      })
      .select()
      .single()

    if (error || !data) {
      const local = getLocalSites()
      local.unshift(newSite)
      saveLocalSites(local)
      return newSite
    }
    return data
  } catch {
    const local = getLocalSites()
    local.unshift(newSite)
    saveLocalSites(local)
    return newSite
  }
}

/**
 * updateSiteContent — save edited site_json
 */
export async function updateSiteContent(siteId, siteJson) {
  const local = getLocalSites()
  const idx = local.findIndex(s => s.id === siteId)
  if (idx !== -1) {
    local[idx].site_json = siteJson
    local[idx].name = siteJson?.businessName || local[idx].name
    local[idx].updated_at = new Date().toISOString()
    const ok = saveLocalSites(local)
    // This is the site's actual storage (local-only draft) — a silent failure
    // here (e.g. localStorage quota exceeded by an embedded photo/video) must
    // not look like a successful save to the caller.
    if (!ok) throw new Error('No se pudo guardar localmente (posiblemente el navegador se quedó sin espacio — prueba con una foto/video más liviano)')
  }

  try {
    await supabase
      .from('websites')
      .update({
        site_json: siteJson,
        name: siteJson?.businessName,
      })
      .eq('id', siteId)
  } catch {
    // Local backup already updated
  }
}

/**
 * migrateLocalSiteToRemote — copies a site-local-* draft into a real
 * Supabase row (needed before publishing, since the Edge Function and
 * website_versions table only know about real rows). Removes the local
 * copy once the remote insert succeeds.
 */
export async function migrateLocalSiteToRemote(localSite, userId) {
  const { data, error } = await supabase
    .from('websites')
    .insert({
      user_id: userId,
      name: localSite.name || localSite.site_json?.businessName || 'Mi Sitio',
      prompt: localSite.prompt || '',
      site_json: localSite.site_json,
      industry: localSite.industry || localSite.site_json?.industry || '',
      prompt_used: localSite.prompt_used || localSite.prompt || '',
      status: localSite.status || 'draft',
    })
    .select()
    .single()

  if (error || !data) throw new Error(error?.message || 'No se pudo migrar el sitio a Supabase')

  const local = getLocalSites().filter(s => s.id !== localSite.id)
  saveLocalSites(local)
  return data
}

/**
 * deleteSite — delete a site
 */
export async function deleteSite(siteId, userId) {
  if (!siteId) return

  // 1. Delete from local storage immediately
  const local = getLocalSites().filter(s => s.id !== siteId && s.id !== String(siteId))
  saveLocalSites(local)

  // 2. Delete from Supabase with timeout and cascade cleanup
  try {
    const remoteDelete = async () => {
      // Clean up child tables first if they exist to prevent foreign key errors
      try { await supabase.from('website_versions').delete().eq('website_id', siteId) } catch (_) {}
      try { await supabase.from('leads').delete().eq('website_id', siteId) } catch (_) {}
      try { await supabase.from('analytics_events').delete().eq('website_id', siteId) } catch (_) {}
      try { await supabase.from('domains').delete().eq('website_id', siteId) } catch (_) {}

      const { error } = await supabase
        .from('websites')
        .delete()
        .eq('id', siteId)
      if (error) console.warn('[deleteSite] Supabase delete warning:', error.message)
    }

    await Promise.race([
      remoteDelete(),
      new Promise(resolve => setTimeout(resolve, 3000))
    ])
  } catch (err) {
    console.warn('[deleteSite] Error deleting site:', err)
  }
}

// ─────────────────────────────────────────────────────────────────
// PLAN ENFORCEMENT & SITE LIMITS
// ─────────────────────────────────────────────────────────────────

/**
 * checkSiteLimit — can this user create another site?
 * In local dev mode / offline mode, always allow saving.
 */
export async function checkSiteLimit(userId, plan) {
  // Always allow site creation in Local Dev Mode or localhost
  if (!userId || userId === 'saasweb_dev_user' || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    const local = getLocalSites()
    return { allowed: true, current: local.length, limit: '∞' }
  }

  // Allow up to 10 sites for free local users
  const local = getLocalSites().filter(s => s.user_id === userId)
  try {
    const { count } = await supabase
      .from('websites')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', userId)

    const current = (count || 0) + local.length
    return {
      allowed: true,
      current,
      limit: '∞',
    }
  } catch {
    return {
      allowed: true,
      current: local.length,
      limit: '∞',
    }
  }
}

export async function getSiteCountForUser(userId) {
  const sites = await getSites(userId)
  return sites.length
}

export async function markPublished(siteId, { subdomain, publishedUrl, thumbnailUrl }) {
  const local = getLocalSites()
  const idx = local.findIndex(s => s.id === siteId)
  if (idx !== -1) {
    local[idx].status = 'published'
    local[idx].subdomain = subdomain
    local[idx].published_url = publishedUrl
    saveLocalSites(local)
  }

  try {
    await supabase
      .from('websites')
      .update({
        status: 'published',
        subdomain,
        published_url: publishedUrl,
      })
      .eq('id', siteId)
  } catch {
    // Ignored in offline mode
  }
}

export async function markUnpublished(siteId) {
  const local = getLocalSites()
  const idx = local.findIndex(s => s.id === siteId)
  if (idx !== -1) {
    local[idx].status = 'paused'
    saveLocalSites(local)
  }
}
