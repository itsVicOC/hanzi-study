import { useEffect } from "react"
import { Navigate, Route, Routes, useLocation } from "react-router-dom"

import { AppShell } from "@/components/layout/AppShell"
import { Toaster } from "@/components/ui/sonner"
import { ProgressProvider } from "@/hooks/useProgress"
import { CharacterDetail } from "@/pages/CharacterDetail"
import { Games } from "@/pages/Games"
import { Guide } from "@/pages/Guide"
import { Home } from "@/pages/Home"
import { Library } from "@/pages/Library"
import { ProgressPage } from "@/pages/Progress"

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <ProgressProvider>
      <ScrollToTop />
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<Home />} />
          <Route path="/library" element={<Library />} />
          <Route path="/char/:char" element={<CharacterDetail />} />
          <Route path="/games" element={<Games />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/guide" element={<Guide />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
      <Toaster />
    </ProgressProvider>
  )
}
