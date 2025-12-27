import Hero from '../components/home/Hero'
import InteractiveDemo from '../components/home/InteractiveDemo'
import StatsSection from '../components/home/StatsSection'
import FeaturesSection from '../components/home/FeaturesSection'
import APIStylesSection from '../components/home/APIStylesSection'
import CTASection from '../components/home/CTASection'

export default function Home() {
  return (
    <>
      <Hero />
      <div className="max-w-6xl mx-auto px-4">
        <InteractiveDemo />
      </div>
      <StatsSection />
      <FeaturesSection />
      <APIStylesSection />
      <CTASection />
    </>
  )
}
