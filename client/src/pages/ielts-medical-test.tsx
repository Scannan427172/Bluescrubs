import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Clock, CheckCircle, XCircle, BookOpen, Brain, Target, 
  Flag, ArrowRight, RotateCcw, Trophy, TrendingUp, Volume2, Headphones
} from "lucide-react";

interface IELTSMedicalQuestion {
  id: number;
  skill: "Reading" | "Listening" | "Speaking" | "Writing";
  category: string;
  difficulty: "Foundation" | "Intermediate" | "Advanced";
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  timeLimit: number;
}

const ieltsQuestions: IELTSMedicalQuestion[] = [
  {
    id: 1,
    skill: "Reading",
    category: "Medical Terminology",
    difficulty: "Intermediate",
    question: "Read the following medical text: 'The patient presented with dyspnoea, orthopnoea, and peripheral oedema. Echocardiography revealed reduced ejection fraction.' What is the most likely diagnosis?",
    options: [
      "Chronic obstructive pulmonary disease",
      "Congestive heart failure",
      "Pulmonary embolism",
      "Pneumonia"
    ],
    correct: 1,
    explanation: "The combination of dyspnoea (difficulty breathing), orthopnoea (difficulty breathing when lying flat), peripheral oedema (swelling), and reduced ejection fraction on echocardiography indicates congestive heart failure.",
    timeLimit: 180
  },
  {
    id: 2,
    skill: "Listening",
    category: "Patient Communication",
    difficulty: "Advanced",
    question: "Listen to this patient conversation: 'Doctor, I've been having chest pain that comes and goes. It's worse when I climb stairs and gets better when I rest.' What type of pain is the patient describing?",
    options: [
      "Pleuritic chest pain",
      "Anginal chest pain",
      "Musculoskeletal pain",
      "Gastroesophageal reflux pain"
    ],
    correct: 1,
    explanation: "The patient describes exertional chest pain that improves with rest, which is characteristic of anginal chest pain due to coronary artery disease. This is classic stable angina.",
    timeLimit: 120
  },
  {
    id: 3,
    skill: "Speaking",
    category: "Medical History Taking",
    difficulty: "Intermediate",
    question: "You need to ask a patient about their smoking history. Which question demonstrates appropriate medical English communication?",
    options: [
      "Do you smoke?",
      "Could you tell me about your smoking history, including how many cigarettes per day and for how long?",
      "You smoke, don't you?",
      "Are you a smoker or not?"
    ],
    correct: 1,
    explanation: "Option B demonstrates professional medical communication with appropriate detail-gathering, open-ended questioning, and clear medical English. It shows cultural sensitivity and thoroughness required in medical practice.",
    timeLimit: 90
  },
  {
    id: 4,
    skill: "Writing",
    category: "Medical Documentation",
    difficulty: "Advanced",
    question: "Which sentence demonstrates correct medical English for documenting a patient's condition?",
    options: [
      "Patient has got diabetes and he is not feeling well today.",
      "The patient presents with poorly controlled diabetes mellitus and reports feeling unwell today.",
      "Patient got diabetes problem and not good today.",
      "Diabetic patient feeling bad today."
    ],
    correct: 1,
    explanation: "Option B uses formal medical English with proper terminology ('diabetes mellitus'), professional structure ('presents with'), and appropriate descriptive language for medical documentation.",
    timeLimit: 150
  },
  {
    id: 5,
    skill: "Reading",
    category: "Clinical Guidelines",
    difficulty: "Foundation",
    question: "Read this clinical guideline: 'For patients with acute myocardial infarction, aspirin 300mg should be administered immediately unless contraindicated.' What is the recommended aspirin dose?",
    options: [
      "75mg",
      "150mg",
      "300mg",
      "600mg"
    ],
    correct: 2,
    explanation: "The guideline clearly states '300mg' as the recommended immediate aspirin dose for acute myocardial infarction. This demonstrates reading comprehension of specific medical dosing information.",
    timeLimit: 60
  },
  {
    id: 6,
    skill: "Listening",
    category: "Medical Handover",
    difficulty: "Advanced",
    question: "During a medical handover, you hear: 'Mrs. Smith, 65-year-old female, admitted with acute exacerbation of COPD. She's on nebulizers q4h and steroids.' What does 'q4h' mean?",
    options: [
      "Every 4 hours",
      "4 times daily",
      "For 4 hours",
      "Every 4 days"
    ],
    correct: 0,
    explanation: "'Q4h' is medical abbreviation meaning 'every 4 hours' (from Latin 'quaque 4 horis'). Understanding medical abbreviations is crucial for safe patient care and professional communication.",
    timeLimit: 90
  }
];

export default function IELTSMedicalTest() {
  const [selectedSkill, setSelectedSkill] = useState<string>("all");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isTestComplete, setIsTestComplete] = useState(false);
  const [testStarted, setTestStarted] = useState(false);

  const filteredQuestions = selectedSkill === "all" 
    ? ieltsQuestions 
    : ieltsQuestions.filter(q => q.skill === selectedSkill);

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
    setTimeRemaining(filteredQuestions[0]?.timeLimit || 120);
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
      setTimeRemaining(filteredQuestions[currentQuestion + 1]?.timeLimit || 120);
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
              <Volume2 className="h-8 w-8 text-indigo-600" />
              <h1 className="text-3xl font-bold text-gray-900">IELTS Medical English Test</h1>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              International English Language Testing System for Medical Professionals. 
              Master medical English communication for global healthcare practice.
            </p>
          </div>

          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Test Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select IELTS Medical Skill
                </label>
                <Select value={selectedSkill} onValueChange={setSelectedSkill}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose IELTS Skill" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Skills (Mixed Practice)</SelectItem>
                    <SelectItem value="Reading">Reading - Medical Texts</SelectItem>
                    <SelectItem value="Listening">Listening - Patient Communication</SelectItem>
                    <SelectItem value="Speaking">Speaking - Professional Communication</SelectItem>
                    <SelectItem value="Writing">Writing - Medical Documentation</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-indigo-50 p-4 rounded-lg">
                <h3 className="font-semibold text-indigo-900 mb-2">IELTS Medical English Information</h3>
                <div className="space-y-2 text-sm text-indigo-800">
                  <div className="flex justify-between">
                    <span>Questions Available:</span>
                    <span className="font-medium">{filteredQuestions.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Time per Question:</span>
                    <span className="font-medium">60-180 seconds</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Focus:</span>
                    <span className="font-medium">Medical English Proficiency</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <BookOpen className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-lg font-bold text-blue-600">Reading</div>
                  <div className="text-sm text-blue-700">Medical texts & guidelines</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <Headphones className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="text-lg font-bold text-green-600">Listening</div>
                  <div className="text-sm text-green-700">Patient communications</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <Volume2 className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-lg font-bold text-purple-600">Speaking</div>
                  <div className="text-sm text-purple-700">Professional dialogue</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <Brain className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                  <div className="text-lg font-bold text-orange-600">Writing</div>
                  <div className="text-sm text-orange-700">Medical documentation</div>
                </div>
              </div>

              <div className="bg-amber-50 p-4 rounded-lg">
                <h4 className="font-semibold text-amber-900 mb-2">Medical English Skills</h4>
                <ul className="text-sm text-amber-800 space-y-1">
                  <li>• Medical terminology and clinical language</li>
                  <li>• Patient communication and empathy</li>
                  <li>• Professional healthcare documentation</li>
                  <li>• Cross-cultural medical communication</li>
                </ul>
              </div>

              <Button 
                onClick={startTest}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3"
                disabled={filteredQuestions.length === 0}
              >
                Start IELTS Medical English Test
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
    const getIELTSBand = (percentage: number) => {
      if (percentage >= 90) return "9.0";
      if (percentage >= 80) return "8.0-8.5";
      if (percentage >= 70) return "7.0-7.5";
      if (percentage >= 60) return "6.0-6.5";
      if (percentage >= 50) return "5.0-5.5";
      return "4.0-4.5";
    };

    return (
      <div className="min-h-screen bg-white p-6">
        <div className="max-w-2xl mx-auto text-center">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-center mb-4">
                <Trophy className="h-12 w-12 text-yellow-500" />
              </div>
              <CardTitle className="text-2xl">IELTS Medical English Test Complete!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-6xl font-bold text-indigo-600">
                {score}/{filteredQuestions.length}
              </div>
              <div className="text-xl text-gray-600">
                You scored {percentage}%
              </div>
              
              <div className="bg-indigo-50 p-4 rounded-lg">
                <div className="text-3xl font-bold text-indigo-600 mb-2">
                  Band {getIELTSBand(percentage)}
                </div>
                <div className="text-sm text-indigo-700">Estimated IELTS Band Score</div>
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
                <h3 className="font-semibold mb-2">IELTS Medical English Feedback:</h3>
                <ul className="text-sm space-y-1">
                  {percentage >= 80 && <li className="text-green-600">• Excellent medical English proficiency! Ready for international medical practice.</li>}
                  {percentage >= 60 && percentage < 80 && <li className="text-yellow-600">• Good foundation. Focus on medical terminology and professional communication.</li>}
                  {percentage < 60 && <li className="text-red-600">• Additional study needed. Practice medical English communication and terminology.</li>}
                  <li className="text-gray-600">• Develop medical vocabulary through clinical reading and listening practice.</li>
                  <li className="text-gray-600">• Practice patient communication scenarios and professional documentation.</li>
                </ul>
              </div>

              <div className="flex gap-4">
                <Button onClick={resetTest} variant="outline" className="flex-1">
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Retake Test
                </Button>
                <Button onClick={() => window.history.back()} className="flex-1 bg-indigo-600 hover:bg-indigo-700">
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
            <Volume2 className="h-6 w-6 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-900">IELTS Medical English Test</h1>
            <Badge className="bg-indigo-100 text-indigo-800">{currentQ.skill}</Badge>
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
                        : "border-indigo-500 bg-indigo-50"
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
              <div className="p-4 bg-indigo-50 rounded-lg">
                <h4 className="font-semibold text-indigo-900 mb-2">Language Learning Explanation:</h4>
                <p className="text-indigo-800">{currentQ.explanation}</p>
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
                    className="bg-indigo-600 hover:bg-indigo-700"
                  >
                    Submit Answer
                  </Button>
                ) : (
                  <Button onClick={handleNextQuestion} className="bg-indigo-600 hover:bg-indigo-700">
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