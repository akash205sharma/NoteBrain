export function isValidPath(tree: any, currentPath: string): boolean {
  let found = false;
  const traverse = (node: any) => {
    console.log("Node.url",decodeURIComponent(node.url))
    console.log("currentPath",decodeURIComponent("" + currentPath))
    if (node.type === "file" && decodeURIComponent(node.url) === decodeURIComponent("" + currentPath)) {
      found = true;
      return;
    }
    
    if (node?.children) {
      node?.children?.forEach((child: any) => traverse(child));
    }
  };

  traverse(tree);
  return found;
}
