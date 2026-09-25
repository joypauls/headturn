import { RotateCcwIcon, SparkleIcon, UploadIcon } from "lucide-react"
import { Eyebrow } from "@/components/site/eyebrow"
import { Footer } from "@/components/site/footer"
import { IconBadge } from "@/components/site/icon-badge"

const capabilities = [
  {
    icon: SparkleIcon,
    title: "Studio lighting",
    description: "A single, considered lighting setup for every model.",
    color: "accent-2",
    tilt: "-rotate-6",
  },
  {
    icon: RotateCcwIcon,
    title: "Manual rotation",
    description: "Drag the model directly, or scroll to zoom in and out.",
    color: "accent-3",
    tilt: "rotate-3",
  },
  {
    icon: UploadIcon,
    title: "Drop-in glTF support",
    description:
      "Replace public/models/head.glb with any .glb file and it'll be framed and lit automatically.",
    color: "accent-4",
    tilt: "-rotate-3",
  },
] as const

export function AboutPage() {
  return (
    <div className="flex min-h-full flex-col">
      <div className="mx-auto w-full max-w-2xl flex-1 px-6 py-16">
        <Eyebrow>About</Eyebrow>
        <h1 className="font-heading mt-3 text-3xl font-semibold text-foreground">
          head<span className="text-accent-2 italic">turn</span>
        </h1>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          headturn is a small, slightly obsessive 3D model viewer built with
          React Three Fiber. Drop a .glb file into{" "}
          <code>public/models/head.glb</code> and turn it every which way.
        </p>

        <div className="mt-10 space-y-6 border-t border-border pt-8">
          {capabilities.map((item, index) => (
            <div
              key={item.title}
              className="group animate-fade-up flex items-center gap-4"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <IconBadge icon={item.icon} color={item.color} tilt={item.tilt} />
              <div>
                <h2 className="font-medium text-foreground">{item.title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}
