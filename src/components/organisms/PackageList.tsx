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
import { Command, CommandInput } from '@/components/ui/command.tsx'
import { Package } from '@/types/package.ts'
import { useState } from 'react'

interface PackageListProps {
  packages: Package[]
}

function PackageList({ packages }: PackageListProps) {
  const [selectedFilter, setSelectedFilter] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const filters = [
    'All',
    'Adventure',
    'Relaxation',
    'Cultural',
    'Nature',
    'Family',
  ]

  const onSearchChanged = (value: string) => {
    setSearchTerm(value)
  }

  return (
    <section className='bg-secondary py-12'>
      <div className='flex items-center justify-center gap-4 xl:gap-20'>
        <div className='flex flex-col'>
          <div className='text-center'>
            <p className='mb-2 text-sm tracking-widest text-gray-400 uppercase'>
              Explore Destinations
            </p>
            <h2 className='text-2xl font-semibold text-gray-800 md:text-3xl'>
              Discover the Best Getaways, Adventures, and Stays
            </h2>
            <p className='mx-auto mt-3 max-w-xl text-gray-600'>
              Plan your perfect trip with curated packages, exciting activities,
              and top-rated hotels.
            </p>
          </div>
          <div className='mt-6 flex flex-wrap justify-center gap-3'>
            {filters.map((filter) => (
              <Button
                key={filter}
                variant={selectedFilter === filter ? 'default' : 'outline'}
                onClick={() => setSelectedFilter(filter)}
              >
                {filter}
              </Button>
            ))}
          </div>
        </div>
        <div className='w-full max-w-sm px-2 md:max-w-2xl lg:max-w-5xl'>
          {/* search bar*/}
          <Command className='mb-5 justify-self-end rounded-lg border bg-gray-50 md:w-1/3'>
            <CommandInput
              placeholder='Type a search...'
              onValueChange={onSearchChanged}
            />
          </Command>
          <Carousel
            opts={{
              align: 'start',
            }}
          >
            <CarouselContent className='-ml-1'>
              {packages
                .filter(
                  (pkg) =>
                    (selectedFilter === 'All' ||
                      pkg.tags.some(
                        (tag) =>
                          tag.toLowerCase() === selectedFilter.toLowerCase(),
                      )) &&
                    (pkg.pkgName
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                      pkg.pkgDesc
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())),
                )
                .map((pkg, index) => (
                  <CarouselItem
                    key={index}
                    className='pl-2 md:basis-1/2 lg:basis-1/2 xl:basis-1/3'
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
            <CarouselPrevious className='hidden xl:flex' />
            <CarouselNext className='hidden xl:flex' />
          </Carousel>
        </div>
      </div>
    </section>
  )
}

export default PackageList
