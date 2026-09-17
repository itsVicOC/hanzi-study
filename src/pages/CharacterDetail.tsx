import { Link, useNavigate, useParams } from "react-router-dom"
import {
  ArrowLeft,
  BookOpen,
  Check,
  ChevronLeft,
  ChevronRight,
  Compass,
  Lightbulb,
  PenLine,
  Star,
  Volume2,
} from "lucide-react"

import { CharBig } from "@/components/char/CharBig"
import { StrokeDemo } from "@/components/char/StrokeDemo"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { allChars, getCategory, getCharByChar } from "@/data/characters"
import { useProgress } from "@/hooks/useProgress"
import { useSpeech } from "@/hooks/useSpeech"
import { cn } from "@/lib/utils"

/** Shared card layout for the three "knowledge" blocks on the right column. */
function InfoCard({
  icon: Icon,
  title,
  hint,
  children,
  delay = 0,
}: {
  icon: typeof Lightbulb
  title: string
  hint?: string
  children: React.ReactNode
  delay?: number
}) {
  return (
    <Card
      className="enter gap-4 py-5"
      style={{ "--i": delay } as React.CSSProperties}
    >
      <CardHeader className="gap-1.5 p-0">
        <CardTitle className="flex items-center gap-2.5">
          <span
            aria-hidden
            className="bg-primary-soft text-primary flex size-9 shrink-0 items-center justify-center rounded-xl"
          >
            <Icon className="size-4.5" />
          </span>
          {title}
        </CardTitle>
        {hint ? <CardDescription>{hint}</CardDescription> : null}
      </CardHeader>
      <CardContent className="p-0">{children}</CardContent>
    </Card>
  )
}

export function CharacterDetail() {
  const { char: charParam } = useParams()
  const navigate = useNavigate()
  const char = charParam ? getCharByChar(charParam) : undefined
  const { isLearned, isStarred, toggleLearned, toggleStar } = useProgress()
  const { sayChar, sayWord } = useSpeech()

  if (!char) {
    return (
      <div className="flex flex-col items-center gap-4 py-20 text-center">
        <span aria-hidden className="text-5xl">
          🤔
        </span>
        <h1 className="font-display text-2xl">没有找到这个字</h1>
        <p className="text-muted-foreground">它可能不在当前的汉字库里。</p>
        <Button asChild>
          <Link to="/library">返回汉字库</Link>
        </Button>
      </div>
    )
  }

  const category = getCategory(char.category)
  const index = allChars.findIndex((c) => c.char === char.char)
  const prev = index > 0 ? allChars[index - 1] : undefined
  const next = index < allChars.length - 1 ? allChars[index + 1] : undefined
  const learned = isLearned(char.char)
  const starred = isStarred(char.char)

  return (
    <div className="flex flex-col gap-6">
      {/* Top bar */}
      <div className="flex items-center justify-between gap-3">
        <Button asChild variant="ghost" className="-ml-2">
          <Link to="/library">
            <ArrowLeft className="size-4" />
            汉字库
          </Link>
        </Button>
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground hidden text-xs tabular-nums sm:inline">
            第 {index + 1} / {allChars.length} 字
          </span>
          {category && (
            <Link
              to={`/library?cat=${category.id}`}
              aria-label={`查看「${category.name}」分类`}
              className="flex min-h-11 items-center rounded-full outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <Badge variant="secondary" className="px-3.5 py-2 text-sm">
                <span aria-hidden>{category.emoji}</span>
                {category.name}
              </Badge>
            </Link>
          )}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,24rem)_1fr] lg:gap-8">
        {/* Left: character + actions */}
        <div className="flex flex-col items-center gap-4">
          <CharBig char={char} onSpeak={() => sayChar(char.char)} />

          <div className="flex flex-col items-center gap-0.5">
            {/* The page's real heading: visually the big glyph above already
                carries the character, so this stays for structure + a11y. */}
            <h1 className="sr-only">
              {char.char} {char.pinyin}，共 {char.strokeCount} 笔
            </h1>
            <span
              aria-hidden
              className="text-primary text-4xl leading-none font-bold tracking-wide"
            >
              {char.pinyin}
            </span>
            <span className="text-muted-foreground text-sm">
              共 <span className="text-foreground font-semibold">{char.strokeCount}</span>{" "}
              笔
            </span>
          </div>

          <div className="flex w-full max-w-72 gap-2.5">
            <Button
              size="lg"
              variant={learned ? "secondary" : "default"}
              aria-pressed={learned}
              onClick={() => toggleLearned(char.char)}
              className={cn(
                "flex-1",
                learned &&
                  "bg-success text-white hover:bg-success/90 dark:text-emerald-950",
              )}
            >
              <Check className="size-5" strokeWidth={learned ? 3 : 2} />
              {learned ? "已学会" : "我会了"}
            </Button>
            <Button
              size="lg"
              variant="outline"
              aria-pressed={starred}
              aria-label={starred ? "取消收藏" : "收藏这个字"}
              onClick={() => toggleStar(char.char)}
              className={cn(starred && "border-star/40 bg-star/10 text-star hover:bg-star/15")}
            >
              <Star className={cn("size-5", starred && "fill-current")} />
              <span className="hidden sm:inline">{starred ? "已收藏" : "收藏"}</span>
            </Button>
          </div>

          <div className="flex w-full max-w-72 items-center justify-between gap-2">
            <Button
              variant="ghost"
              disabled={!prev}
              onClick={() => prev && navigate(`/char/${prev.char}`)}
              aria-label={prev ? `上一个字：${prev.char}` : "已经是第一个字"}
            >
              <ChevronLeft className="size-4" />
              上一个
            </Button>
            <Button
              variant="ghost"
              disabled={!next}
              onClick={() => next && navigate(`/char/${next.char}`)}
              aria-label={next ? `下一个字：${next.char}` : "已经是最后一个字"}
            >
              下一个
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>

        {/* Right: details */}
        <div className="flex flex-col gap-4">
          <InfoCard icon={Lightbulb} title="记忆小妙招" delay={0}>
            <p className="text-base leading-relaxed">{char.tip}</p>
          </InfoCard>

          <InfoCard icon={Compass} title="字源演变" delay={1}>
            <p className="text-muted-foreground text-base leading-relaxed">
              {char.evolution}
            </p>
          </InfoCard>

          <InfoCard
            icon={BookOpen}
            title="组词"
            hint="点一下词语，听一听怎么读"
            delay={2}
          >
            <div className="flex flex-wrap gap-2">
              {char.words.map((w) => (
                <Button
                  key={w}
                  variant="secondary"
                  onClick={() => sayWord(w)}
                  className="h-11 px-4 text-base"
                >
                  <Volume2 className="size-4" />
                  {w}
                </Button>
              ))}
            </div>
          </InfoCard>

          <Card
            className="enter gap-4 py-5"
            style={{ "--i": 3 } as React.CSSProperties}
          >
            <CardHeader className="gap-1.5 p-0">
              <CardTitle className="flex items-center gap-2.5">
                <span
                  aria-hidden
                  className="bg-primary-soft text-primary flex size-9 shrink-0 items-center justify-center rounded-xl"
                >
                  <PenLine className="size-4.5" />
                </span>
                笔画演示
              </CardTitle>
              <CardDescription>看动画，了解这个字是怎么一笔一画写出来的</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center p-0">
              <StrokeDemo char={char.char} strokeCount={char.strokeCount} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
