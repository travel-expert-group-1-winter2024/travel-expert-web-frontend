import { Route, Routes } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout.tsx'
import Home from '../pages/Home.tsx'

function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
