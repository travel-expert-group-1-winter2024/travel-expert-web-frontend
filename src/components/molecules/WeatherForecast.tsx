import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Cloud, CloudRain, CloudSun, Sun, Thermometer } from 'lucide-react'
import { useWeatherForecast } from '@/hooks/useWeatherForecast'

interface WeatherDay {
  date: string
  high: number
  low: number
  condition: 'sunny' | 'cloudy' | 'rainy' | 'partly-cloudy'
}

export function WeatherForecast({
  startDate,
  destination,
}: {
  startDate: string
  destination: string
}) {
  const { forecast, loading, error } = useWeatherForecast(destination, startDate)

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'sunny':
        return <Sun className="h-6 w-6 text-yellow-400" />
      case 'cloudy':
        return <Cloud className="h-6 w-6 text-gray-400" />
      case 'rainy':
        return <CloudRain className="h-6 w-6 text-blue-400" />
      case 'partly-cloudy':
        return <CloudSun className="h-6 w-6 text-gray-300" />
      default:
        return <Sun className="h-6 w-6" />
    }
  }

  if (loading) {
    return (
      <Card className="w-full mb-6 flex">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Thermometer className="h-5 w-5 text-orange-400" />
            Loading {destination} Weather...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-lg border p-4 animate-pulse">
                <div className="h-6 w-3/4 bg-gray-200 rounded"></div>
                <div className="mt-4 h-8 w-8 bg-gray-200 rounded-full"></div>
                <div className="mt-4 flex justify-between">
                  <div className="h-6 w-1/4 bg-gray-200 rounded"></div>
                  <div className="h-6 w-1/4 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="w-full mb-6 flex">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Thermometer className="h-5 w-5 text-orange-400" />
            Weather Forecast
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-red-500">{error}</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full mb-6 flex">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Thermometer className="h-5 w-5 text-orange-400" />
          {destination} Weather Forecast
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {forecast.map((day) => (
            <div key={day.date} className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">
                  {new Date(day.date).toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric'
                  })}
                </h3>
                {getWeatherIcon(day.condition)}
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-2xl font-bold">{Math.round(day.high)}°</span>
                <span className="text-muted-foreground">{Math.round(day.low)}°</span>
              </div>
              <div className="mt-2 text-sm capitalize text-muted-foreground">
                {day.condition.replace('-', ' ')}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}