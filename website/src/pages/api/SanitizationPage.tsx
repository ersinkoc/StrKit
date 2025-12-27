import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Shield } from 'lucide-react'
import Sidebar from '../../components/layout/Sidebar'
import Footer from '../../components/layout/Footer'
import { apiSidebarSections } from '../../data/apiSidebar'

const methods = [
  { name: 'html', description: 'Remove HTML tags', example: "'Hello World'" },
  { name: 'escape', description: 'Escape HTML entities', example: "'&lt;div&gt;'" },
  { name: 'unescape', description: 'Unescape HTML entities', example: "'<div>'" },
  { name: 'slug', description: 'Create URL-safe slug', example: "'hello-world'" },
  { name: 'filename', description: 'Sanitize for filename', example: "'document.pdf'" },
  { name: 'whitespace', description: 'Normalize whitespace', example: "'hello world'" },
  { name: 'quotes', description: 'Normalize quotes', example: "\"hello\"" },
  { name: 'unicode', description: 'Normalize unicode', example: "'cafe'" },
]

export default function SanitizationPage() {
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
            <span className="text-gray-300">Sanitization</span>
          </nav>

          <header className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center">
                <Shield className="w-6 h-6 text-orange-400" />
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold">Sanitization</h1>
                <p className="text-gray-400">str.sanitize namespace</p>
              </div>
            </div>
            <p className="text-xl text-gray-400 leading-relaxed">
              Clean and sanitize strings for safe usage in various contexts.
            </p>
          </header>

          <div className="space-y-12">
            <section className="method-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-2xl font-bold">html</h2>
                <span className="method-badge bg-orange-500/20 text-orange-400">str.sanitize.html</span>
              </div>
              <p className="text-gray-400 mb-6">Removes HTML tags from a string.</p>
              <div className="code-block">
                <div className="code-header">
                  <span className="text-gray-400 text-sm font-medium">Example</span>
                </div>
                <pre className="p-5 font-mono text-sm">
                  <code>
                    str.sanitize.<span className="token-function">html</span>(<span className="token-string">'&lt;script&gt;alert("xss")&lt;/script&gt;Hello'</span>);{'\n'}
                    <span className="token-comment">// 'Hello'</span>{'\n'}
                    {'\n'}
                    str.sanitize.<span className="token-function">html</span>(<span className="token-string">'&lt;p&gt;Hello &lt;b&gt;World&lt;/b&gt;&lt;/p&gt;'</span>);{'\n'}
                    <span className="token-comment">// 'Hello World'</span>
                  </code>
                </pre>
              </div>
            </section>

            <section className="method-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-2xl font-bold">slug</h2>
                <span className="method-badge bg-orange-500/20 text-orange-400">str.sanitize.slug</span>
              </div>
              <p className="text-gray-400 mb-6">Creates a URL-safe slug from a string.</p>
              <div className="code-block">
                <div className="code-header">
                  <span className="text-gray-400 text-sm font-medium">Example</span>
                </div>
                <pre className="p-5 font-mono text-sm">
                  <code>
                    str.sanitize.<span className="token-function">slug</span>(<span className="token-string">'Hello World!'</span>);{'\n'}
                    <span className="token-comment">// 'hello-world'</span>{'\n'}
                    {'\n'}
                    str.sanitize.<span className="token-function">slug</span>(<span className="token-string">'Türkçe Başlık'</span>);{'\n'}
                    <span className="token-comment">// 'turkce-baslik'</span>
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
            <Link to="/docs/api/validation" className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white transition">
              <ChevronLeft className="w-4 h-4" /> Validation
            </Link>
            <Link to="/docs/api/formatting" className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-500 text-white rounded-lg transition">
              Formatting <ChevronRight className="w-4 h-4" />
            </Link>
          </nav>
        </div>
        <Footer />
      </main>
    </div>
  )
}
