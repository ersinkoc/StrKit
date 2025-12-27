import { useState, ReactNode } from 'react'
import { Copy, Check } from 'lucide-react'

interface CodeBlockProps {
  children: ReactNode
  code: string
  filename?: string
  showCopyButton?: boolean
}

export default function CodeBlock({
  children,
  code,
  filename,
  showCopyButton = true,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="code-block">
      {(filename || showCopyButton) && (
        <div className="code-header">
          <span className="text-gray-400 text-sm font-medium font-mono">
            {filename || 'Example'}
          </span>
          {showCopyButton && (
            <button
              onClick={copyToClipboard}
              className={`copy-btn ${copied ? 'copied' : ''}`}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          )}
        </div>
      )}
      <pre className="p-5 overflow-x-auto font-mono text-sm leading-relaxed">
        <code>{children}</code>
      </pre>
    </div>
  )
}

// Helper components for syntax highlighting
export const Keyword = ({ children }: { children: ReactNode }) => (
  <span className="token-keyword">{children}</span>
)

export const String = ({ children }: { children: ReactNode }) => (
  <span className="token-string">{children}</span>
)

export const Func = ({ children }: { children: ReactNode }) => (
  <span className="token-function">{children}</span>
)

export const Comment = ({ children }: { children: ReactNode }) => (
  <span className="token-comment">{children}</span>
)

export const Num = ({ children }: { children: ReactNode }) => (
  <span className="token-number">{children}</span>
)

export const Prop = ({ children }: { children: ReactNode }) => (
  <span className="token-property">{children}</span>
)
