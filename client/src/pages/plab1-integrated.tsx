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
  ArrowRight, ArrowLeft, RotateCcw, Award, TrendingUp, Home, Globe, Languages
} from "lucide-react";
import { COMPREHENSIVE_FLASHCARD_COLLECTION, FLASHCARD_STATS, type Flashcard } from "@shared/high-yield-flashcards";

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

// Simple translation function for demonstration - in production this would use a translation API
const translateText = (text: string): string => {
  // This is a simplified example - in production you'd use Google Translate API or similar
  const commonTranslations: Record<string, string> = {
    // Common medical terms
    "heart": "قلب",
    "patient": "مريض", 
    "diagnosis": "تشخيص",
    "treatment": "علاج",
    "symptoms": "أعراض",
    "blood pressure": "ضغط الدم",
    "chest pain": "ألم في الصدر",
    "shortness of breath": "ضيق في التنفس",
    "fever": "حمى",
    "headache": "صداع",
    // Common question words
    "What is the": "ما هو",
    "Which of the following": "أي مما يلي",
    "The most likely": "الأكثر احتمالا",
    "best treatment": "أفضل علاج",
    "first line": "الخط الأول"
  };
  
  let translated = text;
  Object.entries(commonTranslations).forEach(([english, native]) => {
    translated = translated.replace(new RegExp(english, 'gi'), native);
  });
  
  return `[Native] ${translated}`;
};

export default function PLAB1Integrated() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isEnglish, setIsEnglish] = useState(true);

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
              
              {/* Language Switcher */}
              <div className="flex items-center gap-1 bg-gray-50 rounded-lg p-1">
                <Button
                  variant={isEnglish ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setIsEnglish(true)}
                  className="text-xs px-3 py-1 h-7"
                >
                  🇬🇧 EN
                </Button>
                <Button
                  variant={!isEnglish ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setIsEnglish(false)}
                  className="text-xs px-3 py-1 h-7"
                >
                  🌐 Arabic
                </Button>
              </div>
            </div>
            <CardTitle className="text-xl leading-relaxed text-gray-900">
              {isEnglish ? (
                currentQuestion.stem
              ) : (
                <div className="space-y-2">
                  <div className="text-gray-900">{currentQuestion.stem}</div>
                  <div className="text-gray-600 text-base font-normal italic">{translateText(currentQuestion.stem)}</div>
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
                    {isEnglish ? (
                      `${String.fromCharCode(65 + index)}. ${option}`
                    ) : (
                      <div className="space-y-1">
                        <div>{String.fromCharCode(65 + index)}. {option}</div>
                        <div className="text-gray-600 text-sm font-normal italic ml-4">{translateText(option)}</div>
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
                <h4 className="font-semibold text-gray-900 mb-2">{isEnglish ? 'Explanation' : 'Explanation / شرح'}</h4>
                {isEnglish ? (
                  <p className="text-gray-800 leading-relaxed">{currentQuestion.explanation}</p>
                ) : (
                  <div className="space-y-3">
                    <p className="text-gray-800 leading-relaxed">{currentQuestion.explanation}</p>
                    <p className="text-gray-600 leading-relaxed italic border-l-2 border-gray-300 pl-3">{translateText(currentQuestion.explanation)}</p>
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
      </div>
    </div>
  );
}