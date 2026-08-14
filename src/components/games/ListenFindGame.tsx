import { useEffect, useRef, useState } from "react"
import { RotateCcw, Volume2 } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { HanziChar } from "@/data/characters"
import { useProgress } from "@/hooks/useProgress"
import { useSpeech } from "@/hooks/useSpeech"
import { sample, shuffle } from "@/lib/games"
import { cn } from "@/lib/utils"

interface Question {
  target: HanziChar
  options: HanziChar[]
}

interface ListenFindGameProps {
  pool: HanziChar[]
}

function buildQuestions(pool: HanziChar[], count: number): Question[] {
  const targets = sample(pool, count)
  return targets.map((target) => {
    const distractors = sample(
      pool.filter((c) => c.char !== target.char),
      3,
    )
    return { target, options: shuffle([target, ...distractors]) }
  })
}

export function ListenFindGame({ pool }: ListenFindGameProps) {
  const { sayChar } = useSpeech()
  const { recordScore } = useProgress()
  const total = Math.min(pool.length, 8)
  const [questions, setQuestions] = useState<Question[]>(() =>
    buildQuestions(pool, total),
  )
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState(false)
  const [wrongPick, setWrongPick] = useState<string | null>(null)
  const [finished, setFinished] = useState(false)
  const scoreRef = useRef(0)

  const q = questions[index]

  useEffect(() => {
    if (q && !finished) {
      const t = window.setTimeout(() => sayChar(q.target.char), 400)
      return () => window.clearTimeout(t)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, finished])

  const restart = () => {
    setQuestions(buildQuestions(pool, total))
    setIndex(0)
    setScore(0)
    scoreRef.current = 0
    setAnswered(false)
    setWrongPick(null)
    setFinished(false)
  }

  const advance = () => {
    if (index + 1 >= questions.length) {
      recordScore("listen", scoreRef.current)
      setFinished(true)
    } else {
      setIndex(index + 1)
      setAnswered(false)
      setWrongPick(null)
    }
  }

  const choose = (option: HanziChar) => {
    if (answered) return
    setAnswered(true)

    if (option.char === q.target.char) {
      scoreRef.current += 1
      setScore(scoreRef.current)
      toast.success("答对啦！👏")
      window.setTimeout(advance, 900)
    } else {
      setWrongPick(option.char)
      toast.error("再听一听，再选一次")
      window.setTimeout(() => {
        setWrongPick(null)
        setAnswered(false)
      }, 900)
    }
  }

  if (finished) {
    return (
      <Card className="items-center gap-4 py-10 text-center">
        <span className="text-5xl">🎊</span>
        <h3 className="font-display text-2xl">挑战完成！</h3>
        <p className="text-muted-foreground">
          共 {total} 题，你答对了{" "}
          <span className="text-lg font-bold text-primary">{score}</span> 题
        </p>
        <Button onClick={restart} size="lg">
          <RotateCcw className="size-4" />
          再来一轮
        </Button>
      </Card>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          第 {index + 1} / {total} 题
        </span>
        <span>
          答对 <span className="font-bold text-emerald-600">{score}</span> 题
        </span>
      </div>
      <Progress value={Math.round((index / total) * 100)} />

      <div className="flex flex-col items-center gap-3">
        <p className="text-muted-foreground">听一听，是哪个字？</p>
        <Button
          size="lg"
          variant="secondary"
          onClick={() => sayChar(q.target.char)}
          className="h-16 w-16 rounded-full text-2xl"
          aria-label="重播读音"
        >
          <Volume2 className="size-7" />
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {q.options.map((option) => {
          const isCorrect = answered && option.char === q.target.char
          const isWrong = wrongPick === option.char
          return (
            <button
              key={option.char}
              type="button"
              onClick={() => choose(option)}
              disabled={answered}
              className={cn(
                "flex aspect-square items-center justify-center rounded-2xl border bg-card shadow-sm transition-all select-none",
                "font-serif-cn text-5xl font-black",
                isCorrect && "border-emerald-400 bg-emerald-50 text-emerald-700",
                isWrong && "animate-shake border-destructive bg-destructive/10",
                !answered && "hover:border-primary/40 hover:shadow-md",
              )}
            >
              {option.char}
            </button>
          )
        })}
      </div>
    </div>
  )
}
