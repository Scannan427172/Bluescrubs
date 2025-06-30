import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, ExternalLink, Lightbulb, BookOpen, ArrowLeft, ArrowRight, Volume2, VolumeX, Languages, Globe, MessageCircle, Bot, Send, Brain, Filter, Target, Clock, Award, Star, Library, AlertTriangle, FileText, X, Shield, Activity, TrendingUp } from "lucide-react";
import examRoomImg from "@assets/image_1750775004743.png";
import { MedicalTermTooltip } from "@/components/MedicalTermTooltip";

import { useQuery } from "@tanstack/react-query";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";


interface Question {
  id: string;
  topic?: string;
  question: string;
  images?: Array<{
    type?: string;
    content?: string;
    url?: string;
    title?: string;
    description?: string;
    attribution?: string;
    clinicalFeatures?: string[];
    alt?: string;
    caption?: string;
  }>;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
    E: string;
  };
  answer: string;
  explanation: string;
  incorrectExplanation?: string;
  mnemonic: string;
  medications?: string[];
  bnfGuidance?: string;
  guidelineSummary?: {
    title: string;
    content: string;
  };
  links: {
    NICE: string;
    CKS: string;
    "NHS UK": string;
    primary?: {
      title: string;
      url: string;
      description: string;
    };
    supplementary?: Array<{
      title: string;
      url: string;
      description: string;
    }>;
  };
}

export default function Test() {
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);


  // Translation state
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isTranslationMode, setIsTranslationMode] = useState(false);
  const [translateQuestions, setTranslateQuestions] = useState(false);
  const [translatedQuestions, setTranslatedQuestions] = useState<Record<string, any>>({});
  const [translationLoading, setTranslationLoading] = useState<Record<string, boolean>>({});
  
  // Text-to-Speech state
  const [speechEnabled, setSpeechEnabled] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState<string>('');
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // AI Tutor state
  const [showAITutor, setShowAITutor] = useState(false);
  const [tutorInput, setTutorInput] = useState('');
  const [tutorMessages, setTutorMessages] = useState<Array<{role: 'user' | 'assistant', content: string}>>([]);
  const [isLoadingTutorResponse, setIsLoadingTutorResponse] = useState(false);
  
  // NICE NG136 Guide state
  const [showNiceGuide, setShowNiceGuide] = useState(false);

  // Test Categories and Filtering
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("basic");
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);

  // Practice Mode Selection
  const [practiceMode, setPracticeMode] = useState<'selection' | 'practice'>('selection');
  const [isGeneratingQuestions, setIsGeneratingQuestions] = useState(false);

  // Question Statistics
  const { data: questionStats } = useQuery({
    queryKey: ["/api/performance-stats"],
    retry: false,
  });

  // Medical Specialty Categories - Clean display without numbers
  const medicalCategories = [
    { id: "all", name: "All Categories", icon: "🏥" },
    { id: "cardiovascular", name: "Cardiovascular", icon: "❤️" },
    { id: "infectious-diseases", name: "Infectious Diseases", icon: "🦠" },
    { id: "respiratory", name: "Respiratory", icon: "🫁" },
    { id: "gastrointestinal", name: "Gastrointestinal", icon: "🦠" },
    { id: "neurology", name: "Neurology", icon: "🧠" },
    { id: "endocrinology", name: "Endocrinology", icon: "⚡" },
    { id: "psychiatry", name: "Psychiatry", icon: "🧘" },
    { id: "obstetrics-gynaecology", name: "Obstetrics & Gynaecology", icon: "👶" },
    { id: "paediatrics", name: "Paediatrics", icon: "🧸" },
    { id: "surgery", name: "Surgery", icon: "🔪" },
    { id: "emergency-medicine", name: "Emergency Medicine", icon: "🚨" },
    { id: "rheumatology", name: "Rheumatology", icon: "🦴" },
    { id: "dermatology", name: "Dermatology", icon: "🔬" },
    { id: "ophthalmology", name: "Ophthalmology", icon: "👁️" },
    { id: "ent", name: "ENT", icon: "👂" },
    { id: "pharmacology", name: "Pharmacology", icon: "💊" },
    { id: "ethics-law", name: "Ethics & Law", icon: "⚖️" }
  ];

  const difficultyLevels = [
    { id: "basic", name: "Basic Level", description: "Foundation knowledge questions" },
    { id: "intermediate", name: "Intermediate", description: "General medical knowledge" },
    { id: "advanced", name: "PLAB Standard", description: "Official PLAB exam level" }
  ];

  // Language definitions
  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
    { code: 'ur', name: 'اردو', flag: '🇵🇰' },
    { code: 'bn', name: 'বাংলা', flag: '🇧🇩' },
    { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
    { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
    { code: 'gu', name: 'ગુજરાતી', flag: '🇮🇳' },
    { code: 'kn', name: 'ಕನ್ನಡ', flag: '🇮🇳' },
    { code: 'ml', name: 'മലയാളം', flag: '🇮🇳' },
    { code: 'pa', name: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
    { code: 'mr', name: 'मराठी', flag: '🇮🇳' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'pt', name: 'Português', flag: '🇧🇷' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
    { code: 'pl', name: 'Polski', flag: '🇵🇱' },
    { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
    { code: 'sv', name: 'Svenska', flag: '🇸🇪' }
  ];



  // Load available voices for TTS
  useEffect(() => {
    const loadVoices = () => {
      const voices = speechSynthesis.getVoices();
      setAvailableVoices(voices);
      
      // Auto-select best voice for current language
      if (voices.length > 0 && !selectedVoice) {
        const languageVoiceMap: Record<string, string> = {
          'en': 'en-US',
          'ar': 'ar-SA',
          'hi': 'hi-IN',
          'ur': 'ur-PK',
          'bn': 'bn-IN',
          'ta': 'ta-IN',
          'te': 'te-IN',
          'gu': 'gu-IN',
          'kn': 'kn-IN',
          'ml': 'ml-IN',
          'pa': 'pa-IN',
          'mr': 'mr-IN',
          'es': 'es-ES',
          'fr': 'fr-FR',
          'de': 'de-DE',
          'it': 'it-IT',
          'pt': 'pt-BR',
          'ru': 'ru-RU',
          'zh': 'zh-CN',
          'ja': 'ja-JP',
          'ko': 'ko-KR'
        };

        const targetLang = languageVoiceMap[selectedLanguage] || 'en-US';
        const voice = voices.find(v => v.lang.startsWith(targetLang.split('-')[0]));
        if (voice) {
          setSelectedVoice(voice.name);
        }
      }
    };

    loadVoices();
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, [selectedLanguage, selectedVoice]);

  // Translation functions
  const translateFullQuestion = async (question: any) => {
    if (!translateQuestions || selectedLanguage === 'en') return question;
    
    const cacheKey = `${question.id}_${selectedLanguage}`;
    
    // Return if already translated
    if (translatedQuestions[cacheKey]) {
      return translatedQuestions[cacheKey];
    }
    
    // Return if currently translating
    if (translationLoading[cacheKey]) {
      return question;
    }
    
    setTranslationLoading(prev => ({ ...prev, [cacheKey]: true }));
    
    try {
      const response = await fetch('/api/translate-question', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: {
            question: question.question,
            options: question.options,
            explanation: question.explanation
          },
          targetLanguage: selectedLanguage
        }),
      });

      if (!response.ok) {
        throw new Error(`Translation failed: ${response.statusText}`);
      }

      const translated = await response.json();
      
      // Store translated question with proper structure
      const translatedQuestion = {
        ...question,
        question: translated.question || question.question,
        options: translated.options || question.options,
        explanation: translated.explanation || question.explanation
      };
      
      setTranslatedQuestions(prev => ({
        ...prev,
        [cacheKey]: translatedQuestion
      }));
      
      return translatedQuestion;
    } catch (error) {
      console.error('Translation error:', error);
      return question; // Return original on error
    } finally {
      setTranslationLoading(prev => ({ ...prev, [cacheKey]: false }));
    }
  };

  const translateText = (text: string) => {
    if (!isTranslationMode || selectedLanguage === 'en') return text;
    
    const translations: Record<string, Record<string, string>> = {
      'ar': {
        'PLAB Practice Test': 'اختبار ممارسة PLAB',
        'Submit Answer': 'إرسال الإجابة',
        'Next Question': 'السؤال التالي',
        'Previous Question': 'السؤال السابق',
        'Correct!': 'صحيح!',
        'Incorrect.': 'غير صحيح.',
        'Clinical Guidelines': 'الإرشادات السريرية',
        'Mnemonic': 'مساعد الذاكرة',
        'Reference': 'مرجع',
        'Explanation': 'شرح'
      },
      'hi': {
        'PLAB Practice Test': 'PLAB अभ्यास परीक्षा',
        'Submit Answer': 'उत्तर जमा करें',
        'Next Question': 'अगला प्रश्न',
        'Previous Question': 'पिछला प्रश्न',
        'Correct!': 'सही!',
        'Incorrect.': 'गलत।',
        'Clinical Guidelines': 'क्लिनिकल दिशानिर्देश',
        'Mnemonic': 'स्मरण सहायक',
        'Reference': 'संदर्भ',
        'Explanation': 'व्याख्या'
      },
      'ur': {
        'PLAB Practice Test': 'PLAB پریکٹس ٹیسٹ',
        'Submit Answer': 'جواب جمع کریں',
        'Next Question': 'اگلا سوال',
        'Previous Question': 'پچھلا سوال',
        'Correct!': 'درست!',
        'Incorrect.': 'غلط۔',
        'Clinical Guidelines': 'کلینیکل رہنمائی',
        'Mnemonic': 'یادداشت مددگار',
        'Reference': 'حوالہ',
        'Explanation': 'وضاحت'
      },
      'fr': {
        'PLAB Practice Test': 'Test de pratique PLAB',
        'Submit Answer': 'Soumettre la réponse',
        'Next Question': 'Question suivante',
        'Previous Question': 'Question précédente',
        'Correct!': 'Correct!',
        'Incorrect.': 'Incorrect.',
        'Clinical Guidelines': 'Directives cliniques',
        'Mnemonic': 'Moyen mnémotechnique',
        'Reference': 'Référence',
        'Explanation': 'Explication'
      },
      'es': {
        'PLAB Practice Test': 'Prueba de práctica PLAB',
        'Submit Answer': 'Enviar respuesta',
        'Next Question': 'Siguiente pregunta',
        'Previous Question': 'Pregunta anterior',
        'Correct!': '¡Correcto!',
        'Incorrect.': 'Incorrecto.',
        'Clinical Guidelines': 'Guías clínicas',
        'Mnemonic': 'Mnemónico',
        'Reference': 'Referencia',
        'Explanation': 'Explicación'
      }
    };
    
    return translations[selectedLanguage]?.[text] || text;
  };

  // Text-to-Speech functions
  const speakText = (text: string) => {
    if (!speechEnabled || !text.trim()) return;
    
    // Stop any current speech
    speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Find best voice for selected language
    const languageVoiceMap: Record<string, string> = {
      'en': 'en-US',
      'ar': 'ar-SA',
      'hi': 'hi-IN',
      'ur': 'ur-PK',
      'bn': 'bn-IN',
      'ta': 'ta-IN',
      'te': 'te-IN',
      'gu': 'gu-IN',
      'kn': 'kn-IN',
      'ml': 'ml-IN',
      'pa': 'pa-IN',
      'mr': 'mr-IN',
      'es': 'es-ES',
      'fr': 'fr-FR',
      'de': 'de-DE',
      'it': 'it-IT',
      'pt': 'pt-BR',
      'ru': 'ru-RU',
      'zh': 'zh-CN',
      'ja': 'ja-JP',
      'ko': 'ko-KR'
    };

    const targetLang = languageVoiceMap[selectedLanguage] || 'en-US';
    const voice = availableVoices.find(v => 
      v.lang.startsWith(targetLang.split('-')[0]) || 
      v.name === selectedVoice
    );
    
    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang;
    } else {
      utterance.lang = targetLang;
    }
    
    // Enhanced natural speech settings
    utterance.rate = selectedLanguage === 'ar' || selectedLanguage === 'ur' ? 0.8 : 0.85;
    utterance.pitch = 1.1;
    utterance.volume = 0.9;
    
    // Add natural pauses for medical terms
    const processedText = text
      .replace(/\./g, '. ')
      .replace(/,/g, ', ')
      .replace(/:/g, ': ')
      .replace(/;/g, '; ')
      .replace(/\s+/g, ' ')
      .trim();
    
    utterance.text = processedText;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    speechSynthesis.cancel();
    setIsSpeaking(false);
  };



  // Fetch questions from API
  const { data: questions, isLoading, error, refetch } = useQuery<Question[]>({
    queryKey: ["/api/test/questions", selectedCategory, selectedDifficulty],
    queryFn: () => {
      const params = new URLSearchParams();
      if (selectedCategory !== "all") params.append("category", selectedCategory);
      if (selectedDifficulty !== "all") params.append("difficulty", selectedDifficulty);
      params.append("count", "10");
      
      console.log(`Fetching questions for category: ${selectedCategory}, difficulty: ${selectedDifficulty}`);
      return fetch(`/api/test/questions?${params.toString()}`).then(res => res.json());
    },
    retry: false,
  });

  const currentQuestion = questions?.[currentQuestionIndex];

  // Practice Mode Handlers - Generate questions based on selected category
  const startFixedPractice = async (questionCount: number) => {
    setIsGeneratingQuestions(true);
    try {
      // Force refetch questions with current category selection
      await refetch();
      setPracticeMode('practice');
    } catch (error) {
      console.error('Error loading questions:', error);
    } finally {
      setIsGeneratingQuestions(false);
    }
  };

  const startTimedPractice = async (timeInMinutes: number) => {
    setIsGeneratingQuestions(true);
    try {
      // Force refetch questions with current category selection
      await refetch();
      setPracticeMode('practice');
    } catch (error) {
      console.error('Error loading questions:', error);
    } finally {
      setIsGeneratingQuestions(false);
    }
  };

  const startUnlimitedPractice = async () => {
    setIsGeneratingQuestions(true);
    try {
      // Force refetch questions with current category selection
      await refetch();
      setPracticeMode('practice');
    } catch (error) {
      console.error('Error loading questions:', error);
    } finally {
      setIsGeneratingQuestions(false);
    }
  };

  const startAuthenticPractice = async (questionCount: number) => {
    setIsGeneratingQuestions(true);
    try {
      // Force refetch questions with current category selection
      await refetch();
      setPracticeMode('practice');
    } catch (error) {
      console.error('Error loading questions:', error);
    } finally {
      setIsGeneratingQuestions(false);
    }
  };

  // Speech function for current question (defined after currentQuestion)
  const speakCurrentQuestion = () => {
    if (currentQuestion) {
      // Get translated question if available
      const cacheKey = `q1_${selectedLanguage}`;
      const translatedQ = translatedQuestions[cacheKey];
      
      const questionToRead = translatedQ || currentQuestion;
      
      // Speak question and options
      let textToSpeak = questionToRead.question + ". ";
      textToSpeak += "Option A: " + questionToRead.options.A + ". ";
      textToSpeak += "Option B: " + questionToRead.options.B + ". ";
      textToSpeak += "Option C: " + questionToRead.options.C + ". ";
      textToSpeak += "Option D: " + questionToRead.options.D + ". ";
      textToSpeak += "Option E: " + questionToRead.options.E + ".";
      
      speakText(textToSpeak);
    }
  };

  // Effect to translate current question when language changes
  useEffect(() => {
    if (currentQuestion && translateQuestions && selectedLanguage !== 'en') {
      translateFullQuestion(currentQuestion);
    }
  }, [currentQuestion, translateQuestions, selectedLanguage]);

  // Medical terms dictionary for tooltips
  const medicalTerms = {
    "nitrofurantoin": {
      definition: "A bacteriostatic antibiotic that interferes with bacterial carbohydrate metabolism, specifically effective against most Gram-positive and Gram-negative bacteria causing UTIs.",
      translation: "نيتروفورانتوين"
    },
    "bacteriostatic": {
      definition: "An antimicrobial agent that inhibits bacterial growth without killing the bacteria directly.",
      translation: "مثبط للبكتيريا"
    },
    "trimethoprim": {
      definition: "A folate antagonist antibiotic that inhibits bacterial DNA synthesis by blocking dihydrofolate reductase.",
      translation: "تريميثوبريم"
    },
    "uncomplicated cystitis": {
      definition: "Bladder infection in non-pregnant, immunocompetent women without structural or functional urinary tract abnormalities.",
      translation: "التهاب المثانة غير المعقد"
    },
    "dysuria": {
      definition: "Painful or difficult urination, often described as burning sensation during micturition.",
      translation: "عسر التبول"
    },
    "urinary frequency": {
      definition: "Increased frequency of urination, typically >8 times per day.",
      translation: "تكرار التبول"
    },
    "urgency": {
      definition: "Sudden, compelling desire to urinate that is difficult to defer.",
      translation: "إلحاح التبول"
    },
    "antimicrobial resistance": {
      definition: "Ability of microorganisms to survive exposure to antimicrobial agents that would normally kill them or inhibit their growth.",
      translation: "مقاومة المضادات الميكروبية"
    },
    "pyelonephritis": {
      definition: "Inflammation of the kidney parenchyma and renal pelvis, typically caused by bacterial infection ascending from the lower urinary tract.",
      translation: "التهاب الحويضة والكلية"
    },
    "nephrotoxicity": {
      definition: "Kidney damage caused by toxic substances, including certain medications.",
      translation: "السمية الكلوية"
    }
  };

  // Helper function to render text with medical term tooltips
  const renderTextWithTooltips = (text: string) => {
    const words = text.split(' ');
    const result: (string | JSX.Element)[] = [];
    
    words.forEach((word, index) => {
      // Clean word for matching (remove punctuation)
      const cleanWord = word.replace(/[.,!?;:()]/g, '').toLowerCase();
      const matchedTerm = Object.keys(medicalTerms).find(term => 
        cleanWord === term.toLowerCase() || 
        cleanWord.includes(term.toLowerCase()) ||
        term.toLowerCase().includes(cleanWord)
      );
      
      if (matchedTerm) {
        result.push(
          <MedicalTermTooltip
            key={index}
            term={matchedTerm}
          >
            {word}
          </MedicalTermTooltip>
        );
      } else {
        result.push(word);
      }
      
      // Add space after each word except the last
      if (index < words.length - 1) {
        result.push(' ');
      }
    });
    
    return result;
  };

  // Format correct answer explanation with structured icons and sections
  const formatCorrectAnswerExplanation = (explanation: any) => {
    const sections: Array<{title: string, icon: JSX.Element, points: string[]}> = [];
    
    // Handle new comprehensive object format
    if (typeof explanation === 'object' && explanation?.correct) {
      sections.push({
        title: explanation.correct.title || "Clinical Rationale",
        icon: <Target className="w-5 h-5" />,
        points: explanation.correct.content || []
      });
      
      if (explanation.guidelines) {
        sections.push({
          title: explanation.guidelines.title || "Guidelines & Evidence",
          icon: <Shield className="w-5 h-5" />,
          points: explanation.guidelines.content || []
        });
      }
      
      return sections;
    }
    
    // Handle string format (fallback for older questions)
    const explanationStr = typeof explanation === 'string' ? explanation : String(explanation || '');
    
    // Split explanation into logical sections based on bullet points or numbered items
    const lines = explanationStr.split('\n').filter(line => line.trim());
    let currentSection = { title: "Clinical Rationale", icon: <Target className="w-5 h-5" />, points: [] as string[] };
    
    for (const line of lines) {
      if (line.includes('•') && (line.includes('Gold Standard') || line.includes('NICE') || line.includes('Guidelines'))) {
        if (currentSection.points.length > 0) sections.push({ ...currentSection });
        currentSection = { title: "Guidelines & Evidence", icon: <Shield className="w-5 h-5" />, points: [line.replace('•', '').trim()] };
      } else if (line.includes('•') && (line.includes('Efficacy') || line.includes('Sensitivity') || line.includes('Effective'))) {
        if (currentSection.points.length > 0) sections.push({ ...currentSection });
        currentSection = { title: "Clinical Efficacy", icon: <Activity className="w-5 h-5" />, points: [line.replace('•', '').trim()] };
      } else if (line.includes('•') && (line.includes('Mechanism') || line.includes('Pathway') || line.includes('Action'))) {
        if (currentSection.points.length > 0) sections.push({ ...currentSection });
        currentSection = { title: "Mechanism of Action", icon: <TrendingUp className="w-5 h-5" />, points: [line.replace('•', '').trim()] };
      } else if (line.includes('•') && (line.includes('Evidence') || line.includes('Trial') || line.includes('Study'))) {
        if (currentSection.points.length > 0) sections.push({ ...currentSection });
        currentSection = { title: "Research Evidence", icon: <Award className="w-5 h-5" />, points: [line.replace('•', '').trim()] };
      } else if (line.includes('•') || line.trim().startsWith('-')) {
        currentSection.points.push(line.replace(/^[•-]\s*/, '').trim());
      } else if (line.trim() && !line.includes(':')) {
        currentSection.points.push(line.trim());
      }
    }
    
    if (currentSection.points.length > 0) sections.push(currentSection);
    
    // If no structured sections found, create a default one
    if (sections.length === 0) {
      sections.push({
        title: "Clinical Explanation",
        icon: <FileText className="w-5 h-5" />,
        points: explanationStr.split('\n').filter(line => line.trim()).slice(0, 5)
      });
    }
    
    return sections;
  };

  // Format incorrect answer explanations with structured presentation
  const formatIncorrectAnswerExplanation = (explanation: any) => {
    const sections = [];
    
    // Handle new comprehensive object format
    if (typeof explanation === 'object' && explanation?.incorrect) {
      explanation.incorrect.forEach((item: any) => {
        sections.push({
          option: item.option,
          title: item.title,
          points: item.content || []
        });
      });
      return sections;
    }
    
    // Handle string format (fallback)
    const explanationStr = typeof explanation === 'string' ? explanation : String(explanation || '');
    const lines = explanationStr.split('\n').filter(line => line.trim());
    
    for (const line of lines) {
      const optionMatch = line.match(/^•\s*Option\s+([A-F])\s*\([^)]+\)\s*-\s*(.+?):/);
      if (optionMatch) {
        const [, option, title] = optionMatch;
        const remainingText = line.split(':').slice(1).join(':').trim();
        
        sections.push({
          option,
          title: title.trim(),
          points: [remainingText]
        });
      } else if (sections.length > 0 && (line.includes('-') || line.includes('•'))) {
        const lastSection = sections[sections.length - 1];
        lastSection.points.push(line.replace(/^[-•]\s*/, '').trim());
      }
    }
    
    // If no structured sections found, create default sections for common incorrect options
    if (sections.length === 0) {
      const commonOptions = ['B', 'C', 'D', 'E'];
      commonOptions.forEach(option => {
        sections.push({
          option,
          title: `Option ${option} - Inappropriate Choice`,
          points: ['Less effective treatment option', 'Not recommended by current guidelines']
        });
      });
    }
    
    return sections;
  };

  // Mock AI Tutor functions
  const getMockTutorResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('uti') || message.includes('urinary') || message.includes('nitrofurantoin')) {
      return `Excellent question about urinary tract infections! 

**Clinical Reasoning:**
The case presents a classic uncomplicated lower UTI in a young, non-pregnant woman. The key features are:
- Dysuria, frequency, suprapubic pain (classic lower UTI symptoms)
- No fever/flank pain (excludes pyelonephritis)
- No vaginal discharge (excludes vaginitis)
- Positive nitrites + leucocytes 2+ (confirms bacterial infection)

**Why Nitrofurantoin is First-Line:**
1. **High efficacy**: 90-95% cure rates for E. coli
2. **Low resistance**: <5% resistance rates in UK
3. **Narrow spectrum**: Minimal impact on normal flora
4. **Concentrated in urine**: Achieves therapeutic levels specifically in urinary tract

**Study Tips:**
- Remember "FANTAS" for UTI antibiotics: Fosfomycin, Amoxicillin (avoid), Nitrofurantoin (1st line), Trimethoprim (2nd line), Amoxicillin-clavulanate, Sulfamethoxazole
- Duration: 3 days for uncomplicated, 7 days for complicated
- Always check pregnancy status before prescribing nitrofurantoin

Would you like me to explain the resistance patterns or differential diagnoses?`;
    }
    
    if (message.includes('explain') || message.includes('why')) {
      return `I'd be happy to break down the clinical reasoning for you!

**Evidence-Based Approach:**
This question tests your understanding of UK antimicrobial guidelines and clinical decision-making. The scenario is carefully designed to present a textbook case of uncomplicated cystitis.

**Key Learning Points:**
1. **Risk stratification**: Young, healthy, non-pregnant = uncomplicated
2. **Symptom recognition**: Classic triad of dysuria, frequency, suprapubic pain
3. **Diagnostic confirmation**: Dipstick positive for nitrites + leucocytes
4. **Guideline adherence**: Following NICE NG109 recommendations

**Clinical Pearls:**
- Nitrites are specific for gram-negative bacteria (especially E. coli)
- Leucocyte esterase indicates inflammatory response
- Absence of systemic symptoms rules out upper UTI

**PLAB Exam Strategy:**
Look for these key words in UTI questions: "uncomplicated," "non-pregnant," "nitrites positive" → Think nitrofurantoin first-line.

What specific aspect would you like me to elaborate on?`;
    }
    
    if (message.includes('mnemonic') || message.includes('remember')) {
      return `Great question! Here are some powerful mnemonics for UTI management:

**"NITRO" for First-Line Treatment:**
- **N**ice guidelines recommend it
- **I**deals for uncomplicated UTI
- **T**argets E. coli effectively  
- **R**esistance rates remain low
- **O**ptimal urinary concentration

**"CUTE" for UTI Symptoms:**
- **C**ystitis symptoms (dysuria, frequency)
- **U**rinary urgency
- **T**enderness suprapubic
- **E**xclude systemic features

**"FANT" for Antibiotic Choice:**
- **F**osfomycin (alternative)
- **A**void amoxicillin (high resistance)
- **N**itrofurantoin (first-line)
- **T**rimethoprim (second-line)

**Memory Tip for Duration:**
"3 days for simple, 7 for complex" - uncomplicated UTI needs only 3 days of nitrofurantoin.

These mnemonics will help you quickly identify the correct answer in PLAB questions. Would you like mnemonics for other conditions?`;
    }
    
    if (message.includes('differential') || message.includes('diagnosis')) {
      return `Excellent clinical thinking! Let's work through the differential diagnosis systematically:

**Primary Differential for Dysuria in Young Women:**

1. **Uncomplicated Cystitis** ✓ (Most likely here)
   - Dysuria + frequency + suprapubic pain
   - Positive nitrites + leucocytes
   - No systemic symptoms

2. **Pyelonephritis** ✗
   - Would have fever, flank pain, systemic symptoms
   - Often nausea/vomiting

3. **Urethritis (STI)** ✗
   - Usually gradual onset
   - May have urethral discharge
   - Sexual history important

4. **Vulvovaginitis** ✗
   - Would have vaginal discharge
   - External dysuria vs internal
   - Vulvar irritation/itching

5. **Interstitial Cystitis** ✗
   - Chronic symptoms (months/years)
   - Negative urine cultures
   - Pelvic pain syndrome

**Red Flags to Exclude:**
- Fever >38°C (pyelonephritis)
- Flank pain (upper UTI)
- Vaginal discharge (vaginitis)
- Pregnancy (changes management)

The positive nitrites are particularly helpful as they're 95% specific for bacterial UTI. This case fits perfectly with uncomplicated cystitis requiring standard first-line treatment.

Would you like me to explain the diagnostic approach or treatment modifications?`;
    }
    
    if (message.includes('guidelines') || message.includes('nice')) {
      return `Perfect question! Understanding UK guidelines is crucial for PLAB success.

**NICE NG109 - Urinary Tract Infections:**

**First-Line Treatment (Non-pregnant women 16-64):**
- Nitrofurantoin 100mg MR BD for 3 days
- OR Trimethoprim 200mg BD for 3 days (if nitrofurantoin unsuitable)

**Second-Line Options:**
- Fosfomycin 3g single dose
- Pivmecillinam 400mg TDS for 3 days

**When NOT to Use Nitrofurantoin:**
- Pregnancy at term (36+ weeks)
- eGFR <45 ml/min/1.73m²
- Acute pyelonephritis
- Men (poor tissue penetration)

**Key Guideline Updates (2018):**
- Reduced duration from 7 to 3 days
- Nitrofurantoin now preferred over trimethoprim
- Emphasis on narrow-spectrum antibiotics

**PLAB Exam Tips:**
- Questions often specify "following current UK guidelines"
- Look for non-pregnant women → nitrofurantoin
- Complicated UTI → longer course (7 days)
- Men with UTI → different antibiotics needed

**Supporting Evidence:**
- Cochrane reviews show 3 days as effective as 7 days
- Antimicrobial stewardship principles
- Reducing C. diff risk

Would you like me to explain the evidence behind these recommendations?`;
    }

    // Default responses for general queries
    const defaultResponses = [
      `I'm here to help with your PLAB preparation! I can explain medical concepts, clinical reasoning, UK guidelines, and exam strategies. 

**I can help with:**
- Breaking down complex clinical scenarios
- Explaining pathophysiology and pharmacology
- UK medical guidelines (NICE, CKS, BNF)
- PLAB exam techniques and mnemonics
- Differential diagnoses and clinical reasoning

Try asking me about specific aspects of this UTI question, or any other medical topic you're studying!`,

      `Great to see you're actively engaging with the material! 

**For this UTI question, I can explain:**
- Why nitrofurantoin is the best choice
- Clinical reasoning behind the diagnosis
- UK antibiotic guidelines
- Differential diagnosis approach
- Memory techniques and mnemonics

**Study Strategy:**
Focus on understanding the clinical reasoning rather than just memorizing answers. This will help you tackle similar scenarios with confidence.

What would you like to explore first?`,

      `As your AI tutor, I'm designed to help you think like a UK clinician preparing for PLAB!

**Key Learning Approach:**
1. **Clinical reasoning** - Why this diagnosis?
2. **Guidelines knowledge** - What do NICE/CKS say?
3. **Exam strategy** - How to spot correct answers quickly

**This UTI Case Teaches:**
- Pattern recognition for uncomplicated cystitis
- First-line antibiotic selection
- Duration of treatment principles

Feel free to ask about any aspect of this question or other medical topics you're studying. I'm here to help you succeed!`
    ];

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleAskTutor = (query: string) => {
    if (!query.trim()) return;
    
    setIsLoadingTutorResponse(true);
    
    // Add user message
    const userMessage = { role: 'user' as const, content: query };
    setTutorMessages(prev => [...prev, userMessage]);
    
    // Simulate AI processing delay
    setTimeout(() => {
      const response = getMockTutorResponse(query);
      const assistantMessage = { role: 'assistant' as const, content: response };
      setTutorMessages(prev => [...prev, assistantMessage]);
      setIsLoadingTutorResponse(false);
      setTutorInput('');
    }, 1500);
  };

  const getQuestionHelp = () => {
    if (!currentQuestion) return;
    
    const helpQuery = `Please explain this UTI question and provide study guidance: ${currentQuestion.question}`;
    handleAskTutor(helpQuery);
  };

  const backToModeSelection = () => {
    setPracticeMode('selection');
    setSelectedAnswer("");
    setSubmitted(false);
  };

  const handleAnswerSelect = (option: string) => {
    if (!submitted) {
      setSelectedAnswer(option);
    }
  };

  const handleSubmit = () => {
    if (selectedAnswer) {
      setSubmitted(true);
    }
  };

  const handleReset = () => {
    setSelectedAnswer("");
    setSubmitted(false);
  };

  const handleNextQuestion = () => {
    if (questions && currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer("");
      setSubmitted(false);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setSelectedAnswer("");
      setSubmitted(false);
    }
  };

  const getOptionButtonClass = (option: string) => {
    if (!submitted || !currentQuestion) {
      return selectedAnswer === option 
        ? "border-blue-500 bg-blue-50 text-blue-700"
        : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50";
    }

    // After submission
    if (option === currentQuestion.answer) {
      return "border-green-500 bg-green-50 text-green-700";
    }
    
    if (selectedAnswer === option && option !== currentQuestion.answer) {
      return "border-red-500 bg-red-50 text-red-700";
    }

    return "border-gray-300 bg-gray-50 text-gray-500";
  };

  const getOptionIcon = (option: string) => {
    if (!submitted || !currentQuestion) return null;
    
    if (option === currentQuestion.answer) {
      return <CheckCircle className="w-5 h-5 text-green-600" />;
    }
    
    if (selectedAnswer === option && option !== currentQuestion.answer) {
      return <XCircle className="w-5 h-5 text-red-600" />;
    }

    return null;
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Loading Questions</h3>
            <p className="text-gray-600">Preparing PLAB practice questions...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Error state
  if (error || !questions || questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Unable to Load Questions</h3>
            <p className="text-gray-600">Please try refreshing the page.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Loading state for question generation
  if (isGeneratingQuestions) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Generating Questions</h3>
            <p className="text-gray-600">Creating personalized questions for {selectedCategory} practice...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Practice Mode Selection Screen
  if (practiceMode === 'selection') {
    return (
      <div className="min-h-screen bg-gray-50">

        


        {/* Master Your Prep Section with PLAB Image */}
        <div className="relative bg-gradient-to-r from-blue-600 to-purple-700 w-full h-96 md:h-[400px] lg:h-[450px] mb-8 overflow-hidden">
          {/* Background Image */}
          <img 
            src={examRoomImg} 
            alt="Students taking PLAB exam"
            className="absolute inset-0 w-full h-full object-cover opacity-60"
            style={{ objectPosition: 'center 80%', transform: 'scale(1.2)' }}
          />

          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/40 to-purple-700/40"></div>

          <div className="relative z-50 flex flex-col items-center justify-end pb-8 text-center px-4 sm:px-8 h-full hero-text" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight drop-shadow-lg">
              PLAB 1 Practice
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white mb-6 sm:mb-8 max-w-3xl leading-relaxed drop-shadow-md font-medium">
              Choose your practice mode and start your medical preparation journey
            </p>
          </div>
        </div>

        {/* Filter Section */}
        <div className="container mx-auto px-4 py-8">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-blue-600" />
                Customize Your Practice
              </CardTitle>
              <CardDescription>Select your specialty and difficulty level to personalize your study experience</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                {/* Category Filter */}
                <div className="space-y-2">
                  <Label htmlFor="category-filter" className="text-sm font-medium text-gray-700">
                    Medical Specialty
                  </Label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select specialty" />
                    </SelectTrigger>
                    <SelectContent className="max-h-96 overflow-y-auto">
                      {medicalCategories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          <div className="flex items-center gap-2">
                            <span>{category.icon}</span>
                            <span>{category.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Difficulty Filter */}
                <div className="space-y-2">
                  <Label htmlFor="difficulty-filter" className="text-sm font-medium text-gray-700">
                    Difficulty Level
                  </Label>
                  <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      {difficultyLevels.map((level) => (
                        <SelectItem key={level.id} value={level.id}>
                          <div className="flex flex-col">
                            <span className="font-medium">{level.name}</span>
                            <span className="text-xs text-gray-500">{level.description}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Question Count Display */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Available Questions
                  </Label>
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-md border">
                    <BookOpen className="w-4 h-4 text-blue-600" />
                    <span className="font-semibold text-gray-900">
                      Practice Questions Available
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>


        </div>

        {/* Statistics Overview Cards */}
        <div className="container mx-auto px-4 pb-12">
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-gray-600">Total Questions</span>
                </div>
                <p className="text-2xl font-bold text-gray-900 mt-1">5000+</p>
                <p className="text-xs text-gray-500 mt-1">Available practice questions</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-gray-600">Active Categories</span>
                </div>
                <p className="text-2xl font-bold text-gray-900 mt-1">2</p>
                <p className="text-xs text-gray-500 mt-1">Cardiovascular, Infectious Diseases</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-purple-600" />
                  <span className="text-sm font-medium text-gray-600">Medical Guidelines</span>
                </div>
                <p className="text-2xl font-bold text-gray-900 mt-1">4</p>
                <p className="text-xs text-gray-500 mt-1">NICE, NHS, BMJ, Gov UK</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-orange-600" />
                  <span className="text-sm font-medium text-gray-600">Languages</span>
                </div>
                <p className="text-2xl font-bold text-gray-900 mt-1">25</p>
                <p className="text-xs text-gray-500 mt-1">Multi-language support</p>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Choose Practice Mode</CardTitle>
              <CardDescription>Select your preferred study format based on your goals</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Block 1: Fixed Question Count */}
              <div className="border rounded-lg p-4 bg-blue-50">
                <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Block 1: Fixed Question Sets
                </h3>
                <p className="text-sm text-blue-700 mb-4">Complete a specific number of questions at your own pace</p>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  <Button 
                    onClick={() => startFixedPractice(10)}
                    disabled={isGeneratingQuestions}
                    className="bg-blue-600 hover:bg-blue-700 text-white h-16 flex flex-col items-center justify-center gap-1"
                  >
                    <span className="font-bold text-lg">10</span>
                    <span className="text-xs">Questions</span>
                  </Button>
                  <Button 
                    onClick={() => startFixedPractice(20)}
                    disabled={isGeneratingQuestions}
                    className="bg-blue-600 hover:bg-blue-700 text-white h-16 flex flex-col items-center justify-center gap-1"
                  >
                    <span className="font-bold text-lg">20</span>
                    <span className="text-xs">Questions</span>
                  </Button>
                  <Button 
                    onClick={() => startFixedPractice(50)}
                    disabled={isGeneratingQuestions}
                    className="bg-blue-600 hover:bg-blue-700 text-white h-16 flex flex-col items-center justify-center gap-1"
                  >
                    <span className="font-bold text-lg">50</span>
                    <span className="text-xs">Questions</span>
                  </Button>
                  <Button 
                    onClick={() => startFixedPractice(100)}
                    disabled={isGeneratingQuestions}
                    className="bg-blue-600 hover:bg-blue-700 text-white h-16 flex flex-col items-center justify-center gap-1"
                  >
                    <span className="font-bold text-lg">100</span>
                    <span className="text-xs">Questions</span>
                  </Button>
                  <Button 
                    onClick={() => startFixedPractice(180)}
                    disabled={isGeneratingQuestions}
                    className="bg-blue-600 hover:bg-blue-700 text-white h-16 flex flex-col items-center justify-center gap-1"
                  >
                    <span className="font-bold text-lg">180</span>
                    <span className="text-xs">PLAB Mock</span>
                  </Button>
                </div>
              </div>

              {/* Block 2: Timed Challenges */}
              <div className="border rounded-lg p-4 bg-orange-50">
                <h3 className="font-semibold text-orange-900 mb-3 flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Block 2: Timed Challenges
                </h3>
                <p className="text-sm text-orange-700 mb-4">Answer as many questions as possible within the time limit</p>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  <Button 
                    onClick={() => startTimedPractice(10)}
                    disabled={isGeneratingQuestions}
                    className="bg-orange-600 hover:bg-orange-700 text-white h-16 flex flex-col items-center justify-center gap-1"
                  >
                    <span className="font-bold text-lg">10m</span>
                    <span className="text-xs">Sprint</span>
                  </Button>
                  <Button 
                    onClick={() => startTimedPractice(30)}
                    disabled={isGeneratingQuestions}
                    className="bg-orange-600 hover:bg-orange-700 text-white h-16 flex flex-col items-center justify-center gap-1"
                  >
                    <span className="font-bold text-lg">30m</span>
                    <span className="text-xs">Focus</span>
                  </Button>
                  <Button 
                    onClick={() => startTimedPractice(60)}
                    disabled={isGeneratingQuestions}
                    className="bg-orange-600 hover:bg-orange-700 text-white h-16 flex flex-col items-center justify-center gap-1"
                  >
                    <span className="font-bold text-lg">60m</span>
                    <span className="text-xs">Endurance</span>
                  </Button>
                  <Button 
                    onClick={() => startTimedPractice(120)}
                    disabled={isGeneratingQuestions}
                    className="bg-orange-600 hover:bg-orange-700 text-white h-16 flex flex-col items-center justify-center gap-1"
                  >
                    <span className="font-bold text-lg">2h</span>
                    <span className="text-xs">Marathon</span>
                  </Button>
                  <Button 
                    onClick={() => startTimedPractice(180)}
                    disabled={isGeneratingQuestions}
                    className="bg-orange-600 hover:bg-orange-700 text-white h-16 flex flex-col items-center justify-center gap-1"
                  >
                    <span className="font-bold text-lg">3h</span>
                    <span className="text-xs">Ultra</span>
                  </Button>
                </div>
              </div>

              {/* Block 3: Unlimited Practice */}
              <div className="border rounded-lg p-4 bg-green-50">
                <h3 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  Block 3: Unlimited Study
                </h3>
                <p className="text-sm text-green-700 mb-4">Study without time pressure - continue as long as you want</p>
                <Button 
                  onClick={() => startUnlimitedPractice()}
                  disabled={isGeneratingQuestions}
                  className="bg-green-600 hover:bg-green-700 text-white h-16 px-8 flex items-center justify-center gap-3"
                >
                  <ArrowRight className="w-6 h-6" />
                  <div className="text-left">
                    <div className="font-bold">Start Unlimited Practice</div>
                    <div className="text-xs opacity-90">No time limit - study at your pace</div>
                  </div>
                </Button>
              </div>

              {/* Block 4: Authentic PLAB 1 Simulation */}
              <div className="border rounded-lg p-4 bg-purple-50">
                <h3 className="font-semibold text-purple-900 mb-3 flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Block 4: Authentic PLAB 1 Simulation
                </h3>
                <p className="text-sm text-purple-700 mb-4">Real exam conditions - exactly 1 minute per question</p>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  <Button 
                    onClick={() => startAuthenticPractice(10)}
                    disabled={isGeneratingQuestions}
                    className="bg-purple-600 hover:bg-purple-700 text-white h-16 flex flex-col items-center justify-center gap-1"
                  >
                    <span className="font-bold text-lg">10</span>
                    <span className="text-xs">10 mins</span>
                  </Button>
                  <Button 
                    onClick={() => startAuthenticPractice(20)}
                    disabled={isGeneratingQuestions}
                    className="bg-purple-600 hover:bg-purple-700 text-white h-16 flex flex-col items-center justify-center gap-1"
                  >
                    <span className="font-bold text-lg">20</span>
                    <span className="text-xs">20 mins</span>
                  </Button>
                  <Button 
                    onClick={() => startAuthenticPractice(50)}
                    disabled={isGeneratingQuestions}
                    className="bg-purple-600 hover:bg-purple-700 text-white h-16 flex flex-col items-center justify-center gap-1"
                  >
                    <span className="font-bold text-lg">50</span>
                    <span className="text-xs">50 mins</span>
                  </Button>
                  <Button 
                    onClick={() => startAuthenticPractice(60)}
                    disabled={isGeneratingQuestions}
                    className="bg-purple-600 hover:bg-purple-700 text-white h-16 flex flex-col items-center justify-center gap-1"
                  >
                    <span className="font-bold text-lg">60</span>
                    <span className="text-xs">1 hour</span>
                  </Button>
                  <Button 
                    onClick={() => startAuthenticPractice(180)}
                    disabled={isGeneratingQuestions}
                    className="bg-purple-600 hover:bg-purple-700 text-white h-16 flex flex-col items-center justify-center gap-1"
                  >
                    <span className="font-bold text-lg">180</span>
                    <span className="text-xs">Full PLAB</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Practice Mode Active - Show Question Interface
  if (!currentQuestion) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back to Mode Selection */}
      <div className="container mx-auto px-4 pt-4">
        <Button
          onClick={backToModeSelection}
          variant="outline"
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Practice Modes
        </Button>
      </div>

      {/* Hero Banner with Exam Room Image */}
      <div className="relative bg-gradient-to-r from-blue-600 to-purple-700 w-full h-64 md:h-80 lg:h-96 mb-8 overflow-hidden">
        {/* Background Image */}
        <img 
          src={examRoomImg} 
          alt="Students taking PLAB exam"
          className="absolute inset-0 w-full h-full object-cover opacity-70"
          style={{ objectPosition: 'center 80%', transform: 'scale(1.2)' }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/40 to-purple-700/40"></div>

        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 sm:px-8 py-12 sm:py-16 hero-text">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
            PLAB 1 Practice
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-6 sm:mb-8 max-w-3xl leading-relaxed">
            PLAB practice questions with detailed clinical explanations and verified UK medical guidance
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <Badge variant="secondary" className="px-4 py-2 text-sm font-medium bg-white/20 text-white border-white/30">
              Question {currentQuestionIndex + 1} of {questions.length}
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-sm font-medium bg-white/20 text-white border-white/30">
              Evidence-Based Learning
            </Badge>
          </div>

          {/* Translation and Voice Controls */}
          <div className="mt-8 flex flex-wrap gap-4 items-center justify-center">
            {/* Language Selector */}
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
              <Globe className="w-4 h-4 text-white" />
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger className="w-40 bg-transparent border-white/30 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.flag} {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Translation Toggle - Disabled */}
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 opacity-50">
              <Languages className="w-4 h-4 text-white" />
              <Label htmlFor="translate-mode" className="text-white text-sm">
                Auto-translate (unavailable)
              </Label>
              <Switch
                id="translate-mode"
                checked={false}
                onCheckedChange={() => {}}
                disabled={true}
              />
            </div>

            {/* Voice Controls */}
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
              {isSpeaking ? (
                <VolumeX className="w-4 h-4 text-white" />
              ) : (
                <Volume2 className="w-4 h-4 text-white" />
              )}
              <Label htmlFor="speech-enabled" className="text-white text-sm">
                Voice
              </Label>
              <Switch
                id="speech-enabled"
                checked={speechEnabled}
                onCheckedChange={setSpeechEnabled}
              />
              {speechEnabled && (
                <Button
                  onClick={isSpeaking ? stopSpeaking : speakCurrentQuestion}
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20"
                >
                  {isSpeaking ? "Stop" : "Read"}
                </Button>
              )}
            </div>

            {/* Category and Difficulty Filters */}
            <div className="mt-6 flex flex-wrap gap-4 items-center justify-center">
              {/* Category Filter */}
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                <Filter className="w-4 h-4 text-white" />
                <Label htmlFor="category-filter" className="text-white text-sm">
                  Specialty
                </Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48 bg-transparent border-white/30 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="max-h-96 overflow-y-auto">
                    {medicalCategories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        <div className="flex items-center gap-2">
                          <span>{category.icon}</span>
                          <span>{category.name}</span>
                          <Badge variant="secondary" className="ml-2 text-xs">
                            {category.count}
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Difficulty Filter */}
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                <Target className="w-4 h-4 text-white" />
                <Label htmlFor="difficulty-filter" className="text-white text-sm">
                  Level
                </Label>
                <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                  <SelectTrigger className="w-40 bg-transparent border-white/30 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {difficultyLevels.map((level) => (
                      <SelectItem key={level.id} value={level.id}>
                        <div className="flex flex-col">
                          <span className="font-medium">{level.name}</span>
                          <span className="text-xs text-gray-500">{level.description}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Question Count Indicator */}
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                <BookOpen className="w-4 h-4 text-white" />
                <span className="text-white text-sm">
                  {medicalCategories.find(cat => cat.id === selectedCategory)?.count || "5000+"} Questions
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 pb-24">
        <div className="max-w-4xl mx-auto">
        </div>

        {/* Question Card */}
        <Card className="mb-6 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-medium text-gray-900 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
                <Badge variant="secondary" className="text-xs">
                  {currentQuestion.topic}
                </Badge>
              </div>
              {/* Desktop Navigation - Hide on Mobile */}
              <div className="hidden md:flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePrevQuestion}
                  disabled={currentQuestionIndex === 0}
                  className="flex items-center gap-1"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNextQuestion}
                  disabled={currentQuestionIndex === questions.length - 1}
                  className="flex items-center gap-1"
                >
                  Next
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </CardTitle>
            <CardDescription className="text-base text-gray-700 leading-relaxed">
              {(() => {
                const cacheKey = `q1_${selectedLanguage}`;
                const translatedQ = translatedQuestions[cacheKey];
                return translatedQ?.question || translateText(currentQuestion.question) || currentQuestion.question;
              })()}
            </CardDescription>

            {/* Clinical Images Section */}
            {currentQuestion.images && currentQuestion.images.length > 0 && (
              <div className="mt-6 mb-6">
                <h4 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Clinical Images for Diagnosis
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {currentQuestion.images.map((image, index) => (
                    <div key={index} className="bg-white border-2 border-gray-200 rounded-lg p-4 shadow-sm">
                      {image.type === 'description' ? (
                        // Clinical Description Format
                        <div className="space-y-3">
                          <div className="flex items-center justify-center bg-blue-50 rounded-lg p-4 mb-3">
                            <div className="text-center">
                              <Activity className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                              <span className="text-sm font-medium text-blue-800">Clinical Findings</span>
                            </div>
                          </div>
                          
                          {image.title && (
                            <h5 className="text-sm font-semibold text-gray-800 mb-2">{image.title}</h5>
                          )}
                          
                          {image.description && (
                            <p className="text-xs text-gray-700 leading-relaxed mb-3">{image.description}</p>
                          )}
                          
                          {image.clinicalFeatures && image.clinicalFeatures.length > 0 && (
                            <div className="space-y-2">
                              <h6 className="text-xs font-semibold text-gray-800 flex items-center gap-1">
                                <Target className="w-3 h-3" />
                                Key Features:
                              </h6>
                              <ul className="space-y-1">
                                {image.clinicalFeatures.map((feature, featureIndex) => (
                                  <li key={featureIndex} className="text-xs text-gray-600 flex items-start gap-2">
                                    <span className="w-1 h-1 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></span>
                                    {feature}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      ) : (
                        // Image Format (SVG or External)
                        <>
                          <div className="aspect-square flex items-center justify-center bg-gray-50 rounded-md mb-3">
                            {image.type === 'svg' && image.content ? (
                              <div 
                                dangerouslySetInnerHTML={{ __html: image.content }}
                                className="w-full h-full flex items-center justify-center"
                              />
                            ) : image.type === 'external' && image.url ? (
                              <img 
                                src={image.url} 
                                alt={image.title || image.description || 'Clinical image'}
                                className="w-full h-full object-cover rounded-md"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = 'none';
                                  target.nextElementSibling?.classList.remove('hidden');
                                }}
                              />
                            ) : image.url ? (
                              <img 
                                src={image.url} 
                                alt={image.alt || image.title || 'Clinical image'}
                                className="w-full h-full object-cover rounded-md"
                              />
                            ) : (
                              <div className="w-full h-full bg-gray-100 rounded-md flex items-center justify-center text-gray-400">
                                <FileText className="w-8 h-8" />
                              </div>
                            )}
                            <div className="hidden w-full h-full bg-gray-100 rounded-md flex items-center justify-center text-gray-400">
                              <FileText className="w-8 h-8" />
                            </div>
                          </div>
                          
                          {/* Image Title and Description */}
                          {image.title && (
                            <h5 className="text-sm font-semibold text-gray-800 mb-1">{image.title}</h5>
                          )}
                          {image.description && (
                            <p className="text-xs text-gray-600 mb-2">{image.description}</p>
                          )}
                          
                          {/* Attribution for external images */}
                          {image.attribution && (
                            <p className="text-xs text-gray-500 italic border-t pt-2 mt-2">
                              {image.attribution}
                            </p>
                          )}
                          
                          {/* Legacy caption support */}
                          {!image.title && !image.description && image.caption && (
                            <p className="text-xs text-gray-600 text-center font-medium">{image.caption}</p>
                          )}
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Voice Controls in Question */}
            {speechEnabled && (
              <div className="flex justify-end">
                <Button
                  onClick={isSpeaking ? stopSpeaking : speakCurrentQuestion}
                  variant="ghost"
                  size="sm"
                  className="text-blue-600 hover:bg-blue-50"
                >
                  {isSpeaking ? (
                    <>
                      <VolumeX className="w-4 h-4 mr-2" />
                      Stop Reading
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-4 h-4 mr-2" />
                      Read Question
                    </>
                  )}
                </Button>
              </div>
            )}
          </CardHeader>
          
          <CardContent className="space-y-3">
            {Object.entries(currentQuestion.options).map(([option, text]) => {
              const cacheKey = `q1_${selectedLanguage}`;
              const translatedQ = translatedQuestions[cacheKey];
              const displayText = translatedQ?.options?.[option] || translateText(String(text)) || String(text);
              
              return (
                <button
                  key={option}
                  onClick={() => handleAnswerSelect(option)}
                  disabled={submitted}
                  className={`w-full p-4 border-2 rounded-lg text-left transition-all duration-200 flex items-center justify-between ${getOptionButtonClass(option)}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full border-2 border-black bg-white text-black flex items-center justify-center font-semibold text-sm shrink-0">
                      {option}
                    </div>
                    <span>{displayText}</span>
                  </div>
                  {getOptionIcon(option)}
                </button>
              );
            })}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              {!submitted ? (
                <Button 
                  onClick={handleSubmit}
                  disabled={!selectedAnswer}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6"
                >
                  Submit Answer
                </Button>
              ) : (
                <Button 
                  onClick={handleReset}
                  variant="outline"
                  className="px-6"
                >
                  Try Again
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Correct Answer Explanation Section */}
        {submitted && currentQuestion && (
          <Card className="mb-6 shadow-sm">
            <CardHeader className="bg-green-50">
              <CardTitle className="text-lg font-medium text-green-800 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                Correct Answer Explanation
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                {/* Correct Answer Badge */}
                <div className="flex items-center gap-3 p-4 bg-green-100 border border-green-200 rounded-lg">
                  <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {currentQuestion.answer}
                  </div>
                  <div>
                    <div className="font-semibold text-green-800 mb-1">Correct Answer</div>
                    <div className="text-sm text-green-700">
                      {(currentQuestion.options as any)[currentQuestion.answer] || currentQuestion.options.A}
                    </div>
                  </div>
                </div>

                {/* Structured Explanation with Icons */}
                <div className="space-y-4">
                  {formatCorrectAnswerExplanation(currentQuestion.explanation).map((section, index) => (
                    <div key={index} className="border-l-4 border-green-400 pl-4 bg-green-50/50 p-3 rounded-r-lg">
                      <div className="flex items-start gap-3">
                        <div className="mt-1 text-green-600">
                          {section.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            {section.title}
                          </h4>
                          <div className="space-y-2">
                            {section.points.map((point, pointIndex) => (
                              <div key={pointIndex} className="flex items-start gap-2 text-sm text-gray-700">
                                {!point.endsWith(':') && (
                                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 shrink-0"></div>
                                )}
                                <span className={`leading-relaxed ${point.endsWith(':') ? 'font-semibold' : ''}`}>
                                  {renderTextWithTooltips(point)}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Why Other Options Are Inappropriate Section */}
        {submitted && currentQuestion && currentQuestion.incorrectExplanation && (
          <Card className="mb-6 shadow-sm">
            <CardHeader className="bg-red-50">
              <CardTitle className="text-lg font-medium text-red-800 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                Why Other Options Are Inappropriate
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {formatIncorrectAnswerExplanation(currentQuestion.incorrectExplanation).map((section, index) => (
                  <div key={index} className="border-l-4 border-red-400 pl-4 bg-red-50/50 p-3 rounded-r-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-sm shrink-0">
                        {section.option}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                          <X className="w-4 h-4 text-red-500" />
                          {section.title}
                        </h4>
                        <div className="space-y-2">
                          {section.points.map((point, pointIndex) => (
                            <div key={pointIndex} className="flex items-start gap-2 text-sm text-gray-700">
                              <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                              <span className="leading-relaxed">
                                {renderTextWithTooltips(point)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* AI Tutor Section */}
        <Card className="mb-6 shadow-sm">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-blue-600" />
                <CardTitle className="text-blue-800">AI Medical Tutor</CardTitle>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAITutor(!showAITutor)}
              >
                {showAITutor ? 'Hide' : 'Show'} Tutor
              </Button>
            </div>
            <CardDescription className="text-blue-600">
              Get personalized explanations, study tips, and clinical insights for PLAB preparation
            </CardDescription>
          </CardHeader>
          
          {showAITutor && (
            <CardContent className="p-4">
              {/* Quick Help Buttons */}
              <div className="flex flex-wrap gap-2 mb-4">
                <Button
                  onClick={getQuestionHelp}
                  variant="outline"
                  size="sm"
                  className="text-blue-600 border-blue-200 hover:bg-blue-50"
                >
                  <Lightbulb className="w-4 h-4 mr-2" />
                  Explain This Question
                </Button>
                <Button
                  onClick={() => handleAskTutor('Give me mnemonics for UTI management')}
                  variant="outline"
                  size="sm"
                  className="text-purple-600 border-purple-200 hover:bg-purple-50"
                >
                  <Brain className="w-4 h-4 mr-2" />
                  Memory Aids
                </Button>
                <Button
                  onClick={() => handleAskTutor('What are the differential diagnoses?')}
                  variant="outline"
                  size="sm"
                  className="text-green-600 border-green-200 hover:bg-green-50"
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  Differentials
                </Button>
                <Button
                  onClick={() => handleAskTutor('Explain UK guidelines for UTI treatment')}
                  variant="outline"
                  size="sm"
                  className="text-orange-600 border-orange-200 hover:bg-orange-50"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  UK Guidelines
                </Button>
              </div>

              {/* Chat Messages */}
              <div className="space-y-4 mb-4 max-h-96 overflow-y-auto border rounded-lg p-4 bg-gray-50">
                {tutorMessages.length === 0 && (
                  <div className="text-center text-gray-500 py-8">
                    <MessageCircle className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <p className="font-medium">Ask me anything about this medical question!</p>
                    <p className="text-sm mt-1">Try: "Explain why nitrofurantoin is first-line" or "Give me study tips"</p>
                  </div>
                )}
                
                {tutorMessages.map((message, index) => (
                  <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] p-3 rounded-lg ${
                      message.role === 'user' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-white text-gray-800 border border-gray-200 shadow-sm'
                    }`}>
                      <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
                    </div>
                  </div>
                ))}
                
                {isLoadingTutorResponse && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-gray-200 p-3 rounded-lg shadow-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <span className="text-sm text-gray-600 ml-2">AI Tutor is thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Input Area */}
              <div className="flex gap-2">
                <Input
                  value={tutorInput}
                  onChange={(e) => setTutorInput(e.target.value)}
                  placeholder="Ask about clinical reasoning, guidelines, mnemonics, or study tips..."
                  className="flex-1"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleAskTutor(tutorInput);
                    }
                  }}
                />
                <Button
                  onClick={() => handleAskTutor(tutorInput)}
                  disabled={!tutorInput.trim() || isLoadingTutorResponse}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          )}
        </Card>

        {/* NICE NG136 + PLAB MCQ Format Guide */}
        {submitted && (
          <div className="mb-6 p-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg shadow-lg">
            <Card className="cursor-pointer hover:shadow-xl transition-all duration-300 border-0" onClick={() => setShowNiceGuide(true)}>
              <CardHeader className="bg-white hover:bg-green-50 transition-colors p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-green-100 rounded-full">
                      <FileText className="w-8 h-8 text-green-600" />
                    </div>
                    <div>
                      <CardTitle className="text-green-800 text-xl font-bold">NICE NG136 + PLAB MCQ Format</CardTitle>
                      <CardDescription className="text-green-700 mt-2 text-base">
                        📋 Clinical scenario framework, risk assessment tools, and structured learning approach
                      </CardDescription>
                    </div>
                  </div>
                  <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white border-0 px-6 py-3">
                    <BookOpen className="w-5 h-5 mr-2" />
                    View Guide
                  </Button>
                </div>
              </CardHeader>
            </Card>
          </div>
        )}

        {/* BNF Medication Guidance */}
        {submitted && currentQuestion.bnfGuidance && (
          <Card className="mb-6 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-medium text-gray-900 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-500" />
                BNF Medication Guidance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                <p className="text-gray-800 leading-relaxed">{currentQuestion.bnfGuidance}</p>
                {currentQuestion.medications && currentQuestion.medications.length > 0 && (
                  <div className="mt-3">
                    <div className="text-sm font-medium text-blue-700 mb-2">Key Medications:</div>
                    <div className="flex flex-wrap gap-2">
                      {currentQuestion.medications.map((med, index) => (
                        <Badge key={index} variant="outline" className="bg-white border-blue-300 text-blue-700">
                          {med}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Comprehensive Memory Aid Section */}
        {submitted && (
          <Card className="mb-6 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-medium text-gray-900 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                Memory Aid
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                <div className="text-gray-800 font-medium">
                  {/* Check if mnemonic is the new comprehensive format */}
                  {typeof currentQuestion.mnemonic === 'object' && currentQuestion.mnemonic.content ? (
                    <div className="space-y-3">
                      <h4 className="font-semibold text-yellow-800">{currentQuestion.mnemonic.title}</h4>
                      {currentQuestion.mnemonic.content.map((mnemonicItem, index) => (
                        <div key={index} className="flex items-start gap-2 mb-2">
                          <span className="text-yellow-600 font-bold mt-1">•</span>
                          <span className="flex-1">{mnemonicItem}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    // Fallback for old string format
                    <div>
                      {(typeof currentQuestion.mnemonic === 'string' ? currentQuestion.mnemonic.split('\n') : []).map((line, index) => {
                        if (line.trim()) {
                          return (
                            <div key={index} className="flex items-start gap-2 mb-2">
                              <span className="text-yellow-600 font-bold mt-1">•</span>
                              <span className="flex-1">{line.trim()}</span>
                            </div>
                          );
                        }
                        return <div key={index} className="mb-2"></div>;
                      })}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Comprehensive Clinical Guidelines & Evidence */}
        {submitted && (currentQuestion.guidelineSummary || currentQuestion.clinicalGuidelines) && (
          <Card className="shadow-sm">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="flex items-center gap-2 text-blue-800">
                <ExternalLink className="w-5 h-5" />
                Clinical Guidelines & Evidence
              </CardTitle>
              <CardDescription className="text-blue-600">
                Comprehensive guideline summary with authentic UK medical references
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* New Comprehensive Format */}
              {currentQuestion.clinicalGuidelines && (
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                  <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    {currentQuestion.clinicalGuidelines.title}
                  </h4>
                  <div className="space-y-3 text-gray-700">
                    {currentQuestion.clinicalGuidelines.content.map((point, index) => (
                      <div key={index} className="leading-relaxed">
                        <strong className="text-blue-800">{point.split(':')[0]}:</strong>
                        <span className="ml-1">{point.split(':').slice(1).join(':')}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Fallback to Old Format */}
              {!currentQuestion.clinicalGuidelines && currentQuestion.guidelineSummary && (
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                  <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    {currentQuestion.guidelineSummary.title}
                  </h4>
                  <div className="prose prose-sm max-w-none text-gray-700">
                    {currentQuestion.guidelineSummary.content.split('\n\n').map((paragraph, index) => (
                      <div key={index} className="mb-3 leading-relaxed" dangerouslySetInnerHTML={{ 
                        __html: paragraph
                          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                          .replace(/• /g, '• ')
                      }} />
                    ))}
                  </div>
                </div>
              )}

              {/* Primary UK Guidance */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Star className="w-4 h-4 text-blue-600" />
                  UK Guidance
                </h4>
                {currentQuestion.ukGuidance && (
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
                    <div className="flex items-center gap-3">
                      <ExternalLink className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-gray-900">{currentQuestion.ukGuidance.title}</div>
                        <a 
                          href={currentQuestion.ukGuidance.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          {currentQuestion.ukGuidance.url}
                        </a>
                      </div>
                    </div>
                  </div>
                )}

                {/* Fallback to old links format */}
                {!currentQuestion.ukGuidance && currentQuestion.links?.primary && (
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
                    <div className="flex items-center gap-3">
                      <ExternalLink className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-gray-900">{currentQuestion.links.primary.title}</div>
                        <a 
                          href={currentQuestion.links.primary.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          {currentQuestion.links.primary.url}
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Supplementary References */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-gray-600" />
                  Further Reading & Guidelines
                </h4>
                
                {/* New comprehensive format */}
                {currentQuestion.supplementaryReferences && currentQuestion.supplementaryReferences.length > 0 && (
                  <div className="grid gap-3">
                    {currentQuestion.supplementaryReferences.map((ref, index) => (
                      <a
                        key={index}
                        href={ref.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4 text-gray-500 flex-shrink-0" />
                        <span className="text-gray-700 font-medium">{ref.title}</span>
                      </a>
                    ))}
                  </div>
                )}

                {/* Fallback to old format */}
                {!currentQuestion.supplementaryReferences && currentQuestion.links?.supplementary && (
                  <div className="grid gap-3">
                    {currentQuestion.links.supplementary.map((link, index) => (
                      <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4 text-gray-500 flex-shrink-0" />
                        <span className="text-gray-700 font-medium">{link.title}</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* Study Tip */}
              {currentQuestion.studyTip && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-yellow-800 mb-2">{currentQuestion.studyTip.title}</h4>
                      <p className="text-gray-700 text-sm leading-relaxed">{currentQuestion.studyTip.content}</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Fallback for questions without comprehensive guidelines */}
        {submitted && !currentQuestion.guidelineSummary && (
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-medium text-gray-900 flex items-center gap-2">
                <ExternalLink className="w-5 h-5" />
                Clinical Guidelines
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {Object.entries(currentQuestion.links || {}).map(([key, url]) => (
                  <a
                    key={key}
                    href={typeof url === 'string' ? url : (url as any).url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-medium text-gray-900">{key}</span>
                    <ExternalLink className="w-4 h-4 text-gray-500" />
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* NICE NG136 Guide Overlay - Enhanced Readability */}
        {showNiceGuide && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-5xl w-full max-h-[95vh] overflow-y-auto">
              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl font-bold text-green-800">NICE NG136 + PLAB MCQ Format Guide</h2>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    onClick={() => setShowNiceGuide(false)}
                    className="text-gray-600 hover:text-gray-800 text-xl px-4 py-2"
                  >
                    ✕
                  </Button>
                </div>
                
                <div className="space-y-8">
                  <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
                    <h3 className="text-xl font-bold text-black mb-3">Clinical Scenario Framework</h3>
                    <p className="text-lg text-black leading-relaxed">
                      NICE NG136 provides evidence-based guidance for urinary tract infections in adults. 
                      This framework helps structure clinical decision-making for PLAB examination scenarios.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                      <h4 className="text-xl font-bold text-black mb-4">Risk Assessment Tools</h4>
                      <ul className="space-y-3 text-lg text-black">
                        <li>• Patient demographics and comorbidities</li>
                        <li>• Symptom severity assessment</li>
                        <li>• Previous antibiotic exposure</li>
                        <li>• Resistance risk factors</li>
                      </ul>
                    </div>

                    <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
                      <h4 className="text-xl font-bold text-black mb-4">Structured Learning Approach</h4>
                      <ul className="space-y-3 text-lg text-black">
                        <li>• Systematic history taking</li>
                        <li>• Evidence-based examination</li>
                        <li>• Appropriate investigations</li>
                        <li>• Treatment decision algorithms</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
                    <h4 className="text-xl font-bold text-black mb-4">Memory Aids for PLAB</h4>
                    <div className="space-y-3 text-lg text-black">
                      <p><strong>NICE UTI:</strong> Nitrites, Increased frequency, Cloudy urine, Erythrocytes (blood)</p>
                      <p><strong>First-line antibiotics:</strong> Nitrofurantoin, Trimethoprim, Pivmecillinam</p>
                      <p><strong>Red flags:</strong> Fever, Flank pain, Rigors, Elderly confusion</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                    <h4 className="text-xl font-bold text-black mb-4">Clinical Decision Points</h4>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="bg-white p-4 rounded-lg border border-gray-300">
                        <h5 className="text-lg font-bold text-black mb-2">Uncomplicated UTI</h5>
                        <p className="text-base text-black">Non-pregnant women, no comorbidities</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-gray-300">
                        <h5 className="text-lg font-bold text-black mb-2">Complicated UTI</h5>
                        <p className="text-base text-black">Men, pregnancy, immunocompromised</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-gray-300">
                        <h5 className="text-lg font-bold text-black mb-2">Recurrent UTI</h5>
                        <p className="text-base text-black">≥3 episodes in 12 months</p>
                      </div>
                    </div>
                  </div>

                  <div className="text-center pt-4">
                    <Button 
                      onClick={() => setShowNiceGuide(false)}
                      size="lg"
                      className="bg-green-600 hover:bg-green-700 text-white px-12 py-3 text-lg font-semibold rounded-lg"
                    >
                      Close Guide
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile-Only Bottom Navigation - Next Question Button */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 safe-area-bottom">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Previous Button */}
            <Button
              onClick={handlePrevQuestion}
              disabled={currentQuestionIndex === 0}
              variant="outline"
              className="flex-1 h-12 text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            {/* Question Progress */}
            <div className="text-center px-2">
              <div className="text-sm font-medium text-gray-700">
                {currentQuestionIndex + 1} of {questions.length}
              </div>
            </div>

            {/* Next Button */}
            <Button
              onClick={handleNextQuestion}
              disabled={currentQuestionIndex === questions.length - 1}
              className="flex-1 h-12 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium"
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>

      {/* Add bottom padding to prevent content overlap with fixed bottom nav on mobile */}
      <div className="md:hidden h-20"></div>
    </div>
  );
}