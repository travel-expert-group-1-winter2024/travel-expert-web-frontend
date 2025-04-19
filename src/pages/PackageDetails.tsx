import BookingFormCard from '@/components/molecules/BookingFormCard'
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
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'
import { useAuth } from '@/hooks/useAuth'
import { usePackageDetails } from '@/hooks/usePackageDetails'
import { useRatings } from '@/hooks/useRatings'
import { useSubmitRating } from '@/hooks/useSubmitRating'
import { ratingsView } from '@/types/ratings'
import { Calendar, MapPin, Star } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function PackageDetails() {
  const { packageId } = useParams()

  const parsedPackageID: number | null = packageId ? parseInt(packageId) : null
  const {
    data: pkg,
    isLoading: isPackageLoading,
    error: packageError,
  } = usePackageDetails(packageId!)
  const { data: ratingData, refetch: refetchRatings } = useRatings(
    parsedPackageID ?? 0,
  )
  const [ratingList, setRatingList] = useState<ratingsView[]>([])

  useEffect(() => {
    if (ratingData) {
      setRatingList(ratingData)
    }
  }, [ratingData])

  const customerId: number = useAuth().user?.customerId || 0
  const { mutate: submitRating } = useSubmitRating()
  const [rating, setRating] = useState('5')
  const [comments, setComments] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const navigate = useNavigate()
  const [isBookingReservation, setIsBookingReservation] =
    useState<boolean>(false)
  const { isLoggedIn } = useAuth()

  const handleBookingClick = (reserve: boolean) => {
    if (isLoggedIn) {
      setIsBookingReservation(reserve)
      setShowForm(true)
    } else {
      navigate('/login', { state: { from: location.pathname } })
    }
  }
  //Submit function of Ratings
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    submitRating(
      {
        packageId,
        customerId,
        rating: parseInt(rating),
        comments,
      },
      {
        onSuccess: async () => {
          setRating('5')
          setComments('')
          setSubmitting(false) // Reset submitting state
          await refetchRatings() // Refetch ratings after submission
        },
        onError: () => {
          setSubmitting(false) // Reset submitting state on error
        },
      },
    )
  }

  if (isPackageLoading)
    return <div className='py-12 text-center'>Loading...</div>
  if (packageError)
    return (
      <div className='py-12 text-center text-red-500'>
        Error loading package details
      </div>
    )
  if (!pkg) return <div className='py-12 text-center'>Package not found</div>

  return (
    <section className='container mx-auto max-w-7xl px-4 py-6 sm:px-6'>
      {/* Top Section */}
      <div className='flex flex-col gap-8 xl:flex-row xl:gap-12'>
        {/* Image Carousel */}
        <div className='w-full xl:w-2/5 2xl:w-1/3'>
          <div className='sticky top-4'>
            <div className='aspect-square overflow-hidden rounded-xl xl:rounded-2xl'>
              <img
                src={
                  pkg.photoURL || `https://placehold.co/1000x1000?text=Image 1`
                }
                alt={`${pkg.pkgname}`}
                className='h-full w-full object-cover'
              />
            </div>
          </div>
        </div>

        {/* Main Content - Right Side */}
        <div className='w-full xl:w-3/5 2xl:w-2/3'>
          {/* Package Header */}
          <div className='mb-6 xl:mb-8'>
            <Badge variant='secondary' className='xl:text-sm'>
              {pkg.destination}
            </Badge>
            <h1 className='mt-3 text-3xl font-bold tracking-tight xl:text-4xl'>
              {pkg.pkgname}
            </h1>
            <div className='mt-2 flex items-center gap-4'>
              <div className='flex items-center gap-1'>
                <Star className='h-5 w-5 fill-yellow-400 text-yellow-400' />
                <span className='font-medium'>{getAvarageRating()}</span>
                <span className='text-muted-foreground'>
                  ({ratingList.length} reviews)
                </span>
              </div>
            </div>
          </div>

          {/* Weather Forecast */}
          <WeatherForecast
            startDate={pkg.pkgstartdate}
            destination={pkg.destination}
          />

          {/* About the Package */}
          <Card className='xl:p-6" mt-6 mb-6'>
            <CardHeader>
              <CardTitle className='xl:text-xl'>About This Package</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-base leading-relaxed xl:text-lg'>
                {pkg.pkgdesc}
              </p>
            </CardContent>
          </Card>

          {/* Trip Details */}
          <Card className='mb-6 xl:mb-8 xl:p-6'>
            <CardHeader>
              <CardTitle className='xl:text-xl'>Trip Details</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4 xl:space-y-6'>
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
          <Card className='border-primary sticky bottom-0 z-10 border shadow-lg md:static xl:p-6'>
            <CardHeader>
              <CardTitle className='xl:text-xl'>Price Summary</CardTitle>
            </CardHeader>
            <CardContent className='space-y-3 xl:space-y-6'>
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
              <Button
                className='flex-1'
                onClick={() => handleBookingClick(false)}
              >
                Book Now
              </Button>
              <Button
                variant='outline'
                className='flex-1'
                onClick={() => handleBookingClick(true)}
              >
                Reserve Now (Hold for 24 Hours){' '}
              </Button>
            </CardFooter>
          </Card>
          {isLoggedIn && showForm && (
            <BookingFormCard
              onCancel={() => setShowForm(false)}
              isBookingReservation={isBookingReservation}
            />
          )}
        </div>
      </div>

      {/* Location Map */}
      <div className='mt-12 xl:mt-16'>
        <LocationMap destination={pkg.destination} />
      </div>

      {/* Reviews Section */}
      <div className='mt-12 space-y-8 xl:mt-16 xl:space-y-12'>
        <Card>
          <CardHeader>
            <CardTitle>Customer Reviews</CardTitle>
            <CardDescription>
              {getAvarageRating()} average from {ratingList.length} reviews
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Review List */}
            <div className='space-y-6'>
              {ratingList.map((r: ratingsView) => (
                <ReviewCard
                  name={r.custfirstname + ' ' + r.custlastname}
                  rating={r.rating}
                  comment={r.comments}
                  date={''}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Review Form */}
        {isLoggedIn && (
          <Card className='mt-6'>
            <CardHeader>
              <CardTitle>Share Your Experience</CardTitle>
            </CardHeader>
            <CardContent>
              <form className='space-y-4' onSubmit={handleSubmit}>
                <RadioGroup
                  value={rating}
                  onValueChange={setRating}
                  className='flex gap-1'
                >
                  {[1, 2, 3, 4, 5].map((value) => (
                    <div key={value} className='flex items-center space-x-2'>
                      <RadioGroupItem
                        value={value.toString()}
                        id={`r${value}`}
                      />
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
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                />
                <Button type='submit' disabled={submitting || !comments.trim()}>
                  {submitting ? 'Submitting...' : 'Submit Review'}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  )

  function getAvarageRating(): string {
    const ratings = ratingList.map((r) => r.rating)
    const sum = ratings.reduce((acc, curr) => acc + curr, 0)
    const avg = ratings.length ? sum / ratings.length : 0
    return avg.toFixed(1)
  }
}
