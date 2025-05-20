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
import { LoaderCircle, Play, X } from 'lucide-react';


export default function RunSidebar() {
  const {
    isRunning,
    isSidebarOpen,
    code,
    output,
    input,
    setIsRunning,
    setIsSidebarOpen,
    setCode,
    setInput,
    setOutput,
  } = useRunningCode();


  return (
    <Sidebar side="right" variant="floating" >

      <SidebarContent>
        <SidebarGroup> {/* for closing sidebar*/}
          <SidebarGroupLabel> <X onClick={() => { setIsSidebarOpen(false) }} className="cursor-pointer rounded hover:bg-gray-200 hover:text-black transition-colors" /> </SidebarGroupLabel>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="flex justify-between">Input  <Play onClick={() => { setIsRunning(true) }} className='active:fill-none transition duration-150 hover:invert hover:fill-black cursor-pointer' /> </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="pt-2" >
              {!isRunning ?
                <div className="w-full justify-center flex">
                  <textarea
                    className="w-full p-2 rounded border border-gray-300 resize-none"
                    placeholder="Enter Input if any"
                    defaultValue={input}
                    onChange={(e) => setInput(e.target.value)}
                    rows={3}
                  />
                </div>
                : <div className="whitespace-pre-wrap break-words overflow-auto max-h-64 p-2 border rounded">
                  {input}
                </div>

              }
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup className="CodeRunner">
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
      <SidebarRail onClick={() => { setIsSidebarOpen(false) }} />
    </Sidebar>
  )
}


