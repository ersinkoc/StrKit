const stats = [
  { value: '115+', label: 'Methods' },
  { value: '10', label: 'Categories' },
  { value: '0', label: 'Dependencies' },
  { value: '15', label: 'Locales' },
]

export default function StatsSection() {
  return (
    <section className="py-20 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-500/5 to-transparent" />
      <div className="max-w-6xl mx-auto relative">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-6 rounded-2xl bg-gray-900/30 border border-gray-800/50 hover:border-primary-500/30 transition-all duration-300 group"
            >
              <div className="text-5xl lg:text-6xl font-black gradient-text mb-3 group-hover:scale-110 transition-transform">
                {stat.value}
              </div>
              <div className="text-gray-400 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
