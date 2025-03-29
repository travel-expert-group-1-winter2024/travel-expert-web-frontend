import { AuthProvider } from '@/contexts/AuthProvider.tsx'
import AppRoutes from '@/routes/AppRoutes.tsx'
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
