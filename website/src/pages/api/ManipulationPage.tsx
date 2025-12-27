import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Puzzle } from 'lucide-react'
import Sidebar from '../../components/layout/Sidebar'
import Footer from '../../components/layout/Footer'
import { apiSidebarSections } from '../../data/apiSidebar'

const methods = [
  { name: 'trim', description: 'Remove whitespace from both ends', example: "'hello'" },
  { name: 'trimStart', description: 'Remove whitespace from start', example: "'hello '" },
  { name: 'trimEnd', description: 'Remove whitespace from end', example: "' hello'" },
  { name: 'pad', description: 'Pad string to length', example: "'**hello**'" },
  { name: 'padStart', description: 'Pad string at start', example: "'00042'" },
  { name: 'padEnd', description: 'Pad string at end', example: "'hello..'" },
  { name: 'truncate', description: 'Truncate with ellipsis', example: "'Hello...'" },
  { name: 'wrap', description: 'Wrap text at width', example: "'Hello\\nWorld'" },
  { name: 'reverse', description: 'Reverse string', example: "'dlroW olleH'" },
  { name: 'repeat', description: 'Repeat string n times', example: "'abcabc'" },
  { name: 'replace', description: 'Replace occurrences', example: "'Hello StrKit'" },
  { name: 'remove', description: 'Remove pattern', example: "'Hello'" },
  { name: 'insert', description: 'Insert at position', example: "'Hello World!'" },
  { name: 'splice', description: 'Remove/replace portion', example: "'HeWorld'" },
  { name: 'chars', description: 'Split into characters', example: "['H','e','l','l','o']" },
  { name: 'words', description: 'Split into words', example: "['Hello', 'World']" },
  { name: 'lines', description: 'Split into lines', example: "['Line 1', 'Line 2']" },
]

export default function ManipulationPage() {
  return (
    <div className="flex pt-16">
      <Sidebar sections={apiSidebarSections} />

      <main className="flex-1 lg:ml-72 min-h-screen">
        <div className="max-w-4xl mx-auto px-6 py-12 lg:py-16">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <Link to="/" className="hover:text-white transition">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/docs/api" className="hover:text-white transition">API</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-300">Manipulation</span>
          </nav>

          {/* Header */}
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                <Puzzle className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold">Manipulation</h1>
                <p className="text-gray-400">str.manipulation namespace</p>
              </div>
            </div>
            <p className="text-xl text-gray-400 leading-relaxed">
              25+ methods for string manipulation including trim, pad, truncate, wrap, and more.
            </p>
          </header>

          {/* Quick Import */}
          <div className="mb-12 p-4 bg-gray-900/50 border border-gray-800 rounded-xl">
            <p className="text-sm text-gray-400 mb-3">Quick Import:</p>
            <div className="code-block">
              <pre className="p-4 font-mono text-sm">
                <code>
                  <span className="token-keyword">import</span> {'{'} str {'}'} <span className="token-keyword">from</span> <span className="token-string">'@oxog/strkit'</span>;{'\n'}
                  <span className="token-comment">// Use: str.manipulation.trim('  hello  ')</span>
                </code>
              </pre>
            </div>
          </div>

          {/* Example Methods */}
          <div className="space-y-12">
            <section className="method-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-2xl font-bold">truncate</h2>
                <span className="method-badge bg-green-500/20 text-green-400">str.manipulation.truncate</span>
              </div>
              <p className="text-gray-400 mb-6">
                Truncates a string to the specified length and adds an ellipsis.
              </p>
              <div className="code-block">
                <div className="code-header">
                  <span className="text-gray-400 text-sm font-medium">Example</span>
                </div>
                <pre className="p-5 font-mono text-sm">
                  <code>
                    str.manipulation.<span className="token-function">truncate</span>(<span className="token-string">'Hello World'</span>, <span className="token-number">8</span>);{'\n'}
                    <span className="token-comment">// 'Hello...'</span>{'\n'}
                    {'\n'}
                    <span className="token-comment">// Custom ellipsis</span>{'\n'}
                    str.manipulation.<span className="token-function">truncate</span>(<span className="token-string">'Hello World'</span>, <span className="token-number">8</span>, {'{'} ellipsis: <span className="token-string">'---'</span> {'}'});{'\n'}
                    <span className="token-comment">// 'Hello---'</span>{'\n'}
                    {'\n'}
                    <span className="token-comment">// Chainable</span>{'\n'}
                    <span className="token-function">S</span>(<span className="token-string">'Hello World'</span>).<span className="token-function">truncate</span>(<span className="token-number">8</span>).value;
                  </code>
                </pre>
              </div>
            </section>

            <section className="method-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-2xl font-bold">pad</h2>
                <span className="method-badge bg-green-500/20 text-green-400">str.manipulation.pad</span>
              </div>
              <p className="text-gray-400 mb-6">
                Pads a string to reach a target length.
              </p>
              <div className="code-block">
                <div className="code-header">
                  <span className="text-gray-400 text-sm font-medium">Example</span>
                </div>
                <pre className="p-5 font-mono text-sm">
                  <code>
                    str.manipulation.<span className="token-function">padStart</span>(<span className="token-string">'42'</span>, <span className="token-number">5</span>, <span className="token-string">'0'</span>);{'\n'}
                    <span className="token-comment">// '00042'</span>{'\n'}
                    {'\n'}
                    str.manipulation.<span className="token-function">padEnd</span>(<span className="token-string">'hello'</span>, <span className="token-number">10</span>, <span className="token-string">'.'</span>);{'\n'}
                    <span className="token-comment">// 'hello.....'</span>{'\n'}
                    {'\n'}
                    str.manipulation.<span className="token-function">pad</span>(<span className="token-string">'hello'</span>, <span className="token-number">11</span>, <span className="token-string">'*'</span>);{'\n'}
                    <span className="token-comment">// '***hello***'</span>
                  </code>
                </pre>
              </div>
            </section>

            {/* All Methods Table */}
            <section>
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
              to="/docs/api/case"
              className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white transition"
            >
              <ChevronLeft className="w-4 h-4" />
              Case
            </Link>
            <Link
              to="/docs/api/validation"
              className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-500 text-white rounded-lg transition"
            >
              Validation
              <ChevronRight className="w-4 h-4" />
            </Link>
          </nav>
        </div>

        <Footer />
      </main>
    </div>
  )
}
