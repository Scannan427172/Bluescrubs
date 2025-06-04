import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MCQInterface } from "@/components/mcq-interface";
import { ProgressChart } from "@/components/progress-chart";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { 
  Play, BookOpen, Clock, Trophy, Target, TrendingUp, 
  BarChart3, Filter, Shuffle 
} from "lucide-react";
import type { Question, UserStats, UserProgress } from "@/lib/types";

// Mock user ID for demo
const DEMO_USER_ID = 1;

export default function Plab1Practice() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);

  // Fetch user stats
  const { data: userStats, isLoading: statsLoading } = useQuery<UserStats>({
    queryKey: [`/api/users/${DEMO_USER_ID}/stats`],
  });

  // Fetch questions based on filters
  const { data: questions, isLoading: questionsLoading } = useQuery<Question[]>({
    queryKey: [`/api/questions`, selectedCategory, selectedDifficulty],
    queryFn: async () => {
      const params = new URLSearchParams({
        examType: 'plab1',
        limit: '20'
      });
      
      if (selectedCategory !== 'all') {
        params.append('category', selectedCategory);
      }
      
      const response = await fetch(`/api/questions?${params}`);
      if (!response.ok) throw new Error('Failed to fetch questions');
      return response.json();
    }
  });

  // Submit answer mutation
  const submitAnswerMutation = useMutation({
    mutationFn: async (data: { questionId: number; answer: string; timeSpent: number }) => {
      return apiRequest('POST', `/api/users/${DEMO_USER_ID}/progress`, {
        questionId: data.questionId,
        isCorrect: false, // Will be calculated on server
        timeSpent: data.timeSpent
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/users/${DEMO_USER_ID}/stats`] });
    }
  });

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "cardiology", label: "Cardiology" },
    { value: "respiratory", label: "Respiratory Medicine" },
    { value: "neurology", label: "Neurology" },
    { value: "endocrinology", label: "Endocrinology" },
    { value: "gastroenterology", label: "Gastroenterology" },
    { value: "psychiatry", label: "Psychiatry" },
    { value: "obstetrics", label: "Obstetrics & Gynaecology" },
    { value: "paediatrics", label: "Paediatrics" },
    { value: "surgery", label: "Surgery" },
    { value: "emergency", label: "Emergency Medicine" }
  ];

  const difficulties = [
    { value: "all", label: "All Difficulties" },
    { value: "easy", label: "Easy" },
    { value: "medium", label: "Medium" },
    { value: "hard", label: "Hard" }
  ];

  const handleStartQuiz = (questionsToUse?: Question[]) => {
    const quizSet = questionsToUse || questions || [];
    if (quizSet.length > 0) {
      setQuizQuestions(quizSet.slice(0, 20));
      setIsQuizActive(true);
    }
  };

  const handleAnswerSubmit = (questionId: number, answer: string, timeSpent: number) => {
    submitAnswerMutation.mutate({ questionId, answer, timeSpent });
  };

  const handleQuizComplete = (results: { correct: number; total: number; timeSpent: number }) => {
    setIsQuizActive(false);
    setQuizQuestions([]);
    // Show results modal or navigate to results page
    console.log('Quiz completed:', results);
  };

  if (isQuizActive && quizQuestions.length > 0) {
    return (
      <div className="min-h-screen bg-light-bg py-8">
        <MCQInterface
          questions={quizQuestions}
          onAnswerSubmit={handleAnswerSubmit}
          onQuizComplete={handleQuizComplete}
          timeLimit={60} // 60 minutes for 20 questions
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light-bg pb-20 md:pb-0">
      {/* Header */}
      <div className="bg-white py-12 border-b" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4" style={{ color: '#000000' }}>PLAB 1 MCQ Practice</h1>
            <p className="text-xl" style={{ color: '#666666' }}>Master clinical scenarios with comprehensive question bank</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white border" style={{ backgroundColor: '#ffffff' }}>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold mb-1" style={{ color: '#000000' }}>
                {(userStats as any)?.correctAnswers || 0}
              </div>
              <div className="text-sm" style={{ color: '#666666' }}>Correct Answers</div>
            </CardContent>
          </Card>

          <Card className="bg-white border" style={{ backgroundColor: '#ffffff' }}>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold mb-1" style={{ color: '#000000' }}>
                {(userStats as any)?.totalAnswered ? Math.round(((userStats as any).correctAnswers / (userStats as any).totalAnswered) * 100) : 0}%
              </div>
              <div className="text-sm" style={{ color: '#666666' }}>Accuracy Rate</div>
            </CardContent>
          </Card>

          <Card className="bg-white border" style={{ backgroundColor: '#ffffff' }}>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-2xl font-bold mb-1" style={{ color: '#000000' }}>
                {(userStats as any)?.averageTime ? Math.round((userStats as any).averageTime) : 0}s
              </div>
              <div className="text-sm" style={{ color: '#666666' }}>Avg. Time</div>
            </CardContent>
          </Card>

          <Card className="bg-white border" style={{ backgroundColor: '#ffffff' }}>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="text-2xl font-bold mb-1" style={{ color: '#000000' }}>
                {(userStats as any)?.totalAnswered || 0}
              </div>
              <div className="text-sm" style={{ color: '#666666' }}>Questions Attempted</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Practice Options */}
            <Card className="bg-white border" style={{ backgroundColor: '#ffffff' }}>
              <CardHeader>
                <CardTitle className="text-2xl font-bold flex items-center" style={{ color: '#000000' }}>
                  <BookOpen className="w-6 h-6 mr-3 text-blue-600" />
                  Start Practice Session
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Filters */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#000000' }}>
                      Category
                    </label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category.value} value={category.value}>
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#000000' }}>
                      Difficulty
                    </label>
                    <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {difficulties.map(difficulty => (
                          <SelectItem key={difficulty.value} value={difficulty.value}>
                            {difficulty.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Quick Action Buttons */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button
                    onClick={() => handleStartQuiz()}
                    disabled={questionsLoading || !questions?.length}
                    className="btn-medical flex items-center justify-center space-x-2 h-16"
                  >
                    <Play className="w-5 h-5" />
                    <div className="text-left">
                      <div className="font-semibold">Quick Practice</div>
                      <div className="text-xs opacity-90">20 questions</div>
                    </div>
                  </Button>

                  <Button
                    onClick={() => {
                      // Shuffle questions for random practice
                      const shuffled = [...(questions || [])].sort(() => Math.random() - 0.5);
                      handleStartQuiz(shuffled);
                    }}
                    disabled={questionsLoading || !questions?.length}
                    className="btn-secondary flex items-center justify-center space-x-2 h-16"
                  >
                    <Shuffle className="w-5 h-5" />
                    <div className="text-left">
                      <div className="font-semibold">Random Quiz</div>
                      <div className="text-xs opacity-90">Mixed topics</div>
                    </div>
                  </Button>

                  <Button
                    onClick={() => handleStartQuiz()}
                    disabled={questionsLoading || !questions?.length}
                    className="btn-success flex items-center justify-center space-x-2 h-16"
                  >
                    <Clock className="w-5 h-5" />
                    <div className="text-left">
                      <div className="font-semibold">Timed Mock</div>
                      <div className="text-xs opacity-90">60 minutes</div>
                    </div>
                  </Button>
                </div>

                {questionsLoading && (
                  <div className="text-center py-4">
                    <div className="inline-flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                      <span style={{ color: '#000000' }}>Loading questions...</span>
                    </div>
                  </div>
                )}

                {!questionsLoading && (!questions || questions.length === 0) && (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <BookOpen className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2" style={{ color: '#000000' }}>No Questions Available</h3>
                    <p style={{ color: '#666666' }}>Try adjusting your filters or check back later.</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Progress Chart */}
            {userStats && (
              <ProgressChart userStats={userStats} />
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Study Tips */}
            <Card className="bg-white border" style={{ backgroundColor: '#ffffff' }}>
              <CardHeader>
                <CardTitle className="text-lg font-bold" style={{ color: '#000000' }}>Study Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-600">
                    <h4 className="font-semibold mb-2" style={{ color: '#000000' }}>📚 Active Learning</h4>
                    <p className="text-sm" style={{ color: '#000000' }}>
                      Don't just memorize answers. Understand the underlying clinical reasoning behind each question.
                    </p>
                  </div>

                  <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-600">
                    <h4 className="font-semibold mb-2" style={{ color: '#000000' }}>⏱️ Time Management</h4>
                    <p className="text-sm" style={{ color: '#000000' }}>
                      Aim for 1-2 minutes per question during practice to build speed for the actual exam.
                    </p>
                  </div>

                  <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-600">
                    <h4 className="font-semibold mb-2" style={{ color: '#000000' }}>🎯 Focus Areas</h4>
                    <p className="text-sm" style={{ color: '#000000' }}>
                      Prioritize high-yield topics like cardiology, respiratory, and emergency medicine.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Performance */}
            <Card className="bg-white border" style={{ backgroundColor: '#ffffff' }}>
              <CardHeader>
                <CardTitle className="text-lg font-bold" style={{ color: '#000000' }}>Performance Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium" style={{ color: '#000000' }}>Strong Areas</div>
                      <div className="text-sm" style={{ color: '#666666' }}>Categories you excel in</div>
                    </div>
                    <Badge className="bg-green-600 text-white">
                      {Object.entries((userStats as any)?.categoryStats || {})
                        .filter(([, stats]: [string, any]) => stats.total > 0 && (stats.correct / stats.total) >= 0.8)
                        .length}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium" style={{ color: '#000000' }}>Areas to Improve</div>
                      <div className="text-sm" style={{ color: '#666666' }}>Categories needing focus</div>
                    </div>
                    <Badge variant="outline" className="border-yellow-600" style={{ color: '#ca8a04' }}>
                      {Object.entries((userStats as any)?.categoryStats || {})
                        .filter(([, stats]: [string, any]) => stats.total > 0 && (stats.correct / stats.total) < 0.7)
                        .length}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium" style={{ color: '#000000' }}>Practice Streak</div>
                      <div className="text-sm" style={{ color: '#666666' }}>Consecutive days</div>
                    </div>
                    <Badge className="bg-purple-600 text-white">
                      12 🔥
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Exam Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-bold">PLAB 1 Exam Info</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Format:</span>
                    <span className="font-medium">180 MCQs</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium">3 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pass Mark:</span>
                    <span className="font-medium">~65%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cost:</span>
                    <span className="font-medium">£230</span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <Button variant="outline" className="w-full text-sm">
                    View Full Exam Guide
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
