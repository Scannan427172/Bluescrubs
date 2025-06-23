import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, ExternalLink, Lightbulb, BookOpen, ArrowLeft, ArrowRight, Volume2, VolumeX, Languages, Globe } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import plab1BgImage from '@assets/458CC7DF-D6D7-4BAD-85F5-99EEBD33ECD9_1750366142331.png';

interface Question {
  id: string;
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
    E: string;
  };
  answer: string;
  explanation: {
    A: string;
    B: string;
    C: string;
    D: string;
    E: string;
  };
  mnemonic: string;
  medications?: string[];
  bnfGuidance?: string;
  links: {
    NICE: string;
    CKS: string;
    "NHS UK": string;
  };
}

export default function Test() {
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [heroImageLoaded, setHeroImageLoaded] = useState(false);

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

  // Preload hero image for faster loading
  useEffect(() => {
    const img = new Image();
    img.onload = () => setHeroImageLoaded(true);
    img.src = plab1BgImage;
  }, []);

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
  const { data: questions, isLoading, error } = useQuery<Question[]>({
    queryKey: ["/api/test/questions"],
    retry: false,
  });

  const currentQuestion = questions?.[currentQuestionIndex];

  // Effect to translate current question when language changes
  useEffect(() => {
    if (currentQuestion && translateQuestions && selectedLanguage !== 'en') {
      translateFullQuestion(currentQuestion);
    }
  }, [currentQuestion, translateQuestions, selectedLanguage]);

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
            <p className="text-gray-600">Preparing PassMedicine-style questions...</p>
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

  if (!currentQuestion) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-blue-600 to-purple-700 w-full h-64 md:h-80 lg:h-96 mb-8 overflow-hidden">
        {!heroImageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-700">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        <img 
          src={plab1BgImage}
          alt="PLAB Test Practice"
          className={`absolute inset-0 w-full h-full object-cover opacity-60 transition-opacity duration-300 ${heroImageLoaded ? 'opacity-60' : 'opacity-0'}`}
          loading="eager"
          decoding="async"
          onLoad={() => setHeroImageLoaded(true)}
        />

        <div className="relative z-50 flex flex-col items-center justify-center text-center px-4 sm:px-8 py-12 sm:py-16 hero-text">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
            PLAB Practice Test
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-6 sm:mb-8 max-w-3xl leading-relaxed">
            PassMedicine-style questions with detailed clinical explanations and verified UK medical guidance
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <Badge variant="secondary" className="px-4 py-2 text-sm font-medium bg-white/20 text-white border-white/30">
              Question {currentQuestionIndex + 1} of {questions.length}
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-sm font-medium bg-white/20 text-white border-white/30">
              Evidence-Based Learning
            </Badge>
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
              Question {currentQuestionIndex + 1}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePrevQuestion}
                  disabled={currentQuestionIndex === 0}
                >
                  <ArrowLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNextQuestion}
                  disabled={currentQuestionIndex === questions.length - 1}
                >
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </CardTitle>
            <CardDescription className="text-base text-gray-700 leading-relaxed">
              {currentQuestion.question}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-3">
            {Object.entries(currentQuestion.options).map(([option, text]) => (
              <button
                key={option}
                onClick={() => handleAnswerSelect(option)}
                disabled={submitted}
                className={`w-full p-4 border-2 rounded-lg text-left transition-all duration-200 flex items-center justify-between ${getOptionButtonClass(option)}`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-lg">{option}.</span>
                  <span>{String(text)}</span>
                </div>
                {getOptionIcon(option)}
              </button>
            ))}

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

        {/* Explanation Section */}
        {submitted && (
          <Card className="mb-6 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-medium text-gray-900 flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Detailed Explanation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(currentQuestion.explanation).map(([option, explanation]) => (
                <div key={option} className="border-l-4 border-gray-200 pl-4">
                  <div className="flex items-start gap-2">
                    <Badge 
                      variant={option === currentQuestion.answer ? "default" : "secondary"}
                      className="mt-1"
                    >
                      {option}
                    </Badge>
                    <p className="text-gray-700 leading-relaxed">{String(explanation)}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
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

        {/* Mnemonic Section */}
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
                <p className="text-gray-800 font-medium">{currentQuestion.mnemonic}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Clinical Guidelines Links */}
        {submitted && (
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-medium text-gray-900 flex items-center gap-2">
                <ExternalLink className="w-5 h-5" />
                Clinical Guidelines
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <a
                  href={currentQuestion.links.NICE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-900">NICE</span>
                  <ExternalLink className="w-4 h-4 text-gray-500" />
                </a>
                <a
                  href={currentQuestion.links["NHS BNF"]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-900">NHS BNF</span>
                  <ExternalLink className="w-4 h-4 text-gray-500" />
                </a>
                <a
                  href={currentQuestion.links["BMJ UTI"]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-900">BMJ UTI</span>
                  <ExternalLink className="w-4 h-4 text-gray-500" />
                </a>
                <a
                  href={currentQuestion.links["Gov UK"]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-900">Gov UK</span>
                  <ExternalLink className="w-4 h-4 text-gray-500" />
                </a>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}