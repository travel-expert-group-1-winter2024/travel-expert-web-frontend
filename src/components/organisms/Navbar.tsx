import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'
import { useAuth } from '@/hooks/useAuth'

function Navbar() {
  const { user, signIn, signOut } = useAuth()
  return (
    <header className='border-b p-4'>
      <div className='flex items-center justify-between'>
        <h1 className='text-lg font-semibold'>Travel Experts</h1>
        <div className='flex items-center justify-between'>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Button variant='ghost'>Home</Button>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Button variant='ghost'>Packages</Button>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Button variant='ghost'>Contact</Button>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {user ? (
            <div className='flex items-center gap-2'>
              <Avatar>
                <AvatarImage src={user.image} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <Button variant='outline' onClick={signOut}>
                Sign Out
              </Button>
            </div>
          ) : (
            <Button
              onClick={() =>
                signIn({
                  name: 'Guest',
                  image: 'https://via.placeholder.com/40',
                })
              }
            >
              Sign In
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar
