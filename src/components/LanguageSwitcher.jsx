import React from 'react';
import { useTranslation } from '../hooks/useTranslation';

/**
 * Language switcher component
 * Allows users to change the application language
 */
const LanguageSwitcher = () => {
  const { t, language, setLanguage, supportedLanguages } = useTranslation();

  // Default languages if supportedLanguages is undefined
  const languages = supportedLanguages || [
    { code: 'en', name: 'English', dir: 'ltr' },
    { code: 'ar', name: 'Arabic', dir: 'rtl' },
    { code: 'fr', name: 'French', dir: 'ltr' }
  ];

  // User-friendly display names for languages
  const displayNames = {
    en: t('common.language', {}, 'English'),
    ar: t('common.language', {}, 'العربية'),
    fr: t('common.language', {}, 'Français')
  };

  return (
    <div className="language-switcher">
      <label htmlFor="language-select" className="mr-2 text-sm font-medium">
        {t('common.language')}:
      </label>
      <select
        id="language-select"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="px-2 py-1 rounded border border-gray-300 text-sm"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {displayNames[lang.code] || lang.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSwitcher; 