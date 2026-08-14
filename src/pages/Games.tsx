import { useState } from "react"

import { FlashcardGame } from "@/components/games/FlashcardGame"
import { ListenFindGame } from "@/components/games/ListenFindGame"
import { MatchGame } from "@/components/games/MatchGame"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { allChars, categories, getCharsByCategory } from "@/data/characters"
import { cn } from "@/lib/utils"

function PoolChip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex shrink-0 items-center gap-1 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground",
      )}
    >
      {children}
    </button>
  )
}

export function Games() {
  const [pool, setPool] = useState<string>("all")
  const poolChars = pool === "all" ? allChars : getCharsByCategory(pool)

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h1 className="font-display text-3xl md:text-4xl">学习游戏</h1>
        <p className="text-muted-foreground">
          选一个主题，再选一个游戏。家长陪着玩，认字更有趣。
        </p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1 md:flex-wrap">
        <PoolChip active={pool === "all"} onClick={() => setPool("all")}>
          全部字
        </PoolChip>
        {categories.map((c) => (
          <PoolChip key={c.id} active={pool === c.id} onClick={() => setPool(c.id)}>
            <span>{c.emoji}</span>
            {c.name}
          </PoolChip>
        ))}
      </div>

      <Tabs defaultValue="flashcard">
        <TabsList className="grid h-auto w-full grid-cols-3">
          <TabsTrigger value="flashcard" className="py-2.5">
            🎴 翻翻看
          </TabsTrigger>
          <TabsTrigger value="match" className="py-2.5">
            🧩 配对
          </TabsTrigger>
          <TabsTrigger value="listen" className="py-2.5">
            👂 听音找字
          </TabsTrigger>
        </TabsList>

        <TabsContent value="flashcard" className="pt-4">
          <FlashcardGame key={`fc-${pool}`} pool={poolChars} />
        </TabsContent>
        <TabsContent value="match" className="pt-4">
          <MatchGame key={`match-${pool}`} pool={poolChars} />
        </TabsContent>
        <TabsContent value="listen" className="pt-4">
          <ListenFindGame key={`listen-${pool}`} pool={poolChars} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
