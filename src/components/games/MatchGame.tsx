import { useEffect, useState } from "react"
import { RotateCcw } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import type { HanziChar } from "@/data/characters"
import { useProgress } from "@/hooks/useProgress"
import { sample, shuffle } from "@/lib/games"
import { cn } from "@/lib/utils"

interface Tile {
  id: string
  char: string
  emoji: string
  kind: "char" | "emoji"
  matched: boolean
}

interface MatchGameProps {
  pool: HanziChar[]
}

function buildTiles(pool: HanziChar[], pairCount: number): Tile[] {
  const pairs = sample(pool, pairCount)
  const tiles: Tile[] = []
  pairs.forEach((p) => {
    tiles.push({ id: `${p.char}-e`, char: p.char, emoji: p.emoji, kind: "emoji", matched: false })
    tiles.push({ id: `${p.char}-c`, char: p.char, emoji: p.emoji, kind: "char", matched: false })
  })
  return shuffle(tiles)
}

export function MatchGame({ pool }: MatchGameProps) {
  const { recordScore } = useProgress()
  const pairCount = Math.min(6, Math.max(3, pool.length))
  const [tiles, setTiles] = useState<Tile[]>(() => buildTiles(pool, pairCount))
  const [selected, setSelected] = useState<string | null>(null)
  const [wrong, setWrong] = useState<string[]>([])

  const matchedCount = tiles.filter((t) => t.matched).length / 2
  const finished = matchedCount === pairCount

  useEffect(() => {
    if (finished) recordScore("match", pairCount)
  }, [finished, pairCount, recordScore])

  const restart = () => {
    setTiles(buildTiles(pool, pairCount))
    setSelected(null)
    setWrong([])
  }

  const handleClick = (tile: Tile) => {
    if (tile.matched || wrong.includes(tile.id)) return

    if (!selected) {
      setSelected(tile.id)
      return
    }
    if (selected === tile.id) {
      setSelected(null)
      return
    }

    const sel = tiles.find((t) => t.id === selected)
    if (!sel) {
      setSelected(null)
      return
    }

    if (sel.char === tile.char && sel.kind !== tile.kind) {
      setTiles((ts) =>
        ts.map((t) =>
          t.id === sel.id || t.id === tile.id ? { ...t, matched: true } : t,
        ),
      )
      setSelected(null)
      toast.success("配对成功！🎉")
    } else {
      setWrong([sel.id, tile.id])
      toast.error("再试一次哦～")
      window.setTimeout(() => {
        setWrong([])
        setSelected(null)
      }, 700)
    }
  }

  if (finished) {
    return (
      <Card className="items-center gap-4 py-10 text-center">
        <span className="text-5xl">🏆</span>
        <h3 className="font-display text-2xl">全部配对成功！</h3>
        <p className="text-muted-foreground">
          你把 {pairCount} 个汉字都找对了图片，真厉害！
        </p>
        <Button onClick={restart} size="lg">
          <RotateCcw className="size-4" />
          再玩一次
        </Button>
      </Card>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-center text-sm text-muted-foreground">
        点一个图片，再点对应的汉字，把它们配成一对（共 {pairCount} 对）
      </p>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
        {tiles.map((tile) => (
          <button
            key={tile.id}
            type="button"
            onClick={() => handleClick(tile)}
            className={cn(
              "flex aspect-square items-center justify-center rounded-xl border bg-card text-4xl shadow-sm transition-all select-none",
              tile.kind === "char" && "font-serif-cn font-black",
              tile.matched && "border-emerald-400 bg-emerald-50",
              selected === tile.id && "ring-3 ring-primary",
              wrong.includes(tile.id) && "animate-shake border-destructive bg-destructive/10",
              !tile.matched &&
                !wrong.includes(tile.id) &&
                "hover:border-primary/40 hover:shadow-md",
            )}
          >
            {tile.kind === "emoji" ? tile.emoji : tile.char}
          </button>
        ))}
      </div>
    </div>
  )
}
