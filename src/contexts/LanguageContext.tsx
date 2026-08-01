import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'hi' | 'mr';

interface Translations {
  [key: string]: {
    en: string;
    hi: string;
    mr: string;
  };
}

const translations: Translations = {
  welcome: {
    en: 'Welcome to AI Farming Assistant',
    hi: 'एआई कृषि सहायक में आपका स्वागत है',
    mr: 'एआय शेती सहाय्यकामध्ये आपले स्वागत आहे'
  },
  dashboard: {
    en: 'Dashboard',
    hi: 'डैशबोर्ड',
    mr: 'डॅशबोर्ड'
  },
  login: {
    en: 'Login',
    hi: 'लॉग इन',
    mr: 'लॉगिन'
  },
  signup: {
    en: 'Sign Up',
    hi: 'साइन अप',
    mr: 'साइन अप'
  },
  weather: {
    en: 'Weather Forecast',
    hi: 'मौसम पूर्वानुमान',
    mr: 'हवामान अंदाज'
  },
  diseaseDetection: {
    en: 'Disease Detection',
    hi: 'रोग का पता लगाना',
    mr: 'रोग शोध'
  },
  yieldPrediction: {
    en: 'Yield Prediction',
    hi: 'उत्पादन पूर्वानुमान',
    mr: 'उत्पादन अंदाज'
  },
  marketPrices: {
    en: 'Market Prices',
    hi: 'बाजार मूल्य',
    mr: 'बाजार दर'
  },
  irrigationAdvice: {
    en: 'Irrigation Advice',
    hi: 'सिंचाई सलाह',
    mr: 'पाणी पुरवठा सल्ला'
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}