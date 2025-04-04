'use client'
import { Button } from '@/components/ui/button'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'
import { Loader2, MapPin } from 'lucide-react'
import { useEffect, useState } from 'react'

const containerStyle = {
  width: '100%',
  height: '400px',
  borderRadius: '0.5rem',
}

interface LocationMapProps {
  destination: string
}

export function LocationMap({ destination }: LocationMapProps) {
  const [center, setCenter] = useState({ lat: 0, lng: 0 })
  const [isGeocoding, setIsGeocoding] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '' || ''
  })

  useEffect(() => {
    if (isLoaded && destination) {
      geocodeDestination()
    }
  }, [isLoaded, destination])

  const geocodeDestination = async () => {
    setIsGeocoding(true)
    setError(null)

    try {
      const geocoder = new window.google.maps.Geocoder()
      const response = await geocoder.geocode({ address: destination })

      if (response.results[0]) {
        const location = response.results[0].geometry.location
        setCenter({
          lat: location.lat(),
          lng: location.lng()
        })
      } else {
        setError('Location not found')
      }
    } catch (err) {
      setError('Failed to load map')
      console.error('Geocoding error:', err)
    } finally {
      setIsGeocoding(false)
    }
  }

  const handleOpenGoogleMaps = () => {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(destination)}`,
      '_blank'
    )
  }

  return (
    <section className="mt-12">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-semibold">Location</h3>
        <Button
          variant="outline"
          onClick={handleOpenGoogleMaps}
          className="gap-2"
          disabled={isGeocoding}
        >
          {isGeocoding ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <MapPin className="h-4 w-4" />
          )}
          Open in Google Maps
        </Button>
      </div>

      {error ? (
        <div className="w-full h-[400px] bg-muted rounded-lg flex items-center justify-center">
          <p className="text-destructive">{error}</p>
        </div>
      ) : isGeocoding || !isLoaded ? (
        <div className="w-full h-[400px] bg-muted rounded-lg flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={14}
          options={{
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false
          }}
        >
          <Marker
            position={center}
            icon={{
              url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
              scaledSize: new window.google.maps.Size(40, 40)
            }}
          />
        </GoogleMap>
      )}
    </section>
  )
}
