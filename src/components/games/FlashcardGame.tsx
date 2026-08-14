import { useMemo, useState } from "react"
import { Check, RotateCcw, Volume2, X } from "lucide-react"
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

  const advance = (nextKnown: number) => {
    if (index + 1 >= deck.length) {
      recordScore("flashcard", nextKnown)
      setFinished(true)
    } else {
      setIndex(index + 1)
      setFlipped(false)
    }
  }

  if (finished) {
    return (
      <Card className="items-center gap-4 py-10 text-center">
        <span className="text-5xl">🎉</span>
        <h3 className="font-display text-2xl">本轮完成！</h3>
        <p className="text-muted-foreground">
          一共 {deck.length} 个字，你认识了{" "}
          <span className="text-lg font-bold text-primary">{known}</span> 个
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
          第 {index + 1} / {deck.length} 张
        </span>
        <span>
          已认识 <span className="font-bold text-emerald-600">{known}</span> 个
        </span>
      </div>
      <Progress value={progress} />

      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        className={cn(
          "mx-auto flex aspect-square w-full max-w-xs flex-col items-center justify-center gap-2 rounded-3xl border bg-card p-6 shadow-sm transition-all hover:border-primary/40 hover:shadow-md",
        )}
      >
        {flipped ? (
          <>
            <span className="text-6xl">{current.emoji}</span>
            <span className="font-serif-cn text-7xl font-black">{current.char}</span>
            <span className="text-xl text-muted-foreground">{current.pinyin}</span>
            <span className="text-sm text-muted-foreground">{current.tip}</span>
          </>
        ) : (
          <>
            <span className="font-serif-cn text-8xl font-black md:text-9xl">
              {current.char}
            </span>
            <span className="text-sm text-muted-foreground">点一下卡片，看看秘密</span>
          </>
        )}
      </button>

      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button
          variant="secondary"
          size="lg"
          onClick={() => sayChar(current.char)}
        >
          <Volume2 className="size-5" />
          读音
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={() => setFlipped((f) => !f)}
        >
          {flipped ? "盖住卡片" : "揭示答案"}
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button
          size="lg"
          onClick={markKnown}
          className="h-14 bg-emerald-600 text-lg hover:bg-emerald-600/90"
        >
          <Check className="size-5" />
          认识了
        </Button>
        <Button
          size="lg"
          variant="outline"
          onClick={markUnknown}
          className="h-14 text-lg"
        >
          <X className="size-5" />
          还不熟
        </Button>
      </div>
    </div>
  )
}
