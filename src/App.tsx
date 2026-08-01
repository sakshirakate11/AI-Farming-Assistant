import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import HomePage from './components/HomePage';
import AuthForms from './components/AuthForms';
import Dashboard from './components/Dashboard';

function AppContent() {
  const { user, isLoading } = useAuth();
  const [currentView, setCurrentView] = useState<'home' | 'login' | 'signup'>('home');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!user && currentView === 'home') {
    return (
      <HomePage 
        onLogin={() => setCurrentView('login')}
        onSignup={() => setCurrentView('signup')}
      />
    );
  }

  if (!user && (currentView === 'login' || currentView === 'signup')) {
    return (
      <AuthForms 
        onSuccess={() => setCurrentView('home')}
        onBack={() => setCurrentView('home')}
        initialMode={currentView}
      />
    );
  }

  return <Dashboard />;
}

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;