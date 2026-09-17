import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium",
    "transition-[color,background-color,border-color,box-shadow,transform] duration-150",
    // Tactile press; neutralised by the reduced-motion block in index.css.
    "active:scale-[0.975]",
    "disabled:pointer-events-none disabled:opacity-50",
    "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
    "aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/25",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    "shrink-0",
  ].join(" "),
  {
    variants: {
      variant: {
        // Brand action: warm and confident, AA against white text.
        default:
          "bg-primary text-primary-foreground shadow-sm hover:bg-primary-hover hover:shadow-md",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 hover:shadow-md",
        outline:
          "border border-border-strong bg-card shadow-xs hover:border-primary/45 hover:bg-primary-soft",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/75",
        ghost: "text-muted-foreground hover:bg-primary-soft hover:text-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        // Sunny emphasis, used sparingly for celebrations.
        accent:
          "bg-accent text-accent-foreground shadow-xs hover:bg-accent/85 hover:shadow-sm",
      },
      size: {
        sm: "h-10 rounded-lg gap-1.5 px-3 text-sm has-[>svg]:px-2.5",
        default: "h-11 rounded-lg px-4 text-sm has-[>svg]:px-3.5",
        lg: "h-12 rounded-xl px-6 text-base has-[>svg]:px-5",
        xl: "h-14 rounded-xl px-8 text-lg has-[>svg]:px-7",
        icon: "size-11 rounded-lg",
        "icon-sm": "size-9 rounded-lg",
        "icon-lg": "size-12 rounded-xl [&_svg:not([class*='size-'])]:size-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ComponentPropsWithoutRef<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

/**
 * `forwardRef` is required: Radix triggers (`SheetTrigger`, `DialogTrigger`, …)
 * attach a ref to whatever `asChild` renders.
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        ref={ref}
        data-slot="button"
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
