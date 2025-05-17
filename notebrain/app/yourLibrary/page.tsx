'use client'

import CrepeEditor from '@/components/CrepeEditor'
import { useEffect, useState } from 'react'


export default function HomePage() {



  const [markdown, setMarkdown] = useState('')




  return (
    <main className="text-white text-xl m-5">
      {/* <CrepeEditor onChange={(value) => setMarkdown(value)} /> */}
      Open or Add files to Edit
    </main>
  )
}

