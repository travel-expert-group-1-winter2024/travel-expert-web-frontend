import React from 'react'

import { SignUpForm } from '@/components/molecules/SignUpForm.tsx'
import { Card, CardContent } from '@/components/ui/card.tsx'

const SignUpPage: React.FC = () => {
  return (
    <div className='flex min-h-full flex-1 flex-col items-center justify-center px-6 py-12 lg:px-8'>
      <div className='w-full max-w-full sm:mx-auto sm:max-w-md md:max-w-2xl xl:max-w-4xl 2xl:max-w-6xl'>
        <Card>
          <CardContent>
            <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
              <h2 className='mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900'>
                Register for your new account
              </h2>
            </div>

            <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-2xl'>
              <SignUpForm />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default SignUpPage
