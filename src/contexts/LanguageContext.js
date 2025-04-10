import React, { createContext, useContext, useState, useEffect } from 'react';

// Create language context
const LanguageContext = createContext();

// Language options
export const LANGUAGES = {
  EN: 'English',
  AR: 'العربية',
  FR: 'Français'
};

export function useLanguage() {
  return useContext(LanguageContext);
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    // Load saved language preference from localStorage, default to English
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage || 'EN';
  });

  // Save language preference to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('language', language);
    
    // You can also update the document's lang attribute
    document.documentElement.lang = language.toLowerCase();
    
    // For RTL languages like Arabic
    if (language === 'AR') {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }
  }, [language]);

  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  const value = {
    language,
    changeLanguage,
    languages: LANGUAGES
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
} 