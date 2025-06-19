import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckCircle, XCircle, Clock, BookOpen, ExternalLink, Stethoscope, Brain, AlertCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface NHSPrepQuestion {
  specialty: string;
  topic: string;
  scenario: string;
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
    E: string;
  };
  correct_answer: string;
  explanation: string;
  study_tip: string;
  reference: {
    title: string;
    section: string;
    url: string;
  };
}

interface Specialty {
  value: string;
  label: string;
  topics: Array<{
    value: string;
    label: string;
  }>;
}

export default function NHSPrepAI() {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("");
  const [selectedTopic, setSelectedTopic] = useState<string>("");
  const [questionCount, setQuestionCount] = useState<number>(1);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [showExplanation, setShowExplanation] = useState(false);
  const [results, setResults] = useState<Record<number, { selectedAnswer: string; isCorrect: boolean }>>({});
  const [questions, setQuestions] = useState<NHSPrepQuestion[]>([]);
  
  const { toast } = useToast();

  // Fetch available specialties
  const { data: specialtiesData } = useQuery({
    queryKey: ["/api/nhsprep/specialties"],
  });

  const generateQuestionsMutation = useMutation({
    mutationFn: async (data: { specialty: string; topic: string; count: number }) =>
      apiRequest("/api/nhsprep/generate", "POST", data),
    onSuccess: (data: any) => {
      setQuestions(data.questions || []);
      setCurrentQuestionIndex(0);
      setResults({});
      setSelectedAnswer("");
      setShowExplanation(false);
      toast({
        title: "Questions Generated",
        description: `Generated ${data.questions?.length || 0} questions using verified UK guidelines`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Generation Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleGenerateQuestions = () => {
    if (!selectedSpecialty) {
      toast({
        title: "Specialty Required",
        description: "Please select a medical specialty",
        variant: "destructive",
      });
      return;
    }

    generateQuestionsMutation.mutate({
      specialty: selectedSpecialty,
      topic: selectedTopic,
      count: questionCount,
    });
  };

  const handleAnswerSelect = (answer: string) => {
    if (showExplanation) return;
    
    setSelectedAnswer(answer);
    setShowExplanation(true);
    
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = answer === currentQuestion.correct_answer;
    
    setResults(prev => ({
      ...prev,
      [currentQuestionIndex]: { selectedAnswer: answer, isCorrect }
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer("");
      setShowExplanation(false);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      const prevResult = results[currentQuestionIndex - 1];
      if (prevResult) {
        setSelectedAnswer(prevResult.selectedAnswer);
        setShowExplanation(true);
      } else {
        setSelectedAnswer("");
        setShowExplanation(false);
      }
    }
  };

  const calculateScore = () => {
    const totalAnswered = Object.keys(results).length;
    const correctAnswers = Object.values(results).filter(r => r.isCorrect).length;
    return {
      totalAnswered,
      correctAnswers,
      percentage: totalAnswered > 0 ? Math.round((correctAnswers / totalAnswered) * 100) : 0
    };
  };

  const currentQuestion = questions[currentQuestionIndex];
  const currentResult = results[currentQuestionIndex];
  const score = calculateScore();

  const availableTopics = specialtiesData?.specialties?.find((s: Specialty) => s.value === selectedSpecialty)?.topics || [];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Stethoscope className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">NHSPrep AI</h1>
              <p className="text-gray-600">Clinical Exam Question Generator with Verified UK Guidelines</p>
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <Brain className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-900 mb-1">Verified UK Clinical Guidelines</p>
                <p className="text-sm text-blue-800">All questions use authentic NICE Guidelines, CKS Topics, and BMJ Best Practice recommendations</p>
              </div>
            </div>
          </div>
        </div>

        {/* Question Generator Interface */}
        {questions.length === 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Generate Clinical Questions
              </CardTitle>
              <CardDescription>
                Select specialty and topic to generate PLAB/MLA exam questions with verified UK guidelines
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Medical Specialty</label>
                  <Select value={selectedSpecialty} onValueChange={(value) => {
                    setSelectedSpecialty(value);
                    setSelectedTopic(""); // Reset topic when specialty changes
                  }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select specialty" />
                    </SelectTrigger>
                    <SelectContent className="max-h-72 overflow-y-auto">
                      {specialtiesData?.specialties?.map((specialty: Specialty) => (
                        <SelectItem key={specialty.value} value={specialty.value}>
                          {specialty.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Topic (Optional)</label>
                  <Select value={selectedTopic} onValueChange={setSelectedTopic} disabled={!selectedSpecialty}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select topic" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Topics</SelectItem>
                      {availableTopics.map((topic: { value: string; label: string }) => (
                        <SelectItem key={topic.value} value={topic.value}>
                          {topic.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Number of Questions</label>
                  <Select value={questionCount.toString()} onValueChange={(value) => setQuestionCount(parseInt(value))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5].map(num => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} Question{num > 1 ? 's' : ''}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button 
                onClick={handleGenerateQuestions}
                disabled={!selectedSpecialty || generateQuestionsMutation.isPending}
                className="w-full"
                size="lg"
              >
                {generateQuestionsMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating Questions...
                  </>
                ) : (
                  <>
                    <BookOpen className="w-4 h-4 mr-2" />
                    Generate Questions
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Question Display */}
        {currentQuestion && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Progress and Score */}
              <div className="flex items-center justify-between bg-white p-4 rounded-lg border">
                <div>
                  <h2 className="text-lg font-semibold">Question {currentQuestionIndex + 1} of {questions.length}</h2>
                  <p className="text-sm text-gray-600">{currentQuestion.specialty} • {currentQuestion.topic}</p>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant="outline" className="px-3 py-1">
                    Score: {score.correctAnswers}/{score.totalAnswered} ({score.percentage}%)
                  </Badge>
                  <Button
                    onClick={() => {
                      setQuestions([]);
                      setCurrentQuestionIndex(0);
                      setResults({});
                    }}
                    variant="outline"
                    size="sm"
                  >
                    New Session
                  </Button>
                </div>
              </div>

              {/* Question Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg leading-relaxed">
                    {currentQuestion.scenario}
                  </CardTitle>
                  <CardDescription className="text-base font-medium text-gray-900">
                    {currentQuestion.question}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {Object.entries(currentQuestion.options).map(([key, option]) => {
                    const isSelected = selectedAnswer === key;
                    const isCorrect = currentQuestion.correct_answer === key;
                    
                    let variant: "default" | "secondary" | "destructive" | "outline" = "outline";
                    let icon = null;
                    
                    if (showExplanation) {
                      if (isCorrect) {
                        variant = "default";
                        icon = <CheckCircle className="h-4 w-4 text-green-600" />;
                      } else if (isSelected && !isCorrect) {
                        variant = "destructive";
                        icon = <XCircle className="h-4 w-4 text-red-600" />;
                      }
                    }
                    
                    return (
                      <Button
                        key={key}
                        variant={variant}
                        className={`justify-start text-left h-auto p-4 w-full ${isSelected ? 'ring-2 ring-offset-2' : ''}`}
                        onClick={() => handleAnswerSelect(key)}
                        disabled={showExplanation}
                      >
                        <div className="flex items-center gap-3 w-full">
                          <span className="font-semibold text-sm">{key}.</span>
                          <span className="flex-1">{option}</span>
                          {icon}
                        </div>
                      </Button>
                    );
                  })}
                </CardContent>
              </Card>

              {/* Explanation */}
              {showExplanation && (
                <Card className="bg-blue-50">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      Expert Explanation
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="leading-relaxed">{currentQuestion.explanation}</p>
                    
                    {/* Study Tip */}
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-yellow-900 mb-1">Study Tip</p>
                          <p className="text-sm text-yellow-800">{currentQuestion.study_tip}</p>
                        </div>
                      </div>
                    </div>

                    {/* Reference */}
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium text-gray-900 mb-1">{currentQuestion.reference.title}</p>
                          <p className="text-sm text-gray-600 mb-3">{currentQuestion.reference.section}</p>
                        </div>
                        <Button
                          onClick={() => window.open(currentQuestion.reference.url, '_blank')}
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          <ExternalLink className="w-3 h-3 mr-1" />
                          View Guideline
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Navigation */}
              <div className="flex justify-between">
                <Button 
                  onClick={handlePreviousQuestion}
                  disabled={currentQuestionIndex === 0}
                  variant="outline"
                >
                  Previous
                </Button>
                <Button 
                  onClick={handleNextQuestion}
                  disabled={currentQuestionIndex === questions.length - 1}
                >
                  Next Question
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Session Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Specialty:</span>
                      <span className="font-medium">{currentQuestion.specialty}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Topic:</span>
                      <span className="font-medium">{currentQuestion.topic || 'General'}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Questions:</span>
                      <span className="font-medium">{questions.length}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-sm">
                      <span>Correct:</span>
                      <span className="font-medium text-green-600">{score.correctAnswers}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Accuracy:</span>
                      <span className="font-medium">{score.percentage}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Guidelines Used</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span>NICE Guidelines</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <span>CKS Topics</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                      <span>BMJ Best Practice</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}