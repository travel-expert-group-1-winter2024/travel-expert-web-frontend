import React from 'react'
import { useNavigate } from 'react-router-dom'
import { LoginForm } from '../components/molecules/LoginForm.tsx'

const LoginPage: React.FC = () => {
  const navigate = useNavigate()
  return (
    // login
    <div className='flex h-full w-full items-center justify-center p-6 md:p-10'>
      <div className='w-full max-w-sm'>
        <h1 className='text-2xl'>Login to Your Account</h1>
        <LoginForm />
        {/* additional links*/}
        <div>
          <p>
            Don't have an account?{' '}
            <span
              onClick={() => navigate('/sign-up')}
              className='cursor-pointer text-blue-500 underline hover:text-blue-700'
            >
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
