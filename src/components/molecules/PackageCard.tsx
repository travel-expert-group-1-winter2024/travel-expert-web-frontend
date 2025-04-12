import { Button } from '@/components/ui/button.tsx'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx'
import { Package } from '@/types/package.ts'
import { useNavigate } from 'react-router-dom'

type Props = {
  pkg: Package
}

export function PackageCard({ pkg }: Props) {
  const navigate = useNavigate()

  return (
    <Card>
      <CardHeader className='min-h-15'>
        <CardTitle>{pkg.pkgname}</CardTitle>
        <CardDescription>{pkg.pkgdesc}</CardDescription>
      </CardHeader>
      <CardContent className='flex aspect-square items-center justify-center p-6'>
        <img
          src={pkg.photoURL ?? 'https://placehold.co/600x400'}
          alt={pkg.pkgname}
          className='h-full w-full object-cover'
        />
      </CardContent>
      <CardFooter className='flex justify-between'>
        <p>
          {(pkg.pkgbaseprice + pkg.pkgagencycommission).toLocaleString(
            'en-CA',
            {
              style: 'currency',
              currency: 'CAD',
            },
          )}
        </p>
        <Button onClick={() => navigate(`/packages/${pkg.packageid}`)}>
          Book
        </Button>
      </CardFooter>
    </Card>
  )
}
