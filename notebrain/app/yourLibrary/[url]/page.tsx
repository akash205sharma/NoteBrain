"use client"
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client';
import { Play } from 'lucide-react';
import { usePathname, useSearchParams } from 'next/navigation'
import CrepeEditor from '@/components/CrepeEditor'
import { useOpenFile } from '@/context/OpenFile'
import { isValidPath } from '@/lib/validatePath'
import { useFileTree } from "@/context/FileTree"
import { codeBlockComponent, codeBlockView } from '@milkdown/components/code-block'
import { runCode } from '@/actions/runCode'
import { useRunningCode } from '@/context/RunningCode';

const page = () => {
  const { tree, setTree } = useFileTree()
  const { file, setUrl } = useOpenFile();
  const pathname = usePathname()
  const [isValid, setIsValid] = useState<boolean>(false);
  const {
    isRunning,
    isSidebarOpen,
    code,
    language,
    output,
    setIsRunning,
    setIsSidebarOpen,
    setCode,
    setLang,
    setInput,
    setOutput,
  } = useRunningCode();

  useEffect(() => {
    //   if (!isValid && pathname) {
    //     console.log("validity");
    //     const valid = isValidPath(tree, pathname);
    //     console.log("validity",valid);
    //     setIsValid(valid);

    //     if (valid) {
    //       console.log("Valid hai")
    setUrl(pathname);
    //     }
    //     else{
    //       console.log("Nahi hai valid")
    //     }
    //   }
  }, []);

  const [markdown, setMarkdown] = useState('')


  useEffect(() => {
    setIsSidebarOpen(false)
    const codeBlocks = document.getElementsByClassName('milkdown-code-block');

    Array.from(codeBlocks).forEach((block) => {
      const toolsDiv = block.querySelector('.tools');

      if (toolsDiv && !toolsDiv.querySelector('.react-run-button')) {
        // Create a container div for React component
        const reactRootDiv = document.createElement('div');
        reactRootDiv.className = 'react-run-button';
        reactRootDiv.style.marginLeft = '8px';
        toolsDiv.appendChild(reactRootDiv);

        // Mount your React RunButton inside the container
        const cmContent = block.querySelector('div.cm-content');

        const handleRun = async () => {
          if (!cmContent) return;
          const language = cmContent.getAttribute('data-language') || 'cpp';
          const codeText = (cmContent as HTMLElement).innerText;
          setCode(codeText);
          setLang(language);
          setIsSidebarOpen(false);
          setOutput("")
          setTimeout(() => {
            setIsSidebarOpen(true);
          }, 100);
        };

        const root = ReactDOM.createRoot(reactRootDiv); // React 18+
        root.render(<Play onClick={handleRun} className='active:fill-white transition duration-150 hover:text-blue-400 cursor-pointer' />);
      }
    });
  }, [markdown]);
  
  const run = async () => {
    if (code) {
      try {
        const result = await runCode(code, language);
        if (result) {
          setOutput(result.output)
        }
      } catch (error) {
    setOutput("Error: Some Problem Occured")
      }
      setIsRunning(false);
    }
  };

  useEffect(() => {
    if(isRunning) run();
  }, [isRunning])




  return (
    <main className="w-full text-white">
      <CrepeEditor onChange={(value) => setMarkdown(value)} />
    </main>
  )
}

export default page


