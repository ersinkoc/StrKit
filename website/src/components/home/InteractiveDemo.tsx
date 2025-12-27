export default function InteractiveDemo() {
  return (
    <div className="max-w-4xl mx-auto opacity-0 animate-slide-up delay-500">
      <div className="code-block rounded-3xl overflow-hidden glow">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-800 bg-gray-900/50">
          <div className="flex items-center gap-4">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition cursor-pointer" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition cursor-pointer" />
              <div className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition cursor-pointer" />
            </div>
            <span className="text-sm text-gray-400 font-mono">interactive-demo.ts</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 text-xs bg-primary-500/20 text-primary-300 rounded font-medium">Live Demo</span>
          </div>
        </div>

        {/* Code content */}
        <div className="p-6">
          <pre className="font-mono text-sm lg:text-base leading-relaxed">
            <code>
              <span className="token-keyword">import</span>{' '}{'{'} str, S {'}'} <span className="token-keyword">from</span> <span className="token-string">'@oxog/strkit'</span>;{'\n'}
              {'\n'}
              <span className="token-comment">// Namespace API - organized by category</span>{'\n'}
              str.case.<span className="token-function">camel</span>(<span className="token-string">'hello world'</span>);        <span className="token-comment">// 'helloWorld'</span>{'\n'}
              str.validate.<span className="token-function">email</span>(<span className="token-string">'a@b.com'</span>);       <span className="token-comment">// true</span>{'\n'}
              str.similarity.<span className="token-function">dice</span>(<span className="token-string">'night'</span>, <span className="token-string">'nacht'</span>); <span className="token-comment">// 0.25</span>{'\n'}
              {'\n'}
              <span className="token-comment">// Chainable API - fluent & immutable</span>{'\n'}
              <span className="token-function">S</span>(<span className="token-string">'  Hello World  '</span>){'\n'}
              {'  '}.<span className="token-function">trim</span>(){'\n'}
              {'  '}.<span className="token-function">camelCase</span>(){'\n'}
              {'  '}.<span className="token-function">truncate</span>(<span className="token-number">8</span>){'\n'}
              {'  '}.value;  <span className="token-comment">// 'helloW...'</span>{'\n'}
              {'\n'}
              <span className="token-comment">// i18n support - Turkish locale</span>{'\n'}
              str.case.<span className="token-function">upper</span>(<span className="token-string">'istanbul'</span>, {'{'} locale: <span className="token-string">'tr'</span> {'}'}); <span className="token-comment">// 'İSTANBUL'</span>
            </code>
          </pre>
        </div>
      </div>
    </div>
  )
}
