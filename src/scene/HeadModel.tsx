import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { useGLTF } from "@react-three/drei"
import type { Group } from "three"

const MODEL_PATH = "/models/head.glb"

export function HeadModel() {
  const groupRef = useRef<Group>(null)
  const { scene } = useGLTF(MODEL_PATH)

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15
    }
  })

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  )
}

useGLTF.preload(MODEL_PATH)
