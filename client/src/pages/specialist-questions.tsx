import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SpecialtySelector } from "@/components/specialty-selector";
import { CheckCircle, XCircle, Clock, BookOpen, User, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Question {
  id: string;
  question: string;
  options: string[];
  correct_answer: string;
  explanation: string;
  category: string;
  difficulty: string;
  specialty_focus: string[];
  uk_guidelines: string[];
  specialist: string;
  specialty_code: string;
}

interface QuestionResult {
  selectedAnswer?: string;
  isCorrect?: boolean;
  timeSpent?: number;
}

export default function SpecialistQuestions() {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [results, setResults] = useState<Record<string, QuestionResult>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null);
  const { toast } = useToast();

  const generateQuestionsMutation = useMutation({
    mutationFn: async (data: { specialty: string; count: number; difficulty: string }) => {
      return await apiRequest(`/api/plab-ai/generate-mcqs`, "POST", data);
    },
    onSuccess: (data: any) => {
      setQuestions(data.mcqs);
      setCurrentQuestionIndex(0);
      setResults({});
      setShowExplanation(false);
      setSessionStartTime(new Date());
      toast({
        title: "Questions Generated",
        description: `${data.mcqs.length} specialist-level questions ready for practice`,
      });
    },
    onError: (error) => {
      toast({
        title: "Generation Failed",
        description: "Failed to generate questions. Please try again.",
        variant: "destructive",
      });
    },
  });

  const generateMixedQuestionsMutation = useMutation({
    mutationFn: async (data: { count: number; difficulty: string }) => {
      return await apiRequest(`/api/plab-ai/generate-mixed-mcqs`, "POST", data);
    },
    onSuccess: (data: any) => {
      setQuestions(data.mcqs);
      setCurrentQuestionIndex(0);
      setResults({});
      setShowExplanation(false);
      setSessionStartTime(new Date());
      toast({
        title: "Mixed Questions Generated",
        description: `${data.mcqs.length} questions from multiple specialties ready`,
      });
    },
    onError: (error) => {
      toast({
        title: "Generation Failed",
        description: "Failed to generate mixed questions. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSpecialtySelect = (specialty: string) => {
    setSelectedSpecialty(specialty);
  };

  const handleGenerateQuestions = (specialty: string, count: number, difficulty: string) => {
    generateQuestionsMutation.mutate({ specialty, count, difficulty });
  };

  const handleGenerateMixed = (count: number, difficulty: string) => {
    generateMixedQuestionsMutation.mutate({ count, difficulty });
  };

  const handleAnswerSelect = (answer: string) => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = answer === currentQuestion.correct_answer;
    
    setResults(prev => ({
      ...prev,
      [currentQuestion.id]: {
        selectedAnswer: answer,
        isCorrect,
        timeSpent: sessionStartTime ? Math.floor((new Date().getTime() - sessionStartTime.getTime()) / 1000) : 0
      }
    }));
    
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setShowExplanation(false);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setShowExplanation(false);
    }
  };

  const calculateScore = () => {
    const totalAnswered = Object.keys(results).length;
    const correctAnswers = Object.values(results).filter(r => r.isCorrect).length;
    return { totalAnswered, correctAnswers, percentage: totalAnswered > 0 ? Math.round((correctAnswers / totalAnswered) * 100) : 0 };
  };

  const currentQuestion = questions[currentQuestionIndex];
  const currentResult = currentQuestion ? results[currentQuestion.id] : null;
  const score = calculateScore();

  if (questions.length === 0) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <div className="text-center space-y-4 mb-8">
          <h1 className="text-3xl font-bold">Specialist Medical Questions</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Practice with expert-level questions generated by consultant specialists from each medical field.
            Each question reflects the depth and clinical reasoning expected at specialist level.
          </p>
        </div>

        <SpecialtySelector
          onSpecialtySelect={handleSpecialtySelect}
          onGenerateQuestions={handleGenerateQuestions}
          selectedSpecialty={selectedSpecialty}
          loading={generateQuestionsMutation.isPending}
        />

        <Card>
          <CardHeader>
            <CardTitle>Mixed Specialty Practice</CardTitle>
            <CardDescription>
              Generate questions from multiple specialties for comprehensive practice
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                onClick={() => handleGenerateMixed(10, "specialist")}
                disabled={generateMixedQuestionsMutation.isPending}
                variant="outline"
              >
                {generateMixedQuestionsMutation.isPending ? "Generating..." : "10 Mixed Questions"}
              </Button>
              <Button
                onClick={() => handleGenerateMixed(20, "specialist")}
                disabled={generateMixedQuestionsMutation.isPending}
                variant="outline"
              >
                {generateMixedQuestionsMutation.isPending ? "Generating..." : "20 Mixed Questions"}
              </Button>
              <Button
                onClick={() => handleGenerateMixed(30, "consultant")}
                disabled={generateMixedQuestionsMutation.isPending}
                variant="outline"
              >
                {generateMixedQuestionsMutation.isPending ? "Generating..." : "30 Expert Level"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Specialist Questions</h1>
          <p className="text-muted-foreground">
            Question {currentQuestionIndex + 1} of {questions.length}
          </p>
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
              setSelectedSpecialty("");
            }}
            variant="outline"
          >
            New Session
          </Button>
        </div>
      </div>

      {currentQuestion && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span className="text-sm font-medium">{currentQuestion.specialist}</span>
                  </div>
                  <Badge variant="secondary">{currentQuestion.category}</Badge>
                </div>
                <CardTitle className="text-lg leading-relaxed">
                  {currentQuestion.question}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3">
                  {currentQuestion.options.map((option, index) => {
                    const optionLetter = String.fromCharCode(65 + index);
                    const isSelected = currentResult?.selectedAnswer === optionLetter;
                    const isCorrect = currentQuestion.correct_answer === optionLetter;
                    
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
                        key={index}
                        variant={variant}
                        className={`justify-start text-left h-auto p-4 ${isSelected ? 'ring-2 ring-offset-2' : ''}`}
                        onClick={() => !showExplanation && handleAnswerSelect(optionLetter)}
                        disabled={showExplanation}
                      >
                        <div className="flex items-center gap-3 w-full">
                          <span className="font-semibold text-sm">{optionLetter}.</span>
                          <span className="flex-1">{option}</span>
                          {icon}
                        </div>
                      </Button>
                    );
                  })}
                </div>

                {showExplanation && (
                  <Card className="bg-muted/50">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <BookOpen className="h-5 w-5" />
                        Expert Explanation
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="leading-relaxed">{currentQuestion.explanation}</p>
                      
                      {currentQuestion.uk_guidelines && currentQuestion.uk_guidelines.length > 0 && (
                        <div>
                          <h4 className="font-medium mb-2">UK Guidelines Referenced:</h4>
                          <div className="flex flex-wrap gap-2">
                            {currentQuestion.uk_guidelines.map((guideline, index) => (
                              <Badge key={index} variant="secondary">
                                {guideline}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}

                <div className="flex justify-between pt-4">
                  <Button
                    onClick={handlePreviousQuestion}
                    disabled={currentQuestionIndex === 0}
                    variant="outline"
                  >
                    Previous
                  </Button>
                  
                  {showExplanation && (
                    <Button
                      onClick={handleNextQuestion}
                      disabled={currentQuestionIndex === questions.length - 1}
                    >
                      {currentQuestionIndex === questions.length - 1 ? "Complete" : "Next Question"}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Session Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{currentQuestionIndex + 1}/{questions.length}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Correct</span>
                      <span className="text-green-600">{score.correctAnswers}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Answered</span>
                      <span>{score.totalAnswered}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Accuracy</span>
                      <span className="font-medium">{score.percentage}%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {currentQuestion.specialty_focus && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Learning Focus</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {currentQuestion.specialty_focus.map((focus, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <AlertCircle className="h-4 w-4 mt-0.5 text-blue-600 flex-shrink-0" />
                        <span className="text-sm">{focus}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}
    </div>
  );
}