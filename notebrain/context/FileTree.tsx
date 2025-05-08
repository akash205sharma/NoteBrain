'use client'; // for app router only

import { TreeNode,FolderNode } from '@/types';
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';


import { Dispatch, SetStateAction } from 'react';

interface FileTreeContextType {
    tree: TreeNode;
    setTree: Dispatch<SetStateAction<TreeNode>>;
}

const FileTree = createContext<FileTreeContextType | null>(null);

export const FileTreeProvider = ({ children }: { children: ReactNode }) => {

    const defaultData: TreeNode = {
        name: "FileTreeRoot",
        type: "folder",
        children: []
    };

    const [tree, setTree] = useState<TreeNode>(defaultData);

    const loadData = async () => {
        const res = await fetch('/filemap.json');
        const json = await res.json();
        setTree(json);
    };

    useEffect(() => {
        loadData();
    }, [])




    return (
        <FileTree.Provider value={{ tree, setTree }}>
            {children}
        </FileTree.Provider>
    );
};


export const useFileTree = () => {
    const context = useContext(FileTree);
    if (!context) {
        throw new Error('useFileTree must be used within an FileTreeProvider');
    }
    return context;
};