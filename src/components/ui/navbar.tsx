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
      <span className="font-heading text-lg font-semibold">
        Headturn
      </span>
      <nav className="ml-8 flex items-center gap-4">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              cn(
                "group relative py-1 text-sm text-muted-foreground transition-colors hover:text-foreground",
                isActive && "text-accent-2 font-medium"
              )
            }
          >
            {({ isActive }) => (
              <>
                {link.label}
                <span
                  className={cn(
                    "ease-bounce absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-accent-2 transition-transform duration-300 group-hover:scale-x-100",
                    isActive && "scale-x-100"
                  )}
                />
              </>
            )}
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
