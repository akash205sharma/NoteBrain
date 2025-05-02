'use client'

import { useEffect, useRef } from 'react'
import { Crepe } from '@milkdown/crepe'
import '@milkdown/crepe/theme/common/style.css'
import '@milkdown/crepe/theme/nord-dark.css'
import { getMarkdown, saveMarkdown } from '@/lib/indexdb'
// import { insert } from "@milkdown/kit/utils";
import { useOpenFile } from '@/context/OpenFile'


type CrepeEditorProps = {
  onChange?: (markdown: string) => void
}
let initialData = '# Welcome To NoteBrain !';
async function getInitialData() {
  initialData = await getMarkdown() || '# Welcome To NoteBrain !';
}

getInitialData();

const CrepeEditor = ({ onChange }: CrepeEditorProps) => {

  const {file, toggleisSaving} = useOpenFile();
  const containerRef = useRef<HTMLDivElement | null>(null)
  const editorRef = useRef<Crepe | null>(null)
  useEffect(() => {
    if (!containerRef.current) return

    const crepe = new Crepe({
      root: containerRef.current,
      defaultValue: initialData,
      features: {
        [Crepe.Feature.CodeMirror]: true,
      },
    })

    crepe.create().then(() => {
      console.log('Editor created')
      editorRef.current = crepe
      let saveTimeout: number | undefined;
      crepe.on((listener) => {
        listener.markdownUpdated(async (ctx, markdown) => {
          onChange?.(markdown)

          toggleisSaving(true);
          clearTimeout(saveTimeout); 

          saveTimeout = window.setTimeout(() => {
            saveMarkdown(markdown);
            toggleisSaving(false);
          }, 500);
          
        })
      })
      
    })
    


    return () => {
      crepe.destroy()
      console.log('Editor destroyed')
    }
  }, [])

  return <div ref={containerRef} className="min-h m-20 h-border border-gray-300 rounded p-2" />
}

export default CrepeEditor
