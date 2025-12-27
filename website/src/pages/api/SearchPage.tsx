import { Link } from 'react-router-dom'
import { ChevronLeft, Search } from 'lucide-react'
import Sidebar from '../../components/layout/Sidebar'
import Footer from '../../components/layout/Footer'
import { apiSidebarSections } from '../../data/apiSidebar'

const methods = [
  { name: 'fuzzy', description: 'Fuzzy search in array', example: "['hello', 'help']" },
  { name: 'indexOf', description: 'Find index of substring', example: '7' },
  { name: 'lastIndexOf', description: 'Find last index', example: '15' },
  { name: 'includes', description: 'Check if includes', example: 'true' },
  { name: 'startsWith', description: 'Check if starts with', example: 'true' },
  { name: 'endsWith', description: 'Check if ends with', example: 'true' },
  { name: 'match', description: 'Match with regex', example: "['foo', 'bar']" },
  { name: 'matchAll', description: 'Match all occurrences', example: '[...matches]' },
  { name: 'highlight', description: 'Highlight matches', example: "'<b>hello</b> world'" },
]

export default function SearchPage() {
  return (
    <div className="flex pt-16">
      <Sidebar sections={apiSidebarSections} />
      <main className="flex-1 lg:ml-72 min-h-screen">
        <div className="max-w-4xl mx-auto px-6 py-12 lg:py-16">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <Link to="/" className="hover:text-white transition">Home</Link>
            <span className="text-gray-600">/</span>
            <Link to="/docs/api" className="hover:text-white transition">API</Link>
            <span className="text-gray-600">/</span>
            <span className="text-gray-300">Search</span>
          </nav>

          <header className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                <Search className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold">Search</h1>
                <p className="text-gray-400">str.search namespace</p>
              </div>
            </div>
            <p className="text-xl text-gray-400 leading-relaxed">
              Search, match, and highlight patterns in strings with fuzzy matching support.
            </p>
          </header>

          <div className="space-y-12">
            <section className="method-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-2xl font-bold">fuzzy</h2>
                <span className="method-badge bg-emerald-500/20 text-emerald-400">str.search.fuzzy</span>
              </div>
              <p className="text-gray-400 mb-6">Perform fuzzy search on an array of strings.</p>
              <div className="code-block">
                <div className="code-header">
                  <span className="text-gray-400 text-sm font-medium">Example</span>
                </div>
                <pre className="p-5 font-mono text-sm">
                  <code>
                    <span className="token-keyword">const</span> items = [<span className="token-string">'hello'</span>, <span className="token-string">'world'</span>, <span className="token-string">'help'</span>, <span className="token-string">'helicopter'</span>];{'\n'}
                    {'\n'}
                    str.search.<span className="token-function">fuzzy</span>(<span className="token-string">'helo'</span>, items);{'\n'}
                    <span className="token-comment">// ['hello', 'help', 'helicopter']</span>{'\n'}
                    {'\n'}
                    str.search.<span className="token-function">fuzzy</span>(<span className="token-string">'wrld'</span>, items);{'\n'}
                    <span className="token-comment">// ['world']</span>
                  </code>
                </pre>
              </div>
            </section>

            <section className="method-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-2xl font-bold">highlight</h2>
                <span className="method-badge bg-emerald-500/20 text-emerald-400">str.search.highlight</span>
              </div>
              <p className="text-gray-400 mb-6">Highlight search matches in a string.</p>
              <div className="code-block">
                <div className="code-header">
                  <span className="text-gray-400 text-sm font-medium">Example</span>
                </div>
                <pre className="p-5 font-mono text-sm">
                  <code>
                    str.search.<span className="token-function">highlight</span>(<span className="token-string">'hello world'</span>, <span className="token-string">'world'</span>);{'\n'}
                    <span className="token-comment">// 'hello &lt;mark&gt;world&lt;/mark&gt;'</span>{'\n'}
                    {'\n'}
                    str.search.<span className="token-function">highlight</span>(<span className="token-string">'hello world'</span>, <span className="token-string">'world'</span>, {'{'}{'\n'}
                    {'  '}tag: <span className="token-string">'b'</span>,{'\n'}
                    {'  '}className: <span className="token-string">'highlight'</span>{'\n'}
                    {'}'});{'\n'}
                    <span className="token-comment">// 'hello &lt;b class="highlight"&gt;world&lt;/b&gt;'</span>
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
            <Link to="/docs/api/diff" className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white transition">
              <ChevronLeft className="w-4 h-4" /> Diff
            </Link>
            <Link to="/docs/api" className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-500 text-white rounded-lg transition">
              Back to API Overview
            </Link>
          </nav>
        </div>
        <Footer />
      </main>
    </div>
  )
}
