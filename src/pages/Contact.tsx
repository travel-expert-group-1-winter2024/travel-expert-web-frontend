import axios from 'axios'
import { Mail, MapPin, Phone, Search } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

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

declare global {
  interface Window {
    initMap: () => void
  }
}

const Contact = () => {
  const [agencies, setAgencies] = useState<Agency[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const mapRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const fetchAgencies = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/agencies')
        console.log('Fetched Agencies:', response.data)

        if (Array.isArray(response.data)) {
          setAgencies(response.data)
        } else {
          console.warn('Response is not an array:', response.data)
          setAgencies([])
        }
      } catch (error) {
        console.error('Failed to fetch agencies:', error)
        setAgencies([])
      }
    }

    fetchAgencies()
  }, [])

  const filteredAgencies = Array.isArray(agencies)
    ? agencies.filter((agency) => {
        const combined = `${agency.agencyAddress} ${agency.agencyCity} ${agency.agencyProvince} ${agency.agencyPostal} ${agency.agencyCountry}`
        return combined.toLowerCase().includes(searchTerm.toLowerCase())
      })
    : []

  useEffect(() => {
    if (!Array.isArray(agencies) || agencies.length === 0) return

    const loadMapScript = () => {
      if (document.getElementById('google-maps-script')) {
        window.initMap = initMap
        return
      }

      const script = document.createElement('script')
      script.id = 'google-maps-script'
      script.src = `https://maps.googleapis.com/maps/api/js?key=${
        import.meta.env.VITE_GOOGLE_MAPS_API_KEY
      }&callback=initMap`
      script.async = true
      script.defer = true
      window.initMap = initMap
      document.body.appendChild(script)
    }

    const initMap = () => {
      if (!mapRef.current) return

      const map = new google.maps.Map(mapRef.current, {
        zoom: 4,
        center: { lat: 53.7267, lng: -127.6476 },
      })

      const geocoder = new google.maps.Geocoder()

      agencies.forEach((agency) => {
        const fullAddress = `${agency.agencyAddress}, ${agency.agencyCity}, ${agency.agencyProvince}, ${agency.agencyPostal}`
        geocoder.geocode({ address: fullAddress }, (results, status) => {
          if (status === 'OK' && results && results[0]) {
            new google.maps.Marker({
              map,
              position: results[0].geometry.location,
              title: `${agency.agencyCity} Office`,
            })
          } else {
            console.error(`Geocode failed for: ${fullAddress}`, status)
          }
        })
      })
    }

    loadMapScript()
  }, [agencies])

  return (
    <div className='min-h-screen bg-gradient-to-b from-blue-50 to-white px-4 py-16 sm:px-6 lg:px-8'>
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
          className='w-full rounded-full border border-blue-300 bg-white py-3 pr-4 pl-12 shadow-md transition focus:ring-2 focus:ring-blue-500 focus:outline-none'
        />
        <Search className='absolute top-3.5 left-4 h-5 w-5 text-blue-400' />
      </div>

      <div className='mx-auto mb-20 grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-3'>
        {filteredAgencies.length > 0 ? (
          filteredAgencies.map((agency) => (
            <div
              key={agency.id}
              className='relative rounded-2xl border border-blue-100 bg-white p-6 shadow-lg'
            >
              <div className='absolute top-0 right-0 rounded-bl-lg bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800'>
                {agency.agencyCity}
              </div>
              <div className='space-y-4 text-sm text-gray-700'>
                <div className='flex items-start'>
                  <MapPin className='mt-0.5 h-5 w-5 text-blue-500' />
                  <span className='ml-2'>{`${agency.agencyAddress}, ${agency.agencyCity}, ${agency.agencyProvince}, ${agency.agencyPostal}`}</span>
                </div>
                <div className='flex items-start'>
                  <Phone className='mt-0.5 h-5 w-5 text-blue-500' />
                  <span className='ml-2'>Phone: {agency.agencyPhone}</span>
                </div>
                <div className='flex items-start'>
                  <Phone className='mt-0.5 h-5 w-5 text-blue-500' />
                  <span className='ml-2'>Fax: {agency.agencyFax}</span>
                </div>
                <div className='flex items-start'>
                  <Mail className='mt-0.5 h-5 w-5 text-blue-500' />
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
        <div className='overflow-hidden rounded-2xl border border-blue-200 shadow-lg'>
          <div
            ref={mapRef}
            style={{ width: '100%', height: '500px' }}
            className='w-full'
          />
        </div>
      </div>
    </div>
  )
}

export default Contact
