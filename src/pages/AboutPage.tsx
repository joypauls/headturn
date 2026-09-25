import { Eyebrow } from "@/components/site/eyebrow"
import { Footer } from "@/components/site/footer"

const capabilities = [
  {
    title: "Lighting presets",
    description:
      "Studio, sunset and noir environments, switchable from the dock beneath the viewer.",
  },
  {
    title: "Manual or auto rotation",
    description:
      "Drag the model directly, or let it turn on its own at an adjustable speed.",
  },
  {
    title: "Drop-in glTF support",
    description:
      "Replace public/models/head.glb with any .glb file and it will be framed and lit automatically.",
  },
]

export function AboutPage() {
  return (
    <div>
      <div className="mx-auto max-w-2xl px-6 py-16">
        <Eyebrow>About</Eyebrow>
        <h1 className="font-heading mt-3 text-2xl font-semibold text-foreground">
          headturn
        </h1>
        <p className="mt-4 text-muted-foreground">
          headturn is a lightweight 3D model viewer built with React Three
          Fiber. Drop a .glb file into <code>public/models/head.glb</code> and
          view it from every angle.
        </p>

        <div className="mt-10 space-y-6 border-t border-border pt-8">
          {capabilities.map((item) => (
            <div key={item.title}>
              <h2 className="font-medium text-foreground">{item.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}
