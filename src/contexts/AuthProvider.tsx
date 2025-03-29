import * as React from 'react'
import { createContext, useState } from 'react'

type User = {
  name: string
  image?: string
}

type AuthContextType = {
  user: User | null
  signIn: (user: User) => void
  signOut: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const signIn = (user: User) => setUser(user)
  const signOut = () => setUser(null)

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
