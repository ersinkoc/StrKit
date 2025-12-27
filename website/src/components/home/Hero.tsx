import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Play, Copy, Check } from 'lucide-react'

export default function Hero() {
  const [copied, setCopied] = useState(false)

  const copyInstall = async () => {
    await navigator.clipboard.writeText('npm install @oxog/strkit')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="pt-32 lg:pt-40 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary-500/10 to-accent-500/10 border border-primary-500/20 rounded-full mb-8 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <span className="text-sm font-medium text-primary-300">v1.0 Released - Zero Dependencies</span>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight mb-8 opacity-0 animate-slide-up delay-100">
            <span className="block">String manipulation</span>
            <span className="gradient-text">made simple.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl lg:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 opacity-0 animate-slide-up delay-200 leading-relaxed">
            The Swiss Army knife for string operations. <span className="text-white font-semibold">115+ methods</span>,
            4 API styles, TypeScript-first, with full i18n support.
          </p>

          {/* Install command */}
          <div className="inline-flex items-center space-x-3 px-6 py-4 code-block rounded-2xl mb-12 opacity-0 animate-slide-up delay-300 glow">
            <span className="text-primary-400 font-mono">$</span>
            <code className="text-gray-100 font-mono text-lg">npm install @oxog/strkit</code>
            <button
              onClick={copyInstall}
              className="p-2 hover:bg-white/10 rounded-lg transition-all duration-200 group"
            >
              {copied ? (
                <Check className="w-5 h-5 text-green-400" />
              ) : (
                <Copy className="w-5 h-5 text-gray-400 group-hover:text-white transition" />
              )}
            </button>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-slide-up delay-400">
            <Link
              to="/docs"
              className="group w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-xl shadow-primary-500/25 flex items-center justify-center gap-2"
            >
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/docs/playground"
              className="group w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Play className="w-5 h-5 text-primary-400" />
              Try Playground
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
