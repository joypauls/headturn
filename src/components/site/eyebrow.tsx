import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

export function Eyebrow({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <div
      className={cn(
        "font-heading flex items-center gap-2 text-base text-accent-2 italic",
        className
      )}
    >
      <span className="animate-bounce-soft size-1.5 rounded-full bg-accent-2" />
      {children}
    </div>
  )
}
