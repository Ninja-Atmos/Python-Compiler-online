import React, { useState, useEffect, useRef } from 'react';
import { Play, Download, Copy, Trash2, Sparkles } from 'lucide-react';
import MonacoEditor from '@monaco-editor/react';
// import CodeWallpaper from './CodeWallpaper'; // Removed for performance

const Editor = () => {
  const [code, setCode] = useState('# Write your Python code here\nprint("Hello, World!")');
  const [output, setOutput] = useState('');
  const [userInput, setUserInput] = useState(''); // For stdin
  const [isLoading, setIsLoading] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const pyodideRef = useRef<any>(null); // Store Pyodide instance globally for this session

  useEffect(() => {
    let isMounted = true;
    const loadPyodideInstance = async () => {
      if (pyodideRef.current) return; // Already loaded
      setIsLoading(true);
      try {
        if (!(window as any).loadPyodide) {
          await new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js';
            script.onload = resolve;
            script.onerror = reject;
            document.body.appendChild(script);
          });
        }
        const pyodideInstance = await (window as any).loadPyodide({
          indexURL: "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/"
        });
        await pyodideInstance.runPythonAsync(`
          import sys
          from io import StringIO
          sys.stdout = StringIO()
        `);
        if (isMounted) pyodideRef.current = pyodideInstance;
      } catch (error) {
        if (isMounted) setOutput("Error: Could not load Python interpreter");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    loadPyodideInstance();
    return () => { isMounted = false; };
  }, []);

  const handleRunCode = async () => {
    const pyodide = pyodideRef.current;
    if (!pyodide) {
      setOutput("Python interpreter is not ready yet. Please wait...");
      return;
    }
    try {
      setIsRunning(true);
      setOutput('');
      await pyodide.runPythonAsync(
        `import sys\nfrom io import StringIO\nsys.stdout = StringIO()\nsys.stdin = StringIO('''${userInput.replace(/'/g, "''")}''')`
      );
      await pyodide.runPythonAsync(code);
      const stdout = await pyodide.runPythonAsync("sys.stdout.getvalue()");
      setOutput(stdout || '');
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    } catch (error: any) {
      setOutput(`Error: ${error.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const handleClearCode = () => {
    setCode('');
    setOutput('');
    setUserInput('');
  };

  const handleDownloadCode = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'python_code.py';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900/95 via-blue-900/95 to-slate-800/95 text-white p-2 sm:p-4 relative">
      {/* <CodeWallpaper /> Removed for performance */}
      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Code Editor */}
          <div className="bg-slate-800/80 rounded-lg p-2 sm:p-4 backdrop-blur-sm transform transition-all duration-300 hover:shadow-2xl border border-slate-700/50 mb-4 lg:mb-0">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 sm:mb-4 gap-2">
              <h2 className="text-lg sm:text-xl font-semibold flex items-center">
                <Sparkles className="w-5 h-5 mr-2 text-yellow-400 animate-pulse" />
                Code Editor
              </h2>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={handleRunCode}
                  disabled={isLoading || isRunning}
                  className={`flex items-center px-3 py-1 rounded transition-all duration-300 transform hover:scale-105 text-sm sm:text-base ${
                    isLoading || isRunning
                      ? 'bg-gray-600 cursor-not-allowed'
                      : 'bg-green-600 hover:bg-green-700 hover:shadow-lg'
                  }`}
                >
                  <Play className={`w-4 h-4 mr-1 ${isRunning ? 'animate-spin' : ''}`} />
                  {isLoading ? 'Loading...' : isRunning ? 'Running...' : 'Run'}
                </button>
                <button
                  onClick={handleCopyCode}
                  className="flex items-center px-3 py-1 bg-blue-600 rounded hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-sm sm:text-base"
                >
                  <Copy className="w-4 h-4 mr-1" />
                  Copy
                </button>
                <button
                  onClick={handleDownloadCode}
                  className="flex items-center px-3 py-1 bg-purple-600 rounded hover:bg-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-sm sm:text-base"
                >
                  <Download className="w-4 h-4 mr-1" />
                  Download
                </button>
                <button
                  onClick={handleClearCode}
                  className="flex items-center px-3 py-1 bg-red-600 rounded hover:bg-red-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-sm sm:text-base"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Clear
                </button>
              </div>
            </div>
            <div className="w-full h-64 sm:h-[400px] md:h-[500px]">
              <MonacoEditor
                height="100%"
                defaultLanguage="python"
                theme="vs-dark"
                value={code}
                onChange={value => setCode(value || '')}
                options={{
                  fontSize: 14,
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  wordWrap: 'on',
                  fontFamily: 'Fira Mono, monospace',
                  automaticLayout: true,
                  lineNumbers: 'on',
                  tabSize: 4,
                  formatOnType: true,
                  formatOnPaste: true,
                  suggestOnTriggerCharacters: true,
                  quickSuggestions: true,
                  autoClosingBrackets: 'always',
                  autoClosingQuotes: 'always',
                  cursorBlinking: 'smooth',
                  smoothScrolling: true,
                }}
              />
            </div>
            {/* User Input (stdin) */}
            <div className="mt-3 sm:mt-4">
              <label htmlFor="user-input" className="block text-gray-300 mb-1 font-medium text-sm sm:text-base">User Input (for input()):</label>
              <textarea
                id="user-input"
                value={userInput}
                onChange={e => setUserInput(e.target.value)}
                className="w-full h-16 sm:h-20 bg-slate-900/90 text-white p-2 rounded font-mono resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-sm sm:text-base"
                placeholder="Enter input for your code, each line for each input() call"
                spellCheck="false"
              />
            </div>
          </div>

          {/* Output */}
          <div className="bg-slate-800/80 rounded-lg p-2 sm:p-4 backdrop-blur-sm transform transition-all duration-300 hover:shadow-2xl border border-slate-700/50">
            <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 flex items-center">
              <Sparkles className="w-5 h-5 mr-2 text-yellow-400 animate-pulse" />
              Output
            </h2>
            <pre className="w-full h-64 sm:h-[400px] md:h-[500px] bg-slate-900/90 text-white p-2 sm:p-4 rounded font-mono overflow-auto whitespace-pre-wrap transition-all duration-300 flex items-center justify-center text-sm sm:text-base">
              {isLoading ? (
                <div className="flex items-center justify-center w-full h-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mr-3"></div>
                  <span className="text-blue-300 text-lg">Loading Python...</span>
                </div>
              ) : (
                output || 'Run your code to see the output here...'
              )}
            </pre>
          </div>
        </div>

        {/* Success Animation */}
        {showSuccess && (
          <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-lg transform transition-all duration-300 animate-bounce text-sm sm:text-base">
            <div className="flex items-center">
              <Sparkles className="w-5 h-5 mr-2 animate-pulse" />
              Operation successful!
            </div>
          </div>
        )}

        {/* Running Animation */}
        {isRunning && (
          <div className="fixed top-4 right-4 bg-blue-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-lg transform transition-all duration-300 text-sm sm:text-base">
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
              Running code...
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Editor; 