import { useEffect, useState } from "react"
import { Check, RotateCcw } from "lucide-react"
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
    tiles.push({
      id: `${p.char}-e`,
      char: p.char,
      emoji: p.emoji,
      kind: "emoji",
      matched: false,
    })
    tiles.push({
      id: `${p.char}-c`,
      char: p.char,
      emoji: p.emoji,
      kind: "char",
      matched: false,
    })
  })
  return shuffle(tiles)
}

export function MatchGame({ pool }: MatchGameProps) {
  const { recordScore } = useProgress()
  const pairCount = Math.min(6, Math.max(3, pool.length))
  const [tiles, setTiles] = useState<Tile[]>(() => buildTiles(pool, pairCount))
  const [selected, setSelected] = useState<string | null>(null)
  const [wrong, setWrong] = useState<string[]>([])
  const [moves, setMoves] = useState(0)

  const matchedCount = tiles.filter((t) => t.matched).length / 2
  const finished = matchedCount === pairCount

  useEffect(() => {
    if (finished) recordScore("match", pairCount)
  }, [finished, pairCount, recordScore])

  const restart = () => {
    setTiles(buildTiles(pool, pairCount))
    setSelected(null)
    setWrong([])
    setMoves(0)
  }

  const handleClick = (tile: Tile) => {
    if (tile.matched || wrong.length > 0) return

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

    setMoves((m) => m + 1)

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
      <Card className="items-center gap-4 px-6 py-12 text-center">
        <span aria-hidden className="enter text-6xl">
          🏆
        </span>
        <h3 className="font-display text-2xl tracking-tight">全部配对成功！</h3>
        <p className="text-muted-foreground">
          你把 {pairCount} 个汉字都找对了图片，一共用了{" "}
          <span className="text-primary font-bold tabular-nums">{moves}</span> 次
        </p>
        <Button onClick={restart} size="lg">
          <RotateCcw className="size-4" />
          再玩一次
        </Button>
      </Card>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="text-muted-foreground flex flex-wrap items-center justify-between gap-2 text-sm">
        <p>点一个图片，再点对应的汉字，把它们配成一对</p>
        <p className="tabular-nums">
          已配对{" "}
          <span className="text-success font-bold">{matchedCount}</span> / {pairCount} 对 ·
          尝试 <span className="text-foreground font-bold">{moves}</span> 次
        </p>
      </div>

      <div className="mx-auto grid w-full max-w-2xl grid-cols-3 gap-2.5 sm:grid-cols-4">
        {tiles.map((tile) => {
          const isWrong = wrong.includes(tile.id)
          const isSelected = selected === tile.id
          return (
            <button
              key={tile.id}
              type="button"
              onClick={() => handleClick(tile)}
              disabled={tile.matched}
              aria-label={
                tile.matched
                  ? `${tile.char}，已配对`
                  : tile.kind === "emoji"
                    ? `图片 ${tile.emoji}`
                    : `汉字 ${tile.char}`
              }
              className={cn(
                "press relative flex aspect-square items-center justify-center rounded-2xl border text-4xl shadow-sm select-none",
                "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                tile.kind === "char" && "font-serif-cn font-black",
                tile.matched
                  ? "border-success/40 bg-success-soft text-success dark:text-emerald-300"
                  : "border-border bg-card hover:border-primary/45 hover:shadow-md",
                isSelected && "border-primary shadow-glow ring-2 ring-primary/45",
                isWrong && "animate-shake border-destructive bg-destructive-soft",
              )}
            >
              {tile.kind === "emoji" ? tile.emoji : tile.char}

              {tile.matched && (
                <span
                  aria-hidden
                  className="bg-success ring-card absolute -top-1.5 -right-1.5 flex size-5 items-center justify-center rounded-full text-white ring-2"
                >
                  <Check className="size-3" strokeWidth={3} />
                </span>
              )}
            </button>
          )
        })}
      </div>

      <div className="flex justify-center">
        <Button variant="ghost" size="sm" onClick={restart}>
          <RotateCcw className="size-4" />
          换一批
        </Button>
      </div>
    </div>
  )
}
