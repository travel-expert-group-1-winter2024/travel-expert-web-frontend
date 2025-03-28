import { Outlet } from 'react-router-dom'
import Footer from '../components/organisms/Footer.tsx'
import Navbar from '../components/organisms/Navbar.tsx'

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
