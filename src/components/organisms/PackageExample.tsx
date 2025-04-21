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
    <section id='packages' className='bg-[#FAF5FF] py-12'>
      <div className='container mx-auto flex flex-col items-center justify-center gap-4 2xl:gap-10'>
        <div className='flex flex-col'>
          <div className='text-center'>
            <p className='text-secondary mb-2 text-sm tracking-widest uppercase'>
              Explore Destinations
            </p>
            <h2 className='text-foreground text-2xl font-semibold md:text-3xl'>
              Discover the Best Getaways, Adventures, and Stays
            </h2>
            <p className='text-muted-foreground mx-auto mt-3 max-w-xl'>
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
        <div className='w-full max-w-sm md:max-w-3xl xl:max-w-4xl 2xl:max-w-6xl'>
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
