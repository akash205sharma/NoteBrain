// context/RunningCodeContext.tsx
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface RunningCodeContextType {
  isRunning: boolean;
  isSidebarOpen: boolean;
  code: string;
  output: string;
  setIsRunning: (value: boolean) => void;
  setIsSidebarOpen: (value: boolean) => void;
  setCode: (value: string) => void;
  setOutput: (value: string) => void;
}

const RunningCodeContext = createContext<RunningCodeContextType | undefined>(undefined);

export const RunningCodeProvider = ({ children }: { children: ReactNode }) => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [code, setCode] = useState<string>('');
  const [output, setOutput] = useState<string>('');

  return (
    <RunningCodeContext.Provider
      value={{
        isRunning,
        isSidebarOpen,
        code,
        output,
        setIsRunning,
        setIsSidebarOpen,
        setCode,
        setOutput,
      }}
    >
      {children}
    </RunningCodeContext.Provider>
  );
};

export const useRunningCode = (): RunningCodeContextType => {
  const context = useContext(RunningCodeContext);
  if (!context) {
    throw new Error('useRunningCode must be used within a RunningCodeProvider');
  }
  return context;
};
