import { useContext } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';

/**
 * Custom hook that provides translation functionality
 * @returns {Object} Translation utilities and language information
 * @returns {Function} t - Translation function that translates keys based on current language
 * @returns {string} language - Current language code
 * @returns {Function} setLanguage - Function to change the current language
 * @returns {boolean} isRTL - Whether the current language is right-to-left
 * @returns {Array} supportedLanguages - Array of available language codes
 */
export const useTranslation = () => {
  const { language, setLanguage, t, isRTL, supportedLanguages } = useContext(LanguageContext);
  
  return {
    t,
    language,
    setLanguage,
    isRTL,
    supportedLanguages,
  };
};

export default useTranslation; 