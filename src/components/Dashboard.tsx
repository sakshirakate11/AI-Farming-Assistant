import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import WeatherWidget from './widgets/WeatherWidget';
import DiseaseDetection from './widgets/DiseaseDetection';
import YieldPrediction from './widgets/YieldPrediction';
import MarketPrices from './widgets/MarketPrices';
import IrrigationAdvice from './widgets/IrrigationAdvice';
import { 
  LogOut, 
  Globe, 
  Home, 
  Cloud, 
  Camera, 
  TrendingUp, 
  DollarSign, 
  Droplets,
  Download,
  User
} from 'lucide-react';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const { user, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();

  const tabs = [
    { id: 'overview', label: t('dashboard'), icon: Home },
    { id: 'weather', label: t('weather'), icon: Cloud },
    { id: 'disease', label: t('diseaseDetection'), icon: Camera },
    { id: 'yield', label: t('yieldPrediction'), icon: TrendingUp },
    { id: 'market', label: t('marketPrices'), icon: DollarSign },
    { id: 'irrigation', label: t('irrigationAdvice'), icon: Droplets }
  ];

  const generateReport = () => {
    // Simulate PDF generation
    const link = document.createElement('a');
    link.href = '#';
    link.download = 'farming-report.pdf';
    alert('Report generated successfully! (Demo)');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center mr-3">
                <User className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-semibold text-gray-800">AI Farming Assistant</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4 text-gray-500" />
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as 'en' | 'hi' | 'mr')}
                  className="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-green-500"
                >
                  <option value="en">English</option>
                  <option value="hi">हिंदी</option>
                  <option value="mr">मराठी</option>
                </select>
              </div>
              
              <div className="text-sm text-gray-600">
                Welcome, {user?.name}
              </div>
              
              <button
                onClick={logout}
                className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
              >
                <LogOut className="w-4 h-4 mr-1" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-64 flex-shrink-0">
            <nav className="bg-white rounded-xl shadow-sm p-4">
              <div className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-green-100 text-green-700 border border-green-200'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-5 h-5 mr-3" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>
              
              <div className="mt-8 pt-4 border-t border-gray-200">
                <button
                  onClick={generateReport}
                  className="w-full flex items-center px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <Download className="w-5 h-5 mr-3" />
                  Download Report
                </button>
              </div>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <button
                      onClick={() => setActiveTab('disease')}
                      className="w-full bg-green-50 text-green-700 py-2 px-4 rounded-lg hover:bg-green-100 transition-colors"
                    >
                      Detect Plant Disease
                    </button>
                    <button
                      onClick={() => setActiveTab('weather')}
                      className="w-full bg-blue-50 text-blue-700 py-2 px-4 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      Check Weather
                    </button>
                    <button
                      onClick={() => setActiveTab('yield')}
                      className="w-full bg-purple-50 text-purple-700 py-2 px-4 rounded-lg hover:bg-purple-100 transition-colors"
                    >
                      Predict Yield
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Farm Stats</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Crops:</span>
                      <span className="font-semibold">5</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Area:</span>
                      <span className="font-semibold">12.5 acres</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Reports Generated:</span>
                      <span className="font-semibold">8</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
                  <div className="space-y-2 text-sm">
                    <div className="text-gray-600">Disease detection completed</div>
                    <div className="text-gray-600">Weather forecast updated</div>
                    <div className="text-gray-600">Market prices refreshed</div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'weather' && <WeatherWidget />}
            {activeTab === 'disease' && <DiseaseDetection />}
            {activeTab === 'yield' && <YieldPrediction />}
            {activeTab === 'market' && <MarketPrices />}
            {activeTab === 'irrigation' && <IrrigationAdvice />}
          </div>
        </div>
      </div>
    </div>
  );
}