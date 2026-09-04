import { useState, useRef, useEffect, useCallback } from 'react'

/**
 * Hook para reconocimiento de voz en el navegador (Web Speech API)
 * Soporta dictado continuo en español (es-ES / es-419) con manejo de errores y compatibilidad.
 */
export function useVoiceToText({ onTranscript, lang = 'es-ES' } = {}) {
  const [isListening, setIsListening] = useState(false)
  const [isSupported, setIsSupported] = useState(true)
  const [voiceError, setVoiceError] = useState('')
  const recognitionRef = useRef(null)
  const isExplicitStopRef = useRef(false)

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      setIsSupported(false)
      return
    }

    try {
      const recognition = new SpeechRecognition()
      recognition.continuous = true
      recognition.interimResults = true
      recognition.lang = lang
      recognition.maxAlternatives = 1

      recognition.onstart = () => {
        setIsListening(true)
        setVoiceError('')
      }

      recognition.onresult = (event) => {
        let finalSegment = ''
        let interimSegment = ''

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const text = event.results[i][0].transcript
          if (event.results[i].isFinal) {
            finalSegment += text
          } else {
            interimSegment += text
          }
        }

        const currentSpoken = finalSegment || interimSegment
        if (currentSpoken && onTranscript) {
          onTranscript(currentSpoken, !!finalSegment)
        }
      }

      recognition.onerror = (event) => {
        console.warn('[useVoiceToText] Error de reconocimiento:', event.error)
        if (event.error === 'not-allowed') {
          setVoiceError('Permiso de micrófono denegado. Permite el acceso al micrófono en tu navegador.')
          setIsListening(false)
        } else if (event.error === 'no-speech') {
          // Silencio detectado, no es un error fatal
        } else if (event.error === 'network') {
          setVoiceError('Error de red al conectar el servicio de voz.')
          setIsListening(false)
        } else {
          setVoiceError(`Error de voz (${event.error}). Intenta nuevamente.`)
        }
      }

      recognition.onend = () => {
        setIsListening(false)
      }

      recognitionRef.current = recognition
    } catch (err) {
      console.warn('[useVoiceToText] Error al inicializar SpeechRecognition:', err)
      setIsSupported(false)
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort()
        } catch {}
      }
    }
  }, [lang, onTranscript])

  const startListening = useCallback(() => {
    setVoiceError('')
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition || !recognitionRef.current) {
      setVoiceError('Tu navegador no soporta reconocimiento de voz. Usa Google Chrome o Microsoft Edge.')
      return
    }

    try {
      isExplicitStopRef.current = false
      recognitionRef.current.start()
    } catch (err) {
      try {
        recognitionRef.current.stop()
        setTimeout(() => recognitionRef.current?.start(), 100)
      } catch {}
    }
  }, [])

  const stopListening = useCallback(() => {
    isExplicitStopRef.current = true
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop()
      } catch {}
    }
    setIsListening(false)
  }, [])

  const toggleListening = useCallback(() => {
    if (isListening) {
      stopListening()
    } else {
      startListening()
    }
  }, [isListening, startListening, stopListening])

  return {
    isListening,
    isSupported,
    voiceError,
    startListening,
    stopListening,
    toggleListening,
    setVoiceError
  }
}
