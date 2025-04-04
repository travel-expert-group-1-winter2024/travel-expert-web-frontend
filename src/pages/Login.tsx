import React from 'react'
import { LoginForm } from '../components/molecules/LoginForm.tsx'

const LoginPage: React.FC = () => {
  return (
    <div className={'login-page'}>
      <h1>Login to Your Account</h1>
      <LoginForm />
      <div className={'additional-links'}>
        <p>
          Don't have an account? <a href={'/sign-up'}>Sign up</a>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
