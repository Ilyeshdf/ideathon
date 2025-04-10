import React, { useState } from 'react';
import { FiGlobe } from 'react-icons/fi';
import { useLanguage, LANGUAGES } from '../../contexts/LanguageContext';

const LanguageSwitcher = () => {
  const { language, changeLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLanguageChange = (lang) => {
    changeLanguage(lang);
    setIsOpen(false);
  };

  // Get the language flag emoji based on language code
  const getLanguageFlag = (lang) => {
    switch (lang) {
      case 'EN':
        return '🇬🇧';
      case 'AR':
        return '🇸🇦';
      case 'FR':
        return '🇫🇷';
      default:
        return '🌐';
    }
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-1 text-gray-700 hover:text-primary font-medium"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <FiGlobe className="h-5 w-5" />
        <span className="hidden sm:inline-block">{LANGUAGES[language]}</span>
        <span className="sm:hidden">{getLanguageFlag(language)}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
          {Object.entries(LANGUAGES).map(([code, name]) => (
            <button
              key={code}
              onClick={() => handleLanguageChange(code)}
              className={`w-full text-left px-4 py-2 ${
                language === code ? 'bg-gray-100 text-primary' : 'text-gray-800 hover:bg-gray-100'
              } flex items-center`}
            >
              <span className="mr-2">{getLanguageFlag(code)}</span>
              <span>{name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher; 