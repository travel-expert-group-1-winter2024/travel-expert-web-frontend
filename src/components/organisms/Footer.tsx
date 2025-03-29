const Footer = () => {
  return (
    <footer className='bg-primary text-primary-foreground py-6'>
      <div className='container mx-auto text-center'>
        <p>
          &copy; {new Date().getFullYear()} Travel Experts. All rights reserved.
        </p>
        <nav className='mt-2'>
          <a href='#' className='text-muted-foreground hover:text-white'>
            Privacy Policy
          </a>{' '}
          |
          <a href='#' className='text-muted-foreground ml-2 hover:text-white'>
            Terms of Service
          </a>{' '}
        </nav>
      </div>
    </footer>
  )
}

export default Footer
