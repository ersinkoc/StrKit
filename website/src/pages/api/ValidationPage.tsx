import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react'
import Sidebar from '../../components/layout/Sidebar'
import Footer from '../../components/layout/Footer'
import { apiSidebarSections } from '../../data/apiSidebar'

const methods = [
  { name: 'email', description: 'Validate email address', example: 'true' },
  { name: 'url', description: 'Validate URL', example: 'true' },
  { name: 'uuid', description: 'Validate UUID', example: 'true' },
  { name: 'ip', description: 'Validate IP address', example: 'true' },
  { name: 'ipv4', description: 'Validate IPv4 address', example: 'true' },
  { name: 'ipv6', description: 'Validate IPv6 address', example: 'true' },
  { name: 'creditCard', description: 'Validate credit card number', example: 'true' },
  { name: 'phone', description: 'Validate phone number', example: 'true' },
  { name: 'postalCode', description: 'Validate postal code', example: 'true' },
  { name: 'hex', description: 'Validate hex string', example: 'true' },
  { name: 'base64', description: 'Validate base64 string', example: 'true' },
  { name: 'json', description: 'Validate JSON string', example: 'true' },
  { name: 'alphanumeric', description: 'Check if alphanumeric', example: 'true' },
  { name: 'numeric', description: 'Check if numeric', example: 'true' },
  { name: 'alpha', description: 'Check if alphabetic', example: 'true' },
  { name: 'empty', description: 'Check if empty/whitespace', example: 'true' },
]

export default function ValidationPage() {
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
            <span className="text-gray-300">Validation</span>
          </nav>

          <header className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold">Validation</h1>
                <p className="text-gray-400">str.validate namespace</p>
              </div>
            </div>
            <p className="text-xl text-gray-400 leading-relaxed">
              20+ validators for common string patterns including email, URL, UUID, and more.
            </p>
          </header>

          <div className="mb-12 p-4 bg-gray-900/50 border border-gray-800 rounded-xl">
            <p className="text-sm text-gray-400 mb-3">Quick Import:</p>
            <div className="code-block">
              <pre className="p-4 font-mono text-sm">
                <code>
                  <span className="token-keyword">import</span> {'{'} str {'}'} <span className="token-keyword">from</span> <span className="token-string">'@oxog/strkit'</span>;{'\n'}
                  <span className="token-comment">// Use: str.validate.email('user@example.com')</span>
                </code>
              </pre>
            </div>
          </div>

          <div className="space-y-12">
            <section className="method-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-2xl font-bold">email</h2>
                <span className="method-badge bg-purple-500/20 text-purple-400">str.validate.email</span>
              </div>
              <p className="text-gray-400 mb-6">Validates email address format.</p>
              <div className="code-block">
                <div className="code-header">
                  <span className="text-gray-400 text-sm font-medium">Example</span>
                </div>
                <pre className="p-5 font-mono text-sm">
                  <code>
                    str.validate.<span className="token-function">email</span>(<span className="token-string">'user@example.com'</span>); <span className="token-comment">// true</span>{'\n'}
                    str.validate.<span className="token-function">email</span>(<span className="token-string">'invalid-email'</span>);    <span className="token-comment">// false</span>{'\n'}
                    str.validate.<span className="token-function">email</span>(<span className="token-string">'test@sub.domain.org'</span>); <span className="token-comment">// true</span>
                  </code>
                </pre>
              </div>
            </section>

            <section className="method-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-2xl font-bold">url</h2>
                <span className="method-badge bg-purple-500/20 text-purple-400">str.validate.url</span>
              </div>
              <p className="text-gray-400 mb-6">Validates URL format.</p>
              <div className="code-block">
                <div className="code-header">
                  <span className="text-gray-400 text-sm font-medium">Example</span>
                </div>
                <pre className="p-5 font-mono text-sm">
                  <code>
                    str.validate.<span className="token-function">url</span>(<span className="token-string">'https://strkit.oxog.dev'</span>); <span className="token-comment">// true</span>{'\n'}
                    str.validate.<span className="token-function">url</span>(<span className="token-string">'ftp://files.example.com'</span>); <span className="token-comment">// true</span>{'\n'}
                    str.validate.<span className="token-function">url</span>(<span className="token-string">'not-a-url'</span>);               <span className="token-comment">// false</span>
                  </code>
                </pre>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6">All Validators</h2>
              <div className="overflow-x-auto rounded-xl border border-gray-800">
                <table className="w-full text-left">
                  <thead className="bg-gray-900/80">
                    <tr>
                      <th className="px-6 py-4 text-sm font-semibold text-gray-300">Method</th>
                      <th className="px-6 py-4 text-sm font-semibold text-gray-300">Description</th>
                      <th className="px-6 py-4 text-sm font-semibold text-gray-300">Returns</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {methods.map((method) => (
                      <tr key={method.name} className="hover:bg-gray-900/50 transition">
                        <td className="px-6 py-4"><code className="text-primary-400">{method.name}</code></td>
                        <td className="px-6 py-4 text-gray-400">{method.description}</td>
                        <td className="px-6 py-4"><code className="text-green-400">boolean</code></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          <nav className="flex items-center justify-between pt-12 border-t border-gray-800 mt-12">
            <Link to="/docs/api/manipulation" className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white transition">
              <ChevronLeft className="w-4 h-4" /> Manipulation
            </Link>
            <Link to="/docs/api/sanitization" className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-500 text-white rounded-lg transition">
              Sanitization <ChevronRight className="w-4 h-4" />
            </Link>
          </nav>
        </div>
        <Footer />
      </main>
    </div>
  )
}
