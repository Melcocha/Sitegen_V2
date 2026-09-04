import React, { useState, useEffect, useRef } from 'react'

/**
 * CanvasTransformerOverlay — Webflow / Figma style universal interactive canvas
 * overlay that attaches to the active element on screen and provides direct
 * 2D drag-to-move and 8-point corner/edge resizing.
 */
export default function CanvasTransformerOverlay({
  containerRef,
  activeField,
  ovStyle = {},
  onQuickUpdate,
  onQuickUpdateBatch,
}) {
  const [box, setBox] = useState(null)
  const animFrameRef = useRef(null)

  // Track active DOM element position and size
  useEffect(() => {
    if (!activeField || !containerRef?.current) {
      setBox(null)
      return
    }

    const updateBox = () => {
      const container = containerRef.current
      if (!container) return

      // Escape quotes/special chars in attribute selector if any
      const safeField = CSS.escape ? CSS.escape(activeField) : activeField
      const activeEl = container.querySelector(`[data-field="${safeField}"], [data-ovkey="${safeField}"]`)

      if (!activeEl) {
        setBox(null)
        return
      }

      const elRect = activeEl.getBoundingClientRect()
      const cRect = container.getBoundingClientRect()

      const top = elRect.top - cRect.top + container.scrollTop
      const left = elRect.left - cRect.left + container.scrollLeft
      const width = elRect.width
      const height = elRect.height

      setBox(prev => {
        if (
          prev &&
          Math.abs(prev.top - top) < 0.5 &&
          Math.abs(prev.left - left) < 0.5 &&
          Math.abs(prev.width - width) < 0.5 &&
          Math.abs(prev.height - height) < 0.5
        ) {
          return prev
        }
        return { top, left, width, height }
      })
    }

    updateBox()

    // Continuously monitor position during animations / scroll / resize
    const loop = () => {
      updateBox()
      animFrameRef.current = requestAnimationFrame(loop)
    }
    animFrameRef.current = requestAnimationFrame(loop)

    const handleScrollOrResize = () => updateBox()
    window.addEventListener('resize', handleScrollOrResize)
    const container = containerRef.current
    if (container) container.addEventListener('scroll', handleScrollOrResize)

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
      window.removeEventListener('resize', handleScrollOrResize)
      if (container) container.removeEventListener('scroll', handleScrollOrResize)
    }
  }, [activeField, ovStyle, containerRef])

  if (!box || !activeField || (!onQuickUpdate && !onQuickUpdateBatch)) return null

  // ── 1. Drag Move Handler (X, Y) ──
  const startMove = (e) => {
    e.preventDefault()
    e.stopPropagation()

    const startX = e.clientX
    const startY = e.clientY

    let initX = 0
    let initY = 0

    if (ovStyle.transform) {
      const match = ovStyle.transform.match(/translate\(\s*(-?\d+)px\s*,\s*(-?\d+)px\s*\)/)
      if (match) {
        initX = parseInt(match[1], 10) || 0
        initY = parseInt(match[2], 10) || 0
      }
    }

    const onMouseMove = (moveEv) => {
      const deltaX = moveEv.clientX - startX
      const deltaY = moveEv.clientY - startY
      const newX = initX + deltaX
      const newY = initY + deltaY
      if (onQuickUpdate) {
        onQuickUpdate(`elementStyles.${activeField}.transform`, `translate(${newX}px, ${newY}px)`)
      }
    }

    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
  }

  // ── 2. Width Resize Handler ──
  const startResizeWidth = (e, direction = 1) => {
    e.preventDefault()
    e.stopPropagation()

    const startX = e.clientX
    const initWidth = box.width

    const onMouseMove = (moveEv) => {
      const deltaX = (moveEv.clientX - startX) * direction
      const newWidth = Math.max(60, Math.round(initWidth + deltaX))
      if (onQuickUpdateBatch) {
        onQuickUpdateBatch([
          [`elementStyles.${activeField}.width`, `${newWidth}px`],
          [`elementStyles.${activeField}.maxWidth`, `${newWidth}px`],
        ])
      } else if (onQuickUpdate) {
        onQuickUpdate(`elementStyles.${activeField}.maxWidth`, `${newWidth}px`)
      }
    }

    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
  }

  // ── 3. Font Size / Height Resize Handler ──
  const startResizeFont = (e, direction = 1) => {
    e.preventDefault()
    e.stopPropagation()

    const startY = e.clientY
    let initFS = 16
    if (ovStyle.fontSize) {
      initFS = parseInt(ovStyle.fontSize, 10) || 16
    } else {
      const container = containerRef.current
      const safeField = CSS.escape ? CSS.escape(activeField) : activeField
      const activeEl = container ? container.querySelector(`[data-field="${safeField}"], [data-ovkey="${safeField}"]`) : null
      if (activeEl) {
        const computed = window.getComputedStyle(activeEl).fontSize
        initFS = parseInt(computed, 10) || 16
      }
    }

    const onMouseMove = (moveEv) => {
      const deltaY = (moveEv.clientY - startY) * direction
      const newFS = Math.max(10, Math.min(140, Math.round(initFS + deltaY * 0.4)))
      if (onQuickUpdate) {
        onQuickUpdate(`elementStyles.${activeField}.fontSize`, `${newFS}px`)
      }
    }

    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
  }

  const handleDotStyle = (posStyle, cursor) => ({
    position: 'absolute',
    width: 14,
    height: 14,
    background: '#6366F1',
    border: '2.5px solid #FFFFFF',
    borderRadius: '50%',
    cursor,
    zIndex: 100000,
    boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
    pointerEvents: 'auto',
    ...posStyle,
  })

  return (
    <div
      style={{
        position: 'absolute',
        top: box.top,
        left: box.left,
        width: box.width,
        height: box.height,
        pointerEvents: 'none',
        zIndex: 99999,
        transition: 'width 0.05s, height 0.05s, top 0.05s, left 0.05s',
      }}
    >
      {/* ✥ Move Handle Badge */}
      <div
        onMouseDown={startMove}
        title="Haz click y arrastra para mover a cualquier lugar de la página"
        style={{
          position: 'absolute',
          top: -30,
          left: 0,
          background: '#6366F1',
          color: '#FFFFFF',
          padding: '3px 10px',
          borderRadius: '7px',
          fontSize: '11px',
          fontWeight: 800,
          cursor: 'grab',
          userSelect: 'none',
          zIndex: 100001,
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          boxShadow: '0 4px 12px rgba(99,102,241,0.45)',
          pointerEvents: 'auto',
          lineHeight: '18px',
        }}
      >
        <span>✥</span> Mover
      </div>

      {/* Interactive Bounding Box Border */}
      <div
        onMouseDown={startMove}
        title="Haz click y arrastra para mover a cualquier lugar"
        style={{
          position: 'absolute',
          inset: -4,
          border: '3px dashed #6366F1',
          borderRadius: 6,
          cursor: 'grab',
          pointerEvents: 'auto',
          zIndex: 99999,
          boxShadow: '0 0 0 4px rgba(99,102,241,0.2)',
        }}
      />

      {/* 8 Resize Handle Dots */}
      <div onMouseDown={(e) => startResizeWidth(e, -1)} style={handleDotStyle({ top: -11, left: -11 }, 'nwse-resize')} title="Redimensionar tamaño" />
      <div onMouseDown={(e) => startResizeFont(e, -1)} style={handleDotStyle({ top: -11, left: '50%', transform: 'translateX(-50%)' }, 'ns-resize')} title="Tamaño de fuente" />
      <div onMouseDown={(e) => startResizeWidth(e, 1)} style={handleDotStyle({ top: -11, right: -11 }, 'nesw-resize')} title="Redimensionar tamaño" />
      <div onMouseDown={(e) => startResizeWidth(e, 1)} style={handleDotStyle({ top: '50%', right: -11, transform: 'translateY(-50%)' }, 'ew-resize')} title="Estirar ancho" />
      <div onMouseDown={(e) => startResizeWidth(e, 1)} style={handleDotStyle({ bottom: -11, right: -11 }, 'nwse-resize')} title="Redimensionar tamaño" />
      <div onMouseDown={(e) => startResizeFont(e, 1)} style={handleDotStyle({ bottom: -11, left: '50%', transform: 'translateX(-50%)' }, 'ns-resize')} title="Tamaño de fuente" />
      <div onMouseDown={(e) => startResizeWidth(e, -1)} style={handleDotStyle({ bottom: -11, left: -11 }, 'nesw-resize')} title="Redimensionar tamaño" />
      <div onMouseDown={(e) => startResizeWidth(e, -1)} style={handleDotStyle({ top: '50%', left: -11, transform: 'translateY(-50%)' }, 'ew-resize')} title="Estirar ancho" />
    </div>
  )
}
