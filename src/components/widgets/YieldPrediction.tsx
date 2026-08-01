import React, { useState } from 'react';
import { predictYield } from '../../services/mlService';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Loader2 } from 'lucide-react';

export default function YieldPrediction() {
  const [formData, setFormData] = useState({
    cropName: 'Rice',
    soilType: 'Loamy',
    areaAcres: 5,
    rainfall: 800,
    fertilizer: 'Organic'
  });
  const [prediction, setPrediction] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<any[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await predictYield(formData);
      setPrediction(result);
      
      // Add to history for chart
      const newEntry = {
        crop: formData.cropName,
        predicted: result,
        date: new Date().toLocaleDateString()
      };
      setHistory(prev => [...prev.slice(-6), newEntry]);
    } catch (error) {
      console.error('Error predicting yield:', error);
    } finally {
      setLoading(false);
    }
  };

  const crops = ['Rice', 'Wheat', 'Maize', 'Cotton', 'Sugarcane'];
  const soilTypes = ['Sandy', 'Clay', 'Loamy', 'Silt'];
  const fertilizerTypes = ['Organic', 'NPK', 'Urea', 'DAP'];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center mb-6">
        <TrendingUp className="w-8 h-8 text-purple-600 mr-3" />
        <h2 className="text-2xl font-bold text-gray-800">Yield Prediction</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Crop Type
              </label>
              <select
                value={formData.cropName}
                onChange={(e) => setFormData({...formData, cropName: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {crops.map(crop => (
                  <option key={crop} value={crop}>{crop}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Soil Type
              </label>
              <select
                value={formData.soilType}
                onChange={(e) => setFormData({...formData, soilType: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {soilTypes.map(soil => (
                  <option key={soil} value={soil}>{soil}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Area (Acres)
              </label>
              <input
                type="number"
                min="0.1"
                step="0.1"
                value={formData.areaAcres}
                onChange={(e) => setFormData({...formData, areaAcres: parseFloat(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expected Rainfall (mm)
              </label>
              <input
                type="number"
                min="0"
                value={formData.rainfall}
                onChange={(e) => setFormData({...formData, rainfall: parseInt(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fertilizer Type
              </label>
              <select
                value={formData.fertilizer}
                onChange={(e) => setFormData({...formData, fertilizer: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {fertilizerTypes.map(fertilizer => (
                  <option key={fertilizer} value={fertilizer}>{fertilizer}</option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                'Predict Yield'
              )}
            </button>
          </form>
        </div>

        {/* Results */}
        <div className="space-y-6">
          {prediction !== null && (
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 text-center">
              <h3 className="text-lg font-semibold text-purple-800 mb-2">Predicted Yield</h3>
              <div className="text-4xl font-bold text-purple-600 mb-2">
                {prediction.toLocaleString()}
              </div>
              <p className="text-purple-700">
                Quintals total ({(prediction / formData.areaAcres).toFixed(1)} quintals/acre)
              </p>
            </div>
          )}

          {history.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Prediction History</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={history}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="crop" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="predicted" fill="#9333ea" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {prediction !== null && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <h4 className="text-lg font-bold text-green-800 mb-3">Optimization Tips</h4>
              <ul className="text-green-700 space-y-1 text-sm">
                <li>• Consider soil testing for precise nutrient management</li>
                <li>• Implement drip irrigation for water efficiency</li>
                <li>• Use high-quality certified seeds</li>
                <li>• Monitor weather patterns and adjust planting dates</li>
                <li>• Apply fertilizers in split doses for better uptake</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}