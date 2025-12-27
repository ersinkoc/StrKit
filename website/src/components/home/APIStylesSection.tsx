const apiStyles = [
  {
    name: 'Namespace API',
    color: 'bg-primary-500',
    textColor: 'text-primary-400',
    hoverColor: 'hover:border-primary-500/50',
    badge: 'str.category.method()',
    code: `import { str } from '@oxog/strkit';

str.case.camel('hello world');
str.validate.email('a@b.com');
str.manipulation.truncate(text, 100);`,
  },
  {
    name: 'Chainable API',
    color: 'bg-green-500',
    textColor: 'text-green-400',
    hoverColor: 'hover:border-green-500/50',
    badge: 'S(input).method().value',
    code: `import { S } from '@oxog/strkit';

S('  hello world  ')
  .trim().camelCase()
  .truncate(10).value;`,
  },
  {
    name: 'Direct Import',
    color: 'bg-yellow-500',
    textColor: 'text-yellow-400',
    hoverColor: 'hover:border-yellow-500/50',
    badge: 'import { method }',
    code: `import { camelCase, isEmail } from '@oxog/strkit';

camelCase('hello world');
isEmail('user@example.com');`,
  },
  {
    name: 'Plugin System',
    color: 'bg-purple-500',
    textColor: 'text-purple-400',
    hoverColor: 'hover:border-purple-500/50',
    badge: 'Extensible',
    code: `import { registerPlugin } from '@oxog/strkit';

registerPlugin({
  name: 'custom',
  methods: { ... }
});`,
  },
]

export default function APIStylesSection() {
  return (
    <section className="py-24 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/50 to-transparent" />
      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">4 API Styles</h2>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            Choose the style that fits your codebase. All styles work with the same methods.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {apiStyles.map((style) => (
            <div
              key={style.name}
              className={`code-block rounded-2xl overflow-hidden ${style.hoverColor} transition-all duration-300 glow-hover`}
            >
              <div className="px-5 py-4 border-b border-gray-800 flex items-center justify-between bg-gray-900/50">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${style.color}`} />
                  <span className={`font-semibold ${style.textColor}`}>{style.name}</span>
                </div>
                <span className="text-xs text-gray-500 font-mono bg-gray-800/50 px-2 py-1 rounded">
                  {style.badge}
                </span>
              </div>
              <pre className="p-5 font-mono text-sm">
                <code>
                  {style.code.split('\n').map((line, i) => (
                    <span key={i}>
                      {highlightLine(line)}
                      {i < style.code.split('\n').length - 1 && '\n'}
                    </span>
                  ))}
                </code>
              </pre>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function highlightLine(line: string): React.ReactNode {
  // Simple syntax highlighting
  const parts: React.ReactNode[] = []
  let remaining = line
  let key = 0

  // Keywords
  const keywords = ['import', 'from', 'const', 'let', 'var', 'function', 'return']

  // Process the line character by character for simple highlighting
  let currentIndex = 0

  while (currentIndex < remaining.length) {
    let matched = false

    // Check for keywords
    for (const keyword of keywords) {
      if (remaining.slice(currentIndex).startsWith(keyword) &&
          (currentIndex === 0 || /\s/.test(remaining[currentIndex - 1])) &&
          (currentIndex + keyword.length === remaining.length || /[\s{(]/.test(remaining[currentIndex + keyword.length]))) {
        parts.push(<span key={key++} className="token-keyword">{keyword}</span>)
        currentIndex += keyword.length
        matched = true
        break
      }
    }

    if (matched) continue

    // Check for strings
    if (remaining[currentIndex] === "'" || remaining[currentIndex] === '"') {
      const quote = remaining[currentIndex]
      let end = currentIndex + 1
      while (end < remaining.length && remaining[end] !== quote) end++
      end++ // include closing quote
      parts.push(<span key={key++} className="token-string">{remaining.slice(currentIndex, end)}</span>)
      currentIndex = end
      continue
    }

    // Check for comments
    if (remaining.slice(currentIndex, currentIndex + 2) === '//') {
      parts.push(<span key={key++} className="token-comment">{remaining.slice(currentIndex)}</span>)
      break
    }

    // Check for function calls (word followed by parenthesis)
    const funcMatch = remaining.slice(currentIndex).match(/^(\w+)\(/)
    if (funcMatch && !keywords.includes(funcMatch[1])) {
      parts.push(<span key={key++} className="token-function">{funcMatch[1]}</span>)
      currentIndex += funcMatch[1].length
      continue
    }

    // Check for numbers
    const numMatch = remaining.slice(currentIndex).match(/^\d+/)
    if (numMatch) {
      parts.push(<span key={key++} className="token-number">{numMatch[0]}</span>)
      currentIndex += numMatch[0].length
      continue
    }

    // Default: just add the character
    parts.push(remaining[currentIndex])
    currentIndex++
  }

  return parts
}
