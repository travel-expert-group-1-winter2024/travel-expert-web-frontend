import { authUser, userLogin } from '@/api/authApi.ts'
import { LoginRequest } from '@/types/auth.ts'
import { User } from '@/types/userInfo.ts'
import { useMutation } from '@tanstack/react-query'
import * as React from 'react'
import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface AuthContextType {
  user: User | null
  token: string
  isLoggedIn: boolean
  loginAction: (
    data: LoginRequest,
    callbacks?: {
      onSuccess?: () => void
      onError?: (err: Error) => void
    },
  ) => void
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
  })

  const loginAction = (
    data: LoginRequest,
    callbacks?: {
      onSuccess?: () => void
      onError?: (err: Error) => void
    },
  ): void => {
    mutation.mutate(data, {
      onSuccess: (response) => {
        const { data, token } = response.data
        setUser(data)
        setToken(token)
        localStorage.setItem('site', token)
        navigate('/')
        callbacks?.onSuccess?.()
      },
      onError: (err) => {
        callbacks?.onError?.(err)
      },
    })
  }

  const logOut = () => {
    setUser(null)
    setToken('')
    localStorage.removeItem('site')
    navigate('/login')
  }

  // add useEffect here to prevent user from being logged out when the page is refreshed
  useEffect(() => {
    // check if token is present in local storage
    const storedToken = localStorage.getItem('site')
    if (!storedToken) return

    // if token is present, set it to state by
    const restoreUser = async () => {
      try {
        const res = await authUser(token)
        setToken(token)
        setUser(res.data.data)
      } catch (err) {
        console.error('Session restore failed:', err)
        logOut()
      }
    }

    restoreUser()
  }, [])

  const isLoggedIn = !!token

  return (
    <AuthContext.Provider
      value={{ token, user, isLoggedIn, loginAction, logOut }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
