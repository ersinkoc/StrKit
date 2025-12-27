import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, GitCompare } from 'lucide-react'
import Sidebar from '../../components/layout/Sidebar'
import Footer from '../../components/layout/Footer'
import { apiSidebarSections } from '../../data/apiSidebar'

const methods = [
  { name: 'chars', description: 'Character-level diff', example: '[{type, value}]' },
  { name: 'words', description: 'Word-level diff', example: '[{type, value}]' },
  { name: 'lines', description: 'Line-level diff', example: '[{type, value}]' },
  { name: 'unified', description: 'Unified diff format', example: "'--- old\\n+++ new'" },
  { name: 'apply', description: 'Apply a patch', example: "'patched text'" },
  { name: 'create', description: 'Create patch from diff', example: "'{patch}'" },
]

export default function DiffPage() {
  return (
    <div className="flex pt-16">
      <Sidebar sections={apiSidebarSections} />
      <main className="flex-1 lg:ml-72 min-h-screen">
        <div className="max-w-4xl mx-auto px-6 py-12 lg:py-16">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <Link to="/" className="hover:text-white transition">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/docs/api" className="hover:text-white transition">API</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-300">Diff</span>
          </nav>

          <header className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                <GitCompare className="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold">Diff & Patch</h1>
                <p className="text-gray-400">str.diff namespace</p>
              </div>
            </div>
            <p className="text-xl text-gray-400 leading-relaxed">
              Compare strings and generate/apply patches at character, word, or line level.
            </p>
          </header>

          <div className="space-y-12">
            <section className="method-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-2xl font-bold">chars</h2>
                <span className="method-badge bg-indigo-500/20 text-indigo-400">str.diff.chars</span>
              </div>
              <p className="text-gray-400 mb-6">Calculate character-level differences between two strings.</p>
              <div className="code-block">
                <div className="code-header">
                  <span className="text-gray-400 text-sm font-medium">Example</span>
                </div>
                <pre className="p-5 font-mono text-sm">
                  <code>
                    str.diff.<span className="token-function">chars</span>(<span className="token-string">'hello'</span>, <span className="token-string">'hallo'</span>);{'\n'}
                    <span className="token-comment">// [</span>{'\n'}
                    <span className="token-comment">//   {'{'} type: 'equal', value: 'h' {'}'},</span>{'\n'}
                    <span className="token-comment">//   {'{'} type: 'remove', value: 'e' {'}'},</span>{'\n'}
                    <span className="token-comment">//   {'{'} type: 'add', value: 'a' {'}'},</span>{'\n'}
                    <span className="token-comment">//   {'{'} type: 'equal', value: 'llo' {'}'}</span>{'\n'}
                    <span className="token-comment">// ]</span>
                  </code>
                </pre>
              </div>
            </section>

            <section className="method-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-2xl font-bold">unified</h2>
                <span className="method-badge bg-indigo-500/20 text-indigo-400">str.diff.unified</span>
              </div>
              <p className="text-gray-400 mb-6">Generate a unified diff format (like git diff).</p>
              <div className="code-block">
                <div className="code-header">
                  <span className="text-gray-400 text-sm font-medium">Example</span>
                </div>
                <pre className="p-5 font-mono text-sm">
                  <code>
                    str.diff.<span className="token-function">unified</span>(oldText, newText);{'\n'}
                    <span className="token-comment">// '--- old</span>{'\n'}
                    <span className="token-comment">//  +++ new</span>{'\n'}
                    <span className="token-comment">//  @@ -1,3 +1,3 @@</span>{'\n'}
                    <span className="token-comment">//   line 1</span>{'\n'}
                    <span className="token-comment">//  -old line</span>{'\n'}
                    <span className="token-comment">//  +new line</span>{'\n'}
                    <span className="token-comment">//   line 3'</span>
                  </code>
                </pre>
              </div>
            </section>

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
                        <td className="px-6 py-4"><code className="text-primary-400">{method.name}</code></td>
                        <td className="px-6 py-4 text-gray-400">{method.description}</td>
                        <td className="px-6 py-4"><code className="text-green-400">{method.example}</code></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          <nav className="flex items-center justify-between pt-12 border-t border-gray-800 mt-12">
            <Link to="/docs/api/pluralization" className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white transition">
              <ChevronLeft className="w-4 h-4" /> Pluralization
            </Link>
            <Link to="/docs/api/search" className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-500 text-white rounded-lg transition">
              Search <ChevronRight className="w-4 h-4" />
            </Link>
          </nav>
        </div>
        <Footer />
      </main>
    </div>
  )
}
