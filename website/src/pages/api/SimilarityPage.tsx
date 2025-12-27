import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, BarChart3 } from 'lucide-react'
import Sidebar from '../../components/layout/Sidebar'
import Footer from '../../components/layout/Footer'
import { apiSidebarSections } from '../../data/apiSidebar'

const methods = [
  { name: 'levenshtein', description: 'Levenshtein edit distance', example: '3' },
  { name: 'dice', description: 'Sørensen-Dice coefficient', example: '0.67' },
  { name: 'jaroWinkler', description: 'Jaro-Winkler similarity', example: '0.96' },
  { name: 'hamming', description: 'Hamming distance', example: '2' },
  { name: 'cosine', description: 'Cosine similarity', example: '0.89' },
  { name: 'jaccard', description: 'Jaccard index', example: '0.50' },
  { name: 'soundex', description: 'Soundex phonetic code', example: "'H400'" },
  { name: 'metaphone', description: 'Metaphone phonetic code', example: "'HL'" },
]

export default function SimilarityPage() {
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
            <span className="text-gray-300">Similarity</span>
          </nav>

          <header className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold">Similarity</h1>
                <p className="text-gray-400">str.similarity namespace</p>
              </div>
            </div>
            <p className="text-xl text-gray-400 leading-relaxed">
              Compare strings and measure similarity using various algorithms.
            </p>
          </header>

          <div className="space-y-12">
            <section className="method-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-2xl font-bold">levenshtein</h2>
                <span className="method-badge bg-cyan-500/20 text-cyan-400">str.similarity.levenshtein</span>
              </div>
              <p className="text-gray-400 mb-6">Calculate the Levenshtein edit distance between two strings.</p>
              <div className="code-block">
                <div className="code-header">
                  <span className="text-gray-400 text-sm font-medium">Example</span>
                </div>
                <pre className="p-5 font-mono text-sm">
                  <code>
                    str.similarity.<span className="token-function">levenshtein</span>(<span className="token-string">'kitten'</span>, <span className="token-string">'sitting'</span>);{'\n'}
                    <span className="token-comment">// 3 (k→s, e→i, +g)</span>{'\n'}
                    {'\n'}
                    str.similarity.<span className="token-function">levenshtein</span>(<span className="token-string">'hello'</span>, <span className="token-string">'hello'</span>);{'\n'}
                    <span className="token-comment">// 0 (identical strings)</span>
                  </code>
                </pre>
              </div>
            </section>

            <section className="method-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-2xl font-bold">jaroWinkler</h2>
                <span className="method-badge bg-cyan-500/20 text-cyan-400">str.similarity.jaroWinkler</span>
              </div>
              <p className="text-gray-400 mb-6">Calculate Jaro-Winkler similarity (0-1 range).</p>
              <div className="code-block">
                <div className="code-header">
                  <span className="text-gray-400 text-sm font-medium">Example</span>
                </div>
                <pre className="p-5 font-mono text-sm">
                  <code>
                    str.similarity.<span className="token-function">jaroWinkler</span>(<span className="token-string">'MARTHA'</span>, <span className="token-string">'MARHTA'</span>);{'\n'}
                    <span className="token-comment">// 0.961 (very similar)</span>{'\n'}
                    {'\n'}
                    str.similarity.<span className="token-function">jaroWinkler</span>(<span className="token-string">'DWAYNE'</span>, <span className="token-string">'DUANE'</span>);{'\n'}
                    <span className="token-comment">// 0.84</span>
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
            <Link to="/docs/api/formatting" className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white transition">
              <ChevronLeft className="w-4 h-4" /> Formatting
            </Link>
            <Link to="/docs/api/analysis" className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-500 text-white rounded-lg transition">
              Analysis <ChevronRight className="w-4 h-4" />
            </Link>
          </nav>
        </div>
        <Footer />
      </main>
    </div>
  )
}
