const socials = [
  { id: "github-icon", label: "GitHub" },
  { id: "x-icon", label: "X" },
  { id: "bluesky-icon", label: "Bluesky" },
  { id: "discord-icon", label: "Discord" },
]

export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-8">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
        <p className="text-sm text-muted-foreground">headturn</p>
        <div className="flex items-center gap-4">
          {socials.map((s) => (
            <a
              key={s.id}
              href="#"
              aria-label={s.label}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <svg className="size-4" aria-hidden>
                <use href={`/icons.svg#${s.id}`} />
              </svg>
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
