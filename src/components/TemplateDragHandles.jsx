import React from 'react'

/**
 * TemplateDragHandles — MS Word / Canva style 8-point interactive bounding box
 * for direct drag-to-move and drag-to-resize on canvas elements.
 */
export default function TemplateDragHandles({
  ovKey,
  isActive,
  ovStyle = {},
  onQuickUpdate,
  onQuickUpdateBatch,
}) {
  if (!isActive || !ovKey || (!onQuickUpdate && !onQuickUpdateBatch)) return null

  // 1. Drag Move (X, Y) anywhere on border or badge
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
        onQuickUpdate(`elementStyles.${ovKey}.transform`, `translate(${newX}px, ${newY}px)`)
      }
    }

    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
  }

  // 2. Horizontal Resize (Width)
  const startResizeWidth = (e, direction = 1) => {
    e.preventDefault()
    e.stopPropagation()

    const startX = e.clientX
    const parentEl = e.currentTarget.parentElement
    const initWidth = parentEl ? parentEl.getBoundingClientRect().width : 300

    const onMouseMove = (moveEv) => {
      const deltaX = (moveEv.clientX - startX) * direction
      const newWidth = Math.max(60, Math.round(initWidth + deltaX))
      if (onQuickUpdateBatch) {
        onQuickUpdateBatch([
          [`elementStyles.${ovKey}.width`, `${newWidth}px`],
          [`elementStyles.${ovKey}.maxWidth`, `${newWidth}px`],
        ])
      } else if (onQuickUpdate) {
        onQuickUpdate(`elementStyles.${ovKey}.maxWidth`, `${newWidth}px`)
      }
    }

    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
  }

  // 3. Font Size / Height Resize
  const startResizeFont = (e, direction = 1) => {
    e.preventDefault()
    e.stopPropagation()

    const startY = e.clientY
    let initFS = 16
    if (ovStyle.fontSize) {
      initFS = parseInt(ovStyle.fontSize, 10) || 16
    } else {
      const parentEl = e.currentTarget.parentElement
      if (parentEl) {
        const computed = window.getComputedStyle(parentEl).fontSize
        initFS = parseInt(computed, 10) || 16
      }
    }

    const onMouseMove = (moveEv) => {
      const deltaY = (moveEv.clientY - startY) * direction
      const newFS = Math.max(10, Math.min(140, Math.round(initFS + deltaY * 0.4)))
      if (onQuickUpdate) {
        onQuickUpdate(`elementStyles.${ovKey}.fontSize`, `${newFS}px`)
      }
    }

    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
  }

  const dotStyle = (pos, cursor) => ({
    position: 'absolute',
    width: 14,
    height: 14,
    background: '#6366F1',
    border: '2.5px solid #FFFFFF',
    borderRadius: '50%',
    cursor,
    zIndex: 10000,
    boxShadow: '0 2px 8px rgba(0,0,0,0.35)',
    pointerEvents: 'auto',
    ...pos,
  })

  return (
    <>
      {/* ✥ Move Handle Badge */}
      <div
        onMouseDown={startMove}
        title="Haz click y arrastra para mover a cualquier parte"
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
          zIndex: 9999,
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
        title="Haz click y arrastra para mover a cualquier parte"
        style={{
          position: 'absolute',
          inset: -4,
          border: '3px dashed #6366F1',
          borderRadius: 6,
          cursor: 'grab',
          pointerEvents: 'auto',
          zIndex: 9998,
          boxShadow: '0 0 0 4px rgba(99,102,241,0.15)',
        }}
      />

      {/* 8 Resize Handle Dots */}
      <div onMouseDown={(e) => startResizeWidth(e, -1)} style={dotStyle({ top: -11, left: -11 }, 'nwse-resize')} title="Redimensionar tamaño" />
      <div onMouseDown={(e) => startResizeFont(e, -1)} style={dotStyle({ top: -11, left: '50%', transform: 'translateX(-50%)' }, 'ns-resize')} title="Tamaño de fuente" />
      <div onMouseDown={(e) => startResizeWidth(e, 1)} style={dotStyle({ top: -11, right: -11 }, 'nesw-resize')} title="Redimensionar tamaño" />
      <div onMouseDown={(e) => startResizeWidth(e, 1)} style={dotStyle({ top: '50%', right: -11, transform: 'translateY(-50%)' }, 'ew-resize')} title="Estirar ancho" />
      <div onMouseDown={(e) => startResizeWidth(e, 1)} style={dotStyle({ bottom: -11, right: -11 }, 'nwse-resize')} title="Redimensionar tamaño" />
      <div onMouseDown={(e) => startResizeFont(e, 1)} style={dotStyle({ bottom: -11, left: '50%', transform: 'translateX(-50%)' }, 'ns-resize')} title="Tamaño de fuente" />
      <div onMouseDown={(e) => startResizeWidth(e, -1)} style={dotStyle({ bottom: -11, left: -11 }, 'nesw-resize')} title="Redimensionar tamaño" />
      <div onMouseDown={(e) => startResizeWidth(e, -1)} style={dotStyle({ top: '50%', left: -11, transform: 'translateY(-50%)' }, 'ew-resize')} title="Estirar ancho" />
    </>
  )
}
