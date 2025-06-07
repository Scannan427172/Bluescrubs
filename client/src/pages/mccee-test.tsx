import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Clock, CheckCircle, XCircle, BookOpen, Brain, Target, 
  Flag, ArrowRight, RotateCcw, Trophy, TrendingUp
} from "lucide-react";

interface MCCEEQuestion {
  id: number;
  exam: "MCCEE" | "NAC OSCE";
  category: string;
  difficulty: "Foundation" | "Intermediate" | "Advanced";
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  timeLimit: number;
}

const mcceeQuestions: MCCEEQuestion[] = [
  {
    id: 1,
    exam: "MCCEE",
    category: "Internal Medicine",
    difficulty: "Intermediate",
    question: "A 55-year-old man with diabetes presents with chest pain. Which investigation is most appropriate for risk stratification in the Canadian healthcare system?",
    options: [
      "Immediate coronary angiography",
      "Exercise stress test with ECG",
      "CT coronary angiogram",
      "Echocardiogram with stress"
    ],
    correct: 1,
    explanation: "In the Canadian healthcare system, exercise stress testing is the first-line non-invasive test for stable chest pain in patients with intermediate pre-test probability. It's cost-effective and widely available across Canada.",
    timeLimit: 90
  },
  {
    id: 2,
    exam: "NAC OSCE",
    category: "Emergency Medicine",
    difficulty: "Advanced",
    question: "A patient in rural Ontario presents with signs of acute MI. The nearest PCI centre is 3 hours away. What is the most appropriate Canadian guideline-based management?",
    options: [
      "Immediate helicopter transport for primary PCI",
      "Thrombolytic therapy followed by transfer",
      "Conservative management until transfer",
      "Wait for cardiology consultation"
    ],
    correct: 1,
    explanation: "Canadian guidelines recommend thrombolytic therapy when PCI cannot be performed within 120 minutes. Rural healthcare delivery requires understanding of resource limitations and transfer protocols.",
    timeLimit: 120
  },
  {
    id: 3,
    exam: "MCCEE",
    category: "Public Health",
    difficulty: "Foundation",
    question: "Under the Canada Health Act, which principle ensures healthcare is available to all Canadian residents?",
    options: [
      "Comprehensiveness",
      "Universality",
      "Portability",
      "Public administration"
    ],
    correct: 1,
    explanation: "Universality is the principle that ensures all insured residents are entitled to the same level of healthcare. This is fundamental to Canada's universal healthcare system.",
    timeLimit: 60
  },
  {
    id: 4,
    exam: "NAC OSCE",
    category: "Family Medicine",
    difficulty: "Intermediate",
    question: "A patient in a remote First Nations community presents with diabetes. Which approach best reflects culturally safe care in Canada?",
    options: [
      "Standard diabetes education materials",
      "Involving traditional healers and community elders",
      "Immediate referral to urban specialist",
      "Focus only on medication compliance"
    ],
    correct: 1,
    explanation: "Cultural safety in Indigenous healthcare involves respecting traditional healing practices, involving community leaders, and understanding the historical context of healthcare delivery to Indigenous peoples in Canada.",
    timeLimit: 90
  },
  {
    id: 5,
    exam: "MCCEE",
    category: "Pharmacology",
    difficulty: "Advanced",
    question: "A patient requires warfarin therapy. Which factor is most important when prescribing in the Canadian healthcare context?",
    options: [
      "Provincial drug formulary coverage",
      "Patient's insurance status",
      "Nearest anticoagulation clinic location",
      "All of the above"
    ],
    correct: 3,
    explanation: "Canadian healthcare requires consideration of provincial formularies (drug coverage varies by province), accessibility to monitoring services, and understanding that some patients may have additional private insurance affecting drug access.",
    timeLimit: 120
  },
  {
    id: 6,
    exam: "NAC OSCE",
    category: "Paediatrics",
    difficulty: "Intermediate",
    question: "A parent in Quebec asks about mandatory vaccinations for school entry. What is the most accurate response regarding Canadian vaccination policies?",
    options: [
      "Vaccinations are federally mandated across Canada",
      "Each province/territory sets its own vaccination requirements",
      "Only Ontario requires mandatory vaccinations",
      "No vaccines are mandatory in Canada"
    ],
    correct: 1,
    explanation: "Healthcare delivery including vaccination policies are managed by provinces and territories. Each jurisdiction sets its own requirements for school entry, though most follow national immunization guidelines.",
    timeLimit: 90
  }
];

export default function MCCEETest() {
  const [selectedExam, setSelectedExam] = useState<string>("all");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isTestComplete, setIsTestComplete] = useState(false);
  const [testStarted, setTestStarted] = useState(false);

  const filteredQuestions = selectedExam === "all" 
    ? mcceeQuestions 
    : mcceeQuestions.filter(q => q.exam === selectedExam);

  useEffect(() => {
    if (testStarted && timeRemaining > 0 && !showResult) {
      const timer = setTimeout(() => setTimeRemaining(timeRemaining - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0 && testStarted && !showResult) {
      handleSubmitAnswer();
    }
  }, [timeRemaining, testStarted, showResult]);

  const startTest = () => {
    setTestStarted(true);
    setCurrentQuestion(0);
    setScore(0);
    setAnswers([]);
    setIsTestComplete(false);
    setTimeRemaining(filteredQuestions[0]?.timeLimit || 90);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    const currentQ = filteredQuestions[currentQuestion];
    const isCorrect = selectedAnswer === currentQ.correct;
    
    if (isCorrect) {
      setScore(score + 1);
    }
    
    const newAnswers = [...answers, selectedAnswer || -1];
    setAnswers(newAnswers);
    setShowResult(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < filteredQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setTimeRemaining(filteredQuestions[currentQuestion + 1]?.timeLimit || 90);
    } else {
      setIsTestComplete(true);
    }
  };

  const resetTest = () => {
    setTestStarted(false);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswers([]);
    setIsTestComplete(false);
    setTimeRemaining(0);
  };

  if (!testStarted) {
    return (
      <div className="min-h-screen bg-white p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-4">
              <Flag className="h-8 w-8 text-red-600" />
              <h1 className="text-3xl font-bold text-gray-900">Canadian Medical Exams</h1>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Medical Council of Canada examinations including MCCEE and NAC OSCE. 
              Prepare for medical practice in the Canadian healthcare system.
            </p>
          </div>

          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Test Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Canadian Medical Examination
                </label>
                <Select value={selectedExam} onValueChange={setSelectedExam}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose Canadian Exam" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Both Exams (Mixed Practice)</SelectItem>
                    <SelectItem value="MCCEE">MCCEE - Medical Council Evaluation</SelectItem>
                    <SelectItem value="NAC OSCE">NAC OSCE - Objective Structured Clinical</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-red-50 p-4 rounded-lg">
                <h3 className="font-semibold text-red-900 mb-2">Medical Council of Canada Information</h3>
                <div className="space-y-2 text-sm text-red-800">
                  <div className="flex justify-between">
                    <span>Questions Available:</span>
                    <span className="font-medium">{filteredQuestions.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Focus Areas:</span>
                    <span className="font-medium">Canadian Healthcare System</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cultural Context:</span>
                    <span className="font-medium">Canadian Medical Practice</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <BookOpen className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-600">MCCEE</div>
                  <div className="text-sm text-blue-700">Medical Council Evaluation</div>
                  <div className="text-xs text-blue-600 mt-1">Knowledge assessment</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <Target className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-600">NAC OSCE</div>
                  <div className="text-sm text-purple-700">Clinical Skills Assessment</div>
                  <div className="text-xs text-purple-600 mt-1">Standardized clinical exam</div>
                </div>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-900 mb-2">Canadian Healthcare Context</h4>
                <ul className="text-sm text-yellow-800 space-y-1">
                  <li>• Universal healthcare system principles</li>
                  <li>• Provincial/territorial healthcare delivery</li>
                  <li>• Indigenous health and cultural safety</li>
                  <li>• Rural and remote medicine considerations</li>
                </ul>
              </div>

              <Button 
                onClick={startTest}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3"
                disabled={filteredQuestions.length === 0}
              >
                Start Canadian Medical Test
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (isTestComplete) {
    const percentage = Math.round((score / filteredQuestions.length) * 100);
    return (
      <div className="min-h-screen bg-white p-6">
        <div className="max-w-2xl mx-auto text-center">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-center mb-4">
                <Trophy className="h-12 w-12 text-yellow-500" />
              </div>
              <CardTitle className="text-2xl">Canadian Medical Test Complete!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-6xl font-bold text-red-600">
                {score}/{filteredQuestions.length}
              </div>
              <div className="text-xl text-gray-600">
                You scored {percentage}%
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-600">{score}</div>
                  <div className="text-sm text-green-700">Correct</div>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <XCircle className="h-8 w-8 text-red-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-red-600">{filteredQuestions.length - score}</div>
                  <div className="text-sm text-red-700">Incorrect</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-600">{percentage}%</div>
                  <div className="text-sm text-blue-700">Score</div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg text-left">
                <h3 className="font-semibold mb-2">Canadian Medical Practice Feedback:</h3>
                <ul className="text-sm space-y-1">
                  {percentage >= 75 && <li className="text-green-600">• Excellent understanding of Canadian healthcare system!</li>}
                  {percentage >= 60 && percentage < 75 && <li className="text-yellow-600">• Good foundation. Review Canadian medical guidelines and cultural considerations.</li>}
                  {percentage < 60 && <li className="text-red-600">• Study Canadian healthcare policies, provincial differences, and cultural safety.</li>}
                  <li className="text-gray-600">• Focus on Canada Health Act principles and provincial healthcare delivery.</li>
                  <li className="text-gray-600">• Understand Indigenous health, rural medicine, and cultural safety practices.</li>
                </ul>
              </div>

              <div className="flex gap-4">
                <Button onClick={resetTest} variant="outline" className="flex-1">
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Retake Test
                </Button>
                <Button onClick={() => window.history.back()} className="flex-1 bg-red-600 hover:bg-red-700">
                  Back to Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const currentQ = filteredQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / filteredQuestions.length) * 100;

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Flag className="h-6 w-6 text-red-600" />
            <h1 className="text-2xl font-bold text-gray-900">Canadian Medical Test</h1>
            <Badge className="bg-red-100 text-red-800">{currentQ.exam}</Badge>
          </div>
          <div className="text-sm text-gray-600">
            Question {currentQuestion + 1} of {filteredQuestions.length}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <Progress value={progress} className="h-2" />
        </div>

        {/* Timer and Category */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Badge className="bg-purple-100 text-purple-800">{currentQ.category}</Badge>
            <Badge className="bg-yellow-100 text-yellow-800">{currentQ.difficulty}</Badge>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="h-4 w-4" />
            <span className={`font-medium ${timeRemaining <= 30 ? 'text-red-600' : ''}`}>
              {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* Question */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{currentQ.question}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {currentQ.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showResult}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-colors ${
                    selectedAnswer === index
                      ? showResult
                        ? index === currentQ.correct
                          ? "border-green-500 bg-green-50"
                          : "border-red-500 bg-red-50"
                        : "border-red-500 bg-red-50"
                      : showResult && index === currentQ.correct
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center text-sm font-semibold">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span>{option}</span>
                    {showResult && index === currentQ.correct && (
                      <CheckCircle className="h-5 w-5 text-green-600 ml-auto" />
                    )}
                    {showResult && selectedAnswer === index && index !== currentQ.correct && (
                      <XCircle className="h-5 w-5 text-red-600 ml-auto" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            {showResult && (
              <div className="p-4 bg-red-50 rounded-lg">
                <h4 className="font-semibold text-red-900 mb-2">Explanation:</h4>
                <p className="text-red-800">{currentQ.explanation}</p>
              </div>
            )}

            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                Score: {score}/{currentQuestion + (showResult ? 1 : 0)}
              </div>
              <div className="space-x-3">
                {!showResult ? (
                  <Button 
                    onClick={handleSubmitAnswer}
                    disabled={selectedAnswer === null}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Submit Answer
                  </Button>
                ) : (
                  <Button onClick={handleNextQuestion} className="bg-red-600 hover:bg-red-700">
                    {currentQuestion < filteredQuestions.length - 1 ? 'Next Question' : 'View Results'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}