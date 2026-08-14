import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"

import { loadProgress, saveProgress, type ProgressState } from "@/lib/storage"

interface ProgressContextValue {
  state: ProgressState
  isLearned: (char: string) => boolean
  isStarred: (char: string) => boolean
  toggleLearned: (char: string) => void
  toggleStar: (char: string) => void
  recordScore: (game: string, score: number) => void
  reset: () => void
}

const ProgressContext = createContext<ProgressContextValue | null>(null)

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ProgressState>(() => loadProgress())

  useEffect(() => {
    saveProgress(state)
  }, [state])

  const isLearned = useCallback(
    (char: string) => state.learned.includes(char),
    [state.learned],
  )
  const isStarred = useCallback(
    (char: string) => state.starred.includes(char),
    [state.starred],
  )

  const toggleLearned = useCallback((char: string) => {
    setState((s) => ({
      ...s,
      learned: s.learned.includes(char)
        ? s.learned.filter((c) => c !== char)
        : [...s.learned, char],
    }))
  }, [])

  const toggleStar = useCallback((char: string) => {
    setState((s) => ({
      ...s,
      starred: s.starred.includes(char)
        ? s.starred.filter((c) => c !== char)
        : [...s.starred, char],
    }))
  }, [])

  const recordScore = useCallback((game: string, score: number) => {
    setState((s) => ({
      ...s,
      scores: { ...s.scores, [game]: Math.max(s.scores[game] ?? 0, score) },
    }))
  }, [])

  const reset = useCallback(() => {
    setState({ learned: [], starred: [], scores: {} })
  }, [])

  const value = useMemo<ProgressContextValue>(
    () => ({
      state,
      isLearned,
      isStarred,
      toggleLearned,
      toggleStar,
      recordScore,
      reset,
    }),
    [state, isLearned, isStarred, toggleLearned, toggleStar, recordScore, reset],
  )

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
}

export function useProgress(): ProgressContextValue {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error("useProgress 必须在 ProgressProvider 内使用")
  return ctx
}
