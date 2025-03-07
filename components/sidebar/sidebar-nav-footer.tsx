import { Settings, HelpCircle } from "lucide-react"
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar"

export function SidebarNavFooter() {
  const footerNavItems = [
    {
      id: "configuracion",
      label: "Configuración",
      icon: Settings,
    },
    {
      id: "ayuda",
      label: "Ayuda & Soporte",
      icon: HelpCircle,
    },
  ]

  return (
    <SidebarMenu>
      {footerNavItems.map((item) => (
        <SidebarMenuItem key={item.id}>
          <SidebarMenuButton>
            <item.icon className="h-4 w-4" />
            <span>{item.label}</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}

