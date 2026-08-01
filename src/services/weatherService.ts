import { WeatherData } from '../types';

export const getWeatherData = async (location: string): Promise<WeatherData> => {
  // Simulate API call with realistic weather data
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const mockData: WeatherData = {
    location,
    temperature: Math.floor(Math.random() * 15) + 20, // 20-35°C
    humidity: Math.floor(Math.random() * 40) + 40, // 40-80%
    rainfall: Math.floor(Math.random() * 50), // 0-50mm
    forecast: Array.from({ length: 7 }, (_, i) => ({
      day: new Date(Date.now() + i * 24 * 60 * 60 * 1000).toLocaleDateString('en', { weekday: 'short' }),
      temp: Math.floor(Math.random() * 15) + 20,
      condition: ['Sunny', 'Partly Cloudy', 'Rainy', 'Cloudy'][Math.floor(Math.random() * 4)],
      humidity: Math.floor(Math.random() * 40) + 40
    }))
  };
  
  return mockData;
};