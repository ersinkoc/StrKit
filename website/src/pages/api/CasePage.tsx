import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, MessageSquare } from 'lucide-react'
import Sidebar from '../../components/layout/Sidebar'
import Footer from '../../components/layout/Footer'

const sidebarSections = [
  {
    title: 'API Reference',
    links: [
      { to: '/docs/api', label: 'Overview' },
      { to: '/docs/api/case', label: 'Case', color: '#60a5fa' },
      { to: '/docs/api/manipulation', label: 'Manipulation', color: '#4ade80' },
      { to: '/docs/api/validation', label: 'Validation', color: '#a78bfa' },
      { to: '/docs/api/sanitization', label: 'Sanitization', color: '#fb923c' },
      { to: '/docs/api/formatting', label: 'Formatting', color: '#f472b6' },
      { to: '/docs/api/similarity', label: 'Similarity', color: '#22d3ee' },
      { to: '/docs/api/analysis', label: 'Analysis', color: '#facc15' },
      { to: '/docs/api/pluralization', label: 'Pluralization', color: '#f87171' },
      { to: '/docs/api/diff', label: 'Diff', color: '#818cf8' },
      { to: '/docs/api/search', label: 'Search', color: '#34d399' },
    ],
  },
]

const tocLinks = [
  { id: 'camelCase', label: 'camelCase' },
  { id: 'kebabCase', label: 'kebabCase' },
  { id: 'snakeCase', label: 'snakeCase' },
  { id: 'pascalCase', label: 'pascalCase' },
  { id: 'titleCase', label: 'titleCase' },
  { id: 'upper', label: 'upper / lower' },
  { id: 'constantCase', label: 'constantCase' },
  { id: 'all-methods', label: 'All Methods' },
]

const methods = [
  { name: 'camel', description: 'camelCase', example: "'helloWorld'" },
  { name: 'kebab', description: 'kebab-case', example: "'hello-world'" },
  { name: 'snake', description: 'snake_case', example: "'hello_world'" },
  { name: 'pascal', description: 'PascalCase', example: "'HelloWorld'" },
  { name: 'title', description: 'Title Case', example: "'Hello World'" },
  { name: 'sentence', description: 'Sentence case', example: "'Hello world'" },
  { name: 'constant', description: 'CONSTANT_CASE', example: "'HELLO_WORLD'" },
  { name: 'dot', description: 'dot.case', example: "'hello.world'" },
  { name: 'path', description: 'path/case', example: "'hello/world'" },
  { name: 'header', description: 'Header-Case', example: "'Hello-World'" },
  { name: 'swap', description: 'sWAP cASE', example: "'hELLO wORLD'" },
  { name: 'upper', description: 'UPPERCASE', example: "'HELLO'" },
  { name: 'lower', description: 'lowercase', example: "'hello'" },
  { name: 'capitalize', description: 'Capitalize first letter', example: "'Hello'" },
]

export default function CasePage() {
  return (
    <div className="flex pt-16">
      <Sidebar sections={sidebarSections} tocLinks={tocLinks} />

      <main className="flex-1 lg:ml-72 min-h-screen">
        <div className="max-w-4xl mx-auto px-6 py-12 lg:py-16">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <Link to="/" className="hover:text-white transition">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/docs/api" className="hover:text-white transition">API</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-300">Case</span>
          </nav>

          {/* Header */}
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold">Case Conversion</h1>
                <p className="text-gray-400">str.case namespace</p>
              </div>
            </div>
            <p className="text-xl text-gray-400 leading-relaxed">
              14 methods for transforming string case with full locale support for proper internationalization.
            </p>
          </header>

          {/* Quick Import */}
          <div className="mb-12 p-4 bg-gray-900/50 border border-gray-800 rounded-xl">
            <p className="text-sm text-gray-400 mb-3">Quick Import:</p>
            <div className="code-block">
              <pre className="p-4 font-mono text-sm">
                <code>
                  <span className="token-keyword">import</span> {'{'} str {'}'} <span className="token-keyword">from</span> <span className="token-string">'@oxog/strkit'</span>;{'\n'}
                  <span className="token-comment">// Use: str.case.camel('hello world')</span>{'\n'}
                  {'\n'}
                  <span className="token-comment">// Or direct import:</span>{'\n'}
                  <span className="token-keyword">import</span> {'{'} camelCase, kebabCase {'}'} <span className="token-keyword">from</span> <span className="token-string">'@oxog/strkit'</span>;
                </code>
              </pre>
            </div>
          </div>

          {/* Methods */}
          <div className="space-y-12">
            {/* camelCase */}
            <section id="camelCase" className="method-card p-6 scroll-mt-24">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-2xl font-bold">camelCase</h2>
                <span className="method-badge bg-blue-500/20 text-blue-400">str.case.camel</span>
              </div>
              <p className="text-gray-400 mb-6">
                Converts a string to camelCase format. First word is lowercase, subsequent words are capitalized.
              </p>
              <div className="code-block">
                <div className="code-header">
                  <span className="text-gray-400 text-sm font-medium">Example</span>
                </div>
                <pre className="p-5 font-mono text-sm">
                  <code>
                    <span className="token-comment">// Namespace API</span>{'\n'}
                    str.case.<span className="token-function">camel</span>(<span className="token-string">'hello world'</span>);      <span className="token-comment">// 'helloWorld'</span>{'\n'}
                    str.case.<span className="token-function">camel</span>(<span className="token-string">'foo-bar-baz'</span>);      <span className="token-comment">// 'fooBarBaz'</span>{'\n'}
                    str.case.<span className="token-function">camel</span>(<span className="token-string">'FOO_BAR'</span>);          <span className="token-comment">// 'fooBar'</span>{'\n'}
                    {'\n'}
                    <span className="token-comment">// Direct import</span>{'\n'}
                    <span className="token-keyword">import</span> {'{'} camelCase {'}'} <span className="token-keyword">from</span> <span className="token-string">'@oxog/strkit'</span>;{'\n'}
                    <span className="token-function">camelCase</span>(<span className="token-string">'hello world'</span>);           <span className="token-comment">// 'helloWorld'</span>{'\n'}
                    {'\n'}
                    <span className="token-comment">// Chainable API</span>{'\n'}
                    <span className="token-function">S</span>(<span className="token-string">'hello world'</span>).<span className="token-function">camelCase</span>().value; <span className="token-comment">// 'helloWorld'</span>
                  </code>
                </pre>
              </div>
            </section>

            {/* kebabCase */}
            <section id="kebabCase" className="method-card p-6 scroll-mt-24">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-2xl font-bold">kebabCase</h2>
                <span className="method-badge bg-blue-500/20 text-blue-400">str.case.kebab</span>
              </div>
              <p className="text-gray-400 mb-6">
                Converts a string to kebab-case format (lowercase words separated by hyphens).
              </p>
              <div className="code-block">
                <div className="code-header">
                  <span className="text-gray-400 text-sm font-medium">Example</span>
                </div>
                <pre className="p-5 font-mono text-sm">
                  <code>
                    str.case.<span className="token-function">kebab</span>(<span className="token-string">'helloWorld'</span>);       <span className="token-comment">// 'hello-world'</span>{'\n'}
                    str.case.<span className="token-function">kebab</span>(<span className="token-string">'foo_bar_baz'</span>);      <span className="token-comment">// 'foo-bar-baz'</span>{'\n'}
                    str.case.<span className="token-function">kebab</span>(<span className="token-string">'Hello World'</span>);      <span className="token-comment">// 'hello-world'</span>{'\n'}
                    {'\n'}
                    <span className="token-comment">// Chainable</span>{'\n'}
                    <span className="token-function">S</span>(<span className="token-string">'helloWorld'</span>).<span className="token-function">kebabCase</span>().value;  <span className="token-comment">// 'hello-world'</span>
                  </code>
                </pre>
              </div>
            </section>

            {/* snakeCase */}
            <section id="snakeCase" className="method-card p-6 scroll-mt-24">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-2xl font-bold">snakeCase</h2>
                <span className="method-badge bg-blue-500/20 text-blue-400">str.case.snake</span>
              </div>
              <p className="text-gray-400 mb-6">
                Converts a string to snake_case format (lowercase words separated by underscores).
              </p>
              <div className="code-block">
                <div className="code-header">
                  <span className="text-gray-400 text-sm font-medium">Example</span>
                </div>
                <pre className="p-5 font-mono text-sm">
                  <code>
                    str.case.<span className="token-function">snake</span>(<span className="token-string">'helloWorld'</span>);       <span className="token-comment">// 'hello_world'</span>{'\n'}
                    str.case.<span className="token-function">snake</span>(<span className="token-string">'foo-bar-baz'</span>);      <span className="token-comment">// 'foo_bar_baz'</span>{'\n'}
                    str.case.<span className="token-function">snake</span>(<span className="token-string">'Hello World'</span>);      <span className="token-comment">// 'hello_world'</span>
                  </code>
                </pre>
              </div>
            </section>

            {/* pascalCase */}
            <section id="pascalCase" className="method-card p-6 scroll-mt-24">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-2xl font-bold">pascalCase</h2>
                <span className="method-badge bg-blue-500/20 text-blue-400">str.case.pascal</span>
              </div>
              <p className="text-gray-400 mb-6">
                Converts a string to PascalCase format. All words are capitalized and joined.
              </p>
              <div className="code-block">
                <div className="code-header">
                  <span className="text-gray-400 text-sm font-medium">Example</span>
                </div>
                <pre className="p-5 font-mono text-sm">
                  <code>
                    str.case.<span className="token-function">pascal</span>(<span className="token-string">'hello world'</span>);     <span className="token-comment">// 'HelloWorld'</span>{'\n'}
                    str.case.<span className="token-function">pascal</span>(<span className="token-string">'foo-bar-baz'</span>);     <span className="token-comment">// 'FooBarBaz'</span>{'\n'}
                    str.case.<span className="token-function">pascal</span>(<span className="token-string">'my_component'</span>);    <span className="token-comment">// 'MyComponent'</span>
                  </code>
                </pre>
              </div>
            </section>

            {/* titleCase */}
            <section id="titleCase" className="method-card p-6 scroll-mt-24">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-2xl font-bold">titleCase</h2>
                <span className="method-badge bg-blue-500/20 text-blue-400">str.case.title</span>
              </div>
              <p className="text-gray-400 mb-6">
                Converts a string to Title Case. First letter of each word is capitalized.
              </p>
              <div className="code-block">
                <div className="code-header">
                  <span className="text-gray-400 text-sm font-medium">Example</span>
                </div>
                <pre className="p-5 font-mono text-sm">
                  <code>
                    str.case.<span className="token-function">title</span>(<span className="token-string">'hello world'</span>);      <span className="token-comment">// 'Hello World'</span>{'\n'}
                    str.case.<span className="token-function">title</span>(<span className="token-string">'the quick brown fox'</span>); <span className="token-comment">// 'The Quick Brown Fox'</span>
                  </code>
                </pre>
              </div>
            </section>

            {/* upper / lower */}
            <section id="upper" className="method-card p-6 scroll-mt-24">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-2xl font-bold">upper / lower</h2>
                <span className="method-badge bg-green-500/20 text-green-400">Locale Support</span>
              </div>
              <p className="text-gray-400 mb-6">
                Convert to uppercase or lowercase with optional locale support for proper internationalization.
              </p>
              <div className="code-block">
                <div className="code-header">
                  <span className="text-gray-400 text-sm font-medium">Example</span>
                </div>
                <pre className="p-5 font-mono text-sm">
                  <code>
                    str.case.<span className="token-function">upper</span>(<span className="token-string">'hello'</span>);            <span className="token-comment">// 'HELLO'</span>{'\n'}
                    str.case.<span className="token-function">lower</span>(<span className="token-string">'HELLO'</span>);            <span className="token-comment">// 'hello'</span>{'\n'}
                    {'\n'}
                    <span className="token-comment">// With Turkish locale (special i/I handling)</span>{'\n'}
                    str.case.<span className="token-function">upper</span>(<span className="token-string">'istanbul'</span>, {'{'} locale: <span className="token-string">'tr'</span> {'}'}); <span className="token-comment">// 'İSTANBUL'</span>{'\n'}
                    str.case.<span className="token-function">lower</span>(<span className="token-string">'ISTANBUL'</span>, {'{'} locale: <span className="token-string">'tr'</span> {'}'}); <span className="token-comment">// 'ıstanbul'</span>
                  </code>
                </pre>
              </div>
            </section>

            {/* constantCase */}
            <section id="constantCase" className="method-card p-6 scroll-mt-24">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-2xl font-bold">constantCase</h2>
                <span className="method-badge bg-blue-500/20 text-blue-400">str.case.constant</span>
              </div>
              <p className="text-gray-400 mb-6">
                Converts to CONSTANT_CASE (also known as screaming snake case). Uppercase with underscores.
              </p>
              <div className="code-block">
                <div className="code-header">
                  <span className="text-gray-400 text-sm font-medium">Example</span>
                </div>
                <pre className="p-5 font-mono text-sm">
                  <code>
                    str.case.<span className="token-function">constant</span>(<span className="token-string">'hello world'</span>);   <span className="token-comment">// 'HELLO_WORLD'</span>{'\n'}
                    str.case.<span className="token-function">constant</span>(<span className="token-string">'fooBar'</span>);        <span className="token-comment">// 'FOO_BAR'</span>{'\n'}
                    str.case.<span className="token-function">constant</span>(<span className="token-string">'api-key'</span>);       <span className="token-comment">// 'API_KEY'</span>
                  </code>
                </pre>
              </div>
            </section>

            {/* All Methods Table */}
            <section id="all-methods" className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-6">All Methods</h2>
              <div className="overflow-x-auto rounded-xl border border-gray-800">
                <table className="w-full text-left">
                  <thead className="bg-gray-900/80">
                    <tr>
                      <th className="px-6 py-4 text-sm font-semibold text-gray-300">Method</th>
                      <th className="px-6 py-4 text-sm font-semibold text-gray-300">Description</th>
                      <th className="px-6 py-4 text-sm font-semibold text-gray-300">Example Output</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {methods.map((method) => (
                      <tr key={method.name} className="hover:bg-gray-900/50 transition">
                        <td className="px-6 py-4">
                          <code className="text-primary-400">{method.name}</code>
                        </td>
                        <td className="px-6 py-4 text-gray-400">{method.description}</td>
                        <td className="px-6 py-4">
                          <code className="text-green-400">{method.example}</code>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          {/* Pagination */}
          <nav className="flex items-center justify-between pt-12 border-t border-gray-800 mt-12">
            <Link
              to="/docs/api"
              className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white transition"
            >
              <ChevronLeft className="w-4 h-4" />
              API Overview
            </Link>
            <Link
              to="/docs/api/manipulation"
              className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-500 text-white rounded-lg transition"
            >
              Manipulation
              <ChevronRight className="w-4 h-4" />
            </Link>
          </nav>
        </div>

        <Footer />
      </main>
    </div>
  )
}
