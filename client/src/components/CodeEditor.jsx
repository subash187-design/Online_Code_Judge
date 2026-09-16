import React from 'react';
import Editor from '@monaco-editor/react';

export default function CodeEditor({ code, onChange }) {
  return (
    <div className="h-full w-full rounded-lg overflow-hidden border border-slate-800 bg-[#1e1e1e]">
      <Editor
        height="100%"
        defaultLanguage="cpp"
        language="cpp"
        theme="vs-dark"
        value={code}
        onChange={onChange}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          tabSize: 4,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          fontFamily: "'Fira Code', Consolas, 'Courier New', monospace"
        }}
      />
    </div>
  );
}
