'use client'; // for app router only

import { createContext, useContext, useState, ReactNode } from 'react';


interface OpenFileContextType {
    file: { isSaving: boolean };
    toggleisSaving: (isSaving: boolean) => void;
}

const OpenFile = createContext<OpenFileContextType | null>(null);

export const OpenFileProvider = ({ children }: { children: ReactNode }) => {
    const [file, setFile] = useState({
        isSaving: false
    });

    const toggleisSaving = (isSaving:boolean) => {
        setFile({
            ...file,
            isSaving: isSaving
        });
    }

    return (
        <OpenFile.Provider value={{ file, toggleisSaving }}>
            {children}
        </OpenFile.Provider>
    );
};


export const useOpenFile = () => {
    const context = useContext(OpenFile);
    if (!context) {
      throw new Error('useOpenFile must be used within an OpenFileProvider');
    }
    return context;
};