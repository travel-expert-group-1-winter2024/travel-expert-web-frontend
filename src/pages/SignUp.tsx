import React from 'react'

import { SignUpForm } from '@/components/molecules/SignUpForm.tsx'

const SignUpPage: React.FC = () => {
  return (
    <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <img
          alt='Your Company'
          src='https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600'
          className='mx-auto h-10 w-auto'
        />
        <h2 className='mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900'>
          Register for your new account
        </h2>
      </div>

      <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-2xl'>
        <SignUpForm />
      </div>
    </div>
  )
}

export default SignUpPage
