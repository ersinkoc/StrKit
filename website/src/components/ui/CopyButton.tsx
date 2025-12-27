import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

interface CopyButtonProps {
  text: string
  className?: string
}

export default function CopyButton({ text, className = '' }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={copyToClipboard}
      className={`p-2 hover:bg-white/10 rounded-lg transition-all duration-200 group ${className}`}
    >
      {copied ? (
        <Check className="w-5 h-5 text-green-400" />
      ) : (
        <Copy className="w-5 h-5 text-gray-400 group-hover:text-white transition" />
      )}
    </button>
  )
}
