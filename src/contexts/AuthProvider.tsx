import { userLogin } from '@/api/authApi.ts'
import { User } from '@/types/loginResponse.ts'
import { useMutation } from '@tanstack/react-query'
import * as React from 'react'
import { createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface LoginData {
  username: string
  password: string
}

interface AuthContextType {
  user: User | null
  token: string
  loginAction: (data: LoginData) => Promise<void>
  logOut: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState(localStorage.getItem('site') || '')
  const navigate = useNavigate()

  // create mutation for login
  const mutation = useMutation({
    mutationFn: userLogin,
    onSuccess: (response) => {
      const { data, token } = response.data
      setUser(data)
      setToken(token)
      localStorage.setItem('site', token)
      navigate('/account/profile')
    },
    onError: (error) => {
      console.error('Login failed:', error)
    },
  })

  const loginAction = async (data: LoginData): Promise<void> => {
    try {
      // use mutation to login
      console.log(data)
      await mutation.mutateAsync(data)
    } catch (err) {
      console.error(err)
    }
  }

  const logOut = () => {
    setUser(null)
    setToken('')
    localStorage.removeItem('site')
    navigate('/login')
  }

  return (
    <AuthContext.Provider value={{ token, user, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
