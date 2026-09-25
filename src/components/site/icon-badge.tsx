import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

const COLOR_CLASSES = {
  "accent-2": "bg-accent-2/15 text-accent-2",
  "accent-3": "bg-accent-3/15 text-accent-3",
  "accent-4": "bg-accent-4/15 text-accent-4",
} as const

export function IconBadge({
  icon: Icon,
  color,
  tilt,
  className,
}: {
  icon: LucideIcon
  color: keyof typeof COLOR_CLASSES
  tilt?: string
  className?: string
}) {
  return (
    <div
      className={cn(
        "ease-bounce flex size-9 shrink-0 items-center justify-center rounded-[46%_54%_61%_39%/56%_44%_41%_59%] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-0",
        COLOR_CLASSES[color],
        tilt,
        className
      )}
    >
      <Icon className="size-4" />
    </div>
  )
}
