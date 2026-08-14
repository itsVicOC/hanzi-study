import { Volume2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import type { HanziChar } from "@/data/characters"
import { cn } from "@/lib/utils"

interface CharBigProps {
  char: HanziChar
  onSpeak: () => void
  className?: string
}

export function CharBig({ char, onSpeak, className }: CharBigProps) {
  return (
    <div
      className={cn(
        "relative flex size-52 flex-col items-center justify-center rounded-3xl border bg-card shadow-sm md:size-64",
        className,
      )}
    >
      <span className="absolute left-4 top-4 text-3xl md:text-4xl">{char.emoji}</span>
      <Button
        type="button"
        variant="secondary"
        size="icon"
        onClick={onSpeak}
        className="absolute right-4 top-4 size-10 rounded-full md:size-11"
        aria-label={`播放「${char.char}」的读音`}
      >
        <Volume2 className="size-5" />
      </Button>
      <span className="font-serif-cn select-none text-8xl font-black leading-none md:text-9xl">
        {char.char}
      </span>
    </div>
  )
}
