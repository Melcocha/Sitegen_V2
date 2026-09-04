/**
 * Domain availability checker
 * In production: integrate with GoDaddy or Namecheap API
 * For demo: returns smart mock results
 */

const TAKEN_DOMAINS = [
  'google', 'facebook', 'amazon', 'apple', 'microsoft',
  'tesla', 'netflix', 'airbnb', 'stripe', 'vercel',
  'shopify', 'wordpress', 'wix', 'squarespace', 'webflow',
]

const TLDS = ['.com', '.net', '.io', '.co', '.org', '.digital', '.online', '.site']

export async function checkDomainAvailability(domain) {
  const cleanDomain = domain.toLowerCase().replace(/[^a-z0-9-]/g, '').trim()

  if (!cleanDomain || cleanDomain.length < 2) {
    return { results: [] }
  }

  // Simulate API delay
  await new Promise((r) => setTimeout(r, 800))

  const isTaken = TAKEN_DOMAINS.some((d) => cleanDomain.includes(d))

  const results = TLDS.map((tld) => {
    const isMainTaken = tld === '.com' && isTaken
    const available = isMainTaken ? false : Math.random() > 0.35

    return {
      domain: `${cleanDomain}${tld}`,
      available,
      price: getPriceForTld(tld),
      popular: tld === '.com',
    }
  })

  // Sort: available first, .com first among available
  results.sort((a, b) => {
    if (a.available !== b.available) return b.available - a.available
    if (a.popular !== b.popular) return b.popular - a.popular
    return 0
  })

  // Generate smart alternative suggestions
  const alternatives = isTaken
    ? generateAlternatives(cleanDomain)
    : []

  return { results: results.slice(0, 6), alternatives }
}

function getPriceForTld(tld) {
  const prices = {
    '.com': '$11.99',
    '.net': '$13.99',
    '.io': '$39.99',
    '.co': '$29.99',
    '.org': '$11.99',
    '.digital': '$19.99',
    '.online': '$9.99',
    '.site': '$7.99',
  }
  return prices[tld] || '$14.99'
}

function generateAlternatives(base) {
  return [
    `${base}sv`,
    `${base}web`,
    `mi${base}`,
    `${base}online`,
    `${base}pro`,
    `${base}digital`,
  ]
}
