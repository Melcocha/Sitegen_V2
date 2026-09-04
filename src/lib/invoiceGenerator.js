/**
 * invoiceGenerator.js — SiteGen AI
 * ─────────────────────────────────────────────────────────────────
 * Generates a premium, print-ready invoice as an HTML document.
 * Opens in a new window for instant browser PDF download — zero deps.
 *
 * Also exports buildInvoiceHTML() for use in Edge Function emails.
 * ─────────────────────────────────────────────────────────────────
 */

import { PLAN_CONFIG } from './paymentService'

// ── Tax configuration (adjust per jurisdiction) ──────────────────
const TAX_RATE    = 0      // 0 = tax-exempt SaaS (adjust if needed)
const COMPANY_INFO = {
  name:    'SiteGen AI',
  brand:   'SaaSWeb Platform',
  address: '789 Innovation Drive, Suite 400',
  city:    'San Salvador, El Salvador',
  email:   'billing@saasweb.app',
  website: 'https://saasweb.app',
  taxId:   'ESA-2026-001',
}

// ── Helper: format currency ───────────────────────────────────────
const fmt = (cents) => `$${(cents / 100).toFixed(2)}`
const pad = (n, len = 6) => String(n).padStart(len, '0')

// ── Main: build full invoice HTML string ─────────────────────────
export function buildInvoiceHTML({ event, profile, user }) {
  const plan         = PLAN_CONFIG[event.plan] || { name: event.plan || 'Plan' }
  const amountCents  = event.amount_cents || 0
  const taxCents     = Math.round(amountCents * TAX_RATE)
  const totalCents   = amountCents + taxCents
  const billingLabel = event.billing_cycle === 'annual' ? 'Anual' : 'Mensual'
  const invoiceNum   = event.invoice_number || `INV-${new Date(event.created_at).getFullYear()}-${pad(Math.floor(Math.random() * 99999))}`
  const invoiceDate  = new Date(event.created_at).toLocaleDateString('es', { day: 'numeric', month: 'long', year: 'numeric' })
  const dueDate      = new Date(event.created_at).toLocaleDateString('es', { day: 'numeric', month: 'long', year: 'numeric' })

  // Period covered
  const periodStart  = new Date(event.created_at)
  const periodEnd    = new Date(periodStart)
  periodEnd.setDate(periodEnd.getDate() + (event.billing_cycle === 'annual' ? 365 : 30))
  const periodLabel  = `${periodStart.toLocaleDateString('es', { day: 'numeric', month: 'short' })} – ${periodEnd.toLocaleDateString('es', { day: 'numeric', month: 'short', year: 'numeric' })}`

  const clientName   = profile?.full_name || profile?.company_name || user?.email?.split('@')[0] || 'Cliente'
  const clientEmail  = user?.email || ''
  const clientCompany = profile?.company_name || ''
  const clientAddress = [profile?.address, profile?.city, profile?.country].filter(Boolean).join(', ') || 'Sin dirección registrada'
  const isPaid       = event.event_type === 'payment_success'
  const isDemo       = event.source === 'simulated'

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${invoiceNum} — SiteGen AI</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

    :root {
      --green:   #00C896;
      --green-d: #00A87A;
      --dark:    #0A0F1E;
      --ink:     #111827;
      --ink2:    #374151;
      --ink3:    #6B7280;
      --ink4:    #9CA3AF;
      --border:  #E5E7EB;
      --bg:      #F9FAFB;
    }

    body {
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
      color: var(--ink);
      background: #fff;
      font-size: 14px;
      line-height: 1.55;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    .invoice-wrap {
      max-width: 780px;
      margin: 0 auto;
      padding: 56px 56px 48px;
    }

    /* ── HEADER ── */
    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 44px;
      padding-bottom: 32px;
      border-bottom: 2px solid var(--border);
    }
    .logo-area { display: flex; align-items: center; gap: 12px; }
    .logo-mark {
      width: 44px; height: 44px;
      background: linear-gradient(135deg, var(--green), var(--green-d));
      border-radius: 12px;
      display: flex; align-items: center; justify-content: center;
      font-weight: 900; color: #fff; font-size: 20px; letter-spacing: -1px;
    }
    .logo-text { display: flex; flex-direction: column; }
    .logo-name { font-weight: 800; font-size: 18px; color: var(--dark); letter-spacing: -0.03em; }
    .logo-sub  { font-size: 11px; color: var(--ink4); font-weight: 500; letter-spacing: 0.04em; text-transform: uppercase; }

    .invoice-meta { text-align: right; }
    .invoice-title { font-size: 28px; font-weight: 900; color: var(--dark); letter-spacing: -0.04em; }
    .invoice-num   { font-size: 13px; color: var(--ink3); margin-top: 4px; font-weight: 500; }

    /* ── STATUS BADGE ── */
    .status-badge {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 5px 14px; border-radius: 999px;
      font-size: 11px; font-weight: 800; letter-spacing: 0.06em; text-transform: uppercase;
      margin-top: 10px;
    }
    .status-paid    { background: rgba(0,200,150,0.12); color: #00A87A; border: 1.5px solid rgba(0,200,150,0.3); }
    .status-demo    { background: rgba(99,102,241,0.1);  color: #6366F1; border: 1.5px solid rgba(99,102,241,0.25); }
    .status-dot     { width: 7px; height: 7px; border-radius: 50%; background: currentColor; }

    /* ── GRID: FROM / TO ── */
    .parties {
      display: grid; grid-template-columns: 1fr 1fr;
      gap: 24px; margin-bottom: 36px;
    }
    .party-card {
      background: var(--bg);
      border: 1.5px solid var(--border);
      border-radius: 14px; padding: 20px 22px;
    }
    .party-label {
      font-size: 10px; font-weight: 800; color: var(--ink4);
      text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 10px;
    }
    .party-name    { font-weight: 700; font-size: 15px; color: var(--ink); margin-bottom: 4px; }
    .party-detail  { font-size: 12.5px; color: var(--ink3); line-height: 1.65; }
    .party-detail a { color: var(--green); text-decoration: none; }

    /* ── INVOICE META ROW ── */
    .meta-row {
      display: grid; grid-template-columns: repeat(4, 1fr);
      gap: 1px; background: var(--border);
      border: 1.5px solid var(--border); border-radius: 14px;
      overflow: hidden; margin-bottom: 32px;
    }
    .meta-cell {
      background: #fff; padding: 16px 20px;
    }
    .meta-cell:first-child { border-radius: 13px 0 0 13px; }
    .meta-cell:last-child  { border-radius: 0 13px 13px 0; }
    .meta-key   { font-size: 10px; font-weight: 700; color: var(--ink4); text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 5px; }
    .meta-val   { font-weight: 700; font-size: 13.5px; color: var(--ink); }

    /* ── LINE ITEMS TABLE ── */
    .items-table { width: 100%; border-collapse: collapse; margin-bottom: 0; }
    .items-table thead tr {
      background: var(--dark);
    }
    .items-table thead th {
      padding: 12px 18px; text-align: left;
      font-size: 10.5px; font-weight: 700; color: rgba(255,255,255,0.6);
      text-transform: uppercase; letter-spacing: 0.06em;
    }
    .items-table thead th:last-child { text-align: right; }

    .items-table tbody tr { border-bottom: 1px solid var(--border); }
    .items-table tbody tr:last-child { border-bottom: none; }
    .items-table tbody td { padding: 16px 18px; vertical-align: top; }

    .item-name     { font-weight: 700; font-size: 13.5px; color: var(--ink); }
    .item-desc     { font-size: 11.5px; color: var(--ink3); margin-top: 3px; }
    .item-qty      { font-weight: 600; color: var(--ink2); font-size: 13px; }
    .item-price    { font-weight: 600; color: var(--ink2); font-size: 13px; text-align: right; }
    .item-total    { font-weight: 800; color: var(--ink); font-size: 13.5px; text-align: right; }

    .table-wrap {
      border: 1.5px solid var(--border); border-radius: 14px; overflow: hidden;
      margin-bottom: 28px;
    }

    /* ── TOTALS ── */
    .totals-section {
      display: flex; justify-content: flex-end; margin-bottom: 40px;
    }
    .totals-block {
      width: 280px;
      border: 1.5px solid var(--border); border-radius: 14px; overflow: hidden;
    }
    .totals-row {
      display: flex; justify-content: space-between; align-items: center;
      padding: 10px 20px; border-bottom: 1px solid var(--border);
      font-size: 13px;
    }
    .totals-row:last-child { border-bottom: none; }
    .totals-row.total {
      background: linear-gradient(135deg, var(--dark), #1a2035);
      padding: 14px 20px;
    }
    .totals-key      { color: var(--ink3); font-weight: 500; }
    .totals-val      { font-weight: 700; color: var(--ink); }
    .totals-row.total .totals-key { color: rgba(255,255,255,0.7); font-size: 12px; font-weight: 600; }
    .totals-row.total .totals-val { color: #fff; font-size: 20px; font-weight: 900; letter-spacing: -0.04em; }

    /* ── PAYMENT NOTE ── */
    .payment-note {
      background: rgba(0,200,150,0.07);
      border: 1.5px solid rgba(0,200,150,0.25);
      border-radius: 12px; padding: 16px 20px;
      display: flex; align-items: flex-start; gap: 12px;
      margin-bottom: 36px;
    }
    .note-icon { font-size: 18px; margin-top: 1px; flex-shrink: 0; }
    .note-text  { font-size: 12.5px; color: var(--ink2); line-height: 1.6; }
    .note-text strong { color: var(--ink); }

    /* ── FOOTER ── */
    .footer {
      border-top: 2px solid var(--border); padding-top: 28px;
      display: flex; justify-content: space-between; align-items: flex-end;
    }
    .footer-left { font-size: 11.5px; color: var(--ink4); line-height: 1.7; }
    .footer-left a { color: var(--green); text-decoration: none; }
    .footer-right { text-align: right; font-size: 11px; color: var(--ink4); }
    .thank-you {
      font-weight: 800; font-size: 15px; color: var(--dark);
      margin-bottom: 2px; letter-spacing: -0.02em;
    }

    /* ── WATERMARK (demo only) ── */
    .watermark {
      position: fixed; top: 50%; left: 50%;
      transform: translate(-50%, -50%) rotate(-35deg);
      font-size: 90px; font-weight: 900;
      color: rgba(99,102,241,0.07);
      letter-spacing: -0.04em;
      pointer-events: none; z-index: 0;
      text-transform: uppercase;
    }

    /* ── PRINT ── */
    @media print {
      body { background: #fff; }
      .invoice-wrap { padding: 32px 40px; }
      .no-print { display: none !important; }
    }

    /* ── DOWNLOAD BAR (visible on screen only) ── */
    .download-bar {
      position: fixed; top: 0; left: 0; right: 0;
      background: var(--dark); color: #fff;
      padding: 12px 24px;
      display: flex; align-items: center; justify-content: space-between;
      z-index: 100; gap: 16px;
      font-size: 13px;
    }
    .dl-left { display: flex; align-items: center; gap: 10px; }
    .dl-num  { font-weight: 800; color: var(--green); }
    .dl-info { color: rgba(255,255,255,0.6); font-size: 12px; }
    .dl-btn  {
      padding: 8px 22px;
      background: linear-gradient(135deg, var(--green), var(--green-d));
      border: none; border-radius: 8px;
      color: #fff; font-weight: 800; font-size: 13px;
      cursor: pointer; font-family: inherit;
      display: flex; align-items: center; gap: 7px;
      white-space: nowrap;
    }
    .dl-btn:hover { opacity: 0.9; }
    @media print { .download-bar { display: none !important; } body { padding-top: 0 !important; } }

    body { padding-top: 52px; }
  </style>
</head>
<body>
  ${isDemo ? '<div class="watermark">DEMO</div>' : ''}

  <!-- Download bar (screen only) -->
  <div class="download-bar no-print">
    <div class="dl-left">
      <span class="dl-num">${invoiceNum}</span>
      <span class="dl-info">· ${clientName} · ${fmt(totalCents)}</span>
    </div>
    <button class="dl-btn" onclick="window.print()">
      ⬇ Descargar PDF
    </button>
  </div>

  <div class="invoice-wrap">

    <!-- HEADER -->
    <header class="header">
      <div class="logo-area">
        <div class="logo-mark">S</div>
        <div class="logo-text">
          <span class="logo-name">${COMPANY_INFO.name}</span>
          <span class="logo-sub">${COMPANY_INFO.brand}</span>
        </div>
      </div>
      <div class="invoice-meta">
        <div class="invoice-title">FACTURA</div>
        <div class="invoice-num">${invoiceNum}</div>
        <div style="margin-top:8px">
          <span class="status-badge ${isPaid ? 'status-paid' : 'status-demo'}">
            <span class="status-dot"></span>
            ${isPaid ? 'Pago exitoso' : 'Demostración'}
          </span>
          ${isDemo ? '<span class="status-badge status-demo" style="margin-left:6px"><span class="status-dot"></span>Modo Demo</span>' : ''}
        </div>
      </div>
    </header>

    <!-- FROM / TO -->
    <div class="parties">
      <div class="party-card">
        <div class="party-label">Emitido por</div>
        <div class="party-name">${COMPANY_INFO.name}</div>
        <div class="party-detail">
          ${COMPANY_INFO.address}<br>
          ${COMPANY_INFO.city}<br>
          <a href="mailto:${COMPANY_INFO.email}">${COMPANY_INFO.email}</a><br>
          <a href="${COMPANY_INFO.website}">${COMPANY_INFO.website}</a><br>
          Tax ID: ${COMPANY_INFO.taxId}
        </div>
      </div>
      <div class="party-card">
        <div class="party-label">Facturado a</div>
        <div class="party-name">${clientName}</div>
        <div class="party-detail">
          ${clientCompany ? clientCompany + '<br>' : ''}
          <a href="mailto:${clientEmail}">${clientEmail}</a><br>
          ${clientAddress}
        </div>
      </div>
    </div>

    <!-- META ROW -->
    <div class="meta-row">
      <div class="meta-cell">
        <div class="meta-key">N° Factura</div>
        <div class="meta-val">${invoiceNum}</div>
      </div>
      <div class="meta-cell">
        <div class="meta-key">Fecha emisión</div>
        <div class="meta-val">${invoiceDate}</div>
      </div>
      <div class="meta-cell">
        <div class="meta-key">Vencimiento</div>
        <div class="meta-val">${dueDate}</div>
      </div>
      <div class="meta-cell">
        <div class="meta-key">Período</div>
        <div class="meta-val" style="font-size:12px">${periodLabel}</div>
      </div>
    </div>

    <!-- LINE ITEMS -->
    <div class="table-wrap">
      <table class="items-table">
        <thead>
          <tr>
            <th style="width:45%">Descripción</th>
            <th>Cantidad</th>
            <th>Precio unitario</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div class="item-name">Plan ${plan.name} — Suscripción ${billingLabel}</div>
              <div class="item-desc">
                Acceso completo al Plan ${plan.name} · ${periodLabel}<br>
                Generación de sitios IA · SSL automático · Soporte incluido
              </div>
            </td>
            <td class="item-qty">1</td>
            <td class="item-price">${fmt(amountCents)}</td>
            <td class="item-total">${fmt(amountCents)}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- TOTALS -->
    <div class="totals-section">
      <div class="totals-block">
        <div class="totals-row">
          <span class="totals-key">Subtotal</span>
          <span class="totals-val">${fmt(amountCents)}</span>
        </div>
        ${TAX_RATE > 0 ? `
        <div class="totals-row">
          <span class="totals-key">IVA (${TAX_RATE * 100}%)</span>
          <span class="totals-val">${fmt(taxCents)}</span>
        </div>` : `
        <div class="totals-row">
          <span class="totals-key">Impuestos</span>
          <span class="totals-val" style="color:#10B981">Exento</span>
        </div>`}
        <div class="totals-row total">
          <span class="totals-key">TOTAL</span>
          <span class="totals-val">${fmt(totalCents)}</span>
        </div>
      </div>
    </div>

    <!-- PAYMENT NOTE -->
    <div class="payment-note">
      <span class="note-icon">✅</span>
      <div class="note-text">
        <strong>Pago recibido</strong> — Esta factura ha sido liquidada exitosamente el <strong>${invoiceDate}</strong>.
        ${isDemo ? '<br><span style="color:#6366F1">⚠ Esta factura fue generada en <strong>modo demostración</strong>. No representa un cargo real a ninguna tarjeta de crédito.</span>' : ''}
        El acceso al Plan <strong>${plan.name}</strong> está activo hasta <strong>${periodEnd.toLocaleDateString('es', { day: 'numeric', month: 'long', year: 'numeric' })}</strong>.
      </div>
    </div>

    <!-- FOOTER -->
    <footer class="footer">
      <div class="footer-left">
        <strong style="color:var(--ink);font-size:12.5px">${COMPANY_INFO.name}</strong><br>
        ${COMPANY_INFO.address} · ${COMPANY_INFO.city}<br>
        <a href="mailto:${COMPANY_INFO.email}">${COMPANY_INFO.email}</a> ·
        <a href="${COMPANY_INFO.website}">${COMPANY_INFO.website}</a>
      </div>
      <div class="footer-right">
        <div class="thank-you">¡Gracias por tu confianza!</div>
        <div>Cualquier consulta: <a href="mailto:${COMPANY_INFO.email}" style="color:var(--green)">${COMPANY_INFO.email}</a></div>
        <div style="margin-top:8px; font-size:10px; color:#D1D5DB">${invoiceNum} · ${COMPANY_INFO.name} © ${new Date().getFullYear()}</div>
      </div>
    </footer>

  </div><!-- /invoice-wrap -->

  <script>
    // Auto-title for browser tab
    document.title = '${invoiceNum} — ${clientName} — SiteGen AI'
  </script>
</body>
</html>`
}

// ── downloadInvoice: opens a new window and triggers print ────────
export function downloadInvoice({ event, profile, user }) {
  if (!event || event.event_type !== 'payment_success') {
    console.warn('[Invoice] Only payment_success events generate invoices')
    return
  }

  const html = buildInvoiceHTML({ event, profile, user })
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' })
  const url  = URL.createObjectURL(blob)

  const win = window.open(url, '_blank', 'width=900,height=750,scrollbars=yes')
  if (!win) {
    const a = document.createElement('a')
    a.href = url
    a.download = `${event.invoice_number || 'invoice'}.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  setTimeout(() => URL.revokeObjectURL(url), 5 * 60 * 1000)
}

// ── downloadInvoiceFromRecord ─────────────────────────────────────
// Generates a PDF directly from an `invoices` table row.
// No dependency on payment_events — works with our new table.
export function downloadInvoiceFromRecord({ invoice, profile, user }) {
  if (!invoice) return

  // Shape the invoices row into what buildInvoiceHTML expects
  const event = {
    invoice_number: invoice.invoice_number,
    plan:           invoice.plan,
    amount_cents:   invoice.amount_cents,
    billing_cycle:  invoice.billing_cycle || 'monthly',
    event_type:     invoice.status === 'paid' ? 'payment_success' : 'payment_pending',
    source:         invoice.stripe_invoice_id ? 'stripe' : 'manual',
    created_at:     invoice.paid_at || invoice.created_at,
  }

  const profileFull = profile || {
    full_name:    invoice.client_name,
    company_name: invoice.client_name,
  }
  const userFull = user || { email: invoice.client_email }

  const html = buildInvoiceHTML({ event, profile: profileFull, user: userFull })
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' })
  const url  = URL.createObjectURL(blob)

  const win = window.open(url, '_blank', 'width=900,height=750,scrollbars=yes')
  if (!win) {
    const a = document.createElement('a')
    a.href = url
    a.download = `${invoice.invoice_number}.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  setTimeout(() => URL.revokeObjectURL(url), 5 * 60 * 1000)
}
