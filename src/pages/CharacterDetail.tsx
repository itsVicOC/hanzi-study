import { Link, useNavigate, useParams } from "react-router-dom"
import { ArrowLeft, Check, ChevronLeft, ChevronRight, Star, Volume2 } from "lucide-react"

import { CharBig } from "@/components/char/CharBig"
import { StrokeDemo } from "@/components/char/StrokeDemo"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { allChars, getCategory, getCharByChar } from "@/data/characters"
import { useProgress } from "@/hooks/useProgress"
import { useSpeech } from "@/hooks/useSpeech"
import { cn } from "@/lib/utils"

export function CharacterDetail() {
  const { char: charParam } = useParams()
  const navigate = useNavigate()
  const char = charParam ? getCharByChar(charParam) : undefined
  const { isLearned, isStarred, toggleLearned, toggleStar } = useProgress()
  const { sayChar, sayWord } = useSpeech()

  if (!char) {
    return (
      <div className="flex flex-col items-center gap-4 py-20 text-center">
        <span className="text-5xl">🤔</span>
        <h1 className="font-display text-2xl">没有找到这个字</h1>
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
      <div className="flex items-center justify-between">
        <Button asChild variant="ghost" size="sm">
          <Link to="/library">
            <ArrowLeft className="size-4" />
            汉字库
          </Link>
        </Button>
        {category && (
          <Link to={`/library?cat=${category.id}`}>
            <Badge variant="secondary" className="text-sm">
              {category.emoji} {category.name}
            </Badge>
          </Link>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,22rem)_1fr]">
        {/* Left: character + actions */}
        <div className="flex flex-col items-center gap-4">
          <CharBig char={char} onSpeak={() => sayChar(char.char)} />

          <div className="flex flex-col items-center gap-1">
            <span className="text-3xl font-bold text-muted-foreground">{char.pinyin}</span>
            <span className="text-sm text-muted-foreground">共 {char.strokeCount} 笔</span>
          </div>

          <div className="flex w-full gap-2">
            <Button
              size="lg"
              onClick={() => {
                toggleLearned(char.char)
              }}
              className={cn(
                "flex-1",
                learned ? "bg-emerald-600 hover:bg-emerald-600/90" : "bg-primary",
              )}
            >
              <Check className="size-5" />
              {learned ? "已学会" : "我会了"}
            </Button>
            <Button
              size="lg"
              variant={starred ? "default" : "outline"}
              onClick={() => toggleStar(char.char)}
              className={cn(starred && "bg-amber-500 hover:bg-amber-500/90")}
              aria-label="收藏"
            >
              <Star className={cn("size-5", starred && "fill-white")} />
              收藏
            </Button>
          </div>

          <div className="flex w-full items-center justify-between gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={!prev}
              onClick={() => prev && navigate(`/char/${prev.char}`)}
            >
              <ChevronLeft className="size-4" />
              上一个
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={!next}
              onClick={() => next && navigate(`/char/${next.char}`)}
            >
              下一个
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>

        {/* Right: details */}
        <div className="flex flex-col gap-4">
          <Card className="gap-3">
            <CardHeader className="p-0">
              <CardTitle className="text-xl">💡 记忆小妙招</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <p className="text-base leading-relaxed">{char.tip}</p>
            </CardContent>
          </Card>

          <Card className="gap-3">
            <CardHeader className="p-0">
              <CardTitle className="text-xl">📜 字源演变</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <p className="text-base leading-relaxed text-muted-foreground">{char.evolution}</p>
            </CardContent>
          </Card>

          <Card className="gap-3">
            <CardHeader className="p-0">
              <CardTitle className="text-xl">📖 组词</CardTitle>
              <CardDescription>点一下，听一听这个词</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2 p-0">
              {char.words.map((w) => (
                <Button
                  key={w}
                  variant="secondary"
                  size="sm"
                  onClick={() => sayWord(w)}
                  className="h-10 px-3 text-base"
                >
                  <Volume2 className="size-4" />
                  {w}
                </Button>
              ))}
            </CardContent>
          </Card>

          <Separator />

          <Card className="gap-3">
            <CardHeader className="p-0">
              <CardTitle className="text-xl">✍️ 笔画演示</CardTitle>
              <CardDescription>看动画，了解这个字是怎么一笔一画写出来的</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <StrokeDemo char={char.char} strokeCount={char.strokeCount} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
