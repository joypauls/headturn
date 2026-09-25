import { NavLink } from "react-router"
import { cn } from "@/lib/utils"

const links = [
  { to: "/", label: "Viewer" },
  { to: "/how-to", label: "How To" },
  { to: "/about", label: "About" },
]

export function Navbar() {
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
    </header>
  )
}
