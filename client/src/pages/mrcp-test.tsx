import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Clock, CheckCircle, XCircle, BookOpen, Brain, Target, 
  Flag, ArrowRight, RotateCcw, Trophy, TrendingUp, Crown
} from "lucide-react";

interface MRCPQuestion {
  id: number;
  part: "Part 1" | "Part 2" | "PACES";
  category: string;
  difficulty: "Foundation" | "Intermediate" | "Advanced";
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  timeLimit: number;
}

const mrcpQuestions: MRCPQuestion[] = [
  {
    id: 1,
    part: "Part 1",
    category: "Cardiology",
    difficulty: "Intermediate",
    question: "A 45-year-old man presents with chest pain. ECG shows deep T-wave inversions in leads V1-V4. Troponin is elevated. What is the most likely diagnosis?",
    options: [
      "Anterior STEMI",
      "Posterior NSTEMI", 
      "Wellens syndrome",
      "Pulmonary embolism"
    ],
    correct: 2,
    explanation: "Wellens syndrome presents with characteristic deep T-wave inversions in V1-V4 (Type B pattern) with elevated troponin but no ST elevation. This represents critical LAD stenosis requiring urgent intervention.",
    timeLimit: 120
  },
  {
    id: 2,
    part: "Part 2",
    category: "Endocrinology",
    difficulty: "Advanced",
    question: "A 35-year-old woman presents with amenorrhoea, galactorrhoea, and bitemporal hemianopia. MRI shows a 3cm pituitary mass. What is the most appropriate initial management?",
    options: [
      "Transphenoidal surgery",
      "Cabergoline therapy",
      "Radiotherapy",
      "Observation with serial MRI"
    ],
    correct: 1,
    explanation: "For macroprolactinomas (>1cm), medical therapy with dopamine agonists like cabergoline is first-line treatment. It can shrink the tumor and restore normal prolactin levels, even with visual field defects.",
    timeLimit: 150
  },
  {
    id: 3,
    part: "PACES",
    category: "Neurology",
    difficulty: "Advanced",
    question: "During PACES examination, you find a patient with unilateral ptosis, miosis, and anhidrosis. The lesion is most likely located at which anatomical site?",
    options: [
      "Brainstem",
      "Cervical sympathetic chain",
      "Carotid artery",
      "Orbital apex"
    ],
    correct: 1,
    explanation: "This classic triad describes Horner's syndrome. The sympathetic pathway runs from brainstem through cervical sympathetic chain. Cervical chain lesions (T1 root, stellate ganglion) cause the complete syndrome including anhidrosis.",
    timeLimit: 90
  },
  {
    id: 4,
    part: "Part 1",
    category: "Gastroenterology",
    difficulty: "Foundation",
    question: "A 30-year-old man with ulcerative colitis develops severe abdominal pain and distension. Abdominal X-ray shows colonic dilatation >6cm. What is the most appropriate immediate management?",
    options: [
      "Increase oral prednisolone",
      "IV hydrocortisone and nil by mouth",
      "Immediate colonoscopy",
      "Oral mesalazine"
    ],
    correct: 1,
    explanation: "This describes toxic megacolon, a medical emergency. Immediate treatment includes IV steroids (hydrocortisone), nil by mouth, IV fluids, and urgent surgical consultation. Colonoscopy is contraindicated due to perforation risk.",
    timeLimit: 90
  },
  {
    id: 5,
    part: "Part 2",
    category: "Respiratory Medicine",
    difficulty: "Intermediate",
    question: "A 65-year-old smoker presents with progressive dyspnoea. CXR shows bilateral lower lobe reticulonodular shadowing. HRCT shows honeycombing and traction bronchiectasis. What is the most likely diagnosis?",
    options: [
      "Chronic obstructive pulmonary disease",
      "Usual interstitial pneumonia (UIP)",
      "Non-specific interstitial pneumonia (NSIP)",
      "Hypersensitivity pneumonitis"
    ],
    correct: 1,
    explanation: "The combination of bilateral lower lobe reticulonodular shadowing with honeycombing and traction bronchiectasis on HRCT is characteristic of UIP pattern, most commonly seen in idiopathic pulmonary fibrosis.",
    timeLimit: 120
  },
  {
    id: 6,
    part: "PACES",
    category: "Rheumatology",
    difficulty: "Advanced",
    question: "During examination, you find a patient with sclerodactyly, telangiectasia, and Raynaud's phenomenon. Which antibody is most specifically associated with limited cutaneous systemic sclerosis?",
    options: [
      "Anti-Scl-70 (topoisomerase I)",
      "Anti-centromere",
      "Anti-RNA polymerase III",
      "Anti-U3-RNP"
    ],
    correct: 1,
    explanation: "Anti-centromere antibodies are strongly associated with limited cutaneous systemic sclerosis (lcSSc), previously called CREST syndrome. They correlate with better prognosis and lower risk of major organ involvement.",
    timeLimit: 90
  }
];

export default function MRCPTest() {
  const [selectedPart, setSelectedPart] = useState<string>("all");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isTestComplete, setIsTestComplete] = useState(false);
  const [testStarted, setTestStarted] = useState(false);

  const filteredQuestions = selectedPart === "all" 
    ? mrcpQuestions 
    : mrcpQuestions.filter(q => q.part === selectedPart);

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
              <Crown className="h-8 w-8 text-purple-600" />
              <h1 className="text-3xl font-bold text-gray-900">MRCP Practice Test</h1>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Membership of the Royal Colleges of Physicians examination preparation. 
              Master advanced internal medicine for European medical practice.
            </p>
          </div>

          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Test Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select MRCP Part
                </label>
                <Select value={selectedPart} onValueChange={setSelectedPart}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose MRCP Part" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Parts (Mixed Practice)</SelectItem>
                    <SelectItem value="Part 1">Part 1 - Basic Sciences</SelectItem>
                    <SelectItem value="Part 2">Part 2 - Clinical Sciences</SelectItem>
                    <SelectItem value="PACES">PACES - Clinical Skills</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-900 mb-2">Royal College of Physicians Information</h3>
                <div className="space-y-2 text-sm text-purple-800">
                  <div className="flex justify-between">
                    <span>Questions Available:</span>
                    <span className="font-medium">{filteredQuestions.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Time per Question:</span>
                    <span className="font-medium">90-150 seconds</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Standard:</span>
                    <span className="font-medium">European Medical Excellence</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <BookOpen className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-600">Part 1</div>
                  <div className="text-sm text-blue-700">Basic Sciences</div>
                  <div className="text-xs text-blue-600 mt-1">Foundation knowledge</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <Brain className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-600">Part 2</div>
                  <div className="text-sm text-green-700">Clinical Sciences</div>
                  <div className="text-xs text-green-600 mt-1">Advanced clinical knowledge</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <Target className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-600">PACES</div>
                  <div className="text-sm text-purple-700">Clinical Skills</div>
                  <div className="text-xs text-purple-600 mt-1">Structured examination</div>
                </div>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-900 mb-2">MRCP Excellence Standards</h4>
                <ul className="text-sm text-yellow-800 space-y-1">
                  <li>• Advanced internal medicine knowledge</li>
                  <li>• European clinical practice standards</li>
                  <li>• Complex case analysis and reasoning</li>
                  <li>• Professional clinical examination skills</li>
                </ul>
              </div>

              <Button 
                onClick={startTest}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3"
                disabled={filteredQuestions.length === 0}
              >
                Start MRCP Practice Test
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
              <CardTitle className="text-2xl">MRCP Test Complete!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-6xl font-bold text-purple-600">
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
                <h3 className="font-semibold mb-2">MRCP Performance Feedback:</h3>
                <ul className="text-sm space-y-1">
                  {percentage >= 80 && <li className="text-green-600">• Outstanding! You demonstrate MRCP-level clinical competency.</li>}
                  {percentage >= 65 && percentage < 80 && <li className="text-yellow-600">• Good progress. Focus on advanced internal medicine concepts.</li>}
                  {percentage < 65 && <li className="text-red-600">• Additional study needed. Review complex clinical scenarios and European guidelines.</li>}
                  <li className="text-gray-600">• Study advanced pathophysiology and clinical reasoning.</li>
                  <li className="text-gray-600">• Practice PACES-style clinical examination techniques.</li>
                </ul>
              </div>

              <div className="flex gap-4">
                <Button onClick={resetTest} variant="outline" className="flex-1">
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Retake Test
                </Button>
                <Button onClick={() => window.history.back()} className="flex-1 bg-purple-600 hover:bg-purple-700">
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
            <Crown className="h-6 w-6 text-purple-600" />
            <h1 className="text-2xl font-bold text-gray-900">MRCP Practice Test</h1>
            <Badge className="bg-purple-100 text-purple-800">{currentQ.part}</Badge>
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
            <Badge className="bg-blue-100 text-blue-800">{currentQ.category}</Badge>
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
                        : "border-purple-500 bg-purple-50"
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
              <div className="p-4 bg-purple-50 rounded-lg">
                <h4 className="font-semibold text-purple-900 mb-2">Clinical Explanation:</h4>
                <p className="text-purple-800">{currentQ.explanation}</p>
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
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    Submit Answer
                  </Button>
                ) : (
                  <Button onClick={handleNextQuestion} className="bg-purple-600 hover:bg-purple-700">
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