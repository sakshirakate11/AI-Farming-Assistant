import React, { useState, useEffect } from 'react';
import { getWeatherData } from '../../services/weatherService';
import { WeatherData } from '../../types';
import { Cloud, Sun, CloudRain, Thermometer, Droplets, Wind } from 'lucide-react';

export default function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState('Delhi');

  useEffect(() => {
    fetchWeather();
  }, []);

  const fetchWeather = async () => {
    setLoading(true);
    try {
      const data = await getWeatherData(location);
      setWeather(data);
    } catch (error) {
      console.error('Error fetching weather:', error);
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'Sunny': return <Sun className="w-8 h-8 text-yellow-500" />;
      case 'Rainy': return <CloudRain className="w-8 h-8 text-blue-500" />;
      case 'Cloudy': return <Cloud className="w-8 h-8 text-gray-500" />;
      default: return <Sun className="w-8 h-8 text-yellow-500" />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Weather Forecast</h2>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            placeholder="Enter location"
          />
          <button
            onClick={fetchWeather}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            Update
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 mt-2">Loading weather data...</p>
        </div>
      ) : weather ? (
        <div>
          {/* Current Weather */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{weather.location}</h3>
                <p className="text-3xl font-bold text-blue-600 mt-2">{weather.temperature}°C</p>
              </div>
              <div className="text-right">
                {getWeatherIcon('Sunny')}
                <div className="flex items-center mt-2 text-sm text-gray-600">
                  <Droplets className="w-4 h-4 mr-1" />
                  {weather.humidity}% humidity
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <CloudRain className="w-4 h-4 mr-1" />
                  {weather.rainfall}mm rainfall
                </div>
              </div>
            </div>
          </div>

          {/* 7-Day Forecast */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">7-Day Forecast</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {weather.forecast.map((day, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4 text-center">
                  <p className="text-sm font-medium text-gray-600 mb-2">{day.day}</p>
                  {getWeatherIcon(day.condition)}
                  <p className="text-lg font-bold text-gray-800 mt-2">{day.temp}°C</p>
                  <p className="text-xs text-gray-600">{day.condition}</p>
                  <p className="text-xs text-gray-600">{day.humidity}% humidity</p>
                </div>
              ))}
            </div>
          </div>

          {/* Farming Advice */}
          <div className="bg-green-50 rounded-xl p-6 mt-6">
            <h3 className="text-lg font-semibold text-green-800 mb-2">Farming Advice</h3>
            <div className="space-y-2 text-sm text-green-700">
              {weather.rainfall > 20 && (
                <p>• Heavy rainfall expected. Ensure proper drainage in fields.</p>
              )}
              {weather.temperature > 35 && (
                <p>• High temperature alert. Increase irrigation frequency.</p>
              )}
              {weather.humidity < 40 && (
                <p>• Low humidity detected. Monitor crop water requirements.</p>
              )}
              {weather.rainfall === 0 && weather.temperature < 30 && (
                <p>• Good weather for field operations and harvesting.</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-600 py-8">Click "Update" to fetch weather data</p>
      )}
    </div>
  );
}