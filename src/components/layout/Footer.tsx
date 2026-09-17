import { Link, NavLink } from "react-router-dom"

import { BrandMark } from "@/components/layout/BrandMark"
import { navItems } from "@/lib/nav"
import { cn } from "@/lib/utils"

export function Footer() {
  return (
    <footer className="border-border bg-card hidden border-t md:block">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <BrandMark className="size-8 rounded-xl text-base" />
              <span className="font-display text-lg">汉字小课堂</span>
            </div>
            <p className="text-muted-foreground measure text-sm">
              面向幼儿园中班（4–5 岁）孩子的亲子汉字启蒙 · 每天 10 分钟，快乐识字不超前
            </p>
          </div>

          <nav aria-label="页脚导航" className="flex flex-col gap-1.5 text-sm">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  cn(
                    "inline-block py-1.5 transition-colors",
                    isActive
                      ? "text-primary font-medium"
                      : "text-muted-foreground hover:text-foreground",
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="border-border text-muted-foreground flex flex-wrap items-center justify-between gap-2 border-t pt-5 text-xs">
          <p>学习进度保存在本设备浏览器中，换设备或清除浏览器数据后会重新开始。</p>
          <Link
            to="/guide"
            className="text-primary inline-block py-2 underline-offset-4 hover:underline"
          >
            查看家长指南
          </Link>
        </div>
      </div>
    </footer>
  )
}
