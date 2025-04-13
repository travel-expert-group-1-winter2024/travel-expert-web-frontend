import { NavLink } from 'react-router-dom'

const navLinks = [
  { label: 'Profile', to: '/account/profile' },
  { label: 'Bookings', to: '/account/booking' },
<<<<<<< HEAD
  { label: 'Wallet', to: '/account/wallet' },
=======
>>>>>>> main
]

function AccountSideBar() {
  return (
    <nav className='grid gap-4 text-sm text-gray-500 dark:text-gray-400'>
      {navLinks.map(({ label, to }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            isActive ? 'font-semibold text-gray-900 dark:text-gray-50' : ''
          }
        >
          {label}
        </NavLink>
      ))}
    </nav>
  )
}

export default AccountSideBar
