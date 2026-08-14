let cachedVoice: SpeechSynthesisVoice | null = null
let voicesLoaded = false

export function isSpeechSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window
}

function refreshVoices(): SpeechSynthesisVoice[] {
  if (!isSpeechSupported()) return []
  const voices = window.speechSynthesis.getVoices()
  return voices
}

export function getChineseVoice(): SpeechSynthesisVoice | null {
  if (!isSpeechSupported()) return null
  if (cachedVoice) return cachedVoice

  const voices = refreshVoices()
  cachedVoice =
    voices.find((v) => v.lang === "zh-CN" && v.localService) ||
    voices.find((v) => v.lang === "zh-CN") ||
    voices.find((v) => v.lang.toLowerCase().startsWith("zh")) ||
    null

  return cachedVoice
}

// Preload the voice list as soon as possible (some browsers load it lazily).
export function preloadSpeech() {
  if (!isSpeechSupported()) return
  refreshVoices()
  window.speechSynthesis.onvoiceschanged = () => {
    voicesLoaded = true
    cachedVoice = null
    getChineseVoice()
  }
  // Some browsers never fire voiceschanged; retry once.
  setTimeout(() => {
    if (!voicesLoaded) {
      cachedVoice = null
      getChineseVoice()
    }
  }, 500)
}

interface SpeakOptions {
  rate?: number
  pitch?: number
  onEnd?: () => void
}

export function speak(text: string, opts?: SpeakOptions): boolean {
  if (!isSpeechSupported() || !text) return false
  const synth = window.speechSynthesis
  synth.cancel()

  const utter = new SpeechSynthesisUtterance(text)
  utter.lang = "zh-CN"
  const voice = getChineseVoice()
  if (voice) utter.voice = voice
  utter.rate = opts?.rate ?? 0.9
  utter.pitch = opts?.pitch ?? 1.1
  if (opts?.onEnd) utter.onend = opts.onEnd
  synth.speak(utter)
  return true
}

export function stopSpeech() {
  if (isSpeechSupported()) window.speechSynthesis.cancel()
}
