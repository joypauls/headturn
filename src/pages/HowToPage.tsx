export function HowToPage() {
  const steps = [
    "Click and drag on the model to rotate it.",
    "Scroll to zoom in and out.",
    "Right-click drag is disabled — panning is off to keep the model centered.",
  ]

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="font-heading text-2xl font-semibold">How To</h1>
      <ol className="mt-4 list-decimal space-y-2 pl-5 text-muted-foreground">
        {steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
    </div>
  )
}
