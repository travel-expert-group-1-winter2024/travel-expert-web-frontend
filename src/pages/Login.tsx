import React from 'react'
import { LoginForm } from '../components/molecules/LoginForm.tsx'

const LoginPage: React.FC = () => {
  return (
    // login
    <div className='flex h-screen w-full items-center justify-center p-6'>
      <div className='w-full max-w-sm'>
        <LoginForm />
      </div>
    </div>
  )
}

export default LoginPage
