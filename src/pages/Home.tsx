import { Link } from "react-router-dom"
import { ArrowRight, BarChart3, BookOpen, Gamepad2, HeartHandshake } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { allChars } from "@/data/characters"

const methods = [
  {
    emoji: "🔍",
    title: "象形识字",
    desc: "汉字的形状藏着秘密：日像太阳、山像山峰。看图认字，把字和事物连起来。",
  },
  {
    emoji: "🎴",
    title: "字卡游戏",
    desc: "翻翻看、配对、听音找字，把认字变成好玩的游戏，越玩越爱学。",
  },
  {
    emoji: "📚",
    title: "亲子共读",
    desc: "家长陪着一起读，在词语和句子里认字，识字和亲子陪伴两不误。",
  },
  {
    emoji: "🌱",
    title: "生活识字",
    desc: "从牛奶盒、路牌、绘本封面入手，让孩子发现汉字就在身边。",
  },
]

const previewChars = ["日", "月", "山", "水", "大", "小", "人", "口"]

export function Home() {
  return (
    <div className="flex flex-col gap-12 md:gap-16">
      {/* Hero */}
      <section className="flex flex-col items-center gap-6 py-6 text-center md:py-12">
        <Badge variant="accent" className="text-sm">
          🌟 适合幼儿园中班 · 4–5 岁
        </Badge>
        <h1 className="font-display max-w-2xl text-4xl leading-tight md:text-6xl">
          快乐认字，
          <br className="hidden md:block" /> 从这里开始
        </h1>
        <p className="max-w-xl text-base text-muted-foreground md:text-lg">
          象形识字 · 字卡游戏 · 每天 10 分钟。
          <br />
          家长陪着玩，孩子轻松学，不超前、不小学化。
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button asChild size="lg">
            <Link to="/library">
              <BookOpen className="size-5" />
              开始学字
            </Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <Link to="/games">
              <Gamepad2 className="size-5" />
              玩个游戏
            </Link>
          </Button>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-muted-foreground">
          {previewChars.map((c) => (
            <span
              key={c}
              className="font-serif-cn flex size-14 items-center justify-center rounded-2xl border bg-card text-4xl font-black shadow-sm md:size-16 md:text-5xl"
            >
              {c}
            </span>
          ))}
        </div>
      </section>

      {/* Daily 10 minutes */}
      <section className="rounded-3xl border bg-card p-6 text-center md:p-8">
        <p className="text-2xl">⏰</p>
        <h2 className="font-display mt-2 text-2xl md:text-3xl">每天 10 分钟就够了</h2>
        <p className="mx-auto mt-2 max-w-2xl text-muted-foreground">
          中班孩子注意力有限，短时高频、有兴趣最重要。每天陪孩子认几个字、玩一个小游戏，
          不强迫、不抄写、不考试，保护孩子的学习兴趣。
        </p>
      </section>

      {/* Methods */}
      <section className="flex flex-col gap-4">
        <h2 className="font-display text-2xl md:text-3xl">这样学，孩子更喜欢</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {methods.map((m) => (
            <Card key={m.title} className="gap-3 py-5">
              <CardHeader className="flex-row items-center gap-3 p-0">
                <span className="text-4xl">{m.emoji}</span>
                <CardTitle className="text-xl">{m.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <CardDescription className="text-base">{m.desc}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Quick links */}
      <section className="flex flex-col gap-4">
        <h2 className="font-display text-2xl md:text-3xl">开始探索</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Link to="/library" className="group">
            <Card className="h-full gap-2 transition-all group-hover:border-primary/40 group-hover:shadow-md">
              <CardHeader className="flex-row items-center gap-3 p-0">
                <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <BookOpen className="size-5" />
                </span>
                <div className="flex flex-col">
                  <CardTitle className="text-lg">汉字库</CardTitle>
                  <CardDescription>{allChars.length} 个常用汉字，10 个主题分类</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="flex items-center gap-1 p-0 text-sm text-primary">
                去看看 <ArrowRight className="size-4" />
              </CardContent>
            </Card>
          </Link>

          <Link to="/games" className="group">
            <Card className="h-full gap-2 transition-all group-hover:border-primary/40 group-hover:shadow-md">
              <CardHeader className="flex-row items-center gap-3 p-0">
                <span className="flex size-11 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                  <Gamepad2 className="size-5" />
                </span>
                <div className="flex flex-col">
                  <CardTitle className="text-lg">学习游戏</CardTitle>
                  <CardDescription>字卡翻翻看 · 字图配对 · 听音找字</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="flex items-center gap-1 p-0 text-sm text-primary">
                玩一玩 <ArrowRight className="size-4" />
              </CardContent>
            </Card>
          </Link>

          <Link to="/progress" className="group">
            <Card className="h-full gap-2 transition-all group-hover:border-primary/40 group-hover:shadow-md">
              <CardHeader className="flex-row items-center gap-3 p-0">
                <span className="flex size-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
                  <BarChart3 className="size-5" />
                </span>
                <div className="flex flex-col">
                  <CardTitle className="text-lg">学习进度</CardTitle>
                  <CardDescription>看看已经学会了多少个字</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="flex items-center gap-1 p-0 text-sm text-primary">
                看进度 <ArrowRight className="size-4" />
              </CardContent>
            </Card>
          </Link>

          <Link to="/guide" className="group">
            <Card className="h-full gap-2 transition-all group-hover:border-primary/40 group-hover:shadow-md">
              <CardHeader className="flex-row items-center gap-3 p-0">
                <span className="flex size-11 items-center justify-center rounded-xl bg-sky-500/10 text-sky-600">
                  <HeartHandshake className="size-5" />
                </span>
                <div className="flex flex-col">
                  <CardTitle className="text-lg">家长指南</CardTitle>
                  <CardDescription>中班认知特点、方法与注意事项</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="flex items-center gap-1 p-0 text-sm text-primary">
                读指南 <ArrowRight className="size-4" />
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>
    </div>
  )
}
