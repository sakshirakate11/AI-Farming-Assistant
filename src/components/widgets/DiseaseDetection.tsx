import React, { useState } from 'react';
import { detectDisease } from '../../services/mlService';
import { DiseaseDetection as DiseaseDetectionType } from '../../types';
import { Camera, Upload, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

export default function DiseaseDetection() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [prediction, setPrediction] = useState<DiseaseDetectionType | null>(null);
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setPrediction(null);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setLoading(true);
    try {
      const result = await detectDisease(selectedFile);
      setPrediction(result);
    } catch (error) {
      console.error('Error detecting disease:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'low': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'medium': return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'high': return <XCircle className="w-5 h-5 text-red-500" />;
      default: return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'text-green-700 bg-green-50 border-green-200';
      case 'medium': return 'text-yellow-700 bg-yellow-50 border-yellow-200';
      case 'high': return 'text-red-700 bg-red-50 border-red-200';
      default: return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center mb-6">
        <Camera className="w-8 h-8 text-green-600 mr-3" />
        <h2 className="text-2xl font-bold text-gray-800">Disease Detection</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload Section */}
        <div>
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
            {previewUrl ? (
              <div className="space-y-4">
                <img
                  src={previewUrl}
                  alt="Selected crop"
                  className="max-w-full h-48 object-cover rounded-lg mx-auto"
                />
                <p className="text-sm text-gray-600">{selectedFile?.name}</p>
              </div>
            ) : (
              <div className="space-y-4">
                <Upload className="w-16 h-16 text-gray-400 mx-auto" />
                <div>
                  <h3 className="text-lg font-medium text-gray-800">Upload Crop Image</h3>
                  <p className="text-gray-600">Select a clear image of the affected crop leaf</p>
                </div>
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="inline-block mt-4 bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 cursor-pointer transition-colors"
            >
              {previewUrl ? 'Change Image' : 'Select Image'}
            </label>
          </div>

          {selectedFile && (
            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="w-full mt-4 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Analyzing...
                </>
              ) : (
                'Analyze for Disease'
              )}
            </button>
          )}
        </div>

        {/* Results Section */}
        <div>
          {prediction ? (
            <div className="space-y-6">
              <div className={`border rounded-xl p-6 ${getSeverityColor(prediction.severity)}`}>
                <div className="flex items-center mb-4">
                  {getSeverityIcon(prediction.severity)}
                  <h3 className="text-xl font-bold ml-2">
                    {prediction.disease === 'Healthy' ? 'Plant is Healthy!' : `${prediction.disease} Detected`}
                  </h3>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Confidence:</span>
                    <span className="font-bold">{prediction.confidence}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Severity:</span>
                    <span className="font-bold capitalize">{prediction.severity}</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h4 className="text-lg font-bold text-blue-800 mb-3">Recommended Treatment</h4>
                <p className="text-blue-700">{prediction.treatment}</p>
              </div>

              {prediction.disease !== 'Healthy' && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                  <h4 className="text-lg font-bold text-yellow-800 mb-3">Prevention Tips</h4>
                  <ul className="text-yellow-700 space-y-1">
                    <li>• Maintain proper plant spacing for air circulation</li>
                    <li>• Water at soil level to avoid wet foliage</li>
                    <li>• Remove and destroy affected plant parts</li>
                    <li>• Apply preventive fungicide sprays during humid weather</li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12">
              <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">No Analysis Yet</h3>
              <p className="text-gray-500">Upload an image and click "Analyze" to detect diseases</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}