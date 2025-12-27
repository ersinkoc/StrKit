import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl gradient-border p-[2px]">
              <div className="w-full h-full bg-gray-900 rounded-[10px] flex items-center justify-center">
                <span className="text-lg font-black gradient-text">S</span>
              </div>
            </div>
            <div>
              <span className="font-bold text-lg">StrKit</span>
              <span className="text-gray-500 text-sm ml-2">by OXOG</span>
            </div>
          </div>

          <div className="flex items-center flex-wrap justify-center gap-6 text-sm">
            <Link to="/docs" className="text-gray-400 hover:text-white transition">
              Docs
            </Link>
            <Link to="/docs/api" className="text-gray-400 hover:text-white transition">
              API
            </Link>
            <Link to="/docs/examples" className="text-gray-400 hover:text-white transition">
              Examples
            </Link>
            <Link to="/docs/playground" className="text-gray-400 hover:text-white transition">
              Playground
            </Link>
            <a
              href="https://github.com/ersinkoc/strkit"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition"
            >
              GitHub
            </a>
            <a
              href="https://www.npmjs.com/package/@oxog/strkit"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition"
            >
              npm
            </a>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-white/5 text-center text-sm text-gray-500">
          Released under the MIT License. Open source and free forever.
        </div>
      </div>
    </footer>
  )
}
