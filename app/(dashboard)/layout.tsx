import React from "react";

import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { UserButton } from "@/components/user/user-button";

export default function Dashboard({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-muted/30">
        <AppSidebar />

        <div className="flex flex-col w-full overflow-auto">
          <header className="sticky top-0 z-10 flex justify-between h-14 shrink-0 items-center gap-4 border-b bg-background px-4 sm:px-6">
            <SidebarTrigger />
            <UserButton />
          </header>

          <main className="flex-1 p-4 sm:p-6 md:p-8">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
