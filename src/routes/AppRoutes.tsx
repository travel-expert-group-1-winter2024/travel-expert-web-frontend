import Contact from '@/pages/Contact.tsx'
import Booking from '@/pages/account/Booking.tsx'
import Profile from '@/pages/account/Profile.tsx'
import TravelHistory from '@/pages/account/TravelHistory.tsx'
import { Route, Routes } from 'react-router-dom'
import AccountLayout from '../layouts/AccountLayout.tsx'
import MainLayout from '../layouts/MainLayout.tsx'
import Home from '../pages/Home.tsx'

function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/account' element={<AccountLayout />}>
          <Route path='profile' element={<Profile />} />
          <Route path='booking' element={<Booking />} />
          <Route path='travel-history' element={<TravelHistory />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default AppRoutes
