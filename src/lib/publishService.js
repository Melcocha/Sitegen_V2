/**
 * publishService.js — Sprint 2
 * Calls the Edge Function to generate static HTML and upload to Storage.
 */
import { supabase } from './supabase'

/**
 * publishSite — generates HTML and uploads to Supabase Storage
 * @param {string} siteId
 * @returns {Promise<{ publishedUrl: string, subdomain: string }>}
 */
export async function publishSite(siteId) {
  const { data, error } = await supabase.functions.invoke('generate-site-html', {
    body: { siteId },
  })
  if (error) throw new Error(error.message)
  if (data?.error) throw new Error(data.error)
  return data // { success, publishedUrl, subdomain }
}

/**
 * unpublishSite — pauses the site (does not delete storage file)
 * @param {string} siteId
 */
export async function unpublishSite(siteId) {
  const { error } = await supabase
    .from('websites')
    .update({ status: 'paused' })
    .eq('id', siteId)
  if (error) throw new Error(error.message)
}
