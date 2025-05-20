// app/components/Providers.tsx
'use client';

import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { OpenFileProvider } from "@/context/OpenFile";
import { FileTreeProvider } from "@/context/FileTree";
import { RunningCodeProvider } from '@/context/RunningCode';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <FileTreeProvider>
                <OpenFileProvider>
                    <RunningCodeProvider>
                    {children}
                    </RunningCodeProvider>
                </OpenFileProvider>
            </FileTreeProvider>
        </SessionProvider>

    );
}
