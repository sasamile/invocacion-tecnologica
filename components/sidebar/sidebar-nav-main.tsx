"use client";

import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Building, Landmark, School } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

export function SidebarNavMain() {
  const pathname = usePathname();
  const router = useRouter();

  const mainNavItems = [
    {
      href: "/",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      href: "/municipalities",
      label: "Municipios",
      icon: Building,
    },
    {
      href: "/schools",
      label: "Colegios",
      icon: Landmark,
    },
    {
      href: "/campuses",
      label: "Sedes Educativas",
      icon: School,
    },
  ];

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Principal</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {mainNavItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  onClick={() => router.push(item.href)}
                  className={cn(
                    "hover:bg-muted-foreground/25 cursor-pointer active:bg-muted-foreground/25",
                    isActive &&
                      "bg-blue-500 hover:bg-blue-500 active:bg-blue-500 active:text-white text-white hover:text-white"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
