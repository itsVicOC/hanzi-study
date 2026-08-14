import { useEffect, useRef, useState } from "react"
import HanziWriter from "hanzi-writer"
import { RotateCcw } from "lucide-react"

import { Button } from "@/components/ui/button"

interface StrokeDemoProps {
  char: string
  strokeCount: number
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

    let writer: HanziWriter
    try {
      writer = HanziWriter.create(el, char, {
        width: 280,
        height: 280,
        padding: 12,
        showCharacter: false,
        showOutline: false,
        strokeColor: "#3a2c1e",
        radicalColor: "#f97316",
        highlightColor: "#f97316",
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
      <div ref={containerRef} className="flex items-center justify-center" />

      {failed && (
        <div className="max-w-xs text-center text-sm text-muted-foreground">
          <p className="mb-1 font-medium text-foreground">笔画演示暂时加载不了</p>
          <p>
            这个字一共有{" "}
            <span className="text-base font-bold text-primary">{strokeCount}</span>{" "}
            笔，家长可以带着小朋友照着下面的大字，用手指在纸上慢慢描一描。
          </p>
        </div>
      )}

      {ready && (
        <Button type="button" variant="outline" size="sm" onClick={replay}>
          <RotateCcw className="size-4" />
          重新演示笔顺
        </Button>
      )}
    </div>
  )
}
