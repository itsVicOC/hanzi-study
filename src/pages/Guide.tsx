import { Clock, ExternalLink } from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PageHeader, SectionTitle } from "@/components/ui/section"

const traits = [
  {
    emoji: "🖼️",
    title: "具体形象思维",
    desc: "4–5 岁孩子靠具体形象理解世界，认字必须借助图片、实物和象形联想，不能脱离形象死记。",
  },
  {
    emoji: "⏱️",
    title: "注意力只有 10–15 分钟",
    desc: "专注时间短，要短时高频、边玩边学，避免长时间静坐和机械重复。",
  },
  {
    emoji: "🔤",
    title: "文字意识刚刚萌芽",
    desc: "孩子开始对符号和文字感兴趣，这是启蒙的好时机，但应以兴趣引导为主，切忌超前。",
  },
]

const methods = [
  {
    emoji: "🔍",
    title: "象形识字",
    desc: "借助汉字的象形特点看图认字，建立「字—物」联想：日像太阳、山像山峰、木像大树。",
  },
  {
    emoji: "🎴",
    title: "字卡游戏",
    desc: "用字卡玩翻翻看、配对、接龙、寻宝，把认字变成好玩的游戏。",
  },
  {
    emoji: "🧩",
    title: "游戏化闯关",
    desc: "听音找字、字图配对，答对及时表扬，让孩子在闯关中获得成就感。",
  },
  {
    emoji: "📚",
    title: "亲子共读",
    desc: "读绘本时指认汉字，让孩子在故事和语境里自然认识文字。",
  },
  {
    emoji: "🌱",
    title: "生活识字",
    desc: "从牛奶盒、路牌、商店招牌、绘本封面上发现汉字，让认字贴近生活。",
  },
  {
    emoji: "🎵",
    title: "儿歌韵律",
    desc: "用朗朗上口的儿歌、顺口溜帮助记忆，节奏感让孩子记得更牢。",
  },
]

const schedule = [
  { time: "1–2 分钟", task: "复习昨天认识的 1–2 个字" },
  { time: "3–4 分钟", task: "看图认识 1–2 个新字" },
  { time: "3–4 分钟", task: "玩一个小游戏，或读一页绘本" },
  { time: "1 分钟", task: "表扬鼓励，愉快结束" },
]

const faqs = [
  {
    q: "为什么要「不超前、不小学化」？",
    a: "教育部明确要求，幼儿园不能以机械抄写、强制背诵、考试排名等方式开展教学。中班识字的重点是兴趣启蒙和「认读」，而不是提前学习小学课程。过早、过量反而会破坏孩子的学习兴趣。",
  },
  {
    q: "一次学多少个字合适？",
    a: "一次 1–2 个新字即可，宁可少而熟。高频字会在生活和绘本中反复出现，比一次性堆砌更有效。",
  },
  {
    q: "中班要不要让孩子写字？",
    a: "不建议。中班重点是「认识」和「读」，孩子手部小肌肉尚未发育好，过早书写既费力又容易挫败。书写是小学阶段的任务。",
  },
  {
    q: "孩子记了就忘怎么办？",
    a: "遗忘是正常的。可以在游戏、绘本和生活场景里让汉字反复出现，用「复习—新学—游戏」的节奏巩固，而不是责怪孩子。",
  },
  {
    q: "孩子不愿意学怎么办？",
    a: "兴趣永远第一。孩子不想学就停下来，换成更喜欢的游戏或绘本。识字是一件可以慢慢来的事，别把它变成负担。",
  },
  {
    q: "家长该怎么陪伴？",
    a: "做孩子的「学习伙伴」而不是「老师」：一起看图、一起玩字卡、一起读绘本，多用鼓励，不比较、不批评、不贴标签。",
  },
]

export function Guide() {
  return (
    <div className="flex flex-col gap-10">
      <PageHeader
        title="家长指南"
        description="写给家长的识字陪伴手册：了解中班孩子的特点，用对方法，每天 10 分钟，让孩子在快乐中爱上汉字。"
      />

      {/* Traits */}
      <section className="flex flex-col gap-4">
        <SectionTitle>先了解：中班孩子（4–5 岁）的特点</SectionTitle>
        <div className="grid gap-4 md:grid-cols-3">
          {traits.map((t, i) => (
            <Card
              key={t.title}
              className="enter gap-3 py-5"
              style={{ "--i": i } as React.CSSProperties}
            >
              <CardHeader className="gap-2 p-0">
                <span
                  aria-hidden
                  className="bg-muted flex size-12 items-center justify-center rounded-2xl text-2xl"
                >
                  {t.emoji}
                </span>
                <CardTitle className="text-lg">{t.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <CardDescription className="text-base">{t.desc}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Methods */}
      <section className="flex flex-col gap-4">
        <SectionTitle>这 6 种方法，孩子更喜欢</SectionTitle>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {methods.map((m, i) => (
            <Card
              key={m.title}
              className="enter hover:border-primary/35 gap-2.5 py-5 transition-colors hover:shadow-md"
              style={{ "--i": i } as React.CSSProperties}
            >
              <CardHeader className="flex-row items-center gap-3 p-0">
                <span
                  aria-hidden
                  className="bg-primary-soft flex size-11 shrink-0 items-center justify-center rounded-2xl text-xl"
                >
                  {m.emoji}
                </span>
                <CardTitle className="text-lg">{m.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <CardDescription className="text-base">{m.desc}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Schedule — a small vertical timeline */}
      <section className="flex flex-col gap-4">
        <SectionTitle>每天 10 分钟，可以这样安排</SectionTitle>
        <Card className="gap-4 py-6">
          <CardContent className="p-0">
            <ol className="flex flex-col">
              {schedule.map((s, i) => (
                <li key={s.task} className="flex gap-4">
                  {/* Marker column: numbered dot plus a connector. */}
                  <div className="flex flex-col items-center">
                    <span className="bg-primary-soft text-primary flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-bold">
                      {i + 1}
                    </span>
                    {i < schedule.length - 1 && (
                      <span
                        aria-hidden
                        className="bg-border my-1 w-px flex-1"
                      />
                    )}
                  </div>
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5 pb-5">
                    <span className="text-primary inline-flex items-center gap-1 text-sm font-semibold">
                      <Clock aria-hidden className="size-3.5" />
                      {s.time}
                    </span>
                    <span className="text-base">{s.task}</span>
                  </div>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </section>

      {/* FAQ */}
      <section className="flex flex-col gap-4">
        <SectionTitle>常见问题与注意事项</SectionTitle>
        <Card className="gap-0 py-2">
          <CardContent className="px-6">
            <Accordion type="single" collapsible>
              {faqs.map((f, i) => (
                <AccordionItem key={f.q} value={`item-${i}`}>
                  <AccordionTrigger>{f.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground measure text-base leading-relaxed">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </section>

      <p className="text-muted-foreground border-border border-t pt-6 text-center text-sm">
        内容参考：
        <a
          href="http://www.moe.gov.cn/srcsite/A06/s3327/201807/t20180713_342997.html"
          target="_blank"
          rel="noreferrer"
          className="text-primary ml-1 inline-flex items-center gap-1 underline-offset-4 hover:underline"
        >
          《教育部办公厅关于开展幼儿园“小学化”专项治理工作的通知》
          <ExternalLink aria-hidden className="size-3" />
        </a>
      </p>
    </div>
  )
}
