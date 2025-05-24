'use client';

import { useEffect, useRef, useState } from 'react';
import { Crepe } from '@milkdown/crepe';
import '@milkdown/crepe/theme/common/style.css';
import '@milkdown/crepe/theme/nord-dark.css';
import { getMarkdown, saveMarkdown } from '@/lib/indexdb';
import { useOpenFile } from '@/context/OpenFile';
import { useSession } from 'next-auth/react';
import { replaceAll } from '@milkdown/utils';
import { Ctx } from '@milkdown/kit/ctx';


// npm install @milkdown/plugin-collab

// npm install yjs y-protocols y-prosemirror
// import { collab, collabServiceCtx } from "@milkdown/plugin-collab";


type CrepeEditorProps = {
  initial?: string;
  markdown?: string;
  onChange?: (markdown: string) => void;
};

const CrepeEditor = ({ onChange, initial, markdown }: CrepeEditorProps) => {
  const { file, toggleisSaving } = useOpenFile();
  const { data: session } = useSession();

  const containerRef = useRef<HTMLDivElement | null>(null);
  const editorRef = useRef<Crepe | null>(null);
  const [currentMarkdown, setCurrentMarkdown] = useState<string | null>(null);


  //optional

  useEffect(() => {
    setCurrentMarkdown(initial || '# Welcome To NoteBrain !');
  }, [initial]);



  // Load from IndexedDB first, fallback to GitHub if signed in
  const loadMarkdown = async () => {
    let localMarkdown = await getMarkdown(file.url);
    // if (!markdown && session?.accessToken) {
    //   markdown = await getMarkdownFromGitHub({
    //     owner: process.env.NEXT_PUBLIC_GITHUB_USERNAME || "your-username",
    //     repo: "note-brain-data-"+ session.user.login,
    //     token: session.accessToken,
    //     path: file.url,
    //   });
    // }
    setCurrentMarkdown(initial || localMarkdown || '# Welcome To NoteBrain !');
  };


  // Re-fetch markdown whenever file.url or session is updated

  useEffect(() => {
    loadMarkdown();
  }, [file.url]);

  // Setup editor once markdown is available

  useEffect(() => {
    if (!containerRef.current || currentMarkdown === null) return;


    //This line is extra and can be removed
    //  {
    // Destroy previous editor if exists
    if (editorRef.current) {
      editorRef.current.destroy();
      editorRef.current = null;
    }
    //  }






    const crepe = new Crepe({
      root: containerRef.current,
      defaultValue: currentMarkdown,
      features: {
        [Crepe.Feature.CodeMirror]: true,
      },
    });

    crepe.create().then(() => {
      editorRef.current = crepe;

      let saveTimeout: number | undefined;

      crepe.on((listener) => {
        listener.markdownUpdated(async (ctx, newMarkdown) => {
          onChange?.(newMarkdown);
          toggleisSaving(true);
          clearTimeout(saveTimeout);

          saveTimeout = window.setTimeout(() => {
            saveMarkdown(newMarkdown, file.url);
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

  // Update editor content when markdown prop changes
  useEffect(() => {
    if (editorRef.current && markdown !== undefined) {
      editorRef.current.editor?.action(replaceAll(markdown));
    }
  }, [markdown]);

  return <div ref={containerRef} className="min-h m-20 h-border border-gray-300 rounded p-2" />;
};

export default CrepeEditor;







