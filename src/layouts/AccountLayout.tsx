import AccountSideBar from '@/components/organisms/AccountSideBar.tsx'
import { Card, CardContent } from '@/components/ui/card.tsx'
import { Outlet } from 'react-router-dom'

export default function AccountLayout() {
  return (
    <div className='flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-gray-100/40 p-4 md:gap-8 md:p-10 dark:bg-gray-800/40'>
      <div className='mx-auto grid w-full max-w-6xl gap-2'>
        <h1 className='text-3xl font-semibold'>Account</h1>
      </div>
      <div className='mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]'>
        <AccountSideBar />
        <Card>
          <CardContent>
            <Outlet />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
