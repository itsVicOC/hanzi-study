import { useMemo, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { Check, Search, SearchX, X } from "lucide-react"

import { CharCard } from "@/components/char/CharCard"
import { Button } from "@/components/ui/button"
import { Chip, ChipRow } from "@/components/ui/chip"
import { Input } from "@/components/ui/input"
import { PageHeader } from "@/components/ui/section"
import { allChars, categories, getCharsByCategory } from "@/data/characters"
import { useProgress } from "@/hooks/useProgress"

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
    const trimmed = query.trim()
    const q = trimmed.toLowerCase()
    return base.filter((c) => {
      const matchesQuery =
        !q ||
        c.char.includes(trimmed) ||
        c.pinyin.toLowerCase().includes(q) ||
        c.words.some((w) => w.includes(trimmed))
      const matchesLearned = !onlyLearned || isLearned(c.char)
      return matchesQuery && matchesLearned
    })
  }, [category, query, onlyLearned, isLearned])

  const hasFilters = query.trim() !== "" || onlyLearned || category !== "all"

  const clearFilters = () => {
    setQuery("")
    setOnlyLearned(false)
    setCategory("all")
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="汉字库"
        description={
          activeCategory
            ? `${activeCategory.emoji} ${activeCategory.name} · ${activeCategory.description}`
            : `共 ${allChars.length} 个常用汉字，按主题分类。点一个字，看看它的故事。`
        }
      />

      <div className="flex flex-col gap-4">
        {/* Search */}
        <div className="relative">
          <label htmlFor="char-search" className="sr-only">
            搜索汉字、拼音或词语
          </label>
          <Search
            aria-hidden
            className="text-muted-foreground pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2"
          />
          <Input
            id="char-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索汉字、拼音或词语…"
            className="pr-11 pl-10 [&::-webkit-search-cancel-button]:hidden"
          />
          {query !== "" && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="清空搜索"
              className="text-muted-foreground hover:bg-muted hover:text-foreground absolute top-1/2 right-2 flex size-8 -translate-y-1/2 items-center justify-center rounded-lg transition-colors outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <X className="size-4" />
            </button>
          )}
        </div>

        {/* Categories */}
        <ChipRow className="md:pt-0.5">
          <Chip active={category === "all"} onClick={() => setCategory("all")}>
            全部
          </Chip>
          {categories.map((c) => (
            <Chip
              key={c.id}
              active={category === c.id}
              onClick={() => setCategory(c.id)}
            >
              <span aria-hidden>{c.emoji}</span>
              {c.name}
            </Chip>
          ))}
        </ChipRow>
      </div>

      {/* Result bar */}
      <div className="border-border flex flex-wrap items-center justify-between gap-3 border-t pt-4">
        <p className="text-muted-foreground text-sm">
          共 <span className="text-foreground font-bold">{filtered.length}</span> 个字
          {activeCategory ? ` · ${activeCategory.name}` : ""}
        </p>
        <Button
          variant={onlyLearned ? "default" : "outline"}
          aria-pressed={onlyLearned}
          onClick={() => setOnlyLearned((v) => !v)}
        >
          <Check className="size-4" />
          只看已学
        </Button>
      </div>

      {filtered.length === 0 ? (
        <div className="border-border-strong bg-surface flex flex-col items-center gap-3 rounded-3xl border border-dashed px-6 py-16 text-center">
          <span
            aria-hidden
            className="bg-muted text-muted-foreground flex size-14 items-center justify-center rounded-2xl"
          >
            <SearchX className="size-7" />
          </span>
          <p className="font-display text-lg">没有找到匹配的汉字</p>
          <p className="text-muted-foreground text-sm">
            换个拼音或词语试试，或者选「全部」看所有汉字。
          </p>
          {hasFilters && (
            <Button variant="outline" size="sm" onClick={clearFilters}>
              清除筛选
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {filtered.map((c, i) => (
            <div
              key={c.char}
              className="enter"
              style={{ "--i": Math.min(i, 14) } as React.CSSProperties}
            >
              <CharCard
                char={c}
                learned={isLearned(c.char)}
                starred={isStarred(c.char)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
