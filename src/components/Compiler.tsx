import React, { useState, useEffect, useRef } from 'react';
import * as monaco from 'monaco-editor';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

// Load Pyodide
const loadPyodide = async () => {
  const pyodide = await window.loadPyodide({
    indexURL: "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/"
  });
  
  // Set up stdout capture
  await pyodide.runPythonAsync(`
    import sys
    from io import StringIO
    sys.stdout = StringIO()
    sys.stderr = StringIO()
  `);
  
  return pyodide;
};

const Compiler = () => {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const monacoEl = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [output, setOutput] = useState<string>('');
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [stdin, setStdin] = useState('');
  const [pyodide, setPyodide] = useState<any>(null);
  const [isPyodideReady, setIsPyodideReady] = useState(false);

  // Initialize Pyodide
  useEffect(() => {
    const initPyodide = async () => {
      try {
        const pyodideInstance = await loadPyodide();
        setPyodide(pyodideInstance);
        setIsPyodideReady(true);
      } catch (error) {
        console.error('Failed to load Pyodide:', error);
        setOutput('Error: Failed to load Python interpreter. Please refresh the page.');
      }
    };
    initPyodide();
  }, []);

  useEffect(() => {
    if (monacoEl.current) {
      // Initialize Monaco Editor
      editorRef.current = monaco.editor.create(monacoEl.current, {
        value: '# Write your Python code here\nprint("Hello, World!")',
        language: 'python',
        theme: 'vs-dark',
        automaticLayout: true,
        minimap: { enabled: true },
        fontSize: 14,
        lineNumbers: 'on',
        scrollBeyondLastLine: false,
        padding: { top: 16, bottom: 16 },
        lineHeight: 24,
      });

      setIsEditorReady(true);

      return () => {
        editorRef.current?.dispose();
      };
    }
  }, []);

  const runCode = async () => {
    if (!editorRef.current || !pyodide) return;
    setIsLoading(true);
    setOutput('');

    try {
      const code = editorRef.current.getValue();
      
      // Reset stdout and stderr
      await pyodide.runPythonAsync(`
        sys.stdout = StringIO()
        sys.stderr = StringIO()
      `);
      
      // Set up stdin
      if (stdin) {
        const stdinLines = stdin.split('\n');
        let stdinIndex = 0;
        
        // Override input() function
        pyodide.globals.set('input', () => {
          if (stdinIndex < stdinLines.length) {
            return stdinLines[stdinIndex++];
          }
          return '';
        });
      }

      // Run the code
      await pyodide.runPythonAsync(code);
      
      // Get stdout and stderr
      const stdout = pyodide.runPython("sys.stdout.getvalue()");
      const stderr = pyodide.runPython("sys.stderr.getvalue()");
      
      // Combine stdout and stderr
      setOutput(stderr ? `Error:\n${stderr}` : stdout || '');
    } catch (error: any) {
      setOutput(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      {!isPyodideReady && (
        <div className="mb-4 p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded">
          Loading Python interpreter...
        </div>
      )}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          className="h-[600px] rounded-lg overflow-hidden shadow-lg border border-gray-700 flex flex-col"
        >
          <div className="bg-gray-800 px-4 py-2 flex justify-between items-center">
            <h3 className="text-white font-medium">Python Editor</h3>
            <Button
              onClick={runCode}
              disabled={isLoading || !isEditorReady || !isPyodideReady}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Running...
                </>
              ) : (
                'Run Code'
              )}
            </Button>
          </div>
          <div ref={monacoEl} className="flex-1" />
          <div className="bg-gray-900 px-4 py-2 border-t border-gray-700">
            <label className="block text-gray-300 text-sm mb-1" htmlFor="stdin-box">Standard Input</label>
            <textarea
              id="stdin-box"
              className="w-full rounded bg-gray-800 text-gray-100 p-2 text-sm resize-y min-h-[48px] max-h-[120px] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="Enter input for your code, each line as if typed in input()..."
              value={stdin}
              onChange={e => setStdin(e.target.value)}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="h-[600px] rounded-lg overflow-hidden shadow-lg border border-gray-700"
        >
          <div className="bg-gray-800 px-4 py-2">
            <h3 className="text-white font-medium">Output</h3>
          </div>
          <Card className="h-[calc(100%-48px)] bg-gray-900 p-4 overflow-auto">
            <pre className="text-gray-200 font-mono text-sm whitespace-pre-wrap">
              {output || 'Output will appear here...'}
            </pre>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Compiler;