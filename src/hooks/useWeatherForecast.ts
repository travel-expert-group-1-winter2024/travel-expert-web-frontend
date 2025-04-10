
import { useState, useEffect } from 'react';
import axios from 'axios';
import { addDays } from 'date-fns';
import { formatISO } from 'date-fns/formatISO';

interface WeatherDay {
  date: string;
  high: number;
  low: number;
  condition: 'sunny' | 'cloudy' | 'rainy' | 'partly-cloudy';
}

const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY || '';

export function useWeatherForecast(destination: string, startDate: string) {
  const [forecast, setForecast] = useState<WeatherDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?q=${destination}&appid=${WEATHER_API_KEY}&units=metric`
          );

        const processedData = processWeatherData(response.data.list, startDate);
        setForecast(processedData);
      } catch (err) {
        setError('Failed to fetch weather data');
        console.error('Weather API error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [destination, startDate]);

  return { forecast, loading, error };
}

function processWeatherData(list: any[], startDate: string): WeatherDay[] {
  const start = new Date(startDate);
  const targetDates = [
    formatISO(start, { representation: 'date' }),
    formatISO(addDays(start, 1), { representation: 'date' }),
    formatISO(addDays(start, 2), { representation: 'date' })
  ];

  const dailyData: Record<string, {
    high: number;
    low: number;
    conditions: string[];
  }> = {};

  // Filtering and processing only the data for our target dates
  list.forEach(item => {
    const itemDate = new Date(item.dt * 1000);
    const dateKey = formatISO(itemDate, { representation: 'date' });
    
    if (targetDates.includes(dateKey)) {
      if (!dailyData[dateKey]) {
        dailyData[dateKey] = {
          high: item.main.temp_max,
          low: item.main.temp_min,
          conditions: [item.weather[0].main]
        };
      } else {
        dailyData[dateKey].high = Math.max(dailyData[dateKey].high, item.main.temp_max);
        dailyData[dateKey].low = Math.min(dailyData[dateKey].low, item.main.temp_min);
        dailyData[dateKey].conditions.push(item.weather[0].main);
      }
    }
  });

  return targetDates.map(date => {
    const dayData = dailyData[date];
    if (!dayData) {
      // Fallback if no data for this date
      return {
        date,
        high: 0,
        low: 0,
        condition: 'partly-cloudy'
      };
    }

    const conditionCounts = dayData.conditions.reduce((acc, condition) => {
      const mapped = mapWeatherCondition(condition);
      acc[mapped] = (acc[mapped] || 0) + 1;
      return acc;
    }, {} as Record<WeatherDay['condition'], number>);

    const dominantCondition = Object.entries(conditionCounts)
      .sort((a, b) => b[1] - a[1])[0][0] as WeatherDay['condition'];

    return {
      date,
      high: dayData.high,
      low: dayData.low,
      condition: dominantCondition
    };
  });
}

function mapWeatherCondition(apiCondition: string): WeatherDay['condition'] {
  const condition = apiCondition.toLowerCase();
  
  if (condition.includes('clear')) return 'sunny';
  if (condition.includes('rain') || condition.includes('drizzle') || condition.includes('thunderstorm')) 
    return 'rainy';
  if (condition.includes('cloud')) {
    return condition.includes('few') || condition.includes('scattered') 
      ? 'partly-cloudy' 
      : 'cloudy';
  }
  return 'partly-cloudy';
}