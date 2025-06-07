import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Clock, CheckCircle, XCircle, BookOpen, Brain, Target, 
  Flag, ArrowRight, RotateCcw, Trophy, TrendingUp, Stethoscope
} from "lucide-react";

interface AMCQuestion {
  id: number;
  exam: "AMC CAT" | "AMC Clinical";
  category: string;
  difficulty: "Foundation" | "Intermediate" | "Advanced";
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  timeLimit: number;
}

const amcQuestions: AMCQuestion[] = [
  {
    id: 1,
    exam: "AMC CAT",
    category: "Internal Medicine",
    difficulty: "Intermediate",
    question: "A 65-year-old man presents with progressive dyspnoea and ankle swelling. Chest X-ray shows cardiomegaly and pulmonary oedema. What is the most appropriate initial investigation?",
    options: [
      "Echocardiogram",
      "Coronary angiography",
      "CT pulmonary angiogram",
      "Ventilation-perfusion scan"
    ],
    correct: 0,
    explanation: "Echocardiogram is the most appropriate initial investigation for suspected heart failure. It can assess left ventricular function, wall motion abnormalities, and valve function, providing crucial information for diagnosis and management.",
    timeLimit: 90
  },
  {
    id: 2,
    exam: "AMC Clinical",
    category: "Emergency Medicine",
    difficulty: "Advanced",
    question: "A 25-year-old woman presents with sudden onset severe headache, photophobia, and neck stiffness. Temperature is 38.5°C. What is the most appropriate immediate management?",
    options: [
      "CT brain scan first, then lumbar puncture",
      "Lumbar puncture immediately",
      "Blood cultures and empirical antibiotics",
      "MRI brain with contrast"
    ],
    correct: 2,
    explanation: "In suspected bacterial meningitis, empirical antibiotics should be started immediately after blood cultures. Lumbar puncture should not delay antibiotic treatment when there are clear signs of meningitis, as delay can worsen outcomes.",
    timeLimit: 120
  },
  {
    id: 3,
    exam: "AMC CAT",
    category: "Paediatrics",
    difficulty: "Foundation",
    question: "A 2-year-old child presents with fever, runny nose, and a characteristic rash starting on the face and spreading downward. What is the most likely diagnosis?",
    options: [
      "Rubella",
      "Measles",
      "Roseola",
      "Fifth disease"
    ],
    correct: 1,
    explanation: "Measles typically presents with fever, coryza (runny nose), and a maculopapular rash that starts on the face and spreads cephalocaudally (downward). The rash usually appears 3-4 days after onset of symptoms.",
    timeLimit: 60
  },
  {
    id: 4,
    exam: "AMC Clinical",
    category: "Obstetrics & Gynaecology",
    difficulty: "Intermediate",
    question: "A 28-year-old pregnant woman at 32 weeks gestation presents with severe abdominal pain and vaginal bleeding. Uterus is tender and firm. What is the most likely diagnosis?",
    options: [
      "Placenta praevia",
      "Placental abruption",
      "Uterine rupture",
      "Cervical incompetence"
    ],
    correct: 1,
    explanation: "Placental abruption presents with painful vaginal bleeding, uterine tenderness, and a firm/woody uterus. This contrasts with placenta praevia which typically presents with painless bleeding.",
    timeLimit: 90
  },
  {
    id: 5,
    exam: "AMC CAT",
    category: "Surgery",
    difficulty: "Advanced",
    question: "A 70-year-old man presents with acute onset severe abdominal pain radiating to the back. He is hypotensive with a pulsatile abdominal mass. What is the most appropriate immediate management?",
    options: [
      "CT angiogram of the abdomen",
      "Urgent surgical consultation",
      "Pain relief and observation",
      "Abdominal ultrasound"
    ],
    correct: 1,
    explanation: "This presentation is highly suggestive of a ruptured abdominal aortic aneurysm (AAA). In a haemodynamically unstable patient with suspected ruptured AAA, urgent surgical consultation is paramount as this is a surgical emergency requiring immediate intervention.",
    timeLimit: 120
  },
  {
    id: 6,
    exam: "AMC Clinical",
    category: "Psychiatry",
    difficulty: "Intermediate",
    question: "A 45-year-old man presents with depressed mood, loss of interest, insomnia, and feelings of worthlessness for 6 weeks. He has no psychotic features. What is the most appropriate first-line treatment?",
    options: [
      "Tricyclic antidepressants",
      "Selective serotonin reuptake inhibitors (SSRIs)",
      "Monoamine oxidase inhibitors",
      "Electroconvulsive therapy"
    ],
    correct: 1,
    explanation: "SSRIs are the first-line treatment for major depressive disorder due to their favourable side effect profile compared to older antidepressants. They are effective and generally well-tolerated.",
    timeLimit: 90
  }
];

export default function AMCTest() {
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
    ? amcQuestions 
    : amcQuestions.filter(q => q.exam === selectedExam);

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
              <Flag className="h-8 w-8 text-green-600" />
              <h1 className="text-3xl font-bold text-gray-900">AMC Practice Test</h1>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Australian Medical Council examination practice questions. 
              Prepare for both Computer Adaptive Test (CAT) and Clinical Examination components.
            </p>
          </div>

          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Test Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select AMC Examination
                </label>
                <Select value={selectedExam} onValueChange={setSelectedExam}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose AMC Exam" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Both Exams (Mixed Practice)</SelectItem>
                    <SelectItem value="AMC CAT">AMC CAT - Computer Adaptive Test</SelectItem>
                    <SelectItem value="AMC Clinical">AMC Clinical Examination</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-900 mb-2">Australian Medical Council Information</h3>
                <div className="space-y-2 text-sm text-green-800">
                  <div className="flex justify-between">
                    <span>Questions Available:</span>
                    <span className="font-medium">{filteredQuestions.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Time per Question:</span>
                    <span className="font-medium">60-120 seconds</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Format:</span>
                    <span className="font-medium">Multiple Choice Questions</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <BookOpen className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-600">AMC CAT</div>
                  <div className="text-sm text-blue-700">Computer Adaptive Test</div>
                  <div className="text-xs text-blue-600 mt-1">Multiple choice questions</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <Stethoscope className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-600">Clinical</div>
                  <div className="text-sm text-purple-700">Clinical Examination</div>
                  <div className="text-xs text-purple-600 mt-1">Clinical scenarios & OSCE</div>
                </div>
              </div>

              <Button 
                onClick={startTest}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3"
                disabled={filteredQuestions.length === 0}
              >
                Start AMC Practice Test
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
              <CardTitle className="text-2xl">AMC Test Complete!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-6xl font-bold text-green-600">
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
                <h3 className="font-semibold mb-2">AMC Performance Feedback:</h3>
                <ul className="text-sm space-y-1">
                  {percentage >= 75 && <li className="text-green-600">• Excellent! You're well-prepared for the AMC examinations.</li>}
                  {percentage >= 60 && percentage < 75 && <li className="text-yellow-600">• Good foundation. Focus on clinical reasoning and weak areas.</li>}
                  {percentage < 60 && <li className="text-red-600">• Additional study required. Review Australian clinical guidelines.</li>}
                  <li className="text-gray-600">• Familiarize yourself with Australian healthcare system and protocols.</li>
                  <li className="text-gray-600">• Practice clinical communication skills for patient interactions.</li>
                </ul>
              </div>

              <div className="flex gap-4">
                <Button onClick={resetTest} variant="outline" className="flex-1">
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Retake Test
                </Button>
                <Button onClick={() => window.history.back()} className="flex-1 bg-green-600 hover:bg-green-700">
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
            <Flag className="h-6 w-6 text-green-600" />
            <h1 className="text-2xl font-bold text-gray-900">AMC Practice Test</h1>
            <Badge className="bg-green-100 text-green-800">{currentQ.exam}</Badge>
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
                        : "border-green-500 bg-green-50"
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
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-2">Explanation:</h4>
                <p className="text-green-800">{currentQ.explanation}</p>
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
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Submit Answer
                  </Button>
                ) : (
                  <Button onClick={handleNextQuestion} className="bg-green-600 hover:bg-green-700">
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