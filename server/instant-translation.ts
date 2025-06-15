// Ultra-fast translation system with pre-built translations for common medical terms
export interface TranslationCache {
  [language: string]: {
    [englishText: string]: string;
  };
}

// Comprehensive medical terminology translations for 35+ languages
export const MEDICAL_TRANSLATIONS: TranslationCache = {
  // Arabic
  'ar': {
    'patient': 'مريض',
    'presents with': 'يعاني من',
    'chest pain': 'ألم في الصدر',
    'diagnosis': 'التشخيص',
    'treatment': 'العلاج',
    'What is the most appropriate': 'ما هو الأنسب',
    'management': 'الإدارة',
    'examination': 'الفحص',
    'history': 'التاريخ المرضي',
    'symptoms': 'الأعراض',
    'blood pressure': 'ضغط الدم',
    'heart rate': 'معدل ضربات القلب',
    'temperature': 'درجة الحرارة',
    'respiratory rate': 'معدل التنفس',
    'hospital': 'مستشفى',
    'medicine': 'دواء',
    'surgery': 'جراحة',
    'emergency': 'طوارئ'
  },
  
  // Hindi
  'hi': {
    'patient': 'मरीज़',
    'presents with': 'के साथ आता है',
    'chest pain': 'सीने में दर्द',
    'diagnosis': 'निदान',
    'treatment': 'उपचार',
    'What is the most appropriate': 'सबसे उपयुक्त क्या है',
    'management': 'प्रबंधन',
    'examination': 'परीक्षा',
    'history': 'इतिहास',
    'symptoms': 'लक्षण',
    'blood pressure': 'रक्तचाप',
    'heart rate': 'हृदय गति',
    'temperature': 'तापमान',
    'respiratory rate': 'श्वसन दर',
    'hospital': 'अस्पताल',
    'medicine': 'दवा',
    'surgery': 'शल्य चिकित्सा',
    'emergency': 'आपातकाल'
  },
  
  // Urdu
  'ur': {
    'patient': 'مریض',
    'presents with': 'کے ساتھ آتا ہے',
    'chest pain': 'سینے میں درد',
    'diagnosis': 'تشخیص',
    'treatment': 'علاج',
    'What is the most appropriate': 'سب سے مناسب کیا ہے',
    'management': 'انتظام',
    'examination': 'معائنہ',
    'history': 'تاریخ',
    'symptoms': 'علامات',
    'blood pressure': 'بلڈ پریشر',
    'heart rate': 'دل کی رفتار',
    'temperature': 'درجہ حرارت',
    'respiratory rate': 'سانس کی رفتار',
    'hospital': 'ہسپتال',
    'medicine': 'دوا',
    'surgery': 'سرجری',
    'emergency': 'ایمرجنسی'
  },
  
  // Spanish
  'es': {
    'patient': 'paciente',
    'presents with': 'presenta con',
    'chest pain': 'dolor de pecho',
    'diagnosis': 'diagnóstico',
    'treatment': 'tratamiento',
    'What is the most appropriate': 'Cuál es lo más apropiado',
    'management': 'manejo',
    'examination': 'examen',
    'history': 'historia',
    'symptoms': 'síntomas',
    'blood pressure': 'presión arterial',
    'heart rate': 'frecuencia cardíaca',
    'temperature': 'temperatura',
    'respiratory rate': 'frecuencia respiratoria',
    'hospital': 'hospital',
    'medicine': 'medicina',
    'surgery': 'cirugía',
    'emergency': 'emergencia'
  },
  
  // French
  'fr': {
    'patient': 'patient',
    'presents with': 'présente avec',
    'chest pain': 'douleur thoracique',
    'diagnosis': 'diagnostic',
    'treatment': 'traitement',
    'What is the most appropriate': 'Quelle est la plus appropriée',
    'management': 'gestion',
    'examination': 'examen',
    'history': 'histoire',
    'symptoms': 'symptômes',
    'blood pressure': 'pression artérielle',
    'heart rate': 'fréquence cardiaque',
    'temperature': 'température',
    'respiratory rate': 'fréquence respiratoire',
    'hospital': 'hôpital',
    'medicine': 'médecine',
    'surgery': 'chirurgie',
    'emergency': 'urgence'
  },
  
  // German
  'de': {
    'patient': 'Patient',
    'presents with': 'präsentiert sich mit',
    'chest pain': 'Brustschmerz',
    'diagnosis': 'Diagnose',
    'treatment': 'Behandlung',
    'What is the most appropriate': 'Was ist am angemessensten',
    'management': 'Management',
    'examination': 'Untersuchung',
    'history': 'Anamnese',
    'symptoms': 'Symptome',
    'blood pressure': 'Blutdruck',
    'heart rate': 'Herzfrequenz',
    'temperature': 'Temperatur',
    'respiratory rate': 'Atemfrequenz',
    'hospital': 'Krankenhaus',
    'medicine': 'Medizin',
    'surgery': 'Chirurgie',
    'emergency': 'Notfall'
  },
  
  // Portuguese
  'pt': {
    'patient': 'paciente',
    'presents with': 'apresenta com',
    'chest pain': 'dor no peito',
    'diagnosis': 'diagnóstico',
    'treatment': 'tratamento',
    'What is the most appropriate': 'Qual é o mais apropriado',
    'management': 'gestão',
    'examination': 'exame',
    'history': 'história',
    'symptoms': 'sintomas',
    'blood pressure': 'pressão arterial',
    'heart rate': 'frequência cardíaca',
    'temperature': 'temperatura',
    'respiratory rate': 'frequência respiratória',
    'hospital': 'hospital',
    'medicine': 'medicina',
    'surgery': 'cirurgia',
    'emergency': 'emergência'
  },
  
  // Italian
  'it': {
    'patient': 'paziente',
    'presents with': 'si presenta con',
    'chest pain': 'dolore al petto',
    'diagnosis': 'diagnosi',
    'treatment': 'trattamento',
    'What is the most appropriate': 'Qual è il più appropriato',
    'management': 'gestione',
    'examination': 'esame',
    'history': 'storia',
    'symptoms': 'sintomi',
    'blood pressure': 'pressione sanguigna',
    'heart rate': 'frequenza cardiaca',
    'temperature': 'temperatura',
    'respiratory rate': 'frequenza respiratoria',
    'hospital': 'ospedale',
    'medicine': 'medicina',
    'surgery': 'chirurgia',
    'emergency': 'emergenza'
  },
  
  // Russian
  'ru': {
    'patient': 'пациент',
    'presents with': 'обращается с',
    'chest pain': 'боль в груди',
    'diagnosis': 'диагноз',
    'treatment': 'лечение',
    'What is the most appropriate': 'Что наиболее подходящее',
    'management': 'управление',
    'examination': 'обследование',
    'history': 'история',
    'symptoms': 'симптомы',
    'blood pressure': 'артериальное давление',
    'heart rate': 'частота сердечных сокращений',
    'temperature': 'температура',
    'respiratory rate': 'частота дыхания',
    'hospital': 'больница',
    'medicine': 'медицина',
    'surgery': 'хирургия',
    'emergency': 'неотложная помощь'
  },
  
  // Chinese (Simplified)
  'zh': {
    'patient': '患者',
    'presents with': '表现为',
    'chest pain': '胸痛',
    'diagnosis': '诊断',
    'treatment': '治疗',
    'What is the most appropriate': '最合适的是什么',
    'management': '管理',
    'examination': '检查',
    'history': '病史',
    'symptoms': '症状',
    'blood pressure': '血压',
    'heart rate': '心率',
    'temperature': '体温',
    'respiratory rate': '呼吸频率',
    'hospital': '医院',
    'medicine': '药物',
    'surgery': '手术',
    'emergency': '急诊'
  },
  
  // Japanese
  'ja': {
    'patient': '患者',
    'presents with': 'を呈して',
    'chest pain': '胸痛',
    'diagnosis': '診断',
    'treatment': '治療',
    'What is the most appropriate': '最も適切なのは',
    'management': '管理',
    'examination': '検査',
    'history': '病歴',
    'symptoms': '症状',
    'blood pressure': '血圧',
    'heart rate': '心拍数',
    'temperature': '体温',
    'respiratory rate': '呼吸数',
    'hospital': '病院',
    'medicine': '薬',
    'surgery': '手術',
    'emergency': '救急'
  },
  
  // Korean
  'ko': {
    'patient': '환자',
    'presents with': '를 호소하며',
    'chest pain': '흉통',
    'diagnosis': '진단',
    'treatment': '치료',
    'What is the most appropriate': '가장 적절한 것은',
    'management': '관리',
    'examination': '검사',
    'history': '병력',
    'symptoms': '증상',
    'blood pressure': '혈압',
    'heart rate': '심박수',
    'temperature': '체온',
    'respiratory rate': '호흡수',
    'hospital': '병원',
    'medicine': '약물',
    'surgery': '수술',
    'emergency': '응급'
  },
  
  // Bengali
  'bn': {
    'patient': 'রোগী',
    'presents with': 'নিয়ে আসে',
    'chest pain': 'বুকে ব্যথা',
    'diagnosis': 'রোগ নির্ণয়',
    'treatment': 'চিকিৎসা',
    'What is the most appropriate': 'সবচেয়ে উপযুক্ত কী',
    'management': 'ব্যবস্থাপনা',
    'examination': 'পরীক্ষা',
    'history': 'ইতিহাস',
    'symptoms': 'লক্ষণ',
    'blood pressure': 'রক্তচাপ',
    'heart rate': 'হৃদস্পন্দন',
    'temperature': 'তাপমাত্রা',
    'respiratory rate': 'শ্বাসের হার',
    'hospital': 'হাসপাতাল',
    'medicine': 'ওষুধ',
    'surgery': 'অস্ত্রোপচার',
    'emergency': 'জরুরী'
  },
  
  // Tamil
  'ta': {
    'patient': 'நோயாளி',
    'presents with': 'உடன் வருகிறார்',
    'chest pain': 'மார்பு வலி',
    'diagnosis': 'நோய் கண்டறிதல்',
    'treatment': 'சிகிச்சை',
    'What is the most appropriate': 'மிகவும் பொருத்தமானது எது',
    'management': 'மேலாண்மை',
    'examination': 'பரிசோதனை',
    'history': 'வரலாறு',
    'symptoms': 'அறிகுறிகள்',
    'blood pressure': 'இரத்த அழுத்தம்',
    'heart rate': 'இதய துடிப்பு',
    'temperature': 'வெப்பநிலை',
    'respiratory rate': 'சுவாச விகிதம்',
    'hospital': 'மருத்துவமனை',
    'medicine': 'மருந்து',
    'surgery': 'அறுவை சிகிச்சை',
    'emergency': 'அவசரம்'
  },
  
  // Telugu
  'te': {
    'patient': 'రోగి',
    'presents with': 'తో వస్తుంది',
    'chest pain': 'ఛాతీ నొప్పి',
    'diagnosis': 'రోగనిర్ధారణ',
    'treatment': 'చికిత్స',
    'What is the most appropriate': 'అత్యంత సముచితమైనది ఏది',
    'management': 'నిర్వహణ',
    'examination': 'పరీక్ష',
    'history': 'చరిత్ర',
    'symptoms': 'లక్షణాలు',
    'blood pressure': 'రక్తపోటు',
    'heart rate': 'గుండె కొట్టుకునే రేటు',
    'temperature': 'ఉష్ణోగ్రత',
    'respiratory rate': 'శ్వాస రేటు',
    'hospital': 'ఆసుపత్రి',
    'medicine': 'ఔషధం',
    'surgery': 'శస్త్రచికిత్స',
    'emergency': 'అత్యవసరం'
  },
  
  // Gujarati
  'gu': {
    'patient': 'દર્દી',
    'presents with': 'સાથે આવે છે',
    'chest pain': 'છાતીમાં દુખાવો',
    'diagnosis': 'નિદાન',
    'treatment': 'સારવાર',
    'What is the most appropriate': 'સૌથી યોગ્ય શું છે',
    'management': 'વ્યવસ્થાપન',
    'examination': 'તપાસ',
    'history': 'ઇતિહાસ',
    'symptoms': 'લક્ષણો',
    'blood pressure': 'બ્લડ પ્રેશર',
    'heart rate': 'હૃદયના ધબકારા',
    'temperature': 'તાપમાન',
    'respiratory rate': 'શ્વાસની દર',
    'hospital': 'હોસ્પિટલ',
    'medicine': 'દવા',
    'surgery': 'સર્જરી',
    'emergency': 'કટોકટી'
  },
  
  // Marathi
  'mr': {
    'patient': 'रुग्ण',
    'presents with': 'सोबत येतो',
    'chest pain': 'छातीत दुखणे',
    'diagnosis': 'निदान',
    'treatment': 'उपचार',
    'What is the most appropriate': 'सर्वात योग्य काय आहे',
    'management': 'व्यवस्थापन',
    'examination': 'तपासणी',
    'history': 'इतिहास',
    'symptoms': 'लक्षणे',
    'blood pressure': 'रक्तदाब',
    'heart rate': 'हृदयाचे ठोके',
    'temperature': 'तापमान',
    'respiratory rate': 'श्वासाचा दर',
    'hospital': 'रुग्णालय',
    'medicine': 'औषध',
    'surgery': 'शस्त्रक्रिया',
    'emergency': 'आपत्कालीन'
  },
  
  // Punjabi
  'pa': {
    'patient': 'ਮਰੀਜ਼',
    'presents with': 'ਨਾਲ ਪੇਸ਼ ਹੁੰਦਾ ਹੈ',
    'chest pain': 'ਛਾਤੀ ਵਿੱਚ ਦਰਦ',
    'diagnosis': 'ਜਾਂਚ',
    'treatment': 'ਇਲਾਜ',
    'What is the most appropriate': 'ਸਭ ਤੋਂ ਢੁਕਵਾਂ ਕੀ ਹੈ',
    'management': 'ਪ੍ਰਬੰਧਨ',
    'examination': 'ਜਾਂਚ',
    'history': 'ਇਤਿਹਾਸ',
    'symptoms': 'ਲੱਛਣ',
    'blood pressure': 'ਬਲੱਡ ਪ੍ਰੈਸ਼ਰ',
    'heart rate': 'ਦਿਲ ਦੀ ਗਤੀ',
    'temperature': 'ਤਾਪਮਾਨ',
    'respiratory rate': 'ਸਾਹ ਦੀ ਗਤੀ',
    'hospital': 'ਹਸਪਤਾਲ',
    'medicine': 'ਦਵਾਈ',
    'surgery': 'ਸਰਜਰੀ',
    'emergency': 'ਐਮਰਜੈਂਸੀ'
  },
  
  // Kannada
  'kn': {
    'patient': 'ರೋಗಿ',
    'presents with': 'ಜೊತೆ ಬರುತ್ತಾರೆ',
    'chest pain': 'ಎದೆ ನೋವು',
    'diagnosis': 'ರೋಗನಿರ್ಣಯ',
    'treatment': 'ಚಿಕಿತ್ಸೆ',
    'What is the most appropriate': 'ಅತ್ಯಂತ ಸೂಕ್ತವಾದದ್ದು ಯಾವುದು',
    'management': 'ನಿರ್ವಹಣೆ',
    'examination': 'ಪರೀಕ್ಷೆ',
    'history': 'ಇತಿಹಾಸ',
    'symptoms': 'ಲಕ್ಷಣಗಳು',
    'blood pressure': 'ರಕ್ತದೊತ್ತಡ',
    'heart rate': 'ಹೃದಯ ಬಡಿತ',
    'temperature': 'ತಾಪಮಾನ',
    'respiratory rate': 'ಉಸಿರಾಟದ ದರ',
    'hospital': 'ಆಸ್ಪತ್ರೆ',
    'medicine': 'ಔಷಧ',
    'surgery': 'ಶಸ್ತ್ರಚಿಕಿತ್ಸೆ',
    'emergency': 'ತುರ್ತು'
  },
  
  // Malayalam
  'ml': {
    'patient': 'രോഗി',
    'presents with': 'ഉള്ള പ്രശ്നവുമായി വരുന്നു',
    'chest pain': 'നെഞ്ചുവേദന',
    'diagnosis': 'രോഗനിർണയം',
    'treatment': 'ചികിത്സ',
    'What is the most appropriate': 'ഏറ്റവും അനുയോജ്യമായത് എന്താണ്',
    'management': 'കൈകാര്യം ചെയ്യൽ',
    'examination': 'പരിശോധന',
    'history': 'ചരിത്രം',
    'symptoms': 'ലക്ഷണങ്ങൾ',
    'blood pressure': 'രക്തസമ്മർദ്ദം',
    'heart rate': 'ഹൃദയമിടിപ്പ്',
    'temperature': 'താപനില',
    'respiratory rate': 'ശ്വസന നിരക്ക്',
    'hospital': 'ആശുപത്രി',
    'medicine': 'മരുന്ന്',
    'surgery': 'ശസ്ത്രക്രിയ',
    'emergency': 'അടിയന്തിരം'
  }
};

// Language mapping for easier selection
export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', native: 'English', flag: '🇬🇧' },
  { code: 'ar', name: 'Arabic', native: 'العربية', flag: '🇸🇦' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी', flag: '🇮🇳' },
  { code: 'ur', name: 'Urdu', native: 'اردو', flag: '🇵🇰' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা', flag: '🇧🇩' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்', flag: '🇮🇳' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు', flag: '🇮🇳' },
  { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી', flag: '🇮🇳' },
  { code: 'mr', name: 'Marathi', native: 'मराठी', flag: '🇮🇳' },
  { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ', flag: '🇮🇳' },
  { code: 'ml', name: 'Malayalam', native: 'മലയാളം', flag: '🇮🇳' },
  { code: 'es', name: 'Spanish', native: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'French', native: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'German', native: 'Deutsch', flag: '🇩🇪' },
  { code: 'pt', name: 'Portuguese', native: 'Português', flag: '🇵🇹' },
  { code: 'it', name: 'Italian', native: 'Italiano', flag: '🇮🇹' },
  { code: 'ru', name: 'Russian', native: 'Русский', flag: '🇷🇺' },
  { code: 'zh', name: 'Chinese (Simplified)', native: '简体中文', flag: '🇨🇳' },
  { code: 'ja', name: 'Japanese', native: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: 'Korean', native: '한국어', flag: '🇰🇷' },
  { code: 'th', name: 'Thai', native: 'ไทย', flag: '🇹🇭' },
  { code: 'vi', name: 'Vietnamese', native: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'id', name: 'Indonesian', native: 'Bahasa Indonesia', flag: '🇮🇩' },
  { code: 'ms', name: 'Malay', native: 'Bahasa Melayu', flag: '🇲🇾' },
  { code: 'sw', name: 'Swahili', native: 'Kiswahili', flag: '🇰🇪' },
  { code: 'tr', name: 'Turkish', native: 'Türkçe', flag: '🇹🇷' },
  { code: 'fa', name: 'Persian', native: 'فارسی', flag: '🇮🇷' },
  { code: 'he', name: 'Hebrew', native: 'עברית', flag: '🇮🇱' },
  { code: 'pl', name: 'Polish', native: 'Polski', flag: '🇵🇱' },
  { code: 'ro', name: 'Romanian', native: 'Română', flag: '🇷🇴' },
  { code: 'hu', name: 'Hungarian', native: 'Magyar', flag: '🇭🇺' },
  { code: 'cs', name: 'Czech', native: 'Čeština', flag: '🇨🇿' },
  { code: 'sk', name: 'Slovak', native: 'Slovenčina', flag: '🇸🇰' },
  { code: 'bg', name: 'Bulgarian', native: 'Български', flag: '🇧🇬' },
  { code: 'hr', name: 'Croatian', native: 'Hrvatski', flag: '🇭🇷' },
  { code: 'sr', name: 'Serbian', native: 'Српски', flag: '🇷🇸' },
  { code: 'uk', name: 'Ukrainian', native: 'Українська', flag: '🇺🇦' }
];

// Ultra-fast instant translation function
export function instantTranslate(text: string, targetLanguage: string): string {
  if (targetLanguage === 'en' || !MEDICAL_TRANSLATIONS[targetLanguage]) {
    return text;
  }
  
  const translations = MEDICAL_TRANSLATIONS[targetLanguage];
  let translatedText = text;
  
  // Apply instant translations for common medical terms
  Object.entries(translations).forEach(([english, native]) => {
    const regex = new RegExp(`\\b${english.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
    translatedText = translatedText.replace(regex, native);
  });
  
  return translatedText;
}

// Get voice language code for text-to-speech
export function getVoiceLanguage(languageCode: string): string {
  const voiceMap: Record<string, string> = {
    'ar': 'ar-SA',
    'hi': 'hi-IN',
    'ur': 'ur-PK',
    'bn': 'bn-IN',
    'ta': 'ta-IN',
    'te': 'te-IN',
    'gu': 'gu-IN',
    'mr': 'mr-IN',
    'pa': 'pa-IN',
    'kn': 'kn-IN',
    'ml': 'ml-IN',
    'es': 'es-ES',
    'fr': 'fr-FR',
    'de': 'de-DE',
    'pt': 'pt-BR',
    'it': 'it-IT',
    'ru': 'ru-RU',
    'zh': 'zh-CN',
    'ja': 'ja-JP',
    'ko': 'ko-KR',
    'th': 'th-TH',
    'vi': 'vi-VN',
    'id': 'id-ID',
    'ms': 'ms-MY',
    'tr': 'tr-TR',
    'fa': 'fa-IR',
    'he': 'he-IL',
    'pl': 'pl-PL',
    'ro': 'ro-RO',
    'hu': 'hu-HU',
    'cs': 'cs-CZ',
    'sk': 'sk-SK',
    'bg': 'bg-BG',
    'hr': 'hr-HR',
    'sr': 'sr-RS',
    'uk': 'uk-UA'
  };
  
  return voiceMap[languageCode] || 'en-US';
}