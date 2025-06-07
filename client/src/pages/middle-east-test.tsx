import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Clock, CheckCircle, XCircle, BookOpen, Brain, Target, 
  Flag, ArrowRight, RotateCcw, Trophy, TrendingUp, Star
} from "lucide-react";

interface MiddleEastQuestion {
  id: number;
  exam: "DHA" | "MOH" | "HAAD" | "QCHP" | "SLE";
  category: string;
  difficulty: "Foundation" | "Intermediate" | "Advanced";
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  timeLimit: number;
}

const middleEastQuestions: MiddleEastQuestion[] = [
  {
    id: 1,
    exam: "DHA",
    category: "Emergency Medicine",
    difficulty: "Intermediate",
    question: "A 40-year-old construction worker in Dubai presents with heat exhaustion during Ramadan. Core temperature is 39°C. What is the most appropriate immediate management in the UAE healthcare system?",
    options: [
      "Oral rehydration with cold water",
      "IV normal saline and active cooling",
      "Paracetamol and rest in shade",
      "Ice bath immersion"
    ],
    correct: 1,
    explanation: "In UAE's hot climate, heat exhaustion requires immediate IV fluid resuscitation and active cooling. Ice baths can cause vasoconstriction. UAE protocols emphasize rapid cooling and electrolyte management for occupational heat illness.",
    timeLimit: 90
  },
  {
    id: 2,
    exam: "MOH",
    category: "Infectious Diseases",
    difficulty: "Advanced",
    question: "A patient in Saudi Arabia presents with fever and respiratory symptoms during Hajj season. MERS-CoV is suspected. What is the most appropriate isolation protocol according to MOH guidelines?",
    options: [
      "Standard precautions only",
      "Droplet precautions",
      "Airborne precautions with negative pressure room",
      "Contact precautions only"
    ],
    correct: 2,
    explanation: "MERS-CoV requires airborne precautions due to potential aerosol transmission. Saudi MOH guidelines mandate negative pressure isolation, N95 masks, and strict contact tracing protocols, especially during mass gatherings like Hajj.",
    timeLimit: 120
  },
  {
    id: 3,
    exam: "HAAD",
    category: "Obstetrics & Gynaecology",
    difficulty: "Intermediate",
    question: "A pregnant woman in Abu Dhabi at 28 weeks gestation has gestational diabetes. According to HAAD guidelines, what is the target HbA1c during pregnancy?",
    options: [
      "<6.0% (42 mmol/mol)",
      "<6.5% (48 mmol/mol)", 
      "<7.0% (53 mmol/mol)",
      "<7.5% (58 mmol/mol)"
    ],
    correct: 0,
    explanation: "HAAD follows international guidelines recommending HbA1c <6.0% in pregnancy when achievable without significant hypoglycemia. This reduces maternal and fetal complications while considering the UAE's diverse population needs.",
    timeLimit: 90
  },
  {
    id: 4,
    exam: "QCHP",
    category: "Public Health",
    difficulty: "Foundation",
    question: "In Qatar's healthcare system, what is the primary focus of the National Health Strategy 2018-2022?",
    options: [
      "Increasing hospital beds",
      "Preventive care and wellness",
      "Medical tourism expansion",
      "Specialist recruitment"
    ],
    correct: 1,
    explanation: "Qatar's National Health Strategy emphasizes preventive care, wellness promotion, and chronic disease management. This aligns with Vision 2030 goals of creating a healthier population through lifestyle interventions and early detection.",
    timeLimit: 60
  },
  {
    id: 5,
    exam: "SLE",
    category: "Cardiology",
    difficulty: "Advanced",
    question: "A 50-year-old Emirati man presents with chest pain. His risk factors include diabetes and positive family history. According to UAE cardiac guidelines, what is the preferred initial diagnostic approach?",
    options: [
      "Exercise stress test",
      "CT coronary angiogram",
      "Immediate cardiac catheterization", 
      "Stress echocardiography"
    ],
    correct: 1,
    explanation: "UAE guidelines favor CT coronary angiogram for intermediate-risk patients with diabetes, given the high prevalence of coronary disease in the Emirati population and the availability of advanced imaging technology in UAE healthcare facilities.",
    timeLimit: 120
  },
  {
    id: 6,
    exam: "DHA",
    category: "Pediatrics",
    difficulty: "Intermediate",
    question: "A child in Dubai presents with suspected vitamin D deficiency. What is the most common cause in the UAE pediatric population?",
    options: [
      "Dietary insufficiency",
      "Limited sun exposure due to cultural clothing and indoor lifestyle",
      "Malabsorption syndrome",
      "Chronic kidney disease"
    ],
    correct: 1,
    explanation: "Despite abundant sunshine, vitamin D deficiency is common in UAE children due to limited sun exposure from cultural clothing, indoor lifestyle, and use of sunscreen. DHA protocols emphasize screening and supplementation.",
    timeLimit: 90
  }
];

export default function MiddleEastTest() {
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
    ? middleEastQuestions 
    : middleEastQuestions.filter(q => q.exam === selectedExam);

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
              <Star className="h-8 w-8 text-yellow-600" />
              <h1 className="text-3xl font-bold text-gray-900">Middle East Medical Licensing</h1>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Gulf region medical licensing examinations including DHA, MOH, HAAD, QCHP, and SLE. 
              Prepare for medical practice in the Middle East healthcare systems.
            </p>
          </div>

          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Test Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Middle East Medical Exam
                </label>
                <Select value={selectedExam} onValueChange={setSelectedExam}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose Middle East Exam" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Exams (Mixed Practice)</SelectItem>
                    <SelectItem value="DHA">DHA - Dubai Health Authority</SelectItem>
                    <SelectItem value="MOH">MOH - Saudi Ministry of Health</SelectItem>
                    <SelectItem value="HAAD">HAAD - Abu Dhabi Health Authority</SelectItem>
                    <SelectItem value="QCHP">QCHP - Qatar Health Professionals</SelectItem>
                    <SelectItem value="SLE">SLE - Specialist License Exam</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="font-semibold text-yellow-900 mb-2">Gulf Region Medical Licensing</h3>
                <div className="space-y-2 text-sm text-yellow-800">
                  <div className="flex justify-between">
                    <span>Questions Available:</span>
                    <span className="font-medium">{filteredQuestions.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Regional Focus:</span>
                    <span className="font-medium">Gulf Healthcare Systems</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cultural Context:</span>
                    <span className="font-medium">Middle Eastern Medicine</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-lg font-bold text-blue-600">🇦🇪 DHA</div>
                  <div className="text-xs text-blue-700">Dubai Health Authority</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-lg font-bold text-green-600">🇸🇦 MOH</div>
                  <div className="text-xs text-green-700">Saudi Ministry of Health</div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <div className="text-lg font-bold text-purple-600">🇦🇪 HAAD</div>
                  <div className="text-xs text-purple-700">Abu Dhabi Authority</div>
                </div>
                <div className="text-center p-3 bg-red-50 rounded-lg">
                  <div className="text-lg font-bold text-red-600">🇶🇦 QCHP</div>
                  <div className="text-xs text-red-700">Qatar Health Council</div>
                </div>
                <div className="text-center p-3 bg-orange-50 rounded-lg">
                  <div className="text-lg font-bold text-orange-600">⭐ SLE</div>
                  <div className="text-xs text-orange-700">Specialist License</div>
                </div>
              </div>

              <div className="bg-amber-50 p-4 rounded-lg">
                <h4 className="font-semibold text-amber-900 mb-2">Regional Healthcare Focus</h4>
                <ul className="text-sm text-amber-800 space-y-1">
                  <li>• Gulf region climate-related health conditions</li>
                  <li>• Cultural competency in Middle Eastern healthcare</li>
                  <li>• Islamic medical ethics and cultural considerations</li>
                  <li>• Regional disease patterns and preventive medicine</li>
                </ul>
              </div>

              <Button 
                onClick={startTest}
                className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-3"
                disabled={filteredQuestions.length === 0}
              >
                Start Middle East Medical Test
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
              <CardTitle className="text-2xl">Middle East Medical Test Complete!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-6xl font-bold text-yellow-600">
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
                <h3 className="font-semibold mb-2">Gulf Region Practice Feedback:</h3>
                <ul className="text-sm space-y-1">
                  {percentage >= 75 && <li className="text-green-600">• Excellent preparation for Middle East medical practice!</li>}
                  {percentage >= 60 && percentage < 75 && <li className="text-yellow-600">• Good foundation. Review regional health patterns and cultural considerations.</li>}
                  {percentage < 60 && <li className="text-red-600">• Study Gulf region medical guidelines, cultural competency, and climate-related health issues.</li>}
                  <li className="text-gray-600">• Understand Islamic medical ethics and cultural sensitivity in patient care.</li>
                  <li className="text-gray-600">• Learn about regional disease patterns, climate medicine, and preventive care.</li>
                </ul>
              </div>

              <div className="flex gap-4">
                <Button onClick={resetTest} variant="outline" className="flex-1">
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Retake Test
                </Button>
                <Button onClick={() => window.history.back()} className="flex-1 bg-yellow-600 hover:bg-yellow-700">
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
            <Star className="h-6 w-6 text-yellow-600" />
            <h1 className="text-2xl font-bold text-gray-900">Middle East Medical Test</h1>
            <Badge className="bg-yellow-100 text-yellow-800">{currentQ.exam}</Badge>
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
            <Badge className="bg-orange-100 text-orange-800">{currentQ.difficulty}</Badge>
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
                        : "border-yellow-500 bg-yellow-50"
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
              <div className="p-4 bg-yellow-50 rounded-lg">
                <h4 className="font-semibold text-yellow-900 mb-2">Regional Medical Explanation:</h4>
                <p className="text-yellow-800">{currentQ.explanation}</p>
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
                    className="bg-yellow-600 hover:bg-yellow-700"
                  >
                    Submit Answer
                  </Button>
                ) : (
                  <Button onClick={handleNextQuestion} className="bg-yellow-600 hover:bg-yellow-700">
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