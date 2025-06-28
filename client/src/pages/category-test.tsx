import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, XCircle, RotateCcw, ArrowLeft, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CategoryTest() {
  const [selectedCategory, setSelectedCategory] = useState<string>('dermatology');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('intermediate');
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [showExplanation, setShowExplanation] = useState(false);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [questionStartTime, setQuestionStartTime] = useState<number>(0);
  const [timeSpent, setTimeSpent] = useState<number>(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const categories = [
    { value: 'dermatology', label: 'Dermatology' },
    { value: 'cardiovascular', label: 'Cardiovascular' },
    { value: 'infectious-diseases', label: 'Infectious Diseases' },
    { value: 'respiratory', label: 'Respiratory' },
    { value: 'neurology', label: 'Neurology' },
    { value: 'gastroenterology', label: 'Gastroenterology' },
    { value: 'endocrinology', label: 'Endocrinology' },
    { value: 'psychiatry', label: 'Psychiatry' },
    { value: 'obstetrics-gynecology', label: 'Obstetrics & Gynecology' },
    { value: 'pediatrics', label: 'Pediatrics' },
    { value: 'emergency-medicine', label: 'Emergency Medicine' },
    { value: 'all', label: 'All Categories' }
  ];

  const difficulties = [
    { value: 'basic', label: 'Basic' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' }
  ];

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerRunning && questionStartTime > 0) {
      interval = setInterval(() => {
        setTimeSpent(Math.floor((Date.now() - questionStartTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning, questionStartTime]);

  const loadQuestions = async (count: number = 10) => {
    setLoading(true);
    setError('');
    
    try {
      const url = `/api/test/questions?category=${selectedCategory}&difficulty=${selectedDifficulty}&count=${count}`;
      console.log('Loading questions from URL:', url);
      console.log('Current category state:', selectedCategory);
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Failed to load questions');
      }
      
      const data = await response.json();
      console.log('API Response data:', data);
      
      if (data && data.length > 0) {
        setQuestions(data);
        setCurrentQuestionIndex(0);
        setSelectedAnswer("");
        setShowExplanation(false);
        setQuestionStartTime(Date.now());
        setSessionStarted(true);
        setTimerRunning(true);
        setScore({ correct: 0, total: 0 });
        return;
      }
      
      setError('No questions found for this category');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (optionKey: string) => {
    if (showExplanation) return;
    setSelectedAnswer(optionKey);
    console.log('Answer selected:', optionKey, 'showExplanation:', showExplanation);
    console.log('Selected answer set to:', optionKey);
  };

  const submitAnswer = () => {
    if (!selectedAnswer) return;
    
    setTimerRunning(false);
    setShowExplanation(true);
    
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.answer;
    
    setScore(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1
    }));
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer("");
      setShowExplanation(false);
      setQuestionStartTime(Date.now());
      setTimerRunning(true);
      setTimeSpent(0);
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setSelectedAnswer("");
      setShowExplanation(false);
      setQuestionStartTime(Date.now());
      setTimerRunning(true);
      setTimeSpent(0);
    }
  };

  const tryAgain = () => {
    setSelectedAnswer("");
    setShowExplanation(false);
    setQuestionStartTime(Date.now());
    setTimerRunning(true);
    setTimeSpent(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQuestion = questions[currentQuestionIndex];

  if (!sessionStarted) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>PLAB 1 Practice Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Select Category:
                  </label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Select Difficulty:
                  </label>
                  <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      {difficulties.map((difficulty) => (
                        <SelectItem key={difficulty.value} value={difficulty.value}>
                          {difficulty.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <Button 
                  onClick={() => {
                    console.log('Starting practice with category:', selectedCategory);
                    loadQuestions(10);
                  }} 
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  {loading ? 'Loading...' : 'Start Practice'}
                </Button>
                
                <div className="text-sm text-gray-600">
                  Category: <strong>{categories.find(c => c.value === selectedCategory)?.label}</strong> | 
                  Difficulty: <strong>{difficulties.find(d => d.value === selectedDifficulty)?.label}</strong>
                </div>
              </div>
            </CardContent>
          </Card>

          {error && (
            <Card className="mb-6 border-red-200">
              <CardContent className="pt-6">
                <div className="text-red-600">{error}</div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <h2 className="text-xl font-semibold mb-4">Session Complete!</h2>
                <p className="text-gray-600 mb-4">
                  Final Score: {score.correct}/{score.total} ({Math.round((score.correct/score.total)*100)}%)
                </p>
                <Button onClick={() => setSessionStarted(false)} className="bg-blue-600 hover:bg-blue-700">
                  Start New Session
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Category Filtering Test Page</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Select Category:
                </label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                onClick={loadQuestions} 
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {loading ? 'Loading...' : 'Load Questions'}
              </Button>
              
              <div className="text-sm text-gray-600">
                Current selection: <strong>{selectedCategory}</strong>
              </div>
            </div>
          </CardContent>
        </Card>

        {error && (
          <Card className="mb-6 border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <p className="text-red-600">Error: {error}</p>
            </CardContent>
          </Card>
        )}

        {questions.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">
              Questions ({questions.length} found)
            </h2>
            
            {questions.map((question, index) => (
              <Card key={question.id} className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <CardTitle className="text-lg">
                    Question {index + 1}: {question.topic}
                  </CardTitle>
                  <div className="text-sm text-gray-500">
                    Category: <span className="font-medium">{question.category}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">{question.question}</p>
                  
                  <div className="space-y-2">
                    {Object.entries(question.options || {}).map(([key, value]) => (
                      <div key={key} className="flex items-start gap-2">
                        <span className="font-medium text-gray-700 min-w-[24px]">
                          {key}:
                        </span>
                        <span>{value as string}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 p-3 bg-green-50 rounded">
                    <p className="text-sm text-green-800">
                      <strong>Correct Answer:</strong> {question.answer}
                    </p>
                    <p className="text-sm text-green-700 mt-1">
                      {question.explanation}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}