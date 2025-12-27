import { Link } from 'react-router-dom'
import { Github } from 'lucide-react'

export default function CTASection() {
  return (
    <section className="py-32 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl lg:text-5xl font-bold mb-6">
          Ready to simplify your string operations?
        </h2>
        <p className="text-gray-400 text-xl mb-12">
          Get started in seconds. No configuration needed.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/docs"
            className="group w-full sm:w-auto px-10 py-5 bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-xl shadow-primary-500/25 text-lg"
          >
            Read the Documentation
          </Link>
          <a
            href="https://github.com/ersinkoc/strkit"
            target="_blank"
            rel="noopener noreferrer"
            className="group w-full sm:w-auto px-10 py-5 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 flex items-center justify-center gap-3 text-lg"
          >
            <Github className="w-6 h-6" />
            View on GitHub
          </a>
        </div>
      </div>
    </section>
  )
}
