import { useAuth } from '@/hooks/useAuth.ts'
import { Navigate, Outlet } from 'react-router-dom'

function PrivateRoute() {
  const { isLoggedIn } = useAuth()
  if (!isLoggedIn) return <Navigate to='/login' />
  return <Outlet />
}

export default PrivateRoute
