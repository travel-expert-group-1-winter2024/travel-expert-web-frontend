import { useAgencies } from '@/hooks/useAgencies.ts'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'
import { Mail, MapPin, Phone, Search } from 'lucide-react'
import { useEffect, useState } from 'react'

type Agency = {
  id: number
  agencyAddress: string
  agencyCity: string
  agencyProvince: string
  agencyPostal: string
  agencyCountry: string
  agencyPhone: string
  agencyFax: string
}

const Contact = () => {
  const [agencies, setAgencies] = useState<Agency[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const { data: agenciesData, isError } = useAgencies()
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
  })
  useEffect(() => {
    if (isError) {
      console.error('Error fetching agencies data')
      return
    }

    setAgencies(agenciesData)
  }, [agenciesData, isError])

  const filteredAgencies = Array.isArray(agencies)
    ? agencies.filter((agency) => {
        const combined = `${agency.agencyAddress} ${agency.agencyCity} ${agency.agencyProvince} ${agency.agencyPostal} ${agency.agencyCountry}`
        return combined.toLowerCase().includes(searchTerm.toLowerCase())
      })
    : []

  const center = { lat: 51.0447, lng: -114.0719 }

  const handleMapLoad = (agencies: Agency[]) => (map: google.maps.Map) => {
    const bounds = new window.google.maps.LatLngBounds(center)
    const geocoder = new window.google.maps.Geocoder()

    agencies.forEach((agency) => {
      const address = `${agency.agencyAddress}, ${agency.agencyCity}, ${agency.agencyProvince}, ${agency.agencyPostal}`
      geocoder.geocode({ address }, (results, status) => {
        if (status === 'OK' && results && results[0]) {
          new window.google.maps.Marker({
            map,
            position: results[0].geometry.location,
            title: `${agency.agencyCity} Office`,
          })
          bounds.extend(results[0].geometry.location)
          map.fitBounds(bounds)
        } else {
          console.error(`Geocode failed for: ${address}`, status)
        }
      })
    })
  }

  return (
    <div className='min-h-screen bg-gradient-to-b from-[#FAF5FF] to-white px-4 py-16 sm:px-6 lg:px-8'>
      <div className='mx-auto mb-14 max-w-6xl text-center'>
        <h1 className='text-5xl font-semibold text-black'>
          Find a Travel Experts Office
        </h1>
        <p className='mx-auto mt-3 max-w-2xl text-lg text-gray-600'>
          Browse our nationwide offices and connect with the nearest Travel
          Experts agency.
        </p>
      </div>

      <div className='relative mx-auto mb-12 max-w-xl'>
        <input
          type='text'
          placeholder='Search by city, province, or address...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='w-full rounded-full border border-purple-300 bg-white py-3 pr-4 pl-12 shadow-md transition focus:ring-2 focus:ring-purple-500 focus:outline-none'
        />
        <Search className='absolute top-3.5 left-4 h-5 w-5 text-purple-400' />
      </div>

      <div className='mx-auto mb-20 grid max-w-6xl gap-8 md:grid-cols-2'>
        {filteredAgencies.length > 0 ? (
          filteredAgencies.map((agency) => (
            <div
              key={agency.id}
              className='relative rounded-2xl border border-purple-100 bg-white p-6 shadow-lg'
            >
              <div className='absolute top-0 right-0 rounded-bl-lg bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-800'>
                {agency.agencyCity}
              </div>
              <div className='space-y-4 text-sm text-gray-700'>
                <div className='flex items-start'>
                  <MapPin className='mt-0.5 h-5 w-5 text-purple-500' />
                  <span className='ml-2'>{`${agency.agencyAddress}, ${agency.agencyCity}, ${agency.agencyProvince}, ${agency.agencyPostal}`}</span>
                </div>
                <div className='flex items-start'>
                  <Phone className='mt-0.5 h-5 w-5 text-purple-500' />
                  <span className='ml-2'>Phone: {agency.agencyPhone}</span>
                </div>
                <div className='flex items-start'>
                  <Phone className='mt-0.5 h-5 w-5 text-purple-500' />
                  <span className='ml-2'>Fax: {agency.agencyFax}</span>
                </div>
                <div className='flex items-start'>
                  <Mail className='mt-0.5 h-5 w-5 text-purple-500' />
                  <span className='ml-2'>contact@travelexperts.com</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className='col-span-full text-center text-lg text-gray-500'>
            No agencies match your search.
          </div>
        )}
      </div>
      <div className='mx-auto max-w-6xl'>
        <div className='overflow-hidden rounded-2xl border border-purple-200 shadow-lg'>
          {isLoaded && (
            <GoogleMap
              mapContainerStyle={{ width: '100%', height: '500px' }}
              center={center}
              zoom={7}
              onLoad={handleMapLoad(filteredAgencies)}
              onUnmount={() => {}}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Contact
