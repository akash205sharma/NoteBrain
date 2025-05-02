
export interface FileNode {
    name: string;
    type: "file";
    url: string;
}

export interface FolderNode {
    name: string;
    type: "folder";
    children: TreeNode[];
}

export type TreeNode = FileNode | FolderNode;


// export type TreeNode =
//     | {
//         name: string;
//         type: "file";
//         url: string;
//     }
//     | {
//         name: string;
//         type: "folder";
//         children: TreeNode[]; // not optional anymore
//     };
