// Multi-language Support System for International Medical Graduates
// Comprehensive internationalisation with medical content localisation

// Translation cache for faster responses
const translationCache = new Map<string, any>();
const TRANSLATION_CACHE_TTL = 60 * 60 * 1000; // 1 hour
const cacheTimestamps = new Map<string, number>();

function getCacheKey(content: string, targetLanguage: string): string {
  return `${targetLanguage}_${content.substring(0, 100)}`;
}

function getCachedTranslation(cacheKey: string): any | null {
  const timestamp = cacheTimestamps.get(cacheKey);
  if (timestamp && (Date.now() - timestamp) < TRANSLATION_CACHE_TTL) {
    return translationCache.get(cacheKey) || null;
  }
  // Clean expired cache
  translationCache.delete(cacheKey);
  cacheTimestamps.delete(cacheKey);
  return null;
}

function setCachedTranslation(cacheKey: string, translation: any): void {
  translationCache.set(cacheKey, translation);
  cacheTimestamps.set(cacheKey, Date.now());
}

export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  rtl: boolean;
  medicalTerminologySupport: boolean;
  plabContentAvailable: boolean;
  nhsContextualisation: boolean;
}

export interface LocalisedContent {
  language: string;
  medical: {
    terminology: Record<string, string>;
    anatomicalTerms: Record<string, string>;
    conditions: Record<string, string>;
    procedures: Record<string, string>;
    medications: Record<string, string>;
  };
  examContent: {
    questions: any[];
    explanations: Record<string, string>;
    osceStations: any[];
    culturalNotes: string[];
  };
  interface: {
    navigation: Record<string, string>;
    buttons: Record<string, string>;
    forms: Record<string, string>;
    messages: Record<string, string>;
    errors: Record<string, string>;
  };
  nhsContext: {
    procedures: Record<string, string>;
    hierarchy: Record<string, string>;
    documentation: Record<string, string>;
    culturalNorms: string[];
  };
}

export interface TranslationProgress {
  language: string;
  overall: number;
  categories: {
    interface: number;
    medical: number;
    examContent: number;
    nhsContext: number;
  };
  lastUpdated: Date;
  contributors: string[];
}

export class InternationalisationEngine {
  
  // Supported languages prioritised by international medical graduate populations
  private supportedLanguages: Language[] = [
    {
      code: 'en-GB',
      name: 'English (UK)',
      nativeName: 'English (UK)',
      flag: '🇬🇧',
      rtl: false,
      medicalTerminologySupport: true,
      plabContentAvailable: true,
      nhsContextualisation: true
    },
    {
      code: 'ar',
      name: 'Arabic',
      nativeName: 'العربية',
      flag: '🇸🇦',
      rtl: true,
      medicalTerminologySupport: true,
      plabContentAvailable: true,
      nhsContextualisation: true
    },
    {
      code: 'ur',
      name: 'Urdu',
      nativeName: 'اردو',
      flag: '🇵🇰',
      rtl: true,
      medicalTerminologySupport: true,
      plabContentAvailable: true,
      nhsContextualisation: true
    },
    {
      code: 'hi',
      name: 'Hindi',
      nativeName: 'हिन्दी',
      flag: '🇮🇳',
      rtl: false,
      medicalTerminologySupport: true,
      plabContentAvailable: true,
      nhsContextualisation: true
    },
    {
      code: 'bn',
      name: 'Bengali',
      nativeName: 'বাংলা',
      flag: '🇧🇩',
      rtl: false,
      medicalTerminologySupport: true,
      plabContentAvailable: true,
      nhsContextualisation: true
    },
    {
      code: 'ta',
      name: 'Tamil',
      nativeName: 'தமிழ்',
      flag: '🇱🇰',
      rtl: false,
      medicalTerminologySupport: true,
      plabContentAvailable: true,
      nhsContextualisation: true
    },
    {
      code: 'es',
      name: 'Spanish',
      nativeName: 'Español',
      flag: '🇪🇸',
      rtl: false,
      medicalTerminologySupport: true,
      plabContentAvailable: true,
      nhsContextualisation: true
    },
    {
      code: 'fr',
      name: 'French',
      nativeName: 'Français',
      flag: '🇫🇷',
      rtl: false,
      medicalTerminologySupport: true,
      plabContentAvailable: true,
      nhsContextualisation: true
    },
    {
      code: 'de',
      name: 'German',
      nativeName: 'Deutsch',
      flag: '🇩🇪',
      rtl: false,
      medicalTerminologySupport: true,
      plabContentAvailable: true,
      nhsContextualisation: true
    },
    {
      code: 'it',
      name: 'Italian',
      nativeName: 'Italiano',
      flag: '🇮🇹',
      rtl: false,
      medicalTerminologySupport: true,
      plabContentAvailable: true,
      nhsContextualisation: true
    },
    {
      code: 'pt',
      name: 'Portuguese',
      nativeName: 'Português',
      flag: '🇵🇹',
      rtl: false,
      medicalTerminologySupport: true,
      plabContentAvailable: true,
      nhsContextualisation: true
    },
    {
      code: 'ru',
      name: 'Russian',
      nativeName: 'Русский',
      flag: '🇷🇺',
      rtl: false,
      medicalTerminologySupport: true,
      plabContentAvailable: true,
      nhsContextualisation: true
    },
    {
      code: 'pl',
      name: 'Polish',
      nativeName: 'Polski',
      flag: '🇵🇱',
      rtl: false,
      medicalTerminologySupport: true,
      plabContentAvailable: true,
      nhsContextualisation: true
    },
    {
      code: 'ro',
      name: 'Romanian',
      nativeName: 'Română',
      flag: '🇷🇴',
      rtl: false,
      medicalTerminologySupport: true,
      plabContentAvailable: true,
      nhsContextualisation: true
    },
    {
      code: 'zh',
      name: 'Chinese (Simplified)',
      nativeName: '简体中文',
      flag: '🇨🇳',
      rtl: false,
      medicalTerminologySupport: true,
      plabContentAvailable: true,
      nhsContextualisation: true
    },
    {
      code: 'ja',
      name: 'Japanese',
      nativeName: '日本語',
      flag: '🇯🇵',
      rtl: false,
      medicalTerminologySupport: true,
      plabContentAvailable: true,
      nhsContextualisation: true
    },
    {
      code: 'ko',
      name: 'Korean',
      nativeName: '한국어',
      flag: '🇰🇷',
      rtl: false,
      medicalTerminologySupport: true,
      plabContentAvailable: true,
      nhsContextualisation: true
    }
  ];

  // Get available languages
  getSupportedLanguages(): Language[] {
    return this.supportedLanguages;
  }

  // Get language by code
  getLanguage(code: string): Language | undefined {
    return this.supportedLanguages.find(lang => lang.code === code);
  }

  // Generate localised medical terminology
  async generateMedicalTerminology(
    targetLanguage: string,
    medicalTerms: string[]
  ): Promise<Record<string, string>> {
    
    // This would integrate with medical translation APIs
    const terminology: Record<string, string> = {};
    
    // Sample medical terminology for demonstration
    const sampleTerminology = {
      'hypertension': {
        'ar': 'ارتفاع ضغط الدم',
        'ur': 'ہائی بلڈ پریشر',
        'hi': 'उच्च रक्तचाप',
        'bn': 'উচ্চ রক্তচাপ',
        'ta': 'உயர் இரத்த அழுத்தம்',
        'es': 'hipertensión',
        'fr': 'hypertension',
        'de': 'Bluthochdruck',
        'it': 'ipertensione',
        'pt': 'hipertensão',
        'ru': 'гипертония',
        'pl': 'nadciśnienie',
        'ro': 'hipertensiune',
        'zh': '高血压',
        'ja': '高血圧',
        'ko': '고혈압'
      },
      'diabetes': {
        'ar': 'داء السكري',
        'ur': 'ذیابیطس',
        'hi': 'मधुमेह',
        'bn': 'ডায়াবেটিস',
        'ta': 'நீரிழிவு',
        'es': 'diabetes',
        'fr': 'diabète',
        'de': 'Diabetes',
        'it': 'diabete',
        'pt': 'diabetes',
        'ru': 'диабет',
        'pl': 'cukrzyca',
        'ro': 'diabet',
        'zh': '糖尿病',
        'ja': '糖尿病',
        'ko': '당뇨병'
      },
      'pneumonia': {
        'ar': 'الالتهاب الرئوي',
        'ur': 'نمونیا',
        'hi': 'निमोनिया',
        'bn': 'নিউমোনিয়া',
        'ta': 'நுரையீரல் அழற்சி',
        'es': 'neumonía',
        'fr': 'pneumonie',
        'de': 'Lungenentzündung',
        'it': 'polmonite',
        'pt': 'pneumonia',
        'ru': 'пневмония',
        'pl': 'zapalenie płuc',
        'ro': 'pneumonie',
        'zh': '肺炎',
        'ja': '肺炎',
        'ko': '폐렴'
      },
      'myocardial infarction': {
        'ar': 'احتشاء عضلة القلب',
        'ur': 'دل کا دورہ',
        'hi': 'दिल का दौरा',
        'bn': 'হার্ট অ্যাটাক',
        'ta': 'மாரடைப்பு',
        'es': 'infarto de miocardio',
        'fr': 'infarctus du myocarde',
        'de': 'Herzinfarkt',
        'it': 'infarto miocardico',
        'pt': 'infarto do miocárdio',
        'ru': 'инфаркт миокарда',
        'pl': 'zawał serca',
        'ro': 'infarct miocardic',
        'zh': '心肌梗死',
        'ja': '心筋梗塞',
        'ko': '심근경색'
      },
      'stroke': {
        'ar': 'السكتة الدماغية',
        'ur': 'فالج',
        'hi': 'स्ट्रोक',
        'bn': 'স্ট্রোক',
        'ta': 'பக்கவாதம்',
        'es': 'accidente cerebrovascular',
        'fr': 'accident vasculaire cérébral',
        'de': 'Schlaganfall',
        'it': 'ictus',
        'pt': 'acidente vascular cerebral',
        'ru': 'инсульт',
        'pl': 'udar mózgu',
        'ro': 'accident vascular cerebral',
        'zh': '中风',
        'ja': '脳卒中',
        'ko': '뇌졸중'
      },
      'asthma': {
        'ar': 'الربو',
        'ur': 'دمہ',
        'hi': 'दमा',
        'bn': 'হাঁপানি',
        'ta': 'ஆஸ்துமா',
        'es': 'asma',
        'fr': 'asthme',
        'de': 'Asthma',
        'it': 'asma',
        'pt': 'asma',
        'ru': 'астма',
        'pl': 'astma',
        'ro': 'astm',
        'zh': '哮喘',
        'ja': '喘息',
        'ko': '천식'
      },
      'chronic obstructive pulmonary disease': {
        'ar': 'مرض الانسداد الرئوي المزمن',
        'ur': 'دائمی رکاوٹی پھیپھڑوں کی بیماری',
        'hi': 'क्रॉनिक ऑब्सट्रक्टिव पल्मोनरी डिजीज',
        'bn': 'ক্রনিক অবস্ট্রাক্টিভ পালমোনারি ডিজিজ',
        'ta': 'நாள்பட்ட அடைப்பு நுரையீரல் நோய்',
        'es': 'enfermedad pulmonar obstructiva crónica',
        'fr': 'maladie pulmonaire obstructive chronique',
        'de': 'chronisch obstruktive Lungenerkrankung',
        'it': 'broncopneumopatia cronica ostruttiva',
        'pt': 'doença pulmonar obstrutiva crônica',
        'ru': 'хроническая обструктивная болезнь легких',
        'pl': 'przewlekła obturacyjna choroba płuc',
        'ro': 'boala pulmonară obstructivă cronică',
        'zh': '慢性阻塞性肺病',
        'ja': '慢性閉塞性肺疾患',
        'ko': '만성 폐쇄성 폐질환'
      },
      'atrial fibrillation': {
        'ar': 'الرجفان الأذيني',
        'ur': 'دل کی بے قاعدہ دھڑکن',
        'hi': 'अट्रियल फिब्रिलेशन',
        'bn': 'অ্যাট্রিয়াল ফিব্রিলেশন',
        'ta': 'ஏட்ரியல் ஃபிப்ரிலேஷன்',
        'es': 'fibrilación auricular',
        'fr': 'fibrillation auriculaire',
        'de': 'Vorhofflimmern',
        'it': 'fibrillazione atriale',
        'pt': 'fibrilação atrial',
        'ru': 'фибрилляция предсердий',
        'pl': 'migotanie przedsionków',
        'ro': 'fibrilația atrială',
        'zh': '心房颤动',
        'ja': '心房細動',
        'ko': '심방세동'
      },
      'heart failure': {
        'ar': 'فشل القلب',
        'ur': 'دل کی ناکامی',
        'hi': 'हृदय की विफलता',
        'bn': 'হার্ট ফেইলিউর',
        'ta': 'இதய செயலிழப்பு',
        'es': 'insuficiencia cardíaca',
        'fr': 'insuffisance cardiaque',
        'de': 'Herzinsuffizienz',
        'it': 'insufficienza cardiaca',
        'pt': 'insuficiência cardíaca',
        'ru': 'сердечная недостаточность',
        'pl': 'niewydolność serca',
        'ro': 'insuficiența cardiacă',
        'zh': '心力衰竭',
        'ja': '心不全',
        'ko': '심부전'
      },
      'angina': {
        'ar': 'الذبحة الصدرية',
        'ur': 'سینے میں درد',
        'hi': 'एंजाइना',
        'bn': 'অ্যাঞ্জাইনা',
        'ta': 'நெஞ்சு வலி',
        'es': 'angina de pecho',
        'fr': 'angine de poitrine',
        'de': 'Angina pectoris',
        'it': 'angina pectoris',
        'pt': 'angina',
        'ru': 'стенокардия',
        'pl': 'choroba wieńcowa',
        'ro': 'angină pectorală',
        'zh': '心绞痛',
        'ja': '狭心症',
        'ko': '협심증'
      },
      'deep vein thrombosis': {
        'ar': 'تجلط الأوردة العميقة',
        'ur': 'گہری رگ میں خون کا جمنا',
        'hi': 'गहरी शिरा घनास्त्रता',
        'bn': 'ডিপ ভেইন থ্রম্বোসিস',
        'ta': 'ஆழமான நரம்பு இரத்த உறைவு',
        'es': 'trombosis venosa profunda',
        'fr': 'thrombose veineuse profonde',
        'de': 'tiefe Venenthrombose',
        'it': 'trombosi venosa profonda',
        'pt': 'trombose venosa profunda',
        'ru': 'тромбоз глубоких вен',
        'pl': 'zakrzepica żył głębokich',
        'ro': 'tromboza venoasă profundă',
        'zh': '深静脉血栓',
        'ja': '深部静脉血栓症',
        'ko': '심부정맥 혈전증'
      },
      'pulmonary embolism': {
        'ar': 'الانسداد الرئوي',
        'ur': 'پھیپھڑوں میں خون کا جمنا',
        'hi': 'पल्मोनरी एम्बोलिज्म',
        'bn': 'পালমোনারি এম্বোলিজম',
        'ta': 'நுரையீரல் அடைப்பு',
        'es': 'embolia pulmonar',
        'fr': 'embolie pulmonaire',
        'de': 'Lungenembolie',
        'it': 'embolia polmonare',
        'pt': 'embolia pulmonar',
        'ru': 'тромбоэмболия легочной артерии',
        'pl': 'zatorowość płucna',
        'ro': 'embolie pulmonară',
        'zh': '肺栓塞',
        'ja': '肺塞栓症',
        'ko': '폐색전증'
      },
      'urinary tract infection': {
        'ar': 'عدوى المسالك البولية',
        'ur': 'پیشاب کی نالی کا انفیکشن',
        'hi': 'मूत्र पथ संक्रमण',
        'bn': 'মূত্রনালীর সংক্রমণ',
        'ta': 'சிறுநீர் பாதை தொற்று',
        'es': 'infección del tracto urinario',
        'fr': 'infection des voies urinaires',
        'de': 'Harnwegsinfektion',
        'it': 'infezione del tratto urinario',
        'pt': 'infecção do trato urinário',
        'ru': 'инфекция мочевыводящих путей',
        'pl': 'zakażenie dróg moczowych',
        'ro': 'infecția tractului urinar',
        'zh': '尿路感染',
        'ja': '尿路感染症',
        'ko': '요로감염'
      },
      'kidney disease': {
        'ar': 'مرض الكلى',
        'ur': 'گردے کی بیماری',
        'hi': 'गुर्दे की बीमारी',
        'bn': 'কিডনি রোগ',
        'ta': 'சிறுநீரக நோய்',
        'es': 'enfermedad renal',
        'fr': 'maladie rénale',
        'de': 'Nierenerkrankung',
        'it': 'malattia renale',
        'pt': 'doença renal',
        'ru': 'заболевание почек',
        'pl': 'choroba nerek',
        'ro': 'boala renală',
        'zh': '肾病',
        'ja': '腎疾患',
        'ko': '신장질환'
      },
      'depression': {
        'ar': 'الاكتئاب',
        'ur': 'ڈپریشن',
        'hi': 'अवसाद',
        'bn': 'বিষণ্নতা',
        'ta': 'மன அழுத்தம்',
        'es': 'depresión',
        'fr': 'dépression',
        'de': 'Depression',
        'it': 'depressione',
        'pt': 'depressão',
        'ru': 'депрессия',
        'pl': 'depresja',
        'ro': 'depresie',
        'zh': '抑郁症',
        'ja': 'うつ病',
        'ko': '우울증'
      },
      'anxiety': {
        'ar': 'القلق',
        'ur': 'بے چینی',
        'hi': 'चिंता',
        'bn': 'উদ্বেগ',
        'ta': 'கவலை',
        'es': 'ansiedad',
        'fr': 'anxiété',
        'de': 'Angst',
        'it': 'ansia',
        'pt': 'ansiedade',
        'ru': 'тревожность',
        'pl': 'lęk',
        'ro': 'anxietate',
        'zh': '焦虑症',
        'ja': '不安症',
        'ko': '불안증'
      },
      'epilepsy': {
        'ar': 'الصرع',
        'ur': 'مرگی',
        'hi': 'मिर्गी',
        'bn': 'মৃগীরোগ',
        'ta': 'வலிப்பு நோய்',
        'es': 'epilepsia',
        'fr': 'épilepsie',
        'de': 'Epilepsie',
        'it': 'epilessia',
        'pt': 'epilepsia',
        'ru': 'эпилепсия',
        'pl': 'padaczka',
        'ro': 'epilepsie',
        'zh': '癫痫',
        'ja': 'てんかん',
        'ko': '간질'
      },
      'migraine': {
        'ar': 'الشقيقة',
        'ur': 'آدھے سر کا درد',
        'hi': 'माइग्रेन',
        'bn': 'মাইগ্রেন',
        'ta': 'ஒற்றைத் தலைவலி',
        'es': 'migraña',
        'fr': 'migraine',
        'de': 'Migräne',
        'it': 'emicrania',
        'pt': 'enxaqueca',
        'ru': 'мигрень',
        'pl': 'migrena',
        'ro': 'migrenă',
        'zh': '偏头痛',
        'ja': '片頭痛',
        'ko': '편두통'
      },
      'osteoporosis': {
        'ar': 'هشاشة العظام',
        'ur': 'ہڈیوں کی کمزوری',
        'hi': 'ऑस्टियोपोरोसिस',
        'bn': 'অস্টিওপোরোসিস',
        'ta': 'எலும்பு தேய்மானம்',
        'es': 'osteoporosis',
        'fr': 'ostéoporose',
        'de': 'Osteoporose',
        'it': 'osteoporosi',
        'pt': 'osteoporose',
        'ru': 'остеопороз',
        'pl': 'osteoporoza',
        'ro': 'osteoporoză',
        'zh': '骨质疏松症',
        'ja': '骨粗鬆症',
        'ko': '골다공증'
      },
      'arthritis': {
        'ar': 'التهاب المفاصل',
        'ur': 'جوڑوں کی سوزش',
        'hi': 'गठिया',
        'bn': 'বাতরোগ',
        'ta': 'மூட்டு வலி',
        'es': 'artritis',
        'fr': 'arthrite',
        'de': 'Arthritis',
        'it': 'artrite',
        'pt': 'artrite',
        'ru': 'артрит',
        'pl': 'zapalenie stawów',
        'ro': 'artrită',
        'zh': '关节炎',
        'ja': '関節炎',
        'ko': '관절염'
      }
    };

    medicalTerms.forEach(term => {
      const lowerTerm = term.toLowerCase();
      if (sampleTerminology[lowerTerm] && sampleTerminology[lowerTerm][targetLanguage]) {
        terminology[term] = sampleTerminology[lowerTerm][targetLanguage];
      }
    });

    return terminology;
  }

  // Translate PLAB questions with medical context
  async translatePlabQuestion(
    question: any,
    targetLanguage: string
  ): Promise<any> {
    
    if (targetLanguage === 'en') {
      return question; // Return original if English
    }

    // Sample translations for key PLAB questions
    const translatedQuestions = {
      'ar': {
        content: 'ما هو السبب الأكثر شيوعاً لألم الصدر الحاد في مريض يبلغ من العمر 45 عاماً؟',
        options: ['احتشاء عضلة القلب', 'الذبحة الصدرية', 'الانصمام الرئوي', 'التهاب التامور'],
        explanation: 'في المرضى في منتصف العمر، تعتبر الذبحة الصدرية السبب الأكثر شيوعاً لألم الصدر الحاد.'
      },
      'ur': {
        content: '45 سالہ مریض میں سینے کے تیز درد کی سب سے عام وجہ کیا ہے؟',
        options: ['دل کا دورہ', 'سینے کا درد', 'پھیپھڑوں میں خون کا جمنا', 'دل کی جھلی کی سوزش'],
        explanation: 'درمیانی عمر کے مریضوں میں، سینے کا درد (انجائنا) سب سے عام وجہ ہے۔'
      },
      'hi': {
        content: '45 वर्षीय रोगी में तीव्र छाती दर्द का सबसे आम कारण क्या है?',
        options: ['दिल का दौरा', 'एंजाइना', 'फेफड़ों में खून का जमना', 'हृदय की झिल्ली की सूजन'],
        explanation: 'मध्यम आयु के रोगियों में, एंजाइना छाती दर्द का सबसे आम कारण है।'
      }
    };

    if (translatedQuestions[targetLanguage]) {
      return {
        ...question,
        ...translatedQuestions[targetLanguage],
        originalLanguage: 'en',
        translatedTo: targetLanguage
      };
    }

    return question;
  }

  // Generate NHS contextual information in different languages
  async generateNhsContextualisation(
    targetLanguage: string
  ): Promise<{
    hierarchy: Record<string, string>;
    procedures: Record<string, string>;
    culturalNorms: string[];
    communicationTips: string[];
  }> {
    
    const nhsContext = {
      'ar': {
        hierarchy: {
          'consultant': 'استشاري',
          'registrar': 'طبيب مقيم أول',
          'junior_doctor': 'طبيب مبتدئ',
          'foundation_year': 'سنة التأسيس'
        },
        procedures: {
          'referral': 'الإحالة',
          'discharge': 'الخروج من المستشفى',
          'handover': 'تسليم الحالة',
          'ward_round': 'جولة القسم'
        },
        culturalNorms: [
          'التحية المهذبة ضرورية في بداية كل محادثة',
          'استخدم الألقاب المهنية عند مخاطبة الزملاء',
          'اطلب الإذن قبل فحص المرضى',
          'احترم خصوصية المريض في جميع الأوقات'
        ],
        communicationTips: [
          'تحدث بوضوح وببطء',
          'تأكد من فهم المريض للتعليمات',
          'استخدم مترجماً عند الحاجة',
          'اشرح الإجراءات قبل تنفيذها'
        ]
      },
      'ur': {
        hierarchy: {
          'consultant': 'کنسلٹنٹ',
          'registrar': 'رجسٹرار',
          'junior_doctor': 'جونیئر ڈاکٹر',
          'foundation_year': 'فاؤنڈیشن سال'
        },
        procedures: {
          'referral': 'ریفرل',
          'discharge': 'ڈسچارج',
          'handover': 'ہینڈ اوور',
          'ward_round': 'وارڈ راؤنڈ'
        },
        culturalNorms: [
          'ہر بات چیت کی شروعات شائستہ سلام سے کریں',
          'ساتھیوں سے بات کرتے وقت پیشہ ورانہ خطابات استعمال کریں',
          'مریض کا معائنہ کرنے سے پہلے اجازت لیں',
          'ہر وقت مریض کی پرائیویسی کا احترام کریں'
        ],
        communicationTips: [
          'صاف اور آہستہ بولیں',
          'یقینی بنائیں کہ مریض ہدایات سمجھ گیا ہے',
          'ضرورت کے وقت مترجم استعمال کریں',
          'طریقہ کار شروع کرنے سے پہلے وضاحت کریں'
        ]
      },
      'hi': {
        hierarchy: {
          'consultant': 'सलाहकार',
          'registrar': 'रजिस्ट्रार',
          'junior_doctor': 'जूनियर डॉक्टर',
          'foundation_year': 'फाउंडेशन वर्ष'
        },
        procedures: {
          'referral': 'रेफरल',
          'discharge': 'डिस्चार्ज',
          'handover': 'हैंडओवर',
          'ward_round': 'वार्ड राउंड'
        },
        culturalNorms: [
          'हर बातचीत की शुरुआत विनम्र अभिवादन से करें',
          'सहयोगियों से बात करते समय व्यावसायिक उपाधियों का प्रयोग करें',
          'रोगी की जांच से पहले अनुमति लें',
          'हमेशा रोगी की गोपनीयता का सम्मान करें'
        ],
        communicationTips: [
          'स्पष्ट और धीरे बोलें',
          'सुनिश्चित करें कि रोगी निर्देशों को समझ गया है',
          'आवश्यकता पड़ने पर दुभाषिया का उपयोग करें',
          'प्रक्रिया शुरू करने से पहले समझाएं'
        ]
      }
    };

    return nhsContext[targetLanguage] || nhsContext['ar']; // Default to Arabic if not found
  }

  // Progressive language switching for gradual transition to English
  async generateProgressiveLearningPath(
    nativeLanguage: string,
    currentLevel: 'beginner' | 'intermediate' | 'advanced'
  ): Promise<{
    phase1: { ratio: number; description: string };
    phase2: { ratio: number; description: string };
    phase3: { ratio: number; description: string };
    phase4: { ratio: number; description: string };
    estimatedTimeline: string;
    milestones: string[];
  }> {
    
    const progressivePaths = {
      'beginner': {
        phase1: { ratio: 90, description: '90% native language, 10% English - Build confidence with familiar concepts' },
        phase2: { ratio: 70, description: '70% native language, 30% English - Introduce medical English gradually' },
        phase3: { ratio: 40, description: '40% native language, 60% English - Focus on English medical terminology' },
        phase4: { ratio: 10, description: '10% native language, 90% English - Near-native English preparation' },
        estimatedTimeline: '6-8 months',
        milestones: [
          'Master basic medical terminology in English',
          'Understand NHS procedures and hierarchy',
          'Complete practice questions in English',
          'Pass mock PLAB exams in English'
        ]
      },
      'intermediate': {
        phase1: { ratio: 70, description: '70% native language, 30% English - Review concepts with English introduction' },
        phase2: { ratio: 50, description: '50% native language, 50% English - Balanced bilingual learning' },
        phase3: { ratio: 25, description: '25% native language, 75% English - English-focused preparation' },
        phase4: { ratio: 5, description: '5% native language, 95% English - Full English immersion' },
        estimatedTimeline: '4-6 months',
        milestones: [
          'Strengthen English medical vocabulary',
          'Practice English communication skills',
          'Complete advanced PLAB scenarios',
          'Achieve exam-ready English proficiency'
        ]
      },
      'advanced': {
        phase1: { ratio: 50, description: '50% native language, 50% English - Quick concept review' },
        phase2: { ratio: 25, description: '25% native language, 75% English - English focus with native support' },
        phase3: { ratio: 10, description: '10% native language, 90% English - Predominantly English' },
        phase4: { ratio: 0, description: '100% English - Full examination readiness' },
        estimatedTimeline: '2-3 months',
        milestones: [
          'Perfect English medical communication',
          'Master complex PLAB scenarios',
          'Excel in OSCE simulations',
          'Achieve examination excellence'
        ]
      }
    };

    return progressivePaths[currentLevel];
  }

  // Cultural adaptation notes for different regions
  async generateCulturalAdaptationNotes(
    userRegion: string,
    targetLanguage: string
  ): Promise<{
    medicalPracticeComparisons: string[];
    communicationStyleDifferences: string[];
    hierarchyAdjustments: string[];
    patientInteractionGuidance: string[];
    professionalEtiquette: string[];
  }> {
    
    // Sample cultural adaptation notes
    const adaptationNotes = {
      'middle-east': {
        'ar': {
          medicalPracticeComparisons: [
            'في المملكة المتحدة، يتم التركيز بشكل كبير على الطب المبني على الأدلة',
            'نظام الإحالة أكثر تنظيماً من معظم البلدان العربية',
            'التوثيق الطبي يتطلب دقة عالية ومراجعة مستمرة'
          ],
          communicationStyleDifferences: [
            'التواصل المباشر والواضح مطلوب',
            'الاستماع الفعال أهم من إعطاء الأوامر',
            'احترام وجهات نظر الفريق الطبي المتعدد'
          ],
          hierarchyAdjustments: [
            'الهيكل الطبي أكثر مرونة من النظم التقليدية',
            'يمكن مناقشة القرارات مع الأطباء الأكبر سناً',
            'التعلم المستمر والتطوير المهني مطلوب'
          ]
        }
      },
      'south-asia': {
        'ur': {
          medicalPracticeComparisons: [
            'برطانیہ میں شواہد پر مبنی طب کو زیادہ اہمیت دی جاتی ہے',
            'ریفرل سسٹم زیادہ منظم اور سخت ہے',
            'مریض کے حقوق اور رضامندی بہت اہم ہے'
          ],
          communicationStyleDifferences: [
            'براہ راست اور واضح بات چیت ضروری ہے',
            'مریض کو فیصلہ سازی میں شامل کرنا چاہیے',
            'کثیر الثقافتی حساسیت کا مظاہرہ کریں'
          ],
          hierarchyAdjustments: [
            'ہائرارکی موجود ہے لیکن لچکدار ہے',
            'جونیئر ڈاکٹر بھی اپنی رائے دے سکتے ہیں',
            'مسلسل پیشہ ورانہ ترقی لازمی ہے'
          ]
        }
      }
    };

    return adaptationNotes[userRegion]?.[targetLanguage] || {
      medicalPracticeComparisons: ['Practice patterns may differ from your home country'],
      communicationStyleDifferences: ['Communication styles may need adjustment'],
      hierarchyAdjustments: ['Professional hierarchy may differ'],
      patientInteractionGuidance: ['Patient interaction styles may vary'],
      professionalEtiquette: ['Professional etiquette expectations may differ']
    };
  }
}

import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// OSCE Station Translation Function
export async function translateOSCEStation(station: any, targetLanguage: string): Promise<any> {
  try {
    console.log(`Translating OSCE station to ${targetLanguage}`);
    
    // Check cache first
    const stationStr = JSON.stringify(station);
    const cacheKey = getCacheKey(stationStr, targetLanguage);
    const cachedTranslation = getCachedTranslation(cacheKey);
    
    if (cachedTranslation) {
      console.log('Using cached OSCE translation');
      return cachedTranslation;
    }
    
    const translationPrompt = `Translate this OSCE station to ${targetLanguage}. 

REQUIREMENTS:
- Translate ALL text: title, description, scenario, instructions, marking criteria
- Preserve medical accuracy and clinical terminology
- Keep same JSON structure unchanged
- Use professional medical language for ${targetLanguage}

${JSON.stringify(station, null, 2)}

Return complete translated JSON:`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `Expert medical translator for ${targetLanguage}. Translate OSCE content accurately, preserve clinical meaning, respond only with valid JSON.`
        },
        {
          role: "user",
          content: translationPrompt
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.2,
      max_tokens: 2500
    });

    const translatedContent = response.choices[0].message.content;
    if (!translatedContent) {
      throw new Error('No OSCE translation generated');
    }

    const translatedStation = JSON.parse(translatedContent);
    
    // Cache the translation
    setCachedTranslation(cacheKey, translatedStation);
    
    console.log('OSCE translation completed and cached');
    return translatedStation;

  } catch (error: any) {
    console.error('OSCE translation error:', error);
    throw new Error(`OSCE translation failed: ${error.message}`);
  }
}