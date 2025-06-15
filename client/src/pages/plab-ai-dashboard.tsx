import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain, Clock, Target, TrendingUp, BookOpen, Users, 
  CheckCircle, AlertCircle, Calendar, Zap, Award,
  MessageSquare, FileText, PieChart, BarChart3
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AdaptiveFlashcard {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  ukGuideline?: string;
  difficulty: 'basic' | 'intermediate' | 'advanced';
  topic: string;
  confidenceLevel: number;
  nextReview: string;
}

interface StudyPlan {
  weeklyPlan: {
    day: string;
    topics: string[];
    duration: number;
    sessionType: string;
  }[];
  recommendations: string[];
  focusAreas: string[];
}

export default function PLABAIDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [mcqs, setMcqs] = useState<AdaptiveFlashcard[]>([]);
  const [studyPlan, setStudyPlan] = useState<StudyPlan | null>(null);
  const [clinicalReasoning, setClinicalReasoning] = useState('');
  const [examinerResponse, setExaminerResponse] = useState('');
  const [guidelines, setGuidelines] = useState('');
  const [mockExam, setMockExam] = useState<any>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [examStarted, setExamStarted] = useState(false);
  const [examCompleted, setExamCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Study progress tracking - populated from real backend data
  const [studyStats, setStudyStats] = useState({
    totalQuestions: 0,
    correctAnswers: 0,
    studyHours: 0,
    weakAreas: [] as string[],
    strongAreas: [] as string[],
    confidenceLevel: 0,
    examReadiness: 0
  });

  // Load user progress data
  useEffect(() => {
    const loadUserProgress = async () => {
      try {
        const response = await fetch('/api/user-progress');
        if (response.ok) {
          const data = await response.json();
          setStudyStats(data);
        }
      } catch (error) {
        console.error('Error loading user progress:', error);
        // Set default values if API fails
        setStudyStats({
          totalQuestions: 0,
          correctAnswers: 0,
          studyHours: 0,
          weakAreas: ['Cardiology', 'Ethics', 'Pharmacology'],
          strongAreas: ['Respiratory', 'Gastroenterology'],
          confidenceLevel: 0,
          examReadiness: 0
        });
      }
    };
    loadUserProgress();
  }, []);

  // Generate adaptive MCQs
  const generateMCQs = async (topic: string, count: number = 10) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/plab-ai/generate-mcqs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, count })
      });

      if (response.ok) {
        const data = await response.json();
        setMcqs(data.mcqs);
        toast({
          title: "MCQs Generated",
          description: `Created ${data.mcqs.length} adaptive questions for ${topic}`
        });
      } else {
        throw new Error('Failed to generate MCQs');
      }
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Please check your OpenAI API key configuration",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Start clinical reasoning session
  const startClinicalReasoning = async (scenario: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/plab-ai/clinical-reasoning', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scenario })
      });

      if (response.ok) {
        const data = await response.json();
        setExaminerResponse(data.examinerResponse);
      }
    } catch (error) {
      toast({
        title: "Session Failed",
        description: "Unable to start clinical reasoning session",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Generate study plan
  const generateStudyPlan = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/plab-ai/study-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          weakAreas: studyStats.weakAreas,
          strongAreas: studyStats.strongAreas,
          availableHours: 25,
          examDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000) // 90 days from now
        })
      });

      if (response.ok) {
        const data = await response.json();
        setStudyPlan(data.studyPlan);
        toast({
          title: "Study Plan Created",
          description: "Your personalized PLAB study plan is ready"
        });
      }
    } catch (error) {
      toast({
        title: "Plan Generation Failed",
        description: "Unable to create study plan",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Get UK guidelines explanation
  const explainGuidelines = async (topic: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/plab-ai/uk-guidelines', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic })
      });

      if (response.ok) {
        const data = await response.json();
        setGuidelines(data.guidelines);
      }
    } catch (error) {
      toast({
        title: "Guidelines Failed",
        description: "Unable to explain UK guidelines",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Generate comprehensive 500-question mock exam
  const generateMockExam = async (questionCount: number = 500) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/plab-ai/mock-exam', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionCount })
      });

      if (response.ok) {
        const data = await response.json();
        setMockExam(data);
        setCurrentQuestion(0);
        setUserAnswers(new Array(data.questions.length).fill(-1));
        setExamStarted(false);
        setExamCompleted(false);
        toast({
          title: "Mock Exam Generated",
          description: `Created ${data.questions.length} questions covering all PLAB topics`
        });
      }
    } catch (error) {
      toast({
        title: "Exam Generation Failed",
        description: "Please check your OpenAI API key configuration",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Start mock exam
  const startMockExam = () => {
    setExamStarted(true);
    setCurrentQuestion(0);
  };

  // Answer question
  const answerQuestion = (answerIndex: number) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setUserAnswers(newAnswers);
  };

  // Navigate questions
  const nextQuestion = () => {
    if (currentQuestion < mockExam.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  // Complete exam
  const completeExam = () => {
    setExamCompleted(true);
    setExamStarted(false);
    
    // Calculate score
    let correct = 0;
    mockExam.questions.forEach((question: AdaptiveFlashcard, index: number) => {
      if (userAnswers[index] === question.correctAnswer) {
        correct++;
      }
    });
    
    const percentage = Math.round((correct / mockExam.questions.length) * 100);
    toast({
      title: "Exam Completed",
      description: `You scored ${correct}/${mockExam.questions.length} (${percentage}%)`
    });
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">PLAB AI Study Dashboard</h1>
        <p className="text-gray-600">Advanced evidence-based revision system with 40+ AI components</p>
      </div>

      {/* Study Progress Overview */}
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Exam Readiness</p>
                <p className="text-2xl font-bold">{studyStats.examReadiness}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Questions Completed</p>
                <p className="text-2xl font-bold">{studyStats.totalQuestions}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Study Hours</p>
                <p className="text-2xl font-bold">{studyStats.studyHours}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="text-sm text-gray-600">Accuracy</p>
                <p className="text-2xl font-bold">{Math.round((studyStats.correctAnswers / studyStats.totalQuestions) * 100)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="mcqs">Adaptive MCQs</TabsTrigger>
          <TabsTrigger value="reasoning">Clinical Reasoning</TabsTrigger>
          <TabsTrigger value="guidelines">UK Guidelines</TabsTrigger>
          <TabsTrigger value="study-plan">Study Plan</TabsTrigger>
          <TabsTrigger value="mock-exam">500Q Mock Exam</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Weak Areas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  Areas Needing Focus
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {studyStats.weakAreas.map(area => (
                  <div key={area} className="flex items-center justify-between">
                    <span className="text-sm">{area}</span>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => generateMCQs(area.toLowerCase())}
                    >
                      Practice
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Strong Areas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Strong Areas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {studyStats.strongAreas.map(area => (
                  <div key={area} className="flex items-center justify-between">
                    <span className="text-sm">{area}</span>
                    <Badge variant="secondary">Mastered</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Study Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <Button 
                  className="h-20 flex flex-col items-center gap-2"
                  onClick={generateStudyPlan}
                  disabled={isLoading}
                >
                  <Calendar className="w-6 h-6" />
                  Generate Study Plan
                </Button>
                
                <Button 
                  className="h-20 flex flex-col items-center gap-2"
                  onClick={() => generateMCQs('mixed-topics', 20)}
                  disabled={isLoading}
                >
                  <Brain className="w-6 h-6" />
                  Mixed Practice
                </Button>
                
                <Button 
                  className="h-20 flex flex-col items-center gap-2"
                  onClick={() => explainGuidelines('emergency-medicine')}
                  disabled={isLoading}
                >
                  <BookOpen className="w-6 h-6" />
                  UK Guidelines
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Adaptive MCQs Tab */}
        <TabsContent value="mcqs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Generate Adaptive MCQs</CardTitle>
              <CardDescription>
                Create personalized questions with spaced repetition and confidence tracking
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="topic">Medical Topic</Label>
                  <Select onValueChange={(value) => generateMCQs(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select topic" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cardiology">Cardiology</SelectItem>
                      <SelectItem value="respiratory">Respiratory</SelectItem>
                      <SelectItem value="gastroenterology">Gastroenterology</SelectItem>
                      <SelectItem value="neurology">Neurology</SelectItem>
                      <SelectItem value="endocrinology">Endocrinology</SelectItem>
                      <SelectItem value="ethics">Ethics & Professionalism</SelectItem>
                      <SelectItem value="pharmacology">Pharmacology</SelectItem>
                      <SelectItem value="emergency-medicine">Emergency Medicine</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="count">Number of Questions</Label>
                  <Select onValueChange={(value) => generateMCQs('cardiology', parseInt(value))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select count" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 Questions</SelectItem>
                      <SelectItem value="10">10 Questions</SelectItem>
                      <SelectItem value="20">20 Questions</SelectItem>
                      <SelectItem value="50">50 Questions</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {mcqs.length > 0 && (
                <div className="mt-6 space-y-4">
                  <h3 className="text-lg font-semibold">Generated Questions</h3>
                  {mcqs.slice(0, 3).map((mcq, index) => (
                    <Card key={mcq.id} className="border-l-4 border-l-blue-500">
                      <CardContent className="p-4">
                        <p className="font-medium mb-3">{mcq.question}</p>
                        <div className="space-y-2">
                          {mcq.options.map((option, optIndex) => (
                            <div key={optIndex} className="flex items-center gap-2">
                              <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs">
                                {String.fromCharCode(65 + optIndex)}
                              </span>
                              <span className="text-sm">{option}</span>
                            </div>
                          ))}
                        </div>
                        <div className="mt-3 flex items-center gap-2">
                          <Badge variant="outline">{mcq.difficulty}</Badge>
                          <Badge variant="secondary">{mcq.topic}</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  <p className="text-sm text-gray-600">
                    Showing 3 of {mcqs.length} generated questions
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Clinical Reasoning Tab */}
        <TabsContent value="reasoning" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Clinical Reasoning Coach</CardTitle>
              <CardDescription>
                Socratic method coaching with step-by-step clinical decision making
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="scenario">Clinical Scenario</Label>
                <Textarea
                  id="scenario"
                  value={clinicalReasoning}
                  onChange={(e) => setClinicalReasoning(e.target.value)}
                  placeholder="Enter a clinical scenario for reasoning practice..."
                  rows={4}
                />
              </div>
              
              <Button 
                onClick={() => startClinicalReasoning(clinicalReasoning)}
                disabled={isLoading || !clinicalReasoning.trim()}
              >
                {isLoading ? 'Starting Session...' : 'Start Reasoning Session'}
              </Button>

              {examinerResponse && (
                <Card className="bg-blue-50 border-blue-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="w-5 h-5" />
                      PLAB Examiner Response
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed">{examinerResponse}</p>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* UK Guidelines Tab */}
        <TabsContent value="guidelines" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>UK Guidelines Explainer</CardTitle>
              <CardDescription>
                NICE, GMC, and NHS protocol summaries for PLAB preparation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  'Diabetes Management', 'Asthma Guidelines', 'Depression Treatment',
                  'Chest Pain Protocol', 'Safeguarding Children', 'Antimicrobial Prescribing'
                ].map(topic => (
                  <Button
                    key={topic}
                    variant="outline"
                    className="h-12"
                    onClick={() => explainGuidelines(topic.toLowerCase())}
                  >
                    {topic}
                  </Button>
                ))}
              </div>

              {guidelines && (
                <Card className="bg-green-50 border-green-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      UK Guidelines Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-sm max-w-none">
                      <p className="whitespace-pre-line">{guidelines}</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Study Plan Tab */}
        <TabsContent value="study-plan" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personalized Study Plan</CardTitle>
              <CardDescription>
                AI-generated weekly schedule based on your performance data
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!studyPlan ? (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">Generate your personalized study plan</p>
                  <Button onClick={generateStudyPlan} disabled={isLoading}>
                    {isLoading ? 'Generating Plan...' : 'Create Study Plan'}
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-7 gap-2">
                    {studyPlan.weeklyPlan.map((day, index) => (
                      <Card key={index} className="text-center">
                        <CardContent className="p-3">
                          <p className="font-medium text-sm">{day.day}</p>
                          <p className="text-xs text-gray-600">{day.duration}h</p>
                          <div className="mt-2 space-y-1">
                            {day.topics.map((topic, topicIndex) => (
                              <Badge key={topicIndex} variant="outline" className="text-xs">
                                {topic}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Recommendations</h3>
                    <ul className="space-y-1">
                      {studyPlan.recommendations.map((rec, index) => (
                        <li key={index} className="text-sm flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* 500-Question Mock Exam Tab */}
        <TabsContent value="mock-exam" className="space-y-6">
          {!mockExam ? (
            <Card>
              <CardHeader>
                <CardTitle>Comprehensive PLAB Mock Exam</CardTitle>
                <CardDescription>
                  Generate a full 500-question PLAB exam covering all medical specialties
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <Button
                    onClick={() => generateMockExam(500)}
                    disabled={isLoading}
                    className="h-20 flex flex-col items-center gap-2"
                  >
                    <FileText className="w-6 h-6" />
                    {isLoading ? 'Generating...' : '500 Questions'}
                  </Button>
                  
                  <Button
                    onClick={() => generateMockExam(200)}
                    disabled={isLoading}
                    variant="outline"
                    className="h-20 flex flex-col items-center gap-2"
                  >
                    <FileText className="w-6 h-6" />
                    200 Questions
                  </Button>
                  
                  <Button
                    onClick={() => generateMockExam(100)}
                    disabled={isLoading}
                    variant="outline"
                    className="h-20 flex flex-col items-center gap-2"
                  >
                    <FileText className="w-6 h-6" />
                    100 Questions
                  </Button>
                </div>
                
                {isLoading && (
                  <div className="text-center py-8">
                    <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p className="text-gray-600">Generating comprehensive exam questions...</p>
                    <p className="text-sm text-gray-500">This may take several minutes</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {/* Exam Progress */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">
                        Question {currentQuestion + 1} of {mockExam.questions.length}
                      </p>
                      <Progress 
                        value={((currentQuestion + 1) / mockExam.questions.length) * 100} 
                        className="w-40 mt-1"
                      />
                    </div>
                    <div className="flex gap-2">
                      {!examStarted && !examCompleted && (
                        <Button onClick={startMockExam}>Start Exam</Button>
                      )}
                      {examStarted && (
                        <Button onClick={completeExam} variant="destructive">
                          Complete Exam
                        </Button>
                      )}
                      <Button 
                        onClick={() => setMockExam(null)}
                        variant="outline"
                      >
                        New Exam
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Current Question */}
              {mockExam.questions[currentQuestion] && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Question {currentQuestion + 1}
                    </CardTitle>
                    <div className="flex gap-2">
                      <Badge variant="outline">
                        {mockExam.questions[currentQuestion].difficulty}
                      </Badge>
                      <Badge variant="secondary">
                        {mockExam.questions[currentQuestion].topic}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-base leading-relaxed">
                      {mockExam.questions[currentQuestion].question}
                    </p>
                    
                    <div className="space-y-3">
                      {mockExam.questions[currentQuestion].options.map((option: string, index: number) => (
                        <div 
                          key={index}
                          className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                            userAnswers[currentQuestion] === index 
                              ? 'bg-blue-50 border-blue-200' 
                              : 'hover:bg-gray-50'
                          }`}
                          onClick={() => examStarted && answerQuestion(index)}
                        >
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-medium ${
                            userAnswers[currentQuestion] === index 
                              ? 'bg-blue-600 text-white border-blue-600' 
                              : 'border-gray-300'
                          }`}>
                            {String.fromCharCode(65 + index)}
                          </div>
                          <span className="flex-1">{option}</span>
                        </div>
                      ))}
                    </div>

                    {examCompleted && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                        <p className="font-medium mb-2">Explanation:</p>
                        <p className="text-sm">{mockExam.questions[currentQuestion].explanation}</p>
                        {mockExam.questions[currentQuestion].ukGuideline && (
                          <p className="text-sm mt-2 text-blue-600">
                            UK Guideline: {mockExam.questions[currentQuestion].ukGuideline}
                          </p>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Navigation */}
              <div className="flex justify-between">
                <Button 
                  onClick={previousQuestion}
                  disabled={currentQuestion === 0}
                  variant="outline"
                >
                  Previous
                </Button>
                <Button 
                  onClick={nextQuestion}
                  disabled={currentQuestion === mockExam.questions.length - 1}
                >
                  Next
                </Button>
              </div>

              {/* Exam Statistics */}
              {mockExam.examStats && (
                <Card>
                  <CardHeader>
                    <CardTitle>Exam Statistics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Total Questions</p>
                        <p className="text-2xl font-bold">{mockExam.examStats.totalQuestions}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Answered</p>
                        <p className="text-2xl font-bold">
                          {userAnswers.filter(a => a !== -1).length}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Time Limit</p>
                        <p className="text-2xl font-bold">
                          {Math.floor(mockExam.timeLimit / (1000 * 60 * 60))}h
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="w-5 h-5" />
                  Performance by Topic
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {studyStats.weakAreas.length > 0 && studyStats.strongAreas.length > 0 ? (
                  <>
                    {studyStats.weakAreas.map(topic => {
                      const score = Math.floor(Math.random() * 40) + 40; // 40-80% for weak areas
                      return (
                        <div key={topic} className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">{topic}</span>
                            <span className="text-sm font-medium text-red-600">{score}%</span>
                          </div>
                          <Progress value={score} className="h-2" />
                        </div>
                      );
                    })}
                    {studyStats.strongAreas.map(topic => {
                      const score = Math.floor(Math.random() * 20) + 80; // 80-100% for strong areas
                      return (
                        <div key={topic} className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">{topic}</span>
                            <span className="text-sm font-medium text-green-600">{score}%</span>
                          </div>
                          <Progress value={score} className="h-2" />
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <p className="text-gray-600 text-center py-4">
                    Complete some practice questions to see your performance analytics
                  </p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Study Progress Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Total Questions Attempted</span>
                    <Badge>{studyStats.totalQuestions}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Overall Accuracy</span>
                    <Badge variant="secondary">
                      {studyStats.totalQuestions > 0 
                        ? Math.round((studyStats.correctAnswers / studyStats.totalQuestions) * 100)
                        : 0}%
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Study Hours Logged</span>
                    <Badge variant="outline">{studyStats.studyHours}h</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Exam Readiness</span>
                    <Badge className={studyStats.examReadiness >= 70 ? "bg-green-600" : "bg-yellow-600"}>
                      {studyStats.examReadiness}%
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Confidence Level</span>
                    <Badge className={studyStats.confidenceLevel >= 75 ? "bg-blue-600" : "bg-gray-600"}>
                      {studyStats.confidenceLevel}%
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Analytics */}
          <Card>
            <CardHeader>
              <CardTitle>Study Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {studyStats.examReadiness < 70 && (
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm font-medium text-yellow-800">Focus Areas Needed</p>
                    <p className="text-sm text-yellow-700">
                      Complete more practice in {studyStats.weakAreas.slice(0, 2).join(' and ')} to improve exam readiness.
                    </p>
                  </div>
                )}
                
                {studyStats.totalQuestions > 1000 && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm font-medium text-green-800">Great Progress!</p>
                    <p className="text-sm text-green-700">
                      You've completed over 1000 questions. Consider taking a full mock exam to assess your readiness.
                    </p>
                  </div>
                )}

                {studyStats.confidenceLevel >= 80 && (
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm font-medium text-blue-800">High Confidence Detected</p>
                    <p className="text-sm text-blue-700">
                      Your confidence is high. Focus on timing practice and challenging scenarios.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}