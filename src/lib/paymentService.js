/**
 * paymentService.js — SiteGen AI
 * ─────────────────────────────────────────────────────────────────
 * SINGLE SOURCE OF TRUTH for all billing operations.
 *
 * Architecture contract:
 *  · SIMULATED MODE  → VITE_STRIPE_PUBLISHABLE_KEY is empty/absent
 *    Writes directly to Supabase, 2s artificial delay, no redirect.
 *
 *  · STRIPE LIVE MODE → VITE_STRIPE_PUBLISHABLE_KEY is set
 *    Calls a Supabase Edge Function that creates a Stripe Checkout
 *    Session and returns { url }. Frontend redirects to Stripe.
 *    Stripe webhook Edge Function writes to DB — UI reads same tables.
 *
 * To go live: fill the env vars. Zero frontend code changes required.
 * ─────────────────────────────────────────────────────────────────
 */

import { supabase } from './supabase'

// ── Plan catalogue ────────────────────────────────────────────────
// amount_cents: what we charge per billing_cycle period
export const PLAN_CONFIG = {
  free: {
    name: 'Free',
    monthly_cents: 0,
    annual_cents: 0,
    site_limit: 1,
    features: ['1 sitio web', 'Subdominio gratuito', 'SSL automático'],
  },
  starter: {
    name: 'Starter',
    monthly_cents: 6_00,
    annual_cents: 5_00 * 12,    //  $60/año (20% off)
    site_limit: 1,
    features: ['1 sitio web activo', 'Subdominio personalizado', 'SSL gratis', 'Soporte por email'],
  },
  pro: {
    name: 'Pro',
    monthly_cents: 12_00,
    annual_cents: 10_00 * 12,   //  $120/año (20% off)
    site_limit: 3,
    features: ['3 sitios web', 'GPT-4o calidad máxima', 'Dominio personalizado', 'Editor no-code completo', 'Dashboard métricas', 'Soporte prioritario'],
  },
  agency: {
    name: 'Agency',
    monthly_cents: 0,           // Price by quote — contact sales
    annual_cents: 0,
    site_limit: Infinity,
    features: ['Sitios ilimitados', 'White-label completo', 'Multi-usuario (5 seats)', 'API access', 'SLA 99.9%', 'Soporte dedicado 24/7'],
  },
}

// ── Stripe Price IDs (set in .env when going live) ─────────────────
const STRIPE_PRICES = {
  starter_monthly: import.meta.env.VITE_STRIPE_STARTER_MONTHLY || null,
  starter_annual:  import.meta.env.VITE_STRIPE_STARTER_ANNUAL  || null,
  pro_monthly:     import.meta.env.VITE_STRIPE_PRO_MONTHLY     || null,
  pro_annual:      import.meta.env.VITE_STRIPE_PRO_ANNUAL      || null,
  agency_monthly:  import.meta.env.VITE_STRIPE_AGENCY_MONTHLY  || null,
  agency_annual:   import.meta.env.VITE_STRIPE_AGENCY_ANNUAL   || null,
}

/** true only when the Stripe publishable key is configured in env */
/**
 * IS_STRIPE_LIVE — true only when a real Stripe publishable key is configured.
 * A placeholder string like 'pk_live_your_key_here' does NOT activate Stripe.
 * Both pk_live_ (production) and pk_test_ (Stripe test mode) are valid.
 */
export const IS_STRIPE_LIVE = (() => {
  const key = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || ''
  return key.startsWith('pk_live_') || key.startsWith('pk_test_')
})()

// ─────────────────────────────────────────────────────────────────
// PUBLIC API
// ─────────────────────────────────────────────────────────────────

/**
 * initiateCheckout — start a subscription upgrade
 *
 * @param {object} params
 * @param {string} params.plan         - 'starter' | 'pro' | 'agency'
 * @param {string} params.billingCycle - 'monthly' | 'annual'
 * @param {string} params.userId       - auth.users.id
 * @param {string} params.userEmail    - for Stripe pre-fill
 * @returns {Promise<{ success: boolean }>}
 * @throws {Error} on failure
 */
export async function initiateCheckout({ plan, billingCycle, userId, userEmail }) {
  if (!PLAN_CONFIG[plan]) throw new Error(`Invalid plan: ${plan}`)
  if (!['monthly', 'annual'].includes(billingCycle)) throw new Error(`Invalid billingCycle: ${billingCycle}`)
  if (!userId) throw new Error('userId is required')

  if (IS_STRIPE_LIVE) {
    return _initiateStripeCheckout({ plan, billingCycle, userId, userEmail })
  }
  return _initiateSimulatedCheckout({ plan, billingCycle, userId })
}

/**
 * cancelSubscription — cancel the user's active plan
 *
 * @param {string} userId
 * @returns {Promise<void>}
 * @throws {Error} on failure
 */
export async function cancelSubscription(userId) {
  if (!userId) throw new Error('userId is required')

  if (IS_STRIPE_LIVE) {
    await _cancelStripeSubscription(userId)
    return
  }
  await _cancelSimulated(userId)
}

/**
 * fetchSubscription — get the active subscription for a user
 * Returns null if the user is on free plan (no row in subscriptions).
 *
 * @param {string} userId
 * @returns {Promise<object|null>}
 */
export async function fetchSubscription(userId) {
  try {
    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle()

    if (error) return null
    return data
  } catch (err) {
    return null
  }
}

/**
 * fetchPaymentHistory — get billing event log for a user
 *
 * @param {string} userId
 * @param {number} limit - max rows (default 20)
 * @returns {Promise<object[]>}
 */
export async function fetchPaymentHistory(userId, limit = 20) {
  const { data, error } = await supabase
    .from('payment_events')
    .select('*, invoice_number, email_sent_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) throw new Error(error.message)
  return data || []
}

/**
 * sendInvoiceEmail — send invoice to user's email via Edge Function
 *
 * @param {string} eventId - the payment_events row ID
 * @returns {Promise<{ success: boolean, invoiceNum?: string, message?: string }>}
 */
export async function sendInvoiceEmail(eventId) {
  if (!eventId) throw new Error('eventId is required')

  const { data, error } = await supabase.functions.invoke('send-invoice-email', {
    body: { eventId },
  })

  if (error) throw new Error(error.message)
  return data
}


/**
 * isPlanActive — check if a subscription row grants access
 *
 * @param {object|null} subscription
 * @returns {boolean}
 */
export function isPlanActive(subscription) {
  if (!subscription) return false
  if (subscription.status !== 'active') return false
  if (!subscription.current_period_end) return true // no expiry set = active
  return new Date(subscription.current_period_end) > new Date()
}

/**
 * getEffectivePlan — resolves the plan a user actually has access to
 * Respects the admin plan_override field.
 *
 * @param {object|null} profile   - profiles row
 * @param {object|null} subscription - subscriptions row
 * @returns {'free'|'starter'|'pro'|'agency'}
 */
export function getEffectivePlan(profile, subscription) {
  if (profile?.plan_override) return profile.plan_override
  if (!subscription || !isPlanActive(subscription)) return 'free'
  return subscription.plan || 'free'
}

/**
 * getSiteLimit — how many sites can this user create?
 *
 * @param {'free'|'starter'|'pro'|'agency'} plan
 * @returns {number|Infinity}
 */
export function getSiteLimit(plan) {
  return PLAN_CONFIG[plan]?.site_limit ?? 1
}

/**
 * getPriceDisplay — formatted price for a plan+cycle
 *
 * @param {string} plan
 * @param {'monthly'|'annual'} billingCycle
 * @returns {{ cents: number, monthly_equivalent: number, label: string }}
 */
export function getPriceDisplay(plan, billingCycle) {
  const config = PLAN_CONFIG[plan]
  if (!config) return { cents: 0, monthly_equivalent: 0, label: 'Gratis' }

  const key = `${billingCycle}_cents`
  const cents = config[key] || 0
  const monthly = billingCycle === 'annual' ? Math.round(cents / 12) : cents
  const dollars = (monthly / 100).toFixed(0)
  return {
    cents,
    monthly_equivalent: monthly,
    label: cents === 0 ? 'Gratis' : `$${dollars}/mes`,
  }
}

// ─────────────────────────────────────────────────────────────────
// PRIVATE — SIMULATED MODE
// ─────────────────────────────────────────────────────────────────

async function _initiateSimulatedCheckout({ plan, billingCycle, userId }) {
  // Artificial delay — feels real, also prevents accidental double-clicks
  await new Promise(r => setTimeout(r, 1800))

  const config      = PLAN_CONFIG[plan]
  const amountCents = config[`${billingCycle}_cents`]
  const mrrUsd      = billingCycle === 'annual'
    ? (amountCents / 12 / 100).toFixed(2)
    : (amountCents / 100).toFixed(2)

  const daysToAdd = billingCycle === 'annual' ? 365 : 30
  const periodEnd = new Date()
  periodEnd.setDate(periodEnd.getDate() + daysToAdd)

  // Upsert subscription row (one row per user, always)
  const { data: sub, error: subErr } = await supabase
    .from('subscriptions')
    .upsert({
      user_id:             userId,
      plan,
      billing_cycle:       billingCycle,
      status:              'active',
      current_period_end:  periodEnd.toISOString(),
      amount_cents:        amountCents,
      mrr_usd:             parseFloat(mrrUsd),
      stripe_customer_id:  `sim_cus_${userId.slice(0, 8)}`,
      stripe_sub_id:       `sim_sub_${Date.now()}`,
    }, { onConflict: 'user_id' })
    .select()
    .maybeSingle()

  if (subErr) throw new Error(subErr.message)

  // Append to immutable audit log
  await supabase.from('payment_events').insert({
    user_id:         userId,
    subscription_id: sub?.id || null,
    event_type:      'payment_success',
    plan,
    billing_cycle:   billingCycle,
    amount_cents:    amountCents,
    mrr_usd:         parseFloat(mrrUsd),
    source:          'simulated',
    metadata: {
      period_end: periodEnd.toISOString(),
      triggered_at: new Date().toISOString(),
    },
  })

  return { success: true }
}

async function _cancelSimulated(userId) {
  const now = new Date().toISOString()

  const { data: sub, error } = await supabase
    .from('subscriptions')
    .update({
      status:      'canceled',
      canceled_at: now,
    })
    .eq('user_id', userId)
    .select()
    .maybeSingle()

  if (error) throw new Error(error.message)

  if (sub) {
    await supabase.from('payment_events').insert({
      user_id:         userId,
      subscription_id: sub.id,
      event_type:      'plan_canceled',
      plan:            sub.plan,
      billing_cycle:   sub.billing_cycle,
      amount_cents:    0,
      mrr_usd:         0,
      source:          'simulated',
      metadata: { canceled_at: now },
    })
  }
}

// ─────────────────────────────────────────────────────────────────
// PRIVATE — STRIPE LIVE MODE (stubs — ready for Phase 8)
// ─────────────────────────────────────────────────────────────────

async function _initiateStripeCheckout({ plan, billingCycle, userId, userEmail }) {
  const priceId = STRIPE_PRICES[`${plan}_${billingCycle}`]
  if (!priceId) throw new Error(`No Stripe Price ID configured for ${plan}_${billingCycle}`)

  // Call Supabase Edge Function (to be deployed in Phase 8)
  const { data, error } = await supabase.functions.invoke('create-checkout-session', {
    body: {
      priceId,
      userId,
      userEmail,
      successUrl: `${window.location.origin}/app/dashboard?checkout=success`,
      cancelUrl:  `${window.location.origin}/app/dashboard?checkout=cancel`,
    },
  })

  if (error) throw new Error(error.message)
  if (data?.url) {
    window.location.href = data.url
    return { success: true, redirecting: true }
  }
  throw new Error('Stripe session URL not returned')
}

async function _cancelStripeSubscription(userId) {
  const { error } = await supabase.functions.invoke('cancel-subscription', {
    body: { userId },
  })
  if (error) throw new Error(error.message)
  // Stripe webhook will update DB — no direct DB write here
}
