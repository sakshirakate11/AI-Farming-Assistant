import React from 'react';
import { Sprout, Users, TrendingUp, Cloud, Camera, DollarSign, Droplets, Shield, Globe, Award } from 'lucide-react';

interface HomePageProps {
  onLogin: () => void;
  onSignup: () => void;
}

export default function HomePage({ onLogin, onSignup }: HomePageProps) {
  const features = [
    {
      icon: Camera,
      title: 'Disease Detection',
      description: 'Upload crop images to detect diseases using AI-powered analysis',
      color: 'text-green-600 bg-green-50'
    },
    {
      icon: Cloud,
      title: 'Weather Forecast',
      description: 'Get accurate weather predictions to plan your farming activities',
      color: 'text-blue-600 bg-blue-50'
    },
    {
      icon: TrendingUp,
      title: 'Yield Prediction',
      description: 'Predict crop yields based on soil, weather, and farming practices',
      color: 'text-purple-600 bg-purple-50'
    },
    {
      icon: DollarSign,
      title: 'Market Prices',
      description: 'Track real-time market prices across different mandis',
      color: 'text-yellow-600 bg-yellow-50'
    },
    {
      icon: Droplets,
      title: 'Irrigation Advice',
      description: 'Get smart irrigation recommendations based on soil moisture',
      color: 'text-cyan-600 bg-cyan-50'
    },
    {
      icon: Shield,
      title: 'Crop Protection',
      description: 'Receive alerts and advice for protecting your crops',
      color: 'text-red-600 bg-red-50'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Farmers Helped' },
    { number: '95%', label: 'Accuracy Rate' },
    { number: '50+', label: 'Crop Types' },
    { number: '24/7', label: 'Support' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl flex items-center justify-center mr-3">
                <Sprout className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-800">AI Farming Assistant</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={onLogin}
                className="text-gray-600 hover:text-gray-800 font-medium transition-colors"
              >
                Login
              </button>
              <button
                onClick={onSignup}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Sprout className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
              Smart Farming with
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600"> AI Technology</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Empower your farming with artificial intelligence. Get disease detection, weather forecasts, 
              yield predictions, and market insights - all in one comprehensive platform designed for modern farmers.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              onClick={onSignup}
              className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Start Free Today
            </button>
            <button
              onClick={onLogin}
              className="bg-white text-gray-800 px-8 py-4 rounded-xl hover:bg-gray-50 transition-colors font-semibold text-lg border border-gray-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Login to Dashboard
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Everything You Need for Smart Farming
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI-powered platform provides comprehensive tools to help you make informed decisions, 
              increase yields, and maximize profits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-green-200 group">
                  <div className={`w-16 h-16 rounded-xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                Why Choose Our AI Farming Assistant?
              </h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mr-4 mt-1">
                    <Award className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">AI-Powered Accuracy</h3>
                    <p className="text-gray-600">Advanced machine learning models trained on extensive agricultural data for precise predictions and recommendations.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mr-4 mt-1">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Farmer-Friendly Interface</h3>
                    <p className="text-gray-600">Designed specifically for farmers with intuitive navigation and multi-language support including Hindi and Marathi.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mr-4 mt-1">
                    <Globe className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Real-Time Data</h3>
                    <p className="text-gray-600">Access live weather forecasts, market prices, and agricultural insights to make timely decisions.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Ready to Get Started?</h3>
                <p className="text-gray-600">Join thousands of farmers already using our platform</p>
              </div>
              
              <div className="space-y-4">
                <button
                  onClick={onSignup}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl"
                >
                  Create Free Account
                </button>
                <button
                  onClick={onLogin}
                  className="w-full bg-gray-100 text-gray-800 py-4 rounded-xl hover:bg-gray-200 transition-colors font-semibold"
                >
                  Already have an account? Login
                </button>
              </div>
              
              <div className="mt-6 text-center text-sm text-gray-500">
                <p>✓ Free to use • ✓ No credit card required • ✓ Instant access</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-emerald-600 rounded-lg flex items-center justify-center mr-3">
                  <Sprout className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold">AI Farming Assistant</h3>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                Empowering farmers with AI technology to make smarter decisions, increase yields, and build sustainable farming practices.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Disease Detection</li>
                <li>Weather Forecast</li>
                <li>Yield Prediction</li>
                <li>Market Prices</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Documentation</li>
                <li>Community</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 AI Farming Assistant. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}