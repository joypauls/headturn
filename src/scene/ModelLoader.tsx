import { useEffect, useState } from "react"
import { useProgress } from "@react-three/drei"
import { Spinner } from "@/components/ui/spinner"
import { cn } from "@/lib/utils"

export function ModelLoader() {
  const { progress } = useProgress()
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (progress < 100) return
    const timeout = setTimeout(() => setDone(true), 300)
    return () => clearTimeout(timeout)
  }, [progress])

  if (done) return null

  return (
    <div
      className={cn(
        "absolute inset-0 z-40 flex flex-col items-center justify-center gap-4 bg-background/90 backdrop-blur-sm transition-opacity duration-500",
        progress >= 100 ? "opacity-0" : "opacity-100"
      )}
    >
      <Spinner className="size-6 text-muted-foreground" />
      <div className="flex flex-col items-center gap-2">
        <p className="text-sm text-muted-foreground">Loading model</p>
        <div className="h-px w-32 overflow-hidden bg-border">
          <div
            className="h-full bg-foreground transition-[width] duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  )
}
