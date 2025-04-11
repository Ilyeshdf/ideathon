import React, { createContext, useState, useEffect } from 'react';
import translations from '../translations';

// Default language
const DEFAULT_LANGUAGE = 'en';

// Languages with RTL support
const RTL_LANGUAGES = ['ar'];

// Create the context
export const LanguageContext = createContext();

/**
 * Language context provider component
 * @param {Object} props Component props
 * @param {React.ReactNode} props.children Child components
 */
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Try to get the language from localStorage or use the default
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage || DEFAULT_LANGUAGE;
  });

  // Determine if the current language is RTL
  const isRTL = RTL_LANGUAGES.includes(language);

  // Translation function
  const t = (key) => {
    // Split the key by dots to allow for nested keys
    const keys = key.split('.');
    
    // Get the translation object for the current language
    const translationObj = translations[language] || translations[DEFAULT_LANGUAGE];
    
    // Navigate through the nested keys
    let result = translationObj;
    for (const k of keys) {
      result = result?.[k];
      if (result === undefined) break;
    }
    
    // Return the translation or the key itself if not found
    return result || key;
  };

  // Apply RTL class to body when language changes
  useEffect(() => {
    // Save the selected language to localStorage
    localStorage.setItem('language', language);
    
    // Add or remove RTL class based on the language
    if (isRTL) {
      document.body.classList.add('rtl');
    } else {
      document.body.classList.remove('rtl');
    }
    
    // Set the HTML lang attribute
    document.documentElement.lang = language;
  }, [language, isRTL]);

  // Context value
  const contextValue = {
    language,
    setLanguage,
    t,
    isRTL,
    supportedLanguages: Object.keys(translations),
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider; 