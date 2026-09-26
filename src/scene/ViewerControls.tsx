import { BoxIcon, RotateCcwIcon } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"

export function ViewerControls({
  onReset,
  showBoundingBox,
  onToggleBoundingBox,
  jawWide,
  onJawWideChange,
}: {
  onReset: () => void
  showBoundingBox: boolean
  onToggleBoundingBox: () => void
  jawWide: number
  onJawWideChange: (value: number) => void
}) {
  return (
    <div className="animate-fade-up absolute right-4 bottom-4 z-10 flex items-center gap-4 sm:right-6 sm:bottom-6">
      <label className="flex items-center gap-2 text-sm text-muted-foreground">
        Jaw wide
        <Slider
          className="w-20 sm:w-28"
          value={jawWide}
          onValueChange={(value) => onJawWideChange(value as number)}
          min={0}
          max={1}
          step={0.01}
        />
      </label>
      <button
        type="button"
        onClick={onToggleBoundingBox}
        aria-pressed={showBoundingBox}
        className={cn(
          "flex items-center gap-2 rounded-md px-2 py-1 text-sm transition-colors hover:text-accent-2",
          showBoundingBox ? "text-accent-2" : "text-muted-foreground"
        )}
      >
        Bounding box
        <BoxIcon className="size-3" />
      </button>
      <button
        type="button"
        onClick={onReset}
        className="group flex items-center gap-2 rounded-md px-2 py-1 text-sm text-muted-foreground transition-colors hover:text-accent-2"
      >
        Reset view
        <RotateCcwIcon className="ease-bounce size-3 transition-transform duration-500 group-hover:-rotate-180" />
      </button>
    </div>
  )
}
