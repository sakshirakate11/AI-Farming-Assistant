import { DiseaseDetection, MarketPrice, Prediction } from '../types';

export const detectDisease = async (imageFile: File): Promise<DiseaseDetection> => {
  // Simulate ML model prediction
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const diseases = [
    { disease: 'Healthy', treatment: 'Continue current care routine', severity: 'low' as const },
    { disease: 'Late Blight', treatment: 'Apply copper-based fungicide immediately', severity: 'high' as const },
    { disease: 'Early Blight', treatment: 'Remove affected leaves and apply fungicide', severity: 'medium' as const },
    { disease: 'Bacterial Spot', treatment: 'Apply copper bactericide and improve ventilation', severity: 'medium' as const },
    { disease: 'Leaf Mold', treatment: 'Reduce humidity and apply fungicide', severity: 'low' as const }
  ];
  
  const result = diseases[Math.floor(Math.random() * diseases.length)];
  
  return {
    confidence: Math.floor(Math.random() * 30) + 70, // 70-100%
    ...result
  };
};

export const predictYield = async (data: {
  cropName: string;
  soilType: string;
  areaAcres: number;
  rainfall: number;
  fertilizer: string;
}): Promise<number> => {
  // Simulate ML yield prediction
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const baseYield = {
    'Rice': 25,
    'Wheat': 20,
    'Maize': 30,
    'Cotton': 15,
    'Sugarcane': 400
  };
  
  const base = baseYield[data.cropName as keyof typeof baseYield] || 20;
  const variation = Math.random() * 0.4 - 0.2; // ±20% variation
  
  return Math.round(base * (1 + variation) * data.areaAcres);
};

export const getMarketPrices = async (crop: string): Promise<MarketPrice[]> => {
  // Simulate market price data
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const markets = ['Delhi', 'Mumbai', 'Bangalore', 'Pune', 'Hyderabad'];
  const basePrice = Math.floor(Math.random() * 5000) + 2000; // ₹2000-7000
  
  return markets.map(market => ({
    crop,
    market,
    price: basePrice + Math.floor(Math.random() * 1000) - 500,
    unit: 'per quintal',
    date: new Date().toLocaleDateString(),
    trend: ['up', 'down', 'stable'][Math.floor(Math.random() * 3)] as 'up' | 'down' | 'stable'
  }));
};

export const getIrrigationAdvice = async (data: {
  soilType: string;
  moisture: number;
  cropStage: string;
}): Promise<string> => {
  // Simulate irrigation advice
  await new Promise(resolve => setTimeout(resolve, 800));
  
  if (data.moisture < 30) {
    return 'Immediate irrigation needed. Apply 25-30mm water depth.';
  } else if (data.moisture < 50) {
    return 'Light irrigation recommended. Apply 15-20mm water depth.';
  } else if (data.moisture < 70) {
    return 'Soil moisture is adequate. Monitor daily.';
  } else {
    return 'Soil moisture is optimal. No irrigation needed for 2-3 days.';
  }
};