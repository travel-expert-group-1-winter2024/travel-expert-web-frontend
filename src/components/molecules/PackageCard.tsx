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

type Props = {
  pkg: Package
  imageUrl?: string
}

export function PackageCard({
  pkg,
  imageUrl = 'https://placehold.co/600x400',
}: Props) {
  return (
    <Card>
      <CardHeader className='min-h-15'>
        <CardTitle>{pkg.pkgname}</CardTitle>
        <CardDescription>{pkg.pkgdesc}</CardDescription>
      </CardHeader>
      <CardContent className='flex aspect-square items-center justify-center p-6'>
        <img
          src={imageUrl}
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
        <Button>Book</Button>
      </CardFooter>
    </Card>
  )
}
