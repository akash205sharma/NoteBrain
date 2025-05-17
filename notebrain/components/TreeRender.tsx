import { FileNode, FolderNode, TreeNode } from '@/types'
import React, { Children, useEffect, useState } from 'react'
import { SidebarMenu, SidebarMenuAction, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubItem } from './ui/sidebar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { ChevronRight, File, MoreHorizontal } from 'lucide-react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@radix-ui/react-collapsible'
import { Calendar, Folder, Home, Inbox, Settings } from "lucide-react"
import Link from 'next/link'
import AlertDialogWrapper from './AlertDialogWrapper'
import { useOpenFile } from '@/context/OpenFile'
import AddNewDialogWrapper from './AddNewDialogWrapper'
import { deleteFileFromGitHub } from '@/lib/github'
import { useDeleteFileFromGitHub } from './SyncWithGit'
import { useSession } from 'next-auth/react'
import { deleteMarkdown } from '@/lib/indexdb'

const TreeRender = ({ node, parent, functionLifting, url }: { node: TreeNode; parent: TreeNode, functionLifting: (changedNode: TreeNode) => void, url: string }) => {
	// console.log(node)


	const [nodes, setNodes] = useState({      // for immediately showing effect
		nodeState: node,
		parentState: parent,
	})

	useEffect(() => {
		setNodes({ nodeState: node, parentState: parent });
	}, [node, parent]);


	const [showAlert, setShowAlert] = useState(false);
	const [showAdd, setShowAdd] = useState(false);
	const [isAddFile, setIsAddFile] = useState(true);
	const [onResolve, setOnResolve] = useState<(confirmed: boolean) => void>(() => () => { });
	const deleteFileFromGitHub = useDeleteFileFromGitHub();

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

	async function deleteFolder(node: TreeNode) {
		if (node.type === "folder") {
			node.children.forEach(async child => {
				deleteFolder(child)
			});
		}
		else{
			await deleteMarkdown(node.url)
			await deleteFileFromGitHub(node.url);
		}
	}

	const deleteFile = async () => {
		if (parent && 'children' in parent) {
			// Immutable update of parent
			const updatedParent = {
				...parent,
				children: parent.children.filter(child => child !== node),
			};
			console.log("Element Deleted", node);
			console.log("After Deletion", updatedParent);
			setNodes({ nodeState: node, parentState: updatedParent });


			// ✅ DeleteFile
			await deleteFolder(node)


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
			functionLifting(updatedParent);     //backtrack
		} else {
			setNodes({ nodeState: changedNode, parentState: parent });
			functionLifting(changedNode); // root node change
		}
	};



	const handleAddNew = async (name: string) => {
		if (name.length > 0) {
			var newChildren: TreeNode;
			if (isAddFile) {
				newChildren = {
					name: name,
					type: "file",
					url: url + "-" + name,
				}
			}
			else {
				newChildren = {
					name: name,
					type: "folder",
					children: [],
				}
			}
			if (node.type === "folder" && Array.isArray(node.children)) {
				node.children.push(newChildren);
				setNodes({ nodeState: node, parentState: parent })
				functionLifting2(node)   // update current parent in same file then go to backtrack after this
			}
		}
		else {
			console.log("Name can not be empty")
		}

	}



	return (
		<SidebarMenu>

			{showAlert &&
				<AlertDialogWrapper
					open={showAlert}
					setOpen={setShowAlert}
					onResolve={onResolve}
					title="Delete Folder?"
					description="This will permanently delete your folder."
				/>}
			{showAdd &&
				<AddNewDialogWrapper
					open={showAdd}
					setOpen={setShowAdd}
					addName={handleAddNew}
				/>
			}
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
								<DropdownMenuItem className="p-2 rounded hover:bg-[#18181b]" onClick={() => { setShowAdd(true); setIsAddFile(false) }}>
									<span className='cursor-pointer'>New Folder</span>
								</DropdownMenuItem>
								<DropdownMenuItem className="p-2 rounded hover:bg-[#18181b]" onClick={() => { setShowAdd(true); setIsAddFile(true) }}>
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
									<TreeRender url={url + `-${child.name}`} node={child} parent={nodes.nodeState} functionLifting={functionLifting2} />
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

export default TreeRender;
