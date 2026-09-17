import { Outlet } from "react-router-dom"

import { Footer } from "@/components/layout/Footer"
import { Header } from "@/components/layout/Header"
import { MobileNav } from "@/components/layout/MobileNav"

export function AppShell() {
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="bg-primary text-primary-foreground sr-only rounded-lg px-4 py-2 text-sm font-medium focus:not-sr-only focus:absolute focus:top-3 focus:left-1/2 focus:z-50 focus:-translate-x-1/2"
      >
        跳到主要内容
      </a>

      <Header />

      {/* pb clears the fixed tab bar plus the iOS home indicator. */}
      <main id="main" className="flex-1 pb-[calc(4.5rem+env(safe-area-inset-bottom))] md:pb-0">
        <div className="mx-auto w-full max-w-6xl px-4 py-6 md:px-6 md:py-10">
          <Outlet />
        </div>
      </main>

      <MobileNav />
      <Footer />
    </div>
  )
}
