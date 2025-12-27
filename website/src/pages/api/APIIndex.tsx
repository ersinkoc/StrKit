import { Link } from 'react-router-dom'
import {
  MessageSquare,
  Puzzle,
  CheckCircle,
  Shield,
  Layout,
  BarChart3,
  FileText,
  Languages,
  GitCompare,
  Search
} from 'lucide-react'
import Sidebar from '../../components/layout/Sidebar'
import Footer from '../../components/layout/Footer'

const sidebarSections = [
  {
    title: 'API Reference',
    links: [
      { to: '/docs/api', label: 'Overview' },
      { to: '/docs/api/case', label: 'Case', color: '#60a5fa' },
      { to: '/docs/api/manipulation', label: 'Manipulation', color: '#4ade80' },
      { to: '/docs/api/validation', label: 'Validation', color: '#a78bfa' },
      { to: '/docs/api/sanitization', label: 'Sanitization', color: '#fb923c' },
      { to: '/docs/api/formatting', label: 'Formatting', color: '#f472b6' },
      { to: '/docs/api/similarity', label: 'Similarity', color: '#22d3ee' },
      { to: '/docs/api/analysis', label: 'Analysis', color: '#facc15' },
      { to: '/docs/api/pluralization', label: 'Pluralization', color: '#f87171' },
      { to: '/docs/api/diff', label: 'Diff', color: '#818cf8' },
      { to: '/docs/api/search', label: 'Search', color: '#34d399' },
    ],
  },
]

const categories = [
  {
    to: '/docs/api/case',
    icon: MessageSquare,
    title: 'Case Conversion',
    description: '14 methods for transforming string case with locale support.',
    methods: ['camel', 'kebab', 'snake', 'pascal', 'title', 'upper', 'lower'],
    color: 'blue',
  },
  {
    to: '/docs/api/manipulation',
    icon: Puzzle,
    title: 'Manipulation',
    description: '25+ methods for string manipulation and transformation.',
    methods: ['trim', 'pad', 'truncate', 'wrap', 'reverse', 'repeat'],
    color: 'green',
  },
  {
    to: '/docs/api/validation',
    icon: CheckCircle,
    title: 'Validation',
    description: '20+ validators for common string patterns.',
    methods: ['email', 'url', 'uuid', 'ip', 'creditCard', 'phone'],
    color: 'purple',
  },
  {
    to: '/docs/api/sanitization',
    icon: Shield,
    title: 'Sanitization',
    description: 'Clean and sanitize strings for safe usage.',
    methods: ['html', 'escape', 'unescape', 'slug', 'filename'],
    color: 'orange',
  },
  {
    to: '/docs/api/formatting',
    icon: Layout,
    title: 'Formatting',
    description: 'Format strings with templates, masks, and more.',
    methods: ['template', 'sprintf', 'mask', 'number', 'currency'],
    color: 'pink',
  },
  {
    to: '/docs/api/similarity',
    icon: BarChart3,
    title: 'Similarity',
    description: 'Compare strings and measure similarity.',
    methods: ['levenshtein', 'dice', 'jaroWinkler', 'hamming', 'cosine'],
    color: 'cyan',
  },
  {
    to: '/docs/api/analysis',
    icon: FileText,
    title: 'Analysis',
    description: 'Analyze string content and extract information.',
    methods: ['wordCount', 'charCount', 'stats', 'readingTime'],
    color: 'yellow',
  },
  {
    to: '/docs/api/pluralization',
    icon: Languages,
    title: 'Pluralization',
    description: 'Handle singular/plural forms with i18n support.',
    methods: ['pluralize', 'singularize', 'isPlural', 'isSingular'],
    color: 'red',
  },
  {
    to: '/docs/api/diff',
    icon: GitCompare,
    title: 'Diff & Patch',
    description: 'Compare strings and generate patches.',
    methods: ['chars', 'words', 'lines', 'unified', 'apply'],
    color: 'indigo',
  },
  {
    to: '/docs/api/search',
    icon: Search,
    title: 'Search',
    description: 'Search and match patterns in strings.',
    methods: ['fuzzy', 'indexOf', 'includes', 'match', 'highlight'],
    color: 'emerald',
  },
]

const colorClasses: Record<string, { bg: string; text: string; border: string }> = {
  blue: { bg: 'from-blue-500/20 to-blue-500/5', text: 'text-blue-400', border: 'hover:border-blue-500/50' },
  green: { bg: 'from-green-500/20 to-green-500/5', text: 'text-green-400', border: 'hover:border-green-500/50' },
  purple: { bg: 'from-purple-500/20 to-purple-500/5', text: 'text-purple-400', border: 'hover:border-purple-500/50' },
  orange: { bg: 'from-orange-500/20 to-orange-500/5', text: 'text-orange-400', border: 'hover:border-orange-500/50' },
  pink: { bg: 'from-pink-500/20 to-pink-500/5', text: 'text-pink-400', border: 'hover:border-pink-500/50' },
  cyan: { bg: 'from-cyan-500/20 to-cyan-500/5', text: 'text-cyan-400', border: 'hover:border-cyan-500/50' },
  yellow: { bg: 'from-yellow-500/20 to-yellow-500/5', text: 'text-yellow-400', border: 'hover:border-yellow-500/50' },
  red: { bg: 'from-red-500/20 to-red-500/5', text: 'text-red-400', border: 'hover:border-red-500/50' },
  indigo: { bg: 'from-indigo-500/20 to-indigo-500/5', text: 'text-indigo-400', border: 'hover:border-indigo-500/50' },
  emerald: { bg: 'from-emerald-500/20 to-emerald-500/5', text: 'text-emerald-400', border: 'hover:border-emerald-500/50' },
}

export default function APIIndex() {
  return (
    <div className="flex pt-16">
      <Sidebar sections={sidebarSections} />

      <main className="flex-1 lg:ml-72 min-h-screen">
        <div className="max-w-4xl mx-auto px-6 py-12 lg:py-16">
          {/* Header */}
          <header className="mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">API Reference</h1>
            <p className="text-xl text-gray-400 leading-relaxed">
              Explore all 115+ methods across 10 categories. Each method is available through
              multiple API styles.
            </p>
          </header>

          {/* Categories Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {categories.map((category) => {
              const colorClass = colorClasses[category.color]
              return (
                <Link
                  key={category.to}
                  to={category.to}
                  className={`group p-6 bg-gray-900/50 hover:bg-gray-900/80 border border-gray-800 ${colorClass.border} rounded-2xl transition-all duration-300`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${colorClass.bg} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                      <category.icon className={`w-6 h-6 ${colorClass.text}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className={`text-xl font-semibold mb-2 group-hover:${colorClass.text} transition`}>
                        {category.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-4">{category.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {category.methods.slice(0, 4).map((method) => (
                          <span
                            key={method}
                            className="px-2 py-1 text-xs font-mono bg-gray-800/50 text-gray-400 rounded"
                          >
                            {method}
                          </span>
                        ))}
                        {category.methods.length > 4 && (
                          <span className="px-2 py-1 text-xs font-mono text-gray-500">
                            +{category.methods.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        <Footer />
      </main>
    </div>
  )
}
