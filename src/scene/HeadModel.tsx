import { useEffect, useMemo, useState } from "react"
import { useThree } from "@react-three/fiber"
import { useGLTF } from "@react-three/drei"
import { Box3, Box3Helper, Color, MathUtils, type Mesh, type PerspectiveCamera, Vector3 } from "three"
import { useMediaQuery } from "@/hooks/use-media-query"

const JAW_WIDE_MORPH_TARGET = "JawWide"

const MODEL_PATH = "/models/first_head.glb"
// Fraction of the camera's vertical view height that the model's largest
// bounding-box dimension should fill. This is resolution/scale-independent —
// unlike a fixed world-unit target size, it's derived from the camera's own
// fov/distance, so any model auto-sizes correctly without hand-tuning.
const FILL_FRACTION = 0.6
const MOBILE_FILL_FRACTION = 0.45
const INITIAL_ROTATION_Y = MathUtils.degToRad(35)
// Shifts the centered model vertically, as a fraction of the camera's view
// height (same resolution-independent unit as FILL_FRACTION). Positive moves
// the model up, negative moves it down. Useful for nudging the model out
// from behind overlaid UI (e.g. the navbar) without hardcoding pixel/world
// values that would need retuning per camera setting.
const VERTICAL_OFFSET_FRACTION = -0.02
const MOBILE_VERTICAL_OFFSET_FRACTION = -0.02

export function HeadModel({
  showBoundingBox = false,
  jawWide = 0.5,
}: {
  showBoundingBox?: boolean
  jawWide?: number
}) {
  const { scene } = useGLTF(MODEL_PATH)
  const { camera } = useThree()
  const isMobile = useMediaQuery("(max-width: 640px)")

  // Captured once, via useState's lazy initializer, before OrbitControls can
  // touch the camera. `camera.position.z` (and even `camera.position.length()`
  // once orbited) is NOT a stable proxy for "distance to target" after the
  // user has rotated/dollied: rotating past 90°/180° can drive `.z` through
  // zero and negative, which flipped/mirrored the whole model when this value
  // was read live and the sizing memo below happened to recompute (e.g. on an
  // isMobile breakpoint crossing while resizing). Freezing it here means
  // later reads of the live (possibly-orbited) camera can't corrupt sizing.
  const [initialCamera] = useState(() => {
    const perspectiveCamera = camera as PerspectiveCamera
    return {
      fov: perspectiveCamera.fov,
      distance: perspectiveCamera.position.length(),
    }
  })

  // Find the mesh carrying the "JawWide" shape key (blend shape) baked into
  // the GLB by Blender. Only found once per model load, since scene/its
  // descendants don't change identity between renders.
  const jawWideMesh = useMemo(() => {
    let found: Mesh | undefined
    scene.traverse((child) => {
      const mesh = child as Mesh
      if (mesh.morphTargetDictionary?.[JAW_WIDE_MORPH_TARGET] !== undefined) {
        found = mesh
      }
    })
    return found
  }, [scene])

  useEffect(() => {
    if (!jawWideMesh?.morphTargetDictionary || !jawWideMesh.morphTargetInfluences) return
    const index = jawWideMesh.morphTargetDictionary[JAW_WIDE_MORPH_TARGET]
    jawWideMesh.morphTargetInfluences[index] = jawWide
  }, [jawWideMesh, jawWide])

  // Measured once from the model's raw geometry. Box3().setFromObject reads
  // the object's live matrixWorld, which the render loop keeps updated with
  // whatever scale is currently applied — recomputing this on every resize
  // would re-measure an already-scaled model and compound the scale. We force
  // an update here since the model's matrixWorld may not have been computed
  // yet the first time this runs (before the object has been rendered).
  //
  // We use the `precise` flag: the "base.001" mesh in this GLB ships 10 morph
  // targets (blend shapes), and glTF morph deltas are always relative offsets
  // (GLTFLoader sets `morphTargetsRelative = true`). Three's default (fast)
  // Box3().setFromObject() computes geometry.boundingBox, which unions in
  // every morph target's own delta range on top of the base position — i.e.
  // it measures the worst case as if all 10 blend shapes were fully active
  // simultaneously, even though none of them are ever driven by this viewer
  // (morphTargetInfluences all stay 0). That alone inflates the mesh's Y
  // range by roughly +0.29 beyond the rest pose. `precise: true` instead
  // walks actual vertex positions via getVertexPosition(), which applies the
  // *current* (zero) influences, giving the true rest-pose bounds.
  const { maxDimension, center, box } = useMemo(() => {
    scene.updateMatrixWorld(true)
    const box = new Box3().setFromObject(scene, true)
    const size = box.getSize(new Vector3())

    return {
      maxDimension: Math.max(size.x, size.y, size.z) || 1,
      center: box.getCenter(new Vector3()),
      box,
    }
  }, [scene])

  // Box3Helper draws directly from this Box3's min/max in the same local
  // space it was measured in. We deliberately don't use drei's BoxHelper
  // here: BoxHelper tracks an object's live *world* matrix and always draws
  // an axis-aligned box, so it can't stay aligned to the head's rotation.
  // Rendering this as a child of the same rotated/scaled groups as the
  // model (below) keeps it oriented with whichever way the head is facing.
  const boxHelper = useMemo(() => new Box3Helper(box, new Color("gray")), [box])

  // The target size comes from the camera's initial fov/distance (frozen
  // above) rather than a fixed world-unit constant, so it stays correct if
  // those ever change, while remaining immune to later camera movement from
  // OrbitControls. This is safe to recompute on isMobile changes since it
  // only derives scale/position from the already-measured raw size above and
  // the frozen initial camera values, rather than re-measuring the (by then
  // scaled/orbited) live scene graph.
  const { scale, position } = useMemo(() => {
    const { fov, distance } = initialCamera
    const viewHeight = 2 * distance * Math.tan(MathUtils.degToRad(fov) / 2)
    const targetSize = viewHeight * (isMobile ? MOBILE_FILL_FRACTION : FILL_FRACTION)
    const normalizedScale = targetSize / maxDimension
    const verticalOffset =
      viewHeight * (isMobile ? MOBILE_VERTICAL_OFFSET_FRACTION : VERTICAL_OFFSET_FRACTION)

    const modelPosition = center.clone().multiplyScalar(-normalizedScale)
    modelPosition.y += verticalOffset

    return {
      scale: normalizedScale,
      position: modelPosition,
    }
  }, [maxDimension, center, isMobile, initialCamera])

  return (
    <group rotation={[0, INITIAL_ROTATION_Y, 0]}>
      <group position={position} scale={scale}>
        <primitive object={scene} />
        {showBoundingBox && <primitive object={boxHelper} />}
      </group>
    </group>
  )
}

useGLTF.preload(MODEL_PATH)
