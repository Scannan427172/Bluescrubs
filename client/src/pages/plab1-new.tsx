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
import heroBannerImage from "@assets/458CC7DF-D6D7-4BAD-85F5-99EEBD33ECD9_1750282263502.png";
import { HeroBanner } from "@/components/ui/hero-banner";

export default function PLAB1New() {
  
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

  // Specialist categories matching our specialist question generation system
  const availableCategories = [
    { value: 'all' as const, label: 'Mixed Specialties (All)', count: 5000, description: 'Questions from all medical specialists' },
    { value: 'cardiovascular' as const, label: 'Cardiology', count: 625, description: 'Consultant Cardiologist questions' },
    { value: 'respiratory' as const, label: 'Respiratory Medicine', count: 625, description: 'Consultant Respiratory Physician questions' },
    { value: 'gastroenterology' as const, label: 'Gastroenterology', count: 625, description: 'Consultant Gastroenterologist questions' },
    { value: 'neurology' as const, label: 'Neurology', count: 625, description: 'Consultant Neurologist questions' },
    { value: 'endocrinology' as const, label: 'Endocrinology', count: 625, description: 'Consultant Endocrinologist questions' },
    { value: 'psychiatry' as const, label: 'Psychiatry', count: 625, description: 'Consultant Psychiatrist questions' },
    { value: 'surgery' as const, label: 'General Surgery', count: 625, description: 'Consultant General Surgeon questions' },
    { value: 'emergency-medicine' as const, label: 'Emergency Medicine', count: 625, description: 'Consultant Emergency Physician questions' }
  ];

  // Generate specialist-level questions using category-based approach
  const startPractice = async (questionCount: number) => {
    setIsGeneratingQuestions(true);
    setGeneratedQuestions([]);
    setSessionStarted(false);
    setShowExplanation(false);
    setCurrentQuestionIndex(0);
    
    try {
      let endpoint = '/api/plab-ai/generate-mcqs';
      let requestBody: any = {
        count: questionCount,
        difficulty: selectedDifficulty
      };

      // If specific specialty selected, use specialist questions
      if (selectedCategory !== 'all') {
        // Map category names to specialist codes
        const specialtyMapping: Record<string, string> = {
          'cardiovascular': 'cardiology',
          'respiratory': 'respiratory',
          'gastroenterology': 'gastroenterology',
          'neurology': 'neurology',
          'endocrinology': 'endocrinology',
          'psychiatry': 'psychiatry',
          'surgery': 'surgery',
          'emergency-medicine': 'emergency'
        };
        
        const specialtyCode = specialtyMapping[selectedCategory];
        if (specialtyCode) {
          requestBody.specialty = specialtyCode;
        } else {
          // For other categories, use mixed specialist questions
          endpoint = '/api/plab-ai/generate-mixed-mcqs';
        }
      } else {
        // For 'all' categories, use mixed specialist questions
        endpoint = '/api/plab-ai/generate-mixed-mcqs';
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const data = await response.json();
        setGeneratedQuestions(data.mcqs || []);
        if (data.mcqs && data.mcqs.length > 0) {
          setSessionStarted(true);
          setQuestionStartTime(Date.now());
        }
      } else {
        console.error('Failed to generate specialist questions');
      }
    } catch (error) {
      console.error('Error generating specialist questions:', error);
    } finally {
      setIsGeneratingQuestions(false);
    }
  };

  // Bulk specialist question generation function
  const generateBulkQuestions = async () => {
    setIsBulkGenerating(true);
    setBulkProgress({ completed: 0, total: 8, currentCategory: 'Starting specialist generation...' });

    // Use specialist categories that match our specialist-question-generator
    const specialistCategories = [
      'cardiology', 'respiratory', 'gastroenterology', 'neurology', 
      'endocrinology', 'psychiatry', 'surgery', 'emergency'
    ];

    try {
      let totalGenerated = 0;
      
      for (let i = 0; i < specialistCategories.length; i++) {
        const specialty = specialistCategories[i];
        setBulkProgress({ 
          completed: i, 
          total: specialistCategories.length, 
          currentCategory: `Generating ${specialty} questions...` 
        });

        const response = await fetch('/api/plab-ai/generate-mcqs', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            specialty: specialty,
            count: Math.ceil(5000 / specialistCategories.length),
            difficulty: 'specialist'
          }),
        });

        if (response.ok) {
          const data = await response.json();
          totalGenerated += data.mcqs?.length || 0;
        }
      }
      
      setBulkProgress({ 
        completed: specialistCategories.length, 
        total: specialistCategories.length, 
        currentCategory: `Complete! Generated ${totalGenerated} specialist questions` 
      });
    } catch (error) {
      console.error('Specialist bulk generation failed:', error);
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

  // Submit answer and show explanation
  const submitAnswer = () => {
    if (selectedAnswer) {
      // Stop the timer and record time
      setIsTimerRunning(false);
      const currentQuestionTime = questionTimer;
      
      setShowExplanation(true);
      const timeForQuestion = Date.now() - questionStartTime;
      setTimeSpent(prev => prev + timeForQuestion);
      
      // Record timing and answer data
      setQuestionTimes(prev => [...prev, currentQuestionTime]);
      setUserAnswers(prev => [...prev, selectedAnswer]);
    }
  };

  // Go to next question
  const nextQuestion = () => {
    if (currentQuestionIndex < generatedQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer("");
      setShowExplanation(false);
      setQuestionStartTime(Date.now());
      // Timer will restart automatically via useEffect
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
        <HeroBanner
          backgroundImage={heroBannerImage}
          title={translateText('PLAB 1 Practice')}
          subtitle="Comprehensive AI-generated medical questions"
          badge="5000+ Questions Available"
        />
        
        <div className="max-w-6xl mx-auto px-4 mb-16">
          {/* Content Section */}
          <div className="mb-8">
            
            {/* Language Toggle */}
            <div className="flex items-center gap-4 mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
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
                  <span className="text-sm font-medium text-gray-600">Specialist Consultants</span>
                </div>
                <p className="text-2xl font-bold text-gray-900 mt-1">8</p>
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

          {/* Specialist Category Selection */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Select Specialist Practice Category</CardTitle>
              <CardDescription>Choose a medical specialty where specialist consultants will generate questions at their expertise level</CardDescription>
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
                          <div className="flex flex-col">
                            <span className="font-medium">{category.label}</span>
                            <span className="text-xs text-gray-500">{category.description}</span>
                            <span className="text-xs text-blue-600">{category.count} specialist questions</span>
                          </div>
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
                      <SelectItem value="foundation">
                        <div className="flex flex-col">
                          <span className="font-medium">Foundation Level</span>
                          <span className="text-xs text-gray-500">Junior doctor level questions</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="specialist">
                        <div className="flex flex-col">
                          <span className="font-medium">Specialist Level</span>
                          <span className="text-xs text-gray-500">Registrar/specialty trainee level</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="consultant">
                        <div className="flex flex-col">
                          <span className="font-medium">Consultant Level</span>
                          <span className="text-xs text-gray-500">Senior consultant expertise</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Practice Options */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Start Practice Session</CardTitle>
              <CardDescription>Choose your practice format</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                <Button 
                  size="lg" 
                  onClick={() => startPractice(5)}
                  disabled={isGeneratingQuestions}
                  className="bg-blue-600 hover:bg-blue-700 text-white h-24 flex flex-col items-center justify-center gap-2 disabled:opacity-50"
                >
                  <ArrowRight className="w-6 h-6" />
                  <span className="font-medium">{translateText('Quick Practice')}</span>
                  <span className="text-xs opacity-90">5 {translateText('questions')}</span>
                </Button>

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
                    <h3 className="text-lg font-semibold text-gray-900">Build Complete Specialist Question Bank</h3>
                    <p className="text-sm text-gray-600">Generate comprehensive question database from 8 specialist consultants</p>
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
                        Generate 5000 Specialist Questions
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
                      <SelectTrigger className="w-20 h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">🇬🇧 EN</SelectItem>
                        <SelectItem value="ar">🇸🇦 AR</SelectItem>
                        <SelectItem value="hi">🇮🇳 HI</SelectItem>
                        <SelectItem value="ur">🇵🇰 UR</SelectItem>
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

            {/* Answer Options - Template Style */}
            <div className="space-y-3">
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
                
                // Apply quick fallback translation for options if API translation not ready
                if (translateQuestions && selectedLanguage !== 'en' && !translatedQ?.options && options.length > 0) {
                  const quickTranslations: Record<string, Record<string, string>> = {
                    'ar': {
                      'Primary PCI': 'القسطرة الأولية', 'Thrombolytic therapy': 'العلاج المذيب للجلطة',
                      'Conservative management': 'العلاج التحفظي', 'Urgent': 'عاجل', 'Emergency': 'طوارئ'
                    },
                    'hi': {
                      'Primary PCI': 'प्राथमिक पीसीआई', 'Thrombolytic therapy': 'थ्रोम्बोलाइटिक थेरेपी',
                      'Conservative management': 'रूढ़िवादी प्रबंधन', 'Urgent': 'तत्काल', 'Emergency': 'आपातकाल'
                    },
                    'ur': {
                      'Primary PCI': 'بنیادی پی سی آئی', 'Thrombolytic therapy': 'خون کا لوتھڑا گھولنے کا علاج',
                      'Conservative management': 'قدامت پسند انتظام', 'Urgent': 'فوری', 'Emergency': 'ایمرجنسی'
                    }
                  };
                  
                  const translations = quickTranslations[selectedLanguage] || {};
                  options = options.map((option: string) => {
                    let translated = option;
                    Object.entries(translations).forEach(([english, native]) => {
                      translated = translated.replace(new RegExp(`\\b${english}\\b`, 'gi'), native);
                    });
                    return translated;
                  });
                }
                
                return options;
              })().map((option: string, index: number) => {
                // Handle different correct answer formats
                let correctAnswerIndex = currentQuestion.correctAnswer;
                if (typeof correctAnswerIndex === 'string') {
                  // Convert letter-based answers (A, B, C, D, E) to index
                  correctAnswerIndex = correctAnswerIndex.charCodeAt(0) - 65; // A=0, B=1, etc.
                }
                const isCorrectAnswer = index === correctAnswerIndex;
                const isIncorrectlySelected = showExplanation && selectedAnswer === index.toString() && !isCorrectAnswer;
                
                return (
                  <div 
                    key={index} 
                    className={`border-2 rounded-lg transition-all duration-200 ${
                      showExplanation 
                        ? isCorrectAnswer
                          ? 'border-green-400 bg-green-100'
                          : isIncorrectlySelected
                          ? 'border-red-400 bg-red-100' 
                          : 'border-gray-200 bg-gray-50'
                        : selectedAnswer === index.toString()
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <button
                      onClick={() => handleAnswerSelect(index.toString())}
                      disabled={showExplanation}
                      className={`w-full flex items-center gap-3 p-4 text-left transition-all duration-200 ${
                        showExplanation 
                          ? isCorrectAnswer
                            ? 'cursor-default'
                            : isIncorrectlySelected
                            ? 'cursor-default'
                            : 'cursor-default'
                          : selectedAnswer === index.toString()
                          ? 'cursor-pointer'
                          : 'cursor-pointer hover:bg-gray-50'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-medium ${
                        showExplanation 
                          ? isCorrectAnswer
                            ? 'border-green-500 bg-green-500 text-white'
                            : isIncorrectlySelected
                            ? 'border-red-500 bg-red-500 text-white'
                            : 'border-gray-300 bg-gray-100 text-gray-600'
                          : selectedAnswer === index.toString()
                          ? 'border-blue-500 bg-blue-500 text-white'
                          : 'border-gray-300 bg-white text-gray-600'
                      }`}>
                        {String.fromCharCode(65 + index)}
                      </div>
                      
                      <div className="flex-1">
                        <span className="text-base leading-relaxed text-gray-800">
                          {option}
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
                          className="h-8 w-8 p-0 text-gray-500 hover:text-blue-600"
                        >
                          <Volume2 className="w-3 h-3" />
                        </Button>
                      )}
                      
                      {showExplanation && isCorrectAnswer && (
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      )}
                      {showExplanation && isIncorrectlySelected && (
                        <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Answer Explanation - Template Style */}
        {showExplanation && (
          <div className="space-y-4 mb-6">
            {/* Feedback Section */}
            <div className={`p-4 border-2 rounded-lg ${
              isCorrect 
                ? 'bg-green-100 border-green-400' 
                : 'bg-red-100 border-red-400'
            }`}>
              <div className="flex items-start gap-3">
                {isCorrect ? (
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                )}
                <div className="flex-1">
                  <p className={`font-medium text-base ${
                    isCorrect ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {isCorrect 
                      ? translateText('Correct!') 
                      : `${translateText('Incorrect.')} The correct answer is ${String.fromCharCode(65 + currentQuestion.correctAnswer)}: ${currentQuestion.options[currentQuestion.correctAnswer]}`
                    }
                  </p>
                  
                  {/* Targeted Explanation Text */}
                  <div className={`mt-3 text-base leading-relaxed ${
                    isCorrect ? 'text-green-700' : 'text-red-700'
                  }`} style={{ whiteSpace: 'pre-line' }}>
                    {getTargetedExplanation(currentQuestion, selectedAnswer, isCorrect)}
                  </div>
                </div>
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
                      <Button
                        size="sm"
                        onClick={() => window.open(currentQuestion.cks_guidance.cks_url || 'https://cks.nice.org.uk/', '_blank')}
                        className="bg-green-600 hover:bg-green-700 text-white border-green-600 hover:border-green-700"
                      >
                        <ExternalLink className="w-3 h-3 mr-1" />
                        View CKS Guidelines
                      </Button>
                    </div>
                    
                    <div className="bg-white border border-green-200 rounded-lg p-4 mb-3">
                      <p className="text-green-800 text-sm leading-relaxed mb-3">
                        {currentQuestion.cks_guidance.summary}
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
                      
                      {currentQuestion.cks_guidance.red_flags && currentQuestion.cks_guidance.red_flags.length > 0 && (
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

            {/* Additional UK Guidelines */}
            {currentQuestion.additional_guidelines && currentQuestion.additional_guidelines.length > 0 && (
              <div className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded-r-lg mb-4">
                <div className="flex items-start gap-2">
                  <BookOpen className="w-4 h-4 text-purple-600 flex-shrink-0 mt-1" />
                  <div className="w-full">
                    <p className="text-sm font-medium text-purple-900 mb-3">Additional UK Clinical Guidelines</p>
                    <div className="space-y-3">
                      {currentQuestion.additional_guidelines.map((guideline: any, index: number) => (
                        <div key={index} className="bg-white border border-purple-200 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs font-semibold text-purple-900 bg-purple-100 px-2 py-1 rounded">
                              {guideline.source}
                            </span>
                          </div>
                          <p className="text-sm text-purple-800 mb-2">{guideline.guidance}</p>
                          <p className="text-xs text-purple-700 italic">{guideline.relevance}</p>
                        </div>
                      ))}
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
                      currentQuestion.references.map((reference: any, index: number) => (
                        <div key={index} className="bg-white border border-blue-200 rounded-lg p-3 mb-3">
                          <p className="text-blue-700 leading-relaxed mb-3 text-sm">
                            {typeof reference === 'string' ? reference : reference.title || reference.text}
                          </p>
                          {typeof reference === 'object' && reference.url && (
                            <a 
                              href={reference.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm inline-flex items-center gap-2 font-medium transition-colors"
                            >
                              <ExternalLink className="w-4 h-4" />
                              View Full Guidelines
                            </a>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="space-y-1">
                        <p className="text-blue-700">NICE Guidelines - Clinical evidence and recommendations</p>
                        <p className="text-blue-700">GMC Good Medical Practice - Professional standards</p>
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

      {/* Fixed Bottom Navigation - Always Stays at Bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
        <div className="max-w-4xl mx-auto p-4">
          <div className="flex gap-4 justify-center">
            {!showExplanation ? (
              <Button 
                onClick={submitAnswer}
                disabled={!selectedAnswer}
                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 px-8 py-3 text-base font-medium"
              >
                {translateText('Submit Answer')}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button 
                onClick={nextQuestion}
                className="bg-green-600 hover:bg-green-700 px-8 py-3 text-base font-medium"
              >
                {currentQuestionIndex < generatedQuestions.length - 1 ? (
                  <>
                    {translateText('Next Question')}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                ) : (
                  <>
                    {translateText('Complete Session')}
                    <Award className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}