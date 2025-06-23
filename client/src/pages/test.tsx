import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, ExternalLink, Lightbulb, BookOpen, ArrowLeft, ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface Question {
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
    E: string;
  };
  answer: string;
  explanation: {
    A: string;
    B: string;
    C: string;
    D: string;
    E: string;
  };
  mnemonic: string;
  medications?: string[];
  bnfGuidance?: string;
  links: {
    NICE: string;
    CKS: string;
    "NHS UK": string;
  };
}

export default function Test() {
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Fetch questions from API
  const { data: questions, isLoading, error } = useQuery<Question[]>({
    queryKey: ["/api/test/questions"],
    retry: false,
  });

  const currentQuestion = questions?.[currentQuestionIndex];

  const handleAnswerSelect = (option: string) => {
    if (!submitted) {
      setSelectedAnswer(option);
    }
  };

  const handleSubmit = () => {
    if (selectedAnswer) {
      setSubmitted(true);
    }
  };

  const handleReset = () => {
    setSelectedAnswer("");
    setSubmitted(false);
  };

  const handleNextQuestion = () => {
    if (questions && currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer("");
      setSubmitted(false);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setSelectedAnswer("");
      setSubmitted(false);
    }
  };

  const getOptionButtonClass = (option: string) => {
    if (!submitted || !currentQuestion) {
      return selectedAnswer === option 
        ? "border-blue-500 bg-blue-50 text-blue-700"
        : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50";
    }

    // After submission
    if (option === currentQuestion.answer) {
      return "border-green-500 bg-green-50 text-green-700";
    }
    
    if (selectedAnswer === option && option !== currentQuestion.answer) {
      return "border-red-500 bg-red-50 text-red-700";
    }

    return "border-gray-300 bg-gray-50 text-gray-500";
  };

  const getOptionIcon = (option: string) => {
    if (!submitted || !currentQuestion) return null;
    
    if (option === currentQuestion.answer) {
      return <CheckCircle className="w-5 h-5 text-green-600" />;
    }
    
    if (selectedAnswer === option && option !== currentQuestion.answer) {
      return <XCircle className="w-5 h-5 text-red-600" />;
    }

    return null;
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Loading Questions</h3>
            <p className="text-gray-600">Preparing PassMedicine-style questions...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Error state
  if (error || !questions || questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Unable to Load Questions</h3>
            <p className="text-gray-600">Please try refreshing the page.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!currentQuestion) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 pb-24">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">PLAB Style Test</h1>
            <p className="text-gray-600">PassMedicine-style MCQ with detailed explanations</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="px-3 py-1">
              Question {currentQuestionIndex + 1} of {questions.length}
            </Badge>
          </div>
        </div>

        {/* Question Card */}
        <Card className="mb-6 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-medium text-gray-900 flex items-center justify-between">
              Question {currentQuestionIndex + 1}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePrevQuestion}
                  disabled={currentQuestionIndex === 0}
                >
                  <ArrowLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNextQuestion}
                  disabled={currentQuestionIndex === questions.length - 1}
                >
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </CardTitle>
            <CardDescription className="text-base text-gray-700 leading-relaxed">
              {currentQuestion.question}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-3">
            {Object.entries(currentQuestion.options).map(([option, text]) => (
              <button
                key={option}
                onClick={() => handleAnswerSelect(option)}
                disabled={submitted}
                className={`w-full p-4 border-2 rounded-lg text-left transition-all duration-200 flex items-center justify-between ${getOptionButtonClass(option)}`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-lg">{option}.</span>
                  <span>{String(text)}</span>
                </div>
                {getOptionIcon(option)}
              </button>
            ))}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              {!submitted ? (
                <Button 
                  onClick={handleSubmit}
                  disabled={!selectedAnswer}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6"
                >
                  Submit Answer
                </Button>
              ) : (
                <Button 
                  onClick={handleReset}
                  variant="outline"
                  className="px-6"
                >
                  Try Again
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Explanation Section */}
        {submitted && (
          <Card className="mb-6 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-medium text-gray-900 flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Detailed Explanation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(currentQuestion.explanation).map(([option, explanation]) => (
                <div key={option} className="border-l-4 border-gray-200 pl-4">
                  <div className="flex items-start gap-2">
                    <Badge 
                      variant={option === currentQuestion.answer ? "default" : "secondary"}
                      className="mt-1"
                    >
                      {option}
                    </Badge>
                    <p className="text-gray-700 leading-relaxed">{String(explanation)}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* BNF Medication Guidance */}
        {submitted && currentQuestion.bnfGuidance && (
          <Card className="mb-6 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-medium text-gray-900 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-500" />
                BNF Medication Guidance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                <p className="text-gray-800 leading-relaxed">{currentQuestion.bnfGuidance}</p>
                {currentQuestion.medications && currentQuestion.medications.length > 0 && (
                  <div className="mt-3">
                    <div className="text-sm font-medium text-blue-700 mb-2">Key Medications:</div>
                    <div className="flex flex-wrap gap-2">
                      {currentQuestion.medications.map((med, index) => (
                        <Badge key={index} variant="outline" className="bg-white border-blue-300 text-blue-700">
                          {med}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Mnemonic Section */}
        {submitted && (
          <Card className="mb-6 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-medium text-gray-900 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                Memory Aid
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                <p className="text-gray-800 font-medium">{currentQuestion.mnemonic}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Clinical Guidelines Links */}
        {submitted && (
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-medium text-gray-900 flex items-center gap-2">
                <ExternalLink className="w-5 h-5" />
                Clinical Guidelines
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <a
                  href={currentQuestion.links.NICE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-900">NICE</span>
                  <ExternalLink className="w-4 h-4 text-gray-500" />
                </a>
                <a
                  href={currentQuestion.links["NHS UK"]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-900">NHS UK</span>
                  <ExternalLink className="w-4 h-4 text-gray-500" />
                </a>
                <a
                  href={currentQuestion.links.CKS}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-900">CKS</span>
                  <ExternalLink className="w-4 h-4 text-gray-500" />
                </a>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}