import { useSyncExternalStore } from "react"
import { Toaster as Sonner } from "sonner"

/**
 * Keep toasts in step with the OS colour scheme. `useSyncExternalStore` reads
 * the media query without an effect, so the first paint is already correct.
 */
const darkQuery =
  typeof window !== "undefined"
    ? window.matchMedia("(prefers-color-scheme: dark)")
    : undefined

function subscribe(onChange: () => void) {
  darkQuery?.addEventListener("change", onChange)
  return () => darkQuery?.removeEventListener("change", onChange)
}

function usePrefersDark() {
  return useSyncExternalStore(
    subscribe,
    () => darkQuery?.matches ?? false,
    () => false,
  )
}

const palettes = {
  light: {
    "--normal-bg": "#ffffff",
    "--normal-text": "#3a2c1e",
    "--normal-border": "#efe2cf",
    "--success-bg": "#ecfdf5",
    "--success-text": "#065f46",
    "--success-border": "#a7f3d0",
    "--error-bg": "#fff1f2",
    "--error-text": "#9f1239",
    "--error-border": "#fecdd3",
  },
  dark: {
    "--normal-bg": "#241d18",
    "--normal-text": "#f5ece1",
    "--normal-border": "#3a302a",
    "--success-bg": "#123227",
    "--success-text": "#6ee7b7",
    "--success-border": "#14532d",
    "--error-bg": "#3b1a20",
    "--error-text": "#fda4af",
    "--error-border": "#7f1d3a",
  },
} as const

function Toaster() {
  const dark = usePrefersDark()

  return (
    <Sonner
      theme={dark ? "dark" : "light"}
      position="top-center"
      richColors
      closeButton
      offset={80}
      mobileOffset={16}
      toastOptions={{
        classNames: {
          toast: "rounded-2xl! shadow-lg! font-sans!",
          description: "text-muted-foreground!",
          actionButton: "rounded-lg!",
          closeButton: "rounded-lg!",
        },
      }}
      style={
        {
          ...(dark ? palettes.dark : palettes.light),
          "--border-radius": "var(--radius-card)",
          fontFamily: "var(--font-sans)",
        } as unknown as React.CSSProperties
      }
    />
  )
}

export { Toaster }
