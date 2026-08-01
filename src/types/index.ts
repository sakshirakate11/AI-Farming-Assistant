export interface User {
  id: string;
  name: string;
  email: string;
  location: string;
  createdAt: Date;
}

export interface Crop {
  id: string;
  userId: string;
  cropName: string;
  soilType: string;
  areaAcres: number;
  stage: string;
  plantedDate: Date;
}

export interface Prediction {
  id: string;
  userId: string;
  cropId?: string;
  predictionType: 'disease' | 'yield' | 'market' | 'irrigation';
  result: any;
  createdAt: Date;
}

export interface WeatherData {
  location: string;
  temperature: number;
  humidity: number;
  rainfall: number;
  forecast: {
    day: string;
    temp: number;
    condition: string;
    humidity: number;
  }[];
}

export interface MarketPrice {
  crop: string;
  market: string;
  price: number;
  unit: string;
  date: string;
  trend: 'up' | 'down' | 'stable';
}

export interface DiseaseDetection {
  confidence: number;
  disease: string;
  treatment: string;
  severity: 'low' | 'medium' | 'high';
}