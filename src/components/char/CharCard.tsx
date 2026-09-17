import { Link } from "react-router-dom"
import { Check, Star } from "lucide-react"

import type { HanziChar } from "@/data/characters"
import { cn } from "@/lib/utils"

interface CharCardProps {
  char: HanziChar
  learned?: boolean
  starred?: boolean
}

/**
 * Grid tile in 汉字库. Reads as a physical flashcard: the glyph sits on a
 * faint 田字格 sheet, and learn/star state is shown with both an icon and a
 * colour so it never depends on colour alone.
 */
export function CharCard({ char, learned, starred }: CharCardProps) {
  return (
    <Link
      to={`/char/${char.char}`}
      aria-label={`${char.char}，拼音 ${char.pinyin}${learned ? "，已学会" : ""}${
        starred ? "，已收藏" : ""
      }`}
      className={cn(
        "press group relative flex flex-col items-center gap-1.5 rounded-3xl border bg-card px-2 py-4 text-center shadow-sm",
        "hover:-translate-y-1 hover:border-primary/45 hover:shadow-md",
        "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        learned && "border-success/35 bg-success-soft/40",
      )}
    >
      {/* Glyph on a paper grid */}
      <span
        aria-hidden
        className="bg-tianzige relative flex size-16 items-center justify-center rounded-xl md:size-[4.5rem]"
      >
        <span className="font-serif-cn absolute -top-1 -left-1 text-base leading-none">
          {char.emoji}
        </span>
        <span className="font-serif-cn text-4xl leading-none font-black md:text-5xl">
          {char.char}
        </span>
      </span>

      <span className="text-muted-foreground text-xs font-medium tracking-wide">
        {char.pinyin}
      </span>

      {/* State badges */}
      {starred && (
        <span
          className="text-star absolute top-2.5 right-2.5"
          title="已收藏"
          aria-hidden
        >
          <Star className="size-4 fill-current" />
        </span>
      )}
      {learned && (
        <span
          className="bg-success ring-card absolute bottom-2.5 left-1/2 flex size-5 -translate-x-1/2 items-center justify-center rounded-full text-white ring-2"
          title="已学会"
          aria-hidden
        >
          <Check className="size-3" strokeWidth={3} />
        </span>
      )}
    </Link>
  )
}

export function CharCardSkeleton() {
  return (
    <div className="border-border flex flex-col items-center gap-2 rounded-3xl border bg-card px-2 py-4">
      <div className="bg-muted size-16 animate-[shimmer_1.8s_ease-in-out_infinite] rounded-xl md:size-[4.5rem]" />
      <div className="bg-muted h-3 w-10 animate-[shimmer_1.8s_ease-in-out_infinite] rounded" />
    </div>
  )
}
