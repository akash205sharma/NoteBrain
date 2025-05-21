





'use client';

import { useEffect, useRef, useState } from 'react';
import { Crepe } from '@milkdown/crepe';
import '@milkdown/crepe/theme/common/style.css';
import '@milkdown/crepe/theme/nord-dark.css';
import { getMarkdown, saveMarkdown } from '@/lib/indexdb';
import { useOpenFile } from '@/context/OpenFile';
import { useSession } from 'next-auth/react';
import { getMarkdownFromGitHub } from '@/lib/github';

type CrepeEditorProps = {
  initial?: string;
  onChange?: (markdown: string) => void;
};

const CrepeEditor = ({ onChange, initial }: CrepeEditorProps) => {
  const { file, toggleisSaving } = useOpenFile();
  const { data: session } = useSession();

  const containerRef = useRef<HTMLDivElement | null>(null);
  const editorRef = useRef<Crepe | null>(null);
  const [currentMarkdown, setCurrentMarkdown] = useState<string | null>(null);

  // Load from IndexedDB first, fallback to GitHub if signed in
  const loadMarkdown = async () => {
    let markdown = await getMarkdown(file.url);
    // if (!markdown && session?.accessToken) {
    //   markdown = await getMarkdownFromGitHub({
    //     owner: process.env.NEXT_PUBLIC_GITHUB_USERNAME || "your-username",
    //     repo: "note-brain-data",
    //     token: session.accessToken,
    //     path: file.url,
    //   });
    // }
    setCurrentMarkdown(initial || markdown || '# Welcome To NoteBrain !');
  };

  // Re-fetch markdown whenever file.url or session is updated
  
  useEffect(() => {
    loadMarkdown();
  }, [file.url]);

  // Setup editor once markdown is available

  useEffect(() => {
    if (!containerRef.current || currentMarkdown === null) return;

    const crepe = new Crepe({
      root: containerRef.current,
      defaultValue: currentMarkdown,
      features: {
        [Crepe.Feature.CodeMirror]: true,
      },
    });

    crepe.create().then(() => {
      editorRef.current = crepe;
      console.log('Editor created');

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
  }, [currentMarkdown]);

 
  return <div ref={containerRef} className="min-h m-20 h-border border-gray-300 rounded p-2" />;
};

export default CrepeEditor;







