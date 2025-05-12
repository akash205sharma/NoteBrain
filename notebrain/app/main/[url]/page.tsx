"use client"
import React, { useEffect, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import CrepeEditor from '@/components/CrepeEditor'
import { useOpenFile } from '@/context/OpenFile'


const page = () => {
  const {file, setUrl} = useOpenFile();
  const pathname = usePathname()

  useEffect(() => {
    setUrl(pathname)
  }, [])
  
  const [markdown, setMarkdown] = useState('')


  return (
    <main className="text-white">
      <CrepeEditor onChange={(value) => setMarkdown(value)} />

    </main>
  )
}

export default page
