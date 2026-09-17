import { Volume2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import type { HanziChar } from "@/data/characters"
import { cn } from "@/lib/utils"

interface CharBigProps {
  char: HanziChar
  onSpeak: () => void
  className?: string
}

/**
 * The hero flashcard on 汉字详情. The glyph sits on a 田字格 sheet and the
 * whole card is a large tap target that replays the pronunciation.
 */
export function CharBig({ char, onSpeak, className }: CharBigProps) {
  return (
    <div
      className={cn(
        "shadow-tile relative flex aspect-square w-full max-w-64 flex-col items-center justify-center rounded-4xl border border-border bg-card p-4 md:max-w-72",
        className,
      )}
    >
      {/* Emoji cue, top-left: the "real world" anchor for the glyph. */}
      <span
        aria-hidden
        className="bg-primary-soft ring-primary/10 absolute top-4 left-4 flex size-12 items-center justify-center rounded-2xl text-2xl ring-2 md:size-14 md:text-3xl"
      >
        {char.emoji}
      </span>

      <Button
        type="button"
        variant="secondary"
        size="icon"
        onClick={onSpeak}
        className="absolute top-4 right-4 size-11 rounded-full md:size-12"
        aria-label={`播放「${char.char}」的读音`}
      >
        <Volume2 className="size-5" />
      </Button>

      {/* Tap-anywhere-to-hear affordance */}
      <button
        type="button"
        onClick={onSpeak}
        aria-label={`播放「${char.char}」的读音`}
        className="press bg-tianzige flex size-40 items-center justify-center rounded-2xl outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring md:size-48"
      >
        <span className="font-serif-cn text-7xl leading-none font-black md:text-8xl">
          {char.char}
        </span>
      </button>

      <span className="text-muted-foreground mt-1 text-xs">点一下大字，听读音</span>
    </div>
  )
}
