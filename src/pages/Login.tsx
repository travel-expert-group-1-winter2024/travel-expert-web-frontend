import React from 'react'
import { LoginForm } from '../components/molecules/LoginForm.tsx'

const LoginPage: React.FC = () => {
  return (
    <div className='login-page flex min-h-svh w-full items-center justify-center p-6 md:p-10'>
      <div className='w-full max-w-sm'>
        <h1 className='text-2xl'>Login to Your Account</h1>
        <LoginForm />
        <div className={'additional-links'}>
          <p>
            Don't have an account? <a href={'/sign-up'}>Sign up</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
