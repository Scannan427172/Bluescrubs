import { useState, useEffect } from 'react';

export type Language = 
  | 'en' | 'es' | 'fr' | 'de' | 'it' | 'pt' | 'ar' | 'hi' 
  | 'ur' | 'zh' | 'ja' | 'ko' | 'ru' | 'tr' | 'pl' | 'nl' | 'sv';

export type SupportedLanguage = Language;

export interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
  flag: string;
  rtl?: boolean;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', rtl: true },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', flag: '🇵🇰', rtl: true },
  { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷' },
  { code: 'pl', name: 'Polish', nativeName: 'Polski', flag: '🇵🇱' },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', flag: '🇳🇱' },
  { code: 'sv', name: 'Swedish', nativeName: 'Svenska', flag: '🇸🇪' }
];

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
    const lang = targetLanguage || currentLanguage;
    if (lang === 'en') return text;
    
    // Basic medical translations
    const medicalTranslations: Record<string, Record<string, string>> = {
      ar: {
        "heart": "قلب", "patient": "مريض", "diagnosis": "تشخيص", "treatment": "علاج",
        "chest pain": "ألم في الصدر", "ECG": "تخطيط القلب", "STEMI": "احتشاء عضلة القلب",
        "Primary PCI": "التدخل التاجي الأولي", "thrombolysis": "إذابة الجلطة"
      },
      es: {
        "heart": "corazón", "patient": "paciente", "diagnosis": "diagnóstico", "treatment": "tratamiento",
        "chest pain": "dolor en el pecho", "ECG": "ECG", "STEMI": "STEMI",
        "Primary PCI": "ICP primario", "thrombolysis": "trombólisis"
      },
      fr: {
        "heart": "cœur", "patient": "patient", "diagnosis": "diagnostic", "treatment": "traitement",
        "chest pain": "douleur thoracique", "ECG": "ECG", "STEMI": "STEMI",
        "Primary PCI": "ICP primaire", "thrombolysis": "thrombolyse"
      }
    };
    
    const translations = medicalTranslations[lang] || {};
    let translated = text;
    
    Object.entries(translations).forEach(([english, native]) => {
      translated = translated.replace(new RegExp(english, 'gi'), native);
    });
    
    return translated;
  };

  const translateMedicalTerm = (term: string, targetLanguage?: Language): string => {
    return translateText(term, targetLanguage);
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
    getAllLanguages: () => SUPPORTED_LANGUAGES,
  };
}

// Export constants for other components to use
export { SUPPORTED_LANGUAGES };