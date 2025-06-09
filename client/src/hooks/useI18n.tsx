import { useState, useEffect } from 'react';

export type Language = 
  | 'en' | 'es' | 'fr' | 'de' | 'it' | 'pt' | 'ar' | 'hi' 
  | 'ur' | 'zh' | 'ja' | 'ko' | 'ru' | 'tr' | 'pl' | 'nl' | 'sv';

export function useI18n() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');
  const [nativeLanguage] = useState<Language>('en');
  const [isTranslationMode, setIsTranslationMode] = useState<boolean>(false);

  useEffect(() => {
    // Load saved language preference
    const savedLanguage = localStorage.getItem('nhsprep_language') as Language;
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const translateText = (text: string, targetLanguage?: Language): string => {
    return text;
  };

  const translateMedicalTerm = (term: string, targetLanguage?: Language): string => {
    return term;
  };

  const getMedicalDefinition = (term: string, targetLanguage?: Language): string => {
    return `Definition of ${term}`;
  };

  const setLanguage = (language: Language) => {
    setCurrentLanguage(language);
    localStorage.setItem('nhsprep_language', language);
  };

  const toggleTranslationMode = () => {
    setIsTranslationMode(!isTranslationMode);
    if (isTranslationMode) {
      setLanguage('en');
    } else {
      setLanguage(nativeLanguage);
    }
  };

  const t = (key: string, category?: string): string => {
    const keyMap: Record<string, string> = {
      'language': 'Choose Language',
      'toggleTranslation': 'Translation Mode'
    };
    
    return keyMap[key] || key;
  };

  return {
    currentLanguage,
    nativeLanguage,
    isTranslationMode,
    setLanguage,
    toggleTranslationMode,
    translateText,
    translateMedicalTerm,
    getMedicalDefinition,
    t,
    isRTL: false,
    formatNumber: (num: number) => num.toString(),
    formatDate: (date: Date) => date.toLocaleDateString(),
    getAllLanguages: () => [],
  };
}