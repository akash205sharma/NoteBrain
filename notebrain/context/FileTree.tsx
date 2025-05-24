'use client';

import { getFileTree as getFileTreeFromIDB, saveFileTree } from '@/lib/indexdb';
import { getFileTreeFromGitHubJSON, uploadToGitHub } from '@/lib/github';
import { FolderNode, TreeNode } from '@/types';
import { createContext, useContext, useState, useEffect, ReactNode, Dispatch, SetStateAction } from 'react';
import { useSession } from 'next-auth/react';

interface FileTreeContextType {
    tree: TreeNode;
    setTree: Dispatch<SetStateAction<TreeNode>>;
}

const FileTree = createContext<FileTreeContextType | null>(null);

export const FileTreeProvider = ({ children }: { children: ReactNode }) => {
    const defaultData: TreeNode = {
        name: "FileTreeRoot",
        type: "folder",
        children: [],
    };

    const [tree, setTree] = useState<TreeNode>(defaultData);
    const [loaded, setLoaded] = useState(false);
    const { data: session } = useSession();

    useEffect(() => {
        const loadTree = async () => {
            let loadedFromGitHub = false;

            try {
                // 1. Try IndexedDB first
                const idbTree = await getFileTreeFromIDB() as FolderNode;
                if (idbTree && idbTree.children?.length) {
                    setTree(idbTree);
                } else if (session?.accessToken) {
                    // 2. If IndexedDB empty, fetch from GitHub
                    const githubTree = await getFileTreeFromGitHubJSON({
                        owner: session.user?.login!,
                        repo: "note-brain-data-"+ session.user.login,
                        token: session.accessToken,
                    });

                    setTree(githubTree);
                    await saveFileTree(githubTree); // Cache into IDB
                    loadedFromGitHub = true;
                }
            } catch (err) {
                console.error("Failed to load file tree:", err);
            }

            setLoaded(true);
        };

        loadTree();
    }, [session?.accessToken]);

    useEffect(() => {
        if (loaded) {
            saveFileTree(tree);
            if (session && session.accessToken) {
                uploadToGitHub({
                    token: session.accessToken,
                    owner: session.user?.login!,
                    repo: "note-brain-data-"+ session.user.login,
                    path: "filetree.json",
                    content: JSON.stringify(tree, null, 2),
                    message: "Update file tree",
                });
            }
        }
    }, [tree, loaded]);

    return (
        <FileTree.Provider value={{ tree, setTree }}>
            {children}
        </FileTree.Provider>
    );
};

export const useFileTree = () => {
    const context = useContext(FileTree);
    if (!context) {
        throw new Error('useFileTree must be used within a FileTreeProvider');
    }
    return context;
};
