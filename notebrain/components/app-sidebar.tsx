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
import AddNewDialogWrapper from "./AddNewDialogWrapper"
import { saveFileTree } from '@/lib/indexdb';
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
  // console.log(tree)
  
  const functionLifting = (changedNode: TreeNode) => {
    setTree(changedNode)
    console.log("changedNode", changedNode);
    console.log("Function Lifting app sidebar", tree);
  }
  
  const [showAdd, setShowAdd] = useState(false);
  const [isAddFile, setIsAddFile] = useState(true);

  const handleAddNew = async (name: string) => {
    if (name.length > 0) {
      var newChildren: TreeNode;
      if (isAddFile) {
        newChildren = {
          name: name,
          type: "file",
          url: "/yourLibrary" + "/" + name,
        }
      }
      else {
        newChildren = {
          name: name,
          type: "folder",
          children: [],
        }
      }
      if (tree.type === "folder" && Array.isArray(tree.children)) {
        const node = tree;
        node.children.push(newChildren);
        setTree(node);
        saveFileTree(tree);
      }
    }
    else {
      console.log("Name can not be empty")
    }

  }


  return (
    <Sidebar>
      {showAdd &&
        <AddNewDialogWrapper
          open={showAdd}
          setOpen={setShowAdd}
          addName={handleAddNew}
        />
      }
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
          <SidebarGroupLabel className="flex " >
            <div>Your Library</div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction className="m-2">
                  <MoreHorizontal />
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="right" align="start" className="border bg-black rounded p-2" >
                <DropdownMenuItem className="p-2 rounded hover:bg-[#18181b]" onClick={() => { setShowAdd(true); setIsAddFile(false) }}>
                  <span className='cursor-pointer'>New Folder</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-2 rounded hover:bg-[#18181b]" onClick={() => { setShowAdd(true); setIsAddFile(true) }}>
                  <span className='cursor-pointer'>New File</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            {"children" in tree && tree.children[0] ?
              tree.children.map((child, index) => (
                <TreeRender key={index} url={"/yourLibrary/" + `${child.name}`} node={child} parent={tree} functionLifting={functionLifting} />
              )) : <div></div>
            }
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}


