import { useEffect, useRef, useState } from "react"
import HanziWriter from "hanzi-writer"
import { Loader2, RotateCcw } from "lucide-react"

import { Button } from "@/components/ui/button"

interface StrokeDemoProps {
  char: string
  strokeCount: number
}

const SIZE = 280

/**
 * hanzi-writer validates colours with its own parser and rejects `currentColor`
 * or `var(...)`, so resolve the theme's ink/radical colours to literal rgb()
 * values from the DOM before handing them over.
 */
function resolveThemeColors() {
  if (typeof window === "undefined") {
    return { stroke: "#3a2c1e", radical: "#f97316" }
  }
  const root = getComputedStyle(document.documentElement)
  const probe = document.createElement("span")
  document.body.appendChild(probe)

  const resolve = (value: string, fallback: string) => {
    probe.style.color = ""
    probe.style.color = value
    const out = getComputedStyle(probe).color
    return out && out.startsWith("rgb") ? out : fallback
  }

  const result = {
    stroke: resolve(root.getPropertyValue("--foreground").trim(), "#3a2c1e"),
    radical: resolve(root.getPropertyValue("--primary-vivid").trim(), "#f97316"),
  }
  probe.remove()
  return result
}

export function StrokeDemo({ char, strokeCount }: StrokeDemoProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const writerRef = useRef<HanziWriter | null>(null)
  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    el.innerHTML = ""
    setReady(false)
    setFailed(false)
    writerRef.current = null

    const colors = resolveThemeColors()

    let writer: HanziWriter
    try {
      writer = HanziWriter.create(el, char, {
        width: SIZE,
        height: SIZE,
        padding: 10,
        showCharacter: false,
        showOutline: false,
        strokeColor: colors.stroke,
        radicalColor: colors.radical,
        highlightColor: colors.radical,
        strokeAnimationSpeed: 1.2,
        delayBetweenStrokes: 300,
        onLoadCharDataSuccess: () => {
          setReady(true)
          setFailed(false)
          window.setTimeout(() => writerRef.current?.animateCharacter(), 250)
        },
        onLoadCharDataError: () => {
          setReady(false)
          setFailed(true)
        },
      })
      writerRef.current = writer
    } catch {
      setReady(false)
      setFailed(true)
    }

    return () => {
      el.innerHTML = ""
      writerRef.current = null
    }
  }, [char])

  const replay = () => {
    writerRef.current?.animateCharacter()
  }

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Practice-sheet frame: the 田字格 gives the strokes a scale reference. */}
      <div className="bg-tianzige text-foreground relative flex size-[280px] max-w-full items-center justify-center overflow-hidden rounded-3xl border border-border bg-card shadow-xs">
        <div ref={containerRef} className="flex items-center justify-center" />

        {!ready && !failed && (
          <div className="bg-card/80 absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted-foreground backdrop-blur-[1px]">
            <Loader2 className="size-5 animate-spin" />
            <span className="text-xs">笔顺加载中…</span>
          </div>
        )}

        {failed && (
          <div className="font-serif-cn text-muted-foreground/35 absolute inset-0 flex items-center justify-center text-8xl font-black select-none">
            {char}
          </div>
        )}
      </div>

      <p className="text-muted-foreground text-center text-sm">
        这个字一共{" "}
        <span className="text-primary text-base font-bold">{strokeCount}</span> 笔
      </p>

      {failed && (
        <div className="text-muted-foreground max-w-xs text-center text-sm">
          <p className="text-foreground mb-1 font-medium">笔画演示暂时加载不了</p>
          <p>家长可以带着小朋友照着上面的字，用手指在纸上慢慢描一描。</p>
        </div>
      )}

      {ready && (
        <Button type="button" variant="outline" size="lg" onClick={replay}>
          <RotateCcw className="size-4" />
          重新演示笔顺
        </Button>
      )}
    </div>
  )
}
