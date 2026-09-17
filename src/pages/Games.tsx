import { useState } from "react"

import { FlashcardGame } from "@/components/games/FlashcardGame"
import { ListenFindGame } from "@/components/games/ListenFindGame"
import { MatchGame } from "@/components/games/MatchGame"
import { Chip, ChipRow } from "@/components/ui/chip"
import { PageHeader } from "@/components/ui/section"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { allChars, categories, getCharsByCategory } from "@/data/characters"

export function Games() {
  const [pool, setPool] = useState<string>("all")
  const poolChars = pool === "all" ? allChars : getCharsByCategory(pool)
  const activeCategory = categories.find((c) => c.id === pool)

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="学习游戏"
        description="先选一个主题，再选一个游戏。家长陪着玩，认字更有趣。"
      />

      <div className="flex flex-col gap-3">
        <ChipRow>
          <Chip active={pool === "all"} onClick={() => setPool("all")}>
            全部字
          </Chip>
          {categories.map((c) => (
            <Chip key={c.id} active={pool === c.id} onClick={() => setPool(c.id)}>
              <span aria-hidden>{c.emoji}</span>
              {c.name}
            </Chip>
          ))}
        </ChipRow>
        <p className="text-muted-foreground text-sm">
          本轮用字：
          <span className="text-foreground font-medium">
            {activeCategory ? `${activeCategory.emoji} ${activeCategory.name}` : "全部字"}
          </span>{" "}
          · 共 <span className="text-foreground font-semibold">{poolChars.length}</span> 个字
        </p>
      </div>

      <Tabs defaultValue="flashcard" className="flex flex-col gap-4">
        <TabsList className="grid w-full grid-cols-3 sm:max-w-md">
          <TabsTrigger value="flashcard">
            <span aria-hidden>🎴</span>
            <span className="hidden sm:inline">翻翻看</span>
            <span className="sm:hidden">翻翻</span>
          </TabsTrigger>
          <TabsTrigger value="match">
            <span aria-hidden>🧩</span>
            <span className="hidden sm:inline">字图配对</span>
            <span className="sm:hidden">配对</span>
          </TabsTrigger>
          <TabsTrigger value="listen">
            <span aria-hidden>👂</span>
            <span className="hidden sm:inline">听音找字</span>
            <span className="sm:hidden">听音</span>
          </TabsTrigger>
        </TabsList>

        {/* `key` remounts a game whenever the character pool changes. */}
        <TabsContent value="flashcard">
          <FlashcardGame key={`fc-${pool}`} pool={poolChars} />
        </TabsContent>
        <TabsContent value="match">
          <MatchGame key={`match-${pool}`} pool={poolChars} />
        </TabsContent>
        <TabsContent value="listen">
          <ListenFindGame key={`listen-${pool}`} pool={poolChars} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
