import { Link } from "react-router-dom"
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Gamepad2,
  HeartHandshake,
  Timer,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SectionTitle } from "@/components/ui/section"
import { allChars } from "@/data/characters"
import { useSpeech } from "@/hooks/useSpeech"

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

const quickLinks = [
  {
    to: "/library",
    title: "汉字库",
    desc: `${allChars.length} 个常用汉字，10 个主题分类`,
    cta: "去看看",
    icon: BookOpen,
    tint: "bg-primary-soft text-primary",
  },
  {
    to: "/games",
    title: "学习游戏",
    desc: "字卡翻翻看 · 字图配对 · 听音找字",
    cta: "玩一玩",
    icon: Gamepad2,
    tint: "bg-accent text-accent-foreground",
  },
  {
    to: "/progress",
    title: "学习进度",
    desc: "看看已经学会了多少个字",
    cta: "看进度",
    icon: BarChart3,
    tint: "bg-emerald-500/12 text-emerald-700 dark:text-emerald-300",
  },
  {
    to: "/guide",
    title: "家长指南",
    desc: "中班认知特点、方法与注意事项",
    cta: "读指南",
    icon: HeartHandshake,
    tint: "bg-sky-500/12 text-sky-700 dark:text-sky-300",
  },
]

export function Home() {
  const { sayChar } = useSpeech()

  return (
    <div className="flex flex-col gap-12 md:gap-16">
      {/* Hero */}
      <section className="flex flex-col items-center gap-6 py-4 text-center md:py-10">
        <Badge variant="accent" className="enter gap-1.5 px-3.5 py-1.5 text-sm">
          <span aria-hidden>🌟</span>
          适合幼儿园中班 · 4–5 岁
        </Badge>

        <h1 className="font-display enter max-w-2xl text-4xl leading-[1.15] tracking-tight md:text-6xl" style={{ "--i": 1 } as React.CSSProperties}>
          快乐认字，
          <br className="hidden md:block" /> 从这里开始
        </h1>

        <p
          className="text-muted-foreground enter max-w-xl text-base md:text-lg"
          style={{ "--i": 2 } as React.CSSProperties}
        >
          象形识字 · 字卡游戏 · 每天 10 分钟。
          <br />
          家长陪着玩，孩子轻松学，不超前、不小学化。
        </p>

        <div
          className="enter flex flex-wrap justify-center gap-3"
          style={{ "--i": 3 } as React.CSSProperties}
        >
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

        {/* Sample glyphs — each one speaks when tapped. */}
        <ul className="mt-4 flex flex-wrap items-center justify-center gap-2 md:gap-3">
          {previewChars.map((c, i) => (
            <li
              key={c}
              className="enter"
              style={{ "--i": 4 + i } as React.CSSProperties}
            >
              <button
                type="button"
                onClick={() => sayChar(c)}
                aria-label={`播放「${c}」的读音`}
                className="press font-serif-cn bg-tianzige hover:border-primary/45 hover:shadow-glow flex size-14 items-center justify-center rounded-2xl border border-border bg-card text-4xl font-black shadow-sm outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring md:size-16 md:text-5xl"
              >
                {c}
              </button>
            </li>
          ))}
        </ul>
        <p className="text-muted-foreground enter text-xs" style={{ "--i": 12 } as React.CSSProperties}>
          点一个汉字，听一听它怎么读
        </p>
      </section>

      {/* Daily 10 minutes */}
      <section className="from-primary-soft/70 via-card to-card border-border shadow-sm relative overflow-hidden rounded-4xl border bg-gradient-to-br p-6 text-center md:p-10">
        <span
          aria-hidden
          className="pointer-events-none absolute -top-10 -right-8 size-40 rounded-full bg-accent/25 blur-2xl"
        />
        <span className="bg-primary-vivid/12 text-primary relative inline-flex size-12 items-center justify-center rounded-2xl">
          <Timer className="size-6" aria-hidden />
        </span>
        <h2 className="font-display relative mt-3 text-2xl tracking-tight md:text-3xl">
          每天 10 分钟就够了
        </h2>
        <p className="text-muted-foreground relative mx-auto mt-2 max-w-2xl text-sm md:text-base">
          中班孩子注意力有限，短时高频、有兴趣最重要。每天陪孩子认几个字、玩一个小游戏，
          不强迫、不抄写、不考试，保护孩子的学习兴趣。
        </p>
      </section>

      {/* Methods */}
      <section className="flex flex-col gap-5">
        <SectionTitle>这样学，孩子更喜欢</SectionTitle>
        <div className="grid gap-4 sm:grid-cols-2">
          {methods.map((m, i) => (
            <Card
              key={m.title}
              className="enter hover:border-primary/35 gap-3 py-5 transition-colors hover:shadow-md"
              style={{ "--i": i } as React.CSSProperties}
            >
              <CardHeader className="flex-row items-center gap-3 p-0">
                <span
                  aria-hidden
                  className="bg-muted flex size-12 shrink-0 items-center justify-center rounded-2xl text-2xl"
                >
                  {m.emoji}
                </span>
                <CardTitle>{m.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <CardDescription className="text-base">{m.desc}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Quick links */}
      <section className="flex flex-col gap-5">
        <SectionTitle>开始探索</SectionTitle>
        <div className="grid gap-4 sm:grid-cols-2">
          {quickLinks.map((link, i) => (
            <Link
              key={link.to}
              to={link.to}
              className="press group enter rounded-3xl outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              style={{ "--i": i } as React.CSSProperties}
            >
              <Card className="hover:border-primary/40 h-full gap-3 py-5 transition-[border-color,box-shadow,transform] group-hover:-translate-y-0.5 group-hover:shadow-md">
                <CardHeader className="flex-row items-center gap-3 p-0">
                  <span
                    aria-hidden
                    className={`flex size-11 shrink-0 items-center justify-center rounded-2xl ${link.tint}`}
                  >
                    <link.icon className="size-5" />
                  </span>
                  <div className="flex flex-col gap-0.5">
                    <CardTitle className="text-lg">{link.title}</CardTitle>
                    <CardDescription>{link.desc}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="text-primary flex items-center gap-1 p-0 text-sm font-medium">
                  {link.cta}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
