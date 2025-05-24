'use client';

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import RunSidebar from "@/components/RunSidebar"
import { useRunningCode } from "@/context/RunningCode";

export default function Layout({ children }: { children: React.ReactNode }) {
  const {isSidebarOpen} = useRunningCode();
    
  
  return (
    <SidebarProvider defaultOpen={false} open={isSidebarOpen}  >
      <main className="w-full flex" >
        {children}
      </main>
      <RunSidebar/>
    </SidebarProvider>
  )
}
