import React, { useState } from 'react'

/**
 * Reusable wrapper that adds an on-hover visual control bar to any website section in edit mode.
 * Provides instant 1-click reordering (Subir / Bajar) and deletion (Eliminar sección).
 */
export default function SectionControlBar({
  sectionKey,
  label,
  canMoveUp = true,
  canMoveDown = true,
  onMoveUp,
  onMoveDown,
  onDelete,
  editMode = false,
  accentColor = '#6366F1',
  primaryColor = '#0F172A',
  children
}) {
  const [hovered, setHovered] = useState(false)

  if (!editMode) {
    return children
  }

  return (
    <div
      className="sec-control-wrap"
      style={{
        position: 'relative',
        transition: 'box-shadow 0.2s ease'
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top Floating Action Bar */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 280,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 14px',
          background: 'linear-gradient(180deg, rgba(15,23,42,0.85) 0%, rgba(15,23,42,0) 100%)',
          opacity: hovered ? 1 : 0,
          pointerEvents: hovered ? 'all' : 'none',
          transition: 'opacity 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Section Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            background: 'rgba(15, 23, 42, 0.92)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            backdropFilter: 'blur(12px)',
            color: '#FFFFFF',
            padding: '5px 12px',
            borderRadius: 8,
            fontSize: '0.75rem',
            fontWeight: 800,
            letterSpacing: '0.02em',
            boxShadow: '0 4px 16px rgba(0,0,0,0.35)',
            userSelect: 'none'
          }}
        >
          <span style={{ color: accentColor || '#38BDF8' }}>✦</span>
          <span>{label || sectionKey}</span>
        </div>

        {/* Action Buttons: Move Up, Move Down, Delete */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            background: 'rgba(15, 23, 42, 0.92)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            backdropFilter: 'blur(12px)',
            padding: '4px 6px',
            borderRadius: 8,
            boxShadow: '0 4px 16px rgba(0,0,0,0.35)'
          }}
        >
          {onMoveUp && (
            <button
              type="button"
              disabled={!canMoveUp}
              onClick={(e) => {
                e.stopPropagation()
                onMoveUp()
              }}
              title="Subir sección"
              style={{
                border: 'none',
                background: canMoveUp ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.03)',
                color: canMoveUp ? '#FFFFFF' : 'rgba(255,255,255,0.3)',
                borderRadius: 6,
                padding: '4px 8px',
                cursor: canMoveUp ? 'pointer' : 'not-allowed',
                fontSize: '0.72rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                transition: 'all 0.15s ease'
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="18 15 12 9 6 15"></polyline>
              </svg>
              Subir
            </button>
          )}

          {onMoveDown && (
            <button
              type="button"
              disabled={!canMoveDown}
              onClick={(e) => {
                e.stopPropagation()
                onMoveDown()
              }}
              title="Bajar sección"
              style={{
                border: 'none',
                background: canMoveDown ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.03)',
                color: canMoveDown ? '#FFFFFF' : 'rgba(255,255,255,0.3)',
                borderRadius: 6,
                padding: '4px 8px',
                cursor: canMoveDown ? 'pointer' : 'not-allowed',
                fontSize: '0.72rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                transition: 'all 0.15s ease'
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
              Bajar
            </button>
          )}

          {onDelete && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                onDelete()
              }}
              title="Eliminar o ocultar sección"
              style={{
                border: 'none',
                background: 'rgba(239, 68, 68, 0.22)',
                color: '#FCA5A5',
                borderRadius: 6,
                padding: '4px 9px',
                cursor: 'pointer',
                fontSize: '0.72rem',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(239, 68, 68, 0.45)'
                e.currentTarget.style.color = '#FFFFFF'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(239, 68, 68, 0.22)'
                e.currentTarget.style.color = '#FCA5A5'
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
              Eliminar
            </button>
          )}
        </div>
      </div>

      {/* Actual Section Content */}
      <div style={{ position: 'relative', width: '100%' }}>
        {children}
      </div>

      {/* Subtle hover outline identifying the section */}
      {hovered && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            border: '2px dashed rgba(99, 102, 241, 0.7)',
            zIndex: 260,
            borderRadius: 4
          }}
        />
      )}
    </div>
  )
}
