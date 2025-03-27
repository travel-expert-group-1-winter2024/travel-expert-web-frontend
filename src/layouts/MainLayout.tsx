import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer.tsx'
import Navbar from '../components/Navbar.tsx'

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default MainLayout
