'use client'

import { useEffect, useRef } from 'react'
import { Crepe } from '@milkdown/crepe'
import '@milkdown/crepe/theme/common/style.css'
// import '@milkdown/crepe/theme/frame.css'
// import '@milkdown/crepe/theme/frame-dark.css'
import '@milkdown/crepe/theme/nord-dark.css'
// import '@milkdown/crepe/theme/crepe.css'




const MilkdownCrepeEditor = () => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const editorRef = useRef<Crepe | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const crepe = new Crepe({
      root: containerRef.current,
      defaultValue: '# Hello from Crepe!',
     
      features: {
        [Crepe.Feature.CodeMirror]: true,
        
      },
      
    })

    crepe.create().then(() => {
      console.log('Editor created')
      editorRef.current = crepe
    })

    return () => {
      crepe.destroy()
      console.log('Editor destroyed')
    }
  }, [])

  return <div ref={containerRef} className="min-h m-20 h-border border-gray-300 rounded p-2 " />
}

export default MilkdownCrepeEditor


