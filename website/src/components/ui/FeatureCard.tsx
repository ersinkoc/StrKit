import { Link } from 'react-router-dom'
import { LucideIcon } from 'lucide-react'

interface FeatureCardProps {
  to: string
  icon: LucideIcon
  title: string
  description: string
  color: string
}

export default function FeatureCard({ to, icon: Icon, title, description, color }: FeatureCardProps) {
  const colorClasses: Record<string, { bg: string; text: string; hover: string }> = {
    primary: { bg: 'from-primary-500/20 to-primary-500/5', text: 'text-primary-400', hover: 'hover:border-primary-500/50' },
    green: { bg: 'from-green-500/20 to-green-500/5', text: 'text-green-400', hover: 'hover:border-green-500/50' },
    blue: { bg: 'from-blue-500/20 to-blue-500/5', text: 'text-blue-400', hover: 'hover:border-blue-500/50' },
    cyan: { bg: 'from-cyan-500/20 to-cyan-500/5', text: 'text-cyan-400', hover: 'hover:border-cyan-500/50' },
    orange: { bg: 'from-orange-500/20 to-orange-500/5', text: 'text-orange-400', hover: 'hover:border-orange-500/50' },
    pink: { bg: 'from-pink-500/20 to-pink-500/5', text: 'text-pink-400', hover: 'hover:border-pink-500/50' },
  }

  const colorClass = colorClasses[color] || colorClasses.primary

  return (
    <Link
      to={to}
      className={`group card-shine p-6 bg-gray-900/50 hover:bg-gray-900/80 border border-gray-800 ${colorClass.hover} rounded-2xl transition-all duration-300 glow-hover`}
    >
      <div className={`w-14 h-14 bg-gradient-to-br ${colorClass.bg} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
        <Icon className={`w-7 h-7 ${colorClass.text}`} />
      </div>
      <h3 className={`text-xl font-semibold mb-3 group-hover:${colorClass.text} transition`}>
        {title}
      </h3>
      <p className="text-gray-400">{description}</p>
    </Link>
  )
}
