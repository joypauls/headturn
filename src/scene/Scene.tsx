import { Suspense, type RefObject } from "react"
import { Canvas } from "@react-three/fiber"
import { Environment, OrbitControls } from "@react-three/drei"
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib"
import { HeadModel } from "./HeadModel"

export function Scene({
  controlsRef,
  onInteract,
  showBoundingBox,
  jawWide,
}: {
  controlsRef?: RefObject<OrbitControlsImpl | null>
  onInteract?: () => void
  showBoundingBox?: boolean
  jawWide?: number
}) {
  return (
    <Canvas
      className="!touch-none"
      gl={{ alpha: true }}
      camera={{ position: [0, 0, 3], fov: 45 }}
    >
      <ambientLight intensity={0.6} color="#f5f0e8" />
      <directionalLight position={[3, 5, 4]} intensity={1.1} color="#f5f0e8" />
      <Suspense fallback={null}>
        <HeadModel showBoundingBox={showBoundingBox} jawWide={jawWide} />
        <Environment preset="studio" environmentIntensity={0.5} />
      </Suspense>
      <OrbitControls
        ref={controlsRef}
        enablePan={false}
        minDistance={1}
        maxDistance={5}
        zoomSpeed={0.5}
        dampingFactor={0.2}
        onStart={onInteract}
        makeDefault
      />
    </Canvas>
  )
}
