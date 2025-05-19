"use client"
import React, { useEffect, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import CrepeEditor from '@/components/CrepeEditor'
import { useOpenFile } from '@/context/OpenFile'
import { isValidPath } from '@/lib/validatePath'
import { useFileTree } from "@/context/FileTree"
import { codeBlockComponent, codeBlockView } from '@milkdown/components/code-block'
import { runCode } from '@/actions/runCode'

const page = () => {
  const { tree, setTree } = useFileTree()
  const { file, setUrl } = useOpenFile();
  const pathname = usePathname()
  const [isValid, setIsValid] = useState<boolean>(false);

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

  // if (!isValid) {
  //   return <div className="text-red-500 text-center mt-10 text-xl">404 - File Not Found</div>;
  // }

  // console.log(pathname)

  useEffect(() => {
    const codeBlocks = document.getElementsByClassName('milkdown-code-block');
    Array.from(codeBlocks).forEach((block)  => {
      const toolsDiv = block.querySelector('.tools');

      if (toolsDiv && !toolsDiv.querySelector('.run-btn')) {
        const runBtn = document.createElement('div');
        runBtn.className = 'run-btn';
        runBtn.style.cursor = 'pointer';
        runBtn.style.marginLeft = '8px';
        runBtn.textContent = 'Run';
        runBtn.onclick = async () => {
          // Replace this with your run logic
          console.log('Run button clicked!');

          const cmContent = block.querySelector('div.cm-content');
          if (cmContent) {
            const language = cmContent.getAttribute('data-language');
            // Get all text content from child nodes (including nested)
            const codeText = (cmContent as HTMLElement).innerText;
            console.log('Language:', language);
            console.log('Code:', codeText);
            if (codeText && language){
              const output = await runCode(codeText, language);
              console.log(output)
            }
          }
        };
        toolsDiv.appendChild(runBtn);
      }
    });
  }, [markdown]);

  return (
    <main className="text-white">
      <CrepeEditor onChange={(value) => setMarkdown(value)} />
    </main>
  )
}

export default page


