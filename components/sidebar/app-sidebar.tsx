"use client";

import { SidebarNavMain } from "./sidebar-nav-main";
import { SidebarBranding } from "./sidebar-branding";
import { SidebarNavFooter } from "./sidebar-nav-footer";
import {
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  Sidebar,
} from "@/components/ui/sidebar";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="border-b border-border">
        <SidebarBranding />
      </SidebarHeader>

      <SidebarContent>
        <SidebarNavMain />
      </SidebarContent>

      <SidebarFooter className="border-t border-border">
        <SidebarNavFooter />
      </SidebarFooter>
    </Sidebar>
  );
}
