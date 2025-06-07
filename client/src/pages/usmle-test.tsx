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

interface USMLEQuestion {
  id: number;
  step: "Step 1" | "Step 2 CK" | "Step 2 CS" | "Step 3";
  category: string;
  difficulty: "Foundation" | "Intermediate" | "Advanced";
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  timeLimit: number;
}

const usmleQuestions: USMLEQuestion[] = [
  {
    id: 1,
    step: "Step 1",
    category: "Pathology",
    difficulty: "Intermediate",
    question: "A 45-year-old man presents with chest pain and shortness of breath. ECG shows ST-elevation in leads II, III, and aVF. Which coronary artery is most likely occluded?",
    options: [
      "Left anterior descending artery",
      "Right coronary artery",
      "Left circumflex artery",
      "Left main coronary artery"
    ],
    correct: 1,
    explanation: "ST-elevation in leads II, III, and aVF indicates an inferior wall myocardial infarction, which is typically caused by occlusion of the right coronary artery (RCA). The RCA supplies the inferior wall of the left ventricle in most patients.",
    timeLimit: 90
  },
  {
    id: 2,
    step: "Step 2 CK",
    category: "Internal Medicine",
    difficulty: "Advanced",
    question: "A 32-year-old woman with type 1 diabetes presents with nausea, vomiting, and abdominal pain. Laboratory studies show glucose 450 mg/dL, bicarbonate 12 mEq/L, and ketones in urine. What is the most appropriate initial fluid management?",
    options: [
      "Normal saline 1L over 1 hour",
      "Half-normal saline with dextrose",
      "Lactated Ringer's solution",
      "5% dextrose in water"
    ],
    correct: 0,
    explanation: "This patient has diabetic ketoacidosis (DKA). Initial fluid resuscitation should be with normal saline (0.9% NaCl) to restore intravascular volume. The rate depends on the degree of dehydration, but 1L over the first hour is appropriate for most patients.",
    timeLimit: 120
  },
  {
    id: 3,
    step: "Step 1",
    category: "Pharmacology",
    difficulty: "Foundation",
    question: "Which mechanism of action best describes how ACE inhibitors reduce blood pressure?",
    options: [
      "Block calcium channels in vascular smooth muscle",
      "Inhibit conversion of angiotensin I to angiotensin II",
      "Block beta-adrenergic receptors",
      "Inhibit sodium reabsorption in the distal tubule"
    ],
    correct: 1,
    explanation: "ACE inhibitors block the angiotensin-converting enzyme, preventing the conversion of angiotensin I to angiotensin II. This reduces vasoconstriction and aldosterone secretion, leading to decreased blood pressure.",
    timeLimit: 60
  },
  {
    id: 4,
    step: "Step 2 CK",
    category: "Pediatrics",
    difficulty: "Intermediate",
    question: "A 6-month-old infant presents with fever, irritability, and pulling at the right ear. Otoscopic examination shows a red, bulging tympanic membrane. What is the most appropriate antibiotic treatment?",
    options: [
      "Amoxicillin",
      "Azithromycin",
      "Ciprofloxacin",
      "Doxycycline"
    ],
    correct: 0,
    explanation: "Amoxicillin is the first-line antibiotic for acute otitis media in children. It provides good coverage against the most common bacterial pathogens (S. pneumoniae and H. influenzae) and has an excellent safety profile in pediatric patients.",
    timeLimit: 90
  },
  {
    id: 5,
    step: "Step 3",
    category: "Emergency Medicine",
    difficulty: "Advanced",
    question: "A 28-year-old man is brought to the ED after a motor vehicle accident. He is hypotensive with a distended abdomen. FAST exam shows free fluid in the abdomen. What is the most appropriate next step?",
    options: [
      "CT scan of the abdomen and pelvis",
      "Diagnostic peritoneal lavage",
      "Immediate exploratory laparotomy",
      "Serial abdominal examinations"
    ],
    correct: 2,
    explanation: "In a hemodynamically unstable patient with positive FAST exam showing intraperitoneal bleeding, immediate exploratory laparotomy is indicated. CT scan would delay necessary surgical intervention in an unstable patient.",
    timeLimit: 120
  }
];

export default function USMLETest() {
  const [selectedStep, setSelectedStep] = useState<string>("all");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isTestComplete, setIsTestComplete] = useState(false);
  const [testStarted, setTestStarted] = useState(false);

  const filteredQuestions = selectedStep === "all" 
    ? usmleQuestions 
    : usmleQuestions.filter(q => q.step === selectedStep);

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
              <Flag className="h-8 w-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-900">USMLE Practice Test</h1>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive practice questions for United States Medical Licensing Examination. 
              Select your target step or practice all steps together.
            </p>
          </div>

          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Test Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select USMLE Step
                </label>
                <Select value={selectedStep} onValueChange={setSelectedStep}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose USMLE Step" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Steps (Mixed Practice)</SelectItem>
                    <SelectItem value="Step 1">Step 1 - Basic Sciences</SelectItem>
                    <SelectItem value="Step 2 CK">Step 2 CK - Clinical Knowledge</SelectItem>
                    <SelectItem value="Step 2 CS">Step 2 CS - Clinical Skills</SelectItem>
                    <SelectItem value="Step 3">Step 3 - Clinical Practice</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">Test Information</h3>
                <div className="space-y-2 text-sm text-blue-800">
                  <div className="flex justify-between">
                    <span>Questions Available:</span>
                    <span className="font-medium">{filteredQuestions.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Time per Question:</span>
                    <span className="font-medium">60-120 seconds</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Difficulty Levels:</span>
                    <span className="font-medium">Foundation to Advanced</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <BookOpen className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-600">Step 1</div>
                  <div className="text-sm text-green-700">Basic Sciences</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Brain className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-600">Step 2</div>
                  <div className="text-sm text-blue-700">Clinical Knowledge</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <Target className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-600">Step 3</div>
                  <div className="text-sm text-purple-700">Clinical Practice</div>
                </div>
              </div>

              <Button 
                onClick={startTest}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
                disabled={filteredQuestions.length === 0}
              >
                Start USMLE Practice Test
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
              <CardTitle className="text-2xl">USMLE Test Complete!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-6xl font-bold text-blue-600">
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
                <h3 className="font-semibold mb-2">Performance Feedback:</h3>
                <ul className="text-sm space-y-1">
                  {percentage >= 80 && <li className="text-green-600">• Excellent performance! You're well-prepared for the USMLE.</li>}
                  {percentage >= 60 && percentage < 80 && <li className="text-yellow-600">• Good progress. Focus on weak areas for improvement.</li>}
                  {percentage < 60 && <li className="text-red-600">• More study needed. Review fundamentals and practice more questions.</li>}
                  <li className="text-gray-600">• Review explanations for all questions to reinforce learning.</li>
                  <li className="text-gray-600">• Take practice tests regularly to build confidence and speed.</li>
                </ul>
              </div>

              <div className="flex gap-4">
                <Button onClick={resetTest} variant="outline" className="flex-1">
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Retake Test
                </Button>
                <Button onClick={() => window.history.back()} className="flex-1">
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
            <Flag className="h-6 w-6 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">USMLE Practice Test</h1>
            <Badge className="bg-blue-100 text-blue-800">{currentQ.step}</Badge>
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
                        : "border-blue-500 bg-blue-50"
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
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Explanation:</h4>
                <p className="text-blue-800">{currentQ.explanation}</p>
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
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Submit Answer
                  </Button>
                ) : (
                  <Button onClick={handleNextQuestion} className="bg-blue-600 hover:bg-blue-700">
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