import { NavLink } from "react-router"
import { MoonIcon, SunIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTheme } from "@/hooks/use-theme"

const links = [
  { to: "/", label: "Viewer" },
  { to: "/how-to", label: "How To" },
  { to: "/about", label: "About" },
]

export function Navbar() {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="flex h-14 shrink-0 items-center border-b border-border px-6">
      <span className="font-heading text-sm font-semibold tracking-tight">
        headturn
      </span>
      <nav className="ml-8 flex items-center gap-4">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              cn(
                "text-sm text-muted-foreground transition-colors hover:text-foreground",
                isActive && "text-foreground font-medium"
              )
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
      <button
        type="button"
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className="ml-auto flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        {theme === "dark" ? (
          <SunIcon className="size-4" />
        ) : (
          <MoonIcon className="size-4" />
        )}
      </button>
    </header>
  )
}
