import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { 
  Clock, CheckCircle, XCircle, BookOpen, Target, Brain, 
  ArrowRight, ArrowLeft, RotateCcw, Award, TrendingUp, Home, Globe, Languages, ExternalLink, Volume2, Lightbulb, Plus
} from "lucide-react";
import plab1BgImage from '@assets/458CC7DF-D6D7-4BAD-85F5-99EEBD33ECD9_1750366142331.png';

export default function PLAB1New() {
  // Hero image loading state
  const [heroImageLoaded, setHeroImageLoaded] = useState(false);
  
  // Preload hero image for faster loading
  useEffect(() => {
    const img = new Image();
    img.onload = () => setHeroImageLoaded(true);
    img.src = plab1BgImage;
  }, []);

  // Translation state
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isTranslationMode, setIsTranslationMode] = useState(false);
  const [translateQuestions, setTranslateQuestions] = useState(false);
  
  // Text-to-Speech state
  const [speechEnabled, setSpeechEnabled] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState<string>('');
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  // Session state
  const [sessionStarted, setSessionStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [showExplanation, setShowExplanation] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [sessionComplete, setSessionComplete] = useState(false);
  
  // Stopwatch and timing state
  const [questionTimer, setQuestionTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [questionTimes, setQuestionTimes] = useState<number[]>([]);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  
  // Leaderboard state
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [leaderboardData, setLeaderboardData] = useState<Array<{
    rank: number;
    name: string;
    score: number;
    time: number;
    accuracy: number;
    category: string;
    date: string;
  }>>([]);

  // Initialize available voices on component mount
  useEffect(() => {
    const loadVoices = () => {
      const voices = speechSynthesis.getVoices();
      if (voices.length > 0) {
        const englishVoices = voices.filter(voice => 
          voice.lang.startsWith('en') && 
          !voice.name.toLowerCase().includes('robot') &&
          !voice.name.toLowerCase().includes('synthetic')
        );
        setAvailableVoices(englishVoices.length > 0 ? englishVoices : voices.slice(0, 5));
        if (englishVoices.length > 0 && !selectedVoice) {
          // Prefer female voices or voices with natural names
          const preferredVoice = englishVoices.find(voice => 
            voice.name.toLowerCase().includes('female') ||
            voice.name.toLowerCase().includes('samantha') ||
            voice.name.toLowerCase().includes('kate') ||
            voice.name.toLowerCase().includes('susan')
          ) || englishVoices[0];
          setSelectedVoice(preferredVoice.name);
        }
      }
    };

    loadVoices();
    speechSynthesis.addEventListener('voiceschanged', loadVoices);
    
    return () => {
      speechSynthesis.removeEventListener('voiceschanged', loadVoices);
    };
  }, [selectedVoice]);

  // Timer effects
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setQuestionTimer(prev => prev + 100);
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  // Start timer when new question is shown
  useEffect(() => {
    if (sessionStarted && !showExplanation) {
      setQuestionTimer(0);
      setIsTimerRunning(true);
    } else {
      setIsTimerRunning(false);
    }
  }, [currentQuestionIndex, sessionStarted, showExplanation]);

  // Mock leaderboard data (replace with real API calls)
  useEffect(() => {
    const mockLeaderboard = [
      { rank: 1, name: "Dr. Sarah Chen", score: 2450, time: 1245000, accuracy: 98, category: "All", date: "2024-06-13" },
      { rank: 2, name: "Dr. Ahmed Hassan", score: 2380, time: 1320000, accuracy: 96, category: "Cardiology", date: "2024-06-12" },
      { rank: 3, name: "Dr. Priya Sharma", score: 2320, time: 1410000, accuracy: 94, category: "All", date: "2024-06-11" },
      { rank: 4, name: "Dr. James Wilson", score: 2290, time: 1480000, accuracy: 93, category: "Neurology", date: "2024-06-10" },
      { rank: 5, name: "Dr. Maria Rodriguez", score: 2250, time: 1520000, accuracy: 91, category: "All", date: "2024-06-09" },
      { rank: 6, name: "Dr. Raj Patel", score: 2210, time: 1580000, accuracy: 90, category: "Surgery", date: "2024-06-08" },
      { rank: 7, name: "Dr. Emily Johnson", score: 2180, time: 1620000, accuracy: 89, category: "Respiratory", date: "2024-06-07" },
      { rank: 8, name: "Dr. Omar Al-Mansouri", score: 2150, time: 1680000, accuracy: 88, category: "All", date: "2024-06-06" },
      { rank: 9, name: "Dr. Lisa Thompson", score: 2120, time: 1720000, accuracy: 87, category: "Psychiatry", date: "2024-06-05" },
      { rank: 10, name: "Dr. Michael Brown", score: 2090, time: 1760000, accuracy: 86, category: "All", date: "2024-06-04" }
    ];
    setLeaderboardData(mockLeaderboard);
  }, []);

  // Text-to-Speech functions with natural speech settings
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
    utterance.rate = selectedLanguage === 'ar' || selectedLanguage === 'ur' ? 0.8 : 0.85; // Slower for RTL languages
    utterance.pitch = 1.1; // Slightly higher pitch for medical content clarity
    utterance.volume = 0.9; // Higher volume for clarity
    
    // Add natural pauses for medical terms
    const processedText = text
      .replace(/\./g, '. ') // Add pause after periods
      .replace(/,/g, ', ') // Add pause after commas
      .replace(/:/g, ': ') // Add pause after colons
      .replace(/;/g, '; ') // Add pause after semicolons
      .replace(/\s+/g, ' ') // Clean up extra spaces
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

  const speakCurrentQuestion = () => {
    if (currentQuestion) {
      // Get translated question and options if available
      const cacheKey = `${currentQuestion.id}_${selectedLanguage}`;
      const translatedQ = translatedQuestions[cacheKey];
      
      let questionText = currentQuestion.stem || currentQuestion.question;
      let options = Array.isArray(currentQuestion.options) ? currentQuestion.options : [];
      
      // Use translated content if available
      if (translateQuestions && selectedLanguage !== 'en' && translatedQ) {
        questionText = translatedQ.scenario || translatedQ.stem || translatedQ.question || questionText;
        options = translatedQ.options || options;
      }
      
      const optionsText = options.map((option: string, index: number) => 
        `Option ${String.fromCharCode(65 + index)}: ${option}`
      ).join('. ');
      
      const fullText = `${questionText}. The options are: ${optionsText}`;
      speakText(fullText);
    }
  };
  
  // AI Question Generation
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('intermediate');
  const [isGeneratingQuestions, setIsGeneratingQuestions] = useState(false);
  const [generatedQuestions, setGeneratedQuestions] = useState<any[]>([]);
  const [isBulkGenerating, setIsBulkGenerating] = useState(false);
  const [bulkProgress, setBulkProgress] = useState<{
    completed: number;
    total: number;
    currentCategory: string;
  } | null>(null);

  // Function to provide targeted explanations based on user's answer
  const getTargetedExplanation = (question: any, userAnswer: string, isCorrect: boolean): string => {
    if (!question.explanation) return 'Clinical explanation provided for educational purposes.';
    
    const explanation = question.explanation;
    const userAnswerIndex = parseInt(userAnswer);
    const correctAnswerIndex = question.correctAnswer;
    
    if (isCorrect) {
      // User got it right - show why their answer is correct
      const lines = explanation.split('\n');
      const correctLine = lines.find((line: string) => 
        line.includes(`Option ${String.fromCharCode(65 + correctAnswerIndex)}`) && 
        line.includes('CORRECT')
      );
      
      if (correctLine) {
        const cleanExplanation = correctLine.replace(/Option [A-E] \([^)]+\) is CORRECT because/, '').trim();
        return `✓ Your answer is correct. ${cleanExplanation}`;
      }
      
      return '✓ Correct! ' + explanation.split('\n')[0];
    } else {
      // User got it wrong - explain why their choice is wrong AND why correct answer is right
      const lines = explanation.split('\n');
      let feedback = '';
      
      // Find why user's answer is wrong
      const wrongLine = lines.find((line: string) => 
        line.includes(`Option ${String.fromCharCode(65 + userAnswerIndex)}`) && 
        line.includes('INCORRECT')
      );
      
      if (wrongLine) {
        const cleanWrongExplanation = wrongLine.replace(/Option [A-E] \([^)]+\) is INCORRECT because/, '').trim();
        feedback += `✗ Your choice (${String.fromCharCode(65 + userAnswerIndex)}) is incorrect because ${cleanWrongExplanation}\n\n`;
      }
      
      // Find why correct answer is right
      const correctLine = lines.find((line: string) => 
        line.includes(`Option ${String.fromCharCode(65 + correctAnswerIndex)}`) && 
        line.includes('CORRECT')
      );
      
      if (correctLine) {
        const cleanCorrectExplanation = correctLine.replace(/Option [A-E] \([^)]+\) is CORRECT because/, '').trim();
        feedback += `✓ The correct answer (${String.fromCharCode(65 + correctAnswerIndex)}) is right because ${cleanCorrectExplanation}`;
      }
      
      return feedback || explanation;
    }
  };

  // Simple translation function
  const translateText = (text: string) => {
    if (!isTranslationMode || selectedLanguage === 'en') return text;
    
    const translations: Record<string, Record<string, string>> = {
      'ar': {
        'PLAB 1 Practice': 'ممارسة PLAB 1',
        'Quick Practice': 'ممارسة سريعة',
        'Standard Quiz': 'اختبار قياسي',
        'PLAB 1 Mock': 'محاكاة PLAB 1',
        'Comprehensive': 'شامل',
        'questions': 'أسئلة',
        'Submit Answer': 'إرسال الإجابة',
        'Next Question': 'السؤال التالي',
        'Complete Session': 'إكمال الجلسة',
        'Correct!': 'صحيح!',
        'Incorrect.': 'غير صحيح.',
        'Reference:': 'مرجع:',
        'Study Tip': 'نصيحة دراسية'
      },
      'hi': {
        'PLAB 1 Practice': 'PLAB 1 अभ्यास',
        'Quick Practice': 'त्वरित अभ्यास',
        'Standard Quiz': 'मानक प्रश्नोत्तरी',
        'PLAB 1 Mock': 'PLAB 1 मॉक',
        'Comprehensive': 'व्यापक',
        'questions': 'प्रश्न',
        'Submit Answer': 'उत्तर जमा करें',
        'Next Question': 'अगला प्रश्न',
        'Complete Session': 'सत्र पूरा करें',
        'Correct!': 'सही!',
        'Incorrect.': 'गलत।',
        'Reference:': 'संदर्भ:',
        'Study Tip': 'अध्ययन युक्ति'
      },
      'ur': {
        'PLAB 1 Practice': 'PLAB 1 پریکٹس',
        'Quick Practice': 'فوری پریکٹس',
        'Standard Quiz': 'معیاری کوئز',
        'PLAB 1 Mock': 'PLAB 1 موک',
        'Comprehensive': 'جامع',
        'questions': 'سوالات',
        'Submit Answer': 'جواب جمع کریں',
        'Next Question': 'اگلا سوال',
        'Complete Session': 'سیشن مکمل کریں',
        'Correct!': 'درست!',
        'Incorrect.': 'غلط۔',
        'Reference:': 'حوالہ:',
        'Study Tip': 'مطالعہ کی تجویز'
      }
    };
    
    return translations[selectedLanguage]?.[text] || text;
  };

  // Function to translate medical question content using API
  const [translatedQuestions, setTranslatedQuestions] = useState<Record<string, any>>({});
  const [translationLoading, setTranslationLoading] = useState<Record<string, boolean>>({});

  const translateMedicalContent = async (text: string, questionId?: string) => {
    if (!translateQuestions || selectedLanguage === 'en') return text;
    
    // Return cached translation if available
    if (questionId && translatedQuestions[`${questionId}_${selectedLanguage}`]) {
      return translatedQuestions[`${questionId}_${selectedLanguage}`];
    }
    
    // Basic fallback translations for quick UI updates
    const quickTranslations: Record<string, Record<string, string>> = {
      'ar': {
        'patient': 'مريض', 'presents with': 'يعاني من', 'chest pain': 'ألم في الصدر',
        'diagnosis': 'التشخيص', 'treatment': 'العلاج', 'What is the most appropriate': 'ما هو الأنسب'
      },
      'hi': {
        'patient': 'मरीज़', 'presents with': 'के साथ आता है', 'chest pain': 'सीने में दर्द',
        'diagnosis': 'निदान', 'treatment': 'उपचार', 'What is the most appropriate': 'सबसे उपयुक्त क्या है'
      },
      'ur': {
        'patient': 'مریض', 'presents with': 'کے ساتھ آتا ہے', 'chest pain': 'سینے میں درد',
        'diagnosis': 'تشخیص', 'treatment': 'علاج', 'What is the most appropriate': 'سب سے مناسب کیا ہے'
      }
    };
    
    const fallbackTranslations = quickTranslations[selectedLanguage] || {};
    let translated = text;
    
    Object.entries(fallbackTranslations).forEach(([english, native]) => {
      translated = translated.replace(new RegExp(`\\b${english}\\b`, 'gi'), native);
    });
    
    return translated;
  };

  // Function to translate entire question object using fast instant translation
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
            scenario: question.scenario || question.stem,
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
        scenario: translated.scenario || question.scenario,
        stem: translated.scenario || translated.stem || question.stem,
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

  // Calculate question counts for comprehensive question bank
  const getQuestionCount = (category: string) => {
    const questionCounts: Record<string, number> = {
      'all': 5000,
      'cardiovascular': 450,
      'respiratory': 400,
      'gastroenterology': 350,
      'neurology': 300,
      'endocrinology': 280,
      'psychiatry': 260,
      'obstetrics-gynaecology': 300,
      'paediatrics': 320,
      'surgery': 380,
      'nephrology': 220,
      'haematology': 200,
      'infectious-diseases': 240,
      'rheumatology': 180,
      'dermatology': 160,
      'emergency-medicine': 350,
      'ethics-law': 150,
      'public-health': 140,
      'clinical-pharmacology': 160
    };
    
    return questionCounts[category] || 100;
  };

  // Available categories with question counts
  const availableCategories = [
    { value: 'all' as const, label: 'All Categories', count: getQuestionCount('all') },
    { value: 'cardiovascular' as const, label: 'Cardiovascular', count: getQuestionCount('cardiovascular') },
    { value: 'respiratory' as const, label: 'Respiratory', count: getQuestionCount('respiratory') },
    { value: 'gastroenterology' as const, label: 'Gastroenterology', count: getQuestionCount('gastroenterology') },
    { value: 'neurology' as const, label: 'Neurology', count: getQuestionCount('neurology') },
    { value: 'endocrinology' as const, label: 'Endocrinology', count: getQuestionCount('endocrinology') },
    { value: 'psychiatry' as const, label: 'Psychiatry', count: getQuestionCount('psychiatry') },
    { value: 'obstetrics-gynaecology' as const, label: 'Obstetrics & Gynaecology', count: getQuestionCount('obstetrics-gynaecology') },
    { value: 'paediatrics' as const, label: 'Paediatrics', count: getQuestionCount('paediatrics') },
    { value: 'surgery' as const, label: 'Surgery', count: getQuestionCount('surgery') },
    { value: 'nephrology' as const, label: 'Nephrology', count: getQuestionCount('nephrology') },
    { value: 'haematology' as const, label: 'Haematology', count: getQuestionCount('haematology') },
    { value: 'infectious-diseases' as const, label: 'Infectious Diseases', count: getQuestionCount('infectious-diseases') },
    { value: 'rheumatology' as const, label: 'Rheumatology', count: getQuestionCount('rheumatology') },
    { value: 'dermatology' as const, label: 'Dermatology', count: getQuestionCount('dermatology') },
    { value: 'emergency-medicine' as const, label: 'Emergency Medicine', count: getQuestionCount('emergency-medicine') },
    { value: 'ethics-law' as const, label: 'Ethics & Law', count: getQuestionCount('ethics-law') },
    { value: 'public-health' as const, label: 'Public Health', count: getQuestionCount('public-health') },
    { value: 'clinical-pharmacology' as const, label: 'Clinical Pharmacology', count: getQuestionCount('clinical-pharmacology') }
  ];

  // Generate AI questions
  const startPractice = async (questionCount: number) => {
    setIsGeneratingQuestions(true);
    setGeneratedQuestions([]);
    setSessionStarted(false);
    setShowExplanation(false);
    setCurrentQuestionIndex(0);
    
    try {
      const response = await fetch('/api/generate-questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category: selectedCategory,
          count: questionCount,
          difficulty: selectedDifficulty
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setGeneratedQuestions(data.questions || []);
        if (data.questions && data.questions.length > 0) {
          setSessionStarted(true);
          setQuestionStartTime(Date.now());
        }
      } else {
        console.error('Failed to generate questions');
      }
    } catch (error) {
      console.error('Error generating questions:', error);
    } finally {
      setIsGeneratingQuestions(false);
    }
  };

  // Bulk question generation function
  const generateBulkQuestions = async () => {
    setIsBulkGenerating(true);
    setBulkProgress({ completed: 0, total: 18, currentCategory: 'Starting...' });

    const categories = [
      'cardiovascular', 'respiratory', 'gastroenterology', 'neurology', 
      'endocrinology', 'psychiatry', 'obstetrics-gynaecology', 'paediatrics',
      'surgery', 'nephrology', 'haematology', 'infectious-diseases',
      'rheumatology', 'dermatology', 'emergency-medicine', 'ethics-law',
      'public-health', 'clinical-pharmacology'
    ];

    try {
      const response = await fetch('/api/generate-bulk-questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          categories,
          questionsPerCategory: Math.ceil(5000 / categories.length)
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(`Successfully generated ${data.totalGenerated} questions across ${data.categories} categories`);
        setBulkProgress({ completed: categories.length, total: categories.length, currentCategory: 'Complete!' });
      }
    } catch (error) {
      console.error('Bulk generation failed:', error);
    } finally {
      setIsBulkGenerating(false);
      setTimeout(() => setBulkProgress(null), 3000);
    }
  };

  // Handle answer selection
  const handleAnswerSelect = (answer: string) => {
    console.log('Answer selected:', answer, 'showExplanation:', showExplanation);
    if (!showExplanation) {
      setSelectedAnswer(answer);
      console.log('Selected answer set to:', answer);
    }
  };

  // Handle answer submission
  const handleSubmitAnswer = () => {
    if (selectedAnswer && !showExplanation) {
      const timeForQuestion = Date.now() - questionStartTime;
      setQuestionTimes(prev => [...prev, timeForQuestion]);
      setUserAnswers(prev => [...prev, selectedAnswer]);
      setTimeSpent(prev => prev + timeForQuestion);
      setShowExplanation(true);
      setIsTimerRunning(false);
    }
  };

  // Handle next question navigation
  const handleNextQuestion = () => {
    if (currentQuestionIndex < generatedQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer("");
      setShowExplanation(false);
      setQuestionStartTime(Date.now());
      setIsTimerRunning(true);
    } else {
      // Session complete - calculate final score and submit to leaderboard
      const totalTime = questionTimes.reduce((sum, time) => sum + time, 0);
      const correctAnswers = userAnswers.filter((answer, index) => 
        parseInt(answer) === generatedQuestions[index]?.correctAnswer
      ).length;
      const accuracy = Math.round((correctAnswers / generatedQuestions.length) * 100);
      const score = Math.round((correctAnswers * 100) + (accuracy * 10) - (totalTime / 1000));
      
      // Submit to leaderboard (mock implementation)
      submitToLeaderboard(score, totalTime, accuracy);
      setSessionComplete(true);
    }
  };



  // Format timer display
  const formatTime = (milliseconds: number) => {
    const seconds = Math.floor(milliseconds / 1000);
    const ms = Math.floor((milliseconds % 1000) / 10);
    return `${seconds}.${ms.toString().padStart(2, '0')}s`;
  };

  // Submit score to leaderboard
  const submitToLeaderboard = async (score: number, totalTime: number, accuracy: number) => {
    try {
      // Mock submission - replace with real API call
      console.log('Submitting to leaderboard:', { score, totalTime, accuracy, category: selectedCategory });
      // In real implementation, make API call to save score
    } catch (error) {
      console.error('Failed to submit score:', error);
    }
  };

  // Get current question
  const currentQuestion = generatedQuestions[currentQuestionIndex];
  const isCorrect = showExplanation && selectedAnswer !== "" && (() => {
    if (!currentQuestion) return false;
    let correctAnswerIndex = currentQuestion.correctAnswer;
    if (typeof correctAnswerIndex === 'string') {
      // Convert letter-based answers (A, B, C, D, E) to index
      correctAnswerIndex = correctAnswerIndex.charCodeAt(0) - 65;
    }
    return parseInt(selectedAnswer) === correctAnswerIndex;
  })();

  // Effect to translate current question when language changes
  useEffect(() => {
    if (currentQuestion && translateQuestions && selectedLanguage !== 'en') {
      translateFullQuestion(currentQuestion);
    }
  }, [currentQuestion, translateQuestions, selectedLanguage]);

  // If no session started, show the landing page
  if (!sessionStarted && !isGeneratingQuestions) {
    return (
      <div className="min-h-screen bg-gray-50 pb-24">
        {/* Hero Banner - Full Width */}
        <div className="relative bg-gradient-to-r from-blue-600 to-purple-700 w-full h-64 md:h-80 lg:h-96 mb-8 overflow-hidden">
            {!heroImageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-700">
                <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            <img 
              src={plab1BgImage}
              alt="PLAB 1 Practice"
              className={`absolute inset-0 w-full h-full object-cover opacity-60 transition-opacity duration-300 ${heroImageLoaded ? 'opacity-60' : 'opacity-0'}`}
              loading="eager"
              decoding="async"
              onLoad={() => setHeroImageLoaded(true)}
            />

            <div className="relative z-50 flex flex-col items-center justify-center text-center px-8 py-16 hero-text">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 drop-shadow-2xl leading-tight" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8), 0px 0px 8px rgba(0,0,0,0.6)'}}>
                {translateText('Master PLAB 1')}<br />
                {translateText('with AI')}
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl mb-6 drop-shadow-2xl leading-relaxed" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8), 0px 0px 8px rgba(0,0,0,0.6)'}}>
                {translateText('Authentic UK Comprehensive exam preparation')}
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  size="lg" 
                  className="bg-white text-blue-600 hover:bg-blue-50 font-semibold"
                  onClick={() => document.getElementById('practice-options')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <ArrowRight className="w-5 h-5 mr-2" />
                  {translateText('Start Practice Now')}
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                  onClick={() => document.getElementById('settings')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <Globe className="w-5 h-5 mr-2" />
                  {translateText('Settings & Languages')}
                </Button>
              </div>
            </div>
        </div>

        {/* Content Container */}
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{translateText('Choose Your Practice Mode')}</h2>
            <p className="text-lg text-gray-600">Tailored learning experience with multilingual support</p>
            
            {/* Language Toggle */}
            <div id="settings" className="flex items-center gap-4 mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <Globe className="w-4 h-4 text-blue-600" />
              <div className="flex items-center gap-3">
                <Switch
                  checked={isTranslationMode}
                  onCheckedChange={setIsTranslationMode}
                  className="data-[state=checked]:bg-blue-600"
                />
                <span className="text-sm font-medium text-blue-900">Translation Mode</span>
              </div>
              {isTranslationMode && (
                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  <SelectTrigger className="w-48 border-blue-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="max-h-72 overflow-y-auto">
                    <SelectItem value="en">🇬🇧 English</SelectItem>
                    <SelectItem value="ar">🇸🇦 العربية Arabic</SelectItem>
                    <SelectItem value="hi">🇮🇳 हिन्दी Hindi</SelectItem>
                    <SelectItem value="ur">🇵🇰 اردو Urdu</SelectItem>
                    <SelectItem value="bn">🇧🇩 বাংলা Bengali</SelectItem>
                    <SelectItem value="ta">🇮🇳 தமிழ் Tamil</SelectItem>
                    <SelectItem value="te">🇮🇳 తెలుగు Telugu</SelectItem>
                    <SelectItem value="gu">🇮🇳 ગુજરાતી Gujarati</SelectItem>
                    <SelectItem value="mr">🇮🇳 मराठी Marathi</SelectItem>
                    <SelectItem value="pa">🇮🇳 ਪੰਜਾਬੀ Punjabi</SelectItem>
                    <SelectItem value="kn">🇮🇳 ಕನ್ನಡ Kannada</SelectItem>
                    <SelectItem value="ml">🇮🇳 മലയാളം Malayalam</SelectItem>
                    <SelectItem value="es">🇪🇸 Español Spanish</SelectItem>
                    <SelectItem value="fr">🇫🇷 Français French</SelectItem>
                    <SelectItem value="de">🇩🇪 Deutsch German</SelectItem>
                    <SelectItem value="pt">🇵🇹 Português Portuguese</SelectItem>
                    <SelectItem value="it">🇮🇹 Italiano Italian</SelectItem>
                    <SelectItem value="ru">🇷🇺 Русский Russian</SelectItem>
                    <SelectItem value="zh">🇨🇳 简体中文 Chinese</SelectItem>
                    <SelectItem value="ja">🇯🇵 日本語 Japanese</SelectItem>
                    <SelectItem value="ko">🇰🇷 한국어 Korean</SelectItem>
                    <SelectItem value="th">🇹🇭 ไทย Thai</SelectItem>
                    <SelectItem value="vi">🇻🇳 Tiếng Việt Vietnamese</SelectItem>
                    <SelectItem value="id">🇮🇩 Bahasa Indonesia</SelectItem>
                    <SelectItem value="ms">🇲🇾 Bahasa Melayu</SelectItem>
                    <SelectItem value="tr">🇹🇷 Türkçe Turkish</SelectItem>
                    <SelectItem value="fa">🇮🇷 فارسی Persian</SelectItem>
                    <SelectItem value="he">🇮🇱 עברית Hebrew</SelectItem>
                    <SelectItem value="pl">🇵🇱 Polski Polish</SelectItem>
                    <SelectItem value="ro">🇷🇴 Română Romanian</SelectItem>
                    <SelectItem value="hu">🇭🇺 Magyar Hungarian</SelectItem>
                    <SelectItem value="cs">🇨🇿 Čeština Czech</SelectItem>
                    <SelectItem value="sk">🇸🇰 Slovenčina Slovak</SelectItem>
                    <SelectItem value="bg">🇧🇬 Български Bulgarian</SelectItem>
                    <SelectItem value="hr">🇭🇷 Hrvatski Croatian</SelectItem>
                    <SelectItem value="sr">🇷🇸 Српски Serbian</SelectItem>
                    <SelectItem value="uk">🇺🇦 Українська Ukrainian</SelectItem>
                    <SelectItem value="sw">🇰🇪 Kiswahili Swahili</SelectItem>
                    <SelectItem value="tl">🇵🇭 Filipino (Tagalog)</SelectItem>
                    <SelectItem value="am">🇪🇹 አማርኛ Amharic</SelectItem>
                    <SelectItem value="ti">🇪🇷 ትግርኛ Tigrinya</SelectItem>
                    <SelectItem value="lt">🇱🇹 Lietuvių Lithuanian</SelectItem>
                    <SelectItem value="lv">🇱🇻 Latviešu Latvian</SelectItem>
                    <SelectItem value="et">🇪🇪 Eesti Estonian</SelectItem>
                    <SelectItem value="nl">🇳🇱 Nederlands Dutch</SelectItem>
                    <SelectItem value="sv">🇸🇪 Svenska Swedish</SelectItem>
                    <SelectItem value="da">🇩🇰 Dansk Danish</SelectItem>
                    <SelectItem value="no">🇳🇴 Norsk Norwegian</SelectItem>
                    <SelectItem value="fi">🇫🇮 Suomi Finnish</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>
            
            {/* Voice Control Panel */}
            <div className="flex items-center gap-4 mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
              <Volume2 className="w-4 h-4 text-green-600" />
              <div className="flex items-center gap-3">
                <Switch
                  checked={speechEnabled}
                  onCheckedChange={setSpeechEnabled}
                  className="data-[state=checked]:bg-green-600"
                />
                <span className="text-sm font-medium text-green-900">Voice Reading</span>
              </div>
              {speechEnabled && (
                <div className="flex items-center gap-2">
                  <Select value={selectedVoice} onValueChange={setSelectedVoice}>
                    <SelectTrigger className="w-40 border-green-200">
                      <SelectValue placeholder="Select Voice" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableVoices.map((voice) => (
                        <SelectItem key={voice.name} value={voice.name}>
                          {voice.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {isSpeaking && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={stopSpeaking}
                      className="border-green-200 text-green-700 hover:bg-green-50"
                    >
                      Stop
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-gray-600">Total Questions</span>
                </div>
                <p className="text-2xl font-bold text-gray-900 mt-1">5,000</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-gray-600">Medical Specialties</span>
                </div>
                <p className="text-2xl font-bold text-gray-900 mt-1">18</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-purple-600" />
                  <span className="text-sm font-medium text-gray-600">AI Generated</span>
                </div>
                <p className="text-2xl font-bold text-gray-900 mt-1">100%</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-yellow-600" />
                  <span className="text-sm font-medium text-gray-600">PLAB Focused</span>
                </div>
                <p className="text-2xl font-bold text-gray-900 mt-1">Yes</p>
              </CardContent>
            </Card>
          </div>

          {/* Category Selection */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Select Practice Category</CardTitle>
              <CardDescription>Choose a medical specialty to focus your practice</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="category" className="text-sm font-medium mb-2 block">
                    Medical Specialty
                  </Label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableCategories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label} ({category.count} questions)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="difficulty" className="text-sm font-medium mb-2 block">
                    Difficulty Level
                  </Label>
                  <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="foundation">Foundation</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Practice Options */}
          <Card id="practice-options" className="mb-8">
            <CardHeader>
              <CardTitle>Start Practice Session</CardTitle>
              <CardDescription>Choose your practice format</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                <div 
                  onClick={() => startPractice(5)}
                  className={`bg-blue-600 hover:bg-blue-700 h-24 flex flex-col items-center justify-center gap-2 rounded-md cursor-pointer transition-colors practice-button-white ${isGeneratingQuestions ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <ArrowRight className="w-6 h-6" />
                  <span className="font-medium">{translateText('Quick Practice')}</span>
                  <span className="text-xs opacity-90">5 {translateText('questions')}</span>
                </div>

                <Button 
                  size="lg" 
                  onClick={() => startPractice(20)}
                  disabled={isGeneratingQuestions}
                  className="bg-purple-600 hover:bg-purple-700 text-white h-24 flex flex-col items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Brain className="w-6 h-6" />
                  <span className="font-medium">{translateText('Standard Quiz')}</span>
                  <span className="text-xs opacity-90">20 {translateText('questions')}</span>
                </Button>

                <Button 
                  size="lg" 
                  onClick={() => startPractice(50)}
                  disabled={isGeneratingQuestions}
                  className="bg-orange-600 hover:bg-orange-700 text-white h-24 flex flex-col items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Clock className="w-6 h-6" />
                  <span className="font-medium">{translateText('PLAB 1 Mock')}</span>
                  <span className="text-xs opacity-90">50 {translateText('questions')}</span>
                </Button>

                <Button 
                  size="lg" 
                  onClick={() => startPractice(100)}
                  disabled={isGeneratingQuestions}
                  className="bg-green-600 hover:bg-green-700 text-white h-24 flex flex-col items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Target className="w-6 h-6" />
                  <span className="font-medium">{translateText('Comprehensive')}</span>
                  <span className="text-xs opacity-90">100 {translateText('questions')}</span>
                </Button>
              </div>

              {/* Bulk Question Generation Section */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Build Complete Question Bank</h3>
                    <p className="text-sm text-gray-600">Generate comprehensive AI question database across all specialties</p>
                  </div>
                  <Button
                    onClick={generateBulkQuestions}
                    disabled={isBulkGenerating}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 disabled:opacity-50"
                  >
                    {isBulkGenerating ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 mr-2" />
                        Generate 5000 Questions
                      </>
                    )}
                  </Button>
                </div>
                
                {bulkProgress && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-blue-900">Generation Progress</span>
                      <span className="text-sm text-blue-700">{bulkProgress.completed}/{bulkProgress.total} categories</span>
                    </div>
                    <div className="w-full bg-blue-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(bulkProgress.completed / bulkProgress.total) * 100}%` }}
                      />
                    </div>
                    <p className="text-xs text-blue-600 mt-2">Current: {bulkProgress.currentCategory}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Loading state
  if (isGeneratingQuestions) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pb-24">
        <Card className="w-full max-w-md mb-16">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Generating AI Medical Questions</h3>
            <p className="text-gray-600">Creating personalized questions for {selectedCategory} practice...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Session complete
  if (sessionComplete) {
    const correctAnswers = generatedQuestions.filter((_, index) => {
      // This would need to track user answers properly
      return true; // Placeholder
    }).length;
    
    return (
      <div className="min-h-screen bg-gray-50 p-4 pb-24">
        <div className="max-w-4xl mx-auto mb-16">
          <Card>
            <CardContent className="p-8 text-center">
              <Award className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Session Complete!</h2>
              <p className="text-gray-600 mb-6">You've completed your practice session</p>
              
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-blue-600 font-medium">Questions Answered</p>
                  <p className="text-2xl font-bold text-blue-900">{generatedQuestions.length}</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <p className="text-green-600 font-medium">Time Spent</p>
                  <p className="text-2xl font-bold text-green-900">{Math.round(timeSpent / 1000 / 60)}m</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <p className="text-purple-600 font-medium">Category</p>
                  <p className="text-2xl font-bold text-purple-900 capitalize">{selectedCategory}</p>
                </div>
              </div>
              
              <div className="flex gap-4 justify-center">
                <Button onClick={() => window.location.reload()} className="bg-blue-600 hover:bg-blue-700">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Start New Session
                </Button>
                <Button variant="outline" onClick={() => setSessionStarted(false)}>
                  <Home className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Main question interface - Template Style Layout
  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-gray-600">No questions available</p>
            <Button onClick={() => setSessionStarted(false)} className="mt-4">
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 pb-24">
      <div className="max-w-4xl mx-auto mb-16">
        {/* Progress Header with Stopwatch */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <Badge variant="outline" className="text-sm">
              Question {currentQuestionIndex + 1} of {generatedQuestions.length}
            </Badge>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>{Math.round(timeSpent / 1000 / 60)}m total</span>
              </div>
              <div className={`flex items-center gap-2 text-sm font-mono ${isTimerRunning ? 'text-green-600' : 'text-gray-600'}`}>
                <div className={`w-2 h-2 rounded-full ${isTimerRunning ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
                <span>{formatTime(questionTimer)}</span>
              </div>
            </div>
          </div>
          <Progress 
            value={((currentQuestionIndex + 1) / generatedQuestions.length) * 100} 
            className="h-2"
          />
        </div>

        {/* Question Card */}
        <Card className="mb-6">
          <CardContent className="p-6">
            {/* Controls - Translation and Voice */}
            <div className="flex justify-between items-start mb-4 gap-4">
              {/* Translation Controls */}
              <div className="bg-gray-50 rounded-lg p-3 border">
                <div className="flex items-center gap-3">
                  <Languages className="w-4 h-4 text-blue-600" />
                  <Switch
                    checked={translateQuestions}
                    onCheckedChange={setTranslateQuestions}
                    className="data-[state=checked]:bg-blue-600"
                  />
                  <span className="text-sm text-gray-700">Translate</span>
                  {translateQuestions && (
                    <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                      <SelectTrigger className="w-36 h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="max-h-64 overflow-y-auto">
                        <SelectItem value="en">🇬🇧 English</SelectItem>
                        <SelectItem value="ar">🇸🇦 Arabic</SelectItem>
                        <SelectItem value="hi">🇮🇳 Hindi</SelectItem>
                        <SelectItem value="ur">🇵🇰 Urdu</SelectItem>
                        <SelectItem value="bn">🇧🇩 Bengali</SelectItem>
                        <SelectItem value="ta">🇮🇳 Tamil</SelectItem>
                        <SelectItem value="te">🇮🇳 Telugu</SelectItem>
                        <SelectItem value="gu">🇮🇳 Gujarati</SelectItem>
                        <SelectItem value="mr">🇮🇳 Marathi</SelectItem>
                        <SelectItem value="pa">🇮🇳 Punjabi</SelectItem>
                        <SelectItem value="kn">🇮🇳 Kannada</SelectItem>
                        <SelectItem value="ml">🇮🇳 Malayalam</SelectItem>
                        <SelectItem value="ne">🇳🇵 Nepali</SelectItem>
                        <SelectItem value="si">🇱🇰 Sinhala</SelectItem>
                        <SelectItem value="my">🇲🇲 Myanmar</SelectItem>
                        <SelectItem value="th">🇹🇭 Thai</SelectItem>
                        <SelectItem value="vi">🇻🇳 Vietnamese</SelectItem>
                        <SelectItem value="id">🇮🇩 Indonesian</SelectItem>
                        <SelectItem value="ms">🇲🇾 Malay</SelectItem>
                        <SelectItem value="tl">🇵🇭 Filipino</SelectItem>
                        <SelectItem value="zh">🇨🇳 Chinese</SelectItem>
                        <SelectItem value="ja">🇯🇵 Japanese</SelectItem>
                        <SelectItem value="ko">🇰🇷 Korean</SelectItem>
                        <SelectItem value="es">🇪🇸 Spanish</SelectItem>
                        <SelectItem value="pt">🇵🇹 Portuguese</SelectItem>
                        <SelectItem value="fr">🇫🇷 French</SelectItem>
                        <SelectItem value="de">🇩🇪 German</SelectItem>
                        <SelectItem value="it">🇮🇹 Italian</SelectItem>
                        <SelectItem value="ru">🇷🇺 Russian</SelectItem>
                        <SelectItem value="tr">🇹🇷 Turkish</SelectItem>
                        <SelectItem value="fa">🇮🇷 Persian</SelectItem>
                        <SelectItem value="ps">🇦🇫 Pashto</SelectItem>
                        <SelectItem value="sw">🇰🇪 Swahili</SelectItem>
                        <SelectItem value="am">🇪🇹 Amharic</SelectItem>
                        <SelectItem value="ha">🇳🇬 Hausa</SelectItem>
                        <SelectItem value="yo">🇳🇬 Yoruba</SelectItem>
                        <SelectItem value="ig">🇳🇬 Igbo</SelectItem>
                        <SelectItem value="zu">🇿🇦 Zulu</SelectItem>
                        <SelectItem value="af">🇿🇦 Afrikaans</SelectItem>
                        <SelectItem value="nl">🇳🇱 Dutch</SelectItem>
                        <SelectItem value="pl">🇵🇱 Polish</SelectItem>
                        <SelectItem value="cs">🇨🇿 Czech</SelectItem>
                        <SelectItem value="hu">🇭🇺 Hungarian</SelectItem>
                        <SelectItem value="ro">🇷🇴 Romanian</SelectItem>
                        <SelectItem value="bg">🇧🇬 Bulgarian</SelectItem>
                        <SelectItem value="hr">🇭🇷 Croatian</SelectItem>
                        <SelectItem value="sr">🇷🇸 Serbian</SelectItem>
                        <SelectItem value="sl">🇸🇮 Slovenian</SelectItem>
                        <SelectItem value="el">🇬🇷 Greek</SelectItem>
                        <SelectItem value="he">🇮🇱 Hebrew</SelectItem>
                        <SelectItem value="uk">🇺🇦 Ukrainian</SelectItem>
                        <SelectItem value="ka">🇬🇪 Georgian</SelectItem>
                        <SelectItem value="hy">🇦🇲 Armenian</SelectItem>
                        <SelectItem value="az">🇦🇿 Azerbaijani</SelectItem>
                        <SelectItem value="kk">🇰🇿 Kazakh</SelectItem>
                        <SelectItem value="uz">🇺🇿 Uzbek</SelectItem>
                        <SelectItem value="mn">🇲🇳 Mongolian</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </div>
              </div>

              {/* Voice Controls */}
              <div className="bg-gray-50 rounded-lg p-3 border">
                <div className="flex items-center gap-3">
                  <Volume2 className="w-4 h-4 text-green-600" />
                  <Switch
                    checked={speechEnabled}
                    onCheckedChange={(checked) => {
                      setSpeechEnabled(checked);
                      if (!checked) stopSpeaking();
                    }}
                    className="data-[state=checked]:bg-green-600"
                  />
                  <span className="text-sm text-gray-700">Voice</span>
                  {speechEnabled && (
                    <>
                      <Select value={selectedVoice} onValueChange={setSelectedVoice}>
                        <SelectTrigger className="w-32 h-8 text-xs">
                          <SelectValue placeholder="Voice" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableVoices.map((voice) => (
                            <SelectItem key={voice.name} value={voice.name}>
                              {voice.name.split(' ')[0]}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button
                        size="sm"
                        variant={isSpeaking ? "destructive" : "default"}
                        onClick={isSpeaking ? stopSpeaking : speakCurrentQuestion}
                        className="h-8 px-2"
                      >
                        {isSpeaking ? "Stop" : "Play"}
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Clinical Scenario */}
            {currentQuestion.scenario && (
              <div className="mb-6 bg-blue-50 rounded-lg p-4 border border-blue-200">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-white text-xs font-bold">📋</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-blue-900 mb-2">Clinical Scenario</h3>
                    <p className="text-gray-700 leading-relaxed">
                      {(() => {
                        const cacheKey = `${currentQuestion.id}_${selectedLanguage}`;
                        const translatedQ = translatedQuestions[cacheKey];
                        if (translateQuestions && selectedLanguage !== 'en' && translatedQ?.scenario) {
                          return translatedQ.scenario;
                        }
                        return currentQuestion.scenario;
                      })()}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Question */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 leading-relaxed">
                {(() => {
                  const cacheKey = `${currentQuestion.id}_${selectedLanguage}`;
                  const translatedQ = translatedQuestions[cacheKey];
                  if (translateQuestions && selectedLanguage !== 'en' && translatedQ?.question) {
                    return translatedQ.question;
                  }
                  return currentQuestion.question || currentQuestion.stem;
                })()}
              </h2>
            </div>

            {/* Answer Options - PassMedicine Style */}
            <div className="space-y-2 mb-8">
              {(() => {
                const cacheKey = `${currentQuestion.id}_${selectedLanguage}`;
                const translatedQ = translatedQuestions[cacheKey];
                
                // Handle different option structures
                let options = [];
                if (translateQuestions && selectedLanguage !== 'en' && translatedQ?.options) {
                  options = Array.isArray(translatedQ.options) ? translatedQ.options : Object.values(translatedQ.options);
                } else if (currentQuestion.options) {
                  if (Array.isArray(currentQuestion.options)) {
                    options = currentQuestion.options;
                  } else if (typeof currentQuestion.options === 'object') {
                    // Handle object structure like {A: "option1", B: "option2", ...}
                    options = Object.values(currentQuestion.options);
                  }
                }
                
                return options;
              })().map((option: string, index: number) => {
                // Handle different correct answer formats
                let correctAnswerIndex = currentQuestion.correctAnswer || currentQuestion.correct_answer;
                if (typeof correctAnswerIndex === 'string') {
                  // Convert letter-based answers (A, B, C, D, E) to index
                  correctAnswerIndex = correctAnswerIndex.charCodeAt(0) - 65; // A=0, B=1, etc.
                }
                const isCorrectAnswer = index === correctAnswerIndex;
                const isSelectedAnswer = selectedAnswer === index.toString();
                const isIncorrectlySelected = showExplanation && isSelectedAnswer && !isCorrectAnswer;
                
                return (
                  <label 
                    key={index} 
                    className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                      showExplanation 
                        ? isCorrectAnswer
                          ? 'border-green-500 bg-green-100 shadow-lg shadow-green-200'
                          : isIncorrectlySelected
                          ? 'border-red-500 bg-red-50' 
                          : 'border-gray-200 bg-gray-50 opacity-60'
                        : isSelectedAnswer
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="answer"
                      value={index.toString()}
                      checked={selectedAnswer === index.toString()}
                      onChange={() => !showExplanation && handleAnswerSelect(index.toString())}
                      disabled={showExplanation}
                      className="w-4 h-4 mr-3 text-blue-600"
                    />
                    
                    <div className="flex-1">
                      <span className={`text-base leading-relaxed ${
                        showExplanation && isCorrectAnswer 
                          ? 'text-green-900 font-bold' 
                          : showExplanation && isIncorrectlySelected
                          ? 'text-red-800'
                          : 'text-gray-800'
                      }`}>
                        {showExplanation && isCorrectAnswer && (
                          <span className="inline-flex items-center gap-1 mr-2">
                            <span className="text-green-700 font-bold text-lg">✓ CORRECT:</span>
                          </span>
                        )}
                        {showExplanation && isIncorrectlySelected && (
                          <span className="inline-flex items-center gap-1 mr-2">
                            <span className="text-red-600 font-bold">✗ YOUR CHOICE:</span>
                          </span>
                        )}
                        <span className={showExplanation && isCorrectAnswer ? 'text-green-900 font-bold' : ''}>
                          {option}
                        </span>
                      </span>
                    </div>
                    
                    {speechEnabled && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          speakText(option);
                        }}
                        className="h-8 w-8 p-0 text-gray-500 hover:text-blue-600 ml-2"
                      >
                        <Volume2 className="w-3 h-3" />
                      </Button>
                    )}
                    
                    {showExplanation && isCorrectAnswer && (
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 ml-2" />
                    )}
                    {showExplanation && isIncorrectlySelected && (
                      <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 ml-2" />
                    )}
                  </label>
                );
              })}
            </div>

            {/* Submit Answer Button - PassMedicine Style */}
            {!showExplanation && selectedAnswer && (
              <div className="mb-6">
                <Button
                  onClick={handleSubmitAnswer}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-lg font-medium"
                  size="lg"
                >
                  Submit answer
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Answer Explanation - PassMedicine Style */}
        {showExplanation && (
          <div className="space-y-6 mb-8">
            {/* Result Banner */}
            <div className={`p-4 rounded-lg border-2 ${
              isCorrect 
                ? 'bg-green-50 border-green-500 text-green-800' 
                : 'bg-red-50 border-red-500 text-red-800'
            }`}>
              <div className="flex items-center gap-3">
                {isCorrect ? (
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                )}
                <div className="flex-1">
                  {isCorrect ? (
                    <p className="font-semibold text-lg">Correct!</p>
                  ) : (
                    <div>
                      <p className="font-semibold text-lg mb-2">
                        Incorrect - The correct answer was <strong className="text-green-600">
                          {(() => {
                            let correctAnswerIndex = currentQuestion.correctAnswer;
                            console.log('Debug correct answer:', correctAnswerIndex, typeof correctAnswerIndex);
                            
                            // Handle different answer formats
                            if (typeof correctAnswerIndex === 'string') {
                              // If it's already a letter like "A", "B", etc.
                              if (correctAnswerIndex.length === 1 && correctAnswerIndex >= 'A' && correctAnswerIndex <= 'E') {
                                return correctAnswerIndex;
                              }
                              // If it's "correct_answer" field value, convert to index first
                              const letterMatch = correctAnswerIndex.match(/^[A-E]$/);
                              if (letterMatch) {
                                return letterMatch[0];
                              }
                            } else if (typeof correctAnswerIndex === 'number') {
                              // Convert number index to letter
                              return String.fromCharCode(65 + correctAnswerIndex);
                            }
                            
                            // Fallback - check if correct_answer field exists
                            if (currentQuestion.correct_answer) {
                              return currentQuestion.correct_answer;
                            }
                            
                            console.log('Fallback - checking question structure:', currentQuestion);
                            return 'A'; // Safe fallback
                          })()}
                        </strong>
                      </p>
                      <div className="bg-green-100 border border-green-300 rounded-lg p-3">
                        <p className="text-green-800 font-medium">
                          ✓ Answer {(() => {
                            let correctAnswerIndex = currentQuestion.correctAnswer || currentQuestion.correct_answer;
                            if (typeof correctAnswerIndex === 'string') {
                              return correctAnswerIndex;
                            } else if (typeof correctAnswerIndex === 'number') {
                              return String.fromCharCode(65 + correctAnswerIndex);
                            }
                            return 'A';
                          })()}:
                        </p>
                        <p className="text-green-700 text-base mt-1 font-medium">
                          {(() => {
                            let options = currentQuestion.options;
                            let correctIndex = currentQuestion.correctAnswer || currentQuestion.correct_answer;
                            
                            // Convert string answer to index if needed
                            if (typeof correctIndex === 'string') {
                              correctIndex = correctIndex.charCodeAt(0) - 65;
                            }
                            
                            if (Array.isArray(options)) {
                              return options[correctIndex];
                            } else if (typeof options === 'object') {
                              return Object.values(options)[correctIndex];
                            }
                            return 'Option not available';
                          })()}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Simple explanation text like PassMedicine */}
            <div className="text-gray-800 leading-relaxed space-y-4">
              {(() => {
                // Get explanation and format it cleanly
                const explanation = currentQuestion.explanation || '';
                
                // Split explanation into paragraphs for better readability
                const paragraphs = explanation.split('\n\n').filter((p: string) => p.trim());
                
                return paragraphs.map((paragraph: string, index: number) => (
                  <p key={index} className="text-base leading-relaxed">
                    {paragraph.trim()}
                  </p>
                ));
              })()}
            </div>

            {/* Topic heading like PassMedicine */}
            <div className="pt-4 border-t border-gray-200">
              <h3 className="text-xl font-normal text-blue-600 mb-2">
                {currentQuestion.category ? currentQuestion.category.charAt(0).toUpperCase() + currentQuestion.category.slice(1) : 'Medical Topic'}
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">★</span>
                <span className="text-sm text-gray-600">Reference material</span>
              </div>
            </div>

            {/* CKS Clinical Knowledge Summaries */}
            {currentQuestion.cks_guidance && (
              <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg mb-4">
                <div className="flex items-start gap-2">
                  <BookOpen className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />
                  <div className="w-full">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-sm font-medium text-green-900">CKS Clinical Knowledge Summary</p>
                      <div className="flex flex-col gap-1">
                        <p className="text-xs text-green-700 italic">
                          Note: CKS access may be restricted outside the UK
                        </p>
                      </div>
                    </div>
                    
                    <div className="bg-white border border-green-200 rounded-lg p-4 mb-3">
                      <p className="text-green-800 text-sm leading-relaxed mb-3">
                        {(() => {
                          let summary = currentQuestion.cks_guidance.summary || '';
                          // Remove redundant header text patterns
                          summary = summary.replace(/^NICE Clinical Guideline:\s*CKS:\s*\[.*?\]\s*/i, '');
                          summary = summary.replace(/^CKS:\s*\[.*?\]\s*/i, '');
                          summary = summary.replace(/^NICE:\s*\[.*?\]\s*/i, '');
                          return summary.trim();
                        })()}
                      </p>
                      
                      <div className="mb-3">
                        <p className="text-xs font-semibold text-green-900 mb-2">Key Clinical Points:</p>
                        <ul className="list-disc list-inside space-y-1">
                          {currentQuestion.cks_guidance.key_points?.map((point: string, index: number) => (
                            <li key={index} className="text-xs text-green-800">{point}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="mb-3">
                        <p className="text-xs font-semibold text-green-900 mb-1">Management Approach:</p>
                        <p className="text-xs text-green-800">{currentQuestion.cks_guidance.management_approach}</p>
                      </div>
                      
                      {/* Specific CKS References - Enhanced Detail */}
                      {currentQuestion.cks_guidance.specific_references && currentQuestion.cks_guidance.specific_references.length > 0 && (
                        <div className="mb-3 bg-green-25 border border-green-300 rounded-lg p-3">
                          <p className="text-xs font-semibold text-green-900 mb-2">Specific CKS Guidance References:</p>
                          <div className="space-y-2">
                            {currentQuestion.cks_guidance.specific_references.map((ref: any, index: number) => (
                              <div key={index} className="bg-white border border-green-200 rounded p-2">
                                <div className="flex items-start justify-between gap-2 mb-1">
                                  <div className="flex-1">
                                    <p className="text-xs font-medium text-green-900">{ref.section}</p>
                                    {ref.subsection && (
                                      <p className="text-xs text-green-700 italic">{ref.subsection}</p>
                                    )}
                                  </div>
                                  <a
                                    href={ref.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center rounded-md text-xs font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-green-300 text-green-700 hover:bg-green-50 h-6 px-2"
                                  >
                                    <ExternalLink className="w-2 h-2 mr-1" />
                                    View
                                  </a>
                                </div>
                                <p className="text-xs text-green-800 leading-relaxed mb-1">
                                  {ref.text}
                                </p>
                                {ref.tableOrFigure && (
                                  <div className="flex items-center gap-1 mt-1">
                                    <span className="text-xs bg-green-100 text-green-800 px-1 rounded">
                                      📊 {ref.tableOrFigure}
                                    </span>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {currentQuestion.cks_guidance.red_flags && Array.isArray(currentQuestion.cks_guidance.red_flags) && currentQuestion.cks_guidance.red_flags.length > 0 && (
                        <div className="bg-red-50 border border-red-200 rounded p-2">
                          <p className="text-xs font-semibold text-red-900 mb-1">Red Flags:</p>
                          <ul className="list-disc list-inside space-y-1">
                            {currentQuestion.cks_guidance.red_flags.map((flag: string, index: number) => (
                              <li key={index} className="text-xs text-red-800">{flag}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                  </div>
                </div>
              </div>
            )}



            {/* Specific Reference Section */}
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
              <div className="flex items-start gap-2">
                <BookOpen className="w-4 h-4 text-blue-600 flex-shrink-0 mt-1" />
                <div className="w-full">
                  <p className="text-sm font-medium text-blue-900 mb-2">{translateText('Official References:')}</p>
                  <div className="text-sm text-blue-800 space-y-2">
                    {currentQuestion.references && currentQuestion.references.length > 0 ? (
                      currentQuestion.references
                        .filter((reference: any, index: number) => {
                          const title = typeof reference === 'string' ? reference : reference.title || reference.text || '';
                          // Filter out CKS references that duplicate what's already in the CKS button
                          return !title.toLowerCase().includes('cks:') && !title.toLowerCase().includes('clinical guideline: cks');
                        })
                        .map((reference: any, index: number) => (
                        <div key={index} className="bg-white border border-blue-200 rounded-lg p-3 mb-3">
                          <p className="text-blue-700 leading-relaxed mb-3 text-sm">
                            {typeof reference === 'string' ? reference : reference.title || reference.text}
                          </p>
                          {typeof reference === 'object' && reference.url && (
                            <Button
                              size="sm"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                window.open(reference.url, '_blank');
                              }}
                              className="bg-blue-600 hover:bg-blue-700 text-white border-blue-600 hover:border-blue-700"
                            >
                              <ExternalLink className="w-4 h-4 mr-1" />
                              View Full Guidelines
                            </Button>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="space-y-1">
                        <p className="text-blue-700">NICE Guidelines - Clinical evidence and recommendations</p>
                        <p className="text-blue-700">GMC Good Medical Practice - Professional standards</p>
                      </div>
                    )}
                    
                    {/* CKS Guidelines Button */}
                    {currentQuestion.cks_guidance && (
                      <div className="mt-4 pt-3 border-t border-blue-200">
                        <Button
                          size="sm"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            window.open(currentQuestion.cks_guidance.cks_url || 'https://cks.nice.org.uk/', '_blank');
                          }}
                          className="bg-blue-600 hover:bg-blue-700 text-white border-blue-600 hover:border-blue-700"
                        >
                          <ExternalLink className="w-4 h-4 mr-1" />
                          View NICE CKS Guidelines
                        </Button>
                        <p className="text-xs text-blue-600 mt-2 italic">
                          Note: You will need to accept CKS terms and conditions for full access
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Study Tips Section with Medical Mnemonics */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-2 mb-3">
                <Lightbulb className="w-4 h-4 text-blue-600 flex-shrink-0 mt-1" />
                <div className="w-full">
                  <p className="text-sm font-medium text-blue-900 mb-3">{translateText('Study Tips & Medical Mnemonics')}</p>
                  
                  {/* Display study tips from question data if available */}
                  {currentQuestion.studyTips && currentQuestion.studyTips.length > 0 ? (
                    <div className="space-y-3">
                      {currentQuestion.studyTips.map((tip: any, index: number) => (
                        <div key={index} className="bg-white border border-blue-200 rounded-lg p-3">
                          <p className="text-sm font-semibold text-blue-900 mb-1">{tip.title}</p>
                          <p className="text-sm text-blue-800 leading-relaxed">{tip.content}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    // Default study tips with common medical mnemonics
                    <div className="space-y-3">
                      <div className="bg-white border border-blue-200 rounded-lg p-3">
                        <p className="text-sm font-semibold text-blue-900 mb-1">ECG Reading Mnemonic</p>
                        <p className="text-sm text-blue-800">Remember "RATE, RHYTHM, AXIS, INTERVALS, ST-T": Check heart rate, rhythm regularity, electrical axis, PR/QRS/QT intervals, then ST segments and T waves</p>
                      </div>
                      <div className="bg-white border border-blue-200 rounded-lg p-3">
                        <p className="text-sm font-semibold text-blue-900 mb-1">Heart Murmur Positions</p>
                        <p className="text-sm text-blue-800">"All Physicians Take Money": Aortic (2nd right ICS), Pulmonary (2nd left ICS), Tricuspid (4th left ICS), Mitral (5th left MCL)</p>
                      </div>
                      <div className="bg-white border border-blue-200 rounded-lg p-3">
                        <p className="text-sm font-semibold text-blue-900 mb-1">Acute Coronary Syndromes</p>
                        <p className="text-sm text-blue-800">STEMI = ST elevation + troponin rise; NSTEMI = No ST elevation + troponin rise; Unstable angina = No troponin rise</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Global Leaderboard */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-yellow-600" />
                Global Leaderboard - Top 10
              </CardTitle>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowLeaderboard(!showLeaderboard)}
              >
                {showLeaderboard ? 'Hide' : 'View All'}
              </Button>
            </div>
            <CardDescription>
              Real-time rankings of top performers worldwide
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {leaderboardData.slice(0, showLeaderboard ? 10 : 5).map((entry, index) => (
                <div 
                  key={entry.rank}
                  className={`flex items-center justify-between p-3 rounded-lg border ${
                    entry.rank <= 3 ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200' : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      entry.rank === 1 ? 'bg-yellow-500 text-white' :
                      entry.rank === 2 ? 'bg-gray-400 text-white' :
                      entry.rank === 3 ? 'bg-orange-600 text-white' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {entry.rank}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{entry.name}</p>
                      <p className="text-xs text-gray-500">{entry.category} • {entry.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg text-gray-900">{entry.score}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span>{formatTime(entry.time)}</span>
                      <span>{entry.accuracy}% accuracy</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {showLeaderboard && (
              <div className="mt-4 pt-4 border-t">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    // Navigate to comprehensive leaderboard page
                    console.log('Navigate to comprehensive leaderboard page');
                  }}
                >
                  View Comprehensive Rankings
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

      </div>

      {/* PassMedicine-Style Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
        <div className="max-w-4xl mx-auto p-4">
          <div className="flex items-center justify-between">
            {/* Previous Button */}
            <Button
              onClick={() => {
                if (currentQuestionIndex > 0) {
                  setCurrentQuestionIndex(prev => prev - 1);
                  setSelectedAnswer("");
                  setShowExplanation(false);
                  setQuestionStartTime(Date.now());
                }
              }}
              disabled={currentQuestionIndex === 0}
              variant="outline"
              className="w-12 h-12 p-0 bg-gray-100 hover:bg-gray-200 disabled:opacity-30"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>

            {/* Center Content */}
            <div className="flex-1 flex justify-center">
              {!showExplanation && selectedAnswer ? (
                <Button 
                  onClick={handleSubmitAnswer}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium"
                >
                  Submit answer
                </Button>
              ) : showExplanation ? (
                <Button 
                  onClick={handleNextQuestion}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium flex items-center gap-2"
                >
                  {currentQuestionIndex < generatedQuestions.length - 1 ? (
                    <>
                      Next question
                      <ArrowRight className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      Complete session
                      <Award className="w-4 h-4" />
                    </>
                  )}
                </Button>
              ) : null}
            </div>

            {/* Next Button */}
            <Button
              onClick={() => {
                if (currentQuestionIndex < generatedQuestions.length - 1) {
                  setCurrentQuestionIndex(prev => prev + 1);
                  setSelectedAnswer("");
                  setShowExplanation(false);
                  setQuestionStartTime(Date.now());
                }
              }}
              disabled={currentQuestionIndex >= generatedQuestions.length - 1}
              variant="outline"
              className="w-12 h-12 p-0 bg-gray-100 hover:bg-gray-200 disabled:opacity-30"
            >
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Question counter */}
          <div className="text-center mt-2">
            <span className="text-sm text-gray-500">
              {currentQuestionIndex + 1} of {generatedQuestions.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}