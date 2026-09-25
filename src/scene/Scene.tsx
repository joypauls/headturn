import { Suspense, type RefObject } from "react"
import { Canvas } from "@react-three/fiber"
import { ContactShadows, Environment, OrbitControls } from "@react-three/drei"
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib"
import { HeadModel } from "./HeadModel"

export function Scene({
  controlsRef,
}: {
  controlsRef?: RefObject<OrbitControlsImpl | null>
}) {
  return (
    <Canvas
      className="!touch-none"
      gl={{ alpha: true }}
      camera={{ position: [0, 0, 3], fov: 45 }}
    >
      <ambientLight intensity={0.6} color="#f5f0e8" />
      <directionalLight position={[3, 5, 4]} intensity={1.2} color="#f5f0e8" />
      <Suspense fallback={null}>
        <HeadModel />
        <ContactShadows
          position={[0, -0.68, 0]}
          opacity={0.45}
          scale={4}
          blur={2.6}
          far={1.2}
        />
        <Environment preset="studio" />
      </Suspense>
      <OrbitControls
        ref={controlsRef}
        enablePan={false}
        minDistance={1}
        maxDistance={5}
        makeDefault
      />
    </Canvas>
  )
}
