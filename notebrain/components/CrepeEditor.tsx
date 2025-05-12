'use client';

import { useEffect, useRef, useState } from 'react';
import { Crepe } from '@milkdown/crepe';
import '@milkdown/crepe/theme/common/style.css';
import '@milkdown/crepe/theme/nord-dark.css';
import { getMarkdown, saveMarkdown } from '@/lib/indexdb';
import { useOpenFile } from '@/context/OpenFile';

type CrepeEditorProps = {
  onChange?: (markdown: string) => void;
};

const CrepeEditor = ({ onChange }: CrepeEditorProps) => {
  const { file, toggleisSaving } = useOpenFile();
  const [initialData, setInitialData] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const editorRef = useRef<Crepe | null>(null);

  // Fetch initial markdown on mount
  useEffect(() => {
    const loadInitialData = async () => {
      const markdown = await getMarkdown(file.url);
      setInitialData(markdown || '# Welcome To NoteBrain !');
    };
    loadInitialData();
  }, [file.url]);

  // Create the editor once initialData is ready
  useEffect(() => {
    if (!containerRef.current || initialData === null) return;

    const crepe = new Crepe({
      root: containerRef.current,
      defaultValue: initialData,
      features: {
        [Crepe.Feature.CodeMirror]: true,
      },
    });

    crepe.create().then(() => {
      console.log('Editor created');
      editorRef.current = crepe;

      let saveTimeout: number | undefined;

      crepe.on((listener) => {
        listener.markdownUpdated(async (ctx, markdown) => {
          onChange?.(markdown);

          toggleisSaving(true);
          clearTimeout(saveTimeout);

          saveTimeout = window.setTimeout(() => {
            saveMarkdown(markdown, file.url);
            toggleisSaving(false);
          }, 500);
        });
      });
    });

    return () => {
      crepe.destroy();
      console.log('Editor destroyed');
    };
  }, [initialData]);

  return <div ref={containerRef} className="min-h m-20 h-border border-gray-300 rounded p-2" />;
};

export default CrepeEditor;
