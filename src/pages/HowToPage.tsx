import { MousePointer2Icon, RotateCcwIcon, ZoomInIcon } from "lucide-react"
import { Footer } from "@/components/site/footer"
import { IconBadge } from "@/components/site/icon-badge"

const steps = [
  {
    icon: MousePointer2Icon,
    title: "Click and drag on the model to rotate it.",
    description: "Works with touch too — no excuses.",
    color: "accent-2",
    tilt: "-rotate-6",
  },
  {
    icon: ZoomInIcon,
    title: "Scroll to zoom in and out.",
    description: "Distance is clamped so you can't lose the model.",
    color: "accent-3",
    tilt: "rotate-3",
  },
  {
    icon: RotateCcwIcon,
    title: "Use the reset view link to snap back to the default angle.",
    description: "Panning is off to keep the model centered.",
    color: "accent-4",
    tilt: "-rotate-3",
  },
] as const

export function HowToPage() {
  return (
    <div className="flex min-h-full flex-col">
      <div className="mx-auto w-full max-w-2xl flex-1 px-6 pt-28 pb-16">
        <h1 className="font-heading mt-3 text-3xl font-semibold text-foreground">
          Using the viewer
        </h1>
        <ol className="mt-6 space-y-5">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="group animate-fade-up flex items-center gap-4"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <IconBadge icon={step.icon} color={step.color} tilt={step.tilt} />
              <div>
                <p className="text-foreground">{step.title}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
      <Footer />
    </div>
  )
}
