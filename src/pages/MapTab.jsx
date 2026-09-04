import { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import { MapPin, Globe, Layers, X, Building2, Phone, ExternalLink, Users, ChevronRight, RefreshCw } from 'lucide-react'
import { supabase } from '../lib/supabase'

// ─── CSS for Leaflet (injected once) ─────────────────────────────
const LEAFLET_CSS = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'

function injectLeafletCSS() {
  if (document.getElementById('leaflet-css')) return
  const link = document.createElement('link')
  link.id = 'leaflet-css'
  link.rel = 'stylesheet'
  link.href = LEAFLET_CSS
  document.head.appendChild(link)
}

// ─── Geocode address via Nominatim (free, no key) ────────────────
async function geocodeAddress(address) {
  if (!address) return null
  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`
    const res = await fetch(url, { headers: { 'Accept-Language': 'en' } })
    const data = await res.json()
    if (data[0]) {
      return {
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon),
        city: data[0].display_name.split(',')[0],
        state: data[0].display_name.split(',')[1]?.trim() || '',
      }
    }
  } catch { /* silent */ }
  return null
}

// ─── Color by count ──────────────────────────────────────────────
function markerColor(count) {
  if (count >= 15) return '#EF4444'
  if (count >= 8)  return '#F97316'
  if (count >= 4)  return '#F59E0B'
  return '#00C896'
}

// ─── Client Card Modal ───────────────────────────────────────────
function ClientModal({ client, onClose }) {
  if (!client) return null
  const brand = client.brand_color || '#00C896'
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div style={{ background: '#fff', borderRadius: 20, width: 380, maxWidth: '100%', boxShadow: '0 24px 80px rgba(0,0,0,0.18)', overflow: 'hidden', animation: 'slideUp 0.2s ease' }}>
        {/* Header with brand color */}
        <div style={{ background: `linear-gradient(135deg, ${brand}, ${brand}CC)`, padding: '24px 24px 20px', position: 'relative' }}>
          <button onClick={onClose} style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(255,255,255,0.25)', border: 'none', borderRadius: '50%', width: 32, height: 32, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
            <X size={16} />
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            {client.logo_url ? (
              <img src={client.logo_url} alt={client.company_name}
                style={{ width: 56, height: 56, borderRadius: 14, objectFit: 'contain', background: '#fff', padding: 6, border: '2px solid rgba(255,255,255,0.4)' }} />
            ) : (
              <div style={{ width: 56, height: 56, borderRadius: 14, background: 'rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1.5rem', color: '#fff' }}>
                {(client.company_name || client.full_name || '?')[0].toUpperCase()}
              </div>
            )}
            <div>
              <div style={{ fontWeight: 800, fontSize: '1rem', color: '#fff', lineHeight: 1.2 }}>
                {client.company_name || client.full_name || 'Sin nombre'}
              </div>
              {client.industry && (
                <span style={{ display: 'inline-block', marginTop: 4, padding: '2px 10px', background: 'rgba(255,255,255,0.25)', borderRadius: 999, fontSize: '0.72rem', fontWeight: 700, color: '#fff' }}>
                  {client.industry}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: '20px 24px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>

          {/* Location */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', background: '#F9FAFB', borderRadius: 10 }}>
            <MapPin size={16} color={brand} />
            <span style={{ fontSize: '0.875rem', color: '#374151', fontWeight: 600 }}>
              {client.city || client.address || 'Ubicación no disponible'}
              {client.state ? `, ${client.state}` : ''}
            </span>
          </div>

          {/* Details grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {client.phone && (
              <div style={{ padding: '10px 12px', background: '#F9FAFB', borderRadius: 10 }}>
                <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Teléfono</div>
                <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#111827' }}>{client.phone}</div>
              </div>
            )}
            <div style={{ padding: '10px 12px', background: '#F9FAFB', borderRadius: 10 }}>
              <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Cliente desde</div>
              <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#111827' }}>
                {new Date(client.created_at).toLocaleDateString('es', { month: 'short', year: 'numeric' })}
              </div>
            </div>
            {client.website && (
              <div style={{ padding: '10px 12px', background: '#F9FAFB', borderRadius: 10, gridColumn: '1 / -1' }}>
                <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Sitio web</div>
                <a href={client.website.startsWith('http') ? client.website : `https://${client.website}`}
                  target="_blank" rel="noreferrer"
                  style={{ fontSize: '0.8125rem', fontWeight: 600, color: brand, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
                  {client.website} <ExternalLink size={12} />
                </a>
              </div>
            )}
          </div>

          {client.description && (
            <div style={{ padding: '10px 14px', background: '#F9FAFB', borderRadius: 10, fontSize: '0.8125rem', color: '#6B7280', lineHeight: 1.5 }}>
              {client.description}
            </div>
          )}

          {/* Actions */}
          <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
            <a href={`mailto:${client.email || ''}`}
              style={{ flex: 1, padding: '10px', textAlign: 'center', background: brand, border: 'none', borderRadius: 10, color: '#fff', fontWeight: 700, fontSize: '0.875rem', cursor: 'pointer', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              <Phone size={14} /> Contactar
            </a>
            <button onClick={onClose}
              style={{ flex: 1, padding: '10px', background: '#F9FAFB', border: '1.5px solid #E5E7EB', borderRadius: 10, color: '#374151', fontWeight: 700, fontSize: '0.875rem', cursor: 'pointer', fontFamily: 'var(--font)' }}>
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── 2D MAP (Leaflet) ─────────────────────────────────────────────
function Map2D({ clients, onClientClick, mapStyleUrl, viewport, onViewportChange }) {
  const mapRef = useRef(null)
  const mapInstance = useRef(null)

  // Derive CartoDB tile URL from the GL style URL
  const tileUrl = mapStyleUrl?.includes('dark') 
    ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
    : mapStyleUrl?.includes('voyager') 
    ? 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
    : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'

  useEffect(() => {
    injectLeafletCSS()
    let L
    import('leaflet').then(mod => {
      L = mod.default

      if (mapInstance.current) {
        mapInstance.current.remove()
        mapInstance.current = null
      }
      if (!mapRef.current) return

      // Light map style — CartoDB Positron
      const map = L.map(mapRef.current, {
        center: [viewport.lat, viewport.lng],
        zoom: viewport.zoom,
        zoomControl: true,
      })
      mapInstance.current = map

      // Sync viewport on move
      map.on('moveend', () => {
        const c = map.getCenter()
        onViewportChange({ lat: c.lat, lng: c.lng, zoom: map.getZoom() })
      })

      L.tileLayer(tileUrl, {
        attribution: '\u00a9 OpenStreetMap \u00a9 CARTO',
        subdomains: 'abcd', maxZoom: 19,
      }).addTo(map)

      const located = clients.filter(c => c.lat && c.lng)

      located.forEach(client => {
        const color = markerColor(1)   // 1 client = density green #00C896
        // Office pin SVG — same density color as 3D map
        const svgIcon = L.divIcon({
          className: '',
          html: `<img src="${buildOfficePinSVG(color)}" style="width:44px;height:56px;filter:drop-shadow(0 2px 6px rgba(0,0,0,0.22));" />`,
          iconSize: [44, 56],
          iconAnchor: [22, 56],
        })

        const marker = L.marker([client.lat, client.lng], { icon: svgIcon })

        // Hover tooltip
        marker.bindTooltip(`
          <div style="font-family:system-ui;padding:4px 2px;min-width:160px;">
            <div style="font-weight:700;font-size:0.875rem;color:#111827;">${client.company_name || client.full_name || 'Sin nombre'}</div>
            ${client.industry ? `<div style="font-size:0.75rem;color:#6B7280;margin-top:2px;">${client.industry}</div>` : ''}
            <div style="font-size:0.72rem;color:#9CA3AF;margin-top:4px;">📍 ${client.city || client.address || 'Sin ubicación'}</div>
            <div style="font-size:0.7rem;color:${color};font-weight:600;margin-top:4px;">▶ Click para ver perfil</div>
          </div>
        `, { permanent: false, direction: 'top', offset: [0, -20], className: 'map-tooltip' })

        // Click → modal
        marker.on('click', () => onClientClick(client))

        // Pulse on hover — target the img element
        marker.on('mouseover', () => {
          const el = marker.getElement()?.querySelector('img')
          if (el) { el.style.transform = 'scale(1.2)'; el.style.transition = 'transform 0.15s' }
        })
        marker.on('mouseout', () => {
          const el = marker.getElement()?.querySelector('img')
          if (el) el.style.transform = 'scale(1)'
        })

        marker.addTo(map)
      })

      // Only auto-fit if viewport is at default (user hasn't moved the map)
      if (located.length > 0 && viewport.zoom <= 4 && viewport.lat === 37) {
        const bounds = L.latLngBounds(located.map(c => [c.lat, c.lng]))
        map.fitBounds(bounds, { padding: [60, 60], maxZoom: 10 })
      }
    })

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove()
        mapInstance.current = null
      }
    }
  }, [clients, tileUrl])

  return (
    <>
      <style>{`
        .map-tooltip { background:#fff!important;border:1.5px solid #E5E7EB!important;border-radius:10px!important;box-shadow:0 4px 20px rgba(0,0,0,0.12)!important;padding:8px 12px!important; }
        .map-tooltip::before { display:none!important; }
        .leaflet-container { font-family: var(--font, system-ui)!important; }
      `}</style>
      <div ref={mapRef} style={{ width: '100%', height: '100%', borderRadius: 16 }} />
    </>
  )
}

// ─── Map style presets ──────────────────────────────────────────
const MAP_STYLES = [
  { id: 'positron',   label: 'Suave',    color: '#E8EAF0', url: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json' },
  { id: 'voyager',    label: 'Cálido',   color: '#F5ECD7', url: 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json' },
  { id: 'positron-nl',label: 'Limpio',   color: '#F0F4F8', url: 'https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json' },
  { id: 'dark',       label: 'Oscuro',   color: '#1A2035', url: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json' },
  { id: 'voyager-nl', label: 'Vibrante', color: '#D4E9C8', url: 'https://basemaps.cartocdn.com/gl/voyager-nolabels-gl-style/style.json' },
]

// Build SVG office pin for a given color
function buildOfficePinSVG(color = '#00C896') {
  const c = encodeURIComponent(color)
  return `data:image/svg+xml,%3Csvg xmlns='http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg' width='44' height='56' viewBox='0 0 44 56'%3E%3Cpath d='M22 2C11 2 2 11 2 22c0 15 20 32 20 32s20-17 20-32C42 11 33 2 22 2z' fill='${c}' stroke='white' stroke-width='2'%2F%3E%3Crect x='10' y='9' width='24' height='20' rx='2' fill='white' opacity='.95'%2F%3E%3Crect x='13' y='12' width='4' height='4' rx='.8' fill='${c}'%2F%3E%3Crect x='20' y='12' width='4' height='4' rx='.8' fill='${c}'%2F%3E%3Crect x='27' y='12' width='4' height='4' rx='.8' fill='${c}'%2F%3E%3Crect x='13' y='19' width='4' height='4' rx='.8' fill='${c}'%2F%3E%3Crect x='20' y='19' width='4' height='4' rx='.8' fill='${c}'%2F%3E%3Crect x='27' y='19' width='4' height='4' rx='.8' fill='${c}'%2F%3E%3Crect x='19' y='25' width='6' height='4' rx='.8' fill='${c}' opacity='.6'%2F%3E%3C%2Fsvg%3E`
}

// ─── 3D MAP (MapLibre GL nativo) ──────────────────────────────────
function Map3D({ clients, onClientClick, mapStyleUrl, viewport, onViewportChange }) {
  const containerRef = useRef(null)
  const mapRef       = useRef(null)
  const [tooltip, setTooltip] = useState(null)
  const [ready, setReady]     = useState(false)

  const located = clients.filter(c => c.lat && c.lng)

  useEffect(() => {
    if (!containerRef.current) return
    let map

    import('maplibre-gl').then(mod => {
      const maplibregl = mod.default || mod

      if (!document.getElementById('maplibre-css')) {
        const link = document.createElement('link')
        link.id = 'maplibre-css'; link.rel = 'stylesheet'
        link.href = 'https://unpkg.com/maplibre-gl@4/dist/maplibre-gl.css'
        document.head.appendChild(link)
      }

      map = new maplibregl.Map({
        container: containerRef.current,
        style: mapStyleUrl,
        center: [viewport.lng, viewport.lat],
        zoom: viewport.zoom,
        pitch: 50, bearing: -12, antialias: true,
      })
      mapRef.current = map

      map.on('moveend', () => {
        const c = map.getCenter()
        onViewportChange({ lat: c.lat, lng: c.lng, zoom: map.getZoom() })
      })

      map.on('load', () => {
        setReady(true)

        // GeoJSON source
        const geojson = {
          type: 'FeatureCollection',
          features: located.map((c, i) => ({
            type: 'Feature',
            id: i,
            geometry: { type: 'Point', coordinates: [c.lng, c.lat] },
            properties: {
              idx: i,
              name: c.company_name || c.full_name || 'Sin nombre',
              industry: c.industry || '',
              city: c.city || c.address || '',
              color: c.brand_color || '#00C896',
            },
          })),
        }

        // Load custom SVG office pin image
        const pinImg = new Image(44, 56)
        pinImg.onload = () => {
          if (!map.hasImage('office-pin')) map.addImage('office-pin', pinImg, { sdf: false })

          map.addSource('clients', { type: 'geojson', data: geojson, cluster: true, clusterRadius: 60, clusterMaxZoom: 10 })

          // Cluster circles
          map.addLayer({
            id: 'clusters', type: 'circle', source: 'clients', filter: ['has', 'point_count'],
            paint: {
              'circle-color': ['step',['get','point_count'],'#00C896',5,'#F59E0B',10,'#EF4444'],
              'circle-radius': ['step',['get','point_count'],24,5,32,10,42],
              'circle-opacity': 0.85, 'circle-stroke-width': 3, 'circle-stroke-color': '#fff',
            },
          })
          map.addLayer({
            id: 'cluster-count', type: 'symbol', source: 'clients', filter: ['has', 'point_count'],
            layout: { 'text-field': '{point_count_abbreviated}', 'text-font': ['Open Sans Bold','Arial Unicode MS Bold'], 'text-size': 14 },
            paint: { 'text-color': '#fff' },
          })

          // Individual office pin icons
          map.addLayer({
            id: 'unclustered', type: 'symbol', source: 'clients',
            filter: ['!', ['has', 'point_count']],
            layout: {
              'icon-image': 'office-pin',
              'icon-size': 1,
              'icon-anchor': 'bottom',
              'icon-allow-overlap': true,
            },
          })

          // Hover
          map.on('mousemove', 'unclustered', e => {
            map.getCanvas().style.cursor = 'pointer'
            const f = e.features[0]
            const rect = containerRef.current.getBoundingClientRect()
            setTooltip({ x: e.originalEvent.clientX-rect.left, y: e.originalEvent.clientY-rect.top, name: f.properties.name, industry: f.properties.industry, city: f.properties.city })
          })
          map.on('mouseleave', 'unclustered', () => { map.getCanvas().style.cursor = ''; setTooltip(null) })
          map.on('click', 'unclustered', e => { const client = located[e.features[0].id]; if (client) onClientClick(client) })
          map.on('click', 'clusters', e => {
            const features = map.queryRenderedFeatures(e.point, { layers: ['clusters'] })
            const clusterId = features[0].properties.cluster_id
            map.getSource('clients').getClusterExpansionZoom(clusterId, (err, zoom) => { if (!err) map.easeTo({ center: features[0].geometry.coordinates, zoom }) })
          })
          map.on('mousemove', 'clusters', () => { map.getCanvas().style.cursor = 'pointer' })
          map.on('mouseleave', 'clusters', () => { map.getCanvas().style.cursor = '' })
        }
        pinImg.src = buildOfficePinSVG()
      })
    }).catch(e => console.error('MapLibre:', e))

    return () => { if (mapRef.current) { mapRef.current.remove(); mapRef.current = null } }
  }, [clients, mapStyleUrl])

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: 16, overflow: 'hidden' }}>
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />

      {!ready && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, background: '#F9FAFB' }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', border: '3px solid #00C896', borderTopColor: 'transparent', animation: 'spin 0.8s linear infinite' }} />
          <div style={{ fontSize: '0.8125rem', color: '#9CA3AF' }}>Cargando vista 3D...</div>
        </div>
      )}

      {tooltip && (
        <div style={{
          position: 'absolute', left: tooltip.x + 14, top: tooltip.y - 60,
          background: '#fff', border: '1.5px solid #E5E7EB', borderRadius: 10,
          padding: '8px 14px', boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
          pointerEvents: 'none', zIndex: 100, fontFamily: 'var(--font)', minWidth: 160,
        }}>
          <div style={{ fontWeight: 700, fontSize: '0.875rem', color: '#111827' }}>{tooltip.name}</div>
          {tooltip.industry && <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>{tooltip.industry}</div>}
          {tooltip.city && <div style={{ fontSize: '0.72rem', color: '#9CA3AF', marginTop: 2 }}>📍 {tooltip.city}</div>}
          <div style={{ fontSize: '0.7rem', color: '#00C896', fontWeight: 600, marginTop: 4 }}>Click para ver detalles</div>
        </div>
      )}
    </div>
  )
}


// ─── MAIN MapTab ──────────────────────────────────────────────────
export default function MapTab({ profiles }) {
  const [view, setView]             = useState('2d')
  const [mapStyleId, setMapStyleId] = useState('positron')
  const [selectedClient, setSelectedClient] = useState(null)
  const [clients, setClients]       = useState([])
  const [geocoding, setGeocoding]   = useState(false)
  const [geocoded, setGeocoded]     = useState(0)
  // Shared viewport — preserved when switching 2D ↔ 3D
  const [viewport, setViewport]     = useState({ lat: 37, lng: -95, zoom: 3.5 })

  const mapStyleUrl = MAP_STYLES.find(s => s.id === mapStyleId)?.url || MAP_STYLES[0].url

  // Load clients with coords; geocode missing
  useEffect(() => {
    if (!profiles?.length) { setClients([]); return }

    const needsGeocode = profiles.filter(p => !p.lat && p.address)
    const hasCoords    = profiles.filter(p => p.lat && p.lng)

    setClients(hasCoords)

    if (needsGeocode.length === 0) return

    setGeocoding(true)
    let done = 0
    const newClients = [...hasCoords]

    ;(async () => {
      for (const p of needsGeocode) {
        const geo = await geocodeAddress(p.address)
        if (geo) {
          // Save coords to Supabase
          await supabase.from('profiles').update({
            lat: geo.lat, lng: geo.lng,
            city: geo.city, state: geo.state,
          }).eq('id', p.id)
          newClients.push({ ...p, lat: geo.lat, lng: geo.lng, city: geo.city, state: geo.state })
        }
        done++
        setGeocoded(done)
        setClients([...newClients])
        // Rate limit Nominatim: 1 req/sec
        await new Promise(r => setTimeout(r, 1100))
      }
      setGeocoding(false)
    })()
  }, [profiles])

  // Stats — memoized so viewport changes don't recreate arrays
  const withCoords = useMemo(() => clients.filter(c => c.lat && c.lng), [clients])
  const states     = useMemo(() => [...new Set(clients.map(c => c.state).filter(Boolean))], [clients])

  const topRegions = useMemo(() => {
    const count = {}
    clients.forEach(c => {
      if (c.state) count[c.state] = (count[c.state] || 0) + 1
      else if (c.city) count[c.city] = (count[c.city] || 0) + 1
    })
    return Object.entries(count).sort((a, b) => b[1] - a[1]).slice(0, 8)
  }, [clients])
  const maxRegion = topRegions[0]?.[1] || 1

  // Stable callback - doesn't change on re-render
  const handleViewportChange = useCallback((v) => setViewport(v), [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 0, fontFamily: 'var(--font)' }}>

      {/* ── Header ── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <h1 style={{ fontWeight: 800, fontSize: '1.5rem', color: '#111827', marginBottom: 4, letterSpacing: '-0.03em' }}>
            Mapa de Clientes
          </h1>
          <div style={{ display: 'flex', gap: 16, fontSize: '0.875rem', color: '#6B7280' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <Users size={14} style={{ color: '#00C896' }} />
              <strong style={{ color: '#111827' }}>{profiles?.length || 0}</strong> clientes
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <MapPin size={14} style={{ color: '#6366F1' }} />
              <strong style={{ color: '#111827' }}>{withCoords.length}</strong> ubicados
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <Globe size={14} style={{ color: '#F59E0B' }} />
              <strong style={{ color: '#111827' }}>{states.length}</strong> estados
            </span>
          </div>
        </div>

        {/* Style picker + 2D/3D toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* Map style swatches */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#9CA3AF', marginRight: 4 }}>Estilo</span>
            {MAP_STYLES.map(s => (
              <button key={s.id} onClick={() => setMapStyleId(s.id)} title={s.label}
                style={{ width: 22, height: 22, borderRadius: 6, background: s.color, border: mapStyleId === s.id ? '2.5px solid #111827' : '2px solid #D1D5DB', cursor: 'pointer', boxShadow: mapStyleId === s.id ? `0 0 0 2px #fff, 0 0 0 4px #111827` : 'none', transition: 'all 0.15s', outline: 'none' }} />
            ))}
          </div>
          <div style={{ width: 1, height: 20, background: '#E5E7EB' }} />
          {geocoding && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8rem', color: '#9CA3AF' }}>
              <RefreshCw size={13} style={{ animation: 'spin 1s linear infinite' }} />
              Geocodificando {geocoded}/{profiles?.filter(p => !p.lat && p.address).length}...
            </div>
          )}
          <div style={{ display: 'flex', background: '#F3F4F6', borderRadius: 10, padding: 3 }}>
            {[['2d', '2D Mapa', <Layers size={14}/>], ['3d', '3D Vista', <Globe size={14}/>]].map(([v, label, icon]) => (
              <button key={v} onClick={() => setView(v)}
                style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', fontFamily: 'var(--font)', fontSize: '0.8125rem', fontWeight: 700, background: view === v ? '#fff' : 'transparent', color: view === v ? '#111827' : '#9CA3AF', boxShadow: view === v ? '0 1px 4px rgba(0,0,0,0.1)' : 'none', transition: 'all 0.15s' }}>
                {icon} {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main layout: Map + Right Panel ── */}
      <div style={{ display: 'flex', gap: 20, flex: 1, minHeight: 0 }}>

        {/* Map area */}
        <div style={{ flex: 1, borderRadius: 16, overflow: 'hidden', border: '1.5px solid #E5E7EB', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', minHeight: 500, position: 'relative' }}>
          {withCoords.length === 0 && !geocoding && (
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 10, background: 'rgba(255,255,255,0.9)', gap: 12 }}>
              <MapPin size={36} color="#D1D5DB" />
              <div style={{ fontWeight: 700, color: '#9CA3AF', fontSize: '0.9375rem' }}>Sin ubicaciones disponibles</div>
              <div style={{ fontSize: '0.8125rem', color: '#D1D5DB', textAlign: 'center', maxWidth: 280 }}>
                Los clientes necesitan una dirección guardada en su perfil para aparecer en el mapa
              </div>
            </div>
          )}

          {view === '2d' ? (
            <Map2D clients={withCoords} onClientClick={setSelectedClient} mapStyleUrl={mapStyleUrl} viewport={viewport} onViewportChange={handleViewportChange} />
          ) : (
            <Map3D clients={withCoords} onClientClick={setSelectedClient} mapStyleUrl={mapStyleUrl} viewport={viewport} onViewportChange={handleViewportChange} />
          )}
        </div>

        {/* Right panel — Top Regions */}
        <div style={{ width: 240, display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Color legend */}
          <div style={{ background: '#fff', border: '1.5px solid #E5E7EB', borderRadius: 14, padding: 16, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#374151', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Densidad</div>
            {[['1-3', '#00C896'],['4-7', '#F59E0B'],['8-14', '#F97316'],['15+', '#EF4444']].map(([range, color]) => (
              <div key={range} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: color, flexShrink: 0 }} />
                <span style={{ fontSize: '0.8rem', color: '#6B7280' }}>{range} clientes</span>
              </div>
            ))}
          </div>

          {/* Top regions */}
          <div style={{ background: '#fff', border: '1.5px solid #E5E7EB', borderRadius: 14, padding: 16, boxShadow: '0 1px 4px rgba(0,0,0,0.04)', flex: 1 }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#374151', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Top Regiones</div>
            {topRegions.length === 0 ? (
              <div style={{ fontSize: '0.8rem', color: '#D1D5DB', textAlign: 'center', padding: '20px 0' }}>Sin datos</div>
            ) : topRegions.map(([region, count], i) => (
              <div key={region} style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151' }}>{region}</span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#111827' }}>{count}</span>
                </div>
                <div style={{ height: 5, background: '#F3F4F6', borderRadius: 99 }}>
                  <div style={{ height: '100%', borderRadius: 99, background: i === 0 ? '#00C896' : i === 1 ? '#6366F1' : '#F59E0B', width: `${(count / maxRegion) * 100}%`, transition: 'width 0.5s' }} />
                </div>
              </div>
            ))}
          </div>

          {/* Clients without address */}
          {profiles && profiles.length - withCoords.length > 0 && (
            <div style={{ background: '#FFFBEB', border: '1.5px solid #FDE68A', borderRadius: 14, padding: 14 }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#92400E', marginBottom: 4 }}>Sin ubicación</div>
              <div style={{ fontSize: '0.8rem', color: '#B45309' }}>
                {profiles.length - withCoords.length} cliente{profiles.length - withCoords.length !== 1 ? 's' : ''} sin dirección
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Client modal */}
      {selectedClient && (
        <ClientModal client={selectedClient} onClose={() => setSelectedClient(null)} />
      )}

      <style>{`
        @keyframes slideUp { from { transform: translateY(20px); opacity:0 } to { transform: translateY(0); opacity:1 } }
        @keyframes spin { to { transform: rotate(360deg) } }
      `}</style>
    </div>
  )
}
