import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { useAuth } from '@/hooks/useAuth.ts'
import { useCreateBooking } from '@/hooks/useBookings.ts'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

export default function BookingFormCard({
  onCancel,
  isBookingReservation,
}: {
  onCancel: () => void
  isBookingReservation: boolean
}) {
  const { packageId } = useParams()
  const [travellers, setTravellers] = useState('')
  const [tripType, setTripType] = useState('')
  const [errors, setErrors] = useState({
    travellers: '',
    tripType: '',
    paymentMethod: '',
  })
  const navigate = useNavigate()
  const [paymentMethod, setPaymentMethod] = useState('')
  const [travellerNames, setTravellerNames] = useState<string[]>([])
  const [travellerNameErrors, setTravellerNameErrors] = useState<string[]>([])

  const {
    mutate: createBooking,
    isError,
    isPending,
    isSuccess,
  } = useCreateBooking()
  const { token, isLoggedIn } = useAuth()

  useEffect(() => {
    if (isSuccess) {
      toast.success('Booking reservation created successfully.')
      navigate(`/`)
    }
    if (isError) {
      toast.error('Failed to create booking reservation. Please try again.')
    }
  }, [isError, isSuccess, isPending])

  if (!isLoggedIn) return null

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newErrors = {
      travellers: '',
      tripType: '',
      paymentMethod: '',
      travellerNames: '',
    }
    let hasError = false
  
    if (!travellers || parseInt(travellers) <= 0) {
      newErrors.travellers = 'Please enter a valid number of travellers.'
      hasError = true
    }
    if (!tripType) {
      newErrors.tripType = 'Please select a trip type.'
      hasError = true
    }
    if (!paymentMethod && !isBookingReservation) {
      newErrors.paymentMethod = 'Please select a payment method.'
      hasError = true
    }

    if (parseInt(travellers) > 1) {
      const nameErrors: string[] = []
      travellerNames.forEach((name, index) => {
        if (!name.trim()) {
          nameErrors[index] = `Name for traveller ${index + 1} is required.`
          hasError = true
        } else {
          nameErrors[index] = ''
        }
      })

      setTravellerNameErrors(nameErrors)
    }
    setErrors(newErrors)

    if (!hasError) {
      if (isBookingReservation) {
        createBooking({
          token: token,
          bookingData: {
            tripTypeId: tripType,
            travelerCount: parseInt(travellers),
            packageId: parseInt(packageId || '0'),
            bookingMode: 'RESERVE',
            travellerNames:travellerNames
          },
        })
      } else {
        navigate(`/payment/${packageId}`, {
          state: { tripType, travellers, paymentMethod,travellerNames },
        })
      }
    }
  }  

  return (
    <Card className='mt-4'>
      <form onSubmit={handleSubmit}>
        <CardContent className='space-y-4'>
          <div>
            <input
              type='number'
              max={8}
              placeholder='Number of Travellers'
              className={`w-full rounded border p-2 ${
                errors.travellers ? 'border-red-500' : ''
              }`}
              value={travellers}
              onChange={(e) => {
                const value = e.target.value
                const count = parseInt(value)
                setTravellers(value)

                if (count > 0) {
                  setErrors((prev) => ({ ...prev, travellers: '' }))
                  // Resize names array
                  setTravellerNames((prev) => {
                    const newNames = [...prev]
                    if (count > newNames.length) {
                      return [
                        ...newNames,
                        ...Array(count - newNames.length).fill(''),
                      ]
                    } else {
                      return newNames.slice(0, count)
                    }
                  })
                }
              }}
            />
            {errors.travellers && (
              <p className='mt-1 text-sm text-red-500'>{errors.travellers}</p>
            )}
          </div>
          {parseInt(travellers) > 1 && (
            <div className='space-y-2'>
              <label className='block font-medium'>Traveller Names</label>
              {travellerNames.map((name, index) => (
                <div key={index}>
                  <input
                    type='text'
                    className={`w-full rounded border p-2 ${
                      travellerNameErrors[index] ? 'border-red-500' : ''
                    }`}
                    placeholder={`Traveller ${index + 1} Name`}
                    value={name}
                    onChange={(e) => {
                      const updatedNames = [...travellerNames]
                      updatedNames[index] = e.target.value
                      setTravellerNames(updatedNames)

                      // Clear error as user types
                      setTravellerNameErrors((prev) => {
                        const updatedErrors = [...prev]
                        updatedErrors[index] = ''
                        return updatedErrors
                      })
                    }}
                  />
                  {travellerNameErrors[index] && (
                    <p className='mt-1 text-sm text-red-500'>
                      {travellerNameErrors[index]}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
          <div>
            <select
              className={`w-full rounded border p-2 ${
                errors.tripType ? 'border-red-500' : ''
              }`}
              value={tripType}
              onChange={(e) => {
                const value = e.target.value
                setTripType(value)
                if (value) {
                  setErrors((prev) => ({ ...prev, tripType: '' }))
                }
              }}
            >
              <option value=''>Select Trip Type</option>
              <option value='B'>Business</option>
              <option value='G'>Group</option>
              <option value='L'>Leisure</option>
            </select>
            {errors.tripType && (
              <p className='mt-1 text-sm text-red-500'>{errors.tripType}</p>
            )}
          </div>

          {/* Payment Method Radio Buttons */}
          {!isBookingReservation && (
            <div>
            <label className='mb-2 block font-medium'>Payment Method</label>
            <div className='flex gap-4'>
              <label className='flex items-center gap-2'>
                <input
                  type='radio'
                  name='paymentMethod'
                  value='Wallet'
                  checked={paymentMethod === 'Wallet'}
                  onChange={(e) => {
                    const value = e.target.value
                    setErrors((prev) => ({ ...prev, paymentMethod: '' }))
                    setPaymentMethod(value)
                  }}
                />
                Wallet
              </label>
              <label className='flex items-center gap-2'>
                <input
                  type='radio'
                  name='paymentMethod'
                  value='Card'
                  checked={paymentMethod === 'Card'}
                  onChange={(e) => {
                    const value = e.target.value
                    setErrors((prev) => ({ ...prev, paymentMethod: '' }))
                    setPaymentMethod(value)
                  }}
                />
                Card
              </label>
            </div>
            {errors.paymentMethod && (
              <p className='mt-1 text-sm text-red-500'>
                {errors.paymentMethod}
              </p>
            )}
          </div>
          )}
        </CardContent>

        <CardFooter className='mt-2 flex justify-end gap-2'>
          <Button variant='outline' type='button' onClick={onCancel}>
            Cancel
          </Button>
          <Button type='submit' disabled={isPending}>
            Submit
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
