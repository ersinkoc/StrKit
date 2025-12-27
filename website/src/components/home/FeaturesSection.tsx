import { Link } from 'react-router-dom'
import {
  MessageSquare,
  CheckCircle,
  Puzzle,
  BarChart3,
  AlignLeft,
  Layout,
  ArrowRight
} from 'lucide-react'

const features = [
  {
    to: '/docs/api/case',
    icon: MessageSquare,
    title: 'Case Conversion',
    description: 'camelCase, kebab-case, snake_case, PascalCase, Title Case and more.',
    color: 'primary',
  },
  {
    to: '/docs/api/validation',
    icon: CheckCircle,
    title: 'Validation',
    description: 'Email, URL, UUID, IP, credit card, and 15+ more validators.',
    color: 'green',
  },
  {
    to: '/docs/api/manipulation',
    icon: Puzzle,
    title: 'Manipulation',
    description: 'Trim, pad, wrap, truncate, reverse, replace, and more.',
    color: 'blue',
  },
  {
    to: '/docs/api/similarity',
    icon: BarChart3,
    title: 'Similarity',
    description: 'Levenshtein, Dice, Jaro-Winkler, Hamming, and fuzzy matching.',
    color: 'cyan',
  },
  {
    to: '/docs/api/diff',
    icon: AlignLeft,
    title: 'Diff & Patch',
    description: 'Character, word, and line diffs with unified patch support.',
    color: 'orange',
  },
  {
    to: '/docs/api/formatting',
    icon: Layout,
    title: 'Formatting',
    description: 'Template, sprintf, mask, currency, and number formatting.',
    color: 'pink',
  },
]

const colorClasses: Record<string, { bg: string; text: string; hover: string }> = {
  primary: { bg: 'from-primary-500/20 to-primary-500/5', text: 'text-primary-400', hover: 'hover:border-primary-500/50' },
  green: { bg: 'from-green-500/20 to-green-500/5', text: 'text-green-400', hover: 'hover:border-green-500/50' },
  blue: { bg: 'from-blue-500/20 to-blue-500/5', text: 'text-blue-400', hover: 'hover:border-blue-500/50' },
  cyan: { bg: 'from-cyan-500/20 to-cyan-500/5', text: 'text-cyan-400', hover: 'hover:border-cyan-500/50' },
  orange: { bg: 'from-orange-500/20 to-orange-500/5', text: 'text-orange-400', hover: 'hover:border-orange-500/50' },
  pink: { bg: 'from-pink-500/20 to-pink-500/5', text: 'text-pink-400', hover: 'hover:border-pink-500/50' },
}

export default function FeaturesSection() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">Everything you need</h2>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            Comprehensive string toolkit with all the methods you'll ever need.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const colorClass = colorClasses[feature.color]
            return (
              <Link
                key={feature.to}
                to={feature.to}
                className={`group card-shine p-6 bg-gray-900/50 hover:bg-gray-900/80 border border-gray-800 ${colorClass.hover} rounded-2xl transition-all duration-300 glow-hover`}
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${colorClass.bg} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`w-7 h-7 ${colorClass.text}`} />
                </div>
                <h3 className={`text-xl font-semibold mb-3 group-hover:${colorClass.text} transition`}>
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.description}</p>
              </Link>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/docs/api"
            className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 font-semibold text-lg group"
          >
            View all 10 categories
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  )
}
