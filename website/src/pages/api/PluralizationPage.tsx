import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Languages } from 'lucide-react'
import Sidebar from '../../components/layout/Sidebar'
import Footer from '../../components/layout/Footer'
import { apiSidebarSections } from '../../data/apiSidebar'

const methods = [
  { name: 'pluralize', description: 'Convert to plural form', example: "'cats'" },
  { name: 'singularize', description: 'Convert to singular form', example: "'cat'" },
  { name: 'isPlural', description: 'Check if plural', example: 'true' },
  { name: 'isSingular', description: 'Check if singular', example: 'true' },
  { name: 'addRule', description: 'Add pluralization rule', example: 'void' },
  { name: 'addIrregular', description: 'Add irregular word', example: 'void' },
  { name: 'addUncountable', description: 'Add uncountable word', example: 'void' },
]

export default function PluralizationPage() {
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
            <span className="text-gray-300">Pluralization</span>
          </nav>

          <header className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
                <Languages className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold">Pluralization</h1>
                <p className="text-gray-400">str.plural namespace</p>
              </div>
            </div>
            <p className="text-xl text-gray-400 leading-relaxed">
              Handle singular/plural forms with support for irregular words and custom rules.
            </p>
          </header>

          <div className="space-y-12">
            <section className="method-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-2xl font-bold">pluralize</h2>
                <span className="method-badge bg-red-500/20 text-red-400">str.plural.pluralize</span>
              </div>
              <p className="text-gray-400 mb-6">Convert a word to its plural form.</p>
              <div className="code-block">
                <div className="code-header">
                  <span className="text-gray-400 text-sm font-medium">Example</span>
                </div>
                <pre className="p-5 font-mono text-sm">
                  <code>
                    str.plural.<span className="token-function">pluralize</span>(<span className="token-string">'cat'</span>);      <span className="token-comment">// 'cats'</span>{'\n'}
                    str.plural.<span className="token-function">pluralize</span>(<span className="token-string">'person'</span>);   <span className="token-comment">// 'people'</span>{'\n'}
                    str.plural.<span className="token-function">pluralize</span>(<span className="token-string">'child'</span>);    <span className="token-comment">// 'children'</span>{'\n'}
                    str.plural.<span className="token-function">pluralize</span>(<span className="token-string">'analysis'</span>); <span className="token-comment">// 'analyses'</span>
                  </code>
                </pre>
              </div>
            </section>

            <section className="method-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-2xl font-bold">singularize</h2>
                <span className="method-badge bg-red-500/20 text-red-400">str.plural.singularize</span>
              </div>
              <p className="text-gray-400 mb-6">Convert a word to its singular form.</p>
              <div className="code-block">
                <div className="code-header">
                  <span className="text-gray-400 text-sm font-medium">Example</span>
                </div>
                <pre className="p-5 font-mono text-sm">
                  <code>
                    str.plural.<span className="token-function">singularize</span>(<span className="token-string">'cats'</span>);     <span className="token-comment">// 'cat'</span>{'\n'}
                    str.plural.<span className="token-function">singularize</span>(<span className="token-string">'people'</span>);   <span className="token-comment">// 'person'</span>{'\n'}
                    str.plural.<span className="token-function">singularize</span>(<span className="token-string">'children'</span>); <span className="token-comment">// 'child'</span>
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
            <Link to="/docs/api/analysis" className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white transition">
              <ChevronLeft className="w-4 h-4" /> Analysis
            </Link>
            <Link to="/docs/api/diff" className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-500 text-white rounded-lg transition">
              Diff <ChevronRight className="w-4 h-4" />
            </Link>
          </nav>
        </div>
        <Footer />
      </main>
    </div>
  )
}
