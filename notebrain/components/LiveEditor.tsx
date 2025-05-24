'use client';

import { useEffect, useRef, useState } from 'react';
import { Crepe } from '@milkdown/crepe';
import '@milkdown/crepe/theme/common/style.css';
import '@milkdown/crepe/theme/nord-dark.css';
import { getMarkdown, saveMarkdown } from '@/lib/indexdb';
import { useOpenFile } from '@/context/OpenFile';
import { useSession } from 'next-auth/react';
import { replaceAll } from '@milkdown/utils';
import { collab, collabServiceCtx } from '@milkdown/plugin-collab';
import { Doc } from 'yjs';
import { WebsocketProvider } from 'y-websocket';

type LiveEditorProps = {
  initial?: string;
  markdown?: string;
  onChange?: (markdown: string) => void;
};

const LiveEditor = ({ onChange, initial, markdown }: LiveEditorProps) => {
  const { file, toggleisSaving } = useOpenFile();
  const { data: session } = useSession();

  const containerRef = useRef<HTMLDivElement | null>(null);
  const editorRef = useRef<Crepe | null>(null);
  const [currentMarkdown, setCurrentMarkdown] = useState<string | null>(null);

  useEffect(() => {
    setCurrentMarkdown(initial || '# Welcome To NoteBrain !');
  }, [initial]);

  const loadMarkdown = async () => {
    let localMarkdown = await getMarkdown(file.url);
    setCurrentMarkdown(initial || localMarkdown || '# Welcome To NoteBrain !');
  };

  useEffect(() => {
    loadMarkdown();
  }, [file.url]);

  useEffect(() => {
    if (!containerRef.current || currentMarkdown === null) return;

    const crepe = new Crepe({
      root: containerRef.current,
      defaultValue: currentMarkdown,
      features: {
        [Crepe.Feature.CodeMirror]: true,
      },
    });

    // Initialize Yjs document and provider
    const yDoc = new Doc();
    const provider = new WebsocketProvider('ws://localhost:4000', file.url, yDoc);

    crepe.editor.use(collab);

    crepe.editor.create().then(() => {
      editorRef.current = crepe;

      // Wait for provider to sync before binding
      provider.once('sync', (isSynced: boolean) => {
        if (isSynced) {
          crepe.editor?.action((ctx) => {
            const collabService = ctx.get(collabServiceCtx);

            collabService
              .bindDoc(yDoc)
              .setAwareness(provider.awareness)
              .applyTemplate(currentMarkdown || '', () => {
                // Apply template only when the remote doc is empty
                return true;
              })
              .connect();
          });
        }
      });


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
      provider.destroy();
      yDoc.destroy();
      console.log('Editor destroyed');
    };
  }, [currentMarkdown]);

  useEffect(() => {
    if (editorRef.current && markdown !== undefined) {
      editorRef.current.editor?.action(replaceAll(markdown));
    }
  }, [markdown]);

  return <div ref={containerRef} className="min-h m-20 h-border border-gray-300 rounded p-2" />;
};

export default LiveEditor;
