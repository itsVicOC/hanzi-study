import { Link } from "react-router-dom"

export function Footer() {
  return (
    <footer className="hidden border-t bg-card md:block">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-6 py-8 text-center text-sm text-muted-foreground">
        <p className="font-display text-base text-foreground">汉字小课堂</p>
        <p>面向幼儿园中班（4–5 岁）孩子的亲子汉字启蒙 · 每天 10 分钟，快乐识字不超前</p>
        <p className="text-xs">
          学习进度保存在本设备浏览器中 ·{" "}
          <Link to="/guide" className="text-primary underline-offset-4 hover:underline">
            查看家长指南
          </Link>
        </p>
      </div>
    </footer>
  )
}
