"use client";

import { useSession } from "next-auth/react";
import { deleteFileFromGitHub, uploadToGitHub } from "@/lib/github";
import { useFileTree } from "@/context/FileTree";
// import { useRouter } from "next/router";
import { getAllMarkdownFiles } from "@/lib/indexdb";
import { useEffect } from "react";

export function SyncWithGit() {
  const { data: session } = useSession();
  const { tree, setTree } = useFileTree();
  const upload = async () => {
    // const router = useRouter();
    if (!session) {
      // router.push("/login")
      alert("Please Login");
      return;
    }
    const accessToken = (session as any).accessToken;
    try {

      //Sync Folder Structure
      await uploadToGitHub({
        token: accessToken,
        owner: session.user?.login!,
        repo: "note-brain-data-"+ session.user.login,
        path: "filetree.json",
        content: JSON.stringify(tree, null, 2),
        message: "Update file tree",
      });
      // alert("Folder Structure Uploaded!");


      //Store all markdown form indexed db

      const markdownFiles = await getAllMarkdownFiles();
      
// console.log("Name",session.user.name)
      for (const file of markdownFiles) {
        if (file.url != "Filetree") {
          // console.log(file.url)
          await uploadToGitHub({
            token: accessToken,
            owner: session.user?.login!,
            repo: "note-brain-data-"+ session.user.login,
            path: file.url + ".md",         // like "yourLibrary/description.md"
            content: file.markdown, // the markdown content
            message: `Sync ${file.url}`
          });
        }
      }


      alert("All Files Synced!");
    } catch (err) {
      console.error(err);
    }
  };

  return <div
    onClick={upload}
    className="mr-6 cursor-pointer px-3 py-1 rounded-md hover:bg-gray-200 hover:text-black active:bg-gray-500 transition-colors text-sm font-medium"
  >
    Sync With Github
  </div>
}


export const useDeleteFileFromGitHub = () => {
  const { data: session } = useSession();

  return async (url: string) => {
    if (!session?.accessToken) {
      alert("Please log in");
      return;
    }

    const fileName = url.split("/").filter(Boolean).pop() + ".md";

    try {
      await deleteFileFromGitHub({
        owner: session.user?.login!,
        repo: "note-brain-data-"+ session.user.login,
        path: fileName,
        token: session.accessToken as string,
        message: `Remove ${fileName} file`,
      });
      alert("Deleted Successfully");
    } catch (err) {
      console.error("Failed to delete:", err);
      // alert("Failed to delete");
    }
  };
};
