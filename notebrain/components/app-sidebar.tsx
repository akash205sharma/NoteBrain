"use client"

import { Calendar, Home, Inbox, MoreHorizontal, Search, Settings, ChevronRight, Folder } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarRail
} from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible"
import TreeRender from "./TreeRender"
import { useEffect, useState } from "react"
import { TreeNode } from "@/types"
import { useFileTree } from "@/context/FileTree"

// Menu items.
// const items = [
//   {
//     title: "Home",
//     url: "#",
//     icon: Home,
//   },
//   {
//     title: "Inbox",
//     url: "#",
//     icon: Inbox,
//   },
//   {
//     title: "Calendar",
//     url: "#",
//     icon: Calendar,
//   },
//   {
//     title: "Search",
//     url: "#",
//     icon: Search,
//   },
//   {
//     title: "Settings",
//     url: "#",
//     icon: Settings,
//   },
// ]

export function AppSidebar() {
  
  const {tree, setTree} = useFileTree()
  
  const functionLifting = (changedNode: TreeNode) => {
    setTree(changedNode)
    console.log("changedNode",changedNode);
	  console.log("Function Lifting app sidebar",tree);
	}


  return (
    <Sidebar>
      <SidebarContent>
        {/* <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <SidebarMenuAction>
                        <MoreHorizontal />
                      </SidebarMenuAction>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="right" align="start" className="border bg-black rounded p-2" >
                      <DropdownMenuItem className="p-2 rounded hover:bg-[#18181b]" >
                        <span>Edit Project</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="p-2 rounded hover:bg-[#18181b]">
                        <span>Delete Project</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup> */}


        <SidebarGroup>
          <SidebarGroupLabel>Drop downs</SidebarGroupLabel>
          <SidebarGroupContent>
            {"children" in tree && tree.children[0] ?
            <TreeRender url={"http://localhost:3000/main"} node={tree.children[0]} parent={tree} functionLifting={functionLifting} ></TreeRender>
            : <div></div>
            }
            </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}


