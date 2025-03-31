import Contact from '@/pages/Contact.tsx'
import Profile from '@/pages/account/Profile.tsx'
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
          <Route index element={<Profile />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default AppRoutes
