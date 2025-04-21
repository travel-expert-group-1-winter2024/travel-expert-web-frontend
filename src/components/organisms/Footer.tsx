const Footer = () => {
  return (
    <footer className='bg-primary text-primary-foreground py-6'>
      <div className='container mx-auto text-center'>
        <p>
          &copy; {new Date().getFullYear()} Travel Experts. All rights reserved.
        </p>
        <nav className='mt-2'>
          <a
            href='#'
            className='text-muted transition-colors hover:text-[#553C9A] hover:underline'
          >
            Privacy Policy
          </a>{' '}
          |
          <a
            href='#'
            className='text-muted ml-2 transition-colors hover:text-[#553C9A] hover:underline'
          >
            Terms of Service
          </a>{' '}
        </nav>
      </div>
    </footer>
  )
}

export default Footer
