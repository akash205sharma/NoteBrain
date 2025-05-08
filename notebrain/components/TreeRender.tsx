import { FolderNode, TreeNode } from '@/types'
import React, { useEffect, useState } from 'react'
import { SidebarMenu, SidebarMenuAction, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubItem } from './ui/sidebar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { ChevronRight, File, MoreHorizontal } from 'lucide-react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@radix-ui/react-collapsible'
import { Calendar, Folder, Home, Inbox, Settings } from "lucide-react"
import Link from 'next/link'
import AlertDialogWrapper from './AlertDialogWrapper'

const TreeRender = ({ node, parent, functionLifting }: { node: TreeNode; parent: TreeNode, functionLifting: (changedNode: TreeNode) => void }) => {
	// console.log(node)
	const [nodes, setNodes] = useState({      // for immediately showing effect
		nodeState: node,
		parentState: parent,
	})

	useEffect(() => {
		setNodes({ nodeState: node, parentState: parent });
	}, [node, parent]);



	const [showAlert, setShowAlert] = useState(false);
	const [onResolve, setOnResolve] = useState<(confirmed: boolean) => void>(() => () => { });

	const confirmAlert = (): Promise<boolean> => {
		return new Promise((resolve) => {
			setOnResolve(() => resolve); // store the resolver
			setShowAlert(true);          // open dialog
		});
	};

	const handleDelete = async () => {
		const confirmed = await confirmAlert();
		setShowAlert(false);
		setOnResolve(() => () => { }); // reset
		if (confirmed) {
			deleteFile();
		}
	};



	const deleteFile = () => {
		if (parent && 'children' in parent) {
			// Immutable update of parent
			const updatedParent = {
				...parent,
				children: parent.children.filter(child => child !== node),
			};
			console.log("Element Deleted", node);
			console.log("After Deletion", updatedParent);
			setNodes({ nodeState: node, parentState: updatedParent });
			functionLifting(updatedParent);
		} else {
			functionLifting(node); // for root
		}

	};

	//   for recursively transferring function calls

	const functionLifting2 = (changedNode: TreeNode) => {
		if (parent && 'children' in parent) {
			const updatedParent = {
				...parent,
				children: parent.children.map(child =>
					child.name === node.name ? changedNode : child
				),
			};
			setNodes({ nodeState: changedNode, parentState: updatedParent });
			functionLifting(updatedParent);
		} else {
			setNodes({ nodeState: changedNode, parentState: parent });
			functionLifting(changedNode); // root node change
		}
	};



	return (
		<SidebarMenu>
			{showAlert ?
				<>
					<AlertDialogWrapper
						open={showAlert}
						setOpen={setShowAlert}
						onResolve={onResolve}
						title="Delete Folder?"
						description="This will permanently delete your folder."
					/>
					{nodes.nodeState.type == 'folder' ?
						<Collapsible className="group/collapsible">
							<SidebarMenuItem>
								<CollapsibleTrigger asChild data-slot="collapsible-content">
									<SidebarMenuButton className="flex">
										<ChevronRight className="chevron" />
										<span>{nodes.nodeState.name}</span>
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
											<span className='cursor-pointer'>New Folder</span>
										</DropdownMenuItem>
										<DropdownMenuItem className="p-2 rounded hover:bg-[#18181b]" >
											<span className='cursor-pointer'>New File</span>
										</DropdownMenuItem>
										<DropdownMenuItem className="p-2 rounded hover:bg-[#18181b]">
											<span className='cursor-pointer' onClick={handleDelete} >Delete</span>
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>

								{nodes.nodeState.children.map((child, index) => (
									<CollapsibleContent key={index} >
										<SidebarMenuSub>
											<TreeRender node={child} parent={nodes.nodeState} functionLifting={functionLifting2} />
										</SidebarMenuSub>
									</CollapsibleContent>
								))}
							</SidebarMenuItem>
						</Collapsible>
						:
						<SidebarMenuSubItem>
							<SidebarMenuButton asChild>
								<Link href={nodes.nodeState.url}>
									<span>{nodes.nodeState.name}</span>
								</Link>
							</SidebarMenuButton>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<SidebarMenuAction>
										<MoreHorizontal />
									</SidebarMenuAction>
								</DropdownMenuTrigger>
								<DropdownMenuContent side="right" align="start" className="border bg-black rounded p-2" >
									<DropdownMenuItem className="p-2 rounded hover:bg-[#18181b]">
										<span className='cursor-pointer' onClick={handleDelete} >Delete</span>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>

						</SidebarMenuSubItem>
					}</>
				:

				//duplicates

				nodes.nodeState.type == 'folder' ?
					<Collapsible className="group/collapsible">
						<SidebarMenuItem>
							<CollapsibleTrigger asChild data-slot="collapsible-content">
								<SidebarMenuButton className="flex">
									<ChevronRight className="chevron" />
									<span>{nodes.nodeState.name}</span>
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
										<span className='cursor-pointer'>New Folder</span>
									</DropdownMenuItem>
									<DropdownMenuItem className="p-2 rounded hover:bg-[#18181b]" >
										<span className='cursor-pointer'>New File</span>
									</DropdownMenuItem>
									<DropdownMenuItem className="p-2 rounded hover:bg-[#18181b]">
										<span className='cursor-pointer' onClick={handleDelete} >Delete</span>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>

							{nodes.nodeState.children.map((child, index) => (
								<CollapsibleContent key={index} >
									<SidebarMenuSub>
										<TreeRender node={child} parent={nodes.nodeState} functionLifting={functionLifting2} />
									</SidebarMenuSub>
								</CollapsibleContent>
							))}
						</SidebarMenuItem>
					</Collapsible>
					:
					<SidebarMenuSubItem>
						<SidebarMenuButton asChild>
							<Link href={nodes.nodeState.url}>
								<span>{nodes.nodeState.name}</span>
							</Link>
						</SidebarMenuButton>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<SidebarMenuAction>
									<MoreHorizontal />
								</SidebarMenuAction>
							</DropdownMenuTrigger>
							<DropdownMenuContent side="right" align="start" className="border bg-black rounded p-2" >
								<DropdownMenuItem className="p-2 rounded hover:bg-[#18181b]">
									<span className='cursor-pointer' onClick={handleDelete} >Delete</span>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>

					</SidebarMenuSubItem>
			}





		</SidebarMenu>

	)
}

export default TreeRender


