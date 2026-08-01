import React, { useState } from 'react';
import { getIrrigationAdvice } from '../../services/mlService';
import { Droplets, Thermometer, Loader2 } from 'lucide-react';

export default function IrrigationAdvice() {
  const [formData, setFormData] = useState({
    soilType: 'Loamy',
    moisture: 50,
    cropStage: 'Flowering'
  });
  const [advice, setAdvice] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const soilTypes = ['Sandy', 'Clay', 'Loamy', 'Silt'];
  const cropStages = ['Germination', 'Vegetative', 'Flowering', 'Fruiting', 'Maturity'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await getIrrigationAdvice(formData);
      setAdvice(result);
    } catch (error) {
      console.error('Error getting irrigation advice:', error);
    } finally {
      setLoading(false);
    }
  };

  const getMoistureLevel = (moisture: number) => {
    if (moisture < 30) return { level: 'Low', color: 'text-red-600 bg-red-50 border-red-200' };
    if (moisture < 50) return { level: 'Moderate', color: 'text-yellow-600 bg-yellow-50 border-yellow-200' };
    if (moisture < 70) return { level: 'Good', color: 'text-green-600 bg-green-50 border-green-200' };
    return { level: 'High', color: 'text-blue-600 bg-blue-50 border-blue-200' };
  };

  const moistureStatus = getMoistureLevel(formData.moisture);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center mb-6">
        <Droplets className="w-8 h-8 text-blue-600 mr-3" />
        <h2 className="text-2xl font-bold text-gray-800">Irrigation Advice</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Soil Type
              </label>
              <select
                value={formData.soilType}
                onChange={(e) => setFormData({...formData, soilType: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {soilTypes.map(soil => (
                  <option key={soil} value={soil}>{soil}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Soil Moisture Level: {formData.moisture}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={formData.moisture}
                onChange={(e) => setFormData({...formData, moisture: parseInt(e.target.value)})}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Dry</span>
                <span>Wet</span>
              </div>
            </div>

            <div className={`border rounded-lg p-4 ${moistureStatus.color}`}>
              <div className="flex items-center">
                <Thermometer className="w-5 h-5 mr-2" />
                <span className="font-medium">
                  Moisture Level: {moistureStatus.level}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Crop Growth Stage
              </label>
              <select
                value={formData.cropStage}
                onChange={(e) => setFormData({...formData, cropStage: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {cropStages.map(stage => (
                  <option key={stage} value={stage}>{stage}</option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                'Get Irrigation Advice'
              )}
            </button>
          </form>
        </div>

        {/* Advice Display */}
        <div className="space-y-6">
          {advice && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="text-lg font-bold text-blue-800 mb-3">Irrigation Recommendation</h3>
              <p className="text-blue-700">{advice}</p>
            </div>
          )}

          <div className="bg-green-50 border border-green-200 rounded-xl p-6">
            <h4 className="text-lg font-bold text-green-800 mb-3">General Guidelines</h4>
            <ul className="text-green-700 space-y-2 text-sm">
              <li>• <strong>Sandy Soil:</strong> Frequent, light irrigation needed</li>
              <li>• <strong>Clay Soil:</strong> Less frequent, deep irrigation preferred</li>
              <li>• <strong>Flowering Stage:</strong> Critical water requirement period</li>
              <li>• <strong>Maturity Stage:</strong> Reduce irrigation to prevent quality issues</li>
              <li>• <strong>Early Morning:</strong> Best time for irrigation (6-8 AM)</li>
            </ul>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
            <h4 className="text-lg font-bold text-yellow-800 mb-3">Water Conservation Tips</h4>
            <ul className="text-yellow-700 space-y-2 text-sm">
              <li>• Use drip irrigation for 30-50% water savings</li>
              <li>• Mulching reduces water evaporation by 70%</li>
              <li>• Install soil moisture sensors for precision irrigation</li>
              <li>• Collect rainwater during monsoon season</li>
              <li>• Avoid over-irrigation to prevent waterlogging</li>
            </ul>
          </div>

          {!advice && (
            <div className="text-center py-8">
              <Droplets className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">No Advice Yet</h3>
              <p className="text-gray-500">Fill in the form and click "Get Advice" to receive irrigation recommendations</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}