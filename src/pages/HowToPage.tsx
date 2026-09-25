import { Eyebrow } from "@/components/site/eyebrow"
import { Footer } from "@/components/site/footer"

const steps = [
  {
    title: "Click and drag on the model to rotate it.",
    description: "Works with touch as well as mouse.",
  },
  {
    title: "Scroll to zoom in and out.",
    description: "Distance is clamped so you can't lose the model.",
  },
  {
    title: "Use the reset view link to snap back to the default angle.",
    description: "Panning is off to keep the model centered.",
  },
]

export function HowToPage() {
  return (
    <div>
      <div className="mx-auto max-w-2xl px-6 py-16">
        <Eyebrow>How To</Eyebrow>
        <h1 className="font-heading mt-3 text-2xl font-semibold text-foreground">
          Using the viewer
        </h1>
        <ol className="mt-6 space-y-5">
          {steps.map((step, index) => (
            <li key={step.title} className="flex gap-3">
              <span className="text-sm text-muted-foreground">
                {String(index + 1).padStart(2, "0")}
              </span>
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
