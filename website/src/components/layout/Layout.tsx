import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import AnimatedBackground from '../ui/AnimatedBackground'
import ScrollProgress from '../ui/ScrollProgress'
import BackToTop from '../ui/BackToTop'

export default function Layout() {
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollProgress />
      <AnimatedBackground />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      {isHomePage && <Footer />}
      <BackToTop />
    </div>
  )
}
