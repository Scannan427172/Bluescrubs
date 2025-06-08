import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { 
  Clock, CheckCircle, XCircle, BookOpen, Target, Brain, 
  ArrowRight, ArrowLeft, RotateCcw, Award, TrendingUp, Globe, Flag
} from "lucide-react";
import { 
  getQuestionsByExam, 
  getRandomGlobalQuestions, 
  EXAM_METADATA,
  type GlobalExamQuestion, 
  type ExamType,
  type ExamCountry 
} from "@shared/global-exam-banks";

export default function GlobalPractice() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [showExplanation, setShowExplanation] = useState(false);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);
  const [timeSpent, setTimeSpent] = useState(0);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [selectedExam, setSelectedExam] = useState<ExamType>('plab');
  const [sessionQuestions, setSessionQuestions] = useState<GlobalExamQuestion[]>([]);

  const examOptions = [
    { 
      type: 'plab' as ExamType, 
      name: 'PLAB (UK)', 
      flag: '🇬🇧',
      description: 'Professional and Linguistic Assessments Board',
      parts: '180 MCQ + OSCE',
      regulator: 'GMC'
    },
    { 
      type: 'usmle' as ExamType, 
      name: 'USMLE (USA)', 
      flag: '🇺🇸',
      description: 'United States Medical Licensing Examination',
      parts: 'Step 1, 2CK, 2CS, 3',
      regulator: 'FSMB/NBME'
    },
    { 
      type: 'mccee' as ExamType, 
      name: 'MCCEE (Canada)', 
      flag: '🇨🇦',
      description: 'Medical Council of Canada Evaluating Examination',
      parts: '180 MCQ',
      regulator: 'MCC'
    },
    { 
      type: 'amc' as ExamType, 
      name: 'AMC (Australia)', 
      flag: '🇦🇺',
      description: 'Australian Medical Council Examination',
      parts: '150 MCQ + Clinical',
      regulator: 'AMC'
    },
    { 
      type: 'mrcp' as ExamType, 
      name: 'MRCP (Ireland)', 
      flag: '🇮🇪',
      description: 'Membership Royal College of Physicians',
      parts: 'Part 1, 2, PACES',
      regulator: 'RCP'
    },
    { 
      type: 'dha' as ExamType, 
      name: 'DHA (UAE)', 
      flag: '🇦🇪',
      description: 'Dubai Health Authority Examination',
      parts: 'MCQ + Clinical',
      regulator: 'DHA'
    }
  ];

  useEffect(() => {
    if (sessionStarted && timeSpent > 0) {
      const timer = setInterval(() => {
        setTimeSpent(prev => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [sessionStarted, timeSpent]);

  const startSession = () => {
    const questions = getRandomGlobalQuestions(20, { examType: selectedExam });
    
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
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Globe className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold">Global Medical Exam Practice</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Practice with authentic medical questions from licensing boards worldwide. 
            Prepare for medical registration in UK, USA, Canada, Australia, Ireland, and Middle East.
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Select Your Target Examination
            </CardTitle>
            <CardDescription>
              Choose the medical licensing examination for your destination country
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {examOptions.map((exam) => (
                <div 
                  key={exam.type}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                    selectedExam === exam.type 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedExam(exam.type)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{exam.flag}</span>
                      <div>
                        <h4 className="font-semibold text-sm">{exam.name}</h4>
                        <p className="text-xs text-muted-foreground">{exam.regulator}</p>
                      </div>
                    </div>
                    {selectedExam === exam.type && (
                      <CheckCircle className="w-5 h-5 text-blue-600" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{exam.description}</p>
                  <div className="text-xs">
                    <Badge variant="secondary">{exam.parts}</Badge>
                  </div>
                </div>
              ))}
            </div>

            {selectedExam && (
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">
                  {EXAM_METADATA[selectedExam]?.name}
                </h4>
                <div className="grid md:grid-cols-3 gap-4 text-sm text-blue-700">
                  <div>
                    <strong>Country:</strong> {EXAM_METADATA[selectedExam]?.country}
                  </div>
                  <div>
                    <strong>Duration:</strong> {EXAM_METADATA[selectedExam]?.duration}
                  </div>
                  <div>
                    <strong>Questions:</strong> {EXAM_METADATA[selectedExam]?.questionCount}
                  </div>
                </div>
                <div className="mt-3 text-sm text-blue-600">
                  <strong>Exam Parts:</strong> {EXAM_METADATA[selectedExam]?.parts.join(", ")}
                </div>
              </div>
            )}

            <div className="mt-8 flex justify-center">
              <Button 
                size="lg" 
                onClick={startSession}
                disabled={!selectedExam}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Start Practice Session
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-green-600" />
                Authentic Content
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Questions created by medical professionals following each country's specific licensing requirements and clinical guidelines
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Flag className="w-5 h-5 text-purple-600" />
                Regional Specifics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Questions include local health system context, cultural considerations, and country-specific medical guidelines
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-orange-600" />
                Official Standards
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Aligned with licensing board requirements: GMC, FSMB, MCC, AMC, RCP, and Middle East health authorities
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!currentQuestion) return null;

  const stats = getSessionStats();
  const selectedExamInfo = examOptions.find(e => e.type === selectedExam);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header with Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">
              {selectedExamInfo?.flag} {selectedExamInfo?.name}
            </h1>
            <Badge variant="outline" className="capitalize">
              {currentQuestion.category.replace('-', ' ')}
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
              {currentQuestion.step && (
                <Badge variant="outline">Step {currentQuestion.step}</Badge>
              )}
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
                  <h5 className="font-medium text-blue-800 mb-1">Regulatory Standards:</h5>
                  <ul className="text-blue-600 space-y-1">
                    {currentQuestion.regulatoryOutcomes.map((outcome, i) => (
                      <li key={i}>• {outcome}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {currentQuestion.regionalSpecifics && (
                <div className="mt-4 pt-4 border-t border-blue-200">
                  <h5 className="font-medium text-blue-800 mb-2">Regional Context:</h5>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    {currentQuestion.regionalSpecifics.localGuidelines && (
                      <div>
                        <strong className="text-blue-700">Guidelines:</strong>
                        <ul className="text-blue-600 mt-1">
                          {currentQuestion.regionalSpecifics.localGuidelines.map((guide, i) => (
                            <li key={i}>• {guide}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {currentQuestion.regionalSpecifics.healthSystemContext && (
                      <div>
                        <strong className="text-blue-700">Health System:</strong>
                        <ul className="text-blue-600 mt-1">
                          {currentQuestion.regionalSpecifics.healthSystemContext.map((context, i) => (
                            <li key={i}>• {context}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}
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