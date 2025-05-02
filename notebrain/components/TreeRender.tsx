import { TreeNode } from '@/types'
import React from 'react'
import { SidebarMenu, SidebarMenuAction, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubItem } from './ui/sidebar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { ChevronRight, File, MoreHorizontal } from 'lucide-react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@radix-ui/react-collapsible'
import { Calendar, Folder, Home, Inbox, Settings } from "lucide-react"

const TreeRender = ({ node }: { node: TreeNode }) => {
	console.log(node)

	return (
		<SidebarMenu>
			{node.type == 'folder' ?
				<Collapsible className="group/collapsible">
					<SidebarMenuItem>
						<CollapsibleTrigger asChild data-slot="collapsible-content">
							<SidebarMenuButton className="flex">
								<ChevronRight className="transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
								<span>{node.name}</span>
							</SidebarMenuButton>
						</CollapsibleTrigger>
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

						{node.children.map((child, index) => (
							<CollapsibleContent key={index} >
								<SidebarMenuSub>
									<TreeRender node={child} ></TreeRender>
								</SidebarMenuSub>
							</CollapsibleContent>
						))}
					</SidebarMenuItem>
				</Collapsible>
				:
				<SidebarMenuSubItem>
					<SidebarMenuButton asChild>
						<a href={node.url}>
							<span>{node.name}</span>
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

				</SidebarMenuSubItem>
			}
		</SidebarMenu>
	)
}

export default TreeRender
