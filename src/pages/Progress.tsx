import { Trash2 } from "lucide-react"
import { toast } from "sonner"

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
import { allChars, categories, getCharsByCategory } from "@/data/characters"
import { useProgress } from "@/hooks/useProgress"

const scoreMeta: Record<string, { label: string; unit: string }> = {
  flashcard: { label: "字卡翻翻看", unit: "个字" },
  match: { label: "字图配对", unit: "对" },
  listen: { label: "听音找字", unit: "题" },
}

export function ProgressPage() {
  const { state, reset } = useProgress()
  const learnedCount = state.learned.length
  const starredCount = state.starred.length
  const percent = Math.round((learnedCount / allChars.length) * 100)

  const handleReset = () => {
    reset()
    toast.success("进度已重置")
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="font-display text-3xl md:text-4xl">学习进度</h1>
        <p className="text-muted-foreground">记录孩子的认字旅程，每一步都值得鼓励。</p>
      </div>

      <Card className="gap-4">
        <CardHeader className="p-0">
          <CardTitle className="text-xl">总体进度</CardTitle>
          <CardDescription>已学会的汉字</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 p-0">
          <div className="flex items-end justify-between">
            <span className="font-display text-5xl font-bold text-primary">{learnedCount}</span>
            <span className="text-muted-foreground">共 {allChars.length} 字</span>
          </div>
          <Progress value={percent} />
          <div className="flex gap-6 text-sm">
            <span>
              完成 <span className="font-bold">{percent}%</span>
            </span>
            <span>
              已收藏 <span className="font-bold text-amber-500">{starredCount}</span> 字
            </span>
          </div>
        </CardContent>
      </Card>

      <section className="flex flex-col gap-3">
        <h2 className="font-display text-xl">分类进度</h2>
        <Card className="gap-3 py-4">
          <div className="flex flex-col gap-4 px-5">
            {categories.map((c) => {
              const chars = getCharsByCategory(c.id)
              const learned = chars.filter((ch) => state.learned.includes(ch.char)).length
              const pct = Math.round((learned / chars.length) * 100)
              return (
                <div key={c.id} className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span>
                      {c.emoji} {c.name}
                    </span>
                    <span className="text-muted-foreground">
                      {learned}/{chars.length}
                    </span>
                  </div>
                  <Progress value={pct} className="h-2.5" />
                </div>
              )
            })}
          </div>
        </Card>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="font-display text-xl">游戏最佳成绩</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {Object.entries(scoreMeta).map(([key, meta]) => {
            const score = state.scores[key]
            return (
              <Card key={key} className="gap-2 py-4">
                <CardHeader className="p-0">
                  <CardTitle className="text-base">{meta.label}</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  {score ? (
                    <span className="font-display text-3xl font-bold text-primary">
                      {score}
                      <span className="text-sm font-normal text-muted-foreground">
                        {" "}
                        {meta.unit}
                      </span>
                    </span>
                  ) : (
                    <span className="text-sm text-muted-foreground">还没玩过，去试试吧</span>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      <div className="flex justify-center pt-2">
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
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">取消</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button variant="destructive" onClick={handleReset}>
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
