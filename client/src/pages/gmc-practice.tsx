import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { 
  Clock, CheckCircle, XCircle, BookOpen, Target, Brain, 
  ArrowRight, ArrowLeft, RotateCcw, Award, TrendingUp 
} from "lucide-react";
import { GMC_QUESTION_BANK, type GMCQuestion, type GMCCategory } from "@shared/gmc-question-bank";

export default function GMCPractice() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [showExplanation, setShowExplanation] = useState(false);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);
  const [timeSpent, setTimeSpent] = useState(0);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<GMCCategory | 'all'>('respiratory');
  const [sessionQuestions, setSessionQuestions] = useState<GMCQuestion[]>([]);
  const [examType, setExamType] = useState<'plab1' | 'plab2'>('plab1');

  const categories: { value: GMCCategory | 'all'; label: string; count: number }[] = [
    { value: 'all', label: 'All Categories', count: GMC_QUESTION_BANK.length },
    { value: 'cardiovascular', label: 'Cardiovascular', count: GMC_QUESTION_BANK.filter(q => q.category === 'cardiovascular').length },
    { value: 'respiratory', label: 'Respiratory', count: GMC_QUESTION_BANK.filter(q => q.category === 'respiratory').length },
    { value: 'gastroenterology', label: 'Gastroenterology', count: GMC_QUESTION_BANK.filter(q => q.category === 'gastroenterology').length },
    { value: 'neurology', label: 'Neurology', count: GMC_QUESTION_BANK.filter(q => q.category === 'neurology').length },
    { value: 'endocrinology', label: 'Endocrinology', count: GMC_QUESTION_BANK.filter(q => q.category === 'endocrinology').length },
    { value: 'psychiatry', label: 'Psychiatry', count: GMC_QUESTION_BANK.filter(q => q.category === 'psychiatry').length },
    { value: 'obstetrics-gynaecology', label: 'Obstetrics & Gynaecology', count: GMC_QUESTION_BANK.filter(q => q.category === 'obstetrics-gynaecology').length },
    { value: 'paediatrics', label: 'Paediatrics', count: GMC_QUESTION_BANK.filter(q => q.category === 'paediatrics').length },
    { value: 'surgery', label: 'Surgery', count: GMC_QUESTION_BANK.filter(q => q.category === 'surgery').length }
  ];

  // Debug logging
  console.log('Total questions in bank:', GMC_QUESTION_BANK.length);
  console.log('Surgery questions:', GMC_QUESTION_BANK.filter(q => q.category === 'surgery').length);
  console.log('Categories with counts:', categories.map(c => `${c.label}: ${c.count}`));
  console.log('Selected category:', selectedCategory);

  useEffect(() => {
    if (sessionStarted && timeSpent > 0) {
      const timer = setInterval(() => {
        setTimeSpent(prev => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [sessionStarted, timeSpent]);

  const startSession = () => {
    const questions = selectedCategory === 'all' 
      ? GMC_QUESTION_BANK 
      : GMC_QUESTION_BANK.filter(q => q.category === selectedCategory);
    
    setSessionQuestions(questions);
    setUserAnswers(new Array(questions.length).fill(null));
    setCurrentQuestionIndex(0);
    setSelectedAnswer("");
    setShowExplanation(false);
    setTimeSpent(1);
    setSessionStarted(true);
  };

  const currentQuestion = sessionQuestions[currentQuestionIndex];
  const isAnswered = userAnswers[currentQuestionIndex] !== null;
  const isCorrect = isAnswered && userAnswers[currentQuestionIndex] === currentQuestion?.correctAnswer;

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
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < sessionQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer("");
      setShowExplanation(false);
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setSelectedAnswer("");
      setShowExplanation(false);
    }
  };

  const resetSession = () => {
    setSessionStarted(false);
    setCurrentQuestionIndex(0);
    setSelectedAnswer("");
    setShowExplanation(false);
    setUserAnswers([]);
    setTimeSpent(0);
  };

  const getSessionStats = () => {
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

  if (!sessionStarted) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Target className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold">GMC-Aligned PLAB Practice</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Practice with authentic medical questions following official GMC guidelines and PLAB specifications.
          </p>

          {/* Exam Type Selection */}
          <div className="flex gap-4 mt-6">
            <button
              onClick={() => setExamType('plab1')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                examType === 'plab1'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              PLAB 1 - MCQ Practice
            </button>
            <button
              onClick={() => setExamType('plab2')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                examType === 'plab2'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              PLAB 2 - Clinical Scenarios
            </button>
          </div>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>
              {examType === 'plab1' ? 'PLAB 1 - MCQ Practice Categories' : 'PLAB 2 - Clinical Station Types'}
            </CardTitle>
            <CardDescription>
              {examType === 'plab1' 
                ? 'Choose a specialty area or practice all categories together (180 questions, 3 hours)'
                : 'Practice clinical scenarios and communication skills (18 stations, 8 minutes each)'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((category) => (
                <div 
                  key={category.value}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                    selectedCategory === category.value 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedCategory(category.value)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{category.label}</h4>
                    <Badge variant="secondary">{category.count}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {category.count} questions available
                  </p>
                </div>
              ))}
            </div>

            {examType === 'plab2' && (
              <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-amber-800 text-sm font-bold">!</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-amber-800 mb-2">PLAB 2 Clinical Scenarios Coming Soon</h4>
                    <p className="text-amber-700 text-sm leading-relaxed mb-3">
                      PLAB 2 requires interactive clinical stations with standardized patients, communication assessments, and practical examinations. This advanced functionality is currently in development.
                    </p>
                    <div className="text-sm text-amber-700">
                      <strong>Available now:</strong> PLAB 1 MCQ practice with 5,000+ GMC-aligned questions
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8 space-y-4">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-4">🔥 Start Practice Session</h3>
                <p className="text-sm text-gray-600 mb-6">Category: {categories.find(c => c.value === selectedCategory)?.label}</p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4">
                <Button 
                  size="lg" 
                  onClick={() => {
                    console.log('Quick Practice clicked', selectedCategory, GMC_QUESTION_BANK.length);
                    const filteredQuestions = GMC_QUESTION_BANK.filter(q => selectedCategory === 'all' || q.category === selectedCategory).slice(0, 20);
                    console.log('Filtered questions:', filteredQuestions.length);
                    setSessionQuestions(filteredQuestions);
                    setUserAnswers(new Array(20).fill(null));
                    setCurrentQuestionIndex(0);
                    setSelectedAnswer("");
                    setShowExplanation(false);
                    setSessionStarted(true);
                    setTimeSpent(1);
                  }}
                  disabled={examType === 'plab2'}
                  className="bg-blue-600 hover:bg-blue-700 text-white h-20 flex flex-col items-center justify-center"
                >
                  <ArrowRight className="w-6 h-6 mb-1" />
                  <span className="font-medium">Quick Practice</span>
                  <span className="text-xs opacity-90">20 questions</span>
                </Button>

                <Button 
                  size="lg" 
                  onClick={() => {
                    console.log('Random Quiz clicked', selectedCategory);
                    const allQuestions = GMC_QUESTION_BANK.filter(q => selectedCategory === 'all' || q.category === selectedCategory);
                    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5).slice(0, 50);
                    console.log('Shuffled questions:', shuffled.length);
                    setSessionQuestions(shuffled);
                    setUserAnswers(new Array(50).fill(null));
                    setCurrentQuestionIndex(0);
                    setSelectedAnswer("");
                    setShowExplanation(false);
                    setSessionStarted(true);
                    setTimeSpent(1);
                  }}
                  disabled={examType === 'plab2'}
                  className="bg-purple-600 hover:bg-purple-700 text-white h-20 flex flex-col items-center justify-center"
                >
                  <Brain className="w-6 h-6 mb-1" />
                  <span className="font-medium">Random Quiz</span>
                  <span className="text-xs opacity-90">Mixed topics</span>
                </Button>

                <Button 
                  size="lg" 
                  onClick={() => {
                    console.log('Timed Mock clicked', selectedCategory);
                    const questions = GMC_QUESTION_BANK.filter(q => selectedCategory === 'all' || q.category === selectedCategory).slice(0, 60);
                    console.log('Mock questions:', questions.length);
                    setSessionQuestions(questions);
                    setUserAnswers(new Array(60).fill(null));
                    setCurrentQuestionIndex(0);
                    setSelectedAnswer("");
                    setShowExplanation(false);
                    setSessionStarted(true);
                    setTimeSpent(1);
                  }}
                  disabled={examType === 'plab2'}
                  className="bg-orange-600 hover:bg-orange-700 text-white h-20 flex flex-col items-center justify-center"
                >
                  <Clock className="w-6 h-6 mb-1" />
                  <span className="font-medium">Timed Mock</span>
                  <span className="text-xs opacity-90">60 minutes</span>
                </Button>
              </div>
              
              {examType === 'plab2' && (
                <div className="text-center text-sm text-gray-500 mt-4">
                  PLAB 2 clinical scenarios coming soon
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-green-600" />
                Evidence-Based Content
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                All questions created by qualified medical professionals following current clinical guidelines
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-600" />
                GMC Framework Aligned
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Questions mapped to official GMC learning outcomes and PLAB specifications
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-orange-600" />
                Quality Assured
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Multi-stage clinical review ensuring medical accuracy and educational value
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    console.log('No current question:', {
      sessionStarted,
      sessionQuestions: sessionQuestions.length,
      currentQuestionIndex,
      selectedCategory
    });
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center py-8">
          <p className="text-lg">No questions available for the selected category.</p>
          <Button onClick={() => setSessionStarted(false)} className="mt-4">
            Back to Practice Selection
          </Button>
        </div>
      </div>
    );
  }

  const stats = getSessionStats();

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header with Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">PLAB Practice</h1>
            <Badge variant="outline">
              {categories.find(c => c.value === selectedCategory)?.label}
            </Badge>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4" />
              {formatTime(timeSpent)}
            </div>
            <Button variant="outline" size="sm" onClick={resetSession}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-4">
          <span className="text-sm font-medium">
            Question {currentQuestionIndex + 1} of {sessionQuestions.length}
          </span>
          <Progress 
            value={((currentQuestionIndex + 1) / sessionQuestions.length) * 100} 
            className="flex-1"
          />
          <span className="text-sm text-muted-foreground">
            {stats.accuracy}% accuracy
          </span>
        </div>
      </div>

      {/* Question Card */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="capitalize">
                {currentQuestion.category.replace('-', ' ')}
              </Badge>
              <Badge variant={
                currentQuestion.difficulty === 'foundation' ? 'default' :
                currentQuestion.difficulty === 'intermediate' ? 'secondary' : 'destructive'
              }>
                {currentQuestion.difficulty}
              </Badge>
            </div>
            <div className="text-sm text-muted-foreground">
              {currentQuestion.clinicalSetting} • {currentQuestion.ageGroup}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-lg leading-relaxed mb-6">
            {currentQuestion.stem}
          </p>

          <RadioGroup 
            value={selectedAnswer} 
            onValueChange={handleAnswerSelect}
            disabled={showExplanation}
          >
            {currentQuestion.options.map((option, index) => (
              <div 
                key={index} 
                className={`flex items-start space-x-3 p-3 rounded-lg border transition-colors ${
                  showExplanation 
                    ? index === currentQuestion.correctAnswer
                      ? 'bg-green-50 border-green-200'
                      : isAnswered && userAnswers[currentQuestionIndex] === index
                        ? 'bg-red-50 border-red-200'
                        : 'bg-gray-50 border-gray-200'
                    : 'hover:bg-gray-50'
                }`}
              >
                <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                <Label 
                  htmlFor={`option-${index}`} 
                  className="flex-1 cursor-pointer leading-relaxed"
                >
                  <span className="font-medium mr-2">{String.fromCharCode(65 + index)}.</span>
                  {option}
                </Label>
                {showExplanation && index === currentQuestion.correctAnswer && (
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                )}
                {showExplanation && isAnswered && userAnswers[currentQuestionIndex] === index && index !== currentQuestion.correctAnswer && (
                  <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
                )}
              </div>
            ))}
          </RadioGroup>

          {!showExplanation && (
            <div className="mt-6">
              <Button 
                onClick={submitAnswer}
                disabled={!selectedAnswer}
                className="w-full sm:w-auto"
              >
                Submit Answer
              </Button>
            </div>
          )}

          {showExplanation && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="w-5 h-5 text-blue-600" />
                <h4 className="font-semibold text-blue-800">Explanation</h4>
                {isCorrect ? (
                  <Badge className="bg-green-600">Correct</Badge>
                ) : (
                  <Badge variant="destructive">Incorrect</Badge>
                )}
              </div>
              <p className="text-blue-700 leading-relaxed mb-4">
                {currentQuestion.explanation}
              </p>
              
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h5 className="font-medium text-blue-800 mb-1">Learning Objectives:</h5>
                  <ul className="text-blue-600 space-y-1">
                    {currentQuestion.learningObjectives.map((obj, i) => (
                      <li key={i}>• {obj}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-blue-800 mb-1">GMC Outcomes:</h5>
                  <ul className="text-blue-600 space-y-1">
                    {currentQuestion.gmcOutcomes.map((outcome, i) => (
                      <li key={i}>• {outcome}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button 
          variant="outline"
          onClick={previousQuestion}
          disabled={currentQuestionIndex === 0}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            {stats.correct}/{stats.answered} correct
          </div>
        </div>

        <Button 
          onClick={nextQuestion}
          disabled={currentQuestionIndex === sessionQuestions.length - 1}
        >
          Next
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}