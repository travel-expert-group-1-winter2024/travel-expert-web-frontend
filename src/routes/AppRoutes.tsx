import Contact from '@/pages/Contact.tsx'
import LoginPage from '@/pages/Login.tsx'
import PackageDetails from '@/pages/PackageDetails.tsx'
import { PackageList } from '@/pages/PackageList.tsx'
import SignUpPage from '@/pages/SignUp.tsx'
import Booking from '@/pages/account/Booking.tsx'
import Profile from '@/pages/account/Profile.tsx'
import TravelHistory from '@/pages/account/TravelHistory.tsx'
import PrivateRoute from '@/routes/PrivateRoute.tsx'
import { Route, Routes } from 'react-router-dom'
import AccountLayout from '../layouts/AccountLayout.tsx'
import MainLayout from '../layouts/MainLayout.tsx'
import Home from '../pages/Home.tsx'
import PaymentsPage from '@/pages/Payments.tsx'
import BookingConfirmationPage from '@/pages/BookingConfirmation.tsx'

function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/sign-up' element={<SignUpPage />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/packages' element={<PackageList />} />
        <Route path='/packages/:packageId' element={<PackageDetails />} />
        <Route element={<PrivateRoute />}>
          <Route path='/account' element={<AccountLayout />}>
            <Route path='profile' element={<Profile />} />
            <Route path='booking' element={<Booking />} />
            <Route path='travel-history' element={<TravelHistory />} />
          </Route>
          <Route path='/payment/:packageId' element={<PaymentsPage />} />
          <Route path='/bookingconfirmation' element={<BookingConfirmationPage />} />
        </Route>
        {/* Other routes */}
      </Route>
    </Routes>
  )
}

export default AppRoutes
