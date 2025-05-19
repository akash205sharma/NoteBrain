// components/RunCodeBlock.tsx
'use client';

import { useState } from 'react';

export const RunCodeBlock = ({ code, language }: { code: string; language: string }) => {
  const [output, setOutput] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const runCode = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language }),
      });
      const data = await res.json();
      setOutput(data.output || 'No output');
    } catch (err) {
      setOutput('Error running code');
    }
    setLoading(false);
  };

  return (
    <div className="bg-zinc-900 text-white p-4 rounded-md my-4">
      <pre className="whitespace-pre-wrap">{code}</pre>
      <button
        onClick={runCode}
        className="mt-2 px-4 py-1 bg-green-600 hover:bg-green-700 rounded text-white"
      >
        {loading ? 'Running...' : 'Run Code'}
      </button>
      {output && (
        <div className="mt-3 bg-black p-3 text-green-300 rounded">
          <strong>Output:</strong>
          <pre>{output}</pre>
        </div>
      )}
    </div>
  );
};
