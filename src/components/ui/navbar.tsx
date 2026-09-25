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
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <div className="pointer-events-auto flex w-full max-w-2xl items-center gap-4 rounded-sm border-2 border-accent-2 bg-nav px-4 py-2 shadow-sm backdrop-blur-md">
        <span className="font-heading text-lg font-semibold">Headturn</span>
        <nav className="ml-2 flex items-center gap-4">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                cn(
                  "py-1 text-sm text-muted-foreground transition-colors hover:text-accent-2",
                  isActive && "text-accent-2 font-medium"
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
          className="ml-auto flex size-7 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          {theme === "dark" ? (
            <SunIcon className="size-4" />
          ) : (
            <MoonIcon className="size-4" />
          )}
        </button>
      </div>
    </header>
  )
}
