export function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="font-heading text-2xl font-semibold">About</h1>
      <p className="mt-4 text-muted-foreground">
        headturn is a lightweight 3D model viewer built with React Three
        Fiber. Drop a .glb file into <code>public/models/head.glb</code> and
        view it from every angle.
      </p>
    </div>
  )
}
