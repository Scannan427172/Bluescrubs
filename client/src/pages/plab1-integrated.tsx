import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Clock, CheckCircle, XCircle, BookOpen, Target, Brain, 
  ArrowRight, ArrowLeft, RotateCcw, Award, TrendingUp, Home, Globe, Languages, Trophy, Crown, Medal
} from "lucide-react";
import { COMPREHENSIVE_FLASHCARD_COLLECTION, FLASHCARD_STATS, type Flashcard } from "@shared/high-yield-flashcards";
import { useQuery } from "@tanstack/react-query";
import { useI18n } from "@/hooks/useI18n";

// Simple leaderboard component with guaranteed readable text
const SimpleLeaderboard = () => {
  const { data: globalScoreboard, isLoading } = useQuery({
    queryKey: ["/api/scoreboard/global"],
    refetchInterval: 30000,
  });

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-16 bg-gray-100 rounded-lg animate-pulse"></div>
        ))}
      </div>
    );
  }

  if (!globalScoreboard || !Array.isArray(globalScoreboard) || globalScoreboard.length === 0) {
    return (
      <div className="text-center py-8 text-gray-600">
        No leaderboard data available
      </div>
    );
  }

  const getRankIcon = (index: number) => {
    if (index === 0) return <Crown className="w-6 h-6 text-yellow-500" />;
    if (index === 1) return <Medal className="w-6 h-6 text-gray-400" />;
    if (index === 2) return <Award className="w-6 h-6 text-amber-600" />;
    return <span className="text-lg font-bold text-gray-700">#{index + 1}</span>;
  };

  return (
    <div className="space-y-3">
      {globalScoreboard.slice(0, 10).map((user: any, index: number) => (
        <div
          key={user.id}
          className={`p-4 rounded-lg border ${
            index < 3 ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200' : 'bg-white border-gray-200'
          } hover:shadow-md transition-shadow`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="flex items-center justify-center w-10 h-10 flex-shrink-0">
                {getRankIcon(index)}
              </div>
              
              <div className="flex flex-col min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-black truncate">{user.username}</span>
                  <Badge variant="outline" className="text-xs flex-shrink-0">
                    {user.plabCategory?.toUpperCase() || 'PLAB1'}
                  </Badge>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-700">
                  <span>{user.flagEmoji || '🌍'}</span>
                  <span className="truncate">{user.city || 'Unknown'}, {user.country || 'Unknown'}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end gap-1 flex-shrink-0 ml-3">
              <div className="text-xl font-bold text-blue-700">{user.totalScore?.toLocaleString() || '0'}</div>
              <div className="text-sm font-semibold text-green-700">{user.accuracyRate || 0}%</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};


// Official PLAB 1 Categories - No separate specialties, all integrated
const PLAB1_CATEGORIES = [
  "Medicine",
  "Surgery", 
  "Obstetrics & Gynaecology",
  "Paediatrics",
  "Psychiatry",
  "ENT, Ophthalmology, and Orthopaedics",
  "Medical ethics, law, and professionalism",
  "Emergency care",
  "Prescribing and drug interactions"
];

// Convert flashcards to PLAB 1 questions format
const generatePLAB1Questions = (category: string) => {
  return COMPREHENSIVE_FLASHCARD_COLLECTION
    .filter(card => card.category === category)
    .slice(0, 200) // Increased limit to show more questions
    .map((card, index) => ({
      id: `${category.toLowerCase().replace(/[^a-z]/g, '')}_${index + 1}`,
      category: category,
      stem: card.front.text,
      options: [
        card.back.text,
        ...card.back.keyPoints.slice(0, 3)
      ].slice(0, 4),
      correctAnswer: 0,
      explanation: card.back.explanation,
      difficulty: card.difficulty,
      tags: card.tags
    }));
};

// Calculate question counts for each category
const getCategoryQuestionCounts = () => {
  const counts: Record<string, number> = {};
  PLAB1_CATEGORIES.forEach(category => {
    counts[category] = COMPREHENSIVE_FLASHCARD_COLLECTION.filter(card => card.category === category).length;
  });
  return counts;
};

const categoryQuestionCounts = getCategoryQuestionCounts();

// Supported languages for international medical graduates
const SUPPORTED_LANGUAGES = {
  en: { name: "English", flag: "🇬🇧", code: "EN" },
  ar: { name: "Arabic", flag: "🇸🇦", code: "عربي" },
  ur: { name: "Urdu", flag: "🇵🇰", code: "اردو" },
  hi: { name: "Hindi", flag: "🇮🇳", code: "हिंदी" },
  bn: { name: "Bengali", flag: "🇧🇩", code: "বাংলা" },
  fr: { name: "French", flag: "🇫🇷", code: "FR" },
  es: { name: "Spanish", flag: "🇪🇸", code: "ES" },
  pt: { name: "Portuguese", flag: "🇵🇹", code: "PT" },
  de: { name: "German", flag: "🇩🇪", code: "DE" },
  ru: { name: "Russian", flag: "🇷🇺", code: "RU" },
  zh: { name: "Chinese", flag: "🇨🇳", code: "中文" },
  ja: { name: "Japanese", flag: "🇯🇵", code: "日本語" },
  ko: { name: "Korean", flag: "🇰🇷", code: "한국어" },
  tr: { name: "Turkish", flag: "🇹🇷", code: "TR" },
  fa: { name: "Persian", flag: "🇮🇷", code: "فارسی" },
  sw: { name: "Swahili", flag: "🇰🇪", code: "SW" },
  yo: { name: "Yoruba", flag: "🇳🇬", code: "YO" },
  ha: { name: "Hausa", flag: "🇳🇬", code: "HA" },
  am: { name: "Amharic", flag: "🇪🇹", code: "አማርኛ" },
  ta: { name: "Tamil", flag: "🇮🇳", code: "தமிழ்" },
};

// Medical terminology translations for multiple languages
const MEDICAL_TRANSLATIONS: Record<string, Record<string, string>> = {
  ar: {
    "heart": "قلب", "patient": "مريض", "diagnosis": "تشخيص", "treatment": "علاج",
    "symptoms": "أعراض", "blood pressure": "ضغط الدم", "chest pain": "ألم في الصدر",
    "shortness of breath": "ضيق في التنفس", "fever": "حمى", "headache": "صداع",
    "What is the": "ما هو", "Which of the following": "أي مما يلي",
    "The most likely": "الأكثر احتمالا", "best treatment": "أفضل علاج",
    "Explanation": "شرح", "crushing central dolour thoracique radiating": "ألم صدري مركزي ضاغط ينتشر",
    "to left arm and jaw": "إلى الذراع الأيسر والفك", "ECG shows ST elevation": "تخطيط القلب يظهر ارتفاع ST",
    "leads II, III, aVF": "المشاوير II، III، aVF", "diagnostic and immediate management": "التشخيص والعلاج الفوري",
    "Inferior STEMI": "احتشاء عضلة القلب السفلي", "Primary PCI within 90 minutes": "التدخل التاجي الأولي خلال 90 دقيقة",
    "thrombolysis within 30 minutes": "إذابة الجلطة خلال 30 دقيقة", "Inferior leads": "المشاوير السفلية",
    "Usually RCA occlusion": "عادة انسداد الشريان التاجي الأيمن", "preferred": "مفضل"
  },
  ur: {
    "heart": "دل", "patient": "مریض", "diagnosis": "تشخیص", "treatment": "علاج",
    "symptoms": "علامات", "blood pressure": "بلڈ پریشر", "chest pain": "سینے میں درد",
    "fever": "بخار", "headache": "سر درد", "What is the": "کیا ہے",
    "Which of the following": "مندرجہ ذیل میں سے کون سا", "Explanation": "وضاحت"
  },
  hi: {
    "heart": "हृदय", "patient": "रोगी", "diagnosis": "निदान", "treatment": "इलाज",
    "symptoms": "लक्षण", "blood pressure": "रक्तचाप", "chest pain": "छाती में दर्द",
    "fever": "बुखार", "headache": "सिरदर्द", "What is the": "क्या है",
    "Which of the following": "निम्नलिखित में से कौन सा", "Explanation": "व्याख्या"
  },
  bn: {
    "heart": "হৃদয়", "patient": "রোগী", "diagnosis": "নির্ণয়", "treatment": "চিকিৎসা",
    "symptoms": "উপসর্গ", "blood pressure": "রক্তচাপ", "fever": "জ্বর",
    "headache": "মাথাব্যথা", "What is the": "কি", "Explanation": "ব্যাখ্যা"
  },
  fr: {
    "heart": "cœur", "patient": "patient", "diagnosis": "diagnostic", "treatment": "traitement",
    "symptoms": "symptômes", "blood pressure": "tension artérielle", "chest pain": "douleur thoracique",
    "fever": "fièvre", "headache": "mal de tête", "What is the": "Qu'est-ce que",
    "Which of the following": "Lequel des suivants", "Explanation": "Explication",
    "crushing central dolour thoracique radiating": "douleur thoracique centrale écrasante irradiant",
    "to left arm and jaw": "vers le bras gauche et la mâchoire", "ECG shows ST elevation": "ECG montre une élévation du ST",
    "leads II, III, aVF": "dérivations II, III, aVF", "diagnostic and immediate management": "diagnostic et prise en charge immédiate",
    "Inferior STEMI": "STEMI inférieur", "Primary PCI within 90 minutes": "ICP primaire dans les 90 minutes",
    "thrombolysis within 30 minutes": "thrombolyse dans les 30 minutes", "Inferior leads": "Dérivations inférieures",
    "Usually RCA occlusion": "Généralement occlusion de l'artère coronaire droite", "preferred": "préféré"
  },
  es: {
    "heart": "corazón", "patient": "paciente", "diagnosis": "diagnóstico", "treatment": "tratamiento",
    "symptoms": "síntomas", "blood pressure": "presión arterial", "chest pain": "dolor en el pecho",
    "fever": "fiebre", "headache": "dolor de cabeza", "What is the": "¿Cuál es",
    "Which of the following": "¿Cuál de los siguientes", "Explanation": "Explicación",
    "crushing central dolour thoracique radiating": "dolor torácico central aplastante que irradia",
    "to left arm and jaw": "al brazo izquierdo y mandíbula", "ECG shows ST elevation": "ECG muestra elevación del ST",
    "leads II, III, aVF": "derivaciones II, III, aVF", "diagnostic and immediate management": "diagnóstico y manejo inmediato",
    "Inferior STEMI": "STEMI inferior", "Primary PCI within 90 minutes": "ICP primario dentro de 90 minutos",
    "thrombolysis within 30 minutes": "trombólisis dentro de 30 minutos", "Inferior leads": "Derivaciones inferiores",
    "Usually RCA occlusion": "Usualmente oclusión de ACD", "preferred": "preferido"
  }
};

// Translation function supporting multiple languages
const translateText = (text: string, targetLang: string): string => {
  if (targetLang === "en") return text;
  
  const translations = MEDICAL_TRANSLATIONS[targetLang] || {};
  let translated = text;
  
  Object.entries(translations).forEach(([english, native]) => {
    translated = translated.replace(new RegExp(english, 'gi'), native);
  });
  
  return translated;
};

export default function PLAB1Integrated() {
  const { currentLanguage, translateText } = useI18n();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [sessionStarted, setSessionStarted] = useState(false);

  // Generate questions based on selected category
  const questions = selectedCategory === "all" 
    ? PLAB1_CATEGORIES.flatMap(cat => generatePLAB1Questions(cat)).slice(0, 200)
    : generatePLAB1Questions(selectedCategory);

  const currentQuestion = questions[currentQuestionIndex];

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive) {
      interval = setInterval(() => {
        setTimeElapsed(time => time + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (showExplanation) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    
    // Start timer on first question submission
    if (!sessionStarted) {
      setSessionStarted(true);
      setIsActive(true);
    }
    
    setUserAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: selectedAnswer
    }));
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      // Stop timer when reaching the last question
      setIsActive(false);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setSelectedAnswer(userAnswers[questions[currentQuestionIndex - 1].id] || null);
      setShowExplanation(!!userAnswers[questions[currentQuestionIndex - 1].id]);
    }
  };

  const getScore = () => {
    const answered = Object.keys(userAnswers).length;
    const correct = Object.entries(userAnswers).filter(([questionId, answer]) => {
      const question = questions.find(q => q.id === questionId);
      return question && answer === question.correctAnswer;
    }).length;
    return { answered, correct, total: questions.length };
  };

  const score = getScore();

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">PLAB 1 Practice</h1>
          <p className="text-gray-700">Select a category to begin practice</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">PLAB 1 Practice</h1>
          <p className="text-gray-700 font-medium">Practice questions based on GMC Medical Licensing Assessment guidelines</p>
        </div>

        {/* Practice Configuration */}
        <Card className="mb-6 bg-white shadow-lg">
          <CardHeader className="bg-white">
            <CardTitle className="text-gray-900">Practice Configuration</CardTitle>
          </CardHeader>
          <CardContent className="bg-white">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category" className="mb-2 block text-gray-700 font-medium">Category</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="bg-white border-gray-300 text-gray-900">
                    <SelectValue placeholder="Select category" className="text-gray-900" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-300">
                    <SelectItem value="all" className="text-gray-900 hover:bg-gray-100">
                      <div className="flex justify-between items-center w-full">
                        <span className="text-gray-900">All Categories</span>
                        <Badge variant="secondary" className="ml-2 bg-blue-100 text-blue-800">{COMPREHENSIVE_FLASHCARD_COLLECTION.length}</Badge>
                      </div>
                    </SelectItem>
                    {PLAB1_CATEGORIES.map(category => (
                      <SelectItem key={category} value={category} className="text-gray-900 hover:bg-gray-100">
                        <div className="flex justify-between items-center w-full">
                          <span className="truncate text-gray-900">{category}</span>
                          <Badge variant="outline" className="ml-2 border-gray-300 text-gray-700">{categoryQuestionCounts[category] || 0}</Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-end gap-2">
                <Button 
                  onClick={() => setIsActive(!isActive)}
                  variant={isActive ? "destructive" : "default"}
                >
                  {isActive ? 'Pause' : 'Start'} Timer
                </Button>
                <Button 
                  onClick={() => {
                    setTimeElapsed(0);
                    setCurrentQuestionIndex(0);
                    setUserAnswers({});
                    setSelectedAnswer(null);
                    setShowExplanation(false);
                  }}
                  variant="outline"
                >
                  Reset
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Question */}
        <Card className="mb-6 bg-white shadow-lg">
          <CardHeader className="bg-white">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">{currentQuestion.category}</Badge>
                <Badge className={
                  currentQuestion.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                  currentQuestion.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }>
                  {currentQuestion.difficulty}
                </Badge>
              </div>
              
              {/* Language indicator - controlled by header toggle */}
              <div className="flex items-center gap-1 bg-gray-50 rounded-lg p-1">
                <div className="px-2 py-1 text-xs text-gray-600">
                  Language: {currentLanguage === 'en' ? '🇬🇧 EN' : `🌐 ${currentLanguage.toUpperCase()}`}
                </div>
              </div>
            </div>
            <CardTitle className="text-xl leading-relaxed text-gray-900">
              {currentLanguage === "en" ? (
                currentQuestion.stem
              ) : (
                <div className="space-y-2">
                  <div className="text-gray-900">{currentQuestion.stem}</div>
                  <div className="text-gray-600 text-base font-normal italic">{translateText(currentQuestion.stem, currentLanguage)}</div>
                </div>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="bg-white">
            <RadioGroup value={selectedAnswer?.toString()} onValueChange={(value) => handleAnswerSelect(parseInt(value))}>
              {currentQuestion.options.map((option, index) => (
                <div key={index} className={`flex items-center space-x-2 p-3 rounded-lg border transition-colors ${
                  showExplanation
                    ? index === currentQuestion.correctAnswer
                      ? 'bg-green-50 border-green-200'
                      : selectedAnswer === index && index !== currentQuestion.correctAnswer
                      ? 'bg-red-50 border-red-200'
                      : 'bg-gray-50'
                    : selectedAnswer === index
                    ? 'bg-blue-50 border-blue-200'
                    : 'hover:bg-gray-50'
                }`}>
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer text-gray-900 font-medium">
                    {currentLanguage === "en" ? (
                      `${String.fromCharCode(65 + index)}. ${option}`
                    ) : (
                      <div className="space-y-1">
                        <div>{String.fromCharCode(65 + index)}. {option}</div>
                        <div className="text-gray-600 text-sm font-normal italic ml-4">{translateText(option, currentLanguage)}</div>
                      </div>
                    )}
                  </Label>
                  {showExplanation && index === currentQuestion.correctAnswer && (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  )}
                  {showExplanation && selectedAnswer === index && index !== currentQuestion.correctAnswer && (
                    <XCircle className="w-5 h-5 text-red-600" />
                  )}
                </div>
              ))}
            </RadioGroup>

            {showExplanation && (
              <div className="mt-6 p-4 bg-white border-l-4 border-blue-500 rounded-lg shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-2">
                  {currentLanguage === "en" ? 'Explanation' : `Explanation / ${translateText('Explanation', currentLanguage)}`}
                </h4>
                {currentLanguage === "en" ? (
                  <p className="text-gray-800 leading-relaxed">{currentQuestion.explanation}</p>
                ) : (
                  <div className="space-y-3">
                    <p className="text-gray-800 leading-relaxed">{currentQuestion.explanation}</p>
                    <p className="text-gray-600 leading-relaxed italic border-l-2 border-gray-300 pl-3">{translateText(currentQuestion.explanation, currentLanguage)}</p>
                  </div>
                )}
                {currentQuestion.tags && currentQuestion.tags.length > 0 && (
                  <div className="mt-3">
                    <p className="text-sm font-medium text-gray-900 mb-1">Tags:</p>
                    <div className="flex flex-wrap gap-1">
                      {currentQuestion.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs border-gray-300 text-gray-700">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
            variant="outline"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          <div className="flex gap-2">
            {!showExplanation ? (
              <Button
                onClick={handleSubmitAnswer}
                disabled={selectedAnswer === null}
              >
                Submit Answer
              </Button>
            ) : (
              <Button
                onClick={handleNextQuestion}
                disabled={currentQuestionIndex === questions.length - 1}
              >
                Next Question
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>

        {/* Progress and Stats */}
        <div className="grid md:grid-cols-4 gap-4 mt-6 mb-6">
          <Card className="bg-white shadow-lg">
            <CardContent className="pt-6 bg-white">
              <div className="text-2xl font-bold text-blue-600">{currentQuestionIndex + 1}</div>
              <p className="text-sm text-gray-700">of {questions.length}</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-lg">
            <CardContent className="pt-6 bg-white">
              <div className="text-2xl font-bold text-green-600">{score.correct}</div>
              <p className="text-sm text-gray-700">Correct</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-lg">
            <CardContent className="pt-6 bg-white">
              <div className="text-2xl font-bold text-orange-600">
                {score.answered > 0 ? Math.round((score.correct / score.answered) * 100) : 0}%
              </div>
              <p className="text-sm text-gray-700">Accuracy</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-lg">
            <CardContent className="pt-6 bg-white">
              <div className="text-2xl font-bold text-purple-600">{formatTime(timeElapsed)}</div>
              <p className="text-sm text-gray-700">Time</p>
            </CardContent>
          </Card>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <Progress value={(currentQuestionIndex / questions.length) * 100} className="h-2" />
        </div>

        {/* Final Results */}
        {currentQuestionIndex === questions.length - 1 && showExplanation && (
          <Card className="mt-6 bg-white shadow-lg">
            <CardHeader className="bg-white">
              <CardTitle className="flex items-center gap-2 text-gray-900">
                <Award className="w-6 h-6 text-yellow-500" />
                Practice Complete!
              </CardTitle>
            </CardHeader>
            <CardContent className="bg-white">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{score.correct}/{score.total}</div>
                  <p className="text-gray-700">Questions Correct</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">
                    {Math.round((score.correct / score.total) * 100)}%
                  </div>
                  <p className="text-gray-700">Overall Accuracy</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">{formatTime(timeElapsed)}</div>
                  <p className="text-gray-700">Total Time</p>
                </div>
              </div>
              
              <div className="mt-4">
                <Progress value={(score.correct / score.total) * 100} className="h-3" />
                <p className="text-center mt-2 text-sm text-gray-700 font-medium">
                  {score.correct / score.total >= 0.7 ? 'Excellent work! You\'re ready for PLAB 1.' :
                   score.correct / score.total >= 0.5 ? 'Good progress! Keep practicing to improve.' :
                   'More practice needed. Focus on weak areas.'}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Top 10 Global Leaderboard */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-6 h-6 text-yellow-600" />
                  Top 10 Global Leaders
                </CardTitle>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => window.location.href = '/global-scoreboard'}
                  className="gap-2"
                >
                  <Globe className="w-4 h-4" />
                  View Full Globe
                </Button>
              </div>
              <CardDescription>
                See how you rank against medical students worldwide
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SimpleLeaderboard />
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}