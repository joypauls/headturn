import { RotateCcwIcon } from "lucide-react"

export function ViewerControls({ onReset }: { onReset: () => void }) {
  return (
    <div className="animate-fade-up absolute right-4 bottom-4 z-10 sm:right-6 sm:bottom-6">
      <button
        type="button"
        onClick={onReset}
        className="flex items-center gap-2 rounded-md px-2 py-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        Reset view
        <RotateCcwIcon className="size-3" />
      </button>
    </div>
  )
}
