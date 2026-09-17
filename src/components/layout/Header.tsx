import { useEffect, useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { BrandMark } from "@/components/layout/BrandMark"
import { navItems } from "@/lib/nav"
import { cn } from "@/lib/utils"

function Brand() {
  return (
    <Link
      to="/"
      aria-label="汉字小课堂 · 返回首页"
      className="group -m-1 flex items-center gap-2.5 rounded-xl p-1 outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
    >
      <BrandMark />
      <span className="flex flex-col leading-none">
        <span className="font-display text-lg font-semibold tracking-wide">
          汉字小课堂
        </span>
        <span className="text-muted-foreground mt-0.5 text-[11px] tracking-wide">
          中班识字启蒙
        </span>
      </span>
    </Link>
  )
}

export function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      data-scrolled={scrolled}
      className={cn(
        "sticky top-0 z-40 border-b transition-[background-color,box-shadow,border-color] duration-300",
        scrolled
          ? "border-border bg-background/90 shadow-sm backdrop-blur-md"
          : "border-transparent bg-background/70 backdrop-blur-sm",
      )}
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 md:px-6">
        <Brand />

        {/* Desktop nav */}
        <nav aria-label="主导航" className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                cn(
                  "press relative flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium",
                  "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                  isActive
                    ? "bg-primary-soft text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon className="size-4" />
                  {item.label}
                  {/* Active marker doubles as a non-colour cue. */}
                  <span
                    aria-hidden
                    className={cn(
                      "bg-primary-vivid absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full transition-opacity",
                      isActive ? "opacity-100" : "opacity-0",
                    )}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Mobile menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="打开菜单"
                className="text-foreground"
              >
                <Menu className="size-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[17rem] gap-3">
              <SheetHeader>
                <SheetTitle className="font-display">汉字小课堂</SheetTitle>
                <SheetDescription>选择要去的地方</SheetDescription>
              </SheetHeader>
              <nav aria-label="移动端导航" className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <SheetClose asChild key={item.to}>
                    <NavLink
                      to={item.to}
                      end={item.to === "/"}
                      className={({ isActive }) =>
                        cn(
                          "press flex items-center gap-3 rounded-xl px-3 py-3 text-base font-medium",
                          "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                          isActive
                            ? "bg-primary-soft text-primary"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground",
                        )
                      }
                    >
                      <item.icon className="size-5" />
                      {item.label}
                    </NavLink>
                  </SheetClose>
                ))}
              </nav>
              <p className="text-muted-foreground mt-auto text-xs leading-relaxed">
                每天 10 分钟，和孩子一起认几个字。不超前、不小学化。
              </p>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
