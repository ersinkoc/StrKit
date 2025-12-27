import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, FileText } from 'lucide-react'
import Sidebar from '../../components/layout/Sidebar'
import Footer from '../../components/layout/Footer'
import { apiSidebarSections } from '../../data/apiSidebar'

const methods = [
  { name: 'wordCount', description: 'Count words in string', example: '5' },
  { name: 'charCount', description: 'Count characters', example: '26' },
  { name: 'lineCount', description: 'Count lines', example: '3' },
  { name: 'sentenceCount', description: 'Count sentences', example: '2' },
  { name: 'paragraphCount', description: 'Count paragraphs', example: '1' },
  { name: 'readingTime', description: 'Estimate reading time', example: "'2 min'" },
  { name: 'stats', description: 'Get comprehensive stats', example: '{ words: 5, ... }' },
  { name: 'frequency', description: 'Character frequency', example: "{ a: 3, b: 2 }" },
]

export default function AnalysisPage() {
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
            <span className="text-gray-300">Analysis</span>
          </nav>

          <header className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center">
                <FileText className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold">Analysis</h1>
                <p className="text-gray-400">str.analysis namespace</p>
              </div>
            </div>
            <p className="text-xl text-gray-400 leading-relaxed">
              Analyze string content and extract useful information.
            </p>
          </header>

          <div className="space-y-12">
            <section className="method-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-2xl font-bold">stats</h2>
                <span className="method-badge bg-yellow-500/20 text-yellow-400">str.analysis.stats</span>
              </div>
              <p className="text-gray-400 mb-6">Get comprehensive statistics about a string.</p>
              <div className="code-block">
                <div className="code-header">
                  <span className="text-gray-400 text-sm font-medium">Example</span>
                </div>
                <pre className="p-5 font-mono text-sm">
                  <code>
                    str.analysis.<span className="token-function">stats</span>(<span className="token-string">'Hello World! How are you?'</span>);{'\n'}
                    <span className="token-comment">// {'{'}  </span>{'\n'}
                    <span className="token-comment">//   chars: 25,</span>{'\n'}
                    <span className="token-comment">//   words: 5,</span>{'\n'}
                    <span className="token-comment">//   sentences: 2,</span>{'\n'}
                    <span className="token-comment">//   lines: 1,</span>{'\n'}
                    <span className="token-comment">//   readingTime: '1 min'</span>{'\n'}
                    <span className="token-comment">// {'}'}</span>
                  </code>
                </pre>
              </div>
            </section>

            <section className="method-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-2xl font-bold">readingTime</h2>
                <span className="method-badge bg-yellow-500/20 text-yellow-400">str.analysis.readingTime</span>
              </div>
              <p className="text-gray-400 mb-6">Estimate reading time for a text.</p>
              <div className="code-block">
                <div className="code-header">
                  <span className="text-gray-400 text-sm font-medium">Example</span>
                </div>
                <pre className="p-5 font-mono text-sm">
                  <code>
                    str.analysis.<span className="token-function">readingTime</span>(longArticle);{'\n'}
                    <span className="token-comment">// '5 min read'</span>{'\n'}
                    {'\n'}
                    str.analysis.<span className="token-function">readingTime</span>(shortText, {'{'} wpm: <span className="token-number">250</span> {'}'});{'\n'}
                    <span className="token-comment">// '1 min read'</span>
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
            <Link to="/docs/api/similarity" className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white transition">
              <ChevronLeft className="w-4 h-4" /> Similarity
            </Link>
            <Link to="/docs/api/pluralization" className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-500 text-white rounded-lg transition">
              Pluralization <ChevronRight className="w-4 h-4" />
            </Link>
          </nav>
        </div>
        <Footer />
      </main>
    </div>
  )
}
