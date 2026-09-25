import { useRef } from "react"
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib"
import { ModelLoader } from "@/scene/ModelLoader"
import { Scene } from "@/scene/Scene"
import { ViewerControls } from "@/scene/ViewerControls"

export function ViewerPage() {
  const controlsRef = useRef<OrbitControlsImpl>(null)

  return (
    <div className="relative h-full w-full overflow-hidden bg-background">
      <Scene controlsRef={controlsRef} />
      <ModelLoader />
      <ViewerControls onReset={() => controlsRef.current?.reset()} />
    </div>
  )
}
