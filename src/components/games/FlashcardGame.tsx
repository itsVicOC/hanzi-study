import { useMemo, useState } from "react"
import { Check, Eye, RotateCcw, Volume2, X } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { HanziChar } from "@/data/characters"
import { useProgress } from "@/hooks/useProgress"
import { useSpeech } from "@/hooks/useSpeech"
import { shuffle } from "@/lib/games"
import { cn } from "@/lib/utils"

interface FlashcardGameProps {
  pool: HanziChar[]
}

export function FlashcardGame({ pool }: FlashcardGameProps) {
  const { sayChar } = useSpeech()
  const { recordScore } = useProgress()
  const [deck, setDeck] = useState<HanziChar[]>(() => shuffle(pool))
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [known, setKnown] = useState(0)
  const [finished, setFinished] = useState(false)

  const current = deck[index]
  const progress = useMemo(
    () => Math.round((index / Math.max(deck.length, 1)) * 100),
    [index, deck.length],
  )

  const restart = () => {
    setDeck(shuffle(pool))
    setIndex(0)
    setFlipped(false)
    setKnown(0)
    setFinished(false)
  }

  const advance = (nextKnown: number) => {
    if (index + 1 >= deck.length) {
      recordScore("flashcard", nextKnown)
      setFinished(true)
    } else {
      setIndex(index + 1)
      setFlipped(false)
    }
  }

  const markKnown = () => {
    const nextKnown = known + 1
    setKnown(nextKnown)
    toast.success("太棒了，记住这个字啦！⭐")
    advance(nextKnown)
  }

  const markUnknown = () => {
    toast("没关系，多认几遍就记住啦", { description: current.char })
    advance(known)
  }

  if (finished) {
    const perfect = known === deck.length
    return (
      <Card className="items-center gap-4 px-6 py-12 text-center">
        <span aria-hidden className="enter text-6xl">
          {perfect ? "🏆" : "🎉"}
        </span>
        <h3 className="font-display text-2xl tracking-tight">
          {perfect ? "全部认识，太厉害了！" : "本轮完成！"}
        </h3>
        <p className="text-muted-foreground">
          一共 {deck.length} 个字，你认识了{" "}
          <span className="text-primary text-lg font-bold">{known}</span> 个
        </p>
        <Button onClick={restart} size="lg">
          <RotateCcw className="size-4" />
          再来一轮
        </Button>
      </Card>
    )
  }

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-4">
      <div className="text-muted-foreground flex items-center justify-between text-sm">
        <span className="tabular-nums">
          第 {index + 1} / {deck.length} 张
        </span>
        <span>
          已认识{" "}
          <span className="text-success font-bold tabular-nums">{known}</span> 个
        </span>
      </div>
      <Progress value={progress} aria-label="本轮进度" />

      {/* Flip card: three.js-free 3D flip via CSS transforms. */}
      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        aria-label={flipped ? "盖住卡片" : "翻开卡片看答案"}
        className="group mx-auto block aspect-4/3 w-full max-w-sm [perspective:1200px] outline-none focus-visible:outline-none"
      >
        <span
          className={cn(
            "relative block size-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] [transform-style:preserve-3d]",
            "group-focus-visible:outline-2 group-focus-visible:outline-offset-4 group-focus-visible:outline-ring",
            flipped && "[transform:rotateY(180deg)]",
          )}
        >
          {/* Front — the character only */}
          <span className="bg-tianzige shadow-tile border-border absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-4xl border bg-card px-6 [backface-visibility:hidden]">
            <span className="font-serif-cn text-8xl leading-none font-black">
              {current.char}
            </span>
            <span className="text-muted-foreground text-sm">
              点一下卡片，看看秘密
            </span>
          </span>

          {/* Back — emoji, character, pinyin, tip */}
          <span className="from-primary-soft shadow-tile border-primary/25 absolute inset-0 flex flex-col items-center justify-center gap-1.5 rounded-4xl border bg-gradient-to-b to-card px-6 [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <span aria-hidden className="text-5xl">
              {current.emoji}
            </span>
            <span className="font-serif-cn text-6xl leading-none font-black">
              {current.char}
            </span>
            <span className="text-primary text-xl font-semibold">{current.pinyin}</span>
            <span className="text-muted-foreground mt-1 text-center text-sm">
              {current.tip}
            </span>
          </span>
        </span>
      </button>

      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button variant="secondary" onClick={() => sayChar(current.char)}>
          <Volume2 className="size-4" />
          读音
        </Button>
        <Button variant="outline" onClick={() => setFlipped((f) => !f)}>
          <Eye className="size-4" />
          {flipped ? "盖住卡片" : "揭示答案"}
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button
          size="lg"
          onClick={markKnown}
          className="bg-success hover:bg-success/90 h-14 text-base text-white dark:text-emerald-950"
        >
          <Check className="size-5" strokeWidth={2.5} />
          认识了
        </Button>
        <Button size="lg" variant="outline" onClick={markUnknown} className="h-14 text-base">
          <X className="size-5" />
          还不熟
        </Button>
      </div>
    </div>
  )
}
