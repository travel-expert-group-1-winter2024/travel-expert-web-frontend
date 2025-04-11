import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function BookingFormCard({
  onCancel,
}: {
  onCancel: () => void
}) {
  const { packageId } = useParams()
  const [travellers, setTravellers] = useState('')
  const [tripType, setTripType] = useState('')
  const [errors, setErrors] = useState({ travellers: '', tripType: '' })
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newErrors = { travellers: '', tripType: '' }
    let hasError = false

    if (!travellers || parseInt(travellers) <= 0) {
      newErrors.travellers = 'Please enter a valid number of travellers.'
      hasError = true
    }
    if (!tripType) {
      newErrors.tripType = 'Please select a trip type.'
      hasError = true
    }
    setErrors(newErrors)
    if (!hasError) {
      navigate(`/payment/${packageId}`, {
        state: { tripType, travellers },
      })
    }
  }

  return (
    <Card className='mt-4'>
      <form onSubmit={handleSubmit}>
        <CardContent className='space-y-4'>
          <div>
            <input
              type='number'
              placeholder='Number of Travellers'
              className={`w-full rounded border p-2 ${
                errors.travellers ? 'border-red-500' : ''
              }`}
              value={travellers}
              onChange={(e) => {
                const value = e.target.value
                setTravellers(value)

                // Clear error live if valid
                if (value && parseInt(value) > 0) {
                  setErrors((prev) => ({ ...prev, travellers: '' }))
                }
              }}
            />
            {errors.travellers && (
              <p className='mt-1 text-sm text-red-500'>{errors.travellers}</p>
            )}
          </div>

          <div>
            <select
              className={`w-full rounded border p-2 ${
                errors.tripType ? 'border-red-500' : ''
              }`}
              value={tripType}
              onChange={(e) => {
                const value = e.target.value
                setTripType(value)
                // Clear error if selected
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
        </CardContent>

        <CardFooter className='mt-2 flex justify-end gap-2'>
          <Button variant='outline' type='button' onClick={onCancel}>
            Cancel
          </Button>
          <Button type='submit'>Submit</Button>
        </CardFooter>
      </form>
    </Card>
  )
}
