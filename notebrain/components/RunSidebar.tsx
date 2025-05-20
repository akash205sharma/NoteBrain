"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarRail
} from "@/components/ui/sidebar"
import { useRunningCode } from "@/context/RunningCode";
import { LoaderCircle } from 'lucide-react';


export default function RunSidebar() {
  const {
    isRunning,
    isSidebarOpen,
    code,
    output,
    setIsRunning,
    setIsSidebarOpen,
    setCode,
    setOutput,
  } = useRunningCode();


  return (
    <Sidebar side="right" variant="floating" >

      <SidebarContent>
        <SidebarGroup className="CodeRunner ">
          <SidebarGroupLabel>Output</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="pt-2" >
              {isRunning ?
                <div className="w-full justify-center flex">
                  <LoaderCircle className="animate-spin" />
                </div>
                : output
              }
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}


