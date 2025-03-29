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
import { Book, History, LogOut, User } from 'lucide-react'

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
            <div className='flex items-center gap-2 px-2'>
              <AvatarWithDropDownMenu
                name={user.name}
                image={user.image}
                signOut={signOut}
              />
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
          <DropdownMenuItem>
            <User />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Book />
            <span>Booking Detail</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <History />
            <span>Travel History</span>
          </DropdownMenuItem>
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
