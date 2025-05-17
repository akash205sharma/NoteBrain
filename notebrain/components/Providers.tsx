// app/components/Providers.tsx
'use client';

import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { OpenFileProvider } from "@/context/OpenFile";
import { FileTreeProvider } from "@/context/FileTree";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <FileTreeProvider>
                <OpenFileProvider>
                    {children}
                </OpenFileProvider>
            </FileTreeProvider>
        </SessionProvider>

    );
}
