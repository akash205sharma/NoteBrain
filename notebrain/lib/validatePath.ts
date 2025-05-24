import { TreeNode } from "@/types";

export function isValidPath(tree: TreeNode, currentPath: string): boolean {
  let found = false;
  const traverse = (node: TreeNode) => {
    if (node.type === "file") {
      console.log("Node.url", decodeURIComponent(node.url));
      console.log("currentPath", decodeURIComponent("" + currentPath));
      if (decodeURIComponent(node.url) === decodeURIComponent("" + currentPath)) {
        found = true;
        return;
      }
    }
    
    if (node.type=="folder"&& node?.children) {
      node?.children?.forEach((child: any) => traverse(child));
    }
  };

  traverse(tree);
  return found;
}
