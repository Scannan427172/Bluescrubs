import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Clock, CheckCircle, XCircle, BookOpen, Target, Brain, 
  ArrowRight, ArrowLeft, RotateCcw, Award, TrendingUp, Home
} from "lucide-react";
import { COMPREHENSIVE_MLA_QUESTIONS, type MLAQuestion } from "@shared/mla-question-bank";

export default function PLAB1Practice() {
  // Convert MLA questions to PLAB format for backward compatibility
  const [sessionStarted, setSessionStarted] = useState(false);
  const [sessionQuestions, setSessionQuestions] = useState<MLAQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [showExplanation, setShowExplanation] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [showResults, setShowResults] = useState(false);
  
  // Filter state
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');
  
  // Available specialties
  const specialties = [
    { value: 'all', label: 'All Specialties' },
    { value: 'Cardiology', label: 'Cardiology' },
    { value: 'Respiratory Medicine', label: 'Respiratory' },
    { value: 'Gastroenterology', label: 'Gastroenterology' },
    { value: 'Neurology', label: 'Neurology' },
    { value: 'Surgery', label: 'Surgery' },
    { value: 'General Practice', label: 'General Practice' }
  ];

  // Statistics
  const [stats, setStats] = useState({
    correct: 0,
    answered: 0,
    accuracy: 0
  });

  // Timer effect
  useEffect(() => {
    if (sessionStarted && timeSpent >= 0) {
      const timer = setInterval(() => {
        setTimeSpent(prev => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [sessionStarted, timeSpent]);

  // Format time display
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  // Start practice session
  const startPractice = (questionCount: number) => {
    let filteredQuestions = [...COMPREHENSIVE_MLA_QUESTIONS];
    
    // Filter by specialty
    if (selectedSpecialty !== 'all') {
      filteredQuestions = filteredQuestions.filter(q => q.specialty === selectedSpecialty);
    }

    if (filteredQuestions.length === 0) {
      alert('No questions available for the selected specialty. Please choose a different filter.');
      return;
    }

    // Randomly select questions
    const shuffled = filteredQuestions.sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, Math.min(questionCount, filteredQuestions.length));

    setSessionQuestions(selected);
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
    setShowExplanation(true);

    // Update statistics
    const correct = answerIndex === sessionQuestions[currentQuestionIndex].correctAnswer;
    setStats(prev => ({
      correct: prev.correct + (correct ? 1 : 0),
      answered: prev.answered + 1,
      accuracy: Math.round(((prev.correct + (correct ? 1 : 0)) / (prev.answered + 1)) * 100)
    }));
  };

  // Navigation
  const nextQuestion = () => {
    if (currentQuestionIndex < sessionQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer("");
      setShowExplanation(false);
    } else {
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
    setSessionComplete(false);
    setShowResults(false);
    setStats({ correct: 0, answered: 0, accuracy: 0 });
  };

  const currentQuestion = sessionQuestions[currentQuestionIndex];

  if (!sessionStarted) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Target className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold">PLAB 1 Practice</h1>
          </div>
          <p className="text-gray-600 text-lg">
            Practice questions based on GMC Medical Licensing Assessment guidelines
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Practice Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Specialty</label>
              <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {specialties.map(specialty => (
                    <SelectItem key={specialty.value} value={specialty.value}>
                      {specialty.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Button onClick={() => startPractice(10)} className="w-full">
                10 Questions
              </Button>
              <Button onClick={() => startPractice(25)} className="w-full">
                25 Questions
              </Button>
              <Button onClick={() => startPractice(50)} className="w-full">
                50 Questions
              </Button>
              <Button onClick={() => startPractice(100)} className="w-full">
                100 Questions
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Card>
          <CardHeader className="text-center">
            <Award className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <CardTitle className="text-2xl">Session Complete!</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-3xl font-bold text-green-600">{stats.correct}</div>
                <div className="text-sm text-gray-600">Correct</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600">{stats.answered}</div>
                <div className="text-sm text-gray-600">Total</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600">{stats.accuracy}%</div>
                <div className="text-sm text-gray-600">Accuracy</div>
              </div>
            </div>

            <div className="flex gap-3 justify-center">
              <Button onClick={endSession}>
                <Home className="w-4 h-4 mr-2" />
                New Session
              </Button>
            </div>
          </CardContent>
        </Card>
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
            <h1 className="text-xl md:text-2xl font-bold">PLAB 1 Practice</h1>
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

      {/* Question Card */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Badge variant="secondary">{currentQuestion.domain}</Badge>
            <Badge variant="outline">{currentQuestion.difficulty}</Badge>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>{currentQuestion.specialty}</span>
            <span>•</span>
            <span>{currentQuestion.capability}</span>
          </div>
          <CardTitle className="text-lg leading-relaxed">
            {currentQuestion.stem}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={selectedAnswer} onValueChange={handleAnswerSelect}>
            {currentQuestion.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem 
                  value={index.toString()} 
                  id={`option-${index}`}
                  disabled={showExplanation}
                />
                <Label 
                  htmlFor={`option-${index}`} 
                  className={`flex-1 cursor-pointer p-3 rounded-lg border ${
                    showExplanation && index === currentQuestion.correctAnswer
                      ? 'bg-green-50 border-green-200 text-green-800'
                      : showExplanation && index === parseInt(selectedAnswer) && index !== currentQuestion.correctAnswer
                      ? 'bg-red-50 border-red-200 text-red-800'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-gray-600 text-sm">
                      {String.fromCharCode(65 + index)}.
                    </span>
                    <span>{option}</span>
                  </div>
                </Label>
              </div>
            ))}
          </RadioGroup>

          {!showExplanation && selectedAnswer && (
            <div className="mt-4">
              <Button onClick={submitAnswer} className="w-full">
                Submit Answer
              </Button>
            </div>
          )}

          {showExplanation && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium mb-2">Explanation:</h4>
              <p className="text-sm leading-relaxed">{currentQuestion.explanation}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      {showExplanation && (
        <div className="flex gap-3 justify-between">
          <Button 
            variant="outline" 
            onClick={previousQuestion}
            disabled={currentQuestionIndex === 0}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </Button>
          
          <Button onClick={nextQuestion} className="gap-2">
            {currentQuestionIndex === sessionQuestions.length - 1 ? (
              <>
                Complete Session
                <Award className="w-4 h-4" />
              </>
            ) : (
              <>
                Next Question
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}