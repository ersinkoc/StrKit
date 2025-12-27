import { Link } from 'react-router-dom'
import { ArrowRight, Package, Zap, Globe, Puzzle } from 'lucide-react'
import Sidebar from '../components/layout/Sidebar'
import Footer from '../components/layout/Footer'

const sidebarSections = [
  {
    title: 'Getting Started',
    links: [
      { to: '/docs', label: 'Introduction' },
      { to: '/docs/examples', label: 'Examples' },
      { to: '/docs/playground', label: 'Playground' },
    ],
  },
  {
    title: 'API Reference',
    links: [
      { to: '/docs/api', label: 'Overview' },
      { to: '/docs/api/case', label: 'Case', color: '#60a5fa' },
      { to: '/docs/api/manipulation', label: 'Manipulation', color: '#4ade80' },
      { to: '/docs/api/validation', label: 'Validation', color: '#a78bfa' },
    ],
  },
]

export default function Docs() {
  return (
    <div className="flex pt-16">
      <Sidebar sections={sidebarSections} />

      <main className="flex-1 lg:ml-72 min-h-screen">
        <div className="max-w-4xl mx-auto px-6 py-12 lg:py-16">
          {/* Header */}
          <header className="mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              <span className="gradient-text">StrKit</span> Documentation
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed">
              The ultimate zero-dependency string manipulation toolkit for JavaScript/TypeScript.
              115+ methods across 10 categories with 4 flexible API styles.
            </p>
          </header>

          {/* Installation */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Package className="w-6 h-6 text-primary-400" />
              Installation
            </h2>
            <div className="code-block">
              <div className="code-header">
                <span className="text-gray-400 text-sm font-medium">Terminal</span>
              </div>
              <pre className="p-5 font-mono text-sm">
                <code>
                  <span className="token-comment"># npm</span>{'\n'}
                  npm install @oxog/strkit{'\n'}
                  {'\n'}
                  <span className="token-comment"># yarn</span>{'\n'}
                  yarn add @oxog/strkit{'\n'}
                  {'\n'}
                  <span className="token-comment"># pnpm</span>{'\n'}
                  pnpm add @oxog/strkit
                </code>
              </pre>
            </div>
          </section>

          {/* Quick Start */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Zap className="w-6 h-6 text-yellow-400" />
              Quick Start
            </h2>
            <div className="code-block">
              <div className="code-header">
                <span className="text-gray-400 text-sm font-medium">example.ts</span>
              </div>
              <pre className="p-5 font-mono text-sm leading-relaxed">
                <code>
                  <span className="token-keyword">import</span> {'{'} str, S {'}'} <span className="token-keyword">from</span> <span className="token-string">'@oxog/strkit'</span>;{'\n'}
                  {'\n'}
                  <span className="token-comment">// Namespace API</span>{'\n'}
                  str.case.<span className="token-function">camel</span>(<span className="token-string">'hello world'</span>);  <span className="token-comment">// 'helloWorld'</span>{'\n'}
                  str.validate.<span className="token-function">email</span>(<span className="token-string">'a@b.com'</span>); <span className="token-comment">// true</span>{'\n'}
                  {'\n'}
                  <span className="token-comment">// Chainable API</span>{'\n'}
                  <span className="token-function">S</span>(<span className="token-string">'hello world'</span>){'\n'}
                  {'  '}.<span className="token-function">camelCase</span>(){'\n'}
                  {'  '}.<span className="token-function">truncate</span>(<span className="token-number">8</span>){'\n'}
                  {'  '}.value;  <span className="token-comment">// 'helloW...'</span>
                </code>
              </pre>
            </div>
          </section>

          {/* Features */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Key Features</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-5 bg-gray-900/50 border border-gray-800 rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-primary-500/20 rounded-lg flex items-center justify-center">
                    <Zap className="w-5 h-5 text-primary-400" />
                  </div>
                  <h3 className="font-semibold">Zero Dependencies</h3>
                </div>
                <p className="text-gray-400 text-sm">
                  Lightweight and self-contained. No external dependencies to worry about.
                </p>
              </div>

              <div className="p-5 bg-gray-900/50 border border-gray-800 rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <Package className="w-5 h-5 text-green-400" />
                  </div>
                  <h3 className="font-semibold">TypeScript First</h3>
                </div>
                <p className="text-gray-400 text-sm">
                  Built with TypeScript. Full type definitions included.
                </p>
              </div>

              <div className="p-5 bg-gray-900/50 border border-gray-800 rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <Globe className="w-5 h-5 text-purple-400" />
                  </div>
                  <h3 className="font-semibold">i18n Support</h3>
                </div>
                <p className="text-gray-400 text-sm">
                  15+ locales with proper Unicode handling and locale-aware operations.
                </p>
              </div>

              <div className="p-5 bg-gray-900/50 border border-gray-800 rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                    <Puzzle className="w-5 h-5 text-orange-400" />
                  </div>
                  <h3 className="font-semibold">Plugin System</h3>
                </div>
                <p className="text-gray-400 text-sm">
                  Extensible micro-kernel architecture for custom methods.
                </p>
              </div>
            </div>
          </section>

          {/* Next Steps */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Next Steps</h2>
            <div className="grid gap-4">
              <Link
                to="/docs/api"
                className="group flex items-center justify-between p-5 bg-gray-900/50 hover:bg-gray-900/80 border border-gray-800 hover:border-primary-500/50 rounded-xl transition-all duration-300"
              >
                <div>
                  <h3 className="font-semibold mb-1 group-hover:text-primary-400 transition">API Reference</h3>
                  <p className="text-gray-400 text-sm">Explore all 115+ methods across 10 categories</p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-primary-400 group-hover:translate-x-1 transition-all" />
              </Link>

              <Link
                to="/docs/examples"
                className="group flex items-center justify-between p-5 bg-gray-900/50 hover:bg-gray-900/80 border border-gray-800 hover:border-green-500/50 rounded-xl transition-all duration-300"
              >
                <div>
                  <h3 className="font-semibold mb-1 group-hover:text-green-400 transition">Examples</h3>
                  <p className="text-gray-400 text-sm">Real-world usage patterns and recipes</p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-green-400 group-hover:translate-x-1 transition-all" />
              </Link>

              <Link
                to="/docs/playground"
                className="group flex items-center justify-between p-5 bg-gray-900/50 hover:bg-gray-900/80 border border-gray-800 hover:border-purple-500/50 rounded-xl transition-all duration-300"
              >
                <div>
                  <h3 className="font-semibold mb-1 group-hover:text-purple-400 transition">Playground</h3>
                  <p className="text-gray-400 text-sm">Try StrKit directly in your browser</p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
              </Link>
            </div>
          </section>
        </div>

        <Footer />
      </main>
    </div>
  )
}
