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
  links: {
    NICE: string;
    BNF: string;
    CKS: string;
  };
}

export default function Test() {
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Fetch questions from API
  const { data: questions, isLoading, error } = useQuery({
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
    if (!submitted) {
      return selectedAnswer === option 
        ? "border-blue-500 bg-blue-50 text-blue-700"
        : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50";
    }

    // After submission
    if (option === question.answer) {
      return "border-green-500 bg-green-50 text-green-700";
    }
    
    if (selectedAnswer === option && option !== question.answer) {
      return "border-red-500 bg-red-50 text-red-700";
    }

    return "border-gray-300 bg-gray-50 text-gray-500";
  };

  const getOptionIcon = (option: string) => {
    if (!submitted) return null;
    
    if (option === question.answer) {
      return <CheckCircle className="w-5 h-5 text-green-600" />;
    }
    
    if (selectedAnswer === option && option !== question.answer) {
      return <XCircle className="w-5 h-5 text-red-600" />;
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 pb-24">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">PLAB Style Test</h1>
          <p className="text-gray-600">PassMedicine-style MCQ with detailed explanations</p>
        </div>

        {/* Question Card */}
        <Card className="mb-6 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-medium text-gray-900">
              Question 1
            </CardTitle>
            <CardDescription className="text-base text-gray-700 leading-relaxed">
              {question.question}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-3">
            {Object.entries(question.options).map(([option, text]) => (
              <button
                key={option}
                onClick={() => handleAnswerSelect(option)}
                disabled={submitted}
                className={`w-full p-4 border-2 rounded-lg text-left transition-all duration-200 flex items-center justify-between ${getOptionButtonClass(option)}`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-lg">{option}.</span>
                  <span>{text}</span>
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
              {Object.entries(question.explanation).map(([option, explanation]) => (
                <div key={option} className="border-l-4 border-gray-200 pl-4">
                  <div className="flex items-start gap-2">
                    <Badge 
                      variant={option === question.answer ? "default" : "secondary"}
                      className="mt-1"
                    >
                      {option}
                    </Badge>
                    <p className="text-gray-700 leading-relaxed">{explanation}</p>
                  </div>
                </div>
              ))}
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
                <p className="text-gray-800 font-medium">{question.mnemonic}</p>
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
                  href={question.links.NICE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-900">NICE</span>
                  <ExternalLink className="w-4 h-4 text-gray-500" />
                </a>
                <a
                  href={question.links.BNF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-900">BNF</span>
                  <ExternalLink className="w-4 h-4 text-gray-500" />
                </a>
                <a
                  href={question.links.CKS}
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