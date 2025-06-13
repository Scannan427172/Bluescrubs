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
  ArrowRight, ArrowLeft, RotateCcw, Award, TrendingUp, Home, Globe, Languages, ExternalLink, Volume2
} from "lucide-react";
import { COMPREHENSIVE_FLASHCARD_COLLECTION, FLASHCARD_STATS, type Flashcard } from "@shared/high-yield-flashcards";
import { getSourcesForQuestion } from "@shared/educational-sources";
import { GMC_QUESTION_BANK, type GMCQuestion, type GMCCategory } from "@shared/gmc-question-bank";
import { EXPANDED_QUESTION_BANK, QUESTION_BANK_STATS } from "@shared/expanded-question-bank";
import { NeuroSettings, useNeuroAccommodations } from "@/components/neurodiversity-settings";
import { type NeuroAtypicalType, NEURO_ACCOMMODATIONS } from "@shared/neurodiversity-schema";
import { AudioSupport, ReadableText } from "@/components/audio-support";



// Generate realistic clinical question stems
const generateRealisticStem = (specialty: string, scenario: string, index: number): string => {
  const age = 20 + (index % 60);
  const gender = index % 2 === 0 ? 'man' : 'woman';
  
  const stemTemplates: { [key: string]: string[] } = {
    'cardiovascular': [
      `A ${age}-year-old ${gender} presents to A&E with ${scenario === 'acute coronary syndrome' ? 'crushing central chest pain for 2 hours' : 'palpitations and dizziness'}. ECG shows ${index % 3 === 0 ? 'ST elevation in leads II, III, aVF' : 'atrial fibrillation with rapid ventricular response'}. What is the most appropriate immediate management?`,
      `A ${age}-year-old patient with known ${scenario} presents with worsening symptoms. Blood pressure is ${140 + (index % 40)}/90 mmHg. Which investigation would be most helpful?`,
    ],
    'respiratory': [
      `A ${age}-year-old ${gender} with a 30-pack-year smoking history presents with ${scenario === 'COPD' ? 'progressive dyspnoea over 6 months' : 'acute onset breathlessness'}. Chest X-ray shows ${index % 2 === 0 ? 'hyperinflation and flattened diaphragms' : 'right lower lobe consolidation'}. What is the most likely diagnosis?`,
      `A patient with known ${scenario} requires treatment optimization. Current FEV1 is ${30 + (index % 40)}% predicted. Which medication would be most appropriate?`,
    ],
    'psychiatry': [
      `A ${age}-year-old ${gender} presents with ${scenario === 'depression' ? 'persistent low mood, anhedonia, and sleep disturbance for 6 weeks' : 'auditory hallucinations and paranoid delusions'}. Mental state examination reveals ${index % 2 === 0 ? 'psychomotor retardation and poor concentration' : 'formal thought disorder and inappropriate affect'}. What is the most appropriate management?`,
      `A ${age}-year-old patient with known ${scenario} presents for review. They report ${index % 3 === 0 ? 'medication side effects' : 'worsening symptoms'}. What is the next step?`,
    ],
    'surgery': [
      `A ${age}-year-old ${gender} presents to A&E with ${scenario === 'acute abdomen' ? 'severe right iliac fossa pain, nausea, and fever' : 'sudden onset severe abdominal pain'}. Examination reveals ${index % 2 === 0 ? 'McBurney\'s point tenderness and positive Rovsing\'s sign' : 'rigid abdomen with guarding'}. What is the most appropriate management?`,
      `A ${age}-year-old patient requires emergency surgery for ${scenario}. Pre-operative assessment shows ${index % 2 === 0 ? 'ASA grade II' : 'multiple comorbidities'}. What is the most appropriate anaesthetic approach?`,
    ],
    'gastroenterology': [
      `A ${age}-year-old presents with ${scenario === 'IBD' ? '6-week history of bloody diarrhoea, weight loss, and abdominal cramping' : 'epigastric pain and early satiety'}. Examination reveals ${index % 2 === 0 ? 'right iliac fossa tenderness' : 'epigastric tenderness'}. What is the most appropriate next step?`,
    ],
    'neurology': [
      `A ${age}-year-old ${gender} presents with ${scenario === 'stroke' ? 'sudden onset left-sided weakness and dysphasia' : 'progressive headache with visual disturbance'}. Neurological examination shows ${index % 2 === 0 ? 'upper motor neuron signs' : 'papilloedema'}. What is the most urgent investigation?`,
    ],
    'endocrinology': [
      `A ${age}-year-old ${gender} presents with ${scenario === 'diabetes mellitus' ? 'polyuria, polydipsia, and weight loss' : 'heat intolerance and palpitations'}. Blood tests show ${index % 2 === 0 ? 'HbA1c 85 mmol/mol' : 'TSH <0.1 mU/L, free T4 45 pmol/L'}. What is the most appropriate management?`,
    ],
    'obstetrics-gynaecology': [
      `A ${age}-year-old pregnant woman at ${28 + (index % 12)} weeks gestation presents with ${scenario === 'preeclampsia' ? 'headache, visual disturbance, and epigastric pain' : 'reduced fetal movements'}. Blood pressure is ${150 + (index % 30)}/95 mmHg. What is the most appropriate management?`,
    ],
    'paediatrics': [
      `A ${2 + (index % 10)}-year-old child presents with ${scenario === 'bronchiolitis' ? '3-day history of cough, wheeze, and feeding difficulties' : 'fever and irritability'}. Examination shows ${index % 2 === 0 ? 'widespread wheeze and intercostal recession' : 'neck stiffness and photophobia'}. What is the most appropriate management?`,
    ]
  };
  
  const templates = stemTemplates[specialty as keyof typeof stemTemplates] || [`A ${age}-year-old ${gender} presents with clinical features of ${scenario}. What is the most appropriate management?`];
  return templates[index % templates.length];
};

// Generate realistic answer options
const generateRealisticOptions = (specialty: string, scenario: string, index: number): string[] => {
  const optionSets = {
    'cardiovascular': [
      ['Primary PCI', 'Thrombolysis', 'Dual antiplatelet therapy', 'Beta-blocker therapy', 'Conservative management'],
      ['Echocardiogram', 'Cardiac catheterization', 'Exercise stress test', 'Holter monitor', 'CT coronary angiogram'],
      ['Metoprolol', 'Amlodipine', 'Ramipril', 'Atorvastatin', 'Aspirin'],
    ],
    'respiratory': [
      ['Salbutamol inhaler', 'Prednisolone', 'Antibiotics', 'Oxygen therapy', 'Chest physiotherapy'],
      ['Chest X-ray', 'CT pulmonary angiogram', 'Arterial blood gas', 'Spirometry', 'Bronchoscopy'],
      ['Asthma', 'COPD', 'Pneumonia', 'Pulmonary embolism', 'Lung cancer'],
    ],
    'psychiatry': [
      ['Cognitive behavioural therapy', 'Selective serotonin reuptake inhibitor', 'Lithium carbonate', 'Crisis intervention team', 'Inpatient psychiatric admission'],
      ['Mental state examination', 'Beck Depression Inventory', 'CT head scan', 'Thyroid function tests', 'Vitamin B12 and folate'],
      ['Major depressive disorder', 'Bipolar affective disorder', 'Schizophrenia', 'Generalized anxiety disorder', 'Substance use disorder'],
    ],
    'gastroenterology': [
      ['Proton pump inhibitor', 'H. pylori eradication therapy', 'Upper GI endoscopy', 'Colonoscopy', 'Conservative management'],
      ['Inflammatory bowel disease', 'Peptic ulcer disease', 'Gastroesophageal reflux', 'Colorectal carcinoma', 'Irritable bowel syndrome'],
      ['Mesalazine', 'Prednisolone', 'Infliximab', 'Methotrexate', 'Azathioprine'],
    ],
    'neurology': [
      ['Alteplase thrombolysis', 'Aspirin and clopidogrel', 'CT angiogram', 'MRI brain with DWI', 'Carotid endarterectomy'],
      ['Stroke', 'Transient ischaemic attack', 'Migraine with aura', 'Tension headache', 'Subarachnoid haemorrhage'],
      ['Levetiracetam', 'Carbamazepine', 'Sodium valproate', 'Phenytoin', 'Lamotrigine'],
    ],
    'endocrinology': [
      ['Metformin', 'Insulin therapy', 'Gliclazide', 'Lifestyle modification', 'Bariatric surgery referral'],
      ['Type 1 diabetes mellitus', 'Type 2 diabetes mellitus', 'Diabetic ketoacidosis', 'Hyperosmolar hyperglycaemic state', 'Gestational diabetes'],
      ['Levothyroxine', 'Carbimazole', 'Radioiodine therapy', 'Thyroid surgery', 'Conservative monitoring'],
    ],
    'surgery': [
      ['Emergency laparotomy', 'Laparoscopic cholecystectomy', 'Appendicectomy', 'Conservative management', 'CT abdomen with contrast'],
      ['General anaesthesia', 'Spinal anaesthesia', 'Local anaesthesia', 'Regional nerve block', 'Conscious sedation'],
      ['Acute appendicitis', 'Cholecystitis', 'Bowel obstruction', 'Perforated peptic ulcer', 'Incarcerated hernia'],
    ],
    'obstetrics-gynaecology': [
      ['Emergency caesarean section', 'Instrumental delivery', 'Normal vaginal delivery', 'Induction of labour', 'Expectant management'],
      ['Preeclampsia', 'Gestational diabetes', 'Placenta praevia', 'Fetal growth restriction', 'Normal pregnancy'],
      ['Magnesium sulphate', 'Betamethasone', 'Anti-D immunoglobulin', 'Iron supplementation', 'Folic acid'],
    ],
    'paediatrics': [
      ['Oral rehydration therapy', 'IV fluid resuscitation', 'Antibiotic therapy', 'Bronchodilator therapy', 'Supportive care'],
      ['Bronchiolitis', 'Pneumonia', 'Gastroenteritis', 'Febrile convulsion', 'Viral upper respiratory tract infection'],
      ['Salbutamol', 'Prednisolone', 'Amoxicillin', 'Paracetamol', 'Ibuprofen'],
    ]
  };
  
  const sets = optionSets[specialty as keyof typeof optionSets] || [
    ['Conservative management', 'Medical therapy', 'Surgical intervention', 'Further investigation', 'Specialist referral']
  ];
  
  return sets[index % sets.length];
};

// Generate realistic explanations
const generateRealisticExplanation = (specialty: string, scenario: string, index: number): string => {
  const explanations: Record<string, string> = {
    'cardiovascular': `This clinical presentation is consistent with ${scenario}. The management follows current ESC/AHA guidelines emphasizing evidence-based treatment protocols and risk stratification.`,
    'respiratory': `The symptoms and investigations suggest ${scenario}. Treatment should follow BTS/NICE guidelines with appropriate monitoring and follow-up.`,
    'gastroenterology': `This presentation indicates ${scenario}. Management should include appropriate investigation and treatment according to BSG guidelines.`
  };
  
  return explanations[specialty] || `This case demonstrates typical features of ${scenario} requiring appropriate clinical management according to current guidelines.`;
};

const PRACTICE_QUESTIONS: GMCQuestion[] = EXPANDED_QUESTION_BANK;

export default function PLAB1New() {
  // Session state
  const [sessionStarted, setSessionStarted] = useState(false);
  const [sessionQuestions, setSessionQuestions] = useState<GMCQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [showExplanation, setShowExplanation] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [questionTimes, setQuestionTimes] = useState<number[]>([]);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [showResults, setShowResults] = useState(false);
  
  // Category selection
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Language settings
  const [currentLanguage, setCurrentLanguage] = useState<string>('en');
  const [showTranslation, setShowTranslation] = useState(false);

  // Auto-enable translations when non-English language is selected
  useEffect(() => {
    if (currentLanguage !== 'en') {
      setShowTranslation(true);
    } else {
      setShowTranslation(false);
    }
  }, [currentLanguage]);
  
  // Available languages for medical education
  const supportedLanguages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'ur', name: 'Urdu', flag: '🇵🇰' },
    { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
    { code: 'ar', name: 'Arabic', flag: '🇸🇦' },
    { code: 'bn', name: 'Bengali', flag: '🇧🇩' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸' },
    { code: 'fr', name: 'French', flag: '🇫🇷' },
    { code: 'de', name: 'German', flag: '🇩🇪' },
    { code: 'it', name: 'Italian', flag: '🇮🇹' },
    { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
    { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
    { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
    { code: 'ko', name: 'Korean', flag: '🇰🇷' },
    { code: 'ru', name: 'Russian', flag: '🇷🇺' },
    { code: 'tr', name: 'Turkish', flag: '🇹🇷' },
    { code: 'pl', name: 'Polish', flag: '🇵🇱' },
    { code: 'ro', name: 'Romanian', flag: '🇷🇴' }
  ];
  
  // Translation cache and state
  const [translationCache, setTranslationCache] = useState<Record<string, Record<string, string>>>({});
  const [currentTranslations, setCurrentTranslations] = useState<Record<string, string>>({});
  const [isTranslating, setIsTranslating] = useState(false);
  
  // Real translation function using OpenAI API
  const getTranslation = async (text: string, targetLang: string, key: string) => {
    if (targetLang === 'en') return;
    
    // Check cache first
    const cacheKey = `${targetLang}-${text.substring(0, 50)}`;
    if (translationCache[targetLang]?.[cacheKey]) {
      setCurrentTranslations(prev => ({
        ...prev,
        [key]: translationCache[targetLang][cacheKey]
      }));
      return;
    }
    
    try {
      setIsTranslating(true);
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          targetLanguage: targetLang,
          context: 'medical_education'
        }),
      });
      
      if (!response.ok) {
        throw new Error('Translation failed');
      }
      
      const data = await response.json();
      const translatedText = data.translation;
      
      // Cache the translation
      setTranslationCache(prev => ({
        ...prev,
        [targetLang]: {
          ...prev[targetLang],
          [cacheKey]: translatedText
        }
      }));
      
      // Update current translations
      setCurrentTranslations(prev => ({
        ...prev,
        [key]: translatedText
      }));
      
    } catch (error) {
      console.error('Translation error:', error);
      setCurrentTranslations(prev => ({
        ...prev,
        [key]: `[Translation unavailable] ${text}`
      }));
    } finally {
      setIsTranslating(false);
    }
  };


  
  // Performance analytics
  const [performanceData, setPerformanceData] = useState({
    totalSessions: 0,
    averageAccuracy: 0,
    strongCategories: [] as string[],
    weakCategories: [] as string[],
    improvementTrend: 0
  });

  // Neurodiversity settings
  const [neuroAccommodations, setNeuroAccommodations] = useState<NeuroAtypicalType[]>(['none']);
  const { accommodations, questionStyles, buttonStyles } = useNeuroAccommodations(neuroAccommodations);

  // Load neurodiversity settings from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('neuro-accommodations');
    if (saved) {
      try {
        setNeuroAccommodations(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse saved accommodations');
      }
    }
  }, []);

  // Save neurodiversity settings to localStorage
  const handleAccommodationsChange = (accommodations: NeuroAtypicalType[]) => {
    setNeuroAccommodations(accommodations);
    localStorage.setItem('neuro-accommodations', JSON.stringify(accommodations));
  };

  // Calculate question counts by category using expanded question bank stats
  const getQuestionCount = (category: string) => {
    if (category === 'all') return QUESTION_BANK_STATS.totalQuestions;
    return QUESTION_BANK_STATS.byCategory[category] || 0;
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

  // Timer effect with neurodiversity accommodations
  useEffect(() => {
    if (sessionStarted && timeSpent >= 0) {
      const timer = setInterval(() => {
        setTimeSpent(prev => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [sessionStarted]);

  // Calculate adjusted time limit based on accommodations
  const getAdjustedTimeLimit = (baseTime: number) => {
    if (accommodations.extendedTime) {
      return Math.floor(baseTime * accommodations.timeMultiplier);
    }
    return baseTime;
  };

  // Visual cues for accessibility
  const getVisualCues = () => {
    if (!accommodations.visualCues) return null;
    
    return (
      <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-center gap-2 text-sm text-blue-700">
          <Brain className="w-4 h-4" />
          <span className="font-medium">Study Tips:</span>
        </div>
        <ul className="mt-2 text-sm text-blue-600 space-y-1">
          <li>• Read each option carefully before selecting</li>
          <li>• Look for key clinical terms in the question</li>
          <li>• Consider the patient's age and presentation</li>
        </ul>
      </div>
    );
  };

  // Start practice session function
  const startPractice = (questionCount: number) => {
    console.log(`Starting practice with ${questionCount} questions, category: ${selectedCategory}`);
    
    // Filter questions by category
    let filteredQuestions: GMCQuestion[];
    if (selectedCategory === 'all') {
      filteredQuestions = [...PRACTICE_QUESTIONS];
    } else {
      filteredQuestions = PRACTICE_QUESTIONS.filter(q => q.category === selectedCategory);
    }

    console.log(`Found ${filteredQuestions.length} questions for category ${selectedCategory}`);

    if (filteredQuestions.length === 0) {
      console.error('No questions available for selected category');
      alert('No questions available for the selected category. Please choose a different category.');
      return;
    }

    // Shuffle and select questions
    const shuffled = [...filteredQuestions].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, Math.min(questionCount, filteredQuestions.length));

    console.log(`Selected ${selected.length} questions for practice session`);

    // Randomize answer positions for each question
    const questionsWithShuffledOptions = selected.map(question => {
      const correctOption = question.options[question.correctAnswer];
      const allOptions = [...question.options];
      
      // Shuffle the options array
      const shuffledOptions = allOptions.sort(() => Math.random() - 0.5);
      
      // Find new position of correct answer
      const newCorrectAnswer = shuffledOptions.indexOf(correctOption);
      
      return {
        ...question,
        options: shuffledOptions,
        correctAnswer: newCorrectAnswer
      };
    });

    // Initialize session
    setSessionQuestions(questionsWithShuffledOptions);
    setUserAnswers(new Array(selected.length).fill(null));
    setCurrentQuestionIndex(0);
    setSelectedAnswer("");
    setShowExplanation(false);
    setTimeSpent(0);
    setSessionStarted(true);
  };

  // Answer handling
  const handleAnswerSelect = (answerIndex: string) => {
    if (showExplanation) return;
    setSelectedAnswer(answerIndex);
  };

  const submitAnswer = () => {
    if (!selectedAnswer) return;
    
    const answerIndex = parseInt(selectedAnswer);
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setUserAnswers(newAnswers);
    
    // Track question timing
    const questionTime = (Date.now() - questionStartTime) / 1000;
    const newTimes = [...questionTimes];
    newTimes[currentQuestionIndex] = questionTime;
    setQuestionTimes(newTimes);
    setShowExplanation(true);
  };

  // Navigation
  const nextQuestion = () => {
    if (currentQuestionIndex < sessionQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer("");
      setShowExplanation(false);
      setQuestionStartTime(Date.now());
    } else {
      // Session complete
      setSessionComplete(true);
      setShowResults(true);
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setSelectedAnswer("");
      setShowExplanation(false);
    }
  };

  const endSession = () => {
    setSessionStarted(false);
    setSessionQuestions([]);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setSelectedAnswer("");
    setShowExplanation(false);
    setTimeSpent(0);
    setSessionComplete(false);
    setShowResults(false);
    setQuestionTimes([]);
  };

  // Calculate comprehensive session results
  const calculateSessionResults = () => {
    const answered = userAnswers.filter(answer => answer !== null).length;
    const correct = userAnswers.filter((answer, index) => 
      answer !== null && answer === sessionQuestions[index]?.correctAnswer
    ).length;
    const accuracy = answered > 0 ? Math.round((correct / answered) * 100) : 0;
    
    // Category performance breakdown
    const categoryStats = {} as Record<string, { correct: number; total: number; accuracy: number }>;
    sessionQuestions.forEach((question, index) => {
      const userAnswer = userAnswers[index];
      if (userAnswer !== null) {
        if (!categoryStats[question.category]) {
          categoryStats[question.category] = { correct: 0, total: 0, accuracy: 0 };
        }
        categoryStats[question.category].total++;
        if (userAnswer === question.correctAnswer) {
          categoryStats[question.category].correct++;
        }
      }
    });

    Object.keys(categoryStats).forEach(category => {
      const stats = categoryStats[category];
      stats.accuracy = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
    });

    // Time analysis
    const averageTimePerQuestion = questionTimes.length > 0 
      ? Math.round(questionTimes.reduce((a, b) => a + b, 0) / questionTimes.length) 
      : 0;
    const fastestTime = questionTimes.length > 0 ? Math.round(Math.min(...questionTimes)) : 0;
    const slowestTime = questionTimes.length > 0 ? Math.round(Math.max(...questionTimes)) : 0;

    return {
      totalQuestions: sessionQuestions.length,
      answered,
      correct,
      accuracy,
      timeSpent,
      averageTimePerQuestion,
      fastestTime,
      slowestTime,
      categoryStats
    };
  };

  // Stats calculation
  const getStats = () => {
    const answered = userAnswers.filter(a => a !== null).length;
    const correct = userAnswers.filter((a, i) => a === sessionQuestions[i]?.correctAnswer).length;
    const accuracy = answered > 0 ? Math.round((correct / answered) * 100) : 0;
    return { answered, correct, accuracy, total: sessionQuestions.length };
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Current question data
  const currentQuestion = sessionQuestions[currentQuestionIndex];
  const isAnswered = userAnswers[currentQuestionIndex] !== null;
  const isCorrect = isAnswered && userAnswers[currentQuestionIndex] === currentQuestion?.correctAnswer;
  const stats = getStats();

  // Debug logging
  useEffect(() => {
    if (currentQuestion) {
      console.log('Current question data:', {
        id: currentQuestion.id,
        stem: currentQuestion.stem.substring(0, 50) + '...',
        options: currentQuestion.options,
        optionsType: typeof currentQuestion.options,
        isArray: Array.isArray(currentQuestion.options),
        optionsLength: currentQuestion.options?.length
      });
    }
  }, [currentQuestion]);

  // Trigger translations when language or translation visibility changes
  useEffect(() => {
    if (showTranslation && currentLanguage !== 'en' && currentQuestion) {
      // Clear previous translations
      setCurrentTranslations({});
      
      // Translate question stem
      getTranslation(currentQuestion.stem, currentLanguage, 'question-stem');
      
      // Translate options
      currentQuestion.options.forEach((option, index) => {
        getTranslation(option, currentLanguage, `option-${index}`);
      });
    }
  }, [showTranslation, currentLanguage, currentQuestion]);

  // Session selection view
  if (!sessionStarted) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Target className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold">PLAB 1 Practice</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            High-quality GMC-aligned practice questions for PLAB 1 preparation
          </p>
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold text-green-800">Comprehensive Question Bank</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="text-center">
                <div className="font-bold text-2xl text-green-700">{PRACTICE_QUESTIONS.length.toLocaleString()}</div>
                <div className="text-green-600">Total Questions</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-2xl text-green-700">18</div>
                <div className="text-green-600">Medical Specialties</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-2xl text-green-700">3</div>
                <div className="text-green-600">Difficulty Levels</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-2xl text-green-700">100%</div>
                <div className="text-green-600">GMC Aligned</div>
              </div>
            </div>
          </div>
        </div>

        {/* Accessibility & Neurodiversity Support */}
        <Card className="mb-6 border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Brain className="w-6 h-6 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-purple-900">Accessibility Settings</h3>
                  <p className="text-purple-700">Customize your learning experience for ADHD, dyslexia, autism, and other learning differences</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-sm text-purple-700 font-medium">Enhanced support for diverse learning needs</span>
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0">
                <NeuroSettings 
                  selectedAccommodations={neuroAccommodations}
                  onAccommodationsChange={handleAccommodationsChange}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Featured All Categories Option */}
        <Card className="mb-6 border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-blue-900">Complete Question Bank</h3>
                  <p className="text-blue-700">Access all {QUESTION_BANK_STATS.totalQuestions.toLocaleString()} questions across 18 medical specialties</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-green-700 font-medium">Recommended for comprehensive practice</span>
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0">
                <Button 
                  size="lg"
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full md:w-auto px-6 py-3 ${selectedCategory === 'all' 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  {selectedCategory === 'all' ? '✓ Selected' : 'Select All Categories'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Category Selection */}
        <Card className="mb-8 border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-lg">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Target className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-xl text-blue-900">Choose Your Medical Specialty</CardTitle>
                <CardDescription className="text-blue-700 font-medium">Focus on specific areas for targeted PLAB preparation</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="p-4 bg-white rounded-lg border border-blue-200 shadow-sm">
                <Label className="text-base font-semibold mb-3 block text-blue-900">Select Medical Specialty:</Label>
                <Select value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as GMCCategory | 'all')}>
                  <SelectTrigger className="w-full h-12 border-2 border-blue-300 bg-white hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200">
                    <SelectValue placeholder="👩‍⚕️ Choose your specialty area" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableCategories.filter(cat => cat.value !== 'all').map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label} ({category.count} questions)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="text-center">
                <div className="p-3 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg">
                  <p className="text-sm font-medium text-green-800">
                    ✅ Currently Selected: <strong className="text-green-900">{availableCategories.find(c => c.value === selectedCategory)?.label}</strong>
                  </p>
                  <p className="text-xs text-green-700 mt-1">
                    {availableCategories.find(c => c.value === selectedCategory)?.count} questions available for practice
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Neurodiversity Information */}
        {neuroAccommodations.length > 0 && !neuroAccommodations.includes('none') && (
          <Card className="mb-6 bg-green-50 border-green-200">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-2">
                <Brain className="w-5 h-5 text-green-600" />
                <h3 className="font-semibold text-green-800">Active Accessibility Settings</h3>
              </div>
              <p className="text-sm text-green-700 mb-3">
                Your learning accommodations are active: {neuroAccommodations
                  .filter(acc => acc !== 'none')
                  .map(acc => {
                    const accommodation = NEURO_ACCOMMODATIONS.find(na => na.id === acc);
                    return accommodation?.name;
                  })
                  .filter(Boolean)
                  .join(', ')}
              </p>
              <div className="flex flex-wrap gap-2">
                {accommodations.extendedTime && (
                  <Badge variant="outline" className="text-xs bg-white">
                    {accommodations.timeMultiplier}x Extended Time
                  </Badge>
                )}
                {accommodations.largerButtons && (
                  <Badge variant="outline" className="text-xs bg-white">Larger Buttons</Badge>
                )}
                {accommodations.visualCues && (
                  <Badge variant="outline" className="text-xs bg-white">Visual Cues</Badge>
                )}
                {accommodations.audioSupport && (
                  <Badge variant="outline" className="text-xs bg-white flex items-center gap-1">
                    <Volume2 className="w-3 h-3" />
                    Audio Support
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Specialty Selection Notice */}
        {selectedCategory === 'all' && (
          <div className="mb-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                <Target className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold text-amber-900">💡 Tip: Choose Your Medical Specialty</h3>
                <p className="text-sm text-amber-800">Select a specific specialty above for more targeted practice and better exam preparation</p>
              </div>
            </div>
          </div>
        )}

        {/* Practice Options */}
        <Card>
          <CardHeader>
            <CardTitle>Choose Practice Mode</CardTitle>
            <CardDescription>
              {selectedCategory === 'all' 
                ? 'Practice with questions from all medical specialties' 
                : `Practice ${availableCategories.find(c => c.value === selectedCategory)?.label} questions`
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <Button 
                size="lg" 
                onClick={() => startPractice(25)}
                className="bg-blue-600 hover:bg-blue-700 text-white h-24 flex flex-col items-center justify-center gap-2"
              >
                <ArrowRight className="w-6 h-6" />
                <span className="font-medium">Quick Practice</span>
                <span className="text-xs opacity-90">25 questions</span>
              </Button>

              <Button 
                size="lg" 
                onClick={() => startPractice(50)}
                className="bg-purple-600 hover:bg-purple-700 text-white h-24 flex flex-col items-center justify-center gap-2"
              >
                <Brain className="w-6 h-6" />
                <span className="font-medium">Standard Quiz</span>
                <span className="text-xs opacity-90">50 questions</span>
              </Button>

              <Button 
                size="lg" 
                onClick={() => startPractice(180)}
                className="bg-orange-600 hover:bg-orange-700 text-white h-24 flex flex-col items-center justify-center gap-2"
              >
                <Clock className="w-6 h-6" />
                <span className="font-medium">PLAB 1 Mock</span>
                <span className="text-xs opacity-90">180 questions</span>
              </Button>

              <Button 
                size="lg" 
                onClick={() => startPractice(500)}
                className="bg-green-600 hover:bg-green-700 text-white h-24 flex flex-col items-center justify-center gap-2"
              >
                <Target className="w-6 h-6" />
                <span className="font-medium">Comprehensive</span>
                <span className="text-xs opacity-90">500 questions</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Practice session view
  if (!currentQuestion) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Loading Question...</h2>
          <p>Please wait while we prepare your practice session.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Session Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Target className="w-6 h-6 text-blue-600" />
            <h1 className="text-xl md:text-2xl font-bold">PLAB 1 Practice Session</h1>
          </div>
          
          <Button variant="outline" onClick={endSession} className="gap-2">
            <Home className="w-4 h-4" />
            <span className="hidden sm:inline">End Session</span>
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span>Question {currentQuestionIndex + 1} of {sessionQuestions.length}</span>
            <span>{formatTime(timeSpent)}</span>
          </div>
          <Progress value={(currentQuestionIndex + 1) / sessionQuestions.length * 100} />
        </div>

        {/* Stats */}
        <div className="flex gap-4 text-sm">
          <span className="flex items-center gap-1">
            <CheckCircle className="w-4 h-4 text-green-600" />
            Correct: {stats.correct}
          </span>
          <span className="flex items-center gap-1">
            <XCircle className="w-4 h-4 text-red-600" />
            Answered: {stats.answered}
          </span>
          <span className="flex items-center gap-1">
            <TrendingUp className="w-4 h-4 text-blue-600" />
            Accuracy: {stats.accuracy}%
          </span>
        </div>
      </div>

      {/* Visual Cues for Neurodiversity Support */}
      {getVisualCues()}

      {/* Language Controls - Mobile Friendly Position */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4 p-3 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-2">
          <Languages className="w-4 h-4 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">Language:</span>
          <Select value={currentLanguage} onValueChange={setCurrentLanguage}>
            <SelectTrigger className="w-auto min-w-[140px] text-sm">
              <SelectValue>
                {supportedLanguages.find(lang => lang.code === currentLanguage)?.flag} {supportedLanguages.find(lang => lang.code === currentLanguage)?.name}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {supportedLanguages.map((language) => (
                <SelectItem key={language.code} value={language.code}>
                  <div className="flex items-center gap-2">
                    <span>{language.flag}</span>
                    <span>{language.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {currentLanguage !== 'en' && (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowTranslation(!showTranslation)}
              className={`gap-1 text-xs ${showTranslation ? 'bg-blue-100 text-blue-700' : 'text-gray-600'}`}
            >
              <Globe className="w-3 h-3" />
              {showTranslation ? 'Hide Translation' : 'Show Translation'}
            </Button>
            {isTranslating && (
              <div className="flex items-center gap-1 text-xs text-blue-600">
                <div className="animate-spin w-3 h-3 border border-blue-600 border-t-transparent rounded-full"></div>
                Translating...
              </div>
            )}
          </div>
        )}
      </div>

      {/* Question Section - Top Priority Layout */}
      <div className="space-y-6">
        {/* Question Header */}
        <Card className={`${accommodations.reducedClutter ? 'border-2 shadow-sm' : 'shadow-lg'}`}>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between mb-4">
              <Badge variant="secondary" className="text-sm">{currentQuestion.category}</Badge>
              <Badge variant="outline" className="text-sm">Intermediate</Badge>
            </div>
            

            
            {/* Question Stem - Full Width Top */}
            <div className="w-full">
              <CardTitle className={`w-full ${questionStyles} leading-relaxed text-lg ${accommodations.keywordHighlighting ? 'font-medium' : ''} mb-4`}>
                {currentQuestion.stem}
              </CardTitle>
              
              {/* Audio Support */}
              {accommodations.audioSupport && (
                <div className="flex justify-end mb-4">
                  <AudioSupport 
                    text={currentQuestion.stem + (showTranslation && currentTranslations['question-stem'] 
                      ? ` Translation: ${currentTranslations['question-stem']}` 
                      : '')}
                    size="default"
                    className="justify-end"
                  />
                </div>
              )}
              
              {/* Translation Section */}
              {showTranslation && currentLanguage !== 'en' && (
                <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r">
                  <div className="flex items-center gap-2 text-sm text-blue-700 mb-2">
                    <Globe className="w-4 h-4" />
                    <span className="font-medium">Translation ({supportedLanguages.find(lang => lang.code === currentLanguage)?.name}):</span>
                  </div>
                  <div className="text-blue-800 leading-relaxed text-lg">
                    {currentTranslations['question-stem'] || (isTranslating ? 'Translating...' : 'Translation loading...')}
                  </div>
                </div>
              )}
            </div>
          </CardHeader>
        </Card>

        {/* Answer Options Section - Full Width Below Question */}
        <Card className={`${accommodations.reducedClutter ? 'border-2 shadow-sm' : 'shadow-lg'}`}>
          <CardHeader>
            <CardTitle className="text-lg">Select your answer:</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={selectedAnswer} onValueChange={handleAnswerSelect} className="space-y-3">
              {currentQuestion.options && Array.isArray(currentQuestion.options) ? 
                currentQuestion.options.map((option, index) => (
                  <div key={index} className="w-full">
                    <Label 
                      htmlFor={`option-${index}`} 
                      className={`w-full flex items-start gap-4 cursor-pointer ${accommodations.largerButtons ? 'p-6' : 'p-4'} rounded-lg border transition-all duration-200 ${questionStyles} ${
                        showExplanation && index === currentQuestion.correctAnswer
                          ? 'bg-green-50 border-green-300 text-green-800 border-2'
                          : showExplanation && index === parseInt(selectedAnswer) && index !== currentQuestion.correctAnswer
                          ? 'bg-red-50 border-red-300 text-red-800 border-2'
                          : selectedAnswer === index.toString() && !showExplanation
                          ? 'bg-blue-50 border-blue-400 border-2 text-blue-900 shadow-md'
                          : 'hover:bg-gray-50 border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <RadioGroupItem 
                        value={index.toString()} 
                        id={`option-${index}`}
                        disabled={showExplanation}
                        className="mt-1 flex-shrink-0"
                      />
                      <div className="flex-1">
                        <div className="flex items-start gap-3">
                          <span className="font-bold text-gray-700 text-lg flex-shrink-0">
                            {String.fromCharCode(65 + index)}.
                          </span>
                          <span className="text-base leading-relaxed">
                            {typeof option === 'string' ? option : `Option ${String.fromCharCode(65 + index)}`}
                          </span>
                        </div>
                        {showTranslation && currentLanguage !== 'en' && (
                          <div className="mt-3 text-sm text-gray-600 italic border-l-2 border-gray-300 pl-3 ml-6">
                            {currentTranslations[`option-${index}`] || 'Translating...'}
                          </div>
                        )}
                      </div>
                    </Label>
                  </div>
                )) : 
                <div className="text-red-500 text-center p-4">No options available for this question</div>
              }
            </RadioGroup>
          </CardContent>
        </Card>
      </div>

      {/* Answer Explanation */}
      {showExplanation && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {isCorrect ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <XCircle className="w-5 h-5 text-red-600" />
              )}
              {isCorrect ? 'Correct!' : 'Incorrect'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Explanation:</h4>
                <p className="text-muted-foreground leading-relaxed">
                  {currentQuestion.explanation}
                </p>
              </div>
              {currentQuestion.learningObjectives && currentQuestion.learningObjectives.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2">Learning Objectives:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    {currentQuestion.learningObjectives.map((objective, index) => (
                      <li key={index}>{objective}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Educational References */}
              {currentQuestion.references && currentQuestion.references.length > 0 && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="w-4 h-4 text-green-600" />
                    <h5 className="font-medium text-green-800">Educational References:</h5>
                  </div>
                  <div className="space-y-2">
                    {currentQuestion.references.map((reference, index) => {
                      const getReferenceUrl = (ref: string) => {
                        if (ref.includes('NICE CG')) {
                          const cgNumber = ref.match(/CG(\d+)/)?.[1];
                          if (cgNumber) return `https://www.nice.org.uk/guidance/cg${cgNumber}`;
                        }
                        if (ref.includes('NICE NG')) {
                          const ngNumber = ref.match(/NG(\d+)/)?.[1];
                          if (ngNumber) return `https://www.nice.org.uk/guidance/ng${ngNumber}`;
                        }
                        if (ref.includes('NICE')) return 'https://www.nice.org.uk/guidance';
                        if (ref.includes('ESC')) return 'https://www.escardio.org/Guidelines';
                        if (ref.includes('BTS')) return 'https://www.brit-thoracic.org.uk/quality-improvement/guidelines/';
                        if (ref.includes('BNF')) return 'https://bnf.nice.org.uk/';
                        if (ref.includes('NEJM')) return 'https://www.nejm.org/';
                        if (ref.includes('Lancet')) return 'https://www.thelancet.com/';
                        if (ref.includes('BMJ')) return 'https://www.bmj.com/';
                        if (ref.includes('KDIGO')) return 'https://kdigo.org/guidelines/';
                        if (ref.includes('WHO')) return 'https://www.who.int/publications/guidelines';
                        if (ref.includes('ILAE')) return 'https://www.ilae.org/guidelines';
                        if (ref.includes('ABN')) return 'https://www.theabn.org/page/ProfessionalGuidance';
                        return null;
                      };

                      const url = getReferenceUrl(reference);
                      const referenceType = reference.includes('NICE') ? 'NICE' : 
                                          reference.includes('ESC') ? 'ESC' :
                                          reference.includes('BTS') ? 'BTS' :
                                          reference.includes('BNF') ? 'BNF' :
                                          reference.includes('NEJM') ? 'NEJM' :
                                          reference.includes('Lancet') ? 'LANCET' :
                                          reference.includes('BMJ') ? 'BMJ' :
                                          reference.includes('KDIGO') ? 'KDIGO' :
                                          reference.includes('WHO') ? 'WHO' :
                                          reference.includes('ILAE') ? 'ILAE' :
                                          reference.includes('ABN') ? 'ABN' :
                                          'REFERENCE';

                      return (
                        <div key={index} className="flex items-start gap-2 text-sm text-green-700 p-2 bg-white rounded border border-green-100 hover:border-green-300 transition-colors">
                          <span className="text-green-600 font-medium text-xs mt-0.5 flex-shrink-0">
                            {index + 1}.
                          </span>
                          {url ? (
                            <a 
                              href={url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex-1 leading-relaxed hover:text-green-800 hover:underline transition-colors cursor-pointer"
                            >
                              {reference}
                            </a>
                          ) : (
                            <span className="flex-1 leading-relaxed">{reference}</span>
                          )}
                          <Badge 
                            variant="outline" 
                            className="text-xs px-1.5 py-0.5 border-green-300 text-green-700 flex-shrink-0"
                          >
                            {referenceType}
                          </Badge>
                          {url && (
                            <ExternalLink className="w-3 h-3 text-green-600 flex-shrink-0 mt-0.5" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <p className="text-xs text-green-600 mt-2">
                    Click on references to access official guidelines and publications
                  </p>
                </div>
              )}

              {/* Educational Disclaimer - Bottom Position */}
              <div className="mt-6 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-xs text-amber-800 font-medium">
                  ⚠️ Educational Disclaimer: This information is for educational purposes only and not a substitute for professional medical advice.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex gap-4 justify-center">
        <Button 
          variant="outline" 
          onClick={previousQuestion}
          disabled={currentQuestionIndex === 0}
          className={`gap-2 ${buttonStyles}`}
        >
          <ArrowLeft className="w-4 h-4" />
          Previous
        </Button>

        {!showExplanation ? (
          <Button 
            onClick={submitAnswer}
            disabled={!selectedAnswer}
            className={`gap-2 ${buttonStyles}`}
          >
            Submit Answer
          </Button>
        ) : (
          <Button 
            onClick={nextQuestion}
            disabled={currentQuestionIndex === sessionQuestions.length - 1}
            className={`gap-2 ${buttonStyles}`}
          >
            Next Question
            <ArrowRight className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Session Complete */}
      {currentQuestionIndex === sessionQuestions.length - 1 && showExplanation && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-6 h-6 text-yellow-600" />
              Session Complete!
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <div className="text-lg">
                You scored {stats.correct} out of {stats.total} ({stats.accuracy}%)
              </div>
              <div className="text-sm text-muted-foreground">
                Time taken: {formatTime(timeSpent)}
              </div>
              <Button onClick={endSession} className="gap-2">
                <RotateCcw className="w-4 h-4" />
                Start New Session
              </Button>
            </div>
          </CardContent>
        </Card>
      )}


    </div>
  );
}