import { useState, useEffect, useRef, useCallback } from 'react'
import Editor from '@monaco-editor/react'
import { Play, Share2, RotateCcw, Clock, Check, X, GripVertical } from 'lucide-react'

const defaultCode = `// Welcome to StrKit Playground!
// Try the string manipulation methods below

import { str, S } from '@oxog/strkit';

// Case conversion
console.log('camelCase:', str.case.camel('hello world'));
console.log('kebabCase:', str.case.kebab('helloWorld'));
console.log('snakeCase:', str.case.snake('Hello World'));

// Validation
console.log('isEmail:', str.validate.email('user@example.com'));
console.log('isURL:', str.validate.url('https://strkit.oxog.dev'));

// Chainable API
const result = S('  Hello World  ')
  .trim()
  .camelCase()
  .truncate(10)
  .value;

console.log('Chained result:', result);

// Similarity
console.log('Levenshtein:', str.similarity.levenshtein('kitten', 'sitting'));
`

export default function Playground() {
  const [code, setCode] = useState(defaultCode)
  const [output, setOutput] = useState<string[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [executionTime, setExecutionTime] = useState<number | null>(null)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  const [leftWidth, setLeftWidth] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const isResizing = useRef(false)

  // Load code from URL query param on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const codeParam = params.get('code')
    if (codeParam) {
      try {
        const decoded = decodeURIComponent(atob(codeParam))
        setCode(decoded)
      } catch {
        // Invalid code param, use default code
      }
    }
  }, [])

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  const runCode = useCallback(async () => {
    setIsRunning(true)
    setOutput([])
    const logs: string[] = []
    const startTime = performance.now()

    try {
      // Create a custom console to capture logs
      const customConsole = {
        log: (...args: unknown[]) => {
          logs.push(args.map(arg =>
            typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
          ).join(' '))
        },
        error: (...args: unknown[]) => {
          logs.push(`[Error] ${args.map(arg => String(arg)).join(' ')}`)
        },
        warn: (...args: unknown[]) => {
          logs.push(`[Warn] ${args.map(arg => String(arg)).join(' ')}`)
        },
      }

      // Remove import statements and create executable code
      const executableCode = code
        .replace(/import\s+.*?from\s+['"]@oxog\/strkit['"];?/g, '')
        .replace(/import\s+.*?from\s+['"].*?['"];?/g, '')

      // Load strkit from the dist folder
      // @ts-expect-error - Dynamic import from public folder
      const strkit = await import('/dist/index.mjs') as { str: unknown; S: unknown }

      // Create function with strkit in scope
      const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor
      const fn = new AsyncFunction(
        'console', 'str', 'S', 'strkit',
        executableCode
      )

      await fn(customConsole, strkit.str, strkit.S, strkit)

      const endTime = performance.now()
      setExecutionTime(endTime - startTime)
      setOutput(logs.length > 0 ? logs : ['// No output'])
    } catch (error) {
      const endTime = performance.now()
      setExecutionTime(endTime - startTime)
      setOutput([`Error: ${error instanceof Error ? error.message : String(error)}`])
    } finally {
      setIsRunning(false)
    }
  }, [code])

  const shareCode = async () => {
    const encoded = btoa(encodeURIComponent(code))
    const url = `${window.location.origin}${window.location.pathname}?code=${encoded}${window.location.hash}`
    await navigator.clipboard.writeText(url)
    showToast('Link copied to clipboard!', 'success')
  }

  const resetCode = () => {
    setCode(defaultCode)
    setOutput([])
    setExecutionTime(null)
    // Clear the code param from URL while preserving the hash route
    const url = new URL(window.location.href)
    url.searchParams.delete('code')
    window.history.replaceState({}, '', url.toString())
  }

  // Handle resize
  const handleMouseDown = () => {
    isResizing.current = true
    document.body.style.cursor = 'col-resize'
    document.body.style.userSelect = 'none'
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing.current || !containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const newWidth = ((e.clientX - rect.left) / rect.width) * 100
      setLeftWidth(Math.min(Math.max(newWidth, 30), 70))
    }

    const handleMouseUp = () => {
      isResizing.current = false
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  // Handle keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault()
        runCode()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [runCode])

  return (
    <div className="pt-16 h-screen flex flex-col">
      {/* Toolbar */}
      <div className="glass border-b border-gray-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={runCode}
            disabled={isRunning}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-500 disabled:bg-green-800 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-all"
          >
            <Play className="w-4 h-4" />
            {isRunning ? 'Running...' : 'Run'}
          </button>
          <button
            onClick={shareCode}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg transition-all"
          >
            <Share2 className="w-4 h-4" />
            Share
          </button>
          <button
            onClick={resetCode}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-400">
          {executionTime !== null && (
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {executionTime.toFixed(2)}ms
            </div>
          )}
          <span className="hidden sm:block">Ctrl+Enter to run</span>
        </div>
      </div>

      {/* Editor and Output */}
      <div ref={containerRef} className="flex-1 flex overflow-hidden">
        {/* Editor Panel */}
        <div style={{ width: `${leftWidth}%` }} className="h-full">
          <Editor
            height="100%"
            defaultLanguage="typescript"
            value={code}
            onChange={(value) => setCode(value || '')}
            theme="vs-dark"
            options={{
              fontSize: 14,
              fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              padding: { top: 16, bottom: 16 },
              lineNumbers: 'on',
              renderLineHighlight: 'line',
              cursorBlinking: 'smooth',
              tabSize: 2,
            }}
          />
        </div>

        {/* Resizer */}
        <div
          onMouseDown={handleMouseDown}
          className="w-2 bg-gray-800 hover:bg-primary-600 cursor-col-resize flex items-center justify-center transition-colors group"
        >
          <GripVertical className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
        </div>

        {/* Output Panel */}
        <div style={{ width: `${100 - leftWidth}%` }} className="h-full bg-[#0d1117] border-l border-gray-800 flex flex-col">
          <div className="px-4 py-3 border-b border-gray-800 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-400">Output</span>
            {output.length > 0 && (
              <button
                onClick={() => setOutput([])}
                className="text-gray-500 hover:text-white transition"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <div className="flex-1 overflow-auto p-4 font-mono text-sm">
            {output.length === 0 ? (
              <div className="text-gray-500">
                Click "Run" or press Ctrl+Enter to execute code
              </div>
            ) : (
              output.map((line, i) => (
                <div
                  key={i}
                  className={`py-1 ${
                    line.startsWith('Error:') || line.startsWith('[Error]')
                      ? 'text-red-400'
                      : line.startsWith('[Warn]')
                      ? 'text-yellow-400'
                      : 'text-gray-300'
                  }`}
                >
                  {line}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div
          className={`toast ${toast.type === 'success' ? 'border-green-500/50' : 'border-red-500/50'}`}
        >
          <div className="flex items-center gap-2">
            {toast.type === 'success' ? (
              <Check className="w-5 h-5 text-green-400" />
            ) : (
              <X className="w-5 h-5 text-red-400" />
            )}
            {toast.message}
          </div>
        </div>
      )}
    </div>
  )
}
