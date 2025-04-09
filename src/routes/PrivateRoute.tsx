import { useAuth } from '@/hooks/useAuth.ts'
import { Navigate, Outlet } from 'react-router-dom'

function PrivateRoute() {
  const user = useAuth()
  if (!user.token) return <Navigate to='/login' />
  return <Outlet />
}

export default PrivateRoute
