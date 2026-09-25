import { useMemo } from "react"
import { useGLTF } from "@react-three/drei"
import { Box3, MathUtils, Vector3 } from "three"

const MODEL_PATH = "/models/head.glb"
const TARGET_SIZE = 1.3
const INITIAL_ROTATION_Y = MathUtils.degToRad(35)
const VERTICAL_OFFSET = 0.15

export function HeadModel() {
  const { scene } = useGLTF(MODEL_PATH)

  const { scale, position } = useMemo(() => {
    const box = new Box3().setFromObject(scene)
    const size = box.getSize(new Vector3())
    const center = box.getCenter(new Vector3())
    const maxDimension = Math.max(size.x, size.y, size.z) || 1
    const normalizedScale = TARGET_SIZE / maxDimension

    return {
      scale: normalizedScale,
      position: center.multiplyScalar(-normalizedScale),
    }
  }, [scene])

  return (
    <group position={[0, VERTICAL_OFFSET, 0]} rotation={[0, INITIAL_ROTATION_Y, 0]}>
      <group position={position} scale={scale}>
        <primitive object={scene} />
      </group>
    </group>
  )
}

useGLTF.preload(MODEL_PATH)
