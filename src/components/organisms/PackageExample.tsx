import { PackageCard } from '@/components/molecules/PackageCard.tsx'
import { Button } from '@/components/ui/button.tsx'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel.tsx'
import { Skeleton } from '@/components/ui/skeleton.tsx'
import { usePackages } from '@/hooks/usePackages.ts'
import { useState } from 'react'

const filters = [
  'All',
  'Adventure',
  'Relaxation',
  'Cultural',
  'Nature',
  'Family',
]

function PackageExample() {
  const [selectedFilter, setSelectedFilter] = useState('All')
  const { data, isLoading, error } = usePackages()

  const filteredPackages =
    selectedFilter === 'All'
      ? (data ?? [])
      : (data?.filter((pkg) =>
          pkg.tags?.some(
            (tag) => tag.toLowerCase() === selectedFilter.toLowerCase(),
          ),
        ) ?? [])

  const skeletonCards = Array.from({ length: 3 }).map((_, index) => (
    <CarouselItem
      key={index}
      className='pl-2 md:basis-1/2 lg:basis-1/2 xl:basis-1/3'
    >
      <div className='p-1'>
        <div className='flex flex-col space-y-3 rounded-md border bg-white p-4 shadow-sm'>
          <Skeleton className='h-[125px] w-full rounded-xl' />
          <div className='space-y-2'>
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-3/4' />
          </div>
        </div>
      </div>
    </CarouselItem>
  ))

  return (
    <section id='packages' className='bg-secondary py-12'>
      <div className='flex flex-col items-center justify-center gap-4 md:flex-row xl:gap-10 xl:px-5'>
        <div className='flex flex-col xl:px-9'>
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
        <div className='w-full max-w-sm px-2 md:max-w-2xl lg:max-w-5xl xl:mr-6'>
          <Carousel
            opts={{
              align: 'start',
            }}
          >
            <CarouselContent className='-ml-1'>
              {error ? (
                <div className='py-10 text-center font-medium text-red-500'>
                  Failed to load packages. Please try again later.
                </div>
              ) : isLoading ? (
                skeletonCards
              ) : (
                filteredPackages.map((pkg, index) => (
                  <CarouselItem
                    key={index}
                    className='pl-2 md:basis-1/2 lg:basis-1/2 xl:basis-1/3'
                  >
                    <div className='p-1'>
                      <PackageCard pkg={pkg} />
                    </div>
                  </CarouselItem>
                ))
              )}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  )
}

export default PackageExample
