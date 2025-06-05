// Multi-language Support System for International Medical Graduates
// Comprehensive internationalisation with medical content localisation

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
      code: 'en',
      name: 'English',
      nativeName: 'English',
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