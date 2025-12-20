import { CheckSquare } from "lucide-react"

export function Navbar() {
  return (
    <nav className="border-b border-border bg-card">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-3">
          <CheckSquare className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-semibold text-foreground">Todo App</h1>
        </div>
      </div>
    </nav>
  )
}
