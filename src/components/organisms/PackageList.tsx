import { Button } from '@/components/ui/button.tsx'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel.tsx'
import { Package } from '@/types/package.ts'

interface PackageListProps {
  packages: Package[]
}

function PackageList({ packages }: PackageListProps) {
  return (
    <section className='bg-secondary flex justify-center py-12'>
      <Carousel
        opts={{
          align: 'start',
        }}
        className='w-full max-w-sm md:max-w-2xl lg:max-w-5xl'
      >
        <CarouselContent className='-ml-1'>
          {packages.map((pkg, index) => (
            <CarouselItem
              key={index}
              className='pl-2 md:basis-1/2 lg:basis-1/3'
            >
              <div className='p-1'>
                <Card>
                  <CardHeader>
                    <CardTitle>{pkg.pkgName}</CardTitle>
                    <CardDescription>{pkg.pkgDesc}</CardDescription>
                  </CardHeader>
                  <CardContent className='flex aspect-square items-center justify-center p-6'>
                    <img
                      src='https://placehold.co/600x400'
                      alt={pkg.pkgName}
                      className='h-full w-full object-cover'
                    />
                  </CardContent>
                  <CardFooter className='flex justify-between'>
                    <p>${pkg.pkgBasePrice + pkg.pkgAgencyCommission}</p>
                    <Button>Book</Button>
                  </CardFooter>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  )
}

export default PackageList
