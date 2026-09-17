import { NavLink } from "react-router-dom"

import { navItems } from "@/lib/nav"
import { cn } from "@/lib/utils"

/**
 * Bottom tab bar for touch devices. Mirrors the desktop nav exactly — the
 * parent-facing 家长指南 tab used to be missing here, which made the guide
 * unreachable on phones.
 */
export function MobileNav() {
  return (
    <nav
      aria-label="底部导航"
      className="border-border bg-background/95 fixed inset-x-0 bottom-0 z-40 border-t shadow-[0_-2px_16px_-8px_rgb(120_72_20_/_0.35)] backdrop-blur-md md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="grid grid-cols-5">
        {navItems.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                cn(
                  "relative flex min-h-14 flex-col items-center justify-center gap-0.5 px-1 pt-1.5 pb-1 text-[11px] font-medium",                  "outline-none focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring",
                  isActive ? "text-primary" : "text-muted-foreground"
                )
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    aria-hidden
                    className={cn(
                      "bg-primary-vivid absolute top-0 h-0.5 w-8 rounded-full transition-opacity",
                      isActive ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <item.icon
                    className={cn("size-5 transition-transform", isActive && "scale-110")}
                  />
                  <span className="max-w-full truncate">{item.label}</span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
