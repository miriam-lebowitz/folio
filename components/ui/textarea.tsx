import * as React from "react"
import { cn } from "@/lib/utils"

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-sand bg-cream px-3 py-2 text-sm text-brown-deep",
          "placeholder:text-brown-light/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-warm",
          "focus-visible:border-transparent disabled:cursor-not-allowed disabled:opacity-50 resize-none transition-colors",
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Textarea.displayName = "Textarea"

export { Textarea }
