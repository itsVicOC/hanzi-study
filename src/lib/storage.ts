export interface ProgressState {
  learned: string[]
  starred: string[]
  scores: Record<string, number>
}

const KEY = "hanzi-study-progress-v1"

const defaultState: ProgressState = {
  learned: [],
  starred: [],
  scores: {},
}

export function loadProgress(): ProgressState {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return { ...defaultState }
    const parsed = JSON.parse(raw) as Partial<ProgressState>
    return {
      learned: Array.isArray(parsed.learned) ? parsed.learned : [],
      starred: Array.isArray(parsed.starred) ? parsed.starred : [],
      scores:
        parsed.scores && typeof parsed.scores === "object"
          ? (parsed.scores as Record<string, number>)
          : {},
    }
  } catch {
    return { ...defaultState }
  }
}

export function saveProgress(state: ProgressState): boolean {
  try {
    localStorage.setItem(KEY, JSON.stringify(state))
    return true
  } catch {
    return false
  }
}

export function clearProgress(): void {
  try {
    localStorage.removeItem(KEY)
  } catch {
    // ignore
  }
}
