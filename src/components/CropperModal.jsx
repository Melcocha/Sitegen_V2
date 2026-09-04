import { useState, useRef, useCallback } from 'react'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { X, Check } from 'lucide-react'

// Helper to extract the cropped portion
async function getCroppedImg(imageElement, crop) {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  
  if (!ctx) return null

  // Ensure crop is valid
  if (!crop || !crop.width || !crop.height) {
    return null
  }

  const scaleX = imageElement.naturalWidth / imageElement.width
  const scaleY = imageElement.naturalHeight / imageElement.height

  canvas.width = crop.width * scaleX
  canvas.height = crop.height * scaleY

  ctx.drawImage(
    imageElement,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    canvas.width,
    canvas.height
  )

  return new Promise((resolve) => {
    canvas.toBlob((file) => {
      resolve(file)
    }, 'image/png', 1)
  })
}

export default function CropperModal({ imageSrc, onCropComplete, onCancel }) {
  const [crop, setCrop] = useState()
  const imgRef = useRef(null)

  const handleSave = async () => {
    try {
      if (!crop || !crop.width || !crop.height) {
        // Si no recortan nada, usar el full width/height real original
        alert("Por favor dibuja un cuadro de recorte sobre la imagen primero.")
        return;
      }
      const croppedImageBlob = await getCroppedImg(imgRef.current, crop)
      onCropComplete(croppedImageBlob)
    } catch (e) {
      console.error(e)
      alert("Error al recortar la imagen.")
    }
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 99999, background: 'rgba(0,0,0,0.85)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
    }}>
      <div style={{ paddingBottom: 16, textAlign: 'center' }}>
        <h3 style={{ color: 'white', margin: 0, fontSize: '1.2rem', fontWeight: 800 }}>Recorta tu Logotipo</h3>
        <p style={{ color: '#9CA3AF', margin: '4px 0 0 0', fontSize: '0.85rem' }}>Dibuja un rectángulo exacto sobre las letras/formas para eliminar el espacio blanco.</p>
      </div>

      <div style={{ position: 'relative', maxWidth: '90vw', maxHeight: '60vh', background: '#222', borderRadius: 12, overflow: 'auto', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', border: '2px dashed #4B5563' }}>
        <ReactCrop crop={crop} onChange={c => setCrop(c)}>
          <img 
            ref={imgRef}
            src={imageSrc} 
            alt="Crop me" 
            style={{ maxHeight: '60vh', width: 'auto', display: 'block' }} 
            crossOrigin="anonymous" 
          />
        </ReactCrop>
      </div>
      
      <div style={{ marginTop: 24, width: '90vw', maxWidth: 400, display: 'flex', gap: 12, justifyContent: 'center' }}>
        <button onClick={onCancel} style={{
          padding: '12px 24px', borderRadius: 8, border: 'none', background: '#4B5563', color: 'white',
          fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8
        }}>
          <X size={18} /> Cancelar
        </button>
        <button onClick={handleSave} style={{
          padding: '12px 24px', borderRadius: 8, border: 'none', background: '#6366F1', color: 'white',
          fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8
        }}>
          <Check size={18} /> Extraer Logo Seleccionado
        </button>
      </div>
    </div>
  )
}
