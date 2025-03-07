import { School } from "lucide-react"

export function SidebarBranding() {
  return (
    <div className="flex items-center gap-2 px-4 py-2">
      <div className="rounded-md p-1 bg-blue-500">
        <School className="h-6 w-6 text-primary-foreground" />
      </div>
      <div>
        <h2 className="font-semibold tracking-tight">SisEduca Meta</h2>
        <p className="text-xs text-muted-foreground">Gestión Educativa</p>
      </div>
    </div>
  )
}

