import Logo from '@/assets/logo.png'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'
import { useAuth } from '@/hooks/useAuth'
import { Book, LogOut, User } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Packages', to: '/packages' },
  { label: 'Contact', to: '/contact' },
]

function Navbar() {
  const { isLoggedIn, user, logOut } = useAuth()
  return (
    <header className='border-b p-4'>
      <div className='flex items-center justify-between'>
        <NavLink to='/' className='text-lg font-semibold'>
          <div className='flex items-center gap-1'>
            <img src={Logo} alt='Logo' className='h-10 w-10' />
            <span>Travel Experts</span>
          </div>
        </NavLink>
        <div className='flex items-center justify-between'>
          <NavigationMenu className='px-2'>
            <NavigationMenuList>
              {navLinks.map(({ label, to }) => (
                <NavigationMenuItem key={to}>
                  <NavLink
                    to={to}
                    className={({ isActive }) => (isActive ? 'bg-muted' : '')}
                  >
                    {({ isActive }) => (
                      <Button variant={isActive ? 'secondary' : 'ghost'}>
                        {label}
                      </Button>
                    )}
                  </NavLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {isLoggedIn ? (
            <div className='flex items-center gap-2'>
              <AvatarWithDropDownMenu
                name={user?.name ?? 'User'}
                image={user?.photoUrl}
                signOut={logOut}
              />
            </div>
          ) : (
            <NavLink to={'/login'}>
              <Button>Sign In</Button>
            </NavLink>
          )}
        </div>
      </div>
    </header>
  )
}

type AvatarWithDropDownMenuProps = {
  image?: string | undefined
  name: string
  signOut?: () => void
}

function AvatarWithDropDownMenu({
  image,
  name,
  signOut,
}: AvatarWithDropDownMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src={image} />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <NavLink to='/account/profile'>
            <DropdownMenuItem>
              <User />
              <span>Account</span>
            </DropdownMenuItem>
          </NavLink>
          <NavLink to='/account/booking'>
            <DropdownMenuItem>
              <Book />
              <span>Booking Detail</span>
            </DropdownMenuItem>
          </NavLink>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut />
          <span onClick={signOut}>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Navbar
