import { Gamepad2, RotateCcw, Sparkles, Star, Trash2, Trophy } from "lucide-react"
import { toast } from "sonner"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { PageHeader, SectionTitle } from "@/components/ui/section"
import { allChars, categories, getCharsByCategory } from "@/data/characters"
import { useProgress } from "@/hooks/useProgress"
import { cn } from "@/lib/utils"

const scoreMeta: Record<
  string,
  { label: string; unit: string; emoji: string; to: string }
> = {
  flashcard: { label: "字卡翻翻看", unit: "个字", emoji: "🎴", to: "/games" },
  match: { label: "字图配对", unit: "对", emoji: "🧩", to: "/games" },
  listen: { label: "听音找字", unit: "题", emoji: "👂", to: "/games" },
}

function StatTile({
  label,
  value,
  suffix,
  icon: Icon,
  tint,
  delay = 0,
}: {
  label: string
  value: number | string
  suffix?: string
  icon: typeof Star
  tint: string
  delay?: number
}) {
  return (
    <Card
      className="enter gap-2 py-4"
      style={{ "--i": delay } as React.CSSProperties}
    >
      <CardContent className="flex items-center gap-3.5 p-0">
        <span
          aria-hidden
          className={cn(
            "flex size-12 shrink-0 items-center justify-center rounded-2xl",
            tint,
          )}
        >
          <Icon className="size-6" />
        </span>
        <div className="flex min-w-0 flex-col">
          <span className="font-display text-3xl leading-none font-bold tabular-nums">
            {value}
            {suffix ? (
              <span className="text-muted-foreground ml-1 text-sm font-normal">
                {suffix}
              </span>
            ) : null}
          </span>
          <span className="text-muted-foreground mt-1 truncate text-sm">{label}</span>
        </div>
      </CardContent>
    </Card>
  )
}

export function ProgressPage() {
  const { state, reset } = useProgress()
  const learnedCount = state.learned.length
  const starredCount = state.starred.length
  const playedCount = Object.keys(state.scores).length
  const percent = Math.round((learnedCount / allChars.length) * 100)
  const remaining = allChars.length - learnedCount

  const handleReset = () => {
    reset()
    toast.success("进度已重置")
  }

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="学习进度"
        description="记录孩子的认字旅程，每一步都值得鼓励。"
      />

      {/* Overall */}
      <Card className="from-primary-soft/60 gap-5 border-border bg-gradient-to-br to-card py-6">
        <CardHeader className="gap-2 p-0">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <div className="flex flex-col">
              <CardDescription>已学会的汉字</CardDescription>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="font-display text-primary text-5xl leading-none font-bold tabular-nums md:text-6xl">
                  {learnedCount}
                </span>
                <span className="text-muted-foreground text-sm">
                  / 共 {allChars.length} 字
                </span>
              </div>
            </div>
            <Badge
              variant={percent >= 100 ? "default" : "accent"}
              className="px-3 py-1.5 text-sm"
            >
              {percent >= 100 ? "🎉 全部学完" : `完成 ${percent}%`}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 p-0">
          <Progress value={percent} className="h-3.5" aria-label="总体学习进度" />
          <p className="text-muted-foreground text-sm">
            {percent >= 100
              ? "太厉害了，整本汉字库都认识了！"
              : `还剩 ${remaining} 个字，每天认 1–2 个，慢慢来就好。`}
          </p>
        </CardContent>
      </Card>

      {/* Secondary stats */}
      <div className="grid gap-3 sm:grid-cols-3">
        <StatTile
          label="收藏的字"
          value={starredCount}
          suffix="个"
          icon={Star}
          tint="bg-star/12 text-star"
          delay={0}
        />
        <StatTile
          label="玩过的游戏"
          value={`${playedCount}/3`}
          icon={Gamepad2}
          tint="bg-primary-soft text-primary"
          delay={1}
        />
        <StatTile
          label="完成度"
          value={`${percent}%`}
          icon={Sparkles}
          tint="bg-accent text-accent-foreground"
          delay={2}
        />
      </div>

      {/* Per-category */}
      <section className="flex flex-col gap-4">
        <SectionTitle>分类进度</SectionTitle>
        <Card className="gap-4 py-6">
          <CardContent className="flex flex-col gap-5 p-0">
            {categories.map((c, i) => {
              const chars = getCharsByCategory(c.id)
              const learned = chars.filter((ch) => state.learned.includes(ch.char)).length
              const pct = Math.round((learned / chars.length) * 100)
              const done = learned === chars.length
              return (
                <div
                  key={c.id}
                  className="enter flex flex-col gap-2"
                  style={{ "--i": Math.min(i, 10) } as React.CSSProperties}
                >
                  <div className="flex items-center justify-between gap-3 text-sm">
                    <span className="flex items-center gap-2 font-medium">
                      <span aria-hidden className="text-base">
                        {c.emoji}
                      </span>
                      {c.name}
                      {done && (
                        <span className="text-success text-xs" aria-label="已完成">
                          ✓ 完成
                        </span>
                      )}
                    </span>
                    <span className="text-muted-foreground tabular-nums">
                      {learned}/{chars.length}
                    </span>
                  </div>
                  <Progress
                    value={pct}
                    className="h-2.5"
                    aria-label={`${c.name} 进度 ${pct}%`}
                  />
                </div>
              )
            })}
          </CardContent>
        </Card>
      </section>

      {/* Game scores */}
      <section className="flex flex-col gap-4">
        <SectionTitle>游戏最佳成绩</SectionTitle>
        <div className="grid gap-3 sm:grid-cols-3">
          {Object.entries(scoreMeta).map(([key, meta], i) => {
            const score = state.scores[key]
            return (
              <Card
                key={key}
                className="enter gap-3 py-5"
                style={{ "--i": i } as React.CSSProperties}
              >
                <CardHeader className="flex-row items-center gap-2.5 p-0">
                  <span
                    aria-hidden
                    className="bg-muted flex size-9 items-center justify-center rounded-xl text-lg"
                  >
                    {meta.emoji}
                  </span>
                  <CardTitle className="text-base">{meta.label}</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  {score ? (
                    <span className="font-display text-primary flex items-baseline gap-1.5 text-3xl font-bold tabular-nums">
                      <Trophy aria-hidden className="text-star size-5 self-center" />
                      {score}
                      <span className="text-muted-foreground text-sm font-normal">
                        {meta.unit}
                      </span>
                    </span>
                  ) : (
                    <span className="text-muted-foreground text-sm">
                      还没玩过，去试试吧
                    </span>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Reset */}
      <div className="border-border flex justify-center border-t pt-6">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Trash2 className="size-4" />
              重置进度
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>确定要重置进度吗？</DialogTitle>
              <DialogDescription>
                这会清空所有「已学会」「收藏」和游戏成绩，且无法恢复。
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="mt-2">
              <DialogClose asChild>
                <Button variant="outline">取消</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button variant="destructive" onClick={handleReset}>
                  <RotateCcw className="size-4" />
                  确定重置
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
