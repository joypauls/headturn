import { useState } from "react"
import { BoxIcon, RotateCcwIcon, SettingsIcon } from "lucide-react"
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
  const [open, setOpen] = useState(false)

  return (
    <div
      className={cn(
        "animate-fade-up fixed top-1/2 z-20 flex -translate-y-1/2 items-stretch transition-[right] duration-300 ease-in-out",
        open ? "right-0" : "-right-64"
      )}
    >
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label="Settings"
        className={cn(
          "flex w-10 shrink-0 items-center justify-center self-start rounded-l-lg border-2 border-r-0 border-accent-2 bg-nav py-3 text-muted-foreground shadow-sm transition-colors hover:text-accent-2",
          open && "text-accent-2"
        )}
      >
        <SettingsIcon className="size-4" />
      </button>
      <div className="w-64 rounded-l-none border-2 border-accent-2 bg-nav p-4 shadow-sm">
        <p className="font-heading text-base font-medium text-foreground">Settings</p>
        <p className="mt-0.5 text-sm text-muted-foreground">Adjust the model and viewer.</p>
        <div className="mt-6 flex flex-col gap-6">
          <label className="flex flex-col gap-2 text-sm text-muted-foreground">
            Jaw wide
            <Slider
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
              "flex items-center justify-between rounded-md py-1 text-sm transition-colors hover:text-accent-2",
              showBoundingBox ? "text-accent-2" : "text-muted-foreground"
            )}
          >
            Bounding box
            <BoxIcon className="size-4" />
          </button>
          <button
            type="button"
            onClick={onReset}
            className="group flex items-center justify-between rounded-md py-1 text-sm text-muted-foreground transition-colors hover:text-accent-2"
          >
            Reset view
            <RotateCcwIcon className="ease-bounce size-4 transition-transform duration-500 group-hover:-rotate-180" />
          </button>
        </div>
      </div>
    </div>
  )
}
