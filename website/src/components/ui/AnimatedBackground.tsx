export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Gradient orbs */}
      <div className="absolute top-[-10%] left-[10%] w-[600px] h-[600px] bg-primary-500/20 rounded-full blur-[120px] animate-pulse-glow" />
      <div className="absolute top-[20%] right-[5%] w-[500px] h-[500px] bg-accent-500/20 rounded-full blur-[100px] animate-pulse-glow delay-200" />
      <div className="absolute bottom-[10%] left-[20%] w-[400px] h-[400px] bg-pink-500/15 rounded-full blur-[80px] animate-pulse-glow delay-400" />
      <div className="absolute bottom-[30%] right-[25%] w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[60px] animate-pulse-glow delay-300" />

      {/* Floating shapes */}
      <div className="absolute top-[15%] left-[5%] w-20 h-20 border border-primary-500/20 rounded-2xl animate-float opacity-30" />
      <div className="absolute top-[60%] right-[8%] w-16 h-16 border border-accent-500/20 rounded-full animate-float-slow opacity-30" />
      <div className="absolute bottom-[20%] left-[12%] w-12 h-12 bg-primary-500/10 rounded-lg animate-float delay-200 opacity-40" />
      <div className="absolute top-[40%] right-[15%] w-8 h-8 bg-pink-500/10 rounded-full animate-float-slow delay-300 opacity-40" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'linear-gradient(rgba(99,102,241,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.03) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }}
      />
    </div>
  )
}
