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
  const [speaking, setSpeaking] = useState(false)
  const scoreRef = useRef(0)
  const timersRef = useRef<number[]>([])

  const q = questions[index]

  // Always clear pending timers on unmount so nothing fires after teardown.
  useEffect(() => {
    return () => {
      timersRef.current.forEach((t) => window.clearTimeout(t))
    }
  }, [])

  useEffect(() => {
    if (q && !finished) {
      const t = window.setTimeout(() => play(), 400)
      timersRef.current.push(t)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, finished])

  const play = () => {
    if (!q) return
    sayChar(q.target.char)
    setSpeaking(true)
    const t = window.setTimeout(() => setSpeaking(false), 700)
    timersRef.current.push(t)
  }

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
      const t = window.setTimeout(advance, 900)
      timersRef.current.push(t)
    } else {
      setWrongPick(option.char)
      toast.error("再听一听，再选一次")
      const t = window.setTimeout(() => {
        setWrongPick(null)
        setAnswered(false)
      }, 900)
      timersRef.current.push(t)
    }
  }

  if (finished) {
    const perfect = score === total
    return (
      <Card className="items-center gap-4 px-6 py-12 text-center">
        <span aria-hidden className="enter text-6xl">
          {perfect ? "🌟" : "🎊"}
        </span>
        <h3 className="font-display text-2xl tracking-tight">
          {perfect ? "全部答对，太棒了！" : "挑战完成！"}
        </h3>
        <p className="text-muted-foreground">
          共 {total} 题，你答对了{" "}
          <span className="text-primary text-lg font-bold tabular-nums">{score}</span>{" "}
          题
        </p>
        <Button onClick={restart} size="lg">
          <RotateCcw className="size-4" />
          再来一轮
        </Button>
      </Card>
    )
  }

  return (
    <div className="mx-auto flex w-full max-w-lg flex-col gap-4">
      <div className="text-muted-foreground flex items-center justify-between text-sm">
        <span className="tabular-nums">
          第 {index + 1} / {total} 题
        </span>
        <span>
          答对{" "}
          <span className="text-success font-bold tabular-nums">{score}</span> 题
        </span>
      </div>
      <Progress value={Math.round((index / total) * 100)} aria-label="答题进度" />

      <div className="flex flex-col items-center gap-2 py-2">
        <p className="text-muted-foreground text-sm">听一听，是哪个字？</p>
        <div className="relative">
          {speaking && (
            <span
              aria-hidden
              className="bg-primary-vivid/25 absolute inset-0 animate-ping rounded-full"
            />
          )}
          <Button
            size="icon-lg"
            variant="secondary"
            onClick={play}
            className="relative size-20 rounded-full [&_svg:not([class*='size-'])]:size-8"
            aria-label="重播读音"
          >
            <Volume2 />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {q.options.map((option, i) => {
          const isCorrect = answered && option.char === q.target.char
          const isWrong = wrongPick === option.char
          return (
            <button
              key={option.char}
              type="button"
              onClick={() => choose(option)}
              disabled={answered}
              aria-label={`选择汉字 ${option.char}`}
              style={{ "--i": i } as React.CSSProperties}
              className={cn(
                "press font-serif-cn enter flex aspect-square items-center justify-center rounded-3xl border text-5xl font-black shadow-sm select-none",
                "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                "disabled:opacity-100",
                isCorrect &&
                  "border-success bg-success-soft text-success scale-[1.03] dark:text-emerald-300",
                isWrong && "animate-shake border-destructive bg-destructive-soft",
                !answered && "border-border bg-card hover:border-primary/45 hover:shadow-md",
                answered && !isCorrect && "border-border bg-card opacity-55",
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
