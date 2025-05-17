"use client"
import React, { useEffect, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import CrepeEditor from '@/components/CrepeEditor'
import { useOpenFile } from '@/context/OpenFile'
import { isValidPath } from '@/lib/validatePath'
import { useFileTree } from "@/context/FileTree"

const page = () => {
  const {tree, setTree} = useFileTree()
  const {file, setUrl} = useOpenFile();
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

  return (
    <main className="text-white">
      <CrepeEditor onChange={(value) => setMarkdown(value)} />
    </main>
  )
}

export default page
