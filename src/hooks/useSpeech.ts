import { useCallback, useEffect } from "react"

import { isSpeechSupported, preloadSpeech, speak, stopSpeech } from "@/lib/speech"

export function useSpeech() {
  useEffect(() => {
    preloadSpeech()
  }, [])

  const say = useCallback((text: string, opts?: { rate?: number; pitch?: number }) => {
    return speak(text, opts)
  }, [])

  const sayChar = useCallback((char: string) => {
    return speak(char, { rate: 0.7, pitch: 1.15 })
  }, [])

  const sayWord = useCallback((word: string) => {
    return speak(word, { rate: 0.85, pitch: 1.1 })
  }, [])

  const stop = useCallback(() => stopSpeech(), [])

  return { say, sayChar, sayWord, stop, supported: isSpeechSupported() }
}
