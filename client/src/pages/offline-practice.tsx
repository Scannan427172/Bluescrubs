import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  WifiOff, Clock, CheckCircle, BookOpen, Target, 
  PlayCircle, Download, Database, RefreshCw
} from "lucide-react";
import { offlineManager, initializeOfflineMode } from "@/lib/offline";

export default function OfflinePractice() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [offlineQuestions, setOfflineQuestions] = useState<any[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initializeOffline();
  }, []);

  const initializeOffline = async () => {
    try {
      await initializeOfflineMode();
      setIsInitialized(true);
      await loadOfflineQuestions();
    } catch (error) {
      console.error('Failed to initialize offline mode:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadOfflineQuestions = async () => {
    try {
      const questions = await offlineManager.getQuestions();
      setOfflineQuestions(questions);
      if (questions.length > 0) {
        setCurrentQuestion(questions[0]);
      }
    } catch (error) {
      console.error('Failed to load offline questions:', error);
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null || !currentQuestion) return;

    const isCorrect = selectedAnswer === currentQuestion.correct;
    if (isCorrect) {
      setScore(score + 1);
    }
    setShowResult(true);
  };

  const handleNextQuestion = () => {
    if (questionIndex < offlineQuestions.length - 1) {
      const nextIndex = questionIndex + 1;
      setQuestionIndex(nextIndex);
      setCurrentQuestion(offlineQuestions[nextIndex]);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const resetQuiz = () => {
    setQuestionIndex(0);
    setCurrentQuestion(offlineQuestions[0]);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Database className="h-12 w-12 text-blue-600 mx-auto mb-4 animate-spin" />
          <p className="text-gray-600">Initializing offline mode...</p>
        </div>
      </div>
    );
  }

  if (!isInitialized || offlineQuestions.length === 0) {
    return (
      <div className="min-h-screen bg-white p-6">
        <div className="max-w-2xl mx-auto text-center">
          <WifiOff className="h-16 w-16 text-gray-400 mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Offline Mode</h1>
          <p className="text-gray-600 mb-6">
            No offline content available. Please connect to the internet and download content first.
          </p>
          <Button onClick={initializeOffline} className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Retry Initialization
          </Button>
        </div>
      </div>
    );
  }

  const isQuizComplete = questionIndex >= offlineQuestions.length - 1 && showResult;

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <WifiOff className="h-6 w-6 text-orange-600" />
            <h1 className="text-2xl font-bold text-gray-900">Offline Practice</h1>
            <Badge className="bg-orange-100 text-orange-800">Offline Mode</Badge>
          </div>
          <div className="text-sm text-gray-600">
            Question {questionIndex + 1} of {offlineQuestions.length}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <Progress 
            value={(questionIndex / offlineQuestions.length) * 100} 
            className="h-2"
          />
        </div>

        {isQuizComplete ? (
          /* Results Screen */
          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Quiz Complete!</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="text-6xl font-bold text-blue-600">
                {score}/{offlineQuestions.length}
              </div>
              <div className="text-lg text-gray-600">
                You scored {Math.round((score / offlineQuestions.length) * 100)}%
              </div>
              <div className="flex justify-center gap-4">
                <Button onClick={resetQuiz} variant="outline">
                  Restart Quiz
                </Button>
                <Button onClick={() => window.history.back()}>
                  Back to Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          /* Question Screen */
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge className="bg-blue-100 text-blue-800">
                  {currentQuestion?.category || 'General'}
                </Badge>
                <Badge className="bg-purple-100 text-purple-800">
                  {currentQuestion?.difficulty || 'Medium'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {currentQuestion?.question}
              </h2>

              <div className="space-y-3">
                {currentQuestion?.options?.map((option: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showResult}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-colors ${
                      selectedAnswer === index
                        ? showResult
                          ? index === currentQuestion.correct
                            ? "border-green-500 bg-green-50"
                            : "border-red-500 bg-red-50"
                          : "border-blue-500 bg-blue-50"
                        : showResult && index === currentQuestion.correct
                        ? "border-green-500 bg-green-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center text-sm font-semibold">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span>{option}</span>
                      {showResult && index === currentQuestion.correct && (
                        <CheckCircle className="h-5 w-5 text-green-600 ml-auto" />
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {showResult && currentQuestion?.explanation && (
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Explanation:</h4>
                  <p className="text-blue-800">{currentQuestion.explanation}</p>
                </div>
              )}

              <div className="flex justify-between">
                <div className="text-sm text-gray-500">
                  Score: {score}/{questionIndex + (showResult ? 1 : 0)}
                </div>
                <div className="space-x-3">
                  {!showResult ? (
                    <Button 
                      onClick={handleSubmitAnswer}
                      disabled={selectedAnswer === null}
                    >
                      Submit Answer
                    </Button>
                  ) : (
                    <Button onClick={handleNextQuestion}>
                      {questionIndex < offlineQuestions.length - 1 ? 'Next Question' : 'View Results'}
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Offline Status */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            You're currently offline. Your progress will sync when you reconnect.
          </p>
        </div>
      </div>
    </div>
  );
}