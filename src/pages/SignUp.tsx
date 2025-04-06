import React from 'react'

import { SignUpForm } from '@/components/molecules/SignUpForm.tsx'

const SignUpPage: React.FC = () => {
  return (
    <div className='login-page flex min-h-svh w-full items-center justify-center p-6 md:p-10'>
      <div className='w-full max-w-sm'>
        <h1 className='text-2xl'>Sign up here</h1>
        <SignUpForm />
        <div className={'additional-links'}>
          <p>
            Already have an account? <a href={'/login'}>Log in instead</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage
