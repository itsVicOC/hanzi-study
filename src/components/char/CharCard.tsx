import { Link } from "react-router-dom"
import { Check, Star } from "lucide-react"

import { Card } from "@/components/ui/card"
import type { HanziChar } from "@/data/characters"

interface CharCardProps {
  char: HanziChar
  learned?: boolean
  starred?: boolean
}

export function CharCard({ char, learned, starred }: CharCardProps) {
  return (
    <Link to={`/char/${char.char}`} className="group outline-none">
      <Card className="relative items-center gap-1.5 px-3 py-5 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring">
        {starred && (
          <Star className="absolute left-3 top-3 size-4 fill-amber-400 text-amber-400" />
        )}
        {learned && (
          <span className="absolute right-3 top-3 flex size-6 items-center justify-center rounded-full bg-emerald-500 text-white">
            <Check className="size-3.5" />
          </span>
        )}
        <span className="text-3xl leading-none">{char.emoji}</span>
        <span className="font-serif-cn text-5xl font-black leading-none md:text-6xl">
          {char.char}
        </span>
        <span className="text-sm text-muted-foreground">{char.pinyin}</span>
      </Card>
    </Link>
  )
}

export function CharCardSkeleton() {
  return (
    <Card className="items-center gap-2 px-3 py-5">
      <div className="size-8 animate-pulse rounded-full bg-muted" />
      <div className="h-14 w-14 animate-pulse rounded-lg bg-muted" />
      <div className="h-4 w-10 animate-pulse rounded bg-muted" />
    </Card>
  )
}
