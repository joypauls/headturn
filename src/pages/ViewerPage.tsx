import { useRef, useState } from "react"
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib"
import { cn } from "@/lib/utils"
import { ModelLoader } from "@/scene/ModelLoader"
import { Scene } from "@/scene/Scene"
import { ViewerControls } from "@/scene/ViewerControls"

export function ViewerPage() {
  const controlsRef = useRef<OrbitControlsImpl>(null)
  const [hasInteracted, setHasInteracted] = useState(false)

  return (
    <div className="relative h-full w-full cursor-grab overflow-hidden bg-background active:cursor-grabbing">
      <Scene controlsRef={controlsRef} onInteract={() => setHasInteracted(true)} />
      <ModelLoader />
      <p
        className={cn(
          "pointer-events-none absolute bottom-4 left-4 text-sm text-muted-foreground transition-opacity duration-500 sm:bottom-6 sm:left-6",
          hasInteracted ? "opacity-0" : "opacity-100"
        )}
      >
        Give it a spin!
      </p>
      <ViewerControls onReset={() => controlsRef.current?.reset()} />
    </div>
  )
}
