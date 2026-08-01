import React, { useState, useEffect } from 'react';
import { getMarketPrices } from '../../services/mlService';
import { MarketPrice } from '../../types';
import { DollarSign, TrendingUp, TrendingDown, Minus, RefreshCw } from 'lucide-react';

export default function MarketPrices() {
  const [selectedCrop, setSelectedCrop] = useState('Rice');
  const [prices, setPrices] = useState<MarketPrice[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  const crops = ['Rice', 'Wheat', 'Maize', 'Cotton', 'Sugarcane', 'Onion', 'Potato', 'Tomato'];

  useEffect(() => {
    fetchPrices();
  }, [selectedCrop]);

  const fetchPrices = async () => {
    setLoading(true);
    try {
      const data = await getMarketPrices(selectedCrop);
      setPrices(data);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (error) {
      console.error('Error fetching market prices:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-500" />;
      case 'stable': return <Minus className="w-4 h-4 text-gray-500" />;
      default: return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-600 bg-green-50 border-green-200';
      case 'down': return 'text-red-600 bg-red-50 border-red-200';
      case 'stable': return 'text-gray-600 bg-gray-50 border-gray-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const averagePrice = prices.length > 0 
    ? Math.round(prices.reduce((sum, price) => sum + price.price, 0) / prices.length)
    : 0;

  const highestPrice = Math.max(...prices.map(p => p.price));
  const lowestPrice = Math.min(...prices.map(p => p.price));

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <DollarSign className="w-8 h-8 text-green-600 mr-3" />
          <h2 className="text-2xl font-bold text-gray-800">Market Prices</h2>
        </div>
        
        <div className="flex items-center space-x-4">
          <select
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
          >
            {crops.map(crop => (
              <option key={crop} value={crop}>{crop}</option>
            ))}
          </select>
          
          <button
            onClick={fetchPrices}
            disabled={loading}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      {lastUpdated && (
        <p className="text-sm text-gray-600 mb-4">Last updated: {lastUpdated}</p>
      )}

      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
          <p className="text-gray-600 mt-2">Loading market prices...</p>
        </div>
      ) : (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
              <h3 className="text-sm font-medium text-blue-600 mb-1">Average Price</h3>
              <p className="text-2xl font-bold text-blue-800">₹{averagePrice.toLocaleString()}</p>
              <p className="text-xs text-blue-600">per quintal</p>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
              <h3 className="text-sm font-medium text-green-600 mb-1">Highest Price</h3>
              <p className="text-2xl font-bold text-green-800">₹{highestPrice.toLocaleString()}</p>
              <p className="text-xs text-green-600">per quintal</p>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
              <h3 className="text-sm font-medium text-red-600 mb-1">Lowest Price</h3>
              <p className="text-2xl font-bold text-red-800">₹{lowestPrice.toLocaleString()}</p>
              <p className="text-xs text-red-600">per quintal</p>
            </div>
          </div>

          {/* Price List */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {selectedCrop} Prices by Market
            </h3>
            
            {prices.map((price, index) => (
              <div key={index} className={`border rounded-lg p-4 ${getTrendColor(price.trend)}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div>
                      <h4 className="font-semibold text-lg">{price.market}</h4>
                      <p className="text-sm opacity-75">{price.date}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center justify-end mb-1">
                      <span className="text-2xl font-bold mr-2">
                        ₹{price.price.toLocaleString()}
                      </span>
                      {getTrendIcon(price.trend)}
                    </div>
                    <p className="text-sm opacity-75">{price.unit}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Trading Advice */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mt-6">
            <h4 className="text-lg font-bold text-yellow-800 mb-3">Trading Advice</h4>
            <div className="space-y-2 text-yellow-700 text-sm">
              {averagePrice > highestPrice * 0.9 && (
                <p>• Current prices are near the peak. Consider selling if you have stock.</p>
              )}
              {averagePrice < lowestPrice * 1.1 && (
                <p>• Prices are currently low. Good time for bulk purchasing if storage is available.</p>
              )}
              <p>• Monitor weather forecasts as they significantly impact crop prices.</p>
              <p>• Consider contract farming for price stability.</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}