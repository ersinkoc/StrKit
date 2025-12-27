import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Layout } from 'lucide-react'
import Sidebar from '../../components/layout/Sidebar'
import Footer from '../../components/layout/Footer'
import { apiSidebarSections } from '../../data/apiSidebar'

const methods = [
  { name: 'template', description: 'Template string formatting', example: "'Hello, John!'" },
  { name: 'sprintf', description: 'C-style sprintf formatting', example: "'Value: 42'" },
  { name: 'mask', description: 'Mask sensitive data', example: "'****1234'" },
  { name: 'number', description: 'Format numbers', example: "'1,234.56'" },
  { name: 'currency', description: 'Format as currency', example: "'$1,234.56'" },
  { name: 'bytes', description: 'Format byte sizes', example: "'1.5 MB'" },
  { name: 'ordinal', description: 'Add ordinal suffix', example: "'1st'" },
  { name: 'plural', description: 'Pluralize with count', example: "'3 items'" },
]

export default function FormattingPage() {
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
            <span className="text-gray-300">Formatting</span>
          </nav>

          <header className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center">
                <Layout className="w-6 h-6 text-pink-400" />
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold">Formatting</h1>
                <p className="text-gray-400">str.format namespace</p>
              </div>
            </div>
            <p className="text-xl text-gray-400 leading-relaxed">
              Format strings with templates, masks, and number/currency formatting.
            </p>
          </header>

          <div className="space-y-12">
            <section className="method-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-2xl font-bold">template</h2>
                <span className="method-badge bg-pink-500/20 text-pink-400">str.format.template</span>
              </div>
              <p className="text-gray-400 mb-6">Format strings using named placeholders.</p>
              <div className="code-block">
                <div className="code-header">
                  <span className="text-gray-400 text-sm font-medium">Example</span>
                </div>
                <pre className="p-5 font-mono text-sm">
                  <code>
                    str.format.<span className="token-function">template</span>(<span className="token-string">'Hello, {'{'}name{'}'}!'</span>, {'{'} name: <span className="token-string">'World'</span> {'}'});{'\n'}
                    <span className="token-comment">// 'Hello, World!'</span>{'\n'}
                    {'\n'}
                    str.format.<span className="token-function">template</span>(<span className="token-string">'{'{'}greeting{'}'}, {'{'}name{'}'}!'</span>, {'{'}  {'\n'}
                    {'  '}greeting: <span className="token-string">'Hi'</span>,{'\n'}
                    {'  '}name: <span className="token-string">'John'</span>{'\n'}
                    {'}'});{'\n'}
                    <span className="token-comment">// 'Hi, John!'</span>
                  </code>
                </pre>
              </div>
            </section>

            <section className="method-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-2xl font-bold">mask</h2>
                <span className="method-badge bg-pink-500/20 text-pink-400">str.format.mask</span>
              </div>
              <p className="text-gray-400 mb-6">Mask sensitive data like credit cards or SSNs.</p>
              <div className="code-block">
                <div className="code-header">
                  <span className="text-gray-400 text-sm font-medium">Example</span>
                </div>
                <pre className="p-5 font-mono text-sm">
                  <code>
                    str.format.<span className="token-function">mask</span>(<span className="token-string">'4111111111111111'</span>, {'{'} show: <span className="token-number">4</span> {'}'});{'\n'}
                    <span className="token-comment">// '************1111'</span>{'\n'}
                    {'\n'}
                    str.format.<span className="token-function">mask</span>(<span className="token-string">'user@example.com'</span>, {'{'} show: <span className="token-number">3</span>, char: <span className="token-string">'#'</span> {'}'});{'\n'}
                    <span className="token-comment">// '###############com'</span>
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
            <Link to="/docs/api/sanitization" className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white transition">
              <ChevronLeft className="w-4 h-4" /> Sanitization
            </Link>
            <Link to="/docs/api/similarity" className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-500 text-white rounded-lg transition">
              Similarity <ChevronRight className="w-4 h-4" />
            </Link>
          </nav>
        </div>
        <Footer />
      </main>
    </div>
  )
}
