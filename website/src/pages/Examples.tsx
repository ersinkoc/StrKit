import Sidebar from '../components/layout/Sidebar'
import Footer from '../components/layout/Footer'

const sidebarSections = [
  {
    title: 'Getting Started',
    links: [
      { to: '/docs', label: 'Introduction' },
      { to: '/docs/examples', label: 'Examples' },
      { to: '/docs/playground', label: 'Playground' },
    ],
  },
]

const examples = [
  {
    title: 'Form Validation',
    description: 'Validate user input with built-in validators',
    code: `import { str } from '@oxog/strkit';

// Validate email
str.validate.email('user@example.com'); // true

// Validate URL
str.validate.url('https://strkit.oxog.dev'); // true

// Validate UUID
str.validate.uuid('550e8400-e29b-41d4-a716-446655440000'); // true

// Validate credit card
str.validate.creditCard('4111111111111111'); // true`,
  },
  {
    title: 'Text Processing',
    description: 'Transform and manipulate text content',
    code: `import { S } from '@oxog/strkit';

// Clean and format user input
const result = S('  Hello World  ')
  .trim()
  .toLowerCase()
  .replace(/world/g, 'StrKit')
  .capitalize()
  .value;
// 'Hello strkit'

// Truncate long text
S('This is a very long text...').truncate(20).value;
// 'This is a very lo...'`,
  },
  {
    title: 'Case Conversion',
    description: 'Convert between different naming conventions',
    code: `import { str } from '@oxog/strkit';

const input = 'hello world example';

str.case.camel(input);    // 'helloWorldExample'
str.case.pascal(input);   // 'HelloWorldExample'
str.case.kebab(input);    // 'hello-world-example'
str.case.snake(input);    // 'hello_world_example'
str.case.constant(input); // 'HELLO_WORLD_EXAMPLE'
str.case.title(input);    // 'Hello World Example'`,
  },
  {
    title: 'String Similarity',
    description: 'Compare strings and find similarities',
    code: `import { str } from '@oxog/strkit';

// Levenshtein distance
str.similarity.levenshtein('kitten', 'sitting'); // 3

// Dice coefficient
str.similarity.dice('night', 'nacht'); // 0.25

// Jaro-Winkler similarity
str.similarity.jaroWinkler('MARTHA', 'MARHTA'); // 0.961

// Fuzzy search
str.search.fuzzy('hello', ['helo', 'world', 'help']);
// ['helo', 'help']`,
  },
  {
    title: 'Text Formatting',
    description: 'Format strings with templates and masks',
    code: `import { str } from '@oxog/strkit';

// Template formatting
str.format.template('Hello, {name}!', { name: 'World' });
// 'Hello, World!'

// Mask sensitive data
str.format.mask('4111111111111111', { show: 4 });
// '************1111'

// Number formatting
str.format.number(1234567.89, { locale: 'en-US' });
// '1,234,567.89'`,
  },
  {
    title: 'Diff & Patch',
    description: 'Compare and patch text differences',
    code: `import { str } from '@oxog/strkit';

const oldText = 'Hello World';
const newText = 'Hello StrKit';

// Get character diff
const diff = str.diff.chars(oldText, newText);
// Shows removed 'World' and added 'StrKit'

// Get word diff
const wordDiff = str.diff.words(oldText, newText);

// Create unified patch
const patch = str.diff.unified(oldText, newText);`,
  },
  {
    title: 'Sanitization',
    description: 'Clean and sanitize user input',
    code: `import { str } from '@oxog/strkit';

// Remove HTML tags
str.sanitize.html('<script>alert("xss")</script>Hello');
// 'Hello'

// Escape HTML entities
str.sanitize.escape('<div>Hello</div>');
// '&lt;div&gt;Hello&lt;/div&gt;'

// Remove extra whitespace
str.sanitize.whitespace('Hello   World');
// 'Hello World'

// Create URL slug
str.sanitize.slug('Hello World! @#$');
// 'hello-world'`,
  },
  {
    title: 'i18n Support',
    description: 'Locale-aware string operations',
    code: `import { str } from '@oxog/strkit';

// Turkish locale (special i/I handling)
str.case.upper('istanbul', { locale: 'tr' });
// 'İSTANBUL'

str.case.lower('ISTANBUL', { locale: 'tr' });
// 'ıstanbul'

// German locale
str.case.upper('straße', { locale: 'de' });
// 'STRASSE'`,
  },
]

export default function Examples() {
  return (
    <div className="flex pt-16">
      <Sidebar sections={sidebarSections} />

      <main className="flex-1 lg:ml-72 min-h-screen">
        <div className="max-w-4xl mx-auto px-6 py-12 lg:py-16">
          {/* Header */}
          <header className="mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">Examples</h1>
            <p className="text-xl text-gray-400 leading-relaxed">
              Real-world usage patterns and recipes for common string manipulation tasks.
            </p>
          </header>

          {/* Examples */}
          <div className="space-y-12">
            {examples.map((example, index) => (
              <section key={index} className="method-card p-6">
                <h2 className="text-2xl font-bold mb-2">{example.title}</h2>
                <p className="text-gray-400 mb-6">{example.description}</p>
                <div className="code-block">
                  <div className="code-header">
                    <span className="text-gray-400 text-sm font-medium">Example</span>
                  </div>
                  <pre className="p-5 font-mono text-sm leading-relaxed overflow-x-auto">
                    <code>
                      {example.code.split('\n').map((line, i) => (
                        <span key={i}>
                          {highlightLine(line)}
                          {i < example.code.split('\n').length - 1 && '\n'}
                        </span>
                      ))}
                    </code>
                  </pre>
                </div>
              </section>
            ))}
          </div>
        </div>

        <Footer />
      </main>
    </div>
  )
}

function highlightLine(line: string): React.ReactNode {
  const parts: React.ReactNode[] = []
  let remaining = line
  let key = 0
  const keywords = ['import', 'from', 'const', 'let', 'var', 'function', 'return']
  let currentIndex = 0

  while (currentIndex < remaining.length) {
    let matched = false

    for (const keyword of keywords) {
      if (remaining.slice(currentIndex).startsWith(keyword) &&
          (currentIndex === 0 || /\s/.test(remaining[currentIndex - 1])) &&
          (currentIndex + keyword.length === remaining.length || /[\s{(;]/.test(remaining[currentIndex + keyword.length]))) {
        parts.push(<span key={key++} className="token-keyword">{keyword}</span>)
        currentIndex += keyword.length
        matched = true
        break
      }
    }

    if (matched) continue

    if (remaining[currentIndex] === "'" || remaining[currentIndex] === '"') {
      const quote = remaining[currentIndex]
      let end = currentIndex + 1
      while (end < remaining.length && remaining[end] !== quote) end++
      end++
      parts.push(<span key={key++} className="token-string">{remaining.slice(currentIndex, end)}</span>)
      currentIndex = end
      continue
    }

    if (remaining.slice(currentIndex, currentIndex + 2) === '//') {
      parts.push(<span key={key++} className="token-comment">{remaining.slice(currentIndex)}</span>)
      break
    }

    const funcMatch = remaining.slice(currentIndex).match(/^(\w+)\(/)
    if (funcMatch && !keywords.includes(funcMatch[1])) {
      parts.push(<span key={key++} className="token-function">{funcMatch[1]}</span>)
      currentIndex += funcMatch[1].length
      continue
    }

    const numMatch = remaining.slice(currentIndex).match(/^\d+/)
    if (numMatch) {
      parts.push(<span key={key++} className="token-number">{numMatch[0]}</span>)
      currentIndex += numMatch[0].length
      continue
    }

    parts.push(remaining[currentIndex])
    currentIndex++
  }

  return parts
}
