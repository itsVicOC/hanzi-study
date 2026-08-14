import { useMemo, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { Check, Search } from "lucide-react"

import { CharCard } from "@/components/char/CharCard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { allChars, categories, getCharsByCategory } from "@/data/characters"
import { useProgress } from "@/hooks/useProgress"
import { cn } from "@/lib/utils"

function CategoryChip({
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

export function Library() {
  const { isLearned, isStarred } = useProgress()
  const [searchParams] = useSearchParams()
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState<string>(() => {
    const cat = searchParams.get("cat")
    return cat && categories.some((c) => c.id === cat) ? cat : "all"
  })
  const [onlyLearned, setOnlyLearned] = useState(false)

  const activeCategory = categories.find((c) => c.id === category)

  const filtered = useMemo(() => {
    const base = category === "all" ? allChars : getCharsByCategory(category)
    const q = query.trim().toLowerCase()
    return base.filter((c) => {
      const matchesQuery =
        !q ||
        c.char.includes(query.trim()) ||
        c.pinyin.toLowerCase().includes(q) ||
        c.words.some((w) => w.includes(query.trim()))
      const matchesLearned = !onlyLearned || isLearned(c.char)
      return matchesQuery && matchesLearned
    })
  }, [category, query, onlyLearned, isLearned])

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h1 className="font-display text-3xl md:text-4xl">汉字库</h1>
        <p className="text-muted-foreground">
          {activeCategory
            ? `${activeCategory.emoji} ${activeCategory.name} · ${activeCategory.description}`
            : `共 ${allChars.length} 个常用汉字，按主题分类，点一个字看看它的故事`}
        </p>
      </div>

      <div className="relative">
        <Search className="text-muted-foreground absolute left-3 top-1/2 size-4 -translate-y-1/2" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="搜索汉字、拼音或词语…"
          className="h-11 pl-9"
        />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1 md:flex-wrap">
        <CategoryChip active={category === "all"} onClick={() => setCategory("all")}>
          全部
        </CategoryChip>
        {categories.map((c) => (
          <CategoryChip
            key={c.id}
            active={category === c.id}
            onClick={() => setCategory(c.id)}
          >
            <span>{c.emoji}</span>
            {c.name}
          </CategoryChip>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">
          共 <span className="font-bold text-foreground">{filtered.length}</span> 个字
        </span>
        <Button
          variant={onlyLearned ? "default" : "outline"}
          size="sm"
          onClick={() => setOnlyLearned((v) => !v)}
        >
          <Check className="size-4" />
          只看已学
        </Button>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed py-16 text-center text-muted-foreground">
          <span className="text-4xl">🔍</span>
          <p>没有找到匹配的汉字</p>
          <Button variant="outline" size="sm" onClick={() => { setQuery(""); setOnlyLearned(false); setCategory("all") }}>
            清除筛选
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
          {filtered.map((c) => (
            <CharCard
              key={c.char}
              char={c}
              learned={isLearned(c.char)}
              starred={isStarred(c.char)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
