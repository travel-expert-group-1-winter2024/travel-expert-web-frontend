import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Cloud, CloudRain, CloudSun, Sun, Thermometer } from 'lucide-react'

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
  // Mock data - replace with real API data later
  const forecast: WeatherDay[] = [
    {
      date: startDate,
      high: 28,
      low: 18,
      condition: 'sunny'
    },
    {
      date: new Date(new Date(startDate).setDate(new Date(startDate).getDate() + 1)).toISOString(),
      high: 25,
      low: 17,
      condition: 'partly-cloudy'
    },
    {
      date: new Date(new Date(startDate).setDate(new Date(startDate).getDate() + 2)).toISOString(),
      high: 22,
      low: 16,
      condition: 'rainy'
    }
  ]

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

  return (
    <Card className="w-full mb-6">
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
                <span className="text-2xl font-bold">{day.high}°</span>
                <span className="text-muted-foreground">{day.low}°</span>
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