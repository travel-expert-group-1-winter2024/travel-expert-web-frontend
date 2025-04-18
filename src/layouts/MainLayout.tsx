import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Toaster } from 'sonner'
import ChatWidget from '../components/organisms/ChatWidget'
import Footer from '../components/organisms/Footer.tsx'
import Navbar from '../components/organisms/Navbar.tsx'

const MainLayout = () => {
  return (
    <>
      <ScrollToHashElement />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Toaster />
      <Footer />
      <ChatWidget />
    </>
  )
}

export default MainLayout

function ScrollToHashElement() {
  const { hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }, [hash])

  return null
}
