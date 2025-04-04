import { LocationMap } from '@/components/molecules/LocationMap'
import { ReviewCard } from '@/components/molecules/ReviewCard'
import { WeatherForecast } from '@/components/molecules/WeatherForecast'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'
import { usePackageDetails } from '@/hooks/usePackageDetails'
import { Calendar, MapPin, Star } from 'lucide-react'
import { useParams } from 'react-router-dom'

export default function PackageDetails() {
  const { packageId } = useParams()
  const { data: pkg, isLoading, error } = usePackageDetails(packageId!)

  if (isLoading) return <div className='py-12 text-center'>Loading...</div>
  if (error)
    return (
      <div className='py-12 text-center text-red-500'>
        Error loading package details
      </div>
    )
  if (!pkg) return <div className='py-12 text-center'>Package not found</div>

  //   return (
  //     <section className='container py-6'>
  //       {/* Product Header Row */}
  //       <div className='flex flex-col gap-8 md:flex-row'>
  //         {/* Image - Amazon-style compact size */}
  //         <div className='w-full md:w-1/3'>
  //           <div className='sticky top-4 overflow-hidden rounded-lg shadow-md'>
  //             <img
  //               src={pkg.packageImage || 'https://placehold.co/600x400'}
  //               alt={pkg.pkgname}
  //               className='h-auto w-full object-cover'
  //             />
  //           </div>
  //         </div>

  //         {/* Main Content */}
  //         <div className='w-full md:w-2/3'>
  //           {/* Package Title */}
  //           <div className='mb-4'>
  //             <Badge variant='secondary'>{pkg.destination}</Badge>
  //             <h1 className='mt-2 text-2xl font-bold tracking-tight md:text-3xl'>
  //               {pkg.pkgname}
  //             </h1>
  //             <div className='mt-2 flex items-center gap-2 text-sm'>
  //               <div className='flex items-center gap-1'>
  //                 <Star className='h-4 w-4 fill-yellow-400 text-yellow-400' />
  //                 <span>4.8 (24 reviews)</span>
  //               </div>
  //             </div>
  //           </div>

  //           {/* About the Package */}
  //           <Card className='mb-6'>
  //             <CardHeader>
  //               <CardTitle>About the Package</CardTitle>
  //             </CardHeader>
  //             <CardContent>
  //               <p className='text-base leading-relaxed'>{pkg.pkgdesc}</p>
  //             </CardContent>
  //           </Card>

  //           {/* Trip Details */}
  //           <Card className='mb-6'>
  //             <CardHeader>
  //               <CardTitle>Trip Details</CardTitle>
  //             </CardHeader>
  //             <CardContent className='space-y-4'>
  //               <div className='flex items-center gap-4'>
  //                 <MapPin className='text-muted-foreground h-5 w-5' />
  //                 <div>
  //                   <p className='text-muted-foreground text-sm'>Destination</p>
  //                   <p>{pkg.destination}</p>
  //                 </div>
  //               </div>
  //               <div className='flex items-center gap-4'>
  //                 <Calendar className='text-muted-foreground h-5 w-5' />
  //                 <div>
  //                   <p className='text-muted-foreground text-sm'>Dates</p>
  //                   <p>
  //                     {new Date(pkg.pkgstartdate).toLocaleDateString('en-US', {
  //                       month: 'short',
  //                       day: 'numeric',
  //                       year: 'numeric',
  //                     })}{' '}
  //                     -{' '}
  //                     {new Date(pkg.pkgenddate).toLocaleDateString('en-US', {
  //                       month: 'short',
  //                       day: 'numeric',
  //                       year: 'numeric',
  //                     })}
  //                   </p>
  //                 </div>
  //               </div>
  //             </CardContent>
  //           </Card>

  //           {/* Price Summary - Sticky at bottom on scroll */}
  //           <Card className='border-primary sticky bottom-0 mb-6 border shadow-lg md:static'>
  //             <CardHeader>
  //               <CardTitle>Price Summary</CardTitle>
  //             </CardHeader>
  //             <CardContent className='space-y-3'>
  //               <div className='flex justify-between'>
  //                 <span>Package Base Price</span>
  //                 <span>${pkg.pkgbaseprice}</span>
  //               </div>
  //               <div className='flex justify-between'>
  //                 <span>Administration Fees</span>
  //                 <span>${pkg.pkgagencycommission}</span>
  //               </div>
  //               <div className='flex justify-between text-lg font-bold'>
  //                 <span>Total</span>
  //                 <span>${pkg.pkgbaseprice + pkg.pkgagencycommission}</span>
  //               </div>
  //             </CardContent>
  //             <CardFooter className='flex gap-3'>
  //               <Button className='flex-1'>Book Now</Button>
  //               <Button variant='outline' className='flex-1'>
  //                 Contact Agent
  //               </Button>
  //             </CardFooter>
  //           </Card>
  //         </div>
  //       </div>
  //       <div className='mt-12'>
  //         {/* Location Map */}
  //         <LocationMap destination={pkg.destination} />
  //       </div>

  //       {/* Right Column - Reviews */}
  //       <div className='space-y-8 mt-12'>
  //         <Card>
  //           <CardHeader>
  //             <CardTitle>Customer Reviews</CardTitle>
  //             <CardDescription>4.8 average from 24 reviews</CardDescription>
  //           </CardHeader>
  //           <CardContent>
  //             {/* Rating Breakdown */}
  //             <div className='mb-6 space-y-3'>
  //               {[5, 4, 3, 2, 1].map((stars) => (
  //                 <div key={stars} className='flex items-center gap-3'>
  //                   <span className='w-12 text-sm'>{stars} star</span>
  //                   <div className='h-2 flex-1 overflow-hidden rounded-full bg-gray-200'>
  //                     <div
  //                       className='h-full bg-yellow-400'
  //                       style={{
  //                         width: `${(stars === 5 ? 18 : stars === 4 ? 4 : 1) * 20}%`,
  //                       }}
  //                     />
  //                   </div>
  //                   <span className='text-muted-foreground w-8 text-right text-sm'>
  //                     {stars === 5 ? '18' : stars === 4 ? '4' : '1'}
  //                   </span>
  //                 </div>
  //               ))}
  //             </div>

  //             {/* Review List */}
  //             <div className='space-y-6'>
  //               <ReviewCard
  //                 name='Sarah Johnson'
  //                 rating={5}
  //                 date='2 weeks ago'
  //                 avatar='https://randomuser.me/api/portraits/women/44.jpg'
  //                 comment='The tour guides were incredibly knowledgeable and the itinerary was perfectly paced. Worth every penny!'
  //               />
  //               {/* Add more reviews */}
  //             </div>
  //           </CardContent>
  //         </Card>

  //         {/* Review Form */}
  //         <Card>
  //           <CardHeader>
  //             <CardTitle>Share Your Experience</CardTitle>
  //           </CardHeader>
  //           <CardContent>
  //             <form className='space-y-4'>
  //               <RadioGroup defaultValue='5' className='flex gap-1'>
  //                 {[1, 2, 3, 4, 5].map((value) => (
  //                   <div key={value} className='flex items-center space-x-2'>
  //                     <RadioGroupItem value={value.toString()} id={`r${value}`} />
  //                     <Label
  //                       htmlFor={`r${value}`}
  //                       className='flex items-center gap-1'
  //                     >
  //                       <Star className='h-4 w-4 fill-yellow-400 text-yellow-400' />
  //                       {value}
  //                     </Label>
  //                   </div>
  //                 ))}
  //               </RadioGroup>
  //               <Textarea
  //                 placeholder='Share your thoughts...'
  //                 className='min-h-[120px]'
  //               />
  //               <Button type='submit'>Submit Review</Button>
  //             </form>
  //           </CardContent>
  //         </Card>
  //       </div>
  //     </section>
  //   )
  // }
  return (
    <section className='container px-4 py-6 sm:px-6'>
      {/* Top Section - Image and Details */}
      <div className='flex flex-col gap-8 lg:flex-row'>
        {/* Image Carousel - Left Side */}
        <div className='w-full lg:w-2/5'>
          <div className='sticky top-4'>
            <Carousel className='rounded-xl shadow-lg'>
              <CarouselContent>
                {[1, 2, 3].map((index) => (
                  <CarouselItem key={index}>
                    <div className='aspect-square overflow-hidden rounded-xl'>
                      <img
                        src={
                          pkg.packageImage ||
                          `https://placehold.co/800x800?text=Image+${index}`
                        }
                        alt={`${pkg.pkgname} - ${index}`}
                        className='h-full w-full object-cover'
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className='left-2 h-8 w-8' />
              <CarouselNext className='right-2 h-8 w-8' />
            </Carousel>
          </div>
        </div>

        {/* Main Content - Right Side */}
        <div className='w-full lg:w-3/5'>
          {/* Package Header */}
          <div className='mb-6'>
            <Badge variant='secondary'>{pkg.destination}</Badge>
            <h1 className='mt-3 text-3xl font-bold tracking-tight'>
              {pkg.pkgname}
            </h1>
            <div className='mt-2 flex items-center gap-4'>
              <div className='flex items-center gap-1'>
                <Star className='h-5 w-5 fill-yellow-400 text-yellow-400' />
                <span className='font-medium'>4.8</span>
                <span className='text-muted-foreground'>(24 reviews)</span>
              </div>
            </div>
          </div>

          {/* Weather Forecast */}
          <WeatherForecast
            startDate={pkg.pkgstartdate}
            destination={pkg.destination}
          />

          {/* About the Package */}
          <Card className='mt-6 mb-6'>
            <CardHeader>
              <CardTitle>About This Package</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-base leading-relaxed'>{pkg.pkgdesc}</p>
            </CardContent>
          </Card>

          {/* Trip Details */}
          <Card className='mb-6'>
            <CardHeader>
              <CardTitle>Trip Details</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='flex items-center gap-4'>
                <MapPin className='text-muted-foreground h-5 w-5' />
                <div>
                  <p className='text-muted-foreground text-sm'>Destination</p>
                  <p>{pkg.destination}</p>
                </div>
              </div>
              <div className='flex items-center gap-4'>
                <Calendar className='text-muted-foreground h-5 w-5' />
                <div>
                  <p className='text-muted-foreground text-sm'>Dates</p>
                  <p>
                    {new Date(pkg.pkgstartdate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}{' '}
                    -{' '}
                    {new Date(pkg.pkgenddate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Price Summary */}
          <Card className='border-primary sticky bottom-0 z-10 border shadow-lg md:static'>
            <CardHeader>
              <CardTitle>Price Summary</CardTitle>
            </CardHeader>
            <CardContent className='space-y-3'>
              <div className='flex justify-between'>
                <span>Package Price</span>
                <span>${pkg.pkgbaseprice}</span>
              </div>
              <div className='flex justify-between'>
                <span>Administration Fees</span>
                <span>${pkg.pkgagencycommission}</span>
              </div>
              <div className='flex justify-between text-lg font-bold'>
                <span>Total</span>
                <span>${pkg.pkgbaseprice + pkg.pkgagencycommission}</span>
              </div>
            </CardContent>
            <CardFooter className='flex gap-3'>
              <Button className='flex-1'>Book Now</Button>
              <Button variant='outline' className='flex-1'>
                Reserve Now (Hold for 24 Hours){' '}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Location Map */}
      <div className='mt-12'>
        <LocationMap destination={pkg.destination} />
      </div>

      {/* Reviews Section */}
      <div className='mt-12 space-y-8'>
        <Card>
          <CardHeader>
            <CardTitle>Customer Reviews</CardTitle>
            <CardDescription>4.8 average from 24 reviews</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Rating Breakdown */}
            <div className='mb-6 space-y-3'>
              {[5, 4, 3, 2, 1].map((stars) => (
                <div key={stars} className='flex items-center gap-3'>
                  <span className='w-12 text-sm'>{stars} star</span>
                  <div className='h-2 flex-1 overflow-hidden rounded-full bg-gray-200'>
                    <div
                      className='h-full bg-yellow-400'
                      style={{
                        width: `${(stars === 5 ? 18 : stars === 4 ? 4 : 1) * 20}%`,
                      }}
                    />
                  </div>
                  <span className='text-muted-foreground w-8 text-right text-sm'>
                    {stars === 5 ? '18' : stars === 4 ? '4' : '1'}
                  </span>
                </div>
              ))}
            </div>

            {/* Review List */}
            <div className='space-y-6'>
              <ReviewCard
                name='Sarah Johnson'
                rating={5}
                date='2 weeks ago'
                avatar='https://randomuser.me/api/portraits/women/44.jpg'
                comment='The tour guides were incredibly knowledgeable and the itinerary was perfectly paced. Worth every penny!'
              />
              <ReviewCard
                name='Michael Chen'
                rating={4}
                date='1 month ago'
                avatar='https://randomuser.me/api/portraits/men/32.jpg'
                comment='Great experience overall, though the hotel selection could be better. Food was amazing!'
              />
            </div>
          </CardContent>
        </Card>

        {/* Review Form */}
        <Card className='mt-6'>
          <CardHeader>
            <CardTitle>Share Your Experience</CardTitle>
          </CardHeader>
          <CardContent>
            <form className='space-y-4'>
              <RadioGroup defaultValue='5' className='flex gap-1'>
                {[1, 2, 3, 4, 5].map((value) => (
                  <div key={value} className='flex items-center space-x-2'>
                    <RadioGroupItem value={value.toString()} id={`r${value}`} />
                    <Label
                      htmlFor={`r${value}`}
                      className='flex items-center gap-1'
                    >
                      <Star className='h-4 w-4 fill-yellow-400 text-yellow-400' />
                      {value}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              <Textarea
                placeholder='Share your thoughts...'
                className='min-h-[120px]'
              />
              <Button type='submit'>Submit Review</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
