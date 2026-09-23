import React, { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { Copy, Check, RotateCcw, Maximize2, Minimize2, ZoomIn, ZoomOut, Code2, FileText } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function CodeEditor({ 
  code, 
  onChange, 
  onReset,
  isMaximized = false,
  onToggleMaximize
}) {
  const { isDark } = useTheme();
  const editorRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const [useSimpleEditor, setUseSimpleEditor] = useState(false);
  const [cursorPos, setCursorPos] = useState({ line: 1, col: 1 });
  
  // Load saved preferences from Settings if available
  const savedSettings = (() => {
    try {
      return JSON.parse(localStorage.getItem('editor_settings')) || {};
    } catch {
      return {};
    }
  })();

  const [fontSize, setFontSize] = useState(parseInt(savedSettings.fontSize, 10) || 14);
  const [tabSize, setTabSize] = useState(parseInt(savedSettings.tabSize, 10) || 4);

  const handleCopy = () => {
    if (navigator.clipboard && code) {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    editor.focus();

    editor.onDidChangeCursorPosition((e) => {
      if (e && e.position) {
        setCursorPos({ line: e.position.lineNumber, col: e.position.column });
      }
    });

    // Layout automatically
    setTimeout(() => {
      editor.layout();
    }, 100);
  };

  const increaseFontSize = () => {
    setFontSize(prev => Math.min(prev + 1, 24));
  };

  const decreaseFontSize = () => {
    setFontSize(prev => Math.max(prev - 1, 11));
  };

  return (
    <div className="h-full w-full flex flex-col overflow-hidden bg-white dark:bg-[#1e1e1e]">
      {/* Upper Tab Bar: </> Code */}
      <div className="h-9 bg-[#f8f9fa] dark:bg-[#262626] px-3 border-b border-[#e2e4e8] dark:border-[#333333] flex items-center justify-between text-xs text-slate-700 dark:text-zinc-300 shrink-0 select-none">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-blue-700 dark:text-blue-400 bg-white dark:bg-[#1e1e1e] rounded-t border-t-2 border-blue-600 dark:border-blue-500 shadow-sm">
            <span className="text-blue-600 dark:text-blue-400 font-mono">&lt;/&gt;</span>
            Code
          </span>
        </div>

        <div className="flex items-center gap-1">
          {/* Toggle Simple Textarea Fallback */}
          <button
            type="button"
            onClick={() => setUseSimpleEditor(prev => !prev)}
            title={useSimpleEditor ? "Switch to Monaco Rich Editor" : "Switch to Simple Editor"}
            className="p-1 rounded hover:bg-slate-200 dark:hover:bg-[#383838] text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white transition-colors flex items-center gap-1 text-[11px]"
          >
            <FileText size={12} />
            <span className="hidden md:inline">{useSimpleEditor ? "Rich" : "Simple"}</span>
          </button>

          {/* Reset Code */}
          {onReset && (
            <button
              type="button"
              onClick={onReset}
              title="Reset to starter template"
              className="p-1 rounded hover:bg-slate-200 dark:hover:bg-[#383838] text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white transition-colors flex items-center gap-1 text-[11px]"
            >
              <RotateCcw size={12} />
              <span className="hidden lg:inline">Reset</span>
            </button>
          )}

          {/* Copy Code */}
          <button
            type="button"
            onClick={handleCopy}
            title="Copy code"
            className="p-1 rounded hover:bg-slate-200 dark:hover:bg-[#383838] text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white transition-colors flex items-center gap-1 text-[11px]"
          >
            {copied ? <Check size={12} className="text-blue-600 dark:text-blue-400" /> : <Copy size={12} />}
          </button>

          {/* Maximize / Restore */}
          {onToggleMaximize && (
            <button
              type="button"
              onClick={onToggleMaximize}
              title={isMaximized ? "Restore Layout" : "Maximize Editor"}
              className="p-1 rounded hover:bg-slate-200 dark:hover:bg-[#383838] text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
            >
              {isMaximized ? <Minimize2 size={12} /> : <Maximize2 size={12} />}
            </button>
          )}
        </div>
      </div>

      {/* Sub Toolbar: Language Selector */}
      <div className="h-8 bg-white dark:bg-[#1e1e1e] px-3 border-b border-[#e2e4e8] dark:border-[#2d2d2d] flex items-center justify-between text-xs text-slate-600 dark:text-zinc-400 shrink-0 select-none">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-[11px] font-medium text-slate-800 dark:text-zinc-200 bg-[#f0f2f5] hover:bg-slate-200 dark:bg-[#2d2d2d] dark:hover:bg-[#383838] px-2 py-0.5 rounded cursor-pointer transition-colors border border-[#e0e2e6] dark:border-transparent">
            <span>C++</span>
            <span className="text-[10px] text-slate-500 dark:text-zinc-400">▾</span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={decreaseFontSize}
            title="Decrease Font Size"
            className="px-1.5 py-0.5 rounded hover:bg-slate-100 dark:hover:bg-[#2d2d2d] text-slate-600 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white text-[10px]"
          >
            A-
          </button>
          <span className="text-[10px] font-mono text-slate-500 dark:text-zinc-500">
            {fontSize}px
          </span>
          <button
            type="button"
            onClick={increaseFontSize}
            title="Increase Font Size"
            className="px-1.5 py-0.5 rounded hover:bg-slate-100 dark:hover:bg-[#2d2d2d] text-slate-600 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white text-[10px]"
          >
            A+
          </button>
        </div>
      </div>

      {/* Editor Body */}
      <div 
        className="flex-1 relative overflow-hidden bg-white dark:bg-[#1e1e1e]"
        onClick={() => {
          if (editorRef.current && !useSimpleEditor) {
            editorRef.current.focus();
          }
        }}
      >
        {useSimpleEditor ? (
          <textarea
            value={code}
            onChange={(e) => onChange(e.target.value)}
            className="w-full h-full p-4 bg-white text-slate-900 dark:bg-[#1e1e1e] dark:text-zinc-100 font-mono resize-none focus:outline-none leading-relaxed border-none selection:bg-blue-500/25"
            style={{ fontSize: `${fontSize}px`, tabSize: tabSize }}
            spellCheck={false}
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
          />
        ) : (
          <Editor
            height="100%"
            defaultLanguage="cpp"
            language="cpp"
            theme={isDark ? "vs-dark" : "vs"}
            value={code}
            onChange={(value) => onChange(value || '')}
            onMount={handleEditorDidMount}
            options={{
              readOnly: false,
              domReadOnly: false,
              selectOnLineNumbers: true,
              roundedSelection: false,
              cursorStyle: 'line',
              cursorBlinking: 'smooth',
              automaticLayout: true,
              glyphMargin: false,
              tabSize: tabSize,
              fontSize: fontSize,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              wordWrap: 'on',
              lineNumbers: 'on',
              contextmenu: true,
              quickSuggestions: true,
              snippetSuggestions: 'inline',
              suggestOnTriggerCharacters: true,
              formatOnPaste: true,
              dragAndDrop: true,
              fontFamily: "'Fira Code', Consolas, 'Courier New', monospace"
            }}
          />
        )}
      </div>

      {/* Bottom Status Bar: Saved | Ln X, Col Y */}
      <div className="h-6 bg-[#f8f9fa] dark:bg-[#262626] px-3 border-t border-[#e2e4e8] dark:border-[#333333] flex items-center justify-between text-[11px] text-slate-500 dark:text-zinc-400 select-none shrink-0">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
          <span>Saved</span>
        </div>
        <div className="font-mono text-[10px] text-slate-500 dark:text-zinc-400">
          Ln {cursorPos.line}, Col {cursorPos.col}
        </div>
      </div>
    </div>
  );
}
