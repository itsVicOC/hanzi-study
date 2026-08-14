import { Toaster as Sonner } from "sonner"

function Toaster() {
  return (
    <Sonner
      theme="light"
      position="top-center"
      richColors
      closeButton
      className="toaster group"
      style={
        {
          "--normal-bg": "#ffffff",
          "--normal-text": "#3a2c1e",
          "--normal-border": "#efe2cf",
        } as React.CSSProperties
      }
    />
  )
}

export { Toaster }
